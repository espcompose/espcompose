/**
 * Semantic Analysis Registry — types and factory.
 *
 * Holds the results of the analysis-only compiler pass that classifies
 * expressions and records handler/reactive/derived findings. This data
 * is strictly sidecar — it does NOT influence transform output.
 *
 * Used by:
 *   - semantic-analysis.ts (populates the registry)
 *   - transform/index.ts (stores per-file registries for debug inspection)
 */

import type ts from 'typescript';

// ────────────────────────────────────────────────────────────────────────────
// Expression classification
// ────────────────────────────────────────────────────────────────────────────

/**
 * Semantic kind of an expression as determined by static analysis.
 *
 * - `static`   — Compile-time constant (literal, const-only expression)
 * - `render`   — Ordinary runtime value (not reactive, not impure)
 * - `reactive` — Depends on Signal<T> or IRReactiveNode reads
 * - `impure`   — Contains unknown function calls or side effects
 * - `unknown`  — Cannot be confidently classified
 */
export type ExprKind = 'static' | 'render' | 'reactive' | 'impure' | 'unknown';

/**
 * Classification result for a single expression node.
 */
export interface ExprAnalysis {
  kind: ExprKind;
  /** True when the expression has no observable side effects. */
  isPure: boolean;
  /** True when the expression reads from a Signal<T>-branded value. */
  readsSignals: boolean;
  /** True when the expression reads from an IRReactiveNode (memo). */
  readsMemos: boolean;
  /**
   * True when the expression is a direct Signal-typed identifier or property
   * access that the reactive transformer would skip (runtime handles it via
   * IRReactiveNode). Used to suppress false-positive DerivedFindings.
   */
  isDirectPassthrough: boolean;
  /** Signal/dependency identifiers discovered during analysis. */
  dependencyIds: string[];
  /** Human-readable notes for debug inspection. */
  notes: string[];
}

// ────────────────────────────────────────────────────────────────────────────
// Handler findings
// ────────────────────────────────────────────────────────────────────────────

/**
 * A trigger/action handler found during value-tree analysis.
 */
export interface HandlerFinding {
  /** The AST node of the handler (arrow function or function expression). */
  node: ts.Node;
  /** Value path from the JSX attribute root to this handler (e.g. ["x:custom", "onPress"]). */
  path: string[];
  /** 1-based line number in the source file. */
  line: number;
  /** 1-based character offset. */
  character: number;
  /**
   * Whether the existing compiler (script-transformer) would also find and
   * compile this handler. False when it's nested in an object literal that
   * the current pipeline doesn't descend into.
   */
  isCompiledByExistingPass: boolean;
  /** Human-readable notes. */
  notes: string[];
}

// ────────────────────────────────────────────────────────────────────────────
// Derived/memo findings
// ────────────────────────────────────────────────────────────────────────────

/**
 * An expression that appears to be a good memo/derived candidate.
 */
export interface DerivedFinding {
  /** The AST node of the candidate expression. */
  node: ts.Node;
  /** Value path or attribute name leading to this expression. */
  path: string[];
  /** 1-based line number. */
  line: number;
  /** 1-based character offset. */
  character: number;
  /** The full classification of the expression. */
  classification: ExprAnalysis;
  /** True if this expression qualifies for auto-memoization. */
  isMemoCandidate: boolean;
  /** Human-readable notes. */
  notes: string[];
}

// ────────────────────────────────────────────────────────────────────────────
// Registry
// ────────────────────────────────────────────────────────────────────────────

/**
 * Per-file semantic analysis results.
 */
export interface SemanticRegistry {
  /** Absolute path of the analyzed source file. */
  filePath: string;
  /** Expression classifications keyed by AST node. */
  exprAnalyses: Map<ts.Node, ExprAnalysis>;
  /** Trigger/action handler findings. */
  handlerFindings: HandlerFinding[];
  /** Reactive derived-value / auto-memo candidates. */
  derivedFindings: DerivedFinding[];
}

/**
 * Create an empty SemanticRegistry for a source file.
 */
export function createSemanticRegistry(filePath: string): SemanticRegistry {
  return {
    filePath,
    exprAnalyses: new Map(),
    handlerFindings: [],
    derivedFindings: [],
  };
}
