// ────────────────────────────────────────────────────────────────────────────
// HexColor — template literal type for HTML hex color values
//
// Restricts color strings to the `#`-prefixed format used by LVGL themes
// and style properties.  A full combinatorial template literal for all six
// hex digits would produce ~17 million union members — well beyond what
// TypeScript can handle — so we use the lighter `#${string}` pattern which
// still catches the most common mistakes (missing `#`, plain color names).
//
// For strict `#RRGGBB` validation at system boundaries, use `isHexColor()`.
// ────────────────────────────────────────────────────────────────────────────

/**
 * A `#`-prefixed hex color string (e.g. `'#FF8800'`, `'#1a1a2e'`).
 *
 * Accepts any string starting with `#`.  Use {@link isHexColor} for full
 * `#RRGGBB` runtime validation.
 */
export type HexColor = `#${string}`;

/** Matches exactly `#` followed by six hex digits (case-insensitive). */
const HEX_COLOR_RE = /^#[0-9a-f]{6}$/i;

/** Type guard: is the value a valid `#RRGGBB` hex color string? */
export function isHexColor(value: unknown): value is HexColor {
  return typeof value === 'string' && HEX_COLOR_RE.test(value);
}
