// ────────────────────────────────────────────────────────────────────────────
// LVGL Widget Definitions & Style Property Tables
//
// Data-driven mapping from ESPHome prop names to LVGL C API setters.
// Used by the type codegen (lvgl-codegen.ts) to wrap props with Reactive<T>
// and by the C++ codegen to generate update calls.
// ────────────────────────────────────────────────────────────────────────────

/**
 * Known LVGL widget types and their updatable properties.
 *
 * Used by the codegen for validation and documentation \u2014 it serves as a
 * reference for which widgets support updates and what properties are meaningful.
 */
export const LVGL_UPDATABLE_WIDGETS: Readonly<Record<string, readonly string[]>> = {
  button:    ['checked', 'text', 'hidden'],
  label:     ['text', 'hidden'],
  slider:    ['value', 'min_value', 'max_value', 'hidden'],
  arc:       ['value', 'min_value', 'max_value', 'hidden'],
  bar:       ['value', 'min_value', 'max_value', 'hidden'],
  switch:    ['checked', 'hidden'],
  checkbox:  ['checked', 'text', 'hidden'],
  dropdown:  ['selected', 'options', 'hidden'],
  roller:    ['selected', 'hidden'],
  textarea:  ['text', 'hidden'],
  spinbox:   ['value', 'hidden'],
  obj:       ['hidden'],
  img:       ['src', 'hidden'],
  led:       ['color', 'brightness', 'hidden'],
  meter:     ['hidden'],
  chart:     ['hidden'],
  keyboard:  ['hidden'],
  tabview:   ['hidden'],
  tileview:  ['hidden'],
};

// ────────────────────────────────────────────────────────────────────────────
// LVGL Reactive Style Property Names
//
// Lists the ESPHome snake_case style prop names that may participate in
// reactive updates. Used by:
//   1. The type codegen (lvgl-codegen.ts) — to wrap props with Reactive<T>
//   2. The widget-binding compiler — to validate prop names
//
// Target-specific lowering (e.g. C++ setter / cast) lives in the lowering
// target (see `packages/esphome-target/src/lvgl-style-prop-table.ts`).
//
// INVARIANT: this list must remain a superset of the keys in any
// target-side prop table. Targets enforce this at module load.
// ────────────────────────────────────────────────────────────────────────────

const _LVGL_REACTIVE_STYLE_PROP_NAMES = [
  // ── Size & position ────────────────────────────────────────────────────
  'width', 'height', 'min_width', 'max_width', 'min_height', 'max_height',
  'x', 'y', 'radius',

  // ── Background ─────────────────────────────────────────────────────────
  'bg_color', 'bg_opa', 'bg_grad_color', 'bg_grad_dir', 'bg_main_stop',
  'bg_grad_stop', 'bg_image_opa', 'bg_image_recolor', 'bg_image_recolor_opa',
  'bg_image_tiled',

  // ── Border ─────────────────────────────────────────────────────────────
  'border_color', 'border_opa', 'border_width', 'border_side', 'border_post',

  // ── Outline ────────────────────────────────────────────────────────────
  'outline_width', 'outline_color', 'outline_opa', 'outline_pad',

  // ── Shadow ─────────────────────────────────────────────────────────────
  'shadow_width', 'shadow_ofs_x', 'shadow_ofs_y', 'shadow_spread',
  'shadow_color', 'shadow_opa',

  // ── Padding ────────────────────────────────────────────────────────────
  'pad_all', 'pad_top', 'pad_bottom', 'pad_left', 'pad_right',
  'pad_row', 'pad_column',

  // ── Text ───────────────────────────────────────────────────────────────
  'text_color', 'text_opa', 'text_font', 'text_letter_space',
  'text_line_space', 'text_align', 'text_decor',

  // ── Line ───────────────────────────────────────────────────────────────
  'line_width', 'line_dash_width', 'line_dash_gap', 'line_rounded',
  'line_color', 'line_opa',

  // ── Arc ────────────────────────────────────────────────────────────────
  'arc_width', 'arc_rounded', 'arc_color', 'arc_opa',

  // ── Image ──────────────────────────────────────────────────────────────
  'image_recolor', 'image_recolor_opa',

  // ── Opacity & misc ─────────────────────────────────────────────────────
  'opa', 'color_filter_opa', 'clip_corner', 'anim_time',

  // ── Transform ──────────────────────────────────────────────────────────
  'transform_width', 'transform_height', 'translate_x', 'translate_y',
  'transform_zoom', 'transform_angle',
] as const;

export const LVGL_REACTIVE_STYLE_PROPS: ReadonlySet<string> =
  new Set(_LVGL_REACTIVE_STYLE_PROP_NAMES);

// ────────────────────────────────────────────────────────────────────────────
// LVGL Part & State Names
//
// Semantic snake_case identifiers for LVGL parts and states. Core only knows
// the names; the lowering target maps these to platform-specific selector
// flags (e.g. C macros like LV_PART_MAIN | LV_STATE_DEFAULT).
//
// See `packages/esphome-target/src/lvgl-selector-flags.ts` for the C mapping.
//
// INVARIANT: target-side flag tables must remain a superset of these sets.
// Targets enforce this at module load.
// ────────────────────────────────────────────────────────────────────────────

const _LVGL_PART_NAMES = [
  'main',
  'scrollbar',
  'indicator',
  'knob',
  'selected',
  'items',
  'ticks',
  'cursor',
  'textarea_placeholder',
] as const;

const _LVGL_STATE_NAMES = [
  'default',
  'checked',
  'focused',
  'focus_key',
  'edited',
  'hovered',
  'pressed',
  'scrolled',
  'disabled',
  'user_1',
  'user_2',
  'user_3',
  'user_4',
] as const;

export const LVGL_PART_NAMES: ReadonlySet<string> = new Set(_LVGL_PART_NAMES);
export const LVGL_STATE_NAMES: ReadonlySet<string> = new Set(_LVGL_STATE_NAMES);
