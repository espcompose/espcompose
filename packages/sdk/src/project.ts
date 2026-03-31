// ────────────────────────────────────────────────────────────────────────────
// defineProject — project descriptor wrapper
//
// Wraps the root JSX element in a typed project descriptor that the compiler
// can inspect. This replaces the bare `export default <esphome>...</esphome>`
// pattern with an explicit API that makes the project structure inspectable
// and extensible.
//
// Usage:
//   export default defineProject({
//     device: (
//       <esphome name="my-device">
//         ...
//       </esphome>
//     ),
//   });
// ────────────────────────────────────────────────────────────────────────────

import type { EspComposeElement } from './types';

const PROJECT_BRAND = Symbol.for('espcompose.ProjectDefinition');

/**
 * A project definition produced by `defineProject()`.
 * The compiler detects this via `isProjectDefinition()` and extracts the device tree.
 */
export interface ProjectDefinition {
  readonly [PROJECT_BRAND]: true;
  /** The root device element tree (the `<esphome>` element and its children). */
  readonly device: EspComposeElement;
}

/**
 * Options for `defineProject()`.
 */
export interface DefineProjectOptions {
  /** The root device element tree. */
  device: EspComposeElement;
}

/**
 * Define a project.
 *
 * Wraps the root JSX element in a typed descriptor that the compiler uses
 * as the entry point for IR construction.
 */
export function defineProject(options: DefineProjectOptions): ProjectDefinition {
  return {
    [PROJECT_BRAND]: true as const,
    device: options.device,
  };
}

/**
 * Type guard: check if a value is a ProjectDefinition.
 */
export function isProjectDefinition(val: unknown): val is ProjectDefinition {
  return (
    val !== null &&
    typeof val === 'object' &&
    PROJECT_BRAND in (val as Record<symbol, unknown>)
  );
}
