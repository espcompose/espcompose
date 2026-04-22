---
sidebar_label: useGlobal
sidebar_position: 3
---

# useGlobal

Declares a volatile (RAM-based) ESPHome global variable. Supports both scalar values and arrays. The value is lost on reboot — use [useRetainedGlobal](./useRetainedGlobal.md) for flash-persistent storage.

## Signature

```typescript
import { useGlobal } from '@espcompose/core';

// Scalar globals
const flag = useGlobal('boolean');                         // → GlobalHandle<boolean>
const count = useGlobal('integer', { initialValue: 0 });   // → GlobalHandle<number>
const temp = useGlobal('float', { initialValue: 3.14 });   // → GlobalHandle<number>
const name = useGlobal('string');                           // → GlobalHandle<string>

// Array globals
const scores = useGlobal('integer[]');   // → GlobalArrayHandle<number>
const names = useGlobal('string[]');     // → GlobalArrayHandle<string>
```

## Type tokens

| Token | C++ type | TypeScript type |
|-------|----------|----------------|
| `'boolean'` | `bool` | `boolean` |
| `'integer'` | `int` | `number` |
| `'float'` | `float` | `number` |
| `'string'` | `std::string` | `string` |
| `'boolean[]'` | `std::vector<bool>` | `boolean[]` |
| `'integer[]'` | `std::vector<int>` | `number[]` |
| `'float[]'` | `std::vector<float>` | `number[]` |
| `'string[]'` | `std::vector<std::string>` | `string[]` |

## Scalar globals

A scalar `GlobalHandle<T>` provides:

- **`.value`** — reactive read (use inside `useMemo()` or widget props)
- **`.set(v)`** — update the value (use inside trigger handlers or scripts)

```tsx
import { useGlobal, useMemo } from '@espcompose/core';
import { Screen, VStack, Text, Button, UITheme } from '@espcompose/ui';

function App() {
  const counter = useGlobal('integer', { initialValue: 0 });
  const counterText = useMemo(() => `Count: ${counter.value}`);

  return (
    <lvgl displays={[displayRef]}>
      <UITheme.Provider>
        <Screen>
          <VStack>
            <Text text={counterText} />
            <Button
              text="Increment"
              onPress={() => { counter.set(counter.value + 1); }}
            />
          </VStack>
        </Screen>
      </UITheme.Provider>
    </lvgl>
  );
}
```

## Array globals

An array `GlobalArrayHandle<T>` provides:

- **`.length`** — reactive length signal
- **`.value`** — reactive array signal
- **`.push(v)`** — append an element
- **`.set(index, v)`** — set element at index
- **`.clear()`** — remove all elements

```tsx
import { useGlobal, useMemo, logger } from '@espcompose/core';

function App() {
  const scores = useGlobal('integer[]');
  const countText = useMemo(() => `Items: ${scores.length}`);

  return (
    <lvgl displays={[displayRef]}>
      <lvgl-page>
        <lvgl-label text={countText} />
      </lvgl-page>

      <binary_sensor
        platform="gpio"
        pin={4}
        name="Push"
        onPress={async () => {
          scores.push(100);
          logger.log('Pushed 100');
        }}
      />
      <binary_sensor
        platform="gpio"
        pin={15}
        name="Set"
        onPress={async () => {
          scores.set(0, 42);
          logger.log('Set index 0 to 42');
        }}
      />
      <binary_sensor
        platform="gpio"
        pin={16}
        name="Clear"
        onPress={async () => {
          scores.clear();
          logger.log('Cleared array');
        }}
      />
    </lvgl>
  );
}
```

## Options

| Option | Type | Description |
|--------|------|-------------|
| `initialValue` | `T` | Initial value for scalar globals (default: type's zero value) |

## Rules

- Must be called inside a function component body
- Array globals are volatile only — no retained (flash) array support
- Values are lost on reboot; use [useRetainedGlobal](./useRetainedGlobal.md) for persistence
