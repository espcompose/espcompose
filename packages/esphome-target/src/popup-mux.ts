// ────────────────────────────────────────────────────────────────────────────
// Popup mux processing — Table-driven codegen for shared popup widgets
//
// Takes PopupDefinition[] (with per-instance captured bindings from Phase 4)
// and produces:
//   - Mux signal declarations (one Signal<int32_t> per popup template)
//   - Muxed widget bindings (instance 0's bindings with divergent values
//     wrapped in IRExprMux / IRExprTableLookup)
//   - Additional memos for per-instance reactive nodes
//
// The processing flow:
//   1. For each popup definition, create a mux signal
//   2. Zip bindings positionally across instances (structure is identical)
//   3. For each binding position:
//      a. If expressions are identical across all instances → keep as-is
//      b. If they differ → wrap in mux expression
//   4. Return signals + modified bindings + reactive nodes for the codegen
// ────────────────────────────────────────────────────────────────────────────

import type { PopupDefinition } from '@espcompose/core/internals';
import type { IRExprNode, ExprType } from '@espcompose/core/internals';
import type { IRActionNode, IRActionParam, IRCondition } from '@espcompose/core/internals';
import type { IRBinding } from '@espcompose/core/internals';
import type { IRReactiveNode } from '@espcompose/core';
import { analyzeExprStructure, analyzeActionStructure } from '@espcompose/core/internals';
import { mapExprChildren } from '@espcompose/core/internals';
import type { SignalDecl, TableDecl } from './bindings-codegen.js';
import { exprTypeToCpp } from './expr-to-cpp.js';

/** Result of popup mux processing, to be merged into the main runtime config. */
export interface PopupMuxResult {
  /** One mux signal per popup template (Signal<int32_t>). */
  muxSignals: SignalDecl[];
  /** Muxed widget bindings — instance 0's bindings with divergent values wrapped. */
  muxedBindings: IRBinding[];
  /** Per-instance reactive nodes that need to be included in the memo pipeline. */
  additionalReactiveNodes: IRReactiveNode[];
  /** Mux signal index → name mapping for the CppLoweringContext. */
  muxSignalIndices: Map<number, string>;
  /**
   * Muxed action replacements for trigger handlers inside popup widgets.
   * Maps sequential action position (within each popup template) to the
   * muxed `IRActionNode[]` that should replace the original.  Keyed by
   * `templateKey:position`.
   */
  muxedActions: Map<string, IRActionNode[]>;
  /** Static data tables created by table-driven optimisations. */
  tables: TableDecl[];
}

/**
 * Serialize an IRExprNode to a deterministic comparison string.
 *
 * Used to detect whether per-instance binding expressions are identical
 * (no mux needed) or divergent (mux needed). This doesn't need to be
 * a valid C++ expression — just a stable, deterministic representation
 * for equality comparison.
 */
function exprFingerprint(expr: IRExprNode): string {
  switch (expr.kind) {
    case 'literal':
      return `L:${typeof expr.value}:${String(expr.value)}`;
    case 'signal_read':
      return `S:${expr.signalIndex}`;
    case 'memo_read':
      return `M:${expr.memoId}`;
    case 'theme_read':
      return `T:${expr.scopeId}:${expr.path}`;
    case 'binary':
      return `B:${expr.op}:(${exprFingerprint(expr.left)},${exprFingerprint(expr.right)})`;
    case 'unary':
      return `U:${expr.op}:(${exprFingerprint(expr.operand)})`;
    case 'postfix':
      return `PF:${expr.op}:(${exprFingerprint(expr.operand)})`;
    case 'ternary':
      return `?:(${exprFingerprint(expr.test)},${exprFingerprint(expr.consequent)},${exprFingerprint(expr.alternate)})`;
    case 'call':
      return `C:${expr.fn}:(${expr.args.map(exprFingerprint).join(',')})`;
    case 'concat':
      return `+:(${expr.parts.map(exprFingerprint).join(',')})`;
    case 'to_string':
      return `str:(${exprFingerprint(expr.expr)}${expr.format ? `:${expr.format}` : ''})`;
    case 'group':
      return `G:(${exprFingerprint(expr.expr)})`;
    case 'slot':
      return `SL:${expr.slotIndex}`;
    case 'resolve_font':
      return `RF:(${exprFingerprint(expr.family)},${exprFingerprint(expr.size)})`;
    case 'mux':
      return `MUX:(${exprFingerprint(expr.index)},${expr.cases.map(exprFingerprint).join(',')})`;
    case 'table_lookup':
      return `TBL:${expr.table}:(${exprFingerprint(expr.index)})`;
    case 'entity_prop':
      return `EP:${expr.entityId}:${expr.property}`;
    case 'global_read':
      return `GL:${expr.globalId}`;
    case 'component_read':
      return `CR:${expr.componentId}:${expr.sensorIndex}`;
    case 'trigger_var':
      return `TV:${expr.name}`;
    case 'type_cast':
      return `TC:${expr.fromType}->${expr.toType}:(${exprFingerprint(expr.expr)})`;
    case 'format_string':
      return `FS:${expr.format}:(${exprFingerprint(expr.expr)})`;
    case 'null_coalesce':
      return `NC:(${exprFingerprint(expr.left)},${exprFingerprint(expr.right)})`;
    case 'string_method':
      return `SM:${expr.method}:(${exprFingerprint(expr.object)},${expr.args.map(exprFingerprint).join(',')})`;
    case 'array_index':
      return `AI:(${exprFingerprint(expr.array)},${exprFingerprint(expr.index)})`;
    case 'array_method':
      return `AM:${expr.method}:(${exprFingerprint(expr.object)},${expr.args.map(exprFingerprint).join(',')})`;
  }
}

/**
 * Serialize an IRActionParam to a deterministic comparison string.
 */
function actionParamFingerprint(param: IRActionParam | string | number | boolean): string {
  if (typeof param !== 'object' || param === null) return `P:${typeof param}:${String(param)}`;
  switch (param.kind) {
    case 'literal':
      return `PL:${typeof param.value}:${String(param.value)}`;
    case 'trigger_var':
      return `PT:${param.varName}`;
    case 'expression':
      return `PE:${param.jsExpression}`;
    case 'reactive_expr':
      return `PR:${exprFingerprint(param.exprIR)}`;
  }
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
    case 'native':
      return `N:${action.actionKey}:${JSON.stringify(action.config)}`;
    case 'ha_service':
      return `HA:${action.action}:${action.data ? Object.entries(action.data).map(([k, v]) => `${k}=${actionParamFingerprint(v)}`).join(',') : ''}`;
    case 'logger':
      return `LOG:${action.message}:${action.level ?? ''}`;
    case 'delay':
      return `DL:${action.duration}`;
    case 'wait_until':
      return `WU:${conditionFingerprint(action.condition)}:${action.timeout ?? ''}`;
    case 'if':
      return `IF:${conditionFingerprint(action.condition)}:(${actionFingerprint(action.then)})${action.else ? `:(${actionFingerprint(action.else)})` : ''}`;
    case 'while':
      return `WH:${conditionFingerprint(action.condition)}:(${actionFingerprint(action.then)})`;
    case 'repeat':
      return `RP:${action.count}:(${actionFingerprint(action.then)})`;
    case 'script_execute':
      return `SE:${action.scriptId}`;
    case 'script_wait':
      return `SW:${action.scriptId}`;
    case 'script_stop':
      return `SS:${action.scriptId}`;
    case 'theme_select':
      return `TS:${action.scopeId}:${action.themeName}`;
    case 'global_set':
      return `GS:${action.globalId}:${actionParamFingerprint(action.value as IRActionParam)}`;
    case 'array_set':
      return `AS:${action.globalId}:${actionParamFingerprint(action.index as IRActionParam)}:${actionParamFingerprint(action.value as IRActionParam)}`;
    case 'array_push':
      return `AP:${action.globalId}:${actionParamFingerprint(action.value as IRActionParam)}`;
    case 'array_clear':
      return `AC:${action.globalId}`;
    case 'lambda_action':
      return `LA:${action.fragments.join('|')}:${action.slots.map(s => `${s.kind}:${'name' in s ? s.name : 'value' in s ? String(s.value) : 'id' in s ? s.id : ''}`).join(',')}`;
    case 'popup_show':
      return `PS:${action.templateKey}:${action.instanceIndex}:${action.controllerRef ?? ''}`;
    case 'popup_dismiss':
      return `PD:${action.templateKey}:${action.controllerRef ?? ''}`;
  }
}

/**
 * Process popup definitions to build mux signals and muxed bindings.
 *
 * @param popups       Popup definitions with per-instance captured bindings
 * @param signalOffset Starting signal index for mux signals (after HA entity signals)
 * @returns            Mux processing result to merge into runtime config
 */
export function processPopupMux(
  popups: PopupDefinition[],
  signalOffset: number,
): PopupMuxResult {
  const muxSignals: SignalDecl[] = [];
  const muxedBindings: IRBinding[] = [];
  const additionalReactiveNodes: IRReactiveNode[] = [];
  const muxSignalIndices = new Map<number, string>();
  const muxedActions = new Map<string, IRActionNode[]>();
  const tables: TableDecl[] = [];

  let nextSignalIndex = signalOffset;

  for (const def of popups) {
    if (def.instances.length === 0) continue;

    // Create mux signal for this popup template
    const muxSignalName = `sig_popup_${def.templateKey}_mux`;
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
      const perInstanceExprs: IRExprNode[] = [];
      let allIdentical = true;
      const fp0 = binding0.expression.exprIR
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
        const muxIndexExpr: IRExprNode = { kind: 'signal_read', signalIndex: muxSignalIndex };

        const structural = analyzeExprStructure(perInstanceExprs);
        let optimisedExpr: IRExprNode | null = null;

        if (structural.kind === 'optimizable') {
          // Build replacement nodes for each hole
          const replacements = new Map<number, IRExprNode>();
          for (const hole of structural.holes) {
            if (hole.holeKind === 'literal') {
              // Create a static data table for these literal values
              const tableName = `tbl_popup_${def.templateKey}_${tables.length}`;
              const cppType = exprTypeToCpp(hole.type);
              const cppArrayElemType = cppType === 'std::string' ? 'const char*' : cppType;
              tables.push({
                name: tableName,
                elementCppType: cppArrayElemType,
                values: hole.values.map(v => formatTableLiteral(v, cppArrayElemType)),
              });
              replacements.set(hole.holeId, {
                kind: 'table_lookup',
                index: muxIndexExpr,
                table: tableName,
                elementType: hole.type,
              });
            } else {
              // signal_read hole → localized mux over only the varying signals
              replacements.set(hole.holeId, {
                kind: 'mux',
                index: muxIndexExpr,
                cases: hole.signalIndices.map(idx => ({ kind: 'signal_read', signalIndex: idx }) as IRExprNode),
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
        const finalExpr: IRExprNode = optimisedExpr ?? {
          kind: 'mux',
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
          triggerType: 'on_value',
          sourceDomain: 'popup_mux',
          sourceType: 'popup_mux' as const,
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
            const muxIndexExpr: IRExprNode = { kind: 'signal_read', signalIndex: muxSignalIndex };
            const optimisedActions = actionStructural.templateActions.map(tmplAction => {
              if (tmplAction.kind !== 'ha_service' || !tmplAction.data) return tmplAction;

              const newData: Record<string, IRActionParam> = { ...tmplAction.data };
              for (const hole of actionStructural.varyingParams) {
                // Extract param key from paramPath (e.g. "data.entity_id" → "entity_id")
                const paramKey = hole.paramPath.replace(/^data\./, '');
                if (!(paramKey in newData)) continue;

                const tableName = `tbl_popup_${def.templateKey}_act_${tables.length}`;
                const cppType = exprTypeToCpp(hole.type);
                const cppArrayElemType = cppType === 'std::string' ? 'const char*' : cppType;
                tables.push({
                  name: tableName,
                  elementCppType: cppArrayElemType,
                  values: hole.values.map((v: string | number | boolean) => formatTableLiteral(v, cppArrayElemType)),
                });
                newData[paramKey] = {
                  kind: 'reactive_expr',
                  exprIR: {
                    kind: 'table_lookup',
                    index: muxIndexExpr,
                    table: tableName,
                    elementType: hole.type,
                  },
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
                exprIR: {
                  kind: 'binary',
                  op: '==',
                  left: { kind: 'signal_read', signalIndex: muxSignalIndex },
                  right: { kind: 'literal', value: j, type: 'int' },
                },
              };
              muxedActionList.push({
                kind: 'if',
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
  template: IRExprNode,
  replacements: Map<number, IRExprNode>,
): IRExprNode {
  if (template.kind === 'slot') {
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
