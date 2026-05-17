/**
 * TypeScript AST transformer for trigger handler compilation.
 *
 * Scans source files for arrow functions in JSX trigger props and
 * useScript() calls, compiles their bodies to action trees,
 * and injects the compiled metadata back into the source.
 *
 * Also scans for importHAEntity() calls to build HA entity context
 * needed by the action compiler.
 */

import ts from 'typescript';
import path from 'node:path';
import {
  scanForHAEntities as scanForHAEntitiesShared,
  detectGlobalHookCall,
  type HAEntityInfo,
} from './expr-compiler.js';
import {
  compileActionBody,
} from './action/index.js';
import type { ActionCompileResult, ScriptHandleInfo } from './action/index.js';
import { isRefType, isCoreExportCall, inferIRTypeFromTsType } from './type-brands.js';
import { type IRActionNode, type IRScriptParamDecl, type IRType, type GlobalDefinition, hashGlobalFingerprint, hashFnv1a, generateId, generateDeterministicId } from '@espcompose/core/internals';

/** Stable string key for an IRType — used in dedup signatures. */
function irTypeKey(vt: IRType): string {
  let s = vt.type as string;
  if (vt.format) s += `:${vt.format}`;
  if (vt.isArray) s += '[]';
  return s;
}

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
  projectRoot?: string,
): TransformOutput {
  const checker = _program.getTypeChecker();
  const ctx: TransformContext = {
    checker,
    haEntities: new Map(),
    functionCounter: 0,
    diagnostics: [],
    sourceFile,
    projectRoot,
  };

  // Pass 1: Scan the file for useHAEntity() / importHAEntity() calls to build entity context
  scanForHAEntities(sourceFile, ctx);

  // Pass 2: Find arrow functions in JSX attributes and useScript() calls,
  // compile them via the action tree compiler
  const edits: SourceEdit[] = [];
  const refSymbols = scanForRefSymbols(sourceFile, checker);
  const scriptHandles = scanForScriptHandles(sourceFile, checker, ctx.projectRoot);
  const globalHandles = scanForGlobalHandles(sourceFile, checker);

  findAndCompileTriggerHandlers(sourceFile, ctx, refSymbols, scriptHandles, globalHandles, edits);

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

import type { SourceEdit } from './type-brands.js';

interface TransformContext {
  checker: ts.TypeChecker;
  /** Map of declaration symbol → HA entity info (scope-aware). */
  haEntities: Map<ts.Symbol, HAEntityInfo>;
  /** Auto-incrementing counter for unique trigger function names. */
  functionCounter: number;
  diagnostics: TransformDiagnostic[];
  sourceFile: ts.SourceFile;
  /** Project root used to derive workspace-relative paths for stable ids. */
  projectRoot?: string;
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
 * Scan for component ref symbols. Detects:
 * - `const ref = useRef<...>()` variable declarations
 * - Parameters and destructured bindings typed as `Ref<T>` or `RefProp<T>`
 *
 * The action compiler resolves the YAML action key from `@actionKey` JSDoc
 * tags on the method declaration, so we only need to know which symbols
 * are refs (not their tags).
 */
function scanForRefSymbols(sourceFile: ts.SourceFile, checker: ts.TypeChecker): Set<ts.Symbol> {
  const refSymbols = new Set<ts.Symbol>();
  const walk = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && node.initializer && ts.isIdentifier(node.name)) {
      if (ts.isCallExpression(node.initializer) && isCoreExportCall(node.initializer, 'useRef', checker)) {
        const sym = checker.getSymbolAtLocation(node.name);
        if (sym) {
          refSymbols.add(sym);
        }
      }
    }

    // Detect Ref-typed parameters and destructured bindings (e.g. props)
    if ((ts.isBindingElement(node) || ts.isParameter(node)) && ts.isIdentifier(node.name)) {
      const sym = checker.getSymbolAtLocation(node.name);
      if (sym && isRefType(checker, sym)) {
        refSymbols.add(sym);
      }
    }

    ts.forEachChild(node, walk);
  };
  walk(sourceFile);
  return refSymbols;
}



/**
 * Scan for `const handle = useScript(...)` patterns
 * and build a map of declaration symbol → script info (ID + user params).
 */
function scanForScriptHandles(sourceFile: ts.SourceFile, checker: ts.TypeChecker, projectRoot?: string): Map<ts.Symbol, ScriptHandleInfo> {
  const scriptHandles = new Map<ts.Symbol, ScriptHandleInfo>();
  const walk = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && node.initializer && ts.isIdentifier(node.name)) {
      if (ts.isCallExpression(node.initializer) && isCoreExportCall(node.initializer, 'useScript', checker)) {
        // Derive the script ID from the call-site source location, matching
        // the seed used in compileAndInjectUseScript so that trigger
        // references and script definitions share the same ID.
        const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.initializer.getStart());
        const relPath = projectRoot
          ? path.relative(projectRoot, sourceFile.fileName).replace(/\\/g, '/')
          : sourceFile.fileName;
        const seed = `${relPath}:${line + 1}:${character + 1}`;
        const scriptId = generateDeterministicId('scr', seed);
        const sym = checker.getSymbolAtLocation(node.name);
        if (sym) {
          // Extract user-defined params from the arrow function argument
          const userParams = extractScriptUserParams(node.initializer, checker);
          scriptHandles.set(sym, { id: scriptId, userParams });
        }
      }
    }
    ts.forEachChild(node, walk);
  };
  walk(sourceFile);
  return scriptHandles;
}

/**
 * Extract user-defined parameters from a `useScript(async (count: number, ...) => { ... })` call.
 * Maps TS types to ESPHome C++ types: number → float, Int → int, string → string, boolean → bool.
 */
function extractScriptUserParams(
  call: ts.CallExpression,
  checker: ts.TypeChecker,
): IRScriptParamDecl[] {
  if (call.arguments.length < 1) return [];
  const arg = call.arguments[0];
  if (!ts.isArrowFunction(arg) && !ts.isFunctionExpression(arg)) return [];
  if (arg.parameters.length === 0) return [];

  const params: IRScriptParamDecl[] = [];
  for (const param of arg.parameters) {
    if (!ts.isIdentifier(param.name)) continue;
    const name = param.name.text;
    const irType = inferParamIRType(param, checker);
    if (irType) {
      params.push({ kind: 'script_param_decl', name, irType });
    }
  }
  return params;
}

function inferParamIRType(
  param: ts.ParameterDeclaration,
  checker: ts.TypeChecker,
): IRType | null {
  return inferIRTypeFromTsType(checker.getTypeAtLocation(param), checker);
}

/**
 * Scan for `useGlobal()` and `useRetainedGlobal()` patterns and build a
 * map of declaration symbol → GlobalDefinition { id, irType }.
 *
 * Runs on the reactive-transformed AST, so useGlobal() calls already
 * have `__key` injected by the global-key-injector.
 *
 * Patterns:
 *   useGlobal('integer', { __key: '...' })          — volatile
 *   useRetainedGlobal('integer', 'key', { ... })    — retained, key is arg 2
 */
function scanForGlobalHandles(sourceFile: ts.SourceFile, checker: ts.TypeChecker): Map<ts.Symbol, GlobalDefinition> {
  const globalHandles = new Map<ts.Symbol, GlobalDefinition>();
  const walk = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && node.initializer && ts.isIdentifier(node.name)) {
      if (ts.isCallExpression(node.initializer)) {
        const info = detectGlobalHookCall(node.initializer, checker);
        if (info) {
          const fingerprint = info.kind === 'retained'
            ? info.retainedKey!
            : extractKeyFromOpts(node.initializer.arguments[1]);
          if (fingerprint) {
            const globalId = hashGlobalFingerprint(fingerprint);
            const sym = checker.getSymbolAtLocation(node.name);
            if (sym) {
              globalHandles.set(sym, { id: globalId, irType: info.irType });
            }
          }
        }
      }
    }
    ts.forEachChild(node, walk);
  };
  walk(sourceFile);
  return globalHandles;
}

/**
 * Extract `__key` string literal from a useGlobal options object.
 * Only used for volatile globals (useRetainedGlobal uses positional key).
 */
function extractKeyFromOpts(optsNode: ts.Expression | undefined): string | null {
  if (!optsNode || !ts.isObjectLiteralExpression(optsNode)) return null;
  for (const prop of optsNode.properties) {
    if (
      ts.isPropertyAssignment(prop)
      && ts.isIdentifier(prop.name)
      && prop.name.text === '__key'
      && ts.isStringLiteral(prop.initializer)
    ) {
      return prop.initializer.text;
    }
  }
  return null;
}

/**
 * Find arrow functions in JSX attributes and useScript() calls.
 * Compile them via the action tree compiler and inject metadata.
 *
 * For JSX attributes: wraps the arrow with Object.assign to attach __compiledActions.
 * For useScript calls: injects compiled metadata as a second argument.
 */
function findAndCompileTriggerHandlers(
  node: ts.Node,
  ctx: TransformContext,
  refSymbols: Set<ts.Symbol>,
  scriptHandles: Map<ts.Symbol, ScriptHandleInfo>,
  globalHandles: Map<ts.Symbol, GlobalDefinition>,
  edits: SourceEdit[],
): void {
  // JSX attribute: <button onPress={() => { ... }} />
  if (ts.isJsxAttribute(node) && node.initializer && ts.isJsxExpression(node.initializer)) {
    const expr = node.initializer.expression;
    if (expr && (ts.isArrowFunction(expr) || ts.isFunctionExpression(expr))) {
      compileAndInjectTriggerHandler(expr, ctx, refSymbols, scriptHandles, globalHandles, edits);
    }
  }

  // useScript(async () => { ... })
  if (ts.isCallExpression(node) && isCoreExportCall(node, 'useScript', ctx.checker) &&
      node.arguments.length >= 1) {
    const arg = node.arguments[0];
    if (ts.isArrowFunction(arg) || ts.isFunctionExpression(arg)) {
      compileAndInjectUseScript(node, arg, ctx, refSymbols, scriptHandles, globalHandles, edits);
    }
  }

  // useAttachedTrigger(ref, 'event', () => { ... })
  if (ts.isCallExpression(node) && isCoreExportCall(node, 'useAttachedTrigger', ctx.checker) &&
      node.arguments.length >= 3) {
    const arg = node.arguments[2];
    if (ts.isArrowFunction(arg) || ts.isFunctionExpression(arg)) {
      compileAndInjectTriggerHandler(arg, ctx, refSymbols, scriptHandles, globalHandles, edits);
    }
  }

  // useAttachedTimeoutTrigger(ref, 'event', 'timeout', () => { ... })
  if (ts.isCallExpression(node) && isCoreExportCall(node, 'useAttachedTimeoutTrigger', ctx.checker) &&
      node.arguments.length >= 4) {
    const arg = node.arguments[3];
    if (ts.isArrowFunction(arg) || ts.isFunctionExpression(arg)) {
      compileAndInjectTriggerHandler(arg, ctx, refSymbols, scriptHandles, globalHandles, edits);
    }
  }

  // Variable initializer containing arrow functions typed as TriggerHandler:
  //   const handler = () => { binding.toggle(); }
  //   const handler = props.onPress ?? (() => { binding.toggle(); })
  if (ts.isVariableDeclaration(node) && node.initializer) {
    const varType = ctx.checker.getTypeAtLocation(node.name);
    if (isTriggerHandlerType(varType, ctx.checker)) {
      compileArrowsInExpression(node.initializer, ctx, refSymbols, scriptHandles, globalHandles, edits);
    }
  }

  ts.forEachChild(node, child =>
    findAndCompileTriggerHandlers(child, ctx, refSymbols, scriptHandles, globalHandles, edits));
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
  refSymbols: Set<ts.Symbol>,
  scriptHandles: Map<ts.Symbol, ScriptHandleInfo>,
  globalHandles: Map<ts.Symbol, GlobalDefinition>,
  edits: SourceEdit[],
): void {
  if (ts.isArrowFunction(expr) || ts.isFunctionExpression(expr)) {
    compileAndInjectTriggerHandler(expr, ctx, refSymbols, scriptHandles, globalHandles, edits);
    return;
  }

  if (ts.isParenthesizedExpression(expr)) {
    compileArrowsInExpression(expr.expression, ctx, refSymbols, scriptHandles, globalHandles, edits);
    return;
  }

  if (ts.isBinaryExpression(expr)) {
    // ?? or || — the right-hand side may contain an arrow fallback
    if (expr.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken ||
        expr.operatorToken.kind === ts.SyntaxKind.BarBarToken) {
      compileArrowsInExpression(expr.right, ctx, refSymbols, scriptHandles, globalHandles, edits);
      // Left side could also be an arrow (unusual but possible)
      compileArrowsInExpression(expr.left, ctx, refSymbols, scriptHandles, globalHandles, edits);
      return;
    }
  }

  if (ts.isConditionalExpression(expr)) {
    compileArrowsInExpression(expr.whenTrue, ctx, refSymbols, scriptHandles, globalHandles, edits);
    compileArrowsInExpression(expr.whenFalse, ctx, refSymbols, scriptHandles, globalHandles, edits);
    return;
  }
}

function compileAndInjectTriggerHandler(
  callback: ts.ArrowFunction | ts.FunctionExpression,
  ctx: TransformContext,
  refSymbols: Set<ts.Symbol>,
  scriptHandles: Map<ts.Symbol, ScriptHandleInfo>,
  globalHandles: Map<ts.Symbol, GlobalDefinition>,
  edits: SourceEdit[],
): void {
  const result = compileActionBody(
    callback,
    ctx.checker,
    ctx.haEntities,
    scriptHandles,
    globalHandles,
    refSymbols,
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

  // Collect ref variable names used in the actions (needed for runtime resolution)
  const refNameSet = buildRefNameSet(refSymbols, result);
  const refNames = collectRefNamesFromActions(result.actions, refNameSet);
  // Script handles referenced via .execute() / await scriptHandle() must be in
  // __refBindings so the runtime can read each handle's __closureIndex and
  // patch IRScriptExecute nodes. The action walker can't pick these up by
  // name (the IR only carries the snake_case scriptId), so add them directly.
  for (const name of result.scriptHandleRefs) {
    if (!refNames.includes(name)) refNames.push(name);
  }
  // Scalar captures (e.g. loop indices captured into expr:closure_read nodes)
  // must be in __refBindings so the runtime can substitute them with literal
  // values. The action walker only inspects action node fields, not expression
  // trees, so add capture names directly.
  for (const name of result.scalarCaptures.keys()) {
    if (!refNames.includes(name)) refNames.push(name);
  }
  // Store IRActionNode[] directly - lowering to target format happens in target packages
  const arrowStart = callback.getStart();
  const arrowEnd = callback.getEnd();
  const metaJson = serializeWithExpressions(result.actions);

  // Build __refBindings object literal: { switchRef: switchRef, lightRef: lightRef }
  // Property-access refs use quoted keys: { "props.mainPage": props.mainPage }
  const refBindingsEntries = refNames.map(name => {
    if (result.propertyAccessRefs.has(name)) {
      return `${JSON.stringify(name)}: ${name}`;
    }
    return `${name}: ${name}`;
  });
  const refBindingsLiteral = refNames.length > 0
    ? `, __refBindings: { ${refBindingsEntries.join(', ')} }`
    : '';

  edits.push({
    position: arrowStart,
    text: `Object.assign(`,
  });
  edits.push({
    position: arrowEnd,
    text: `, { __compiledActions: ${metaJson}${refBindingsLiteral} })`,
  });
}

function compileAndInjectUseScript(
  callExpr: ts.CallExpression,
  callback: ts.ArrowFunction | ts.FunctionExpression,
  ctx: TransformContext,
  refSymbols: Set<ts.Symbol>,
  scriptHandles: Map<ts.Symbol, ScriptHandleInfo>,
  globalHandles: Map<ts.Symbol, GlobalDefinition>,
  edits: SourceEdit[],
): void {
  // Reuse the userParams already extracted by scanForScriptHandles. Look
  // up the call's parent variable declaration symbol in the scriptHandles
  // map; fall back to extracting on the fly only for non-declaration uses
  // (which currently can't occur — useScript must be assigned).
  let userParams: IRScriptParamDecl[] = [];
  const parent = callExpr.parent;
  if (ts.isVariableDeclaration(parent) && ts.isIdentifier(parent.name)) {
    const sym = ctx.checker.getSymbolAtLocation(parent.name);
    const info = sym ? scriptHandles.get(sym) : undefined;
    if (info) userParams = info.userParams;
  }
  if (userParams.length === 0) {
    userParams = extractScriptUserParams(callExpr, ctx.checker);
  }
  const scriptParamNames = new Set(userParams.map(p => p.name));

  const result = compileActionBody(
    callback,
    ctx.checker,
    ctx.haEntities,
    scriptHandles,
    globalHandles,
    refSymbols,
    ctx.sourceFile.fileName,
    scriptParamNames,
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

  // Determine script ID from the call-site source location. Using
  // `<relPath>:<line>:<col>` guarantees uniqueness per `useScript` call
  // across files, components, and nested scopes, while remaining
  // deterministic and machine-independent for a given source. The path is
  // workspace-relative so script ids are stable across environments (CI,
  // dev machines) for snapshot tests.
  let scriptId = generateId('scr');
  if (ts.isVariableDeclaration(parent) && ts.isIdentifier(parent.name)) {
    const { line, character } = ctx.sourceFile.getLineAndCharacterOfPosition(callExpr.getStart());
    const relPath = ctx.projectRoot
      ? path.relative(ctx.projectRoot, ctx.sourceFile.fileName).replace(/\\/g, '/')
      : ctx.sourceFile.fileName;
    const seed = `${relPath}:${line + 1}:${character + 1}`;
    scriptId = generateDeterministicId('scr', seed);
  }

  // Store IRActionNode[] directly - lowering happens in target packages
  const refNameSet = buildRefNameSet(refSymbols, result);
  // Exclude user param names from ref bindings
  for (const name of scriptParamNames) {
    refNameSet.delete(name);
  }
  const refNames = collectRefNamesFromActions(result.actions, refNameSet);
  for (const name of result.scriptHandleRefs) {
    if (!scriptParamNames.has(name) && !refNames.includes(name)) refNames.push(name);
  }
  const refBindingsEntries = refNames.map(name => {
    if (result.propertyAccessRefs.has(name)) {
      return `${JSON.stringify(name)}: ${name}`;
    }
    return `${name}: ${name}`;
  });
  const refBindingsLiteral = refNames.length > 0
    ? `, __refBindings: { ${refBindingsEntries.join(', ')} }`
    : '';

  // Build script metadata including user params if any
  const scriptMetaObj: Record<string, unknown> = { id: scriptId, then: result.actions };
  if (userParams.length > 0) {
    scriptMetaObj.userParams = userParams;
  }
  // Emit scalar captures so the runtime can create closure-table fields.
  if (result.scalarCaptures.size > 0) {
    scriptMetaObj.scalarCaptures = Object.fromEntries(result.scalarCaptures);
  }
  // Deterministic body hash over compiled actions + binding-name set.
  // Two `useScript` calls with the same compiled body and the same set of
  // ref-binding identifier names produce the same `bodyHash`. The runtime
  // uses this hash (combined with the closure-shape signature) as the
  // dedup key.
  const sortedRefNames = [...refNames].sort();
  const sortedUserParamNames = userParams.map((p) => `${p.name}:${irTypeKey(p.irType)}`).sort();
  const hashInput = JSON.stringify({
    actions: result.actions,
    refs: sortedRefNames,
    userParams: sortedUserParamNames,
  });
  scriptMetaObj.bodyHash = hashFnv1a(hashInput);
  const scriptMeta = serializeWithExpressions(scriptMetaObj);

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
 * Build a Set<string> of variable names from a symbol set.
 * The ts.Symbol.name gives the original variable identifier text.
 */
function symbolSetToNameSet(symbols: Set<ts.Symbol>): Set<string> {
  const names = new Set<string>();
  for (const sym of symbols) {
    names.add(sym.name);
  }
  return names;
}

/**
 * Merge all ref-like sets (symbol refs, property-access refs, overlay controller
 * refs) into a single set of binding keys for __refBindings injection.
 */
function buildRefNameSet(
  refSymbols: Set<ts.Symbol>,
  result: ActionCompileResult,
): Set<string> {
  const refNameSet = symbolSetToNameSet(refSymbols);
  for (const key of result.propertyAccessRefs) {
    refNameSet.add(key);
  }
  for (const key of result.overlayControllerRefs) {
    refNameSet.add(key);
  }
  for (const key of result.scriptHandleRefs) {
    refNameSet.add(key);
  }
  for (const key of result.controllerRefs) {
    refNameSet.add(key);
  }
  // Scalar captures need to be in __refBindings so the runtime can read
  // their values and create closure-table entries.
  for (const key of result.scalarCaptures.keys()) {
    refNameSet.add(key);
  }
  return refNameSet;
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
        case 'action:native': {
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
        case 'action:if':
          walk(action.then);
          if (action.else) walk(action.else);
          break;
        case 'action:while':
          walk(action.then);
          break;
        case 'action:repeat':
          walk(action.then);
          break;
        case 'action:lambda_action':
          for (const slot of action.slots) {
            if (slot.kind === 'interp:ref' && refNames.has(slot.name)) {
              names.add(slot.name);
            }
          }
          break;
        case 'action:overlay_show':
        case 'action:overlay_hide':
          if ('controllerRef' in action && action.controllerRef) {
            names.add(action.controllerRef);
          }
          break;
        case 'action:controller_method_call':
          names.add(action.controllerRef);
          break;
        case 'action:delay':
          // If duration is an IRScriptParamRef, its name is a captured
          // variable that needs to appear in __refBindings.
          if (typeof action.duration === 'object' && action.duration.kind === 'script_param') {
            const paramName = action.duration.name;
            if (refNames.has(paramName)) names.add(paramName);
          }
          break;
        case 'action:animate':
          // The animate action's targetRef is a captured ref variable name
          // that must appear in __refBindings so the runtime can substitute
          // it with the actual ESPHome widget ID token.
          if (refNames.has(action.targetRef)) {
            names.add(action.targetRef);
          }
          break;
      }
    }
  };
  walk(actions);
  return Array.from(names);
}

/**
 * Serialize a value to a JSON-like string, replacing DynamicValueMarker
 * objects with raw JavaScript expressions instead of quoted strings.
 *
 * `DynamicValueMarker` is a compiler-local marker (see ./action/calls/ha.ts)
 * used at positions in the action tree whose value is only known at bundle
 * runtime — e.g. the `entity_id` of a dynamically-bound HA entity.  The
 * marker carries a JS expression text (e.g. `entity.__entityId__`) which
 * must be emitted as raw code in the injected bundle source so that bundle
 * evaluation can resolve it to a concrete value before the action tree
 * reaches structural analysis or target lowering.
 */
function serializeWithExpressions(value: unknown): string {
  return JSON.stringify(value).replace(
    /\{"__dynamic__":"([^"]+)"\}/g,
    (_match, expr) => expr,
  );
}
