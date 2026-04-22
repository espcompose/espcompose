import ts from 'typescript';
import type { IRActionNode, IRActionParam } from '@espcompose/core/internals';
import type { IRExprNode } from '@espcompose/core';
import type { GlobalDefinition } from '@espcompose/core/internals';
import {
  irGlobalSet,
  irArraySet,
  irArrayPush,
} from '@espcompose/core/internals';
import {
  translateScriptExprIR,
  type ScriptTransformContext,
} from '../../expr-compiler.js';
import type { ActionCompilerContext } from '../context.js';
import { emitError } from '../context.js';
import { buildScriptCtxWithGlobals } from '../control-flow.js';

// ────────────────────────────────────────────────────────────────────────────
// Global variable action compilation
// ────────────────────────────────────────────────────────────────────────────

export function compileGlobalSet(
  call: ts.CallExpression,
  globalDef: GlobalDefinition,
  ctx: ActionCompilerContext,
): IRActionNode[] | null {
  if (call.arguments.length < 1) {
    return emitError(call, ctx, 'globalHandle.set() requires a value argument.');
  }

  const valueArg = call.arguments[0];

  // Try literal first
  if (ts.isNumericLiteral(valueArg)) {
    const num = Number(valueArg.text);
    return [irGlobalSet(globalDef.id, globalDef.cppType, { kind: 'literal', value: num })];
  }
  if (ts.isStringLiteral(valueArg) || ts.isNoSubstitutionTemplateLiteral(valueArg)) {
    return [irGlobalSet(globalDef.id, globalDef.cppType, { kind: 'literal', value: valueArg.text })];
  }
  if (valueArg.kind === ts.SyntaxKind.TrueKeyword) {
    return [irGlobalSet(globalDef.id, globalDef.cppType, { kind: 'literal', value: true })];
  }
  if (valueArg.kind === ts.SyntaxKind.FalseKeyword) {
    return [irGlobalSet(globalDef.id, globalDef.cppType, { kind: 'literal', value: false })];
  }

  // Try trigger variable: args.x
  if (ts.isPropertyAccessExpression(valueArg) && ts.isIdentifier(valueArg.expression) &&
      valueArg.expression.text === ctx.triggerParamName) {
    const varName = valueArg.name.text;
    ctx.triggerVars.add(varName);
    return [irGlobalSet(globalDef.id, globalDef.cppType, { kind: 'trigger_var', varName })];
  }

  // Try compiling as a reactive expression (e.g. counter.value + 1)
  const scriptCtx = buildScriptCtxWithGlobals(ctx);
  const exprIR = translateScriptExprIR(valueArg, scriptCtx);
  if (exprIR !== null) {
    return [irGlobalSet(globalDef.id, globalDef.cppType, exprIR)];
  }

  return emitError(valueArg, ctx,
    'globalHandle.set() value must be a literal, trigger variable (args.x), or a supported expression.');
}

export function compileArraySet(
  call: ts.CallExpression,
  globalDef: GlobalDefinition,
  ctx: ActionCompilerContext,
): IRActionNode[] | null {
  if (call.arguments.length < 2) {
    return emitError(call, ctx, 'arrayHandle.set(index, value) requires two arguments.');
  }

  const indexArg = call.arguments[0];
  const valueArg = call.arguments[1];

  const scriptCtx = buildScriptCtxWithGlobals(ctx);
  const indexIR = compileActionValueArg(indexArg, ctx, scriptCtx);
  const valueIR = compileActionValueArg(valueArg, ctx, scriptCtx);

  if (!indexIR) return emitError(indexArg, ctx, 'arrayHandle.set() index must be a literal, trigger variable, or supported expression.');
  if (!valueIR) return emitError(valueArg, ctx, 'arrayHandle.set() value must be a literal, trigger variable, or supported expression.');

  return [irArraySet(globalDef.id, globalDef.cppType, indexIR, valueIR)];
}

export function compileArrayPush(
  call: ts.CallExpression,
  globalDef: GlobalDefinition,
  ctx: ActionCompilerContext,
): IRActionNode[] | null {
  if (call.arguments.length < 1) {
    return emitError(call, ctx, 'arrayHandle.push(value) requires a value argument.');
  }

  const valueArg = call.arguments[0];
  const scriptCtx = buildScriptCtxWithGlobals(ctx);
  const valueIR = compileActionValueArg(valueArg, ctx, scriptCtx);

  if (!valueIR) return emitError(valueArg, ctx, 'arrayHandle.push() value must be a literal, trigger variable, or supported expression.');

  return [irArrayPush(globalDef.id, globalDef.cppType, valueIR)];
}

/** Compile a value argument to either an IRActionParam or IRExprNode. */
function compileActionValueArg(
  arg: ts.Expression,
  ctx: ActionCompilerContext,
  scriptCtx: ScriptTransformContext,
): IRActionParam | IRExprNode | null {
  if (ts.isNumericLiteral(arg)) {
    return { kind: 'literal', value: Number(arg.text) };
  }
  if (ts.isStringLiteral(arg) || ts.isNoSubstitutionTemplateLiteral(arg)) {
    return { kind: 'literal', value: arg.text };
  }
  if (arg.kind === ts.SyntaxKind.TrueKeyword) {
    return { kind: 'literal', value: true };
  }
  if (arg.kind === ts.SyntaxKind.FalseKeyword) {
    return { kind: 'literal', value: false };
  }
  if (ts.isPropertyAccessExpression(arg) && ts.isIdentifier(arg.expression) &&
      arg.expression.text === ctx.triggerParamName) {
    const varName = arg.name.text;
    ctx.triggerVars.add(varName);
    return { kind: 'trigger_var', varName };
  }
  return translateScriptExprIR(arg, scriptCtx);
}
