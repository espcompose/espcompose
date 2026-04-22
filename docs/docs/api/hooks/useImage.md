---
sidebar_label: useImage
sidebar_position: 5
---

# useImage

Registers an image asset for use in LVGL widgets. The compiler resolves the image file relative to your project root, converts it to the specified format, and includes it in the build output.

## Signature

```typescript
import { useImage } from '@espcompose/core';
import type { ImageProps } from '@espcompose/core';

const imageRef = useImage(props: ImageProps): Ref<ImageRef>;
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `file` | `string` | Yes | Path to the image file (relative to project root), MDI icon (`mdi:name`), or URL |
| `type` | `'BINARY' \| 'GRAYSCALE' \| 'RGB' \| 'RGB565' \| 'RGBA' \| 'TRANSPARENT_BINARY'` | Yes | Pixel format |
| `resize` | `string` | No | Resize to `'WIDTHxHEIGHT'` (e.g. `'100x100'`), preserving aspect ratio |
| `transparency` | `'alpha_channel' \| 'chroma_key' \| 'opaque'` | No | Transparency mode |
| `invertAlpha` | `boolean` | No | Invert colors (binary/grayscale only). Defaults to `false` |
| `dither` | `'FLOYDSTEINBERG' \| 'NONE'` | No | Dither method for grayscale/binary images. Defaults to `'NONE'` |
| `byteOrder` | `'big_endian' \| 'little_endian'` | No | Pixel byte order for RGB565 images. Defaults to `'big_endian'` |

## Basic usage

```tsx
import { useImage } from '@espcompose/core';

function App() {
  const logo = useImage({
    file: './assets/logo.png',
    type: 'RGB',
    resize: '100x100',
    transparency: 'alpha_channel',
  });

  return (
    <lvgl displays={[displayRef]}>
      <lvgl-page>
        <lvgl-image src={logo} />
      </lvgl-page>
    </lvgl>
  );
}
```

## With UI library Image component

```tsx
import { useImage } from '@espcompose/core';
import { Image } from '@espcompose/ui';

const photo = useImage({ file: './assets/photo.jpg', type: 'RGB' });

<Image src={photo} size="lg" radius="md" />
```

## Deduplication

Multiple calls with the same configuration (file, type, resize, etc.) return the same ref and produce a single image component in the output. You can safely call `useImage()` in multiple components without duplicating the asset.

## Rules

- Must be called inside a function component body
- The `file` path is resolved relative to the project root at compile time
- Assets are copied to `.espcompose/assets/` with content-hash naming for deduplication
