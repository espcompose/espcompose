---
description: "Use when working on Semantic IR types, ExprNode expression IR, ExprType, action IR kinds, reactive nodes, or IR value types. Covers the IR type system in packages/core/src/ir/."
applyTo: "packages/core/src/ir/**"
---
# Semantic IR & Expression IR

## Semantic IR Nodes

After rendering, the config is a typed Semantic IR tree. Every value is wrapped:

| IR Node | Represents |
|---------|-----------|
| `IRScalar` | Plain string, number, or boolean |
| `IRObject` | Key-value map of IR values |
| `IRArray` | Ordered list of IR values |
| `IRNull` | Null value |
| `IRReactive` | Reactive binding — wraps a `ReactiveNode` with full metadata |
| `IRRef` | Cross-component reference (e.g. `useRef<LightRef>()`) |
| `IRAction` | Compiled action tree (see action kinds below) |
| `IRSecret` | Secret reference (`!secret` in YAML) |
| `IRTriggerVar` | Trigger variable for lambda injection |
| `IRThemeData` | Per-scope theme names, default index, scope/scopeId, leaf data (values + C++ types) |

## Action Kinds (IRAction)

Defined in `action-types.ts`. The action kind union includes: `native`,
`ha_service`, `logger`, `delay`, `wait_until`, `if`, `while`, `repeat`,
`script_execute`, `script_wait`, `script_stop`, `theme_select`.

## Expression IR (ExprNode)

Target-agnostic AST for reactive expressions. Defined in `expr-types.ts`.
Lowered by the ESPHome backend via `exprToCpp(node, ctx)` → C++ lambda
bodies. There is no JS/simulator lowering path — host-mode preview compiles
through ESPHome's `host` platform, not a browser simulator.

### Node taxonomy

**Source / structural nodes** (nominally typed with their own `kind`):

| Kind | Purpose |
|------|---------|
| `literal` | Constant value (string, number, boolean) |
| `signal_read` | Read a reactive signal by index |
| `memo_read` | Read a memoized computation by id |
| `slot` | Placeholder for slot injection |
| `theme_read` | Read a themed token (scope + path) |
| `entity_prop` | Read a Home Assistant entity property |
| `global_read` | Read an ESPHome global variable |
| `component_read` | Read an ESPHome component state |
| `trigger_var` | Reference a trigger lambda variable |
| `mux` | Runtime multiplexer (switch on index, N cases) |
| `table_lookup` | Compile-time data table read |

**Operation nodes** — all use `kind: 'op'` with an `ExprOpDescriptor` discriminated on `tag`:

| Op tag | Children | Extra attrs |
|--------|----------|-------------|
| `binary` | `[left, right]` | `op: BinaryOp` |
| `unary` | `[operand]` | `op: UnaryOp` |
| `postfix` | `[operand]` | `op: PostfixOp` |
| `ternary` | `[test, consequent, alternate]` | — |
| `call` | `[...args]` | `fn: BuiltinFn` |
| `concat` | `[...parts]` | — |
| `to_string` | `[expr]` | `format?: string` |
| `group` | `[expr]` | — |
| `type_cast` | `[expr]` | `fromType, toType: ExprType` |
| `format_string` | `[expr]` | `format: string` |
| `null_coalesce` | `[left, right]` | `type: ExprType` |
| `string_method` | `[object, ...args]` | `method: StringMethod` |
| `array_index` | `[array, index]` | `elementType: ExprType` |
| `array_method` | `[object, ...args]` | `method: ArrayMethod`, `elementType: ExprType` |

### Constructing op nodes

Use typed builders from `expr-builders.ts` (re-exported via `@espcompose/core/internals`):
`irBinary`, `irUnary`, `irPostfix`, `irTernary`, `irCall`, `irConcat`,
`irToString`, `irGroup`, `irTypeCast`, `irFormatString`, `irNullCoalesce`,
`irStringMethod`, `irArrayIndex`, `irArrayMethod`.

### Accessing op children

Use typed accessors from `expr-accessors.ts` (re-exported via `@espcompose/core/internals`):
`leftOf`, `rightOf`, `operandOf`, `testOf`, `consequentOf`, `alternateOf`,
`argsOf`, `partsOf`, `exprOf`, `objectOf`, `methodArgsOf`, `arrayOf`, `indexOf`.

Accessors assert the expected `op.tag` and throw on misuse.

### Walking expressions

Generic walkers in `expr-walk.ts` (`getExprChildren`, `mapExprChildren`)
handle `'op'` nodes by returning/mapping `node.children` — no per-tag
dispatch needed. Only `mux` and `table_lookup` need special handling.

Backends must handle every kind. Exhaustiveness is enforced via
`const _: never = node` in switch defaults.

## ExprType

Domain-level types (not C++ types): `'int'` | `'float'` | `'string'` | `'bool'` | `'color'` | `'font_ptr'` | `'int_array'` | `'float_array'` | `'string_array'` | `'bool_array'`

## ReactiveNode

Each reactive hook creates a `ReactiveNode<T>` with kind `'expression'`,
`'memo'`, or `'effect'`. The phantom branded type `Signal<T>` enables the
compiler's auto-transform detection in the AST phase.
