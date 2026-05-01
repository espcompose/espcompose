---
description: "Use when working on Semantic IR types, ExprNode expression IR, ExprType, action IR kinds, reactive nodes, or IR value types. Covers the IR type system in packages/core/src/ir/."
applyTo: "packages/core/src/ir/**"
---
# Semantic IR & Expression IR

## INVARIANT: No C++ in core

`packages/core/src/**` (excluding `generated/`) MUST NOT contain:
- The substring `cpp` in field names, type names, or variable names.
- The substrings `std::`, `int{8,16,32,64}_t`, `uint{8,16,32,64}_t`, `const char*`.
- Any function that produces or consumes C++ type strings.
- Any literal C++ member-access expressions (e.g. `.current_values.get_brightness()`).

All target lowering (C++ type strings, member-access paths, setter casts) lives
in target packages such as `@espcompose/esphome-target`. Surface any case where
core needs C++ knowledge as a blocker — do not silently work around it.

Verify with:
```
grep -rE "cpp[A-Z]|std::|int[0-9]+_t|uint[0-9]+_t|const char\*" packages/core/src/
```
Hits in `generated/` are tolerated; hits anywhere else are violations.

## `IRType` — canonical type carrier

Whenever an IR construct carries type information about an item it represents,
it MUST use the `IRType` shape (`packages/core/src/ir/types.ts`):

```ts
export type IRScalarType   = 'int' | 'float' | 'bool' | 'string';
export type IRScalarFormat = 'id_ref' | 'entity'; // extensible

export interface IRType {
  readonly type: IRScalarType;     // base scalar — always present
  readonly format?: IRScalarFormat; // semantic qualifier (e.g. id reference)
  readonly isArray?: boolean;       // collection flag
}
```

- The field carrying an `IRType` value is named **`irType`** on its
  parent (e.g. `IRScriptParam.irType`, `ClosureField.irType`,
  `GlobalDefinition.irType`, `TriggerVariable.irType`,
  `EntityDomainDescriptor.irType`).
- `format` replaces the old `ClosureField.kind` flag: `'scalar'` → `format`
  undefined; `'id_ref'` → `format: 'id_ref'`; `'entity'` → `format: 'entity'`.
- Targets translate `IRType` to backend types via their own helper
  (e.g. `irTypeToCpp` in `@espcompose/esphome-target/src/lowering/value-type-cpp.ts`).
- Entity property access uses a semantic `propertyKey: string`
  (e.g. `'state'`, `'brightness'`, `'position'`); the target resolves the
  backend access path (e.g. `resolveEntityPropertyCppPath`).

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
