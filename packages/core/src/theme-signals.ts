// ────────────────────────────────────────────────────────────────────────────
// Theme signals — flatten a Theme object into a signal map
//
// Walks a theme object recursively, producing a flat Record<path, ThemeLeaf>
// where each path is an underscore-separated key (e.g. 'colors_primary_bg')
// and ThemeLeaf holds the concrete value and its inferred C++ type.
//
// Ref<FontRef> values produced by core's useFont() are treated as opaque
// `font_ptr` leaves — the flattener stores the ref's string token and
// stops recursion so that no internal Proxy/brand properties leak.
//
// This is used by the theme registry to store theme data in a format the
// compiler can turn into C++ theme value arrays.
// ────────────────────────────────────────────────────────────────────────────

import { isRef } from './types';

// ── Types ──────────────────────────────────────────────────────────────────

export interface ThemeLeaf {
  value: unknown;
  /** Target-agnostic value type (ExprType compatible). */
  valueType: string;
}



// ── Value type inference ───────────────────────────────────────────────────

const HEX_COLOR_RE = /^#[0-9a-fA-F]{3,8}$/;

/**
 * Infer the value type for a theme leaf (ExprType compatible).
 *
 *  - '#RRGGBB' strings → 'color'
 *  - other strings     → 'string'
 *  - integers          → 'int'
 *  - floats            → 'float'
 *  - booleans          → 'bool'
 */
export function inferValueType(value: unknown): string {
  if (typeof value === 'string') {
    return HEX_COLOR_RE.test(value) ? 'color' : 'string';
  }
  if (typeof value === 'number') {
    return Number.isInteger(value) ? 'int' : 'float';
  }
  if (typeof value === 'boolean') return 'bool';
  return 'int';
}

// ── Flattener ──────────────────────────────────────────────────────────────

/**
 * Recursively flatten a theme object into a map of leaf paths → ThemeLeaf.
 *
 * `Ref<FontRef>` values (produced by `useFont()`) are stored as `font_ptr`
 * leaves — the ref's string token (e.g. `r_abc123`) is the leaf value.
 * The target codegen emits `id(r_abc123)` in the C++ theme value arrays.
 *
 * @param obj    — any nested plain object (typically a Theme)
 * @param prefix — accumulated path prefix (underscore-separated)
 * @returns flat map, e.g. `{ colors_primary_bg: { value: '#1E88E5', valueType: 'color' } }`
 */
export function flattenTheme(
  obj: Record<string, unknown>,
  prefix = '',
): Record<string, ThemeLeaf> {
  const result: Record<string, ThemeLeaf> = {};
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}_${key}` : key;
    // Ref<FontRef> — treat as opaque font_ptr leaf (don't recurse into Proxy)
    if (isRef(value)) {
      result[path] = { value: value.toString(), valueType: 'font_ptr' };
    } else if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenTheme(value as Record<string, unknown>, path));
    } else {
      result[path] = { value, valueType: inferValueType(value) };
    }
  }
  return result;
}

