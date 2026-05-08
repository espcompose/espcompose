---
sidebar_label: useLvgl
sidebar_position: 8
---

# useLvgl

Returns the ref of the nearest enclosing `<lvgl>` element. Use this hook to access LVGL page-navigation actions without manually passing the ref through component props.

## Signature

```typescript
import { useLvgl } from '@espcompose/core';

const lvgl = useLvgl();
```

### Return value

Returns a `Ref<LvglComponentRef>` — the ref of the enclosing `<lvgl>` element. This ref exposes page-navigation actions like `pageNext()`, `pagePrevious()`, and `pageShow()`.

## Basic usage

```tsx
import { useLvgl, createLvglWidget } from '@espcompose/core';
import { Button } from '@espcompose/ui';

const NavButton = createLvglWidget(({ target }: { target: Ref }) => {
  const lvgl = useLvgl();

  return (
    <Button text="Go" onPress={() => { lvgl.pageShow({ id: target }); }} />
  );
});
```

## Page navigation

The LVGL ref provides these page-navigation actions for use in trigger handlers:

| Action | Description |
|--------|-------------|
| `lvgl.pageNext()` | Navigate to the next page with an optional animation |
| `lvgl.pagePrevious()` | Navigate to the previous page with an optional animation |
| `lvgl.pageShow({ id })` | Navigate to a specific page by ref |

```tsx
const PageControls = createLvglWidget(() => {
  const lvgl = useLvgl();

  return (
    <HStack>
      <Button text="Prev" onPress={() => { lvgl.pagePrevious(); }} />
      <Button text="Next" onPress={() => { lvgl.pageNext(); }} />
    </HStack>
  );
});
```

## LVGL tree requirement

`useLvgl()` must be called inside an `<lvgl>` tree. If called outside, it throws an error. This requirement also applies to hooks that depend on LVGL context internally:

- [`useOverlay()`](./useOverlay.md) — overlays are scoped to a specific LVGL instance's `top_layer`
- [`useTransientOverlay()`](./useTransientOverlay.md) — builds on `useOverlay()`
- [`useToast()`](./useToast.md) — builds on `useTransientOverlay()`

All components using these hooks must be rendered inside an `<lvgl>` element:

```tsx
function App() {
  return (
    <lvgl>
      {/* ✅ These components can call useLvgl(), useOverlay(), useToast(), etc. */}
      <Page>
        <NavButton target={settingsPage} />
        <LightButton entityId="light.bedroom" label="Bedroom" />
      </Page>
    </lvgl>
  );
}
```

## Rules

- Must be called inside an `<lvgl>` tree — throws if no enclosing `<lvgl>` element exists
- Must be called inside a function component body (created with `createLvglWidget`)
