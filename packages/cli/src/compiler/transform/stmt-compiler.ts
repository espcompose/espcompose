/**
 * Statement Block Compiler — TypeScript AST → IRStatementBlock
 *
 * Compiles multi-statement arrow function bodies (from useMemo) into
 * IRStatementBlock nodes. Handles variable declarations, assignments,
 * if/else, counted for-loops, while loops, and return statements.
 *
 * Delegates expression compilation to the shared compileExprIR function.
 */

import ts from 'typescript';
import type { ExprType, IRExpression, IRFunctionExpression, IRStatement, AssignOp } from '@espcompose/core/internals';
import { irVarDeclStatement, irAssignStatement, irIfStatement, irForRangeStatement, irWhileStatement, irReturnStatement, irStatementBlock, irFunctionExpression } from '@espcompose/core/internals';
import type { ExprCompilerContext, DependencyInfo, HAEntityInfo, GlobalExprInfo } from './expr-compiler.js';
import { compileExprIR, inferExprType } from './expr-compiler.js';

// ── Public result type ───────────────────────────────────────────────────────

export interface StatementBlockResult {
  expr: IRFunctionExpression;
  deps: DependencyInfo[];
}

// ── Statement compiler context ───────────────────────────────────────────────

interface StmtCompilerContext {
  checker: ts.TypeChecker;
  haEntities: Map<ts.Symbol, HAEntityInfo>;
  globals: Map<ts.Symbol, GlobalExprInfo>;
  dependencies: Map<string, DependencyInfo>;
  localVars: Map<ts.Symbol, { name: string; type: ExprType }>;
}

// ── Public entry point ───────────────────────────────────────────────────────

/**
 * Compile a block body (from a useMemo arrow function) into an IRFunctionExpression.
 *
 * Returns null if the body contains unsupported patterns.
 * The last statement MUST be a return statement.
 *
 * @param returnType — The return type of the enclosing function, derived from
 *   the TS checker's signature analysis (not inferred from statements).
 */
export function compileStatementBlockIR(
  body: ts.Block,
  checker: ts.TypeChecker,
  haEntities: Map<ts.Symbol, HAEntityInfo>,
  globals: Map<ts.Symbol, GlobalExprInfo>,
  returnType: ExprType,
): StatementBlockResult | null {
  const ctx: StmtCompilerContext = {
    checker,
    haEntities,
    globals,
    dependencies: new Map(),
    localVars: new Map(),
  };

  const statements = compileStatements(body.statements, ctx);
  if (statements === null) return null;

  // Validate: last statement must be a return
  if (statements.length === 0) return null;
  const last = statements[statements.length - 1];
  if (last.kind !== 'stmt:return') return null;

  return {
    expr: irFunctionExpression(irStatementBlock(statements), returnType),
    deps: Array.from(ctx.dependencies.values()),
  };
}

// ── Statement list compiler ──────────────────────────────────────────────────

function compileStatements(
  stmts: ts.NodeArray<ts.Statement> | ts.Statement[],
  ctx: StmtCompilerContext,
): IRStatement[] | null {
  const result: IRStatement[] = [];
  for (const stmt of stmts) {
    const compiled = compileStatement(stmt, ctx);
    if (compiled === null) return null;
    result.push(...compiled);
  }
  return result;
}

// ── Single statement compiler ────────────────────────────────────────────────

function compileStatement(
  stmt: ts.Statement,
  ctx: StmtCompilerContext,
): IRStatement[] | null {
  if (ts.isVariableStatement(stmt)) {
    return compileVariableStatement(stmt, ctx);
  }

  if (ts.isExpressionStatement(stmt)) {
    return compileExpressionStatement(stmt, ctx);
  }

  if (ts.isIfStatement(stmt)) {
    return compileIfStatement(stmt, ctx);
  }

  if (ts.isForStatement(stmt)) {
    return compileForStatement(stmt, ctx);
  }

  if (ts.isWhileStatement(stmt)) {
    return compileWhileStatement(stmt, ctx);
  }

  if (ts.isReturnStatement(stmt)) {
    return compileReturnStatement(stmt, ctx);
  }

  // Unsupported statement type
  return null;
}

// ── Variable declaration ─────────────────────────────────────────────────────

function compileVariableStatement(
  stmt: ts.VariableStatement,
  ctx: StmtCompilerContext,
): IRStatement[] | null {
  const result: IRStatement[] = [];
  for (const decl of stmt.declarationList.declarations) {
    if (!ts.isIdentifier(decl.name)) return null; // destructuring not supported
    if (!decl.initializer) return null; // must have initializer

    const name = decl.name.text;
    const sym = ctx.checker.getSymbolAtLocation(decl.name);
    if (!sym) return null;

    // Compile initializer expression
    const initExpr = compileExprInStmtContext(decl.initializer, ctx);
    if (initExpr === null) return null;

    // Infer type from the initializer
    const type = inferExprTypeInStmtContext(decl.initializer, ctx);

    // Register local variable for future expression resolution
    ctx.localVars.set(sym, { name, type });

    result.push(irVarDeclStatement(name, type, initExpr));
  }
  return result;
}

// ── Expression statement (assignments) ───────────────────────────────────────

function compileExpressionStatement(
  stmt: ts.ExpressionStatement,
  ctx: StmtCompilerContext,
): IRStatement[] | null {
  const expr = stmt.expression;

  // Assignment expression: target op= value
  if (ts.isBinaryExpression(expr)) {
    const op = translateAssignOp(expr.operatorToken.kind);
    if (op === null) return null;

    // Target must be an identifier (local variable)
    if (!ts.isIdentifier(expr.left)) return null;
    const target = expr.left.text;

    // Verify target is a known local variable
    const sym = ctx.checker.getSymbolAtLocation(expr.left);
    if (!sym || !ctx.localVars.has(sym)) return null;

    const value = compileExprInStmtContext(expr.right, ctx);
    if (value === null) return null;

    return [irAssignStatement(target, op, value)];
  }

  // Prefix/postfix increment/decrement
  if (ts.isPrefixUnaryExpression(expr) || ts.isPostfixUnaryExpression(expr)) {
    const operand = ts.isPrefixUnaryExpression(expr) ? expr.operand : expr.operand;
    if (!ts.isIdentifier(operand)) return null;
    const target = operand.text;
    const sym = ctx.checker.getSymbolAtLocation(operand);
    if (!sym || !ctx.localVars.has(sym)) return null;

    const operator = ts.isPrefixUnaryExpression(expr) ? expr.operator : expr.operator;
    if (operator === ts.SyntaxKind.PlusPlusToken) {
      const one: IRExpression = { kind: 'expr:literal', value: 1, type: 'int' };
      return [irAssignStatement(target, '+=', one)];
    } else if (operator === ts.SyntaxKind.MinusMinusToken) {
      const one: IRExpression = { kind: 'expr:literal', value: 1, type: 'int' };
      return [irAssignStatement(target, '-=', one)];
    }
  }

  return null;
}

// ── If/else statement ────────────────────────────────────────────────────────

function compileIfStatement(
  stmt: ts.IfStatement,
  ctx: StmtCompilerContext,
): IRStatement[] | null {
  const condition = compileExprInStmtContext(stmt.expression, ctx);
  if (condition === null) return null;

  // then branch
  const thenStmts = compileBlock(stmt.thenStatement, ctx);
  if (thenStmts === null) return null;

  // else branch (optional)
  let elseStmts: IRStatement[] | undefined;
  if (stmt.elseStatement) {
    const compiled = compileBlock(stmt.elseStatement, ctx);
    if (compiled === null) return null;
    elseStmts = compiled;
  }

  return [irIfStatement(condition, thenStmts, elseStmts)];
}

// ── For statement (counted pattern only) ─────────────────────────────────────

function compileForStatement(
  stmt: ts.ForStatement,
  ctx: StmtCompilerContext,
): IRStatement[] | null {
  // Pattern: for (let i = start; i < end; i++)
  if (!stmt.initializer || !stmt.condition || !stmt.incrementor) return null;

  // Initializer: must be `let varName = startExpr`
  if (!ts.isVariableDeclarationList(stmt.initializer)) return null;
  if (stmt.initializer.declarations.length !== 1) return null;
  const decl = stmt.initializer.declarations[0];
  if (!ts.isIdentifier(decl.name) || !decl.initializer) return null;
  const varName = decl.name.text;
  const declSym = ctx.checker.getSymbolAtLocation(decl.name);
  if (!declSym) return null;

  // Register loop variable
  ctx.localVars.set(declSym, { name: varName, type: 'int' });

  const startExpr = compileExprInStmtContext(decl.initializer, ctx);
  if (startExpr === null) return null;

  // Condition: must be `i < endExpr`
  if (!ts.isBinaryExpression(stmt.condition)) return null;
  if (stmt.condition.operatorToken.kind !== ts.SyntaxKind.LessThanToken) return null;
  if (!ts.isIdentifier(stmt.condition.left) || stmt.condition.left.text !== varName) return null;
  const endExpr = compileExprInStmtContext(stmt.condition.right, ctx);
  if (endExpr === null) return null;

  // Incrementor: must be `i++` or `i += 1`
  if (!isIncrementOf(stmt.incrementor, varName)) return null;

  // Body
  const body = compileBlock(stmt.statement, ctx);
  if (body === null) return null;

  return [irForRangeStatement(varName, startExpr, endExpr, body)];
}

// ── While statement ──────────────────────────────────────────────────────────

function compileWhileStatement(
  stmt: ts.WhileStatement,
  ctx: StmtCompilerContext,
): IRStatement[] | null {
  const condition = compileExprInStmtContext(stmt.expression, ctx);
  if (condition === null) return null;

  const body = compileBlock(stmt.statement, ctx);
  if (body === null) return null;

  return [irWhileStatement(condition, body)];
}

// ── Return statement ─────────────────────────────────────────────────────────

function compileReturnStatement(
  stmt: ts.ReturnStatement,
  ctx: StmtCompilerContext,
): IRStatement[] | null {
  if (!stmt.expression) return null;

  const value = compileExprInStmtContext(stmt.expression, ctx);
  if (value === null) return null;

  const type = inferExprTypeInStmtContext(stmt.expression, ctx);

  return [irReturnStatement(value, type)];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Compile a block or single statement into a statement list.
 */
function compileBlock(
  stmt: ts.Statement,
  ctx: StmtCompilerContext,
): IRStatement[] | null {
  if (ts.isBlock(stmt)) {
    return compileStatements(stmt.statements, ctx);
  }
  // Single statement (e.g. `if (x) y++;`)
  return compileStatement(stmt, ctx);
}

/**
 * Build an ExprCompilerContext from the statement context and compile an expression.
 */
function compileExprInStmtContext(
  node: ts.Expression,
  ctx: StmtCompilerContext,
): IRExpression | null {
  const exprCtx: ExprCompilerContext = {
    checker: ctx.checker,
    haEntities: ctx.haEntities,
    globals: ctx.globals,
    dependencies: ctx.dependencies,
    slots: [],
    localVars: ctx.localVars,
  };
  return compileExprIR(node, exprCtx);
}

/**
 * Infer the ExprType of an expression in statement context.
 */
function inferExprTypeInStmtContext(
  node: ts.Expression,
  ctx: StmtCompilerContext,
): ExprType {
  const exprCtx: ExprCompilerContext = {
    checker: ctx.checker,
    haEntities: ctx.haEntities,
    globals: ctx.globals,
    dependencies: ctx.dependencies,
    slots: [],
    localVars: ctx.localVars,
  };
  return inferExprType(node, exprCtx);
}

/**
 * Translate a TS assignment operator token to an AssignOp.
 */
function translateAssignOp(kind: ts.SyntaxKind): AssignOp | null {
  switch (kind) {
    case ts.SyntaxKind.EqualsToken: return '=';
    case ts.SyntaxKind.PlusEqualsToken: return '+=';
    case ts.SyntaxKind.MinusEqualsToken: return '-=';
    case ts.SyntaxKind.AsteriskEqualsToken: return '*=';
    case ts.SyntaxKind.SlashEqualsToken: return '/=';
    case ts.SyntaxKind.PercentEqualsToken: return '%=';
    default: return null;
  }
}

/**
 * Check if an expression is `varName++` or `varName += 1`.
 */
function isIncrementOf(expr: ts.Expression, varName: string): boolean {
  // i++
  if (ts.isPostfixUnaryExpression(expr) &&
      expr.operator === ts.SyntaxKind.PlusPlusToken &&
      ts.isIdentifier(expr.operand) &&
      expr.operand.text === varName) {
    return true;
  }
  // ++i
  if (ts.isPrefixUnaryExpression(expr) &&
      expr.operator === ts.SyntaxKind.PlusPlusToken &&
      ts.isIdentifier(expr.operand) &&
      expr.operand.text === varName) {
    return true;
  }
  // i += 1
  if (ts.isBinaryExpression(expr) &&
      expr.operatorToken.kind === ts.SyntaxKind.PlusEqualsToken &&
      ts.isIdentifier(expr.left) &&
      expr.left.text === varName &&
      ts.isNumericLiteral(expr.right) &&
      expr.right.text === '1') {
    return true;
  }
  return false;
}
