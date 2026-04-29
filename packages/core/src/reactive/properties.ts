// ────────────────────────────────────────────────────────────────────────────
// Reactive Property Mapping for Ref<T>
//
// Maps reactive property names (e.g. `.value`, `.isOn`, `.brightness`) to the
// IRReactiveNode configuration needed to generate ESPHome lambdas and trigger
// wiring.
//
// Two layers:
//
//   Type level — InferReactiveProperties<T> uses the phantom brands on
//   marker types to narrow which reactive properties are available:
//     Ref<SensorRef>.value             → IRReactiveNode<number>
//     Ref<BinarySensorRef>.isOn        → IRReactiveNode<boolean>
//     Ref<Components.Light.LightStateRef>.brightness → IRReactiveNode<number>
//
//   Runtime level — REACTIVE_PROPERTY_MAP is consulted by the RefHandle
//   Proxy to create IRReactiveNode instances when a reactive property is
//   accessed.  Since markers are phantom types erased at runtime, the
//   Proxy can't check brands — it simply returns a IRReactiveNode for any
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
  readonly isOpen: Signal<number>;
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
      : T extends { readonly __brand_fan_Fan?: true }
        ? FanReactiveProps
        : T extends { readonly __brand_cover_Cover?: true }
          ? CoverReactiveProps
          : T extends { readonly __brand_sensor_Sensor?: true }
            ? SensorReactiveProps
            : T extends { readonly __brand_binary_sensor_BinarySensor?: true }
              ? BinarySensorReactiveProps
              : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
                {};

// ────────────────────────────────────────────────────────────────────────────
// Runtime property map
//
// Consulted by the RefHandle Proxy to create IRReactiveNode instances.
// Keys are camelCase property names matching the interfaces above.
//
// Generated from metadata/entity-domains.json — see REACTIVE_PROPERTY_MAP
// in generated/entity-domains.ts.
// ────────────────────────────────────────────────────────────────────────────

export type { ReactivePropertyConfig } from './generated/entity-domains.js';
export { REACTIVE_PROPERTY_MAP } from './generated/entity-domains.js';
