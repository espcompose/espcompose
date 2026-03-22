/**
 * Text component — semantic text display.
 *
 * Compiles to <lvgl-label> with theme-driven typography tokens.
 */

import type { EspComposeElement } from '@esphome/compose';
import { createIntentComponent, LVGL_INTENTS } from '@esphome/compose';
import { resolveTypography, fontDefToLvgl } from '../theme/resolvers';
import type { TextVariant } from '../theme/types';
import { useTheme } from '../theme/context';

interface TextProps {
  children?: EspComposeElement | EspComposeElement[];
  /** Typography variant. Determines font size. Default: 'body'. */
  variant?: TextVariant;
  /** Static text content. Use this or children. */
  text?: string;
  /** Text alignment within the label. */
  align?: 'LEFT' | 'CENTER' | 'RIGHT' | 'AUTO';
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
    const fontDef = resolveTypography(variant);
    const color = props.color ?? useTheme().colors.textPrimary;

    return {
      type: 'lvgl-label',
      props: {
        ...(props.text != null ? { text: props.text } : {}),
        textFont: fontDefToLvgl(fontDef),
        ...(props.align != null ? { textAlign: props.align } : {}),
        textColor: color,
        ...(props.longMode != null ? { longMode: props.longMode } : {}),
        ...(props.x != null ? { x: props.x } : {}),
        ...(props.y != null ? { y: props.y } : {}),
        ...(props.width != null ? { width: props.width } : {}),
      },
    };
  },
  {
    intents: [LVGL_INTENTS.WIDGET] as const,
    allowedChildIntents: [] as const,
  },
);
