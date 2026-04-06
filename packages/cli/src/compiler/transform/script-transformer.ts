/**
 * TypeScript AST transformer for trigger handler compilation.
 *
 * Scans source files for arrow functions in JSX trigger props and
 * createScript() calls, compiles their bodies to action trees,
 * and injects the compiled metadata back into the source.
 *
 * Also scans for importHAEntity() calls to build HA entity context
 * needed by the action compiler.
 */

import ts from 'typescript';
import {
  scanForHAEntities as scanForHAEntitiesShared,
  type HAEntityInfo,
} from './expr-compiler.js';
import {
  compileActionBody,
} from './action-compiler.js';
import { type IRActionNode } from '@espcompose/core/internals';

// ────────────────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────────────────

export interface TransformDiagnostic {
  message: string;
  file: string;
  line?: number;
  character?: number;
}

export interface TransformOutput {
  /** The (potentially modified) TypeScript source text. */
  sourceText: string;
  /** Any compilation-level diagnostics encountered. */
  diagnostics: TransformDiagnostic[];
}

/**
 * Transform a TypeScript source file: compile device callback bodies to C++
 * and inject the compiled metadata into the source.
 */
export function transformScriptFile(
  sourceFile: ts.SourceFile,
  _program: ts.Program,
): TransformOutput {
  const checker = _program.getTypeChecker();
  const ctx: TransformContext = {
    checker,
    haEntities: new Map(),
    functionCounter: 0,
    diagnostics: [],
    sourceFile,
  };

  // Pass 1: Scan the file for useHAEntity() / importHAEntity() calls to build entity context
  scanForHAEntities(sourceFile, ctx);

  // Pass 2: Find arrow functions in JSX attributes and useScript() calls,
  // compile them via the action tree compiler
  const edits: SourceEdit[] = [];
  const refTags = scanForRefTags(sourceFile, checker);
  const scriptHandles = scanForScriptHandles(sourceFile, checker);
  findAndCompileTriggerHandlers(sourceFile, ctx, refTags, scriptHandles, edits);

  // Apply edits in reverse position order so indices stay valid
  let text = sourceFile.getFullText();
  for (const edit of edits.sort((a, b) => b.position - a.position)) {
    text = text.slice(0, edit.position) + edit.text + text.slice(edit.position);
  }

  return { sourceText: text, diagnostics: ctx.diagnostics };
}

// ────────────────────────────────────────────────────────────────────────────
// Internal types
// ────────────────────────────────────────────────────────────────────────────

interface SourceEdit {
  position: number;
  text: string;
}

interface TransformContext {
  checker: ts.TypeChecker;
  /** Map of declaration symbol → HA entity info (scope-aware). */
  haEntities: Map<ts.Symbol, HAEntityInfo>;
  /** Auto-incrementing counter for unique trigger function names. */
  functionCounter: number;
  diagnostics: TransformDiagnostic[];
  sourceFile: ts.SourceFile;
}

// ────────────────────────────────────────────────────────────────────────────
// Pass 1: Scan for useHAEntity() / importHAEntity() calls
// ────────────────────────────────────────────────────────────────────────────

function scanForHAEntities(node: ts.Node, ctx: TransformContext): void {
  scanForHAEntitiesShared(node, ctx.haEntities, ctx.checker, ctx.diagnostics);
}

// ────────────────────────────────────────────────────────────────────────────
// Pass 2: Action tree compilation for trigger handler arrow functions
// ────────────────────────────────────────────────────────────────────────────

/**
 * Scan for `const ref = useRef<...>()` patterns and build a map of
 * declaration symbol → element tag. Tags are inferred from the resolved type's
 * `__brand_` properties — the first brand containing an underscore gives the
 * C++ namespace which maps to the ESPHome component tag.
 *
 * Handles all naming schemes: `useRef<LightRef>()`,
 * `useRef<Components.Light.LightRef>()`, `useRef<__marker_light_Light>()`.
 */
function scanForRefTags(sourceFile: ts.SourceFile, checker: ts.TypeChecker): Map<ts.Symbol, string> {
  const refTags = new Map<ts.Symbol, string>();
  const walk = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && node.initializer && ts.isIdentifier(node.name)) {
      if (ts.isCallExpression(node.initializer)) {
        const callee = node.initializer.expression;
        if (ts.isIdentifier(callee) && callee.text === 'useRef') {
          const typeArgs = node.initializer.typeArguments;
          if (typeArgs && typeArgs.length > 0) {
            const resolvedType = checker.getTypeFromTypeNode(typeArgs[0]);
            // Walk properties looking for __brand_<namespace>_<Class> pattern
            const tag = extractTagFromBrands(resolvedType, checker);
            if (tag) {
              const sym = checker.getSymbolAtLocation(node.name);
              if (sym) {
                refTags.set(sym, tag);
              }
            }
          }
        }
      }
    }
    ts.forEachChild(node, walk);
  };
  walk(sourceFile);
  return refTags;
}

/**
 * Extract the ESPHome component tag from a marker type's brand properties.
 * Finds the first `__brand_` property whose name (after stripping `__brand_`)
 * contains an underscore — the part before the first underscore is the C++ namespace
 * which maps to the component tag.
 *
 * Uses the type's *own* symbol name (the first brand) as the canonical brand.
 * E.g. `__brand_light_LightOutput` → tag = "light".
 */
function extractTagFromBrands(type: ts.Type, checker: ts.TypeChecker): string | undefined {
  const props = checker.getPropertiesOfType(type);
  // Sort properties to get a deterministic result — the most specific brand
  // (the type's own identity) is the first __brand_ property alphabetically.
  const brandProps = props
    .filter(p => p.name.startsWith('__brand_'))
    .sort((a, b) => a.name.localeCompare(b.name));

  for (const prop of brandProps) {
    const stripped = prop.name.slice('__brand_'.length);
    const underscoreIdx = stripped.indexOf('_');
    if (underscoreIdx > 0) {
      return stripped.slice(0, underscoreIdx);
    }
  }
  return undefined;
}

/**
 * Scan for `const handle = useScript(...)` or `const handle = createScript(...)` patterns
 * and build a map of declaration symbol → script ID.
 */
function scanForScriptHandles(sourceFile: ts.SourceFile, checker: ts.TypeChecker): Map<ts.Symbol, string> {
  const scriptHandles = new Map<ts.Symbol, string>();
  const walk = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && node.initializer && ts.isIdentifier(node.name)) {
      if (ts.isCallExpression(node.initializer)) {
        const callee = node.initializer.expression;
        if (ts.isIdentifier(callee) && (callee.text === 'useScript' || callee.text === 'createScript')) {
          const varName = node.name.text;
          // Use the variable name as the script ID (snake_case)
          const scriptId = varName.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
          const sym = checker.getSymbolAtLocation(node.name);
          if (sym) {
            scriptHandles.set(sym, scriptId);
          }
        }
      }
    }
    ts.forEachChild(node, walk);
  };
  walk(sourceFile);
  return scriptHandles;
}

/**
 * Find arrow functions in JSX attributes and createScript() calls.
 * Compile them via the action tree compiler and inject metadata.
 *
 * For JSX attributes: wraps the arrow with Object.assign to attach __compiledActions.
 * For createScript calls: injects compiled metadata as a second argument.
 */
function findAndCompileTriggerHandlers(
  node: ts.Node,
  ctx: TransformContext,
  refTags: Map<ts.Symbol, string>,
  scriptHandles: Map<ts.Symbol, string>,
  edits: SourceEdit[],
): void {
  // JSX attribute: <button onPress={() => { ... }} />
  if (ts.isJsxAttribute(node) && node.initializer && ts.isJsxExpression(node.initializer)) {
    const expr = node.initializer.expression;
    if (expr && (ts.isArrowFunction(expr) || ts.isFunctionExpression(expr))) {
      compileAndInjectTriggerHandler(expr, ctx, refTags, scriptHandles, edits);
    }
  }

  // useScript(async () => { ... }) or createScript(async () => { ... })
  if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) &&
      (node.expression.text === 'useScript' || node.expression.text === 'createScript') &&
      node.arguments.length >= 1) {
    const arg = node.arguments[0];
    if (ts.isArrowFunction(arg) || ts.isFunctionExpression(arg)) {
      compileAndInjectUseScript(node, arg, ctx, refTags, scriptHandles, edits);
    }
  }

  // Variable initializer containing arrow functions typed as TriggerHandler:
  //   const handler = () => { binding.toggle(); }
  //   const handler = props.onPress ?? (() => { binding.toggle(); })
  if (ts.isVariableDeclaration(node) && node.initializer) {
    const varType = ctx.checker.getTypeAtLocation(node.name);
    if (isTriggerHandlerType(varType, ctx.checker)) {
      compileArrowsInExpression(node.initializer, ctx, refTags, scriptHandles, edits);
    }
  }

  ts.forEachChild(node, child =>
    findAndCompileTriggerHandlers(child, ctx, refTags, scriptHandles, edits));
}

/**
 * Check if a TypeScript type is a TriggerHandler-like function type.
 *
 * TriggerHandler is defined as `(() => void) | (() => Promise<void>)` (with
 * optional trigger variable parameter). We detect any callable type whose
 * return type is void or Promise<void>.
 */
function isTriggerHandlerType(type: ts.Type, checker: ts.TypeChecker): boolean {
  // Unwrap union members (e.g. TriggerHandler | undefined from optional props)
  const types = type.isUnion() ? type.types : [type];
  for (const t of types) {
    const sigs = t.getCallSignatures();
    if (sigs.length === 0) continue;
    for (const sig of sigs) {
      const ret = checker.getReturnTypeOfSignature(sig);
      // void return
      if (ret.flags & ts.TypeFlags.Void) return true;
      // Promise<void> return
      if ((ret as { resolvedTypeArguments?: ts.Type[] }).resolvedTypeArguments?.[0]?.flags
          && ((ret as { resolvedTypeArguments?: ts.Type[] }).resolvedTypeArguments![0].flags & ts.TypeFlags.Void)) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Walk an expression tree to find arrow functions and compile them.
 *
 * Handles:
 *   - Direct arrows: `() => { binding.toggle(); }`
 *   - Nullish coalescing: `props.onPress ?? (() => { binding.toggle(); })`
 *   - Logical OR: `props.onPress || (() => { binding.toggle(); })`
 *   - Ternary branches: `cond ? () => { a() } : () => { b() }`
 *   - Parenthesized: `(() => { binding.toggle(); })`
 */
function compileArrowsInExpression(
  expr: ts.Expression,
  ctx: TransformContext,
  refTags: Map<ts.Symbol, string>,
  scriptHandles: Map<ts.Symbol, string>,
  edits: SourceEdit[],
): void {
  if (ts.isArrowFunction(expr) || ts.isFunctionExpression(expr)) {
    compileAndInjectTriggerHandler(expr, ctx, refTags, scriptHandles, edits);
    return;
  }

  if (ts.isParenthesizedExpression(expr)) {
    compileArrowsInExpression(expr.expression, ctx, refTags, scriptHandles, edits);
    return;
  }

  if (ts.isBinaryExpression(expr)) {
    // ?? or || — the right-hand side may contain an arrow fallback
    if (expr.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken ||
        expr.operatorToken.kind === ts.SyntaxKind.BarBarToken) {
      compileArrowsInExpression(expr.right, ctx, refTags, scriptHandles, edits);
      // Left side could also be an arrow (unusual but possible)
      compileArrowsInExpression(expr.left, ctx, refTags, scriptHandles, edits);
      return;
    }
  }

  if (ts.isConditionalExpression(expr)) {
    compileArrowsInExpression(expr.whenTrue, ctx, refTags, scriptHandles, edits);
    compileArrowsInExpression(expr.whenFalse, ctx, refTags, scriptHandles, edits);
    return;
  }
}

function compileAndInjectTriggerHandler(
  callback: ts.ArrowFunction | ts.FunctionExpression,
  ctx: TransformContext,
  refTags: Map<ts.Symbol, string>,
  scriptHandles: Map<ts.Symbol, string>,
  edits: SourceEdit[],
): void {
  const result = compileActionBody(
    callback,
    ctx.checker,
    ctx.haEntities,
    scriptHandles,
    refTags,
    ctx.sourceFile.fileName,
  );

  // Propagate diagnostics
  for (const d of result.diagnostics) {
    ctx.diagnostics.push({
      message: d.message,
      file: d.file,
      line: d.line,
      character: d.character,
    });
  }

  if (result.diagnostics.length > 0) return;
  if (result.actions.length === 0) return;

  // Collect ref variable names used in the actions (needed for runtime resolution)
  const refNameSet = symbolMapToNameSet(refTags);
  const refNames = collectRefNamesFromActions(result.actions, refNameSet);

  // Collect dynamic HA entity variable names (needed for runtime entity_id resolution)
  const haEntityNames = collectDynamicHAEntityNames(result.actions, ctx.haEntities);

  // Wrap: Object.assign(() => { ... }, { __compiledActions: [...], __refBindings: { ... } })
  // Store IRActionNode[] directly - lowering to target format happens in target packages
  const arrowStart = callback.getStart();
  const arrowEnd = callback.getEnd();
  const metaJson = serializeWithExpressions(result.actions);

  // Build __refBindings object literal: { switchRef: switchRef, lightRef: lightRef }
  const refBindingsEntries = refNames.map(name => `${name}: ${name}`);
  const refBindingsLiteral = refNames.length > 0
    ? `, __refBindings: { ${refBindingsEntries.join(', ')} }`
    : '';

  // Build __haBindings object literal: { entity: entity }
  const haBindingsEntries = haEntityNames.map(name => `${name}: ${name}`);
  const haBindingsLiteral = haEntityNames.length > 0
    ? `, __haBindings: { ${haBindingsEntries.join(', ')} }`
    : '';

  edits.push({
    position: arrowStart,
    text: `Object.assign(`,
  });
  edits.push({
    position: arrowEnd,
    text: `, { __compiledActions: ${metaJson}${refBindingsLiteral}${haBindingsLiteral} })`,
  });
}

function compileAndInjectUseScript(
  callExpr: ts.CallExpression,
  callback: ts.ArrowFunction | ts.FunctionExpression,
  ctx: TransformContext,
  refTags: Map<ts.Symbol, string>,
  scriptHandles: Map<ts.Symbol, string>,
  edits: SourceEdit[],
): void {
  const result = compileActionBody(
    callback,
    ctx.checker,
    ctx.haEntities,
    scriptHandles,
    refTags,
    ctx.sourceFile.fileName,
  );

  for (const d of result.diagnostics) {
    ctx.diagnostics.push({
      message: d.message,
      file: d.file,
      line: d.line,
      character: d.character,
    });
  }

  if (result.diagnostics.length > 0) return;

  // Determine script ID from parent variable declaration
  let scriptId = `script_${ctx.functionCounter++}`;
  const parent = callExpr.parent;
  if (ts.isVariableDeclaration(parent) && ts.isIdentifier(parent.name)) {
    scriptId = parent.name.text.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
  }

  // Store IRActionNode[] directly - lowering happens in target packages
  const refNameSet = symbolMapToNameSet(refTags);
  const refNames = collectRefNamesFromActions(result.actions, refNameSet);
  const refBindingsEntries = refNames.map(name => `${name}: ${name}`);
  const refBindingsLiteral = refNames.length > 0
    ? `, __refBindings: { ${refBindingsEntries.join(', ')} }`
    : '';

  const scriptMeta = serializeWithExpressions({ id: scriptId, then: result.actions });

  const arrowStart = callback.getStart();
  const arrowEnd = callback.getEnd();
  edits.push({
    position: arrowStart,
    text: `Object.assign(`,
  });
  edits.push({
    position: arrowEnd,
    text: `, { __compiledScript: ${scriptMeta}${refBindingsLiteral} })`,
  });
}

/**
 * Build a Set<string> of variable names from a symbol-keyed map.
 * The ts.Symbol.name gives the original variable identifier text.
 */
function symbolMapToNameSet(map: Map<ts.Symbol, string>): Set<string> {
  const names = new Set<string>();
  for (const sym of map.keys()) {
    names.add(sym.name);
  }
  return names;
}

/**
 * Collect ref variable names used in IR actions.
 * These need runtime binding resolution (variable name → ref token).
 */
function collectRefNamesFromActions(
  actions: IRActionNode[],
  refNames: Set<string>,
): string[] {
  const names = new Set<string>();
  const walk = (actionList: IRActionNode[]): void => {
    for (const action of actionList) {
      switch (action.kind) {
        case 'native': {
          const config = action.config;
          if (typeof config === 'string' && refNames.has(config)) {
            names.add(config);
          } else if (typeof config === 'object' && config !== null) {
            const id = (config as Record<string, unknown>).id;
            if (typeof id === 'string' && refNames.has(id)) {
              names.add(id);
            }
          }
          break;
        }
        case 'if':
          walk(action.then);
          if (action.else) walk(action.else);
          break;
        case 'while':
          walk(action.then);
          break;
        case 'repeat':
          walk(action.then);
          break;
      }
    }
  };
  walk(actions);
  return Array.from(names);
}

/**
 * Collect HA entity variable names referenced by dynamic actions.
 * These bindings need to be captured in the Object.assign so the
 * serializer can read __entityId__ at runtime.
 */
function collectDynamicHAEntityNames(
  actions: IRActionNode[],
  haEntities: Map<ts.Symbol, HAEntityInfo>,
): string[] {
  // Build reverse map: variable name → entity info
  const dynamicNames = new Set<string>();
  for (const [sym, info] of haEntities) {
    if (info.isDynamic) {
      dynamicNames.add(sym.name);
    }
  }

  const found = new Set<string>();
  const walk = (actionList: IRActionNode[]): void => {
    for (const action of actionList) {
      if (action.kind === 'ha_service' && action.data) {
        for (const param of Object.values(action.data)) {
          if (param.kind === 'expression') {
            // Extract variable name from expressions like 'entity.__entityId__'
            const dotIdx = param.jsExpression.indexOf('.');
            if (dotIdx > 0) {
              const varName = param.jsExpression.slice(0, dotIdx);
              if (dynamicNames.has(varName)) {
                found.add(varName);
              }
            }
          }
        }
      }
      if (action.kind === 'if') { walk(action.then); if (action.else) walk(action.else); }
      if (action.kind === 'while') walk(action.then);
      if (action.kind === 'repeat') walk(action.then);
    }
  };
  walk(actions);
  return Array.from(found);
}

/**
 * Serialize a value to a JSON-like string, replacing ExpressionMarker objects
 * with raw JavaScript expressions instead of quoted strings.
 *
 * This is needed because IRExpressionParam values must be emitted as variable
 * references (e.g., `entity.__entityId__`) rather than string literals in the
 * injected source code.
 */
function serializeWithExpressions(value: unknown): string {
  return JSON.stringify(value, (_key, val) => {
    // IRExpressionParam objects stay as-is through JSON.stringify, then we
    // post-process the output to replace their JSON representation with raw code.
    return val;
  }).replace(
    /\{"kind":"expression","jsExpression":"([^"]+)"\}/g,
    (_match, expr) => expr,
  );
}
