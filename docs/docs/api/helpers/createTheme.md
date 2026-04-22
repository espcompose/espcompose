---
sidebar_label: createTheme
sidebar_position: 12
---

# createTheme

Creates a type-safe, scoped theme handle. The handle pre-binds a scope identifier and a set of theme variants, providing a `Provider` component, a reactive accessor, theme switching, and extension — all without exposing raw scope strings.

## Signature

```typescript
import { createTheme } from '@espcompose/core';

const MyTheme = createTheme(scope, themes, options?);
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `scope` | `string` | Yes | Unique scope identifier for this theme group |
| `themes` | `Record<Names, T>` | Yes | Map of theme name to theme object |
| `options` | `{ default?: Names }` | No | Which theme is active on boot. Defaults to the first entry |

### Returns

A `ThemeHandle<T, Names, Scope>` with the following API:

| Member | Description |
|--------|-------------|
| `handle.Provider` | JSX component that registers themes and renders children |
| `handle.select(name)` | Switch the active theme at runtime (call inside trigger handlers) |
| `handle.use()` | Access the reactive theme proxy for reading theme values |
| `handle.extend(themes)` | Create a new handle with additional theme variants |
| `handle.scope` | The raw scope string (used internally by the compiler) |

## Provider

The `Provider` component registers all themes into the global registry and renders its children. Only two props are exposed:

```tsx
<MyTheme.Provider default="dark">
  {/* Themed content */}
</MyTheme.Provider>
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `default` | `Names` | No | Which theme is active on boot |
| `children` | `EspComposeElement` | No | Child elements |

## select

Switch the active theme at runtime. Must be called inside a trigger handler body (`onPress`, `onClick`, etc.):

```tsx
<Button text="Dark" onPress={() => { MyTheme.select('dark'); }} />
```

The compiler transforms this into a C++ action that sets the scoped theme index signal and flushes the reactive graph — all themed widgets update instantly.

## use

Access the reactive theme proxy. Returns a deeply-nested object whose leaf properties are reactive nodes tied to the current theme:

```tsx
const theme = MyTheme.use();

// Each leaf is a reactive value that updates when the theme changes
<lvgl-obj style={{ backgroundColor: theme.colors.background }} />
```

## extend

Add custom theme variants to an existing handle. Returns a **new** handle for the same scope with the combined set of theme names:

```tsx
import { UITheme } from '@espcompose/ui';

const MyTheme = UITheme.extend({
  ocean: oceanTheme,
  forest: forestTheme,
});

// MyTheme now supports 'dark' | 'light' | 'ocean' | 'forest'
<MyTheme.Provider default="ocean">
  {/* ... */}
</MyTheme.Provider>
```

The parent themes are preserved. New themes can override existing names.

## Example: custom design system

```typescript
import { createTheme, createFontToken } from '@espcompose/core';
import type { FontToken } from '@espcompose/core';

interface MyDesignSystem {
  colors: { bg: string; fg: string; accent: string };
  font: FontToken;
}

const LcarsTheme = createTheme('lcars', {
  standard: {
    colors: { bg: '#000000', fg: '#FF9900', accent: '#CC6600' },
    font: createFontToken('gfonts://Orbitron', 18),
  },
  redalert: {
    colors: { bg: '#1A0000', fg: '#FF0000', accent: '#CC0000' },
    font: createFontToken('gfonts://Orbitron', 18),
  },
});
```

Then use it in your components:

```tsx
function MyApp() {
  const lcars = LcarsTheme.use();

  return (
    <LcarsTheme.Provider default="standard">
      <lvgl-obj style={{ backgroundColor: lcars.colors.bg }}>
        <lvgl-label text="Status" style={{ color: lcars.colors.fg }} />
      </lvgl-obj>
    </LcarsTheme.Provider>
  );
}
```

## Related

- [createFontToken](./createFontToken.md) — create font asset descriptors for themes
- [Theming](../../ui/theming.md) — the built-in `@espcompose/ui` theme system built on `createTheme`
