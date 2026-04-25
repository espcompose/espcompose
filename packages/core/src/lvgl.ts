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
import { createContext, withContext, useContext } from './hooks/useContext';
import type { Context } from './hooks/useContext';
import { LvglContext } from './hooks/useLvgl';
import type { LvglComponentRef } from './component-aliases';
import { isIRReactiveNode } from './reactive-node';
import type { IRReactiveNode } from './reactive-node';
import { registerReactiveBinding, withReactiveScope } from './hooks/useReactiveScope';
import { pushHookPath, popHookPath } from './hooks/useState';
import { peekPopupDefinitions } from './hooks/usePopup';
import type { CapturedPopupAction } from './hooks/usePopup';
import type { IRActionNode } from './ir/action-types';
import { assertPopupStructuralIdentity } from './hooks/popup-fingerprint';
import { resolvePopupControllerRefs, cleanPopupControllerRefs } from './popup-resolve';
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

// ── Popup action capture ──────────────────────────────────────────────────
// Context-scoped capture list activated during popup widget serialization.
// `lvglWidgetToPlain()` checks this and pushes action metadata from trigger
// handler function props (those with `__compiledActions`).
const popupActionCaptureContext = createContext<CapturedPopupAction[] | null>(null);

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
      pushHookPath(el.type.name || 'anonymous');
      let result;
      try {
        result = el.type(propsWithoutRef as never);
      } finally {
        popHookPath();
      }
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

  // Capture compiled action metadata from trigger handler props when inside
  // popup widget serialization.  Trigger handlers are function values with
  // `__compiledActions` attached by the action compiler.
  const popupActionCapture = useContext(popupActionCaptureContext);
  if (popupActionCapture) {
    for (const val of Object.values(allProps)) {
      if (typeof val === 'function' && val != null && '__compiledActions' in val) {
        const fn = val as { __compiledActions: unknown[]; __refBindings?: Record<string, unknown> };
        const rawActions = fn.__compiledActions as IRActionNode[];
        // Resolve deferred popup controller refs — replace placeholder
        // templateKey/instanceIndex with actual values from the bound controller.
        resolvePopupControllerRefs(rawActions, fn.__refBindings);
        // Remove resolved popup controller objects from refBindings so they
        // don't corrupt lambda strings during ref resolution (toString →
        // '[object Object]' would replace 'popup' in signal names).
        if (fn.__refBindings) {
          cleanPopupControllerRefs(fn.__refBindings);
        }
        popupActionCapture.push({
          rawActions,
          refBindings: fn.__refBindings,
        });
      }
    }
  }

  const widgetChildren = resolveLvglChildren(children);
  const nestedWidgets = widgetChildren
    .filter((c) => isLvglElement(c.type) || (typeof c.type === 'string' && isEcCanvasElement(c.type)))
    .map((c) => (typeof c.type === 'string' && isEcCanvasElement(c.type)) ? ecCanvasToPlain(c) : lvglWidgetToPlain(c));

  const data: Record<string, unknown> = { ...allProps };
  hoistStyleProp(data);

  // ESPHome requires layout to have a type (flex/grid) and only on widgets
  // with children. If gap/rowGap/columnGap was set without an explicit
  // display type, the layout bag has padRow/padColumn but no type — these
  // properties are only meaningful inside a layout block, so drop them.
  if (data.layout && typeof data.layout === 'object') {
    const layout = data.layout as Record<string, unknown>;
    if (!layout.type || nestedWidgets.length === 0) {
      delete data.layout;
    }
  }

  // Extract reactive values from layout.padRow / layout.padColumn.
  // ESPHome's LVGL Python code calls lv_obj_set_style_pad_row/pad_column
  // with the value directly — it does not accept !lambda scalars.  Promote
  // reactive nodes to top-level reactive bindings (which the C++ runtime
  // updates via lv_obj_set_style_pad_*) and replace them with 0 so the YAML
  // serialiser emits a plain integer.
  const yamlKey = toYamlKey(el.type as string);
  if (data.layout && typeof data.layout === 'object') {
    const layout = data.layout as Record<string, unknown>;
    for (const key of ['padRow', 'padColumn'] as const) {
      if (isIRReactiveNode(layout[key])) {
        let widgetId = typeof data.id === 'string' ? data.id : undefined;
        if (!widgetId) {
          widgetId = `rw_${Math.random().toString(36).slice(2, 11)}`;
          data.id = widgetId;
        }
        registerReactiveBinding({
          kind: 'binding',
          targetId: widgetId,
          targetType: yamlKey,
          targetProp: camelToSnake(key),
          expression: layout[key] as IRReactiveNode,
        });
        layout[key] = 0;
      }
    }
  }

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
        // Extract reactive layout spacing — same treatment as widgets (see above).
        if (pageData.layout && typeof pageData.layout === 'object') {
          const layout = pageData.layout as Record<string, unknown>;
          for (const key of ['padRow', 'padColumn'] as const) {
            if (isIRReactiveNode(layout[key])) {
              let pageId = typeof pageData.id === 'string' ? pageData.id : undefined;
              if (!pageId) {
                pageId = `rw_${Math.random().toString(36).slice(2, 11)}`;
                pageData.id = pageId;
              }
              registerReactiveBinding({
                kind: 'binding',
                targetId: pageId,
                targetType: 'page',
                targetProp: camelToSnake(key),
                expression: layout[key] as IRReactiveNode,
              });
              layout[key] = 0;
            }
          }
        }
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

    // Emit popup widget subtrees into top_layer.
    //
    // Children resolution above evaluated all function components, which
    // registered popup definitions via usePopup(). For each definition:
    //   1. Validate structural identity across instances (compile-time error
    //      on mismatch).
    //   2. Serialize EVERY instance's rendered widgets inside an isolated
    //      reactive scope to capture per-instance bindings and reactive nodes.
    //   3. Only emit instance #0's widgets into top_layer.
    //   4. Store captured bindings on each PopupInstance so the codegen phase
    //      can zip them across instances and build mux expressions.
    //
    // Instance 0's bindings are NOT registered in the top-level scope — they
    // are captured alongside instances 1..N-1 and handled specially by the
    // codegen (Phase 6).
    const popups = peekPopupDefinitions();
    if (popups.length > 0) {
      const popupWidgets: Record<string, unknown>[] = [];
      for (const def of popups) {
        assertPopupStructuralIdentity(def.templateKey, def.instances);

        for (const instance of def.instances) {
          const rendered = instance.rendered;
          if (rendered == null) continue;

          const renderedArr = Array.isArray(rendered) ? rendered : [rendered];

          // Serialize inside an isolated reactive scope to capture bindings
          // without polluting the top-level scope.
          // Activate popup action capture to collect trigger handler metadata
          // via context-scoped capture list.
          const actionCapture: CapturedPopupAction[] = [];
          const { bindings, reactiveNodes } = withContext(popupActionCaptureContext, actionCapture, () =>
            withReactiveScope(() => {
              const resolved = resolveLvglChildren(renderedArr);
              const widgets: Record<string, unknown>[] = [];
              for (const child of resolved) {
                if (isLvglElement(child.type)) {
                  widgets.push(lvglWidgetToPlain(child));
                } else if (typeof child.type === 'string' && isEcCanvasElement(child.type)) {
                  widgets.push(ecCanvasToPlain(child));
                }
              }
              // Only emit instance 0's widgets into top_layer, wrapped in a
              // hidden container obj with a deterministic ID for action targeting.
              if (instance.index === 0) {
                const wrapperId = `popup_${def.templateKey}`;
                popupWidgets.push({
                  obj: {
                    id: wrapperId,
                    hidden: true,
                    width: '100%',
                    height: '100%',
                    bg_opa: 'TRANSP',
                    border_width: 0,
                    pad_all: 0,
                    widgets,
                  },
                });
              }
              return null;
            }),
          );
          const capturedActions = actionCapture;

          // Store captured per-instance data for Phase 6 codegen.
          (instance as { capturedBindings?: unknown }).capturedBindings = bindings;
          (instance as { capturedReactiveNodes?: unknown }).capturedReactiveNodes = reactiveNodes;
          (instance as { capturedActions?: unknown }).capturedActions = capturedActions;
        }
      }
      if (popupWidgets.length > 0) {
        // Merge with any user-provided top_layer config (snake_case from
        // keysToSnakeCase). The top_layer accepts a widgets array per ESPHome's
        // widget_container schema.
        const existingTopLayer = serialized.top_layer;
        if (existingTopLayer && typeof existingTopLayer === 'object' && !Array.isArray(existingTopLayer)) {
          const tl = existingTopLayer as Record<string, unknown>;
          const existingWidgets = Array.isArray(tl.widgets) ? tl.widgets as unknown[] : [];
          tl.widgets = [...existingWidgets, ...popupWidgets];
        } else {
          serialized.top_layer = { widgets: popupWidgets };
        }
      }
    }

    return serialized;
  });
}
