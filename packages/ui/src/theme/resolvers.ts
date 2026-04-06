/**
 * Theme-aware token resolvers — reactive hooks.
 *
 * Each hook accepts a `BindProp<T>` so callers can pass static values,
 * reactive lambdas, or IRReactiveNodes. Internally the input is unwrapped
 * via `resolveBindProp` and the theme lookup is wrapped in `useMemo`,
 * composing both layers of reactivity through dependency tracking.
 *
 * For raw numeric pass-through (e.g. `useSpacing(16)`), the concrete
 * value is returned directly (no reactive overhead).
 */

import {
  useReactiveTheme,
  useMemo,
  isIRReactiveNode,
  resolveBindProp,
  __espcompose,
} from '@espcompose/core';
import type { BindProp, IRReactiveNode, Signal, IRExprNode } from '@espcompose/core';
import type {
  SpacingToken,
  SizeToken,
  RadiusToken,
  StatusToken,
  TextVariant,
} from './types';

// ── Reactive theme accessor ────────────────────────────────────────────────

/**
 * Safely access a nested path on the reactive theme proxy.
 *
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function themeLeaf(...path: string[]): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cursor: any = useReactiveTheme();
  for (const key of path) {
    cursor = cursor?.[key];
  }
  return cursor;
}

// ── Hooks ──────────────────────────────────────────────────────────────────

/** Resolve a spacing token to a reactive pixel value. */
export function useSpacing(
  value: BindProp<SpacingToken>,
): Signal<number> {
  const resolved = resolveBindProp(value);
  if (isIRReactiveNode(resolved)) {
    return useMemo(() => {
      return themeLeaf('spacing', (resolved as IRReactiveNode<SpacingToken>).get());
    });
  }
  // plain string token
  return themeLeaf('spacing', resolved as SpacingToken);
}

/**
 * Resolve a component size token.
 * Returns an object where each dimension is a IRReactiveNode<number>.
 */
export function useSize(value: BindProp<SizeToken>): {
  height: Signal<number>;
  fontSize: Signal<number>;
  paddingX: Signal<number>;
  paddingY: Signal<number>;
} {
  const resolved = resolveBindProp(value);
  if (isIRReactiveNode(resolved)) {
    return {
      height: useMemo(() => themeLeaf('sizes', (resolved as IRReactiveNode<SizeToken>).get(), 'height')),
      fontSize: useMemo(() => themeLeaf('sizes', (resolved as IRReactiveNode<SizeToken>).get(), 'fontSize')),
      paddingX: useMemo(() => themeLeaf('sizes', (resolved as IRReactiveNode<SizeToken>).get(), 'paddingX')),
      paddingY: useMemo(() => themeLeaf('sizes', (resolved as IRReactiveNode<SizeToken>).get(), 'paddingY')),
    };
  }
  return {
    height: themeLeaf('sizes', resolved, 'height'),
    fontSize: themeLeaf('sizes', resolved, 'fontSize'),
    paddingX: themeLeaf('sizes', resolved, 'paddingX'),
    paddingY: themeLeaf('sizes', resolved, 'paddingY'),
  };
}

/**
 * Resolve a status color token.
 * Returns an object where each color is a IRReactiveNode.
 */
export function useStatus(value: BindProp<StatusToken>): {
  bg: Signal<string>;
  text: Signal<string>;
  bgPressed: Signal<string>;
} {
  const resolved = resolveBindProp(value);
  if (isIRReactiveNode(resolved)) {
    return {
      bg: useMemo(() => themeLeaf('colors', (resolved as IRReactiveNode<StatusToken>).get(), 'bg')),
      text: useMemo(() => themeLeaf('colors', (resolved as IRReactiveNode<StatusToken>).get(), 'text')),
      bgPressed: useMemo(() => themeLeaf('colors', (resolved as IRReactiveNode<StatusToken>).get(), 'bgPressed')),
    };
  }
  return {
    bg: themeLeaf('colors', resolved, 'bg'),
    text: themeLeaf('colors', resolved, 'text'),
    bgPressed: themeLeaf('colors', resolved, 'bgPressed'),
  };
}

/** Resolve a typography variant to reactive font properties. */
export function useTypography(variant: BindProp<TextVariant>): {
  fontFamily: Signal<string>;
  fontSize: Signal<number>;
} {
  const resolved = resolveBindProp(variant);
  if (isIRReactiveNode(resolved)) {
    return {
      fontFamily: useMemo(() => themeLeaf('typography', (resolved as IRReactiveNode<TextVariant>).get(), 'fontFamily')),
      fontSize: useMemo(() => themeLeaf('typography', (resolved as IRReactiveNode<TextVariant>).get(), 'fontSize')),
    };
  }
  return {
    fontFamily: themeLeaf('typography', resolved, 'fontFamily'),
    fontSize: themeLeaf('typography', resolved, 'fontSize'),
  };
}

/**
 * Convert reactive font properties to a resolved LVGL font pointer.
 *
 * If both inputs are IRReactiveNodes, creates a derived memo whose C++
 * expression calls `resolve_font(family, size)` and returns
 * `const lv_font_t*` directly. If both are static, returns a concrete
 * string like `montserrat_28`.
 */
export function useFont(def: {
  fontFamily: string | Signal<string>;
  fontSize: number | Signal<number>;
}): string | IRReactiveNode<string> {
  const famReactive = isIRReactiveNode(def.fontFamily);
  const szReactive = isIRReactiveNode(def.fontSize);

  if (!famReactive && !szReactive) {
    // eslint-disable-next-line @espcompose/eslint/no-untracked-signal -- narrowed by isIRReactiveNode() guards above
    return `${def.fontFamily}_${def.fontSize}`;
  }

  const deps = [
    ...(famReactive ? (def.fontFamily as unknown as IRReactiveNode<string>).dependencies : []),
    ...(szReactive ? (def.fontSize as unknown as IRReactiveNode<number>).dependencies : []),
  ];

  // Build ExprResolveFont IR node
  const famIR: IRExprNode = famReactive
    ? (def.fontFamily as unknown as IRReactiveNode<string>).exprIR ?? { kind: 'literal', value: '', type: 'string' }
    : { kind: 'literal', value: def.fontFamily as string, type: 'string' };
  const szIR: IRExprNode = szReactive
    ? (def.fontSize as unknown as IRReactiveNode<number>).exprIR ?? { kind: 'literal', value: 0, type: 'float' }
    : { kind: 'literal', value: def.fontSize as number, type: 'float' };

  return __espcompose.derivedMemo<string>({
    exprType: 'font_ptr',
    dependencies: deps,
    exprIR: { kind: 'resolve_font', family: famIR, size: szIR },
  });
}

/** Resolve a radius token to a reactive pixel value. */
export function useRadius(
  value: BindProp<RadiusToken>,
): Signal<number> {
  const resolved = resolveBindProp(value);
  if (isIRReactiveNode(resolved)) {
    return useMemo(() => {
      return themeLeaf('radii', (resolved as IRReactiveNode<RadiusToken>).get());
    });
  }
  // plain string token
  return themeLeaf('radii', resolved as RadiusToken);
}

