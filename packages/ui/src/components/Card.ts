/**
 * Card component — a styled container for grouping content.
 *
 * Compiles to <lvgl-obj> with rounded corners, padding, and themed background.
 * Background color comes from the `ds-surface-alt` style definition.
 */

import type { EspComposeElement } from '@esphome/compose';
import { createIntentComponent, LVGL_INTENTS } from '@esphome/compose';
import { resolveSpacing, resolveRadius } from '../theme/resolvers';
import type { SpacingToken, RadiusToken } from '../theme/types';
import { STYLE_SURFACE_ALT } from '../theme/style-ids';

interface CardProps {
  children?: EspComposeElement | EspComposeElement[];
  /** Padding inside the card. Default: 'md'. */
  padding?: SpacingToken | number;
  /** Corner radius. Default: 'md'. */
  radius?: RadiusToken | number;
  /** Background color override (hex). If set, overrides the style definition. */
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
    const gap = props.gap != null ? resolveSpacing(props.gap) : undefined;

    return {
      type: 'lvgl-obj',
      props: {
        styles: STYLE_SURFACE_ALT,
        padAll: padding,
        radius,
        ...(props.bgColor != null ? { bgColor: props.bgColor } : {}),
        ...(props.borderColor != null ? { borderColor: props.borderColor } : {}),
        borderWidth: props.borderWidth ?? 0,
        width: props.width ?? '100%',
        height: props.height ?? 'SIZE_CONTENT',
        'x:custom': {
          scrollbar_mode: 'OFF',
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
