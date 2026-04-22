---
sidebar_label: createFontToken
sidebar_position: 11
---

# createFontToken

Creates a branded font asset descriptor for use in theme definitions. Font tokens decouple font configuration from widget code — themes declare font tokens, and the framework resolves them into `useFont` calls at build time.

## Signature

```typescript
import { createFontToken } from '@espcompose/core';
import type { FontToken, FontBpp } from '@espcompose/core';

const token = createFontToken(file: string, size: number, bpp?: FontBpp): FontToken;
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | `string` | Yes | Font file path (relative to project) or `gfonts://FontName` for Google Fonts |
| `size` | `number` | Yes | Font size in pixels |
| `bpp` | `'1' \| '2' \| '4' \| '8'` | No | Anti-aliasing bit depth. Defaults to `'4'` |

### Bit depth values

| Value | Quality |
|-------|---------|
| `'1'` | None (binary, smallest memory footprint) |
| `'2'` | Basic anti-aliasing |
| `'4'` | Good anti-aliasing (default) |
| `'8'` | Best anti-aliasing (largest memory footprint) |

## Returns

A branded `FontToken` object. The brand ensures the framework can distinguish font tokens from plain objects at build time.

## Usage in themes

Font tokens are the standard way to define typography in a theme:

```typescript
import { createFontToken } from '@espcompose/core';
import type { FontToken } from '@espcompose/core';

interface MyTheme {
  fonts: {
    title: FontToken;
    body: FontToken;
    caption: FontToken;
  };
}

const roboto = (size: number) => createFontToken('gfonts://Roboto', size);

const lightTheme: MyTheme = {
  fonts: {
    title: roboto(24),
    body: roboto(16),
    caption: roboto(12),
  },
};
```

Widgets consume font tokens from the theme rather than calling `useFont` directly. This keeps font selection centralized and swappable across themes.

## Related

- [useFont](../hooks/useFont.md) — the hook that resolves font assets at the component level
- [Theming](../../ui/theming.md) — how themes use font tokens to define typography
