// ────────────────────────────────────────────────────────────────────────────
// Reactive Property Mapping for Ref<T>
//
// Maps reactive property names (e.g. `.value`, `.isOn`, `.brightness`) to the
// ReactiveNode configuration needed to generate ESPHome lambdas and trigger
// wiring.
//
// Two layers:
//
//   Type level — InferReactiveProperties<T> uses the phantom brands on
//   marker types to narrow which reactive properties are available:
//     Ref<sensor_Sensor>.value      → ReactiveNode<number>
//     Ref<binary_sensor_BinarySensor>.isOn → ReactiveNode<boolean>
//     Ref<light_LightState>.brightness     → ReactiveNode<number>
//
//   Runtime level — REACTIVE_PROPERTY_MAP is consulted by the RefHandle
//   Proxy to create ReactiveNode instances when a reactive property is
//   accessed.  Since markers are phantom types erased at runtime, the
//   Proxy can't check brands — it simply returns a ReactiveNode for any
//   known reactive property name.  Type-safety is enforced at compile
//   time by InferReactiveProperties<T>.
// ────────────────────────────────────────────────────────────────────────────

import type { Signal } from './reactive-node';

// ────────────────────────────────────────────────────────────────────────────
// Type-level reactive property interfaces
// ────────────────────────────────────────────────────────────────────────────

export interface SensorReactiveProps {
  readonly value: Signal<number>;
  readonly stateText: Signal<string>;
}

export interface BinarySensorReactiveProps {
  readonly isOn: Signal<boolean>;
  readonly stateText: Signal<string>;
}

export interface LightReactiveProps {
  readonly isOn: Signal<boolean>;
  readonly brightness: Signal<number>;
  readonly stateText: Signal<string>;
}

export interface SwitchReactiveProps {
  readonly isOn: Signal<boolean>;
}

export interface FanReactiveProps {
  readonly isOn: Signal<boolean>;
}

export interface CoverReactiveProps {
  readonly isOpen: Signal<boolean>;
}

// ────────────────────────────────────────────────────────────────────────────
// Conditional type: marker brand → reactive property interface
//
// Order matters — more specific brands are checked before generic ones.
// e.g. light_LightState (which extends EntityBase + Component) is checked
// before binary_sensor_BinarySensor (which extends EntityBase).
// ────────────────────────────────────────────────────────────────────────────

export type InferReactiveProperties<T> =
  T extends { readonly __brand_light_LightState?: true }
    ? LightReactiveProps
    : T extends { readonly __brand_switch__Switch?: true }
      ? SwitchReactiveProps
      : T extends { readonly __brand_sensor_Sensor?: true }
        ? SensorReactiveProps
        : T extends { readonly __brand_binary_sensor_BinarySensor?: true }
          ? BinarySensorReactiveProps
          : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
            {};

// ────────────────────────────────────────────────────────────────────────────
// Runtime property map
//
// Consulted by the RefHandle Proxy to create Expression instances.
// Keys are camelCase property names matching the interfaces above.
// ────────────────────────────────────────────────────────────────────────────

export interface ReactivePropertyConfig {
  /** C++ property access path on the component (e.g. `.state`). */
  property: string;
  /** ESPHome trigger name to subscribe on the source (e.g. `on_value`). */
  triggerType: string;
  /** Component domain for trigger registry lookup (e.g. `sensor`). */
  sourceDomain: string;
  /** C++ value type for the reactive runtime (e.g. `bool`, `float`, `std::string`). */
  cppType: string;
}

export const REACTIVE_PROPERTY_MAP: Readonly<Record<string, ReactivePropertyConfig>> = {
  value:      { property: '.state',                          triggerType: 'on_value', sourceDomain: 'sensor',        cppType: 'float' },
  isOn:       { property: '.state',                          triggerType: 'on_state', sourceDomain: 'binary_sensor', cppType: 'bool' },
  isOpen:     { property: '.position',                       triggerType: 'on_state', sourceDomain: 'cover',         cppType: 'bool' },
  stateText:  { property: '.state',                          triggerType: 'on_value', sourceDomain: 'text_sensor',   cppType: 'std::string' },
  brightness: { property: '.current_values.get_brightness()', triggerType: 'on_state', sourceDomain: 'light',         cppType: 'float' },
};
