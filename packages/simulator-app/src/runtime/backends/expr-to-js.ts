// ────────────────────────────────────────────────────────────────────────────
// IRExprNode → JavaScript evaluation
//
// Converts target-agnostic IRExprNode AST trees into executable JS closures
// for the browser-based simulator.
// ────────────────────────────────────────────────────────────────────────────

import type {
  IRExprNode,
} from '@espcompose/core';
import type {
  BuiltinFn,
  StringMethod,
} from '@espcompose/core/internals';

// ── Lowering context ─────────────────────────────────────────────────────────

export interface JsLoweringContext {
  /** Map signal index → getter function */
  signalGetters: Map<number, () => unknown>;
  /** Map memo nodeId → getter function */
  memoGetters: Map<string, () => unknown>;
  /** Map slot index → getter function (resolved at IR assembly) */
  slotGetters: Map<number, () => unknown>;
  /** Map entity ID + property → getter function */
  entityGetters: Map<string, () => unknown>;
  /** Map theme path → getter function */
  themeGetters: Map<string, () => unknown>;
  /** Font resolver (family, size) → font name string */
  resolveFont?: (family: string, size: number) => string;
}

// ── Main lowering function ───────────────────────────────────────────────────

/**
 * Convert an IRExprNode tree into a JS evaluator closure.
 * Returns a function that computes the expression value when called.
 */
export function exprToJs(node: IRExprNode, ctx: JsLoweringContext): () => unknown {
  switch (node.kind) {
    case 'literal':
      return () => node.value;

    case 'signal_read': {
      const getter = ctx.signalGetters.get(node.signalIndex);
      if (!getter) throw new Error(`Unknown signal index: ${node.signalIndex}`);
      return getter;
    }

    case 'memo_read': {
      const getter = ctx.memoGetters.get(node.memoId);
      if (!getter) throw new Error(`Unknown memo id: ${node.memoId}`);
      return getter;
    }

    case 'binary': {
      const left = exprToJs(node.left, ctx);
      const right = exprToJs(node.right, ctx);
      return makeBinaryEval(node.op, left, right);
    }

    case 'unary': {
      const operand = exprToJs(node.operand, ctx);
      return makeUnaryEval(node.op, operand);
    }

    case 'postfix': {
      const operand = exprToJs(node.operand, ctx);
      // Postfix in expression context — evaluate first, then apply
      return operand; // In a pure expression context, postfix has same value as the operand
    }

    case 'ternary': {
      const test = exprToJs(node.test, ctx);
      const consequent = exprToJs(node.consequent, ctx);
      const alternate = exprToJs(node.alternate, ctx);
      return () => test() ? consequent() : alternate();
    }

    case 'call': {
      const args = node.args.map(a => exprToJs(a, ctx));
      return makeBuiltinEval(node.fn, args);
    }

    case 'concat': {
      const parts = node.parts.map(p => exprToJs(p, ctx));
      return () => parts.map(p => String(p())).join('');
    }

    case 'to_string': {
      const inner = exprToJs(node.expr, ctx);
      return () => String(inner());
    }

    case 'group': {
      return exprToJs(node.expr, ctx);
    }

    case 'slot': {
      const getter = ctx.slotGetters.get(node.slotIndex);
      if (!getter) throw new Error(`Unresolved slot: ${node.slotIndex}`);
      return getter;
    }

    case 'resolve_font': {
      const family = exprToJs(node.family, ctx);
      const size = exprToJs(node.size, ctx);
      if (ctx.resolveFont) {
        const resolver = ctx.resolveFont;
        return () => resolver(String(family()), Number(size()));
      }
      return () => `${family()}_${Math.round(Number(size()))}`;
    }

    case 'theme_read': {
      const getter = ctx.themeGetters.get(node.path);
      if (!getter) throw new Error(`Unknown theme path: ${node.path}`);
      return getter;
    }

    case 'entity_prop': {
      const key = `${node.entityId}::${node.property}`;
      const getter = ctx.entityGetters.get(key);
      if (!getter) throw new Error(`Unknown entity prop: ${key}`);
      return getter;
    }

    case 'component_read':
      return () => 0; // Components not available in simulator

    case 'trigger_var':
      return () => 0; // Trigger variables not available in simulator

    case 'type_cast': {
      const inner = exprToJs(node.expr, ctx);
      return makeTypeCastEval(inner, node.toType);
    }

    case 'format_string': {
      const inner = exprToJs(node.expr, ctx);
      const precision = parseFormatPrecision(node.format);
      return () => (inner() as number).toFixed(precision);
    }

    case 'null_coalesce': {
      const left = exprToJs(node.left, ctx);
      const right = exprToJs(node.right, ctx);
      if (node.type === 'float') return () => { const v = left() as number; return isNaN(v) ? right() : v; };
      if (node.type === 'string') return () => { const v = left() as string; return v === '' ? right() : v; };
      return () => left() ?? right();
    }

    case 'string_method': {
      const obj = exprToJs(node.object, ctx);
      const args = node.args.map(a => exprToJs(a, ctx));
      return makeStringMethodEval(node.method, obj, args);
    }

    default:
      throw new Error(`Unknown IRExprNode kind: ${(node as IRExprNode).kind}`);
  }
}

// ── Binary operator evaluation ───────────────────────────────────────────────

function makeBinaryEval(op: string, left: () => unknown, right: () => unknown): () => unknown {
  switch (op) {
    case '+': return () => (left() as number) + (right() as number);
    case '-': return () => (left() as number) - (right() as number);
    case '*': return () => (left() as number) * (right() as number);
    case '/': return () => (left() as number) / (right() as number);
    case '%': return () => (left() as number) % (right() as number);
    case '==': return () => left() === right();
    case '!=': return () => left() !== right();
    case '>': return () => (left() as number) > (right() as number);
    case '<': return () => (left() as number) < (right() as number);
    case '>=': return () => (left() as number) >= (right() as number);
    case '<=': return () => (left() as number) <= (right() as number);
    case '&&': return () => left() && right();
    case '||': return () => left() || right();
    case '&': return () => (left() as number) & (right() as number);
    case '|': return () => (left() as number) | (right() as number);
    case '^': return () => (left() as number) ^ (right() as number);
    case '<<': return () => (left() as number) << (right() as number);
    case '>>': return () => (left() as number) >> (right() as number);
    default: return () => undefined;
  }
}

// ── Unary operator evaluation ────────────────────────────────────────────────

function makeUnaryEval(op: string, operand: () => unknown): () => unknown {
  switch (op) {
    case '!': return () => !operand();
    case '-': return () => -(operand() as number);
    case '+': return () => +(operand() as number);
    case '~': return () => ~(operand() as number);
    default: return operand;
  }
}

// ── Builtin function evaluation ──────────────────────────────────────────────

function makeBuiltinEval(fn: BuiltinFn, args: (() => unknown)[]): () => unknown {
  switch (fn) {
    case 'math_abs': return () => Math.abs(args[0]() as number);
    case 'math_min': return () => Math.min(...args.map(a => a() as number));
    case 'math_max': return () => Math.max(...args.map(a => a() as number));
    case 'math_round': return () => Math.round(args[0]() as number);
    case 'math_floor': return () => Math.floor(args[0]() as number);
    case 'math_ceil': return () => Math.ceil(args[0]() as number);
    case 'math_trunc': return () => Math.trunc(args[0]() as number);
    case 'math_sqrt': return () => Math.sqrt(args[0]() as number);
    case 'math_pow': return () => Math.pow(args[0]() as number, args[1]() as number);
    case 'math_log': return () => Math.log(args[0]() as number);
    case 'math_log2': return () => Math.log2(args[0]() as number);
    case 'math_log10': return () => Math.log10(args[0]() as number);
    case 'math_sin': return () => Math.sin(args[0]() as number);
    case 'math_cos': return () => Math.cos(args[0]() as number);
    case 'math_tan': return () => Math.tan(args[0]() as number);
    case 'math_clamp': return () => Math.min(Math.max(args[0]() as number, args[1]() as number), args[2]() as number);
    case 'is_nan': return () => isNaN(args[0]() as number);
    default: return () => undefined;
  }
}

// ── Type cast evaluation ─────────────────────────────────────────────────────

function makeTypeCastEval(inner: () => unknown, toType: string): () => unknown {
  switch (toType) {
    case 'float': return () => Number(inner());
    case 'int': return () => Math.trunc(Number(inner()));
    case 'string': return () => String(inner());
    case 'bool': return () => Boolean(inner());
    default: return inner;
  }
}

// ── Format string helpers ────────────────────────────────────────────────────

function parseFormatPrecision(format: string): number {
  const match = format.match(/%.(\d+)f/);
  return match ? parseInt(match[1], 10) : 0;
}

// ── String method evaluation ─────────────────────────────────────────────────

function makeStringMethodEval(
  method: StringMethod,
  obj: () => unknown,
  args: (() => unknown)[],
): () => unknown {
  switch (method) {
    case 'length': return () => String(obj()).length;
    case 'toUpperCase': return () => String(obj()).toUpperCase();
    case 'toLowerCase': return () => String(obj()).toLowerCase();
    case 'substring': return () => String(obj()).substring(args[0]() as number, args[1]?.() as number | undefined);
    case 'charAt': return () => String(obj()).charAt(args[0]() as number);
    case 'indexOf': return () => String(obj()).indexOf(String(args[0]()));
    case 'trim': return () => String(obj()).trim();
    default: return obj;
  }
}
