// ────────────────────────────────────────────────────────────────────────────
// Statement IR — Builder functions
// ────────────────────────────────────────────────────────────────────────────

import type { IRExpression, ExprType } from './expr-types.js';
import type {
  AssignOp,
  IRVarDeclStatement,
  IRAssignStatement,
  IRIfStatement,
  IRForRangeStatement,
  IRWhileStatement,
  IRReturnStatement,
  IRStatement,
  IRStatementBlock,
} from './stmt-types.js';

export function irVarDeclStatement(name: string, type: ExprType, initializer: IRExpression): IRVarDeclStatement {
  return { kind: 'stmt:var_decl', name, type, initializer };
}

export function irAssignStatement(target: string, op: AssignOp, value: IRExpression): IRAssignStatement {
  return { kind: 'stmt:assign', target, op, value };
}

export function irIfStatement(condition: IRExpression, then: IRStatement[], elseBlock?: IRStatement[]): IRIfStatement {
  const node: IRIfStatement = { kind: 'stmt:if', condition, then };
  if (elseBlock) {
    return { ...node, else: elseBlock };
  }
  return node;
}

export function irForRangeStatement(varName: string, start: IRExpression, end: IRExpression, body: IRStatement[]): IRForRangeStatement {
  return { kind: 'stmt:for_range', varName, start, end, body };
}

export function irWhileStatement(condition: IRExpression, body: IRStatement[]): IRWhileStatement {
  return { kind: 'stmt:while', condition, body };
}

export function irReturnStatement(value: IRExpression, type: ExprType): IRReturnStatement {
  return { kind: 'stmt:return', value, type };
}

export function irStatementBlock(statements: IRStatement[]): IRStatementBlock {
  return { kind: 'stmt:block', statements };
}
