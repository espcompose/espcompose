---
sidebar_label: useOverlay
sidebar_position: 9
---

# useOverlay

Declares a shared overlay whose widget subtree is automatically deduplicated across all instances of the calling component. When multiple instances use the same overlay, only one set of LVGL widgets is created — the compiler generates mux signals to dispatch instance-specific data at runtime.

Overlays are rendered in the LVGL `top_layer` and organized into **z-order tiers**. Overlays with a higher `zOrder` always render above those with a lower value; within the same tier, the most recently shown overlay appears on top.

## Signature

```typescript
import { useOverlay } from '@espcompose/core';

const ctrl = useOverlay(config: OverlayConfig, factory: OverlayFactory): OverlayController;
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `config` | `OverlayConfig` | Configuration object. Currently accepts `zOrder` (default `0`). |
| `factory` | `(ctrl: OverlayController) => EspComposeElement` | Render callback that receives a controller and returns JSX content for the overlay. Evaluated once per component instance to capture each instance's unique closures (entity bindings, action handlers, memos). |

### OverlayConfig

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `zOrder` | `number` | `0` | Numeric tier for z-ordering. Higher values render above lower values. |

### OverlayController

The returned controller exposes two methods — both are compile-time markers that the action compiler lowers into LVGL show/hide actions:

| Method | Description |
|--------|-------------|
| `show()` | Show this instance's overlay. Sets the mux index and unhides the shared widgets. |
| `hide()` | Hide the overlay. Safe to call from any trigger handler. |

## Basic usage

```tsx
import { useOverlay, useHAEntity, createLvglWidget } from '@espcompose/core';
import { Button, Text, Popup } from '@espcompose/ui';

const LightButton = createLvglWidget(
  ({ entityId, label }: { entityId: string; label: string }) => {
    const entity = useHAEntity(entityId, { domain: 'light' });

    const overlay = useOverlay({ zOrder: 0 }, (ctrl) => (
      <Popup onBackdropPress={() => { ctrl.hide(); }}>
        <Text variant="title" text={label} />
        <Text text={entity.stateText} />
        <Button text="Toggle" onPress={() => { entity.toggle(); }} />
        <Button text="Close" onPress={() => { ctrl.hide(); }} />
      </Popup>
    ));

    return (
      <Button text={label} onPress={() => { overlay.show(); }} />
    );
  },
);
```

Every instance of `LightButton` shares a single set of overlay widgets in the LVGL `top_layer`. When an instance calls `overlay.show()`, the mux signal selects that instance's entity and label values.

## Multiple instances

The main strength of `useOverlay()` is deduplication. Define one overlay in a component and render many instances — only one set of widgets is created:

```tsx
function App() {
  return (
    <Screen>
      <VStack gap="md">
        <LightButton entityId="light.bedroom" label="Bedroom" />
        <LightButton entityId="light.kitchen" label="Kitchen" />
        <LightButton entityId="light.office" label="Office" />
      </VStack>
    </Screen>
  );
}
```

All three buttons open the same overlay structure, but the content updates to show the correct entity state and label for whichever button was pressed.

## Multiple overlays in one component

You can call `useOverlay()` more than once in the same component. Each call produces a separate overlay definition with its own template key:

```tsx
const DeviceControl = createLvglWidget(({ entity }) => {
  const infoOverlay = useOverlay({ zOrder: 0 }, (ctrl) => (
    <Popup onBackdropPress={() => { ctrl.hide(); }}>
      <Text text={entity.stateText} />
      <Button text="Close" onPress={() => { ctrl.hide(); }} />
    </Popup>
  ));

  const confirmOverlay = useOverlay({ zOrder: 0 }, (ctrl) => (
    <Popup onBackdropPress={() => { ctrl.hide(); }}>
      <Text text="Are you sure?" />
      <Button text="Yes" onPress={() => { entity.toggle(); ctrl.hide(); }} />
      <Button text="Cancel" onPress={() => { ctrl.hide(); }} />
    </Popup>
  ));

  return (
    <HStack>
      <Button text="Info" onPress={() => { infoOverlay.show(); }} />
      <Button text="Toggle" onPress={() => { confirmOverlay.show(); }} />
    </HStack>
  );
});
```

## Z-order tiers

The `zOrder` config determines the rendering tier. Overlays in higher tiers always appear above those in lower tiers, regardless of when they were shown.

```tsx
// A popup at tier 0 — rendered at the base overlay level
const popup = useOverlay({ zOrder: 0 }, (ctrl) => (
  <Popup onBackdropPress={() => { ctrl.hide(); }}>
    <Text text="Popup content" />
  </Popup>
));

// A toast at tier 100 — always renders above popups
const toast = useOverlay({ zOrder: 100 }, (ctrl) => (
  <Toast>
    <Text text="Saved!" />
  </Toast>
));
```

Within the same z-order tier, the most recently shown overlay is brought to the front via `lv_obj_move_foreground()`.

## Popups and toasts

`@espcompose/ui` provides convenience hooks for common overlay patterns:

| Hook | Import | Description |
|------|--------|-------------|
| `usePopup(factory)` | `@espcompose/ui` | Base overlay (z-order 0) — drawn above normal content but below toasts |
| [`useToast(factory, opts?)`](./useToast.md) | `@espcompose/ui` | Transient toast overlay (z-order 100) with auto-hide, queue, and multi-slot support |

`usePopup` is a thin wrapper around `useOverlay()` and returns an `OverlayController`.

`useToast` is built on [`useTransientOverlay()`](./useTransientOverlay.md) and returns a `VisibilityController` with script-backed `show()`/`hide()` lifecycle.

## Container components

You can use any JSX inside the overlay factory, but `@espcompose/ui` provides two purpose-built container components:

### Popup

A full-screen semi-transparent backdrop with a centered content card.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `padding` | `SpacingToken` | `'lg'` | Padding inside the container |
| `radius` | `RadiusToken` | `'lg'` | Corner radius of the container |
| `gap` | `SpacingToken` | `'md'` | Gap between children |
| `backdropOpacity` | `number` | `50` | Backdrop opacity (0–100 percent) |
| `onBackdropPress` | `() => void` | — | Called when the backdrop is tapped |

### Toast

A translucent bottom-anchored strip for brief, non-blocking messages.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `padding` | `SpacingToken` | `'md'` | Padding inside the toast |
| `radius` | `RadiusToken` | `'md'` | Corner radius of the toast |
| `margin` | `SpacingToken` | `'md'` | Horizontal margin from the screen edge |

## How it works

1. The compiler derives a **template key** from the hook-path stack (component identity) for each `useOverlay()` call
2. Every instance evaluates the factory to capture its closures, but only the first instance's widget subtree is emitted into the LVGL `top_layer`
3. Overlays are grouped into **tier containers** by `zOrder` — each tier is an invisible `lv_obj` that establishes rendering order
4. The compiler generates a **mux signal** per overlay definition — `show()` sets the mux index to the calling instance
5. Reactive bindings that differ across instances (entity state, labels) are dispatched through a table lookup keyed by the mux index
6. `hide()` hides the shared widgets regardless of which instance is active

## Rules

- Must be called inside an `<lvgl>` tree — overlays are scoped to a specific LVGL instance's `top_layer`
- Must be called inside a function component body (created with `createLvglWidget`)
- All instances of the same component must produce structurally identical overlay trees — the compiler validates this and will error if the tree shapes differ
- `show()` and `hide()` are compile-time markers — they can only be used inside trigger handlers (`onPress`, `onChange`, etc.) or `useScript()` bodies
