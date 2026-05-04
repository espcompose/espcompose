// ────────────────────────────────────────────────────────────────────────────
// useGlobal — declares volatile (non-retained) ESPHome global variables
//
// Creates a globals: component entry and returns a GlobalHandle<T> (scalar)
// or GlobalArrayHandle<T> (array) for interacting with the global.
//
// For flash-persistent globals, use useRetainedGlobal() instead.
//
// The handle provides:
//   - .value — lazy reactive read (IRReactiveNode created on first access)
//   - .set(v) — no-op at runtime (action compiler handles it)
//   - .id — the deterministic global ID (derived from compiler-injected key)
//
// Must be called inside a function component body (render pass).
//
// Usage:
//   const counter = useGlobal('integer', { initialValue: 0 });
//   const scores = useGlobal('integer[]');
//   <Label text={() => `Count: ${counter.value}`} />
//   <Button onPress={() => { counter.set(counter.value + 1); }} />
// ────────────────────────────────────────────────────────────────────────────

import { useContext } from './useContext';
import { assertHookContext } from './useState';
import { registerComponent } from './useReactiveScope';
import type { IRType } from '../ir/types';
import { IR_BOOL, IR_BOOL_ARRAY, IR_FLOAT, IR_FLOAT_ARRAY, IR_INT, IR_INT_ARRAY, IR_STRING, IR_STRING_ARRAY } from '../ir/types';
import {
  type GlobalDefinition,
  type GlobalHandle,
  type GlobalArrayHandle,
  globalScopeContext,
  hashGlobalFingerprint,
  irTypeToExprType,
  createGlobalHandle,
  createGlobalArrayHandle,
} from './global-shared';

export type { GlobalArrayHandle } from './global-shared';

// ── Public type tokens ─────────────────────────────────────────────────────

/** Scalar type tokens. */
export type ScalarGlobalType = 'boolean' | 'integer' | 'float' | 'string';

/** Array type tokens — volatile only. Lowered to a backend-specific array type. */
export type ArrayGlobalType = 'boolean[]' | 'integer[]' | 'float[]' | 'string[]';

/** All type tokens accepted by useGlobal(). */
export type GlobalType = ScalarGlobalType | ArrayGlobalType;

/** Maps a GlobalType token to its TypeScript value type. */
export type InferGlobalTS<TK extends GlobalType> =
  TK extends 'boolean'    ? boolean   :
  TK extends 'string'     ? string    :
  TK extends 'boolean[]'  ? boolean[] :
  TK extends 'string[]'   ? string[]  :
  TK extends 'integer[]' | 'float[]' ? number[] :
  number; // 'integer' | 'float'

/** Infer the element type for array tokens. */
type InferArrayElement<TK extends ArrayGlobalType> =
  TK extends 'boolean[]'  ? boolean :
  TK extends 'string[]'   ? string  :
  number;

// ── Options ────────────────────────────────────────────────────────────────

/** Options for a volatile (non-retained) global. */
export interface VolatileGlobalOptions<TK extends GlobalType> {
  /** Initial value for the global. Must match the declared type. */
  initialValue?: InferGlobalTS<TK>;
  /** @internal Compiler-injected key for volatile globals. Do not set manually. */
  __key?: string;
}

// ── Token → IRType mapping (internal) ────────────────────────────────────────

/**
 * Convert a TS-native GlobalType token to the corresponding
 * target-agnostic `IRType`. Exported from internals for use by
 * compiler scanners.
 */
export function globalTypeToIRType(token: GlobalType): IRType {
  switch (token) {
    case 'boolean':    return IR_BOOL;
    case 'integer':    return IR_INT;
    case 'float':      return IR_FLOAT;
    case 'string':     return IR_STRING;
    case 'boolean[]':  return IR_BOOL_ARRAY;
    case 'integer[]':  return IR_INT_ARRAY;
    case 'float[]':    return IR_FLOAT_ARRAY;
    case 'string[]':   return IR_STRING_ARRAY;
  }
}

/** Check if a GlobalType token is an array type. */
export function isArrayGlobalType(token: string): token is ArrayGlobalType {
  return token.endsWith('[]');
}

// ── Hook implementation ────────────────────────────────────────────────────

/**
 * Declare a volatile (non-retained) ESPHome global variable.
 *
 * Supports both scalar types (`'integer'`, `'float'`, `'boolean'`, `'string'`)
 * and array types (`'integer[]'`, `'float[]'`, etc.) lowered to a backend
 * array container.
 *
 * For flash-persistent globals, use `useRetainedGlobal()` instead.
 *
 * @param type - Type token
 * @param opts - Optional initial value
 *
 * @example
 * const counter = useGlobal('integer', { initialValue: 0 });
 * const scores = useGlobal('integer[]');
 */
export function useGlobal<TK extends ScalarGlobalType>(
  type: TK,
  opts?: VolatileGlobalOptions<TK>,
): GlobalHandle<InferGlobalTS<TK>>;
export function useGlobal<TK extends ArrayGlobalType>(
  type: TK,
  opts?: VolatileGlobalOptions<TK>,
): GlobalArrayHandle<InferArrayElement<TK>>;
export function useGlobal<TK extends GlobalType>(
  type: TK,
  opts?: VolatileGlobalOptions<TK>,
): GlobalHandle<InferGlobalTS<TK>> | GlobalArrayHandle<unknown> {
  assertHookContext('useGlobal()');

  // Resolve compiler-injected key
  const fingerprint = opts?.__key;
  if (!fingerprint) {
    throw new Error(
      'useGlobal(): missing __key. '
      + 'Non-retained globals must have a compiler-injected `__key`. '
      + 'This usually means the compiler AST transform did not run.',
    );
  }

  const irType = globalTypeToIRType(type);
  const id = hashGlobalFingerprint(fingerprint);
  const exprType = irTypeToExprType(irType);

  // Detect duplicate keys within the same global scope
  const scopeMap = useContext(globalScopeContext) as Map<string, GlobalDefinition>;
  if (scopeMap.has(id)) {
    throw new Error(
      `Duplicate useGlobal() key "${fingerprint}" — each global must have a unique key.`,
    );
  }

  // Build the ESPHome globals config. The `irType` is target-agnostic;
  // the lowering target converts it to the concrete `type:` keyword.
  const config: Record<string, unknown> = { id, irType };
  if (opts?.initialValue != null) {
    config.initial_value = String(opts.initialValue);
  }

  // Register the component for YAML generation
  registerComponent({ kind: 'component', section: 'globals', id, config });

  // Register in the global scope context for action compiler symbol lookup
  scopeMap.set(id, { id, irType });

  if (isArrayGlobalType(type)) {
    return createGlobalArrayHandle(id, irType, exprType);
  }
  return createGlobalHandle<InferGlobalTS<TK>>(id, irType, exprType);
}
