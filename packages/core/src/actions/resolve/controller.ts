// ────────────────────────────────────────────────────────────────────────────
// Controller method call resolution
//
// When the action compiler encounters `ctrl.show()` on a CONTROLLER_BRAND-typed
// value, it emits `controller_method_call` IR actions with the controller's
// variable name and the method name. These helpers resolve them from
// `__refBindings` at serialization time, replacing each with `script_execute`.
// ────────────────────────────────────────────────────────────────────────────

import type { IRActionNode } from '../../ir/action-types';
import { irScriptExecute } from '../../ir/action-types';
import type { ScriptHandle } from '../../hooks/useScript';
import { RESOLVE_METHOD_CALL } from './symbols';
import type { MethodCallResolvable } from './symbols';
import { CLOSURE_INDEX } from '../closure/symbols';

/** Shape of a controller's hidden internal fields. */
interface ControllerInternal {
  __scripts: Record<string, ScriptHandle & { [CLOSURE_INDEX]?: number }>;
}

function isController(v: unknown): v is ControllerInternal {
  return v != null && typeof v === 'object' && '__scripts' in (v as Record<string, unknown>);
}

function hasMethodCallResolver(v: unknown): v is MethodCallResolvable {
  return v != null && typeof v === 'object' && RESOLVE_METHOD_CALL in (v as object);
}

/**
 * Resolve deferred controller method call references in a compiled action tree.
 *
 * Walks the action tree and replaces `controller_method_call` placeholders with
 * `script_execute` actions using the ScriptHandle found in the controller's
 * `__scripts` map.
 */
export function resolveControllerMethodCalls(
  actions: IRActionNode[],
  refBindings?: Record<string, unknown>,
): void {
  if (!refBindings) return;

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    if (action.kind === 'action:controller_method_call') {
      const ctrl = refBindings[action.controllerRef];
      if (isController(ctrl)) {
        const handle = ctrl.__scripts[action.methodName];
        if (handle) {
          actions[i] = irScriptExecute(handle.id, {
            closureIndex: (handle as { [CLOSURE_INDEX]?: number })[CLOSURE_INDEX],
          });
        }
      } else if (hasMethodCallResolver(ctrl)) {
        // Delegate to the value's own resolution protocol. The returned
        // actions are domain-specific intermediate IR (e.g. overlay_show)
        // that subsequent resolver passes finalise.
        const replacement = ctrl[RESOLVE_METHOD_CALL](action.methodName, action.controllerRef);
        actions.splice(i, 1, ...replacement);
        i--; // re-visit newly inserted actions
      }
    } else if (action.kind === 'action:if') {
      resolveControllerMethodCalls(action.then, refBindings);
      if (action.else) resolveControllerMethodCalls(action.else, refBindings);
    } else if (action.kind === 'action:while' || action.kind === 'action:repeat') {
      resolveControllerMethodCalls(action.then, refBindings);
    }
  }
}

/**
 * Remove resolved controller objects from refBindings.
 *
 * After resolving controller method calls, the controller objects in
 * refBindings must be removed so they don't corrupt lambda strings during
 * ref resolution (controller.toString() → '[object Object]' would break).
 *
 * Removes both standard `useController()` results (`__scripts`) and any
 * value implementing the `RESOLVE_METHOD_CALL` protocol, so new protocol
 * implementors are cleaned up automatically without a dedicated clean function.
 */
export function cleanControllerRefs(
  refBindings: Record<string, unknown>,
): void {
  for (const key of Object.keys(refBindings)) {
    const val = refBindings[key];
    if (isController(val) || hasMethodCallResolver(val)) {
      delete refBindings[key];
    }
  }
}
