You are helping build a TypeScript/TSX compiler that transforms React-style
component code into ESPHome YAML firmware configuration. This project is called
"espcompose".

## What This Project Is

ESPHome is a framework for building custom firmware for ESP32/ESP8266 devices
that integrate with Home Assistant. Configuration is written in YAML. The goal
of this project is to provide a TypeScript/TSX authoring layer that compiles
down to valid ESPHome YAML.

The compilation happens at build time only — the TSX component tree is evaluated
and ESPHome YAML is emitted. The compiled YAML then becomes firmware via the
normal ESPHome toolchain. There is no JavaScript runtime on the device.

The compiler pipeline has four phases:
1. **Type-check** — Run the TypeScript compiler to catch errors early
2. **Transform** — Rewrite top-level `function` declarations into `useScript()` hook
   calls and convert trigger props into ESPHome action arrays (TypeScript AST transform)
3. **Bundle** — esbuild bundles the transformed TSX into a single CJS module
   (with `@esphome/compose` kept external)
4. **Execute + Emit** — The bundle is `require()`'d in a script scope, the JSX
   tree is rendered to a plain object, and YAML is written to disk

## Monorepo Structure

The project is a pnpm workspace monorepo managed by Turborepo with the
following packages:

| Package | npm name | Purpose |
|---------|----------|---------|
| `packages/sdk` | `@esphome/compose` | Core SDK — JSX runtime, hooks (`useRef`, `useScript`, `useContext`), action primitives (`delay`, `logger`), generated component types |
| `packages/cli` | `@esphome/compose-cli` / `espcompose` | CLI binary & compiler pipeline — type-check, AST transform, esbuild bundle, execute & emit YAML, ESPHome CLI wrappers |
| `packages/eslint` | `@esphome/compose-eslint` | ESLint plugin with custom rules for ESPHome Compose projects |
| `packages/e2e` | `@esphome/compose-e2e` (private) | End-to-end snapshot tests — builds sample projects and verifies YAML output |

## Core Design Decisions

### JSX Intrinsic Elements
ESPHome platforms and components map to JSX intrinsic elements via TypeScript's
JSX.IntrinsicElements interface. The type hierarchy enforces correct nesting —
for example a widget cannot be placed directly under `<esphome>`, it must be
nested under a `<page>` which is nested under `<lvgl>`.

Elements are classified into structural categories:
- Root: `<esphome>`
- Top-level sections (esphome platforms and components): `<lvgl>`, `<sensor>`, `<binary_sensor>`, `<script>`, `<globals>`, `<wifi>`, `<api>`, `<ota>` etc.
- Platform-level elements (esphome platform-based components): `<mcp2515>`, `<aic3204>`, etc.

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

### Scripts (function-as-script pattern)
Top-level `function` declarations in the entry file are automatically
transformed by the compiler into ESPHome `script:` components via the
`useScript()` hook. Arrow function constants (`const fn = () => {}`) are NOT
treated as scripts — they remain compile-time helpers.

The compiler's AST transformer:
1. Converts the function body into an ESPHome action list
2. Rewrites the function to call `useScript()` with the action metadata
3. Rewrites trigger props (props starting with `on`) that reference function
   names from identifiers to call expressions (e.g. `onPress={greet}` →
   `onPress={greet()}`)
4. Converts inline arrow functions in trigger props to inline action lists

Supported action primitives (imported from `@esphome/compose`):
- `delay(ms)` → `delay: <ms>ms`
- `logger.log(message, level?)` → `logger.log: { message, level? }`
- Calling another script function → `script.execute: <id>`

Supported control flow in script bodies:
- `if/else` → `if:` action with `condition`, `then`, `else`
- `while` → `while:` action
- `for (let i=0; i<N; i++)` → `repeat:` action (literal count only)
- `const` variables → inlined into expressions (not emitted as actions)
- `return` statements → compile error (scripts are void procedures)
- `let`/`var` declarations → compile error (use `const`)

TypeScript expressions in conditions are converted to C++ via the
expression-to-cpp transformer, supporting binary operators, prefix unary,
identifiers, literals, and template literals.

Script parameters with TypeScript type annotations are mapped to C++ types:
- `number` → `int`
- `string` → `std::string`
- `boolean` → `bool`

Example:
```tsx
import { ESPCompose, delay, logger } from '@esphome/compose';

function greet(): void {
  logger.log('Hello from ESPCompose!');
  delay(500);
}

export default (
  <esphome name="script-device">
    <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
    <wifi ssid="HomeWifi" password="s3cr3t!!" />
    <api />
    <logger level="INFO" />
    <binary_sensor
      platform="gpio"
      pin={4}
      name="Button"
      onPress={greet}
      onRelease={() => { delay(100); }}
    />
  </esphome>
);
```

This compiles to YAML with a `script:` section for `greet` and
`on_press: [script.execute: greet]` on the binary_sensor, plus an inline
`on_release: [delay: 100ms]`.

### ID Namespacing via Refs
All ESPHome IDs are in a single global flat namespace. The `useRef()` hook
creates a typed, auto-generated ID token. Pass it to an element's `ref` prop
to assign an ID, and to other elements' use_id props to reference it. The
compiler serialises `Ref<T>` values as plain ID strings in the YAML output.

```tsx
const i2cBus = useRef<i2c_I2CBus>();

return (
  <>
    <i2c ref={i2cBus} sda={21} scl={22} />
    <as5600 i2cId={i2cBus} />
  </>
);
```

Generated ref tokens follow the pattern `r_<random>` and are
collision-resistant within a single device config.

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

Alternatively, `ESPCompose.createElement()` can be called directly with
untyped props for components that lack SDK type definitions entirely.

### Conditional Rendering
- Compile-time conditions (based on constants/flags) omit items from output

### Type Generation from ESPHome Schemas
ESPHome publishes JSON schemas at schema.esphome.io used by the VS Code
extension. The project includes a codegen script (`pnpm --filter @esphome/compose codegen`) that:
- Fetches the schema for a given ESPHome version
- Maps ESPHome validator types to TypeScript types
- Emits IntrinsicElements interfaces and prop type definitions
- Snake_case property names are converted to camelCase

The root esphome schema is located at: https://schema.esphome.io/dev/esphome.json
Other schemas can be discovered at https://schema.esphome.io/dev/{ITEM_NAME}.json, where
ITEM_NAME is either a platform or component name.

Generated types are committed and regenerated when ESPHome releases new
versions. The current target ESPHome version is defined in the root
package.json under `esphome.version`.

## Planned / Not Yet Implemented

The following features are part of the design vision but have NOT been
implemented yet. Do not assume these exist in the current codebase:

- **Reactive Expressions** (`Expression<T>`, `useEntityState()`,
  `useSensorValue()`, `useBinarySensor()`, `useGlobal()`) — typed AST nodes
  for runtime state with operations like `.eq()`, `.gt()`, `.ternary()` that
  compile to C++ lambda expressions
- **Reactive Dependency Tracking** — automatic emission of subscription blocks,
  `on_state:`/`on_value:` trigger handlers, and `lvgl.widget.update:` actions
- **useEffect()** — compile-time reactive automation hook (when dependencies
  change, run actions)
- **State Machines** (`useStateMachine()`) — XState-inspired construct that
  compiles to globals + entry/exit scripts + event guards
- **`cpp\`\`` tagged template literal** — raw C++ escape hatch for any action
  or expression position
- **`fmt\`\`` tagged template literal** — string concatenation with
  `std::to_string` conversions

## Key Constraints

- The compiler output must be valid ESPHome YAML that passes ESPHome's own
  schema validation
- Generated IDs must never collide
- Structural errors (wrong nesting) should be TypeScript compile errors, not
  runtime compiler errors
- async/await is banned — provide `delay()` and sequence primitives instead
- The project is structured so the schema codegen pipeline, compiler
  core, CLI, SDK, and ESLint plugin are in separate packages

## CLI Commands

The `espcompose` CLI provides a unified workflow from TSX source to device:

| Command | Description |
|---------|-------------|
| `espcompose transpile [dir]` | Transpile TSX → ESPHome YAML (fast, no ESPHome dependency) |
| `espcompose config [dir] [-- args]` | Transpile + validate via `esphome config`, prints merged config |
| `espcompose compile [dir] [-- args]` | Transpile + compile firmware via `esphome compile` |
| `espcompose run [dir] [-- args]` | Transpile + compile + upload via `esphome run` (interactive) |
| `espcompose logs [dir] [-- args]` | Transpile + open serial monitor via `esphome logs` (interactive) |

All commands except `transpile` require `esphome` to be installed and on PATH.
Extra flags after `--` are forwarded to the underlying ESPHome command
(e.g. `espcompose run -- --device /dev/ttyUSB0`).

Output is always written to `<projectDir>/.espcompose/esphome.yaml`.

## E2E Test Projects

The `packages/e2e/projects/` directory contains sample projects that serve as
integration tests. Each project is built by the full compiler pipeline and the
generated YAML is snapshot-tested and validated via `esphome config`.

| Project | What it tests |
|---------|---------------|
| `basic-device` | Minimal device with core infrastructure (esp32, wifi, api, ota, logger) |
| `sensor-device` | Multiple sensor and binary_sensor sections |
| `function-component-device` | Custom function components with props and fragments |
| `script-device` | Function-as-script pattern with `delay()`, `logger.log()`, trigger props (`onPress`, `onRelease`) |
| `dashboard-device` | Complex real-world device: cross-component refs, nested hardware module, `x:custom` escape hatch, `ESPCompose.createElement()` for untyped components |
