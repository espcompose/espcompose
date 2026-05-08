---
sidebar_label: useVisibility
sidebar_position: 10
---

# useVisibility

Wraps an overlay controller or LVGL widget ref with a script-backed show/hide lifecycle. When `autoHide` is configured, the show script automatically sequences: show → delay → hide.

This is a composition primitive for direct overlay or widget visibility lifecycles. Transient overlays use the same internal lifecycle helpers together with their own slot/coordinator orchestration.

## Signature

```typescript
import { useVisibility } from '@espcompose/core';

const ctrl = useVisibility(target, opts?): VisibilityController;
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `target` | `OverlayController \| Ref<lv_obj_t>` | The overlay controller or LVGL widget ref to manage visibility for. |
| `opts` | `VisibilityOptions` | Optional configuration for auto-hide and script mode. |

### VisibilityOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `autoHide` | `string \| number \| false` | `false` | Duration before auto-hide. String (e.g. `'3s'`), number (ms), or `false` to disable. |
| `scriptMode` | `'restart' \| 'queued' \| 'single'` | `'restart'` | ESPHome script execution mode for the show lifecycle. |
| `maxRuns` | `number` | — | Maximum concurrent runs. Only used with `mode: 'queued'`. |

### VisibilityController

| Method | Description |
|--------|-------------|
| `show()` | Start the show lifecycle script. If `autoHide` is set, hides after the delay. |
| `hide()` | Stop the lifecycle script and hide immediately. |

## Basic usage with overlay

```tsx
import { useOverlay, useVisibility } from '@espcompose/core';
import { Toast, Text, Button } from '@espcompose/ui';

const NotifyButton = createLvglWidget(() => {
  const overlay = useOverlay({ zOrder: 100 }, (ctrl) => (
    <Toast><Text text="Hello!" /></Toast>
  ));

  const vis = useVisibility(overlay, { autoHide: '3s' });

  return <Button text="Show" onPress={() => { vis.show(); }} />;
});
```

## Usage with widget ref

```tsx
import { useRef, useVisibility } from '@espcompose/core';
import { Label, Button } from '@espcompose/ui';

const FlashLabel = createLvglWidget(() => {
  const ref = useRef();
  const vis = useVisibility(ref, { autoHide: '2s' });

  return (
    <>
      <Label ref={ref} text="Temporary!" hidden />
      <Button text="Flash" onPress={() => { vis.show(); }} />
    </>
  );
});
```

## Script modes

The `scriptMode` option maps directly to ESPHome script execution modes:

| Mode | Behavior |
|------|----------|
| `'restart'` | Re-triggering restarts the auto-hide timer (default) |
| `'queued'` | Multiple show calls queue up and play sequentially |
| `'single'` | Additional show calls are ignored while active |

## How it works

1. Creates synthetic ESPHome scripts for the show and hide actions
2. The show script sequences: show target → delay (if `autoHide`) → hide target
3. The hide script stops the show script and hides the target immediately
4. Wraps both scripts in a `useController()` to expose `show()`/`hide()` as trigger-safe methods

## Rules

- Must be called inside a function component body
- `show()` and `hide()` can only be used inside trigger handlers or `useScript()` bodies
