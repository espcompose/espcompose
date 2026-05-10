// ────────────────────────────────────────────────────────────────────────────
// walkActionTree — shared structural traversal for IRActionNode trees
//
// Every resolve pass needs to recurse into if/while/repeat branches.
// This utility extracts that boilerplate so each resolver only provides
// a visitor for the leaf actions it cares about.
// ────────────────────────────────────────────────────────────────────────────

import type { IRActionNode } from '../../ir/action-types';

/**
 * Visitor callback for `walkActionTree`.
 *
 * Called for every action node in the tree. The visitor receives the
 * mutable `actions` array and the current index `i`.
 *
 * Return value:
 * - `undefined` — visitor did not handle this action; the walker will
 *   recurse into structural children (if/while/repeat branches).
 * - A `number` — the next index to process. The visitor has handled
 *   this action (and possibly mutated the array). Examples:
 *   - `i + 1`: in-place mutation or replacement, advance normally
 *   - `i`: splice-and-revisit (e.g. replaced 1 node with N, need to
 *     re-visit from the same position)
 *   - `i + 2`: splice that inserted 2 new nodes, skip both
 */
export type ActionVisitor = (actions: IRActionNode[], i: number) => number | undefined;

/**
 * Walk an IRActionNode tree, calling `visitor` on each node.
 *
 * The walker handles structural recursion into `if` (then/else),
 * `while`, and `repeat` branches automatically when the visitor
 * returns `undefined`.
 */
export function walkActionTree(
  actions: IRActionNode[],
  visitor: ActionVisitor,
): void {
  for (let i = 0; i < actions.length;) {
    const next = visitor(actions, i);
    if (next !== undefined) {
      i = next;
      continue;
    }

    const action = actions[i];
    if (action.kind === 'action:if') {
      walkActionTree(action.then, visitor);
      if (action.else) walkActionTree(action.else, visitor);
    } else if (action.kind === 'action:while' || action.kind === 'action:repeat') {
      walkActionTree(action.then, visitor);
    }
    i++;
  }
}
