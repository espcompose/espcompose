// ────────────────────────────────────────────────────────────────────────────
// Statement-Level IR — Multi-statement blocks for reactive derivations.
//
// Target-agnostic: no C++, no JS. Each backend (esphome-target) lowers
// IRStatementBlock trees to its own target code.
//
// IRStatementBlock is intentionally separate from IRExpression — it is NOT
// part of the expression union. The two share a home on `exprIR` via a
// TypeScript union type.
// ────────────────────────────────────────────────────────────────────────────

import type { IRExpression, ExprType } from './expr-types.js';

// ── Assignment operators ─────────────────────────────────────────────────────

export type AssignOp = '=' | '+=' | '-=' | '*=' | '/=' | '%=';

// ── Statement node types ─────────────────────────────────────────────────────

export interface IRVarDeclStatement {
  readonly kind: 'stmt:var_decl';
  readonly name: string;
  readonly type: ExprType;
  readonly initializer: IRExpression;
}

export interface IRAssignStatement {
  readonly kind: 'stmt:assign';
  readonly target: string;
  readonly op: AssignOp;
  readonly value: IRExpression;
}

export interface IRIfStatement {
  readonly kind: 'stmt:if';
  readonly condition: IRExpression;
  readonly then: IRStatement[];
  readonly else?: IRStatement[];
}

export interface IRForRangeStatement {
  readonly kind: 'stmt:for_range';
  readonly varName: string;
  readonly start: IRExpression;
  readonly end: IRExpression;
  readonly body: IRStatement[];
}

export interface IRWhileStatement {
  readonly kind: 'stmt:while';
  readonly condition: IRExpression;
  readonly body: IRStatement[];
}

export interface IRReturnStatement {
  readonly kind: 'stmt:return';
  readonly value: IRExpression;
  readonly type: ExprType;
}

// ── Union type ───────────────────────────────────────────────────────────────

export type IRStatement =
  | IRVarDeclStatement
  | IRAssignStatement
  | IRIfStatement
  | IRForRangeStatement
  | IRWhileStatement
  | IRReturnStatement;

// ── Block type ───────────────────────────────────────────────────────────────

export interface IRStatementBlock {
  readonly kind: 'stmt:block';
  readonly statements: IRStatement[];
}
