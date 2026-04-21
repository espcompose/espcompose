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
  | 'font_ptr';

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

export interface IRExprBinary {
  readonly kind: 'binary';
  readonly op: BinaryOp;
  readonly left: IRExprNode;
  readonly right: IRExprNode;
}

export interface IRExprUnary {
  readonly kind: 'unary';
  readonly op: UnaryOp;
  readonly operand: IRExprNode;
}

export interface IRExprPostfix {
  readonly kind: 'postfix';
  readonly op: PostfixOp;
  readonly operand: IRExprNode;
}

export interface IRExprTernary {
  readonly kind: 'ternary';
  readonly test: IRExprNode;
  readonly consequent: IRExprNode;
  readonly alternate: IRExprNode;
}

export interface IRExprCall {
  readonly kind: 'call';
  readonly fn: BuiltinFn;
  readonly args: IRExprNode[];
}

export interface IRExprConcat {
  readonly kind: 'concat';
  readonly parts: IRExprNode[];
}

export interface IRExprToString {
  readonly kind: 'to_string';
  readonly expr: IRExprNode;
  readonly format?: string;
}

export interface IRExprGroup {
  readonly kind: 'group';
  readonly expr: IRExprNode;
}

export interface IRExprSlot {
  readonly kind: 'slot';
  readonly slotIndex: number;
}

export interface IRExprResolveFont {
  readonly kind: 'resolve_font';
  readonly family: IRExprNode;
  readonly size: IRExprNode;
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

/** Explicit type conversion (Number(), String(), Boolean(), Math.trunc()) */
export interface IRExprTypeCast {
  readonly kind: 'type_cast';
  readonly expr: IRExprNode;
  readonly fromType: ExprType;
  readonly toType: ExprType;
}

/** Formatted number-to-string (e.g. .toFixed(2) → format "%.2f") */
export interface IRExprFormatString {
  readonly kind: 'format_string';
  readonly expr: IRExprNode;
  /** printf-style format specifier, e.g. "%.2f" */
  readonly format: string;
}

/** Null-coalescing operator (??) — type determines the null-check strategy */
export interface IRExprNullCoalesce {
  readonly kind: 'null_coalesce';
  readonly left: IRExprNode;
  readonly right: IRExprNode;
  /** Type of the left operand — backends use this to determine null semantics. */
  readonly type: ExprType;
}

/** String method call or property access (.length, .toUpperCase(), etc.) */
export interface IRExprStringMethod {
  readonly kind: 'string_method';
  readonly method: StringMethod;
  readonly object: IRExprNode;
  readonly args: IRExprNode[];
}

// ── Union type ───────────────────────────────────────────────────────────────

export type IRExprNode =
  | IRExprLiteral
  | IRExprSignalRead
  | IRExprMemoRead
  | IRExprBinary
  | IRExprUnary
  | IRExprPostfix
  | IRExprTernary
  | IRExprCall
  | IRExprConcat
  | IRExprToString
  | IRExprGroup
  | IRExprSlot
  | IRExprResolveFont
  | IRExprThemeRead
  | IRExprEntityProp
  | IRExprComponentRead
  | IRExprTriggerVar
  | IRExprTypeCast
  | IRExprFormatString
  | IRExprNullCoalesce
  | IRExprStringMethod;
