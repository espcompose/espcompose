// ────────────────────────────────────────────────────────────────────────────
// LVGL Widget Definitions & Style Property Tables
//
// Data-driven mapping from ESPHome prop names to LVGL C API setters.
// Used by the type codegen (lvgl-codegen.ts) to wrap props with BindProp<T>
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
// LVGL Style Property Table
//
// Data-driven mapping from ESPHome prop names to LVGL C API setters.
// Used by both:
//   1. The type codegen (lvgl-codegen.ts) — to wrap props with BindProp<T>
//   2. The C++ codegen in target-esphome — to generate update calls
//
// Each entry specifies:
//   - lvglSetter: name suffix for lv_obj_set_style_<name>(obj, value, selector)
//   - cppType:    C++ value type for the call
//   - cast:       optional C++ cast expression wrapping the value
//   - special:    optional flag for props needing custom codegen
// ────────────────────────────────────────────────────────────────────────────

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

/**
 * Complete table of LVGL style properties that can be reactively updated.
 *
 * Keyed by ESPHome snake_case prop name. The `lvglSetter` field handles
 * ESPHome→LVGL naming divergences (e.g. `bg_image_opa` → `bg_img_opa`).
 *
 * Excluded (complex pointer types): bg_grad, color_filter_dsc, transition,
 * bg_image_src, arc_img_src.
 */
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

/**
 * Style-level properties that can be reactively updated on any LVGL widget.
 *
 * Derived from LVGL_STYLE_PROP_TABLE — adding a prop to the table
 * automatically enables BindProp<T> wrapping in the type codegen and
 * C++ update codegen in widget-binding Effects.
 */
export const LVGL_REACTIVE_STYLE_PROPS: ReadonlySet<string> =
  new Set(Object.keys(LVGL_STYLE_PROP_TABLE));

// ────────────────────────────────────────────────────────────────────────────
// LVGL Part & State Flag Maps
//
// Used by the C++ codegen to build the selector flag for
// lv_obj_set_style_*(obj, value, selector).
//
// selector = LV_PART_xxx | LV_STATE_xxx
// ────────────────────────────────────────────────────────────────────────────

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
