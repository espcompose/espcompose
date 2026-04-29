import type { EspComposeElement } from '../types';
import type { JsxSourceLocation } from '../types';
import { isRef } from '../types';
import { isIRReactiveNode } from '../reactive';
import type { IRReactiveNode } from '../reactive';
import { isSecretValue } from './secret';

import { registerRefTag } from './ref-registry';
import { isTriggerVar } from '../actions';
import type { TriggerVar } from '../actions';
import { LambdaMarker, SecretMarker, QuotedMarker, isSerializeMarker } from './markers';
import type { IRActionNode } from '../ir/action-types';
import { resolveOverlayControllerRefs, cleanOverlayControllerRefs } from '../actions';
import { resolveControllerMethodCalls, cleanControllerRefs } from '../actions';
import { resolveScriptHandleClosureIndex, cleanScriptHandleRefs } from '../actions';
import { getYamlShaper } from '../lvgl';

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

// ── JSX source tracking ────────────────────────────────────────────────────
// Set by runtime.ts before serializing each element's props so that errors
// thrown inside serializeValue() can report the originating TSX location.
// ────────────────────────────────────────────────────────────────────────────
let _currentSource: JsxSourceLocation | undefined;

export function setCurrentSource(source: JsxSourceLocation | undefined): void {
  _currentSource = source;
}

/** Format a JsxSourceLocation for display in error messages. */
function formatSource(source: JsxSourceLocation): string {
  const col = source.columnNumber != null ? `:${source.columnNumber}` : '';
  return `${source.fileName}:${source.lineNumber}${col}`;
}

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
      // refSlots carry binding-name metadata for the closure-rewrite pass.
      // They must NOT be resolved to literal tokens.
      // IR meta keys (kind, domain, operation) are semantic identifiers,
      // not value slots — they may coincidentally collide with a binding
      // name (e.g. domain: 'light' colliding with a `light` ref binding)
      // but must never be substituted.
      if (key === 'refSlots' || key === 'kind' || key === 'domain' || key === 'operation') {
        result[key] = val;
        continue;
      }
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

/**
 * Transform a JSX element type into the target-specific element key.
 *
 * Implementation is supplied by the target via `setYamlShaper()` (registered
 * during `target.registerRenderHooks(coreSdk)`). Core does not encode the
 * snake_case spelling itself.
 */
export function transformElementType(type: string): string {
  return getYamlShaper().transformElementType(type);
}

/**
 * Transform a record's keys via the target-supplied prop-key transformer
 * and recursively serialize each value. Target-neutral name; the actual
 * key transform (e.g. camelCase → snake_case) is hook-supplied.
 */
export function transformPropKeys(obj: Record<string, unknown>): Record<string, unknown> {
  const shaper = getYamlShaper();
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    out[shaper.transformPropKey(k)] = serializeValue(v);
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
    // Resolve deferred controller method calls (ctrl.show() → script_execute)
    resolveControllerMethodCalls(actions as IRActionNode[], fn.__refBindings);
    // Resolve deferred overlay controller refs (templateKey/instanceIndex)
    resolveOverlayControllerRefs(actions as IRActionNode[], fn.__refBindings);
    // Patch IRScriptExecute.closureIndex for user-written scriptHandle calls
    // by reading __closureIndex from the bound ScriptHandle in __refBindings.
    resolveScriptHandleClosureIndex(actions as IRActionNode[], fn.__refBindings);
    // Remove resolved overlay controller objects from refBindings so they don't
    // cause string-replacement damage during lambda ref resolution in the
    // lowering phase (OverlayController.toString() → '[object Object]' would
    // corrupt signal names containing 'overlay').
    if (fn.__refBindings) {
      cleanControllerRefs(fn.__refBindings);
      cleanOverlayControllerRefs(fn.__refBindings);
      cleanScriptHandleRefs(fn.__refBindings);
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
  // Bare function values that the script transformer didn't compile.
  // This is a build error — the user needs to move the handler to a
  // JSX attribute or wrap it so the compiler can detect it.
  if (typeof v === 'function') {
    const name = (v as { name?: string }).name || '(anonymous)';
    const loc = _currentSource ? ` at ${formatSource(_currentSource)}` : '';
    throw new Error(
      `Uncompiled function "${name}" encountered during serialization${loc}. ` +
      `Arrow functions used as event handlers must be direct JSX attribute values ` +
      `(e.g. onPress={() => { ... }}) so the compiler can transform them into actions. ` +
      `Functions passed through variables, object literals, or arrays are not detected.`,
    );
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
    return transformPropKeys(v as Record<string, unknown>);
  }
  return v;
}

/** Remove `undefined`-valued entries from a plain object. Target-neutral. */
export function compactObject(obj: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
}

/**
 * Like `serializeValue` for the leaf-value cases (refs/secrets/reactives/
 * functions/markers/primitives), but for plain object values it recurses
 * preserving camelCase keys instead of converting to snake_case.
 *
 * Used when building target-neutral IR shapes (e.g. `IRWidget.props`) that
 * must keep camelCase keys; the consuming target performs key conversion in
 * its own lowering layer. Captures fire normally because the leaf cases are
 * delegated to `serializeValue`.
 */
export function serializeValuePreservingKeys(v: unknown): unknown {
  if (v == null) return v;
  if (Array.isArray(v)) return v.map(serializeValuePreservingKeys);
  if (typeof v === 'object') {
    if (
      isTriggerVar(v) ||
      isIRReactiveNode(v) ||
      isSecretValue(v) ||
      isRef(v) ||
      isSerializeMarker(v)
    ) {
      return serializeValue(v);
    }
    if (typeof v === 'function') return serializeValue(v);
    // Plain object: recurse preserving keys.
    const out: Record<string, unknown> = {};
    for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
      out[k] = serializeValuePreservingKeys(val);
    }
    return out;
  }
  // Primitives (strings get hex/yaml-bool processing inside serializeValue)
  return serializeValue(v);
}

/**
 * Apply `serializeValuePreservingKeys` to every value of an object,
 * preserving the original (camelCase) keys.
 */
export function serializeValuesPreservingKeys(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k] = serializeValuePreservingKeys(v);
  }
  return out;
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
 * The body is an opaque placeholder — the target's lowering layer
 * (e.g. esphome-target's lower-yaml.ts) replaces it with the concrete
 * code via the captured node reference (see `_captures.reactives`).
 */
function serializeIRReactiveNode(node: IRReactiveNode): unknown {
  return createLambdaScalar(`/* reactive ${node.nodeId} */`);
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
  if (!el || !el.props) {
    const isFunction = typeof el === 'function';
    throw new Error(
      `extractElementProps: ${isFunction ? `received a function (${(el as { name?: string }).name || 'anonymous'}) instead of an element — did you forget to invoke it as JSX (<Component /> instead of Component)?` : `element has undefined props.`} ` +
      `type=${el ? (typeof el.type === 'function' ? el.type.name : String(el.type)) : 'MISSING'}, ` +
      `keys=${el ? Object.keys(el).join(',') : 'N/A'}, raw=${JSON.stringify(el)}`,
    );
  }
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
    if (el == null) continue;
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
