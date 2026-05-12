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

import type { EspComposeElement, FunctionComponent, Ref } from '../types';
import { RefHandle } from '../types';
import { createContext, withContext, useContext, LvglContext } from '../hooks';
import type { Context } from '../hooks';
import type { LvglComponentRef } from '../component-aliases';
import { isIRReactiveNode } from '../reactive';
import type { IRReactiveNode } from '../reactive';
import { registerReactiveBinding, withReactiveScope, withHookPath, registerComponent } from '../hooks';
import { peekOverlayDefinitions, assertOverlayStructuralIdentity } from '../hooks';
import { peekOverlayTierDefinitions } from '../hooks/useOverlayTier';
import type { OverlayTierDefinition } from '../hooks/useOverlayTier';
import type { CapturedOverlayAction } from '../hooks';
import type { IRActionNode } from '../ir/action-types';
import { resolveOverlayControllerRefs, cleanOverlayControllerRefs } from '../actions';
import { resolveScriptHandleClosureIndex, cleanScriptHandleRefs } from '../actions';
import { resolveControllerMethodCalls, cleanControllerRefs } from '../actions';
import { generateId } from '../id';
import { LVGL_PART_NAMES, LVGL_STATE_NAMES } from './widget-tables';
import {
  extractElementProps,
  flattenFragments,
  serializeValuesPreservingKeys,
  setCurrentSource,
} from '../serialize';
import { expandCssStyle } from './style';
import type { RawIRWidget, RawIRWidgetTree, RawIROverlayContainer, RawIROverlayTier } from '../ir/build';

import { isEcCanvasElement, ecCanvasToPlain } from './canvas/serialize';

// ── Context propagation across intrinsic boundaries ───────────────────────
// When a <context> element wraps intrinsic LVGL elements (e.g. <lvgl-page>),
// the context is only active during resolveLvglChildren.  When those intrinsics
// later have THEIR children resolved in buildLvglWidgetIR/buildLvglPageIR,
// the context has been popped.  To fix this we annotate resolved intrinsic
// elements with a snapshot of the active context frames and re-establish them
// when processing the intrinsic's children.

interface ContextFrame { ctx: Context<unknown>; value: unknown }

const INHERITED_CONTEXTS = Symbol('inheritedContexts');

/** Module-scoped stack tracking active context frames during resolution. */
const activeContextFrames: ContextFrame[] = [];

/**
 * Execute `fn` with all inherited context frames from `frames` restored on
 * both the real context stack and the tracking stack.
 */
function withInheritedContexts<R>(frames: ContextFrame[], fn: () => R): R {
  if (frames.length === 0) return fn();
  const [first, ...rest] = frames;
  activeContextFrames.push(first);
  return withContext(first.ctx, first.value, () => {
    try {
      return withInheritedContexts(rest, fn);
    } finally {
      activeContextFrames.pop();
    }
  });
}

/** Convert an `lvgl-*` JSX tag to its semantic camelCase widget kind. */
function lvglElementKind(tag: string): string {
  // 'lvgl-dropdown-list' → 'dropdownList'
  return tag.slice(5).replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

// Known LVGL part and state names in camelCase, used for recursive binding detection.
// Excludes 'main' and 'default' since those are the top-level defaults.
const PART_NAMES_CAMEL = new Set(
  [...LVGL_PART_NAMES].filter(k => k !== 'main').map(k => snakeToCamel(k)),
);
const STATE_NAMES_CAMEL = new Set(
  [...LVGL_STATE_NAMES].filter(k => k !== 'default').map(k => snakeToCamel(k)),
);

function snakeToCamel(s: string): string {
  return s.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

// ── Overlay action capture ────────────────────────────────────────────────
// Context-scoped capture list activated during overlay widget serialization.
// `lvglWidgetToPlain()` checks this and pushes action metadata from trigger
// handler function props (those with `__compiledActions`).
const overlayActionCaptureContext = createContext<CapturedOverlayAction[] | null>(null);

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
      const result = withHookPath(el.type.name || 'anonymous', () =>
        (el.type as (props: never) => EspComposeElement | EspComposeElement[] | undefined | null)(
          propsWithoutRef as never,
        ),
      );
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
      // Context provider intrinsic: push context and recurse into children.
      // Also maintain the tracking stack so nested intrinsic elements get
      // annotated with the full set of active context frames.
      const { context: ctx, value, children: ctxChildren } = el.props as {
        context: Context<unknown>; value: unknown;
        children?: EspComposeElement | EspComposeElement[];
      };
      const frame: ContextFrame = { ctx, value };
      activeContextFrames.push(frame);
      const inner = withContext(ctx, value, () => resolveLvglChildren(ctxChildren));
      activeContextFrames.pop();
      resolved.push(...inner);
    } else {
      // Intrinsic element (lvgl-*, lvgl-page, ec-canvas-*, etc.).
      // If there are active context frames, annotate the element so that
      // when its children are resolved later (in buildLvglWidgetIR /
      // buildLvglPageIR), we can re-establish those contexts.
      if (activeContextFrames.length > 0) {
        const annotated = { ...el, [INHERITED_CONTEXTS]: [...activeContextFrames] };
        resolved.push(annotated as EspComposeElement);
      } else {
        resolved.push(el);
      }
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
  widgetKind: string,
): void {
  const reactiveProps: NestedReactiveProp[] = [];
  collectReactiveProps(data, reactiveProps);

  if (reactiveProps.length > 0) {
    let widgetId = typeof data.id === 'string' ? data.id : undefined;
    if (!widgetId) {
      widgetId = generateId('rw');
      data.id = widgetId;
    }

    for (const { propName, node, part, state } of reactiveProps) {
      registerReactiveBinding({
        kind: 'binding',
        targetId: widgetId,
        targetType: widgetKind,
        targetProp: propName,
        expression: node,
        ...(part ? { part } : {}),
        ...(state ? { state } : {}),
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
 * Convert a single LVGL widget element into its target-neutral `IRWidget`.
 *
 * Returns a semantic `IRWidget` with camelCase props. The target lowers
 * this to the ESPHome YAML shape during the emit phase.
 */
export function lvglWidgetToPlain(el: EspComposeElement): RawIRWidget {
  return buildLvglWidgetIR(el);
}

/**
 * Build a target-neutral `IRWidget` for an `lvgl-*` element, recursing into
 * its `lvgl-*` and `ec-canvas` children. Side effects (reactive-binding
 * registration, overlay action capture) happen here, mirroring the order of
 * the legacy single-pass implementation so snapshot bytes stay identical.
 */
function buildLvglWidgetIR(el: EspComposeElement): RawIRWidget {
  setCurrentSource(el.__source);
  const { allProps, children } = extractElementProps(el);

  // Restore inherited context frames so that resolveLvglChildren on this
  // widget's children sees the same context scope as the original resolution.
  const inherited = (el as unknown as Record<symbol, unknown>)[INHERITED_CONTEXTS] as ContextFrame[] | undefined;

  // Capture compiled action metadata from trigger handler props when inside
  // overlay widget serialization.  Trigger handlers are function values with
  // `__compiledActions` attached by the action compiler.
  const overlayActionCapture = useContext(overlayActionCaptureContext);
  if (overlayActionCapture) {
    for (const val of Object.values(allProps)) {
      if (typeof val === 'function' && val != null && '__compiledActions' in val) {
        const fn = val as { __compiledActions: unknown[]; __refBindings?: Record<string, unknown> };
        const rawActions = fn.__compiledActions as IRActionNode[];
        // Resolve deferred controller method calls → script_execute
        resolveControllerMethodCalls(rawActions, fn.__refBindings);
        // Resolve deferred overlay controller refs — replace placeholder
        // templateKey/instanceIndex with actual values from the bound controller.
        resolveOverlayControllerRefs(rawActions, fn.__refBindings);
        // Patch IRScriptExecute.closureIndex from bound ScriptHandles.
        resolveScriptHandleClosureIndex(rawActions, fn.__refBindings);
        // Remove resolved overlay controller objects from refBindings so they
        // don't corrupt lambda strings during ref resolution (toString →
        // '[object Object]' would replace 'overlay' in signal names).
        if (fn.__refBindings) {
          cleanControllerRefs(fn.__refBindings);
          cleanOverlayControllerRefs(fn.__refBindings);
          cleanScriptHandleRefs(fn.__refBindings);
        }
        overlayActionCapture.push({
          rawActions,
          refBindings: fn.__refBindings,
        });
      }
    }
  }

  const widgetChildren = inherited
    ? withInheritedContexts(inherited, () => resolveLvglChildren(children))
    : resolveLvglChildren(children);
  const childNodes: RawIRWidget[] = widgetChildren
    .filter((c) => isLvglElement(c.type) || (typeof c.type === 'string' && isEcCanvasElement(c.type)))
    .map((c): RawIRWidget =>
      typeof c.type === 'string' && isEcCanvasElement(c.type)
        ? ecCanvasToPlain(c)
        : buildLvglWidgetIR(c),
    );

  const data: Record<string, unknown> = { ...allProps };
  hoistStyleProp(data);

  // ESPHome requires layout to have a type (flex/grid) and only on widgets
  // with children. If gap/rowGap/columnGap was set without an explicit
  // display type, the layout bag has padRow/padColumn but no type — these
  // properties are only meaningful inside a layout block, so drop them.
  if (data.layout && typeof data.layout === 'object') {
    const layout = data.layout as Record<string, unknown>;
    if (!layout.type || childNodes.length === 0) {
      delete data.layout;
    }
  }

  // Extract reactive values from layout.padRow / layout.padColumn.
  // ESPHome's LVGL Python code calls lv_obj_set_style_pad_row/pad_column
  // with the value directly — it does not accept !lambda scalars.  Promote
  // reactive nodes to top-level reactive bindings (which the C++ runtime
  // updates via lv_obj_set_style_pad_*) and replace them with 0 so the YAML
  // serialiser emits a plain integer.
  const widgetKind = lvglElementKind(el.type as string);
  if (data.layout && typeof data.layout === 'object') {
    const layout = data.layout as Record<string, unknown>;
    for (const key of ['padRow', 'padColumn'] as const) {
      if (isIRReactiveNode(layout[key])) {
        let widgetId = typeof data.id === 'string' ? data.id : undefined;
        if (!widgetId) {
          widgetId = generateId('rw');
          data.id = widgetId;
        }
        registerReactiveBinding({
          kind: 'binding',
          targetId: widgetId,
          targetType: widgetKind,
          targetProp: key,
          expression: layout[key] as IRReactiveNode,
        });
        layout[key] = 0;
      }
    }
  }

  detectAndRegisterReactiveProps(data, widgetKind);

  // Pre-serialize prop values while serialization captures are active so
  // refs/secrets/lambdas/yaml-bool strings are properly capture-tracked.
  // Keys stay camelCase — the target's widget emitter performs snake_case
  // conversion during YAML lowering.
  const serializedProps = serializeValuesPreservingKeys(data);

  return {
    kind: widgetKind,
    id: typeof serializedProps.id === 'string' ? serializedProps.id : undefined,
    props: serializedProps,
    children: childNodes,
  };
}

/**
 * Build the LVGL section for a <lvgl> element.
 *
 * Returns a target-neutral `IRWidgetTree` containing semantic camelCase
 * widget data. The target lowers this to YAML during the emit phase.
 */
export function buildLvglSection(el: EspComposeElement): RawIRWidgetTree {
  return buildLvglWidgetTree(el);
}

/**
 * Build a target-neutral `IRWidgetTree` for a `<lvgl>` element.
 *
 * Splits children into pages (`<lvgl-page>`) and direct widgets (other
 * `lvgl-*`), captures overlay subtrees grouped by zOrder, and registers
 * reactive bindings / overlay action metadata along the way (same side
 * effects and ordering as the legacy single-pass implementation).
 */
export function buildLvglWidgetTree(el: EspComposeElement): RawIRWidgetTree {
  setCurrentSource(el.__source);
  // Capture the raw ref before extractElementProps converts it to an id string.
  let lvglRef = el.props.ref as Ref<LvglComponentRef> | undefined;

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
    const pages: RawIRWidget[] = [];
    const topWidgets: RawIRWidget[] = [];

    for (const child of resolved) {
      if (child.type === 'lvgl-page') {
        pages.push(buildLvglPageIR(child));
      } else if (isLvglElement(child.type)) {
        topWidgets.push(buildLvglWidgetIR(child));
      } else if (typeof child.type === 'string' && isEcCanvasElement(child.type)) {
        topWidgets.push(ecCanvasToPlain(child));
      }
    }

    const overlayTiers = collectOverlayTiers(String(lvglRef));

    // Pre-serialize tree-level lvgl props (camelCase keys preserved). The
    // target's emitter performs snake_case key conversion when lowering.
    const serializedTreeProps = serializeValuesPreservingKeys(allProps);

    return {
      lvgl: String(lvglRef),
      props: serializedTreeProps,
      pages,
      widgets: topWidgets,
      overlayTiers,
    };
  });
}

/**
 * Build the IRWidget for an `<lvgl-page>` element. Pages share the LVGL
 * widget shape but always have semantic kind `'page'`. Their reactive layout
 * pad extraction and reactive prop registration use the YAML key `'page'`
 * for the binding registry (today's behaviour; switched to camelCase by a
 * later substep).
 */
function buildLvglPageIR(child: EspComposeElement): RawIRWidget {
  setCurrentSource(child.__source);
  const { allProps: pageProps, children: pageChildren } = extractElementProps(child);

  // Restore inherited context frames so function components inside this page
  // (resolved below) see context providers that wrapped the page element.
  const inherited = (child as unknown as Record<symbol, unknown>)[INHERITED_CONTEXTS] as ContextFrame[] | undefined;

  const pageResolved = inherited
    ? withInheritedContexts(inherited, () => resolveLvglChildren(pageChildren))
    : resolveLvglChildren(pageChildren);
  const pageChildIR: RawIRWidget[] = pageResolved
    .filter((c) => isLvglElement(c.type) || (typeof c.type === 'string' && isEcCanvasElement(c.type)))
    .map((c): RawIRWidget =>
      typeof c.type === 'string' && isEcCanvasElement(c.type)
        ? ecCanvasToPlain(c)
        : buildLvglWidgetIR(c),
    );

  const pageData: Record<string, unknown> = { ...pageProps };
  hoistStyleProp(pageData);

  // Extract reactive layout spacing — same treatment as widgets (see above).
  if (pageData.layout && typeof pageData.layout === 'object') {
    const layout = pageData.layout as Record<string, unknown>;
    for (const key of ['padRow', 'padColumn'] as const) {
      if (isIRReactiveNode(layout[key])) {
        let pageId = typeof pageData.id === 'string' ? pageData.id : undefined;
        if (!pageId) {
          pageId = generateId('rw');
          pageData.id = pageId;
        }
        registerReactiveBinding({
          kind: 'binding',
          targetId: pageId,
          targetType: 'page',
          targetProp: key,
          expression: layout[key] as IRReactiveNode,
        });
        layout[key] = 0;
      }
    }
  }

  detectAndRegisterReactiveProps(pageData, 'page');

  // Pre-serialize prop values while serialization captures are active.
  const serializedPageProps = serializeValuesPreservingKeys(pageData);

  return {
    kind: 'page',
    id: typeof serializedPageProps.id === 'string' ? serializedPageProps.id : undefined,
    props: serializedPageProps,
    children: pageChildIR,
  };
}

/**
 * Walk the registered overlay definitions, render each instance inside an
 * isolated reactive scope (capturing per-instance bindings / reactiveNodes /
 * actions for later codegen), and return the overlay tiers ordered by
 * ascending zOrder.
 *
 * Only instance #0's widgets are materialised here as `IROverlayContainer`
 * entries; instances 1..N-1 register their bindings/actions on the
 * `OverlayInstance` for the codegen mux pass and are not emitted into the
 * widget tree.
 */
function collectOverlayTiers(lvgl: string): RawIROverlayTier[] {
  // Iterate by re-fetching definitions each pass: rendering an overlay's
  // factory may itself invoke useOverlay() (e.g. Toast.Provider nested
  // inside a usePopup() factory), registering new overlays mid-iteration.
  // We process overlays in registration order until no new ones appear.
  let overlays = peekOverlayDefinitions(lvgl);
  if (overlays.length === 0) return [];

  // Collect tier definitions for wrapper widget resolution.
  const tierDefs = peekOverlayTierDefinitions(lvgl);
  const tierDefMap = new Map<string, OverlayTierDefinition>();
  for (const td of tierDefs) {
    tierDefMap.set(td.tierKey, td);
  }

  const tierMap = new Map<string, { zOrder: number; overlays: RawIROverlayContainer[]; wrapperWidget?: RawIRWidget }>();
  const processed = new Set<string>();
  while (overlays.some(d => !processed.has(d.templateKey))) {
    for (const def of overlays) {
      if (processed.has(def.templateKey)) continue;
      processed.add(def.templateKey);
      assertOverlayStructuralIdentity(def.templateKey, def.instances);

      let tierEntry = tierMap.get(def.tierKey);
      if (!tierEntry) {
        // Resolve the tier's wrapper widget if present.
        let wrapperWidget: RawIRWidget | undefined;
        const tierDef = tierDefMap.get(def.tierKey);
        if (tierDef?.wrapper) {
          const wrapperArr = Array.isArray(tierDef.wrapper) ? tierDef.wrapper : [tierDef.wrapper];
          const resolved = resolveLvglChildren(wrapperArr);
          for (const ch of resolved) {
            if (isLvglElement(ch.type)) {
              wrapperWidget = buildLvglWidgetIR(ch);
              break; // Only one wrapper widget per tier
            }
          }
        }
        tierEntry = { zOrder: def.zOrder, overlays: [], wrapperWidget };
        tierMap.set(def.tierKey, tierEntry);
      }

      for (const instance of def.instances) {
        const rendered = instance.rendered;
        if (rendered == null) continue;

        const renderedArr = Array.isArray(rendered) ? rendered : [rendered];

        // Serialize inside an isolated reactive scope to capture bindings
        // without polluting the top-level scope.
        // Activate overlay action capture to collect trigger handler metadata
        // via context-scoped capture list.
        // Push the overlay's templateKey onto the hook path so any
        // function components evaluated inside the rendered subtree (which
        // may call useRef/useState/etc.) memoize per overlay-template,
        // matching how the factory was invoked. Without this, sibling
        // overlay slots' inner components share hook-path-keyed values
        // and produce colliding ref ids.
        const actionCapture: CapturedOverlayAction[] = [];
        const { bindings, reactiveNodes, components } = withHookPath(def.templateKey, () =>
          withContext(overlayActionCaptureContext, actionCapture, () =>
            withReactiveScope(() => {
              const resolved = resolveLvglChildren(renderedArr);
              const widgetIR: RawIRWidget[] = [];
              for (const ch of resolved) {
                if (isLvglElement(ch.type)) {
                  widgetIR.push(buildLvglWidgetIR(ch));
                } else if (typeof ch.type === 'string' && isEcCanvasElement(ch.type)) {
                  widgetIR.push(ecCanvasToPlain(ch));
                }
              }
              // Only emit instance 0's widgets into the tier container; others
              // contribute only their captured bindings/actions for the mux pass.
              if (instance.index === 0) {
                tierEntry!.overlays.push({ templateKey: def.templateKey, widgets: widgetIR });
              }
              return null;
            }),
          ),
        );
        const capturedActions = actionCapture;

        // Propagate component registrations (e.g. globals registered by
        // useTransientOverlay inside a nested overlay factory) back to the
        // outer reactive scope. Otherwise globals declared by Toast.Provider
        // nested inside a usePopup() factory would be lost.
        for (const comp of components) {
          registerComponent(comp);
        }

        // Store captured per-instance data for Phase 6 codegen.
        (instance as { capturedBindings?: unknown }).capturedBindings = bindings;
        (instance as { capturedReactiveNodes?: unknown }).capturedReactiveNodes = reactiveNodes;
        (instance as { capturedActions?: unknown }).capturedActions = capturedActions;
      }
    }
    // Re-fetch in case nested factories registered additional overlays.
    overlays = peekOverlayDefinitions(lvgl);
  }

  return Array.from(tierMap.entries())
    .sort((a, b) => a[1].zOrder - b[1].zOrder)
    .filter(([, entry]) => entry.overlays.length > 0)
    .map(([tierKey, entry]) => ({ tierKey, zOrder: entry.zOrder, overlays: entry.overlays, wrapperWidget: entry.wrapperWidget }));
}
