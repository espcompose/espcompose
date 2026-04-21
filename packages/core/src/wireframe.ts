/**
 * Wireframe mode — colored outline overlays for UI component visualization.
 *
 * When enabled via the `--wireframe` CLI flag, every widget created through
 * the factory functions (`createLvglWidget`, `createLvglContainerWidget`,
 * `createLvglLayoutWidget`) automatically receives a colored outline:
 *
 *   - **Layout** components (Row, Grid)     → green  (`#4CAF50`)
 *   - **Container** components (Card, Space) → blue   (`#2196F3`)
 *   - **Widget** components (Button, Text)   → orange (`#FF9800`)
 *
 * Outlines are drawn outside element bounds (LVGL outline, not border),
 * so they have zero impact on sizing and layout.
 *
 * The injection is automatic at the factory level — component authors and
 * 3rd-party UI libraries get wireframe support for free just by using the
 * standard `createLvglWidget` / `createLvglContainerWidget` factories.
 *
 * @module
 */

import type { EspComposeElement, FunctionComponent } from './types';

// ────────────────────────────────────────────────────────────────────────────
// Widget categories
// ────────────────────────────────────────────────────────────────────────────

/** Semantic category for wireframe outline coloring. */
export type WidgetCategory = 'layout' | 'container' | 'widget';

/**
 * Outline colors per widget category.
 *
 * Chosen for strong visual contrast on both light and dark backgrounds.
 */
export const WIREFRAME_COLORS: Record<WidgetCategory, `#${string}`> = {
  layout: '#4CAF50',    // green
  container: '#2196F3', // blue
  widget: '#FF9800',    // orange
};

// ────────────────────────────────────────────────────────────────────────────
// Global wireframe state
// ────────────────────────────────────────────────────────────────────────────

let _wireframeEnabled = false;

/** Check whether wireframe mode is active for the current compile pass. */
export function isWireframeEnabled(): boolean {
  return _wireframeEnabled;
}

/** Set wireframe mode. Called by the CLI before executing user code. */
export function setWireframeEnabled(enabled: boolean): void {
  _wireframeEnabled = enabled;
}

/** Reset wireframe state between compile runs. */
export function clearWireframe(): void {
  _wireframeEnabled = false;
}

// ────────────────────────────────────────────────────────────────────────────
// Category propagation via hidden symbol prop
// ────────────────────────────────────────────────────────────────────────────

/**
 * Symbol key used to propagate the wireframe category from an outer
 * factory-wrapped component to its root element when that element is
 * itself a factory-wrapped function component (e.g. WidgetHost).
 *
 * This allows a Button (category: 'widget') that returns `<WidgetHost>`
 * to forward its 'widget' category so that WidgetHost's outline uses
 * the parent's category rather than its own 'container' category.
 */
export const WIREFRAME_CATEGORY_PROP = Symbol.for('espcompose.wireframe.category');

// ────────────────────────────────────────────────────────────────────────────
// Auto-injection wrapper for factory functions
// ────────────────────────────────────────────────────────────────────────────

/**
 * Inject wireframe outline styles onto an intrinsic LVGL element.
 *
 * Merges `outlineWidth`, `outlineColor`, and `outlineOffset` into the
 * element's `style` prop. Uses LVGL outlines (not borders) so there is
 * zero impact on element sizing.
 */
function injectWireframeOutline(
  element: EspComposeElement,
  category: WidgetCategory,
): EspComposeElement {
  const existingStyle = (element.props.style ?? {}) as Record<string, unknown>;
  return {
    ...element,
    props: {
      ...element.props,
      style: {
        ...existingStyle,
        outlineWidth: 1,
        outlineColor: WIREFRAME_COLORS[category],
        outlineOffset: 0,
      },
    },
  };
}

/**
 * Wrap a component function with wireframe auto-injection.
 *
 * When wireframe mode is enabled:
 * - If the component returns an **intrinsic** element (string type like
 *   `'lvgl-obj'`), outline styles are injected directly onto it.
 * - If the component returns a **function component** element (e.g.
 *   `<WidgetHost>`), the category is forwarded via a hidden Symbol prop
 *   so the inner factory wrapper can use the parent's category.
 *
 * When wireframe mode is disabled, the wrapper is a transparent pass-through
 * with negligible overhead.
 */
export function wrapWithWireframe<P>(
  component: FunctionComponent<P>,
  ownCategory: WidgetCategory,
): FunctionComponent<P> {
  function wireframeWrapped(props: P): EspComposeElement | null {
    // Check if an outer factory forwarded its category via the symbol prop.
    const propsObj = props as Record<string | symbol, unknown>;
    const parentCategory = propsObj[WIREFRAME_CATEGORY_PROP] as WidgetCategory | undefined;
    const effectiveCategory = parentCategory ?? ownCategory;

    // Strip the internal symbol prop before passing to the real component.
    let cleanProps = props;
    if (parentCategory !== undefined) {
      cleanProps = { ...props };
      delete (cleanProps as Record<symbol, unknown>)[WIREFRAME_CATEGORY_PROP];
    }

    const result = component(cleanProps);
    if (!result || !_wireframeEnabled) return result;

    if (typeof result.type === 'string') {
      // Intrinsic element — inject outline styles directly.
      return injectWireframeOutline(result, effectiveCategory);
    }

    // Function component — forward category via symbol prop so the inner
    // factory wrapper uses the parent's category for its outline.
    return {
      ...result,
      props: {
        ...result.props,
        [WIREFRAME_CATEGORY_PROP]: effectiveCategory,
      },
    };
  }

  // Preserve the original function name for debugging / stack traces.
  Object.defineProperty(wireframeWrapped, 'name', {
    value: `wireframe(${component.name || 'anonymous'})`,
  });

  return wireframeWrapped;
}
