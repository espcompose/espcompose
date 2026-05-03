// ────────────────────────────────────────────────────────────────────────────
// Closure Protocol — registry and descriptor interface
//
// Each binding type (ref, overlay controller, script handle, etc.) provides
// a ClosureDescriptor that tells the framework:
//   1. How to compute a stable identity (`toClosureKey`)
//   2. What closure fields to contribute for script parameterization
//
// The framework core calls these generically — no type-specific logic needed
// in useScript or the compiler.
// ────────────────────────────────────────────────────────────────────────────

import type { ClosureField, IRScalar, IRType } from '../../ir/types';

// ── Types ───────────────────────────────────────────────────────────────────

/**
 * Descriptor for a single binding type. Registered with the global registry
 * so `useScript` can uniformly compute closure keys and shape fields.
 */
export interface ClosureDescriptor<T = unknown> {
  /** Return true if this descriptor handles `value`. First match wins. */
  match(value: unknown): value is T;

  /**
   * Stable identity for dedup. Two values with the same closure key are
   * considered "the same" binding for dedup purposes. When closure keys
   * match across instances, the binding does NOT need parameterization.
   */
  toClosureKey(value: T): string;

  /**
   * Hint describing the shape of value this descriptor emits. Optional —
   * only used for diagnostics; the authoritative type comes from the
   * `ClosureField` returned by `toClosureField`.
   */
  irType?: IRType;

  /**
   * Declare the closure-table column for this binding. The `bindingName`
   * is the variable name in the script's refBindings; descriptors typically
   * use it as the field's `name` (so script bodies reference `closure.<name>`).
   *
   * Returns `null` when this descriptor does not contribute a column
   * (e.g. a fully-shared scalar that was constant-folded).
   */
  toClosureField?(bindingName: string, value: T): ClosureField | null;

  /**
   * Produce the per-instance closure-table cell value for this binding.
   * Called once per call site to populate the row for that instance.
   * Returns `null` when this descriptor does not contribute a value
   * (matches a `null` field).
   */
  toClosureValue?(value: T): IRScalar | null;
}

// ── Registry ────────────────────────────────────────────────────────────────

const _descriptors: ClosureDescriptor[] = [];

/**
 * Register a closure descriptor. First-match-wins ordering — register more
 * specific descriptors before generic ones.
 *
 * @internal Exported via `@espcompose/core/internals`.
 */
export function registerClosureDescriptor<T>(descriptor: ClosureDescriptor<T>): void {
  _descriptors.push(descriptor as ClosureDescriptor);
}

/**
 * Find the descriptor that handles `value`. Returns `null` when no
 * registered descriptor matches; callers should treat this as "binding does
 * not contribute a closure field" and skip it.
 */
export function findClosureDescriptor(value: unknown): ClosureDescriptor | null {
  for (const desc of _descriptors) {
    if (desc.match(value)) return desc;
  }
  return null;
}
