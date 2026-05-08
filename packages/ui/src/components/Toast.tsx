/**
 * Toast component — lightweight notification overlay.
 *
 * @internal Used by `useToast()` internally. Not part of the public API.
 *
 * Provides:
 *   - A translucent bottom-anchored strip (no full-screen backdrop)
 *   - Suitable for brief, non-blocking messages
 *
 * The framework wraps overlay content in a hidden wrapper widget
 * with a deterministic ID for show/hide action targeting.
 */

import type { WidgetPropsWithChildren } from '@espcompose/core';
import { createLvglContainerWidget } from '@espcompose/core';
import { useSpacing, useRadius } from '../hooks';
import { UITheme } from '../theme/theme';
import type { SpacingToken, RadiusToken } from '../theme/types';

type ToastProps = WidgetPropsWithChildren<{
  /** Padding inside the toast container. Default: 'md'. */
  padding?: SpacingToken;
  /** Corner radius of the toast. Default: 'md'. */
  radius?: RadiusToken;
  /** Horizontal margin from the screen edge. Default: 'md'. */
  margin?: SpacingToken;
  /**
   * Bottom offset in pixels. Used internally by `useToast()` for
   * compacted multi-slot positioning.
   *
   * @internal
   * @default 0
   */
  bottomOffset?: number;
}>;

/**
 * Toast — lightweight bottom-anchored notification container.
 * @internal Used by `useToast()`. Not exported publicly.
 */
export const BottomToast = createLvglContainerWidget(
  (props: ToastProps) => {
    const theme = UITheme.use();
    const padding = useSpacing(props.padding ?? 'md');
    const radius = useRadius(props.radius ?? 'md');
    const margin = useSpacing(props.margin ?? 'md');
    const bgColor = props.style?.backgroundColor ?? theme?.colors?.surface;
    const bottomOffset = props.bottomOffset ?? 0;

    return (
      <lvgl-obj
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#000000',
          backgroundOpacity: 'transparent',
          borderWidth: 0,
          padding: 0,
          paddingBottom: bottomOffset,
          clickable: false,
        }}
      >
        {/* Bottom-anchored toast container */}
        <lvgl-obj
          style={{
            backgroundColor: bgColor,
            backgroundOpacity: '90%',
            borderRadius: radius,
            borderWidth: props.style?.borderWidth ?? 0,
            padding: padding,
            width: '90%',
            height: props.style?.height ?? 'fit-content',
            placeSelf: 'bottomCenter',
            paddingBottom: margin,
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
