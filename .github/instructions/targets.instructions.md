---
description: "Use when working on ESPHome YAML generation, C++ reactive runtime, ComposeTarget interface, ExprNode lowering to C++, or asset pipeline."
applyTo:
  - "packages/esphome-target/**"
---
# Compile Targets

## ComposeTarget Interface

Defined in `packages/core/src/target.ts`. The target receives phases 0–3 output
via `runPipeline()` and handles phase 4 (emit).

```typescript
interface ComposeTarget {
  name: string;
  emit(request: EmitRequest): Promise<EmitResult>;
}
```

## Target owns all C++ knowledge

Core (`@espcompose/core`) is C++-free (see the invariant in
`ir-types.instructions.md`). The target owns every mapping from IR to C++:

- **`valueTypeToCpp(v: IRType): string`** — single source of truth for
  IR scalar → C++ type strings (lives in
  `packages/esphome-target/src/value-type-cpp.ts`). Handles `format`
  (`id_ref` / `entity` → `const char*`) and `isArray`
  (`std::vector<T>`).
- **`resolveEntityPropertyCppPath(propertyKey: string): string`** — maps
  semantic property keys (`'state'`, `'brightness'`, `'position'`) to the
  C++ member-access expression. Throws on unknown keys.
- **`LVGL_STYLE_PROP_TABLE`** — full ESPHome→LVGL setter table with
  `cppType`, `cast`, and `special` fields, lives in
  `packages/esphome-target/src/lvgl-style-prop-table.ts`. Core only exposes
  the *names* (`LVGL_REACTIVE_STYLE_PROPS`); the target asserts at module
  load that its table keys match the core set.

If the target hits a case where the C++ representation cannot be derived from
`IRType` + a semantic key, raise it as a blocker — never reintroduce a
C++ string into core.

## ESPHome Target (`createEsphomeTarget()`)

- Generates `espcompose_bindings.h` — Signal/Memo/Effect/widget binding declarations
- Generates `espcompose_reactive.h` — C++ reactive runtime
- Lowers Semantic IR to YAML config via `lowerToYamlConfig()`
- Lowers `ExprNode` → C++ via `exprToCpp(node, ctx)`
- Resolves assets (images, fonts) with content-hash naming (`<stem>-<hash8><ext>`)
- Writes `esphome.yaml` via `yaml.stringify()`

## Theme System

Themes are plain TypeScript objects (colors, spacing, typography, radius, sizes).

1. `<ThemeProvider>` registers themes during render
2. `useTheme()` returns a deep Proxy — leaf access creates `ReactiveNode<T>` signals
3. ESPHome target: C++ theme value arrays indexed by `theme_index` signal; each leaf → `Memo<T>`
4. `theme.select('dark')` in action handlers → `theme_index.set(N); Scheduler::flush();`

## Asset Pipeline

`useImage()` and `useFont()` create `ComponentRegistration` entries during render.
At emit, source files are resolved relative to project root and copied to
`.espcompose/assets/` with content-hash naming for deduplication.
