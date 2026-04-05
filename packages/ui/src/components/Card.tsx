/**
 * Card component — a styled container for grouping content.
 *
 * Compiles to <lvgl-obj> with rounded corners, padding, and themed background.
 * Background color comes from the `ds-surface-alt` style definition.
 */

import type { EspComposeElement, SizeValue } from '@espcompose/core';
import { createIntentComponent, LVGL_INTENTS, useReactiveTheme } from '@espcompose/core';
import { resolveSpacing, resolveRadius } from '../theme/resolvers';
import type { SpacingToken, RadiusToken } from '../theme/types';

interface CardProps {
  children?: EspComposeElement | EspComposeElement[];
  /** Padding inside the card. Default: 'md'. */
  padding?: SpacingToken | number;
  /** Corner radius. Default: 'md'. */
  radius?: RadiusToken | number;
  /** Background color override (hex). If set, overrides the style definition. */
  backgroundColor?: string;
  /** Border color (hex). */
  borderColor?: string;
  /** Border width. Default: 0. */
  borderWidth?: number;
  /** Width. */
  width?: SizeValue;
  /** Height. */
  height?: SizeValue;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const theme = useReactiveTheme() as any;
    const bgColor = props.backgroundColor ?? theme?.colors?.surfaceAlt;

    return (
      <lvgl-obj
        style={{
          backgroundColor: bgColor,
          padding: padding,
          borderRadius: radius,
          borderColor: props.borderColor,
          borderWidth: props.borderWidth ?? 0,
          width: props.width ?? '100%',
          height: props.height ?? 'fit-content',
        }}
        x:custom={{
          scrollbar_mode: 'OFF',
          layout: {
            type: 'flex',
            flex_flow: 'COLUMN',
            ...(gap != null ? { pad_row: gap } : {}),
          },
        }}
      >
        {props.children}
      </lvgl-obj>
    );
  },
  {
    intents: [LVGL_INTENTS.WIDGET] as const,
    allowedChildIntents: [LVGL_INTENTS.WIDGET] as const,
    contextTransparent: true as const,
  },
);
