// ────────────────────────────────────────────────────────────────────────────
// YAML key shaping utilities (ESPHome target)
//
// Owns the camelCase → snake_case algorithm and the JSX-element-to-YAML-key
// mapping used by ESPHome. The target applies these transforms during the emit
// phase when lowering semantic IR to YAML output.
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

/**
 * Sanitize a binding name (e.g. `'props.backlight'`) into a valid C++
 * identifier (`'props_backlight'`). The compiler preserves original JS
 * expression text in the IR; this function is applied at the target layer
 * when emitting C++ code (struct fields, variable names, etc.).
 */
export function sanitizeBindingName(text: string): string {
  return text.replace(/[^A-Za-z0-9_$]/g, '_');
}
