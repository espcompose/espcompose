// ────────────────────────────────────────────────────────────────────────────
// Shared utilities for useGlobal and useRetainedGlobal hooks.
//
// Extracted to avoid circular imports between the two hook files.
// ────────────────────────────────────────────────────────────────────────────

import { createContext, withContext } from './useContext';
import { IRReactiveNode, isTracking, trackDependency } from '../reactive-node';
import type { IRDependency, Signal } from '../reactive-node';
import type { ExprType } from '../ir/expr-types';
import type { IRValueType } from '../ir/types';
import { throwCompileTimeOnly } from '../errors';
import type { BINDING_BRAND } from '../types';

// ── GlobalDefinition ───────────────────────────────────────────────────────

/** Definition stored in the global scope context for compiler use. */
export interface GlobalDefinition {
  id: string;
  /** Target-agnostic value type. The lowering target maps this to a concrete representation. */
  valueType: IRValueType;
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

// ── IRValueType → ExprType mapping ─────────────────────────────────────────

/**
 * Map a target-agnostic `IRValueType` to the corresponding `ExprType`
 * used by the IR expression layer.
 */
export function valueTypeToExprType(vt: IRValueType): ExprType {
  if (vt.isArray) {
    switch (vt.type) {
      case 'int':    return 'int_array';
      case 'float':  return 'float_array';
      case 'bool':   return 'bool_array';
      case 'string': return 'string_array';
    }
  }
  switch (vt.type) {
    case 'int':    return 'int';
    case 'float':  return 'float';
    case 'bool':   return 'bool';
    case 'string': return 'string';
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

/**
 * FNV-1a 32-bit hash of an arbitrary string → 8-char hex digest.
 *
 * Computes a stable body hash for `useScript()` dedup. Two scripts with
 * identical compiled action bodies and identical binding shape signatures
 * produce the same hash and share an ESPHome script template (with
 * per-instance closure-table rows).
 */
export function hashFnv1a(input: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
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
  _valueType: IRValueType,
  exprType: ExprType,
): GlobalHandle<T> {
  let cachedNode: IRReactiveNode<T> | undefined;

  function getOrCreateNode(): IRReactiveNode<T> {
    if (!cachedNode) {
      const dep: IRDependency = {
        kind: 'dependency',
        sourceId: id,
        sourceDomain: 'globals',
        sourceType: 'global',
      };
      cachedNode = new IRReactiveNode<T>({
        kind: 'expression',
        dependencies: [dep],
        exprType,
        sourceId: id,
        propertyKey: 'value',
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
