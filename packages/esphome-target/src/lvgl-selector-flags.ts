// ────────────────────────────────────────────────────────────────────────────
// LVGL Part & State Selector Flag Maps (esphome / C++ target)
//
// Maps semantic snake_case names from core (`LVGL_PART_NAMES`,
// `LVGL_STATE_NAMES`) to their LVGL C macro names. Used to build the
// selector argument for `lv_obj_set_style_*(obj, value, selector)`.
//
//   selector = LV_PART_xxx | LV_STATE_xxx
//
// INVARIANT: keys here MUST stay in sync with the semantic name sets in
// `@espcompose/core/internals`. Enforced at module load below.
// ────────────────────────────────────────────────────────────────────────────

import { LVGL_PART_NAMES, LVGL_STATE_NAMES } from '@espcompose/core/internals';

/** Maps snake_case LVGL part name → C macro name. */
export const LVGL_PART_FLAGS: Readonly<Record<string, string>> = {
  main:                   'LV_PART_MAIN',
  scrollbar:              'LV_PART_SCROLLBAR',
  indicator:              'LV_PART_INDICATOR',
  knob:                   'LV_PART_KNOB',
  selected:               'LV_PART_SELECTED',
  items:                  'LV_PART_ITEMS',
  ticks:                  'LV_PART_TICKS',
  cursor:                 'LV_PART_CURSOR',
  textarea_placeholder:   'LV_PART_TEXTAREA_PLACEHOLDER',
};

/** Maps snake_case LVGL state name → C macro name. */
export const LVGL_STATE_FLAGS: Readonly<Record<string, string>> = {
  default:    'LV_STATE_DEFAULT',
  checked:    'LV_STATE_CHECKED',
  focused:    'LV_STATE_FOCUSED',
  focus_key:  'LV_STATE_FOCUS_KEY',
  edited:     'LV_STATE_EDITED',
  hovered:    'LV_STATE_HOVERED',
  pressed:    'LV_STATE_PRESSED',
  scrolled:   'LV_STATE_SCROLLED',
  disabled:   'LV_STATE_DISABLED',
  user_1:     'LV_STATE_USER_1',
  user_2:     'LV_STATE_USER_2',
  user_3:     'LV_STATE_USER_3',
  user_4:     'LV_STATE_USER_4',
};

// ── Load-time invariant: target tables ⊇ core semantic name sets ───────────
{
  for (const k of LVGL_PART_NAMES) {
    if (!(k in LVGL_PART_FLAGS)) {
      throw new Error(
        `LVGL_PART_FLAGS missing key '${k}' that exists in core LVGL_PART_NAMES`,
      );
    }
  }
  for (const k of Object.keys(LVGL_PART_FLAGS)) {
    if (!LVGL_PART_NAMES.has(k)) {
      throw new Error(
        `LVGL_PART_FLAGS has key '${k}' not present in core LVGL_PART_NAMES`,
      );
    }
  }
  for (const k of LVGL_STATE_NAMES) {
    if (!(k in LVGL_STATE_FLAGS)) {
      throw new Error(
        `LVGL_STATE_FLAGS missing key '${k}' that exists in core LVGL_STATE_NAMES`,
      );
    }
  }
  for (const k of Object.keys(LVGL_STATE_FLAGS)) {
    if (!LVGL_STATE_NAMES.has(k)) {
      throw new Error(
        `LVGL_STATE_FLAGS has key '${k}' not present in core LVGL_STATE_NAMES`,
      );
    }
  }
}
