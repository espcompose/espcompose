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

import type { IRWidget, IRWidgetTree } from '@espcompose/core/internals';
import {
  isSerializeMarker,
} from '@espcompose/core/internals';

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
}

// ── Case utilities ──────────────────────────────────────────────────────────

function camelToSnake(s: string): string {
  return s.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
}

/**
 * Recursively convert camelCase object keys to snake_case. Skips
 * serialization marker classes (Lambda/Secret/Quoted) so their internal
 * `value`/`tag`/`type` fields aren't rewritten — they must reach the YAML
 * stringifier with their duck-type shape intact.
 *
 * Arrays are returned by reference (NOT cloned) because some are captured
 * in core's serialization-capture WeakMap (e.g. action handler arrays);
 * cloning would break reference identity and prevent the IR builder from
 * classifying them as `IRAction`. The IR builder will then lower their
 * contents via `lowerActionTree`, which produces the proper snake-cased
 * ESPHome action YAML — so we don't lose any key conversion.
 */
function deepKeysToSnakeCase(value: unknown): unknown {
  if (value === null || value === undefined) return value;
  if (Array.isArray(value)) return value;
  if (typeof value !== 'object') return value;
  if (isSerializeMarker(value)) return value;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
    out[camelToSnake(k)] = deepKeysToSnakeCase(v);
  }
  return out;
}

function stripUndefined(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) out[k] = v;
  }
  return out;
}

// ── Value lowering ──────────────────────────────────────────────────────────

/** Sentinel signalling that a prop should be omitted from the output. */
const SKIP_VALUE = Symbol('SKIP_VALUE');

/** Regex to extract nodeId from reactive lambda placeholder body. */
const REACTIVE_PLACEHOLDER_RE = /^\/\* reactive (\S+) \*\/$/;

/**
 * Detect whether a value is a serialize marker representing a lambda.
 * Duck-type: { tag: '!lambda', type: 'QUOTE_DOUBLE', value: string }
 */
function isLambdaMarker(v: unknown): v is { tag: '!lambda'; type: 'QUOTE_DOUBLE'; value: string } {
  if (v === null || typeof v !== 'object') return false;
  const o = v as Record<string, unknown>;
  return o.tag === '!lambda' && o.type === 'QUOTE_DOUBLE' && typeof o.value === 'string';
}

/**
 * Detect whether a value is a serialize marker representing a quoted string.
 * Duck-type: { type: 'QUOTE_SINGLE', value: string } (no tag)
 */
function isQuotedMarker(v: unknown): v is { type: 'QUOTE_SINGLE'; value: string } {
  if (v === null || typeof v !== 'object') return false;
  const o = v as Record<string, unknown>;
  return o.type === 'QUOTE_SINGLE' && typeof o.value === 'string' && !('tag' in o);
}

/**
 * Detect whether an array contains IRActionNode objects (action handler).
 * Checks first element for an object with a string `kind` field.
 */
function isActionArray(arr: unknown[]): boolean {
  if (arr.length === 0) return false;
  const first = arr[0];
  return first !== null && typeof first === 'object' && 'kind' in first &&
    typeof (first as Record<string, unknown>).kind === 'string';
}

/**
 * Recursively lower serialization markers and action arrays in a prop
 * object. Mutates the object in place, removing entries that return
 * SKIP_VALUE (e.g. font_ref reactive props that should not appear in YAML).
 */
function deepLowerValues(obj: Record<string, unknown>, ctx: LvglValueLoweringContext): void {
  for (const key of Object.keys(obj)) {
    const lowered = lowerValue(obj[key], ctx);
    if (lowered === SKIP_VALUE) {
      delete obj[key];
    } else {
      obj[key] = lowered;
    }
  }
}

function lowerValue(val: unknown, ctx: LvglValueLoweringContext): unknown {
  if (val === null || val === undefined) return val;

  if (typeof val === 'object') {
    // Lambda markers (reactive or plain lambda)
    if (isLambdaMarker(val)) {
      const m = REACTIVE_PLACEHOLDER_RE.exec(val.value);
      if (m) {
        const result = ctx.lowerReactiveMarker(m[1]);
        return result === undefined ? SKIP_VALUE : result;
      }
      return ctx.lowerLambda(val.value);
    }

    // Quoted markers (YAML-bool-like strings)
    if (isQuotedMarker(val)) {
      return ctx.lowerQuoted(val.value);
    }

    // Arrays: action arrays or recurse
    if (Array.isArray(val)) {
      if (isActionArray(val)) {
        return ctx.lowerActions(val);
      }
      return val.map(item => lowerValue(item, ctx));
    }

    // Plain objects: recurse into values
    if (!isSerializeMarker(val)) {
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
        const lowered = lowerValue(v, ctx);
        if (lowered !== SKIP_VALUE) {
          out[k] = lowered;
        }
      }
      return out;
    }
  }

  return val;
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
    // The props contain { ec_canvas: { ...hostProps, widgets?: [IRWidget, ...] } }
    const ecCanvas = node.props['ec_canvas'] as Record<string, unknown> | undefined;
    if (ecCanvas && Array.isArray(ecCanvas.widgets)) {
      ecCanvas.widgets = (ecCanvas.widgets as IRWidget[]).map(w => lowerLvglWidget(w as IRWidget, ctx));
    }
    // Deep-convert ec-canvas host prop keys to snake_case (including nested objects like layout)
    const lowered = ecCanvas
      ? stripUndefined(deepKeysToSnakeCase(ecCanvas) as Record<string, unknown>)
      : {};
    if (ctx) deepLowerValues(lowered, ctx);
    return { ec_canvas: lowered };
  }
  const yamlKey = widgetKindToYamlKey(node.kind);
  const serialized = stripUndefined(deepKeysToSnakeCase(node.props) as Record<string, unknown>);
  if (ctx) deepLowerValues(serialized, ctx);
  if (node.children.length > 0) {
    serialized.widgets = node.children.map(c => lowerLvglWidget(c, ctx));
  }
  return { [yamlKey]: serialized };
}

function lowerLvglPage(page: IRWidget, ctx?: LvglValueLoweringContext): Record<string, unknown> {
  const serialized = stripUndefined(deepKeysToSnakeCase(page.props) as Record<string, unknown>);
  if (ctx) deepLowerValues(serialized, ctx);
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
export function lowerLvglWidgetTree(tree: IRWidgetTree, ctx?: LvglValueLoweringContext): Record<string, unknown> {
  const serialized = stripUndefined(deepKeysToSnakeCase({ ...tree.props }) as Record<string, unknown>);
  if (ctx) deepLowerValues(serialized, ctx);
  const pagesYaml = tree.pages.map(p => lowerLvglPage(p, ctx));
  const widgetsYaml = tree.widgets.map(w => lowerLvglWidget(w, ctx));
  if (pagesYaml.length > 0) serialized.pages = pagesYaml;
  if (widgetsYaml.length > 0) serialized.widgets = widgetsYaml;

  if (tree.overlayTiers.length > 0) {
    const tierWidgets: Record<string, unknown>[] = [];
    for (const tier of tree.overlayTiers) {
      const overlayContainerWidgets: Record<string, unknown>[] = [];
      for (const overlay of tier.overlays) {
        const widgets = overlay.widgets.map(w => lowerLvglWidget(w, ctx));
        overlayContainerWidgets.push({
          obj: {
            id: `overlay_${overlay.templateKey}`,
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
