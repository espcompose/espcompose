import type { EspComposeElement } from './types';
import { isRef } from './types';
import { isReactiveNode } from './reactive-node';
import type { ReactiveNode } from './reactive-node';
import { isEmbedValue } from './embed';

import { registerRefTag } from './ref-registry';
import { isTriggerVar } from './trigger-args';
import { Scalar } from 'yaml';

// ── Compiled action tree function interface ────────────────────────────────
// Functions with pre-compiled action tree metadata (set by the AST transformer)

interface CompiledActionFunction {
  __compiledActions: unknown[];
  __refBindings?: Record<string, unknown>;
}

function hasCompiledActions(v: unknown): v is CompiledActionFunction {
  return typeof v === 'function' &&
    '__compiledActions' in (v as unknown as Record<string, unknown>) &&
    Array.isArray((v as unknown as CompiledActionFunction).__compiledActions);
}

/**
 * Resolve ref variable names to their runtime tokens in compiled actions.
 * Replaces ref variable name strings with actual ref tokens (e.g. 'r_abc123').
 */
export function resolveRefBindingsInActions(
  actions: unknown[],
  refBindings: Record<string, unknown>,
): unknown[] {
  return actions.map(action => resolveRefBindingsInValue(action, refBindings));
}

function resolveRefBindingsInValue(
  value: unknown,
  refBindings: Record<string, unknown>,
): unknown {
  if (value === null || value === undefined) return value;
  if (typeof value === 'string') {
    // Check if this string is a ref variable name
    if (refBindings[value] && isRef(refBindings[value])) {
      return refBindings[value]!.toString();
    }
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(item => resolveRefBindingsInValue(item, refBindings));
  }
  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    const result: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(obj)) {
      result[key] = resolveRefBindingsInValue(val, refBindings);
    }
    return result;
  }
  return value;
}

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
  if (isTriggerVar(v)) {
    return createLambdaScalar(v.toLambda());
  }
  if (isReactiveNode(v)) {
    return serializeReactiveNode(v);
  }
  if (isEmbedValue(v)) {
    if (v.kind === 'secret') {
      // Secret values are emitted as `!secret <key>` references
      const key = (v as unknown as { _secretKey: string })._secretKey;
      const s = new Scalar(key);
      s.tag = '!secret';
      return s;
    }
    // For string/number/json embed kinds, unwrap and serialize the inner value
    return serializeValue(v.value);
  }
  // Function values with compiled action tree metadata (trigger handler path)
  if (typeof v === 'function' && hasCompiledActions(v)) {
    const fn = v as CompiledActionFunction;
    if (fn.__refBindings) {
      return resolveRefBindingsInActions(fn.__compiledActions, fn.__refBindings);
    }
    return fn.__compiledActions;
  }
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
 * Serialize a ReactiveNode as a YAML `!lambda` value.
 *
 * Uses the node's toLambdaInit() method which handles both:
 * - Single-source ('expression' kind): `return id(source).property;`
 * - Multi-source ('memo' kind): `return espcompose::memo_N.get();`
 */
function serializeReactiveNode(node: ReactiveNode): unknown {
  return createLambdaScalar(node.toLambdaInit());
}

/**
 * Create a YAML `!lambda` tagged scalar from a C++ lambda body string.
 * Used by the serializer and reactive injector to produce lambda values.
 */
export function createLambdaScalar(body: string): unknown {
  const s = new Scalar(body);
  s.type = Scalar.QUOTE_DOUBLE;
  s.tag = '!lambda';
  return s;
}

/**
 * Extract common element props (ref → id, x:custom spread).
 * When a ref is present and the element type is a string, registers the
 * ref token → element tag mapping for runtime action resolution.
 */
export function extractElementProps(el: EspComposeElement): {
  allProps: Record<string, unknown>;
  children: EspComposeElement | EspComposeElement[] | undefined;
} {
  const { children, ref, "x:custom": xCustom, ...ownProps } = el.props as Record<string, unknown> & { children?: unknown; ref?: unknown; "x:custom"?: unknown };
  const propsWithId = ref != null
    ? { id: isRef(ref) ? ref.toString() : String(ref), ...ownProps }
    : ownProps;

  // Register ref → element tag for action resolution
  if (ref != null && isRef(ref) && typeof el.type === 'string') {
    registerRefTag(ref.toString(), el.type);
  }

  const allProps = xCustom != null
    ? { ...propsWithId, ...(xCustom as Record<string, unknown>) }
    : propsWithId;
  return { allProps, children: children as EspComposeElement | EspComposeElement[] | undefined };
}

/**
 * Fragment sentinel — globally unique via Symbol.for so that CJS and ESM
 * entry points (which may be separate module instances) share the same value.
 */
export const Fragment: unique symbol = Symbol.for('@esphome/compose.Fragment') as unknown as typeof Fragment;

export function flattenFragments(elements: EspComposeElement[]): EspComposeElement[] {
  const out: EspComposeElement[] = [];
  for (const el of elements) {
    if (el.type === Fragment) {
      const children = el.props.children;
      if (children != null) {
        const nested = Array.isArray(children) ? children : [children];
        out.push(...flattenFragments(nested));
      }
    } else {
      out.push(el);
    }
  }
  return out;
}
