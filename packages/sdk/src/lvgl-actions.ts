// ────────────────────────────────────────────────────────────────────────────
// LVGL Widget Update Actions
//
// Constructs ESPHome YAML action objects for updating LVGL widget properties
// at runtime. ESPHome uses per-widget-type action keys:
//
//   - button.update:   { id: <widget_id>, ...props }
//   - label.update:    { id: <widget_id>, text: "..." }
//   - slider.update:   { id: <widget_id>, value: 50 }
//   - etc.
//
// The YAML key format is: `lvgl.<widget_type>.update`
//
// These are used by the reactive injector to generate trigger callbacks
// that push state changes from sensors into LVGL widgets.
// ────────────────────────────────────────────────────────────────────────────

/**
 * Construct an ESPHome LVGL widget update action.
 *
 * @param widgetType - The LVGL widget type as it appears in YAML
 *                     (e.g. `button`, `label`, `slider`, `arc`).
 * @param widgetId   - The ESPHome ID of the target widget.
 * @param props      - Key-value pairs to update on the widget.
 *                     Values may be plain values or `!lambda` Scalars.
 * @returns A plain object representing the YAML action.
 *
 * @example
 * lvglWidgetUpdate('button', 'kitchen_btn', { checked: lambdaScalar })
 * // → { 'lvgl.button.update': { id: 'kitchen_btn', checked: !lambda "..." } }
 */
export function lvglWidgetUpdate(
  widgetType: string,
  widgetId: string,
  props: Record<string, unknown>,
): Record<string, unknown> {
  return {
    [`lvgl.${widgetType}.update`]: {
      id: widgetId,
      ...props,
    },
  };
}

/**
 * Known LVGL widget types and their updatable properties.
 *
 * This is used for validation and documentation — the reactive injector
 * doesn't strictly need it since it passes through whatever props the
 * Expression binds to, but it serves as a reference for which widgets
 * support updates and what properties are meaningful.
 */
export const LVGL_UPDATABLE_WIDGETS: Readonly<Record<string, readonly string[]>> = {
  button:    ['checked', 'text', 'bg_color', 'text_color', 'hidden'],
  label:     ['text', 'text_color', 'hidden'],
  slider:    ['value', 'min', 'max', 'hidden'],
  arc:       ['value', 'min', 'max', 'hidden'],
  bar:       ['value', 'min', 'max', 'hidden'],
  switch:    ['checked', 'hidden'],
  checkbox:  ['checked', 'text', 'hidden'],
  dropdown:  ['selected', 'options', 'hidden'],
  roller:    ['selected', 'hidden'],
  textarea:  ['text', 'hidden'],
  spinbox:   ['value', 'hidden'],
  obj:       ['bg_color', 'bg_opa', 'hidden'],
  img:       ['src', 'hidden'],
  led:       ['color', 'brightness', 'hidden'],
  meter:     ['hidden'],
  chart:     ['hidden'],
  keyboard:  ['hidden'],
  tabview:   ['hidden'],
  tileview:  ['hidden'],
};
