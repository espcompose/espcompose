// ────────────────────────────────────────────────────────────────────────────
// Hook path tracking — render scope guard + component call stack
//
// Hooks may only be called during a render pass (inside withScriptScope).
// setCurrentHookPath() is called by withScriptScope() to establish the root
// scope frame. pushHookPath()/popHookPath() are called by the runtime around
// each function-component invocation to maintain a component call stack.
// getCurrentHookPath() joins the stack with '/' to form a stable identity
// key (used by usePopup() for hook-path deduplication).
// assertHookContext() guards that hooks are called inside a render pass.
// ────────────────────────────────────────────────────────────────────────────

const _hookPathStack: string[] = [];

/**
 * Establish or clear the root hook context frame.
 *
 * Called by withScriptScope() with a non-null root name at the start of a
 * render pass and with null at the end. Clears any residual stack entries.
 */
export function setCurrentHookPath(path: string | null): void {
  _hookPathStack.length = 0;
  if (path !== null) _hookPathStack.push(path);
}

/**
 * Push a component name onto the hook path stack.
 *
 * Called by the runtime (toPlainObject, resolveLvglChildren) around each
 * function-component invocation so that hooks called inside that component
 * see a unique getCurrentHookPath() per component identity.
 */
export function pushHookPath(name: string): void {
  _hookPathStack.push(name);
}

/**
 * Pop the most recent component name from the hook path stack.
 *
 * Called by the runtime after a function-component invocation completes.
 */
export function popHookPath(): void {
  if (_hookPathStack.length === 0) {
    throw new Error('popHookPath() called with empty hook path stack — mismatched push/pop');
  }
  _hookPathStack.pop();
}

/**
 * Get the current hook path as a '/'-joined component call stack.
 *
 * Returns an empty string if the stack is empty (which happens only when
 * called outside a render pass — the same condition assertHookContext()
 * guards against). Used by usePopup() to derive a dedup key per component
 * identity.
 */
export function getCurrentHookPath(): string {
  return _hookPathStack.join('/');
}

/**
 * Assert that we are inside a render pass (hook context is active).
 * Throws if called outside withScriptScope() — i.e. at module top level.
 */
export function assertHookContext(hookName: string): void {
  if (_hookPathStack.length === 0) {
    throw new Error(
      `${hookName} must be called inside a function component body (during render). ` +
      `It cannot be called at the module top level or outside of a component.`,
    );
  }
}
