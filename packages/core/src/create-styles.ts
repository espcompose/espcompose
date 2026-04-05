// ────────────────────────────────────────────────────────────────────────────
// createStyles / mergeStyles — reusable CSS-like style sheets
//
// createStyles() is a factory that receives the reactive theme proxy and
// returns a typed record of CssStyle objects.  Theme leaf accesses inside
// the factory produce IRReactiveNode values that flow through the normal
// reactive binding pipeline.
//
// mergeStyles() combines multiple CssStyle objects with last-wins semantics
// and deep-merges state/part sub-objects.
// ────────────────────────────────────────────────────────────────────────────

import { useReactiveTheme } from './reactive-theme';
import type { CssStyle } from './style-types';
import { LVGL_STATE_NAMES, LVGL_PART_NAMES } from './style-mapping';

// ── createStyles ───────────────────────────────────────────────────────────

/**
 * Create a reusable style sheet from a factory function that receives the
 * reactive theme.
 *
 * @example
 * ```ts
 * const s = createStyles(theme => ({
 *   card: {
 *     backgroundColor: theme.colors.surface,
 *     padding: theme.spacing.md,
 *     borderRadius: theme.radii.md,
 *   },
 *   cardHeader: {
 *     color: theme.colors.textPrimary,
 *     paddingBottom: theme.spacing.sm,
 *   },
 * }));
 * ```
 *
 * Then use in components:
 * ```tsx
 * <lvgl-obj style={s.card}>
 *   <lvgl-label style={s.cardHeader} text="Title" />
 * </lvgl-obj>
 * ```
 */
export function createStyles<K extends string>(
  factory: (theme: ReturnType<typeof useReactiveTheme>) => Record<K, CssStyle>,
): Record<K, CssStyle> {
  const theme = useReactiveTheme();
  return factory(theme);
}

// ── mergeStyles ────────────────────────────────────────────────────────────

/**
 * Merge multiple CSS-like style objects into one.
 *
 * - Direct properties: last-wins (later styles override earlier)
 * - State sub-objects: deep-merged (last-wins within each state)
 * - Part sub-objects: deep-merged recursively (parts can contain states)
 * - `undefined` entries are skipped (safe to spread conditionals)
 *
 * @example
 * ```ts
 * <lvgl-button style={mergeStyles(
 *   s.button,
 *   isActive && s.buttonActive,
 *   { padding: 12 },
 * )} />
 * ```
 */
export function mergeStyles(
  ...styles: (CssStyle | undefined | false | null)[]
): CssStyle {
  const result: Record<string, unknown> = {};

  for (const style of styles) {
    if (!style) continue;

    for (const [key, value] of Object.entries(style)) {
      if (value === undefined) continue;

      // Deep-merge state sub-objects
      if (LVGL_STATE_NAMES.has(key)) {
        const existing = result[key] as Record<string, unknown> | undefined;
        if (existing && typeof value === 'object' && value !== null) {
          result[key] = { ...existing, ...(value as Record<string, unknown>) };
        } else {
          result[key] = value;
        }
        continue;
      }

      // Deep-merge part sub-objects (parts can contain states)
      if (LVGL_PART_NAMES.has(key)) {
        const existing = result[key] as Record<string, unknown> | undefined;
        if (existing && typeof value === 'object' && value !== null) {
          result[key] = mergePartObjects(existing, value as Record<string, unknown>);
        } else {
          result[key] = value;
        }
        continue;
      }

      // Concatenate styles references (style_definitions IDs)
      if (key === 'styles') {
        const existing = result[key];
        const toArray = (v: unknown): string[] =>
          Array.isArray(v) ? v : typeof v === 'string' ? [v] : [];
        result[key] = [...toArray(existing), ...toArray(value)];
        continue;
      }

      // Direct property: last-wins
      result[key] = value;
    }
  }

  return result as CssStyle;
}

/**
 * Deep-merge two part sub-objects.  State keys within parts are merged;
 * direct props are last-wins.
 */
function mergePartObjects(
  a: Record<string, unknown>,
  b: Record<string, unknown>,
): Record<string, unknown> {
  const result = { ...a };

  for (const [key, value] of Object.entries(b)) {
    if (value === undefined) continue;

    if (LVGL_STATE_NAMES.has(key)) {
      const existing = result[key] as Record<string, unknown> | undefined;
      if (existing && typeof value === 'object' && value !== null) {
        result[key] = { ...existing, ...(value as Record<string, unknown>) };
      } else {
        result[key] = value;
      }
    } else {
      result[key] = value;
    }
  }

  return result;
}
