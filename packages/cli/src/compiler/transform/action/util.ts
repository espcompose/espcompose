import ts from 'typescript';
import type { IRExprNode } from '@espcompose/core';
import type { IRScriptParamRef, ScriptParamCppType } from '@espcompose/core/internals';
import type { ActionCompilerContext } from './context.js';

// ────────────────────────────────────────────────────────────────────────────
// Constants
// ────────────────────────────────────────────────────────────────────────────

/** Placeholder false literal for error recovery in control flow. */
export const FALSE_EXPR: IRExprNode = { kind: 'literal', value: false, type: 'bool' };

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

// ────────────────────────────────────────────────────────────────────────────
// Scalar-capture aware duration extraction
// ────────────────────────────────────────────────────────────────────────────

/** Map from TypeScript type to C++ ScriptParamCppType. */
function inferScriptParamCppType(
  type: ts.Type,
): ScriptParamCppType | null {
  // Check for Int branded type (number & { __espcompose_int__: true })
  if (type.isIntersection()) {
    const hasNumber = type.types.some(t => t.flags & ts.TypeFlags.Number);
    if (hasNumber) {
      const hasIntBrand = type.types.some(t => t.getProperty('__espcompose_int__') != null);
      if (hasIntBrand) return 'int';
    }
  }
  // Also check via the type alias symbol (handles cases where TS optimizes the intersection)
  if (type.aliasSymbol?.name === 'Int') return 'int';

  // Plain number
  if (type.flags & ts.TypeFlags.Number || type.flags & ts.TypeFlags.NumberLiteral) return 'float';
  // String
  if (type.flags & ts.TypeFlags.String || type.flags & ts.TypeFlags.StringLiteral) return 'string';
  // Boolean
  if (type.flags & ts.TypeFlags.Boolean || type.flags & ts.TypeFlags.BooleanLiteral) return 'bool';

  return null;
}

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
): string | IRScriptParamRef | null {
  // Try literal extraction first.
  const literal = extractDurationArg(node);
  if (literal !== null) return literal;

  // Handle identifier references — infer C++ type from TS.
  if (ts.isIdentifier(node)) {
    const type = ctx.checker.getTypeAtLocation(node);
    const cppType = inferScriptParamCppType(type);
    if (!cppType) return null;

    const name = node.text;
    ctx.scalarCaptures.set(name, cppType);
    return { kind: 'script_param', name };
  }

  return null;
}
