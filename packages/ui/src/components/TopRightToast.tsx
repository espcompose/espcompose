/**
 * TopRightToast component — card-style notification positioned top-right.
 *
 * @internal Used by `Toast.Provider` when variant is 'topRight'.
 * Not part of the public API.
 *
 * Provides:
 *   - A fixed-width card anchored to the top-right corner
 *   - Suitable for larger displays (desktop/panel-style notifications)
 *   - Slots stack downward from the top-right corner
 *
 * The framework wraps overlay content in a hidden wrapper widget
 * with a deterministic ID for show/hide action targeting.
 */

import type { WidgetPropsWithChildren } from '@espcompose/core';
import { createLvglContainerWidget } from '@espcompose/core';
import { useSpacing, useRadius } from '../hooks';
import { UITheme } from '../theme/theme';
import type { SpacingToken, RadiusToken } from '../theme/types';

type TopRightToastProps = WidgetPropsWithChildren<{
  /** Padding inside the toast card. Default: 'md'. */
  padding?: SpacingToken;
  /** Corner radius of the toast card. Default: 'md'. */
  radius?: RadiusToken;
  /** Margin from the top/right screen edges. Default: 'md'. */
  margin?: SpacingToken;
  /**
   * Top offset in pixels. Used internally by `Toast.Provider` for
   * multi-slot downward stacking.
   *
   * @internal
   * @default 0
   */
  topOffset?: number;
}>;

/**
 * TopRightToast — fixed-width card anchored top-right.
 * @internal Used by `Toast.Provider`. Not exported publicly.
 */
export const TopRightToast = createLvglContainerWidget(
  (props: TopRightToastProps) => {
    const theme = UITheme.use();
    const padding = useSpacing(props.padding ?? 'md');
    const radius = useRadius(props.radius ?? 'md');
    const margin = useSpacing(props.margin ?? 'md');
    const bgColor = props.style?.backgroundColor ?? theme?.colors?.surface;
    const borderColor = theme?.colors?.border;
    const topOffset = props.topOffset ?? 0;

    return (
      <lvgl-obj
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#000000',
          backgroundOpacity: 'transparent',
          borderWidth: 0,
          padding: 0,
          paddingTop: topOffset,
          paddingRight: margin,
          clickable: false,
        }}
      >
        {/* Top-right anchored toast card */}
        <lvgl-obj
          style={{
            backgroundColor: bgColor,
            backgroundOpacity: '100%',
            borderRadius: radius,
            borderWidth: 1,
            borderColor: borderColor,
            padding: padding,
            width: 280,
            height: props.style?.height ?? 'fit-content',
            placeSelf: 'topRight',
            scrollbarMode: 'off',
            display: 'flex',
            flexDirection: 'row',
            columnGap: useSpacing('sm'),
          }}
        >
          {props.children}
        </lvgl-obj>
      </lvgl-obj>
    );
  },
);
