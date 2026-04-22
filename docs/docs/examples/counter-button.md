---
sidebar_label: Counter Button
sidebar_position: 1
---

# Counter Button

A button that increments a global counter and displays the count on the button label.

## What you'll learn

- Declaring a global variable with `useGlobal` or `useRetainedGlobal`
- Creating reactive text with `useMemo`
- Handling button press events
- Using UI library components

## The example

```tsx
import { secret, useRef, useGlobal, useMemo } from '@espcompose/core';
import type { DisplayRef } from '@espcompose/core';
import { Screen, VStack, Text, Button, UITheme } from '@espcompose/ui';

function App() {
  const displayRef = useRef<DisplayRef>();
  const counter = useGlobal('integer', { initialValue: 0 });

  // Reactive text that updates whenever counter changes
  const counterText = useMemo(() => `Count: ${counter.value}`);

  return (
    <esphome name="counter-demo">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid={secret('wifi_ssid')} password={secret('wifi_password')} />
      <api />
      <logger />

      <spi clkPin={18} mosiPin={23} />
      <display
        platform="ili9xxx"
        ref={displayRef}
        model="ILI9341"
        csPin={5}
        dcPin={27}
        resetPin={33}
      />

      <lvgl displays={[displayRef]}>
        <UITheme.Provider>
          <Screen>
            <VStack align="center" gap="md">
              <Text variant="title" text={counterText} />
              <Button
                text="Increment"
                status="primary"
                size="lg"
                onPress={() => {
                  counter.set(counter.value + 1);
                }}
              />
            </VStack>
          </Screen>
        </UITheme.Provider>
      </lvgl>
    </esphome>
  );
}

export default <App />;
```

## How it works

1. `useGlobal('integer', {'{'} initialValue: 0 {'}'})` declares a volatile integer global, initialized to 0. The value resets on reboot.

2. The `useMemo` call creates a reactive derived string that reads `counter.value`. The compiler tracks this as a dependency and generates a C++ `Memo` that recomputes whenever the counter changes.

3. `counter.set(counter.value + 1)` in the `onPress` handler increments the counter. This triggers the memo to recompute, which updates the `Text` component on screen.

## Persisting across reboots

To keep the counter value after a power cycle, replace `useGlobal` with `useRetainedGlobal`:

```tsx
// Value is saved to flash — survives reboots
const counter = useRetainedGlobal('integer', 'my-counter', { initialValue: 0 });
```

The rest of the code stays the same. The `'my-counter'` key identifies the flash storage slot.

## Variations

### Counter with reset button

```tsx
<VStack align="center" gap="md">
  <Text variant="title" text={counterText} />
  <HStack gap="sm">
    <Button
      text="+"
      status="primary"
      onPress={() => { counter.set(counter.value + 1); }}
    />
    <Button
      text="Reset"
      status="danger"
      variant="outline"
      onPress={() => { counter.set(0); }}
    />
  </HStack>
</VStack>
```

### Counter on the button label itself

```tsx
const buttonLabel = useMemo(() => `Pressed ${counter.value} times`);

<Button
  text={buttonLabel}
  status="primary"
  onPress={() => { counter.set(counter.value + 1); }}
/>
```
