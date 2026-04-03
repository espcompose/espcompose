// ────────────────────────────────────────────────────────────────────────────
// IR Tree Traversal — collect semantic nodes from the config tree
//
// Walks the SemanticIR config tree and collects all nodes of each semantic
// type. This is the canonical way for backends to extract reactive data,
// bindings, refs, actions, secrets, and trigger vars from the IR.
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

  for (const section of ir.esphome.sections) {
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
 * Walks the config tree and collects all ReactiveNode instances from
 * IRReactive value nodes. This is the canonical way to get reactive
 * nodes from a SemanticIR.
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
