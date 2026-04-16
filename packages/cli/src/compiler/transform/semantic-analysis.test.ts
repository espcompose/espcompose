/**
 * Unit tests for the semantic analysis pass (semantic-analysis.ts).
 *
 * Tests cover:
 *   - analyzeExpression() classification for various expression types
 *   - mergeClassifications() merge rules
 *   - walkValueExpressions() recursive value-tree traversal
 *   - runSemanticAnalysis() handler and derived findings
 *   - formatRegistrySummary() debug output
 */

import { describe, it, expect } from 'vitest';
import ts from 'typescript';
import {
  analyzeExpression,
  mergeClassifications,
  walkValueExpressions,
  runSemanticAnalysis,
  formatRegistrySummary,
} from './semantic-analysis';
import { createSemanticRegistry, type ExprAnalysis } from './semantic-registry';

// ────────────────────────────────────────────────────────────────────────────
// Test helpers
// ────────────────────────────────────────────────────────────────────────────

/**
 * Parse a single expression and return everything needed for analysis.
 */
function setupExpr(exprCode: string) {
  const fileName = 'test.tsx';
  const fullSource = `const __result = ${exprCode};`;
  const sf = ts.createSourceFile(fileName, fullSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const host = ts.createCompilerHost({});
  const originalGetSourceFile = host.getSourceFile;
  host.getSourceFile = (name, ...args) => {
    if (name === fileName) return sf;
    return originalGetSourceFile.call(host, name, ...args);
  };
  const program = ts.createProgram([fileName], {
    target: ts.ScriptTarget.Latest,
    jsx: ts.JsxEmit.ReactJSX,
    strict: false,
    noEmit: true,
  }, host);
  const checker = program.getTypeChecker();

  // Extract the initializer expression
  const stmt = sf.statements[0];
  if (!ts.isVariableStatement(stmt)) throw new Error('Expected variable statement');
  const decl = stmt.declarationList.declarations[0];
  if (!decl.initializer) throw new Error('Expected initializer');

  const registry = createSemanticRegistry(fileName);

  return {
    expr: decl.initializer,
    ctx: {
      checker,
      haEntities: new Map(),
      sourceFile: sf,
      registry,
    },
    sourceFile: sf,
    program,
  };
}

/**
 * Parse a full source file and create a ts.Program for semantic analysis.
 */
function setupSource(source: string) {
  const fileName = 'test.tsx';
  const sf = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const host = ts.createCompilerHost({});
  const originalGetSourceFile = host.getSourceFile;
  host.getSourceFile = (name, ...args) => {
    if (name === fileName) return sf;
    return originalGetSourceFile.call(host, name, ...args);
  };
  const program = ts.createProgram([fileName], {
    target: ts.ScriptTarget.Latest,
    jsx: ts.JsxEmit.ReactJSX,
    jsxImportSource: '@espcompose/core',
    strict: false,
    noEmit: true,
  }, host);
  return { sourceFile: sf, program };
}

// ────────────────────────────────────────────────────────────────────────────
// analyzeExpression — classification tests
// ────────────────────────────────────────────────────────────────────────────

describe('analyzeExpression', () => {
  describe('static expressions', () => {
    it('classifies numeric literals as static', () => {
      const { expr, ctx } = setupExpr('42');
      const analysis = analyzeExpression(expr, ctx);
      expect(analysis.kind).toBe('static');
      expect(analysis.isPure).toBe(true);
      expect(analysis.readsSignals).toBe(false);
    });

    it('classifies string literals as static', () => {
      const { expr, ctx } = setupExpr('"hello"');
      const analysis = analyzeExpression(expr, ctx);
      expect(analysis.kind).toBe('static');
      expect(analysis.isPure).toBe(true);
    });

    it('classifies boolean literals as static', () => {
      const { expr, ctx } = setupExpr('true');
      const analysis = analyzeExpression(expr, ctx);
      expect(analysis.kind).toBe('static');
    });

    it('classifies null as static', () => {
      const { expr, ctx } = setupExpr('null');
      const analysis = analyzeExpression(expr, ctx);
      expect(analysis.kind).toBe('static');
    });

    it('classifies undefined as render (identifier, not keyword)', () => {
      const { expr, ctx } = setupExpr('undefined');
      const analysis = analyzeExpression(expr, ctx);
      // `undefined` is an identifier in the TS AST, not a keyword literal
      expect(analysis.kind).toBe('render');
    });

    it('classifies template string without substitutions as static', () => {
      const { expr, ctx } = setupExpr('`hello world`');
      const analysis = analyzeExpression(expr, ctx);
      expect(analysis.kind).toBe('static');
    });
  });

  describe('render expressions', () => {
    it('classifies regular identifiers as render', () => {
      const { expr, ctx } = setupExpr('someVariable');
      const analysis = analyzeExpression(expr, ctx);
      // A variable with no special brand defaults to render
      expect(analysis.kind).toBe('render');
      expect(analysis.isPure).toBe(true);
    });
  });

  describe('impure expressions', () => {
    it('classifies unknown function calls as impure', () => {
      const { expr, ctx } = setupExpr('doSomething()');
      const analysis = analyzeExpression(expr, ctx);
      expect(analysis.kind).toBe('impure');
      expect(analysis.isPure).toBe(false);
    });

    it('classifies useEffect as impure', () => {
      const { expr, ctx } = setupExpr('useEffect()');
      const analysis = analyzeExpression(expr, ctx);
      expect(analysis.kind).toBe('impure');
      expect(analysis.isPure).toBe(false);
      expect(analysis.notes.some(n => n.includes('useEffect'))).toBe(true);
    });
  });

  describe('pure function calls', () => {
    it('classifies Math.abs with static args as static', () => {
      const { expr, ctx } = setupExpr('Math.abs(-5)');
      const analysis = analyzeExpression(expr, ctx);
      expect(analysis.kind).toBe('static');
      expect(analysis.isPure).toBe(true);
    });

    it('classifies Number() with static args as static', () => {
      const { expr, ctx } = setupExpr('Number("42")');
      const analysis = analyzeExpression(expr, ctx);
      expect(analysis.kind).toBe('static');
      expect(analysis.isPure).toBe(true);
    });

    it('classifies isNaN with static args as static', () => {
      const { expr, ctx } = setupExpr('isNaN(5)');
      const analysis = analyzeExpression(expr, ctx);
      expect(analysis.kind).toBe('static');
      expect(analysis.isPure).toBe(true);
    });
  });

  describe('binary expressions', () => {
    it('classifies static + static as static', () => {
      const { expr, ctx } = setupExpr('1 + 2');
      const analysis = analyzeExpression(expr, ctx);
      expect(analysis.kind).toBe('static');
      expect(analysis.isPure).toBe(true);
    });

    it('classifies comparison of static values as static', () => {
      const { expr, ctx } = setupExpr('5 > 10');
      const analysis = analyzeExpression(expr, ctx);
      expect(analysis.kind).toBe('static');
    });
  });

  describe('conditional expressions', () => {
    it('classifies pure ternary as static when all branches are static', () => {
      const { expr, ctx } = setupExpr('true ? "a" : "b"');
      const analysis = analyzeExpression(expr, ctx);
      expect(analysis.kind).toBe('static');
      expect(analysis.isPure).toBe(true);
    });
  });

  describe('object literals', () => {
    it('classifies object with static props as static', () => {
      const { expr, ctx } = setupExpr('({ a: 1, b: "hello" })');
      const analysis = analyzeExpression(expr, ctx);
      expect(analysis.kind).toBe('static');
    });

    it('classifies object with impure prop as impure', () => {
      const { expr, ctx } = setupExpr('({ a: doThing() })');
      const analysis = analyzeExpression(expr, ctx);
      expect(analysis.kind).toBe('impure');
      expect(analysis.isPure).toBe(false);
    });
  });

  describe('array literals', () => {
    it('classifies static array as static', () => {
      const { expr, ctx } = setupExpr('[1, 2, 3]');
      const analysis = analyzeExpression(expr, ctx);
      expect(analysis.kind).toBe('static');
    });
  });

  describe('arrow functions', () => {
    it('classifies arrow functions as unknown (closure)', () => {
      const { expr, ctx } = setupExpr('() => 42');
      const analysis = analyzeExpression(expr, ctx);
      // Arrow without TriggerHandler type → unknown closure
      expect(analysis.kind).toBe('unknown');
    });
  });

  describe('caching', () => {
    it('returns cached result for the same node', () => {
      const { expr, ctx } = setupExpr('42');
      const first = analyzeExpression(expr, ctx);
      const second = analyzeExpression(expr, ctx);
      expect(first).toBe(second); // Same object reference
    });
  });
});

// ────────────────────────────────────────────────────────────────────────────
// mergeClassifications
// ────────────────────────────────────────────────────────────────────────────

describe('mergeClassifications', () => {
  const s: ExprAnalysis = { kind: 'static', isPure: true, readsSignals: false, readsMemos: false, dependencyIds: [], notes: [] };
  const r: ExprAnalysis = { kind: 'render', isPure: true, readsSignals: false, readsMemos: false, dependencyIds: [], notes: [] };
  const rx: ExprAnalysis = { kind: 'reactive', isPure: true, readsSignals: true, readsMemos: false, dependencyIds: ['dep1'], notes: [] };
  const imp: ExprAnalysis = { kind: 'impure', isPure: false, readsSignals: false, readsMemos: false, dependencyIds: [], notes: [] };
  const unk: ExprAnalysis = { kind: 'unknown', isPure: false, readsSignals: false, readsMemos: false, dependencyIds: [], notes: [] };

  it('static + static = static', () => {
    expect(mergeClassifications(s, s).kind).toBe('static');
  });

  it('static + render = render', () => {
    expect(mergeClassifications(s, r).kind).toBe('render');
  });

  it('static + reactive = reactive', () => {
    expect(mergeClassifications(s, rx).kind).toBe('reactive');
  });

  it('render + reactive = reactive', () => {
    expect(mergeClassifications(r, rx).kind).toBe('reactive');
  });

  it('anything + impure = impure', () => {
    expect(mergeClassifications(rx, imp).kind).toBe('impure');
    expect(mergeClassifications(rx, imp).isPure).toBe(false);
  });

  it('anything + unknown = unknown', () => {
    expect(mergeClassifications(rx, unk).kind).toBe('unknown');
  });

  it('preserves readsSignals via OR', () => {
    const result = mergeClassifications(rx, s);
    expect(result.readsSignals).toBe(true);
  });

  it('concatenates dependencyIds', () => {
    const rx2: ExprAnalysis = { ...rx, dependencyIds: ['dep2'] };
    const result = mergeClassifications(rx, rx2);
    expect(result.dependencyIds).toEqual(['dep1', 'dep2']);
  });

  it('AND-combines isPure', () => {
    expect(mergeClassifications(s, imp).isPure).toBe(false);
    expect(mergeClassifications(s, r).isPure).toBe(true);
  });
});

// ────────────────────────────────────────────────────────────────────────────
// walkValueExpressions
// ────────────────────────────────────────────────────────────────────────────

describe('walkValueExpressions', () => {
  it('visits root expression', () => {
    const { expr } = setupExpr('42');
    const visited: string[][] = [];
    walkValueExpressions(expr, (_e, path) => visited.push([...path]));
    expect(visited).toEqual([[]]);
  });

  it('visits object literal properties', () => {
    const { expr } = setupExpr('({ a: 1, b: 2 })');
    const visited: string[][] = [];
    walkValueExpressions(expr, (_e, path) => visited.push([...path]));
    // Should visit: root (parens), root object, then property a, then property b
    expect(visited).toEqual([[], [], ['a'], ['b']]);
  });

  it('visits array elements', () => {
    const { expr } = setupExpr('[10, 20, 30]');
    const visited: string[][] = [];
    walkValueExpressions(expr, (_e, path) => visited.push([...path]));
    expect(visited).toEqual([[], ['[0]'], ['[1]'], ['[2]']]);
  });

  it('visits nested object properties', () => {
    const { expr } = setupExpr('({ outer: { inner: 42 } })');
    const visited: string[][] = [];
    walkValueExpressions(expr, (_e, path) => visited.push([...path]));
    // root (parens) → root (object) → outer (nested object) → inner (42)
    expect(visited).toEqual([[], [], ['outer'], ['outer', 'inner']]);
  });

  it('visits conditional branches', () => {
    const { expr } = setupExpr('true ? "yes" : "no"');
    const visited: string[][] = [];
    walkValueExpressions(expr, (_e, path) => visited.push([...path]));
    expect(visited).toEqual([[], ['?:true'], ['?:false']]);
  });

  it('visits ?? operands', () => {
    const { expr } = setupExpr('null ?? "fallback"');
    const visited: string[][] = [];
    walkValueExpressions(expr, (_e, path) => visited.push([...path]));
    expect(visited).toEqual([[], ['lhs'], ['rhs']]);
  });

  it('unwraps parenthesized expressions', () => {
    const { expr } = setupExpr('(42)');
    const visited: string[][] = [];
    walkValueExpressions(expr, (_e, path) => visited.push([...path]));
    // Parenthesized and the inner literal both visited at same path
    expect(visited.length).toBe(2);
    expect(visited[0]).toEqual([]);
    expect(visited[1]).toEqual([]);
  });

  it('does not descend into arrow functions', () => {
    const { expr } = setupExpr('({ onClick: () => doThing() })');
    const visited: string[][] = [];
    walkValueExpressions(expr, (_e, path) => visited.push([...path]));
    // root (parens) → root (object), then onClick (arrow function — visited but not recursed)
    expect(visited).toEqual([[], [], ['onClick']]);
  });
});

// ────────────────────────────────────────────────────────────────────────────
// runSemanticAnalysis — integration
// ────────────────────────────────────────────────────────────────────────────

describe('runSemanticAnalysis', () => {
  it('produces a registry for a simple source file', () => {
    const { sourceFile, program } = setupSource(`
      const x = 42;
    `);
    const registry = runSemanticAnalysis(sourceFile, program);
    expect(registry.filePath).toBe('test.tsx');
    expect(registry.exprAnalyses.size).toBeGreaterThan(0);
  });

  it('classifies static variable initializer', () => {
    const { sourceFile, program } = setupSource(`
      const x = 42;
    `);
    const registry = runSemanticAnalysis(sourceFile, program);
    // The literal 42 should be classified as static
    const staticFindings = [...registry.exprAnalyses.values()].filter(a => a.kind === 'static');
    expect(staticFindings.length).toBeGreaterThan(0);
  });

  it('does not produce derived findings for static expressions', () => {
    const { sourceFile, program } = setupSource(`
      const x = 42;
    `);
    const registry = runSemanticAnalysis(sourceFile, program);
    expect(registry.derivedFindings.length).toBe(0);
  });
});

// ────────────────────────────────────────────────────────────────────────────
// formatRegistrySummary
// ────────────────────────────────────────────────────────────────────────────

describe('formatRegistrySummary', () => {
  it('produces a human-readable summary', () => {
    const registry = createSemanticRegistry('/src/test.tsx');
    const summary = formatRegistrySummary(registry);
    expect(summary).toContain('Semantic Analysis');
    expect(summary).toContain('Expressions: 0 analyzed');
    expect(summary).toContain('Handler Findings: 0');
    expect(summary).toContain('Derived Findings: 0');
  });
});
