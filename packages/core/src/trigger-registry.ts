// ────────────────────────────────────────────────────────────────────────────
// Trigger Variable Registry
//
// Maps component domains and their trigger names to the variables available
// inside trigger callbacks (e.g. `on_state:` provides `x` as a `bool` for
// binary_sensor, but no variables for light).
//
// Entity domain triggers are generated from metadata/entity-domains.json.
// LVGL widget triggers: common event triggers (from LV_EVENT_TRIGGERS and
// SWIPE_TRIGGERS) are shared across all widgets. Per-widget `on_value`
// triggers with typed variables are maintained below, matching ESPHome's
// LvType callback signatures.
// ────────────────────────────────────────────────────────────────────────────

import { ENTITY_DOMAIN_TRIGGERS } from './generated/entity-domains-triggers.js';

export interface TriggerVariable {
  /** Variable name available in the trigger lambda (e.g. `x`). */
  name: string;
  /** C++ type of the variable (e.g. `bool`, `float`, `std::string`). */
  cppType: string;
  /** TypeScript type equivalent for type-checking (e.g. `boolean`, `number`, `string`). */
  tsType: string;
}

export interface TriggerSignature {
  /** Variables available inside the trigger's lambda scope. Empty array = no variables. */
  variables: TriggerVariable[];
}

// ── LVGL common event triggers (no callback variables) ────────────────────
// These are lv_obj-level events available on every widget.
const NO_VARS: TriggerSignature = { variables: [] };

const LVGL_COMMON_TRIGGERS: Readonly<Record<string, TriggerSignature>> = {
  // LV_EVENT_TRIGGERS
  on_all_events: NO_VARS,
  on_cancel: NO_VARS,
  on_change: NO_VARS,
  on_child_change: NO_VARS,
  on_child_create: NO_VARS,
  on_child_delete: NO_VARS,
  on_click: NO_VARS,
  on_color_format_change: NO_VARS,
  on_cover_check: NO_VARS,
  on_create: NO_VARS,
  on_defocus: NO_VARS,
  on_delete: NO_VARS,
  on_double_click: NO_VARS,
  on_draw_main: NO_VARS,
  on_draw_main_begin: NO_VARS,
  on_draw_main_end: NO_VARS,
  on_draw_post: NO_VARS,
  on_draw_post_begin: NO_VARS,
  on_draw_post_end: NO_VARS,
  on_draw_task_add: NO_VARS,
  on_focus: NO_VARS,
  on_gesture: NO_VARS,
  on_get_self_size: NO_VARS,
  on_hit_test: NO_VARS,
  on_hover_leave: NO_VARS,
  on_hover_over: NO_VARS,
  on_indev_reset: NO_VARS,
  on_insert: NO_VARS,
  on_invalidate_area: NO_VARS,
  on_key: NO_VARS,
  on_layout_change: NO_VARS,
  on_leave: NO_VARS,
  on_long_press: NO_VARS,
  on_long_press_repeat: NO_VARS,
  on_press: NO_VARS,
  on_press_lost: NO_VARS,
  on_pressing: NO_VARS,
  on_ready: NO_VARS,
  on_refresh: NO_VARS,
  on_refr_ext_draw_size: NO_VARS,
  on_release: NO_VARS,
  on_rotary: NO_VARS,
  on_scroll: NO_VARS,
  on_scroll_begin: NO_VARS,
  on_scroll_end: NO_VARS,
  on_scroll_throw_begin: NO_VARS,
  on_short_click: NO_VARS,
  on_single_click: NO_VARS,
  on_size_change: NO_VARS,
  on_state_change: NO_VARS,
  on_style_change: NO_VARS,
  on_triple_click: NO_VARS,
  // SWIPE_TRIGGERS
  on_swipe_left: NO_VARS,
  on_swipe_right: NO_VARS,
  on_swipe_bottom: NO_VARS,
  on_swipe_top: NO_VARS,
  on_swipe_up: NO_VARS,
  on_swipe_down: NO_VARS,
};

// ── Per-widget trigger variable signatures ────────────────────────────────
// In ESPHome, ALL event triggers on a widget receive the widget's typed
// callback args (e.g. slider's on_release provides float x, same as on_value).
// These overrides replace the common triggers with typed versions.

function withTypedArgs(sig: TriggerSignature): Record<string, TriggerSignature> {
  const typed: Record<string, TriggerSignature> = {};
  for (const key of Object.keys(LVGL_COMMON_TRIGGERS)) {
    typed[key] = sig;
  }
  return typed;
}

const LVGL_NUMBER_VALUE: TriggerSignature = {
  variables: [{ name: 'x', cppType: 'float', tsType: 'number' }],
};

const LVGL_BOOLEAN_VALUE: TriggerSignature = {
  variables: [{ name: 'x', cppType: 'bool', tsType: 'boolean' }],
};

const LVGL_TEXT_VALUE: TriggerSignature = {
  variables: [{ name: 'text', cppType: 'std::string', tsType: 'string' }],
};

const LVGL_SELECT_VALUE: TriggerSignature = {
  variables: [
    { name: 'x', cppType: 'int', tsType: 'number' },
    { name: 'text', cppType: 'std::string', tsType: 'string' },
  ],
};

/**
 * Maps component domain → trigger name → trigger signature.
 *
 * Trigger names use snake_case to match ESPHome YAML keys (e.g. `on_state`, `on_value`).
 *
 * Entity domain entries are generated from metadata/entity-domains.json.
 * LVGL widget entries combine common event triggers with per-widget on_value signatures.
 */
export const TRIGGER_REGISTRY: Readonly<Record<string, Record<string, TriggerSignature>>> = {
  // ─── Entity domain triggers (generated) ─────────────────────────────────
  ...ENTITY_DOMAIN_TRIGGERS,

  // ─── LVGL widget triggers ───────────────────────────────────────────────
  // Widgets without typed args (base LvType)
  lvgl_obj:          { ...LVGL_COMMON_TRIGGERS },
  lvgl_image:        { ...LVGL_COMMON_TRIGGERS },
  lvgl_led:          { ...LVGL_COMMON_TRIGGERS },
  lvgl_line:         { ...LVGL_COMMON_TRIGGERS },
  lvgl_canvas:       { ...LVGL_COMMON_TRIGGERS },
  lvgl_container:    { ...LVGL_COMMON_TRIGGERS },
  lvgl_meter:        { ...LVGL_COMMON_TRIGGERS },
  lvgl_qrcode:       { ...LVGL_COMMON_TRIGGERS },
  lvgl_spinner:      { ...LVGL_COMMON_TRIGGERS },
  lvgl_animimg:      { ...LVGL_COMMON_TRIGGERS },
  lvgl_buttonmatrix: { ...LVGL_COMMON_TRIGGERS },
  lvgl_page:         { ...LVGL_COMMON_TRIGGERS },

  // LvNumber widgets — all triggers provide float x
  lvgl_slider:  { ...withTypedArgs(LVGL_NUMBER_VALUE), on_value: LVGL_NUMBER_VALUE },
  lvgl_arc:     { ...withTypedArgs(LVGL_NUMBER_VALUE), on_value: LVGL_NUMBER_VALUE },
  lvgl_bar:     { ...withTypedArgs(LVGL_NUMBER_VALUE), on_value: LVGL_NUMBER_VALUE },
  lvgl_spinbox: { ...withTypedArgs(LVGL_NUMBER_VALUE), on_value: LVGL_NUMBER_VALUE },

  // LvBoolean widgets — all triggers provide bool x
  lvgl_button:   { ...withTypedArgs(LVGL_BOOLEAN_VALUE), on_value: LVGL_BOOLEAN_VALUE },
  lvgl_switch:   { ...withTypedArgs(LVGL_BOOLEAN_VALUE), on_value: LVGL_BOOLEAN_VALUE },
  lvgl_checkbox: { ...withTypedArgs(LVGL_BOOLEAN_VALUE), on_value: LVGL_BOOLEAN_VALUE },

  // LvText widgets — all triggers provide string text
  lvgl_label:    { ...withTypedArgs(LVGL_TEXT_VALUE), on_value: LVGL_TEXT_VALUE },
  lvgl_textarea: { ...withTypedArgs(LVGL_TEXT_VALUE), on_value: LVGL_TEXT_VALUE },
  lvgl_keyboard: { ...withTypedArgs(LVGL_TEXT_VALUE), on_value: LVGL_TEXT_VALUE },

  // LvSelect widgets — all triggers provide int x + string text
  lvgl_dropdown: { ...withTypedArgs(LVGL_SELECT_VALUE), on_value: LVGL_SELECT_VALUE },
  lvgl_roller:   { ...withTypedArgs(LVGL_SELECT_VALUE), on_value: LVGL_SELECT_VALUE },

  // Widgets with on_value but no typed variables
  lvgl_tabview:  { ...LVGL_COMMON_TRIGGERS, on_value: NO_VARS },
  lvgl_tileview: { ...LVGL_COMMON_TRIGGERS, on_value: NO_VARS },
} as const;

/**
 * Look up a trigger signature by component domain and trigger name.
 *
 * @param domain  - Component domain (e.g. `binary_sensor`, `sensor`, `lvgl_button`)
 * @param trigger - Trigger name in snake_case (e.g. `on_state`, `on_value`)
 * @returns The trigger signature, or undefined if not registered.
 */
export function getTriggerSignature(
  domain: string,
  trigger: string,
): TriggerSignature | undefined {
  return TRIGGER_REGISTRY[domain]?.[trigger];
}
