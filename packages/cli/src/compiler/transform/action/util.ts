import ts from 'typescript';
import type { IRExprNode } from '@espcompose/core';
import type { ActionCompilerContext } from './context.js';
import { lookupBySymbol } from './context.js';

// ────────────────────────────────────────────────────────────────────────────
// Constants
// ────────────────────────────────────────────────────────────────────────────

/** Placeholder false literal for error recovery in control flow. */
export const FALSE_EXPR: IRExprNode = { kind: 'literal', value: false, type: 'bool' };

// ────────────────────────────────────────────────────────────────────────────
// Call-site helpers
// ────────────────────────────────────────────────────────────────────────────

export function resolveScriptCall(
  call: ts.CallExpression,
  ctx: ActionCompilerContext,
): string | null {
  if (ts.isIdentifier(call.expression)) {
    return lookupBySymbol(ctx.scriptHandles, call.expression, ctx.checker) ?? null;
  }
  return null;
}

export function getCallName(call: ts.CallExpression): string {
  if (ts.isIdentifier(call.expression)) {
    return call.expression.text;
  }
  if (ts.isPropertyAccessExpression(call.expression)) {
    if (ts.isIdentifier(call.expression.expression)) {
      return `${call.expression.expression.text}.${call.expression.name.text}`;
    }
    return call.expression.name.text;
  }
  return '<expression>';
}

// ────────────────────────────────────────────────────────────────────────────
// Value extraction helpers
// ────────────────────────────────────────────────────────────────────────────

export function extractDurationArg(node: ts.Expression): string | null {
  if (ts.isNumericLiteral(node)) {
    return `${node.text}ms`;
  }
  if (ts.isStringLiteral(node)) {
    return node.text;
  }
  return null;
}

export function extractReturnExpr(block: ts.Block): ts.Expression | null {
  if (block.statements.length === 1) {
    const stmt = block.statements[0];
    if (ts.isReturnStatement(stmt) && stmt.expression) {
      return stmt.expression;
    }
  }
  return null;
}
