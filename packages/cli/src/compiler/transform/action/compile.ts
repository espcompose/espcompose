/**
 * Action Body Compiler — TypeScript AST → IRActionNode[] compiler.
 *
 * Compiles arrow function bodies from TriggerHandler-typed JSX props and
 * useScript arguments into action tree IR. Every user-visible TS
 * statement maps to one or more IRActionNode nodes. Unsupported constructs
 * produce hard compile errors.
 */

import ts from 'typescript';
import type { IRActionNode, IRTimeout } from '@espcompose/core/internals';
import {
  irDelayAction,
  irWaitUntilAction,
  irScriptExecute,
  irScriptWait,
  parseTimeoutString,
} from '@espcompose/core/internals';
import type { GlobalDefinition } from '@espcompose/core/internals';
import type { HAEntityInfo } from '../expr-compiler.js';
import type { ActionCompileResult, ActionCompilerContext, ScriptHandleInfo } from './context.js';
import { emitError, lookupBySymbol } from './context.js';
import { extractDurationArgOrParamRef, extractReturnExpr } from './util.js';
import { compileScriptCallArgs } from './calls/script-args.js';
import { isCoreExportCall, isCoreExportTaggedTemplate, hasControllerBrand } from '../type-brands.js';
import { compileConditionExpr, compileIf, compileWhile, compileFor } from './control-flow.js';
import { compileActionCall } from './calls/router.js';
import { compileLambdaTaggedTemplate } from './calls/lambda.js';
import { compileControllerMethodCall } from './calls/controller.js';
import { compileAnimateCall } from './calls/animate.js';

// ────────────────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────────────────

/**
 * Compile a trigger handler arrow function body to an IR action tree.
 */
export function compileActionBody(
  callback: ts.ArrowFunction | ts.FunctionExpression,
  checker: ts.TypeChecker,
  haEntities: Map<ts.Symbol, HAEntityInfo>,
  scriptHandles: Map<ts.Symbol, ScriptHandleInfo>,
  globalHandles: Map<ts.Symbol, GlobalDefinition>,
  refSymbols: Set<ts.Symbol>,
  filePath: string,
  /** Names of user-defined script params (excluded from ref resolution). */
  scriptParamNames?: Set<string>,
): ActionCompileResult {
  const ctx: ActionCompilerContext = {
    checker,
    haEntities,
    scriptHandles,
    globalHandles,
    refSymbols,
    scriptParamNames: scriptParamNames ?? new Set(),
    triggerParamName: '',
    filePath,
    diagnostics: [],
    triggerVars: new Set(),
    propertyAccessRefs: new Set(),
    overlayControllerRefs: new Set(),
    scriptHandleRefs: new Set(),
    controllerRefs: new Set(),
    scalarCaptures: new Map(),
  };

  // Extract trigger parameter name
  if (callback.parameters.length > 0) {
    const param = callback.parameters[0];
    if (ts.isIdentifier(param.name)) {
      ctx.triggerParamName = param.name.text;
    }
  }

  let actions: IRActionNode[];
  if (ts.isBlock(callback.body)) {
    actions = compileStatements(callback.body.statements, ctx);
  } else {
    // Expression body: treat as a single expression statement
    actions = compileExpressionAsAction(callback.body, ctx) ?? [];
  }

  return {
    actions,
    diagnostics: ctx.diagnostics,
    triggerVars: Array.from(ctx.triggerVars),
    propertyAccessRefs: ctx.propertyAccessRefs,
    overlayControllerRefs: ctx.overlayControllerRefs,
    scriptHandleRefs: ctx.scriptHandleRefs,
    controllerRefs: ctx.controllerRefs,
    scalarCaptures: ctx.scalarCaptures,
  };
}

// ────────────────────────────────────────────────────────────────────────────
// Statement compiler
// ────────────────────────────────────────────────────────────────────────────

function compileStatements(
  stmts: ts.NodeArray<ts.Statement> | ts.Statement[],
  ctx: ActionCompilerContext,
): IRActionNode[] {
  const actions: IRActionNode[] = [];
  for (const stmt of stmts) {
    const compiled = compileStatement(stmt, ctx);
    if (compiled) {
      actions.push(...compiled);
    }
  }
  return actions;
}

function compileStatement(
  stmt: ts.Statement,
  ctx: ActionCompilerContext,
): IRActionNode[] | null {
  if (ts.isExpressionStatement(stmt)) {
    return compileExpressionAsAction(stmt.expression, ctx);
  }

  if (ts.isIfStatement(stmt)) {
    return [compileIf(stmt, ctx, compileStatementBody)];
  }

  if (ts.isWhileStatement(stmt)) {
    return [compileWhile(stmt, ctx, compileStatementBody)];
  }

  if (ts.isForStatement(stmt)) {
    const repeat = compileFor(stmt, ctx, compileStatementBody);
    return repeat ? [repeat] : null;
  }

  if (ts.isBlock(stmt)) {
    return compileStatements(stmt.statements, ctx);
  }

  // ── Unsupported statements → compile errors ────────────────────────────

  if (ts.isVariableStatement(stmt)) {
    return emitError(stmt, ctx,
      'Variable declarations are not supported in trigger handlers. ' +
      'ESPHome actions cannot store intermediate values.');
  }

  if (ts.isReturnStatement(stmt)) {
    return emitError(stmt, ctx,
      'Return statements are not supported. Trigger handlers run to completion.');
  }

  if (ts.isSwitchStatement(stmt)) {
    return emitError(stmt, ctx,
      'Switch statements have no ESPHome equivalent. Use if/else chains instead.');
  }

  if (ts.isTryStatement(stmt)) {
    return emitError(stmt, ctx,
      'Try/catch has no ESPHome equivalent.');
  }

  if (ts.isThrowStatement(stmt)) {
    return emitError(stmt, ctx,
      'Throw statements have no ESPHome equivalent.');
  }

  if (ts.isDoStatement(stmt)) {
    return emitError(stmt, ctx,
      'Do/while loops have no ESPHome equivalent. Use while loops instead.');
  }

  if (ts.isForInStatement(stmt) || ts.isForOfStatement(stmt)) {
    return emitError(stmt, ctx,
      'For-in/for-of loops have no ESPHome equivalent.');
  }

  return emitError(stmt, ctx,
    'Unsupported statement type in trigger handler.');
}

// ────────────────────────────────────────────────────────────────────────────
// Expression → action compilation
// ────────────────────────────────────────────────────────────────────────────

function compileExpressionAsAction(
  expr: ts.Expression,
  ctx: ActionCompilerContext,
): IRActionNode[] | null {
  // await expression
  if (ts.isAwaitExpression(expr)) {
    return compileAwait(expr, ctx);
  }

  // Call expression
  if (ts.isCallExpression(expr)) {
    return compileActionCall(expr, ctx);
  }

  // Tagged template: lambda`...`
  if (ts.isTaggedTemplateExpression(expr) &&
      isCoreExportTaggedTemplate(expr, 'lambda', ctx.checker)) {
    return compileLambdaTaggedTemplate(expr, ctx);
  }

  return emitError(expr, ctx,
    'Expression is not a recognized ESPHome action. ' +
    'Only component actions (ref.method()), HA entity actions, logger.log(), ' +
    'delay(), lambda`...`, and script operations are supported.');
}

// ────────────────────────────────────────────────────────────────────────────
// Await compilation
// ────────────────────────────────────────────────────────────────────────────

function compileAwait(
  expr: ts.AwaitExpression,
  ctx: ActionCompilerContext,
): IRActionNode[] | null {
  const inner = expr.expression;

  // await delay(N)
  if (ts.isCallExpression(inner) && isCoreExportCall(inner, 'delay', ctx.checker)) {
    if (inner.arguments.length < 1) {
      return emitError(expr, ctx, 'delay() requires a duration argument.');
    }
    const durationArg = inner.arguments[0];
    const duration = extractDurationArgOrParamRef(durationArg, ctx);
    if (duration === null) {
      return emitError(durationArg, ctx,
        'delay() argument must be a numeric literal (milliseconds), a string duration (e.g. "1s"), or a captured variable.');
    }
    return [irDelayAction(duration)];
  }

  // await waitUntil(condFn, opts?)
  if (ts.isCallExpression(inner) && isCoreExportCall(inner, 'waitUntil', ctx.checker)) {
    return compileWaitUntil(inner, ctx);
  }

  // await animate(ref, config)
  if (ts.isCallExpression(inner) && isCoreExportCall(inner, 'animate', ctx.checker)) {
    return compileAnimateCall(inner, ctx);
  }

  // await scriptHandle() — callable script that waits for completion
  if (ts.isCallExpression(inner)) {
    const scriptInfo = resolveScriptCallInfo(inner, ctx);
    if (scriptInfo) {
      const userArgs = compileScriptCallArgs(inner, scriptInfo.userParams, ctx);
      if (ts.isIdentifier(inner.expression)) {
        ctx.scriptHandleRefs.add(inner.expression.text);
      }
      return [
        irScriptExecute(scriptInfo.id, userArgs ? { userArgs } : undefined),
        irScriptWait(scriptInfo.id),
      ];
    }

    // await ctrl.show() — controller method call with await
    if (ts.isPropertyAccessExpression(inner.expression)) {
      const objExpr = inner.expression.expression;
      const objType = ctx.checker.getTypeAtLocation(objExpr);
      if (hasControllerBrand(objType)) {
        const methodName = inner.expression.name.text;
        return compileControllerMethodCall(inner, objExpr, objType, methodName, ctx);
      }
    }
  }

  return emitError(expr, ctx,
    'Can only await delay(), waitUntil(), animate(), or a useScript handle. ' +
    'Other await expressions have no ESPHome equivalent.');
}

function compileWaitUntil(
  call: ts.CallExpression,
  ctx: ActionCompilerContext,
): IRActionNode[] | null {
  if (call.arguments.length < 1) {
    return emitError(call, ctx, 'waitUntil() requires a condition function argument.');
  }

  const condArg = call.arguments[0];
  if (!ts.isArrowFunction(condArg) && !ts.isFunctionExpression(condArg)) {
    return emitError(condArg, ctx,
      'waitUntil() condition must be an arrow function: waitUntil(() => expr)');
  }

  const condExpr = ts.isBlock(condArg.body) ? extractReturnExpr(condArg.body) : condArg.body;
  if (!condExpr) {
    return emitError(condArg, ctx,
      'waitUntil() condition function must return a boolean expression.');
  }

  const condition = compileConditionExpr(condExpr, ctx);
  if (!condition) return null;

  // Optional timeout from second argument: { timeout: '10s' }
  let timeout: IRTimeout | undefined;
  if (call.arguments.length >= 2) {
    const optsArg = call.arguments[1];
    if (ts.isObjectLiteralExpression(optsArg)) {
      for (const prop of optsArg.properties) {
        if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name) &&
            prop.name.text === 'timeout' && ts.isStringLiteral(prop.initializer)) {
          const parsed = parseTimeoutString(prop.initializer.text);
          if (!parsed) {
            return emitError(prop.initializer, ctx,
              `waitUntil() timeout '${prop.initializer.text}' is not a valid duration (expected e.g. '10s', '500ms', or 'never').`);
          }
          timeout = parsed;
        }
      }
    }
  }

  return [irWaitUntilAction(condition, timeout)];
}

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

function compileStatementBody(
  stmt: ts.Statement,
  ctx: ActionCompilerContext,
): IRActionNode[] {
  if (ts.isBlock(stmt)) {
    return compileStatements(stmt.statements, ctx);
  }
  return compileStatement(stmt, ctx) ?? [];
}

// ────────────────────────────────────────────────────────────────────────────
// Script call argument helpers
// ────────────────────────────────────────────────────────────────────────────

/**
 * Resolve a script call expression to its full ScriptHandleInfo.
 */
function resolveScriptCallInfo(
  call: ts.CallExpression,
  ctx: ActionCompilerContext,
): ScriptHandleInfo | null {
  if (ts.isIdentifier(call.expression)) {
    return lookupBySymbol(ctx.scriptHandles, call.expression, ctx.checker) ?? null;
  }
  return null;
}
