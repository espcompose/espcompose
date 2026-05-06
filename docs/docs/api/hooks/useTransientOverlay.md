---
sidebar_label: useTransientOverlay
sidebar_position: 11
---

# useTransientOverlay

A queue/slot mechanic primitive for transient overlay lifecycles — toasts, notifications, snackbars, and similar time-limited UI. Composes `useOverlay()` with internal lifecycle scripts to provide configurable queuing, slot allocation, and overflow behavior.

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
type TransientOverlayFactory<P = {}> = (
  ctrl: OverlayController,
  context: TransientOverlayContext & { payload: P },
) => EspComposeElement | EspComposeElement[];
```

The factory receives:
- `ctrl` — standard overlay controller with `show()`/`hide()` markers
- `context` — slot state for reactive positioning (e.g. `context.slotRank` for compacted stacking) plus `context.payload`, which exposes the user-declared payload fields typed by `P` (each field backed by a reactive global)

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

## Parameterized payload

Pass per-`show()` data to the factory by parameterizing the hook with a payload type. Fields on `ctx.payload` are backed by reactive globals, so referencing them inside JSX automatically wires up reactive updates:

```tsx
type ToastPayload = { msg: string };

const toast = useTransientOverlay<ToastPayload>(
  { zOrder: 100, autoHide: '3s' },
  (ctrl, ctx) => (
    <MyToast>
      <Text text={ctx.payload.msg} />
    </MyToast>
  ),
);

// Caller passes the payload at show time:
<Button text="Save" onPress={() => { toast.show({ msg: 'Saved!' }); }} />
```

## How it works

`useTransientOverlay()` always uses the same slot/coordinator model, including when `maxVisible` is `1`:

1. N overlays are pre-allocated via `useOverlay()` (`N = maxVisible`)
2. Each slot gets its own lifecycle scripts (`mode: restart`) for show, optional auto-hide, and hide
3. A coordinator show script dispatches to the first inactive slot
4. The coordinator's script mode implements overflow behavior:
  - `overflow: 'replace'` → script `mode: restart`
  - `overflow: 'queue'` → script `mode: queued` with `max_runs: queueLength`
  - `overflow: 'drop'` → script `mode: single`
5. Slot state is tracked via ESPHome globals: active flags, sequence numbers, and a sequence counter
6. A reactive `slotRank` memo computes each slot's visual position based on active slots with lower sequence numbers

## Rules

- Must be called inside a function component body
- `show()` and `hide()` can only be used inside trigger handlers or `useScript()` bodies
- When `maxVisible > 1`, the factory must produce a consistent widget structure across all slots
