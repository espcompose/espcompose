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

### Generic Action Param Rules

- Avoid property-name-specific logic when compiling action object params.
- Prefer symbol/type-based handling:
   - literals remain literals
   - trigger variables remain `args.x` trigger vars
   - component ref identifiers should be preserved as ref variable names so
      `IRAction.refBindings` can resolve them later
- Keep target-specific assumptions out of compiler transforms whenever possible;
   lowerers should resolve generic IR semantics.

## Library Resolution (source-mode)

ESPCompose-native libraries are consumed as TypeScript/TSX source via the
`espcompose` package.json export condition. The CLI:
1. Discovers libraries by walking `node_modules` for packages with an
   `exports["."]["espcompose"]` entry pointing at TS/TSX sources.
2. Type-checks app + library sources together with `customConditions:
   ['espcompose']`.
3. Runs the same AST transforms (reactive + script) over library sources as
   over app sources, writing them under `<buildDir>/node_modules/<pkg>/`.
4. Bundles via esbuild with `conditions: ['espcompose']`.

There is no separate library build step — libraries ship sources only.
