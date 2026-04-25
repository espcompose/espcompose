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
    case 'binary':
      return [node.left, node.right];
    case 'unary':
    case 'postfix':
      return [node.operand];
    case 'ternary':
      return [node.test, node.consequent, node.alternate];
    case 'call':
      return [...node.args];
    case 'concat':
      return [...node.parts];
    case 'to_string':
    case 'group':
    case 'type_cast':
    case 'format_string':
      return [node.expr];
    case 'mux':
      return [node.index, ...node.cases];
    case 'table_lookup':
      return [node.index];
    case 'null_coalesce':
      return [node.left, node.right];
    case 'resolve_font':
      return [node.family, node.size];
    case 'string_method':
      return [node.object, ...node.args];
    case 'array_index':
      return [node.array, node.index];
    case 'array_method':
      return [node.object, ...node.args];
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
    case 'binary':
      return { ...node, left: fn(node.left), right: fn(node.right) };
    case 'unary':
    case 'postfix':
      return { ...node, operand: fn(node.operand) };
    case 'ternary':
      return { ...node, test: fn(node.test), consequent: fn(node.consequent), alternate: fn(node.alternate) };
    case 'call':
      return { ...node, args: node.args.map(fn) };
    case 'concat':
      return { ...node, parts: node.parts.map(fn) };
    case 'to_string':
    case 'group':
    case 'type_cast':
    case 'format_string':
      return { ...node, expr: fn(node.expr) };
    case 'mux':
      return { ...node, index: fn(node.index), cases: node.cases.map(fn) };
    case 'table_lookup':
      return { ...node, index: fn(node.index) };
    case 'null_coalesce':
      return { ...node, left: fn(node.left), right: fn(node.right) };
    case 'resolve_font':
      return { ...node, family: fn(node.family), size: fn(node.size) };
    case 'string_method':
      return { ...node, object: fn(node.object), args: node.args.map(fn) };
    case 'array_index':
      return { ...node, array: fn(node.array), index: fn(node.index) };
    case 'array_method':
      return { ...node, object: fn(node.object), args: node.args.map(fn) };
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
