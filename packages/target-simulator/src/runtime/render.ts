// ────────────────────────────────────────────────────────────────────────────
// Simulator render — traverses JSX element tree and produces RuntimeNode[]
//
// Mirrors the SDK's render pipeline (runtime.ts + lvgl.ts) but produces
// RuntimeNode trees instead of YAML-ready objects. Resolves functional
// components, flattens fragments, extracts LVGL widget hierarchy, and
// classifies props as static, reactive, action, or ref.
//
// Key difference from SDK render:
//   - Does NOT convert keys to snake_case
//   - Does NOT serialize ReactiveNodes to !lambda scalars
//   - Preserves JS closures and action handlers as callable functions
//   - Produces a typed tree for DOM rendering
// ────────────────────────────────────────────────────────────────────────────

import type { RuntimeNode, RuntimeProp, RuntimeDependency } from '../types';
import {
  enterHookScope,
  exitHookScope,
  SimRef,
  registerSimRefTag,
  startTracking,
  stopTracking,
  type TrackedDep,
} from './hooks';

// ── Types from the SDK's element model ───────────────────────────────────────

interface EspComposeElement {
  type: string | symbol | ((...args: unknown[]) => unknown);
  props: Record<string, unknown> & { children?: unknown };
}

// Fragment sentinel — same symbol as SDK
const Fragment: unique symbol = Symbol.for('@espcompose/core.Fragment') as unknown as typeof Fragment;

// ── ID generation ────────────────────────────────────────────────────────────

let nodeCounter = 0;

export function resetNodeCounter(): void {
  nodeCounter = 0;
}

function nextNodeId(type: string): string {
  return `sim_${type}_${nodeCounter++}`;
}

// ── Prop classification ──────────────────────────────────────────────────────

/** Known trigger/event prop prefixes in LVGL and ESPHome. */
const TRIGGER_PROP_PATTERNS = /^on[A-Z_]/;

/**
 * Test if an object has reactive getters (property descriptors that track
 * dependencies when read). This handles the binding objects from useHAEntity().
 */
function _isReactiveGetter(_value: unknown, _key: string): boolean {
  // We'll detect reactive values during the prop walk in classifyElementProps
  return false;
}

/**
 * Walk a prop value, detecting if it triggers dependency tracking.
 * Returns a reactive prop if dependencies are found.
 */
function classifyPropWithTracking(key: string, value: unknown, binding: unknown): RuntimeProp {
  // First check: refs
  if (value instanceof SimRef) {
    return { kind: 'ref', refId: value.toString() };
  }

  // Second check: action/trigger handlers
  if (typeof value === 'function' && TRIGGER_PROP_PATTERNS.test(key)) {
    return {
      kind: 'action',
      handler: value as (...args: unknown[]) => void | Promise<void>,
    };
  }

  // Third check: ReactiveNode instances (from theme resolvers / derived memos).
  // These have a get()/valueOf() that returns a simulator value.
  if (value != null && typeof value === 'object' && '__reactive_node__' in value) {
    const rn = value as { get?: () => unknown; valueOf?: () => unknown };
    const resolved = typeof rn.get === 'function' ? rn.get() : (typeof rn.valueOf === 'function' ? rn.valueOf() : value);
    return { kind: 'static', value: resolved };
  }

  // Fourth check: test if reading triggers dependency tracking
  // (handles HA entity binding properties like entity.isOn, entity.stateText)
  startTracking();
  let evaluatedValue: unknown;
  try {
    if (binding && typeof binding === 'object') {
      // Re-read the property to trigger tracking proxy
      evaluatedValue = (binding as Record<string, unknown>)[key];
    } else {
      evaluatedValue = value;
    }
  } finally {
    // intentionally empty
  }
  const deps = stopTracking();

  if (deps.length > 0) {
    return {
      kind: 'reactive',
      current: evaluatedValue,
      evaluate: () => (binding as Record<string, unknown>)[key],
      dependencies: deps.map(trackedDepToRuntime),
    };
  }

  // Static value
  return { kind: 'static', value };
}

function trackedDepToRuntime(dep: TrackedDep): RuntimeDependency {
  return {
    sourceId: dep.sourceId,
    sourceType: dep.sourceType,
    property: dep.property,
  };
}

function _createReactiveProp(_value: unknown, _key: string): RuntimeProp {
  return { kind: 'static', value: _value };
}

// ── Element tree traversal ───────────────────────────────────────────────────

function flattenFragments(elements: EspComposeElement[]): EspComposeElement[] {
  const out: EspComposeElement[] = [];
  for (const el of elements) {
    if (el.type === Fragment) {
      const children = el.props.children;
      if (children != null) {
        const nested = Array.isArray(children) ? children : [children];
        out.push(...flattenFragments(nested as EspComposeElement[]));
      }
    } else {
      out.push(el);
    }
  }
  return out;
}

function resolveChildren(
  children: unknown
): EspComposeElement[] {
  if (children == null) return [];
  const arr = Array.isArray(children) ? children : [children];
  return flattenFragments(arr.filter((c): c is EspComposeElement => c != null));
}

/**
 * Resolve an element to its concrete intrinsic form.
 * Calls function components, flattens fragments, handles context providers.
 */
function resolveElement(el: EspComposeElement): EspComposeElement[] {
  if (typeof el.type === 'function') {
    const result = (el.type as (props: unknown) => unknown)(el.props);
    if (result == null) return [];
    const arr = Array.isArray(result) ? result : [result];
    return arr.flatMap(r => r != null ? resolveElement(r as EspComposeElement) : []);
  }

  if (el.type === Fragment) {
    const children = resolveChildren(el.props.children);
    return children.flatMap(resolveElement);
  }

  // Context provider — resolve children (context value doesn't matter in simulator)
  if (el.type === 'context') {
    const children = resolveChildren(el.props.children);
    return children.flatMap(resolveElement);
  }

  return [el];
}

// ── LVGL widget rendering ────────────────────────────────────────────────────

function isLvglElement(type: string): boolean {
  return type.startsWith('lvgl-');
}

/** Strip the 'lvgl-' prefix to get the widget type name. */
function lvglWidgetType(type: string): string {
  return type.replace(/^lvgl-/, '');
}

/**
 * Resolve LVGL children — same as resolveElement but filtered for LVGL widgets.
 */
function resolveLvglChildren(children: unknown): EspComposeElement[] {
  const resolved = resolveChildren(children);
  return resolved.flatMap(resolveElement);
}

/**
 * Convert a single LVGL widget element to a RuntimeNode.
 */
function lvglWidgetToRuntimeNode(el: EspComposeElement): RuntimeNode {
  const type = lvglWidgetType(el.type as string);
  const { children, ref, 'x:custom': xCustom, ...ownProps } = el.props as Record<string, unknown>;

  // Merge x:custom props
  const allProps = xCustom != null
    ? { ...ownProps, ...(xCustom as Record<string, unknown>) }
    : ownProps;

  // Assign ID from ref or generate one
  let id: string;
  if (ref instanceof SimRef) {
    id = ref.toString();
    registerSimRefTag(id, type);
  } else if (typeof allProps.id === 'string') {
    id = allProps.id;
  } else {
    id = nextNodeId(type);
  }

  // Classify props
  const props: Record<string, RuntimeProp> = {};
  for (const [key, value] of Object.entries(allProps)) {
    if (key === 'id') continue; // ID tracked separately

    // Check if value comes from a reactive binding (e.g. entity.stateText)
    // by re-reading it with tracking active
    const prop = classifyPropWithTracking(key, value, null);
    props[key] = prop;
  }

  // Process children — recurse into nested LVGL widgets
  const childElements = resolveLvglChildren(children);
  const childNodes = childElements
    .filter(c => typeof c.type === 'string' && isLvglElement(c.type))
    .map(lvglWidgetToRuntimeNode);

  return { id, type, props, children: childNodes };
}

/**
 * Build the LVGL section — split children into pages and direct widgets.
 */
function buildLvglNodes(el: EspComposeElement): RuntimeNode[] {
  const children = resolveLvglChildren(el.props.children);
  const nodes: RuntimeNode[] = [];

  for (const child of children) {
    if (typeof child.type !== 'string') continue;

    if (child.type === 'lvgl-page') {
      const pageType = 'page';
      const { children: pageChildren, ref, ...pageOwnProps } = child.props as Record<string, unknown>;

      let id: string;
      if (ref instanceof SimRef) {
        id = ref.toString();
        registerSimRefTag(id, pageType);
      } else {
        id = nextNodeId(pageType);
      }

      const props: Record<string, RuntimeProp> = {};
      for (const [key, value] of Object.entries(pageOwnProps)) {
        if (key === 'id') continue;
        props[key] = classifyPropWithTracking(key, value, null);
      }

      const pageChildElements = resolveLvglChildren(pageChildren);
      const pageChildNodes = pageChildElements
        .filter(c => typeof c.type === 'string' && isLvglElement(c.type))
        .map(lvglWidgetToRuntimeNode);

      nodes.push({ id, type: pageType, props, children: pageChildNodes });
    } else if (isLvglElement(child.type)) {
      nodes.push(lvglWidgetToRuntimeNode(child));
    }
  }

  return nodes;
}

// ── Main render function ─────────────────────────────────────────────────────

/**
 * Render an EspComposeElement tree into RuntimeNode[].
 *
 * This is the simulator's entry point. It:
 * 1. Enters hook scope (allows useHAEntity, useMemo, etc.)
 * 2. Traverses the JSX tree, resolving functional components
 * 3. Extracts the LVGL widget tree into RuntimeNodes
 * 4. Exits hook scope
 *
 * Non-LVGL elements (wifi, sensor, api, etc.) are silently consumed.
 */
export function simulatorRender(element: EspComposeElement): RuntimeNode[] {
  resetNodeCounter();
  enterHookScope();

  try {
    return traverseForLvgl(element);
  } finally {
    exitHookScope();
  }
}

/**
 * Traverse the element tree looking for LVGL content.
 * Resolves functional components along the way.
 */
function traverseForLvgl(el: EspComposeElement): RuntimeNode[] {
  // Function component — resolve and recurse
  if (typeof el.type === 'function') {
    const result = (el.type as (props: unknown) => unknown)(el.props);
    if (result == null) return [];
    const arr = Array.isArray(result) ? result : [result];
    return arr.flatMap(r => r != null ? traverseForLvgl(r as EspComposeElement) : []);
  }

  // Fragment — recurse into children
  if (el.type === Fragment) {
    const children = resolveChildren(el.props.children);
    return children.flatMap(traverseForLvgl);
  }

  // Context provider — recurse
  if (el.type === 'context') {
    const children = resolveChildren(el.props.children);
    return children.flatMap(traverseForLvgl);
  }

  const type = el.type as string;

  // LVGL container — build the full section
  if (type === 'lvgl') {
    return buildLvglNodes(el);
  }

  // <esphome> root — recurse into children looking for <lvgl>
  if (type === 'esphome') {
    const children = resolveChildren(el.props.children);
    return children.flatMap(traverseForLvgl);
  }

  // Other intrinsic elements (wifi, api, sensor, etc.) — skip
  // but recurse into children in case they contain nested <lvgl>
  const children = resolveChildren(el.props.children);
  if (children.length > 0) {
    return children.flatMap(traverseForLvgl);
  }

  return [];
}
