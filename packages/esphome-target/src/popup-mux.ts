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
import type { IRActionNode, IRCondition } from '@espcompose/core/internals';
import type { SignalDecl } from './bindings-codegen.js';

/** Result of popup mux processing, to be merged into the main runtime config. */
export interface PopupMuxResult {
  /** One mux signal per popup template (Signal<int32_t>). */
  muxSignals: SignalDecl[];
  /** Muxed widget bindings — instance 0's bindings with divergent values wrapped. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  muxedBindings: any[];
  /** Per-instance reactive nodes that need to be included in the memo pipeline. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  additionalReactiveNodes: any[];
  /** Mux signal index → name mapping for the CppLoweringContext. */
  muxSignalIndices: Map<number, string>;
  /**
   * Muxed action replacements for trigger handlers inside popup widgets.
   * Maps sequential action position (within each popup template) to the
   * muxed `IRActionNode[]` that should replace the original.  Keyed by
   * `templateKey:position`.
   */
  muxedActions: Map<string, IRActionNode[]>;
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
    case 'ternary':
      return `?:(${exprFingerprint(expr.test)},${exprFingerprint(expr.consequent)},${exprFingerprint(expr.alternate)})`;
    case 'call':
      return `C:${expr.fn}:(${expr.args.map(exprFingerprint).join(',')})`;
    case 'concat':
      return `+:(${expr.parts.map(exprFingerprint).join(',')})`;
    case 'to_string':
      return `str:(${exprFingerprint(expr.expr)})`;
    case 'group':
      return `G:(${exprFingerprint(expr.expr)})`;
    case 'mux':
      return `MUX:(${exprFingerprint(expr.index)},${expr.cases.map(exprFingerprint).join(',')})`;
    case 'table_lookup':
      return `TBL:${expr.table}:(${exprFingerprint(expr.index)})`;
    case 'entity_prop':
      return `EP:${expr.entityId}:${expr.property}`;
    case 'global_read':
      return `GL:${expr.globalId}`;
    default:
      // Deterministic fallback for any remaining kinds (e.g. type_cast, slot, etc.)
      return `${(expr as { kind: string }).kind}:${JSON.stringify(expr)}`;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const muxedBindings: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const additionalReactiveNodes: any[] = [];
  const muxSignalIndices = new Map<number, string>();
  const muxedActions = new Map<string, IRActionNode[]>();

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
        // Divergent expressions — wrap in mux
        const exprType: ExprType = binding0.expression.exprType ?? 'int';
        const muxExpr: IRExprNode = {
          kind: 'mux',
          type: exprType,
          index: { kind: 'signal_read', signalIndex: muxSignalIndex },
          cases: perInstanceExprs,
        };

        // Create a new binding with the muxed expression.
        // Add the mux signal as an additional dependency so the reactive
        // graph wires the Effect to this signal.
        const muxDep = {
          kind: 'dependency' as const,
          sourceId: muxSignalName,
          triggerType: 'on_value',
          sourceDomain: 'popup_mux',
          sourceType: 'popup_mux' as const,
        };
        const muxedBinding = {
          ...binding0,
          expression: {
            ...binding0.expression,
            exprIR: muxExpr,
            dependencies: [
              ...(binding0.expression.dependencies ?? []),
              muxDep,
            ],
          },
        };
        muxedBindings.push(muxedBinding);
      }
    }

    // ── Action muxing ──────────────────────────────────────────────────────
    // Walk per-instance captured actions (trigger handlers) positionally.
    // If all instances share identical actions, keep as-is. If divergent,
    // build a muxed dispatch: a chain of IRIfAction nodes where each checks
    // `mux_signal == instanceIndex` and executes that instance's actions.
    const instanceActions = def.instances.map(inst => inst.capturedActions ?? []);
    const canonicalActions = instanceActions[0];
    if (canonicalActions && canonicalActions.length > 0 && def.instances.length > 1) {
      for (let i = 0; i < canonicalActions.length; i++) {
        const action0 = canonicalActions[i];
        const fp0 = JSON.stringify(action0.rawActions);

        let allIdentical = true;
        for (let j = 1; j < instanceActions.length; j++) {
          const actions = instanceActions[j];
          if (i < actions.length && JSON.stringify(actions[i].rawActions) !== fp0) {
            allIdentical = false;
            break;
          }
        }

        if (!allIdentical) {
          // Build muxed dispatch: if(mux==0) {inst0 actions} if(mux==1) {inst1 actions} ...
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

  return {
    muxSignals,
    muxedBindings,
    additionalReactiveNodes,
    muxSignalIndices,
    muxedActions,
  };
}
