// ────────────────────────────────────────────────────────────────────────────
// IR Tree Traversal — collect semantic nodes from the config tree
//
// Walks the SemanticIR config tree and collects all nodes of each semantic
// type. This is the foundation for backends to derive reactive data directly
// from the IR instead of from side-channel arrays.
//
// Provides validation: collectFromIR() results can be compared against
// the side-channel arrays (ir.reactiveNodes, ir.bindings, ir.entities)
// to prove the IR tree is complete and no captures were missed.
// ────────────────────────────────────────────────────────────────────────────

import type { ReactiveNode } from '../reactive-node';
import type { ReactiveBinding } from '../hooks/useReactiveScope';
import type { SemanticIR, IRValue, IRReactive, IRRef, IRAction, IRSecret, IRTriggerVar } from './types';

// ────────────────────────────────────────────────────────────────────────────
// Collected data from an IR tree walk
// ────────────────────────────────────────────────────────────────────────────

export interface IRTreeCollected {
  /** All IRReactive nodes found in the config tree. */
  reactives: IRReactive[];
  /** All IRRef nodes found in the config tree. */
  refs: IRRef[];
  /** All IRAction nodes found in the config tree. */
  actions: IRAction[];
  /** All IRSecret nodes found in the config tree. */
  secrets: IRSecret[];
  /** All IRTriggerVar nodes found in the config tree. */
  triggerVars: IRTriggerVar[];
}

// ────────────────────────────────────────────────────────────────────────────
// Tree walker
// ────────────────────────────────────────────────────────────────────────────

function walkValue(node: IRValue, collected: IRTreeCollected): void {
  switch (node.kind) {
    case 'reactive':
      collected.reactives.push(node as IRReactive);
      break;
    case 'ref':
      collected.refs.push(node as IRRef);
      break;
    case 'action':
      collected.actions.push(node as IRAction);
      break;
    case 'secret':
      collected.secrets.push(node as IRSecret);
      break;
    case 'trigger_var':
      collected.triggerVars.push(node as IRTriggerVar);
      break;
    case 'object':
      for (const entry of node.entries) {
        walkValue(entry.value, collected);
      }
      break;
    case 'array':
      for (const item of node.items) {
        walkValue(item, collected);
      }
      break;
    // scalar, null — no children to walk
  }
}

/**
 * Walk the IR config tree and collect all semantic nodes.
 */
export function collectFromIR(ir: SemanticIR): IRTreeCollected {
  const collected: IRTreeCollected = {
    reactives: [],
    refs: [],
    actions: [],
    secrets: [],
    triggerVars: [],
  };

  for (const section of ir.sections) {
    walkValue(section.value, collected);
  }

  return collected;
}

// ────────────────────────────────────────────────────────────────────────────
// Derived data — extract what buildRuntimeConfig needs from the tree
// ────────────────────────────────────────────────────────────────────────────

/**
 * Extract ReactiveNode[] from the IR tree's IRReactive nodes.
 *
 * This gives the same set of nodes as ir.reactiveNodes — the memo and
 * effect nodes registered during the render pass. Expression-kind nodes
 * (from HA entity bindings) are accessible via IRReactive.node but are
 * NOT in ir.reactiveNodes (they live only in bindings[].expression).
 *
 * Note: ir.reactiveNodes contains ALL memo/effect nodes created during
 * render (including ones that may not appear in the config tree, e.g.
 * nodes created in hooks that were conditionally excluded). The tree
 * walk only finds nodes that made it into the final config. For
 * validation, compare the tree-derived nodes against ir.bindings
 * (which is the authoritative source for widget↔node connections).
 */
export function collectReactiveNodes(ir: SemanticIR): ReactiveNode[] {
  const collected = collectFromIR(ir);
  return collected.reactives.map(r => r.node);
}

/**
 * Extract ReactiveBinding[] from the IR tree's IRReactive nodes.
 *
 * Only returns bindings for IRReactive nodes that have a binding
 * attached (i.e., nodes that are bound to a specific widget prop).
 */
export function collectBindings(ir: SemanticIR): ReactiveBinding[] {
  const collected = collectFromIR(ir);
  return collected.reactives
    .filter(r => r.binding != null)
    .map(r => r.binding!);
}
