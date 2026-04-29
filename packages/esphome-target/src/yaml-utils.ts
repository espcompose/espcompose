// ────────────────────────────────────────────────────────────────────────────
// YAML key shaping utilities (ESPHome target)
//
// Owns the camelCase → snake_case algorithm and the JSX-element-to-YAML-key
// mapping used by ESPHome. Core's `serialize.ts` invokes these via the
// `setYamlShaper()` hook so the snake_case algorithm itself does not live in
// `@espcompose/core`.
// ────────────────────────────────────────────────────────────────────────────

/**
 * Convert a camelCase identifier to snake_case (ESPHome YAML convention).
 *
 * Rules:
 *  - any uppercase letter following a lowercase letter or digit → `_<lower>`
 *  - runs of uppercase letters split before the final boundary
 *    (`HTTPProbe` → `http_probe`)
 */
export function camelToSnake(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .toLowerCase();
}

/**
 * Convert a JSX element type to its ESPHome YAML key.
 *
 * Hyphenated LVGL widget tags (`lvgl-button`, `lvgl-dropdown-list`) become
 * `button`, `dropdown_list`. All other element types pass through unchanged.
 */
export function toYamlKey(type: string): string {
  if (type.startsWith('lvgl-')) {
    return type.slice(5).replace(/-/g, '_');
  }
  return type;
}
