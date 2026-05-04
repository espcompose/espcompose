// ────────────────────────────────────────────────────────────────────────────
// Overlay mux processing — Table-driven codegen for shared overlay widgets
//
// Takes OverlayDefinition[] (with per-instance captured bindings from Phase 4)
// and produces:
//   - Mux signal declarations (one Signal<int32_t> per overlay template)
//   - Muxed widget bindings (instance 0's bindings with divergent values
//     wrapped in IRMuxExpression / IRTableLookupExpression)
//   - Additional memos for per-instance reactive nodes
//
// The processing flow:
//   1. For each overlay definition, create a mux signal
//   2. Zip bindings positionally across instances (structure is identical)
//   3. For each binding position:
//      a. If expressions are identical across all instances → keep as-is
//      b. If they differ → wrap in mux expression
//   4. Return signals + modified bindings + reactive nodes for the codegen
// ────────────────────────────────────────────────────────────────────────────

import type { OverlayDefinition } from '@espcompose/core/internals';
import type { IRExpression, ExprType } from '@espcompose/core/internals';
import type { IRActionNode, IRCondition } from '@espcompose/core/internals';
import type { IRBinding } from '@espcompose/core/internals';
import type { IRReactiveNode } from '@espcompose/core/internals';
import { analyzeExprStructure, analyzeActionStructure, irBinary } from '@espcompose/core/internals';
import { mapExprChildren } from '@espcompose/core/internals';
import type { SignalDecl, TableDecl } from './bindings.js';
import { exprTypeToCpp } from '../lowering';

/** Result of overlay mux processing, to be merged into the main runtime config. */
export interface OverlayMuxResult {
  /** One mux signal per overlay template (Signal<int32_t>). */
  muxSignals: SignalDecl[];
  /** Muxed widget bindings — instance 0's bindings with divergent values wrapped. */
  muxedBindings: IRBinding[];
  /** Per-instance reactive nodes that need to be included in the memo pipeline. */
  additionalReactiveNodes: IRReactiveNode[];
  /** Mux signal index → name mapping for the CppLoweringContext. */
  muxSignalIndices: Map<number, string>;
  /**
   * Muxed action replacements for trigger handlers inside overlay widgets.
   * Maps sequential action position (within each overlay template) to the
   * muxed `IRActionNode[]` that should replace the original.  Keyed by
   * `templateKey:position`.
   */
  muxedActions: Map<string, IRActionNode[]>;
  /** Static data tables created by table-driven optimisations. */
  tables: TableDecl[];
}

/**
 * Serialize an IRExpression to a deterministic comparison string.
 *
 * Used to detect whether per-instance binding expressions are identical
 * (no mux needed) or divergent (mux needed). This doesn't need to be
 * a valid C++ expression — just a stable, deterministic representation
 * for equality comparison.
 */
function exprFingerprint(expr: IRExpression): string {
  switch (expr.kind) {
    case 'expr:literal':
      return `L:${typeof expr.value}:${String(expr.value)}`;
    case 'expr:signal_read':
      return `S:${expr.signalIndex}`;
    case 'expr:memo_read':
      return `M:${expr.memoId}`;
    case 'expr:theme_read':
      return `T:${expr.scopeId}:${expr.path}`;
    case 'expr:slot':
      return `SL:${expr.slotIndex}`;
    case 'expr:mux':
      return `MUX:(${exprFingerprint(expr.index)},${expr.cases.map(exprFingerprint).join(',')})`;
    case 'expr:table_lookup':
      return `TBL:${expr.table}:(${exprFingerprint(expr.index)})`;
    case 'expr:entity_prop':
      return `EP:${expr.entityId}:${expr.propertyKey}`;
    case 'expr:global_read':
      return `GL:${expr.globalId}`;
    case 'expr:component_read':
      return `CR:${expr.componentId}:${expr.sensorIndex}`;
    case 'expr:trigger_var':
      return `TV:${expr.name}`;
    case 'expr:local_var':
      return `LV:${expr.name}`;
    case 'expr:function':
      return `FN:${expr.returnType}`;
    case 'expr:op': {
      const attrs = Object.entries(expr.op)
        .filter(([k]) => k !== 'tag')
        .map(([, v]) => String(v))
        .join(':');
      return `OP:${expr.op.tag}${attrs ? ':' + attrs : ''}:(${expr.children.map(exprFingerprint).join(',')})`;
    }
    default: {
      const _exhaustive: never = expr;
      throw new Error(`exprFingerprint: unhandled kind '${(_exhaustive as { kind: string }).kind}'`);
    }
  }
}

/**
 * Serialize an action data value (IRExpression or already-resolved primitive)
 * to a deterministic comparison string.
 */
function actionParamFingerprint(param: IRExpression | string | number | boolean): string {
  if (typeof param !== 'object' || param === null) return `P:${typeof param}:${String(param)}`;
  if (param.kind === 'expr:literal') {
    return `PL:${typeof param.value}:${String(param.value)}`;
  }
  if (param.kind === 'expr:trigger_var') {
    return `PT:${param.name}`;
  }
  return `PE:${exprFingerprint(param)}`;
}

/**
 * Serialize an IRCondition to a deterministic comparison string.
 */
function conditionFingerprint(cond: IRCondition): string {
  switch (cond.kind) {
    case 'lambda_condition':
      return `LC:(${exprFingerprint(cond.exprIR)})`;
    case 'native':
      return `NC:${cond.conditionKey}:${JSON.stringify(cond.config)}`;
  }
}

/**
 * Serialize an IRActionNode[] to a deterministic comparison string.
 *
 * Used to detect whether per-instance action trees are identical (no mux
 * needed) or divergent (mux needed). Recursive for nested action lists.
 */
function actionFingerprint(actions: IRActionNode[]): string {
  return actions.map(a => singleActionFingerprint(a)).join(';');
}

function singleActionFingerprint(action: IRActionNode): string {
  switch (action.kind) {
    case 'action:native':
      return `N:${action.domain}.${action.operation}:${JSON.stringify(action.config)}`;
    case 'action:ha_service':
      return `HA:${action.action}:${action.data ? Object.entries(action.data).map(([k, v]) => `${k}=${actionParamFingerprint(v)}`).join(',') : ''}`;
    case 'action:logger':
      return `LOG:${action.message}:${action.level ?? ''}`;
    case 'action:delay':
      return `DL:${JSON.stringify(action.duration)}`;
    case 'action:wait_until':
      return `WU:${conditionFingerprint(action.condition)}:${action.timeout ? JSON.stringify(action.timeout) : ''}`;
    case 'action:if':
      return `IF:${conditionFingerprint(action.condition)}:(${actionFingerprint(action.then)})${action.else ? `:(${actionFingerprint(action.else)})` : ''}`;
    case 'action:while':
      return `WH:${conditionFingerprint(action.condition)}:(${actionFingerprint(action.then)})`;
    case 'action:repeat':
      return `RP:${action.count}:(${actionFingerprint(action.then)})`;
    case 'action:script_execute':
      return `SE:${action.scriptId}`;
    case 'action:script_wait':
      return `SW:${action.scriptId}`;
    case 'action:script_stop':
      return `SS:${action.scriptId}`;
    case 'action:theme_select':
      return `TS:${action.scopeId}:${action.themeName}`;
    case 'action:global_set':
      return `GS:${action.globalId}:${actionParamFingerprint(action.value)}`;
    case 'action:array_set':
      return `AS:${action.globalId}:${actionParamFingerprint(action.index)}:${actionParamFingerprint(action.value)}`;
    case 'action:array_push':
      return `AP:${action.globalId}:${actionParamFingerprint(action.value)}`;
    case 'action:array_clear':
      return `AC:${action.globalId}`;
    case 'action:lambda_action':
      return `LA:${action.fragments.join('|')}:${action.slots.map(s => `${s.kind}:${'name' in s ? s.name : 'value' in s ? String(s.value) : 'id' in s ? s.id : ''}`).join(',')}`;
    case 'action:overlay_show': {
      const idx = typeof action.instanceIndex === 'number'
        ? String(action.instanceIndex)
        : `param:${action.instanceIndex.name}`;
      return `PS:${action.templateKey}:${idx}:${action.controllerRef ?? ''}`;
    }
    case 'action:overlay_hide':
      return `PD:${action.templateKey}:${action.controllerRef ?? ''}`;
    case 'action:controller_method_call':
      return `CM:${action.controllerRef}:${action.methodName}`;
  }
}

/**
 * Process overlay definitions to build mux signals and muxed bindings.
 *
 * @param overlays     Overlay definitions with per-instance captured bindings
 * @param signalOffset Starting signal index for mux signals (after HA entity signals)
 * @returns            Mux processing result to merge into runtime config
 */
export function processOverlayMux(
  overlays: OverlayDefinition[],
  signalOffset: number,
): OverlayMuxResult {
  const muxSignals: SignalDecl[] = [];
  const muxedBindings: IRBinding[] = [];
  const additionalReactiveNodes: IRReactiveNode[] = [];
  const muxSignalIndices = new Map<number, string>();
  const muxedActions = new Map<string, IRActionNode[]>();
  const tables: TableDecl[] = [];

  let nextSignalIndex = signalOffset;

  for (const def of overlays) {
    if (def.instances.length === 0) continue;

    // Create mux signal for this overlay template
    const muxSignalName = `sig_${def.templateKey}_mux`;
    const muxSignalIndex = nextSignalIndex++;
    muxSignals.push({ name: muxSignalName, cppType: 'int32_t' });
    muxSignalIndices.set(muxSignalIndex, muxSignalName);

    // Gather per-instance bindings
    const instanceBindings = def.instances.map(inst => inst.capturedBindings ?? []);
    const instanceReactiveNodes = def.instances.map(inst => inst.capturedReactiveNodes ?? []);

    // Collect reactive nodes from all instances
    for (const nodes of instanceReactiveNodes) {
      additionalReactiveNodes.push(...nodes);
    }

    // Instance 0's bindings define the canonical set
    const canonicalBindings = instanceBindings[0];
    if (!canonicalBindings || canonicalBindings.length === 0) continue;

    // If only one instance, no mux needed — use instance 0's bindings as-is
    if (def.instances.length === 1) {
      muxedBindings.push(...canonicalBindings);
      continue;
    }

    // Zip bindings positionally across instances
    for (let i = 0; i < canonicalBindings.length; i++) {
      const binding0 = canonicalBindings[i];

      // Gather corresponding binding from each instance at the same position
      const perInstanceExprs: IRExpression[] = [];
      let allIdentical = true;
      const fp0 = (binding0.expression.exprIR)
        ? exprFingerprint(binding0.expression.exprIR)
        : '';

      for (let j = 0; j < instanceBindings.length; j++) {
        const bindings = instanceBindings[j];
        if (i < bindings.length && bindings[i].expression.exprIR) {
          const expr = bindings[i].expression.exprIR!;
          perInstanceExprs.push(expr);
          if (j > 0 && exprFingerprint(expr) !== fp0) {
            allIdentical = false;
          }
        }
      }

      if (allIdentical || perInstanceExprs.length <= 1) {
        // All instances produce the same expression — no mux needed
        muxedBindings.push(binding0);
      } else {
        // Divergent expressions — try structural analysis before falling
        // back to full mux wrapping
        const exprType: ExprType = binding0.expression.exprType ?? 'int';
        const muxIndexExpr: IRExpression = { kind: 'expr:signal_read', signalIndex: muxSignalIndex };

        const structural = analyzeExprStructure(perInstanceExprs);
        let optimisedExpr: IRExpression | null = null;

        if (structural.kind === 'optimizable') {
          // Build replacement nodes for each hole
          const replacements = new Map<number, IRExpression>();
          for (const hole of structural.holes) {
            if (hole.holeKind === 'literal') {
              // Create a static data table for these literal values
              const tableName = `tbl_${def.templateKey}_${tables.length}`;
              const cppType = exprTypeToCpp(hole.type);
              const cppArrayElemType = cppType === 'std::string' ? 'const char*' : cppType;
              tables.push({
                name: tableName,
                elementCppType: cppArrayElemType,
                values: hole.values.map(v => formatTableLiteral(v, cppArrayElemType)),
              });
              replacements.set(hole.holeId, {
                kind: 'expr:table_lookup',
                index: muxIndexExpr,
                table: tableName,
                elementType: hole.type,
              });
            } else {
              // signal_read hole → localized mux over only the varying signals
              replacements.set(hole.holeId, {
                kind: 'expr:mux',
                index: muxIndexExpr,
                cases: hole.signalIndices.map(idx => ({ kind: 'expr:signal_read', signalIndex: idx }) as IRExpression),
                type: hole.type,
              });
            }
          }
          // Reconstruct the template, replacing slot sentinels with
          // table_lookup / localized mux nodes
          optimisedExpr = resolveSlots(structural.template, replacements);
        }

        // Use the optimised expression if available, otherwise fall back
        // to full mux wrapping (current behaviour)
        const finalExpr: IRExpression = optimisedExpr ?? {
          kind: 'expr:mux',
          type: exprType,
          index: muxIndexExpr,
          cases: perInstanceExprs,
        };

        // Create a new binding with the muxed/optimised expression.
        // Add the mux signal as an additional dependency so the reactive
        // graph wires the Effect to this signal.
        const muxDep = {
          kind: 'dependency' as const,
          sourceId: muxSignalName,
          sourceType: 'overlay_mux' as const,
        };
        const muxedBinding: IRBinding = {
          ...binding0,
          expression: {
            ...binding0.expression,
            exprIR: finalExpr,
            dependencies: [
              ...(binding0.expression.dependencies ?? []),
              muxDep,
            ],
          },
        } as IRBinding;
        muxedBindings.push(muxedBinding);
      }
    }

    // ── Action muxing ──────────────────────────────────────────────────────
    // Walk per-instance captured actions (trigger handlers) positionally.
    // If all instances share identical actions, keep as-is. If divergent,
    // try structural analysis for table-driven optimization, then fall back
    // to a muxed dispatch (chain of IRIfAction nodes).
    const instanceActions = def.instances.map(inst => inst.capturedActions ?? []);
    const canonicalActions = instanceActions[0];
    if (canonicalActions && canonicalActions.length > 0 && def.instances.length > 1) {
      for (let i = 0; i < canonicalActions.length; i++) {
        const action0 = canonicalActions[i];
        const fp0 = actionFingerprint(action0.rawActions);

        let allIdentical = true;
        for (let j = 1; j < instanceActions.length; j++) {
          const actions = instanceActions[j];
          if (i < actions.length && actionFingerprint(actions[i].rawActions) !== fp0) {
            allIdentical = false;
            break;
          }
        }

        if (!allIdentical) {
          // Gather the rawActions for this position across all instances
          const perInstanceRawActions = instanceActions.map(inst =>
            i < inst.length ? inst[i].rawActions : [],
          );

          // Try structural analysis first
          const actionStructural = analyzeActionStructure(perInstanceRawActions);
          if (actionStructural.kind === 'optimizable') {
            // Create table-driven actions: replace varying params with
            // reactive_expr params containing table_lookup expressions
            const muxIndexExpr: IRExpression = { kind: 'expr:signal_read', signalIndex: muxSignalIndex };
            const optimisedActions = actionStructural.templateActions.map(tmplAction => {
              if (tmplAction.kind !== 'action:ha_service' || !tmplAction.data) return tmplAction;

              const newData: Record<string, IRExpression> = { ...tmplAction.data };
              for (const hole of actionStructural.varyingParams) {
                // Extract param key from paramPath (e.g. "data.entity_id" → "entity_id")
                const paramKey = hole.paramPath.replace(/^data\./, '');
                if (!(paramKey in newData)) continue;

                const tableName = `tbl_${def.templateKey}_act_${tables.length}`;
                const cppType = exprTypeToCpp(hole.type);
                const cppArrayElemType = cppType === 'std::string' ? 'const char*' : cppType;
                tables.push({
                  name: tableName,
                  elementCppType: cppArrayElemType,
                  values: hole.values.map((v: string | number | boolean) => formatTableLiteral(v, cppArrayElemType)),
                });
                newData[paramKey] = {
                  kind: 'expr:table_lookup',
                  index: muxIndexExpr,
                  table: tableName,
                  elementType: hole.type,
                };
              }
              return { ...tmplAction, data: newData } as IRActionNode;
            });
            muxedActions.set(`${def.templateKey}:${i}`, optimisedActions);
          } else {
            // Fallback: build muxed dispatch if-chain
            const muxedActionList: IRActionNode[] = [];
            for (let j = 0; j < instanceActions.length; j++) {
              const instActions = instanceActions[j];
              if (i >= instActions.length) continue;
              const condition: IRCondition = {
                kind: 'lambda_condition',
                exprIR: irBinary(
                  '==',
                  { kind: 'expr:signal_read', signalIndex: muxSignalIndex },
                  { kind: 'expr:literal', value: j, type: 'int' },
                ),
              };
              muxedActionList.push({
                kind: 'action:if',
                condition,
                then: instActions[i].rawActions,
              });
            }
            muxedActions.set(`${def.templateKey}:${i}`, muxedActionList);
          }
        }
      }
    }
  }

  return {
    muxSignals,
    muxedBindings,
    additionalReactiveNodes,
    muxSignalIndices,
    muxedActions,
    tables,
  };
}

// ── Helper: resolve slot sentinels in a template tree ────────────────────────

/**
 * Walk an expression template produced by `analyzeExprStructure` and replace
 * each `slot` sentinel with the corresponding replacement node.
 */
function resolveSlots(
  template: IRExpression,
  replacements: Map<number, IRExpression>,
): IRExpression {
  if (template.kind === 'expr:slot') {
    const replacement = replacements.get(template.slotIndex);
    if (!replacement) {
      throw new Error(`resolveSlots: no replacement for slot ${template.slotIndex}`);
    }
    return replacement;
  }
  return mapExprChildren(template, child => resolveSlots(child, replacements));
}

// ── Helper: format a literal value as a C++ array element ────────────────────

function formatTableLiteral(value: string | number | boolean, cppType: string): string {
  if (cppType === 'const char*' || cppType === 'char* const') {
    return `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  }
  if (cppType === 'bool') return value ? 'true' : 'false';
  if (cppType === 'float') return `${Number(value)}f`;
  return String(value);
}
