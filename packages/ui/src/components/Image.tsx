/**
 * Image component — themed image display.
 *
 * Wraps `<lvgl-image>` with design system styling.
 * Supports size tokens for consistent dimensions and optional border
 * radius from the theme's radius scale.
 */

import type { EspComposeElement, Ref, ImageRef, WidgetProps } from '@espcompose/core';
import { createWidgetComponent, useReactiveMap } from '@espcompose/core';
import type { SizeToken, RadiusToken } from '../theme/types';
import { themeLeaf } from '../hooks/utils';

/** Pixel sizes for each SizeToken. */
const IMAGE_SIZE: Record<SizeToken, number> = {
  xs: 24,
  sm: 40,
  md: 64,
  lg: 100,
  xl: 150,
};

export type ImageProps = WidgetProps<{
  /** Image source — a ref from `useImage()`. */
  src: Ref<ImageRef>;
  /** Rounded corner preset from the theme radius scale. */
  radius?: RadiusToken;
  /** Size preset. Maps to pixel dimensions. */
  size?: SizeToken;
  /** Rotation angle in tenths of a degree. */
  angle?: number;
  /** Zoom factor (256 = 100%). */
  zoom?: number;
  /** Antialias the image when transformed. */
  antialias?: boolean;
}, 'angle' | 'zoom' | 'antialias'>;

/**
 * Image — a themed image widget.
 *
 * @example
 * const logo = useImage({ file: './assets/logo.png', type: 'RGB', resize: '100x100' });
 * <Image src={logo} size="lg" radius="md" />
 * <Image src={logo} />
 */
export const Image = createWidgetComponent(
  (props: ImageProps): EspComposeElement => {
    const px = props.size != null
      ? useReactiveMap(props.size, (v) => IMAGE_SIZE[v])
      : undefined;
    const borderRadius = props.radius != null
      ? useReactiveMap(props.radius, (v) => themeLeaf('radii', v))
      : undefined;

    return (
      <lvgl-image
        src={props.src}
        angle={props.angle}
        zoom={props.zoom}
        antialias={props.antialias}
        style={{
          width: props.style?.width ?? px,
          height: props.style?.height ?? px,
          borderRadius: borderRadius,
          ...props.style,
        }}
      />
    );
  },
);
