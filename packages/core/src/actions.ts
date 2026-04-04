// ────────────────────────────────────────────────────────────────────────────
// Action primitives — compile-time markers for ESPHome actions
//
// These functions are no-ops at runtime. The AST-based action tree compiler
// recognizes them by name at the TypeScript AST level and emits the
// corresponding ESPHome YAML action objects. The Promise<void> return type
// on delay() and waitUntil() enables `await` syntax in trigger handler
// arrow functions.
//
// Usage:
//   import { delay, waitUntil, logger } from '@espcompose/core';
//
//   onPress={async () => {
//     logger.log('Hello!');
//     await delay(500);
//     lightRef.toggle();
//   }}
// ────────────────────────────────────────────────────────────────────────────

import type { ACTION_BRAND } from './types';

/** Branded action function type. */
interface ActionFunction<F extends (...args: never[]) => unknown> {
  readonly [ACTION_BRAND]?: true;
  (...args: Parameters<F>): ReturnType<F>;
}

/** Branded action namespace type. */
interface ActionLogger {
  readonly [ACTION_BRAND]?: true;
  log(message: string, level?: string): void;
}

/**
 * ESPHome delay action.
 *
 * In trigger handler arrow functions, use with `await`:
 *   `await delay(500)` → `delay: 500ms`
 *   `await delay('1s')` → `delay: 1s`
 *
 * The compiler recognizes this at the AST level — the function is never
 * actually called at runtime. The Promise return type enables await syntax.
 */
export const delay: ActionFunction<(ms: number | string) => Promise<void>> = function delay(
  _ms: number | string,
): Promise<void> {
  return Promise.resolve();
} as ActionFunction<(ms: number | string) => Promise<void>>;

/**
 * ESPHome wait_until action.
 *
 * Waits until the condition function returns true:
 *   `await waitUntil(() => sensorRef.value > 30)`
 *   `await waitUntil(() => sensorRef.value > 30, { timeout: '10s' })`
 *
 * The condition arrow function is compiled to a C++ lambda condition
 * by the action tree compiler — it is never called at runtime.
 */
export const waitUntil: ActionFunction<(condition: () => boolean, opts?: { timeout?: string }) => Promise<void>> = function waitUntil(
  _condition: () => boolean,
  _opts?: { timeout?: string },
): Promise<void> {
  return Promise.resolve();
} as ActionFunction<(condition: () => boolean, opts?: { timeout?: string }) => Promise<void>>;

/**
 * ESPHome logger namespace.
 *
 * `logger.log(message)` — logs at default level
 * `logger.log(message, level)` — logs at specified level
 *
 * The compiler recognizes logger.log() calls at the AST level.
 */
export const logger: ActionLogger = {
  log(_message: string, _level?: string): void {
    // No-op — the compiler handles this at the AST level.
  },
};
