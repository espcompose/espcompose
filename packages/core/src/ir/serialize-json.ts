// ────────────────────────────────────────────────────────────────────────────
// Semantic IR → JSON serializer
//
// Produces a human-readable JSON representation of the SemanticIR tree for
// debugging and auditing. Handles:
//   - IRReactiveNode class instances (extracts plain data fields)
//   - Map objects (leafData on IRThemeData) → key-value arrays
//   - Circular reference detection (replaces with "[Circular]")
//   - Functions / undefined → omitted (standard JSON behavior)
// ────────────────────────────────────────────────────────────────────────────

import type { SemanticIR } from './types';

/**
 * Serialize a SemanticIR tree to a formatted JSON string suitable for
 * human review and diffing.
 *
 * The output is deterministic for a given IR — no random tokens, no
 * non-serializable values. Maps are lowered to sorted key-value objects.
 *
 * Returns the JSON string and an array of warnings for any anomalies
 * encountered during serialization (e.g. leaked WeakMap/WeakSet references).
 */
export function serializeIRToJSON(ir: SemanticIR): { json: string; warnings: string[] } {
  const seen = new WeakSet<object>();
  const warnings: string[] = [];

  function replacer(this: unknown, key: string, value: unknown): unknown {
    if (value === null || value === undefined) return value;
    if (typeof value === 'function') return undefined;

    if (typeof value === 'object') {
      // Map → plain object with sorted keys
      if (value instanceof Map) {
        const obj: Record<string, unknown> = {};
        for (const [k, v] of [...value.entries()].sort((a, b) =>
          String(a[0]).localeCompare(String(b[0])),
        )) {
          obj[String(k)] = v;
        }
        return obj;
      }

      // Set → sorted array
      if (value instanceof Set) {
        return [...value].sort();
      }

      // WeakMap / WeakSet / WeakRef — not serializable, indicates a bug
      if (value instanceof WeakMap || value instanceof WeakSet || value instanceof WeakRef) {
        const type = value instanceof WeakMap ? 'WeakMap' : value instanceof WeakSet ? 'WeakSet' : 'WeakRef';
        warnings.push(`Leaked ${type} found at key "${key}" — this indicates an unresolved capture in the IR`);
        return `[Leaked ${type}]`;
      }

      // Circular reference guard
      if (seen.has(value)) {
        return '[Circular]';
      }
      seen.add(value);
    }

    return value;
  }

  const json = JSON.stringify(ir, replacer, 2);
  return { json, warnings };
}
