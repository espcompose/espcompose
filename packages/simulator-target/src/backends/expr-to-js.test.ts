import { describe, it, expect } from 'vitest';
import { exprToJs, type JsLoweringContext } from '@espcompose/simulator-app/runtime';
import type { IRExprNode } from '@espcompose/core';

function emptyCtx(): JsLoweringContext {
  return {
    signalGetters: new Map(),
    memoGetters: new Map(),
    slotGetters: new Map(),
    entityGetters: new Map(),
    themeGetters: new Map(),
  };
}

// ─── type_cast ────────────────────────────────────────────────────────────────

describe('type_cast', () => {
  it('string → float via Number()', () => {
    const node: IRExprNode = {
      kind: 'type_cast',
      expr: { kind: 'literal', value: '3.14', type: 'string' },
      fromType: 'string',
      toType: 'float',
    };
    const fn = exprToJs(node, emptyCtx());
    expect(fn()).toBe(3.14);
  });

  it('float → int via Math.trunc()', () => {
    const node: IRExprNode = {
      kind: 'type_cast',
      expr: { kind: 'literal', value: 3.7, type: 'float' },
      fromType: 'float',
      toType: 'int',
    };
    const fn = exprToJs(node, emptyCtx());
    expect(fn()).toBe(3);
  });

  it('number → string', () => {
    const node: IRExprNode = {
      kind: 'type_cast',
      expr: { kind: 'literal', value: 42, type: 'float' },
      fromType: 'float',
      toType: 'string',
    };
    const fn = exprToJs(node, emptyCtx());
    expect(fn()).toBe('42');
  });

  it('number → bool', () => {
    const node: IRExprNode = {
      kind: 'type_cast',
      expr: { kind: 'literal', value: 0, type: 'float' },
      fromType: 'float',
      toType: 'bool',
    };
    const fn = exprToJs(node, emptyCtx());
    expect(fn()).toBe(false);
  });

  it('truthy number → bool', () => {
    const node: IRExprNode = {
      kind: 'type_cast',
      expr: { kind: 'literal', value: 1, type: 'float' },
      fromType: 'float',
      toType: 'bool',
    };
    const fn = exprToJs(node, emptyCtx());
    expect(fn()).toBe(true);
  });
});

// ─── format_string ────────────────────────────────────────────────────────────

describe('format_string', () => {
  it('.toFixed(2)', () => {
    const node: IRExprNode = {
      kind: 'format_string',
      expr: { kind: 'literal', value: 3.14159, type: 'float' },
      format: '%.2f',
    };
    const fn = exprToJs(node, emptyCtx());
    expect(fn()).toBe('3.14');
  });

  it('.toFixed(0)', () => {
    const node: IRExprNode = {
      kind: 'format_string',
      expr: { kind: 'literal', value: 3.7, type: 'float' },
      format: '%.0f',
    };
    const fn = exprToJs(node, emptyCtx());
    expect(fn()).toBe('4');
  });
});

// ─── null_coalesce ────────────────────────────────────────────────────────────

describe('null_coalesce', () => {
  it('float: NaN falls back to right', () => {
    const node: IRExprNode = {
      kind: 'null_coalesce',
      left: { kind: 'literal', value: NaN, type: 'float' },
      right: { kind: 'literal', value: 42, type: 'float' },
      type: 'float',
    };
    const fn = exprToJs(node, emptyCtx());
    expect(fn()).toBe(42);
  });

  it('float: valid value passes through', () => {
    const node: IRExprNode = {
      kind: 'null_coalesce',
      left: { kind: 'literal', value: 10, type: 'float' },
      right: { kind: 'literal', value: 42, type: 'float' },
      type: 'float',
    };
    const fn = exprToJs(node, emptyCtx());
    expect(fn()).toBe(10);
  });

  it('string: empty falls back to right', () => {
    const node: IRExprNode = {
      kind: 'null_coalesce',
      left: { kind: 'literal', value: '', type: 'string' },
      right: { kind: 'literal', value: 'default', type: 'string' },
      type: 'string',
    };
    const fn = exprToJs(node, emptyCtx());
    expect(fn()).toBe('default');
  });

  it('string: non-empty passes through', () => {
    const node: IRExprNode = {
      kind: 'null_coalesce',
      left: { kind: 'literal', value: 'hello', type: 'string' },
      right: { kind: 'literal', value: 'default', type: 'string' },
      type: 'string',
    };
    const fn = exprToJs(node, emptyCtx());
    expect(fn()).toBe('hello');
  });
});

// ─── string_method ────────────────────────────────────────────────────────────

describe('string_method', () => {
  it('.length', () => {
    const node: IRExprNode = {
      kind: 'string_method',
      method: 'length',
      object: { kind: 'literal', value: 'hello', type: 'string' },
      args: [],
    };
    const fn = exprToJs(node, emptyCtx());
    expect(fn()).toBe(5);
  });

  it('.toUpperCase()', () => {
    const node: IRExprNode = {
      kind: 'string_method',
      method: 'toUpperCase',
      object: { kind: 'literal', value: 'hello', type: 'string' },
      args: [],
    };
    const fn = exprToJs(node, emptyCtx());
    expect(fn()).toBe('HELLO');
  });

  it('.toLowerCase()', () => {
    const node: IRExprNode = {
      kind: 'string_method',
      method: 'toLowerCase',
      object: { kind: 'literal', value: 'HELLO', type: 'string' },
      args: [],
    };
    const fn = exprToJs(node, emptyCtx());
    expect(fn()).toBe('hello');
  });

  it('.substring(1, 3)', () => {
    const node: IRExprNode = {
      kind: 'string_method',
      method: 'substring',
      object: { kind: 'literal', value: 'hello', type: 'string' },
      args: [
        { kind: 'literal', value: 1, type: 'int' },
        { kind: 'literal', value: 3, type: 'int' },
      ],
    };
    const fn = exprToJs(node, emptyCtx());
    expect(fn()).toBe('el');
  });

  it('.charAt(0)', () => {
    const node: IRExprNode = {
      kind: 'string_method',
      method: 'charAt',
      object: { kind: 'literal', value: 'hello', type: 'string' },
      args: [{ kind: 'literal', value: 0, type: 'int' }],
    };
    const fn = exprToJs(node, emptyCtx());
    expect(fn()).toBe('h');
  });

  it('.indexOf("lo")', () => {
    const node: IRExprNode = {
      kind: 'string_method',
      method: 'indexOf',
      object: { kind: 'literal', value: 'hello', type: 'string' },
      args: [{ kind: 'literal', value: 'lo', type: 'string' }],
    };
    const fn = exprToJs(node, emptyCtx());
    expect(fn()).toBe(3);
  });

  it('.indexOf returns -1 for not found', () => {
    const node: IRExprNode = {
      kind: 'string_method',
      method: 'indexOf',
      object: { kind: 'literal', value: 'hello', type: 'string' },
      args: [{ kind: 'literal', value: 'xyz', type: 'string' }],
    };
    const fn = exprToJs(node, emptyCtx());
    expect(fn()).toBe(-1);
  });

  it('.trim()', () => {
    const node: IRExprNode = {
      kind: 'string_method',
      method: 'trim',
      object: { kind: 'literal', value: '  hello  ', type: 'string' },
      args: [],
    };
    const fn = exprToJs(node, emptyCtx());
    expect(fn()).toBe('hello');
  });
});

// ─── theme_read ───────────────────────────────────────────────────────────────

describe('theme_read', () => {
  it('returns the value from the theme getter', () => {
    const ctx = emptyCtx();
    ctx.themeGetters.set('colors_background', () => 0x1a1a2e);
    const node: IRExprNode = {
      kind: 'theme_read',
      path: 'colors_background',
      type: 'color',
    };
    const fn = exprToJs(node, ctx);
    expect(fn()).toBe(0x1a1a2e);
  });

  it('getter is re-evaluated on each call', () => {
    let current = 'dark';
    const ctx = emptyCtx();
    ctx.themeGetters.set('colors_primary_bg', () => current === 'dark' ? 0x000000 : 0xffffff);
    const node: IRExprNode = {
      kind: 'theme_read',
      path: 'colors_primary_bg',
      type: 'color',
    };
    const fn = exprToJs(node, ctx);
    expect(fn()).toBe(0x000000);
    current = 'light';
    expect(fn()).toBe(0xffffff);
  });

  it('throws for missing theme path', () => {
    const node: IRExprNode = {
      kind: 'theme_read',
      path: 'colors_nonexistent',
      type: 'color',
    };
    expect(() => exprToJs(node, emptyCtx())).toThrow('Unknown theme path: colors_nonexistent');
  });

  it('works inside a ternary expression', () => {
    const ctx = emptyCtx();
    ctx.themeGetters.set('colors_primary_bg', () => 0x2196f3);
    ctx.themeGetters.set('colors_secondary_bg', () => 0xff5722);
    const node: IRExprNode = {
      kind: 'ternary',
      test: { kind: 'literal', value: true, type: 'bool' },
      consequent: { kind: 'theme_read', path: 'colors_primary_bg', type: 'color' },
      alternate: { kind: 'theme_read', path: 'colors_secondary_bg', type: 'color' },
    };
    const fn = exprToJs(node, ctx);
    expect(fn()).toBe(0x2196f3);
  });
});

// ─── math_trunc / math_clamp builtins ─────────────────────────────────────────

describe('new builtins', () => {
  it('math_trunc', () => {
    const node: IRExprNode = {
      kind: 'call',
      fn: 'math_trunc',
      args: [{ kind: 'literal', value: 3.7, type: 'float' }],
    };
    const fn = exprToJs(node, emptyCtx());
    expect(fn()).toBe(3);
  });

  it('math_trunc with negative', () => {
    const node: IRExprNode = {
      kind: 'call',
      fn: 'math_trunc',
      args: [{ kind: 'literal', value: -3.7, type: 'float' }],
    };
    const fn = exprToJs(node, emptyCtx());
    expect(fn()).toBe(-3);
  });

  it('math_clamp within range', () => {
    const node: IRExprNode = {
      kind: 'call',
      fn: 'math_clamp',
      args: [
        { kind: 'literal', value: 50, type: 'float' },
        { kind: 'literal', value: 0, type: 'float' },
        { kind: 'literal', value: 255, type: 'float' },
      ],
    };
    const fn = exprToJs(node, emptyCtx());
    expect(fn()).toBe(50);
  });

  it('math_clamp below min', () => {
    const node: IRExprNode = {
      kind: 'call',
      fn: 'math_clamp',
      args: [
        { kind: 'literal', value: -10, type: 'float' },
        { kind: 'literal', value: 0, type: 'float' },
        { kind: 'literal', value: 255, type: 'float' },
      ],
    };
    const fn = exprToJs(node, emptyCtx());
    expect(fn()).toBe(0);
  });

  it('math_clamp above max', () => {
    const node: IRExprNode = {
      kind: 'call',
      fn: 'math_clamp',
      args: [
        { kind: 'literal', value: 300, type: 'float' },
        { kind: 'literal', value: 0, type: 'float' },
        { kind: 'literal', value: 255, type: 'float' },
      ],
    };
    const fn = exprToJs(node, emptyCtx());
    expect(fn()).toBe(255);
  });
});
