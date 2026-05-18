// ────────────────────────────────────────────────────────────────────────────
// resolve-transition — resolve CSS-like StyleTransitionDescriptors to IR form
//
// Maps CSS property names to LVGL camelCase via CSS_TO_LVGL_MAP and parses
// DurationValue to milliseconds. Used by useStyleTransition() and the
// style serialization pipeline.
// ────────────────────────────────────────────────────────────────────────────

import type { StyleTransitionDescriptor } from './types';
import type { IRStyleTransitionDescriptor } from '../../ir/contribution-types';
import { CSS_TO_LVGL_MAP } from './mapping';
import { parseDurationToMs } from './duration';

// ── Easing alias map (CSS-like → LVGL snake_case key) ──────────────────────

export const EASING_TO_KEY: Record<string, string> = {
  'linear': 'linear',
  'ease-in': 'ease_in',
  'ease-out': 'ease_out',
  'ease-in-out': 'ease_in_out',
  'overshoot': 'overshoot',
  'bounce': 'bounce',
  'step': 'step',
};

/**
 * Resolve a CSS-like property name to its LVGL camelCase equivalent.
 *
 * Falls through to the original name if no mapping exists (the name
 * is already an LVGL camelCase prop or a passthrough).
 */
export function resolvePropertyName(cssName: string): string {
  const mapping = CSS_TO_LVGL_MAP[cssName];
  if (mapping && 'lvglProp' in mapping) {
    return mapping.lvglProp;
  }
  // Already an LVGL camelCase name (e.g. 'bgColor', 'opa')
  return cssName;
}

/**
 * Resolve an array of CSS-like `StyleTransitionDescriptor` objects into
 * IR-ready `IRStyleTransitionDescriptor` objects.
 *
 * - CSS property names are mapped to LVGL camelCase
 * - DurationValue is parsed to milliseconds
 * - Easing is mapped to the LVGL key
 */
export function resolveTransitionDescriptors(
  descriptors: StyleTransitionDescriptor[],
): IRStyleTransitionDescriptor[] {
  return descriptors.map((d): IRStyleTransitionDescriptor => {
    const properties = d.properties.map(resolvePropertyName);
    const durationMs = parseDurationToMs(d.duration);
    const delayMs = d.delay != null ? parseDurationToMs(d.delay) : 0;
    const easing = d.easing ? (EASING_TO_KEY[d.easing] ?? 'linear') : 'linear';

    return { properties, durationMs, easing, delayMs };
  });
}
