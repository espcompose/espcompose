// ────────────────────────────────────────────────────────────────────────────
// ec-canvas serialization
//
// Converts <ec-canvas> JSX trees into their plain object representation for
// the Semantic IR builder. The output shape is:
//
//   { ec_canvas: {
//       ...hostProps,              // style, events, etc.
//       background_scene: [...],   // paint primitives (ordered array)
//       widgets: [...],            // child lvgl widgets from <ec-canvas-content>
//       overlay_scene: [...],      // paint primitives (ordered array)
//   }}
//
// Paint primitives are represented as typed objects:
//   { type: 'rect', x: 0, y: 0, width: 100, height: 50, fill: '#ff0000' }
// ────────────────────────────────────────────────────────────────────────────

import type { EspComposeElement, FunctionComponent } from './types';
import { withContext } from './hooks/useContext';
import type { Context } from './hooks/useContext';
import { isIRReactiveNode } from './reactive-node';
import type { IRReactiveNode } from './reactive-node';
import { registerReactiveBinding } from './hooks/useReactiveScope';
import {
  camelToSnake,
  extractElementProps,
  flattenFragments,
  keysToSnakeCase,
  setCurrentSource,
  stripUndefined,
} from './serialize';
import { expandCssStyle } from './style-mapping';
import { lvglWidgetToPlain, isLvglElement } from './lvgl';

// ── Type guards ────────────────────────────────────────────────────────────

/** Returns true for <ec-canvas>. */
export function isEcCanvasElement(type: string | symbol | FunctionComponent): type is string {
  return type === 'ec-canvas';
}

const EC_PAINT_PRIMITIVES = new Set([
  'ec-rect',
  'ec-line',
]);

/** Maps element tag name → paint primitive type discriminator. */
function paintPrimitiveType(tagName: string): string {
  // 'ec-rect' → 'rect', 'ec-line' → 'line'
  return tagName.slice(3);
}

// ── Child resolution ───────────────────────────────────────────────────────

/**
 * Resolve children of a canvas zone, handling function components, fragments,
 * and context providers — same pattern as resolveLvglChildren in lvgl.ts.
 */
function resolveCanvasChildren(
  children: EspComposeElement | EspComposeElement[] | undefined,
): EspComposeElement[] {
  if (!children) return [];
  const arr = Array.isArray(children) ? children : [children];
  const flat = flattenFragments(arr);
  const resolved: EspComposeElement[] = [];
  for (const el of flat) {
    if (typeof el.type === 'function') {
      const { ref, ...propsWithoutRef } = el.props as Record<string, unknown> & { ref?: unknown };
      const result = el.type(propsWithoutRef as never);
      if (result == null) continue;
      const results = Array.isArray(result) ? result : [result];
      let rendered = results;
      if (ref != null) {
        if (results.length === 1 && !Array.isArray(results[0])) {
          rendered = [{ ...results[0], props: { ...results[0].props, ref } }];
        }
      }
      resolved.push(...resolveCanvasChildren(rendered));
    } else if (el.type === 'context') {
      const { context: ctx, value, children: ctxChildren } = el.props as {
        context: Context<unknown>; value: unknown;
        children?: EspComposeElement | EspComposeElement[];
      };
      const inner = withContext(ctx, value, () => resolveCanvasChildren(ctxChildren));
      resolved.push(...inner);
    } else {
      resolved.push(el);
    }
  }
  return resolved;
}

// ── Paint primitive serialization ──────────────────────────────────────────

interface PaintReactiveProp {
  propName: string;
  node: IRReactiveNode;
}

/**
 * Collect reactive props from a paint primitive's property bag.
 */
function collectPaintReactiveProps(
  obj: Record<string, unknown>,
  out: PaintReactiveProp[],
): void {
  for (const [key, value] of Object.entries(obj)) {
    if (isIRReactiveNode(value)) {
      out.push({ propName: key, node: value });
    }
  }
}

/**
 * Serialize a paint primitive element (<ec-rect>, <ec-line>) into a typed
 * plain object suitable for the Semantic IR builder.
 */
function paintPrimitiveToPlain(
  el: EspComposeElement,
  canvasId: string,
): Record<string, unknown> {
  const { allProps } = extractElementProps(el);
  const type = paintPrimitiveType(el.type as string);

  const data: Record<string, unknown> = { type, ...allProps };

  // Detect and register reactive paint properties
  const reactiveProps: PaintReactiveProp[] = [];
  collectPaintReactiveProps(data, reactiveProps);

  for (const { propName, node } of reactiveProps) {
    registerReactiveBinding({
      kind: 'binding',
      targetId: canvasId,
      targetType: 'ec_canvas',
      targetProp: `paint.${type}.${camelToSnake(propName)}`,
      expression: node,
    });
  }

  return keysToSnakeCase(data);
}

/**
 * Serialize a paint zone (<ec-canvas-background> or <ec-canvas-overlay>)
 * into an ordered array of paint primitive objects.
 */
function serializePaintZone(
  el: EspComposeElement,
  canvasId: string,
): Record<string, unknown>[] {
  const resolved = resolveCanvasChildren(el.props.children as EspComposeElement | EspComposeElement[] | undefined);
  const primitives: Record<string, unknown>[] = [];

  for (const child of resolved) {
    if (typeof child.type === 'string' && EC_PAINT_PRIMITIVES.has(child.type)) {
      primitives.push(paintPrimitiveToPlain(child, canvasId));
    }
  }

  return primitives;
}

/**
 * Serialize widget content children (<ec-canvas-content>) into LVGL widget
 * objects, delegating to the existing lvglWidgetToPlain() path.
 */
function serializeContentZone(
  el: EspComposeElement,
): Record<string, unknown>[] {
  const resolved = resolveCanvasChildren(el.props.children as EspComposeElement | EspComposeElement[] | undefined);
  const widgets: Record<string, unknown>[] = [];

  for (const child of resolved) {
    if (typeof child.type === 'string' && isLvglElement(child.type)) {
      widgets.push(lvglWidgetToPlain(child));
    }
  }

  return widgets;
}

// ── Main serialization ─────────────────────────────────────────────────────

/**
 * Convert an <ec-canvas> element into its YAML-ready plain object:
 *   { ec_canvas: { ...hostProps, background_scene: [...], widgets: [...], overlay_scene: [...] } }
 */
export function ecCanvasToPlain(el: EspComposeElement): Record<string, unknown> {
  setCurrentSource(el.__source);
  const { allProps, children } = extractElementProps(el);

  // Host props: style expansion (same as LVGL widgets)
  const data: Record<string, unknown> = { ...allProps };
  if (data.style != null && typeof data.style === 'object' && !Array.isArray(data.style)) {
    const expanded = expandCssStyle(data.style as Record<string, unknown>);
    for (const [key, value] of Object.entries(expanded)) {
      data[key] = value;
    }
    delete data.style;
  }

  // Auto-assign ID (needed for reactive and draw function bindings)
  let canvasId = typeof data.id === 'string' ? data.id : undefined;
  if (!canvasId) {
    canvasId = `ec_${Math.random().toString(36).slice(2, 11)}`;
    data.id = canvasId;
  }

  // Detect and register reactive host properties
  const hostReactives: PaintReactiveProp[] = [];
  collectPaintReactiveProps(data, hostReactives);
  for (const { propName, node } of hostReactives) {
    registerReactiveBinding({
      kind: 'binding',
      targetId: canvasId,
      targetType: 'ec_canvas',
      targetProp: camelToSnake(propName),
      expression: node,
    });
  }

  // Serialize host props
  const serialized = stripUndefined(keysToSnakeCase(data));

  // Process zone children
  const resolved = resolveCanvasChildren(children);

  for (const child of resolved) {
    if (typeof child.type !== 'string') continue;

    switch (child.type) {
      case 'ec-canvas-background': {
        const scene = serializePaintZone(child, canvasId);
        if (scene.length > 0) {
          serialized.background_scene = scene;
        }
        break;
      }
      case 'ec-canvas-content': {
        const widgets = serializeContentZone(child);
        if (widgets.length > 0) {
          serialized.widgets = widgets;
        }
        break;
      }
      case 'ec-canvas-overlay': {
        const scene = serializePaintZone(child, canvasId);
        if (scene.length > 0) {
          serialized.overlay_scene = scene;
        }
        break;
      }
    }
  }

  return { ec_canvas: serialized };
}
