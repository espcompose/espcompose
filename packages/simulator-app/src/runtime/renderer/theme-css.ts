// ────────────────────────────────────────────────────────────────────────────
// Theme CSS custom properties
//
// Converts IR theme leaf data into CSS custom properties (variables) that
// widget renderers can reference. When the active theme changes, only the
// CSS variables on the viewport root need to be updated.
//
// Convention: theme path "colors_primary_bg" → CSS variable "--thm-colors-primary-bg"
// ────────────────────────────────────────────────────────────────────────────

import type { IRThemeScopeData } from '@espcompose/core/internals';
import { lvglColorToCss } from './lvgl-styles';

/**
 * Convert a theme leaf path to a CSS custom property name.
 * Replaces underscores with hyphens and adds the --thm- prefix.
 */
export function themePathToCssVar(path: string): string {
  return `--thm-${path.replace(/_/g, '-')}`;
}

/**
 * Convert a theme leaf value to an appropriate CSS string.
 *
 * - color types → hex string
 * - font_ptr → font family string
 * - numbers → raw number (will be used with px or as-is)
 * - strings → raw string
 */
function themeValueToCss(value: unknown, valueType: string): string {
  if (valueType === 'color' || valueType === 'int') {
    const hex = lvglColorToCss(value);
    if (hex) return hex;
  }
  if (typeof value === 'number') return String(value);
  if (typeof value === 'string') return value;
  return String(value ?? '');
}

/**
 * Generate a CSS block of custom properties for the given theme index.
 *
 * Returns a string like:
 *   --thm-colors-primary-bg: #2196f3;
 *   --thm-colors-primary-text: #ffffff;
 *   --thm-spacing-md: 12;
 */
export function generateThemeCssVars(
  themeData: IRThemeScopeData,
  themeIndex: number,
): string {
  const lines: string[] = [];
  for (const [path, leaf] of themeData.leafData) {
    const varName = themePathToCssVar(path);
    const value = leaf.values[themeIndex] ?? leaf.values[0];
    lines.push(`  ${varName}: ${themeValueToCss(value, leaf.valueType)};`);
  }
  return lines.join('\n');
}

/**
 * Generate a complete CSS rule that sets theme variables on the viewport.
 *
 * Includes all scopes and themes as data-attribute selectors so theme switching
 * can be done client-side by updating data-theme-<scopeId> attributes.
 */
export function generateThemeStyleBlock(themeScopes: IRThemeScopeData[]): string {
  const blocks: string[] = [];

  for (const scope of themeScopes) {
    // Default theme for this scope (applied to .sim-viewport directly)
    const defaultVars = generateThemeCssVars(scope, scope.defaultIndex);
    blocks.push(`/* scope: ${scope.scope} */\n.sim-viewport {\n${defaultVars}\n}`);

    // Per-theme overrides via data-theme-<scopeId> attribute
    for (let i = 0; i < scope.themeNames.length; i++) {
      const name = scope.themeNames[i];
      const vars = generateThemeCssVars(scope, i);
      blocks.push(`.sim-viewport[data-theme-${scope.scopeId}="${name}"] {\n${vars}\n}`);
    }
  }

  return blocks.join('\n\n');
}

