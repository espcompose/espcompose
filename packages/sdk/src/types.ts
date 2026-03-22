import type { Context } from './hooks/useContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FunctionComponent<P = Record<string, any>> = (props: P) => EspComposeElement | null;

export interface EspComposeElement {
  type: string | FunctionComponent;
  props: Record<string, unknown> & { children?: EspComposeElement[] };
}

// ────────────────────────────────────────────────────────────────────────────
// Ref types — typed cross-component ID references
//
// Usage:
//   const bus = useRef<i2c_I2CBus>();
//   <i2c ref={bus} sda={21} scl={22} />
//   <as5600 i2cId={bus} />
//
// When `ref` is passed to an element, the runtime serialises it as `id: <token>`
// in the YAML output. When a Ref<T> value is passed to a use_id prop, it is
// serialised as the plain token string.
//
// IDs are auto-generated — no user-supplied strings are required.
// ────────────────────────────────────────────────────────────────────────────

declare const REF_BRAND: unique symbol;

export interface Ref<T = unknown> {
  readonly [REF_BRAND]?: T;
  toString(): string;
}

export class RefHandle<T = unknown> implements Ref<T> {
  declare readonly [REF_BRAND]?: T;

  private readonly _token: string;

  constructor() {
    // Generate a short, URL-safe, collision-resistant token.
    // We avoid depending on a third-party library; Math.random with base-36
    // gives ~10 chars of entropy — sufficient for a single device config file.
    this._token = `r_${Math.random().toString(36).slice(2, 11)}`;
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
 * @example
 * const bus = useRef<i2c_I2CBus>();
 * <i2c ref={bus} sda={21} scl={22} />
 * <as5600 i2cId={bus} />
 */
export function useRef<T = unknown>(): Ref<T> {
  return new RefHandle<T>();
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
export interface ComponentProps<T = unknown> extends BaseProps {
  ref?: Ref<T>;
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

export type AnyProps = BaseProps & Record<string, unknown>;

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
