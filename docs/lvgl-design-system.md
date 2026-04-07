# espcompose LVGL Design System — AI Guidance

## Purpose

You are working with **espcompose**, a TypeScript/TSX-based toolkit that compiles UI definitions into **ESPHome YAML using LVGL**.

This is **NOT a React runtime**.

It is a:

> **Declarative UI compiler that uses React-like syntax to generate an imperative embedded UI system.**

---

# Core Mental Model (Critical)

### This is NOT React

* No virtual DOM
* No re-rendering
* No component lifecycle
* No `useState` or equivalent state primitives

### This IS:

* A **compile-time DSL**
* Producing a **static widget tree**
* With **reactive updates via a C++ signal graph** (Signal/Memo/Effect)

---

# What "Reactivity" Means Here

Reactivity is **NOT rendering**.

It is:

> **Reactive signals → compiled into a C++ dependency graph → imperative widget updates**

### Example

```tsx
const sensor = useHAEntity('sensor.temperature');

<Text value={useMemo(() => `${sensor.value}°`)} />
```

Compiles to a C++ `Memo<std::string>` that tracks a `Signal<float>` from the HA sensor.
When the sensor value changes, the memo recomputes and the widget text is updated via
`lv_label_set_text()` — no re-rendering.

### Key Idea

> UI updates happen by **mutating existing widgets** via C++ effects, not re-rendering the tree.

---

# Design System Goals

The design system should:

1. Provide a **high-level, ergonomic API** (like Ant Design for embedded)
2. Hide LVGL complexity where possible
3. Still allow **low-level escape hatches** (`x:custom`, `createElement()`)
4. Compile cleanly into LVGL widgets + ESPHome automations + C++ lambdas
5. Support **runtime theme switching** through the reactive signal graph

---

# Architecture Overview

## Two Layers

### 1. Intrinsic Elements (Low-level)

Thin wrappers over LVGL:

```tsx
<lvgl-label />
<lvgl-button />
<lvgl-slider />
```

Used for:

* full control
* advanced cases

---

### 2. Design System Components (Preferred API)

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

Used for:

* most UI authoring
* consistency
* reactive theme integration

---

# Core Concepts

## 1. Static Widget Tree

All components compile into a **fixed tree**.

```tsx
<VStack>
  <Text value="Hello" />
  <Button label="Press Me" />
</VStack>
```

No dynamic insertion/removal at runtime. Only visibility/state changes.

---

## 2. Reactive Bindings (Primary Dynamic Mechanism)

Bindings connect data sources to widget properties through the reactive system:

```tsx
const sensor = useHAEntity('sensor.temperature');
const temp = useMemo(() => `${sensor.value}°`);

<Text value={temp} />
```

This compiles to:
- A `Signal<float>` for the HA sensor
- A `Memo<std::string>` for the formatted string
- An `Effect` that calls `lv_label_set_text()` when the memo changes

### Binding Sources

* Home Assistant entities (`useHAEntity()`)
* Theme tokens (`useTheme()`)
* Derived computations (`useMemo()`)
* Side effects (`useEffect()`)

---

## 3. Event → Action Model

```tsx
<Button
  label="Kitchen"
  onPress={async () => { kitchenLight.toggle(); }}
/>
```

The arrow function body is compiled at the AST level to an ESPHome action sequence
(`light.toggle: { id: kitchen_light }`). No JavaScript runs at runtime.

---

## 4. Visibility Instead of Conditional Rendering

Do NOT do this:

```tsx
{isOn && <Light />}
```

Do this:

```tsx
<lvgl-obj hidden={useMemo(() => !sensor.isOn)}>
  <Text value="Light is on" />
</lvgl-obj>
```

Compiles to an LVGL hidden flag toggle — no tree mutation.

---

## 5. Styling Model (LVGL-native)

LVGL uses:

> **Parts + States (NOT CSS selectors)**

### Parts (examples)

* `main`
* `indicator`
* `knob`
* `items`

### States (examples)

* `default`
* `pressed`
* `focused`
* `checked`
* `disabled`

---

## 6. Design Tokens First

Use semantic tokens instead of raw styles:

```tsx
<Button status="primary" size="md" />
```

Instead of:

```tsx
<lvgl-button bgColor="#123456" />
```

Token values are resolved through the reactive theme system:
- `status` → colors from `theme.colors[status]`
- `size` → dimensions from `theme.sizes[size]`
- `spacing` → padding from `theme.spacing[token]`

---

## 7. Layout Over Positioning

Prefer layout components:

```tsx
<VStack gap="md">
  <Text value="Title" />
  <Button label="Action" />
</VStack>
```

Instead of x/y absolute positioning.

Available layout components:
- `VStack` / `HStack` — flex column/row with gap
- `Space` — spacer
- `Row` / `Col` — proportional flex grid (AntD-style)
- `Grid` / `GridItem` — native LVGL CSS Grid with FR(n) columns/rows

---

## 8. Input Components Over Raw LVGL

Prefer:

```tsx
<Slider label="Brightness" />
```

Over:

```tsx
<lvgl-slider />
<lvgl-label />
```

Input components combine label + input + theme styling.

---

## 9. Theme System

Themes are registered at compile time and switchable at runtime:

```tsx
import { ThemeProvider, darkTheme, lightTheme } from '@espcompose/ui';

<ThemeProvider themes={{ dark: darkTheme, light: lightTheme }} default="dark">
  <Screen>
    <Button
      label="Switch to Light"
      onPress={async () => { theme.select('light'); }}
    />
  </Screen>
</ThemeProvider>
```

Inside components, theme values are reactive:
```tsx
const thm = useTheme();
const bgColor = thm.colors.primary.bg;  // → ReactiveNode<lv_color_t>
```

Theme switching compiles to `theme_index.set(N); Scheduler::flush();` —
all downstream memos recalculate and widgets update.

---

## 10. Refs Are Required for Cross-Component References

Every component that will be referenced from actions must have a `useRef()`:

```tsx
const lightRef = useRef<Light>();

<light platform="homeassistant" ref={lightRef} entityId="light.kitchen" />

<Button onPress={async () => { lightRef.toggle(); }} />
```

Refs generate unique IDs (`r_<random>`) and are
collision-resistant. The compiler resolves them to ESPHome YAML IDs.

---

## 11. Formatting Must Be Compilable

Allowed (inside `useMemo()`):

```tsx
useMemo(() => `${sensor.value}°`)
useMemo(() => sensor.isOn ? "On" : "Off")
```

NOT allowed:

* Arbitrary JS logic inside useMemo
* Async operations
* Closures with external mutable state
* Import of external JS libraries

All reactive expressions compile to C++ via `ExprNode` → `exprToCpp()`.

---

# Available Hooks

| Hook | Purpose |
|------|---------|
| `useHAEntity(entityId)` | Bind to a Home Assistant entity; returns typed signal properties |
| `useMemo(fn)` | Derive a value from reactive sources |
| `useEffect(fn)` | Run side effects when reactive sources change |
| `useTheme()` | Access reactive theme token values |
| `useRef<T>()` | Create a typed cross-component reference |
| `useScript(fn)` | Define a named ESPHome script from an async arrow function |
| `useImage(path)` | Register an image asset |
| `useFont(config)` | Register a font asset |

---

# Available Components

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `Screen` | Root display container | `style` |
| `VStack` / `HStack` | Flexbox column/row | `gap`, `padding`, `style` |
| `Space` | Spacer element | `size`, `style` |
| `Row` / `Col` | Proportional flex grid | `span` (on Col), `style` |
| `Grid` / `GridItem` | CSS Grid layout | `columns`, `rows`, `gap`, `style` |
| `Text` | Typography component | `text`, `variant`, `color`, `style` |
| `Button` | Status-aware button | `text`, `status`, `size`, `onPress`, `style` |
| `Card` | Surface container | `style` |
| `Slider` | Slider with label | `label`, `value`, `onChange` |
| `Switch` | Toggle with label | `label`, `value`, `onChange` |
| `Dropdown` | Dropdown selector | `label`, `options`, `value`, `onChange` |
| `LightButton` | Binding-driven button | `binding`, `label`, `style` |
| `LightSwitch` | Binding-driven toggle | `binding`, `label` |
| `LightSlider` | Binding-driven slider | `binding`, `label` |
| `SensorText` | Binding-driven text | `binding`, `style` |

---

# What the AI Should Optimize For

When generating or modifying code:

### Prefer:

* Design system components (`<Card>`, `<Text>`, `<Button>`)
* Reactive hooks (`useMemo`, `useHAEntity`, `useTheme`)
* Design tokens over raw styles (`status="primary"` not `bgColor="#123456"`)
* Layout components (`VStack`, `HStack`, `Grid`)
* Input components (`Slider`, `Switch`, `Dropdown`)
* Binding-driven components (`LightButton`, `LightSwitch`, `LightSlider`, `SensorText`)
* Action tree syntax for trigger handlers (bare arrow functions)

### Avoid:

* React mental model (useState, useReducer, re-render)
* Dynamic tree mutation (conditional rendering with `&&`)
* CSS-like styling (there is no CSS)
* Complex inline logic in JSX attributes
* Unnecessary low-level LVGL usage when design system components suffice
* Old APIs (`device.script()`, `device.inline()`, `createLvglThemeProps()`)

---

# Example (Correct)

```tsx
import { useHAEntity, useMemo, useRef, secret } from '@espcompose/core';
import type { Light } from '@espcompose/core';
import { ThemeProvider, darkTheme, Screen, VStack, Card, Text, LightSlider, LightSwitch, SensorText } from '@espcompose/ui';

function App() {
  const light = useHAEntity('light.living_room');
  const sensor = useHAEntity('sensor.temperature');

  return (
    <esphome name="dashboard">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid={secret('wifi_ssid')} password={secret('wifi_password')} />
      <api />
      <ThemeProvider themes={{ dark: darkTheme }} default="dark">
        <lvgl>
          <lvgl-page>
            <Screen>
              <VStack gap="lg" padding="lg">
                <Card>
                  <Text variant="title" text="Living Room" />
                  <SensorText binding={sensor} />
                  <LightSlider binding={light} label="Brightness" />
                  <LightSwitch binding={light} label="Lamp" />
                </Card>
              </VStack>
            </Screen>
          </lvgl-page>
        </lvgl>
      </ThemeProvider>
    </esphome>
  );
}

export default <App />;
```

---

# Example (Incorrect)

```tsx
const [value, setValue] = useState(0);

return (
  <div>
    {value > 10 && <Text value={value} />}
  </div>
);
```

Invalid because:

* uses React state (`useState` doesn't exist for this purpose)
* conditional rendering (tree must be static)
* assumes re-rendering
* `<div>` is not an ESPHome/LVGL element

---

# Summary

> **espcompose is a declarative TSX compiler that produces a static LVGL widget tree with reactive C++ signal-driven updates via bindings to Home Assistant entities and theme tokens.**
