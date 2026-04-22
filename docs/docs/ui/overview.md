---
sidebar_label: Overview
sidebar_position: 1
---

# UI Library Overview

`@espcompose/ui` provides high-level, theme-aware UI components for building LVGL touchscreen interfaces. These components are **opinionated semantic wrappers** — not raw LVGL bindings — that expose a simpler API driven by design tokens.

## Installation

The UI library is included when you scaffold a project with `espcompose init`. To add it manually:

```bash
npm install @espcompose/ui
```

## Basic app structure

Every UI app follows the same pattern: a `<lvgl>` root, a `<UITheme.Provider>` for theming, and `<Screen>` components for pages.

```tsx
import { useRef } from '@espcompose/core';
import type { DisplayRef } from '@espcompose/core';
import { Screen, VStack, Text, Button, UITheme } from '@espcompose/ui';

function App() {
  const displayRef = useRef<DisplayRef>();

  return (
    <esphome name="my-panel">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid="MyWifi" password="secret" />
      <api />
      <logger />

      {/* ... display hardware setup ... */}

      <lvgl displays={[displayRef]}>
        <UITheme.Provider>
          <Screen>
            <VStack>
              <Text variant="title" text="Hello World" />
              <Button text="Press Me" onPress={() => { /* action */ }} />
            </VStack>
          </Screen>
        </UITheme.Provider>
      </lvgl>
    </esphome>
  );
}

export default <App />;
```

## Design philosophy

- **Theme-driven**: Visual decisions (colors, spacing, typography, radii) are controlled by theme tokens, not per-component props
- **Semantic API**: Components expose meaningful concepts like `variant`, `status`, and `size` instead of raw LVGL style properties
- **Compile-time**: All components compile to LVGL widget trees with C++ reactive bindings — there is no JavaScript runtime on the device
- **Escape hatch**: Use the `style` prop for CSS-like overrides, or drop down to raw `<lvgl-*>` intrinsic elements for full LVGL control

## What's included

- **Layout**: [Screen, Space/VStack/HStack, Row/Col, Grid/GridItem, Card](./components.md#layout-components)
- **Controls**: [Button, Slider, Switch, Dropdown](./components.md#control-components)
- **Display**: [Text, SensorText, Image, Spinner](./components.md#display-components)
- **Theming**: [Built-in dark/light themes, custom theme support, runtime switching](./theming.md)
