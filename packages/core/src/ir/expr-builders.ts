import type {
  IRExprOp,
  IRExprNode,
  BinaryOp,
  UnaryOp,
  PostfixOp,
  BuiltinFn,
  ExprType,
  StringMethod,
  ArrayMethod,
} from './expr-types.js';

// ── Builder functions ────────────────────────────────────────────────────────
// Each returns an `IRExprOp` node with the appropriate `ExprOpDescriptor`.
// Children are positional — use the companion accessors in `expr-accessors.ts`
// to read them back by name.

export function irBinary(op: BinaryOp, left: IRExprNode, right: IRExprNode): IRExprOp {
  return { kind: 'op', op: { tag: 'binary', op }, children: [left, right] };
}

export function irUnary(op: UnaryOp, operand: IRExprNode): IRExprOp {
  return { kind: 'op', op: { tag: 'unary', op }, children: [operand] };
}

export function irPostfix(op: PostfixOp, operand: IRExprNode): IRExprOp {
  return { kind: 'op', op: { tag: 'postfix', op }, children: [operand] };
}

export function irTernary(test: IRExprNode, consequent: IRExprNode, alternate: IRExprNode): IRExprOp {
  return { kind: 'op', op: { tag: 'ternary' }, children: [test, consequent, alternate] };
}

export function irCall(fn: BuiltinFn, args: IRExprNode[]): IRExprOp {
  return { kind: 'op', op: { tag: 'call', fn }, children: args };
}

export function irConcat(parts: IRExprNode[]): IRExprOp {
  return { kind: 'op', op: { tag: 'concat' }, children: parts };
}

export function irToString(expr: IRExprNode, format?: string): IRExprOp {
  return { kind: 'op', op: { tag: 'to_string', format }, children: [expr] };
}

export function irGroup(expr: IRExprNode): IRExprOp {
  return { kind: 'op', op: { tag: 'group' }, children: [expr] };
}

export function irTypeCast(expr: IRExprNode, fromType: ExprType, toType: ExprType): IRExprOp {
  return { kind: 'op', op: { tag: 'type_cast', fromType, toType }, children: [expr] };
}

export function irFormatString(expr: IRExprNode, format: string): IRExprOp {
  return { kind: 'op', op: { tag: 'format_string', format }, children: [expr] };
}

export function irNullCoalesce(left: IRExprNode, right: IRExprNode, type: ExprType): IRExprOp {
  return { kind: 'op', op: { tag: 'null_coalesce', type }, children: [left, right] };
}

export function irStringMethod(method: StringMethod, object: IRExprNode, args: IRExprNode[]): IRExprOp {
  return { kind: 'op', op: { tag: 'string_method', method }, children: [object, ...args] };
}

export function irArrayIndex(array: IRExprNode, index: IRExprNode, elementType: ExprType): IRExprOp {
  return { kind: 'op', op: { tag: 'array_index', elementType }, children: [array, index] };
}

export function irArrayMethod(method: ArrayMethod, object: IRExprNode, args: IRExprNode[], elementType: ExprType): IRExprOp {
  return { kind: 'op', op: { tag: 'array_method', method, elementType }, children: [object, ...args] };
}
