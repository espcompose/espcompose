// ────────────────────────────────────────────────────────────────────────────
// reactive-utils — reactive prop utilities
//
// Helpers for normalizing reactive prop values and creating derived
// reactive nodes. These are user-facing utilities (not hooks — no phase
// assertion required).
// ────────────────────────────────────────────────────────────────────────────

import { IRReactiveNode, isIRReactiveNode } from './reactive-node';
import { useMemo } from './hooks/useMemo';
import { __espcompose } from './__espcompose';

// ── BindProp<T>: the reactive prop type alias ──────────────────────────────

/**
 * A prop value that can be static, a reactive node, or a reactive function.
 * Component authors use this to declare which props support reactive binding.
 */
export type BindProp<T> = T | (() => T) | IRReactiveNode<T>;

// ── resolveBindProp ────────────────────────────────────────────────────────

/**
 * Normalize a prop value that may be static, reactive node, or reactive function.
 *
 * - `IRReactiveNode<T>` → pass through (already tracked)
 * - `() => T` → evaluate with dependency tracking → IRReactiveNode or literal
 * - `T` → literal (no reactivity)
 */
export function resolveBindProp<T>(prop: BindProp<T>): T | IRReactiveNode<T> {
  if (isIRReactiveNode(prop)) {
    return prop as IRReactiveNode<T>;
  }
  if (typeof prop === 'function') {
    return useMemo(prop as () => T);
  }
  return prop as T;
}

// ── reactiveIsNaN ──────────────────────────────────────────────────────────

/**
 * Test whether a reactive numeric value is NaN.
 *
 * Returns a `IRReactiveNode<boolean>` that is `true` when the source value
 * is NaN (e.g. HA reports `None` for a numeric attribute).
 *
 * @example
 * value={useMemo(() => reactiveIsNaN(light.brightness).get() ? 0 : light.brightness.get())}
 */
export function reactiveIsNaN(node: IRReactiveNode<number>): IRReactiveNode<boolean> {
  const sourceIR = node.exprIR ?? { kind: 'literal' as const, value: 0, type: 'float' as const };
  return __espcompose.derivedMemo<boolean>({
    exprType: 'bool',
    dependencies: node.dependencies,
    exprIR: { kind: 'call', fn: 'is_nan', args: [sourceIR] },
  });
}
