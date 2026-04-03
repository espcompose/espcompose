// ────────────────────────────────────────────────────────────────────────────
// useMemo — reactive memoization hook
//
// Creates a memoized derived value from one or more reactive sources.
// Must be called inside a function component body (render pass).
//
// In the normal build pipeline, the CLI's reactive transformer replaces
// useMemo() calls with __espcompose.compiled() before this code runs.
// This runtime fallback handles:
//   - Pure computations (no reactive deps) — returns the value directly
//   - Leftover reactive calls not caught by the compiler — creates
//     a ReactiveNode with dependency tracking only
//
// Usage:
//   const status = useMemo(() => light.isOn ? 'ON' : 'OFF');
// ────────────────────────────────────────────────────────────────────────────

import {
  ReactiveNode,
  startTracking,
  stopTracking,
} from '../reactive-node';
import type { ExprType } from '../ir/expr-types';
import { registerReactiveNode } from './useReactiveScope';
import { assertHookContext } from './useState';

/**
 * Create a memoized derived value from one or more reactive sources.
 *
 * Must be called inside a function component body (render pass).
 *
 * In the normal build pipeline, the CLI's reactive transformer replaces
 * useMemo() calls with __espcompose.compiled() before this code runs.
 * This runtime fallback handles:
 *   - Pure computations (no reactive deps) — returns the value directly
 *   - Leftover reactive calls not caught by the compiler — creates
 *     a ReactiveNode with dependency tracking only
 */
export function useMemo<T>(fn: () => T): T | ReactiveNode<T> {
  assertHookContext('useMemo()');
  startTracking();
  const value = fn();
  const deps = stopTracking();

  if (deps.length === 0) {
    // Pure computation — no reactive dependencies, return as-is
    return value;
  }

  // Infer ExprType from the JS value
  let exprType: ExprType | undefined;
  if (typeof value === 'string') exprType = 'string';
  else if (typeof value === 'number') exprType = 'float';
  else if (typeof value === 'boolean') exprType = 'bool';

  const node = new ReactiveNode<T>({
    kind: 'memo',
    dependencies: deps,
    exprType,
  });

  // Preserve the original JS closure and its evaluated value.
  // The simulator's IR renderer uses these for live evaluation
  // instead of falling back to type-based defaults.
  node.jsClosure = fn as () => unknown;
  node.jsValue = value;

  registerReactiveNode(node);
  return node;
}
