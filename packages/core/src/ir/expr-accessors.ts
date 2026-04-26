import type { IRExprOp, IRExprNode, ExprOpDescriptor } from './expr-types.js';

// ── Typed child accessors ────────────────────────────────────────────────────
// Each accessor asserts the expected op tag(s) and returns the named child.
// Throws on misuse — these are boundary checks, not runtime validation.

function assertOp(node: IRExprOp, ...tags: ExprOpDescriptor['tag'][]): void {
  if (!tags.includes(node.op.tag)) {
    throw new Error(`Expected op tag ${tags.join('|')}, got '${node.op.tag}'`);
  }
}

// ── Single-child ops ─────────────────────────────────────────────────────────

/** The single operand of unary / postfix ops. */
export function operandOf(node: IRExprOp): IRExprNode {
  assertOp(node, 'unary', 'postfix');
  return node.children[0]!;
}

/** The single expression of to_string / group / type_cast / format_string. */
export function exprOf(node: IRExprOp): IRExprNode {
  assertOp(node, 'to_string', 'group', 'type_cast', 'format_string');
  return node.children[0]!;
}

// ── Two-child ops ────────────────────────────────────────────────────────────

/** Left operand of binary / null_coalesce. */
export function leftOf(node: IRExprOp): IRExprNode {
  assertOp(node, 'binary', 'null_coalesce');
  return node.children[0]!;
}

/** Right operand of binary / null_coalesce. */
export function rightOf(node: IRExprOp): IRExprNode {
  assertOp(node, 'binary', 'null_coalesce');
  return node.children[1]!;
}

// ── Ternary ──────────────────────────────────────────────────────────────────

export function testOf(node: IRExprOp): IRExprNode {
  assertOp(node, 'ternary');
  return node.children[0]!;
}

export function consequentOf(node: IRExprOp): IRExprNode {
  assertOp(node, 'ternary');
  return node.children[1]!;
}

export function alternateOf(node: IRExprOp): IRExprNode {
  assertOp(node, 'ternary');
  return node.children[2]!;
}

// ── N-child ops ──────────────────────────────────────────────────────────────

/** All args of a call op. */
export function argsOf(node: IRExprOp): readonly IRExprNode[] {
  assertOp(node, 'call');
  return node.children;
}

/** All parts of a concat op. */
export function partsOf(node: IRExprOp): readonly IRExprNode[] {
  assertOp(node, 'concat');
  return node.children;
}

// ── Method / index ops (children[0] = object/array, rest = args) ────────────

/** The receiver object of string_method / array_method. */
export function objectOf(node: IRExprOp): IRExprNode {
  assertOp(node, 'string_method', 'array_method');
  return node.children[0]!;
}

/** The method args (everything after the receiver) for string_method / array_method. */
export function methodArgsOf(node: IRExprOp): readonly IRExprNode[] {
  assertOp(node, 'string_method', 'array_method');
  return node.children.slice(1);
}

/** The array expression in array_index. */
export function arrayOf(node: IRExprOp): IRExprNode {
  assertOp(node, 'array_index');
  return node.children[0]!;
}

/** The index expression in array_index. */
export function indexOf(node: IRExprOp): IRExprNode {
  assertOp(node, 'array_index');
  return node.children[1]!;
}
