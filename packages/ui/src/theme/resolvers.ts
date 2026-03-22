/**
 * Theme-aware token resolvers.
 *
 * All resolvers read from the active theme (set via `setTheme()`).
 * Component code calls these instead of accessing tokens directly.
 */

import { useTheme } from './context';
import type {
  SpacingToken,
  SizeToken,
  SizeDimensions,
  RadiusToken,
  StatusToken,
  StatusColors,
  TextVariant,
  FontDef,
} from './types';

/** Resolve a spacing token or pass through a raw pixel value. */
export function resolveSpacing(value: SpacingToken | number): number {
  if (typeof value === 'number') return value;
  return useTheme().spacing[value];
}

/** Resolve a component size token. */
export function resolveSize(value: SizeToken): SizeDimensions {
  return useTheme().sizes[value];
}

/** Resolve a status color token. */
export function resolveStatus(value: StatusToken): StatusColors {
  return useTheme().colors[value];
}

/** Resolve a typography variant to a font definition. */
export function resolveTypography(variant: TextVariant): FontDef {
  return useTheme().typography[variant];
}

/** Convert a `FontDef` to the LVGL `text_font` string (e.g. `montserrat_28`). */
export function fontDefToLvgl(def: FontDef): string {
  return `${def.fontFamily}_${def.fontSize}`;
}

/** Resolve a radius token or pass through a raw pixel value. */
export function resolveRadius(value: RadiusToken | number): number {
  if (typeof value === 'number') return value;
  return useTheme().radii[value];
}
