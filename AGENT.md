This is **espcompose** — a TypeScript/TSX compiler that transforms React-style
component code into ESPHome YAML firmware configuration (+ C++ headers).

Compilation is build-time only: TSX → Semantic IR → target output. There is
no JavaScript runtime on the device. The compiled YAML becomes firmware via the
normal ESPHome toolchain.

The target ESPHome version is defined in the root `package.json` under
`esphome.version`.

## Monorepo Structure

pnpm workspace monorepo (Node.js ≥22) managed by Turborepo:

| Package | Purpose |
|---------|---------|
| `packages/core` | SDK — JSX runtime, hooks, action primitives, Semantic IR types, `ComposeTarget` interface, theme system, generated component types, intent system |
| `packages/cli` | CLI binary & compiler pipeline — type-check, lint, AST transforms, bundle, render, target dispatch |
| `packages/esphome-codegen` | Schema-driven code generation from ESPHome JSON schemas → TypeScript types |
| `packages/esphome-target` | ESPHome backend — YAML generation, C++ reactive runtime headers, ExprNode → C++ lowering, asset pipeline |
| `packages/eslint` | ESLint plugin — JSX intent validation, trigger body validation |
| `packages/ui` | Design system — reusable LVGL components, reactive theme system, pre-built themes |
| `tests/e2e` | End-to-end snapshot tests — projects built by the full pipeline, YAML snapshot-tested |
| `metadata/` | Generated metadata files (entity domains, triggers) consumed by codegen |

## Build, Test & Codegen

```bash
pnpm install                              # Install all dependencies
pnpm build                                # Build all packages (Turborepo)
pnpm test                                 # Run all tests (vitest, per-package)
pnpm --filter @espcompose/core codegen    # Regenerate types from ESPHome schemas
pnpm --filter espcompose-e2e test         # Run E2E snapshot tests
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `espcompose init <name>` | Create a new project (device or library with `--library`) |
| `espcompose transpile [dir]` | TSX → ESPHome YAML (fast, no ESPHome dependency) |
| `espcompose config [dir] [-- args]` | Transpile + validate via `esphome config` |
| `espcompose build [dir] [-- args]` | Transpile + compile firmware via `esphome compile` |
| `espcompose build --library [dir]` | Build a component library (ESM + `.d.ts`) |
| `espcompose run [dir] [-- args]` | Transpile + compile + upload via `esphome run` (`--host` for local SDL2 preview) |
| `espcompose logs [dir] [-- args]` | Transpile + open serial monitor |

Output is written to `<projectDir>/.espcompose/esphome.yaml`. Commands
except `transpile` require `esphome` on PATH. Extra flags
after `--` are forwarded to ESPHome.

## Compiler Pipeline (Summary)

1. **Type-Check** — Full TypeScript type-checking; errors fail the build
2. **Lint** — ESLint with custom ESPCompose rules
3. **AST Transform** — Reactive transformer (extracts `ExprNode` IR) + Script transformer (compiles action trees)
4. **Bundle** — esbuild to CJS; validates library format versions
5. **Execute & Render** — Runs the bundle in Node; produces Semantic IR
6. **Target Emit** — Delegates to a `ComposeTarget` implementation

`compileToIR()` is a programmatic entry point that runs phases 1–5 and
returns the `SemanticIR` directly.

## Key Constraints

- **Never edit generated files** — `packages/core/src/generated/` is produced
  by `pnpm codegen` via `packages/esphome-codegen/`. To change output, modify
  the codegen scripts (`lvgl-codegen.ts`, `type-mapper.ts`, `overrides.ts`,
  `action-codegen.ts`) and regenerate.
- Compiler output must be valid ESPHome YAML that passes ESPHome's schema validation.
- Generated IDs must never collide.
- Structural errors (wrong nesting) should be TypeScript or ESLint errors, not
  runtime compiler errors.
- SDK has zero runtime dependencies — YAML serialization is esphome-target's
  concern. The SDK uses marker classes (`LambdaMarker`, `SecretMarker`,
  `QuotedMarker`) instead of `yaml.Scalar`.

## Core Conventions

- **JSX props use camelCase** — automatically converted to snake_case for YAML
  (e.g. `friendlyName` → `friendly_name`).
- **`useRef<T>()`** creates typed, auto-generated ESPHome IDs (`r_<random>`).
  All ESPHome IDs share a single flat namespace.
- **`secret(key)`** emits `!secret` YAML references and collects values into
  `secrets.yaml`.
- **`x:custom`** prop spreads arbitrary key-value pairs into YAML for
  components not fully covered by generated types. `createElement()` is the
  fully untyped escape hatch.
- **Function components** work like React — TypeScript functions returning JSX.
  Fragments (`<>...</>`) are supported.
- **Intent system** enforces correct element nesting via ESLint (e.g. widgets
  must be inside `<page>` inside `<lvgl>`). See `packages/core/src/intent-registry.ts`.
- **Trigger props** (`onPress`, `onRelease`, etc.) accept async arrow functions
  compiled to ESPHome action sequences at the AST level — they are never executed.
- **`useScript()`** declares named scripts compiled the same way; returns a
  `ScriptHandle` for calling from trigger handlers.

## Job Completion Checklist

**Before indicating a job is complete:**
- ✅ Always run `pnpm build:full` from the workspace root and verify it exits with code 0
- ✅ Confirm all test suites pass (core tests, E2E tests, per-package tests)
- ✅ Do NOT declare work done until the full build succeeds end-to-end

## Completion Gate (Enforced)

These are hard rules, not guidance.

1. Completion claim gate
- The agent must not claim completion unless a successful `pnpm build:full` run happened after the final code edit in the current turn. Be patient. The full buid takes a couple minutes.

2. Required proof in final response
- Include: command run, workspace root path, and explicit success signal (exit code 0 or equivalent terminal completion evidence).
- If output is truncated, the agent must continue fetching terminal output until completion status is known.

3. If full build has not been run or did not pass
- The agent must explicitly state: work is not complete; full-build validation is pending or failed.
- The agent must not use completion language such as "done", "fixed", or "resolved".

4. Validation order
- Make edits.
- Run targeted checks as needed.
- Run full build gate last (`pnpm build:full`).
- Only then provide completion status.

5. User-requested strictness
- If the user asks for stricter completion criteria, those criteria become mandatory for the remainder of the conversation.

6. Cross-target parity for bug fixes
- If a bug is fixed in the target backend (`packages/esphome-target`), the agent must verify the fix does not break other functionality.
- Before claiming completion, run validation (targeted tests plus full build gate).

This ensures code changes don't introduce TypeScript errors, linting violations, or test failures that would block downstream work. A successful `pnpm build:full` run is the gate for job completion.