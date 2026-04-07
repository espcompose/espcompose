You are helping build a TypeScript/TSX compiler that transforms React-style
component code into ESPHome YAML firmware configuration. This project is called
"espcompose".

## What This Project Is

ESPHome is a framework for building custom firmware for ESP32/ESP8266 devices
that integrate with Home Assistant. Configuration is written in YAML. The goal
of this project is to provide a TypeScript/TSX authoring layer that compiles
down to valid ESPHome YAML plus C++ header files.

The compilation happens at build time only — the TSX component tree is evaluated,
a target-agnostic Semantic IR is produced, and a backend target emits the final
output (ESPHome YAML + C++ headers, or a browser-based LVGL simulator). The
compiled YAML then becomes firmware via the normal ESPHome toolchain. There is
no JavaScript runtime on the device.

The current target ESPHome version is **2026.3.0** (defined in the root
`package.json` under `esphome.version`).

## Compiler Pipeline

The compiler runs six phases to turn a `.tsx` source file into target output:

1. **Phase 0 — Type-Check** — The TypeScript compiler creates a `ts.Program`
   and performs full type-checking. Type errors fail the build immediately.
2. **Phase 0.5 — Lint** — ESLint validation runs on the original source files
   using the project's custom ESPCompose rules (from `packages/eslint/`).
3. **Phase 1 — AST Transform** — Two transformers visit the TypeScript AST:
   - **Reactive Transformer** — Finds JSX attributes and `useMemo()` calls that
     reference reactive values (signals from Home Assistant entities or theme
     variables). Extracts each into an `ExprNode` (a target-agnostic expression
     IR), infers return type as an `ExprType`, identifies upstream dependencies,
     and replaces the code with `__espcompose.compiled({ type, deps, expr })`.
   - **Script Transformer** — Finds arrow functions on trigger props (e.g.
     `onPress`, `on_state`) and `useScript()` bodies, and compiles them into
     action tree IR — a structured representation of ESPHome actions (12 action
     kinds). Injects compiled metadata via `Object.assign`.
   Transformed files are written to `.espcompose-build/`, preserving directory
   structure. With `--debug`, these files are human-readable.
4. **Phase 2 — Bundle** — esbuild bundles the transformed TypeScript into a
   single CJS module (with `@espcompose/core` kept external). Library format
   versions are validated here: if a dependency was compiled with an
   incompatible `LIBRARY_FORMAT_VERSION` (currently **2**), the build fails.
5. **Phase 3 — Execute & Render** — The bundle is `require()`'d in Node.js.
   Reactive and script scoping contexts wrap execution. The SDK's `render()`
   function walks the JSX tree recursively, calling function components and
   converting intrinsic elements to config sections. The output is a
   **Semantic IR** — a target-agnostic typed IR tree preserving all metadata
   (reactive bindings, refs, actions, secrets, theme data).
6. **Phase 4 — Target Emit** — The compiler delegates to a `ComposeTarget`
   implementation via `target.emit({ ir, projectDir, outDir, sourceDir })`.
   The compiler has no knowledge of what the target does.

A secondary entry point, `compileToIR()`, runs Phases 0–3 and returns the
`SemanticIR` directly — useful as a programmatic API for tools.

## Monorepo Structure

The project is a pnpm workspace monorepo (Node.js ≥22) managed by Turborepo:

| Package | npm name | Purpose |
|---------|----------|---------|
| `packages/core` | `@espcompose/core` | Core SDK — JSX runtime, hooks (`useRef`, `useScript`, `useMemo`, `useEffect`, `useHAEntity`, `useImage`, `useFont`), `secret()` helper, `ReactiveNode<T>`, action primitives (`delay`, `logger`), Semantic IR types, `ComposeTarget` interface, theme infrastructure (`registerTheme`, `useTheme`, `theme.select`), generated component types (316 components), intent system |
| `packages/cli` | `@espcompose/cli` / `espcompose` | CLI binary & compiler pipeline — type-check, lint, AST transforms (reactive + script), esbuild bundle, execute & render, target dispatch, ESPHome CLI wrappers, library pre-compilation |
| `packages/target-esphome` | `@espcompose/target-esphome` | ESPHome backend — YAML config generation, C++ reactive runtime headers (`espcompose_bindings.h`, `espcompose_reactive.h`), `ExprNode` → C++ lowering, HA sensor injection, asset pipeline |
| `packages/target-simulator` | `@espcompose/target-simulator` | Browser preview backend — walks Semantic IR to produce an interactive HTML page with canvas-rendered LVGL widgets, JS reactive runtime (Signal/Memo/Scheduler), mock HA entity provider |
| `packages/eslint` | `@espcompose/eslint` | ESLint plugin with custom rules (JSX children intent validation, trigger body validation) |
| `packages/ui` | `@espcompose/ui` | Design system — reusable LVGL components (Screen, Button, Card, Text, etc.), reactive theme system, token resolvers, pre-built dark/light themes |
| `tests/e2e` | `espcompose-e2e` (private) | End-to-end snapshot tests — 20 test projects built by the full pipeline, YAML snapshot-tested |

## Targets (ComposeTarget Interface)

The compiler communicates with backends through the `ComposeTarget` interface
defined in `packages/core/src/target.ts`:

```typescript
interface ComposeTarget {
  name: string;
  emit(request: EmitRequest): Promise<EmitResult>;
}
```

Both targets share Phases 0–3 via a shared `runPipeline()` helper. They diverge
at Phase 4:

**ESPHome target** (`createEsphomeTarget()`):
- Generates `espcompose_bindings.h` (Signal/Memo/Effect/widget binding declarations)
- Generates `espcompose_reactive.h` (C++ reactive runtime)
- Lowers Semantic IR to YAML config via `lowerToYamlConfig()`
- Resolves assets (images, fonts) with content-hash naming
- Writes `esphome.yaml` via `yaml.stringify()`

**Simulator target** (`createSimulatorTarget(options?)`):
- Walks IR to build a `RuntimeNode` tree of LVGL widgets
- Lowers `ExprNode` trees to JavaScript via `exprToJs()`
- Writes an HTML page with canvas rendering and mock HA entity state
- Opens the HTML in the default browser for one-shot preview

## Core Design Decisions

### JSX Intrinsic Elements
ESPHome platforms and components map to JSX intrinsic elements via TypeScript's
`JSX.IntrinsicElements` interface. Type generation from ESPHome schemas produces
316 component type definitions. The intent system enforces correct nesting via
ESLint — for example a widget cannot be placed directly under `<esphome>`, it
must be nested under a `<page>` which is nested under `<lvgl>`.

Intent categories:
- `esphome:root` — `<esphome>`
- `esphome:infrastructure` — `<wifi>`, `<api>`, `<logger>`, `<ota>`, `<i2c>`, etc.
- `esphome:platform` — `<sensor>`, `<binary_sensor>`, `<switch>`, `<light>`, `<script>`, etc.
- `esphome:display` — `<display>`, `<touchscreen>`, `<image>`, `<font>`, etc.
- `lvgl:root` / `lvgl:page` / `lvgl:widget` / `lvgl:container` — LVGL elements
- `ds:screen` / `ds:layout` / `ds:component` / `ds:field` — design system components

### Function Components
Standard TypeScript functions returning JSX elements serve as reusable
components, just like in React. Props are passed as a typed object parameter.
Fragments (`<>...</>`) are supported for returning multiple sibling elements.

```tsx
interface WifiConfigProps { ssid: string; password: string; }

function WifiConfig({ ssid, password }: WifiConfigProps) {
  return <wifi ssid={ssid} password={password} />;
}

function CoreInfrastructure() {
  return (
    <>
      <api />
      <ota platform="esphome" />
      <logger level="INFO" />
    </>
  );
}

export default (
  <esphome name="my-device">
    <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
    <WifiConfig ssid="HomeWifi" password="s3cr3t!!" />
    <CoreInfrastructure />
  </esphome>
);
```

### secret() — Secret Management
The `secret()` function creates a `!secret` reference for sensitive values.
At compile time the secret key-value pair is collected and emitted into
`secrets.yaml`, while the config YAML receives a `!secret <key>` reference.

```tsx
import { secret } from '@espcompose/core';

export default (
  <esphome name="my-device">
    <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
    <wifi ssid={secret('wifi_ssid')} password={secret('wifi_password')} />
    <api encryption={{ key: secret('api_key') }} />
  </esphome>
);
```

### useScript() — Named Scripts
`useScript()` declares named ESPHome scripts from async arrow function
bodies. The AST-based action tree compiler compiles the function body at
build time — it is never executed at runtime. Returns a `ScriptHandle`
for calling the script from trigger handlers. Must be called inside a
component function body.

```tsx
import { delay, logger, useRef, useScript } from '@espcompose/core';
import type { SwitchRef } from '@espcompose/core';

function App() {
  const switchRef = useRef<SwitchRef>();

  const blink = useScript(async () => {
    switchRef.toggle();
    await delay(500);
    switchRef.toggle();
  });

  return (
    <esphome name="script-demo">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid="HomeWifi" password="s3cr3t!!" />
      <api />
      <switch platform="gpio" ref={switchRef} pin={2} name="LED" />
      <binary_sensor platform="gpio" pin={4} name="Button"
        onPress={async () => { await blink(); }}
      />
    </esphome>
  );
}

export default <App />;
```

### Scripts and Trigger Handlers (Action Tree Compiler)
`useScript()` creates named ESPHome `script:` components. Trigger handler
arrow functions on props like `onPress`, `onRelease`, etc. define inline
action sequences. Both are compiled at the AST level by the action tree
compiler — function bodies are analyzed statically and emitted as ESPHome
YAML action sequences. They are never executed at runtime.

Trigger props (props starting with `on`) accept `TriggerHandler<T>` — an
async arrow function whose body is compiled to ESPHome actions.

Supported action primitives (imported from `@espcompose/core`):
- `await delay(ms)` → `delay: <ms>ms`
- `logger.log(message, level?)` → `logger.log: { message, level? }`
- `await waitUntil(() => condition)` → `wait_until: { condition: !lambda ... }`
- Ref actions: `lightRef.toggle()` → `light.toggle: { id: <token> }` (schema-driven, 140 action target classes)
- HA entity actions: `entity.toggle()` → `homeassistant.action: { action: light.toggle, data: { entity_id: ... } }`
- Script calls: `await myScript()` → `script.execute` + `script.wait`
- `if`/`else` → `if:` with lambda condition
- `while` → `while:` with lambda condition
- `for` (counted) → `repeat:` with count
- `theme.select()` → internal lambda (reactive theme switching)

### Reactive System
The reactive system tracks dependencies between Home Assistant entities,
theme variables, and UI properties, generating a C++ signal graph that
updates widgets automatically when source state changes.

**Hooks:**
- `useHAEntity(id)` — Binds to a Home Assistant entity; returns typed
  property signals (e.g. `light.isOn`, `sensor.value`)
- `useMemo(fn)` — Derives a value from one or more signals
- `useEffect(fn)` — Runs side effects when dependencies change

Each hook creates a `ReactiveNode<T>` with kind `'expression'`, `'memo'`,
or `'effect'`. The phantom branded type `Signal<T>` enables the compiler's
auto-transform detection.

**Expression IR (ExprNode)** — A target-agnostic AST for reactive
expressions with 17 node kinds (literal, signal_read, memo_read, binary,
unary, postfix, ternary, call, concat, to_string, group, slot,
resolve_font, theme_read, entity_prop, component_read, trigger_var).
Each backend lowers ExprNode independently:
- ESPHome: `exprToCpp(node, ctx)` → C++ lambda bodies
- Simulator: `exprToJs(node)` → JavaScript closures

**ExprType** (domain-level types, no C++): `'int'` | `'float'` | `'string'` | `'bool'` | `'color'` | `'font_ptr'`

### Semantic IR
After rendering, the config is built into a typed Semantic IR tree. Every
value is wrapped in a typed node:

| IR Node | Represents |
|---------|-----------|
| `IRScalar` | Plain string, number, or boolean |
| `IRObject` | Key-value map of IR values |
| `IRArray` | Ordered list of IR values |
| `IRNull` | Null value |
| `IRReactive` | Reactive binding — wraps a `ReactiveNode` with full metadata |
| `IRRef` | Cross-component reference (e.g. `useRef<LightRef>()`) |
| `IRAction` | Compiled action tree (12 action kinds) |
| `IRSecret` | Secret reference (`!secret` in YAML) |
| `IRTriggerVar` | Trigger variable for lambda injection |
| `IRThemeData` | Theme names, default index, leaf data (values + C++ types) |

### Theme System
Themes are plain TypeScript objects with nested color, spacing, typography,
radius, and size values. The reactive theme system works as follows:

1. `<ThemeProvider themes={{ dark: darkTheme, light: lightTheme }} default="dark">`
   registers themes during the render pass
2. `useTheme()` returns a deep Proxy where leaf access creates cached
   `ReactiveNode<T>` values (e.g. `theme.colors.primary.bg` → reactive signal)
3. The compiler generates C++ theme value arrays indexed by a `theme_index`
   signal. Each leaf becomes a `Memo<T>` reading from the array.
4. `theme.select('dark')` inside action handlers compiles to
   `theme_index.set(N); Scheduler::flush();` — runtime theme switching

### ID Namespacing via Refs
All ESPHome IDs are in a single global flat namespace. The `useRef()` hook
creates a typed, auto-generated ID token. Generated ref tokens follow the
pattern `r_<random>` and are collision-resistant within a single config.

```tsx
const i2cBus = useRef<I2CBusRef>();

return (
  <>
    <i2c ref={i2cBus} sda={21} scl={22} />
    <as5600 i2cId={i2cBus} />
  </>
);
```

### camelCase to snake_case Conversion
All JSX prop names use camelCase (TypeScript convention). The runtime
automatically converts them to snake_case for YAML output. For example,
`friendlyName` becomes `friendly_name`, `fastConnect` becomes `fast_connect`.

### The x:custom Escape Hatch
When the generated SDK types don't cover a component's full schema (e.g. newly
added ESPHome components), elements accept an `x:custom` prop that spreads
arbitrary key-value pairs directly into the component's YAML output:

```tsx
<display platform="mipi_dsi" ref={displayRef} x:custom={{
  model: 'WAVESHARE-P4-NANO-10.1',
  rotation: 270,
}} />
```

Alternatively, `createElement()` can be called directly with
untyped props for components that lack SDK type definitions entirely.

### Asset Pipeline
Images and fonts referenced in JSX are tracked during the render pass via
`ComponentRegistration` entries (created by `useImage()` and `useFont()`).
At emit time, source files are resolved relative to the project root and
copied to `.espcompose/assets/` with content-hash naming
(`<stem>-<hash8><ext>`) for deduplication.

### Library Compilation
Component libraries can be pre-compiled with `espcompose build --library` so consumers
don't need the TypeScript source:

1. AST transform runs on library sources (same reactive + script transforms)
2. esbuild bundles to ESM
3. TypeScript emits `.d.ts` declarations
4. A `__espcompose_format__` version marker is injected (currently version **2**)

At consumer build time, the compiler validates that imported libraries match
the current `LIBRARY_FORMAT_VERSION`. Mismatched versions produce a clear error.

### Type Generation from ESPHome Schemas
ESPHome publishes JSON schemas at schema.esphome.io. The project includes a
codegen script (`pnpm --filter @espcompose/core codegen`) that:
- Fetches the schema for the target ESPHome version
- Maps ESPHome validator types to TypeScript types
- Emits IntrinsicElements interfaces, prop types, and ref action types
- Snake_case property names are converted to camelCase
- Action types are generated from a schema-driven system (140 action target
  classes, resolved by C++ class hierarchy)

Generated types are committed and regenerated when ESPHome releases new versions.

## Planned / Not Yet Implemented

The following features are part of the design vision but have NOT been
implemented yet:

- **Theme cleanup** — Old theme bridge files (`bridge.ts`, `style-ids.ts`,
  `json.ts`) still exist alongside the new reactive theme system and should
  be deleted
- **reactive-theme-device / fancy-light-cascade-device** — E2E test projects
  for theme switching and reactive cascading (planned, not yet created)
- **State Machines** (`useStateMachine()`) — XState-inspired construct that
  compiles to globals + entry/exit scripts + event guards
- **`cpp\`\`` tagged template literal** — raw C++ escape hatch for any action
  or expression position
- **`fmt\`\`` tagged template literal** — string concatenation with
  `std::to_string` conversions

## Key Constraints

- **Never edit generated files directly** — Files under `packages/core/src/generated/`
  are auto-generated by `pnpm codegen` (via `scripts/codegen/`). To change
  generated output, modify the codegen scripts (e.g. `lvgl-codegen.ts`,
  `type-mapper.ts`, `overrides.ts`, `action-codegen.ts`) and regenerate.
- The compiler output must be valid ESPHome YAML that passes ESPHome's own
  schema validation
- Generated IDs must never collide
- Structural errors (wrong nesting) should be TypeScript compile errors or
  ESLint errors, not runtime compiler errors
- The project is structured so the schema codegen pipeline, compiler
  core, CLI, SDK, targets, and ESLint plugin are in separate packages
- SDK has zero runtime dependencies — YAML serialization is target-esphome's
  concern; SDK uses marker classes (`LambdaMarker`, `SecretMarker`,
  `QuotedMarker`) instead of `yaml.Scalar`

## CLI Commands

The `espcompose` CLI provides a unified workflow from TSX source to device:

| Command | Description |
|---------|-------------|
| `espcompose init <name>` | Create a new ESPHome Compose project (device or library with `--library`) |
| `espcompose transpile [dir]` | Transpile TSX → ESPHome YAML (fast, no ESPHome dependency) |
| `espcompose transpile --library [dir]` | Run AST transforms on a component library (no bundle/emit) |
| `espcompose config [dir] [-- args]` | Transpile + validate via `esphome config`, prints merged config |
| `espcompose build [dir] [-- args]` | Transpile + compile firmware via `esphome compile` |
| `espcompose build --library [dir]` | Build a component library for distribution (ESM + `.d.ts`) |
| `espcompose run [dir] [-- args]` | Transpile + compile + upload via `esphome run` (interactive) |
| `espcompose logs [dir] [-- args]` | Transpile + open serial monitor via `esphome logs` (interactive) |
| `espcompose simulate [dir]` | Transpile + open browser-based LVGL simulator (`-w`/`--width`, `--height`) |

All commands except `transpile` and `simulate` require `esphome` on PATH (library builds via `--library` also don't require ESPHome).
Extra flags after `--` are forwarded to the underlying ESPHome command.
Output is always written to `<projectDir>/.espcompose/esphome.yaml`.

## E2E Test Projects

The `tests/e2e/projects/` directory contains 20 sample projects that serve
as integration tests. Each is built by the full compiler pipeline and the
generated YAML is snapshot-tested.

| Project | What it tests |
|---------|---------------|
| `basic-device` | Minimal device with core infrastructure (esp32, wifi, api, ota, logger) |
| `sensor-device` | Multiple sensor and binary_sensor sections |
| `function-component-device` | Custom function components with props and fragments |
| `script-device` | Named scripts with `useScript()`, `delay()`, `logger.log()`, trigger props |
| `dashboard-device` | Complex real-world device: cross-component refs, nested hardware module, `x:custom`, `createElement()` |
| `lvgl-device` | LVGL widget compilation |
| `design-system-device` | Design system components with `ThemeProvider` and reactive theme tokens |
| `trigger-device` | Trigger/automation system |
| `ha-binding-device` | Home Assistant entity bindings (also has simulator output) |
| `ha-dynamic-device` | Dynamic Home Assistant entity integration |
| `reactive-device` | Core reactive binding system |
| `embed-device` | Embedded component resources |
| `device-script-device` | Legacy device script integration |
| `project-device` | Multi-project configuration |
| `multi-source-reactive-device` | C++ Signal/Memo/Effect multi-source reactive runtime |
| `auto-reactive-device` | Compiler auto-wrapping of `Signal<T>` expressions in JSX |
| `image-font-device` | `useImage()` + `useFont()` hook injection and asset deduplication |
| `uncompiled-lib-device` | Detects untransformed library (build should fail with clear error) |
| `library-contract-device` | Consumes compiled library with `__espcompose_format__` marker |
| `action-tree-device` | Action tree compiler: bare arrow functions → ESPHome action sequences |
