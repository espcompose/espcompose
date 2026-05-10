/**
 * Surface — translucent container with a tiled noise texture overlay.
 *
 * Renders an `<lvgl-obj>` with a semi-transparent themed background
 * and a subtle noise grain on top.  Useful for overlays, toasts, and
 * frosted-glass-style panels.
 */

import type { WidgetPropsWithChildren, TriggerHandler } from '@espcompose/core';
import { createLvglContainerWidget, useImage } from '@espcompose/core';
import { UITheme } from '../theme/theme';

export type BackdropProps = WidgetPropsWithChildren<{
  /** Tap handler. */
  onPress?: TriggerHandler;
}>;

export const Backdrop = createLvglContainerWidget(
  (props: BackdropProps) => {
    const theme = UITheme.use();
    const bgColor = props.style?.backgroundColor ?? theme?.colors?.surface;

    return (
      <lvgl-obj
        {...(props.onPress != null ? { onPress: props.onPress } : {})}
        style={{
          ...props.style,
          backgroundColor: '#000000',
          backgroundOpacity: '50%',
          scrollbarMode: 'off',
          backdropBlur: true,
          blurQuality: 'auto',
          blurRadius: 4,
        }}
      >
        {props.children}
      </lvgl-obj>
    );
  },
);
