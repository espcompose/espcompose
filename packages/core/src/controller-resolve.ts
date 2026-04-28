// ────────────────────────────────────────────────────────────────────────────
// Controller method call resolution
//
// When the action compiler encounters `ctrl.show()` on a CONTROLLER_BRAND-typed
// value, it emits `controller_method_call` IR actions with the controller's
// variable name and the method name. These helpers resolve them from
// `__refBindings` at serialization time, replacing each with `script_execute`.
// ────────────────────────────────────────────────────────────────────────────

import type { IRActionNode } from './ir/action-types';
import { irScriptExecute } from './ir/action-types';
import type { ScriptHandle } from './hooks/useScript';

/** Shape of a controller's hidden internal fields. */
interface ControllerInternal {
  __scripts: Record<string, ScriptHandle & { __closureIndex?: number }>;
}

function isController(v: unknown): v is ControllerInternal {
  return v != null && typeof v === 'object' && '__scripts' in (v as Record<string, unknown>);
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

    if (action.kind === 'controller_method_call') {
      const ctrl = refBindings[action.controllerRef];
      if (isController(ctrl)) {
        const handle = ctrl.__scripts[action.methodName];
        if (handle) {
          actions[i] = irScriptExecute(handle.id, {
            closureIndex: (handle as { __closureIndex?: number }).__closureIndex,
          });
        }
      }
    } else if (action.kind === 'if') {
      resolveControllerMethodCalls(action.then, refBindings);
      if (action.else) resolveControllerMethodCalls(action.else, refBindings);
    } else if (action.kind === 'while' || action.kind === 'repeat') {
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
 */
export function cleanControllerRefs(
  refBindings: Record<string, unknown>,
): void {
  for (const key of Object.keys(refBindings)) {
    const val = refBindings[key];
    if (isController(val)) {
      delete refBindings[key];
    }
  }
}
