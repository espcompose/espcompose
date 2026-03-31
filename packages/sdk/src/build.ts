// ────────────────────────────────────────────────────────────────────────────
// build — compile-time Node.js execution
//
// build.run() executes arbitrary Node.js code at compile time and captures
// the return value as a BuildValue<T>. This value can then be transferred
// into the firmware config via embed.*() functions.
//
// Usage:
//   const env = build.run(() => {
//     require('dotenv').config();
//     return { name: process.env.DEVICE_NAME ?? 'default' };
//   });
//   // env.name is accessible, env is typed as BuildValue<{ name: string }>
// ────────────────────────────────────────────────────────────────────────────

import { assertPhase } from './phase';

const BUILD_VALUE_BRAND = Symbol.for('espcompose.BuildValue');

/**
 * Opaque wrapper around a value computed at build time via `build.run()`.
 *
 * Properties of the underlying value are accessible directly via a Proxy.
 * Pass the result (or its properties) to `embed.*()` to transfer into YAML.
 */
export class BuildValue<T> {
  declare readonly [BUILD_VALUE_BRAND]: T;
  /** @internal */
  readonly _value: T;

  constructor(value: T) {
    this._value = value;

    // Proxy allows property access to flow through to the underlying value
    // so `env.name` works when T is an object type.
    return new Proxy(this, {
      get(target, prop, receiver) {
        // Preserve class methods and known symbols
        if (prop === '_value' || prop === BUILD_VALUE_BRAND || prop === 'unwrap'
          || typeof prop === 'symbol') {
          return Reflect.get(target, prop, receiver);
        }
        // Delegate to the underlying value
        const val = target._value;
        if (val !== null && val !== undefined && typeof val === 'object') {
          return (val as Record<string | symbol, unknown>)[prop];
        }
        return undefined;
      },
    }) as BuildValue<T>;
  }

  /** Extract the raw underlying value. Used internally by embed.*() functions. */
  unwrap(): T {
    return this._value;
  }
}

/**
 * Type helper: extracts the property type from a BuildValue of an object.
 * `BuildValue<{ name: string }>` → accessing `.name` yields `string`.
 */
export type BuildValueOf<T> = T extends BuildValue<infer U> ? U : never;

/**
 * Check if a value is a BuildValue.
 */
export function isBuildValue(val: unknown): val is BuildValue<unknown> {
  return val instanceof BuildValue;
}

/**
 * Build-phase API namespace.
 */
export const build = {
  /**
   * Execute a function at compile time and capture its return value.
   *
   * The callback runs immediately during module evaluation in the Node.js
   * compiler process. Any Node.js API or npm package is available inside.
   *
   * Must be called at the module top level — not inside components or render.
   *
   * @throws PhaseError if called outside the 'module' phase.
   */
  run<T>(fn: () => T): BuildValue<T> & (T extends Record<string, unknown> ? T : unknown) {
    assertPhase('module', 'build.run()');
    const value = fn();
    return new BuildValue(value) as BuildValue<T> & (T extends Record<string, unknown> ? T : unknown);
  },
};
