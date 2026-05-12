import type { EspComposeElement, FunctionComponent } from './types';
import { useScript, withScriptScope } from './hooks/useScript';
import { withReactiveScope, clearHAEntityCache, clearImageCache, clearFontCache } from './hooks';
import { withOverlayScope } from './hooks/useOverlay';
import { withOverlayTierScope } from './hooks/useOverlayTier';
import { withContributionScope } from './hooks/useContributionScope';
import { withContext, withHookPath } from './hooks';
import type { Context } from './hooks';

import {
  Fragment,
  flattenFragments,
  extractElementProps,
  transformPropKeys,
  compactObject,
  transformElementType,
  startSerializationCapture,
  stopSerializationCapture,
  setCurrentSource,
  clearRefRegistry,
  getSecrets,
  clearSecrets,
} from './serialize';
import { buildLvglSection, isLvglElement, lvglWidgetToPlain } from './lvgl';
import { ecCanvasToPlain, isEcCanvasElement } from './lvgl';
import type { RawIRWidgetTree } from './ir/build';
import {
  clearThemeRegistry,
  getThemeRegistry,
  clearReactiveThemeProxy,
  clearThemeNodeCache,
} from './lvgl/theme';
import { setWireframeEnabled, clearWireframe } from './lvgl/style/wireframe';

// ────────────────────────────────────────────────────────────────────────────
// LVGL widget tree capture
// ────────────────────────────────────────────────────────────────────────────

let _lvglTrees: RawIRWidgetTree[] = [];

function getLvglTrees(): RawIRWidgetTree[] {
  return _lvglTrees;
}

function clearLvglTrees(): void {
  _lvglTrees = [];
}

// ────────────────────────────────────────────────────────────────────────────
// JSX factory
// ────────────────────────────────────────────────────────────────────────────

function createElement(
  type: string | symbol | FunctionComponent,
  props: Record<string, unknown> | null,
  ...children: (EspComposeElement | EspComposeElement[] | null | undefined)[]
): EspComposeElement {
  const flatChildren = children.flat().filter((c): c is EspComposeElement => c != null);

  return {
    type,
    props: {
      ...(props ?? {}),
      ...(flatChildren.length > 0 ? { children: flatChildren } : {}),
    },
  };
}

// ────────────────────────────────────────────────────────────────────────────
// Element → plain object conversion
// ────────────────────────────────────────────────────────────────────────────

function toPlainObject(el: EspComposeElement | EspComposeElement[] | null | undefined): unknown {
  if (el == null) return undefined;

  if (Array.isArray(el)) {
    const mapped = el.map(toPlainObject).filter((v) => v != null);
    return mapped.length === 1 ? mapped[0] : mapped;
  }

  // Function component: call it and recurse.
  // Extract `ref` so it is not passed to the component function, then
  // forward it onto the root element the component returns (matching
  // React 19-style automatic ref forwarding for design-system widgets).
  if (typeof el.type === 'function') {
    const { ref, ...propsWithoutRef } = el.props as Record<string, unknown> & { ref?: unknown };
    const result = withHookPath(el.type.name || 'anonymous', () =>
      (el.type as (props: never) => EspComposeElement | EspComposeElement[] | undefined | null)(
        propsWithoutRef as never,
      ),
    );
    if (result == null) return undefined;
    if (ref != null) {
      if (!Array.isArray(result)) {
        return toPlainObject({ ...result, props: { ...result.props, ref } });
      } else {
        console.warn(
          `Ref passed to function component that returned multiple elements; ref was not forwarded.`,
        );
      }
    }
    return toPlainObject(result);
  }

  // Fragment: recurse into children
  if (el.type === Fragment) {
    return toPlainObject(el.props.children as EspComposeElement | EspComposeElement[] | undefined);
  }

  // Track JSX source location so serialization errors can report it.
  setCurrentSource(el.__source);

  const { allProps, children } = extractElementProps(el);

  // Context provider: wrap child serialisation in withContext
  if (el.type === 'context') {
    const { context: ctx, value } = el.props as { context: Context<unknown>; value: unknown };
    return withContext(ctx, value, () =>
      toPlainObject(children as EspComposeElement | EspComposeElement[] | undefined)
    );
  }

  if (el.type === 'esphome') {
    // The <esphome> root: own props become `esphome:`, each child element
    // becomes a sibling top-level section (e.g. wifi:, sensor:, ...)
    // Convert camelCase prop keys back to snake_case for YAML output.
    const childSections = childrenToTopLevelSections(
      children as EspComposeElement | EspComposeElement[] | undefined
    );
    return {
      esphome: compactObject(transformPropKeys(allProps)),
      ...childSections,
    };
  }

  // LVGL container: collect the widget tree for the IR and exclude from config.
  if (el.type === 'lvgl') {
    _lvglTrees.push(buildLvglSection(el));
    return undefined;
  }

  // At this point, type must be a string (fragments and function components
  // have already been handled above).
  const type = el.type as string;

  // LVGL widget elements: { widget_type: { ...props, widgets?: [...] } }
  if (isLvglElement(type)) {
    return lvglWidgetToPlain(el);
  }

  // ec-canvas: composited rendering host with paint scenes + widget content
  if (isEcCanvasElement(type)) {
    return ecCanvasToPlain(el);
  }

  // All other intrinsic elements: { [type]: { ...ownProps, ...childrenMerged } }
  const childData = buildChildData(
    children as EspComposeElement | EspComposeElement[] | undefined
  );
  const data = compactObject(transformPropKeys({ ...allProps, ...childData }));
  return { [transformElementType(type)]: Object.keys(data).length > 0 ? data : null };
}

/**
 * Converts an <esphome> element's children into top-level YAML sections.
 *
 * Each child element becomes `{ [child.type]: { ...child.props } }`.
 * Multiple children of the same type are collected into an array.
 * Fragment children are flattened.
 */
function childrenToTopLevelSections(
  children: EspComposeElement | EspComposeElement[] | undefined
): Record<string, unknown> {
  if (!children) return {};

  const normalized = flattenFragments(Array.isArray(children) ? children : [children]);
  const sections: Record<string, unknown[]> = {};

  for (const child of normalized) {
    if (typeof child.type === 'function') {
      // Render function components inside the esphome root
      const result = child.type(child.props as never);
      if (result == null) continue;
      const rendered = Array.isArray(result) ? result : [result];
      const inner = flattenFragments(rendered);
      for (const c of inner) {
        if (c.type === 'context') {
          mergeContextSections(sections, c);
        } else {
          mergeSection(sections, c);
        }
      }
    } else if (child.type === 'context') {
      mergeContextSections(sections, child);
    } else {
      mergeSection(sections, child);
    }
  }

  // Unwrap single-item arrays
  const out: Record<string, unknown> = {};
  for (const [key, values] of Object.entries(sections)) {
    out[key] = values.length === 1 ? values[0] : values;
  }
  return out;
}

function mergeContextSections(
  sections: Record<string, unknown[]>,
  el: EspComposeElement,
): void {
  const { context: ctx, value, children: ctxChildren } = el.props as {
    context: Context<unknown>; value: unknown;
    children?: EspComposeElement | EspComposeElement[];
  };
  withContext(ctx, value, () => {
    const inner = ctxChildren
      ? flattenFragments(Array.isArray(ctxChildren) ? ctxChildren : [ctxChildren])
      : [];
    for (const c of inner) {
      if (typeof c.type === 'function') {
        const result = c.type(c.props as never);
        if (result == null) return;
        const rendered = Array.isArray(result) ? result : [result];
        for (const r of flattenFragments(rendered)) {
          if (r.type === 'context') {
            mergeContextSections(sections, r);
          } else {
            mergeSection(sections, r);
          }
        }
      } else if (c.type === 'context') {
        mergeContextSections(sections, c);
      } else {
        mergeSection(sections, c);
      }
    }
  });
}

function mergeSection(sections: Record<string, unknown[]>, child: EspComposeElement) {
  // LVGL container: collect the widget tree for the UI registry IR.
  // No config section is emitted — the tree is consumed via ir.uis instead.
  if (child.type === 'lvgl') {
    _lvglTrees.push(buildLvglSection(child));
    return;
  }

  const { allProps, children: grandchildren } = extractElementProps(child);
  const childData = buildChildData(
    grandchildren as EspComposeElement | EspComposeElement[] | undefined
  );
  // Convert prop keys via the target-supplied shaper for YAML output.
  const data = compactObject(transformPropKeys({ ...allProps, ...childData }));
  const yamlKey = transformElementType(child.type as string);
  if (!sections[yamlKey]) sections[yamlKey] = [];
  sections[yamlKey].push(Object.keys(data).length > 0 ? data : null);
}

/**
 * Converts nested children into a sub-object by recursively calling toPlainObject
 * on each child and merging the resulting `{ [type]: data }` pairs.
 */
function buildChildData(
  children: EspComposeElement | EspComposeElement[] | undefined
): Record<string, unknown> {
  if (!children) return {};
  const arr = Array.isArray(children) ? children : [children];
  const out: Record<string, unknown> = {};
  for (const child of arr) {
    const plain = toPlainObject(child);
    if (plain != null && typeof plain === 'object' && !Array.isArray(plain)) {
      Object.assign(out, plain);
    }
  }
  return out;
}

// ────────────────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────────────────

function render(element: EspComposeElement | EspComposeElement[]): unknown {
  return toPlainObject(element);
}

export const ESPCompose = {
  createElement,
  Fragment,
  render,
  useScript,
  withScriptScope,
  withReactiveScope,
  withOverlayScope,
  withOverlayTierScope,
  withContributionScope,
  clearHAEntityCache,
  clearImageCache,
  clearFontCache,
  // Compiler state management — shared via the CJS module instance.
  // Used by the CLI compiler to reset state between compile runs.
  clearRefRegistry,
  clearSecrets,
  clearThemeRegistry,
  clearReactiveThemeProxy,
  clearThemeNodeCache,
  startSerializationCapture,
  stopSerializationCapture,
  getSecrets,
  getThemeRegistry,
  // Wireframe mode — set by CLI before executing user code.
  setWireframeEnabled,
  clearWireframe,
  // LVGL widget tree capture — collected during render, drained after.
  getLvglTrees,
  clearLvglTrees,
};

export { createElement, Fragment, render };
