import ts from 'typescript';
import type { GlobalDefinition, IRScriptParam, IRType } from '@espcompose/core/internals';
import type { HAEntityInfo } from '../expr-compiler.js';

/** Info about a useScript() declaration visible to the action compiler. */
export interface ScriptHandleInfo {
  /** ESPHome script ID. */
  id: string;
  /** User-defined parameters from the arrow function signature. */
  userParams: IRScriptParam[];
}

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

export interface ActionCompilerDiagnostic {
  message: string;
  file: string;
  line?: number;
  character?: number;
}

export interface ActionCompileResult {
  actions: import('@espcompose/core/internals').IRActionNode[];
  diagnostics: ActionCompilerDiagnostic[];
  /** Names of trigger variables accessed (e.g. ['x', 'state']) */
  triggerVars: string[];
  /**
   * Set of ref binding keys that originated from property-access expressions.
   * Uses the full expression text (e.g. 'props.mainPage') to avoid collisions
   * with local ref identifiers of the same short name.
   */
  refExpressions: Set<string>;
  /** Set of overlay controller variable names that need to be in __refBindings. */
  overlayControllerRefs: Set<string>;
  /**
   * Set of script-handle variable names referenced via `myScript.execute()` or
   * `await myScript()`. Surfacing these into __refBindings allows the runtime
   * to read each handle's `__closureIndex` and patch IRScriptExecute nodes.
   */
  scriptHandleRefs: Set<string>;
  /** Set of controller variable names that need to be in __refBindings. */
  controllerRefs: Set<string>;
  /**
   * Scalar captures: maps captured variable name → IRType.
   * Populated when the action compiler encounters a non-literal identifier
   * in a position like `delay(durationMs)` and infers the value type from
   * the TypeScript type.
   */
  scalarCaptures: Map<string, IRType>;
}

export interface ActionCompilerContext {
  checker: ts.TypeChecker;
  /** Map of declaration symbol → HA entity info (scope-aware). */
  haEntities: Map<ts.Symbol, HAEntityInfo>;
  /** Map of declaration symbol → script handle info (scope-aware). */
  scriptHandles: Map<ts.Symbol, ScriptHandleInfo>;
  /** Names of user-defined script parameters in the current function scope. */
  scriptParamNames: Set<string>;
  /** Map of declaration symbol → global variable info (scope-aware). */
  globalHandles: Map<ts.Symbol, GlobalDefinition>;
  /** Set of declaration symbols that are component refs. */
  refSymbols: Set<ts.Symbol>;
  /** Name of the trigger args parameter (e.g. 'args'), empty if no parameter. */
  triggerParamName: string;
  /** Source file path for diagnostics. */
  filePath: string;
  /** Error accumulator. */
  diagnostics: ActionCompilerDiagnostic[];
  /** Collected trigger variable names. */
  triggerVars: Set<string>;
  /** Set of ref binding keys from property-access expressions. */
  refExpressions: Set<string>;
  /** Set of overlay controller variable names encountered in overlay actions. */
  overlayControllerRefs: Set<string>;
  /** Set of script-handle variable names referenced (so __refBindings can carry them at runtime). */
  scriptHandleRefs: Set<string>;
  /** Set of controller variable names encountered in controller method calls. */
  controllerRefs: Set<string>;
  /**
   * Scalar captures: maps captured variable name → IRType.
   * Populated when the action compiler encounters a non-literal identifier
   * in a position like `delay(durationMs)` and infers the value type from
   * the TypeScript type.
   */
  scalarCaptures: Map<string, IRType>;
}

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

/** Resolve a ts.Symbol-keyed map entry from an identifier node. */
export function lookupBySymbol<T>(
  map: Map<ts.Symbol, T>,
  node: ts.Identifier,
  checker: ts.TypeChecker,
): T | undefined {
  const sym = checker.getSymbolAtLocation(node);
  return sym ? map.get(sym) : undefined;
}

export function emitError(
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
