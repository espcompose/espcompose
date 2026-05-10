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

export type GlassProps = WidgetPropsWithChildren<{
  /** Tap handler. */
  onPress?: TriggerHandler;
}>;

export const Glass = createLvglContainerWidget(
  (props: GlassProps) => {
    const theme = UITheme.use();
    const bgColor = props.style?.backgroundColor ?? theme?.colors?.surface;

    return (
      <lvgl-obj
        {...(props.onPress != null ? { onPress: props.onPress } : {})}
        style={{
          ...props.style,
          backgroundColor: bgColor,
          backgroundOpacity: '25%',
          backdropBlur: true,
          scrollbarMode: 'off',
          blurQuality: "auto",
          blurRadius: 4
        }}
      >
        {props.children}
      </lvgl-obj>
    );
  },
);
