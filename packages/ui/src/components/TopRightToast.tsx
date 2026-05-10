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
import { useSpacing } from '../hooks';
import { UITheme } from '../theme/theme';
import { Surface } from './Surface';
import { Glass } from './Glass';

type TopRightToastProps = WidgetPropsWithChildren<{
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
    const borderColor = theme?.colors?.border;
    const margin = theme?.spacing.md;
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
          clickable: false,
        }}
      >
        {/* Top-right anchored toast card */}
        <Glass
          style={{
            borderWidth: 1,
            borderColor: borderColor,
            width: 280,
            height: props.style?.height ?? 'fit-content',
            placeSelf: 'topRight',
            display: 'flex',
            flexDirection: 'row',
            columnGap: useSpacing('sm'),
            padding: margin,
          }}
        >
          {props.children}
        </Glass>
      </lvgl-obj>
    );
  },
);
