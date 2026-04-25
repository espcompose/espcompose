---
sidebar_label: usePopup
sidebar_position: 9
---

# usePopup

Declares a shared popup whose widget subtree is automatically deduplicated across all instances of the calling component. When multiple instances use the same popup, only one set of LVGL widgets is created — the compiler generates mux signals to dispatch instance-specific data at runtime.

## Signature

```typescript
import { usePopup } from '@espcompose/core';

const popup = usePopup(factory: (ctrl: PopupController) => EspComposeElement): PopupController;
```

The `factory` receives a `PopupController` and returns the JSX content to display inside the popup. It is evaluated once per component instance to capture each instance's unique closures (entity bindings, action handlers, memos).

### PopupController

The returned controller exposes two methods — both are compile-time markers that the action compiler lowers into LVGL show/hide actions:

| Method | Description |
|--------|-------------|
| `show()` | Show this instance's popup. Sets the mux index and unhides the shared widgets. |
| `dismiss()` | Hide the popup. Safe to call from any trigger handler. |

## Basic usage

Use `usePopup()` together with the `<Popup>` container component from `@espcompose/ui`:

```tsx
import { usePopup, useHAEntity, createLvglWidget } from '@espcompose/core';
import { Button, Text, Popup } from '@espcompose/ui';

const LightButton = createLvglWidget(
  ({ entityId, label }: { entityId: string; label: string }) => {
    const entity = useHAEntity(entityId, { domain: 'light' });

    const popup = usePopup((ctrl) => (
      <Popup onBackdropPress={() => { ctrl.dismiss(); }}>
        <Text variant="title" text={label} />
        <Text text={entity.stateText} />
        <Button text="Toggle" onPress={() => { entity.toggle(); }} />
        <Button text="Close" onPress={() => { ctrl.dismiss(); }} />
      </Popup>
    ));

    return (
      <Button text={label} onPress={() => { popup.show(); }} />
    );
  },
);
```

Every instance of `LightButton` shares a single set of popup widgets in the LVGL `top_layer`. When an instance calls `popup.show()`, the mux signal selects that instance's entity and label values.

## Multiple instances

The main strength of `usePopup()` is deduplication. Define one popup in a component and render many instances — only one set of widgets is created:

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

All three buttons open the same popup structure, but the content updates to show the correct entity state and label for whichever button was pressed.

## Multiple popups in one component

You can call `usePopup()` more than once in the same component. Each call produces a separate popup definition with its own template key:

```tsx
const DeviceControl = createLvglWidget(({ entity }) => {
  const infoPopup = usePopup((ctrl) => (
    <Popup onBackdropPress={() => { ctrl.dismiss(); }}>
      <Text text={entity.stateText} />
      <Button text="Close" onPress={() => { ctrl.dismiss(); }} />
    </Popup>
  ));

  const confirmPopup = usePopup((ctrl) => (
    <Popup onBackdropPress={() => { ctrl.dismiss(); }}>
      <Text text="Are you sure?" />
      <Button text="Yes" onPress={() => { entity.toggle(); ctrl.dismiss(); }} />
      <Button text="Cancel" onPress={() => { ctrl.dismiss(); }} />
    </Popup>
  ));

  return (
    <HStack>
      <Button text="Info" onPress={() => { infoPopup.show(); }} />
      <Button text="Toggle" onPress={() => { confirmPopup.show(); }} />
    </HStack>
  );
});
```

## Different component types

Different components each get their own popup definition, even if both are anonymous:

```tsx
const LightControl = createLvglWidget((props) => {
  const popup = usePopup((ctrl) => (
    <Popup onBackdropPress={() => { ctrl.dismiss(); }}>
      <Text text="Light Control" />
      <Button text="Toggle" onPress={() => { props.entity.toggle(); }} />
      <Button text="Close" onPress={() => { ctrl.dismiss(); }} />
    </Popup>
  ));

  return (
    <HStack align="spaceBetween" crossAlign="center">
      <Text text={props.text} />
      <Button text="…" onPress={() => { popup.show(); }} />
    </HStack>
  );
});

const FanControl = createLvglWidget((props) => {
  const popup = usePopup((ctrl) => (
    <Popup onBackdropPress={() => { ctrl.dismiss(); }}>
      <Text text="Fan Control" />
      <Button text="On/Off" onPress={() => { props.entity.toggle(); }} />
      <Button text="Close" onPress={() => { ctrl.dismiss(); }} />
    </Popup>
  ));

  return (
    <HStack align="spaceBetween" crossAlign="center">
      <Text text={props.text} />
      <Button text="…" onPress={() => { popup.show(); }} />
    </HStack>
  );
});
```

`LightControl` and `FanControl` produce separate popup template keys and separate LVGL `top_layer` widgets.

## Popup component props

The `<Popup>` component from `@espcompose/ui` provides a themed backdrop and centered container:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `padding` | `SpacingToken` | `'lg'` | Padding inside the container |
| `radius` | `RadiusToken` | `'lg'` | Corner radius of the container |
| `gap` | `SpacingToken` | `'md'` | Gap between children |
| `backdropOpacity` | `number` | `50` | Backdrop opacity (0–100 percent) |
| `onBackdropPress` | `() => void` | — | Called when the backdrop is tapped |

You don't have to use `<Popup>` — any JSX returned from the factory will work. `<Popup>` is a convenience component that provides a full-screen semi-transparent backdrop with a centered content card.

## How it works

1. The compiler derives a **template key** from the hook-path stack (component identity) for each `usePopup()` call
2. Every instance evaluates the factory to capture its closures, but only the first instance's widget subtree is emitted into the LVGL `top_layer`
3. The compiler generates a **mux signal** per popup definition — `show()` sets the mux index to the calling instance
4. Reactive bindings that differ across instances (entity state, labels) are dispatched through a table lookup keyed by the mux index
5. `dismiss()` hides the shared widgets regardless of which instance is active

## Rules

- Must be called inside a function component body (created with `createLvglWidget`)
- All instances of the same component must produce structurally identical popup trees — the compiler validates this and will error if the tree shapes differ
- `show()` and `dismiss()` are compile-time markers — they can only be used inside trigger handlers (`onPress`, `onChange`, etc.) or `useScript()` bodies
