---
sidebar_label: useTransientOverlay
sidebar_position: 11
---

# useTransientOverlay

A queue/slot mechanic primitive for transient overlay lifecycles — toasts, notifications, snackbars, and similar time-limited UI. Composes `useOverlay()` + `useVisibility()` to provide configurable queuing, slot allocation, and overflow behavior.

Any UI library can build toast/notification overlays on top of this hook without reinventing queue mechanics. For most toast use cases, prefer the higher-level [`useToast()`](./useToast.md) from `@espcompose/ui`.

## Signature

```typescript
import { useTransientOverlay } from '@espcompose/core';

const ctrl = useTransientOverlay(config, factory): TransientOverlayController;
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `config` | `TransientOverlayConfig` | Configuration for queue behavior, slot count, and auto-hide. |
| `factory` | `TransientOverlayFactory` | Render callback that receives a controller and slot context. |

### TransientOverlayConfig

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `zOrder` | `number` | `0` | Numeric z-order tier. Higher values render above lower values. |
| `maxVisible` | `number` | `1` | Maximum overlays visible simultaneously. When `> 1`, N independent overlay slots are pre-allocated. |
| `autoHide` | `string \| number \| false` | `false` | Duration before auto-hide. String (e.g. `'3s'`), number (milliseconds), or `false` to disable. |
| `overflow` | `'replace' \| 'queue' \| 'drop'` | `'replace'` | Behavior when `show()` is called while at capacity. |
| `queueLength` | `number` | `1` | Maximum queued requests. Only used when `overflow` is `'queue'`. |

### Overflow policies

| Policy | Single-slot behavior | Multi-slot behavior |
|--------|---------------------|---------------------|
| `'replace'` | Replaces the current overlay (resets auto-hide timer) | Round-robin replaces the oldest slot |
| `'queue'` | Queues request; plays after current overlay hides | Queues request; dispatches when a slot frees up |
| `'drop'` | Silently ignores the request while active | Silently ignores while all slots are active |

### TransientOverlayFactory

```typescript
type TransientOverlayFactory = (
  ctrl: OverlayController,
  context: TransientOverlayContext,
) => EspComposeElement | EspComposeElement[];
```

The factory receives:
- `ctrl` — standard overlay controller with `show()`/`hide()` markers
- `context` — slot state for reactive positioning (e.g. `slotRank` for compacted stacking)

### TransientOverlayController

Returns a `VisibilityController` with script-backed `show()` and `hide()` methods. The queue/overflow behavior is transparent to callers.

| Method | Description |
|--------|-------------|
| `show()` | Trigger the show lifecycle. Respects overflow policy and auto-hide. |
| `hide()` | Stop the lifecycle script and hide the overlay immediately. |

## Basic usage

```tsx
import { useTransientOverlay } from '@espcompose/core';
import { Text } from '@espcompose/ui';

const NotificationBar = createLvglWidget(() => {
  const notification = useTransientOverlay(
    { zOrder: 50, autoHide: '5s' },
    (ctrl) => (
      <Text text="Something happened!" />
    ),
  );

  return <Button text="Notify" onPress={() => { notification.show(); }} />;
});
```

## Multi-slot with compacted stacking

When `maxVisible > 1`, multiple overlays can be shown simultaneously. The factory's `context.slotRank` provides the visual position for compacted stacking (no gaps when intermediate slots dismiss):

```tsx
const toast = useTransientOverlay(
  { zOrder: 100, maxVisible: 3, autoHide: '3s' },
  (ctrl, ctx) => (
    <MyToastContainer bottomOffset={ctx.slotRank * 60}>
      <Text text="Notification!" />
    </MyToastContainer>
  ),
);
```

## Queue overflow

Queue multiple show requests that play sequentially:

```tsx
const queued = useTransientOverlay(
  { zOrder: 100, autoHide: '2s', overflow: 'queue', queueLength: 5 },
  (ctrl) => <Text text="Queued message" />,
);

// Each show() call queues; up to 5 pending requests
<Button text="Show" onPress={() => { queued.show(); }} />
```

## How it works

**Single-slot** (`maxVisible: 1`):
1. One overlay is created via `useOverlay()`
2. A visibility controller wraps it with the chosen script mode:
   - `overflow: 'replace'` → script `mode: restart`
   - `overflow: 'queue'` → script `mode: queued` with `max_runs: queueLength`
   - `overflow: 'drop'` → script `mode: single`
3. When `autoHide` is set, the show script sequences: show → delay → hide

**Multi-slot** (`maxVisible > 1`):
1. N overlays are pre-allocated, each with its own auto-hide script (`mode: restart`)
2. A coordinator show script dispatches to the next free slot using round-robin allocation
3. Slot state is tracked via ESPHome globals: active flags, sequence numbers, and a sequence counter
4. A reactive `slotRank` memo computes each slot's visual position based on active slots with lower sequence numbers

## Rules

- Must be called inside a function component body
- `show()` and `hide()` can only be used inside trigger handlers or `useScript()` bodies
- When `maxVisible > 1`, the factory must produce a consistent widget structure across all slots
