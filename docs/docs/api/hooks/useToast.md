---
sidebar_label: useToast
sidebar_position: 12
---

# useToast

Declares a toast overlay with auto-hide, queue support, and compacted multi-slot stacking. Toasts render at z-order tier 100 (above popups, below system-critical overlays).

Content is automatically wrapped in a themed `<Toast>` container — you provide only the inner content. For custom toast visuals or non-toast transient overlays, use [`useTransientOverlay()`](./useTransientOverlay.md) directly.

## Signature

```typescript
import { useToast } from '@espcompose/ui';

const ctrl = useToast(factory, opts?): ToastController;
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `factory` | `(ctrl: OverlayController) => EspComposeElement` | Render callback for the toast content. The `<Toast>` wrapper is added automatically. |
| `opts` | `ToastOptions` | Optional configuration for auto-hide, queue, and multi-slot behavior. |

### ToastOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `autoHide` | `string \| number \| false` | `'3s'` | Duration before auto-hide. String (e.g. `'3s'`), number (ms), or `false` to disable. |
| `maxVisible` | `number` | `1` | Maximum toasts visible simultaneously. Active toasts compact downward with no gaps. |
| `overflow` | `'replace' \| 'queue' \| 'drop'` | `'replace'` | Behavior when `show()` is called while at capacity. |
| `queueLength` | `number` | `1` | Maximum queued show requests. Only applies when `overflow` is `'queue'`. |

### ToastController

Returns a `VisibilityController` — a script-backed controller with lifecycle management.

| Method | Description |
|--------|-------------|
| `show()` | Show the toast. Triggers auto-hide countdown if configured. Respects overflow policy. |
| `hide()` | Hide the toast immediately and stop the auto-hide script. |

## Basic usage

```tsx
import { useToast } from '@espcompose/ui';
import { Button, Text } from '@espcompose/ui';

const SaveButton = createLvglWidget(() => {
  const toast = useToast(() => <Text text="Saved!" />);

  return <Button text="Save" onPress={() => { toast.show(); }} />;
});
```

The toast auto-hides after 3 seconds by default.

## Custom auto-hide duration

```tsx
// Hide after 5 seconds
const toast = useToast(() => <Text text="Processing..." />, { autoHide: '5s' });

// Hide after 500ms
const toast = useToast(() => <Text text="Done" />, { autoHide: 500 });

// No auto-hide — manual dismiss only
const toast = useToast(
  (ctrl) => (
    <>
      <Text text="Action required" />
      <Button text="Dismiss" onPress={() => { ctrl.hide(); }} />
    </>
  ),
  { autoHide: false },
);
```

## Queue overflow

Queue up multiple toast notifications that play sequentially:

```tsx
const toast = useToast(() => <Text text="New message!" />, {
  overflow: 'queue',
  queueLength: 5,
});

// Each press queues a toast; they play one after another
<Button text="Notify" onPress={() => { toast.show(); }} />
```

## Multi-slot toasts

Show multiple toasts simultaneously with compacted stacking:

```tsx
const toast = useToast(() => <Text text="Stacked!" />, { maxVisible: 3 });
```

When `maxVisible > 1`, active toasts are compacted downward so there are no visual gaps when intermediate toasts dismiss. The vertical offset per slot is 60px.

## Multi-slot with queue

Combine multiple visible slots with queue overflow for high-volume notifications:

```tsx
const toast = useToast(() => <Text text="Queued stack!" />, {
  maxVisible: 3,
  overflow: 'queue',
  queueLength: 10,
});
```

## How it works

`useToast()` delegates to [`useTransientOverlay()`](./useTransientOverlay.md) from `@espcompose/core`:
- Sets z-order to `100` (above popups)
- Wraps user content in a `<Toast>` container component
- For multi-slot toasts, positions each slot using `slotRank * 60px` vertical offset
- Defaults `autoHide` to `'3s'` (vs. `useTransientOverlay`'s default of `false`)

## Rules

- Must be called inside a function component body (created with `createLvglWidget`)
- `show()` and `hide()` can only be used inside trigger handlers (`onPress`, `onChange`, etc.) or `useScript()` bodies
- The factory must return consistent widget structure across all invocations
