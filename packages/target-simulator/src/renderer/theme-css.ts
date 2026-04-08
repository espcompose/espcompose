// ────────────────────────────────────────────────────────────────────────────
// Theme CSS custom properties
//
// Converts IR theme leaf data into CSS custom properties (variables) that
// widget renderers can reference. When the active theme changes, only the
// CSS variables on the viewport root need to be updated.
//
// Convention: theme path "colors_primary_bg" → CSS variable "--thm-colors-primary-bg"
// ────────────────────────────────────────────────────────────────────────────

import type { IRThemeData } from '@espcompose/core/internals';
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
  themeData: IRThemeData,
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
 * Includes all themes as data-attribute selectors so theme switching
 * can be done client-side by updating the data-theme attribute.
 */
export function generateThemeStyleBlock(themeData: IRThemeData): string {
  const blocks: string[] = [];

  // Default theme (applied to .sim-viewport directly)
  const defaultVars = generateThemeCssVars(themeData, themeData.defaultIndex);
  blocks.push(`.sim-viewport {\n${defaultVars}\n}`);

  // Per-theme overrides via data-theme attribute
  for (let i = 0; i < themeData.themeNames.length; i++) {
    const name = themeData.themeNames[i];
    const vars = generateThemeCssVars(themeData, i);
    blocks.push(`.sim-viewport[data-theme="${name}"] {\n${vars}\n}`);
  }

  return blocks.join('\n\n');
}

/**
 * Generate the client-side JS needed to support theme switching.
 * Sets the data-theme attribute on the viewport element.
 */
export function generateThemeSwitchScript(themeData: IRThemeData): string {
  return `
    window.__simThemeNames = ${JSON.stringify(themeData.themeNames)};
    window.__simDefaultTheme = ${JSON.stringify(themeData.themeNames[themeData.defaultIndex] ?? '')};
    window.__simSelectTheme = function(name) {
      const viewport = document.querySelector('.sim-viewport');
      if (viewport) viewport.setAttribute('data-theme', name);
      logAction('theme.select(' + name + ')');
    };
  `;
}
