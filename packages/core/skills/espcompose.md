# ESPCompose Core Skill

Use when generating ESPCompose device code with `@espcompose/core`.
Covers JSX device configs, hooks, refs, reactive expressions, scripts,
triggers, action primitives, HA entity bindings, and secrets.

For theme/style system (`createTheme`, `handle.use()`, LVGL widget styling),
see the **espcompose-styling** skill instead.

---

## Device Config Skeleton

Every device renders an `<esphome>` root with platform and infrastructure children.
Export a JSX element (or `<App />` from a function component) as the default export.

```tsx
export default (
  <esphome name="my-device" comment="Description">
    <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
    <wifi ssid="MyNetwork" password={secret('wifi_password')} />
    <api />
    <ota platform="esphome" />
    <logger level="DEBUG" />
  </esphome>
);
```

When the device needs hooks or refs, use a function component:

```tsx
function App() {
  const lightRef = useRef<LightOutputRef>();
  return (
    <esphome name="my-device">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <light ref={lightRef} platform="monochromatic" name="Desk Light" />
    </esphome>
  );
}
export default <App />;
```

---

## Hooks

All hooks must be called inside a function component body (render pass).

### `useRef<T>()`

Creates a typed component reference. `T` is a marker type from generated components.

```tsx
const lightRef = useRef<LightOutputRef>();
const sensorRef = useRef<InternalTemperatureSensorRef>();
```

Refs provide **reactive properties** (auto-tracked `Signal<T>`) and **action methods**
depending on the entity domain (see tables below).

### `useScript(fn)`

Declares a named ESPHome script. Body is an async arrow function compiled to an action
tree at build time — **never executed at runtime**.

```tsx
const dimLight = useScript(async () => {
  lightRef.turnOn({ brightness: 0.5 });
  logger.log('Light dimmed to 50%');
});
```

Returns a `ScriptHandle` with three call forms:

| Form | Behavior | ESPHome equivalent |
|------|----------|--------------------|
| `await myScript()` | Execute + wait for completion | `script.execute` + `script.wait` |
| `myScript.execute()` | Fire-and-forget | `script.execute` |
| `myScript.stop()` | Stop if running | `script.stop` |

### `useMemo(fn)`

Memoized derived reactive value with auto-dependency tracking.

```tsx
const status = useMemo(() => light.isOn ? 'ON' : 'OFF');
```

Dependencies are tracked automatically — access any reactive property inside
the factory and the memo re-evaluates when it changes.

### `useHAEntity(entityId)`

Binds a Home Assistant entity. Returns a typed binding with reactive properties
and action methods based on the entity domain.

```tsx
const kitchenLight = useHAEntity('light.kitchen_floods');
// kitchenLight.isOn       → Signal<boolean>
// kitchenLight.stateText  → Signal<string>
// kitchenLight.toggle()   → HA action
```

Multiple calls with the same `entityId` in one render pass return the same
cached binding (deduplication).

### `useImage(path)` / `useFont(path)`

Import and register image/font assets. Returns a ref to use in style props.

```tsx
const icon = useImage('./assets/icon.png');
const roboto = useFont('./assets/Roboto.ttf');
```

---

## Entity Domains

Reactive properties and actions available on refs and HA entity bindings.

| Domain | Reactive Properties | Actions |
|--------|-------------------|---------|
| `light` | `.isOn: bool`, `.brightness: float`, `.stateText: string` | `toggle()`, `turnOn({brightness?})`, `turnOff()` |
| `switch` | `.isOn: bool` | `toggle()`, `turnOn()`, `turnOff()` |
| `sensor` | `.value: float`, `.stateText: string` | *(read-only)* |
| `binary_sensor` | `.isOn: bool`, `.stateText: string` | *(read-only)* |
| `fan` | `.isOn: bool` | `toggle()`, `turnOn()`, `turnOff()` |
| `cover` | `.isOpen: float` | `open()`, `close()`, `stop()` |
| `number` | `.value: float` | *(read-only)* |
| `select` | `.stateText: string` | *(read-only)* |
| `text_sensor` | `.stateText: string` | *(read-only)* |
| `lock` | `.isOn: bool` | `lock()`, `unlock()` |
| `button` | *(none)* | `press()` |

---

## Common Ref Types

| Category | Types |
|----------|-------|
| Entity | `LightOutputRef`, `LightStateRef`, `SwitchRef`, `SensorRef`, `BinarySensorRef`, `FanRef`, `CoverRef`, `LockRef`, `NumberRef`, `SelectRef`, `ButtonRef` |
| Output | `FloatOutputRef`, `BinaryOutputRef`, `LEDCOutputRef` |
| Display/UI | `DisplayRef`, `TouchscreenRef`, `FontRef`, `ImageRef`, `LvglComponentRef` |
| Bus | `I2CBusRef`, `SPIComponentRef`, `UARTComponentRef` |
| Other | `GPIOSwitchRef`, `InternalTemperatureSensorRef`, `IntervalTriggerRef`, `ScriptRef`, `StepperRef` |

All ref types are importable from `@espcompose/core`.

---

## Triggers & Action Primitives

Trigger handlers are arrow functions on `on*` props. Use `async` for `await`.

```tsx
<binary_sensor
  platform="gpio"
  pin={4}
  name="Button"
  onPress={async () => {
    lightRef.toggle();
    await delay(200);
    switchRef.toggle();
  }}
  onRelease={() => { lightRef.turnOff(); }}
/>
```

### Action Primitives

| Primitive | Syntax | ESPHome YAML |
|-----------|--------|-------------|
| Delay | `await delay(500)` or `await delay('1s')` | `delay: 500ms` / `delay: 1s` |
| Log | `logger.log('msg')` or `logger.log('msg', 'WARN')` | `logger.log:` |
| Wait | `await waitUntil(() => sensor.value > 30, { timeout: '10s' })` | `wait_until:` |
| Ref action | `lightRef.toggle()`, `switchRef.turnOn()` | Component action YAML |
| HA action | `entity.toggle()`, `entity.turnOn()` | `homeassistant.action:` |
| Script call | `await myScript()`, `myScript.execute()`, `myScript.stop()` | `script.execute` / `script.wait` / `script.stop` |
| Theme switch | `MyTheme.select('dark')` | Internal lambda |
| Control flow | `if`/`else`, `while`, `for` | Native ESPHome action blocks |

Action primitives and ref actions are **compile-time AST markers** — the functions
are no-ops at runtime. The action tree compiler recognizes them by name.

---

## Reactive Expressions

Reactive values (`Signal<T>`) are produced by accessing properties on refs and
HA entity bindings. They are auto-tracked in these contexts:

- **JSX attribute position** — direct binding: `<lvgl-label text={tempRef.value} />`
- **`useMemo()` body** — derived value with auto-dependency tracking
- **`createStyles()` factory** — theme-reactive styles (see styling skill)

```tsx
// Direct reactive binding in JSX
<lvgl-label text={sensorRef.value} />

// Derived value via useMemo
const label = useMemo(() => heater.isOn ? 'ON' : 'OFF');
<lvgl-label text={label} />
```

Reactive expressions must be **side-effect free**. For side-effects, use trigger
handlers or scripts.

---

## Secrets

Use `secret()` to emit `!secret` references in YAML output. The actual value is
written to a separate `secrets.yaml` file.

```tsx
import { secret } from '@espcompose/core';

<wifi ssid="MyNetwork" password={secret('wifi_password')} />
```

---

## Gotchas

- **Script/trigger bodies are compile-time only.** The async arrow functions in
  `useScript()` and `on*` handlers are parsed as AST — they never execute at runtime.
  Only use recognized action primitives and ref/entity actions inside them.
- **Declare refs before JSX that uses them.** `useRef()` calls must precede the
  JSX element that receives the ref.
- **Trigger handlers must be arrow functions.** No class methods, no `function` keyword.
- **Reactive tracking requires direct property access.** Destructuring a reactive
  property into a local variable loses tracking. Access via `ref.property` in JSX.
- **HA entity bindings are deduplicated.** Multiple `useHAEntity('light.kitchen')`
  calls return the same binding instance per render pass.
- **`waitUntil` is only available from `@espcompose/core/internals`.**
  `delay` and `logger` are top-level exports from `@espcompose/core`.
- **Default export is required.** The entry file must `export default` a JSX element.
