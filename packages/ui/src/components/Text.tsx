/**
 * Text component — semantic text display.
 *
 * Compiles to <lvgl-label> with theme-driven typography via reactive tokens.
 */

import type { EspComposeElement } from '@espcompose/core';
import { createIntentComponent, LVGL_INTENTS, useReactiveTheme } from '@espcompose/core';
import { resolveTypography, resolveFont } from '../theme/resolvers';
import type { TextVariant } from '../theme/types';

interface TextProps {
  children?: EspComposeElement | EspComposeElement[];
  /** Typography variant. Determines font size. Default: 'body'. */
  variant?: TextVariant;
  /** Static text content. Use this or children. */
  text?: string;
  /** Text alignment within the label. */
  align?: 'left' | 'center' | 'right' | 'auto';
  /** Text color (hex). If omitted, uses theme textPrimary. */
  color?: string;
  /** Long text mode. */
  longMode?: 'WRAP' | 'DOT' | 'SCROLL' | 'SCROLL_CIRCULAR' | 'CLIP';
  /** X position (pixels). */
  x?: number;
  /** Y position (pixels). */
  y?: number;
  /** Width. */
  width?: number | string;
}

/**
 * Text — a styled label component.
 *
 * @example
 * <Text variant="title">Living Room</Text>
 * <Text variant="caption" color="#888888">Last updated: 5m ago</Text>
 */
export const Text = createIntentComponent(
  (props: TextProps): EspComposeElement => {
    const variant = props.variant ?? 'body';
    const typo = resolveTypography(variant);
    const font = resolveFont({ fontFamily: typo.fontFamily, fontSize: typo.fontSize });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const theme = useReactiveTheme() as any;
    const textColor = props.color ?? theme?.colors?.textPrimary;

    return (
      <lvgl-label
        text={props.text}
        longMode={props.longMode}
        style={{
          color: textColor,
          font: font,
          textAlign: props.align,
          left: props.x,
          top: props.y,
          width: props.width,
        }}
      />
    );
  },
  {
    intents: [LVGL_INTENTS.WIDGET] as const,
    allowedChildIntents: [] as const,
  },
);
