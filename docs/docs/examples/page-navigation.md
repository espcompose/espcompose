---
sidebar_label: Page Navigation
sidebar_position: 3
---

# Page Navigation

A multi-page LVGL app with forward, back, and jump-to navigation using the `useLvgl()` hook.

## What you'll learn

- Using `useLvgl()` for implicit LVGL ref access
- Navigating between pages with `pageNext()`, `pagePrevious()`, and `pageShow()`
- Creating reusable navigation components with `createLvglWidget`

## The example

```tsx
import { secret, useRef, useLvgl, createLvglWidget, createEspHomeComponent } from '@espcompose/core';
import type { DisplayRef, Ref } from '@espcompose/core';
import { Screen, VStack, Text, Button, UITheme } from '@espcompose/ui';

// ── Navigation components ──────────────────────────────────────────────

/** Button that navigates to the next page. */
const NextButton = createLvglWidget(() => {
  const lvgl = useLvgl();
  return <Button text="Next →" onPress={() => { lvgl.pageNext(); }} />;
});

/** Button that navigates to the previous page. */
const BackButton = createLvglWidget(() => {
  const lvgl = useLvgl();
  return <Button text="← Back" onPress={() => { lvgl.pagePrevious(); }} />;
});

/** Button that jumps to a specific page by ref. */
const GoToButton = createLvglWidget<{ targetPage: Ref; label: string }>(
  ({ targetPage, label }) => {
    const lvgl = useLvgl();
    return (
      <Button
        text={label}
        status="secondary"
        onPress={() => { lvgl.pageShow({ id: targetPage }); }}
      />
    );
  },
);

// ── UI component ───────────────────────────────────────────────────────

const UI = createEspHomeComponent(
  ({ display }: { display: Ref<DisplayRef> }) => {
    const homeRef = useRef();

    return (
      <lvgl displays={[display]}>
        <UITheme.Provider>
          {/* Page 1: Home */}
          <Screen ref={homeRef}>
            <VStack gap="md">
              <Text variant="title" text="Home" />
              <Text text="Welcome to the dashboard." />
              <NextButton />
            </VStack>
          </Screen>

          {/* Page 2: Settings */}
          <Screen>
            <VStack gap="md">
              <Text variant="title" text="Settings" />
              <Text text="Configure your device." />
              <BackButton />
              <NextButton />
            </VStack>
          </Screen>

          {/* Page 3: About */}
          <Screen>
            <VStack gap="md">
              <Text variant="title" text="About" />
              <Text text="ESPCompose v1.0" />
              <BackButton />
              <GoToButton targetPage={homeRef} label="Go Home" />
            </VStack>
          </Screen>
        </UITheme.Provider>
      </lvgl>
    );
  },
);

// ── App ────────────────────────────────────────────────────────────────

function App() {
  const displayRef = useRef<DisplayRef>();

  return (
    <esphome name="page-nav-demo">
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

      <UI display={displayRef} />
    </esphome>
  );
}

export default <App />;
```

## How it works

### useLvgl()

The `useLvgl()` hook returns an implicit reference to the nearest `<lvgl>` ancestor — no need to pass a ref prop through the component tree:

```tsx
const lvgl = useLvgl();
lvgl.pageNext();
```

### Page navigation methods

| Method | Description |
|--------|-------------|
| `lvgl.pageNext(opts?)` | Navigate to the next page |
| `lvgl.pagePrevious(opts?)` | Navigate to the previous page |
| `lvgl.pageShow({ id: ref })` | Jump to a specific page by ref |

All methods accept optional animation options:

```tsx
lvgl.pageNext({ animation: 'MOVE_LEFT', time: '300ms' });
lvgl.pagePrevious({ animation: 'MOVE_RIGHT', time: '300ms' });
lvgl.pageShow({ id: homeRef, animation: 'FADE_IN', time: '500ms' });
```

### Page refs

Create a ref with `useRef()` and pass it to a `<Screen>` to make that page a navigation target:

```tsx
const homeRef = useRef();

<Screen ref={homeRef}>
  {/* ... */}
</Screen>

// Later, jump back:
lvgl.pageShow({ id: homeRef });
```

### Why createLvglWidget?

Navigation components like `NextButton` and `BackButton` are wrapped in `createLvglWidget` because they render LVGL widgets and need to participate in the widget intent validation system. This ensures they can only be placed inside valid LVGL containers.

## Variations

### With animations

```tsx
const NextButton = createLvglWidget(() => {
  const lvgl = useLvgl();
  return (
    <Button
      text="Next →"
      onPress={() => {
        lvgl.pageNext({ animation: 'MOVE_LEFT', time: '300ms' });
      }}
    />
  );
});
```

### Tab-style navigation bar

```tsx
const NavBar = createLvglWidget<{ pages: { ref: Ref; label: string }[] }>(
  ({ pages }) => {
    const lvgl = useLvgl();
    return (
      <HStack align="spaceEvenly">
        {pages.map(({ ref, label }) => (
          <Button
            text={label}
            size="sm"
            variant="outline"
            onPress={() => { lvgl.pageShow({ id: ref }); }}
          />
        ))}
      </HStack>
    );
  },
);
```
