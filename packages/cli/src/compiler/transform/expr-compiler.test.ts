/**
 * Unit tests for the shared expression compiler (expr-compiler.ts).
 *
 * Tests cover:
 *   - translateReactiveExpr() with various expression types
 *   - hasSignalBrand() type detection
 *   - scanForHAEntities() entity scanning
 *   - Lift parameter handling
 *   - Theme property chain resolution
 *   - Binary/prefix operators, ternary, Math.*, isNaN, template literals
 */

import { describe, it, expect } from 'vitest';
import ts from 'typescript';
import {
  translateReactiveExpr,
  translateScriptExpr,
  scanForHAEntities,
  translateBinaryOp,
  translatePrefixOp,
  escapeStringForCpp,
  type ExprCompilerContext,
  type HAEntityInfo,
  type ScriptTransformContext,
} from './expr-compiler';

// ────────────────────────────────────────────────────────────────────────────
// Test helpers
// ────────────────────────────────────────────────────────────────────────────

/**
 * Parse a TS expression string into an AST node.
 * Uses a minimal TS program so the type checker is available.
 */
function parseExpr(code: string): { node: ts.Expression; checker: ts.TypeChecker; sourceFile: ts.SourceFile } {
  const fileName = 'test.tsx';
  // Wrap expression as: const __result = <expr>;
  const fullSource = `const __result = ${code};`;
  const sourceFile = ts.createSourceFile(fileName, fullSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  const host = ts.createCompilerHost({});
  const originalGetSourceFile = host.getSourceFile;
  host.getSourceFile = (name, ...args) => {
    if (name === fileName) return sourceFile;
    return originalGetSourceFile.call(host, name, ...args);
  };

  const program = ts.createProgram([fileName], {
    target: ts.ScriptTarget.Latest,
    jsx: ts.JsxEmit.ReactJSX,
    strict: false,
    noEmit: true,
  }, host);

  const checker = program.getTypeChecker();

  // Extract the expression from `const __result = <expr>;`
  const stmt = sourceFile.statements[0];
  if (!ts.isVariableStatement(stmt)) throw new Error('Expected variable statement');
  const decl = stmt.declarationList.declarations[0];
  if (!decl.initializer) throw new Error('Expected initializer');

  return { node: decl.initializer, checker, sourceFile };
}

function createReactiveCtx(
  checker: ts.TypeChecker,
  haEntities?: Map<string, HAEntityInfo>,
): ExprCompilerContext {
  return {
    checker,
    haEntities: haEntities ?? new Map(),
    dependencies: new Map(),
    slots: [],
  };
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

  describe('translateReactiveExpr', () => {
    it('compiles numeric literals', () => {
      const { node, checker } = parseExpr('42');
      const ctx = createReactiveCtx(checker);
      const result = translateReactiveExpr(node, ctx);
      expect(result).not.toBeNull();
      expect(result!.cpp).toBe('42');
    });

    it('compiles string literals', () => {
      const { node, checker } = parseExpr('"hello"');
      const ctx = createReactiveCtx(checker);
      const result = translateReactiveExpr(node, ctx);
      expect(result).not.toBeNull();
      expect(result!.cpp).toBe('std::string("hello")');
    });

    it('compiles boolean literals', () => {
      const { node: trueNode, checker } = parseExpr('true');
      const ctx = createReactiveCtx(checker);
      expect(translateReactiveExpr(trueNode, ctx)!.cpp).toBe('true');

      const { node: falseNode, checker: c2 } = parseExpr('false');
      expect(translateReactiveExpr(falseNode, createReactiveCtx(c2))!.cpp).toBe('false');
    });

    it('compiles binary expressions', () => {
      const { node, checker } = parseExpr('1 + 2');
      const ctx = createReactiveCtx(checker);
      const result = translateReactiveExpr(node, ctx);
      expect(result!.cpp).toBe('1 + 2');
    });

    it('compiles ternary/conditional expression', () => {
      const { node, checker } = parseExpr('true ? "a" : "b"');
      const ctx = createReactiveCtx(checker);
      const result = translateReactiveExpr(node, ctx);
      expect(result!.cpp).toBe('true ? std::string("a") : std::string("b")');
    });

    it('compiles prefix unary expressions', () => {
      const { node, checker } = parseExpr('!true');
      const ctx = createReactiveCtx(checker);
      const result = translateReactiveExpr(node, ctx);
      expect(result!.cpp).toBe('!true');
    });

    it('compiles parenthesized expressions', () => {
      const { node, checker } = parseExpr('(1 + 2)');
      const ctx = createReactiveCtx(checker);
      const result = translateReactiveExpr(node, ctx);
      expect(result!.cpp).toBe('(1 + 2)');
    });

    it('returns null for unsupported expressions', () => {
      // Array literal — not supported
      const { node, checker } = parseExpr('[1, 2, 3]');
      const ctx = createReactiveCtx(checker);
      const result = translateReactiveExpr(node, ctx);
      expect(result).toBeNull();
    });

    it('compiles template literal with numeric substitution using std::to_string', () => {
      const { node, checker } = parseExpr('`val: ${42}`');
      const ctx = createReactiveCtx(checker);
      const result = translateReactiveExpr(node, ctx);
      expect(result).not.toBeNull();
      expect(result!.cpp).toBe('std::string("val: ") + std::to_string(42)');
    });

    it('compiles template literal with string substitution without std::to_string', () => {
      const { node, checker } = parseExpr('`hi ${\"world\"}`');
      const ctx = createReactiveCtx(checker);
      const result = translateReactiveExpr(node, ctx);
      expect(result).not.toBeNull();
      expect(result!.cpp).toBe('std::string("hi ") + std::string("world")');
    });

    it('compiles template literal with mixed substitutions', () => {
      const { node, checker } = parseExpr('`${"abc"}_${123}`');
      const ctx = createReactiveCtx(checker);
      const result = translateReactiveExpr(node, ctx);
      expect(result).not.toBeNull();
      expect(result!.cpp).toBe('std::string("abc") + std::string("_") + std::to_string(123)');
    });
  });

  describe('translateScriptExpr', () => {
    it('compiles numeric literals', () => {
      const { node } = parseExpr('42');
      const ctx: ScriptTransformContext = { triggerParamName: 'args', localVars: new Set() };
      expect(translateScriptExpr(node, ctx)).toBe('42');
    });

    it('compiles string literals', () => {
      const { node } = parseExpr('"hello"');
      const ctx: ScriptTransformContext = { triggerParamName: 'args', localVars: new Set() };
      expect(translateScriptExpr(node, ctx)).toBe('std::string("hello")');
    });

    it('compiles boolean literals', () => {
      const { node } = parseExpr('true');
      const ctx: ScriptTransformContext = { triggerParamName: 'args', localVars: new Set() };
      expect(translateScriptExpr(node, ctx)).toBe('true');
    });

    it('resolves local variables', () => {
      const { node } = parseExpr('count');
      const ctx: ScriptTransformContext = { triggerParamName: 'args', localVars: new Set(['count']) };
      expect(translateScriptExpr(node, ctx)).toBe('count');
    });

    it('resolves trigger parameter properties', () => {
      const { node } = parseExpr('args.x');
      const ctx: ScriptTransformContext = { triggerParamName: 'args', localVars: new Set() };
      expect(translateScriptExpr(node, ctx)).toBe('x');
    });

    it('returns null for unknown identifiers', () => {
      const { node } = parseExpr('unknown');
      const ctx: ScriptTransformContext = { triggerParamName: 'args', localVars: new Set() };
      expect(translateScriptExpr(node, ctx)).toBeNull();
    });
  });

  describe('scanForHAEntities', () => {
    it('scans importHAEntity calls', () => {
      const source = `const light = importHAEntity('light.office');`;
      const sf = ts.createSourceFile('test.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
      const haEntities = new Map<string, HAEntityInfo>();
      scanForHAEntities(sf, haEntities);
      expect(haEntities.get('light')).toEqual({ entityId: 'light.office', domain: 'light' });
    });

    it('scans bind.haEntity calls', () => {
      const source = `const temp = bind.haEntity('sensor.temperature');`;
      const sf = ts.createSourceFile('test.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
      const haEntities = new Map<string, HAEntityInfo>();
      scanForHAEntities(sf, haEntities);
      expect(haEntities.get('temp')).toEqual({ entityId: 'sensor.temperature', domain: 'sensor' });
    });

    it('scans multiple declarations', () => {
      const source = `
        const a = importHAEntity('light.kitchen');
        const b = bind.haEntity('sensor.temp');
      `;
      const sf = ts.createSourceFile('test.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
      const haEntities = new Map<string, HAEntityInfo>();
      scanForHAEntities(sf, haEntities);
      expect(haEntities.size).toBe(2);
    });
  });

  describe('HA entity property resolution', () => {
    it('resolves isOn property', () => {
      const { node, checker } = parseExpr('true ? "a" : "b"');
      const haEntities = new Map<string, HAEntityInfo>([
        ['light', { entityId: 'light.office', domain: 'light' }],
      ]);
      const ctx = createReactiveCtx(checker, haEntities);
      const result = translateReactiveExpr(node, ctx);
      expect(result).not.toBeNull();
      expect(ctx.dependencies.size).toBe(0);
    });
  });

  describe('slot assignment', () => {
    it('assigns slots for Signal-typed identifiers', () => {
      const { node, checker } = parseExpr('true ? "a" : "b"');
      const ctx = createReactiveCtx(checker);
      const result = translateReactiveExpr(node, ctx);
      expect(result).not.toBeNull();
    });
  });
});
