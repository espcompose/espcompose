/**
 * Converts a TypeScript function body (array of Statements) to an ESPHome
 * action list (plain JavaScript array of objects).
 *
 * Supported TypeScript constructs and their ESPHome equivalents:
 *
 *   const x = expr;          → inline substitution (not an action)
 *   let / var x = …;         → compile error (use const)
 *   delay(ms)                → { delay: '<ms>ms' }
 *   logger.log(msg, level?)  → { 'logger.log': { message, level? } }
 *   otherScript(args?)       → { 'script.execute': { id: 'other_script', ...args? } }
 *   if (cond) { … } else?    → { if: { condition: 'return <cond>;', then: [...], else?: [...] } }
 *   while (cond) { … }       → { while: { condition: 'return <cond>;', then: [...] } }
 *   for (let i=0; i<N; i++)  → { repeat: { count: N, then: [...] } }   (literal N only)
 *   return …;                → compile error
 *
 * Errors are accumulated in the `errors` array passed to `convertStatements`.
 */

import ts from 'typescript';
import { exprToCpp, type ConstMap } from './expression-to-cpp.js';
import { resolveActionYamlKey, camelToSnake, HA_ACTION_MAP } from '@esphome/compose';

// ────────────────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────────────────

export interface ConversionError {
  /** Human-readable message. */
  message: string;
  /** Source node for position reporting (optional). */
  node?: ts.Node;
}

/**
 * Context for converting a function body.
 *
 * The `knownScripts` set names every top-level `function` declaration in the
 * source file so that script-to-script call expressions can be identified.
 *
 * The `scriptParams` map associates each script name with its ordered parameter
 * names so that call-site arguments can be matched to the correct YAML keys.
 */
/**
 * Describes a module-level ref variable created via useRef<MarkerType>().
 */
export interface RefInfo {
  /** The ref's variable name (e.g. 'myLight'). */
  name: string;
  /** The C++ classes whose actions apply to this ref (from MARKER_ACTION_CLASS_MAP). */
  classes: string[];
}

/**
 * Describes a module-level HA entity variable created via useHAEntity().
 */
export interface HAEntityInfo {
  /** The variable name (e.g. 'kitchen'). */
  name: string;
  /** The full HA entity ID (e.g. 'light.kitchen_floods'). */
  entityId: string;
  /** The HA domain extracted from the entity ID prefix (e.g. 'light'). */
  domain: string;
}

/**
 * Marker that instructs the AST emitter to generate a variable reference
 * (calling `.toString()`) instead of a string literal.
 *
 * Since ref tokens are generated at runtime by `RefHandle`, the transformer
 * cannot know the actual token at compile time. Instead, we embed a reference
 * to the variable so that the token is resolved when the code executes.
 */
export class RefTokenMarker {
  constructor(public readonly varName: string) {}
}

/**
 * Marker that instructs the AST emitter to spread the result of a call
 * expression into the action array instead of emitting a single action.
 *
 * Used for calls like `applyTheme(darkTheme)` where the function returns
 * an array of actions that should be inlined into the trigger's action list.
 */
export class ActionSpreadMarker {
  constructor(public readonly callNode: ts.CallExpression) {}
}

export interface ConverterContext {
  /** Names of top-level function declarations in the user's source file. */
  knownScripts: Set<string>;
  /**
   * Maps script name → ordered list of parameter names.
   * Used to emit `{ 'script.execute': { id: 'name', paramName: value } }`.
   */
  scriptParams: Map<string, string[]>;
  /**
   * Maps ref variable name → ref info.
   * Populated from module-level `const x = useRef<light_LightOutput>()` declarations.
   * Used to rewrite `x.turnOn()` → `{ 'light.turn_on': { id: token } }`.
   */
  knownRefs: Map<string, RefInfo>;
  /**
   * Maps HA entity variable name → entity info.
   * Populated from module-level `const x = useHAEntity('light.kitchen')` declarations.
   * Used to rewrite `x.toggle()` → `{ 'homeassistant.action': { action: 'light.toggle', ... } }`.
   */
  knownHAEntities: Map<string, HAEntityInfo>;
  /** Accumulated errors — populated by convertStatements. */
  errors: ConversionError[];
}

/**
 * Convert an array of TypeScript statements to an ESPHome action array.
 * Mutates `ctx.errors` on any unsupported construct.
 */
export function convertStatements(
  statements: readonly ts.Statement[],
  ctx: ConverterContext,
  constMap: ConstMap = new Map(),
): unknown[] {
  const actions: unknown[] = [];

  for (const stmt of statements) {
    const action = convertStatement(stmt, ctx, constMap);
    if (action !== null) actions.push(action);
  }

  return actions;
}

// ────────────────────────────────────────────────────────────────────────────
// Statement dispatch
// ────────────────────────────────────────────────────────────────────────────

function convertStatement(
  stmt: ts.Statement,
  ctx: ConverterContext,
  constMap: ConstMap,
): unknown {
  // const x = expr;
  if (ts.isVariableStatement(stmt)) {
    return convertVariableStatement(stmt, ctx, constMap);
  }

  // return …;
  if (ts.isReturnStatement(stmt)) {
    ctx.errors.push({ message: 'Scripts cannot return values. Remove the return statement.', node: stmt });
    return null;
  }

  // if (cond) { … } else { … }
  if (ts.isIfStatement(stmt)) {
    return convertIf(stmt, ctx, constMap);
  }

  // while (cond) { … }
  if (ts.isWhileStatement(stmt)) {
    return convertWhile(stmt, ctx, constMap);
  }

  // for (let i = 0; i < N; i++) { … }
  if (ts.isForStatement(stmt)) {
    return convertFor(stmt, ctx, constMap);
  }

  // Expression statement: call expressions
  if (ts.isExpressionStatement(stmt)) {
    return convertExpressionStatement(stmt, ctx, constMap);
  }

  // Block (bare braces)
  if (ts.isBlock(stmt)) {
    const inner = convertStatements(stmt.statements, ctx, constMap);
    return inner.length === 1 ? inner[0] : inner.length > 0 ? inner : null;
  }

  ctx.errors.push({
    message: `Statement type '${ts.SyntaxKind[stmt.kind]}' is not supported in script bodies.`,
    node: stmt,
  });
  return null;
}

// ────────────────────────────────────────────────────────────────────────────
// Variable declarations
// ────────────────────────────────────────────────────────────────────────────

function convertVariableStatement(
  stmt: ts.VariableStatement,
  ctx: ConverterContext,
  constMap: ConstMap,
): null {
  const flags = stmt.declarationList.flags;
  const isConst = (flags & ts.NodeFlags.Const) !== 0;

  if (!isConst) {
    ctx.errors.push({
      message: `'let' and 'var' are not supported inside scripts. Use 'const' for inlined constants.`,
      node: stmt,
    });
    return null;
  }

  for (const decl of stmt.declarationList.declarations) {
    if (!ts.isIdentifier(decl.name) || !decl.initializer) continue;
    const varName = decl.name.text;
    const valueResult = exprToCpp(decl.initializer, constMap);
    if (valueResult.ok) {
      constMap.set(varName, valueResult.cpp);
    } else {
      ctx.errors.push({ message: valueResult.error, node: decl });
    }
  }

  return null; // const declarations don't produce actions
}

// ────────────────────────────────────────────────────────────────────────────
// Control flow
// ────────────────────────────────────────────────────────────────────────────

function convertIf(stmt: ts.IfStatement, ctx: ConverterContext, constMap: ConstMap): unknown {
  const condResult = exprToCpp(stmt.expression, constMap);
  if (!condResult.ok) {
    ctx.errors.push({ message: condResult.error, node: stmt.expression });
    return null;
  }

  const thenActions = convertBlockOrStatement(stmt.thenStatement, ctx, constMap);
  const action: Record<string, unknown> = {
    if: {
      condition: `return ${condResult.cpp};`,
      then: thenActions,
    },
  };

  if (stmt.elseStatement) {
    const elseActions = convertBlockOrStatement(stmt.elseStatement, ctx, constMap);
    (action.if as Record<string, unknown>).else = elseActions;
  }

  return action;
}

function convertWhile(stmt: ts.WhileStatement, ctx: ConverterContext, constMap: ConstMap): unknown {
  const condResult = exprToCpp(stmt.expression, constMap);
  if (!condResult.ok) {
    ctx.errors.push({ message: condResult.error, node: stmt.expression });
    return null;
  }

  const body = convertBlockOrStatement(stmt.statement, ctx, constMap);

  return {
    while: {
      condition: `return ${condResult.cpp};`,
      then: body,
    },
  };
}

function convertFor(stmt: ts.ForStatement, ctx: ConverterContext, constMap: ConstMap): unknown {
  // Only supports canonical `for (let i = 0; i < N; i++)` with a literal N.
  const count = extractForLoopCount(stmt);
  if (count === null) {
    ctx.errors.push({
      message: `Only 'for (let i = 0; i < N; i++)' loops with a numeric literal upper bound are supported. Use while() for dynamic loops.`,
      node: stmt,
    });
    return null;
  }

  const body = convertBlockOrStatement(stmt.statement, ctx, constMap);
  return { repeat: { count, then: body } };
}

/**
 * Extract the literal repeat count from a canonical `for (let i=0; i<N; i++)`.
 * Returns null if the loop doesn't match the expected pattern.
 */
function extractForLoopCount(stmt: ts.ForStatement): number | null {
  const { initializer, condition, incrementor } = stmt;

  // initializer: let i = 0
  if (!initializer || !ts.isVariableDeclarationList(initializer)) return null;
  if (initializer.declarations.length !== 1) return null;
  const [decl] = initializer.declarations;
  if (!ts.isIdentifier(decl.name)) return null;
  const counterName = decl.name.text;
  if (!decl.initializer || !ts.isNumericLiteral(decl.initializer)) return null;
  if (Number(decl.initializer.text) !== 0) return null;

  // condition: i < N (literal N)
  if (!condition || !ts.isBinaryExpression(condition)) return null;
  if (condition.operatorToken.kind !== ts.SyntaxKind.LessThanToken) return null;
  if (!ts.isIdentifier(condition.left) || condition.left.text !== counterName) return null;
  if (!ts.isNumericLiteral(condition.right)) return null;
  const count = Number(condition.right.text);

  // incrementor: i++ or ++i
  if (!incrementor) return null;
  const isPostfixPlusPlus = ts.isPostfixUnaryExpression(incrementor)
    && incrementor.operator === ts.SyntaxKind.PlusPlusToken
    && ts.isIdentifier(incrementor.operand)
    && incrementor.operand.text === counterName;
  const isPrefixPlusPlus = ts.isPrefixUnaryExpression(incrementor)
    && incrementor.operator === ts.SyntaxKind.PlusPlusToken
    && ts.isIdentifier(incrementor.operand)
    && incrementor.operand.text === counterName;

  if (!isPostfixPlusPlus && !isPrefixPlusPlus) return null;

  return count;
}

// ────────────────────────────────────────────────────────────────────────────
// Expression statements (action calls)
// ────────────────────────────────────────────────────────────────────────────

function convertExpressionStatement(
  stmt: ts.ExpressionStatement,
  ctx: ConverterContext,
  constMap: ConstMap,
): unknown {
  const expr = stmt.expression;
  if (!ts.isCallExpression(expr)) {
    ctx.errors.push({
      message: `Only function call expressions are supported as statements inside scripts.`,
      node: stmt,
    });
    return null;
  }
  return convertCall(expr, ctx, constMap);
}

function convertCall(
  call: ts.CallExpression,
  ctx: ConverterContext,
  constMap: ConstMap,
): unknown {
  const callee = call.expression;

  // delay(ms)
  if (ts.isIdentifier(callee) && callee.text === 'delay') {
    return convertDelay(call, ctx, constMap);
  }

  // applyTheme(theme) → spread into action array
  if (ts.isIdentifier(callee) && callee.text === 'applyTheme') {
    if (call.arguments.length !== 1) {
      ctx.errors.push({ message: 'applyTheme() requires exactly one theme argument.', node: call });
      return null;
    }
    return new ActionSpreadMarker(call);
  }

  // logger.log(message, level?)
  if (
    ts.isPropertyAccessExpression(callee) &&
    ts.isIdentifier(callee.expression) &&
    callee.expression.text === 'logger' &&
    callee.name.text === 'log'
  ) {
    return convertLoggerLog(call, ctx, constMap);
  }

  // otherScript(arg1, arg2, …)  — calls to other top-level function declarations
  if (ts.isIdentifier(callee) && ctx.knownScripts.has(callee.text)) {
    return convertScriptCall(callee.text, call.arguments, ctx, constMap);
  }

  // ref.action(params?) — calls to action methods on component refs
  if (
    ts.isPropertyAccessExpression(callee) &&
    ts.isIdentifier(callee.expression)
  ) {
    const refName = callee.expression.text;

    // Check HA entity bindings first
    const haEntity = ctx.knownHAEntities.get(refName);
    if (haEntity) {
      return convertHAEntityAction(haEntity, callee.name.text, call.arguments, ctx, constMap);
    }

    const refInfo = ctx.knownRefs.get(refName);
    if (refInfo) {
      return convertRefAction(refInfo, callee.name.text, call.arguments, ctx, constMap);
    }
  }

  ctx.errors.push({
    message: `Call to '${callee.getText()}' is not supported inside scripts. Only delay(), logger.log(), applyTheme(), ref.action(), haEntity.action(), and other script functions can be called.`,
    node: call,
  });
  return null;
}

// ────────────────────────────────────────────────────────────────────────────
// Action emitters
// ────────────────────────────────────────────────────────────────────────────

function convertDelay(call: ts.CallExpression, ctx: ConverterContext, constMap: ConstMap): unknown {
  const [msArg] = call.arguments;
  if (!msArg) {
    ctx.errors.push({ message: `delay() requires one argument.`, node: call });
    return null;
  }

  // If the argument is a numeric literal (or const-inlined to one), emit `Nms`.
  // Otherwise emit as a C++ lambda so ESPHome can evaluate it at runtime.
  if (ts.isNumericLiteral(msArg)) {
    return { delay: `${msArg.text}ms` };
  }

  // const-inlined identifier
  if (ts.isIdentifier(msArg) && constMap.has(msArg.text)) {
    const val = constMap.get(msArg.text)!;
    return { delay: `${val}ms` };
  }

  // Dynamic expression — not supported in this iteration
  ctx.errors.push({
    message: `delay() argument must be a numeric literal or a const number. Dynamic values are not yet supported.`,
    node: msArg,
  });
  return null;
}

function convertLoggerLog(call: ts.CallExpression, ctx: ConverterContext, constMap: ConstMap): unknown {
  const [msgArg, levelArg] = call.arguments;
  if (!msgArg) {
    ctx.errors.push({ message: `logger.log() requires at least a message argument.`, node: call });
    return null;
  }

  // Message should be a plain string value in YAML, not a C++ expression.
  const message = extractStringValue(msgArg, constMap);
  if (message === null) {
    ctx.errors.push({
      message: `logger.log() message must be a string literal or a const string.`,
      node: msgArg,
    });
    return null;
  }

  // When only a message is provided (no level/tag), emit the shorthand string form.
  if (!levelArg) {
    return { 'logger.log': message };
  }

  const logAction: Record<string, unknown> = { format: message };

  const level = extractStringValue(levelArg, constMap);
  if (level !== null) logAction.level = level;

  return { 'logger.log': logAction };
}

/**
 * Extract a plain string value from an expression.
 * Returns the raw string content for string literals, or the C++-unquoted value
 * for const identifiers whose value is a string literal.
 * Returns null for dynamic expressions that cannot be resolved at compile time.
 */
function extractStringValue(expr: ts.Expression, constMap: ConstMap): string | null {
  if (ts.isStringLiteral(expr)) {
    return expr.text;
  }
  if (ts.isIdentifier(expr)) {
    const cppVal = constMap.get(expr.text);
    if (cppVal !== undefined) {
      // Const values from string literals are stored as JSON-quoted strings
      if (cppVal.startsWith('"') && cppVal.endsWith('"')) {
        try { return JSON.parse(cppVal); } catch { /* fall through */ }
      }
    }
  }
  return null;
}

function convertScriptCall(
  name: string,
  args: ts.NodeArray<ts.Expression>,
  ctx: ConverterContext,
  constMap: ConstMap,
): unknown {
  const snakeName = camelToSnake(name);

  if (args.length === 0) {
    return { 'script.execute': snakeName };
  }

  // Map positional arguments to the parameter names declared on the target script.
  const paramNames = ctx.scriptParams.get(name) ?? [];
  const argMap: Record<string, unknown> = { id: snakeName };

  for (let i = 0; i < args.length; i++) {
    const result = exprToCpp(args[i], constMap);
    if (!result.ok) {
      ctx.errors.push({ message: result.error, node: args[i] });
      continue;
    }
    const key = paramNames[i] ?? `param${i}`;
    argMap[key] = result.cpp;
  }
  return { 'script.execute': argMap };
}

// ────────────────────────────────────────────────────────────────────────────
// Utilities
// ────────────────────────────────────────────────────────────────────────────

function convertBlockOrStatement(stmt: ts.Statement, ctx: ConverterContext, constMap: ConstMap): unknown[] {
  if (ts.isBlock(stmt)) {
    return convertStatements(stmt.statements, ctx, constMap);
  }
  // Single-statement body (no braces)
  const action = convertStatement(stmt, ctx, constMap);
  return action === null ? [] : Array.isArray(action) ? action : [action];
}



// ────────────────────────────────────────────────────────────────────────────
// Ref action conversion
// ────────────────────────────────────────────────────────────────────────────

/**
 * Convert a ref action call (e.g. `lightRef.turnOn({ brightness: 0.5 })`)
 * into an ESPHome YAML action object.
 *
 * The action is resolved from the static registry using the ref's domain
 * and the method name. Parameters are extracted from the call arguments.
 *
 * @example
 * lightRef.turnOn({ brightness: 0.5 })
 * → { 'light.turn_on': { id: 'r_abc123', brightness: 0.5 } }
 *
 * switchRef.toggle()
 * → { 'switch.toggle': 'r_abc123' }
 */
function convertRefAction(
  refInfo: RefInfo,
  methodName: string,
  args: ts.NodeArray<ts.Expression>,
  ctx: ConverterContext,
  constMap: ConstMap,
): unknown {
  const yamlKey = resolveActionYamlKey(refInfo.classes, methodName);
  const marker = new RefTokenMarker(refInfo.name);
  if (!yamlKey) {
    // Fallback: derive domain from first class namespace (e.g. "light::LightState" → "light")
    const domain = refInfo.classes[0]?.split('::')[0]?.replace(/_$/, '') ?? 'unknown';
    const fallbackKey = `${domain}.${camelToSnake(methodName)}`;
    return buildRefActionYaml(fallbackKey, marker, args, ctx, constMap);
  }

  return buildRefActionYaml(yamlKey, marker, args, ctx, constMap);
}

/**
 * Build the YAML action object for a ref action call.
 *
 * When no parameters are passed, emits the shorthand form:
 *   { 'domain.action': 'ref_token' }
 *
 * When parameters are passed (as an object literal argument), emits:
 *   { 'domain.action': { id: 'ref_token', param1: value1, ... } }
 */
function buildRefActionYaml(
  yamlKey: string,
  refMarker: RefTokenMarker,
  args: ts.NodeArray<ts.Expression>,
  ctx: ConverterContext,
  constMap: ConstMap,
): unknown {
  // No arguments → shorthand: { 'action': <refMarker> }
  if (args.length === 0) {
    return { [yamlKey]: refMarker };
  }

  // Single object literal argument → extract key-value params
  const [arg] = args;
  if (ts.isObjectLiteralExpression(arg)) {
    const actionObj: Record<string, unknown> = { id: refMarker };

    for (const prop of arg.properties) {
      if (!ts.isPropertyAssignment(prop)) continue;
      const key = ts.isIdentifier(prop.name) ? prop.name.text : ts.isStringLiteral(prop.name) ? prop.name.text : null;
      if (!key) continue;

      // Convert the value
      const yamlPropKey = camelToSnake(key);

      if (ts.isNumericLiteral(prop.initializer)) {
        actionObj[yamlPropKey] = Number(prop.initializer.text);
      } else if (ts.isStringLiteral(prop.initializer)) {
        actionObj[yamlPropKey] = prop.initializer.text;
      } else if (prop.initializer.kind === ts.SyntaxKind.TrueKeyword) {
        actionObj[yamlPropKey] = true;
      } else if (prop.initializer.kind === ts.SyntaxKind.FalseKeyword) {
        actionObj[yamlPropKey] = false;
      } else if (ts.isIdentifier(prop.initializer) && constMap.has(prop.initializer.text)) {
        // Const-inlined value
        const val = constMap.get(prop.initializer.text)!;
        actionObj[yamlPropKey] = val;
      } else {
        // Try C++ expression as fallback
        const result = exprToCpp(prop.initializer, constMap);
        if (result.ok) {
          actionObj[yamlPropKey] = result.cpp;
        } else {
          ctx.errors.push({ message: `Cannot convert ref action parameter '${key}': ${result.error}`, node: prop.initializer });
        }
      }
    }

    return { [yamlKey]: actionObj };
  }

  // Unsupported argument form
  ctx.errors.push({
    message: `Ref action arguments must be an object literal (e.g. { brightness: 0.5 }).`,
    node: arg,
  });
  return { [yamlKey]: refMarker };
}

// ────────────────────────────────────────────────────────────────────────────
// HA entity action conversion
// ────────────────────────────────────────────────────────────────────────────

/**
 * Convert a HA entity action call (e.g. `kitchen.toggle()`) into an ESPHome
 * YAML `homeassistant.action` object.
 *
 * @example
 * kitchen.toggle()
 * → { 'homeassistant.action': { action: 'light.toggle', data: { entity_id: 'light.kitchen' } } }
 *
 * kitchen.turnOn({ brightness: 128 })
 * → { 'homeassistant.action': { action: 'light.turn_on', data: { entity_id: '...', brightness: 128 } } }
 */
function convertHAEntityAction(
  entityInfo: HAEntityInfo,
  methodName: string,
  args: ts.NodeArray<ts.Expression>,
  ctx: ConverterContext,
  constMap: ConstMap,
): unknown {
  const domainActions = HA_ACTION_MAP[entityInfo.domain];
  if (!domainActions) {
    ctx.errors.push({
      message: `HA entity domain '${entityInfo.domain}' has no known actions. Entity: '${entityInfo.entityId}'.`,
      node: args.length > 0 ? args[0] : undefined,
    });
    return null;
  }

  const haAction = domainActions[methodName];
  if (!haAction) {
    ctx.errors.push({
      message: `Unknown action '${methodName}' for HA domain '${entityInfo.domain}'. Known actions: ${Object.keys(domainActions).join(', ')}.`,
      node: args.length > 0 ? args[0] : undefined,
    });
    return null;
  }

  const data: Record<string, unknown> = {
    entity_id: entityInfo.entityId,
  };

  // Extract parameters from the object literal argument (if any).
  if (args.length > 0) {
    const [arg] = args;
    if (ts.isObjectLiteralExpression(arg)) {
      for (const prop of arg.properties) {
        if (!ts.isPropertyAssignment(prop)) continue;
        const key = ts.isIdentifier(prop.name) ? prop.name.text
          : ts.isStringLiteral(prop.name) ? prop.name.text : null;
        if (!key) continue;

        const yamlPropKey = camelToSnake(key);

        if (ts.isNumericLiteral(prop.initializer)) {
          data[yamlPropKey] = Number(prop.initializer.text);
        } else if (ts.isStringLiteral(prop.initializer)) {
          data[yamlPropKey] = prop.initializer.text;
        } else if (prop.initializer.kind === ts.SyntaxKind.TrueKeyword) {
          data[yamlPropKey] = true;
        } else if (prop.initializer.kind === ts.SyntaxKind.FalseKeyword) {
          data[yamlPropKey] = false;
        } else if (ts.isIdentifier(prop.initializer) && constMap.has(prop.initializer.text)) {
          data[yamlPropKey] = constMap.get(prop.initializer.text)!;
        } else {
          const result = exprToCpp(prop.initializer, constMap);
          if (result.ok) {
            data[yamlPropKey] = result.cpp;
          } else {
            ctx.errors.push({ message: `Cannot convert HA action parameter '${key}': ${result.error}`, node: prop.initializer });
          }
        }
      }
    }
  }

  return {
    'homeassistant.action': {
      action: haAction,
      data,
    },
  };
}
