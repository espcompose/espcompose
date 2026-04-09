// AUTO-GENERATED — DO NOT EDIT. Source: metadata/entity-domains.json

/* eslint-disable */

import type { TriggerSignature } from '../trigger-registry.js';

/**
 * Entity domain trigger entries, generated from metadata/entity-domains.json.
 * Merged with hand-maintained LVGL triggers in trigger-registry.ts.
 */
export const ENTITY_DOMAIN_TRIGGERS: Readonly<Record<string, Record<string, TriggerSignature>>> = {
  light: {
    on_state: { variables: [] },
    on_turn_on: { variables: [] },
    on_turn_off: { variables: [] },
  },
  switch: {
    on_state: { variables: [{ name: "x", cppType: "bool", tsType: "boolean" }] },
    on_turn_on: { variables: [] },
    on_turn_off: { variables: [] },
  },
  sensor: {
    on_value: { variables: [{ name: "x", cppType: "float", tsType: "number" }] },
    on_raw_value: { variables: [{ name: "x", cppType: "float", tsType: "number" }] },
    on_value_range: { variables: [{ name: "x", cppType: "float", tsType: "number" }] },
  },
  binary_sensor: {
    on_state: { variables: [{ name: "x", cppType: "bool", tsType: "boolean" }] },
    on_press: { variables: [] },
    on_release: { variables: [] },
    on_click: { variables: [] },
    on_double_click: { variables: [] },
    on_multi_click: { variables: [] },
  },
  fan: {
    on_state: { variables: [] },
    on_turn_on: { variables: [] },
    on_turn_off: { variables: [] },
    on_speed_set: { variables: [] },
    on_preset_set: { variables: [] },
  },
  cover: {
    on_open: { variables: [] },
    on_closed: { variables: [] },
  },
  number: {
    on_value: { variables: [{ name: "x", cppType: "float", tsType: "number" }] },
    on_value_range: { variables: [{ name: "x", cppType: "float", tsType: "number" }] },
  },
  select: {
    on_value: { variables: [{ name: "x", cppType: "std::string", tsType: "string" }] },
  },
  text_sensor: {
    on_value: { variables: [{ name: "x", cppType: "std::string", tsType: "string" }] },
    on_raw_value: { variables: [{ name: "x", cppType: "std::string", tsType: "string" }] },
  },
  lock: {
    on_state: { variables: [] },
    on_lock: { variables: [] },
    on_unlock: { variables: [] },
  },
  climate: {
    on_state: { variables: [] },
    on_control: { variables: [] },
  },
};
