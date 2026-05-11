// ────────────────────────────────────────────────────────────────────────────
// LVGL Style Property Table — ESPHome target
//
// Maps ESPHome snake_case style prop names to the C++ LVGL setter info
// (lvglSetter suffix, value cppType, optional cast template, special handling).
//
// Lives in `@espcompose/esphome-target` because it is purely a C++ lowering
// concern. `@espcompose/core` only knows the *names* of reactive style props
// (see `LVGL_REACTIVE_STYLE_PROPS` in core/src/lvgl-actions.ts).
//
// INVARIANT: keys here MUST stay in sync with `LVGL_REACTIVE_STYLE_PROPS`
// in core. The check is enforced at module load (see assertion at bottom).
// ────────────────────────────────────────────────────────────────────────────

import { LVGL_REACTIVE_STYLE_PROPS } from '@espcompose/core/internals';

export interface LvglStylePropDescriptor {
  /** LVGL C API setter suffix: lv_obj_set_style_{lvglSetter}(). */
  lvglSetter: string;
  /** C++ value type expected by the setter. */
  cppType: string;
  /** Optional C++ cast template wrapping the value expression. Use `$V` as placeholder. */
  cast?: string;
  /** Special codegen handling required (custom logic outside the standard pattern). */
  special?: 'pad_all' | 'text_font' | 'size_width' | 'size_height';
}

export const LVGL_STYLE_PROP_TABLE: Readonly<Record<string, LvglStylePropDescriptor>> = {
  // ── Size & position ────────────────────────────────────────────────────
  width:            { lvglSetter: 'width',            cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)', special: 'size_width' },
  height:           { lvglSetter: 'height',           cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)', special: 'size_height' },
  min_width:        { lvglSetter: 'min_width',        cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  max_width:        { lvglSetter: 'max_width',        cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  min_height:       { lvglSetter: 'min_height',       cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  max_height:       { lvglSetter: 'max_height',       cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  x:                { lvglSetter: 'x',                cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  y:                { lvglSetter: 'y',                cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  radius:           { lvglSetter: 'radius',           cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },

  // ── Background ─────────────────────────────────────────────────────────
  bg_color:         { lvglSetter: 'bg_color',         cppType: 'lv_color_t' },
  bg_opa:           { lvglSetter: 'bg_opa',           cppType: 'lv_opa_t',   cast: 'static_cast<lv_opa_t>($V)' },
  bg_grad_color:    { lvglSetter: 'bg_grad_color',    cppType: 'lv_color_t' },
  bg_grad_dir:      { lvglSetter: 'bg_grad_dir',      cppType: 'lv_grad_dir_t', cast: 'static_cast<lv_grad_dir_t>($V)' },
  bg_main_stop:     { lvglSetter: 'bg_main_stop',     cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  bg_grad_stop:     { lvglSetter: 'bg_grad_stop',     cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  bg_image_opa:     { lvglSetter: 'bg_img_opa',       cppType: 'lv_opa_t',   cast: 'static_cast<lv_opa_t>($V)' },
  bg_image_recolor: { lvglSetter: 'bg_img_recolor',   cppType: 'lv_color_t' },
  bg_image_recolor_opa: { lvglSetter: 'bg_img_recolor_opa', cppType: 'lv_opa_t', cast: 'static_cast<lv_opa_t>($V)' },
  bg_image_tiled:   { lvglSetter: 'bg_img_tiled',     cppType: 'bool' },

  // ── Border ─────────────────────────────────────────────────────────────
  border_color:     { lvglSetter: 'border_color',     cppType: 'lv_color_t' },
  border_opa:       { lvglSetter: 'border_opa',       cppType: 'lv_opa_t',   cast: 'static_cast<lv_opa_t>($V)' },
  border_width:     { lvglSetter: 'border_width',     cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  border_side:      { lvglSetter: 'border_side',      cppType: 'lv_border_side_t', cast: 'static_cast<lv_border_side_t>($V)' },
  border_post:      { lvglSetter: 'border_post',      cppType: 'bool' },

  // ── Outline ────────────────────────────────────────────────────────────
  outline_width:    { lvglSetter: 'outline_width',    cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  outline_color:    { lvglSetter: 'outline_color',    cppType: 'lv_color_t' },
  outline_opa:      { lvglSetter: 'outline_opa',      cppType: 'lv_opa_t',   cast: 'static_cast<lv_opa_t>($V)' },
  outline_pad:      { lvglSetter: 'outline_pad',      cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },

  // ── Shadow ─────────────────────────────────────────────────────────────
  shadow_width:     { lvglSetter: 'shadow_width',     cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  shadow_ofs_x:     { lvglSetter: 'shadow_ofs_x',     cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  shadow_ofs_y:     { lvglSetter: 'shadow_ofs_y',     cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  shadow_spread:    { lvglSetter: 'shadow_spread',    cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  shadow_color:     { lvglSetter: 'shadow_color',     cppType: 'lv_color_t' },
  shadow_opa:       { lvglSetter: 'shadow_opa',       cppType: 'lv_opa_t',   cast: 'static_cast<lv_opa_t>($V)' },

  // ── Padding ────────────────────────────────────────────────────────────
  pad_all:          { lvglSetter: 'pad_top',          cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)', special: 'pad_all' },
  pad_top:          { lvglSetter: 'pad_top',          cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  pad_bottom:       { lvglSetter: 'pad_bottom',       cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  pad_left:         { lvglSetter: 'pad_left',         cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  pad_right:        { lvglSetter: 'pad_right',        cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  pad_row:          { lvglSetter: 'pad_row',          cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  pad_column:       { lvglSetter: 'pad_column',       cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },

  // ── Text ───────────────────────────────────────────────────────────────
  text_color:       { lvglSetter: 'text_color',       cppType: 'lv_color_t' },
  text_opa:         { lvglSetter: 'text_opa',         cppType: 'lv_opa_t',   cast: 'static_cast<lv_opa_t>($V)' },
  text_font:        { lvglSetter: 'text_font',        cppType: 'const lv_font_t*', special: 'text_font' },
  text_letter_space: { lvglSetter: 'text_letter_space', cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  text_line_space:  { lvglSetter: 'text_line_space',  cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  text_align:       { lvglSetter: 'text_align',       cppType: 'lv_text_align_t', cast: 'static_cast<lv_text_align_t>($V)' },
  text_decor:       { lvglSetter: 'text_decor',       cppType: 'lv_text_decor_t', cast: 'static_cast<lv_text_decor_t>($V)' },

  // ── Line ───────────────────────────────────────────────────────────────
  line_width:       { lvglSetter: 'line_width',       cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  line_dash_width:  { lvglSetter: 'line_dash_width',  cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  line_dash_gap:    { lvglSetter: 'line_dash_gap',    cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  line_rounded:     { lvglSetter: 'line_rounded',     cppType: 'bool' },
  line_color:       { lvglSetter: 'line_color',       cppType: 'lv_color_t' },
  line_opa:         { lvglSetter: 'line_opa',         cppType: 'lv_opa_t',   cast: 'static_cast<lv_opa_t>($V)' },

  // ── Arc ────────────────────────────────────────────────────────────────
  arc_width:        { lvglSetter: 'arc_width',        cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  arc_rounded:      { lvglSetter: 'arc_rounded',      cppType: 'bool' },
  arc_color:        { lvglSetter: 'arc_color',        cppType: 'lv_color_t' },
  arc_opa:          { lvglSetter: 'arc_opa',          cppType: 'lv_opa_t',   cast: 'static_cast<lv_opa_t>($V)' },

  // ── Image ──────────────────────────────────────────────────────────────
  image_recolor:    { lvglSetter: 'img_recolor',      cppType: 'lv_color_t' },
  image_recolor_opa: { lvglSetter: 'img_recolor_opa', cppType: 'lv_opa_t',  cast: 'static_cast<lv_opa_t>($V)' },

  // ── Opacity & misc ─────────────────────────────────────────────────────
  opa:              { lvglSetter: 'opa',              cppType: 'lv_opa_t',   cast: 'static_cast<lv_opa_t>($V)' },
  color_filter_opa: { lvglSetter: 'color_filter_opa', cppType: 'lv_opa_t',  cast: 'static_cast<lv_opa_t>($V)' },
  clip_corner:      { lvglSetter: 'clip_corner',      cppType: 'bool' },
  anim_time:        { lvglSetter: 'anim_time',        cppType: 'uint32_t',   cast: 'static_cast<uint32_t>($V)' },

  // ── Transform ──────────────────────────────────────────────────────────
  transform_width:  { lvglSetter: 'transform_width',  cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  transform_height: { lvglSetter: 'transform_height', cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  translate_x:      { lvglSetter: 'translate_x',      cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  translate_y:      { lvglSetter: 'translate_y',      cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  transform_zoom:   { lvglSetter: 'transform_zoom',   cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
  transform_angle:  { lvglSetter: 'transform_angle',  cppType: 'lv_coord_t', cast: 'static_cast<lv_coord_t>($V)' },
};

// Sanity check: keys must match the core-side reactive set.
{
  const tableKeys = new Set(Object.keys(LVGL_STYLE_PROP_TABLE));
  for (const k of LVGL_REACTIVE_STYLE_PROPS) {
    if (!tableKeys.has(k)) {
      throw new Error(
        `LVGL_STYLE_PROP_TABLE missing key '${k}' that exists in core LVGL_REACTIVE_STYLE_PROPS`,
      );
    }
  }
  for (const k of tableKeys) {
    if (!LVGL_REACTIVE_STYLE_PROPS.has(k)) {
      throw new Error(
        `LVGL_STYLE_PROP_TABLE has key '${k}' not present in core LVGL_REACTIVE_STYLE_PROPS`,
      );
    }
  }
}

/**
 * Resolve a snake_case LVGL style prop name to its `LV_STYLE_*` C constant name.
 *
 * The mapping is mechanical: `translate_y` → `LV_STYLE_TRANSLATE_Y`.
 * Throws if the prop is not in the table (indicates an invalid animation property).
 */
export function resolveLvglStyleConstant(snakeProp: string): string {
  if (!(snakeProp in LVGL_STYLE_PROP_TABLE)) {
    throw new Error(
      `Cannot resolve LVGL style constant for '${snakeProp}': ` +
      `not found in LVGL_STYLE_PROP_TABLE. Ensure the property is a valid numeric LVGL style prop.`,
    );
  }
  return `LV_STYLE_${snakeProp.toUpperCase()}`;
}
