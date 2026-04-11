---
description: "Use when working on the compiler pipeline, AST transforms, action tree compiler, reactive transformer, script transformer, bundling, or library compilation. Covers packages/cli/src/compiler/."
applyTo: "packages/cli/src/compiler/**"
---
# Compiler Pipeline

## Phases

1. **Phase 0 — Type-Check** — `ts.Program` performs full type-checking. Errors fail the build.
2. **Phase 0.5 — Lint** — ESLint with custom rules from `packages/eslint/`.
3. **Phase 1 — AST Transform** — Two TypeScript AST transformers:
   - **Reactive Transformer** — Finds JSX attributes and `useMemo()` calls referencing
     reactive values (HA entity signals, theme variables). Extracts each into an
     `ExprNode`, infers `ExprType`, identifies dependencies, and replaces the code
     with `__espcompose.compiled({ type, deps, expr })`.
   - **Script Transformer** — Finds async arrow functions on trigger props (`onPress`,
     `on_state`, etc.) and `useScript()` bodies. Compiles function bodies into action
     tree IR. Injects compiled metadata via `Object.assign`.
   Transformed files write to `.espcompose-build/`. With `--debug`, output is human-readable.
4. **Phase 2 — Bundle** — esbuild bundles to CJS (`@espcompose/core` kept external).
   Validates `LIBRARY_FORMAT_VERSION` of imported libraries (see `format-version.ts`).
5. **Phase 3 — Execute & Render** — `require()` the bundle in Node. SDK's `render()`
   walks JSX recursively → **Semantic IR** (target-agnostic typed tree).
6. **Phase 4 — Target Emit** — Delegates to `ComposeTarget.emit()`.

## Action Tree Compiler

Compiles `useScript()` bodies and trigger handler arrow functions into ESPHome
action sequences at the AST level. These functions are **never executed** at runtime.

Supported action primitives (imported from `@espcompose/core`):
- `await delay(ms)` → `delay: <ms>ms`
- `logger.log(message, level?)` → `logger.log:`
- `await waitUntil(() => condition)` → `wait_until:`
- Ref actions: `lightRef.toggle()` → `light.toggle: { id: <token> }` (schema-driven)
- HA entity actions: `entity.toggle()` → `homeassistant.action:`
- Script calls: `await myScript()` → `script.execute` + `script.wait`
- `if`/`else` → `if:` with lambda condition
- `while` → `while:` with lambda condition
- `for` (counted) → `repeat:` with count
- `theme.select()` → internal lambda (reactive theme switching)

Trigger props (`onPress`, `onRelease`, etc.) accept `TriggerHandler<T>`.

## Library Compilation

`espcompose build --library` pre-compiles component libraries:
1. AST transform (same reactive + script transforms)
2. esbuild bundles to ESM
3. TypeScript emits `.d.ts` declarations
4. `__espcompose_format__` version marker injected

Consumer builds validate `LIBRARY_FORMAT_VERSION` matches. Mismatches produce clear errors.
