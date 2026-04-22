/**
 * Reactive Expression Transformer
 *
 * Compiles reactive JSX attribute expressions and explicit useMemo() calls
 * to pre-computed C++ metadata using the TypeScript AST and type checker.
 *
 * Example transform (auto-detected):
 *   text={officeLight.isOn ? "Off" : "On"}
 *   → text={__espcompose.compiled({"cpp":"sig_ha_light_office.get() ? ...","type":"std::string","deps":[...]})}
 *
 * Example transform (explicit useMemo):
 *   useMemo(() => officeLight.isOn ? "Off" : "On")
 *   → __espcompose.compiled({"cpp":"sig_ha_light_office.get() ? ...","type":"std::string","deps":[...]})}
 *
 * Skipped cases:
 *   - Direct passthrough: officeLight.stateText (IRReactiveNode handled by runtime)
 *   - Non-reactive: static values, literal expressions
 *   - useEffect, __espcompose.derivedMemo (kept as runtime calls)
 */

import ts from 'typescript';
import type { TransformOutput, TransformDiagnostic } from './script-transformer.js';
import { isCoreExportCall } from './type-brands.js';
import {
  hasSignalBrand,
  translateReactiveExprIR,
  scanForHAEntities,
  scanForGlobalHandles,
  type ExprCompilerContext,
  type HAEntityInfo,
  type GlobalExprInfo,
  type DependencyInfo,
} from './expr-compiler.js';
import { injectGlobalKeys } from './global-key-injector.js';

// ────────────────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────────────────

interface SourceEdit {
  position: number;
  deleteEnd?: number;
  text: string;
}

/**
 * Transform a TypeScript source file: compile reactive JSX attribute
 * expressions and explicit useMemo() calls to __espcompose.compiled() with
 * pre-computed C++ metadata.
 */
export function transformReactiveExpressions(
  sourceFile: ts.SourceFile,
  program: ts.Program,
): TransformOutput {
  const checker = program.getTypeChecker();
  const edits: SourceEdit[] = [];
  const diagnostics: TransformDiagnostic[] = [];
  let transformCount = 0;

  // Pass 0: Scan for useHAEntity() and useGlobal() calls
  const haEntities = new Map<ts.Symbol, HAEntityInfo>();
  scanForHAEntities(sourceFile, haEntities, checker, diagnostics);

  const globals = new Map<ts.Symbol, GlobalExprInfo>();
  scanForGlobalHandles(sourceFile, globals, checker);

  // Pass 0.5: Inject __key into non-retained useGlobal() calls
  injectGlobalKeys(sourceFile, checker, edits, diagnostics);

  const onTransform = () => { transformCount++; };

  walkNode(sourceFile, sourceFile, checker, haEntities, globals, edits, diagnostics, onTransform);

  // If transforms were applied, ensure '__espcompose' is importable
  if (transformCount > 0) {
    injectReactiveImportIfNeeded(sourceFile, edits);
  }

  // Apply edits in reverse position order so indices stay valid
  let text = sourceFile.getFullText();
  for (const edit of edits.sort((a, b) => b.position - a.position)) {
    if (edit.deleteEnd != null) {
      text = text.slice(0, edit.position) + edit.text + text.slice(edit.deleteEnd);
    } else {
      text = text.slice(0, edit.position) + edit.text + text.slice(edit.position);
    }
  }

  return { sourceText: text, diagnostics };
}

// ────────────────────────────────────────────────────────────────────────────
// Signal sub-tree detection
// ────────────────────────────────────────────────────────────────────────────

/**
 * Check if an expression sub-tree contains any Signal<T>-typed nodes.
 * Does NOT recurse into arrow functions, function expressions, or __espcompose.* calls.
 */
function containsSignalNode(node: ts.Node, checker: ts.TypeChecker): boolean {
  if (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) {
    return false;
  }

  if (ts.isCallExpression(node)) {
    const callee = node.expression;
    if (ts.isPropertyAccessExpression(callee) &&
        ts.isIdentifier(callee.expression) &&
        (callee.expression.text === '__espcompose' || callee.expression.text === 'device')) {
      return false;
    }
  }

  if (ts.isPropertyAccessExpression(node)) {
    const type = checker.getTypeAtLocation(node);
    if (hasSignalBrand(type)) return true;
  }

  let found = false;
  ts.forEachChild(node, child => {
    if (!found && containsSignalNode(child, checker)) {
      found = true;
    }
  });
  return found;
}

// ────────────────────────────────────────────────────────────────────────────
// Expression classification
// ────────────────────────────────────────────────────────────────────────────

/**
 * Check if an expression is a useMemo() call — these get AST-compiled.
 */
function isMemoCall(expr: ts.Expression, checker: ts.TypeChecker): expr is ts.CallExpression {
  if (!ts.isCallExpression(expr)) return false;
  return isCoreExportCall(expr, 'useMemo', checker);
}

/**
 * Check if an expression is a __espcompose.* or useEffect() call that should be skipped entirely.
 * useMemo is NOT in this list — it gets AST-compiled.
 */
function isReactiveSkipCall(expr: ts.Expression, checker: ts.TypeChecker): boolean {
  if (!ts.isCallExpression(expr)) return false;
  const callee = expr.expression;
  // useEffect(...), useReactive(...), reactiveIsNaN(...)
  if (isCoreExportCall(expr, ['useEffect', 'useReactive', 'reactiveIsNaN'], checker)) return true;
  if (ts.isPropertyAccessExpression(callee)) {
    const obj = callee.expression;
    if (ts.isIdentifier(obj) && obj.text === '__espcompose') {
      return true;
    }
  }
  return false;
}

function isDirectSignalPassthrough(expr: ts.Expression, checker: ts.TypeChecker): boolean {
  const type = checker.getTypeAtLocation(expr);
  if (!hasSignalBrand(type)) return false;
  return ts.isIdentifier(expr) || ts.isPropertyAccessExpression(expr);
}

// ────────────────────────────────────────────────────────────────────────────
// Compiled metadata serialization
// ────────────────────────────────────────────────────────────────────────────

function serializeCompiledCall(exprType: string, deps: DependencyInfo[], exprIR: unknown): string {
  const depsJson = deps.map(d => {
    const parts = [
      `sourceId:${JSON.stringify(d.sourceId)}`,
      `triggerType:${JSON.stringify(d.triggerType)}`,
      `sourceDomain:${JSON.stringify(d.sourceDomain)}`,
    ];
    if (d.sourceType) {
      parts.push(`sourceType:${JSON.stringify(d.sourceType)}`);
    }
    return `{${parts.join(',')}}`;
  });

  return `__espcompose.compiled({type:${JSON.stringify(exprType)},deps:[${depsJson.join(',')}],expr:${JSON.stringify(exprIR)}})`;
}

function serializeSlottedCall(
  exprType: string,
  slotCount: number,
  slotExprs: string[],
  exprIR: unknown,
): string {
  return `__espcompose.slotted({type:${JSON.stringify(exprType)},slots:${slotCount},expr:${JSON.stringify(exprIR)}}, ${slotExprs.join(', ')}) as any`;
}

// ────────────────────────────────────────────────────────────────────────────
// AST walking
// ────────────────────────────────────────────────────────────────────────────

function walkNode(
  node: ts.Node,
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  haEntities: Map<ts.Symbol, HAEntityInfo>,
  globals: Map<ts.Symbol, GlobalExprInfo>,
  edits: SourceEdit[],
  diagnostics: TransformDiagnostic[],
  onTransform: () => void,
): void {
  // Process JSX attributes with expression initializers
  if (ts.isJsxAttribute(node) && node.initializer && ts.isJsxExpression(node.initializer)) {
    const jsxExpr = node.initializer;
    const expr = jsxExpr.expression;
    if (expr) {
      processJsxAttributeExpression(expr, sourceFile, checker, haEntities, globals, edits, diagnostics, onTransform);
    }
  }

  // Process explicit useMemo() calls anywhere in the file (not just JSX)
  if (ts.isCallExpression(node) && isMemoCall(node, checker)) {
    processExplicitMemo(node, sourceFile, checker, haEntities, globals, edits, diagnostics, onTransform);
    return; // Don't recurse into children — we've handled this node
  }

  ts.forEachChild(node, child => {
    walkNode(child, sourceFile, checker, haEntities, globals, edits, diagnostics, onTransform);
  });
}

function processJsxAttributeExpression(
  expr: ts.Expression,
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  haEntities: Map<ts.Symbol, HAEntityInfo>,
  globals: Map<ts.Symbol, GlobalExprInfo>,
  edits: SourceEdit[],
  diagnostics: TransformDiagnostic[],
  onTransform: () => void,
): void {
  // Skip __espcompose.* calls and useEffect() that shouldn't be transformed
  if (isReactiveSkipCall(expr, checker)) return;

  // useMemo() in JSX — AST-compile it
  if (isMemoCall(expr, checker)) {
    processExplicitMemo(expr, sourceFile, checker, haEntities, globals, edits, diagnostics, onTransform);
    return;
  }

  // Skip direct Signal passthrough (runtime handles IRReactiveNode in Reactive)
  if (isDirectSignalPassthrough(expr, checker)) return;

  // Object literals (part/state props like indicator={{ bgOpa: expr }})
  // — recurse into individual property values instead of compiling the whole object
  if (ts.isObjectLiteralExpression(expr)) {
    for (const prop of expr.properties) {
      if (ts.isPropertyAssignment(prop) && prop.initializer) {
        processJsxAttributeExpression(
          prop.initializer, sourceFile, checker, haEntities, globals, edits, diagnostics, onTransform,
        );
      }
    }
    return;
  }

  // Check if the expression sub-tree contains Signal-typed nodes
  if (!containsSignalNode(expr, checker)) return;

  // AST-compile the expression to ExpressionIR
  const ctx: ExprCompilerContext = {
    checker,
    haEntities,
    globals,
    dependencies: new Map(),
    slots: [],
  };

  const irResult = translateReactiveExprIR(expr, ctx);
  if (!irResult) {
    const { line, character } = sourceFile.getLineAndCharacterOfPosition(expr.getStart(sourceFile));
    diagnostics.push({
      message: `Unsupported reactive expression: cannot compile to ExprIR. ` +
        `Expression contains patterns not supported by the compiler (e.g. unsupported method calls, ` +
        `property access, or operators). Simplify the expression or extract it into a supported form.`,
      file: sourceFile.fileName,
      line: line + 1,
      character: character + 1,
    });
    return;
  }

  // Replace expression with compiled call
  const start = expr.getStart(sourceFile);
  const end = expr.getEnd();

  if (irResult.slots && irResult.slots.length > 0) {
    // Slots present — emit __espcompose.slotted() with runtime signal arguments
    const slotExprs = irResult.slots.map(s => s.expr.getText(sourceFile));
    edits.push({
      position: start,
      deleteEnd: end,
      text: serializeSlottedCall(irResult.exprType, irResult.slots.length, slotExprs, irResult.expr),
    });
  } else {
    // Fully static — emit __espcompose.compiled() with embedded deps
    edits.push({
      position: start,
      deleteEnd: end,
      text: serializeCompiledCall(irResult.exprType, irResult.deps, irResult.expr),
    });
  }

  onTransform();
}

/**
 * Process an explicit useMemo(() => expr) call.
 * Extract the arrow body, AST-compile it, and replace with __espcompose.compiled({...}).
 */
function processExplicitMemo(
  callExpr: ts.CallExpression,
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  haEntities: Map<ts.Symbol, HAEntityInfo>,
  globals: Map<ts.Symbol, GlobalExprInfo>,
  edits: SourceEdit[],
  diagnostics: TransformDiagnostic[],
  onTransform: () => void,
): void {
  if (callExpr.arguments.length < 1) return;

  const arg = callExpr.arguments[0];
  if (!ts.isArrowFunction(arg) && !ts.isFunctionExpression(arg)) return;

  // Get the expression body of the arrow function
  let bodyExpr: ts.Expression | null = null;
  if (ts.isArrowFunction(arg)) {
    if (ts.isBlock(arg.body)) {
      // Block body: look for single `return expr;` statement
      if (arg.body.statements.length === 1) {
        const stmt = arg.body.statements[0];
        if (ts.isReturnStatement(stmt) && stmt.expression) {
          bodyExpr = stmt.expression;
        }
      }
    } else {
      bodyExpr = arg.body;
    }
  } else if (ts.isFunctionExpression(arg) && arg.body.statements.length === 1) {
    const stmt = arg.body.statements[0];
    if (ts.isReturnStatement(stmt) && stmt.expression) {
      bodyExpr = stmt.expression;
    }
  }

  if (!bodyExpr) return;

  // Check if the body contains reactive signal references
  if (!containsSignalNode(bodyExpr, checker)) return;

  // AST-compile the expression body to ExpressionIR
  const ctx: ExprCompilerContext = {
    checker,
    haEntities,
    globals,
    dependencies: new Map(),
    slots: [],
  };

  const irResult = translateReactiveExprIR(bodyExpr, ctx);
  if (!irResult) {
    const { line, character } = sourceFile.getLineAndCharacterOfPosition(callExpr.getStart(sourceFile));
    diagnostics.push({
      message: `Unsupported expression in useMemo() body: cannot compile to ExprIR. ` +
        `The memo body contains patterns not supported by the compiler. ` +
        `Simplify the expression or extract it into a supported form.`,
      file: sourceFile.fileName,
      line: line + 1,
      character: character + 1,
    });
    return;
  }

  // Replace the entire useMemo(...) call with compiled call
  const start = callExpr.getStart(sourceFile);
  const end = callExpr.getEnd();

  if (irResult.slots && irResult.slots.length > 0) {
    const slotExprs = irResult.slots.map(s => s.expr.getText(sourceFile));
    edits.push({
      position: start,
      deleteEnd: end,
      text: serializeSlottedCall(irResult.exprType, irResult.slots.length, slotExprs, irResult.expr),
    });
  } else {
    edits.push({
      position: start,
      deleteEnd: end,
      text: serializeCompiledCall(irResult.exprType, irResult.deps, irResult.expr),
    });
  }

  onTransform();
}

// ────────────────────────────────────────────────────────────────────────────
// Import injection
// ────────────────────────────────────────────────────────────────────────────

function injectReactiveImportIfNeeded(sourceFile: ts.SourceFile, edits: SourceEdit[]): void {
  let hasReactiveImport = false;
  let composeImportDecl: ts.ImportDeclaration | null = null;

  for (const stmt of sourceFile.statements) {
    if (!ts.isImportDeclaration(stmt)) continue;
    const moduleSpec = stmt.moduleSpecifier;
    if (!ts.isStringLiteral(moduleSpec)) continue;
    if (moduleSpec.text !== '@espcompose/core') continue;

    // Skip type-only imports — `import type { ... }` is erased at runtime,
    // so injecting `__espcompose` there would leave it undefined at bundle time.
    if (stmt.importClause?.isTypeOnly) continue;

    composeImportDecl = stmt;

    const namedBindings = stmt.importClause?.namedBindings;
    if (namedBindings && ts.isNamedImports(namedBindings)) {
      for (const spec of namedBindings.elements) {
        if (spec.name.text === '__espcompose') {
          hasReactiveImport = true;
          break;
        }
      }
    }
  }

  if (hasReactiveImport) return;

  if (composeImportDecl) {
    const namedBindings = composeImportDecl.importClause?.namedBindings;
    if (namedBindings && ts.isNamedImports(namedBindings)) {
      const lastElement = namedBindings.elements[namedBindings.elements.length - 1];
      if (lastElement) {
        const insertPos = lastElement.getEnd();
        edits.push({ position: insertPos, text: ', __espcompose' });
        return;
      }
    }
  }

  edits.push({
    position: 0,
    text: `import { __espcompose } from '@espcompose/core';\n`,
  });
}
