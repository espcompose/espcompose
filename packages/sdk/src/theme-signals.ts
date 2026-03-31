// ────────────────────────────────────────────────────────────────────────────
// Theme signals — flatten a Theme object into a signal map
//
// Walks a theme object recursively, producing a flat Record<path, ThemeLeaf>
// where each path is an underscore-separated key (e.g. 'colors_primary_bg')
// and ThemeLeaf holds the concrete value and its inferred C++ type.
//
// This is used by the theme registry to store theme data in a format the
// compiler can turn into C++ theme value arrays.
// ────────────────────────────────────────────────────────────────────────────

// ── Types ──────────────────────────────────────────────────────────────────

export interface ThemeLeaf {
  value: unknown;
  cppType: string;
}

// ── Constants ──────────────────────────────────────────────────────────────

export const THEME_SIGNAL_PREFIX = 'thm_';

// ── C++ type inference ─────────────────────────────────────────────────────

const HEX_COLOR_RE = /^#[0-9a-fA-F]{3,8}$/;

/**
 * Infer the C++ type for a theme leaf value.
 *
 *  - '#RRGGBB' strings → 'lv_color_t'
 *  - other strings     → 'const char*'
 *  - integers          → 'int32_t'
 *  - floats            → 'float'
 *  - booleans          → 'bool'
 */
export function inferCppType(value: unknown): string {
  if (typeof value === 'string') {
    return HEX_COLOR_RE.test(value) ? 'lv_color_t' : 'const char*';
  }
  if (typeof value === 'number') {
    return Number.isInteger(value) ? 'int32_t' : 'float';
  }
  if (typeof value === 'boolean') return 'bool';
  return 'int32_t';
}

// ── Flattener ──────────────────────────────────────────────────────────────

/**
 * Recursively flatten a theme object into a map of leaf paths → ThemeLeaf.
 *
 * @param obj    — any nested plain object (typically a Theme)
 * @param prefix — accumulated path prefix (underscore-separated)
 * @returns flat map, e.g. `{ colors_primary_bg: { value: '#1E88E5', cppType: 'lv_color_t' } }`
 */
export function flattenTheme(
  obj: Record<string, unknown>,
  prefix = '',
): Record<string, ThemeLeaf> {
  const result: Record<string, ThemeLeaf> = {};
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}_${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenTheme(value as Record<string, unknown>, path));
    } else {
      result[path] = { value, cppType: inferCppType(value) };
    }
  }
  return result;
}

/**
 * Convert a leaf path to its C++ signal/memo name.
 *
 * @example themeSignalName('colors_primary_bg') → 'thm_colors_primary_bg'
 */
export function themeSignalName(path: string): string {
  return `${THEME_SIGNAL_PREFIX}${path}`;
}

/**
 * Convert a dotted JS proxy path (e.g. 'colors.primary.bg') to the
 * underscore-separated signal path (e.g. 'colors_primary_bg').
 */
export function dottedToSignalPath(dotted: string): string {
  return dotted.replace(/\./g, '_');
}
