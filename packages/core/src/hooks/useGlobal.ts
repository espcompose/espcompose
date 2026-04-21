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
import { IRReactiveNode, isTracking, trackDependency } from '../reactive-node';
import type { IRDependency, Signal } from '../reactive-node';
import type { ExprType } from '../ir/expr-types';
import type { BINDING_BRAND } from '../types';
import {
  type GlobalDefinition,
  type GlobalHandle,
  globalScopeContext,
  hashGlobalFingerprint,
  cppTypeToExprType,
  createGlobalHandle,
} from './global-shared';

// ── Public type tokens ─────────────────────────────────────────────────────

/** Scalar type tokens. */
export type ScalarGlobalType = 'boolean' | 'integer' | 'float' | 'string';

/** Array type tokens — volatile only, backed by std::vector<T>. */
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

// ── Array handle ───────────────────────────────────────────────────────────

/**
 * Handle returned by useGlobal() for array globals.
 *
 * Provides a restricted set of operations that map cleanly to std::vector<T>.
 * Not all TS array methods are supported — only those that compile to C++.
 */
export interface GlobalArrayHandle<T> {
  readonly [BINDING_BRAND]?: true;
  /** Reactive read of the whole array. */
  readonly value: Signal<T[]>;
  /** Reactive read of the array length. */
  readonly length: Signal<number>;
  /** Read element at index. Compile-time marker — the expr compiler handles this. */
  get(index: number): T;
  /** Set element at index. Compile-time marker — the action compiler handles this. */
  set(index: number, value: T): void;
  /** Append an element. Compile-time marker — the action compiler handles this. */
  push(value: T): void;
  /** Remove all elements. Compile-time marker — the action compiler handles this. */
  clear(): void;
  /** The auto-generated ESPHome global ID. */
  readonly id: string;
}

// ── Token → C++ type mapping (internal) ────────────────────────────────────

/**
 * Convert a TS-native GlobalType token to the corresponding C++ type string.
 * Exported from internals for use by compiler scanners.
 */
export function globalTypeToCpp(token: GlobalType): string {
  switch (token) {
    case 'boolean':    return 'bool';
    case 'integer':    return 'int';
    case 'float':      return 'float';
    case 'string':     return 'std::string';
    case 'boolean[]':  return 'std::vector<bool>';
    case 'integer[]':  return 'std::vector<int>';
    case 'float[]':    return 'std::vector<float>';
    case 'string[]':   return 'std::vector<std::string>';
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
 * and array types (`'integer[]'`, `'float[]'`, etc.) backed by `std::vector<T>`.
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

  const cppType = globalTypeToCpp(type);
  const id = hashGlobalFingerprint(fingerprint);
  const exprType = cppTypeToExprType(cppType);

  // Detect duplicate keys within the same global scope
  const scopeMap = useContext(globalScopeContext) as Map<string, GlobalDefinition>;
  if (scopeMap.has(id)) {
    throw new Error(
      `Duplicate useGlobal() key "${fingerprint}" — each global must have a unique key.`,
    );
  }

  // Build the ESPHome globals config
  const config: Record<string, unknown> = { id, type: cppType };
  if (opts?.initialValue != null) {
    config.initial_value = String(opts.initialValue);
  }

  // Register the component for YAML generation
  registerComponent({ kind: 'component', section: 'globals', id, config });

  // Register in the global scope context for action compiler symbol lookup
  scopeMap.set(id, { id, cppType });

  if (isArrayGlobalType(type)) {
    return createGlobalArrayHandle(id, cppType, exprType);
  }
  return createGlobalHandle<InferGlobalTS<TK>>(id, cppType, exprType);
}

// ── Array handle factory ───────────────────────────────────────────────────

function createGlobalArrayHandle<T>(
  id: string,
  cppType: string,
  exprType: ExprType,
): GlobalArrayHandle<T> {
  let cachedNode: IRReactiveNode<T[]> | undefined;

  function getOrCreateNode(): IRReactiveNode<T[]> {
    if (!cachedNode) {
      const dep: IRDependency = {
        kind: 'dependency',
        sourceId: id,
        triggerType: 'on_value',
        sourceDomain: 'globals',
        sourceType: 'global',
      };
      cachedNode = new IRReactiveNode<T[]>({
        kind: 'expression',
        dependencies: [dep],
        exprType,
        sourceId: id,
        property: 'value',
        triggerType: 'on_value',
        sourceDomain: 'globals',
      });
    }
    return cachedNode;
  }

  const handle = {
    id,
    get(_index: number): T { return undefined as T; },
    set(_index: number, _value: T): void { /* action compiler handles this */ },
    push(_value: T): void { /* action compiler handles this */ },
    clear(): void { /* action compiler handles this */ },
  };

  return new Proxy(handle, {
    get(target, prop, receiver) {
      if (prop === 'value') {
        const node = getOrCreateNode();
        if (isTracking()) {
          for (const dep of node.dependencies) {
            trackDependency(dep);
          }
        }
        return node as unknown as Signal<T[]>;
      }
      if (prop === 'length') {
        const node = getOrCreateNode();
        if (isTracking()) {
          for (const dep of node.dependencies) {
            trackDependency(dep);
          }
        }
        return node as unknown as Signal<number>;
      }
      return Reflect.get(target, prop, receiver);
    },
  }) as unknown as GlobalArrayHandle<T>;
}
