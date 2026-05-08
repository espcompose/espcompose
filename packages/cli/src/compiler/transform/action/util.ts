import ts from 'typescript';
import type { IRExpression } from '@espcompose/core/internals';
import type { IRDuration, IRDurationLiteral } from '@espcompose/core/internals';
import { parseDurationString } from '@espcompose/core/internals';
import type { ActionCompilerContext } from './context.js';
import { inferIRTypeFromTsType } from '../type-brands.js';

// ────────────────────────────────────────────────────────────────────────────
// Constants
// ────────────────────────────────────────────────────────────────────────────

/** Placeholder false literal for error recovery in control flow. */
export const FALSE_EXPR: IRExpression = { kind: 'expr:literal', value: false, type: 'bool' };

// ────────────────────────────────────────────────────────────────────────────
// Call-site helpers
// ────────────────────────────────────────────────────────────────────────────

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

export function extractDurationArg(node: ts.Expression): IRDurationLiteral | null {
  if (ts.isNumericLiteral(node)) {
    return { kind: 'duration', value: Number(node.text), unit: 'ms' };
  }
  if (ts.isStringLiteral(node)) {
    return parseDurationString(node.text);
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

// ────────────────────────────────────────────────────────────────────────────
// Scalar-capture aware duration extraction
// ────────────────────────────────────────────────────────────────────────────

/**
 * Extended duration argument extraction that also handles identifier
 * references. For identifiers, infers the C++ type from the TypeScript
 * type system and registers a scalar capture in the context.
 *
 * Returns the duration (string literal or `IRScriptParamRef`), or null
 * if the argument is unsupported.
 */
export function extractDurationArgOrParamRef(
  node: ts.Expression,
  ctx: ActionCompilerContext,
): IRDuration | null {
  // Try literal extraction first.
  const literal = extractDurationArg(node);
  if (literal !== null) return literal;

  // Handle identifier references — infer value type from TS.
  if (ts.isIdentifier(node)) {
    const type = ctx.checker.getTypeAtLocation(node);
    const irType = inferIRTypeFromTsType(type, ctx.checker);
    if (!irType) return null;

    const name = node.text;
    ctx.scalarCaptures.set(name, irType);
    return { kind: 'script_param', name };
  }

  return null;
}
