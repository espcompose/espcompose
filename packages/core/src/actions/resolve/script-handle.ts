// ────────────────────────────────────────────────────────────────────────────
// Patch IRScriptExecute.closureIndex from script handles in __refBindings.
//
// User code: `const myScript = useScript(async () => {...});` then
// `myScript.execute()` inside a trigger handler. The compiler bakes the
// snake_case scriptId into the IR but cannot know the closure-table row
// index — that's only known at render time when useScript runs and assigns
// CLOSURE_INDEX to the handle. This walker patches the IR using the handle
// found in __refBindings (added by the script transformer at compile time).
// ────────────────────────────────────────────────────────────────────────────

import type { IRActionNode } from '../../ir/action-types';
import { CLOSURE_INDEX } from '../closure/symbols';
import { walkActionTree } from './walk';

interface ScriptHandleLike {
  id: string;
  [CLOSURE_INDEX]?: number;
}

function isScriptHandleLike(v: unknown): v is ScriptHandleLike {
  return typeof v === 'function' && v != null && 'id' in (v as object) &&
    typeof (v as { id?: unknown }).id === 'string';
}

/**
 * Walk an action tree and, for each `script_execute` whose corresponding
 * ScriptHandle in `refBindings` carries a `CLOSURE_INDEX`, patch it in.
 * Idempotent — safe to call repeatedly.
 */
export function resolveScriptHandleClosureIndex(
  actions: IRActionNode[],
  refBindings?: Record<string, unknown>,
): void {
  if (!refBindings) return;
  // Build the scriptId → handle index ONCE, then walk the tree.
  const byId = new Map<string, ScriptHandleLike>();
  for (const v of Object.values(refBindings)) {
    if (isScriptHandleLike(v)) byId.set(v.id, v);
  }
  if (byId.size === 0) return;

  walkActionTree(actions, (actions, i) => {
    const action = actions[i];
    if (action.kind === 'action:script_execute' && action.closureIndex === undefined) {
      const handle = byId.get(action.scriptId);
      if (handle && typeof handle[CLOSURE_INDEX] === 'number') {
        action.closureIndex = handle[CLOSURE_INDEX];
      }
      return i + 1;
    }
    return undefined;
  });
}

/**
 * Remove ScriptHandle entries from refBindings after IRScriptExecute patching.
 *
 * Like cleanOverlayControllerRefs, this prevents handle.toString() from
 * corrupting lambda string-replacement during the lowering phase.
 */
export function cleanScriptHandleRefs(
  refBindings: Record<string, unknown>,
): void {
  for (const key of Object.keys(refBindings)) {
    if (isScriptHandleLike(refBindings[key])) {
      delete refBindings[key];
    }
  }
}
