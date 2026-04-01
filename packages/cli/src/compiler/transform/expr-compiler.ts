/**
 * Shared Expression Compiler — TypeScript AST → C++ expression translator.
 *
 * Extracted from script-transformer.ts and extended with:
 *   - Signal<T> property access → `<cppSignalName>.get()`
 *   - `isNaN()` → `std::isnan()`
 *   - ExprCompilerContext for signal resolution
 *
 * Used by:
 *   - reactive-transformer.ts (reactive JSX attribute compilation)
 *   - script-transformer.ts (trigger handler / createScript body compilation)
 */

import ts from 'typescript';

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
  cppSignalName: string;
  /** C++ type of the signal, e.g. `bool`, `float`, `std::string` */
  cppType: string;
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
  cppType: string;
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
   * as a runtime argument to _reactive.slotted().
   */
  slots: { expr: ts.Expression; slotIndex: number }[];
}

export interface ReactiveExprResult {
  cpp: string;
  cppType: string;
  deps: DependencyInfo[];
  /** Ordered list of runtime Signal expressions that need slot substitution. */
  slots?: { expr: ts.Expression }[];
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
        cppSignalName: `sig_${sourceId}`,
        cppType: 'bool',
        sourceDomain: 'binary_sensor',
        sourceId,
        triggerType: 'on_state',
      };
    case 'isOpen':
      return {
        cppSignalName: `sig_${sourceId}`,
        cppType: 'bool',
        sourceDomain: 'binary_sensor',
        sourceId,
        triggerType: 'on_state',
      };
    case 'value':
      return {
        cppSignalName: `sig_${sourceId}`,
        cppType: 'float',
        sourceDomain: 'sensor',
        sourceId,
        triggerType: 'on_value',
      };
    case 'stateText':
      return {
        cppSignalName: `sig_${sourceId}`,
        cppType: 'std::string',
        sourceDomain: sensorDomain,
        sourceId,
        triggerType: sensorDomain === 'sensor' ? 'on_value' : 'on_state',
      };
    case 'brightness': {
      const brightnessId = `${sourceId}_brightness`;
      return {
        cppSignalName: `sig_${brightnessId}`,
        cppType: 'float',
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
// Reactive expression compiler (for JSX attribute expressions)
// ────────────────────────────────────────────────────────────────────────────

/**
 * Compile a TypeScript expression AST node to a C++ expression string,
 * resolving Signal<T> property accesses to their C++ signal getters.
 *
 * Returns null if the expression contains unsupported patterns.
 */
export function translateReactiveExpr(
  node: ts.Expression,
  ctx: ExprCompilerContext,
): ReactiveExprResult | null {
  const cpp = compileExpr(node, ctx);
  if (cpp === null) return null;

  const deps = Array.from(ctx.dependencies.values());

  // Infer C++ return type from the expression
  const cppType = inferCppReturnType(node, ctx);

  const result: ReactiveExprResult = { cpp, cppType, deps };
  if (ctx.slots.length > 0) {
    result.slots = ctx.slots.map(s => ({ expr: s.expr }));
  }
  return result;
}

function compileExpr(node: ts.Expression, ctx: ExprCompilerContext): string | null {
  if (ts.isNumericLiteral(node)) return node.text;
  if (ts.isStringLiteral(node)) return `std::string("${escapeStringForCpp(node.text)}")`;
  if (node.kind === ts.SyntaxKind.TrueKeyword) return 'true';
  if (node.kind === ts.SyntaxKind.FalseKeyword) return 'false';
  if (node.kind === ts.SyntaxKind.NullKeyword) return 'nullptr';

  if (ts.isIdentifier(node)) {
    // Signal-branded identifier → assign a slot
    const type = ctx.checker.getTypeAtLocation(node);
    if (hasSignalBrand(type)) {
      return assignSlot(node, ctx);
    }
  }

  // Signal property access: entity.isOn, entity.value, or generic Signal<T>
  if (ts.isPropertyAccessExpression(node)) {
    return compilePropertyAccess(node, ctx);
  }

  if (ts.isBinaryExpression(node)) {
    const leftCpp = compileExpr(node.left, ctx);
    const rightCpp = compileExpr(node.right, ctx);
    if (leftCpp === null || rightCpp === null) return null;
    const op = translateBinaryOp(node.operatorToken.kind);
    if (op === null) return null;
    return `${leftCpp} ${op} ${rightCpp}`;
  }

  if (ts.isPrefixUnaryExpression(node)) {
    const operandCpp = compileExpr(node.operand, ctx);
    if (operandCpp === null) return null;
    const op = translatePrefixOp(node.operator);
    if (op === null) return null;
    return `${op}${operandCpp}`;
  }

  if (ts.isPostfixUnaryExpression(node)) {
    const operandCpp = compileExpr(node.operand, ctx);
    if (operandCpp === null) return null;
    const op = node.operator === ts.SyntaxKind.PlusPlusToken ? '++' : '--';
    return `${operandCpp}${op}`;
  }

  if (ts.isParenthesizedExpression(node)) {
    const innerCpp = compileExpr(node.expression, ctx);
    if (innerCpp === null) return null;
    return `(${innerCpp})`;
  }

  if (ts.isConditionalExpression(node)) {
    const condCpp = compileExpr(node.condition, ctx);
    const whenTrueCpp = compileExpr(node.whenTrue, ctx);
    const whenFalseCpp = compileExpr(node.whenFalse, ctx);
    if (condCpp === null || whenTrueCpp === null || whenFalseCpp === null) return null;
    return `${condCpp} ? ${whenTrueCpp} : ${whenFalseCpp}`;
  }

  if (ts.isCallExpression(node)) {
    return compileCallExpr(node, ctx);
  }

  if (ts.isTemplateExpression(node)) {
    return compileTemplateLiteral(node, ctx);
  }

  if (ts.isNoSubstitutionTemplateLiteral(node)) {
    return `std::string("${escapeStringForCpp(node.text)}")`;
  }

  return null;
}

function compilePropertyAccess(
  node: ts.PropertyAccessExpression,
  ctx: ExprCompilerContext,
): string | null {
  const propName = node.name.text;

  // Check if this property access is on a known HA entity variable
  if (ts.isIdentifier(node.expression)) {
    const sym = ctx.checker.getSymbolAtLocation(node.expression);
    const entity = sym ? ctx.haEntities.get(sym) : undefined;
    if (entity && !entity.isDynamic) {
      // Static entity: resolve to C++ signal getter
      const varName = node.expression.text;
      const signalInfo = resolveSignalProperty(varName, propName, entity);
      if (signalInfo) {
        // Register this dependency
        ctx.dependencies.set(signalInfo.cppSignalName, {
          signalName: signalInfo.cppSignalName,
          sourceId: signalInfo.sourceId,
          triggerType: signalInfo.triggerType,
          sourceDomain: signalInfo.sourceDomain,
          cppType: signalInfo.cppType,
          sourceType: signalInfo.sourceType,
        });
        return `${signalInfo.cppSignalName}.get()`;
      }
    }
    // Dynamic entity: skip static resolution — fall through to slot assignment
    // below. The runtime ReactiveNode carries the correct signal metadata.
  }

  // Fallback: if the type is Signal<T>, assign a slot for runtime resolution
  const type = ctx.checker.getTypeAtLocation(node);
  if (hasSignalBrand(type)) {
    return assignSlot(node, ctx);
  }

  return null;
}

/**
 * Assign a slot placeholder for a Signal<T>-typed expression that can't
 * be resolved statically. The runtime will substitute the actual signal
 * name from the ReactiveNode.
 */
function assignSlot(expr: ts.Expression, ctx: ExprCompilerContext): string {
  const slotIndex = ctx.slots.length;
  ctx.slots.push({ expr, slotIndex });
  return `__$$SLOT_${slotIndex}$$__.get()`;
}

function compileCallExpr(node: ts.CallExpression, ctx: ExprCompilerContext): string | null {
  // Math.* calls
  if (ts.isPropertyAccessExpression(node.expression) &&
      ts.isIdentifier(node.expression.expression) &&
      node.expression.expression.text === 'Math') {
    return compileMathCall(node, node.expression.name.text, ctx);
  }

  // isNaN() → std::isnan()
  if (ts.isIdentifier(node.expression) && node.expression.text === 'isNaN') {
    if (node.arguments.length === 1) {
      const argCpp = compileExpr(node.arguments[0], ctx);
      if (argCpp === null) return null;
      return `std::isnan(${argCpp})`;
    }
  }

  return null;
}

function compileMathCall(
  node: ts.CallExpression,
  method: string,
  ctx: ExprCompilerContext,
): string | null {
  const cppFn = MATH_MAP[method];
  if (!cppFn) return null;

  const argsCpp: string[] = [];
  for (const arg of node.arguments) {
    const argCpp = compileExpr(arg, ctx);
    if (argCpp === null) return null;
    argsCpp.push(argCpp);
  }

  return `${cppFn}(${argsCpp.join(', ')})`;
}

function compileTemplateLiteral(
  node: ts.TemplateExpression,
  ctx: ExprCompilerContext,
): string | null {
  const parts: string[] = [];
  if (node.head.text) {
    parts.push(`std::string("${escapeStringForCpp(node.head.text)}")`);
  }

  for (const span of node.templateSpans) {
    const exprCpp = compileExpr(span.expression, ctx);
    if (exprCpp === null) return null;
    // Only wrap in std::to_string() for non-string types;
    // std::to_string(std::string) doesn't compile in C++.
    const exprType = ctx.checker.getTypeAtLocation(span.expression);
    const isString = (exprType.flags & ts.TypeFlags.StringLike) !== 0
      || (exprType.isIntersection() && exprType.types.some(t => (t.flags & ts.TypeFlags.StringLike) !== 0));
    parts.push(isString ? exprCpp : `std::to_string(${exprCpp})`);
    if (span.literal.text) {
      parts.push(`std::string("${escapeStringForCpp(span.literal.text)}")`);
    }
  }

  return parts.length > 0 ? parts.join(' + ') : 'std::string("")';
}

// ────────────────────────────────────────────────────────────────────────────
// C++ return type inference
// ────────────────────────────────────────────────────────────────────────────

function inferCppReturnType(node: ts.Expression, ctx: ExprCompilerContext): string {
  const checker = ctx.checker;
  const type = checker.getTypeAtLocation(node);

  if (type.flags & ts.TypeFlags.StringLike) return 'std::string';
  if (type.flags & ts.TypeFlags.NumberLike) return 'float';
  if (type.flags & ts.TypeFlags.BooleanLike) return 'bool';

  // Union types (e.g. ternary returning string | string) — check constituents
  if (type.isUnion()) {
    const hasString = type.types.some(t => t.flags & ts.TypeFlags.StringLike);
    const hasNumber = type.types.some(t => t.flags & ts.TypeFlags.NumberLike);
    const hasBool = type.types.some(t => t.flags & ts.TypeFlags.BooleanLike);

    if (hasString) return 'std::string';
    if (hasNumber) return 'float';
    if (hasBool) return 'bool';
  }

  // Intersection types (Signal<T>) — look at the non-branded constituent
  if (type.isIntersection()) {
    for (const t of type.types) {
      if (t.flags & ts.TypeFlags.StringLike) return 'std::string';
      if (t.flags & ts.TypeFlags.NumberLike) return 'float';
      if (t.flags & ts.TypeFlags.BooleanLike) return 'bool';
    }
  }

  // If there's exactly one slot and the expression is a direct passthrough
  // (no operations on it), use a slot type placeholder so the runtime
  // resolves the C++ type from ReactiveNode.cppType.
  if (ctx.slots.length === 1 && hasSignalBrand(type)) {
    return `__$$SLOT_TYPE_0$$__`;
  }

  // Default fallback
  return 'float';
}

// ────────────────────────────────────────────────────────────────────────────
// Script-mode expression translator
//
// This is the original translateExpr from script-transformer.ts, kept for
// backward compatibility with the script callback compiler.
// ────────────────────────────────────────────────────────────────────────────

export function translateScriptExpr(
  node: ts.Expression,
  ctx: ScriptTransformContext,
): string | null {
  if (ts.isNumericLiteral(node)) return node.text;
  if (ts.isStringLiteral(node)) return `std::string("${escapeStringForCpp(node.text)}")`;
  if (node.kind === ts.SyntaxKind.TrueKeyword) return 'true';
  if (node.kind === ts.SyntaxKind.FalseKeyword) return 'false';
  if (node.kind === ts.SyntaxKind.NullKeyword) return 'nullptr';

  if (ts.isIdentifier(node)) {
    if (ctx.localVars.has(node.text)) return node.text;
    return null;
  }

  if (ts.isPropertyAccessExpression(node)) {
    if (ts.isIdentifier(node.expression) && node.expression.text === ctx.triggerParamName) {
      return node.name.text;
    }
    if (ts.isIdentifier(node.expression) && ctx.localVars.has(node.expression.text)) {
      return null;
    }
    return null;
  }

  if (ts.isBinaryExpression(node)) {
    const leftCpp = translateScriptExpr(node.left, ctx);
    const rightCpp = translateScriptExpr(node.right, ctx);
    if (leftCpp === null || rightCpp === null) return null;
    const op = translateBinaryOp(node.operatorToken.kind);
    if (op === null) return null;
    return `${leftCpp} ${op} ${rightCpp}`;
  }

  if (ts.isPrefixUnaryExpression(node)) {
    const operandCpp = translateScriptExpr(node.operand, ctx);
    if (operandCpp === null) return null;
    const op = translatePrefixOp(node.operator);
    if (op === null) return null;
    return `${op}${operandCpp}`;
  }

  if (ts.isPostfixUnaryExpression(node)) {
    const operandCpp = translateScriptExpr(node.operand, ctx);
    if (operandCpp === null) return null;
    const op = node.operator === ts.SyntaxKind.PlusPlusToken ? '++' : '--';
    return `${operandCpp}${op}`;
  }

  if (ts.isParenthesizedExpression(node)) {
    const innerCpp = translateScriptExpr(node.expression, ctx);
    if (innerCpp === null) return null;
    return `(${innerCpp})`;
  }

  if (ts.isConditionalExpression(node)) {
    const condCpp = translateScriptExpr(node.condition, ctx);
    const whenTrueCpp = translateScriptExpr(node.whenTrue, ctx);
    const whenFalseCpp = translateScriptExpr(node.whenFalse, ctx);
    if (condCpp === null || whenTrueCpp === null || whenFalseCpp === null) return null;
    return `${condCpp} ? ${whenTrueCpp} : ${whenFalseCpp}`;
  }

  if (ts.isCallExpression(node)) {
    return translateScriptCallExpr(node, ctx);
  }

  if (ts.isTemplateExpression(node)) {
    return translateScriptTemplateLiteral(node, ctx);
  }

  if (ts.isNoSubstitutionTemplateLiteral(node)) {
    return `std::string("${escapeStringForCpp(node.text)}")`;
  }

  return null;
}

function translateScriptCallExpr(node: ts.CallExpression, ctx: ScriptTransformContext): string | null {
  if (ts.isPropertyAccessExpression(node.expression) &&
      ts.isIdentifier(node.expression.expression) &&
      node.expression.expression.text === 'Math') {
    return translateScriptMathCall(node, node.expression.name.text, ctx);
  }
  return null;
}

function translateScriptMathCall(
  node: ts.CallExpression,
  method: string,
  ctx: ScriptTransformContext,
): string | null {
  const cppFn = MATH_MAP[method];
  if (!cppFn) return null;

  const argsCpp: string[] = [];
  for (const arg of node.arguments) {
    const argCpp = translateScriptExpr(arg, ctx);
    if (argCpp === null) return null;
    argsCpp.push(argCpp);
  }

  return `${cppFn}(${argsCpp.join(', ')})`;
}

function translateScriptTemplateLiteral(
  node: ts.TemplateExpression,
  ctx: ScriptTransformContext,
): string | null {
  const parts: string[] = [];
  if (node.head.text) {
    parts.push(`std::string("${escapeStringForCpp(node.head.text)}")`);
  }

  for (const span of node.templateSpans) {
    const exprCpp = translateScriptExpr(span.expression, ctx);
    if (exprCpp === null) return null;
    parts.push(`std::to_string(${exprCpp})`);
    if (span.literal.text) {
      parts.push(`std::string("${escapeStringForCpp(span.literal.text)}")`);
    }
  }

  return parts.length > 0 ? parts.join(' + ') : 'std::string("")';
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

const MATH_MAP: Record<string, string> = {
  min: 'std::min', max: 'std::max',
  abs: 'std::abs', round: 'std::round',
  floor: 'std::floor', ceil: 'std::ceil',
  sqrt: 'std::sqrt', pow: 'std::pow',
  log: 'std::log', log2: 'std::log2', log10: 'std::log10',
  sin: 'std::sin', cos: 'std::cos', tan: 'std::tan',
};

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
