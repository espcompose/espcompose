// ────────────────────────────────────────────────────────────────────────────
// Closure Protocol — uniform closure modeling for `useScript`
//
// Each binding type (ref, overlay controller, script handle, etc.) provides
// a ClosureDescriptor that tells the framework:
//   1. How to compute a stable identity (`toClosureKey`)
//   2. What closure fields to contribute for script parameterization
//
// The framework core calls these generically — no type-specific logic needed
// in useScript or the compiler.
// ────────────────────────────────────────────────────────────────────────────

import type { ClosureField, IRScalar, IRType } from '../ir/types';
import { IR_ID_REF, IR_INT, irScalar } from '../ir/types';
import { isRef } from '../types';

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

// ── Built-in descriptors ────────────────────────────────────────────────────

// -- Overlay Controller --

/** Shape of an OverlayController's hidden internal fields. */
export interface OverlayControllerInternal {
  __templateKey: string;
  __instanceIndex: number;
  __zOrder: number;
  __lifecycleScriptId?: string;
}

function isOverlayController(v: unknown): v is OverlayControllerInternal {
  return v != null && typeof v === 'object' && '__templateKey' in (v as Record<string, unknown>);
}

export const overlayControllerDescriptor: ClosureDescriptor<OverlayControllerInternal> = {
  match: isOverlayController,

  toClosureKey(v) {
    return `overlay:${v.__templateKey}`;
  },

  irType: IR_INT,

  toClosureField(bindingName) {
    return { name: `${bindingName}_instance_index`, irType: IR_INT };
  },

  toClosureValue(v) {
    return irScalar(v.__instanceIndex);
  },
};

// -- Script Handle --

interface ScriptHandleLike {
  id: string;
  execute: () => void;
  stop: () => void;
}

function isScriptHandle(v: unknown): v is ScriptHandleLike {
  return typeof v === 'function' && 'id' in (v as unknown as Record<string, unknown>) && 'execute' in (v as unknown as Record<string, unknown>);
}

export const scriptHandleDescriptor: ClosureDescriptor<ScriptHandleLike> = {
  match: isScriptHandle,

  toClosureKey(v) {
    return `script:${v.id}`;
  },

  irType: IR_ID_REF,

  toClosureField(bindingName) {
    return { name: `${bindingName}_idx`, irType: IR_ID_REF };
  },

  toClosureValue(v) {
    return irScalar(v.id);
  },
};

// -- Ref --

export const refDescriptor: ClosureDescriptor<{ toString(): string }> = {
  match(v): v is { toString(): string } {
    return isRef(v);
  },

  toClosureKey(v) {
    return `ref:${v.toString()}`;
  },

  irType: IR_ID_REF,

  toClosureField(bindingName) {
    return { name: `${bindingName}_idx`, irType: IR_ID_REF };
  },

  toClosureValue(v) {
    return irScalar(v.toString());
  },
};

// -- Controller --

/** Shape of a controller's hidden internal fields (from useController). */
interface ControllerInternalShape {
  __scripts: Record<string, unknown>;
}

function isControllerObject(v: unknown): v is ControllerInternalShape {
  return v != null && typeof v === 'object' && '__scripts' in (v as Record<string, unknown>);
}

export const controllerDescriptor: ClosureDescriptor<ControllerInternalShape> = {
  match: isControllerObject,

  toClosureKey(v) {
    // Aggregate script IDs for dedup identity.
    const ids = Object.entries(v.__scripts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, h]) => `${k}:${(h as { id?: string })?.id ?? ''}`)
      .join(',');
    return `controller:${ids}`;
  },

  // Controllers don't contribute closure fields directly — their
  // underlying script handles carry the closure data.
  irType: undefined,
};

// -- Identity fallback (test-only / explicit reference) --
//
// Not registered as a descriptor — `findClosureDescriptor` now returns null
// when no descriptor matches. Retained as a named export only so existing
// tests that explicitly reference it continue to compile.

/**
 * Generic identity-only descriptor. Not auto-registered; callers must
 * use it explicitly. Produces no closure fields.
 */
export const identityDescriptor: ClosureDescriptor<unknown> = {
  match(_v: unknown): _v is unknown {
    return true;
  },

  toClosureKey(v) {
    try {
      return `identity:${JSON.stringify(v)}`;
    } catch {
      return `identity:${String(v)}`;
    }
  },
};

// ── Initialization ──────────────────────────────────────────────────────────
// Register built-in descriptors in order of specificity.
// More specific descriptors MUST come before the generic identity fallback.
// The identity fallback is not registered — it's used as the default in
// findClosureDescriptor when no registered descriptor matches.

registerClosureDescriptor(controllerDescriptor);
registerClosureDescriptor(overlayControllerDescriptor);
registerClosureDescriptor(scriptHandleDescriptor);
registerClosureDescriptor(refDescriptor);
