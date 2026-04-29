// ────────────────────────────────────────────────────────────────────────────
// LVGL YAML emitter hook
//
// Core's render pass produces a target-neutral `IRWidgetTree` for each
// `<lvgl>` element and a per-widget `IRWidget` for each `lvgl-*` element
// embedded inside other host elements (e.g. `<ec-canvas-content>`). The
// concrete YAML shape (single-key wrappers, `top_layer`, overlay container
// `obj` wrappers, snake_case widget keys, etc.) is target-specific and lives
// in `@espcompose/esphome-target/lvgl-yaml-emitter.ts`.
//
// To keep the layering clean, the target REGISTERS its emitter functions
// here before the render pass runs. Core's `lvgl.ts` then calls them via
// the getters below, never owning any YAML vocabulary.
// ────────────────────────────────────────────────────────────────────────────

import type { IRWidget, IRWidgetTree } from './ir/widget-types';

export type LvglWidgetTreeEmitter = (tree: IRWidgetTree) => Record<string, unknown>;
export type LvglWidgetEmitter = (widget: IRWidget) => Record<string, unknown>;

let _treeEmitter: LvglWidgetTreeEmitter | null = null;
let _widgetEmitter: LvglWidgetEmitter | null = null;

export function setLvglYamlEmitter(fn: LvglWidgetTreeEmitter): void {
  _treeEmitter = fn;
}

export function setLvglWidgetEmitter(fn: LvglWidgetEmitter): void {
  _widgetEmitter = fn;
}

export function getLvglYamlEmitter(): LvglWidgetTreeEmitter {
  if (_treeEmitter == null) {
    throw new Error(
      'No LVGL widget tree YAML emitter has been registered. ' +
        'A target must call setLvglYamlEmitter() before the render pass runs.',
    );
  }
  return _treeEmitter;
}

export function getLvglWidgetEmitter(): LvglWidgetEmitter {
  if (_widgetEmitter == null) {
    throw new Error(
      'No LVGL single-widget YAML emitter has been registered. ' +
        'A target must call setLvglWidgetEmitter() before the render pass runs.',
    );
  }
  return _widgetEmitter;
}

export function clearLvglYamlEmitters(): void {
  _treeEmitter = null;
  _widgetEmitter = null;
}

// ────────────────────────────────────────────────────────────────────────────
// Element/prop key shaper
//
// Core does not encode any element- or prop-key spelling. The target supplies
// the prop-key transform (e.g. camelCase → snake_case for ESPHome YAML) and
// the JSX-element-type → element-key mapping. Core's serialize/runtime call
// these via `getYamlShaper()` so the spelling algorithm itself lives only in
// the target.
// ────────────────────────────────────────────────────────────────────────────

export interface YamlShaper {
  /** Transform a camelCase prop identifier to the target's spelling. */
  transformPropKey: (key: string) => string;
  /** Transform a JSX element type name to its target element key. */
  transformElementType: (type: string) => string;
}

let _yamlShaper: YamlShaper | null = null;

export function setYamlShaper(s: YamlShaper): void {
  _yamlShaper = s;
}

export function getYamlShaper(): YamlShaper {
  if (_yamlShaper == null) {
    throw new Error(
      'No YAML shaper has been registered. ' +
        'A target must call setYamlShaper() before the render pass runs.',
    );
  }
  return _yamlShaper;
}

export function clearYamlShaper(): void {
  _yamlShaper = null;
}
