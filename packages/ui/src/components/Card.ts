/**
 * Card component — a styled container for grouping content.
 *
 * Compiles to <lvgl-obj> with rounded corners, padding, and themed background.
 */

import type { EspComposeElement } from '@esphome/compose';
import { createIntentComponent, LVGL_INTENTS } from '@esphome/compose';
import { resolveSpacing, resolveRadius } from '../theme/resolvers';
import type { SpacingToken, RadiusToken } from '../theme/types';
import { useTheme } from '../theme/context';

interface CardProps {
  children?: EspComposeElement | EspComposeElement[];
  /** Padding inside the card. Default: 'md'. */
  padding?: SpacingToken | number;
  /** Corner radius. Default: 'md'. */
  radius?: RadiusToken | number;
  /** Background color (hex). Default: theme surfaceAlt. */
  bgColor?: string;
  /** Border color (hex). */
  borderColor?: string;
  /** Border width. Default: 0. */
  borderWidth?: number;
  /** Width. */
  width?: number | string;
  /** Height. */
  height?: number | string;
  /** Gap between children. Token name or pixel value. */
  gap?: SpacingToken | number;
}

/**
 * Card — a styled container with background and rounded corners.
 *
 * @example
 * <Card>
 *   <Text variant="title">Living Room</Text>
 *   <SliderField label="Brightness" />
 * </Card>
 */
export const Card = createIntentComponent(
  (props: CardProps): EspComposeElement => {
    const padding = resolveSpacing(props.padding ?? 'md');
    const radius = resolveRadius(props.radius ?? 'md');
    const theme = useTheme();
    const gap = props.gap != null ? resolveSpacing(props.gap) : undefined;

    return {
      type: 'lvgl-obj',
      props: {
        padAll: padding,
        radius,
        bgColor: props.bgColor ?? theme.colors.surfaceAlt,
        ...(props.borderColor != null ? { borderColor: props.borderColor } : {}),
        borderWidth: props.borderWidth ?? 0,
        ...(props.width != null ? { width: props.width } : {}),
        ...(props.height != null ? { height: props.height } : {}),
        'x:custom': {
          layout: {
            type: 'flex',
            flex_flow: 'COLUMN',
            ...(gap != null ? { pad_row: gap } : {}),
          },
        },
        ...(props.children
          ? { children: Array.isArray(props.children) ? props.children : [props.children] }
          : {}),
      },
    };
  },
  {
    intents: [LVGL_INTENTS.WIDGET] as const,
    allowedChildIntents: [LVGL_INTENTS.WIDGET] as const,
    contextTransparent: true as const,
  },
);
