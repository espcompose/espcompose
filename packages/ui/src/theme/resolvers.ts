/**
 * Theme-aware token resolvers — reactive edition.
 *
 * Resolvers return ReactiveNode<T> values sourced from the reactive theme
 * proxy. When themes switch at runtime, all resolved values update
 * automatically through the C++ reactive graph.
 *
 * For raw numeric pass-through (e.g. `resolveSpacing(16)`), the concrete
 * value is returned directly (no reactive overhead).
 */

import { useReactiveTheme, isReactiveNode, __espcompose } from '@espcompose/core';
import type { ReactiveNode, Signal, ExprNode } from '@espcompose/core';
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

// ── Resolvers ──────────────────────────────────────────────────────────────

/** Resolve a spacing token or pass through a raw pixel value. */
export function resolveSpacing(
  value: SpacingToken | number,
): number | Signal<number> {
  if (typeof value === 'number') return value;
  return themeLeaf('spacing', value);
}

/**
 * Resolve a component size token.
 * Returns an object where each dimension is a ReactiveNode<number>.
 */
export function resolveSize(value: SizeToken): {
  height: Signal<number>;
  fontSize: Signal<number>;
  paddingX: Signal<number>;
  paddingY: Signal<number>;
} {
  return {
    height: themeLeaf('sizes', value, 'height'),
    fontSize: themeLeaf('sizes', value, 'fontSize'),
    paddingX: themeLeaf('sizes', value, 'paddingX'),
    paddingY: themeLeaf('sizes', value, 'paddingY'),
  };
}

/**
 * Resolve a status color token.
 * Returns an object where each color is a ReactiveNode.
 */
export function resolveStatus(value: StatusToken): {
  bg: Signal<string>;
  text: Signal<string>;
  bgPressed: Signal<string>;
} {
  return {
    bg: themeLeaf('colors', value, 'bg'),
    text: themeLeaf('colors', value, 'text'),
    bgPressed: themeLeaf('colors', value, 'bgPressed'),
  };
}

/** Resolve a typography variant to reactive font properties. */
export function resolveTypography(variant: TextVariant): {
  fontFamily: Signal<string>;
  fontSize: Signal<number>;
} {
  return {
    fontFamily: themeLeaf('typography', variant, 'fontFamily'),
    fontSize: themeLeaf('typography', variant, 'fontSize'),
  };
}

/**
 * Convert reactive font properties to a resolved LVGL font pointer.
 *
 * If both inputs are ReactiveNodes, creates a derived memo whose C++
 * expression calls `resolve_font(family, size)` and returns
 * `const lv_font_t*` directly. If both are static, returns a concrete
 * string like `montserrat_28`.
 */
export function resolveFont(def: {
  fontFamily: string | Signal<string>;
  fontSize: number | Signal<number>;
}): string | ReactiveNode<string> {
  const famReactive = isReactiveNode(def.fontFamily);
  const szReactive = isReactiveNode(def.fontSize);

  if (!famReactive && !szReactive) {
    // eslint-disable-next-line @espcompose/compose-eslint/no-untracked-signal -- narrowed by isReactiveNode() guards above
    return `${def.fontFamily}_${def.fontSize}`;
  }

  const deps = [
    ...(famReactive ? (def.fontFamily as unknown as ReactiveNode<string>).dependencies : []),
    ...(szReactive ? (def.fontSize as unknown as ReactiveNode<number>).dependencies : []),
  ];

  // Build ExprResolveFont IR node
  const famIR: ExprNode = famReactive
    ? (def.fontFamily as unknown as ReactiveNode<string>).exprIR ?? { kind: 'literal', value: '', type: 'string' }
    // eslint-disable-next-line @espcompose/compose-eslint/no-untracked-signal -- static branch: famReactive is false
    : { kind: 'literal', value: def.fontFamily as string, type: 'string' };
  const szIR: ExprNode = szReactive
    ? (def.fontSize as unknown as ReactiveNode<number>).exprIR ?? { kind: 'literal', value: 0, type: 'float' }
    // eslint-disable-next-line @espcompose/compose-eslint/no-untracked-signal -- static branch: szReactive is false
    : { kind: 'literal', value: def.fontSize as number, type: 'float' };

  return __espcompose.derivedMemo<string>({
    exprType: 'font_ptr',
    dependencies: deps,
    exprIR: { kind: 'resolve_font', family: famIR, size: szIR },
  });
}

/** Resolve a radius token or pass through a raw pixel value. */
export function resolveRadius(
  value: RadiusToken | number,
): number | Signal<number> {
  if (typeof value === 'number') return value;
  return themeLeaf('radii', value);
}

