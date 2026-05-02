// ────────────────────────────────────────────────────────────────────────────
// Semantic IR → JSON serializer
//
// Produces a human-readable JSON representation of the SemanticIR tree for
// debugging and auditing. Handles:
//   - IRReactiveNode class instances (extracts plain data fields)
//   - Map objects (leafData on IRThemeData) → key-value arrays
//   - Functions / undefined → omitted (standard JSON behavior)
//
// $id / $ref convention
// ─────────────────────
// Every serialized object is tagged with a `$id` field whose value is a
// DOTTED PATH locating the node within the tree. The root has $id "0";
// each child of a node with path P at child-slot index `i` has path `P.i`.
//
// A "child slot" is any property value that is itself an object or array,
// enumerated in `Object.keys` order, skipping the bookkeeping keys `$id`
// and `kind`. For arrays, every element is a child slot in index order.
// This matches the IR viewer's tree-rendering logic so a `$ref` path can
// be walked directly to the corresponding DOM node.
//
// When the walker encounters the same object reference a second time (a
// back-edge that would otherwise produce an infinite loop), it emits a
// reference object `{ "$ref": "<path>" }` pointing back to the canonical
// (first-seen) path.
//
// `$id` is always emitted as the FIRST key of an object so it is visually
// obvious in raw JSON. `$ref` objects contain only the `$ref` key.
// Arrays cannot carry a `$id` property (they are JSON arrays); array
// elements are addressable but the array itself is not a $ref target.
// ────────────────────────────────────────────────────────────────────────────

import type { SemanticIR } from './types';

const ROOT_PATH = '0';

/**
 * Serialize a SemanticIR tree to a formatted JSON string suitable for
 * human review and diffing. See file header for the `$id` / `$ref`
 * dotted-path convention.
 */
export function serializeIRToJSON(ir: SemanticIR): { json: string; warnings: string[] } {
  const pathOf = new WeakMap<object, string>();
  const warnings: string[] = [];

  function isChildSlot(value: unknown): boolean {
    return value !== null && value !== undefined && typeof value === 'object';
  }

  function childPath(parent: string, index: number): string {
    return `${parent}.${index}`;
  }

  function walk(value: unknown, path: string): unknown {
    if (value === null || value === undefined) return value;
    if (typeof value === 'function') return undefined;
    if (typeof value !== 'object') return value;

    // Back-edge → emit $ref to the canonical path.
    const existing = pathOf.get(value);
    if (existing !== undefined) {
      return { $ref: existing };
    }

    // WeakMap / WeakSet / WeakRef — not serializable, indicates a bug.
    if (value instanceof WeakMap || value instanceof WeakSet || value instanceof WeakRef) {
      const type =
        value instanceof WeakMap ? 'WeakMap' : value instanceof WeakSet ? 'WeakSet' : 'WeakRef';
      warnings.push(
        `Leaked ${type} found at path "${path}" — this indicates an unresolved capture in the IR`,
      );
      return `[Leaked ${type}]`;
    }

    // Set → sorted array (no $id; not a $ref target).
    if (value instanceof Set) {
      return [...value].sort();
    }

    // Map → plain object with sorted keys, treated like a node.
    if (value instanceof Map) {
      pathOf.set(value, path);
      const out: Record<string, unknown> = { $id: path };
      const sortedEntries = [...value.entries()].sort((a, b) =>
        String(a[0]).localeCompare(String(b[0])),
      );
      let childIdx = 0;
      for (const [k, v] of sortedEntries) {
        const sk = String(k);
        if (v === undefined) continue;
        if (typeof v === 'function') continue;
        if (isChildSlot(v)) {
          out[sk] = walk(v, childPath(path, childIdx));
          childIdx++;
        } else {
          out[sk] = v;
        }
      }
      return out;
    }

    // Array → bare JSON array. Cannot carry $id, so not registered as a
    // $ref target. Array elements are addressable via their parent's path.
    if (Array.isArray(value)) {
      return value.map((v, i) => walk(v, childPath(path, i)));
    }

    // Plain object / class instance.
    pathOf.set(value, path);
    const out: Record<string, unknown> = { $id: path };
    let childIdx = 0;
    for (const k of Object.keys(value as Record<string, unknown>)) {
      if (k === '$id') continue;
      const v = (value as Record<string, unknown>)[k];
      if (v === undefined) continue;
      if (typeof v === 'function') continue;
      if (isChildSlot(v) && k !== 'kind') {
        out[k] = walk(v, childPath(path, childIdx));
        childIdx++;
      } else {
        out[k] = v;
      }
    }
    return out;
  }

  const transformed = walk(ir, ROOT_PATH);
  const json = JSON.stringify(transformed, null, 2);
  return { json, warnings };
}
