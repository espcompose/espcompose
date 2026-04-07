// ────────────────────────────────────────────────────────────────────────────
// Trigger Variable Registry
//
// Static, manually-maintained map of ESPHome trigger signatures.
// Maps component domains and their trigger names to the variables available
// inside trigger callbacks (e.g. `on_state:` provides `x` as a `bool` for
// binary_sensor, but no variables for light).
//
// Used by the ESPHome backend (lower-yaml.ts) to decide whether a trigger
// callback can use the trigger variable directly (`return x;`) or must
// perform a full component lookup (`return id(source).property;`).
//
// This file is hand-maintained (not auto-generated) because ESPHome's JSON
// schemas do not expose trigger callback variable metadata — it's hardcoded
// in the ESPHome C++ / Python component definitions.
// ────────────────────────────────────────────────────────────────────────────

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

/**
 * Maps component domain → trigger name → trigger signature.
 *
 * Trigger names use snake_case to match ESPHome YAML keys (e.g. `on_state`, `on_value`).
 */
export const TRIGGER_REGISTRY: Readonly<Record<string, Record<string, TriggerSignature>>> = {
  // ─── Core entity domains ────────────────────────────────────────────────
  binary_sensor: {
    on_state:  { variables: [{ name: 'x', cppType: 'bool', tsType: 'boolean' }] },
    on_press:  { variables: [] },
    on_release: { variables: [] },
    on_click:  { variables: [] },
    on_double_click: { variables: [] },
    on_multi_click: { variables: [] },
  },

  sensor: {
    on_value:       { variables: [{ name: 'x', cppType: 'float', tsType: 'number' }] },
    on_raw_value:   { variables: [{ name: 'x', cppType: 'float', tsType: 'number' }] },
    on_value_range: { variables: [{ name: 'x', cppType: 'float', tsType: 'number' }] },
  },

  text_sensor: {
    on_value:       { variables: [{ name: 'x', cppType: 'std::string', tsType: 'string' }] },
    on_raw_value:   { variables: [{ name: 'x', cppType: 'std::string', tsType: 'string' }] },
  },

  switch: {
    on_state:    { variables: [{ name: 'x', cppType: 'bool', tsType: 'boolean' }] },
    on_turn_on:  { variables: [] },
    on_turn_off: { variables: [] },
  },

  light: {
    on_state:    { variables: [] },
    on_turn_on:  { variables: [] },
    on_turn_off: { variables: [] },
  },

  fan: {
    on_state:    { variables: [] },
    on_turn_on:  { variables: [] },
    on_turn_off: { variables: [] },
    on_speed_set: { variables: [] },
    on_preset_set: { variables: [] },
  },

  cover: {
    on_open:   { variables: [] },
    on_closed: { variables: [] },
  },

  number: {
    on_value:       { variables: [{ name: 'x', cppType: 'float', tsType: 'number' }] },
    on_value_range: { variables: [{ name: 'x', cppType: 'float', tsType: 'number' }] },
  },

  select: {
    on_value: { variables: [{ name: 'x', cppType: 'std::string', tsType: 'string' }] },
  },

  climate: {
    on_state:        { variables: [] },
    on_control:      { variables: [] },
  },

  lock: {
    on_state: { variables: [] },
    on_lock:  { variables: [] },
    on_unlock: { variables: [] },
  },

  // ─── LVGL widget triggers ──────────────────────────────────────────────
  lvgl_button: {
    on_press:      { variables: [] },
    on_release:    { variables: [] },
    on_long_press: { variables: [] },
    on_click:      { variables: [] },
  },

  lvgl_slider: {
    on_value:   { variables: [{ name: 'x', cppType: 'float', tsType: 'number' }] },
    on_release: { variables: [{ name: 'x', cppType: 'float', tsType: 'number' }] },
  },

  lvgl_arc: {
    on_value: { variables: [{ name: 'x', cppType: 'float', tsType: 'number' }] },
  },

  lvgl_switch: {
    on_state: { variables: [{ name: 'x', cppType: 'bool', tsType: 'boolean' }] },
  },

  lvgl_checkbox: {
    on_state: { variables: [{ name: 'x', cppType: 'bool', tsType: 'boolean' }] },
  },

  lvgl_dropdown: {
    on_value: { variables: [{ name: 'x', cppType: 'uint16_t', tsType: 'number' }] },
  },

  lvgl_roller: {
    on_value: { variables: [{ name: 'x', cppType: 'uint16_t', tsType: 'number' }] },
  },

  lvgl_textarea: {
    on_value: { variables: [{ name: 'x', cppType: 'std::string', tsType: 'string' }] },
  },

  lvgl_spinbox: {
    on_value: { variables: [{ name: 'x', cppType: 'float', tsType: 'number' }] },
  },

  lvgl_bar: {
    on_value: { variables: [{ name: 'x', cppType: 'float', tsType: 'number' }] },
  },
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
