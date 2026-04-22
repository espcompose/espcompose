---
sidebar_label: useScript
sidebar_position: 8
---

# useScript

Declares a named ESPHome script. The async function body is compiled at the AST level into an ESPHome action list — it is never executed at runtime in JavaScript.

## Signature

```typescript
import { useScript } from '@espcompose/core';

const script = useScript(fn: () => Promise<void>): ScriptHandle;
```

## ScriptHandle

The returned `ScriptHandle` is callable as a function and also exposes explicit methods:

| Pattern | Description |
|---------|-------------|
| `script()` | Fire-and-forget execution |
| `await script()` | Execute and wait for completion |
| `script.stop()` | Stop the script if running |
| `script.isRunning` | Whether the script is currently running (compile-time only) |
| `script.execute()` | Explicit fire-and-forget (same as `script()`) |

## Basic usage

```tsx
import { delay, logger, useRef, useScript } from '@espcompose/core';
import type { LightOutputRef, SwitchRef } from '@espcompose/core';

function App() {
  const lightRef = useRef<LightOutputRef>();
  const switchRef = useRef<SwitchRef>();

  const toggleAll = useScript(async () => {
    lightRef.toggle();
    await delay(200);
    switchRef.toggle();
  });

  const dimLight = useScript(async () => {
    lightRef.turnOn({ brightness: 0.5 });
    logger.log('Light dimmed to 50%');
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
        onPress={async () => { toggleAll(); }}
        onDoubleClick={async () => { dimLight(); }}
      />
    </esphome>
  );
}
```

## What you can use inside scripts

Scripts support the same action primitives as inline trigger handlers:

| Function | Description |
|----------|-------------|
| `await delay(ms)` | Pause execution for a duration |
| `await delay('1s')` | Pause with string duration |
| `logger.log(message, level?)` | Log a message |
| `ref.toggle()` | Toggle a light/switch ref |
| `ref.turnOn(opts?)` | Turn on a light/switch ref |
| `ref.turnOff(opts?)` | Turn off a light/switch ref |
| `global.set(value)` | Set a global variable |
| `await otherScript()` | Call another script |

## Calling scripts

Scripts can be invoked from trigger handlers or other scripts:

```tsx
// Fire-and-forget — idiomatic, no await needed
toggleAll();

// Execute and wait for completion
await toggleAll();

// Stop a running script
toggleAll.stop();

// Explicit fire-and-forget (equivalent to toggleAll())
toggleAll.execute();
```

## Rules

- Must be called inside a function component body
- The function body is compiled at the AST level — standard JavaScript constructs like `if`/`else`, loops, and `await` are supported
- The function is never executed at runtime in Node.js
