/**
 * Card component — a Surface with default padding and rounded corners.
 */

import type { WidgetPropsWithChildren } from '@espcompose/core';
import { createLvglContainerWidget } from '@espcompose/core';
import { useSpacing, useRadius } from '../hooks';
import type { SpacingToken, RadiusToken } from '../theme/types';
import { Surface } from './Surface';

type DialogProps = WidgetPropsWithChildren<{
  /** Padding inside the card. Default: 'md'. */
  padding?: SpacingToken;
  /** Corner radius. Default: 'md'. */
  radius?: RadiusToken;
  /** Gap between children. Token name. */
  gap?: SpacingToken;
}>;

/**
 * Card — a Surface with default padding and rounded corners.
 *
 * @example
 * <Card>
 *   <Text variant="title">Living Room</Text>
 *   <Slider min={0} max={255} />
 * </Card>
 */
export const Dialog = createLvglContainerWidget(
  (props: DialogProps) => {
    const padding = props.style?.padding != null ? props.style.padding : useSpacing(props.padding ?? 'md');
    const radius = props.style?.borderRadius != null ? props.style.borderRadius : useRadius(props.radius ?? 'md');
    const gap = props.gap != null ? useSpacing(props.gap) : undefined;

    return (
      <Surface
        style={{
          ...props.style,
          padding,
          borderRadius: radius,
          width: props.style?.width ?? '100%',
          height: props.style?.height ?? 'fit-content',
          scrollbarMode: 'off',
          display: 'flex',
          flexDirection: 'column',
          ...(gap != null ? { rowGap: gap } : {}),
        }}
      >
        {props.children}
      </Surface>
    );
  },
);
