/**
 * Semantic Analysis Pass — expression classification and findings collection.
 *
 * This is an analysis-only pass that inspects the TypeScript AST to classify
 * expressions and record where handlers and reactive derived values appear.
 * It produces a SemanticRegistry per source file. The registry is strictly
 * sidecar — it does NOT influence transform output or compilation behavior.
 *
 * Reuses brand detection from:
 *   - expr-compiler.ts (hasSignalBrand, hasReactiveNodeBrand, scanForHAEntities)
 *   - type-brands.ts (hasRefBrand, hasBindingBrand)
 */

import ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';
import {
  hasSignalBrand,
  hasReactiveNodeBrand,
  scanForHAEntities,
  type HAEntityInfo,
} from './expr-compiler.js';
import { hasRefBrand } from './type-brands.js';
import {
  createSemanticRegistry,
  type ExprKind,
  type ExprAnalysis,
  type SemanticRegistry,
} from './semantic-registry.js';

// ────────────────────────────────────────────────────────────────────────────
// Known-pure function allowlist
// ────────────────────────────────────────────────────────────────────────────

const KNOWN_PURE_GLOBALS = new Set([
  'Number', 'String', 'Boolean', 'isNaN', 'isFinite', 'parseInt', 'parseFloat',
]);

const KNOWN_PURE_MATH = new Set([
  'abs', 'ceil', 'floor', 'round', 'max', 'min',
  'pow', 'sqrt', 'log', 'exp', 'sign', 'trunc',
  'sin', 'cos', 'tan', 'atan2', 'PI',
]);

const KNOWN_PURE_STRING_METHODS = new Set([
  'toString', 'toUpperCase', 'toLowerCase', 'trim', 'trimStart', 'trimEnd',
  'slice', 'substring', 'charAt', 'charCodeAt', 'indexOf', 'lastIndexOf',
  'includes', 'startsWith', 'endsWith', 'padStart', 'padEnd', 'repeat',
  'replace', 'replaceAll', 'split', 'concat', 'at', 'normalize',
  'toFixed', 'toPrecision', 'toExponential',
]);

/**
 * Side-effect hooks that should never be classified as pure.
 */
const IMPURE_HOOK_NAMES = new Set([
  'useEffect', 'useScript', 'createScript',
]);

// ────────────────────────────────────────────────────────────────────────────
// Analysis context
// ────────────────────────────────────────────────────────────────────────────

interface AnalysisContext {
  checker: ts.TypeChecker;
  haEntities: Map<ts.Symbol, HAEntityInfo>;
  sourceFile: ts.SourceFile;
  registry: SemanticRegistry;
}

// ────────────────────────────────────────────────────────────────────────────
// Expression classification — core algorithm
// ────────────────────────────────────────────────────────────────────────────

function staticAnalysis(notes?: string[]): ExprAnalysis {
  return { kind: 'static', isPure: true, readsSignals: false, readsMemos: false, isDirectPassthrough: false, dependencyIds: [], notes: notes ?? [] };
}

function renderAnalysis(notes?: string[]): ExprAnalysis {
  return { kind: 'render', isPure: true, readsSignals: false, readsMemos: false, isDirectPassthrough: false, dependencyIds: [], notes: notes ?? [] };
}

function reactiveAnalysis(opts: { readsSignals?: boolean; readsMemos?: boolean; isDirectPassthrough?: boolean; dependencyIds?: string[]; notes?: string[] }): ExprAnalysis {
  return {
    kind: 'reactive',
    isPure: true,
    readsSignals: opts.readsSignals ?? false,
    readsMemos: opts.readsMemos ?? false,
    isDirectPassthrough: opts.isDirectPassthrough ?? false,
    dependencyIds: opts.dependencyIds ?? [],
    notes: opts.notes ?? [],
  };
}

function impureAnalysis(notes?: string[]): ExprAnalysis {
  return { kind: 'impure', isPure: false, readsSignals: false, readsMemos: false, isDirectPassthrough: false, dependencyIds: [], notes: notes ?? [] };
}

function unknownAnalysis(notes?: string[]): ExprAnalysis {
  return { kind: 'unknown', isPure: false, readsSignals: false, readsMemos: false, isDirectPassthrough: false, dependencyIds: [], notes: notes ?? [] };
}

// ────────────────────────────────────────────────────────────────────────────
// Classification merging
// ────────────────────────────────────────────────────────────────────────────

/**
 * Priority order for merging ExprKind values.
 * Higher index = stronger classification that dominates.
 */
const KIND_PRIORITY: Record<ExprKind, number> = {
  static: 0,
  render: 1,
  reactive: 2,
  impure: 3,
  unknown: 4,
};

/**
 * Merge two ExprAnalysis results.
 *
 * Rules:
 * - The stronger kind wins (static < render < reactive < impure < unknown)
 * - isPure is AND-ed (one impure child taints the parent)
 * - readsSignals / readsMemos are OR-ed
 * - dependencyIds and notes are concatenated
 */
export function mergeClassifications(a: ExprAnalysis, b: ExprAnalysis): ExprAnalysis {
  const aP = KIND_PRIORITY[a.kind];
  const bP = KIND_PRIORITY[b.kind];
  const kind = aP >= bP ? a.kind : b.kind;

  return {
    kind,
    isPure: a.isPure && b.isPure,
    readsSignals: a.readsSignals || b.readsSignals,
    readsMemos: a.readsMemos || b.readsMemos,
    // A merged expression is never a direct passthrough — only bare
    // identifiers / property accesses qualify.
    isDirectPassthrough: false,
    dependencyIds: [...a.dependencyIds, ...b.dependencyIds],
    notes: [...a.notes, ...b.notes],
  };
}

/**
 * Merge an array of classifications into a single result.
 */
function mergeAll(analyses: ExprAnalysis[]): ExprAnalysis {
  if (analyses.length === 0) return staticAnalysis();
  return analyses.reduce(mergeClassifications);
}

// ────────────────────────────────────────────────────────────────────────────
// TriggerHandler type detection (local reimplementation)
// ────────────────────────────────────────────────────────────────────────────

/**
 * Check if a type is a TriggerHandler-like callable (returns void or Promise<void>).
 * Reimplemented locally to avoid coupling to script-transformer internals.
 */
function isTriggerHandlerLike(type: ts.Type, checker: ts.TypeChecker): boolean {
  const types = type.isUnion() ? type.types : [type];
  for (const t of types) {
    const sigs = t.getCallSignatures();
    if (sigs.length === 0) continue;
    for (const sig of sigs) {
      const ret = checker.getReturnTypeOfSignature(sig);
      if (ret.flags & ts.TypeFlags.Void) return true;
      const resolved = ret as { resolvedTypeArguments?: ts.Type[] };
      if (resolved.resolvedTypeArguments?.[0]?.flags &&
          (resolved.resolvedTypeArguments[0].flags & ts.TypeFlags.Void)) {
        return true;
      }
    }
  }
  return false;
}

// ────────────────────────────────────────────────────────────────────────────
// Call expression purity analysis
// ────────────────────────────────────────────────────────────────────────────

/**
 * Determine if a call expression is to a known-pure function.
 * Returns the function name for notes, or null if impure/unknown.
 */
function getKnownPureCallName(expr: ts.CallExpression): string | null {
  const callee = expr.expression;

  // Global functions: Number(), String(), isNaN(), etc.
  if (ts.isIdentifier(callee)) {
    if (KNOWN_PURE_GLOBALS.has(callee.text)) return callee.text;
    return null;
  }

  // Math.X() calls
  if (ts.isPropertyAccessExpression(callee)) {
    if (ts.isIdentifier(callee.expression) && callee.expression.text === 'Math') {
      if (KNOWN_PURE_MATH.has(callee.name.text)) return `Math.${callee.name.text}`;
    }

    // String/number methods: .toUpperCase(), .toFixed(), etc.
    if (KNOWN_PURE_STRING_METHODS.has(callee.name.text)) {
      return `.${callee.name.text}()`;
    }
  }

  return null;
}

// ────────────────────────────────────────────────────────────────────────────
// Main expression classifier
// ────────────────────────────────────────────────────────────────────────────

/**
 * Classify a TypeScript expression node.
 *
 * Conservative: prefers "unknown" over false confidence.
 * Does NOT descend into function bodies (closures are opaque).
 */
export function analyzeExpression(expr: ts.Expression, ctx: AnalysisContext): ExprAnalysis {
  // Check cache first
  const cached = ctx.registry.exprAnalyses.get(expr);
  if (cached) return cached;

  const result = analyzeExpressionUncached(expr, ctx);
  ctx.registry.exprAnalyses.set(expr, result);
  return result;
}

function analyzeExpressionUncached(expr: ts.Expression, ctx: AnalysisContext): ExprAnalysis {
  // ── Literals ──
  if (ts.isNumericLiteral(expr) || ts.isStringLiteral(expr) ||
      ts.isNoSubstitutionTemplateLiteral(expr) ||
      expr.kind === ts.SyntaxKind.TrueKeyword ||
      expr.kind === ts.SyntaxKind.FalseKeyword ||
      expr.kind === ts.SyntaxKind.NullKeyword ||
      expr.kind === ts.SyntaxKind.UndefinedKeyword) {
    return staticAnalysis();
  }

  // ── Identifiers ──
  if (ts.isIdentifier(expr)) {
    return analyzeIdentifier(expr, ctx);
  }

  // ── Property access ──
  if (ts.isPropertyAccessExpression(expr)) {
    return analyzePropertyAccess(expr, ctx);
  }

  // ── Binary expressions ──
  if (ts.isBinaryExpression(expr)) {
    const left = analyzeExpression(expr.left, ctx);
    const right = analyzeExpression(expr.right, ctx);
    return mergeClassifications(left, right);
  }

  // ── Prefix unary (!, -, +, ~) ──
  if (ts.isPrefixUnaryExpression(expr)) {
    return analyzeExpression(expr.operand, ctx);
  }

  // ── Postfix unary (++, --) — side-effect ──
  if (ts.isPostfixUnaryExpression(expr)) {
    const inner = analyzeExpression(expr.operand, ctx);
    return mergeClassifications(inner, impureAnalysis(['postfix mutation']));
  }

  // ── Conditional (ternary) ──
  if (ts.isConditionalExpression(expr)) {
    const cond = analyzeExpression(expr.condition, ctx);
    const whenTrue = analyzeExpression(expr.whenTrue, ctx);
    const whenFalse = analyzeExpression(expr.whenFalse, ctx);
    return mergeAll([cond, whenTrue, whenFalse]);
  }

  // ── Call expressions ──
  if (ts.isCallExpression(expr)) {
    return analyzeCallExpression(expr, ctx);
  }

  // ── Arrow / function expression ──
  if (ts.isArrowFunction(expr) || ts.isFunctionExpression(expr)) {
    const type = ctx.checker.getTypeAtLocation(expr);
    if (isTriggerHandlerLike(type, ctx.checker)) {
      return renderAnalysis(['trigger handler']);
    }
    return unknownAnalysis(['closure — body not analyzed']);
  }

  // ── Parenthesized / type assertion / as expression ──
  if (ts.isParenthesizedExpression(expr)) {
    return analyzeExpression(expr.expression, ctx);
  }
  if (ts.isAsExpression(expr) || ts.isTypeAssertionExpression(expr)) {
    return analyzeExpression(expr.expression, ctx);
  }

  // ── Object literal ──
  if (ts.isObjectLiteralExpression(expr)) {
    const propAnalyses: ExprAnalysis[] = [];
    for (const prop of expr.properties) {
      if (ts.isPropertyAssignment(prop) && prop.initializer) {
        propAnalyses.push(analyzeExpression(prop.initializer, ctx));
      } else if (ts.isShorthandPropertyAssignment(prop)) {
        propAnalyses.push(analyzeExpression(prop.name, ctx));
      } else if (ts.isSpreadAssignment(prop)) {
        propAnalyses.push(unknownAnalysis(['spread — cannot fully analyze']));
      }
    }
    return propAnalyses.length > 0 ? mergeAll(propAnalyses) : staticAnalysis();
  }

  // ── Array literal ──
  if (ts.isArrayLiteralExpression(expr)) {
    const elAnalyses = expr.elements.map(el => {
      if (ts.isSpreadElement(el)) {
        return unknownAnalysis(['spread element']);
      }
      return analyzeExpression(el, ctx);
    });
    return elAnalyses.length > 0 ? mergeAll(elAnalyses) : staticAnalysis();
  }

  // ── Template expression (with substitutions) ──
  if (ts.isTemplateExpression(expr)) {
    const head = staticAnalysis();
    const spans = expr.templateSpans.map(span =>
      analyzeExpression(span.expression, ctx),
    );
    return mergeAll([head, ...spans]);
  }

  // ── Element access (e.g. arr[0]) ──
  if (ts.isElementAccessExpression(expr)) {
    const obj = analyzeExpression(expr.expression, ctx);
    const arg = analyzeExpression(expr.argumentExpression, ctx);
    return mergeClassifications(obj, arg);
  }

  // ── Non-null assertion (expr!) ──
  if (ts.isNonNullExpression(expr)) {
    return analyzeExpression(expr.expression, ctx);
  }

  // ── Void expression ──
  if (ts.isVoidExpression(expr)) {
    return impureAnalysis(['void expression']);
  }

  // ── Default: unknown ──
  return unknownAnalysis([`unhandled AST kind: ${ts.SyntaxKind[expr.kind]}`]);
}

// ────────────────────────────────────────────────────────────────────────────
// Identifier analysis
// ────────────────────────────────────────────────────────────────────────────

function analyzeIdentifier(expr: ts.Identifier, ctx: AnalysisContext): ExprAnalysis {
  const type = ctx.checker.getTypeAtLocation(expr);

  if (hasSignalBrand(type)) {
    return reactiveAnalysis({ readsSignals: true, isDirectPassthrough: true, notes: [`signal: ${expr.text}`] });
  }

  if (hasReactiveNodeBrand(type)) {
    return reactiveAnalysis({ readsMemos: true, notes: [`reactive node: ${expr.text}`] });
  }

  if (hasRefBrand(type)) {
    return renderAnalysis([`component ref: ${expr.text}`]);
  }

  // Check if identifier refers to an HA entity
  const sym = ctx.checker.getSymbolAtLocation(expr);
  if (sym && ctx.haEntities.has(sym)) {
    return renderAnalysis([`HA entity binding: ${expr.text}`]);
  }

  // Enum members and const values are static
  if (type.flags & ts.TypeFlags.EnumLiteral) {
    return staticAnalysis([`enum literal: ${expr.text}`]);
  }

  // Primitives with literal types are likely static
  if (type.flags & (ts.TypeFlags.StringLiteral | ts.TypeFlags.NumberLiteral | ts.TypeFlags.BooleanLiteral)) {
    return staticAnalysis([`literal type: ${expr.text}`]);
  }

  return renderAnalysis([`identifier: ${expr.text}`]);
}

// ────────────────────────────────────────────────────────────────────────────
// Property access analysis
// ────────────────────────────────────────────────────────────────────────────

function analyzePropertyAccess(expr: ts.PropertyAccessExpression, ctx: AnalysisContext): ExprAnalysis {
  const resultType = ctx.checker.getTypeAtLocation(expr);

  // Direct signal-branded property access (e.g. entity.isOn, entity.value)
  if (hasSignalBrand(resultType)) {
    const depId = resolvePropertyDependencyId(expr, ctx);
    return reactiveAnalysis({
      readsSignals: true,
      isDirectPassthrough: true,
      dependencyIds: depId ? [depId] : [],
      notes: [`signal read: ${expr.getText(ctx.sourceFile)}`],
    });
  }

  if (hasReactiveNodeBrand(resultType)) {
    return reactiveAnalysis({
      readsMemos: true,
      notes: [`reactive node read: ${expr.getText(ctx.sourceFile)}`],
    });
  }

  // Recurse into the object expression
  return analyzeExpression(expr.expression, ctx);
}

/**
 * Try to resolve a stable dependency ID for a signal property access.
 * Returns an ID like "sig_ha_light_office" or null if unresolvable.
 */
function resolvePropertyDependencyId(
  expr: ts.PropertyAccessExpression,
  ctx: AnalysisContext,
): string | null {
  if (!ts.isIdentifier(expr.expression)) return null;

  const sym = ctx.checker.getSymbolAtLocation(expr.expression);
  if (!sym) return null;

  const entity = ctx.haEntities.get(sym);
  if (!entity) return null;

  const sourceId = `ha_${entity.entityId.replace('.', '_')}`;
  return `sig_${sourceId}`;
}

// ────────────────────────────────────────────────────────────────────────────
// Call expression analysis
// ────────────────────────────────────────────────────────────────────────────

function analyzeCallExpression(expr: ts.CallExpression, ctx: AnalysisContext): ExprAnalysis {
  // Check for known impure hooks
  if (ts.isIdentifier(expr.expression) && IMPURE_HOOK_NAMES.has(expr.expression.text)) {
    return impureAnalysis([`side-effect hook: ${expr.expression.text}`]);
  }

  // __espcompose.* calls are internal compiler artifacts — treat as render
  if (ts.isPropertyAccessExpression(expr.expression) &&
      ts.isIdentifier(expr.expression.expression) &&
      expr.expression.expression.text === '__espcompose') {
    return renderAnalysis(['__espcompose internal call']);
  }

  // Check known-pure calls
  const pureName = getKnownPureCallName(expr);
  if (pureName !== null) {
    const argAnalyses = expr.arguments.map(arg => analyzeExpression(arg, ctx));
    const merged = mergeAll(argAnalyses);
    // A known-pure call doesn't add impurity, but inherits reactivity from args
    return { ...merged, notes: [...merged.notes, `pure call: ${pureName}`] };
  }

  // useMemo() — body may be reactive but the call itself is derived
  if (ts.isIdentifier(expr.expression) && expr.expression.text === 'useMemo') {
    return reactiveAnalysis({ readsMemos: true, notes: ['useMemo() call'] });
  }

  // useReactive() / reactiveIsNaN() — render-time utilities
  if (ts.isIdentifier(expr.expression) &&
      (expr.expression.text === 'useReactive' || expr.expression.text === 'reactiveIsNaN')) {
    return renderAnalysis([`reactive utility: ${expr.expression.text}`]);
  }

  // Unknown call — classify as impure (conservative)
  const callName = getCallName(expr);
  return impureAnalysis([`unknown call: ${callName}`]);
}

/**
 * Extract a human-readable name for a call expression callee.
 */
function getCallName(expr: ts.CallExpression): string {
  if (ts.isIdentifier(expr.expression)) return expr.expression.text;
  if (ts.isPropertyAccessExpression(expr.expression)) {
    if (ts.isIdentifier(expr.expression.expression)) {
      return `${expr.expression.expression.text}.${expr.expression.name.text}`;
    }
    return `?.${expr.expression.name.text}`;
  }
  return '<complex>';
}

// ────────────────────────────────────────────────────────────────────────────
// Value tree walker
// ────────────────────────────────────────────────────────────────────────────

/**
 * Callback invoked for each expression visited during value-tree walking.
 */
type ValueVisitor = (expr: ts.Expression, path: string[]) => void;

/**
 * Recursively walk a value expression tree, invoking the visitor at each
 * meaningful sub-expression. Descends into object literals, arrays,
 * conditionals, and logical operators. Does NOT descend into function bodies.
 *
 * The walker visits the node FIRST, then recurses into structural children.
 * This means the visitor sees both container nodes and their children.
 */
export function walkValueExpressions(
  expr: ts.Expression,
  visitor: ValueVisitor,
  currentPath: string[] = [],
): void {
  // Visit current node
  visitor(expr, currentPath);

  // ── Object literal → visit each property value ──
  if (ts.isObjectLiteralExpression(expr)) {
    for (const prop of expr.properties) {
      if (ts.isPropertyAssignment(prop) && prop.initializer) {
        const propName = ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name)
          ? (ts.isIdentifier(prop.name) ? prop.name.text : prop.name.text)
          : ts.isComputedPropertyName(prop.name) ? '<computed>' : String(prop.name);
        walkValueExpressions(prop.initializer, visitor, [...currentPath, propName]);
      } else if (ts.isShorthandPropertyAssignment(prop)) {
        walkValueExpressions(prop.name, visitor, [...currentPath, prop.name.text]);
      }
      // SpreadAssignment — visited at top level but not recursed further
    }
    return;
  }

  // ── Array literal → visit each element ──
  if (ts.isArrayLiteralExpression(expr)) {
    for (let i = 0; i < expr.elements.length; i++) {
      const el = expr.elements[i];
      if (ts.isSpreadElement(el)) {
        visitor(el.expression, [...currentPath, `[${i}:spread]`]);
      } else {
        walkValueExpressions(el, visitor, [...currentPath, `[${i}]`]);
      }
    }
    return;
  }

  // ── Conditional → visit both branches ──
  if (ts.isConditionalExpression(expr)) {
    walkValueExpressions(expr.whenTrue, visitor, [...currentPath, '?:true']);
    walkValueExpressions(expr.whenFalse, visitor, [...currentPath, '?:false']);
    return;
  }

  // ── Binary ?? / || / && → visit both sides ──
  if (ts.isBinaryExpression(expr)) {
    const op = expr.operatorToken.kind;
    if (op === ts.SyntaxKind.QuestionQuestionToken ||
        op === ts.SyntaxKind.BarBarToken ||
        op === ts.SyntaxKind.AmpersandAmpersandToken) {
      walkValueExpressions(expr.left, visitor, [...currentPath, 'lhs']);
      walkValueExpressions(expr.right, visitor, [...currentPath, 'rhs']);
      return;
    }
    // For other binary ops, don't recurse further — the top-level visit is sufficient
    return;
  }

  // ── Parenthesized / as / type assertion → unwrap ──
  if (ts.isParenthesizedExpression(expr)) {
    walkValueExpressions(expr.expression, visitor, currentPath);
    return;
  }
  if (ts.isAsExpression(expr) || ts.isTypeAssertionExpression(expr)) {
    walkValueExpressions(expr.expression, visitor, currentPath);
    return;
  }

  // ── Arrow functions, call expressions, other leaves — stop recursion ──
  // The visitor has already seen them at the top of this function.
}

// ────────────────────────────────────────────────────────────────────────────
// Orchestrator — per-file analysis
// ────────────────────────────────────────────────────────────────────────────

/**
 * Run semantic analysis on a single source file.
 * Returns a SemanticRegistry with expression classifications and findings.
 *
 * This function does NOT modify the source file or produce any edits.
 */
export function runSemanticAnalysis(
  sourceFile: ts.SourceFile,
  program: ts.Program,
): SemanticRegistry {
  const checker = program.getTypeChecker();
  const registry = createSemanticRegistry(sourceFile.fileName);

  // Build HA entity context (reuse same scanner as existing transforms)
  const haEntities = new Map<ts.Symbol, HAEntityInfo>();
  scanForHAEntities(sourceFile, haEntities, checker);

  const ctx: AnalysisContext = { checker, haEntities, sourceFile, registry };

  // Walk the entire source file looking for analyzable expressions
  walkSourceFile(sourceFile, ctx);

  return registry;
}

// ────────────────────────────────────────────────────────────────────────────
// Source file walker — finds JSX attributes, variable initializers, useMemo
// ────────────────────────────────────────────────────────────────────────────

function walkSourceFile(sourceFile: ts.SourceFile, ctx: AnalysisContext): void {
  const visit = (node: ts.Node): void => {
    // ── JSX attribute with expression initializer ──
    if (ts.isJsxAttribute(node) && node.initializer && ts.isJsxExpression(node.initializer)) {
      const jsxExpr = node.initializer;
      const expr = jsxExpr.expression;
      if (expr) {
        const attrName = ts.isIdentifier(node.name) ? node.name.text : node.name.getText(ctx.sourceFile);
        analyzeJsxAttributeExpr(expr, attrName, ctx);
      }
    }

    // ── Variable initializer ──
    if (ts.isVariableDeclaration(node) && node.initializer) {
      const varName = ts.isIdentifier(node.name) ? node.name.text : '<destructured>';
      analyzeVariableInitializer(node.initializer, varName, ctx);
    }

    // ── Explicit useMemo() call (not in JSX — those are covered by JSX attr handling) ──
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) &&
        node.expression.text === 'useMemo' &&
        !ts.isJsxExpression(node.parent)) {
      analyzeExpression(node, ctx);
    }

    ts.forEachChild(node, visit);
  };

  ts.forEachChild(sourceFile, visit);
}

// ────────────────────────────────────────────────────────────────────────────
// JSX attribute analysis with handler + derived finding collection
// ────────────────────────────────────────────────────────────────────────────

function analyzeJsxAttributeExpr(
  expr: ts.Expression,
  attrName: string,
  ctx: AnalysisContext,
): void {
  // Classify the top-level expression
  const topClassification = analyzeExpression(expr, ctx);

  // Check if top-level is a derived/memo candidate
  // Skip direct signal passthroughs — the reactive transformer skips these
  // (runtime handles IRReactiveNode directly) so they are not memo candidates.
  if (topClassification.kind === 'reactive' && topClassification.isPure && !topClassification.isDirectPassthrough) {
    const { line, character } = ctx.sourceFile.getLineAndCharacterOfPosition(expr.getStart(ctx.sourceFile));
    ctx.registry.derivedFindings.push({
      node: expr,
      path: [attrName],
      line: line + 1,
      character: character + 1,
      classification: topClassification,
      isMemoCandidate: true,
      notes: ['reactive pure expression in JSX attribute'],
    });
  }

  // Walk nested value tree for handler findings
  walkValueExpressions(expr, (childExpr, childPath) => {
    if (ts.isArrowFunction(childExpr) || ts.isFunctionExpression(childExpr)) {
      const type = ctx.checker.getTypeAtLocation(childExpr);
      if (isTriggerHandlerLike(type, ctx.checker)) {
        const { line, character } = ctx.sourceFile.getLineAndCharacterOfPosition(
          childExpr.getStart(ctx.sourceFile),
        );

        // Determine if the existing compiler would find this handler
        // The existing compiler finds: direct JSX attr arrows, useScript args,
        // and TriggerHandler-typed variable initializers. It does NOT find
        // handlers nested inside object literals.
        const isDirectJsxAttr = childPath.length === 0;

        ctx.registry.handlerFindings.push({
          node: childExpr,
          path: [attrName, ...childPath],
          line: line + 1,
          character: character + 1,
          isCompiledByExistingPass: isDirectJsxAttr,
          notes: isDirectJsxAttr
            ? ['direct JSX attribute handler']
            : [`nested handler — existing compiler misses this (path: ${[attrName, ...childPath].join('.')})`],
        });
      }
    }

    // Record nested reactive+pure expressions as derived findings
    if (childPath.length > 0 &&
        !ts.isArrowFunction(childExpr) && !ts.isFunctionExpression(childExpr) &&
        !ts.isObjectLiteralExpression(childExpr) && !ts.isArrayLiteralExpression(childExpr)) {
      const childClassification = analyzeExpression(childExpr, ctx);
      if (childClassification.kind === 'reactive' && childClassification.isPure && !childClassification.isDirectPassthrough) {
        const { line, character } = ctx.sourceFile.getLineAndCharacterOfPosition(
          childExpr.getStart(ctx.sourceFile),
        );
        ctx.registry.derivedFindings.push({
          node: childExpr,
          path: [attrName, ...childPath],
          line: line + 1,
          character: character + 1,
          classification: childClassification,
          isMemoCandidate: true,
          notes: ['nested reactive pure expression'],
        });
      }
    }
  }, []);
}

// ────────────────────────────────────────────────────────────────────────────
// Variable initializer analysis
// ────────────────────────────────────────────────────────────────────────────

function analyzeVariableInitializer(
  expr: ts.Expression,
  varName: string,
  ctx: AnalysisContext,
): void {
  const classification = analyzeExpression(expr, ctx);

  // Record variable initializers that are reactive+pure as derived findings
  // Skip direct signal passthroughs — runtime handles these without compilation.
  if (classification.kind === 'reactive' && classification.isPure && !classification.isDirectPassthrough) {
    const { line, character } = ctx.sourceFile.getLineAndCharacterOfPosition(
      expr.getStart(ctx.sourceFile),
    );
    ctx.registry.derivedFindings.push({
      node: expr,
      path: [`var:${varName}`],
      line: line + 1,
      character: character + 1,
      classification,
      isMemoCandidate: true,
      notes: [`variable initializer "${varName}" is reactive and pure`],
    });
  }

  // Walk for handler findings in variable initializers
  walkValueExpressions(expr, (childExpr, childPath) => {
    if (ts.isArrowFunction(childExpr) || ts.isFunctionExpression(childExpr)) {
      const type = ctx.checker.getTypeAtLocation(childExpr);
      if (isTriggerHandlerLike(type, ctx.checker)) {
        const { line, character } = ctx.sourceFile.getLineAndCharacterOfPosition(
          childExpr.getStart(ctx.sourceFile),
        );

        // Existing compiler finds TriggerHandler-typed variable initializers
        // only at the top level, not nested
        const isDirectVarInit = childPath.length === 0;
        const isTypedAsHandler = isDirectVarInit && isTriggerHandlerLike(
          ctx.checker.getTypeAtLocation(childExpr), ctx.checker,
        );

        ctx.registry.handlerFindings.push({
          node: childExpr,
          path: [`var:${varName}`, ...childPath],
          line: line + 1,
          character: character + 1,
          isCompiledByExistingPass: isTypedAsHandler,
          notes: isDirectVarInit
            ? [`handler in variable "${varName}" initializer`]
            : [`nested handler in variable "${varName}" (path: ${childPath.join('.')})`],
        });
      }
    }
  }, []);
}

// ────────────────────────────────────────────────────────────────────────────
// Debug dump
// ────────────────────────────────────────────────────────────────────────────

/**
 * Produce a human-readable summary of a SemanticRegistry.
 */
export function formatRegistrySummary(registry: SemanticRegistry): string {
  const lines: string[] = [];
  const relPath = registry.filePath.includes('/')
    ? registry.filePath.slice(registry.filePath.lastIndexOf('/') + 1)
    : registry.filePath;

  lines.push(`=== Semantic Analysis: ${relPath} ===`);
  lines.push('');

  // Expression classification summary
  const counts: Record<ExprKind, number> = { static: 0, render: 0, reactive: 0, impure: 0, unknown: 0 };
  let passthroughCount = 0;
  for (const analysis of registry.exprAnalyses.values()) {
    counts[analysis.kind]++;
    if (analysis.isDirectPassthrough) passthroughCount++;
  }
  const total = registry.exprAnalyses.size;
  lines.push(
    `Expressions: ${total} analyzed ` +
    `(${counts.static} static, ${counts.render} render, ${counts.reactive} reactive` +
    `${passthroughCount > 0 ? ` [${passthroughCount} passthrough]` : ''}, ` +
    `${counts.impure} impure, ${counts.unknown} unknown)`,
  );
  lines.push('');

  // Handler findings
  lines.push(`Handler Findings: ${registry.handlerFindings.length}`);
  for (const h of registry.handlerFindings) {
    const compiled = h.isCompiledByExistingPass ? 'compiled: yes' : 'compiled: NO ← new discovery';
    lines.push(`  [L${h.line}:${h.character}] ${h.path.join('.')} — ${compiled}`);
    for (const note of h.notes) {
      lines.push(`    ${note}`);
    }
  }
  lines.push('');

  // Derived findings
  lines.push(`Derived Findings: ${registry.derivedFindings.length}`);
  for (const d of registry.derivedFindings) {
    const memo = d.isMemoCandidate ? '→ memo candidate' : '';
    lines.push(`  [L${d.line}:${d.character}] ${d.path.join('.')} — ${d.classification.kind}, pure=${d.classification.isPure} ${memo}`);
    for (const note of d.notes) {
      lines.push(`    ${note}`);
    }
  }
  lines.push('');

  return lines.join('\n');
}

/**
 * Write debug analysis files to `<buildDir>/.semantic-analysis/`,
 * mirroring the source directory structure to avoid name collisions
 * (e.g. multiple `index.tsx` files in different directories).
 *
 * Only call when debug mode is enabled.
 */
export function dumpSemanticRegistries(
  registries: Map<string, SemanticRegistry>,
  buildDir: string,
  sourceDir: string,
): void {
  const outRoot = path.join(buildDir, '.semantic-analysis');

  for (const [filePath, registry] of registries) {
    // Mirror the source directory structure: src/pages/index.tsx → src/pages/index.analysis.txt
    const rel = path.relative(sourceDir, filePath);
    const relWithoutExt = rel.slice(0, rel.length - path.extname(rel).length);
    const outPath = path.join(outRoot, relWithoutExt + '.analysis.txt');
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    const summary = formatRegistrySummary(registry);
    fs.writeFileSync(outPath, summary, 'utf8');
  }
}
