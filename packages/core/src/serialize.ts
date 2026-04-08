import type { EspComposeElement } from './types';
import { isRef } from './types';
import { isIRReactiveNode } from './reactive-node';
import type { IRReactiveNode } from './reactive-node';
import { isSecretValue } from './secret';

import { registerRefTag } from './ref-registry';
import { isTriggerVar } from './trigger-args';
import type { TriggerVar } from './trigger-args';
import { LambdaMarker, SecretMarker, QuotedMarker, isSerializeMarker } from './markers';
import type { IRActionNode } from './ir/action-types';

// ── IR Capture ─────────────────────────────────────────────────────────────
// When capture is active, serializeValue() records pre-serialization data
// in WeakMaps/Maps keyed by the serialized output objects. The IR builder
// uses these to produce a target-agnostic semantic IR that preserves
// IRReactiveNodes, Refs, action metadata, and secrets.
// ────────────────────────────────────────────────────────────────────────────

export interface SerializationCaptures {
  /** Serialized Scalar → original IRReactiveNode */
  reactives: WeakMap<object, IRReactiveNode>;
  /** Serialized token string → original Ref object */
  refs: Map<string, unknown>;
  /** Serialized action array/object → pre-resolution action metadata */
  actions: WeakMap<object, { rawActions: IRActionNode[]; refBindings?: Record<string, unknown> }>;
  /** Serialized Scalar → secret key string */
  secrets: WeakMap<object, string>;
  /** Serialized Scalar → TriggerVar marker */
  triggerVars: WeakMap<object, { name: string }>;
}

let _captures: SerializationCaptures | null = null;

/**
 * Begin capturing pre-serialization data during serializeValue() calls.
 * Call stopSerializationCapture() to retrieve the captured data.
 */
export function startSerializationCapture(): void {
  _captures = {
    reactives: new WeakMap(),
    refs: new Map(),
    actions: new WeakMap(),
    secrets: new WeakMap(),
    triggerVars: new WeakMap(),
  };
}

/**
 * Stop capturing and return the collected data.
 * Returns null if capture was not active.
 */
export function stopSerializationCapture(): SerializationCaptures | null {
  const result = _captures;
  _captures = null;
  return result;
}

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
 * Serialize a prop value for output.
 * Ref<T> instances (produced by useRef()) are serialized as their string token.
 * CSS-style hex colours (#RRGGBB) are converted to ESPHome's 0xRRGGBB format.
 * YAML 1.1 boolean-like strings (on, off, yes, no) are wrapped in a QuotedMarker.
 * Plain objects have their keys recursively converted to snake_case.
 * Arrays are mapped element-wise.
 * All other values are passed through unchanged.
 */
export function serializeValue(v: unknown): unknown {
  if (isTriggerVar(v)) {
    const result = createLambdaScalar(v.toLambda());
    if (_captures) _captures.triggerVars.set(result as object, { name: (v as TriggerVar).name });
    return result;
  }
  if (isIRReactiveNode(v)) {
    const result = serializeIRReactiveNode(v);
    if (_captures) _captures.reactives.set(result as object, v as IRReactiveNode);
    return result;
  }
  if (isSecretValue(v)) {
    const s = new SecretMarker(v.key);
    if (_captures) _captures.secrets.set(s, v.key);
    return s;
  }
  // Function values with compiled action tree metadata (trigger handler path)
  if (typeof v === 'function' && hasCompiledActions(v)) {
    const fn = v as CompiledActionFunction;
    let actions = fn.__compiledActions;
    if (fn.__refBindings) {
      actions = resolveRefBindingsInActions(actions, fn.__refBindings);
    }
    const result = restoreLambdaMarkers(actions);
    if (_captures && result !== null && typeof result === 'object') {
      _captures.actions.set(result as object, {
        rawActions: fn.__compiledActions as IRActionNode[],
        refBindings: fn.__refBindings,
      });
    }
    return result;
  }
  if (isRef(v)) {
    const token = v.toString();
    if (_captures) _captures.refs.set(token, v);
    return token;
  }
  if (typeof v === 'string') {
    const m = HEX_COLOR_RE.exec(v);
    if (m) return `0x${m[1]}`;
    if (YAML11_BOOL.has(v.toLowerCase())) {
      return new QuotedMarker(v);
    }
  }
  if (Array.isArray(v)) return v.map(serializeValue);
  if (isSerializeMarker(v)) return v;
  if (v !== null && typeof v === 'object') {
    return keysToSnakeCase(v as Record<string, unknown>);
  }
  return v;
}

export function stripUndefined(obj: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
}

// ── Lambda marker restoration ──────────────────────────────────────────────
// Lowered action trees use { __lambda__: "code" } markers for lambda values
// because they must survive JSON.stringify (script-transformer embeds them as
// JSON in the source). This restores them to YAML !lambda scalars.

function isLambdaMarker(v: unknown): v is { __lambda__: string } {
  return v !== null && typeof v === 'object' && '__lambda__' in v &&
    typeof (v as Record<string, unknown>).__lambda__ === 'string';
}

function restoreLambdaMarkers(value: unknown): unknown {
  if (isLambdaMarker(value)) return createLambdaScalar(value.__lambda__);
  if (Array.isArray(value)) return value.map(restoreLambdaMarkers);
  if (value !== null && typeof value === 'object') {
    const obj: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      obj[k] = restoreLambdaMarkers(v);
    }
    return obj;
  }
  return value;
}

/**
 * Serialize a IRReactiveNode as a lambda marker.
 *
 * Generates a placeholder lambda body; the actual target-specific code generation
 * happens in the target's lowering layer (e.g. esphome-target's lower-yaml.ts).
 */
function serializeIRReactiveNode(node: IRReactiveNode): unknown {
  if (node.kind === 'expression' && node.sourceId && node.property) {
    return createLambdaScalar(`return id(${node.sourceId})${node.property};`);
  }
  return createLambdaScalar(`return espcompose::${node.nodeId}.get();`);
}

/**
 * Create a lambda marker from a code body string.
 * Used by the serializer and reactive injector to produce lambda values.
 */
export function createLambdaScalar(body: string): unknown {
  return new LambdaMarker(body);
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
export const Fragment: unique symbol = Symbol.for('@espcompose/core.Fragment') as unknown as typeof Fragment;

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
