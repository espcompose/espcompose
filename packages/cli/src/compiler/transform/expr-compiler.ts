/**
 * Shared Expression Compiler — TypeScript AST → C++ expression translator.
 *
 * Extracted from script-transformer.ts and extended with:
 *   - Signal<T> property access → `<signalName>.get()`
 *   - `isNaN()` → `std::isnan()`
 *   - ExprCompilerContext for signal resolution
 *
 * Used by:
 *   - reactive-transformer.ts (reactive JSX attribute compilation)
 *   - script-transformer.ts (trigger handler / createScript body compilation)
 */

import ts from 'typescript';
import type { ExprNode } from '@esphome/compose';
import type { ExprType, BuiltinFn, BinaryOp, UnaryOp, PostfixOp, StringMethod } from '@esphome/compose/internals';

// ────────────────────────────────────────────────────────────────────────────
// Context types
// ────────────────────────────────────────────────────────────────────────────

export interface HAEntityInfo {
  entityId: string;
  domain: string;
  /** True when the entity ID is a variable expression (not a string literal). */
  isDynamic?: boolean;
  /** The JS variable name holding the entity ID (for runtime resolution). */
  entityIdExpr?: string;
}

export interface SignalPropertyInfo {
  /** C++ signal variable name, e.g. `sig_ha_light_office` */
  signalName: string;
  /** C++ type of the signal, e.g. `bool`, `float`, `std::string` */
  valueType: string;
  /** Source domain for trigger lookup, e.g. `binary_sensor`, `sensor` */
  sourceDomain: string;
  /** ESPHome component ID, e.g. `ha_light_office` */
  sourceId: string;
  /** Trigger type, e.g. `on_state`, `on_value` */
  triggerType: string;
  /** Source type: 'ha_entity' or 'theme' */
  sourceType?: 'ha_entity' | 'theme';
}

export interface DependencyInfo {
  signalName: string;
  sourceId: string;
  triggerType: string;
  sourceDomain: string;
  valueType: string;
  sourceType?: string;
}

export interface ExprCompilerContext {
  checker: ts.TypeChecker;
  /** Map of declaration symbol → HA entity info (scope-aware lookup). */
  haEntities: Map<ts.Symbol, HAEntityInfo>;
  /** Collected dependencies during expression compilation. */
  dependencies: Map<string, DependencyInfo>;
  /**
   * Slot tracking for unresolvable Signal<T> subexpressions.
   * Each slot maps to the original AST expression that will be passed
   * as a runtime argument to __espcompose.slotted().
   */
  slots: { expr: ts.Expression; slotIndex: number }[];
}

// ────────────────────────────────────────────────────────────────────────────
// Script-transformer context
// ────────────────────────────────────────────────────────────────────────────

export interface ScriptTransformContext {
  /** Name of the trigger args parameter in the current callback. */
  triggerParamName: string;
  /** Set of local variable names declared in the current callback body. */
  localVars: Set<string>;
}

// ────────────────────────────────────────────────────────────────────────────
// Signal brand detection (shared with reactive-transformer)
// ────────────────────────────────────────────────────────────────────────────

export function hasSignalBrand(type: ts.Type): boolean {
  if (type.isIntersection()) {
    return type.types.some(t => hasSignalBrand(t));
  }
  if (type.isUnion()) {
    return type.types.some(t => hasSignalBrand(t));
  }
  for (const prop of type.getProperties()) {
    if (/^__@SIGNAL_BRAND@\d+$/.test(prop.name)) {
      return true;
    }
  }
  return false;
}

// ────────────────────────────────────────────────────────────────────────────
// Signal property resolution
// ────────────────────────────────────────────────────────────────────────────

/**
 * Domain → sensor type mapping (mirrors useHAEntity.ts sensorTypeForDomain).
 */
function sensorTypeForDomain(domain: string): string {
  switch (domain) {
    case 'light':
    case 'switch':
    case 'binary_sensor':
    case 'fan':
    case 'lock':
    case 'cover':
      return 'binary_sensor';
    case 'sensor':
    case 'number':
      return 'sensor';
    case 'text_sensor':
    case 'select':
      return 'text_sensor';
    default:
      return 'binary_sensor';
  }
}

/**
 * Resolve the C++ signal info for a property access on an HA entity binding.
 *
 * Maps property names to their signal names and types, mirroring the
 * runtime behavior in useHAEntity.ts.
 */
function resolveSignalProperty(
  varName: string,
  propName: string,
  entity: HAEntityInfo,
): SignalPropertyInfo | null {
  const sourceId = `ha_${entity.entityId.replace('.', '_')}`;
  const sensorDomain = sensorTypeForDomain(entity.domain);

  switch (propName) {
    case 'isOn':
      return {
        signalName: `sig_${sourceId}`,
        valueType: 'bool',
        sourceDomain: 'binary_sensor',
        sourceId,
        triggerType: 'on_state',
      };
    case 'isOpen':
      return {
        signalName: `sig_${sourceId}`,
        valueType: 'bool',
        sourceDomain: 'binary_sensor',
        sourceId,
        triggerType: 'on_state',
      };
    case 'value':
      return {
        signalName: `sig_${sourceId}`,
        valueType: 'float',
        sourceDomain: 'sensor',
        sourceId,
        triggerType: 'on_value',
      };
    case 'stateText':
      return {
        signalName: `sig_${sourceId}`,
        valueType: 'string',
        sourceDomain: sensorDomain,
        sourceId,
        triggerType: sensorDomain === 'sensor' ? 'on_value' : 'on_state',
      };
    case 'brightness': {
      const brightnessId = `${sourceId}_brightness`;
      return {
        signalName: `sig_${brightnessId}`,
        valueType: 'float',
        sourceDomain: 'sensor',
        sourceId: brightnessId,
        triggerType: 'on_value',
      };
    }
    default:
      return null;
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Script/trigger expression IR compiler (ExprNode output)
// ────────────────────────────────────────────────────────────────────────────

/**
 * Compile a script/trigger TS expression to an ExprNode tree.
 */
export function translateScriptExprIR(
  node: ts.Expression,
  ctx: ScriptTransformContext,
): ExprNode | null {
  if (ts.isNumericLiteral(node)) {
    return { kind: 'literal', value: Number(node.text), type: 'float' };
  }
  if (ts.isStringLiteral(node)) {
    return { kind: 'literal', value: node.text, type: 'string' };
  }
  if (node.kind === ts.SyntaxKind.TrueKeyword) {
    return { kind: 'literal', value: true, type: 'bool' };
  }
  if (node.kind === ts.SyntaxKind.FalseKeyword) {
    return { kind: 'literal', value: false, type: 'bool' };
  }
  if (node.kind === ts.SyntaxKind.NullKeyword) {
    return { kind: 'literal', value: 0, type: 'int' };
  }

  if (ts.isIdentifier(node)) {
    if (ctx.localVars.has(node.text)) {
      return { kind: 'trigger_var', name: node.text };
    }
    return null;
  }

  if (ts.isPropertyAccessExpression(node)) {
    if (ts.isIdentifier(node.expression) && node.expression.text === ctx.triggerParamName) {
      return { kind: 'trigger_var', name: node.name.text };
    }
    return null;
  }

  if (ts.isBinaryExpression(node)) {
    // Null coalescing operator (??)
    if (node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken) {
      const left = translateScriptExprIR(node.left, ctx);
      const right = translateScriptExprIR(node.right, ctx);
      if (!left || !right) return null;
      // Default to 'float' in script context (most common for sensor ?? fallback)
      return { kind: 'null_coalesce', left, right, type: 'float' };
    }

    const left = translateScriptExprIR(node.left, ctx);
    const right = translateScriptExprIR(node.right, ctx);
    if (!left || !right) return null;
    const op = translateBinaryOp(node.operatorToken.kind);
    if (!op) return null;
    return { kind: 'binary', op: op as BinaryOp, left, right };
  }

  if (ts.isPrefixUnaryExpression(node)) {
    const operand = translateScriptExprIR(node.operand, ctx);
    if (!operand) return null;
    const op = translatePrefixOp(node.operator);
    if (!op) return null;
    return { kind: 'unary', op: op as UnaryOp, operand };
  }

  if (ts.isPostfixUnaryExpression(node)) {
    const operand = translateScriptExprIR(node.operand, ctx);
    if (!operand) return null;
    const op = node.operator === ts.SyntaxKind.PlusPlusToken ? '++' : '--';
    return { kind: 'postfix', op: op as PostfixOp, operand };
  }

  if (ts.isParenthesizedExpression(node)) {
    const inner = translateScriptExprIR(node.expression, ctx);
    if (!inner) return null;
    return { kind: 'group', expr: inner };
  }

  if (ts.isConditionalExpression(node)) {
    const test = translateScriptExprIR(node.condition, ctx);
    const consequent = translateScriptExprIR(node.whenTrue, ctx);
    const alternate = translateScriptExprIR(node.whenFalse, ctx);
    if (!test || !consequent || !alternate) return null;
    return { kind: 'ternary', test, consequent, alternate };
  }

  if (ts.isCallExpression(node)) {
    if (ts.isPropertyAccessExpression(node.expression) &&
        ts.isIdentifier(node.expression.expression) &&
        node.expression.expression.text === 'Math') {
      const method = node.expression.name.text;
      const builtinFn = TS_MATH_TO_BUILTIN[method];
      if (!builtinFn) return null;
      const args: ExprNode[] = [];
      for (const arg of node.arguments) {
        const compiled = translateScriptExprIR(arg, ctx);
        if (!compiled) return null;
        args.push(compiled);
      }
      return { kind: 'call', fn: builtinFn, args };
    }

    // Number(x), String(x), Boolean(x) → type_cast
    if (ts.isIdentifier(node.expression) && node.arguments.length === 1) {
      const name = node.expression.text;
      const castTarget = TYPE_CAST_MAP[name];
      if (castTarget) {
        const arg = translateScriptExprIR(node.arguments[0], ctx);
        if (!arg) return null;
        // Default fromType to 'float' in script context
        return { kind: 'type_cast', expr: arg, fromType: 'float', toType: castTarget };
      }
    }

    return null;
  }

  if (ts.isTemplateExpression(node)) {
    const parts: ExprNode[] = [];
    if (node.head.text) {
      parts.push({ kind: 'literal', value: node.head.text, type: 'string' });
    }
    for (const span of node.templateSpans) {
      const compiled = translateScriptExprIR(span.expression, ctx);
      if (!compiled) return null;
      parts.push({ kind: 'to_string', expr: compiled });
      if (span.literal.text) {
        parts.push({ kind: 'literal', value: span.literal.text, type: 'string' });
      }
    }
    return parts.length > 0
      ? { kind: 'concat', parts }
      : { kind: 'literal', value: '', type: 'string' };
  }

  if (ts.isNoSubstitutionTemplateLiteral(node)) {
    return { kind: 'literal', value: node.text, type: 'string' };
  }

  return null;
}

// ────────────────────────────────────────────────────────────────────────────
// Shared operator/utility functions
// ────────────────────────────────────────────────────────────────────────────

export function translateBinaryOp(kind: ts.SyntaxKind): string | null {
  switch (kind) {
    case ts.SyntaxKind.PlusToken: return '+';
    case ts.SyntaxKind.MinusToken: return '-';
    case ts.SyntaxKind.AsteriskToken: return '*';
    case ts.SyntaxKind.SlashToken: return '/';
    case ts.SyntaxKind.PercentToken: return '%';
    case ts.SyntaxKind.EqualsEqualsToken: return '==';
    case ts.SyntaxKind.EqualsEqualsEqualsToken: return '==';
    case ts.SyntaxKind.ExclamationEqualsToken: return '!=';
    case ts.SyntaxKind.ExclamationEqualsEqualsToken: return '!=';
    case ts.SyntaxKind.GreaterThanToken: return '>';
    case ts.SyntaxKind.LessThanToken: return '<';
    case ts.SyntaxKind.GreaterThanEqualsToken: return '>=';
    case ts.SyntaxKind.LessThanEqualsToken: return '<=';
    case ts.SyntaxKind.AmpersandAmpersandToken: return '&&';
    case ts.SyntaxKind.BarBarToken: return '||';
    case ts.SyntaxKind.AmpersandToken: return '&';
    case ts.SyntaxKind.BarToken: return '|';
    case ts.SyntaxKind.CaretToken: return '^';
    case ts.SyntaxKind.LessThanLessThanToken: return '<<';
    case ts.SyntaxKind.GreaterThanGreaterThanToken: return '>>';
    case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken: return '>>';
    case ts.SyntaxKind.EqualsToken: return '=';
    case ts.SyntaxKind.PlusEqualsToken: return '+=';
    case ts.SyntaxKind.MinusEqualsToken: return '-=';
    case ts.SyntaxKind.AsteriskEqualsToken: return '*=';
    case ts.SyntaxKind.SlashEqualsToken: return '/=';
    default: return null;
  }
}

export function translatePrefixOp(op: ts.PrefixUnaryOperator): string | null {
  switch (op) {
    case ts.SyntaxKind.ExclamationToken: return '!';
    case ts.SyntaxKind.MinusToken: return '-';
    case ts.SyntaxKind.PlusToken: return '+';
    case ts.SyntaxKind.TildeToken: return '~';
    case ts.SyntaxKind.PlusPlusToken: return '++';
    case ts.SyntaxKind.MinusMinusToken: return '--';
    default: return null;
  }
}

export function escapeStringForCpp(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}

// ────────────────────────────────────────────────────────────────────────────
// HA entity scanner (shared utility)
// ────────────────────────────────────────────────────────────────────────────

/**
 * Walk the file looking for `const x = useHAEntity(...)` patterns.
 * Records the declaration symbol → entity mapping for scope-aware lookup.
 *
 * Supports:
 *   - String literal: useHAEntity('light.kitchen') → static entity
 *   - Domain hint:    useHAEntity(expr, { domain: 'light' }) → dynamic entity
 *   - Template literal type inference via checker
 *
 * When a checker is provided, uses ts.Symbol keys for scope-safe resolution.
 * Falls back to variable name keys (string) when checker is unavailable.
 */
export interface ScanDiagnostic {
  message: string;
  file: string;
  line?: number;
  character?: number;
}

export function scanForHAEntities(
  node: ts.Node,
  haEntities: Map<ts.Symbol, HAEntityInfo>,
  checker?: ts.TypeChecker,
  diagnostics?: ScanDiagnostic[],
): void {
  if (ts.isVariableDeclaration(node) && node.initializer && ts.isIdentifier(node.name)) {
    const init = node.initializer;
    if (ts.isCallExpression(init)) {
      const callee = init.expression;
      const isUseHAEntity = ts.isIdentifier(callee) && callee.text === 'useHAEntity';

      if (isUseHAEntity && init.arguments.length >= 1) {
        const firstArg = init.arguments[0];

        if (ts.isStringLiteral(firstArg)) {
          // Static entity ID: useHAEntity('light.kitchen')
          const entityId = firstArg.text;
          const dotIdx = entityId.indexOf('.');
          const domain = dotIdx >= 0 ? entityId.slice(0, dotIdx) : entityId;

          const sym = checker?.getSymbolAtLocation(node.name);
          if (sym) {
            haEntities.set(sym, { entityId, domain });
          }
        } else {
          // Dynamic entity ID — try to extract domain from:
          // 1. Second argument: { domain: 'light' }
          // 2. Type of first argument via checker (template literal type)
          let domain: string | undefined;
          const entityIdExpr = firstArg.getText();

          // Check for domain hint in second argument
          if (init.arguments.length >= 2) {
            const secondArg = init.arguments[1];
            if (ts.isObjectLiteralExpression(secondArg)) {
              for (const prop of secondArg.properties) {
                if (ts.isPropertyAssignment(prop) &&
                    ts.isIdentifier(prop.name) &&
                    prop.name.text === 'domain' &&
                    ts.isStringLiteral(prop.initializer)) {
                  domain = prop.initializer.text;
                }
              }
            }
          }

          // Fallback: try to infer domain from the TypeScript type of the first argument
          if (!domain && checker) {
            domain = inferDomainFromType(firstArg, checker);
          }

          if (domain) {
            const sym = checker?.getSymbolAtLocation(node.name);
            if (sym) {
              haEntities.set(sym, {
                entityId: `__dynamic__`,
                domain,
                isDynamic: true,
                entityIdExpr,
              });
            }
          } else if (diagnostics) {
            // Domain cannot be determined — emit a build error
            const sourceFile = node.getSourceFile();
            const { line, character } = sourceFile
              ? sourceFile.getLineAndCharacterOfPosition(init.getStart())
              : { line: 0, character: 0 };
            diagnostics.push({
              message:
                `useHAEntity() with a variable argument requires a domain hint or a ` +
                `constrained type. Use useHAEntity(${entityIdExpr}, { domain: 'light' }) ` +
                `or type the argument as \`light.\${string}\` so the compiler can ` +
                `determine the HA domain.`,
              file: sourceFile?.fileName ?? '<unknown>',
              line: line + 1,
              character: character + 1,
            });
          }
        }
      }
    }
  }
  ts.forEachChild(node, child => scanForHAEntities(child, haEntities, checker, diagnostics));
}

/**
 * Try to infer the HA domain from the TypeScript type of an expression.
 *
 * Handles template literal types like `light.${string}` by extracting the
 * prefix before the dot.
 */
function inferDomainFromType(expr: ts.Expression, checker: ts.TypeChecker): string | undefined {
  const type = checker.getTypeAtLocation(expr);
  // Check if it's a string literal type (e.g., from a const assertion)
  if (type.isStringLiteral()) {
    const dotIdx = type.value.indexOf('.');
    return dotIdx >= 0 ? type.value.slice(0, dotIdx) : undefined;
  }
  // Check for template literal types — the type text looks like `light.${string}`
  const typeStr = checker.typeToString(type);
  const templateMatch = typeStr.match(/^`(\w+)\.$\{string\}`$/);
  if (templateMatch) {
    return templateMatch[1];
  }
  // Check for union of template literal types (e.g., `light.${string}` | `switch.${string}`)
  // — only if all branches share the same domain prefix
  if (type.isUnion()) {
    const domains = new Set<string>();
    for (const t of type.types) {
      const tStr = checker.typeToString(t);
      const m = tStr.match(/^`(\w+)\.$\{string\}`$/);
      if (m) domains.add(m[1]);
    }
    if (domains.size === 1) return domains.values().next().value;
  }
  return undefined;
}

// ────────────────────────────────────────────────────────────────────────────
// ExpressionIR compilation — TypeScript AST → ExprNode
//
// Parallels compileExpr() but produces target-agnostic ExprNode trees
// instead of C++ strings. Used by Phase B+ of the Expression IR plan.
// ────────────────────────────────────────────────────────────────────────────

const TS_MATH_TO_BUILTIN: Record<string, BuiltinFn> = {
  min: 'math_min', max: 'math_max',
  abs: 'math_abs', round: 'math_round',
  floor: 'math_floor', ceil: 'math_ceil',
  trunc: 'math_trunc',
  sqrt: 'math_sqrt', pow: 'math_pow',
  log: 'math_log', log2: 'math_log2', log10: 'math_log10',
  sin: 'math_sin', cos: 'math_cos', tan: 'math_tan',
  clamp: 'math_clamp',
};

/** Map of global type cast function names → target ExprType. */
const TYPE_CAST_MAP: Record<string, ExprType> = {
  Number: 'float',
  String: 'string',
  Boolean: 'bool',
};

/** Set of string method names supported in ExprIR. */
const STRING_METHOD_SET: Record<string, true> = {
  toUpperCase: true,
  toLowerCase: true,
  substring: true,
  charAt: true,
  indexOf: true,
  trim: true,
};

/** Check if a TS type is string-like (including intersections with string). */
function isStringLikeType(type: ts.Type): boolean {
  if (type.flags & ts.TypeFlags.StringLike) return true;
  if (type.isIntersection()) return type.types.some(t => isStringLikeType(t));
  if (type.isUnion()) return type.types.some(t => isStringLikeType(t));
  return false;
}

export interface ExprIRResult {
  expr: ExprNode;
  exprType: ExprType;
  deps: DependencyInfo[];
  slots?: { expr: ts.Expression }[];
}

/**
 * Compile a TypeScript expression to a target-agnostic ExprNode tree.
 * Returns null if the expression contains unsupported patterns.
 */
export function translateReactiveExprIR(
  node: ts.Expression,
  ctx: ExprCompilerContext,
): ExprIRResult | null {
  const expr = compileExprIR(node, ctx);
  if (expr === null) return null;

  const deps = Array.from(ctx.dependencies.values());
  const exprType = inferExprType(node, ctx);

  const result: ExprIRResult = { expr, exprType, deps };
  if (ctx.slots.length > 0) {
    result.slots = ctx.slots.map(s => ({ expr: s.expr }));
  }
  return result;
}

function compileExprIR(node: ts.Expression, ctx: ExprCompilerContext): ExprNode | null {
  if (ts.isNumericLiteral(node)) {
    return { kind: 'literal', value: Number(node.text), type: 'float' };
  }
  if (ts.isStringLiteral(node)) {
    return { kind: 'literal', value: node.text, type: 'string' };
  }
  if (node.kind === ts.SyntaxKind.TrueKeyword) {
    return { kind: 'literal', value: true, type: 'bool' };
  }
  if (node.kind === ts.SyntaxKind.FalseKeyword) {
    return { kind: 'literal', value: false, type: 'bool' };
  }
  if (node.kind === ts.SyntaxKind.NullKeyword) {
    return { kind: 'literal', value: 0, type: 'int' };
  }

  if (ts.isIdentifier(node)) {
    const type = ctx.checker.getTypeAtLocation(node);
    if (hasSignalBrand(type)) {
      return assignSlotIR(node, ctx);
    }
  }

  if (ts.isPropertyAccessExpression(node)) {
    return compilePropertyAccessIR(node, ctx);
  }

  if (ts.isBinaryExpression(node)) {
    // Null coalescing operator (??)
    if (node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken) {
      const left = compileExprIR(node.left, ctx);
      const right = compileExprIR(node.right, ctx);
      if (left === null || right === null) return null;
      const leftType = inferExprType(node.left, ctx);
      return { kind: 'null_coalesce', left, right, type: leftType };
    }

    const left = compileExprIR(node.left, ctx);
    const right = compileExprIR(node.right, ctx);
    if (left === null || right === null) return null;
    const op = translateBinaryOp(node.operatorToken.kind);
    if (op === null) return null;
    return { kind: 'binary', op: op as ExprNode extends { kind: 'binary' } ? ExprNode['op'] : never, left, right };
  }

  if (ts.isPrefixUnaryExpression(node)) {
    const operand = compileExprIR(node.operand, ctx);
    if (operand === null) return null;
    const op = translatePrefixOp(node.operator);
    if (op === null) return null;
    return { kind: 'unary', op: op as ExprNode extends { kind: 'unary' } ? ExprNode['op'] : never, operand };
  }

  if (ts.isPostfixUnaryExpression(node)) {
    const operand = compileExprIR(node.operand, ctx);
    if (operand === null) return null;
    const op = node.operator === ts.SyntaxKind.PlusPlusToken ? '++' : '--';
    return { kind: 'postfix', op: op as '++' | '--', operand };
  }

  if (ts.isParenthesizedExpression(node)) {
    const inner = compileExprIR(node.expression, ctx);
    if (inner === null) return null;
    return { kind: 'group', expr: inner };
  }

  if (ts.isConditionalExpression(node)) {
    const test = compileExprIR(node.condition, ctx);
    const consequent = compileExprIR(node.whenTrue, ctx);
    const alternate = compileExprIR(node.whenFalse, ctx);
    if (test === null || consequent === null || alternate === null) return null;
    return { kind: 'ternary', test, consequent, alternate };
  }

  if (ts.isCallExpression(node)) {
    return compileCallExprIR(node, ctx);
  }

  if (ts.isTemplateExpression(node)) {
    return compileTemplateLiteralIR(node, ctx);
  }

  if (ts.isNoSubstitutionTemplateLiteral(node)) {
    return { kind: 'literal', value: node.text, type: 'string' };
  }

  return null;
}

function compilePropertyAccessIR(
  node: ts.PropertyAccessExpression,
  ctx: ExprCompilerContext,
): ExprNode | null {
  const propName = node.name.text;

  if (ts.isIdentifier(node.expression)) {
    const sym = ctx.checker.getSymbolAtLocation(node.expression);
    const entity = sym ? ctx.haEntities.get(sym) : undefined;
    if (entity && !entity.isDynamic) {
      const varName = node.expression.text;
      const signalInfo = resolveSignalProperty(varName, propName, entity);
      if (signalInfo) {
        ctx.dependencies.set(signalInfo.signalName, {
          signalName: signalInfo.signalName,
          sourceId: signalInfo.sourceId,
          triggerType: signalInfo.triggerType,
          sourceDomain: signalInfo.sourceDomain,
          valueType: signalInfo.valueType,
          sourceType: signalInfo.sourceType,
        });
        const exprType = valueTypeToExprType(signalInfo.valueType);
        return { kind: 'entity_prop', entityId: entity.entityId, property: propName, type: exprType };
      }
    }
  }

  const type = ctx.checker.getTypeAtLocation(node);
  if (hasSignalBrand(type)) {
    return assignSlotIR(node, ctx);
  }

  // .length on a string-typed expression → string_method
  if (propName === 'length') {
    const objType = ctx.checker.getTypeAtLocation(node.expression);
    if (isStringLikeType(objType)) {
      const obj = compileExprIR(node.expression, ctx);
      if (obj !== null) return { kind: 'string_method', method: 'length', object: obj, args: [] };
    }
  }

  return null;
}

function assignSlotIR(expr: ts.Expression, ctx: ExprCompilerContext): ExprNode {
  const slotIndex = ctx.slots.length;
  ctx.slots.push({ expr, slotIndex });
  return { kind: 'slot', slotIndex };
}

function compileCallExprIR(node: ts.CallExpression, ctx: ExprCompilerContext): ExprNode | null {
  // Math.* calls
  if (ts.isPropertyAccessExpression(node.expression) &&
      ts.isIdentifier(node.expression.expression) &&
      node.expression.expression.text === 'Math') {
    const method = node.expression.name.text;
    const builtinFn = TS_MATH_TO_BUILTIN[method];
    if (!builtinFn) return null;
    const args: ExprNode[] = [];
    for (const arg of node.arguments) {
      const compiled = compileExprIR(arg, ctx);
      if (compiled === null) return null;
      args.push(compiled);
    }
    return { kind: 'call', fn: builtinFn, args };
  }

  // isNaN(x) → call is_nan
  if (ts.isIdentifier(node.expression) && node.expression.text === 'isNaN') {
    if (node.arguments.length === 1) {
      const arg = compileExprIR(node.arguments[0], ctx);
      if (arg === null) return null;
      return { kind: 'call', fn: 'is_nan', args: [arg] };
    }
  }

  // Number(x), String(x), Boolean(x) → type_cast
  if (ts.isIdentifier(node.expression) && node.arguments.length === 1) {
    const name = node.expression.text;
    const castTarget = TYPE_CAST_MAP[name];
    if (castTarget) {
      const arg = compileExprIR(node.arguments[0], ctx);
      if (arg === null) return null;
      const fromType = inferExprType(node.arguments[0], ctx);
      return { kind: 'type_cast', expr: arg, fromType, toType: castTarget };
    }
  }

  // Method calls on compiled expressions: .toFixed(n), .toUpperCase(), etc.
  if (ts.isPropertyAccessExpression(node.expression)) {
    const methodName = node.expression.name.text;
    const objectExpr = node.expression.expression;

    // .toFixed(n) → format_string
    if (methodName === 'toFixed' && node.arguments.length === 1) {
      const obj = compileExprIR(objectExpr, ctx);
      if (obj === null) return null;
      const precisionArg = node.arguments[0];
      if (ts.isNumericLiteral(precisionArg)) {
        const precision = parseInt(precisionArg.text, 10);
        return { kind: 'format_string', expr: obj, format: `%.${precision}f` };
      }
      return null;
    }

    // String methods → string_method
    if (methodName in STRING_METHOD_SET) {
      const obj = compileExprIR(objectExpr, ctx);
      if (obj === null) return null;
      const args: ExprNode[] = [];
      for (const arg of node.arguments) {
        const compiled = compileExprIR(arg, ctx);
        if (compiled === null) return null;
        args.push(compiled);
      }
      return { kind: 'string_method', method: methodName as StringMethod, object: obj, args };
    }
  }

  return null;
}

function compileTemplateLiteralIR(
  node: ts.TemplateExpression,
  ctx: ExprCompilerContext,
): ExprNode | null {
  const parts: ExprNode[] = [];
  if (node.head.text) {
    parts.push({ kind: 'literal', value: node.head.text, type: 'string' });
  }

  for (const span of node.templateSpans) {
    const exprIR = compileExprIR(span.expression, ctx);
    if (exprIR === null) return null;

    const exprType = ctx.checker.getTypeAtLocation(span.expression);
    const isString = (exprType.flags & ts.TypeFlags.StringLike) !== 0
      || (exprType.isIntersection() && exprType.types.some(t => (t.flags & ts.TypeFlags.StringLike) !== 0));

    parts.push(isString ? exprIR : { kind: 'to_string', expr: exprIR });

    if (span.literal.text) {
      parts.push({ kind: 'literal', value: span.literal.text, type: 'string' });
    }
  }

  if (parts.length === 0) return { kind: 'literal', value: '', type: 'string' };
  if (parts.length === 1) return parts[0];
  return { kind: 'concat', parts };
}

function inferExprType(node: ts.Expression, ctx: ExprCompilerContext): ExprType {
  const type = ctx.checker.getTypeAtLocation(node);

  if (type.flags & ts.TypeFlags.StringLike) return 'string';
  if (type.flags & ts.TypeFlags.NumberLike) return 'float';
  if (type.flags & ts.TypeFlags.BooleanLike) return 'bool';

  if (type.isUnion()) {
    if (type.types.some(t => t.flags & ts.TypeFlags.StringLike)) return 'string';
    if (type.types.some(t => t.flags & ts.TypeFlags.NumberLike)) return 'float';
    if (type.types.some(t => t.flags & ts.TypeFlags.BooleanLike)) return 'bool';
  }

  if (type.isIntersection()) {
    for (const t of type.types) {
      if (t.flags & ts.TypeFlags.StringLike) return 'string';
      if (t.flags & ts.TypeFlags.NumberLike) return 'float';
      if (t.flags & ts.TypeFlags.BooleanLike) return 'bool';
    }
  }

  return 'float';
}

/**
 * Cast valueType string to ExprType. Since valueType already uses ExprType
 * values, this is essentially an identity function with type validation.
 */
function valueTypeToExprType(valueType: string): ExprType {
  const validTypes = ['bool', 'float', 'int', 'string', 'color', 'font_ptr', 'unknown'] as const;
  return validTypes.includes(valueType as ExprType) ? (valueType as ExprType) : 'float';
}
