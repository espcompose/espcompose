---
sidebar_label: useHAEntity
sidebar_position: 2
---

# useHAEntity

Creates a typed binding to a Home Assistant entity. The binding provides reactive state properties for automatic UI updates and action methods for entity control.

## Signature

```typescript
import { useHAEntity } from '@espcompose/core';

// Domain is inferred from the entity ID prefix:
const light = useHAEntity('light.kitchen_floods');    // → LightBinding
const sensor = useHAEntity('sensor.temperature');      // → SensorBinding
const binary = useHAEntity('binary_sensor.motion');    // → BinarySensorBinding
const sw = useHAEntity('switch.relay');                // → SwitchBinding
const fan = useHAEntity('fan.ceiling');                // → FanBinding
const cover = useHAEntity('cover.garage');             // → CoverBinding

// Explicit domain override:
const entity = useHAEntity('my_entity', { domain: 'light' }); // → LightBinding
```

## Reactive state properties

Each binding type exposes reactive properties that automatically update when the entity state changes in Home Assistant:

```tsx
const light = useHAEntity('light.kitchen_floods');

// Reactive properties (IRReactiveNode<T>):
light.isOn       // boolean — whether the entity is "on"
light.stateText  // string — raw HA state text ("on", "off", "23.5", etc.)
```

Use these properties directly in widget props or inside `useMemo()` for derived values:

```tsx
<Text text={light.stateText} />
<Text text={useMemo(() => light.isOn ? 'On' : 'Off')} />
```

## Action methods

Binding objects expose action methods you can call from trigger handlers and scripts:

```tsx
// Light actions
light.toggle();
light.turnOn({ brightness: 0.8 });
light.turnOff();

// Switch actions
sw.toggle();
sw.turnOn();
sw.turnOff();
```

## Full example

```tsx
import { DisplayRef, useRef, useHAEntity } from '@espcompose/core';
import { Screen, VStack, Text, Button, UITheme } from '@espcompose/ui';

function App() {
  const displayRef = useRef<DisplayRef>();
  const kitchenLight = useHAEntity('light.kitchen_floods');
  const tempSensor = useHAEntity('sensor.living_room_temperature');

  return (
    <esphome name="ha-panel">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid="HomeWifi" password="secret" />
      <api />
      <logger />

      {/* ... display setup ... */}

      <lvgl displays={[displayRef]}>
        <UITheme.Provider>
          <Screen>
            <VStack>
              <Text variant="title" text="Kitchen" />
              <Text text={kitchenLight.stateText} />
              <Text text={tempSensor.stateText} />
              <Button
                text="Toggle Light"
                onPress={() => { kitchenLight.toggle(); }}
              />
            </VStack>
          </Screen>
        </UITheme.Provider>
      </lvgl>
    </esphome>
  );
}
```

## Supported domains

| Domain | Binding type | State properties | Actions |
|--------|-------------|------------------|---------|
| `light.*` | `LightBinding` | `isOn`, `stateText` | `toggle()`, `turnOn(opts?)`, `turnOff()` |
| `sensor.*` | `SensorBinding` | `stateText` | — |
| `binary_sensor.*` | `BinarySensorBinding` | `isOn`, `stateText` | — |
| `switch.*` | `SwitchBinding` | `isOn`, `stateText` | `toggle()`, `turnOn()`, `turnOff()` |
| `fan.*` | `FanBinding` | `isOn`, `stateText` | `toggle()`, `turnOn()`, `turnOff()` |
| `cover.*` | `CoverBinding` | `stateText` | `open()`, `close()`, `stop()` |

## Deduplication

Multiple calls with the same entity ID return the same cached binding. This means you can call `useHAEntity('light.kitchen')` in different components and they'll share the same underlying connection.

## Rules

- Must be called inside a function component body
- The entity ID prefix determines the binding type (or use the `domain` option to override)
