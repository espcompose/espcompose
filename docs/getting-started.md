# Getting Started

This guide walks you through creating your first ESPHome Compose project — writing ESP device configurations in TypeScript/TSX instead of YAML.

## Prerequisites

- [Node.js](https://nodejs.org/) 22+
- [ESPHome](https://esphome.io/guides/installing_esphome) (only needed for `config`, `compile`, `run`, and `logs` commands)

## Creating a Project

Use the `init` command to scaffold a new project:

```bash
npx espcompose init my-device
```

This creates a `my-device/` directory with the following files:

| File | Purpose |
|------|---------|
| `index.tsx` | Device configuration entry point |
| `package.json` | Dependencies (`@esphome/compose` SDK + CLI + ESLint plugin) |
| `tsconfig.json` | TypeScript config extending the SDK's base config |
| `eslint.config.mjs` | ESLint config with ESPHome Compose rules |
| `.gitignore` | Ignores `node_modules/`, `.espcompose/`, and `dist/` |

You can optionally specify a board:

```bash
npx espcompose init my-device --board esp32-s3-devkitc-1
```

Next, install dependencies and transpile:

```bash
cd my-device
npm install
npx espcompose transpile
```

The generated YAML is written to `.espcompose/esphome.yaml`.

## The Entry File

The scaffolded `index.tsx` is a minimal device configuration:

```tsx
import { ESPCompose } from '@esphome/compose';

export default (
  <esphome name="my-device" comment="An ESPHome Compose device">
    <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
    <wifi ssid="!secret wifi_ssid" password="!secret wifi_password" />
    <api />
    <ota platform="esphome" />
    <logger level="DEBUG" />
  </esphome>
);
```

The default export is the JSX element tree that gets compiled to YAML. Each intrinsic element (`<esphome>`, `<esp32>`, `<wifi>`, etc.) maps directly to an ESPHome YAML section. Props are written in camelCase and automatically converted to snake_case in the output.

## Function Components

Just like React, you can extract reusable pieces into function components:

```tsx
import { ESPCompose } from '@esphome/compose';

interface WifiConfigProps {
  ssid: string;
  password: string;
}

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

Fragments (`<>...</>`) let a component return multiple sibling elements without a wrapper.

## Refs — Typed Cross-Component References

ESPHome uses string IDs to link components together (e.g. a light referencing an output). ESPHome Compose replaces manual ID strings with typed refs.

Call `useRef<T>()` to create a typed reference, pass it to an element's `ref` prop to assign it, and pass it to other elements' ID props to reference it:

```tsx
import { ESPCompose, useRef } from '@esphome/compose';
import type { output_FloatOutput, light_LightOutput } from '@esphome/compose';

const outputRef = useRef<output_FloatOutput>();
const lightRef = useRef<light_LightOutput>();

export default (
  <esphome name="my-device">
    <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
    <wifi ssid="HomeWifi" password="s3cr3t!!" />
    <api />
    <logger level="DEBUG" />
    <output platform="ledc" ref={outputRef} pin={19} frequency="1000Hz" />
    <light ref={lightRef} platform="monochromatic" name="Desk Light" output={outputRef} />
  </esphome>
);
```

The compiler generates unique IDs automatically and wires them in the YAML output:

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

The type parameter (e.g. `output_FloatOutput`) provides type safety — your IDE will catch it if you pass a ref of the wrong type to a prop that expects a different component kind.

## Event Handlers and Scripts

### Inline Event Handlers

Trigger props (props starting with `on`) accept inline arrow functions. The function body is compiled directly into an ESPHome action list:

```tsx
<binary_sensor
  platform="gpio"
  pin={4}
  name="Button"
  onRelease={() => {
    delay(100);
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

### Named Script Functions

Top-level `function` declarations are automatically compiled into ESPHome `script:` components. You can reference them in trigger props by name:

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
    />
  </esphome>
);
```

This compiles to:

```yaml
binary_sensor:
  platform: gpio
  pin: 4
  name: Button
  on_press:
    - script.execute: greet
script:
  - id: greet
    then:
      - logger.log: Hello from ESPCompose!
      - delay: 500ms
```

> **Note:** Only top-level `function` declarations become scripts. Arrow function constants (`const fn = () => {}`) are treated as compile-time helpers and do not generate script components.

### Action Primitives

Import action primitives from `@esphome/compose` to use inside script bodies and inline handlers:

| Function | YAML Output |
|----------|-------------|
| `delay(ms)` | `delay: <ms>ms` |
| `logger.log(message, level?)` | `logger.log: { message, level }` |

### Ref Actions

Refs to actionable components (lights, switches, etc.) provide typed action methods that compile to ESPHome actions:

```tsx
import { ESPCompose, delay, logger, useRef } from '@esphome/compose';
import type { light_LightOutput, switch__Switch, output_FloatOutput } from '@esphome/compose';

const lightRef = useRef<light_LightOutput>();
const switchRef = useRef<switch__Switch>();
const outputRef = useRef<output_FloatOutput>();

function toggleAll(): void {
  lightRef.toggle();
  delay(200);
  switchRef.toggle();
}

function dimLight(): void {
  lightRef.turnOn({ brightness: 0.5 });
  logger.log('Light dimmed to 50%');
}

export default (
  <esphome name="trigger-device">
    <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
    <wifi ssid="HomeWifi" password="s3cr3t!!" />
    <api />
    <logger level="DEBUG" />
    <output platform="ledc" ref={outputRef} pin={19} frequency="1000Hz" />
    <light ref={lightRef} platform="monochromatic" name="Desk Light" output={outputRef} />
    <switch ref={switchRef} platform="gpio" pin={5} name="Relay" />
    <binary_sensor
      platform="gpio"
      pin={4}
      name="Button"
      onPress={toggleAll}
      onRelease={() => {
        lightRef.turnOff();
        delay(100);
        switchRef.turnOff();
      }}
      onDoubleClick={dimLight}
    />
  </esphome>
);
```

This compiles `toggleAll` into a script that emits `light.toggle`, `delay`, and `switch.toggle` actions, and wires the inline `onRelease` handler directly into the binary sensor's `on_release` trigger.

### Control Flow in Scripts

Script bodies support standard control flow that compiles to ESPHome action equivalents:

| TypeScript | ESPHome |
|------------|---------|
| `if / else` | `if:` action with `condition`, `then`, `else` |
| `while` | `while:` action |
| `for (let i = 0; i < N; i++)` | `repeat:` action (literal count only) |

```tsx
function startUp(): void {
  logger.log('Device starting up', 'INFO');
  if (1 > 0) {
    delay(100);
    logger.log('System ready');
  }
}
```

## CLI Commands

Once your project is ready, use the CLI to build and deploy:

| Command | Description |
|---------|-------------|
| `espcompose transpile [dir]` | Transpile TSX to YAML |
| `espcompose config [dir]` | Transpile + validate via `esphome config` |
| `espcompose compile [dir]` | Transpile + compile firmware |
| `espcompose run [dir]` | Transpile + compile + upload to device |
| `espcompose logs [dir]` | Transpile + stream serial logs |

Pass extra flags to ESPHome after `--`:

```bash
espcompose run ./my-device -- --device /dev/ttyUSB0
```
