// ────────────────────────────────────────────────────────────────────────────
// Device Binding Types
//
// Platform-agnostic binding interfaces for common IoT device domains.
// Each binding provides:
//   - Signal<T> properties for reactive state access
//   - Action methods for controlling the device (compile-time no-ops)
// ────────────────────────────────────────────────────────────────────────────

import type { Signal } from './reactive-node';
import type { BINDING_BRAND } from './types';

/**
 * Binding for light devices.
 *
 * Provides on/off state, brightness, and control actions.
 */
export interface LightBinding {
  readonly [BINDING_BRAND]?: true;
  /** Whether the light is currently on. */
  readonly isOn: Signal<boolean>;
  /** Current brightness (0–255). Available when the light supports brightness. */
  readonly brightness: Signal<number>;
  /** String representation of the state (`"on"`, `"off"`, `"unavailable"`). */
  readonly stateText: Signal<string>;

  /** Toggle the light on/off. */
  toggle(): void;
  /** Turn the light on, optionally with parameters. */
  turnOn(params?: { brightness?: number; color_temp?: number; transition?: number }): void;
  /** Turn the light off. */
  turnOff(params?: { transition?: number }): void;
}

/**
 * Binding for numeric sensor devices.
 * Read-only — sensors have no action methods.
 */
export interface SensorBinding {
  readonly [BINDING_BRAND]?: true;
  /** Current numeric value of the sensor. */
  readonly value: Signal<number>;
  /** String representation of the sensor state. */
  readonly stateText: Signal<string>;
}

/**
 * Binding for binary (on/off) sensor devices.
 * Read-only — binary sensors have no action methods.
 */
export interface BinarySensorBinding {
  readonly [BINDING_BRAND]?: true;
  /** Whether the binary sensor is currently on. */
  readonly isOn: Signal<boolean>;
  /** String representation of the state. */
  readonly stateText: Signal<string>;
}

/**
 * Binding for switch devices.
 */
export interface SwitchBinding {
  readonly [BINDING_BRAND]?: true;
  /** Whether the switch is currently on. */
  readonly isOn: Signal<boolean>;

  /** Toggle the switch. */
  toggle(): void;
  /** Turn the switch on. */
  turnOn(): void;
  /** Turn the switch off. */
  turnOff(): void;
}

/**
 * Binding for fan devices.
 */
export interface FanBinding {
  readonly [BINDING_BRAND]?: true;
  /** Whether the fan is currently on. */
  readonly isOn: Signal<boolean>;

  /** Toggle the fan. */
  toggle(): void;
  /** Turn the fan on. */
  turnOn(): void;
  /** Turn the fan off. */
  turnOff(): void;
}

/**
 * Binding for cover/blind devices.
 */
export interface CoverBinding {
  readonly [BINDING_BRAND]?: true;
  /** Whether the cover is currently open. */
  readonly isOpen: Signal<boolean>;

  /** Open the cover. */
  open(): void;
  /** Close the cover. */
  close(): void;
  /** Stop the cover. */
  stop(): void;
}
