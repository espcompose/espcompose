// ────────────────────────────────────────────────────────────────────────────
// Home Assistant Entity Binding Types
//
// Domain-specific binding interfaces returned by useHAEntity().
// Each binding provides:
//   - Expression<T> properties for reactive state access
//   - Action methods for controlling the entity (compile-time no-ops)
// ────────────────────────────────────────────────────────────────────────────

import type { Expression } from './expression';

/**
 * Binding for `light.*` entities.
 *
 * State is imported via a `binary_sensor platform: homeassistant` (for on/off)
 * and optionally a `sensor platform: homeassistant` (for brightness).
 */
export interface LightBinding {
  /** Whether the light is currently on. */
  readonly isOn: Expression<boolean>;
  /** Current brightness (0–255). Available when the light supports brightness. */
  readonly brightness: Expression<number>;
  /** String representation of the state (`"on"`, `"off"`, `"unavailable"`). */
  readonly stateText: Expression<string>;

  /** Toggle the light on/off. */
  toggle(): void;
  /** Turn the light on, optionally with parameters. */
  turnOn(params?: { brightness?: number; color_temp?: number; transition?: number }): void;
  /** Turn the light off. */
  turnOff(params?: { transition?: number }): void;
}

/**
 * Binding for `sensor.*` entities.
 * Read-only — sensors have no action methods.
 */
export interface SensorBinding {
  /** Current numeric value of the sensor. */
  readonly value: Expression<number>;
  /** String representation of the sensor state. */
  readonly stateText: Expression<string>;
}

/**
 * Binding for `binary_sensor.*` entities.
 * Read-only — binary sensors have no action methods.
 */
export interface BinarySensorBinding {
  /** Whether the binary sensor is currently on. */
  readonly isOn: Expression<boolean>;
  /** String representation of the state. */
  readonly stateText: Expression<string>;
}

/**
 * Binding for `switch.*` entities.
 */
export interface SwitchBinding {
  /** Whether the switch is currently on. */
  readonly isOn: Expression<boolean>;

  /** Toggle the switch. */
  toggle(): void;
  /** Turn the switch on. */
  turnOn(): void;
  /** Turn the switch off. */
  turnOff(): void;
}

/**
 * Binding for `fan.*` entities.
 */
export interface FanBinding {
  /** Whether the fan is currently on. */
  readonly isOn: Expression<boolean>;

  /** Toggle the fan. */
  toggle(): void;
  /** Turn the fan on. */
  turnOn(): void;
  /** Turn the fan off. */
  turnOff(): void;
}

/**
 * Binding for `cover.*` entities.
 */
export interface CoverBinding {
  /** Whether the cover is currently open. */
  readonly isOpen: Expression<boolean>;

  /** Open the cover. */
  open(): void;
  /** Close the cover. */
  close(): void;
  /** Stop the cover. */
  stop(): void;
}

/**
 * Mapping from HA action method names to HA service call names, per domain.
 *
 * Used by the compiler's action converter to rewrite `kitchen.toggle()`
 * into `{ 'homeassistant.action': { action: 'light.toggle', ... } }`.
 */
export const HA_ACTION_MAP: Readonly<Record<string, Record<string, string>>> = {
  light: {
    toggle:  'light.toggle',
    turnOn:  'light.turn_on',
    turnOff: 'light.turn_off',
  },
  switch: {
    toggle:  'switch.toggle',
    turnOn:  'switch.turn_on',
    turnOff: 'switch.turn_off',
  },
  fan: {
    toggle:  'fan.toggle',
    turnOn:  'fan.turn_on',
    turnOff: 'fan.turn_off',
  },
  cover: {
    open:  'cover.open_cover',
    close: 'cover.close_cover',
    stop:  'cover.stop_cover',
  },
};
