import type {
  IROpExpression,
  IRExpression,
  IRLiteralExpression,
  IRLocalVarExpression,
  IRGlobalReadExpression,
  IRFunctionExpression,
  IRTriggerVarExpression,
  BinaryOp,
  UnaryOp,
  PostfixOp,
  BuiltinFn,
  ExprType,
  StringMethod,
  ArrayMethod,
} from './expr-types.js';
import type { IRStatementBlock } from './stmt-types.js';

/** Infer the ExprType of a JS literal value. Integers vs floats are distinguished. */
export function inferLiteralExprType(value: string | number | boolean): ExprType {
  if (typeof value === 'string') return 'string';
  if (typeof value === 'boolean') return 'bool';
  return Number.isInteger(value) ? 'int' : 'float';
}

/** Construct an IRLiteralExpression, inferring `type` from the JS value. */
export function irLiteralExpression(value: string | number | boolean, type?: ExprType): IRLiteralExpression {
  return { kind: 'expr:literal', value, type: type ?? inferLiteralExprType(value) };
}

/** Construct an IRTriggerVarExpression for a trigger/script local variable name. */
export function irTriggerVarExpression(name: string): IRTriggerVarExpression {
  return { kind: 'expr:trigger_var', name };
}

/** Construct an IRLocalVarExpression for a statement-block local variable. */
export function irLocalVarExpression(name: string, type: ExprType): IRLocalVarExpression {
  return { kind: 'expr:local_var', name, type };
}

/** Construct an IRGlobalReadExpression for reading a global variable. */
export function irGlobalRead(globalId: string, type: ExprType): IRGlobalReadExpression {
  return { kind: 'expr:global_read', globalId, type };
}

/** Construct an IRFunctionExpression wrapping a statement block with a return type. */
export function irFunctionExpression(body: IRStatementBlock, returnType: ExprType): IRFunctionExpression {
  return { kind: 'expr:function', body, returnType };
}

// ── Builder functions ────────────────────────────────────────────────────────
// Each returns an `IROpExpression` node with the appropriate `ExprOpDescriptor`.
// Children are positional — use the companion accessors in `expr-accessors.ts`
// to read them back by name.

export function irBinary(op: BinaryOp, left: IRExpression, right: IRExpression): IROpExpression {
  return { kind: 'expr:op', op: { tag: 'binary', op }, children: [left, right] };
}

export function irUnary(op: UnaryOp, operand: IRExpression): IROpExpression {
  return { kind: 'expr:op', op: { tag: 'unary', op }, children: [operand] };
}

export function irPostfix(op: PostfixOp, operand: IRExpression): IROpExpression {
  return { kind: 'expr:op', op: { tag: 'postfix', op }, children: [operand] };
}

export function irTernary(test: IRExpression, consequent: IRExpression, alternate: IRExpression): IROpExpression {
  return { kind: 'expr:op', op: { tag: 'ternary' }, children: [test, consequent, alternate] };
}

export function irCall(fn: BuiltinFn, args: IRExpression[]): IROpExpression {
  return { kind: 'expr:op', op: { tag: 'call', fn }, children: args };
}

export function irConcat(parts: IRExpression[]): IROpExpression {
  return { kind: 'expr:op', op: { tag: 'concat' }, children: parts };
}

export function irToString(expr: IRExpression, format?: string): IROpExpression {
  return { kind: 'expr:op', op: { tag: 'to_string', format }, children: [expr] };
}

export function irGroup(expr: IRExpression): IROpExpression {
  return { kind: 'expr:op', op: { tag: 'group' }, children: [expr] };
}

export function irTypeCast(expr: IRExpression, fromType: ExprType, toType: ExprType): IROpExpression {
  return { kind: 'expr:op', op: { tag: 'type_cast', fromType, toType }, children: [expr] };
}

export function irFormatString(expr: IRExpression, format: string): IROpExpression {
  return { kind: 'expr:op', op: { tag: 'format_string', format }, children: [expr] };
}

export function irNullCoalesce(left: IRExpression, right: IRExpression, type: ExprType): IROpExpression {
  return { kind: 'expr:op', op: { tag: 'null_coalesce', type }, children: [left, right] };
}

export function irStringMethod(method: StringMethod, object: IRExpression, args: IRExpression[]): IROpExpression {
  return { kind: 'expr:op', op: { tag: 'string_method', method }, children: [object, ...args] };
}

export function irArrayIndex(array: IRExpression, index: IRExpression, elementType: ExprType): IROpExpression {
  return { kind: 'expr:op', op: { tag: 'array_index', elementType }, children: [array, index] };
}

export function irArrayMethod(method: ArrayMethod, object: IRExpression, args: IRExpression[], elementType: ExprType): IROpExpression {
  return { kind: 'expr:op', op: { tag: 'array_method', method, elementType }, children: [object, ...args] };
}
