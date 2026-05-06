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
 *   - script-transformer.ts (trigger handler / useScript body compilation)
 */

import ts from 'typescript';
import type { IRExpression } from '@espcompose/core/internals';
import type { ExprType, BuiltinFn, BinaryOp, UnaryOp, PostfixOp, StringMethod, GlobalType, IRType, DependencySourceType } from '@espcompose/core/internals';
import {
  hashGlobalFingerprint, globalTypeToIRType, irTypeToExprType, REACTIVE_PROPERTY_MAP,
  irBinary, irUnary, irPostfix, irTernary, irCall, irConcat, irToString, irGroup,
  irTypeCast, irFormatString, irNullCoalesce, irStringMethod, irArrayIndex, irArrayMethod,
  irGlobalRead,
} from '@espcompose/core/internals';
import { isCoreExportCall } from './type-brands.js';

// ── Array type helpers ───────────────────────────────────────────────────────

function isArrayExprType(t: ExprType): boolean {
  return t === 'int_array' || t === 'float_array' || t === 'bool_array' || t === 'string_array';
}

function arrayElementType(t: ExprType): ExprType {
  switch (t) {
    case 'int_array': return 'int';
    case 'float_array': return 'float';
    case 'bool_array': return 'bool';
    case 'string_array': return 'string';
    default: return 'int';
  }
}

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
  /** Signal identifier, e.g. `sig_ha_light_office` */
  signalName: string;
  /** Expression type of the signal value, e.g. 'bool', 'float', 'string'. */
  exprType: ExprType;
  /** ESPHome platform for trigger lookup, e.g. `binary_sensor`, `sensor` */
  sourceDomain: string;
  /** ESPHome component ID, e.g. `ha_light_office` */
  sourceId: string;
  /** Source type — always 'ha_entity' for signal properties */
  sourceType: 'ha_entity';
}

export interface DependencyInfo {
  signalName: string;
  sourceId: string;
  sourceDomain?: string;
  /** Expression type of the dependency's value. */
  exprType: ExprType;
  sourceType: DependencySourceType;
}

export interface GlobalExprInfo {
  globalId: string;
  /** Target-agnostic type descriptor. The lowering target maps this to a concrete representation. */
  irType: IRType;
  /** ExprType for the IR node, e.g. 'int', 'float', 'bool', 'string'. */
  exprType: ExprType;
}

export interface ExprCompilerContext {
  checker: ts.TypeChecker;
  /** Map of declaration symbol → HA entity info (scope-aware lookup). */
  haEntities: Map<ts.Symbol, HAEntityInfo>;
  /** Map of declaration symbol → global variable info (for useGlobal handles). */
  globals: Map<ts.Symbol, GlobalExprInfo>;
  /** Collected dependencies during expression compilation. */
  dependencies: Map<string, DependencyInfo>;
  /**
   * Slot tracking for unresolvable Signal<T> subexpressions.
   * Each slot maps to the original AST expression that will be passed
   * as a runtime argument to __espcompose.slotted().
   */
  slots: { expr: ts.Expression; slotIndex: number }[];
  /**
   * Local variables declared in statement blocks.
   * When set, identifiers matching a key resolve to `expr:local_var` instead of slots.
   */
  localVars?: Map<ts.Symbol, { name: string; type: ExprType }>;
}

// ────────────────────────────────────────────────────────────────────────────
// Script-transformer context
// ────────────────────────────────────────────────────────────────────────────

export interface ScriptTransformContext {
  /** Name of the trigger args parameter in the current callback. */
  triggerParamName: string;
  /** Set of local variable names declared in the current callback body. */
  localVars: Set<string>;
  /** Map of variable name → global definition for resolving globalHandle.value reads. */
  globalHandlesByName?: Map<string, GlobalExprInfo>;
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

/**
 * Detect whether a TS type is (or contains) IRReactiveNode<T>.
 *
 * IRReactiveNode declares `readonly [REACTIVE_NODE_BRAND]?: T` which
 * the compiler mangles to `__@REACTIVE_NODE_BRAND@NNN`.
 */
export function hasReactiveNodeBrand(type: ts.Type): boolean {
  if (type.isIntersection()) {
    return type.types.some(t => hasReactiveNodeBrand(t));
  }
  if (type.isUnion()) {
    return type.types.some(t => hasReactiveNodeBrand(t));
  }
  for (const prop of type.getProperties()) {
    if (/^__@REACTIVE_NODE_BRAND@\d+$/.test(prop.name)) {
      return true;
    }
  }
  return false;
}

// ────────────────────────────────────────────────────────────────────────────
// Signal property resolution
// ────────────────────────────────────────────────────────────────────────────

/**
 * Resolve signal property info for a property access on an HA entity binding.
 *
 * Property metadata (sourceDomain, exprType) is looked up from
 * the generated REACTIVE_PROPERTY_MAP. Signal IDs are derived from entity IDs.
 */
function resolveSignalProperty(
  varName: string,
  propName: string,
  entity: HAEntityInfo,
): SignalPropertyInfo | null {
  const propConfig = REACTIVE_PROPERTY_MAP[propName];
  if (!propConfig) return null;

  const sourceId = `ha_${entity.entityId.replace('.', '_')}`;

  // Special cases: some properties use a derived source ID
  if (propName === 'brightness') {
    const brightnessId = `${sourceId}_brightness`;
    return {
      signalName: `sig_${brightnessId}`,
      exprType: propConfig.exprType,
      sourceDomain: propConfig.sourceDomain,
      sourceId: brightnessId,
      sourceType: 'ha_entity',
    };
  }

  // stateText always uses text_sensor regardless of entity domain
  if (propName === 'stateText') {
    return {
      signalName: `sig_${sourceId}`,
      exprType: propConfig.exprType,
      sourceDomain: propConfig.sourceDomain,
      sourceId,
      sourceType: 'ha_entity',
    };
  }

  return {
    signalName: `sig_${sourceId}`,
    exprType: propConfig.exprType,
    sourceDomain: propConfig.sourceDomain,
    sourceId,
    sourceType: 'ha_entity',
  };
}

// ────────────────────────────────────────────────────────────────────────────
// Script/trigger expression IR compiler (IRExpression output)
// ────────────────────────────────────────────────────────────────────────────

/**
 * Compile a script/trigger TS expression to an IRExpression tree.
 */
export function translateScriptExprIR(
  node: ts.Expression,
  ctx: ScriptTransformContext,
): IRExpression | null {
  if (ts.isNumericLiteral(node)) {
    return { kind: 'expr:literal', value: Number(node.text), type: 'float' };
  }
  if (ts.isStringLiteral(node)) {
    return { kind: 'expr:literal', value: node.text, type: 'string' };
  }
  if (node.kind === ts.SyntaxKind.TrueKeyword) {
    return { kind: 'expr:literal', value: true, type: 'bool' };
  }
  if (node.kind === ts.SyntaxKind.FalseKeyword) {
    return { kind: 'expr:literal', value: false, type: 'bool' };
  }
  if (node.kind === ts.SyntaxKind.NullKeyword) {
    return { kind: 'expr:literal', value: 0, type: 'int' };
  }

  if (ts.isIdentifier(node)) {
    if (ctx.localVars.has(node.text)) {
      return { kind: 'expr:trigger_var', name: node.text };
    }
    return null;
  }

  if (ts.isPropertyAccessExpression(node)) {
    if (ts.isIdentifier(node.expression) && node.expression.text === ctx.triggerParamName) {
      return { kind: 'expr:trigger_var', name: node.name.text };
    }
    // globalHandle.value → global_read
    if (ts.isIdentifier(node.expression) && node.name.text === 'value' && ctx.globalHandlesByName) {
      const globalInfo = ctx.globalHandlesByName.get(node.expression.text);
      if (globalInfo) {
        return irGlobalRead(globalInfo.globalId, globalInfo.exprType);
      }
    }
    // arrayHandle.length → array_method 'size'
    if (ts.isIdentifier(node.expression) && node.name.text === 'length' && ctx.globalHandlesByName) {
      const globalInfo = ctx.globalHandlesByName.get(node.expression.text);
      if (globalInfo && isArrayExprType(globalInfo.exprType)) {
        const globalRead = irGlobalRead(globalInfo.globalId, globalInfo.exprType);
        return irArrayMethod('size', globalRead, [], arrayElementType(globalInfo.exprType));
      }
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
      return irNullCoalesce(left, right, 'float');
    }

    const left = translateScriptExprIR(node.left, ctx);
    const right = translateScriptExprIR(node.right, ctx);
    if (!left || !right) return null;
    const op = translateBinaryOp(node.operatorToken.kind);
    if (!op) return null;
    return irBinary(op as BinaryOp, left, right);
  }

  if (ts.isPrefixUnaryExpression(node)) {
    const operand = translateScriptExprIR(node.operand, ctx);
    if (!operand) return null;
    const op = translatePrefixOp(node.operator);
    if (!op) return null;
    return irUnary(op as UnaryOp, operand);
  }

  if (ts.isPostfixUnaryExpression(node)) {
    const operand = translateScriptExprIR(node.operand, ctx);
    if (!operand) return null;
    const op = node.operator === ts.SyntaxKind.PlusPlusToken ? '++' : '--';
    return irPostfix(op as PostfixOp, operand);
  }

  if (ts.isParenthesizedExpression(node)) {
    const inner = translateScriptExprIR(node.expression, ctx);
    if (!inner) return null;
    return irGroup(inner);
  }

  if (ts.isConditionalExpression(node)) {
    const test = translateScriptExprIR(node.condition, ctx);
    const consequent = translateScriptExprIR(node.whenTrue, ctx);
    const alternate = translateScriptExprIR(node.whenFalse, ctx);
    if (!test || !consequent || !alternate) return null;
    return irTernary(test, consequent, alternate);
  }

  if (ts.isCallExpression(node)) {
    if (ts.isPropertyAccessExpression(node.expression) &&
        ts.isIdentifier(node.expression.expression) &&
        node.expression.expression.text === 'Math') {
      const method = node.expression.name.text;
      const builtinFn = TS_MATH_TO_BUILTIN[method];
      if (!builtinFn) return null;
      const args: IRExpression[] = [];
      for (const arg of node.arguments) {
        const compiled = translateScriptExprIR(arg, ctx);
        if (!compiled) return null;
        args.push(compiled);
      }
      return irCall(builtinFn, args);
    }

    // Number(x), String(x), Boolean(x) → type_cast
    if (ts.isIdentifier(node.expression) && node.arguments.length === 1) {
      const name = node.expression.text;
      const castTarget = TYPE_CAST_MAP[name];
      if (castTarget) {
        const arg = translateScriptExprIR(node.arguments[0], ctx);
        if (!arg) return null;
        // Default fromType to 'float' in script context
        return irTypeCast(arg, 'float', castTarget);
      }
    }

    // arrayHandle.get(i) → array_index
    if (ts.isPropertyAccessExpression(node.expression) && ts.isIdentifier(node.expression.expression) &&
        node.expression.name.text === 'get' && node.arguments.length === 1 && ctx.globalHandlesByName) {
      const globalInfo = ctx.globalHandlesByName.get(node.expression.expression.text);
      if (globalInfo && isArrayExprType(globalInfo.exprType)) {
        const indexArg = translateScriptExprIR(node.arguments[0], ctx);
        if (!indexArg) return null;
        const globalRead = irGlobalRead(globalInfo.globalId, globalInfo.exprType);
        return irArrayIndex(globalRead, indexArg, arrayElementType(globalInfo.exprType));
      }
    }

    return null;
  }

  if (ts.isTemplateExpression(node)) {
    const parts: IRExpression[] = [];
    if (node.head.text) {
      parts.push({ kind: 'expr:literal', value: node.head.text, type: 'string' });
    }
    for (const span of node.templateSpans) {
      const compiled = translateScriptExprIR(span.expression, ctx);
      if (!compiled) return null;
      parts.push(irToString(compiled));
      if (span.literal.text) {
        parts.push({ kind: 'expr:literal', value: span.literal.text, type: 'string' });
      }
    }
    return parts.length > 0
      ? irConcat(parts)
      : { kind: 'expr:literal', value: '', type: 'string' };
  }

  if (ts.isNoSubstitutionTemplateLiteral(node)) {
    return { kind: 'expr:literal', value: node.text, type: 'string' };
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
  checker: ts.TypeChecker,
  diagnostics?: ScanDiagnostic[],
): void {
  if (ts.isVariableDeclaration(node) && node.initializer && ts.isIdentifier(node.name)) {
    const init = node.initializer;
    if (ts.isCallExpression(init) && isCoreExportCall(init, 'useHAEntity', checker)) {
      if (init.arguments.length >= 1) {
        const firstArg = init.arguments[0];

        if (ts.isStringLiteral(firstArg)) {
          // Static entity ID: useHAEntity('light.kitchen')
          const entityId = firstArg.text;
          const dotIdx = entityId.indexOf('.');
          const domain = dotIdx >= 0 ? entityId.slice(0, dotIdx) : entityId;

          const sym = checker.getSymbolAtLocation(node.name);
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
          if (!domain) {
            domain = inferDomainFromType(firstArg, checker);
          }

          if (domain) {
            const sym = checker.getSymbolAtLocation(node.name);
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
// Global handle scanning
// ────────────────────────────────────────────────────────────────────────────

/**
 * Result of detecting a useGlobal() or useRetainedGlobal() call.
 * Contains the type information but NOT the globalId — callers derive that
 * using their own key strategy (counter-based or injected __key).
 */
export interface GlobalHookCallInfo {
  /** Whether this is a volatile (useGlobal) or retained (useRetainedGlobal) global. */
  kind: 'volatile' | 'retained';
  /** The target-agnostic IR type derived from the first argument. */
  irType: IRType;
  /** For retained globals, the key string literal from arg 2. */
  retainedKey?: string;
}

/**
 * Detect whether a call expression is a useGlobal() or useRetainedGlobal()
 * call and extract its type information.
 *
 * Returns null if the call is not a recognized global hook or if the
 * required arguments are not string literals.
 */
export function detectGlobalHookCall(
  call: ts.CallExpression,
  checker: ts.TypeChecker,
): GlobalHookCallInfo | null {
  // ── useGlobal('type', opts?) — volatile ────────────────────
  if (isCoreExportCall(call, 'useGlobal', checker) && call.arguments.length >= 1) {
    const typeArg = call.arguments[0];
    if (ts.isStringLiteral(typeArg)) {
      return {
        kind: 'volatile',
        irType: globalTypeToIRType(typeArg.text as GlobalType),
      };
    }
  }

  // ── useRetainedGlobal('type', 'key', opts?) — retained ────
  if (isCoreExportCall(call, 'useRetainedGlobal', checker) && call.arguments.length >= 2) {
    const typeArg = call.arguments[0];
    const keyArg = call.arguments[1];
    if (ts.isStringLiteral(typeArg) && ts.isStringLiteral(keyArg)) {
      return {
        kind: 'retained',
        irType: globalTypeToIRType(typeArg.text as GlobalType),
        retainedKey: keyArg.text,
      };
    }
  }

  return null;
}

/**
 * Scan a TS AST node for useGlobal() and useRetainedGlobal() calls,
 * populating a symbol → GlobalExprInfo map.
 *
 * Patterns:
 *   useGlobal('integer', { ... })              — volatile, key from varName + counter
 *   useRetainedGlobal('integer', 'key', { ... })  — retained, key is positional arg 2
 *
 * This scanner runs on the ORIGINAL AST before SourceEdits are applied,
 * so volatile globals derive their key from the variable name + counter
 * (same logic as global-key-injector.ts).
 */
export function scanForGlobalHandles(
  node: ts.Node,
  globals: Map<ts.Symbol, GlobalExprInfo>,
  checker: ts.TypeChecker,
  _counter?: { value: number },
): void {
  const counter = _counter ?? { value: 0 };

  if (ts.isVariableDeclaration(node) && node.initializer && ts.isIdentifier(node.name)) {
    const init = node.initializer;
    if (ts.isCallExpression(init)) {
      const info = detectGlobalHookCall(init, checker);
      if (info) {
        const fingerprint = info.kind === 'retained'
          ? info.retainedKey!
          : `${node.name.text}_${counter.value++}`;
        const globalId = hashGlobalFingerprint(fingerprint);
        const sym = checker.getSymbolAtLocation(node.name);
        if (sym) {
          globals.set(sym, { globalId, irType: info.irType, exprType: irTypeToExprType(info.irType) });
        }
      }
    }
  }
  ts.forEachChild(node, child => scanForGlobalHandles(child, globals, checker, counter));
}

// ────────────────────────────────────────────────────────────────────────────
// ExpressionIR compilation — TypeScript AST → IRExpression
//
// Parallels compileExpr() but produces target-agnostic IRExpression trees
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

/** Check if a TS type is a primitive (string, number, or boolean). */
function isPrimitiveType(type: ts.Type): boolean {
  const flags = type.flags;
  if (flags & (ts.TypeFlags.StringLike | ts.TypeFlags.NumberLike | ts.TypeFlags.BooleanLike)) return true;
  if (type.isIntersection()) return type.types.some(t => isPrimitiveType(t));
  if (type.isUnion()) return type.types.some(t => isPrimitiveType(t));
  return false;
}

export interface ExprIRResult {
  expr: IRExpression;
  exprType: ExprType;
  deps: DependencyInfo[];
  slots?: { expr: ts.Expression }[];
}

/**
 * Compile a TypeScript expression to a target-agnostic IRExpression tree.
 * Returns null if the expression contains unsupported patterns.
 */
export function translateReactiveExprIR(
  node: ts.Expression,
  ctx: ExprCompilerContext,
): ExprIRResult | null {
  const expr = compileExprIR(node, ctx);
  if (expr === null) return null;

  const deps = Array.from(ctx.dependencies.values());
  let exprType = inferExprType(node, ctx);

  // The IR node may carry a more specific type than TypeScript can infer.
  // For example, theme_read nodes know the value is 'color' even though
  // TypeScript sees it as 'string'. Prefer the IR type when available.
  const irType = getIRNodeType(expr);
  if (irType && irType !== exprType) {
    exprType = irType;
  }

  const result: ExprIRResult = { expr, exprType, deps };
  if (ctx.slots.length > 0) {
    result.slots = ctx.slots.map(s => ({ expr: s.expr }));
  }
  return result;
}

export function compileExprIR(node: ts.Expression, ctx: ExprCompilerContext): IRExpression | null {
  if (ts.isNumericLiteral(node)) {
    return { kind: 'expr:literal', value: Number(node.text), type: 'float' };
  }
  if (ts.isStringLiteral(node)) {
    return { kind: 'expr:literal', value: node.text, type: 'string' };
  }
  if (node.kind === ts.SyntaxKind.TrueKeyword) {
    return { kind: 'expr:literal', value: true, type: 'bool' };
  }
  if (node.kind === ts.SyntaxKind.FalseKeyword) {
    return { kind: 'expr:literal', value: false, type: 'bool' };
  }
  if (node.kind === ts.SyntaxKind.NullKeyword) {
    return { kind: 'expr:literal', value: 0, type: 'int' };
  }

  if (ts.isIdentifier(node)) {
    // Local variable resolution (statement blocks)
    if (ctx.localVars) {
      const sym = ctx.checker.getSymbolAtLocation(node);
      const localVar = sym ? ctx.localVars.get(sym) : undefined;
      if (localVar) {
        return { kind: 'expr:local_var', name: localVar.name, type: localVar.type };
      }
    }
    const type = ctx.checker.getTypeAtLocation(node);
    if (hasSignalBrand(type)) {
      return assignSlotIR(node, ctx);
    }
    // Slot non-signal identifiers with primitive types (e.g. local string variables)
    if (isPrimitiveType(type)) {
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
      return irNullCoalesce(left, right, leftType);
    }

    const left = compileExprIR(node.left, ctx);
    const right = compileExprIR(node.right, ctx);
    if (left === null || right === null) return null;
    const op = translateBinaryOp(node.operatorToken.kind);
    if (op === null) return null;
    return irBinary(op as BinaryOp, left, right);
  }

  if (ts.isPrefixUnaryExpression(node)) {
    const operand = compileExprIR(node.operand, ctx);
    if (operand === null) return null;
    const op = translatePrefixOp(node.operator);
    if (op === null) return null;
    return irUnary(op as UnaryOp, operand);
  }

  if (ts.isPostfixUnaryExpression(node)) {
    const operand = compileExprIR(node.operand, ctx);
    if (operand === null) return null;
    const op = node.operator === ts.SyntaxKind.PlusPlusToken ? '++' : '--';
    return irPostfix(op as PostfixOp, operand);
  }

  if (ts.isParenthesizedExpression(node)) {
    const inner = compileExprIR(node.expression, ctx);
    if (inner === null) return null;
    return irGroup(inner);
  }

  if (ts.isConditionalExpression(node)) {
    const test = compileExprIR(node.condition, ctx);
    const consequent = compileExprIR(node.whenTrue, ctx);
    const alternate = compileExprIR(node.whenFalse, ctx);
    if (test === null || consequent === null || alternate === null) return null;
    return irTernary(test, consequent, alternate);
  }

  if (ts.isCallExpression(node)) {
    return compileCallExprIR(node, ctx);
  }

  if (ts.isTemplateExpression(node)) {
    return compileTemplateLiteralIR(node, ctx);
  }

  if (ts.isNoSubstitutionTemplateLiteral(node)) {
    return { kind: 'expr:literal', value: node.text, type: 'string' };
  }

  return null;
}

function compilePropertyAccessIR(
  node: ts.PropertyAccessExpression,
  ctx: ExprCompilerContext,
): IRExpression | null {
  const propName = node.name.text;

  if (ts.isIdentifier(node.expression)) {
    const sym = ctx.checker.getSymbolAtLocation(node.expression);

    // Global handle .value access → global_read
    const globalInfo = sym ? ctx.globals.get(sym) : undefined;
    if (globalInfo && propName === 'value') {
      ctx.dependencies.set(`global_${globalInfo.globalId}`, {
        signalName: `sig_global_${globalInfo.globalId}`,
        sourceId: globalInfo.globalId,
        exprType: irTypeToExprType(globalInfo.irType),
        sourceType: 'global',
      });
      return irGlobalRead(globalInfo.globalId, globalInfo.exprType);
    }

    // Array global handle .length → array_method 'size'
    if (globalInfo && propName === 'length' && isArrayExprType(globalInfo.exprType)) {
      ctx.dependencies.set(`global_${globalInfo.globalId}`, {
        signalName: `sig_global_${globalInfo.globalId}`,
        sourceId: globalInfo.globalId,
        exprType: irTypeToExprType(globalInfo.irType),
        sourceType: 'global',
      });
      const globalRead = irGlobalRead(globalInfo.globalId, globalInfo.exprType);
      return irArrayMethod('size', globalRead, [], arrayElementType(globalInfo.exprType));
    }

    const entity = sym ? ctx.haEntities.get(sym) : undefined;
    if (entity && !entity.isDynamic) {
      const varName = node.expression.text;
      const signalInfo = resolveSignalProperty(varName, propName, entity);
      if (signalInfo) {
        ctx.dependencies.set(signalInfo.signalName, {
          signalName: signalInfo.signalName,
          sourceId: signalInfo.sourceId,
          sourceDomain: signalInfo.sourceDomain,
          exprType: signalInfo.exprType,
          sourceType: signalInfo.sourceType,
        });
        return { kind: 'expr:entity_prop', entityId: entity.entityId, propertyKey: propName, type: signalInfo.exprType };
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
      if (obj !== null) return irStringMethod('length', obj, []);
    }
  }

  // Slot non-signal property accesses with primitive types (e.g. props.label)
  if (isPrimitiveType(type)) {
    return assignSlotIR(node, ctx);
  }

  return null;
}

function assignSlotIR(expr: ts.Expression, ctx: ExprCompilerContext): IRExpression {
  const slotIndex = ctx.slots.length;
  ctx.slots.push({ expr, slotIndex });
  return { kind: 'expr:slot', slotIndex };
}

function compileCallExprIR(node: ts.CallExpression, ctx: ExprCompilerContext): IRExpression | null {
  // Math.* calls
  if (ts.isPropertyAccessExpression(node.expression) &&
      ts.isIdentifier(node.expression.expression) &&
      node.expression.expression.text === 'Math') {
    const method = node.expression.name.text;
    const builtinFn = TS_MATH_TO_BUILTIN[method];
    if (!builtinFn) return null;
    const args: IRExpression[] = [];
    for (const arg of node.arguments) {
      const compiled = compileExprIR(arg, ctx);
      if (compiled === null) return null;
      args.push(compiled);
    }
    return irCall(builtinFn, args);
  }

  // isNaN(x) → call is_nan
  if (ts.isIdentifier(node.expression) && node.expression.text === 'isNaN') {
    if (node.arguments.length === 1) {
      const arg = compileExprIR(node.arguments[0], ctx);
      if (arg === null) return null;
      return irCall('is_nan', [arg]);
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
      return irTypeCast(arg, fromType, castTarget);
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
        return irFormatString(obj, `%.${precision}f`);
      }
      return null;
    }

    // String methods → string_method
    if (methodName in STRING_METHOD_SET) {
      const obj = compileExprIR(objectExpr, ctx);
      if (obj === null) return null;
      const args: IRExpression[] = [];
      for (const arg of node.arguments) {
        const compiled = compileExprIR(arg, ctx);
        if (compiled === null) return null;
        args.push(compiled);
      }
      return irStringMethod(methodName as StringMethod, obj, args);
    }

    // Array handle .get(index) → array_index
    if (methodName === 'get' && node.arguments.length === 1 && ts.isIdentifier(objectExpr)) {
      const sym = ctx.checker.getSymbolAtLocation(objectExpr);
      const globalInfo = sym ? ctx.globals.get(sym) : undefined;
      if (globalInfo && isArrayExprType(globalInfo.exprType)) {
        ctx.dependencies.set(`global_${globalInfo.globalId}`, {
          signalName: `sig_global_${globalInfo.globalId}`,
          sourceId: globalInfo.globalId,
          exprType: irTypeToExprType(globalInfo.irType),
          sourceType: 'global',
        });
        const indexArg = compileExprIR(node.arguments[0], ctx);
        if (indexArg === null) return null;
        const globalRead = irGlobalRead(globalInfo.globalId, globalInfo.exprType);
        return irArrayIndex(globalRead, indexArg, arrayElementType(globalInfo.exprType));
      }
    }

    // .get() on IRReactiveNode<T> → slot (resolved at runtime)
    if (methodName === 'get' && node.arguments.length === 0) {
      const objType = ctx.checker.getTypeAtLocation(objectExpr);
      if (hasReactiveNodeBrand(objType)) {
        return assignSlotIR(objectExpr, ctx);
      }
    }
  }

  return null;
}

function compileTemplateLiteralIR(
  node: ts.TemplateExpression,
  ctx: ExprCompilerContext,
): IRExpression | null {
  const parts: IRExpression[] = [];
  if (node.head.text) {
    parts.push({ kind: 'expr:literal', value: node.head.text, type: 'string' });
  }

  for (const span of node.templateSpans) {
    const exprIR = compileExprIR(span.expression, ctx);
    if (exprIR === null) return null;

    const exprType = ctx.checker.getTypeAtLocation(span.expression);
    const isString = isStringLikeType(exprType);

    parts.push(isString ? exprIR : irToString(exprIR));

    if (span.literal.text) {
      parts.push({ kind: 'expr:literal', value: span.literal.text, type: 'string' });
    }
  }

  if (parts.length === 0) return { kind: 'expr:literal', value: '', type: 'string' };
  if (parts.length === 1) return parts[0];
  return irConcat(parts);
}

export function inferExprType(node: ts.Expression, ctx: ExprCompilerContext): ExprType {
  const type = ctx.checker.getTypeAtLocation(node);
  return mapTsTypeToExprType(type);
}

/**
 * Map a TypeScript type object to the closest ExprType.
 * Exported for use by callers that have a ts.Type directly (e.g. function return types).
 */
export function mapTsTypeToExprType(type: ts.Type): ExprType {
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
 * Extract the ExprType from an IR node if it carries one.
 * Handles theme_read, entity_prop, type_cast, ternary, and group nodes.
 */
function getIRNodeType(node: IRExpression): ExprType | null {
  if ('type' in node && typeof (node as { type?: unknown }).type === 'string') {
    return (node as { type: string }).type as ExprType;
  }
  if (node.kind === 'expr:op') {
    // Unwrap grouping parentheses
    if (node.op.tag === 'group') {
      return getIRNodeType(node.children[0]);
    }
    // Ternary: use the consequent branch type
    if (node.op.tag === 'ternary') {
      return getIRNodeType(node.children[1]);
    }
    // type_cast, null_coalesce, array_index, array_method carry type info on op descriptor
    if ('fromType' in node.op) return (node.op as { toType: ExprType }).toType;
    if ('type' in node.op) return (node.op as { type: ExprType }).type;
    if ('elementType' in node.op) return (node.op as { elementType: ExprType }).elementType;
  }
  return null;
}


