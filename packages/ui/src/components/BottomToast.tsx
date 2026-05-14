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

import type { WidgetPropsWithChildren, Ref } from '@espcompose/core';
import { createLvglContainerWidget, useRef } from '@espcompose/core';
import { useSpacing } from '../hooks';
import { UITheme } from '../theme/theme';

type ToastProps = WidgetPropsWithChildren<{
  /**
   * Bottom offset in pixels. Used internally by `useToast()` for
   * compacted multi-slot positioning.
   *
   * @internal
   * @default 0
   */
  bottomOffset?: number;

  /**
   * Ref forwarded to the inner Glass card for animation targeting.
   *
   * @internal
   */
  cardRef?: Ref;
}>;

/**
 * Toast — lightweight bottom-anchored notification container.
 * @internal Used by `useToast()`. Not exported publicly.
 */
export const BottomToast = createLvglContainerWidget(
  (props: ToastProps) => {
    const bottomOffset = props.bottomOffset ?? 0;
    const theme = UITheme.use();
    const toast = theme?.parts?.toast;

    const containerRef = useRef();

    return (
      <lvgl-obj
        ref={containerRef}
        style={{
          height: 'fit-content',
          width: 'fit-content',
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
          ref={props.cardRef}
          style={{
            backgroundColor: toast?.bg,
            backgroundOpacity: 'opaque',
            borderWidth: props.style?.borderWidth ?? 1,
            borderColor: toast?.border,
            borderRadius: 0,
            width: '90%',
            height: props.style?.height ?? 'fit-content',
            placeSelf: 'bottomCenter',
            display: 'flex',
            flexDirection: 'row',
            columnGap: useSpacing('sm'),
            padding: theme?.spacing?.md,
            scrollbarMode: 'off',
            translateY: 80,
          }}
        >
          {props.children}
        </lvgl-obj>
      </lvgl-obj>
    );
  },
);
