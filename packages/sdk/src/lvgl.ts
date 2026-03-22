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
import {
  extractElementProps,
  flattenFragments,
  keysToSnakeCase,
  stripUndefined,
  toYamlKey,
} from './serialize';

/** Returns true for any JSX element type that represents an LVGL widget (lvgl-*). */
export function isLvglElement(type: string | FunctionComponent): type is string {
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

/**
 * Convert a single LVGL widget element into its YAML-ready plain object:
 *   { widget_type: { ...props, widgets?: [...] } }
 *
 * Recursively processes nested lvgl-* children into a `widgets` array.
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
