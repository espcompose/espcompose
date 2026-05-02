// ────────────────────────────────────────────────────────────────────────────
// IRExpression structural walkers — centralise child-access knowledge so that
// every tree-walking switch in the codebase doesn't have to enumerate all
// node kinds independently. When a new IRExpression variant is added to the
// union, only these two functions need updating — the exhaustive `never`
// default will produce a compile error everywhere else.
// ────────────────────────────────────────────────────────────────────────────

import type { IRExpression } from './expr-types';

/**
 * Return the direct child `IRExpression`s of a given node.
 *
 * Useful for fold / collect operations that only care about visiting every
 * sub-expression (e.g. collecting theme paths, gathering reactive sources).
 * Leaf nodes return an empty array.
 */
export function getExprChildren(node: IRExpression): IRExpression[] {
  switch (node.kind) {
    case 'expr:mux':
      return [node.index, ...node.cases];
    case 'expr:table_lookup':
      return [node.index];
    case 'expr:op':
      return [...node.children];
    // Leaf nodes — no child expressions
    case 'expr:literal':
    case 'expr:signal_read':
    case 'expr:memo_read':
    case 'expr:theme_read':
    case 'expr:entity_prop':
    case 'expr:global_read':
    case 'expr:component_read':
    case 'expr:trigger_var':
    case 'expr:slot':
      return [];
    default: {
      const _exhaustive: never = node;
      throw new Error(`getExprChildren: unhandled kind '${(_exhaustive as { kind: string }).kind}'`);
    }
  }
}

/**
 * Return a shallow copy of `node` with every child `IRExpression` replaced by
 * the result of calling `fn(child)`.
 *
 * Useful for transform / rewrite operations (e.g. slot resolution) that need
 * to produce a new tree. Leaf nodes are returned as-is (no copy).
 */
export function mapExprChildren(
  node: IRExpression,
  fn: (child: IRExpression) => IRExpression,
): IRExpression {
  switch (node.kind) {
    case 'expr:mux':
      return { ...node, index: fn(node.index), cases: node.cases.map(fn) };
    case 'expr:table_lookup':
      return { ...node, index: fn(node.index) };
    case 'expr:op':
      return { ...node, children: node.children.map(fn) };
    // Leaf nodes — return as-is
    case 'expr:literal':
    case 'expr:signal_read':
    case 'expr:memo_read':
    case 'expr:theme_read':
    case 'expr:entity_prop':
    case 'expr:global_read':
    case 'expr:component_read':
    case 'expr:trigger_var':
    case 'expr:slot':
      return node;
    default: {
      const _exhaustive: never = node;
      throw new Error(`mapExprChildren: unhandled kind '${(_exhaustive as { kind: string }).kind}'`);
    }
  }
}
