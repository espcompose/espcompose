/**
 * Reactive Expression Transformer
 *
 * Compiles reactive JSX attribute expressions and explicit bind.memo() calls
 * to pre-computed C++ metadata using the TypeScript AST and type checker.
 *
 * Example transform (auto-detected):
 *   text={officeLight.isOn ? "Off" : "On"}
 *   → text={bind.__compiled({"cpp":"sig_ha_light_office.get() ? ...","type":"std::string","deps":[...]})}
 *
 * Example transform (explicit bind.memo):
 *   bind.memo(() => officeLight.isOn ? "Off" : "On")
 *   → bind.__compiled({"cpp":"sig_ha_light_office.get() ? ...","type":"std::string","deps":[...]})}
 *
 * Skipped cases:
 *   - Direct passthrough: officeLight.stateText (ReactiveNode handled by runtime)
 *   - Non-reactive: static values, literal expressions
 *   - device.inline/device.script callbacks (handled by script-transformer)
 *   - bind.effect, bind.derivedMemo (kept as runtime calls)
 */

import ts from 'typescript';
import type { TransformOutput, TransformDiagnostic } from './script-transformer.js';
import {
  hasSignalBrand,
  translateReactiveExpr,
  scanForHAEntities,
  type ExprCompilerContext,
  type HAEntityInfo,
  type DependencyInfo,
} from './expr-compiler.js';

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
 * expressions and explicit bind.memo() calls to bind.__compiled() with
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

  // Pass 0: Scan for importHAEntity / bind.haEntity calls
  const haEntities = new Map<string, HAEntityInfo>();
  scanForHAEntities(sourceFile, haEntities);

  const onTransform = () => { transformCount++; };

  walkNode(sourceFile, sourceFile, checker, haEntities, edits, diagnostics, onTransform);

  // If transforms were applied, ensure 'bind' is importable
  if (transformCount > 0) {
    injectBindImportIfNeeded(sourceFile, edits);
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
 * Does NOT recurse into arrow functions, function expressions, or bind.* calls.
 */
function containsSignalNode(node: ts.Node, checker: ts.TypeChecker): boolean {
  if (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) {
    return false;
  }

  if (ts.isCallExpression(node)) {
    const callee = node.expression;
    if (ts.isPropertyAccessExpression(callee) &&
        ts.isIdentifier(callee.expression) &&
        (callee.expression.text === 'bind' || callee.expression.text === 'device')) {
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
 * Check if an expression is a bind.memo() call — these get AST-compiled too.
 */
function isBindMemoCall(expr: ts.Expression): expr is ts.CallExpression {
  if (!ts.isCallExpression(expr)) return false;
  const callee = expr.expression;
  if (ts.isPropertyAccessExpression(callee)) {
    const obj = callee.expression;
    const prop = callee.name.text;
    if (ts.isIdentifier(obj) && obj.text === 'bind' && prop === 'memo') {
      return true;
    }
  }
  return false;
}

/**
 * Check if an expression is a bind.* call that should be skipped entirely.
 * bind.memo is NOT in this list — it gets AST-compiled.
 */
function isBindSkipCall(expr: ts.Expression): boolean {
  if (!ts.isCallExpression(expr)) return false;
  const callee = expr.expression;
  if (ts.isPropertyAccessExpression(callee)) {
    const obj = callee.expression;
    const prop = callee.name.text;
    if (ts.isIdentifier(obj) && obj.text === 'bind') {
      return prop === 'expr' || prop === 'effect'
        || prop === 'isNaN'
        || prop === 'derivedMemo' || prop === 'haEntity'
        || prop === '__compiled' || prop === '__slotted';
    }
  }
  return false;
}

function isDeviceCall(expr: ts.Expression): boolean {
  if (!ts.isCallExpression(expr)) return false;
  const callee = expr.expression;
  if (ts.isPropertyAccessExpression(callee)) {
    const obj = callee.expression;
    if (ts.isIdentifier(obj) && obj.text === 'device') {
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

function serializeCompiledCall(cpp: string, cppType: string, deps: DependencyInfo[]): string {
  const depsJson = deps.map(d => {
    const parts = [
      `signalName:${JSON.stringify(d.signalName)}`,
      `sourceId:${JSON.stringify(d.sourceId)}`,
      `triggerType:${JSON.stringify(d.triggerType)}`,
      `sourceDomain:${JSON.stringify(d.sourceDomain)}`,
      `cppType:${JSON.stringify(d.cppType)}`,
    ];
    if (d.sourceType) {
      parts.push(`sourceType:${JSON.stringify(d.sourceType)}`);
    }
    return `{${parts.join(',')}}`;
  });

  return `bind.__compiled({cpp:${JSON.stringify(cpp)},type:${JSON.stringify(cppType)},deps:[${depsJson.join(',')}]})`;
}

function serializeSlottedCall(
  cpp: string,
  cppType: string,
  slotCount: number,
  slotExprs: string[],
): string {
  // The `as any` cast is necessary because Signal<T> (phantom branded number)
  // is not assignable to ReactiveNode<unknown> at the type level, even though
  // it is at runtime. This is compiler-generated code, so the cast is safe.
  return `bind.__slotted({cpp:${JSON.stringify(cpp)},type:${JSON.stringify(cppType)},slots:${slotCount}}, ${slotExprs.join(', ')}) as any`;
}

// ────────────────────────────────────────────────────────────────────────────
// AST walking
// ────────────────────────────────────────────────────────────────────────────

function walkNode(
  node: ts.Node,
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  haEntities: Map<string, HAEntityInfo>,
  edits: SourceEdit[],
  diagnostics: TransformDiagnostic[],
  onTransform: () => void,
): void {
  // Process JSX attributes with expression initializers
  if (ts.isJsxAttribute(node) && node.initializer && ts.isJsxExpression(node.initializer)) {
    const jsxExpr = node.initializer;
    const expr = jsxExpr.expression;
    if (expr) {
      processJsxAttributeExpression(expr, sourceFile, checker, haEntities, edits, diagnostics, onTransform);
    }
  }

  // Process explicit bind.memo() calls anywhere in the file (not just JSX)
  if (ts.isCallExpression(node) && isBindMemoCall(node)) {
    processExplicitBindMemo(node, sourceFile, checker, haEntities, edits, diagnostics, onTransform);
    return; // Don't recurse into children — we've handled this node
  }

  ts.forEachChild(node, child => {
    walkNode(child, sourceFile, checker, haEntities, edits, diagnostics, onTransform);
  });
}

function processJsxAttributeExpression(
  expr: ts.Expression,
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  haEntities: Map<string, HAEntityInfo>,
  edits: SourceEdit[],
  diagnostics: TransformDiagnostic[],
  onTransform: () => void,
): void {
  // Skip bind.* calls that shouldn't be transformed
  if (isBindSkipCall(expr)) return;

  // bind.memo() in JSX — AST-compile it
  if (isBindMemoCall(expr)) {
    processExplicitBindMemo(expr, sourceFile, checker, haEntities, edits, diagnostics, onTransform);
    return;
  }

  // Skip device.* calls (device.lambda(), device.include())
  if (isDeviceCall(expr)) return;

  // Skip direct Signal passthrough (runtime handles ReactiveNode in BindProp)
  if (isDirectSignalPassthrough(expr, checker)) return;

  // Object literals (part/state props like indicator={{ bgOpa: expr }})
  // — recurse into individual property values instead of compiling the whole object
  if (ts.isObjectLiteralExpression(expr)) {
    for (const prop of expr.properties) {
      if (ts.isPropertyAssignment(prop) && prop.initializer) {
        processJsxAttributeExpression(
          prop.initializer, sourceFile, checker, haEntities, edits, diagnostics, onTransform,
        );
      }
    }
    return;
  }

  // Check if the expression sub-tree contains Signal-typed nodes
  if (!containsSignalNode(expr, checker)) return;

  // AST-compile the expression to C++
  const ctx: ExprCompilerContext = {
    checker,
    haEntities,
    dependencies: new Map(),
    slots: [],
  };

  const result = translateReactiveExpr(expr, ctx);
  if (!result) {
    // Fallback: wrap in bind.memo() for runtime codegen
    const { line } = sourceFile.getLineAndCharacterOfPosition(expr.getStart(sourceFile));
    diagnostics.push({ message: 'could not AST-compile expression, falling back to bind.memo()', file: sourceFile.fileName, line: line + 1 });
    const exprText = expr.getText(sourceFile);
    const start = expr.getStart(sourceFile);
    const end = expr.getEnd();
    edits.push({
      position: start,
      deleteEnd: end,
      text: `bind.memo(() => ${exprText})`,
    });
    onTransform();
    return;
  }

  // Replace expression with compiled call
  const start = expr.getStart(sourceFile);
  const end = expr.getEnd();

  if (result.slots && result.slots.length > 0) {
    // Slots present — emit bind.__slotted() with runtime signal arguments
    const slotExprs = result.slots.map(s => s.expr.getText(sourceFile));
    edits.push({
      position: start,
      deleteEnd: end,
      text: serializeSlottedCall(result.cpp, result.cppType, result.slots.length, slotExprs),
    });
  } else {
    // Fully static — emit bind.__compiled() with embedded deps
    edits.push({
      position: start,
      deleteEnd: end,
      text: serializeCompiledCall(result.cpp, result.cppType, result.deps),
    });
  }

  onTransform();
}

/**
 * Process an explicit bind.memo(() => expr) call.
 * Extract the arrow body, AST-compile it, and replace with bind.__compiled({...}).
 */
function processExplicitBindMemo(
  callExpr: ts.CallExpression,
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  haEntities: Map<string, HAEntityInfo>,
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

  // AST-compile the expression body
  const ctx: ExprCompilerContext = {
    checker,
    haEntities,
    dependencies: new Map(),
    slots: [],
  };

  const result = translateReactiveExpr(bodyExpr, ctx);
  if (!result) {
    const { line } = sourceFile.getLineAndCharacterOfPosition(callExpr.getStart(sourceFile));
    diagnostics.push({ message: 'could not AST-compile bind.memo() body', file: sourceFile.fileName, line: line + 1 });
    return; // Can't compile — leave as bind.memo() for runtime
  }

  // Replace the entire bind.memo(...) call with compiled call
  const start = callExpr.getStart(sourceFile);
  const end = callExpr.getEnd();

  if (result.slots && result.slots.length > 0) {
    const slotExprs = result.slots.map(s => s.expr.getText(sourceFile));
    edits.push({
      position: start,
      deleteEnd: end,
      text: serializeSlottedCall(result.cpp, result.cppType, result.slots.length, slotExprs),
    });
  } else {
    edits.push({
      position: start,
      deleteEnd: end,
      text: serializeCompiledCall(result.cpp, result.cppType, result.deps),
    });
  }

  onTransform();
}

// ────────────────────────────────────────────────────────────────────────────
// Import injection
// ────────────────────────────────────────────────────────────────────────────

function injectBindImportIfNeeded(sourceFile: ts.SourceFile, edits: SourceEdit[]): void {
  let hasBindImport = false;
  let composeImportDecl: ts.ImportDeclaration | null = null;

  for (const stmt of sourceFile.statements) {
    if (!ts.isImportDeclaration(stmt)) continue;
    const moduleSpec = stmt.moduleSpecifier;
    if (!ts.isStringLiteral(moduleSpec)) continue;
    if (moduleSpec.text !== '@esphome/compose') continue;

    // Skip type-only imports — `import type { ... }` is erased at runtime,
    // so injecting `bind` there would leave it undefined at bundle time.
    if (stmt.importClause?.isTypeOnly) continue;

    composeImportDecl = stmt;

    const namedBindings = stmt.importClause?.namedBindings;
    if (namedBindings && ts.isNamedImports(namedBindings)) {
      for (const spec of namedBindings.elements) {
        if (spec.name.text === 'bind') {
          hasBindImport = true;
          break;
        }
      }
    }
  }

  if (hasBindImport) return;

  if (composeImportDecl) {
    const namedBindings = composeImportDecl.importClause?.namedBindings;
    if (namedBindings && ts.isNamedImports(namedBindings)) {
      const lastElement = namedBindings.elements[namedBindings.elements.length - 1];
      if (lastElement) {
        const insertPos = lastElement.getEnd();
        edits.push({ position: insertPos, text: ', bind' });
        return;
      }
    }
  }

  edits.push({
    position: 0,
    text: `import { bind } from '@esphome/compose';\n`,
  });
}
