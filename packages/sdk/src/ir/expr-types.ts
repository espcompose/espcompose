// ────────────────────────────────────────────────────────────────────────────
// ExpressionIR — Typed expression AST for the ESPCompose compiler.
//
// Target-agnostic: no C++, no JS strings. Each backend (target-esphome,
// target-simulator) lowers ExprNode trees to its own target code.
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
  | 'math_round' | 'math_floor' | 'math_ceil'
  | 'math_sqrt' | 'math_pow'
  | 'math_log' | 'math_log2' | 'math_log10'
  | 'math_sin' | 'math_cos' | 'math_tan'
  | 'is_nan';

// ── Expression node types ────────────────────────────────────────────────────

export interface ExprLiteral {
  readonly kind: 'literal';
  readonly value: string | number | boolean;
  readonly type: ExprType;
}

export interface ExprSignalRead {
  readonly kind: 'signal_read';
  /** Index into the SemanticIR reactiveNodes/signal list. */
  readonly signalIndex: number;
}

export interface ExprMemoRead {
  readonly kind: 'memo_read';
  readonly memoIndex: number;
}

export interface ExprBinary {
  readonly kind: 'binary';
  readonly op: BinaryOp;
  readonly left: ExprNode;
  readonly right: ExprNode;
}

export interface ExprUnary {
  readonly kind: 'unary';
  readonly op: UnaryOp;
  readonly operand: ExprNode;
}

export interface ExprPostfix {
  readonly kind: 'postfix';
  readonly op: PostfixOp;
  readonly operand: ExprNode;
}

export interface ExprTernary {
  readonly kind: 'ternary';
  readonly test: ExprNode;
  readonly consequent: ExprNode;
  readonly alternate: ExprNode;
}

export interface ExprCall {
  readonly kind: 'call';
  readonly fn: BuiltinFn;
  readonly args: ExprNode[];
}

export interface ExprConcat {
  readonly kind: 'concat';
  readonly parts: ExprNode[];
}

export interface ExprToString {
  readonly kind: 'to_string';
  readonly expr: ExprNode;
  readonly format?: string;
}

export interface ExprGroup {
  readonly kind: 'group';
  readonly expr: ExprNode;
}

export interface ExprSlot {
  readonly kind: 'slot';
  readonly slotIndex: number;
}

export interface ExprResolveFont {
  readonly kind: 'resolve_font';
  readonly family: ExprNode;
  readonly size: ExprNode;
}

export interface ExprThemeRead {
  readonly kind: 'theme_read';
  readonly path: string;
  readonly type: ExprType;
}

export interface ExprEntityProp {
  readonly kind: 'entity_prop';
  readonly entityId: string;
  readonly property: string;
  readonly type: ExprType;
}

export interface ExprComponentRead {
  readonly kind: 'component_read';
  readonly componentId: string;
  readonly sensorIndex: number;
}

/** Read a trigger variable by name (used in action/script conditions) */
export interface ExprTriggerVar {
  readonly kind: 'trigger_var';
  readonly name: string;
}

// ── Union type ───────────────────────────────────────────────────────────────

export type ExprNode =
  | ExprLiteral
  | ExprSignalRead
  | ExprMemoRead
  | ExprBinary
  | ExprUnary
  | ExprPostfix
  | ExprTernary
  | ExprCall
  | ExprConcat
  | ExprToString
  | ExprGroup
  | ExprSlot
  | ExprResolveFont
  | ExprThemeRead
  | ExprEntityProp
  | ExprComponentRead
  | ExprTriggerVar;
