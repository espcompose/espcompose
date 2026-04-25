import type { Context } from './hooks/useContext';
import type {
  InferActions,
} from './generated/actions';
import type { InferReactiveProperties } from './reactive-properties';
import { REACTIVE_PROPERTY_MAP } from './reactive-properties';
import { IRReactiveNode } from './reactive-node';
import { assertHookContext } from './hooks/useState';
import { throwCompileTimeOnly } from './errors';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FunctionComponent<P = Record<string, any>> = (props: P) => EspComposeElement | null;

/** Source location injected by the jsxDEV runtime (esbuild jsxDev mode). */
export interface JsxSourceLocation {
  fileName: string;
  lineNumber: number;
  columnNumber?: number;
}

export interface EspComposeElement {
  type: string | symbol | FunctionComponent;
  props: Record<string, unknown> & { children?: EspComposeElement[] };
  /** Original TSX source location (set in dev/build mode by jsxDEV). */
  __source?: JsxSourceLocation;
}

// ────────────────────────────────────────────────────────────────────────────
// Trigger type — typed ESPHome trigger / event handler callbacks
//
// ESPHome triggers fire automations when component events occur (e.g.
// on_press, on_value, on_state). Some triggers provide lambda variables
// (e.g. `x` with the new sensor value) while others fire with no arguments.
//
// Usage:
//   onPress?: TriggerHandler                   // no variables
//   onValue?: TriggerHandler<{ x: number }>    // sensor value trigger
//   onState?: TriggerHandler<{ x: boolean }>   // binary sensor state trigger
//
// Trigger props accept bare arrow functions:
//   onPress={() => { lightRef.toggle(); }}
//   onPress={async () => { await delay(500); lightRef.toggle(); }}
//   onValue={(args) => { lightRef.turnOn({ brightness: args.x }); }}
// ────────────────────────────────────────────────────────────────────────────

/**
 * An ESPHome trigger / event handler.
 *
 * Accepts a bare arrow function (sync or async) whose body is compiled to
 * an ESPHome action tree. The type parameter `T` describes the trigger
 * variables available (e.g. `{ x: number }` for sensor value triggers).
 */
export type TriggerHandler<T = void> =
  T extends void
    ? (() => void) | (() => Promise<void>)
    : ((args: T) => void) | ((args: T) => Promise<void>);

/**
 * ESPHome time period value.
 *
 * Accepts shorthand strings ("500ms", "5min", "never") or a decomposed
 * object form used by many ESPHome schemas.
 */
export type TimePeriod = string | {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
  microseconds?: number;
};

/** Basic MAC address shape, e.g. "AA:BB:CC:DD:EE:FF". */
export type MACAddress = `${string}:${string}:${string}:${string}:${string}:${string}`;

/** Basic IPv4 shape, e.g. "192.168.1.10". */
export type IPv4Address = `${number}.${number}.${number}.${number}`;

// ────────────────────────────────────────────────────────────────────────────
// Ref types — typed cross-component ID references
//
// Usage:
//   const bus = useRef<i2c_I2CBus>();
//   <i2c ref={bus} sda={21} scl={22} />
//   <as5600 i2cId={bus} />
//
// For actionable components, the marker type automatically provides
// typed action methods via InferActions:
//
//   const light = useRef<light_LightOutput>();
//   light.turnOn({ brightness: 0.5 });  // ← autocomplete from LightStateActions
//
// IDs are auto-generated — no user-supplied strings are required.
// ────────────────────────────────────────────────────────────────────────────

declare const REF_BRAND: unique symbol;

/**
 * Phantom brand for theme handles.
 *
 * Types branded with THEME_BRAND represent compile-time theme
 * handles created by `createTheme()`. The compiler uses this brand to
 * detect `handle.select()` calls and extract the scope string from the
 * handle's literal `scope` property type.
 */
export declare const THEME_BRAND: unique symbol;

/**
 * Phantom brand for popup controllers.
 *
 * Types branded with POPUP_BRAND represent compile-time popup controllers
 * created by `usePopup()`. The compiler uses this brand to detect
 * `controller.show()` and `controller.dismiss()` calls and lower them to
 * muxed LVGL show/hide actions.
 */
export declare const POPUP_BRAND: unique symbol;

/**
 * Phantom brand for compile-time binding types.
 *
 * Types branded with BINDING_BRAND represent compiler-understood constructs
 * whose properties (signals) and methods (actions) have real ESPHome
 * semantics. The brand is used by:
 *   - `WidgetProps<T>` to skip wrapping in `Reactive` (stable identity)
 *   - The ESLint rule `no-unsupported-trigger-body` to whitelist calls
 *   - The compiler to infer HA entity domains from type structure
 */
export declare const BINDING_BRAND: unique symbol;

/**
 * Base ref interface — a branded, toString-able reference.
 *
 * The phantom uses a **function-property** signature so that the type
 * parameter sits in a *contravariant* position (under `strictFunctionTypes`).
 * This lets `Ref<Derived>` be assignable to `Ref<Base>` — the function
 * parameter's contravariance means `(base: Base) => void` is assignable
 * to `(derived: Derived) => void`, enabling the standard upcast direction
 * that users need when passing a derived-typed ref to a base component slot.
 */
interface BaseRef<T = unknown> {
  readonly [REF_BRAND]?: (phantom: T) => void;
  readonly [BINDING_BRAND]?: true;
  toString(): string;
}

/**
 * A typed component reference.
 *
 * When `T` is a marker type that belongs to an actionable class (light,
 * switch, fan, etc.), the ref also carries typed action methods
 * (e.g. `.turnOn()`, `.toggle()`). These methods are compile-time markers —
 * no-ops at runtime — that the compiler transformer rewrites to ESPHome
 * YAML action objects.
 *
 * Uses intersection-based InferActions<T> so derived markers inherit all
 * ancestor actions (e.g. FloatOutput gets BinaryOutput + FloatOutput methods).
 */
export type Ref<T = unknown> = BaseRef<T> & InferActions<T> & InferReactiveProperties<T>;

/**
 * Prop-side ref type — accepts any `Ref<U>` whose marker `U` is a structural
 * subtype of `T` (i.e. `U` has all of `T`'s brands and possibly more).
 *
 * Generated component props use `RefProp<T>` instead of `Ref<T>` so that
 * users can pass a base-typed ref where a derived component is expected:
 *
 *   const outputRef = useRef<output_FloatOutput>();
 *   <output platform="ledc" ref={outputRef} />  // ✅ ledc extends FloatOutput
 *
 * Cross-component reference props (`output`, `i2cId`, etc.) also use
 * `RefProp<T>` so the same upcast pattern works there.
 */
export type RefProp<T = unknown> = BaseRef<T>;

export class RefHandle<T = unknown> implements BaseRef<T> {
  declare readonly [REF_BRAND]?: (phantom: T) => void;

  private readonly _token: string;

  constructor() {
    // Generate a short, URL-safe, collision-resistant token.
    // Math.random with base-36 gives ~10 chars of entropy —
    // sufficient for a single device config file.
    this._token = `r_${Math.random().toString(36).slice(2, 11)}`;

    // Return a Proxy that intercepts property access for action methods
    // and reactive property accessors.
    // - Action methods: any property not on RefHandle prototype returns a no-op
    //   function (the compiler transformer rewrites these at compile time).
    // - Reactive properties: known property names (value, isOn, brightness, etc.)
    //   return Expression<T> instances configured for the appropriate source
    //   domain and trigger type.
    return new Proxy(this, {
      get(target, prop, receiver) {
        if (prop in target || typeof prop === 'symbol') {
          return Reflect.get(target, prop, receiver);
        }

        // Check reactive property map — return IRReactiveNode if matched.
        if (typeof prop === 'string') {
          const reactiveConfig = REACTIVE_PROPERTY_MAP[prop];
          if (reactiveConfig) {
            return new IRReactiveNode({
              kind: 'expression',
              dependencies: [{
                kind: 'dependency',
                sourceId: target._token,
                triggerType: reactiveConfig.triggerType,
                sourceDomain: reactiveConfig.sourceDomain,
              }],
              exprType: reactiveConfig.exprType,
              sourceId: target._token,
              property: reactiveConfig.property,
              triggerType: reactiveConfig.triggerType,
              sourceDomain: reactiveConfig.sourceDomain,
            });
          }
        }

        // Action method — the AST compiler handles ref action calls
        // (ref.toggle(), ref.turnOn(), etc.) at build time.
        return function actionMethod() {
          throwCompileTimeOnly(`ref.${String(prop)}()`, 'Ref actions');
        };
      },
    });
  }

  toString(): string {
    return this._token;
  }

  toJSON(): string {
    return this._token;
  }
}

/**
 * Create a typed component reference. Pass the returned value to an element's
 * `ref` prop to assign it an ID, and to `use_id` props on other elements to
 * reference it.
 *
 * For actionable component types, the ref automatically provides domain-specific
 * action methods (e.g. `.turnOn()`, `.toggle()`).
 *
 * @example
 * const bus = useRef<i2c_I2CBus>();
 * <i2c ref={bus} sda={21} scl={22} />
 * <as5600 i2cId={bus} />
 *
 * @example
 * const myLight = useRef<light_LightOutput>();
 * myLight.turnOn({ brightness: 0.5 });
 */
export function useRef<T = unknown>(): Ref<T> {
  assertHookContext('useRef()');
  return new RefHandle<T>() as unknown as Ref<T>;
}

/**
 * Returns true when `val` is a `Ref<T>` instance produced by `useRef()`.
 * Used by the runtime to serialise ref values as plain ID strings.
 */
export function isRef(val: unknown): val is Ref<unknown> {
  return val instanceof RefHandle;
}

// ────────────────────────────────────────────────────────────────────────────
// Shared base props
// ────────────────────────────────────────────────────────────────────────────

export interface BaseProps {
  children?: EspComposeElement | EspComposeElement[];
}

/**
 * Props mixin for elements that have an ESPHome component ID.
 * Pass a `ref` to assign a typed ID to the element so it can be referenced by
 * other elements via `use_id` props.
 *
 * @example
 * const bus = useRef<i2c_I2CBus>();
 * <i2c ref={bus} sda={21} scl={22} />
 * <as5600 i2cId={bus} />
 */
export interface ComponentProps<T = never> extends BaseProps {
  ref?: RefProp<T>;
  /**
   * Pass arbitrary key-value pairs that are spread directly into the
   * component's YAML output.  Useful for components whose upstream schema
   * is missing or incomplete (e.g. `mipi_dsi`).
   *
   * Keys are converted from camelCase to snake_case like normal props.
   *
   * @example
   * <display platform="mipi_dsi" x:custom={{ model: "MY_MODEL", rotation: 270 }} />
   * // YAML: display:\n  platform: mipi_dsi\n  model: MY_MODEL\n  rotation: 270
   */
  "x:custom"?: Record<string, unknown>;
}

// ────────────────────────────────────────────────────────────────────────────
// Pin types — used by generated elements that accept GPIO pin specifications
// ────────────────────────────────────────────────────────────────────────────

export interface PinMode {
  input?: boolean;
  output?: boolean;
  open_drain?: boolean;
  pullup?: boolean;
  pulldown?: boolean;
}

export interface PinConfig {
  number: number;
  inverted?: boolean;
  mode?: PinMode;
  /** Allow platform-specific pin options (e.g. esp32 `drive_strength`). */
  [key: string]: unknown;
}

/**
 * A GPIO pin reference — either a bare pin number or a structured config object.
 * The valid range of pin numbers depends on the target board/platform.
 */
export type Pin = number | PinConfig;

// ────────────────────────────────────────────────────────────────────────────
// Catch-all prop shape used by generated and hand-authored element declarations
// ────────────────────────────────────────────────────────────────────────────

// Re-export types for use by generated code
export type { Reactive, WidgetProps, WidgetPropsWithChildren } from './reactive-utils';

// ────────────────────────────────────────────────────────────────────────────
// JSX namespace — base declaration only.
//
// IntrinsicElements is intentionally empty here. Individual element types are
// contributed via declaration merging by:
//   src/generated/esphome-props.ts  — codegen'd from the ESPHome schema
//   src/elements/core-components.ts — hand-authored stopgap for core components
//     that are not yet covered by codegen (wifi, api, logger, …)
//
// Using an empty base (no catch-all index signature) means that referencing an
// undeclared element is a TypeScript compile error, which matches the project's
// design goal of catching structural mistakes at compile time.
// ────────────────────────────────────────────────────────────────────────────

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface Element extends EspComposeElement {}
    interface IntrinsicElements {
      /** Built-in context provider element. Use `createContextProvider()` instead of this directly. */
      context: {
        context: Context<unknown>;
        value: unknown;
        children?: EspComposeElement | EspComposeElement[];
      };
    }
  }
}
