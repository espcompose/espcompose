import { describe, it, expect } from 'vitest';
import { exprToCpp, type CppLoweringContext } from './expr-to-cpp';
import type { IRExprNode } from '@espcompose/core';

function emptyCtx(): CppLoweringContext {
  return {
    signalNames: new Map(),
    memoNames: new Map(),
    slotExprs: new Map(),
    entityComponentIds: new Map(),
    themeVarNames: new Map(),
  };
}

// ─── type_cast ────────────────────────────────────────────────────────────────

describe('type_cast', () => {
  it('float → int (static_cast)', () => {
    const node: IRExprNode = {
      kind: 'type_cast',
      expr: { kind: 'literal', value: 3.7, type: 'float' },
      fromType: 'float',
      toType: 'int',
    };
    expect(exprToCpp(node, emptyCtx())).toBe('static_cast<int32_t>(3.7)');
  });

  it('int → float (static_cast)', () => {
    const node: IRExprNode = {
      kind: 'type_cast',
      expr: { kind: 'literal', value: 42, type: 'int' },
      fromType: 'int',
      toType: 'float',
    };
    expect(exprToCpp(node, emptyCtx())).toBe('static_cast<float>(42)');
  });

  it('string → float (std::stof)', () => {
    const node: IRExprNode = {
      kind: 'type_cast',
      expr: { kind: 'literal', value: '3.14', type: 'string' },
      fromType: 'string',
      toType: 'float',
    };
    expect(exprToCpp(node, emptyCtx())).toBe('std::stof(std::string("3.14"))');
  });

  it('string → int (std::stoi)', () => {
    const node: IRExprNode = {
      kind: 'type_cast',
      expr: { kind: 'literal', value: '42', type: 'string' },
      fromType: 'string',
      toType: 'int',
    };
    expect(exprToCpp(node, emptyCtx())).toBe('std::stoi(std::string("42"))');
  });

  it('float → string (std::to_string)', () => {
    const node: IRExprNode = {
      kind: 'type_cast',
      expr: { kind: 'literal', value: 3.14, type: 'float' },
      fromType: 'float',
      toType: 'string',
    };
    expect(exprToCpp(node, emptyCtx())).toBe('std::to_string(3.14)');
  });

  it('bool → string', () => {
    const node: IRExprNode = {
      kind: 'type_cast',
      expr: { kind: 'literal', value: true, type: 'bool' },
      fromType: 'bool',
      toType: 'string',
    };
    expect(exprToCpp(node, emptyCtx())).toBe(
      '(true) ? std::string("true") : std::string("false")',
    );
  });

  it('string → bool', () => {
    const node: IRExprNode = {
      kind: 'type_cast',
      expr: { kind: 'trigger_var', name: 'x' },
      fromType: 'string',
      toType: 'bool',
    };
    expect(exprToCpp(node, emptyCtx())).toBe('!(x).empty()');
  });

  it('same type is no-op', () => {
    const node: IRExprNode = {
      kind: 'type_cast',
      expr: { kind: 'literal', value: 42, type: 'float' },
      fromType: 'float',
      toType: 'float',
    };
    expect(exprToCpp(node, emptyCtx())).toBe('42');
  });
});

// ─── format_string ────────────────────────────────────────────────────────────

describe('format_string', () => {
  it('%.2f format', () => {
    const node: IRExprNode = {
      kind: 'format_string',
      expr: { kind: 'literal', value: 3.14159, type: 'float' },
      format: '%.2f',
    };
    expect(exprToCpp(node, emptyCtx())).toBe('str_sprintf("%.2f", 3.14159)');
  });

  it('%.0f format (no decimals)', () => {
    const node: IRExprNode = {
      kind: 'format_string',
      expr: { kind: 'trigger_var', name: 'temp' },
      format: '%.0f',
    };
    expect(exprToCpp(node, emptyCtx())).toBe('str_sprintf("%.0f", temp)');
  });
});

// ─── null_coalesce ────────────────────────────────────────────────────────────

describe('null_coalesce', () => {
  it('float: isnan check', () => {
    const node: IRExprNode = {
      kind: 'null_coalesce',
      left: { kind: 'trigger_var', name: 'x' },
      right: { kind: 'literal', value: 0, type: 'float' },
      type: 'float',
    };
    expect(exprToCpp(node, emptyCtx())).toBe('std::isnan(x) ? 0 : x');
  });

  it('string: empty check', () => {
    const node: IRExprNode = {
      kind: 'null_coalesce',
      left: { kind: 'trigger_var', name: 's' },
      right: { kind: 'literal', value: 'default', type: 'string' },
      type: 'string',
    };
    expect(exprToCpp(node, emptyCtx())).toBe(
      '(s).empty() ? std::string("default") : s',
    );
  });

  it('int: passthrough (no null concept)', () => {
    const node: IRExprNode = {
      kind: 'null_coalesce',
      left: { kind: 'trigger_var', name: 'n' },
      right: { kind: 'literal', value: 0, type: 'int' },
      type: 'int',
    };
    expect(exprToCpp(node, emptyCtx())).toBe('n');
  });
});

// ─── string_method ────────────────────────────────────────────────────────────

describe('string_method', () => {
  it('.length', () => {
    const node: IRExprNode = {
      kind: 'string_method',
      method: 'length',
      object: { kind: 'trigger_var', name: 's' },
      args: [],
    };
    expect(exprToCpp(node, emptyCtx())).toBe('static_cast<int>(s.length())');
  });

  it('.toUpperCase()', () => {
    const node: IRExprNode = {
      kind: 'string_method',
      method: 'toUpperCase',
      object: { kind: 'trigger_var', name: 's' },
      args: [],
    };
    expect(exprToCpp(node, emptyCtx())).toContain('toupper');
  });

  it('.toLowerCase()', () => {
    const node: IRExprNode = {
      kind: 'string_method',
      method: 'toLowerCase',
      object: { kind: 'trigger_var', name: 's' },
      args: [],
    };
    expect(exprToCpp(node, emptyCtx())).toContain('tolower');
  });

  it('.substring(a, b)', () => {
    const node: IRExprNode = {
      kind: 'string_method',
      method: 'substring',
      object: { kind: 'trigger_var', name: 's' },
      args: [
        { kind: 'literal', value: 0, type: 'int' },
        { kind: 'literal', value: 5, type: 'int' },
      ],
    };
    expect(exprToCpp(node, emptyCtx())).toBe('s.substr(0, (5) - (0))');
  });

  it('.charAt(i)', () => {
    const node: IRExprNode = {
      kind: 'string_method',
      method: 'charAt',
      object: { kind: 'trigger_var', name: 's' },
      args: [{ kind: 'literal', value: 0, type: 'int' }],
    };
    expect(exprToCpp(node, emptyCtx())).toBe('std::string(1, s.at(0))');
  });

  it('.indexOf(str)', () => {
    const node: IRExprNode = {
      kind: 'string_method',
      method: 'indexOf',
      object: { kind: 'trigger_var', name: 's' },
      args: [{ kind: 'literal', value: 'hello', type: 'string' }],
    };
    const result = exprToCpp(node, emptyCtx());
    expect(result).toContain('.find(');
    expect(result).toContain('-1');
  });

  it('.trim()', () => {
    const node: IRExprNode = {
      kind: 'string_method',
      method: 'trim',
      object: { kind: 'trigger_var', name: 's' },
      args: [],
    };
    const result = exprToCpp(node, emptyCtx());
    expect(result).toContain('find_first_not_of');
    expect(result).toContain('find_last_not_of');
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
    expect(exprToCpp(node, emptyCtx())).toBe('static_cast<int32_t>(3.7)');
  });

  it('math_clamp', () => {
    const node: IRExprNode = {
      kind: 'call',
      fn: 'math_clamp',
      args: [
        { kind: 'trigger_var', name: 'x' },
        { kind: 'literal', value: 0, type: 'float' },
        { kind: 'literal', value: 255, type: 'float' },
      ],
    };
    expect(exprToCpp(node, emptyCtx())).toBe('std::clamp(x, 0, 255)');
  });
});

// ─── mux ──────────────────────────────────────────────────────────────────────

describe('mux', () => {
  it('lowers an all-signal-read mux to a pointer table IIFE', () => {
    const ctx = emptyCtx();
    ctx.signalNames.set(0, 'sig_kitchen');
    ctx.signalNames.set(1, 'sig_bedroom');
    ctx.signalNames.set(99, 'popup_mux');
    const node: IRExprNode = {
      kind: 'mux',
      type: 'bool',
      index: { kind: 'signal_read', signalIndex: 99 },
      cases: [
        { kind: 'signal_read', signalIndex: 0 },
        { kind: 'signal_read', signalIndex: 1 },
      ],
    };
    expect(exprToCpp(node, ctx)).toBe(
      '([&]() -> bool { static NodeBase* _tbl[] = {&sig_kitchen, &sig_bedroom}; return static_cast<Signal<bool>*>(_tbl[popup_mux.get()])->get(); })()',
    );
  });

  it('lowers a mixed mux (not all signal_read) to an IIFE switch', () => {
    const ctx = emptyCtx();
    ctx.signalNames.set(7, 'popup_mux');
    const node: IRExprNode = {
      kind: 'mux',
      type: 'string',
      index: { kind: 'signal_read', signalIndex: 7 },
      cases: [
        { kind: 'literal', value: 'on', type: 'string' },
        { kind: 'literal', value: 'off', type: 'string' },
      ],
    };
    expect(exprToCpp(node, ctx)).toBe(
      '([&]() -> std::string { switch (popup_mux.get()) { case 0: return std::string("on"); case 1: return std::string("off"); default: return std::string{}; } })()',
    );
  });

  it('falls back to switch for mixed signal_read + literal cases', () => {
    const ctx = emptyCtx();
    ctx.signalNames.set(0, 'sig_kitchen');
    ctx.signalNames.set(99, 'popup_mux');
    const node: IRExprNode = {
      kind: 'mux',
      type: 'int',
      index: { kind: 'signal_read', signalIndex: 99 },
      cases: [
        { kind: 'signal_read', signalIndex: 0 },
        { kind: 'literal', value: 42, type: 'int' },
      ],
    };
    expect(exprToCpp(node, ctx)).toContain('switch (popup_mux.get())');
  });
});

// ─── table_lookup ─────────────────────────────────────────────────────────────

describe('table_lookup', () => {
  it('lowers to tableName[index] in reactive context', () => {
    const ctx = emptyCtx();
    ctx.signalNames.set(0, 'popup_mux');
    const node: IRExprNode = {
      kind: 'table_lookup',
      table: 'popup_LightButton_entity_ids',
      elementType: 'string',
      index: { kind: 'signal_read', signalIndex: 0 },
    };
    expect(exprToCpp(node, ctx)).toBe(
      'popup_LightButton_entity_ids[popup_mux.get()]',
    );
  });

  it('qualifies with espcompose:: in action context', () => {
    const ctx = emptyCtx();
    ctx.signalNames.set(0, 'popup_mux');
    ctx.actionContext = true;
    const node: IRExprNode = {
      kind: 'table_lookup',
      table: 'popup_LightButton_entity_ids',
      elementType: 'string',
      index: { kind: 'signal_read', signalIndex: 0 },
    };
    expect(exprToCpp(node, ctx)).toBe(
      'espcompose::popup_LightButton_entity_ids[espcompose::popup_mux.get()]',
    );
  });

  it('composes inside a mux index', () => {
    const ctx = emptyCtx();
    ctx.signalNames.set(0, 'popup_mux');
    const node: IRExprNode = {
      kind: 'mux',
      type: 'int',
      index: { kind: 'signal_read', signalIndex: 0 },
      cases: [
        { kind: 'literal', value: 1, type: 'int' },
        { kind: 'literal', value: 2, type: 'int' },
      ],
    };
    expect(exprToCpp(node, ctx)).toContain('switch (popup_mux.get())');
  });
});
