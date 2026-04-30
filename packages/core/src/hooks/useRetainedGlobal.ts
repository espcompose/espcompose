// ────────────────────────────────────────────────────────────────────────────
// useRetainedGlobal — declares flash-persistent ESPHome global variables
//
// The key is a positional argument (arg 2) that must be a string literal.
// The compiler validates this at build time.
//
// Only scalar types are supported — arrays cannot be retained.
//
// Usage:
//   const saved = useRetainedGlobal('integer', 'my-counter', { initialValue: 0 });
//   const name  = useRetainedGlobal('string', 'device-name', { maxRestoreDataLength: 32 });
// ────────────────────────────────────────────────────────────────────────────

import { useContext } from './useContext';
import { assertHookContext } from './useState';
import { registerComponent } from './useReactiveScope';
import type { IRType } from '../ir/types';
import { IR_BOOL, IR_FLOAT, IR_INT, IR_STRING } from '../ir/types';
import {
  type GlobalDefinition,
  type GlobalHandle,
  globalScopeContext,
  hashGlobalFingerprint,
  valueTypeToExprType,
  createGlobalHandle,
} from './global-shared';

// ── Type tokens (scalar only) ──────────────────────────────────────────────

export type RetainedGlobalType = 'boolean' | 'integer' | 'float' | 'string';

/** Maps a RetainedGlobalType token to its TypeScript value type. */
export type InferRetainedTS<TK extends RetainedGlobalType> =
  TK extends 'boolean' ? boolean :
  TK extends 'string'  ? string  :
  number; // 'integer' | 'float'

// ── Options ────────────────────────────────────────────────────────────────

export interface RetainedGlobalOptions<TK extends RetainedGlobalType> {
  /** Initial value for the global. Must match the declared type. */
  initialValue?: InferRetainedTS<TK>;
  /** Max data length for string globals with restoreValue. Only valid when type is `'string'`. */
  maxRestoreDataLength?: TK extends 'string' ? number : never;
}

// ── Token → IRType mapping ─────────────────────────────────────────────

function retainedTypeToValueType(token: RetainedGlobalType): IRType {
  switch (token) {
    case 'boolean': return IR_BOOL;
    case 'integer': return IR_INT;
    case 'float':   return IR_FLOAT;
    case 'string':  return IR_STRING;
  }
}

// ── Hook implementation ────────────────────────────────────────────────────

/**
 * Declare a flash-persistent ESPHome global variable.
 *
 * The key is a positional string literal that uniquely identifies the flash
 * storage slot. Same key = same slot across firmware updates.
 *
 * Only scalar types are supported. For volatile globals or array types, use `useGlobal()`.
 *
 * @param type - Scalar type token: `'boolean'`, `'integer'`, `'float'`, or `'string'`
 * @param key  - Stable string literal key for flash persistence
 * @param opts - Optional initial value and string length limit
 *
 * @example
 * const counter = useRetainedGlobal('integer', 'my-counter', { initialValue: 0 });
 * const name = useRetainedGlobal('string', 'device-name', { maxRestoreDataLength: 32 });
 */
export function useRetainedGlobal<TK extends RetainedGlobalType>(
  type: TK,
  key: string,
  opts?: RetainedGlobalOptions<TK>,
): GlobalHandle<InferRetainedTS<TK>> {
  assertHookContext('useRetainedGlobal()');

  if (!key || typeof key !== 'string') {
    throw new Error(
      'useRetainedGlobal(): `key` (arg 2) must be a non-empty string literal. '
      + 'This key identifies the flash storage slot and must be stable across firmware updates.',
    );
  }

  const valueType = retainedTypeToValueType(type);
  const id = hashGlobalFingerprint(key);
  const exprType = valueTypeToExprType(valueType);

  // Detect duplicate keys within the same global scope
  const scopeMap = useContext(globalScopeContext) as Map<string, GlobalDefinition>;
  if (scopeMap.has(id)) {
    throw new Error(
      `Duplicate useRetainedGlobal() key "${key}" — each global must have a unique key.`,
    );
  }

  // Build the ESPHome globals config. The `valueType` is target-agnostic;
  // the lowering target converts it to the concrete `type:` keyword.
  const config: Record<string, unknown> = {
    id,
    valueType,
    restore_value: true,
  };
  if (opts?.initialValue != null) {
    config.initial_value = String(opts.initialValue);
  }
  if (opts && 'maxRestoreDataLength' in opts && opts.maxRestoreDataLength != null) {
    config.max_restore_data_length = opts.maxRestoreDataLength;
  }

  // Register the component for YAML generation
  registerComponent({ kind: 'component', section: 'globals', id, config });

  // Register in the global scope context for action compiler symbol lookup
  scopeMap.set(id, { id, valueType });

  return createGlobalHandle<InferRetainedTS<TK>>(id, valueType, exprType);
}
