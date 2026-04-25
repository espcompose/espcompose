/**
 * Popup component — themed backdrop + container for shared popup content.
 *
 * Intended for use inside a `usePopup()` factory. Provides:
 *   - A full-screen semi-transparent backdrop (clickable, dismiss-on-tap)
 *   - A centered container with surface background and rounded corners
 *
 * The framework automatically wraps popup content in a hidden wrapper widget
 * with a deterministic ID for show/hide action targeting. The Popup component
 * itself has no knowledge of widget IDs.
 */

import type { WidgetPropsWithChildren } from '@espcompose/core';
import { createLvglContainerWidget } from '@espcompose/core';
import { useSpacing, useRadius } from '../hooks';
import { UITheme } from '../theme/theme';
import type { SpacingToken, RadiusToken } from '../theme/types';

type PopupProps = WidgetPropsWithChildren<{
  /** Padding inside the container. Default: 'lg'. */
  padding?: SpacingToken;
  /** Corner radius of the container. Default: 'lg'. */
  radius?: RadiusToken;
  /** Gap between children inside the container. Default: 'md'. */
  gap?: SpacingToken;
  /** Backdrop opacity (0–100 percent). Default: 50. */
  backdropOpacity?: number;
  /** Called when the backdrop is tapped (typically dismiss). */
  onBackdropPress?: () => void;
}>;

/**
 * Popup — themed backdrop + container for shared popup content.
 *
 * @example
 * const popup = usePopup((ctrl) => (
 *   <Popup onBackdropPress={() => { ctrl.dismiss(); }}>
 *     <Text text="Hello" />
 *     <Button text="Close" onPress={() => { ctrl.dismiss(); }} />
 *   </Popup>
 * ));
 */
export const Popup = createLvglContainerWidget(
  (props: PopupProps) => {
    const theme = UITheme.use();
    const padding = useSpacing(props.padding ?? 'lg');
    const radius = useRadius(props.radius ?? 'lg');
    const gap = useSpacing(props.gap ?? 'md');
    const bgColor = props.style?.backgroundColor ?? theme?.colors?.surface;
    const backdropOpacity = props.backdropOpacity ?? 50;

    return (
      <lvgl-obj
        onPress={props.onBackdropPress}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#000000',
          backgroundOpacity: `${backdropOpacity}%` as `${number}%`,
          borderWidth: 0,
          padding: 0,
        }}
      >
        {/* Centered content container */}
        <lvgl-obj
          style={{
            backgroundColor: bgColor,
            backgroundOpacity: 'opaque',
            borderRadius: radius,
            borderWidth: props.style?.borderWidth ?? 0,
            padding: padding,
            width: props.style?.width ?? '90%',
            height: props.style?.height ?? 'fit-content',
            placeSelf: 'center',
            scrollbarMode: 'off',
            display: 'flex',
            flexDirection: 'column',
            rowGap: gap,
          }}
        >
          {props.children}
        </lvgl-obj>
      </lvgl-obj>
    );
  },
);
