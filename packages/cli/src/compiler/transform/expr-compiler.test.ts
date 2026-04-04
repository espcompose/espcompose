/**
 * Unit tests for the shared expression compiler (expr-compiler.ts).
 *
 * Tests cover:
 *   - translateScriptExprIR() with various expression types
 *   - hasSignalBrand() type detection
 *   - scanForHAEntities() entity scanning
 *   - Binary/prefix operators
 */

import { describe, it, expect } from 'vitest';
import ts from 'typescript';
import {
  scanForHAEntities,
  translateBinaryOp,
  translatePrefixOp,
  escapeStringForCpp,
  translateScriptExprIR,
  type HAEntityInfo,
  type ScriptTransformContext,
  type ScanDiagnostic,
} from './expr-compiler';

// ────────────────────────────────────────────────────────────────────────────
// Test helpers
// ────────────────────────────────────────────────────────────────────────────

/**
 * Parse a TS expression string into an AST node.
 */
function parseExpr(code: string): { node: ts.Expression; sourceFile: ts.SourceFile } {
  const fileName = 'test.tsx';
  const fullSource = `const __result = ${code};`;
  const sourceFile = ts.createSourceFile(fileName, fullSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const stmt = sourceFile.statements[0];
  if (!ts.isVariableStatement(stmt)) throw new Error('Expected variable statement');
  const decl = stmt.declarationList.declarations[0];
  if (!decl.initializer) throw new Error('Expected initializer');
  return { node: decl.initializer, sourceFile };
}

/**
 * Create a TS program from a source string and return the source file + checker.
 * Useful for tests that need symbol resolution (e.g. scanForHAEntities).
 */
function parseSource(source: string): { sourceFile: ts.SourceFile; checker: ts.TypeChecker } {
  const fileName = 'scan-test.tsx';
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
    strict: false,
    noEmit: true,
  }, host);
  return { sourceFile: sf, checker: program.getTypeChecker() };
}

// ────────────────────────────────────────────────────────────────────────────
// Tests
// ────────────────────────────────────────────────────────────────────────────

describe('expr-compiler', () => {
  describe('translateBinaryOp', () => {
    it('maps === to ==', () => {
      expect(translateBinaryOp(ts.SyntaxKind.EqualsEqualsEqualsToken)).toBe('==');
    });

    it('maps !== to !=', () => {
      expect(translateBinaryOp(ts.SyntaxKind.ExclamationEqualsEqualsToken)).toBe('!=');
    });

    it('maps && to &&', () => {
      expect(translateBinaryOp(ts.SyntaxKind.AmpersandAmpersandToken)).toBe('&&');
    });

    it('maps || to ||', () => {
      expect(translateBinaryOp(ts.SyntaxKind.BarBarToken)).toBe('||');
    });

    it('maps arithmetic operators', () => {
      expect(translateBinaryOp(ts.SyntaxKind.PlusToken)).toBe('+');
      expect(translateBinaryOp(ts.SyntaxKind.MinusToken)).toBe('-');
      expect(translateBinaryOp(ts.SyntaxKind.AsteriskToken)).toBe('*');
      expect(translateBinaryOp(ts.SyntaxKind.SlashToken)).toBe('/');
      expect(translateBinaryOp(ts.SyntaxKind.PercentToken)).toBe('%');
    });

    it('maps comparison operators', () => {
      expect(translateBinaryOp(ts.SyntaxKind.GreaterThanToken)).toBe('>');
      expect(translateBinaryOp(ts.SyntaxKind.LessThanToken)).toBe('<');
      expect(translateBinaryOp(ts.SyntaxKind.GreaterThanEqualsToken)).toBe('>=');
      expect(translateBinaryOp(ts.SyntaxKind.LessThanEqualsToken)).toBe('<=');
    });
  });

  describe('translatePrefixOp', () => {
    it('maps ! to !', () => {
      expect(translatePrefixOp(ts.SyntaxKind.ExclamationToken)).toBe('!');
    });

    it('maps unary minus', () => {
      expect(translatePrefixOp(ts.SyntaxKind.MinusToken)).toBe('-');
    });

    it('maps ~ to ~', () => {
      expect(translatePrefixOp(ts.SyntaxKind.TildeToken)).toBe('~');
    });
  });

  describe('escapeStringForCpp', () => {
    it('escapes backslashes', () => {
      expect(escapeStringForCpp('a\\b')).toBe('a\\\\b');
    });

    it('escapes double quotes', () => {
      expect(escapeStringForCpp('say "hi"')).toBe('say \\"hi\\"');
    });

    it('escapes newlines', () => {
      expect(escapeStringForCpp('a\nb')).toBe('a\\nb');
    });
  });

  describe('translateScriptExprIR', () => {
    it('compiles numeric literals', () => {
      const { node } = parseExpr('42');
      const ctx: ScriptTransformContext = { triggerParamName: 'args', localVars: new Set() };
      const result = translateScriptExprIR(node, ctx);
      expect(result).toEqual({ kind: 'literal', value: 42, type: 'float' });
    });

    it('compiles string literals', () => {
      const { node } = parseExpr('"hello"');
      const ctx: ScriptTransformContext = { triggerParamName: 'args', localVars: new Set() };
      const result = translateScriptExprIR(node, ctx);
      expect(result).toEqual({ kind: 'literal', value: 'hello', type: 'string' });
    });

    it('compiles boolean literals', () => {
      const { node } = parseExpr('true');
      const ctx: ScriptTransformContext = { triggerParamName: 'args', localVars: new Set() };
      const result = translateScriptExprIR(node, ctx);
      expect(result).toEqual({ kind: 'literal', value: true, type: 'bool' });
    });

    it('resolves local variables', () => {
      const { node } = parseExpr('count');
      const ctx: ScriptTransformContext = { triggerParamName: 'args', localVars: new Set(['count']) };
      const result = translateScriptExprIR(node, ctx);
      expect(result).toEqual({ kind: 'trigger_var', name: 'count' });
    });

    it('resolves trigger parameter properties', () => {
      const { node } = parseExpr('args.x');
      const ctx: ScriptTransformContext = { triggerParamName: 'args', localVars: new Set() };
      const result = translateScriptExprIR(node, ctx);
      expect(result).toEqual({ kind: 'trigger_var', name: 'x' });
    });

    it('returns null for unknown identifiers', () => {
      const { node } = parseExpr('unknown');
      const ctx: ScriptTransformContext = { triggerParamName: 'args', localVars: new Set() };
      const result = translateScriptExprIR(node, ctx);
      expect(result).toBeNull();
    });

    it('compiles binary expressions', () => {
      const { node } = parseExpr('1 + 2');
      const ctx: ScriptTransformContext = { triggerParamName: 'args', localVars: new Set() };
      const result = translateScriptExprIR(node, ctx);
      expect(result).toEqual({
        kind: 'binary',
        op: '+',
        left: { kind: 'literal', value: 1, type: 'float' },
        right: { kind: 'literal', value: 2, type: 'float' },
      });
    });

    it('compiles ternary expressions', () => {
      const { node } = parseExpr('true ? 1 : 2');
      const ctx: ScriptTransformContext = { triggerParamName: 'args', localVars: new Set() };
      const result = translateScriptExprIR(node, ctx);
      expect(result).toEqual({
        kind: 'ternary',
        test: { kind: 'literal', value: true, type: 'bool' },
        consequent: { kind: 'literal', value: 1, type: 'float' },
        alternate: { kind: 'literal', value: 2, type: 'float' },
      });
    });
  });

  describe('scanForHAEntities', () => {
    /** Helper: get entity info by variable name from a symbol-keyed map. */
    function getByName(map: Map<ts.Symbol, HAEntityInfo>, name: string): HAEntityInfo | undefined {
      for (const [sym, info] of map) {
        if (sym.name === name) return info;
      }
      return undefined;
    }

    it('scans useHAEntity calls', () => {
      const source = `const lamp = useHAEntity('light.desk');`;
      const { sourceFile, checker } = parseSource(source);
      const haEntities = new Map<ts.Symbol, HAEntityInfo>();
      scanForHAEntities(sourceFile, haEntities, checker);
      expect(getByName(haEntities, 'lamp')).toEqual({ entityId: 'light.desk', domain: 'light' });
    });

    it('scans multiple declarations', () => {
      const source = `
        const a = useHAEntity('light.kitchen');
        const b = useHAEntity('sensor.temp');
      `;
      const { sourceFile, checker } = parseSource(source);
      const haEntities = new Map<ts.Symbol, HAEntityInfo>();
      scanForHAEntities(sourceFile, haEntities, checker);
      expect(haEntities.size).toBe(2);
    });

    it('scans dynamic entity with domain hint', () => {
      const source = `
        declare const entityId: string;
        const lamp = useHAEntity(entityId, { domain: 'light' });
      `;
      const { sourceFile, checker } = parseSource(source);
      const haEntities = new Map<ts.Symbol, HAEntityInfo>();
      scanForHAEntities(sourceFile, haEntities, checker);
      const info = getByName(haEntities, 'lamp');
      expect(info).toBeDefined();
      expect(info!.domain).toBe('light');
      expect(info!.isDynamic).toBe(true);
      expect(info!.entityId).toBe('__dynamic__');
      expect(info!.entityIdExpr).toBe('entityId');
    });

    it('ignores dynamic entity without domain hint or type constraint', () => {
      const source = `
        declare const entityId: string;
        const lamp = useHAEntity(entityId);
      `;
      const { sourceFile, checker } = parseSource(source);
      const haEntities = new Map<ts.Symbol, HAEntityInfo>();
      scanForHAEntities(sourceFile, haEntities, checker);
      // Plain string type can't infer domain — not registered
      expect(haEntities.size).toBe(0);
    });

    it('emits a diagnostic when domain cannot be determined', () => {
      const source = `
        declare const entityId: string;
        const lamp = useHAEntity(entityId);
      `;
      const { sourceFile, checker } = parseSource(source);
      const haEntities = new Map<ts.Symbol, HAEntityInfo>();
      const diagnostics: ScanDiagnostic[] = [];
      scanForHAEntities(sourceFile, haEntities, checker, diagnostics);
      expect(diagnostics).toHaveLength(1);
      expect(diagnostics[0].message).toContain('domain hint');
      expect(diagnostics[0].message).toContain('entityId');
    });

    it('does not emit a diagnostic when domain hint is provided', () => {
      const source = `
        declare const entityId: string;
        const lamp = useHAEntity(entityId, { domain: 'light' });
      `;
      const { sourceFile, checker } = parseSource(source);
      const haEntities = new Map<ts.Symbol, HAEntityInfo>();
      const diagnostics: ScanDiagnostic[] = [];
      scanForHAEntities(sourceFile, haEntities, checker, diagnostics);
      expect(diagnostics).toHaveLength(0);
      expect(haEntities.size).toBe(1);
    });
  });
});
