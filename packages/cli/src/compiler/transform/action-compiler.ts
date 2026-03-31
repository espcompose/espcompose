/**
 * Action Body Compiler — TypeScript AST → IRAction[] compiler.
 *
 * Compiles arrow function bodies from TriggerHandler-typed JSX props and
 * createScript arguments into ESPHome action tree IR. Every user-visible TS
 * statement maps to one or more IRAction nodes. Unsupported constructs
 * produce hard compile errors.
 *
 * No C++ is generated for user code. Lambdas appear only for:
 * - Condition expressions in if/while/wait_until
 * - Templatable params with trigger variables
 * - Reactive plumbing (theme.select, signal wiring)
 */

import ts from 'typescript';
import {
  translateScriptExpr,
  escapeStringForCpp,
  type HAEntityInfo,
  type ScriptTransformContext,
} from './expr-compiler.js';
import {
  type IRAction,
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
  irInternalLambda,
  irLambdaCondition,
} from '../ir/action-tree.js';

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
  actions: IRAction[];
  diagnostics: ActionCompilerDiagnostic[];
  /** Names of trigger variables accessed (e.g. ['x', 'state']) */
  triggerVars: string[];
}

export interface ActionCompilerContext {
  checker: ts.TypeChecker;
  /** Map of local variable name → HA entity info (from importHAEntity calls). */
  haEntities: Map<string, HAEntityInfo>;
  /** Map of createScript variable name → script ID. */
  scriptHandles: Map<string, string>;
  /** Map of useRef variable name → element tag (e.g. 'light', 'switch'). */
  refTags: Map<string, string>;
  /** Name of the trigger args parameter (e.g. 'args'), empty if no parameter. */
  triggerParamName: string;
  /** Source file path for diagnostics. */
  filePath: string;
  /** Error accumulator. */
  diagnostics: ActionCompilerDiagnostic[];
  /** Collected trigger variable names. */
  triggerVars: Set<string>;
}

/**
 * Compile a trigger handler arrow function body to an IR action tree.
 */
export function compileActionBody(
  callback: ts.ArrowFunction | ts.FunctionExpression,
  checker: ts.TypeChecker,
  haEntities: Map<string, HAEntityInfo>,
  scriptHandles: Map<string, string>,
  refTags: Map<string, string>,
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

  let actions: IRAction[];
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
): IRAction[] {
  const actions: IRAction[] = [];
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
): IRAction[] | null {
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
): IRAction[] | null {
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
): IRAction[] | null {
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
): IRAction[] | null {
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
): IRAction[] | null {
  // logger.log(msg) / logger.log(msg, level)
  if (isPropertyCall(call, 'logger', 'log')) {
    return compileLoggerCall(call, ctx);
  }

  // theme.select(name)
  if (isPropertyCall(call, 'theme', 'select')) {
    return compileThemeSelect(call, ctx);
  }

  // ref.method(args) — component action
  if (ts.isPropertyAccessExpression(call.expression) &&
      ts.isIdentifier(call.expression.expression)) {
    const objName = call.expression.expression.text;
    const methodName = call.expression.name.text;

    // scriptHandle.execute() / scriptHandle.stop()
    const scriptId = ctx.scriptHandles.get(objName);
    if (scriptId) {
      if (methodName === 'execute') return [irScriptExecute(scriptId)];
      if (methodName === 'stop') return [irScriptStop(scriptId)];
      return emitError(call, ctx,
        `Script handle only supports .execute() and .stop(). '${methodName}' is not a valid script operation.`);
    }

    // HA entity action
    const haEntity = ctx.haEntities.get(objName);
    if (haEntity) {
      return compileHAAction(call, haEntity, methodName, ctx);
    }

    // Component ref action
    if (ctx.refTags.has(objName)) {
      return compileRefAction(call, objName, methodName, ctx);
    }

    // Check if it's a ref by type (fallback for refs not in refTags map)
    const type = ctx.checker.getTypeAtLocation(call.expression.expression);
    if (hasRefBrand(type)) {
      return compileRefAction(call, objName, methodName, ctx);
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
    const scriptId = ctx.scriptHandles.get(call.expression.text);
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
): IRAction[] | null {
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
): IRAction[] | null {
  if (call.arguments.length < 1) {
    return emitError(call, ctx, 'theme.select() requires a theme name argument.');
  }

  const nameArg = call.arguments[0];
  if (!ts.isStringLiteral(nameArg)) {
    return emitError(nameArg, ctx,
      'theme.select() argument must be a string literal.');
  }

  // Emit as internal lambda — actual theme index resolution happens at
  // serialization time when theme registry is available
  const themeName = nameArg.text;
  return [irInternalLambda(
    `espcompose::select_theme("${escapeStringForCpp(themeName)}");`,
  )];
}

function compileHAAction(
  call: ts.CallExpression,
  entity: HAEntityInfo,
  methodName: string,
  ctx: ActionCompilerContext,
): IRAction[] | null {
  // Build the HA action name: domain.method (camelCase → snake_case)
  const snakeMethod = camelToSnake(methodName);
  const action = `${entity.domain}.${snakeMethod}`;

  // Extract data from optional object argument
  let data: Record<string, IRActionParam> | undefined;
  if (call.arguments.length > 0) {
    const arg = call.arguments[0];
    if (ts.isObjectLiteralExpression(arg)) {
      data = {};
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
  methodName: string,
  ctx: ActionCompilerContext,
): IRAction[] | null {
  // Try to resolve the YAML action key from the ref's tag
  const tag = ctx.refTags.get(refName);
  const snakeMethod = camelToSnake(methodName);
  const actionKey = tag ? `${tag}.${snakeMethod}` : snakeMethod;

  // Build action config — always include the ref ID
  const config: IRActionConfig = buildRefActionConfig(call, refName, ctx);

  return [irNativeAction(actionKey, config)];
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
): IRAction {
  const condition = compileConditionExpr(stmt.expression, ctx);
  if (!condition) {
    // If condition compilation failed, emit a placeholder with the error already reported
    return irIfAction(irLambdaCondition('false'), []);
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
): IRAction {
  const condition = compileConditionExpr(stmt.expression, ctx);
  if (!condition) {
    return irWhileAction(irLambdaCondition('false'), []);
  }

  const bodyActions = compileStatementBody(stmt.statement, ctx);
  return irWhileAction(condition, bodyActions);
}

function compileFor(
  stmt: ts.ForStatement,
  ctx: ActionCompilerContext,
): IRAction | null {
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
 * Uses the shared expr-compiler to translate to C++ — this is the ONLY
 * place where C++ is generated, for internal condition evaluation.
 */
function compileConditionExpr(
  expr: ts.Expression,
  ctx: ActionCompilerContext,
): IRCondition | null {
  const scriptCtx: ScriptTransformContext = {
    triggerParamName: ctx.triggerParamName,
    localVars: new Set(),
  };

  const cppExpr = translateScriptExpr(expr, scriptCtx);
  if (cppExpr === null) {
    emitError(expr, ctx,
      'Cannot compile condition expression. Only simple comparisons with ' +
      'literals, trigger variables, and ref properties are supported.');
    return null;
  }

  return irLambdaCondition(cppExpr);
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
): IRAction[] {
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
    return ctx.scriptHandles.get(call.expression.text) ?? null;
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

function camelToSnake(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .toLowerCase();
}

function hasRefBrand(type: ts.Type): boolean {
  for (const prop of type.getProperties()) {
    if (/^__@REF_BRAND@\d+$/.test(prop.name)) {
      return true;
    }
  }
  return false;
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
