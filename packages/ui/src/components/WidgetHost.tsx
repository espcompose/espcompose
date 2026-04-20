/**
 * WidgetHost — internal debug container for design system widgets.
 *
 * Wraps a widget in an `<lvgl-obj>` with configurable width, height, and
 * padding.  A hardcoded red debug border can be toggled via the
 * `SHOW_DEBUG_BORDER` flag to visualize layout boundaries during
 * component development.
 *
 * This is an internal helper — it is NOT exported from the public API.
 */

import type { WidgetPropsWithChildren, SizeValue } from '@espcompose/core';
import { createLvglContainerWidget } from '@espcompose/core';

/** Toggle this flag to show/hide the red debug border on all WidgetHosts. */
const SHOW_DEBUG_BORDER = false; //true;

type WidgetHostProps = WidgetPropsWithChildren<{
  width: SizeValue;
  height: SizeValue;
  padding: number;
}>;

export const WidgetHost = createLvglContainerWidget(
  (props: WidgetHostProps) => {
    return (
      <lvgl-obj
        style={{
          width: props.width,
          height: props.height,
          padding: props.padding,
          ...(SHOW_DEBUG_BORDER
            ? { borderWidth: 1, borderColor: '#FF0000' }
            : { borderWidth: 1, borderOpacity: 'transparent' }),
        }}>
        {props.children}
      </lvgl-obj>
    );
  },
);
