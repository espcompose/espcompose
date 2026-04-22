---
sidebar_label: useFont
sidebar_position: 6
---

# useFont

Registers a font asset for use in LVGL widgets. Supports local font files and Google Fonts via the `gfonts://` prefix.

## Signature

```typescript
import { useFont } from '@espcompose/core';
import type { FontProps } from '@espcompose/core';

const fontRef = useFont(props: FontProps): Ref<FontRef>;
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `file` | `string` | Yes | Font file path (relative to YAML), `gfonts://FontName` for Google Fonts, or URL |
| `size` | `number` | No | Font size (height) in pixels |
| `bpp` | `'1' \| '2' \| '4' \| '8'` | No | Bit depth for anti-aliasing of OpenType/TrueType fonts |
| `glyphsets` | `GlyphsetName[]` | No | Predefined glyph sets to include (see below). Defaults to `['GF_Latin_Kernel']` |
| `glyphs` | `string[]` | No | Additional individual glyphs to include |
| `ignoreMissingGlyphs` | `boolean` | No | Suppress warnings for glyphs defined in glyphsets but missing from the font. Defaults to `false` |
| `extras` | `FontExtrasProps[]` | No | Additional font files for specific glyphs: `{ file: string, glyphs: string[] }` |

### Available glyphsets

`GF_Latin_Kernel`, `GF_Latin_Core`, `GF_Latin_Plus`, `GF_Latin_Beyond`, `GF_Latin_African`, `GF_Latin_PriAfrican`, `GF_Latin_Vietnamese`, `GF_Cyrillic_Core`, `GF_Cyrillic_Plus`, `GF_Cyrillic_Pro`, `GF_Cyrillic_Historical`, `GF_Greek_Core`, `GF_Greek_Plus`, `GF_Greek_Pro`, `GF_Greek_Expert`, `GF_Greek_Archaic`, `GF_Greek_Coptic`, `GF_Greek_AncientMusicalSymbols`, `GF_Arabic_Core`, `GF_Arabic_Plus`, `GF_Phonetics_IPAStandard`, `GF_Phonetics_IPAHistorical`, `GF_Phonetics_APA`, `GF_Phonetics_DisorderedSpeech`, `GF_Phonetics_SinoExt`, `GF_TransLatin_Arabic`, `GF_TransLatin_Pinyin`

## Basic usage

### Google Fonts

```tsx
import { useFont } from '@espcompose/core';

function App() {
  const roboto = useFont({ file: 'gfonts://Roboto', size: 20 });

  return (
    <lvgl displays={[displayRef]}>
      <lvgl-page>
        <lvgl-label textFont={roboto} text="Hello, World!" />
      </lvgl-page>
    </lvgl>
  );
}
```

### Local font files

```tsx
const customFont = useFont({
  file: './assets/fonts/MyFont.ttf',
  size: 16,
  bpp: '4',
});
```

### With specific glyphs

```tsx
const iconFont = useFont({
  file: './assets/fonts/icons.ttf',
  size: 24,
  glyphs: '\uE000\uE001\uE002',
});
```

## Deduplication

Multiple calls with the same font configuration return the same ref. You can call `useFont()` in different components without duplicating the font asset.

## Rules

- Must be called inside a function component body
- Font files are resolved relative to the project root at compile time
- The `gfonts://` prefix downloads Google Fonts automatically during the ESPHome build
