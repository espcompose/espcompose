

<p align="center" style="background:#333333; padding:14px 18px; border-radius:10px;">
  <img src="assets/logo-text-on-dark.png" alt="ESPHome Compose" />
</p>

<div align="center">

[![Release](https://github.com/xmlguy74/espcompose/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/xmlguy74/espcompose/actions/workflows/release.yml)

</div>

# ESPHome Compose

Write [ESPHome](https://esphome.io/) device configurations in TypeScript/TSX instead of YAML.

ESPHome Compose provides a JSX authoring layer that compiles to valid ESPHome YAML. You get full type safety, reusable components, IDE autocompletion, and the expressiveness of TypeScript — all while producing standard ESPHome configurations that work with Home Assistant.

> **Status:** Early development (0.0.x). APIs may change.

## How It Works

```
  index.tsx            ESPHome YAML            Firmware
 ┌──────────┐   espcompose   ┌──────────┐   esphome   ┌──────────┐
 │  <esphome│  ──transpile─▸ │ esphome: │  ─compile─▸ │  .bin    │
 │    ...   │                │   name:  │             │  flash   │
 │  />      │                │   ...    │             │  to ESP  │
 └──────────┘                └──────────┘             └──────────┘
```

There is no JavaScript runtime on the device. ESPHome Compose is purely a build-time transpiler — the output is standard ESPHome YAML that gets compiled to firmware through the normal ESPHome toolchain.

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 22+
- [pnpm](https://pnpm.io/) (for development)
- [ESPHome](https://esphome.io/guides/installing_esphome) (only needed for `config`, `compile`, `run`, and `logs` commands)

### Installation

```bash
# Clone the repository
git clone https://github.com/xmlguy74/espcompose.git
cd espcompose

# Install dependencies
pnpm install

# Build all packages
pnpm build
```

### Create a Device Configuration

Create a new project directory with an `index.tsx` entry file:

```tsx
import { ESPCompose } from '@esphome/compose';

export default (
  <esphome name="my-device" comment="My first ESPCompose device">
    <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
    <wifi ssid="MyNetwork" password="MyPassword" />
    <api />
    <ota platform="esphome" />
    <logger level="DEBUG" />
  </esphome>
);
```

### Transpile to YAML

```bash
espcompose transpile ./my-project
```

This produces `.espcompose/esphome.yaml` in your project directory — standard ESPHome YAML ready for compilation.

## Features

### Type-Safe Components

Every ESPHome platform and component has auto-generated TypeScript types. Your IDE provides autocompletion and catches configuration errors at build time.

```tsx
<sensor
  platform="dht"
  pin={4}
  model="DHT22"
  temperature={{ name: 'Temperature' }}
  humidity={{ name: 'Humidity' }}
/>
```

### Reusable Function Components

Compose device configurations from reusable components, just like React:

```tsx
function WifiConfig({ ssid, password }: { ssid: string; password: string }) {
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

### Function-as-Script Pattern

Top-level functions automatically compile to ESPHome `script:` components. Reference them in trigger props and the compiler handles the wiring:

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

Supported control flow in scripts: `if/else`, `while`, `for` loops (literal count), and calls to other script functions.

### Typed Cross-Component References

Use `useRef()` to create typed references between components — no manual ID strings needed:

```tsx
import { ESPCompose, useRef, type i2c_I2CBus } from '@esphome/compose';

const i2cBus = useRef<i2c_I2CBus>();

export default (
  <esphome name="sensor-hub">
    <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
    <i2c ref={i2cBus} sda={21} scl={22} />
    <as5600 i2cId={i2cBus} />
  </esphome>
);
```

### Automatic camelCase → snake_case

Write props in idiomatic TypeScript camelCase. The compiler converts them to ESPHome's snake_case automatically:

```tsx
// TypeScript                          // YAML output
<wifi fastConnect={true} />       //   fast_connect: true
<esphome friendlyName="My Dev" /> //   friendly_name: My Dev
```

## CLI

```
espcompose <command> [projectDir] [-- esphome-args]
```

| Command | Description |
|---------|-------------|
| `transpile [dir]` | Transpile TSX → YAML (no ESPHome dependency needed) |
| `config [dir]` | Transpile + validate via `esphome config` |
| `compile [dir]` | Transpile + compile firmware via `esphome compile` |
| `run [dir]` | Transpile + compile + upload via `esphome run` |
| `logs [dir]` | Transpile + stream serial logs via `esphome logs` |

Pass extra flags to ESPHome after `--`:

```bash
espcompose run ./my-project -- --device /dev/ttyUSB0
```

Output is written to `<projectDir>/.espcompose/esphome.yaml`.

## Project Structure

```
packages/
  sdk/         @esphome/compose           Core SDK, JSX runtime, hooks, generated types
  cli/         @esphome/compose-cli       CLI binary, compiler pipeline, AST transforms, ESPHome wrappers
  eslint/      @esphome/compose-eslint    ESLint plugin
  e2e/         (private)                  End-to-end snapshot tests
```

## Development

```bash
# Build all packages
pnpm build

# Run all tests
pnpm test

# Run e2e tests only
pnpm --filter @esphome/compose-e2e test

# Regenerate SDK types from ESPHome schemas
pnpm codegen

# Lint
pnpm lint
```

## How the Compiler Works

1. **Type-check** — The TypeScript compiler validates the entry file and its imports
2. **Transform** — A TypeScript AST transformer rewrites top-level `function` declarations into `useScript()` calls and converts trigger props into ESPHome action arrays
3. **Bundle** — esbuild bundles the transformed source into a single CommonJS module (`@esphome/compose` is kept external)
4. **Execute & Emit** — The bundle is loaded in a script scope, the JSX tree is rendered to a plain object graph, and YAML is serialized to disk

## Contributing

Contributions are welcome! Please open an issue to discuss significant changes before submitting a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Make your changes and add tests
4. Run `pnpm build && pnpm test` to verify
5. Submit a pull request

## License

[MIT](LICENSE)
