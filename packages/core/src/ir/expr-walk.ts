// ────────────────────────────────────────────────────────────────────────────
// IRExprNode structural walkers — centralise child-access knowledge so that
// every tree-walking switch in the codebase doesn't have to enumerate all
// node kinds independently. When a new IRExprNode variant is added to the
// union, only these two functions need updating — the exhaustive `never`
// default will produce a compile error everywhere else.
// ────────────────────────────────────────────────────────────────────────────

import type { IRExprNode } from './expr-types';

/**
 * Return the direct child `IRExprNode`s of a given node.
 *
 * Useful for fold / collect operations that only care about visiting every
 * sub-expression (e.g. collecting theme paths, gathering reactive sources).
 * Leaf nodes return an empty array.
 */
export function getExprChildren(node: IRExprNode): IRExprNode[] {
  switch (node.kind) {
    case 'mux':
      return [node.index, ...node.cases];
    case 'table_lookup':
      return [node.index];
    case 'op':
      return [...node.children];
    // Leaf nodes — no child expressions
    case 'literal':
    case 'signal_read':
    case 'memo_read':
    case 'theme_read':
    case 'entity_prop':
    case 'global_read':
    case 'component_read':
    case 'trigger_var':
    case 'slot':
      return [];
    default: {
      const _exhaustive: never = node;
      throw new Error(`getExprChildren: unhandled kind '${(_exhaustive as { kind: string }).kind}'`);
    }
  }
}

/**
 * Return a shallow copy of `node` with every child `IRExprNode` replaced by
 * the result of calling `fn(child)`.
 *
 * Useful for transform / rewrite operations (e.g. slot resolution) that need
 * to produce a new tree. Leaf nodes are returned as-is (no copy).
 */
export function mapExprChildren(
  node: IRExprNode,
  fn: (child: IRExprNode) => IRExprNode,
): IRExprNode {
  switch (node.kind) {
    case 'mux':
      return { ...node, index: fn(node.index), cases: node.cases.map(fn) };
    case 'table_lookup':
      return { ...node, index: fn(node.index) };
    case 'op':
      return { ...node, children: node.children.map(fn) };
    // Leaf nodes — return as-is
    case 'literal':
    case 'signal_read':
    case 'memo_read':
    case 'theme_read':
    case 'entity_prop':
    case 'global_read':
    case 'component_read':
    case 'trigger_var':
    case 'slot':
      return node;
    default: {
      const _exhaustive: never = node;
      throw new Error(`mapExprChildren: unhandled kind '${(_exhaustive as { kind: string }).kind}'`);
    }
  }
}
