

<p align="center" style="background:#333333; padding:14px 18px; border-radius:10px;">
  <img src="assets/logo-text-on-dark.png" alt="ESPHome Compose" />
</p>

<div align="center">

[![Discord chat](https://img.shields.io/discord/1484903209461088309)](https://discord.gg/4C28vh6n) [![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/xmlguy74/espcompose/release.yml)](https://github.com/xmlguy74/espcompose/releases)


</div>

# ESPCompose

Write [ESPHome](https://esphome.io/) device configurations in TypeScript/TSX instead of YAML.

ESPHome Compose provides a JSX authoring layer that compiles to valid ESPHome YAML. You get full type safety, reusable components, IDE autocompletion, and the expressiveness of TypeScript — all while producing standard ESPHome configurations that work with Home Assistant.

> **Status:** Early development. APIs will change.

## Help support this project

<a href="https://www.buymeacoffee.com/xmlguy74" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

## How It Works

<img style="background-color:#DDDDDD" src="./docs/docs/architecture/images/espcompose-flow.svg" />

There is no JavaScript runtime on the device. ESPHome Compose is purely a build-time transpiler — the output is standard ESPHome YAML that gets compiled to firmware through the normal ESPHome toolchain.

## Quick Start

> **New here?** Check out the [Getting Started guide](https://espcompose.io/docs/architecture/getting-started) for a step-by-step walkthrough of creating your first project.

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

### Scripts via `useScript`

Use the `useScript` hook inside a function component to define named ESPHome `script:` entries. Reference the returned handle in trigger props — the compiler wires everything together:

```tsx
import { useScript, delay, logger } from '@espcompose/core';

function App() {
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
      <binary_sensor
        platform="gpio"
        pin={4}
        name="Button"
        onPress={async () => { await greet(); }}
        onRelease={async () => { await delay(100); }}
      />
    </esphome>
  );
}

export default <App />;
```

Supported control flow inside `useScript` bodies: `if/else`, `while`, `for` loops (literal count), and calls to other script handles.

### Typed Cross-Component References

Use `useRef()` to create typed references between components — no manual ID strings needed:

```tsx
import { useRef, type I2CBusRef } from '@espcompose/core';

const i2cBus = useRef<I2CBusRef>();

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
| `build [dir]` | Transpile + compile firmware via `esphome compile` |
| `build --library [dir]` | Build a component library (CJS + `.d.ts`) |
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
  core/        @espcompose/core           Core SDK, JSX runtime, hooks, generated types
  cli/         @espcompose/cli       CLI binary, compiler pipeline, AST transforms, ESPHome wrappers
  eslint/      @espcompose/eslint    ESLint plugin
  e2e/         (private)                  End-to-end snapshot tests
```

## Development

```bash
# Build all packages
pnpm build

# Run all tests
pnpm test

# Run e2e tests only
pnpm --filter espcompose-e2e test

# Regenerate SDK types from ESPHome schemas
pnpm codegen

# Lint
pnpm lint
```

## How the Compiler Works

1. **Type-check** — The TypeScript compiler validates the entry file and its imports
2. **Transform** — A TypeScript AST transformer resolves `useScript()` calls into named ESPHome `script:` entries and converts trigger props into ESPHome action arrays
3. **Bundle** — esbuild bundles the transformed source into a single CommonJS module (`@espcompose/core` is kept external)
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