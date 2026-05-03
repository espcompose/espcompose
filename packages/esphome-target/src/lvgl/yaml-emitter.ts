// ────────────────────────────────────────────────────────────────────────────
// LVGL YAML emitter (target side)
//
// Lowers a target-neutral `IRWidgetTree` produced by `@espcompose/core` into
// the ESPHome YAML shape:
//   - widgets are emitted as list-of-single-key-dicts (`{ widgetKey: {...} }`)
//   - pages are flat objects under `pages:`
//   - prop keys are converted from camelCase to snake_case
//   - overlay subtrees are wrapped in `top_layer.widgets` as hidden `obj`
//     containers (one per zOrder tier, with one `obj` per overlay container).
//
// This file owns ALL ESPHome YAML vocabulary for the LVGL section. Core
// constructs only the target-neutral `IRWidgetTree` (semantic camelCase keys
// and pre-serialized values); the target lowers them during the emit phase.
// ────────────────────────────────────────────────────────────────────────────

import type { IRWidget, IRUIRegistry, IRValue } from '@espcompose/core/internals';

// ── Value lowering context ──────────────────────────────────────────────────

/**
 * Context passed to the widget tree lowering to convert serialization markers
 * and action arrays into YAML-ready values. The caller (lower-yaml.ts)
 * supplies callbacks that have access to CppLoweringContext, reactive node
 * maps, and the action lowering pipeline.
 */
export interface LvglValueLoweringContext {
  /**
   * Convert a LambdaMarker for a reactive node into a YAML value.
   * Returns `undefined` to signal the prop should be omitted (font_ref skip).
   */
  lowerReactiveMarker(nodeId: string): unknown | undefined;
  /** Lower an IRActionNode[] array to ESPHome YAML action format. */
  lowerActions(actions: unknown[]): unknown[];
  /** Convert a QuotedMarker to a YAML Scalar. */
  lowerQuoted(value: string): unknown;
  /** Convert a non-reactive LambdaMarker to a YAML Scalar (e.g. raw lambda). */
  lowerLambda(body: string): unknown;
  /** Convert a typed IRValue to a YAML-ready plain value. */
  lowerIRValue(value: IRValue): unknown;
}

// ── Case utilities ──────────────────────────────────────────────────────────

function camelToSnake(s: string): string {
  return s.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
}

// ── IRValue → YAML prop lowering ────────────────────────────────────────────

/** Sentinel signalling that a prop should be omitted from the output. */
const SKIP_VALUE = Symbol('SKIP_VALUE');

/**
 * Fallback IRValue → plain value conversion when no LvglValueLoweringContext
 * is available. Handles only structural types (scalar, object, array, null).
 */
function irValueToPlainFallback(value: IRValue): unknown {
  switch (value.kind) {
    case 'null': return null;
    case 'scalar': return value.value;
    case 'array': return value.items.map(irValueToPlainFallback);
    case 'object': {
      const out: Record<string, unknown> = {};
      for (const entry of value.entries) {
        out[camelToSnake(entry.key)] = irValueToPlainFallback(entry.value);
      }
      return out;
    }
    case 'ref': return value.token;
    default: return null;
  }
}

/**
 * Lower IRValue widget props to a YAML-ready snake_case object.
 * Uses `ctx.lowerIRValue` when available, otherwise falls back to plain extraction.
 */
function lowerWidgetProps(props: Record<string, IRValue>, ctx?: LvglValueLoweringContext): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    const lowered = ctx ? ctx.lowerIRValue(value) : irValueToPlainFallback(value);
    if (lowered !== undefined && lowered !== SKIP_VALUE) {
      out[camelToSnake(key)] = lowered;
    }
  }
  return out;
}

function widgetKindToYamlKey(kind: string): string {
  return camelToSnake(kind);
}

// ── Widget / page lowering ──────────────────────────────────────────────────

/**
 * Lower a single `IRWidget` to the ESPHome YAML widget shape:
 *   `{ widget_key: { ...snake_props, widgets?: [...] } }`
 *
 * Widgets with `kind: 'ecCanvas'` are lowered to `{ ec_canvas: {...} }`.
 * Any embedded `IRWidget` objects in the payload's `widgets` array
 * are recursively lowered. The host props are snake_case-converted.
 */
export function lowerLvglWidget(node: IRWidget, ctx?: LvglValueLoweringContext): Record<string, unknown> {
  if (node.kind === 'ecCanvas') {
    // ec_canvas prop is an IRValue (IRObject) with host props (no embedded widgets).
    // Embedded widgets have been moved to node.children during resolution.
    const ecCanvasProps = lowerWidgetProps(node.props, ctx);
    // The ec_canvas key in lowered props contains the host prop object
    const ecCanvas = ecCanvasProps['ec_canvas'] as Record<string, unknown> | undefined ?? {};
    // Re-attach recursively-lowered embedded widgets
    if (node.children.length > 0) {
      ecCanvas.widgets = node.children.map(w => lowerLvglWidget(w, ctx));
    }
    return { ec_canvas: ecCanvas };
  }
  const yamlKey = widgetKindToYamlKey(node.kind);
  const serialized = lowerWidgetProps(node.props, ctx);
  if (node.children.length > 0) {
    serialized.widgets = node.children.map(c => lowerLvglWidget(c, ctx));
  }
  return { [yamlKey]: serialized };
}

function lowerLvglPage(page: IRWidget, ctx?: LvglValueLoweringContext): Record<string, unknown> {
  const serialized = lowerWidgetProps(page.props, ctx);
  if (page.children.length > 0) {
    serialized.widgets = page.children.map(c => lowerLvglWidget(c, ctx));
  }
  return serialized;
}

// ── Top-level entry point ──────────────────────────────────────────────────

/**
 * Lower an `IRWidgetTree` to the ESPHome YAML shape for the `lvgl:` section.
 * Returns a plain object suitable for `yaml.stringify`.
 *
 * When `ctx` is provided, serialization markers (LambdaMarker, QuotedMarker)
 * and action arrays in widget props are lowered to YAML-ready values.
 */
export function lowerLvglWidgetTree(tree: IRUIRegistry, ctx?: LvglValueLoweringContext): Record<string, unknown> {
  const serialized = lowerWidgetProps(tree.config, ctx);
  const pagesYaml = tree.pages.map(p => lowerLvglPage(p, ctx));
  const widgetsYaml = tree.widgets.map(w => lowerLvglWidget(w, ctx));
  if (pagesYaml.length > 0) serialized.pages = pagesYaml;
  if (widgetsYaml.length > 0) serialized.widgets = widgetsYaml;

  if (tree.overlays.length > 0) {
    const tierWidgets: Record<string, unknown>[] = [];
    for (const tier of tree.overlays) {
      const overlayContainerWidgets: Record<string, unknown>[] = [];
      for (const overlay of tier.overlays) {
        const widgets = overlay.widgets.map(w => lowerLvglWidget(w, ctx));
        overlayContainerWidgets.push({
          obj: {
            id: `${overlay.templateKey}`,
            hidden: true,
            width: '100%',
            height: '100%',
            bg_opa: 'transparent',
            border_width: 0,
            pad_all: 0,
            clickable: false,
            widgets,
          },
        });
      }
      tierWidgets.push({
        obj: {
          id: `overlay_tier_${tier.zOrder}`,
          width: '100%',
          height: '100%',
          bg_opa: 'transparent',
          border_width: 0,
          pad_all: 0,
          clickable: false,
          widgets: overlayContainerWidgets,
        },
      });
    }

    const existingTopLayer = serialized.top_layer;
    if (existingTopLayer && typeof existingTopLayer === 'object' && !Array.isArray(existingTopLayer)) {
      const tl = existingTopLayer as Record<string, unknown>;
      const existingWidgets = Array.isArray(tl.widgets) ? (tl.widgets as unknown[]) : [];
      tl.widgets = [...existingWidgets, ...tierWidgets];
    } else {
      serialized.top_layer = { widgets: tierWidgets };
    }
  }

  return serialized;
}
