// ────────────────────────────────────────────────────────────────────────────
// Shared utilities for useGlobal and useRetainedGlobal hooks.
//
// Extracted to avoid circular imports between the two hook files.
// ────────────────────────────────────────────────────────────────────────────

import { createContext, withContext } from './useContext';
import { IRReactiveNode, isTracking, trackDependency } from '../reactive-node';
import type { IRDependency, Signal } from '../reactive-node';
import type { ExprType } from '../ir/expr-types';
import { throwCompileTimeOnly } from '../errors';
import type { BINDING_BRAND } from '../types';

// ── GlobalDefinition ───────────────────────────────────────────────────────

/** Definition stored in the global scope context for compiler use. */
export interface GlobalDefinition {
  id: string;
  cppType: string;
}

// ── GlobalHandle ───────────────────────────────────────────────────────────

/**
 * Handle returned by useGlobal() / useRetainedGlobal() for scalar globals.
 *
 * - .value — reactive read (creates an IRReactiveNode on first access)
 * - .set(v) — no-op at runtime; the action compiler rewrites to globals.set
 * - .id — auto-generated ESPHome component ID
 */
export interface GlobalHandle<T> {
  readonly [BINDING_BRAND]?: true;
  /** Reactive read — returns the current value as a Signal<T>. */
  readonly value: Signal<T>;
  /** Set the global value. Compile-time marker — the action compiler handles this. */
  set(value: T): void;
  /** The auto-generated ESPHome global ID. */
  readonly id: string;
}

// ── C++ type → ExprType mapping ────────────────────────────────────────────

export function cppTypeToExprType(cppType: string): ExprType {
  switch (cppType) {
    case 'int':
    case 'int32_t':
    case 'int16_t':
    case 'int8_t':
    case 'uint8_t':
    case 'uint16_t':
    case 'uint32_t':
      return 'int';
    case 'float':
    case 'double':
      return 'float';
    case 'bool':
      return 'bool';
    case 'std::string':
      return 'string';
    case 'std::vector<int>':
      return 'int_array';
    case 'std::vector<float>':
      return 'float_array';
    case 'std::vector<bool>':
      return 'bool_array';
    case 'std::vector<std::string>':
      return 'string_array';
    default:
      return 'int';
  }
}

// ── Fingerprint hashing ────────────────────────────────────────────────────

/**
 * FNV-1a 32-bit hash of a fingerprint string → `g_<hex8>`.
 *
 * Produces a deterministic, valid C++ identifier from any user-provided
 * fingerprint value. The `g_` prefix guarantees the result starts with a
 * letter regardless of hash output.
 *
 * Shared between the runtime hook and the compiler's AST scanners so both
 * independently derive the same global ID from the same fingerprint.
 */
export function hashGlobalFingerprint(fingerprint: string): string {
  let h = 0x811c9dc5; // FNV offset basis
  for (let i = 0; i < fingerprint.length; i++) {
    h ^= fingerprint.charCodeAt(i);
    h = Math.imul(h, 0x01000193); // FNV prime
  }
  return `g_${(h >>> 0).toString(16).padStart(8, '0')}`;
}

// ── Global scope context ───────────────────────────────────────────────────

export const globalScopeContext = createContext<Map<string, GlobalDefinition>>(new Map());

/**
 * Establishes a global scope frame and runs `fn` inside it.
 * Returns the function's result together with all GlobalDefinitions that were
 * registered via useGlobal() / useRetainedGlobal() during the call.
 *
 * Called by the compiler's execute phase to wrap bundle evaluation.
 */
export function withGlobalScope<T>(fn: () => T): { result: T; globals: GlobalDefinition[] } {
  const scopeMap = new Map<string, GlobalDefinition>();
  const result = withContext(globalScopeContext, scopeMap, fn);
  const globals = Array.from(scopeMap.values());
  return { result, globals };
}

// ── Scalar handle factory ──────────────────────────────────────────────────

export function createGlobalHandle<T>(
  id: string,
  cppType: string,
  exprType: ExprType,
): GlobalHandle<T> {
  let cachedNode: IRReactiveNode<T> | undefined;

  function getOrCreateNode(): IRReactiveNode<T> {
    if (!cachedNode) {
      const dep: IRDependency = {
        kind: 'dependency',
        sourceId: id,
        triggerType: 'on_value',
        sourceDomain: 'globals',
        sourceType: 'global',
      };
      cachedNode = new IRReactiveNode<T>({
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
    set(_value: T): void {
      throwCompileTimeOnly('global.set()', 'Global mutations');
    },
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
        return node as unknown as Signal<T>;
      }
      return Reflect.get(target, prop, receiver);
    },
  }) as unknown as GlobalHandle<T>;
}
