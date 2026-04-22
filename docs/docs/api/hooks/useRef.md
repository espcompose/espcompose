---
sidebar_label: useRef
sidebar_position: 1
---

# useRef

Creates a typed reference to an ESPHome component. Refs replace manual string IDs — the compiler generates unique IDs automatically and wires them in the YAML output.

## Signature

```typescript
import { useRef } from '@espcompose/core';

const ref = useRef<T>(): Ref<T>;
```

`T` is a ref marker type (e.g. `LightOutputRef`, `SwitchRef`, `DisplayRef`) that constrains which components the ref can be passed to and which actions are available.

## Basic usage

Create a ref, pass it to an element's `ref` prop, then use it elsewhere:

```tsx
import { useRef } from '@espcompose/core';
import type { FloatOutputRef, LightOutputRef } from '@espcompose/core';

function App() {
  const outputRef = useRef<FloatOutputRef>();
  const lightRef = useRef<LightOutputRef>();

  return (
    <esphome name="my-device">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid="MyWifi" password="secret" />
      <api />
      <output platform="ledc" ref={outputRef} pin={19} frequency="1000Hz" />
      <light ref={lightRef} platform="monochromatic" name="Desk Light" output={outputRef} />
    </esphome>
  );
}
```

The type parameter ensures your editor catches mistakes — you can't pass a `LightOutputRef` where a `FloatOutputRef` is expected.

## Ref actions

Refs to actionable components expose typed action methods. Use these inside `useScript()` or trigger handlers:

```tsx
import { delay, useRef, useScript } from '@espcompose/core';
import type { LightOutputRef, SwitchRef } from '@espcompose/core';

function App() {
  const lightRef = useRef<LightOutputRef>();
  const switchRef = useRef<SwitchRef>();

  const toggleAll = useScript(async () => {
    lightRef.toggle();
    await delay(200);
    switchRef.toggle();
  });

  return (
    <esphome name="my-device">
      {/* ... platform setup ... */}
      <light ref={lightRef} platform="monochromatic" name="Light" output={outputRef} />
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
```

Available actions depend on the ref type. For example, `LightOutputRef` provides `toggle()`, `turnOn(opts?)`, and `turnOff(opts?)`, while `SwitchRef` provides `toggle()`, `turnOn()`, and `turnOff()`.

## Common ref types

| Type | Component | Actions |
|------|-----------|---------|
| `LightOutputRef` | `<light>` | `toggle()`, `turnOn(opts?)`, `turnOff(opts?)` |
| `SwitchRef` | `<switch>` | `toggle()`, `turnOn()`, `turnOff()` |
| `FloatOutputRef` | `<output>` | Used as a reference target (e.g. light output) |
| `DisplayRef` | `<display>` | Used as a reference target (e.g. LVGL displays) |
| `LvglComponentRef` | `<lvgl>` | `pageNext(opts?)`, `pagePrevious(opts?)`, `pageShow(opts?)` |

## Rules

- Must be called inside a function component body
- The ref type parameter is optional — untyped refs (`useRef()`) work but provide no action methods or type checking
