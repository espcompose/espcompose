/**
 * Card component — a styled container for grouping content.
 *
 * Compiles to <lvgl-obj> with rounded corners, padding, and themed background.
 * Background color comes from the `ds-surface-alt` style definition.
 */

import type { WidgetPropsWithChildren } from '@espcompose/core';
import { createLvglContainerWidget, useTheme } from '@espcompose/core';
import { useSpacing, useRadius } from '../hooks';
import { UI_THEME_SCOPE } from '../theme/scope';
import type { SpacingToken, RadiusToken, Theme } from '../theme/types';

type CardProps = WidgetPropsWithChildren<{
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
export const Card = createLvglContainerWidget(
  (props: CardProps) => {
    const padding = props.style?.padding != null ? props.style.padding : useSpacing(props.padding ?? 'md');
    const radius = props.style?.borderRadius != null ? props.style.borderRadius : useRadius(props.radius ?? 'md');
    const gap = props.gap != null ? useSpacing(props.gap) : undefined;
    const theme = useTheme<Theme>(UI_THEME_SCOPE);
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
);
