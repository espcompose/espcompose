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
