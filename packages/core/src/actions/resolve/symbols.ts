// ────────────────────────────────────────────────────────────────────────────
// Protocol symbol for controller method call resolution
//
// When the action compiler encounters `ctrl.method()` on a
// CONTROLLER_BRAND-typed value, it emits `controller_method_call` IR.
// At resolution time, `resolveControllerMethodCalls` checks
// `CONTROLLER_SCRIPTS` first (standard `useController()` path). If that fails, it falls back
// to this protocol symbol — any runtime value that implements
// `RESOLVE_METHOD_CALL` can self-resolve its method calls into domain-
// specific IR actions (e.g. overlay show/hide, future controller types).
//
// This avoids hardcoding domain-specific knowledge (overlay, toast, etc.)
// in the generic controller resolver.
// ────────────────────────────────────────────────────────────────────────────

import type { IRActionNode } from '../../ir/action-types';

/**
 * Protocol symbol for self-resolving controller method calls.
 *
 * Attach this to any runtime controller-like object so that
 * `resolveControllerMethodCalls` can delegate resolution without
 * knowing the concrete controller type.
 */
export const RESOLVE_METHOD_CALL: unique symbol = Symbol('resolve_method_call');

/**
 * Interface for values that implement the method-call resolution protocol.
 *
 * The returned `IRActionNode[]` replaces the `controller_method_call` node
 * in the action tree. The output may be intermediate IR (e.g.
 * `overlay_show` with `controllerRef`) that a subsequent domain-specific
 * resolver pass finalises.
 */
export interface MethodCallResolvable {
  [RESOLVE_METHOD_CALL](methodName: string, controllerRef: string): IRActionNode[];
}

/**
 * Symbol-keyed script map, attached to controller objects by
 * `useController()`. The resolve pass reads this to map
 * `controller_method_call` IR → `script_execute` IR.
 */
export const CONTROLLER_SCRIPTS: unique symbol = Symbol('controller.scripts');
