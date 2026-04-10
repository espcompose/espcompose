// ────────────────────────────────────────────────────────────────────────────
// Trigger Variable Registry
//
// Maps component domains and their trigger names to the variables available
// inside trigger callbacks (e.g. `on_state:` provides `x` as a `bool` for
// binary_sensor, but no variables for light).
//
// Entity domain triggers are generated from metadata/entity-domains.json.
// LVGL widget triggers are hand-maintained below — ESPHome's JSON schemas
// do not expose trigger callback variable metadata for widgets.
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

/**
 * Maps component domain → trigger name → trigger signature.
 *
 * Trigger names use snake_case to match ESPHome YAML keys (e.g. `on_state`, `on_value`).
 *
 * Entity domain entries are generated from metadata/entity-domains.json.
 * LVGL widget entries are hand-maintained below.
 */
export const TRIGGER_REGISTRY: Readonly<Record<string, Record<string, TriggerSignature>>> = {
  // ─── Entity domain triggers (generated) ─────────────────────────────────
  ...ENTITY_DOMAIN_TRIGGERS,

  // ─── LVGL widget triggers (hand-maintained) ─────────────────────────────
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
