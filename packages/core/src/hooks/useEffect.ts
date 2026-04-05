// ────────────────────────────────────────────────────────────────────────────
// useEffect — reactive side-effect hook
//
// Registers a side-effect that runs when reactive sources change.
// Must be called inside a function component body (render pass).
//
// During lowering, the callback's reactive dependencies become an Effect
// node in the C++ reactive runtime.
//
// Usage:
//   useEffect(() => { void sensor.value; });
// ────────────────────────────────────────────────────────────────────────────

import { IRReactiveNode, startTracking, stopTracking } from '../reactive-node';
import { registerReactiveNode } from './useReactiveScope';
import { assertHookContext } from './useState';

/**
 * Register a side-effect that runs when reactive sources change.
 *
 * Must be called inside a function component body (render pass).
 * The callback is executed once to capture dependencies. During lowering,
 * it becomes an Effect node in the C++ reactive runtime.
 */
export function useEffect(fn: () => void): void {
  assertHookContext('useEffect()');
  startTracking();
  fn();
  const deps = stopTracking();

  if (deps.length > 0) {
    const node = new IRReactiveNode<void>({
      kind: 'effect',
      dependencies: deps,
    });

    registerReactiveNode(node);
  }
}
