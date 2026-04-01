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

The compiler pipeline has five phases:
1. **Type-check** — Run the TypeScript compiler to catch errors early
2. **Transform** — Two-pass AST transformation: (a) the reactive transformer
   auto-wraps Signal<T> expressions in JSX attributes with `_reactive.compiled()`,
   and (b) the script transformer compiles `useScript()` / trigger handler
   arrow function bodies into action tree IR (ref actions, delays, logger calls,
   HA entity actions, etc.) and injects compiled metadata via `Object.assign`
3. **Bundle** — esbuild bundles the source into a single CJS module
   (with `@esphome/compose` kept external)
4. **Execute + Emit** — The bundle is `require()`'d, the JSX
   tree is rendered to a plain object, reactive bindings are injected,
   and YAML is written to disk
5. **IR Round-trip** — After rendering, the config object is lifted into a typed
   IR tree (`buildIR`), then lowered back (`lowerIR`). This enables future IR
   analysis and transformations (e.g. hybrid reactive lowering).

## Monorepo Structure

The project is a pnpm workspace monorepo managed by Turborepo with the
following packages:

| Package | npm name | Purpose |
|---------|----------|---------|
| `packages/sdk` | `@esphome/compose` | Core SDK — JSX runtime, hooks (`useRef`, `useScript`, `useContext`, `useMemo`, `useEffect`, `useHAEntity`), `secret()` helper, reactive nodes, action primitives (`delay`, `logger`), generated component types |
| `packages/cli` | `@esphome/compose-cli` / `espcompose` | CLI binary & compiler pipeline — type-check, AST transform, esbuild bundle, IR construction/lowering, execute & emit YAML, ESPHome CLI wrappers |
| `packages/eslint` | `@esphome/compose-eslint` | ESLint plugin with custom rules for ESPHome Compose projects |
| `packages/e2e` | `@esphome/compose-e2e` (private) | End-to-end snapshot tests — builds sample projects and verifies YAML output |
| `packages/ui` | `@esphome/compose-ui` | Design system — reusable LVGL components (Screen, Button, Card, etc.) and themes |

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

### secret() — Secret Management
The `secret()` function creates a `!secret` reference for sensitive values.
At compile time the secret key-value pair is collected and emitted into
`secrets.yaml`, while the config YAML receives a `!secret <key>` reference.

```tsx
import { secret } from '@esphome/compose';

export default (
  <esphome name="my-device">
    <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
    <wifi ssid={secret('wifi_ssid')} password={secret('wifi_password')} />
    <api encryption={{ key: secret('api_key') }} />
  </esphome>
);
```

Use `getSecrets()` to retrieve the collected secrets map after rendering,
and `clearSecrets()` to reset the store between compilations.

### useScript() — Named Scripts
`useScript()` declares named ESPHome scripts from async arrow function
bodies. The AST-based action tree compiler compiles the function body at
build time — it is never executed at runtime. Returns a `ScriptHandle`
for calling the script from trigger handlers. Must be called inside a
component function body.

```tsx
import { delay, logger, useRef, useScript } from '@esphome/compose';
import type { Switch } from '@esphome/compose';

function App() {
  const switchRef = useRef<Switch>();

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

### Hook Context Guard
Hooks (`useRef`, `useScript`, `useMemo`, `useEffect`, `useHAEntity`) must be
called inside a component function body during the render pass. The runtime
enforces this via `assertHookContext()`, which checks that a hook path has been
set by the compiler's `withScriptScope()`/`withReactiveScope()` before any
hook call. Calling a hook outside of a render context throws with a descriptive
error message.

### IR (Intermediate Representation) Layer
After rendering, the config object is lifted into a typed IR tree and lowered
back. The IR types include `IRRoot`, `IRSection`, `IRScalar`, `IRObject`,
`IRArray`, `IRLambda`, and `IRNull`. This enables future optimizations and
analysis passes (e.g. hybrid reactive lowering for multi-source bindings).

### Reactive Bindings
`useMemo()` and `useEffect()` create reactive computations that track
dependencies automatically via `ReactiveNode<T>`. Single-source bindings
lower to ESPHome-native `on_state:`/`on_value:` triggers. Multi-source
bindings can use a C++ reactive runtime (`espcompose_reactive.h`) with
`Signal<T>`, `Memo<T>`, `Effect`, and `Scheduler` primitives.

### Scripts and Trigger Handlers (Action Tree Compiler)
`useScript()` creates named ESPHome `script:` components. Trigger handler
arrow functions on props like `onPress`, `onRelease`, etc. define inline
action sequences. Both are compiled at the AST level by the action tree
compiler — function bodies are analyzed statically and emitted as ESPHome
YAML action sequences. They are never executed at runtime.

Trigger props (props starting with `on`) accept `TriggerHandler<T>` — an
async arrow function whose body is compiled to ESPHome actions.

Supported action primitives (imported from `@esphome/compose`):
- `await delay(ms)` → `delay: <ms>ms`
- `logger.log(message, level?)` → `logger.log: { message, level? }`
- `await waitUntil(() => condition)` → `wait_until: { condition: !lambda ... }`
- Ref actions: `lightRef.toggle()` → `light.toggle: { id: <token> }`
- HA entity actions: `entity.toggle()` → `homeassistant.action: { action: light.toggle, data: { entity_id: ... } }`
- Script calls: `await myScript()` → `script.execute` + `script.wait`

Named scripts are emitted in the `script:` YAML section and referenced via
`script.execute`. Inline trigger handlers emit their actions directly into
the trigger prop.

Example:
```tsx
import { delay, logger, useRef, useScript } from '@esphome/compose';
import type { Switch } from '@esphome/compose';

function App() {
  const switchRef = useRef<Switch>();

  const greet = useScript(async () => {
    logger.log('Hello from ESPCompose!');
    await delay(500);
  });

  return (
    <esphome name="script-device">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid="HomeWifi" password="s3cr3t!!" />
      <api />
      <logger level="INFO" />
      <switch platform="gpio" ref={switchRef} pin={2} name="LED" />
      <binary_sensor
        platform="gpio"
        pin={4}
        name="Button"
        onPress={async () => { await greet(); }}
        onRelease={async () => { switchRef.toggle(); }}
      />
    </esphome>
  );
}

export default <App />;
```

This compiles to YAML with a `script:` section for `greet` and
`on_press: [script.execute: <id>, script.wait: <id>]` on the binary_sensor,
plus an inline `on_release: [switch.toggle: { id: <ref> }]`.

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

Alternatively, `createElement()` can be called directly with
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

- **Multi-source reactive lowering** — When `useMemo()` tracks dependencies
  from multiple ESPHome sources simultaneously, the C++ reactive runtime
  (`espcompose_reactive.h`) manages the subscription graph. The hybrid lowering
  decision (`analyzeReactiveStrategy`) is implemented but always returns
  'native' for now.
- **State Machines** (`useStateMachine()`) — XState-inspired construct that
  compiles to globals + entry/exit scripts + event guards
- **`cpp\`\`` tagged template literal** — raw C++ escape hatch for any action
  or expression position
- **`fmt\`\`` tagged template literal** — string concatenation with
  `std::to_string` conversions

## Key Constraints

- **Never edit generated files directly** — Files under `packages/sdk/src/generated/`
  are auto-generated by `pnpm codegen` (via `scripts/codegen/`). To change
  generated output, modify the codegen scripts (e.g. `lvgl-codegen.ts`,
  `type-mapper.ts`, `overrides.ts`) and regenerate.
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
| `script-device` | Named scripts with `useScript()`, `delay()`, `logger.log()`, trigger props (`onPress`, `onRelease`) |
| `dashboard-device` | Complex real-world device: cross-component refs, nested hardware module, `x:custom` escape hatch, `createElement()` for untyped components |
