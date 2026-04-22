import ts from 'typescript';
import type { IRActionNode, IRCondition } from '@espcompose/core/internals';
import {
  irIfAction,
  irWhileAction,
  irRepeatAction,
  irLambdaCondition,
} from '@espcompose/core/internals';
import {
  translateScriptExprIR,
  cppTypeToExprType,
  type GlobalExprInfo,
  type ScriptTransformContext,
} from '../expr-compiler.js';
import type { ActionCompilerContext } from './context.js';
import { emitError } from './context.js';
import { FALSE_EXPR } from './util.js';

// ────────────────────────────────────────────────────────────────────────────
// Script context builder
// ────────────────────────────────────────────────────────────────────────────

/**
 * Build a ScriptTransformContext from an ActionCompilerContext,
 * including the globalHandlesByName map so that global reads
 * (e.g. `counter.value`) are recognised in conditions and expressions.
 */
export function buildScriptCtxWithGlobals(ctx: ActionCompilerContext): ScriptTransformContext {
  const globalHandlesByName = new Map<string, GlobalExprInfo>();
  for (const [sym, gDef] of ctx.globalHandles) {
    const name = sym.getName();
    globalHandlesByName.set(name, { globalId: gDef.id, cppType: gDef.cppType, exprType: cppTypeToExprType(gDef.cppType) });
  }
  return {
    triggerParamName: ctx.triggerParamName,
    localVars: new Set(),
    globalHandlesByName,
  };
}

// ────────────────────────────────────────────────────────────────────────────
// Condition expression compilation
// ────────────────────────────────────────────────────────────────────────────

/**
 * Compile a TS boolean expression to an IRCondition.
 *
 * Uses the shared expr-compiler to produce a target-agnostic IRExprNode tree.
 */
export function compileConditionExpr(
  expr: ts.Expression,
  ctx: ActionCompilerContext,
): IRCondition | null {
  const scriptCtx = buildScriptCtxWithGlobals(ctx);

  const exprIR = translateScriptExprIR(expr, scriptCtx);
  if (exprIR === null) {
    emitError(expr, ctx,
      'Cannot compile condition expression. Only simple comparisons with ' +
      'literals, trigger variables, and ref properties are supported.');
    return null;
  }
  return irLambdaCondition(exprIR);
}

// ────────────────────────────────────────────────────────────────────────────
// Control flow compilation
// ────────────────────────────────────────────────────────────────────────────

export function compileIf(
  stmt: ts.IfStatement,
  ctx: ActionCompilerContext,
  compileStatementBody: (stmt: ts.Statement, ctx: ActionCompilerContext) => IRActionNode[],
): IRActionNode {
  const condition = compileConditionExpr(stmt.expression, ctx);
  if (!condition) {
    // If condition compilation failed, emit a placeholder with the error already reported
    return irIfAction(irLambdaCondition(FALSE_EXPR), []);
  }

  const thenActions = compileStatementBody(stmt.thenStatement, ctx);
  const elseActions = stmt.elseStatement
    ? compileStatementBody(stmt.elseStatement, ctx)
    : undefined;

  return irIfAction(condition, thenActions, elseActions);
}

export function compileWhile(
  stmt: ts.WhileStatement,
  ctx: ActionCompilerContext,
  compileStatementBody: (stmt: ts.Statement, ctx: ActionCompilerContext) => IRActionNode[],
): IRActionNode {
  const condition = compileConditionExpr(stmt.expression, ctx);
  if (!condition) {
    return irWhileAction(irLambdaCondition(FALSE_EXPR), []);
  }

  const bodyActions = compileStatementBody(stmt.statement, ctx);
  return irWhileAction(condition, bodyActions);
}

export function compileFor(
  stmt: ts.ForStatement,
  ctx: ActionCompilerContext,
  compileStatementBody: (stmt: ts.Statement, ctx: ActionCompilerContext) => IRActionNode[],
): IRActionNode | null {
  // Only support: for (let i = 0; i < N; i++)
  const countResult = matchCountedForLoop(stmt);
  if (!countResult) {
    emitError(stmt, ctx,
      'Only simple counted for-loops (for (let i = 0; i < N; i++)) are supported. ' +
      "ESPHome's repeat action requires a fixed count.");
    return null;
  }

  const bodyActions = compileStatementBody(stmt.statement, ctx);
  return irRepeatAction(countResult.count, bodyActions);
}

interface CountedForResult {
  varName: string;
  count: number;
}

/**
 * Match the pattern: for (let i = 0; i < N; i++) where N is a numeric literal.
 */
function matchCountedForLoop(stmt: ts.ForStatement): CountedForResult | null {
  // Initializer: let i = 0
  if (!stmt.initializer || !ts.isVariableDeclarationList(stmt.initializer)) return null;
  if (stmt.initializer.declarations.length !== 1) return null;

  const decl = stmt.initializer.declarations[0];
  if (!ts.isIdentifier(decl.name)) return null;
  if (!decl.initializer || !ts.isNumericLiteral(decl.initializer) || decl.initializer.text !== '0') return null;

  const varName = decl.name.text;

  // Condition: i < N
  if (!stmt.condition || !ts.isBinaryExpression(stmt.condition)) return null;
  if (stmt.condition.operatorToken.kind !== ts.SyntaxKind.LessThanToken) return null;
  if (!ts.isIdentifier(stmt.condition.left) || stmt.condition.left.text !== varName) return null;
  if (!ts.isNumericLiteral(stmt.condition.right)) return null;

  const count = parseInt(stmt.condition.right.text, 10);
  if (isNaN(count) || count <= 0) return null;

  // Incrementor: i++
  if (!stmt.incrementor) return null;
  if (ts.isPostfixUnaryExpression(stmt.incrementor)) {
    if (stmt.incrementor.operator !== ts.SyntaxKind.PlusPlusToken) return null;
    if (!ts.isIdentifier(stmt.incrementor.operand) || stmt.incrementor.operand.text !== varName) return null;
  } else if (ts.isPrefixUnaryExpression(stmt.incrementor)) {
    if (stmt.incrementor.operator !== ts.SyntaxKind.PlusPlusToken) return null;
    if (!ts.isIdentifier(stmt.incrementor.operand) || stmt.incrementor.operand.text !== varName) return null;
  } else {
    return null;
  }

  return { varName, count };
}
