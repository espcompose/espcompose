---
sidebar_label: LVGL Design System
sidebar_position: 3
---

# LVGL Design System

## Overview

ESPCompose uses **TypeScript/TSX syntax** to define UIs that compile into **ESPHome YAML with LVGL widgets**. While the authoring experience feels similar to React, the output is fundamentally different — there is no virtual DOM, no re-rendering, and no JavaScript at runtime.

Instead, ESPCompose is a **declarative UI compiler**: you write component trees in TSX, and the compiler produces a static LVGL widget tree with reactive C++ signal-driven updates.

---

## Mental Model

### What It Is

- A **compile-time DSL** that produces a **static widget tree**
- Reactive updates happen via a **C++ signal graph** (`Signal` / `Memo`), not re-renders
- UI changes are applied by **mutating existing widgets** through compiled effects

### What It Is Not

- Not a React runtime — no virtual DOM, no component lifecycle, no `useState`
- Not a browser environment — there is no CSS, no DOM, no HTML

### Reactivity

Reactivity in ESPCompose means **reactive signals compiled into a C++ dependency graph that drives imperative widget updates**.

```tsx
const sensor = useHAEntity('sensor.temperature');

<Text text={useMemo(() => `${sensor.value}°`)} />
```

This compiles to a C++ `Memo<std::string>` tracking a `Signal<float>` from the Home Assistant sensor. When the sensor value changes, the memo recomputes and the widget text updates via `lv_label_set_text()`.

---

## Design System Goals

1. Provide a **high-level, ergonomic API** for building embedded UIs
2. Hide LVGL complexity behind semantic components
3. Allow **low-level escape hatches** when needed (`x:custom`, intrinsic elements)
4. Compile cleanly into LVGL widgets + ESPHome automations + C++ lambdas
5. Support **runtime theme switching** through the reactive signal graph

---

## Architecture: Two Layers

### Intrinsic Elements (Low-level)

Thin wrappers over LVGL widgets for full control:

```tsx
<lvgl-label />
<lvgl-button />
<lvgl-slider />
```

These are useful for advanced cases or when you need direct access to LVGL properties.

### Design System Components (Recommended)

High-level, semantic components from `@espcompose/ui`:

```tsx
<Screen />
<Text />
<Button />
<Card />
<VStack />
<Slider />
<Switch />
<Dropdown />
```

These provide consistency, theme integration, and a simpler API for most use cases.

---

## Core Concepts

### Static Widget Tree

All components compile into a **fixed tree**. There is no dynamic insertion or removal of widgets at runtime — only visibility and property changes.

```tsx
<VStack>
  <Text text="Hello" />
  <Button text="Press Me" />
</VStack>
```

### Reactive Bindings

Bindings connect data sources to widget properties through the reactive system:

```tsx
const sensor = useHAEntity('sensor.temperature');
const temp = useMemo(() => `${sensor.value}°`);

<Text text={temp} />
```

This compiles to:
- A `Signal<float>` for the HA sensor
- A `Memo<std::string>` for the formatted string
- An effect that calls `lv_label_set_text()` when the memo changes

#### Binding Sources

| Source | Hook | Description |
|--------|------|-------------|
| Home Assistant entities | `useHAEntity()` | Typed signal properties for sensors, lights, switches, etc. |
| Theme tokens | `useTheme()` | Reactive access to the current theme values |
| Derived values | `useMemo()` | Computed values that track their dependencies |

### Event → Action Model

Event handlers are compiled at the AST level into ESPHome action sequences. No JavaScript runs at runtime.

```tsx
<Button
  text="Kitchen"
  onPress={async () => { kitchenLight.toggle(); }}
/>
```

Compiles to `light.toggle: { id: kitchen_light }`.

### Visibility Instead of Conditional Rendering

Since the widget tree is static, use visibility toggling instead of conditional rendering:

```tsx
// Correct — toggles LVGL hidden flag
<lvgl-obj hidden={useMemo(() => !sensor.isOn)}>
  <Text text="Light is on" />
</lvgl-obj>
```

```tsx
// Incorrect — conditional rendering is not supported
{isOn && <Light />}
```

### Styling: Parts + States

LVGL uses a **parts and states** model, not CSS selectors.

**Parts** describe sub-elements of a widget: `main`, `indicator`, `knob`, `items`, `scrollbar`, `selected`, `ticks`, `cursor`

**States** describe interactive conditions: `default`, `pressed`, `focused`, `checked`, `disabled`, `hovered`, `scrolled`

Style properties are applied to a specific part + state combination. Design system components handle most of this automatically through the theme system.

---

## Design Tokens

Use semantic tokens instead of raw style values:

```tsx
<Button status="primary" size="md" />
```

Instead of:

```tsx
<lvgl-button bgColor="#123456" />
```

Tokens are resolved through the reactive theme system:
- `status` → colors from the theme palette (e.g., `primary`, `success`, `danger`)
- `size` → dimensions from the theme scale (e.g., `sm`, `md`, `lg`)
- `spacing` → padding/gap from the theme spacing scale

---

## Layout

Prefer layout components over absolute positioning:

```tsx
<VStack gap="md">
  <Text text="Title" />
  <Button text="Action" />
</VStack>
```

### Available Layout Components

| Component | Description |
|-----------|-------------|
| `VStack` / `HStack` | Flex column/row with gap, padding, alignment |
| `Space` | Spacer element for flex layouts |
| `Row` / `Col` | Proportional flex grid (column spans) |
| `Grid` / `GridItem` | CSS Grid layout with `FR(n)` track sizing |

The `style` prop on any component accepts CSS-like layout properties (`display`, `flexDirection`, `justifyContent`, `alignItems`, `gap`, etc.) which are compiled to their LVGL equivalents.

---

## Theme System

Themes are registered at compile time and switchable at runtime:

```tsx
import { ThemeProvider } from '@espcompose/core';
import { darkTheme, lightTheme } from '@espcompose/ui';

<ThemeProvider themes={{ dark: darkTheme, light: lightTheme }} default="dark">
  <Screen>
    <Button
      text="Switch to Light"
      onPress={async () => { theme.select('light'); }}
    />
  </Screen>
</ThemeProvider>
```

Inside components, theme values are reactive:
```tsx
const thm = useTheme();
const bgColor = thm.colors.primary.bg;  // Reactive — updates when theme changes
```

Theme switching compiles to `theme_index.set(N); Scheduler::flush();` — all downstream memos recalculate and widgets update automatically.

---

## Refs

Components that need to be referenced from actions require a `useRef()`:

```tsx
const lightRef = useRef<Light>();

<light platform="homeassistant" ref={lightRef} entityId="light.kitchen" />

<Button onPress={async () => { lightRef.toggle(); }} />
```

Refs generate collision-resistant IDs and are resolved to ESPHome YAML IDs by the compiler.

---

## Reactive Expressions

Expressions inside `useMemo()` are compiled to C++. Only a supported subset of JavaScript is allowed:

**Supported:**

```tsx
useMemo(() => `${sensor.value}°`)
useMemo(() => sensor.isOn ? "On" : "Off")
```

**Not supported:**

- Arbitrary JS logic or control flow
- Async operations
- Closures with external mutable state
- Importing external JS libraries

---

## Hooks Reference

| Hook | Description |
|------|-------------|
| `useHAEntity(entityId)` | Bind to a Home Assistant entity; returns typed signal properties |
| `useMemo(fn)` | Derive a value from reactive sources |
| `useTheme()` | Access reactive theme token values |
| `useRef<T>()` | Create a typed cross-component reference |
| `useScript(fn)` | Define a named ESPHome script from an async arrow function |
| `useImage(path)` | Register an image asset |
| `useFont(config)` | Register a font asset |

---

## Components Reference

### Display

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `Screen` | Root display container | `style` |
| `Text` | Typography | `text`, `variant`, `color`, `align`, `longMode`, `style` |
| `Image` | Image display | `src`, `style` |
| `Spinner` | Loading indicator | `style` |

### Layout

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `VStack` / `HStack` | Flex column/row | `gap`, `padding`, `align`, `crossAlign`, `wrap`, `style` |
| `Space` | Spacer element | `size`, `style` |
| `Row` / `Col` | Proportional flex grid | `span` (on Col), `style` |
| `Grid` / `GridItem` | CSS Grid layout | `columns`, `rows`, `gap`, `alignColumns`, `alignRows`, `style` |
| `Card` | Surface container | `padding`, `radius`, `gap`, `style` |

### Input

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `Button` | Status-aware button | `text`, `status`, `size`, `variant`, `onPress`, `style` |
| `Slider` | Slider with label | `label`, `value`, `min`, `max`, `onChange` |
| `Switch` | Toggle with label | `label`, `value`, `onChange` |
| `Dropdown` | Dropdown selector | `label`, `options`, `value`, `onChange` |

### Binding-Driven

These components connect directly to Home Assistant entity bindings:

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `LightButton` | Button driven by a light binding | `binding`, `label`, `status`, `size`, `variant` |
| `LightSwitch` | Toggle driven by a light/switch binding | `binding`, `label` |
| `LightSlider` | Brightness slider for a light binding | `binding`, `label`, `min`, `max` |
| `SensorText` | Text display from a sensor binding | `binding`, `label`, `variant`, `color` |

---

## Full Example

```tsx
import { useHAEntity, useMemo, useRef, secret } from '@espcompose/core';
import type { Light } from '@espcompose/core';
import {
  ThemeProvider, darkTheme, Screen, VStack, Card,
  Text, LightSlider, LightSwitch, SensorText,
} from '@espcompose/ui';

function App() {
  const light = useHAEntity('light.living_room');
  const sensor = useHAEntity('sensor.temperature');

  return (
    <esphome name="dashboard">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid={secret('wifi_ssid')} password={secret('wifi_password')} />
      <api />
      <lvgl>
        <ThemeProvider themes={{ dark: darkTheme }} default="dark">
          <Screen>
            <VStack gap="lg" padding="lg">
              <Card>
                <Text variant="title" text="Living Room" />
                <SensorText binding={sensor} label="Temperature" />
                <LightSlider binding={light} label="Brightness" />
                <LightSwitch binding={light} label="Lamp" />
              </Card>
            </VStack>
          </Screen>
        </ThemeProvider>
      </lvgl>
    </esphome>
  );
}

export default <App />;
```

---

## Common Mistakes

```tsx
// ❌ React state doesn't exist
const [value, setValue] = useState(0);

// ❌ Conditional rendering — tree must be static
{value > 10 && <Text text={value} />}

// ❌ HTML elements don't exist
<div>...</div>
```

These patterns don't work because ESPCompose produces a fixed widget tree at compile time. Use `useMemo()` for derived values, visibility toggling for conditional display, and LVGL/design system components for all UI elements.
