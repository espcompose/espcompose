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
import { useSpacing } from '../hooks';
import { Surface } from './Surface';
import { Glass } from './Glass';

type ToastProps = WidgetPropsWithChildren<{
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
        <Glass
          style={{
            borderWidth: props.style?.borderWidth ?? 0,
            width: '90%',
            height: props.style?.height ?? 'fit-content',
            placeSelf: 'bottomCenter',
            display: 'flex',
            flexDirection: 'row',
            columnGap: useSpacing('sm'),
          }}
        >
          {props.children}
        </Glass>
      </lvgl-obj>
    );
  },
);
