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
import type { TriggerHandler, BINDING_BRAND } from './types';
import type { CssStyleProps } from './style-types';

// ── Reactive<T>: the reactive prop type alias ─────────────────────────────

/**
 * A prop value that can be static, a reactive node, or a reactive function.
 * Component authors use this to declare which props support reactive binding.
 */
export type Reactive<T> = T | (() => T) | IRReactiveNode<T>;

// ── WidgetProps<T>: mapped type for design-system widget props ─────────────

/**
 * Maps a plain props interface into widget-ready props by wrapping each
 * property in `Reactive<T>` — except for `children`, `style`, any
 * `TriggerHandler` properties, any `BINDING_BRAND` types (bindings, refs,
 * actions), and any keys listed in `Skip`.
 *
 * A `style?: CssStyleProps` property is always included automatically —
 * component authors do not need to declare it in their base interface.
 *
 * @example
 * export type SwitchProps = WidgetProps<{
 *   label: string;
 *   value?: boolean;
 *   onChange?: TriggerHandler<{ x: boolean }>;
 *   binding: LightBinding;
 *   width?: SizeValue;
 * }>;
 * // → { label: Reactive<string>; value?: Reactive<boolean>; onChange?: TriggerHandler<…>; binding: LightBinding; width?: Reactive<SizeValue>; style?: CssStyleProps }
 */
export type WidgetProps<T, Skip extends keyof T = never> = {
  [K in keyof T]: K extends 'children' | 'style' | Skip
    ? T[K]
    : NonNullable<T[K]> extends TriggerHandler<any> // eslint-disable-line @typescript-eslint/no-explicit-any
      ? T[K]
      : NonNullable<T[K]> extends { readonly [BINDING_BRAND]?: true }
        ? T[K]
        : Reactive<NonNullable<T[K]>> | Extract<T[K], undefined>;
} & { style?: CssStyleProps };

// ── useReactive ────────────────────────────────────────────────────────────

/**
 * Normalize a prop value that may be static, reactive node, or reactive function.
 *
 * - `IRReactiveNode<T>` → pass through (already tracked)
 * - `() => T` → evaluate with dependency tracking → IRReactiveNode or literal
 * - `T` → literal (no reactivity)
 */
export function useReactive<T>(prop: Reactive<T>): T | IRReactiveNode<T> {
  if (isIRReactiveNode(prop)) {
    return prop as IRReactiveNode<T>;
  }
  if (typeof prop === 'function') {
    return useMemo(prop as () => T);
  }
  return prop as T;
}

// ── useReactiveMap ─────────────────────────────────────────────────────────

/**
 * Map a `Reactive<T>` prop through a pure function, returning a reactive
 * result when the input is reactive.
 *
 * Encapsulates the common `useReactive` → `isIRReactiveNode` → `useMemo`
 * pattern so that hook authors never need to deal with the branch manually.
 *
 * @example
 * export function useSpacing(value: Reactive<SpacingToken>): Signal<number> {
 *   return useReactiveMap(value, (v) => themeLeaf('spacing', v));
 * }
 */
export function useReactiveMap<T, R>(
  prop: Reactive<T>,
  fn: (value: T) => R,
): R {
  const resolved = useReactive(prop);
  if (isIRReactiveNode(resolved)) {
    return useMemo(() => fn((resolved as IRReactiveNode<T>).get())) as R;
  }
  return fn(resolved as T);
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
