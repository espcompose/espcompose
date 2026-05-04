// ────────────────────────────────────────────────────────────────────────────
// useController — script-backed controller pattern
//
// Takes a map of method names → ScriptHandle values and returns a branded
// controller object. Calling `ctrl.show()` compiles to `controller_method_call`
// IR, which is resolved to `script_execute` at serialization time.
//
// Usage:
//   const ctrl = useController<VisibilityController>({
//     show: showScript,
//     hide: hideScript,
//   });
//   // In a trigger handler: ctrl.show() → script_execute
// ────────────────────────────────────────────────────────────────────────────

import { assertHookContext } from './useState';
import { throwCompileTimeOnly } from '../errors';
import type { ScriptHandle } from './useScript';
import type { BINDING_BRAND, CONTROLLER_BRAND } from '../types';

// ── Types ───────────────────────────────────────────────────────────────────

/**
 * Maps each `() => void` method on `T` to a `ScriptHandle`.
 * Only methods with no parameters and void return are eligible.
 */
export type ControllerScriptMap<T> = {
  [K in keyof T as T[K] extends () => void ? K : never]: ScriptHandle;
};

/**
 * A branded controller whose methods are backed by scripts.
 * Carries both `BINDING_BRAND` (for ESLint whitelist) and
 * `CONTROLLER_BRAND` (for compiler dispatch).
 */
export type Controller<T> = T & {
  readonly [BINDING_BRAND]?: true;
  readonly [CONTROLLER_BRAND]?: true;
};

// ── Internal shape ──────────────────────────────────────────────────────────

/** Hidden fields on a controller object, read at serialization time. */
export interface ControllerInternal {
  __scripts: Record<string, ScriptHandle>;
}

// ── Hook ────────────────────────────────────────────────────────────────────

/**
 * Create a script-backed controller.
 *
 * Each method in the controller maps to a ScriptHandle. When the action
 * compiler encounters `ctrl.method()`, it emits `controller_method_call` IR.
 * At serialization time, the resolver looks up the ScriptHandle from
 * `__scripts` and replaces with `script_execute`.
 *
 * Must be called inside a function component body (render pass).
 */
export function useController<T>(
  scripts: ControllerScriptMap<T>,
): Controller<T> {
  assertHookContext('useController()');

  const methods: Record<string, () => void> = {};
  for (const key of Object.keys(scripts) as Array<keyof typeof scripts & string>) {
    methods[key] = () => {
      throwCompileTimeOnly(`controller.${key}()`, 'Controller actions');
    };
  }

  const controller = {
    ...methods,
    __scripts: scripts as unknown as Record<string, ScriptHandle>,
  } as unknown as Controller<T>;

  return controller;
}
