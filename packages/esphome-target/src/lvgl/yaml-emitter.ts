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
// and pre-serialized values); this module is registered with core's
// `setLvglYamlEmitter()` hook and invoked during the render pass.
// ────────────────────────────────────────────────────────────────────────────

import type { IRWidget, IRWidgetTree } from '@espcompose/core/internals';
import {
  EC_CANVAS_OPAQUE_KIND,
  EC_CANVAS_OPAQUE_PAYLOAD_KEY,
  isSerializeMarker,
} from '@espcompose/core/internals';

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

function widgetKindToYamlKey(kind: string): string {
  return camelToSnake(kind);
}

// ── Widget / page lowering ──────────────────────────────────────────────────

/**
 * Lower a single `IRWidget` to the ESPHome YAML widget shape:
 *   `{ widget_key: { ...snake_props, widgets?: [...] } }`
 *
 * Widgets of the opaque `EC_CANVAS_OPAQUE_KIND` are unwrapped to their
 * payload (already-lowered `ec_canvas` YAML) and emitted verbatim.
 */
export function lowerLvglWidget(node: IRWidget): Record<string, unknown> {
  if (node.kind === EC_CANVAS_OPAQUE_KIND) {
    return node.props[EC_CANVAS_OPAQUE_PAYLOAD_KEY] as Record<string, unknown>;
  }
  const yamlKey = widgetKindToYamlKey(node.kind);
  const serialized = stripUndefined(deepKeysToSnakeCase(node.props) as Record<string, unknown>);
  if (node.children.length > 0) {
    serialized.widgets = node.children.map(lowerLvglWidget);
  }
  return { [yamlKey]: serialized };
}

function lowerLvglPage(page: IRWidget): Record<string, unknown> {
  const serialized = stripUndefined(deepKeysToSnakeCase(page.props) as Record<string, unknown>);
  if (page.children.length > 0) {
    serialized.widgets = page.children.map(lowerLvglWidget);
  }
  return serialized;
}

// ── Top-level entry point ──────────────────────────────────────────────────

/**
 * Lower an `IRWidgetTree` to the ESPHome YAML shape for the `lvgl:` section.
 * Returns a plain object suitable for `yaml.stringify`.
 */
export function lowerLvglWidgetTree(tree: IRWidgetTree): Record<string, unknown> {
  const serialized = stripUndefined(deepKeysToSnakeCase({ ...tree.props }) as Record<string, unknown>);
  const pagesYaml = tree.pages.map(lowerLvglPage);
  const widgetsYaml = tree.widgets.map(lowerLvglWidget);
  if (pagesYaml.length > 0) serialized.pages = pagesYaml;
  if (widgetsYaml.length > 0) serialized.widgets = widgetsYaml;

  if (tree.overlayTiers.length > 0) {
    const tierWidgets: Record<string, unknown>[] = [];
    for (const tier of tree.overlayTiers) {
      const overlayContainerWidgets: Record<string, unknown>[] = [];
      for (const overlay of tier.overlays) {
        const widgets = overlay.widgets.map(lowerLvglWidget);
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
