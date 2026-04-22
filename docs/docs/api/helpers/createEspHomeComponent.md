---
sidebar_label: createEspHomeComponent
sidebar_position: 9
---

# createEspHomeComponent

Creates an ESPHome grouping component — a function component that wraps intrinsic ESPHome elements (infrastructure, platforms, sensors, etc.) and is a valid direct child of `<esphome>`.

## Signature

```typescript
import { createEspHomeComponent } from '@espcompose/core';

const MyComponent = createEspHomeComponent(
  (props: P) => JSX.Element
);
```

The returned component can be placed as a direct child of `<esphome>`, and only accepts other `esphome:component` children. The compiler validates these relationships at build time.

## When to use

Use `createEspHomeComponent` when you want to extract reusable groups of ESPHome configuration into a component — hardware setup, sensor clusters, automation blocks, etc.

## Example: Hardware setup component

```tsx
import { createEspHomeComponent, useRef } from '@espcompose/core';
import type { DisplayRef, Ref } from '@espcompose/core';

interface HardwareProps {
  display: Ref<DisplayRef>;
}

const Hardware = createEspHomeComponent(
  ({ display }: HardwareProps) => (
    <>
      <spi clkPin={18} mosiPin={23} />
      <display
        platform="ili9xxx"
        ref={display}
        model="ILI9341"
        invertColors={false}
        csPin={5}
        dcPin={27}
        resetPin={33}
      />
    </>
  ),
);
```

## Example: UI wrapper component

```tsx
import { createEspHomeComponent } from '@espcompose/core';
import type { DisplayRef, Ref } from '@espcompose/core';
import { Screen, VStack, Text, UITheme } from '@espcompose/ui';

const UI = createEspHomeComponent(
  ({ display }: { display: Ref<DisplayRef> }) => (
    <lvgl displays={[display]}>
      <UITheme.Provider>
        <Screen>
          <VStack>
            <Text variant="title" text="Hello!" />
          </VStack>
        </Screen>
      </UITheme.Provider>
    </lvgl>
  ),
);
```

## Usage in the app

```tsx
function App() {
  const displayRef = useRef<DisplayRef>();

  return (
    <esphome name="my-device">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid="MyWifi" password="secret" />
      <api />
      <logger />

      <Hardware display={displayRef} />
      <UI display={displayRef} />
    </esphome>
  );
}

export default <App />;
```

## Rules

- The wrapped function component can return any intrinsic ESPHome elements or fragments
- The component is validated as a valid `<esphome>` child at compile time
- Props are typed normally — no special wrapping needed
