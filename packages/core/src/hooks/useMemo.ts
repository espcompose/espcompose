// ────────────────────────────────────────────────────────────────────────────
// useMemo — reactive memoization hook
//
// Creates a memoized derived value from one or more reactive sources.
// Must be called inside a function component body (render pass).
//
// The CLI's reactive transformer ALWAYS replaces useMemo() calls with
// __espcompose.compiled() before this code runs. If this function executes
// and the callback accesses reactive values, the build fails with a
// diagnostic — runtime dependency tracking has been removed.
//
// Usage:
//   const status = useMemo(() => light.isOn ? 'ON' : 'OFF');
// ────────────────────────────────────────────────────────────────────────────

import { IRReactiveNode, isIRReactiveNode } from '../reactive';
import { assertHookContext } from './useState';

/**
 * Create a memoized derived value from one or more reactive sources.
 *
 * Must be called inside a function component body (render pass).
 *
 * The CLI's reactive transformer replaces useMemo() calls with
 * __espcompose.compiled() before this code runs. If this function
 * executes with a callback that accesses reactive values, it means
 * the compiler failed to transform it — the build will fail.
 */
export function useMemo<T>(fn: () => T): T | IRReactiveNode<T> {
  assertHookContext('useMemo()');
  const value = fn();

  // If the callback returned an IRReactiveNode directly (e.g. a signal
  // passthrough), that's fine — it's already a compiled reactive value.
  if (isIRReactiveNode(value)) {
    return value as unknown as IRReactiveNode<T>;
  }

  // Pure computation — no reactive dependencies, return as-is.
  // This handles cases like useMemo(() => someStaticCalc()).
  return value;
}
