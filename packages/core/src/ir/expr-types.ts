// ────────────────────────────────────────────────────────────────────────────
// ExpressionIR — Typed expression AST for the ESPCompose compiler.
//
// Target-agnostic: no C++, no JS strings. Each backend (esphome-target)
// lowers IRExpression trees to its own target code.
// ────────────────────────────────────────────────────────────────────────────

import type { IRStatementBlock } from './stmt-types.js';

// ── Value types ──────────────────────────────────────────────────────────────

export type ExprType =
  | 'int'
  | 'float'
  | 'string'
  | 'bool'
  | 'color'
  | 'font_ref'
  | 'int_array'
  | 'float_array'
  | 'string_array'
  | 'bool_array';

// ── Operator enums ───────────────────────────────────────────────────────────

export type BinaryOp =
  | '+' | '-' | '*' | '/' | '%'
  | '==' | '!=' | '>' | '<' | '>=' | '<='
  | '&&' | '||'
  | '&' | '|' | '^' | '<<' | '>>'
  | '=' | '+=' | '-=' | '*=' | '/=';

export type UnaryOp =
  | '!' | '-' | '+' | '~' | '++' | '--';

export type PostfixOp = '++' | '--';

// ── Builtin functions ────────────────────────────────────────────────────────

export type BuiltinFn =
  | 'math_abs' | 'math_min' | 'math_max'
  | 'math_round' | 'math_floor' | 'math_ceil' | 'math_trunc'
  | 'math_sqrt' | 'math_pow'
  | 'math_log' | 'math_log2' | 'math_log10'
  | 'math_sin' | 'math_cos' | 'math_tan'
  | 'math_clamp'
  | 'is_nan';

// ── String method names ──────────────────────────────────────────────────────

export type StringMethod =
  | 'length'
  | 'toUpperCase' | 'toLowerCase'
  | 'substring' | 'charAt' | 'indexOf'
  | 'trim';

// ── Array method names ───────────────────────────────────────────────────────

export type ArrayMethod =
  | 'size'
  | 'get'
  | 'push_back'
  | 'clear';

// ── Expression node types ────────────────────────────────────────────────────

export interface IRLiteralExpression {
  readonly kind: 'expr:literal';
  readonly value: string | number | boolean;
  readonly type: ExprType;
}

export interface IRSignalReadExpression {
  readonly kind: 'expr:signal_read';
  /** Index into the SemanticIR reactiveNodes/signal list. */
  readonly signalIndex: number;
}

export interface IRMemoReadExpression {
  readonly kind: 'expr:memo_read';
  readonly memoId: string;
}

export interface IRSlotExpression {
  readonly kind: 'expr:slot';
  readonly slotIndex: number;
}

export interface IRThemeReadExpression {
  readonly kind: 'expr:theme_read';
  /** Human-readable scope name (e.g. 'espcompose:ui'). */
  readonly scope: string;
  /** 8-char hex hash of the scope — C++ identifier fragment. */
  readonly scopeId: string;
  readonly path: string;
  readonly type: ExprType;
}

export interface IREntityPropExpression {
  readonly kind: 'expr:entity_prop';
  readonly entityId: string;
  readonly propertyKey: string;
  readonly type: ExprType;
}

/** Read a reactive global variable's BoundSignal. */
export interface IRGlobalReadExpression {
  readonly kind: 'expr:global_read';
  readonly globalId: string;
  readonly type: ExprType;
}

export interface IRComponentReadExpression {
  readonly kind: 'expr:component_read';
  readonly componentId: string;
  readonly sensorIndex: number;
}

/** Read a local variable by name (used in statement block expressions) */
export interface IRLocalVarExpression {
  readonly kind: 'expr:local_var';
  readonly name: string;
  readonly type: ExprType;
}

/** Read a trigger variable by name (used in action/script conditions) */
export interface IRTriggerVarExpression {
  readonly kind: 'expr:trigger_var';
  readonly name: string;
}

/**
 * Read a closure-captured variable by name.
 *
 * Produced by the action compiler when a handler references an outer-scope
 * variable with a primitive type (e.g. a loop index). The contribution path
 * resolves these to `expr:literal` nodes at registration time (the JS value
 * is captured in `__refBindings`). The script path lowers them via the
 * closure-table struct (`closure.<name>` in C++).
 */
export interface IRClosureReadExpression {
  readonly kind: 'expr:closure_read';
  readonly name: string;
  readonly type: ExprType;
}

/**
 * Multiplexed expression — selects one of N case expressions by an index.
 *
 * Used by useOverlay() for shared overlay widget subtrees: the `index` is read
 * from a mux signal (an integer signal), and each case expression yields the
 * value for one popup instance. Backends lower this to a switch / IIFE.
 *
 * The mux memo's *expression* contains direct reads of per-case sources, but
 * the mux memo's *reactive dependencies* are intentionally limited to the
 * mux + dirty signals (selective notification) — entity-source reads inside
 * the cases are imperative, not subscribed.
 */
export interface IRMuxExpression {
  readonly kind: 'expr:mux';
  readonly index: IRExpression;
  readonly cases: IRExpression[];
  readonly type: ExprType;
}

/**
 * Compile-time data table lookup — `table[index]`.
 *
 * Used by table-driven popup codegen to read per-instance values
 * (entity IDs, signal pointers, literals) from `.rodata` tables that are
 * declared in the generated bindings header. The `table` is an opaque
 * identifier resolved by the backend to a C++ array name.
 */
export interface IRTableLookupExpression {
  readonly kind: 'expr:table_lookup';
  readonly index: IRExpression;
  readonly table: string;
  readonly elementType: ExprType;
}

/**
 * A function expression — an expression computed by executing a statement block.
 *
 * Analogous to `ts.ArrowFunction` with a block body: the return type lives on
 * this expression wrapper, not on the inner `IRStatementBlock` (which is a
 * pure statement container).
 *
 * Backends lower this to an immediately-invoked lambda or equivalent construct.
 */
export interface IRFunctionExpression {
  readonly kind: 'expr:function';
  readonly body: IRStatementBlock;
  readonly returnType: ExprType;
}

// ── Op descriptor (discriminated by tag) ─────────────────────────────────────

export type ExprOpDescriptor =
  | { readonly tag: 'binary'; readonly op: BinaryOp }
  | { readonly tag: 'unary'; readonly op: UnaryOp }
  | { readonly tag: 'postfix'; readonly op: PostfixOp }
  | { readonly tag: 'ternary' }
  | { readonly tag: 'call'; readonly fn: BuiltinFn }
  | { readonly tag: 'concat' }
  | { readonly tag: 'to_string'; readonly format?: string }
  | { readonly tag: 'group' }
  | { readonly tag: 'type_cast'; readonly fromType: ExprType; readonly toType: ExprType }
  | { readonly tag: 'format_string'; readonly format: string }
  | { readonly tag: 'null_coalesce'; readonly type: ExprType }
  | { readonly tag: 'string_method'; readonly method: StringMethod }
  | { readonly tag: 'array_index'; readonly elementType: ExprType }
  | { readonly tag: 'array_method'; readonly method: ArrayMethod; readonly elementType: ExprType };

export interface IROpExpression {
  readonly kind: 'expr:op';
  readonly op: ExprOpDescriptor;
  readonly children: readonly IRExpression[];
}

// ── Union type ───────────────────────────────────────────────────────────────

export type IRExpression =
  | IRLiteralExpression
  | IRSignalReadExpression
  | IRMemoReadExpression
  | IRSlotExpression
  | IRThemeReadExpression
  | IREntityPropExpression
  | IRGlobalReadExpression
  | IRComponentReadExpression
  | IRLocalVarExpression
  | IRTriggerVarExpression
  | IRClosureReadExpression
  | IRMuxExpression
  | IRTableLookupExpression
  | IRFunctionExpression
  | IROpExpression;
