// ────────────────────────────────────────────────────────────────────────────
// Hook path tracking — render scope guard
//
// Hooks may only be called during a render pass (inside withScriptScope).
// setCurrentHookPath() is called by withScriptScope() to establish context.
// assertHookContext() guards that hooks are called inside a render pass.
// ────────────────────────────────────────────────────────────────────────────

let _currentHookPath: string | null = null;

export function setCurrentHookPath(path: string | null): void {
  _currentHookPath = path;
}

/**
 * Assert that we are inside a render pass (hook context is active).
 * Throws if called outside withScriptScope() — i.e. at module top level.
 */
export function assertHookContext(hookName: string): void {
  if (_currentHookPath === null) {
    throw new Error(
      `${hookName} must be called inside a function component body (during render). ` +
      `It cannot be called at the module top level or outside of a component.`,
    );
  }
}
