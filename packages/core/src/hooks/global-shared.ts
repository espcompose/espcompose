// ────────────────────────────────────────────────────────────────────────────
// Shared utilities for useGlobal and useRetainedGlobal hooks.
//
// Extracted to avoid circular imports between the two hook files.
// ────────────────────────────────────────────────────────────────────────────

import { createContext, withContext } from './useContext';
import { IRReactiveNode } from '../reactive';
import type { IRDependency, Signal } from '../reactive';
import type { ExprType } from '../ir/expr-types';
import type { IRType } from '../ir/types';
import { throwCompileTimeOnly } from '../errors';
import type { BINDING_BRAND } from '../types';
import { parseDurationString } from '../ir/action-types';
import type { IRDurationLiteral } from '../ir/action-types';

// ── GlobalDefinition ───────────────────────────────────────────────────────

/** Definition stored in the global scope context for compiler use. */
export interface GlobalDefinition {
  id: string;
  /** Target-agnostic type descriptor. The lowering target maps this to a concrete representation. */
  irType: IRType;
}

// ── ScriptParamGlobalDecl ──────────────────────────────────────────────────

/**
 * Declaration for a single script parameter backed by an ESPHome global.
 *
 * Each field maps to an ESPHome global variable. The calling script receives
 * user params and writes them to globals before executing its body. The
 * reactive bindings read from those globals via `global_read`.
 */
export interface ScriptParamGlobalDecl {
  /** Field name (e.g. 'message'). */
  readonly name: string;
  /** Target-agnostic type descriptor. */
  readonly irType: IRType;
  /** Auto-generated ESPHome global ID backing this param. */
  readonly globalId: string;
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

// ── IRType → ExprType mapping ─────────────────────────────────────────

/**
 * Map a target-agnostic `IRType` to the corresponding `ExprType`
 * used by the IR expression layer.
 */
export function irTypeToExprType(vt: IRType): ExprType {
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
  _irType: IRType,
  exprType: ExprType,
): GlobalHandle<T> {
  let cachedNode: IRReactiveNode<T> | undefined;

  function getOrCreateNode(): IRReactiveNode<T> {
    if (!cachedNode) {
      const dep: IRDependency = {
        kind: 'dependency',
        sourceId: id,
        sourceType: 'global',
      };
      cachedNode = new IRReactiveNode<T>({
        kind: 'expression',
        dependencies: [dep],
        exprType,
        sourceId: id,
        propertyKey: 'value',
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
        return getOrCreateNode() as unknown as Signal<T>;
      }
      return Reflect.get(target, prop, receiver);
    },
  }) as unknown as GlobalHandle<T>;
}

// ── Array handle ───────────────────────────────────────────────────────────

/**
 * Handle returned by useGlobal() for array globals.
 *
 * Provides a restricted set of operations that map cleanly to a backend
 * array container. Not all TS array methods are supported — only those that
 * a typical backend can lower.
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

// ── Array handle factory ───────────────────────────────────────────────────

export function createGlobalArrayHandle<T>(
  id: string,
  _irType: IRType,
  exprType: ExprType,
): GlobalArrayHandle<T> {
  let cachedNode: IRReactiveNode<T[]> | undefined;

  function getOrCreateNode(): IRReactiveNode<T[]> {
    if (!cachedNode) {
      const dep: IRDependency = {
        kind: 'dependency',
        sourceId: id,
        sourceType: 'global',
      };
      cachedNode = new IRReactiveNode<T[]>({
        kind: 'expression',
        dependencies: [dep],
        exprType,
        sourceId: id,
        propertyKey: 'value',
      });
    }
    return cachedNode;
  }

  const handle = {
    id,
    get(_index: number): T {
      throwCompileTimeOnly('globalArray.get()', 'Array accessors');
    },
    set(_index: number, _value: T): void {
      throwCompileTimeOnly('globalArray.set()', 'Array mutations');
    },
    push(_value: T): void {
      throwCompileTimeOnly('globalArray.push()', 'Array mutations');
    },
    clear(): void {
      throwCompileTimeOnly('globalArray.clear()', 'Array mutations');
    },
  };

  return new Proxy(handle, {
    get(target, prop, receiver) {
      if (prop === 'value') {
        return getOrCreateNode() as unknown as Signal<T[]>;
      }
      if (prop === 'length') {
        return getOrCreateNode() as unknown as Signal<number>;
      }
      return Reflect.get(target, prop, receiver);
    },
  }) as unknown as GlobalArrayHandle<T>;
}

// ── TransientOverlayContext ────────────────────────────────────────────────

/**
 * Context provided to transient overlay factories for reactive slot state.
 *
 * Exposes only the computed `slotRank` — a reactive value representing
 * this slot's zero-based position among active peers ordered by show time.
 * UI libraries multiply rank by a slot height to compute compacted offsets.
 */
export interface TransientOverlayContext {
  /**
   * This slot's zero-based rank among active peers, ordered by show time.
   *
   * Rank 0 = the oldest active slot (shown first), rank 1 = next, etc.
   * Reactive — updates automatically when any slot shows or hides.
   */
  slotRank: Signal<number>;
}

// ── Duration normalization ─────────────────────────────────────────────────

/**
 * Normalize a duration value (number in ms or string literal) to an IRDurationLiteral.
 */
export function normalizeDuration(value: string | number): IRDurationLiteral {
  if (typeof value === 'number') {
    return { kind: 'duration', value, unit: 'ms' };
  }
  const parsed = parseDurationString(value);
  if (!parsed) {
    throw new Error(`[espcompose] Invalid autoHide duration '${value}'. Expected a number of milliseconds, or a duration literal with a unit suffix (ms, s, or min).`);
  }
  return parsed;
}

// ── Controller param metadata forwarding ──────────────────────────────────────────

/**
 * Internal key used by the compiler to attach controller param global
 * declarations onto factory functions. This key is opaque to consumers —
 * use `forwardControllerParamMeta` to transfer it between factories.
 */
const FACTORY_META_KEY = '__scriptParamGlobals';

/**
 * Transfer compiler-injected controller param metadata from one factory to another.
 *
 * When a higher-level hook (e.g. `useToast`) wraps the user's factory in
 * its own function, the compiler-injected metadata must follow so that
 * `useTransientOverlay` can detect and register param globals.
 *
 * This utility is the ONLY sanctioned way to forward that metadata.
 * Consuming code should never reference the internal key directly.
 */
export function forwardControllerParamMeta(source: unknown, target: unknown): void {
  const meta = (source as Record<string, unknown>)[FACTORY_META_KEY];
  if (meta) {
    (target as Record<string, unknown>)[FACTORY_META_KEY] = meta;
  }
}

/**
 * Read compiler-injected controller param global declarations from a factory.
 *
 * Used internally by `useTransientOverlay` to detect param globals.
 * Returns undefined if no metadata is present.
 */
export function readControllerParamMeta(factory: unknown): ScriptParamGlobalDecl[] | undefined {
  const meta = (factory as Record<string, unknown>)[FACTORY_META_KEY];
  return meta as ScriptParamGlobalDecl[] | undefined;
}

/**
 * Attach controller param metadata directly onto a wrapper factory.
 *
 * Use this when a higher-level hook needs to override the param declarations
 * (e.g. `useTransientOverlay` substituting per-slot global IDs) rather than
 * forwarding the source factory's metadata verbatim.
 */
export function setControllerParamMeta(target: unknown, meta: readonly ScriptParamGlobalDecl[]): void {
  (target as Record<string, unknown>)[FACTORY_META_KEY] = meta;
}
