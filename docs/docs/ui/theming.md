---
sidebar_label: Theming
sidebar_position: 3
---

# Theming

The `@espcompose/ui` design system is fully theme-driven. All visual decisions — colors, spacing, typography, border radii, and component sizes — are controlled by a theme object.

> **Terminology:**
>
> - **ThemeDefinition** — the shape/contract interface that describes what a theme contains (tokens, colors, typography, etc.)
> - **Theme** — a concrete instance that implements the definition, such as `darkTheme` or `lightTheme`
>
> Themes can be switched at runtime on the device.

## Theme structure

A theme implements the `ThemeDefinition` interface:

```typescript
interface ThemeDefinition {
  name: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: Record<SpacingToken, number>;
  radii: Record<RadiusToken, number>;
  sizes: Record<SizeToken, SizeDimensions>;
  parts?: ThemeParts;
}
```

### Colors

```typescript
interface ThemeColors {
  // Semantic status palettes — each has bg, text, and bgPressed
  primary: StatusColors;
  secondary: StatusColors;
  success: StatusColors;
  warning: StatusColors;
  danger: StatusColors;

  // Surface colors
  background: HexColor;
  surface: HexColor;
  surfaceAlt: HexColor;
  border: HexColor;

  // Text colors
  textPrimary: HexColor;
  textSecondary: HexColor;
  textDisabled: HexColor;
}
```

### Typography

```typescript
interface ThemeTypography {
  title: FontToken;
  subtitle: FontToken;
  body: FontToken;
  caption: FontToken;
}
```

Font tokens are created with `createFontToken(file, size)`:

```typescript
import { createFontToken } from '@espcompose/core';

const myTitle = createFontToken('gfonts://Roboto', 28);
```

### Spacing and radii

```typescript
// Spacing (in pixels)
spacing: {
  none: 0, xs: 4, sm: 8, md: 16, lg: 24, xl: 32,
}

// Border radii (in pixels)
radii: {
  none: 0, sm: 4, md: 8, lg: 16, full: 9999,
}
```

### Component sizes

```typescript
sizes: {
  xs: { height: 28, font: createFontToken('gfonts://Roboto', 12), paddingX: 8,  paddingY: 4  },
  sm: { height: 36, font: createFontToken('gfonts://Roboto', 14), paddingX: 12, paddingY: 6  },
  md: { height: 44, font: createFontToken('gfonts://Roboto', 16), paddingX: 16, paddingY: 8  },
  lg: { height: 52, font: createFontToken('gfonts://Roboto', 18), paddingX: 20, paddingY: 10 },
  xl: { height: 64, font: createFontToken('gfonts://Roboto', 22), paddingX: 24, paddingY: 12 },
}
```

### Widget part colors

Optional colors for widget internals (slider track/knob, switch rail, etc.):

```typescript
parts: {
  slider: { indicator: '#1E88E5', knob: '#E0E0E0', rail: '#3A3A3A' },
  switch: { indicator: '#1E88E5', rail: '#3A3A3A', knob: '#E0E0E0' },
  arc:    { indicator: '#1E88E5', knob: '#E0E0E0' },
}
```

## Built-in themes

`@espcompose/ui` ships with two built-in themes:

### Dark theme

High contrast, dark surfaces optimized for OLED displays and varying ambient light.

```typescript
import { darkTheme } from '@espcompose/ui';
```

| Token | Value |
|-------|-------|
| Background | `#121212` |
| Surface | `#1E1E1E` |
| Primary | `#1E88E5` |
| Text primary | `#E0E0E0` |

### Light theme

Light surfaces with dark text, suitable for well-lit environments.

```typescript
import { lightTheme } from '@espcompose/ui';
```

| Token | Value |
|-------|-------|
| Background | `#FAFAFA` |
| Surface | `#FFFFFF` |
| Primary | `#1565C0` |
| Text primary | `#212121` |

## Setting up ThemeProvider

Wrap your UI in `<UITheme.Provider>` to enable theming. By default it registers both built-in themes with `dark` as the default:

```tsx
import { UITheme } from '@espcompose/ui';

<lvgl displays={[displayRef]}>
  <UITheme.Provider>
    <Screen>
      {/* Themed content */}
    </Screen>
  </UITheme.Provider>
</lvgl>
```

To choose a different default:

```tsx
<UITheme.Provider default="light">
  {/* Light theme is active on boot */}
</UITheme.Provider>
```

## Runtime theme switching

Switch themes on the device using `UITheme.select()` inside trigger handlers:

```tsx
import { UITheme, Button, HStack } from '@espcompose/ui';

<HStack>
  <Button
    text="Dark"
    status="primary"
    onPress={() => { UITheme.select('dark'); }}
  />
  <Button
    text="Light"
    status="secondary"
    onPress={() => { UITheme.select('light'); }}
  />
</HStack>
```

All themed components update instantly — the C++ signal graph propagates the theme change to every widget.

## Creating a custom theme

Implement the `ThemeDefinition` interface and pass it to the provider:

```tsx
import { createFontToken } from '@espcompose/core';
import type { ThemeDefinition } from '@espcompose/ui';

const montserrat = (size: number) => createFontToken('gfonts://Montserrat', size);

const oceanTheme: ThemeDefinition = {
  name: 'Ocean',

  colors: {
    primary:   { bg: '#006994', text: '#FFFFFF', bgPressed: '#004E6F' },
    secondary: { bg: '#4A6572', text: '#FFFFFF', bgPressed: '#344955' },
    success:   { bg: '#2E7D32', text: '#FFFFFF', bgPressed: '#1B5E20' },
    warning:   { bg: '#F9A825', text: '#000000', bgPressed: '#F57F17' },
    danger:    { bg: '#C62828', text: '#FFFFFF', bgPressed: '#B71C1C' },

    background:    '#0A1628',
    surface:       '#122140',
    surfaceAlt:    '#1A2F52',
    border:        '#2A4060',

    textPrimary:   '#E8F0FE',
    textSecondary: '#8EACCD',
    textDisabled:  '#4A6572',
  },

  typography: {
    title:    montserrat(28),
    subtitle: montserrat(20),
    body:     montserrat(16),
    caption:  montserrat(12),
  },

  spacing: { none: 0, xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  radii:   { none: 0, sm: 4, md: 8, lg: 16, full: 9999 },

  sizes: {
    xs: { height: 28, font: montserrat(12), paddingX: 8,  paddingY: 4  },
    sm: { height: 36, font: montserrat(14), paddingX: 12, paddingY: 6  },
    md: { height: 44, font: montserrat(16), paddingX: 16, paddingY: 8  },
    lg: { height: 52, font: montserrat(18), paddingX: 20, paddingY: 10 },
    xl: { height: 64, font: montserrat(22), paddingX: 24, paddingY: 12 },
  },

  parts: {
    slider: { indicator: '#006994', knob: '#E8F0FE', rail: '#2A4060' },
    switch: { indicator: '#006994', rail: '#2A4060', knob: '#E8F0FE' },
    arc:    { indicator: '#006994', knob: '#E8F0FE' },
  },
};
```

Then register it alongside the built-in themes using `UITheme.extend()`:

```tsx
import { UITheme } from '@espcompose/ui';

const MyTheme = UITheme.extend({ ocean: oceanTheme });
```

Use the extended handle's `Provider` and set the default:

```tsx
<lvgl displays={[displayRef]}>
  <MyTheme.Provider default="ocean">
    <Screen>
      {/* Your UI — now themed with Ocean */}
    </Screen>
  </MyTheme.Provider>
</lvgl>
```

Switch to any registered theme at runtime:

```tsx
<Button text="Ocean" onPress={() => { MyTheme.select('ocean'); }} />
<Button text="Dark"  onPress={() => { MyTheme.select('dark'); }} />
```

The extended handle is fully type-safe — `MyTheme.select()` and `MyTheme.Provider` know the available theme names (`'dark' | 'light' | 'ocean'`) at compile time.

## How it works under the hood

1. The `Provider` registers themes during the render pass
2. Components call internal hooks (`useStatus()`, `useSpacing()`, etc.) that return reactive proxies
3. The compiler generates C++ theme value arrays indexed by a `theme_index` signal
4. Each theme leaf becomes a `Memo<T>` in the signal graph
5. `UITheme.select('dark')` sets the theme index and flushes the scheduler — all widgets update instantly
