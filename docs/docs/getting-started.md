---
sidebar_label: Getting Started
sidebar_position: 2
---

# Getting Started

This guide walks you through creating your first ESPHome Compose project — writing ESP device configurations in TypeScript/TSX instead of YAML.

For a complete working example, see the [espcompose-demo](https://github.com/espcompose/espcompose-demo) repository.

## Prerequisites

- [Node.js](https://nodejs.org/) 22+
- [ESPHome](https://esphome.io/guides/installing_esphome) (only needed for `config`, `build`, `run`, and `logs` commands)

## Creating a Project

Use the `init` command to scaffold a new project:

```bash
npx @espcompose/cli init my-device
```

This creates a `my-device/` directory with:

| File | Purpose |
|------|---------|
| `index.tsx` | Device configuration entry point |
| `package.json` | Dependencies (`@espcompose/core`, CLI, ESLint plugin) |
| `tsconfig.json` | TypeScript config extending `@espcompose/core/tsconfig.sdk.json` |
| `eslint.config.mjs` | ESLint config with ESPHome Compose rules |
| `.gitignore` | Ignores `node_modules/`, `.espcompose/`, `.espcompose-build/`, and `dist/` |

You can optionally specify a board (defaults to `esp32dev`):

```bash
npx @espcompose/cli init my-device --board esp32-s3-devkitc-1
```

Then install dependencies and transpile:

```bash
cd my-device
npm install
npx espcompose transpile
```

The generated YAML is written to `.espcompose/esphome.yaml`.

## The Entry File

The scaffolded `index.tsx` is a minimal device configuration:

```tsx
import { secret } from '@espcompose/core';

export default (
  <esphome name="my-device" comment="An ESPHome Compose device">
    <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
    <wifi ssid={secret('wifi_ssid')} password={secret('wifi_password')} />
    <api />
    <ota platform="esphome" />
    <logger level="DEBUG" />
  </esphome>
);
```

The default export is a JSX element tree that the compiler uses as the entry
point. Each intrinsic element (`<esphome>`, `<esp32>`, `<wifi>`, etc.) maps
directly to an ESPHome YAML section. Props are written in camelCase and
automatically converted to snake_case in the output.

## Function Components

Extract reusable pieces into function components:

```tsx
import { secret } from '@espcompose/core';

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
    <wifi ssid={secret('wifi_ssid')} password={secret('wifi_password')} />
    <CoreInfrastructure />
  </esphome>
);
```

Fragments (`<>...</>`) let a component return multiple sibling elements without a wrapper.

## Refs — Typed Cross-Component References

ESPHome uses string IDs to link components together (e.g. a light referencing an output). ESPHome Compose replaces manual ID strings with typed refs.

Call `useRef<T>()` to create a typed reference, pass it to an element's `ref` prop to register it, and use it in other elements to reference it:

```tsx
import { secret, useRef } from '@espcompose/core';
import type { FloatOutputRef, LightOutputRef } from '@espcompose/core';

const outputRef = useRef<FloatOutputRef>();
const lightRef = useRef<LightOutputRef>();

export default (
  <esphome name="my-device">
    <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
    <wifi ssid={secret('wifi_ssid')} password={secret('wifi_password')} />
    <api />
    <logger level="DEBUG" />
    <output platform="ledc" ref={outputRef} pin={19} frequency="1000Hz" />
    <light ref={lightRef} platform="monochromatic" name="Desk Light" output={outputRef} />
  </esphome>
);
```

The compiler generates unique IDs and wires them in the YAML output:

```yaml
output:
  id: r_a1b2c3d4e
  platform: ledc
  pin: 19
  frequency: 1000Hz
light:
  id: r_f5g6h7i8j
  platform: monochromatic
  name: Desk Light
  output: r_a1b2c3d4e
```

The type parameter (e.g. `FloatOutputRef`) provides type safety — your IDE will error if you pass a ref of the wrong type to a prop that expects a different component kind.

## Event Handlers and Scripts

### Inline Event Handlers

Trigger props (props starting with `on`) accept async arrow functions. The function body is compiled into an ESPHome action list:

```tsx
import { delay } from '@espcompose/core';

<binary_sensor
  platform="gpio"
  pin={4}
  name="Button"
  onRelease={async () => {
    await delay(100);
  }}
/>
```

This compiles to:

```yaml
binary_sensor:
  platform: gpio
  pin: 4
  name: Button
  on_release:
    - delay: 100ms
```

### Named Scripts

Use `useScript()` to create reusable ESPHome `script:` components. The async arrow function body is compiled at the AST level — it is never executed at runtime. Must be called inside a function component body:

```tsx
import { delay, logger, secret, useScript } from '@espcompose/core';

function App() {
  const greet = useScript(async () => {
    logger.log('Hello from ESPCompose!');
    await delay(500);
  });

  return (
    <esphome name="my-device">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid={secret('wifi_ssid')} password={secret('wifi_password')} />
      <api />
      <logger level="INFO" />
      <binary_sensor
        platform="gpio"
        pin={4}
        name="Button"
        onPress={async () => { await greet(); }}
      />
    </esphome>
  );
}

export default <App />;
```

### Action Primitives

Import action primitives from `@espcompose/core` to use inside script bodies and trigger handlers:

| Function | YAML Output |
|----------|-------------|
| `await delay(ms)` | `delay: <ms>ms` |
| `await delay('1s')` | `delay: 1s` |
| `logger.log(message, level?)` | `logger.log: { message, level }` |

### Ref Actions

Refs to actionable components (lights, switches, etc.) provide typed action methods. Inside `useScript()` or trigger handlers, calling these methods emits the corresponding ESPHome actions:

```tsx
import { delay, secret, useRef, useScript } from '@espcompose/core';
import type { LightOutputRef, SwitchRef, FloatOutputRef } from '@espcompose/core';

function App() {
  const lightRef = useRef<LightOutputRef>();
  const switchRef = useRef<SwitchRef>();
  const outputRef = useRef<FloatOutputRef>();

  const toggleAll = useScript(async () => {
    lightRef.toggle();
    await delay(200);
    switchRef.toggle();
  });

  return (
    <esphome name="my-device">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid={secret('wifi_ssid')} password={secret('wifi_password')} />
      <api />
      <logger level="DEBUG" />
      <output platform="ledc" ref={outputRef} pin={19} frequency="1000Hz" />
      <light ref={lightRef} platform="monochromatic" name="Desk Light" output={outputRef} />
      <switch ref={switchRef} platform="gpio" pin={5} name="Relay" />
      <binary_sensor
        platform="gpio"
        pin={4}
        name="Button"
        onPress={async () => { await toggleAll(); }}
        onRelease={async () => {
          lightRef.turnOff();
          await delay(100);
          switchRef.turnOff();
        }}
      />
    </esphome>
  );
}

export default <App />;
```

## CLI Commands

| Command | Description | Requires ESPHome |
|---------|-------------|:----------------:|
| `espcompose init <name>` | Scaffold a new project (`--board`, `--library`) | |
| `espcompose transpile [dir]` | Transpile TSX to YAML | |
| `espcompose config [dir]` | Transpile + validate via `esphome config` | Yes |
| `espcompose build [dir]` | Transpile + compile firmware | Yes |
| `espcompose run [dir]` | Transpile + compile + upload to device (`--host` for local SDL2 preview) | Yes |
| `espcompose logs [dir]` | Stream serial logs | Yes |

Pass extra flags to ESPHome after `--`:

```bash
espcompose run ./my-device -- --device /dev/ttyUSB0
```

## Secrets

Use the `secret()` function to reference values from your ESPHome `secrets.yaml` file:

```tsx
import { secret } from '@espcompose/core';

<wifi ssid={secret('wifi_ssid')} password={secret('wifi_password')} />
<api encryption={{ key: secret('api_encryption_key') }} />
```

The compiler emits `!secret <key>` references in the YAML output.

## Next Steps

See the [espcompose-demo](https://github.com/espcompose/espcompose-demo) repository for a full working project with components, refs, scripts, and more.
