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

import type { EspComposeElement, FunctionComponent } from './types';
import { withContext } from './hooks/useContext';
import type { Context } from './hooks/useContext';
import { isReactiveNode } from './reactive-node';
import type { ReactiveNode } from './reactive-node';
import { registerReactiveBinding } from './hooks/useReactiveScope';
import { LVGL_PART_FLAGS, LVGL_STATE_FLAGS } from './lvgl-actions';
import {
  camelToSnake,
  extractElementProps,
  flattenFragments,
  keysToSnakeCase,
  stripUndefined,
  toYamlKey,
} from './serialize';

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
      const result = el.type(el.props as never);
      if (result == null) continue;
      const rendered = Array.isArray(result) ? result : [result];
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
  node: ReactiveNode;
  part?: string;
  state?: string;
}

/**
 * Walk an LVGL prop bag and collect any ReactiveNode leaves, including nested
 * part/state sub-objects (e.g. indicator, pressed, indicator.pressed).
 */
function collectReactiveProps(
  obj: Record<string, unknown>,
  out: NestedReactiveProp[],
  part?: string,
  state?: string,
): void {
  for (const [key, value] of Object.entries(obj)) {
    if (key === 'widgets' || key === 'children') continue;

    if (isReactiveNode(value)) {
      out.push({ propName: key, node: value, part, state });
      continue;
    }

    // Recurse into nested part/state sub-objects (up to 2 levels)
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
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
 * Convert a single LVGL widget element into its YAML-ready plain object:
 *   { widget_type: { ...props, widgets?: [...] } }
 *
 * Recursively processes nested lvgl-* children into a `widgets` array.
 *
 * When Expression<T> instances are detected in props:
 * 1. An auto-generated `id` is assigned if the widget doesn't already have one.
 * 2. Each Expression prop is registered as a ReactiveBinding so the compiler
 *    can emit on_state/on_value trigger wiring later.
 */
export function lvglWidgetToPlain(el: EspComposeElement): Record<string, unknown> {
  const { allProps, children } = extractElementProps(el);

  const widgetChildren = resolveLvglChildren(children);
  const lvglChildren = widgetChildren.filter((c) => isLvglElement(c.type));
  const nestedWidgets = lvglChildren.map(lvglWidgetToPlain);

  const data: Record<string, unknown> = { ...allProps };

  if (nestedWidgets.length > 0) {
    data.widgets = nestedWidgets;
  }

  const yamlKey = toYamlKey(el.type as string);

  detectAndRegisterReactiveProps(data, yamlKey);

  return { [yamlKey]: stripUndefined(keysToSnakeCase(data)) };
}

/**
 * Build the LVGL section for a <lvgl> element.
 *
 * Splits children into pages (<lvgl-page>) and direct widgets (other lvgl-*),
 * and merges them with the element's own props.
 */
export function buildLvglSection(el: EspComposeElement): Record<string, unknown> {
  const { allProps, children } = extractElementProps(el);

  const resolved = resolveLvglChildren(children);
  const pages: Record<string, unknown>[] = [];
  const topWidgets: Record<string, unknown>[] = [];

  for (const child of resolved) {
    if (child.type === 'lvgl-page') {
      const { allProps: pageProps, children: pageChildren } = extractElementProps(child);
      const pageResolved = resolveLvglChildren(pageChildren);
      const pageWidgets = pageResolved.filter((c) => isLvglElement(c.type)).map(lvglWidgetToPlain);
      const pageData: Record<string, unknown> = { ...pageProps };
      if (pageWidgets.length > 0) {
        pageData.widgets = pageWidgets;
      }
      detectAndRegisterReactiveProps(pageData, 'page');
      pages.push(stripUndefined(keysToSnakeCase(pageData)));
    } else if (isLvglElement(child.type)) {
      topWidgets.push(lvglWidgetToPlain(child));
    }
    // Non-lvgl children are ignored (shouldn't appear here)
  }

  const data: Record<string, unknown> = { ...allProps };
  if (pages.length > 0) data.pages = pages;
  if (topWidgets.length > 0) data.widgets = topWidgets;

  return stripUndefined(keysToSnakeCase(data));
}
