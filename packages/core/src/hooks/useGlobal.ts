// ────────────────────────────────────────────────────────────────────────────
// useGlobal — declares typed ESPHome global variables
//
// Creates a globals: component entry and returns a GlobalHandle<T> for
// interacting with the global from reactive expressions and action handlers.
//
// The handle provides:
//   - .value — lazy reactive read (IRReactiveNode created on first access)
//   - .set(v) — no-op at runtime (action compiler handles it)
//   - .id — the deterministic global ID (derived from fingerprint hash)
//
// Must be called inside a function component body (render pass).
//
// Usage:
//   const counter = useGlobal<number>('int', 'my-counter', { initialValue: 0, restoreValue: true });
//   <Label text={() => `Count: ${counter.value}`} />
//   <Button onPress={() => { counter.set(counter.value + 1); }} />
// ────────────────────────────────────────────────────────────────────────────

import { createContext, useContext, withContext } from './useContext';
import { assertHookContext } from './useState';
import { registerComponent } from './useReactiveScope';
import { IRReactiveNode, isTracking, trackDependency } from '../reactive-node';
import type { IRDependency, Signal } from '../reactive-node';
import type { ExprType } from '../ir/expr-types';
import type { BINDING_BRAND } from '../types';

// ── Types ──────────────────────────────────────────────────────────────────

export interface GlobalOptions {
  /** Initial value for the global. Converted to string for the ESPHome config. */
  initialValue?: string | number | boolean;
  /** Whether to restore the value from flash on boot. */
  restoreValue?: boolean;
  /**
   * Max data length for std::string globals with restore_value.
   * Only applies to variables of type `std::string`.
   */
  maxRestoreDataLength?: number;
}

/** Definition stored in the global scope context for compiler use. */
export interface GlobalDefinition {
  id: string;
  cppType: string;
}

/**
 * Handle returned by useGlobal() for interacting with a global variable.
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

function cppTypeToExprType(cppType: string): ExprType {
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

const globalScopeContext = createContext<Map<string, GlobalDefinition>>(new Map());

/**
 * Establishes a global scope frame and runs `fn` inside it.
 * Returns the function's result together with all GlobalDefinitions that were
 * registered via useGlobal() during the call.
 *
 * Called by the compiler's execute phase to wrap bundle evaluation.
 */
export function withGlobalScope<T>(fn: () => T): { result: T; globals: GlobalDefinition[] } {
  const scopeMap = new Map<string, GlobalDefinition>();

  const result = withContext(globalScopeContext, scopeMap, fn);
  const globals = Array.from(scopeMap.values());
  return { result, globals };
}

// ── Hook implementation ────────────────────────────────────────────────────

/**
 * Declare an ESPHome global variable.
 *
 * Registers the global as an IRComponent for the `globals:` YAML section
 * and returns a GlobalHandle<T> for reactive reads and action-based writes.
 *
 * @param cppType     - The C++ type string (e.g. 'int', 'float', 'bool', 'std::string')
 * @param fingerprint - A stable, unique string used to derive the ESPHome global ID.
 *                      The same fingerprint always produces the same ID across builds,
 *                      ensuring retained flash values survive firmware updates.
 * @param opts        - Optional initial value, restore behaviour, and max data length
 *
 * @example
 * const counter = useGlobal<number>('int', 'my-counter', { initialValue: 0, restoreValue: true });
 * const name = useGlobal<string>('std::string', 'device-name', { initialValue: 'hello' });
 */
export function useGlobal<T = unknown>(
  cppType: string,
  fingerprint: string,
  opts?: GlobalOptions,
): GlobalHandle<T> {
  assertHookContext('useGlobal()');

  const id = hashGlobalFingerprint(fingerprint);
  const exprType = cppTypeToExprType(cppType);

  // Detect duplicate fingerprints within the same global scope
  const scopeMap = useContext(globalScopeContext);
  if (scopeMap.has(id)) {
    throw new Error(
      `Duplicate useGlobal() fingerprint "${fingerprint}" — each global must have a unique fingerprint.`,
    );
  }

  // Build the ESPHome globals config
  const config: Record<string, unknown> = {
    id,
    type: cppType,
  };
  if (opts?.initialValue != null) {
    config.initial_value = String(opts.initialValue);
  }
  if (opts?.restoreValue != null) {
    config.restore_value = opts.restoreValue;
  }
  if (opts?.maxRestoreDataLength != null) {
    config.max_restore_data_length = opts.maxRestoreDataLength;
  }

  // Register the component for YAML generation
  registerComponent({
    kind: 'component',
    section: 'globals',
    id,
    config,
  });

  // Register in the global scope context for action compiler symbol lookup
  scopeMap.set(id, { id, cppType });

  // Create a Proxy-based handle
  return createGlobalHandle<T>(id, cppType, exprType);
}

// ── Handle factory ─────────────────────────────────────────────────────────

function createGlobalHandle<T>(
  id: string,
  cppType: string,
  exprType: ExprType,
): GlobalHandle<T> {
  // Cache the IRReactiveNode — created lazily on first .value access
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
      // No-op at runtime — the action compiler handles this at build time.
    },
  };

  return new Proxy(handle, {
    get(target, prop, receiver) {
      if (prop === 'value') {
        const node = getOrCreateNode();

        // Track dependency when inside useMemo/useEffect
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
