// ────────────────────────────────────────────────────────────────────────────
// Hook path tracking — render scope guard + component call stack
//
// Hooks may only be called during a render pass (inside withScriptScope).
// setCurrentHookPath() is called by withScriptScope() to establish the root
// scope frame. pushHookPath()/popHookPath() are called by the runtime around
// each function-component invocation to maintain a component call stack.
// getCurrentHookPath() joins the stack with '/' to form a stable identity
// key.
//
// Per-call-site memoization (useStableValue / nextCallIndexAtHookPath):
// any value derived from a hook call site is keyed by
// (hookPath, callIndexAtThatPath). A pushHookPath resets the call-index of
// the path being pushed-to so sibling instances of the same component start
// fresh while parent / sibling-overlay paths keep their counters intact.
//
// assertHookContext() guards that hooks are called inside a render pass.
// ────────────────────────────────────────────────────────────────────────────

const _hookPathStack: string[] = [];

// Per-(hookPath) state shared by every memoized hook.
const _valueCache = new Map<string, unknown>();
const _callIndices = new Map<string, number>();

/**
 * Reset all per-call-site memoization caches.
 *
 * Called by setCurrentHookPath() on render-pass boundaries so a fresh
 * render starts from a clean slate.
 */
function resetHookPathMemos(): void {
  _valueCache.clear();
  _callIndices.clear();
}

/**
 * Establish or clear the root hook context frame.
 *
 * Called by withScriptScope() with a non-null root name at the start of a
 * render pass and with null at the end. Clears any residual stack entries
 * and per-call-site memo caches.
 */
export function setCurrentHookPath(path: string | null): void {
  _hookPathStack.length = 0;
  resetHookPathMemos();
  if (path !== null) _hookPathStack.push(path);
}

/**
 * Push a component name onto the hook path stack.
 *
 * Called by the runtime (toPlainObject, resolveLvglChildren) and by hooks
 * that synthesize a child frame (e.g. useOverlay pushing the templateKey)
 * around each function-component invocation so that hooks called inside
 * that component see a unique getCurrentHookPath() per component identity.
 *
 * A push marks a fresh component-invocation boundary at the new path —
 * we reset that path's per-call-index counter so sibling instances of the
 * same component (same hook-path string) start from index 0 each time,
 * while counters for other paths (parent frames, sibling overlays) stay
 * intact.
 */
export function pushHookPath(name: string): void {
  _hookPathStack.push(name);
  _callIndices.delete(getCurrentHookPath());
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
 * Run `fn` inside a synthetic hook-path frame named `name`.
 *
 * Equivalent to `pushHookPath(name); try { return fn(); } finally { popHookPath(); }`.
 * Use this whenever you need to evaluate user code (a function-component body,
 * an overlay factory, a re-serialized subtree) under a distinct hook-path
 * identity so that hooks called inside see the right memoization key. Callers
 * should not need to know the push/pop or call-index reset semantics — those
 * are concerns of the hook-path machinery.
 */
export function withHookPath<T>(name: string, fn: () => T): T {
  pushHookPath(name);
  try {
    return fn();
  } finally {
    popHookPath();
  }
}

/**
 * Get the current hook path as a '/'-joined component call stack.
 *
 * Returns an empty string if the stack is empty (which happens only when
 * called outside a render pass — the same condition assertHookContext()
 * guards against).
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

/**
 * Allocate the next call-index for the current hook path.
 *
 * Each call returns a monotonic 0-based index per path. Used by hooks
 * that need to disambiguate multiple call sites in the same component
 * (e.g. useOverlay assigning a unique templateKey per call).
 */
export function nextCallIndexAtHookPath(): number {
  const path = getCurrentHookPath();
  const i = _callIndices.get(path) ?? 0;
  _callIndices.set(path, i + 1);
  return i;
}

/**
 * React-style: a hook called at the same call site within the same component
 * identity returns the same value across re-renders / sibling instances.
 *
 * The value is keyed by (hookPath, callIndex). Sibling component instances
 * at the same hook path share the same value at each call site, while
 * distinct call sites within a body get distinct values. Cache is cleared
 * per render pass via setCurrentHookPath(null).
 */
export function useStableValue<T>(factory: () => T): T {
  const path = getCurrentHookPath();
  const callIndex = nextCallIndexAtHookPath();
  const key = `${path}#${callIndex}`;
  if (!_valueCache.has(key)) {
    _valueCache.set(key, factory());
  }
  return _valueCache.get(key) as T;
}
