// ────────────────────────────────────────────────────────────────────────────
// LVGL widget tree serialization
//
// ESPHome LVGL uses a list-of-single-key-dicts pattern for widgets:
//   widgets: [{button: {x: 10}}, {label: {text: "hi"}}]
//
// Children of <lvgl> are split into:
//   - <lvgl-page> children  → pages: [{...pageProps, widgets: [...]}]
//   - other <lvgl-*> children → widgets: [{type: config}, ...]
//
// Widget nesting is recursive: a <lvgl-button> with <lvgl-label> children
// produces { button: { ...props, widgets: [{ label: {...} }] } }.
// ────────────────────────────────────────────────────────────────────────────

import type { EspComposeElement, FunctionComponent, Ref } from './types';
import { RefHandle } from './types';
import { withContext } from './hooks/useContext';
import type { Context } from './hooks/useContext';
import { LvglContext } from './hooks/useLvgl';
import type { LvglComponentRef } from './component-aliases';
import { isIRReactiveNode } from './reactive-node';
import type { IRReactiveNode } from './reactive-node';
import { registerReactiveBinding } from './hooks/useReactiveScope';
import { LVGL_PART_FLAGS, LVGL_STATE_FLAGS } from './lvgl-actions';
import {
  camelToSnake,
  extractElementProps,
  flattenFragments,
  keysToSnakeCase,
  setCurrentSource,
  stripUndefined,
  toYamlKey,
} from './serialize';
import { expandCssStyle } from './style-mapping';

import { isEcCanvasElement, ecCanvasToPlain } from './ec-canvas-serialize';

// Known LVGL part and state names in camelCase, used for recursive binding detection.
// Excludes 'main' and 'default' since those are the top-level defaults.
const PART_NAMES_CAMEL = new Set(
  Object.keys(LVGL_PART_FLAGS).filter(k => k !== 'main').map(k => snakeToCamel(k)),
);
const STATE_NAMES_CAMEL = new Set(
  Object.keys(LVGL_STATE_FLAGS).filter(k => k !== 'default').map(k => snakeToCamel(k)),
);

function snakeToCamel(s: string): string {
  return s.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

/** Returns true for any JSX element type that represents an LVGL widget (lvgl-*). */
export function isLvglElement(type: string | symbol | FunctionComponent): type is string {
  return typeof type === 'string' && type.startsWith('lvgl-');
}

/**
 * Resolve an element (handling function components and fragments) into a flat
 * list of intrinsic elements ready for LVGL widget collection.
 */
function resolveLvglChildren(
  children: EspComposeElement | EspComposeElement[] | undefined
): EspComposeElement[] {
  if (!children) return [];
  const arr = Array.isArray(children) ? children : [children];
  const flat = flattenFragments(arr);
  const resolved: EspComposeElement[] = [];
  for (const el of flat) {
    if (typeof el.type === 'function') {
      // Extract ref so it is not passed to the component function, then
      // forward it onto the root element the component returns.
      const { ref, ...propsWithoutRef } = el.props as Record<string, unknown> & { ref?: unknown };
      const result = el.type(propsWithoutRef as never);
      if (result == null) continue;
      const results = Array.isArray(result) ? result : [result];
      let rendered = results;
      if (ref != null) {
        if (results.length === 1 && !Array.isArray(results[0])) {
          rendered = [{ ...results[0], props: { ...results[0].props, ref } }];
        } else {
          console.warn(
            `Ref passed to function component that returned ${results.length} element(s); ref was not forwarded.`,
          );
        }
      }
      resolved.push(...resolveLvglChildren(rendered));
    } else if (el.type === 'context') {
      // Context provider intrinsic: push context and recurse into children
      const { context: ctx, value, children: ctxChildren } = el.props as {
        context: Context<unknown>; value: unknown;
        children?: EspComposeElement | EspComposeElement[];
      };
      const inner = withContext(ctx, value, () => resolveLvglChildren(ctxChildren));
      resolved.push(...inner);
    } else {
      resolved.push(el);
    }
  }
  return resolved;
}

interface NestedReactiveProp {
  propName: string;
  node: IRReactiveNode;
  part?: string;
  state?: string;
}

/**
 * Walk an LVGL prop bag and collect any IRReactiveNode leaves, including nested
 * part/state sub-objects (e.g. indicator, pressed, indicator.pressed).
 *
 * Also handles the ESPHome `state: { checked: value, ... }` wrapper used by
 * widgets like lvgl-switch. Reactive nodes inside the `state` container are
 * registered as direct prop bindings (e.g. targetProp = 'checked').
 */
function collectReactiveProps(
  obj: Record<string, unknown>,
  out: NestedReactiveProp[],
  part?: string,
  state?: string,
): void {
  for (const [key, value] of Object.entries(obj)) {
    if (key === 'widgets' || key === 'children') continue;

    if (isIRReactiveNode(value)) {
      out.push({ propName: key, node: value, part, state });
      continue;
    }

    // Recurse into nested part/state sub-objects (up to 2 levels)
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      // ESPHome 'state' wrapper: { state: { checked: <reactive>, ... } }
      // Each entry maps a state flag name to a value — treat reactive entries
      // as top-level prop bindings so the codegen can emit lv_obj_add/clear_state.
      if (key === 'state' && !part) {
        for (const [stateKey, stateValue] of Object.entries(value as Record<string, unknown>)) {
          if (isIRReactiveNode(stateValue)) {
            out.push({ propName: stateKey, node: stateValue, part, state: undefined });
          }
        }
        continue;
      }

      if (!part && !state && PART_NAMES_CAMEL.has(key)) {
        collectReactiveProps(value as Record<string, unknown>, out, key, undefined);
      } else if (!part && !state && STATE_NAMES_CAMEL.has(key)) {
        collectReactiveProps(value as Record<string, unknown>, out, undefined, key);
      } else if (part && !state && STATE_NAMES_CAMEL.has(key)) {
        collectReactiveProps(value as Record<string, unknown>, out, part, key);
      }
    }
  }
}

/**
 * Detect reactive props on a data bag, auto-assign an ID if needed, and
 * register reactive bindings so the compiler can emit C++ runtime wiring.
 */
function detectAndRegisterReactiveProps(
  data: Record<string, unknown>,
  yamlKey: string,
): void {
  const reactiveProps: NestedReactiveProp[] = [];
  collectReactiveProps(data, reactiveProps);

  if (reactiveProps.length > 0) {
    let widgetId = typeof data.id === 'string' ? data.id : undefined;
    if (!widgetId) {
      widgetId = `rw_${Math.random().toString(36).slice(2, 11)}`;
      data.id = widgetId;
    }

    for (const { propName, node, part, state } of reactiveProps) {
      registerReactiveBinding({
        kind: 'binding',
        targetId: widgetId,
        targetType: yamlKey,
        targetProp: camelToSnake(propName),
        expression: node,
        ...(part ? { part: camelToSnake(part) } : {}),
        ...(state ? { state: camelToSnake(state) } : {}),
      });
    }
  }
}

/**
 * Expand and hoist the `style` prop into the data object in-place.
 * CSS aliases are mapped to LVGL camelCase, then merged into `data`.
 */
function hoistStyleProp(data: Record<string, unknown>): void {
  if (data.style != null && typeof data.style === 'object' && !Array.isArray(data.style)) {
    const expanded = expandCssStyle(data.style as Record<string, unknown>);
    for (const [key, value] of Object.entries(expanded)) {
      data[key] = value;
    }
    delete data.style;
  }
}

/**
 * Convert a single LVGL widget element into its YAML-ready plain object:
 *   { widget_type: { ...props, widgets?: [...] } }
 *
 * Recursively processes nested lvgl-* children into a `widgets` array.
 *
 * When Expression<T> instances are detected in props:
 * 1. An auto-generated `id` is assigned if the widget doesn't already have one.
 * 2. Each Expression prop is registered as a IRBinding so the compiler
 *    can emit on_state/on_value trigger wiring later.
 */
export function lvglWidgetToPlain(el: EspComposeElement): Record<string, unknown> {
  setCurrentSource(el.__source);
  const { allProps, children } = extractElementProps(el);

  const widgetChildren = resolveLvglChildren(children);
  const nestedWidgets = widgetChildren
    .filter((c) => isLvglElement(c.type) || (typeof c.type === 'string' && isEcCanvasElement(c.type)))
    .map((c) => (typeof c.type === 'string' && isEcCanvasElement(c.type)) ? ecCanvasToPlain(c) : lvglWidgetToPlain(c));

  const data: Record<string, unknown> = { ...allProps };
  hoistStyleProp(data);

  const yamlKey = toYamlKey(el.type as string);

  detectAndRegisterReactiveProps(data, yamlKey);

  // Serialize own props first, then attach already-serialized child widgets
  // to avoid double-serialization which breaks capture WeakMap references.
  const serialized = stripUndefined(keysToSnakeCase(data));
  if (nestedWidgets.length > 0) {
    serialized.widgets = nestedWidgets;
  }

  return { [yamlKey]: serialized };
}

/**
 * Build the LVGL section for a <lvgl> element.
 *
 * Splits children into pages (<lvgl-page>) and direct widgets (other lvgl-*),
 * and merges them with the element's own props.
 */
export function buildLvglSection(el: EspComposeElement): Record<string, unknown> {
  setCurrentSource(el.__source);
  // Capture the raw ref before extractElementProps converts it to an id string.
  let lvglRef = (el.props as Record<string, unknown>).ref as Ref<LvglComponentRef> | undefined;

  // Auto-create a ref when <lvgl> has no explicit ref prop, so useLvgl()
  // works even when the user doesn't need the ref at the call site.
  if (lvglRef == null) {
    lvglRef = new RefHandle<LvglComponentRef>() as unknown as Ref<LvglComponentRef>;
    el = { ...el, props: { ...el.props, ref: lvglRef } };
  }

  const { allProps, children } = extractElementProps(el);

  // Push the lvgl ref into context so useLvgl() returns it inside the tree.
  return withContext(LvglContext, lvglRef, () => {
    const resolved = resolveLvglChildren(children);
    const pages: Record<string, unknown>[] = [];
    const topWidgets: Record<string, unknown>[] = [];

    for (const child of resolved) {
      if (child.type === 'lvgl-page') {
        setCurrentSource(child.__source);
        const { allProps: pageProps, children: pageChildren } = extractElementProps(child);
        const pageResolved = resolveLvglChildren(pageChildren);
        const pageWidgets = pageResolved
          .filter((c) => isLvglElement(c.type) || (typeof c.type === 'string' && isEcCanvasElement(c.type)))
          .map((c) => (typeof c.type === 'string' && isEcCanvasElement(c.type)) ? ecCanvasToPlain(c) : lvglWidgetToPlain(c));
        const pageData: Record<string, unknown> = { ...pageProps };
        hoistStyleProp(pageData);
        detectAndRegisterReactiveProps(pageData, 'page');
        // Serialize own props first, then attach already-serialized child widgets.
        const serializedPage = stripUndefined(keysToSnakeCase(pageData));
        if (pageWidgets.length > 0) {
          serializedPage.widgets = pageWidgets;
        }
        pages.push(serializedPage);
      } else if (isLvglElement(child.type)) {
        topWidgets.push(lvglWidgetToPlain(child));
      } else if (typeof child.type === 'string' && isEcCanvasElement(child.type)) {
        topWidgets.push(ecCanvasToPlain(child));
      }
    }

    // Serialize own props first, then attach already-serialized children.
    const serialized = stripUndefined(keysToSnakeCase({ ...allProps }));
    if (pages.length > 0) serialized.pages = pages;
    if (topWidgets.length > 0) serialized.widgets = topWidgets;

    return serialized;
  });
}
