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
| `IRThemeScopeData` | Per-scope theme names, default index, scope/scopeId, leaf data (values + C++ types) |

## Action Kinds (IRAction)

Defined in `action-types.ts`. The action kind union includes: `native`,
`ha_service`, `logger`, `delay`, `wait_until`, `if`, `while`, `repeat`,
`script_execute`, `script_wait`, `script_stop`, `theme_select`.

## Expression IR (ExprNode)

Target-agnostic AST for reactive expressions. Defined in `expr-types.ts`.
Each backend lowers `ExprNode` independently:
- ESPHome: `exprToCpp(node, ctx)` → C++ lambda bodies
- Simulator: `exprToJs(node)` → JavaScript closures

The `ExprNode` union covers all node kinds — see `expr-types.ts` for the
current list. Backends must handle every kind.

## ExprType

Domain-level types (not C++ types): `'int'` | `'float'` | `'string'` | `'bool'` | `'color'` | `'font_ptr'`

## ReactiveNode

Each reactive hook creates a `ReactiveNode<T>` with kind `'expression'`,
`'memo'`, or `'effect'`. The phantom branded type `Signal<T>` enables the
compiler's auto-transform detection in the AST phase.
