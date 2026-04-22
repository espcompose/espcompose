---
sidebar_label: useRetainedGlobal
sidebar_position: 4
---

# useRetainedGlobal

Declares a flash-persistent ESPHome global variable that survives reboots and power cycles. Values are stored in flash memory using a unique key.

## Signature

```typescript
import { useRetainedGlobal } from '@espcompose/core';

const handle = useRetainedGlobal<TK>(type, key, opts?): GlobalHandle<T>;
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | `'boolean' \| 'integer' \| 'float' \| 'string'` | The scalar type of the global |
| `key` | `string` | Unique key identifying the flash storage slot. Same key = same slot across firmware updates |
| `opts?` | `RetainedGlobalOptions` | Optional configuration |

**Options:**

| Option | Type | Description |
|--------|------|-------------|
| `initialValue` | `T` | Initial value before first write |
| `maxRestoreDataLength` | `number` | Maximum stored string length (strings only) |

## Basic usage

```tsx
import { useRetainedGlobal, useMemo } from '@espcompose/core';

function App() {
  const counter = useRetainedGlobal('integer', 'my-counter', { initialValue: 0 });
  const counterText = useMemo(() => `Count: ${counter.value}`);

  return (
    <lvgl displays={[displayRef]}>
      <lvgl-page>
        <lvgl-label text={counterText} />
      </lvgl-page>

      <binary_sensor
        platform="gpio"
        pin={4}
        name="Button"
        onPress={async () => {
          counter.set(counter.value + 1);
        }}
      />
    </lvgl>
  );
}
```

The counter value persists across reboots. Each time the button is pressed, the value is incremented and saved to flash.

## GlobalHandle API

The returned `GlobalHandle<T>` is the same interface as scalar [useGlobal](./useGlobal.md):

- **`.value`** — reactive read (use inside `useMemo()` or widget props)
- **`.set(v)`** — update the value and persist to flash

## String globals

For string globals, set `maxRestoreDataLength` to define the maximum stored string length:

```tsx
const deviceName = useRetainedGlobal('string', 'device-name', {
  maxRestoreDataLength: 32,
});
```

## Key uniqueness

The `key` parameter is a positional string literal that maps to a flash storage slot. Two globals with the same key share the same flash slot — this is intentional for sharing state, but accidental key collisions will cause data corruption. Use descriptive, unique keys.

## When to use

| Scenario | Hook |
|----------|------|
| Temporary runtime state (counters, flags) | [useGlobal](./useGlobal.md) |
| State that must survive reboots (settings, calibration) | `useRetainedGlobal` |

## Rules

- Must be called inside a function component body
- Scalar types only — no array support (use [useGlobal](./useGlobal.md) for arrays)
- Keys should be unique across the entire device configuration
