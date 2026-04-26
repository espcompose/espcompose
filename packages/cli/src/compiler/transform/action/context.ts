import ts from 'typescript';
import type { GlobalDefinition } from '@espcompose/core/internals';
import type { HAEntityInfo } from '../expr-compiler.js';

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
  /** Set of popup controller variable names that need to be in __refBindings. */
  popupControllerRefs: Set<string>;
}

export interface ActionCompilerContext {
  checker: ts.TypeChecker;
  /** Map of declaration symbol → HA entity info (scope-aware). */
  haEntities: Map<ts.Symbol, HAEntityInfo>;
  /** Map of declaration symbol → script ID (scope-aware). */
  scriptHandles: Map<ts.Symbol, string>;
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
  /** Set of popup controller variable names encountered in popup actions. */
  popupControllerRefs: Set<string>;
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
