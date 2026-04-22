---
sidebar_label: Boot Screen
sidebar_position: 2
---

# Boot Screen

A splash screen shown on startup that transitions to the main UI when Home Assistant connects.

## What you'll learn

- Creating multi-page layouts with `Screen`
- Using `skip` to exclude a page from cycling
- Loading images with `useImage`
- Navigating pages with ref actions
- Triggering actions on API connection events

## The example

```tsx
import { secret, useRef, useImage } from '@espcompose/core';
import type { DisplayRef, LvglComponentRef } from '@espcompose/core';
import { Screen, VStack, Text, UITheme } from '@espcompose/ui';

function App() {
  const displayRef = useRef<DisplayRef>();
  const lvgl = useRef<LvglComponentRef>();

  const logo = useImage({
    file: './assets/logo.png',
    type: 'RGB',
    resize: '100x100',
    transparency: 'alpha_channel',
  });

  return (
    <esphome name="boot-screen-demo">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid={secret('wifi_ssid')} password={secret('wifi_password')} />
      <api
        onClientConnected={() => {
          lvgl.pageNext({ animation: 'FADE_IN', time: '300ms' });
        }}
      />
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

      <lvgl ref={lvgl} displays={[displayRef]}>
        <UITheme.Provider>
          {/* Boot screen — shown first, excluded from page cycling */}
          <Screen skip>
            <VStack align="center" gap="md">
              <lvgl-image src={logo} />
              <Text variant="title" text="Booting..." />
              <lvgl-bar style={{ width: 150, height: 10 }} value={50} />
              <Text variant="caption" text="Waiting for Home Assistant..." />
            </VStack>
          </Screen>

          {/* Main screen — navigated to when HA connects */}
          <Screen>
            <VStack>
              <Text variant="title" text="Connected!" />
              <Text text="Your dashboard goes here." />
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

1. **Two `<Screen>` components** define two LVGL pages. The first page is shown on boot.

2. **`<Screen skip>`** tells the LVGL page system to exclude this page from normal page cycling (swipe gestures or timed rotation). The boot screen is only visible on startup.

3. **`useRef<LvglComponentRef>()`** creates a typed ref to the `<lvgl>` component, giving access to page navigation actions.

4. **`useImage()`** loads and converts the logo image for LVGL at compile time. The `resize` option scales it to 100x100 pixels.

5. **`<lvgl-bar>`** is a raw LVGL intrinsic element used as a loading indicator. The `value` prop sets the fill percentage (0–100).

6. **`api.onClientConnected`** fires when Home Assistant connects. The handler calls `lvgl.pageNext()` to navigate from the boot screen to the main screen with a 300ms fade-in animation.

## Page navigation options

The `pageNext()` method accepts optional animation settings:

```tsx
lvgl.pageNext({ animation: 'FADE_IN', time: '300ms' });
lvgl.pageNext({ animation: 'MOVE_LEFT', time: '500ms' });
lvgl.pageNext(); // Default animation
```

You can also navigate backwards or to a specific page:

```tsx
lvgl.pagePrevious();
lvgl.pageShow({ id: someScreenRef });
```

## Variations

### Boot screen with progress updates

Use a global to track boot progress:

```tsx
const progress = useGlobal('integer', { initialValue: 0 });

<lvgl-bar style={{ width: 150, height: 10 }} value={progress.value} />

// Update progress from different triggers:
<wifi
  onConnect={() => { progress.set(50); }}
/>
<api
  onClientConnected={() => {
    progress.set(100);
    lvgl.pageNext({ animation: 'FADE_IN', time: '300ms' });
  }}
/>
```
