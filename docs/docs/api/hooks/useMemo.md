---
sidebar_label: useMemo
sidebar_position: 7
---

# useMemo

Creates a memoized derived value from one or more reactive sources. The compiler transforms `useMemo()` calls into C++ reactive nodes that automatically update when their dependencies change.

## Signature

```typescript
import { useMemo } from '@espcompose/core';

const derived = useMemo<T>(fn: () => T): T;
```

The function `fn` is analyzed at compile time. Any reactive values accessed inside (global `.value`, entity state, etc.) are tracked as dependencies. The resulting value updates automatically whenever any dependency changes.

## Basic usage

### Formatting text from a global

```tsx
import { useGlobal, useMemo } from '@espcompose/core';

const counter = useGlobal('integer', { initialValue: 0 });
const counterText = useMemo(() => `Count: ${counter.value}`);

<Text text={counterText} />
```

### Conditional values from HA entities

```tsx
import { useHAEntity, useMemo } from '@espcompose/core';

const light = useHAEntity('light.office');
const statusText = useMemo(() => light.isOn ? 'On' : 'Off');

<Text text={statusText} />
```

### Combining multiple sources

```tsx
const temp = useHAEntity('sensor.temperature');
const threshold = useGlobal('float', { initialValue: 25.0 });

const alert = useMemo(() => {
  return parseFloat(temp.stateText) > threshold.value ? 'HOT' : 'OK';
});

<Text text={alert} />
```

## Passing to widget props

`useMemo()` results can be passed directly to any widget prop that accepts reactive values:

```tsx
const scores = useGlobal('integer[]');
const countText = useMemo(() => `Items: ${scores.length}`);

// Direct prop binding — updates automatically
<lvgl-label text={countText} />
<Text text={countText} />
```

## How it works

At compile time, the ESPCompose reactive transformer:

1. Detects `useMemo()` calls in your source
2. Analyzes the function body for reactive dependencies (`.value`, `.isOn`, `.stateText`, `.length`, etc.)
3. Generates a C++ `Memo<T>` node in the signal graph
4. The memo recomputes only when its dependencies change

You write plain JavaScript expressions — the compiler does the rest.

## Rules

- Must be called inside a function component body
- The function should be a pure expression — no side effects
- All reactive dependencies must be accessed synchronously (no `await` or callbacks inside)
