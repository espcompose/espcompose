// ────────────────────────────────────────────────────────────────────────────
// device — device-imperative escape hatch namespace
//
// The `device` namespace provides APIs for device-level imperative logic
// that cannot be expressed declaratively in JSX. This includes ESPHome
// C++ includes and lambda expressions.
//
// Usage:
//   import { device } from '@esphome/compose';
//
//   device.include('my_component.h');
//   const reading = device.lambda<number>('return id(sensor).state;');
// ────────────────────────────────────────────────────────────────────────────

import { assertPhase } from './phase';

declare const DEVICE_LAMBDA_BRAND: unique symbol;

/**
 * A raw C++ lambda string descriptor returned by `device.lambda()`.
 */
export class DeviceLambda<T = unknown> {
  declare readonly [DEVICE_LAMBDA_BRAND]: T;

  readonly code: string;

  constructor(code: string) {
    this.code = code;
  }
}

/**
 * Type guard for DeviceLambda instances.
 */
export function isDeviceLambda(val: unknown): val is DeviceLambda {
  return val instanceof DeviceLambda;
}

// ── Includes registry ──────────────────────────────────────────────────────

const includesRegistry: string[] = [];

/** @internal — used by the compiler emit phase. */
export function getIncludes(): readonly string[] {
  return includesRegistry;
}

/** @internal — clear between compile runs. */
export function clearIncludes(): void {
  includesRegistry.length = 0;
}

/**
 * Device-imperative API namespace.
 */
export const device = {
  /**
   * Register a C++ header file to be included via ESPHome's `includes:` config.
   *
   * The file path is relative to the project root or an absolute path.
   */
  include(path: string): void {
    assertPhase(['module', 'render'], 'device.include()');
    if (!includesRegistry.includes(path)) {
      includesRegistry.push(path);
    }
  },

  /**
   * Create a raw C++ lambda expression.
   *
   * The code string is emitted verbatim as a `!lambda` value in YAML.
   * This is an escape hatch for expressions that can't be generated
   * from TypeScript reactive functions.
   */
  lambda<T = unknown>(code: string): DeviceLambda<T> {
    assertPhase(['module', 'render'], 'device.lambda()');
    return new DeviceLambda<T>(code);
  },
};
