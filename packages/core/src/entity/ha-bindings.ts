// ────────────────────────────────────────────────────────────────────────────
// Home Assistant Entity Binding Types
//
// Re-exports platform-agnostic device bindings and adds the HA-specific
// domain → binding mapping used by useHAEntity().
// ────────────────────────────────────────────────────────────────────────────

export type {
  LightBinding,
  SensorBinding,
  BinarySensorBinding,
  SwitchBinding,
  FanBinding,
  CoverBinding,
} from './device-bindings';

import type {
  LightBinding,
  SensorBinding,
  BinarySensorBinding,
  SwitchBinding,
  FanBinding,
  CoverBinding,
} from './device-bindings';

// ── HAEntityBindingMap ─────────────────────────────────────────────────────

/**
 * Maps HA entity domain strings to their binding interface types.
 */
export interface HAEntityBindingMap {
  light: LightBinding;
  sensor: SensorBinding;
  binary_sensor: BinarySensorBinding;
  switch: SwitchBinding;
  fan: FanBinding;
  cover: CoverBinding;
}

