/**
 * Card component — a styled container for grouping content.
 *
 * Compiles to <lvgl-obj> with rounded corners, padding, and themed background.
 * Background color comes from the `ds-surface-alt` style definition.
 */

import type { EspComposeElement, WidgetProps } from '@espcompose/core';
import { createWidgetComponent, LVGL_INTENTS, useReactiveTheme } from '@espcompose/core';
import { useSpacing, useRadius } from '../theme/resolvers';
import type { SpacingToken, RadiusToken } from '../theme/types';

type CardProps = WidgetProps<{
  children?: EspComposeElement | EspComposeElement[];
  /** Padding inside the card. Default: 'md'. */
  padding?: SpacingToken;
  /** Corner radius. Default: 'md'. */
  radius?: RadiusToken;
  /** Gap between children. Token name. */
  gap?: SpacingToken;
}>;

/**
 * Card — a styled container with background and rounded corners.
 *
 * @example
 * <Card>
 *   <Text variant="title">Living Room</Text>
 *   <Slider label="Brightness" />
 * </Card>
 */
export const Card = createWidgetComponent(
  (props: CardProps): EspComposeElement => {
    const padding = useSpacing(props.padding ?? 'md');
    const radius = useRadius(props.radius ?? 'md');
    const gap = props.gap != null ? useSpacing(props.gap) : undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const theme = useReactiveTheme() as any;
    const bgColor = props.style?.backgroundColor ?? theme?.colors?.surfaceAlt;

    return (
      <lvgl-obj
        style={{
          backgroundColor: bgColor,
          padding: padding,
          borderRadius: radius,
          borderColor: props.style?.borderColor,
          borderWidth: props.style?.borderWidth ?? 0,
          width: props.style?.width ?? '100%',
          height: props.style?.height ?? 'fit-content',
          scrollbarMode: 'off',
          display: 'flex',
          flexDirection: 'column',
          ...(gap != null ? { rowGap: gap } : {}),
        }}
      >
        {props.children}
      </lvgl-obj>
    );
  },
  { allowedChildIntents: [LVGL_INTENTS.WIDGET] as const, contextTransparent: true as const },
);
