/**
 * Action Body Compiler — TypeScript AST → IRActionNode[] compiler.
 *
 * Compiles arrow function bodies from TriggerHandler-typed JSX props and
 * createScript arguments into action tree IR. Every user-visible TS
 * statement maps to one or more IRActionNode nodes. Unsupported constructs
 * produce hard compile errors.
 */

import ts from 'typescript';
import {
  translateScriptExprIR,
  type HAEntityInfo,
  type ScriptTransformContext,
} from './expr-compiler.js';
import { ENTITY_DOMAINS } from '@espcompose/core/internals';
import {
  type IRActionNode,
  type IRActionParam,
  type IRActionConfig,
  type IRCondition,
  irNativeAction,
  irHAServiceAction,
  irLoggerAction,
  irDelayAction,
  irWaitUntilAction,
  irIfAction,
  irWhileAction,
  irRepeatAction,
  irScriptExecute,
  irScriptWait,
  irScriptStop,
  irThemeSelect,
  irLambdaCondition,
  camelToSnake,
} from '@espcompose/core/internals';
import type { IRExprNode } from '@espcompose/core';

// ────────────────────────────────────────────────────────────────────────────
// Constants
// ────────────────────────────────────────────────────────────────────────────

/** Placeholder false literal for error recovery in control flow. */
const FALSE_EXPR: IRExprNode = { kind: 'literal', value: false, type: 'bool' };

// ────────────────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────────────────

export interface ActionCompilerDiagnostic {
  message: string;
  file: string;
  line?: number;
  character?: number;
}

export interface ActionCompileResult {
  actions: IRActionNode[];
  diagnostics: ActionCompilerDiagnostic[];
  /** Names of trigger variables accessed (e.g. ['x', 'state']) */
  triggerVars: string[];
}

export interface ActionCompilerContext {
  checker: ts.TypeChecker;
  /** Map of declaration symbol → HA entity info (scope-aware). */
  haEntities: Map<ts.Symbol, HAEntityInfo>;
  /** Map of declaration symbol → script ID (scope-aware). */
  scriptHandles: Map<ts.Symbol, string>;
  /** Map of declaration symbol → element tag (scope-aware). */
  refTags: Map<ts.Symbol, string>;
  /** Name of the trigger args parameter (e.g. 'args'), empty if no parameter. */
  triggerParamName: string;
  /** Source file path for diagnostics. */
  filePath: string;
  /** Error accumulator. */
  diagnostics: ActionCompilerDiagnostic[];
  /** Collected trigger variable names. */
  triggerVars: Set<string>;
}

/** Resolve a ts.Symbol-keyed map entry from an identifier node. */
function lookupBySymbol<T>(
  map: Map<ts.Symbol, T>,
  node: ts.Identifier,
  checker: ts.TypeChecker,
): T | undefined {
  const sym = checker.getSymbolAtLocation(node);
  return sym ? map.get(sym) : undefined;
}

/**
 * Compile a trigger handler arrow function body to an IR action tree.
 */
export function compileActionBody(
  callback: ts.ArrowFunction | ts.FunctionExpression,
  checker: ts.TypeChecker,
  haEntities: Map<ts.Symbol, HAEntityInfo>,
  scriptHandles: Map<ts.Symbol, string>,
  refTags: Map<ts.Symbol, string>,
  filePath: string,
): ActionCompileResult {
  const ctx: ActionCompilerContext = {
    checker,
    haEntities,
    scriptHandles,
    refTags,
    triggerParamName: '',
    filePath,
    diagnostics: [],
    triggerVars: new Set(),
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
    return [compileIf(stmt, ctx)];
  }

  if (ts.isWhileStatement(stmt)) {
    return [compileWhile(stmt, ctx)];
  }

  if (ts.isForStatement(stmt)) {
    const repeat = compileFor(stmt, ctx);
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

  return emitError(expr, ctx,
    'Expression is not a recognized ESPHome action. ' +
    'Only component actions (ref.method()), HA entity actions, logger.log(), ' +
    'delay(), and script operations are supported.');
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
  if (ts.isCallExpression(inner) && isNamedCall(inner, 'delay')) {
    if (inner.arguments.length < 1) {
      return emitError(expr, ctx, 'delay() requires a duration argument.');
    }
    const durationArg = inner.arguments[0];
    const duration = extractDurationArg(durationArg);
    if (duration === null) {
      return emitError(durationArg, ctx,
        'delay() argument must be a numeric literal (milliseconds) or a string duration (e.g. "1s").');
    }
    return [irDelayAction(duration)];
  }

  // await waitUntil(condFn, opts?)
  if (ts.isCallExpression(inner) && isNamedCall(inner, 'waitUntil')) {
    return compileWaitUntil(inner, ctx);
  }

  // await scriptHandle() — callable script that waits for completion
  if (ts.isCallExpression(inner)) {
    const scriptId = resolveScriptCall(inner, ctx);
    if (scriptId) {
      return [irScriptExecute(scriptId), irScriptWait(scriptId)];
    }
  }

  return emitError(expr, ctx,
    'Can only await delay(), waitUntil(), or a createScript handle. ' +
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
  let timeout: string | undefined;
  if (call.arguments.length >= 2) {
    const optsArg = call.arguments[1];
    if (ts.isObjectLiteralExpression(optsArg)) {
      for (const prop of optsArg.properties) {
        if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name) &&
            prop.name.text === 'timeout' && ts.isStringLiteral(prop.initializer)) {
          timeout = prop.initializer.text;
        }
      }
    }
  }

  return [irWaitUntilAction(condition, timeout)];
}

// ────────────────────────────────────────────────────────────────────────────
// Action call classification
// ────────────────────────────────────────────────────────────────────────────

function compileActionCall(
  call: ts.CallExpression,
  ctx: ActionCompilerContext,
): IRActionNode[] | null {
  // logger.log(msg) / logger.log(msg, level)
  if (isPropertyCall(call, 'logger', 'log')) {
    return compileLoggerCall(call, ctx);
  }

  // theme.select(name)
  if (isPropertyCall(call, 'theme', 'select')) {
    return compileThemeSelect(call, ctx);
  }

  // ref.method(args) — component action
  if (ts.isPropertyAccessExpression(call.expression)) {
    const methodName = call.expression.name.text;

    // ── Symbol-based resolution (direct identifier access) ──────────
    if (ts.isIdentifier(call.expression.expression)) {
      const objNode = call.expression.expression;
      const objName = objNode.text;

      // scriptHandle.execute() / scriptHandle.stop()
      const scriptId = lookupBySymbol(ctx.scriptHandles, objNode, ctx.checker);
      if (scriptId) {
        if (methodName === 'execute') return [irScriptExecute(scriptId)];
        if (methodName === 'stop') return [irScriptStop(scriptId)];
        return emitError(call, ctx,
          `Script handle only supports .execute() and .stop(). '${methodName}' is not a valid script operation.`);
      }

      // HA entity action (symbol-based)
      const haEntity = lookupBySymbol(ctx.haEntities, objNode, ctx.checker);
      if (haEntity) {
        return compileHAAction(call, haEntity, methodName, ctx);
      }

      // Component ref action (symbol-based)
      const refTag = lookupBySymbol(ctx.refTags, objNode, ctx.checker);
      if (refTag !== undefined) {
        return compileRefAction(call, objName, refTag, methodName, ctx);
      }
    }

    // ── Type-based resolution (works for any expression depth) ──────
    // Handles: props.entity.toggle(), this.light.turnOn(), etc.
    const objExpr = call.expression.expression;
    const objType = ctx.checker.getTypeAtLocation(objExpr);

    // HA entity action (type-based)
    const inferredDomain = inferHAEntityDomainFromType(objType);
    if (inferredDomain) {
      const dynamicEntity: HAEntityInfo = {
        entityId: '__dynamic__',
        domain: inferredDomain,
        isDynamic: true,
        entityIdExpr: objExpr.getText(),
      };
      return compileHAAction(call, dynamicEntity, methodName, ctx);
    }

    // Component ref action (type-based)
    if (hasRefBrand(objType)) {
      const objName = ts.isIdentifier(objExpr) ? objExpr.text : objExpr.getText();
      return compileRefAction(call, objName, undefined, methodName, ctx);
    }
  }

  // delay() without await — still valid as fire-and-forget
  if (isNamedCall(call, 'delay')) {
    if (call.arguments.length < 1) {
      return emitError(call, ctx, 'delay() requires a duration argument.');
    }
    const duration = extractDurationArg(call.arguments[0]);
    if (duration === null) {
      return emitError(call.arguments[0], ctx,
        'delay() argument must be a numeric literal (milliseconds) or a string duration.');
    }
    return [irDelayAction(duration)];
  }

  // scriptHandle() without await — fire and forget
  if (ts.isIdentifier(call.expression)) {
    const scriptId = lookupBySymbol(ctx.scriptHandles, call.expression, ctx.checker);
    if (scriptId) {
      return [irScriptExecute(scriptId)];
    }
  }

  return emitError(call, ctx,
    `'${getCallName(call)}()' is not a recognized ESPHome action. ` +
    'Only component actions (ref.method()), HA entity actions, logger.log(), ' +
    'delay(), and script operations are supported.');
}

// ────────────────────────────────────────────────────────────────────────────
// Specific action compilers
// ────────────────────────────────────────────────────────────────────────────

function compileLoggerCall(
  call: ts.CallExpression,
  ctx: ActionCompilerContext,
): IRActionNode[] | null {
  if (call.arguments.length < 1) {
    return emitError(call, ctx, 'logger.log() requires a message argument.');
  }

  const msgArg = call.arguments[0];
  if (!ts.isStringLiteral(msgArg) && !ts.isNoSubstitutionTemplateLiteral(msgArg)) {
    return emitError(msgArg, ctx,
      'logger.log() message must be a string literal.');
  }
  const message = msgArg.text;

  let level: string | undefined;
  if (call.arguments.length >= 2) {
    const levelArg = call.arguments[1];
    if (ts.isStringLiteral(levelArg)) {
      level = levelArg.text;
    }
  }

  return [irLoggerAction(message, level)];
}

function compileThemeSelect(
  call: ts.CallExpression,
  ctx: ActionCompilerContext,
): IRActionNode[] | null {
  if (call.arguments.length < 1) {
    return emitError(call, ctx, 'theme.select() requires a theme name argument.');
  }

  const nameArg = call.arguments[0];
  if (!ts.isStringLiteral(nameArg)) {
    return emitError(nameArg, ctx,
      'theme.select() argument must be a string literal.');
  }

  // Emit target-agnostic theme select — actual lowering to C++/JS happens in target packages
  const themeName = nameArg.text;
  return [irThemeSelect(themeName)];
}

function compileHAAction(
  call: ts.CallExpression,
  entity: HAEntityInfo,
  methodName: string,
  ctx: ActionCompilerContext,
): IRActionNode[] | null {
  const snakeMethod = camelToSnake(methodName);

  // entity_id: static literal for known entities, runtime expression for dynamic
  const data: Record<string, IRActionParam> = {};

  let action: string;
  if (entity.isDynamic && entity.entityIdExpr) {
    // Dynamic entity: resolve entity_id at runtime from the binding's __entityId__ property.
    // Use domain-agnostic homeassistant.* actions so toggle/turn_on/turn_off work
    // regardless of the actual entity domain (light, switch, fan, etc.).
    const varName = ts.isPropertyAccessExpression(call.expression) && ts.isIdentifier(call.expression.expression)
      ? call.expression.expression.text
      : entity.entityIdExpr;
    data.entity_id = { kind: 'expression', jsExpression: `${varName}.__entityId__` };
    const GENERIC_METHODS = new Set(['toggle', 'turn_on', 'turn_off']);
    action = GENERIC_METHODS.has(snakeMethod)
      ? `homeassistant.${snakeMethod}`
      : `${entity.domain}.${snakeMethod}`;
  } else {
    // Static entity: use domain-specific action (e.g. light.toggle)
    action = `${entity.domain}.${snakeMethod}`;
    data.entity_id = { kind: 'literal', value: entity.entityId };
  }

  // Extract additional data from optional object argument
  if (call.arguments.length > 0) {
    const arg = call.arguments[0];
    if (ts.isObjectLiteralExpression(arg)) {
      for (const prop of arg.properties) {
        if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
          const paramValue = compileActionParam(prop.initializer, ctx);
          if (!paramValue) return null;
          data[camelToSnake(prop.name.text)] = paramValue;
        }
      }
    }
  }

  return [irHAServiceAction(action, data)];
}

function compileRefAction(
  call: ts.CallExpression,
  refName: string,
  tag: string | undefined,
  methodName: string,
  ctx: ActionCompilerContext,
): IRActionNode[] | null {
  const snakeMethod = camelToSnake(methodName);
  let actionKey = tag ? `${tag}.${snakeMethod}` : snakeMethod;

  // Remap LVGL page navigation action keys — the snake_case convention
  // produces "lvgl.page_next" but ESPHome expects "lvgl.page.next".
  actionKey = LVGL_ACTION_KEY_REMAP.get(actionKey) ?? actionKey;

  // LVGL page actions use auto-resolved lvgl_id, so we must NOT inject
  // the caller ref as `id`. Build config from params only.
  if (LVGL_PAGE_ACTIONS.has(actionKey)) {
    const config = buildLvglPageActionConfig(call, ctx);
    return [irNativeAction(actionKey, config)];
  }

  // Build action config — always include the ref ID
  const config: IRActionConfig = buildRefActionConfig(call, refName, ctx);

  return [irNativeAction(actionKey, config)];
}

/**
 * Remap table for LVGL page navigation action keys.
 * camelToSnake produces "page_next" but ESPHome expects "page.next".
 */
const LVGL_ACTION_KEY_REMAP = new Map<string, string>([
  ['lvgl.page_next', 'lvgl.page.next'],
  ['lvgl.page_previous', 'lvgl.page.previous'],
  ['lvgl.page_show', 'lvgl.page.show'],
]);

/** Set of LVGL page action keys that use auto-resolved lvgl_id. */
const LVGL_PAGE_ACTIONS = new Set<string>([
  'lvgl.page.next',
  'lvgl.page.previous',
  'lvgl.page.show',
]);

/**
 * Build action config for LVGL page actions.
 * These actions do NOT include the caller ref as `id` — ESPHome auto-resolves
 * the `lvgl_id`. Only explicit params from the call are included.
 */
function buildLvglPageActionConfig(
  call: ts.CallExpression,
  ctx: ActionCompilerContext,
): IRActionConfig {
  if (call.arguments.length === 0) {
    return {};
  }

  const arg = call.arguments[0];
  if (!ts.isObjectLiteralExpression(arg)) {
    return {};
  }

  const config: Record<string, IRActionParam | string | number | boolean> = {};
  for (const prop of arg.properties) {
    if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
      const paramValue = compileActionParam(prop.initializer, ctx);
      if (paramValue) {
        config[camelToSnake(prop.name.text)] = paramValue;
      }
    }
  }
  return config;
}

function buildRefActionConfig(
  call: ts.CallExpression,
  refName: string,
  ctx: ActionCompilerContext,
): IRActionConfig {
  if (call.arguments.length === 0) {
    // Simple action: just the ref ID
    return refName;
  }

  const arg = call.arguments[0];
  if (!ts.isObjectLiteralExpression(arg)) {
    return refName;
  }

  // Action with params
  const config: Record<string, IRActionParam | string | number | boolean> = { id: refName };
  for (const prop of arg.properties) {
    if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
      const paramValue = compileActionParam(prop.initializer, ctx);
      if (paramValue) {
        config[camelToSnake(prop.name.text)] = paramValue;
      }
    }
  }
  return config;
}

// ────────────────────────────────────────────────────────────────────────────
// Control flow compilation
// ────────────────────────────────────────────────────────────────────────────

function compileIf(
  stmt: ts.IfStatement,
  ctx: ActionCompilerContext,
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

function compileWhile(
  stmt: ts.WhileStatement,
  ctx: ActionCompilerContext,
): IRActionNode {
  const condition = compileConditionExpr(stmt.expression, ctx);
  if (!condition) {
    return irWhileAction(irLambdaCondition(FALSE_EXPR), []);
  }

  const bodyActions = compileStatementBody(stmt.statement, ctx);
  return irWhileAction(condition, bodyActions);
}

function compileFor(
  stmt: ts.ForStatement,
  ctx: ActionCompilerContext,
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

// ────────────────────────────────────────────────────────────────────────────
// Condition expression compilation
// ────────────────────────────────────────────────────────────────────────────

/**
 * Compile a TS boolean expression to an IRCondition.
 *
 * Uses the shared expr-compiler to produce a target-agnostic IRExprNode tree.
 */
function compileConditionExpr(
  expr: ts.Expression,
  ctx: ActionCompilerContext,
): IRCondition | null {
  const scriptCtx: ScriptTransformContext = {
    triggerParamName: ctx.triggerParamName,
    localVars: new Set(),
  };

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
// Action parameter compilation
// ────────────────────────────────────────────────────────────────────────────

/**
 * Compile an expression used as an action parameter value.
 *
 * Supported:
 * - Literal values (numbers, strings, booleans) → IRLiteralParam
 * - Trigger variable references (args.x) → IRTriggerVarParam
 *
 * Unsupported expressions produce compile errors.
 */
function compileActionParam(
  expr: ts.Expression,
  ctx: ActionCompilerContext,
): IRActionParam | null {
  // Numeric literal
  if (ts.isNumericLiteral(expr)) {
    return { kind: 'literal', value: parseFloat(expr.text) };
  }

  // String literal
  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) {
    return { kind: 'literal', value: expr.text };
  }

  // Boolean literal
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
    const varName = expr.name.text;
    ctx.triggerVars.add(varName);
    return { kind: 'trigger_var', varName };
  }

  emitError(expr, ctx,
    'Action parameters must be literal values or trigger variables (args.x). ' +
    'Computed expressions are not supported.');
  return null;
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

function isNamedCall(call: ts.CallExpression, name: string): boolean {
  return ts.isIdentifier(call.expression) && call.expression.text === name;
}

function isPropertyCall(
  call: ts.CallExpression,
  objName: string,
  methodName: string,
): boolean {
  return ts.isPropertyAccessExpression(call.expression) &&
    ts.isIdentifier(call.expression.expression) &&
    call.expression.expression.text === objName &&
    call.expression.name.text === methodName;
}

function resolveScriptCall(
  call: ts.CallExpression,
  ctx: ActionCompilerContext,
): string | null {
  if (ts.isIdentifier(call.expression)) {
    return lookupBySymbol(ctx.scriptHandles, call.expression, ctx.checker) ?? null;
  }
  return null;
}

function getCallName(call: ts.CallExpression): string {
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

function extractDurationArg(node: ts.Expression): string | null {
  if (ts.isNumericLiteral(node)) {
    return `${node.text}ms`;
  }
  if (ts.isStringLiteral(node)) {
    return node.text;
  }
  return null;
}

function extractReturnExpr(block: ts.Block): ts.Expression | null {
  if (block.statements.length === 1) {
    const stmt = block.statements[0];
    if (ts.isReturnStatement(stmt) && stmt.expression) {
      return stmt.expression;
    }
  }
  return null;
}

function hasRefBrand(type: ts.Type): boolean {
  for (const prop of type.getProperties()) {
    if (/^__@REF_BRAND@\d+$/.test(prop.name)) {
      return true;
    }
  }
  return false;
}

/**
 * Check if a type has the BINDING_BRAND marker (HA entity binding or similar).
 */
function hasBindingBrand(type: ts.Type): boolean {
  for (const prop of type.getProperties()) {
    if (/^__@BINDING_BRAND@\d+$/.test(prop.name)) {
      return true;
    }
  }
  return false;
}

/**
 * Infer HA entity domain from the TypeScript type structure.
 *
 * Distinguishes between binding types by checking for domain-specific methods
 * and properties:
 *   - LightBinding: has 'brightness' property → 'light'
 *   - SwitchBinding: has 'toggle' + 'isOn', no 'brightness'/'isOpen' → 'switch'
 *   - FanBinding: identical shape to SwitchBinding, so we also check for 'isOpen'
 *   - CoverBinding: has 'isOpen' property → 'cover'
 *   - SensorBinding: has 'value' property, no action methods → 'sensor'
 *   - BinarySensorBinding: has 'isOn' property, no action methods → 'binary_sensor'
 */
function inferHAEntityDomainFromType(type: ts.Type): string | undefined {
  if (!hasBindingBrand(type)) return undefined;
  // Exclude refs — they also have BINDING_BRAND but use REF_BRAND
  if (hasRefBrand(type)) return undefined;

  const propNames = new Set(type.getProperties().map(p => p.name));

  // Score each domain by how many of its declared properties + actions match.
  // The domain with the most unique matches wins. Ties use 'homeassistant'
  // — the generic HA domain — since the actual domain is resolved at runtime
  // from the entity's __entityId__ stamp.
  let bestDomain: string | undefined;
  let bestScore = 0;
  let tied = false;

  for (const [domain, desc] of Object.entries(ENTITY_DOMAINS)) {
    const candidates = [
      ...desc.properties.map(p => p.name),
      ...desc.actions.map(a => a.name),
    ];
    const score = candidates.filter(n => propNames.has(n)).length;
    if (score > bestScore) {
      bestScore = score;
      bestDomain = domain;
      tied = false;
    } else if (score === bestScore && score > 0) {
      tied = true;
    }
  }

  return tied ? 'homeassistant' : bestDomain;
}

function emitError(
  node: ts.Node,
  ctx: ActionCompilerContext,
  message: string,
): null {
  const sourceFile = node.getSourceFile();
  const { line, character } = sourceFile
    ? sourceFile.getLineAndCharacterOfPosition(node.getStart())
    : { line: 0, character: 0 };

  ctx.diagnostics.push({
    message,
    file: ctx.filePath,
    line: line + 1,
    character: character + 1,
  });

  return null;
}
