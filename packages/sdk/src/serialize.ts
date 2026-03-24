import type { EspComposeElement } from './types';
import { isRef } from './types';
import { Scalar } from 'yaml';

// ────────────────────────────────────────────────────────────────────────────
// camelCase → snake_case key conversion
//
// Generated TypeScript props use camelCase (e.g. `buildPath`, `friendlyName`).
// ESPHome YAML requires snake_case (e.g. `build_path`, `friendly_name`).
// We convert all prop keys at the point where we build the plain object so
// the YAML output is always correct.
//
// The convention: any uppercase letter that follows a lowercase letter or digit
// becomes `_<lowercase>`. This handles the common cases produced by codegen.
// ────────────────────────────────────────────────────────────────────────────

export function camelToSnake(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .toLowerCase();
}

/**
 * Convert a JSX element type to its ESPHome YAML key.
 *
 * Hyphenated LVGL widget tags (e.g. `lvgl-button`, `lvgl-dropdown-list`) are
 * mapped to their ESPHome widget names (`button`, `dropdown_list`) by stripping
 * the `lvgl-` prefix and converting remaining hyphens to underscores.
 *
 * All other element types pass through unchanged.
 */
export function toYamlKey(type: string): string {
  if (type.startsWith('lvgl-')) {
    return type.slice(5).replace(/-/g, '_');
  }
  return type;
}

export function keysToSnakeCase(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    out[camelToSnake(k)] = serializeValue(v);
  }
  return out;
}

/**
 * Regex for CSS-style hex colour strings: #RGB, #RRGGBB, #RRGGBBAA.
 * Matched strings are translated to ESPHome's `0x` format at serialisation time.
 */
const HEX_COLOR_RE = /^#([0-9a-fA-F]{3,8})$/;

/**
 * Strings that YAML 1.1 parsers (e.g. PyYAML used by ESPHome) interpret as
 * booleans.  When these appear as prop values they must be quoted in the YAML
 * output to prevent mis-parsing.
 */
const YAML11_BOOL = new Set([
  'true', 'false', 'yes', 'no', 'on', 'off',
  'y', 'n',
]);

/**
 * Serialize a prop value for YAML output.
 * Ref<T> instances (produced by useRef()) are serialized as their string token.
 * CSS-style hex colours (#RRGGBB) are converted to ESPHome's 0xRRGGBB format.
 * YAML 1.1 boolean-like strings (on, off, yes, no) are wrapped in a quoted Scalar.
 * Plain objects have their keys recursively converted to snake_case.
 * Arrays are mapped element-wise.
 * All other values are passed through unchanged.
 */
export function serializeValue(v: unknown): unknown {
  if (isRef(v)) return v.toString();
  if (typeof v === 'string') {
    const m = HEX_COLOR_RE.exec(v);
    if (m) return `0x${m[1]}`;
    if (YAML11_BOOL.has(v.toLowerCase())) {
      const s = new Scalar(v);
      s.type = Scalar.QUOTE_SINGLE;
      return s;
    }
  }
  if (Array.isArray(v)) return v.map(serializeValue);
  if (v instanceof Scalar) return v;
  if (v !== null && typeof v === 'object') {
    return keysToSnakeCase(v as Record<string, unknown>);
  }
  return v;
}

export function stripUndefined(obj: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
}

/**
 * Extract common element props (ref → id, x:custom spread).
 */
export function extractElementProps(el: EspComposeElement): {
  allProps: Record<string, unknown>;
  children: EspComposeElement | EspComposeElement[] | undefined;
} {
  const { children, ref, "x:custom": xCustom, ...ownProps } = el.props as Record<string, unknown> & { children?: unknown; ref?: unknown; "x:custom"?: unknown };
  const propsWithId = ref != null
    ? { id: isRef(ref) ? ref.toString() : String(ref), ...ownProps }
    : ownProps;
  const allProps = xCustom != null
    ? { ...propsWithId, ...(xCustom as Record<string, unknown>) }
    : propsWithId;
  return { allProps, children: children as EspComposeElement | EspComposeElement[] | undefined };
}

export function Fragment(props: { children?: EspComposeElement | EspComposeElement[] }): EspComposeElement {
  const { children } = props;
  if (children == null) return null!;
  return (Array.isArray(children) ? children : [children]) as unknown as EspComposeElement;
}

export function flattenFragments(elements: EspComposeElement[]): EspComposeElement[] {
  const out: EspComposeElement[] = [];
  for (const el of elements) {
    if (el.type === Fragment) {
      const result = Fragment(el.props as never);
      if (result != null) {
        const nested = Array.isArray(result) ? result : [result];
        out.push(...flattenFragments(nested));
      }
    } else {
      out.push(el);
    }
  }
  return out;
}
