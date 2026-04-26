// ────────────────────────────────────────────────────────────────────────────
// ExpressionIR — Typed expression AST for the ESPCompose compiler.
//
// Target-agnostic: no C++, no JS strings. Each backend (esphome-target)
// lowers IRExprNode trees to its own target code.
// ────────────────────────────────────────────────────────────────────────────

// ── Value types ──────────────────────────────────────────────────────────────

export type ExprType =
  | 'int'
  | 'float'
  | 'string'
  | 'bool'
  | 'color'
  | 'font_ptr'
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

export interface IRExprLiteral {
  readonly kind: 'literal';
  readonly value: string | number | boolean;
  readonly type: ExprType;
}

export interface IRExprSignalRead {
  readonly kind: 'signal_read';
  /** Index into the SemanticIR reactiveNodes/signal list. */
  readonly signalIndex: number;
}

export interface IRExprMemoRead {
  readonly kind: 'memo_read';
  readonly memoId: string;
}

export interface IRExprSlot {
  readonly kind: 'slot';
  readonly slotIndex: number;
}

export interface IRExprThemeRead {
  readonly kind: 'theme_read';
  /** Human-readable scope name (e.g. 'espcompose:ui'). */
  readonly scope: string;
  /** 8-char hex hash of the scope — C++ identifier fragment. */
  readonly scopeId: string;
  readonly path: string;
  readonly type: ExprType;
}

export interface IRExprEntityProp {
  readonly kind: 'entity_prop';
  readonly entityId: string;
  readonly property: string;
  readonly type: ExprType;
}

/** Read a reactive global variable's BoundSignal. */
export interface IRExprGlobalRead {
  readonly kind: 'global_read';
  readonly globalId: string;
  readonly type: ExprType;
}

export interface IRExprComponentRead {
  readonly kind: 'component_read';
  readonly componentId: string;
  readonly sensorIndex: number;
}

/** Read a trigger variable by name (used in action/script conditions) */
export interface IRExprTriggerVar {
  readonly kind: 'trigger_var';
  readonly name: string;
}

/**
 * Multiplexed expression — selects one of N case expressions by an index.
 *
 * Used by usePopup() for shared popup widget subtrees: the `index` is read
 * from a mux signal (`Signal<int32_t>`), and each case expression yields the
 * value for one popup instance. Backends lower this to a switch / IIFE.
 *
 * The mux memo's *expression* contains direct reads of per-case sources, but
 * the mux memo's *reactive dependencies* are intentionally limited to the
 * mux + dirty signals (selective notification) — entity-source reads inside
 * the cases are imperative, not subscribed.
 */
export interface IRExprMux {
  readonly kind: 'mux';
  readonly index: IRExprNode;
  readonly cases: IRExprNode[];
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
export interface IRExprTableLookup {
  readonly kind: 'table_lookup';
  readonly index: IRExprNode;
  readonly table: string;
  readonly elementType: ExprType;
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

export interface IRExprOp {
  readonly kind: 'op';
  readonly op: ExprOpDescriptor;
  readonly children: readonly IRExprNode[];
}

// ── Union type ───────────────────────────────────────────────────────────────

export type IRExprNode =
  | IRExprLiteral
  | IRExprSignalRead
  | IRExprMemoRead
  | IRExprSlot
  | IRExprThemeRead
  | IRExprEntityProp
  | IRExprGlobalRead
  | IRExprComponentRead
  | IRExprTriggerVar
  | IRExprMux
  | IRExprTableLookup
  | IRExprOp;
