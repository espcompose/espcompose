import ts from 'typescript';
import type { IRActionParam, IRScriptParam } from '@espcompose/core/internals';
import type { ActionCompilerContext } from '../context.js';
import { emitError } from '../context.js';

// ────────────────────────────────────────────────────────────────────────────
// Script call argument compilation
// ────────────────────────────────────────────────────────────────────────────

/**
 * Extract positional call-site arguments and map them to named userArgs
 * based on the script's parameter declaration.
 *
 * Returns null if the script has no user params or no args are provided.
 */
export function compileScriptCallArgs(
  call: ts.CallExpression,
  userParams: IRScriptParam[],
  ctx: ActionCompilerContext,
): Record<string, IRActionParam> | null {
  if (!userParams || userParams.length === 0 || call.arguments.length === 0) return null;

  const args: Record<string, IRActionParam> = {};
  for (let i = 0; i < Math.min(call.arguments.length, userParams.length); i++) {
    const arg = call.arguments[i];
    const param = userParams[i];
    const compiled = compileArgExpression(arg, ctx);
    if (compiled) {
      args[param.name] = compiled;
    } else {
      emitError(arg, ctx,
        `Script argument '${param.name}' must be a literal value, trigger variable, or script parameter.`);
      return null;
    }
  }

  return Object.keys(args).length > 0 ? args : null;
}

/**
 * Compile a single call-site argument expression to an IRActionParam.
 * Supports: numeric/string/boolean literals, trigger vars (args.x),
 * and script param references.
 */
export function compileArgExpression(
  expr: ts.Expression,
  ctx: ActionCompilerContext,
): IRActionParam | null {
  // Unwrap type assertions (e.g. `10 as Int`)
  if (ts.isAsExpression(expr)) {
    return compileArgExpression(expr.expression, ctx);
  }
  if (ts.isNumericLiteral(expr)) {
    return { kind: 'literal', value: Number(expr.text) };
  }
  if (ts.isStringLiteral(expr)) {
    return { kind: 'literal', value: expr.text };
  }
  if (expr.kind === ts.SyntaxKind.TrueKeyword) {
    return { kind: 'literal', value: true };
  }
  if (expr.kind === ts.SyntaxKind.FalseKeyword) {
    return { kind: 'literal', value: false };
  }

  // Trigger variable: args.x
  if (ts.isPropertyAccessExpression(expr) &&
      ts.isIdentifier(expr.expression) &&
      expr.expression.text === ctx.triggerParamName) {
    return { kind: 'trigger_var', varName: expr.name.text };
  }

  // Script parameter forwarding: another script's param used as arg
  if (ts.isIdentifier(expr) && ctx.scriptParamNames.has(expr.text)) {
    // Script params are C++ variables — reference them via expression
    return { kind: 'expression', jsExpression: expr.text };
  }

  return null;
}
