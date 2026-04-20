/**
 * Slider — a single LVGL slider widget, theme-styled.
 *
 * Compiles to `<lvgl-slider>`. Visual styling for the track, indicator,
 * and knob parts is sourced from `theme.parts.slider`. This component
 * is intentionally a bare control: it renders only the slider itself.
 * Compose it with layout primitives (HStack/VStack) and a Text label
 * if you need a labelled field.
 */

import type { TriggerHandler, WidgetProps } from '@espcompose/core';
import { createLvglWidget, useTheme } from '@espcompose/core';
import { UI_THEME_SCOPE } from '../theme/scope';
import type { Theme } from '../theme/types';

export type SliderProps = WidgetProps<{
  /** Bound value (sensor or entity reference). */
  value?: number;
  /** Change handler (ESPHome action). */
  onChange?: TriggerHandler<{ x: number }>;
  /** Minimum value. Default: 0. */
  min?: number;
  /** Maximum value. Default: 100. */
  max?: number;
}>;

/**
 * Slider — a themed LVGL slider.
 *
 * @example
 * <Slider min={0} max={255} value={brightness} onChange={({ x }) => …} />
 *
 * @example // labelled field
 * <VStack gap="xs">
 *   <Text>Brightness</Text>
 *   <Slider min={0} max={255} />
 * </VStack>
 */
export const Slider = createLvglWidget<SliderProps>(
  (props) => {
    const theme = useTheme<Theme>(UI_THEME_SCOPE);

    return (
      <lvgl-slider
        minValue={props.min}
        maxValue={props.max}
        value={props.value}
        {...(props.onChange != null ? { onRelease: props.onChange } : {})}
        style={{
          // Widget height matches knob diameter so the knob never overflows
          // the widget's layout bounds.  In LVGL, `padding` on the knob part
          // extends the knob *outward* from the track; the next row in a
          // VStack does not reserve space for that overflow.  Keeping
          // knob = widget height (no extra knob padding) avoids overlap.
          width: '100%',
          //height: 26,
          padding: -2,
          borderRadius: 'circle',
          backgroundOpacity: 'opaque',
          backgroundColor: theme?.parts?.slider?.track,
          borderWidth: 0,
          indicator: {
            borderWidth: 0,
            borderRadius: 'circle',
            backgroundOpacity: 'opaque',
            backgroundColor: theme?.parts?.slider?.bg,
          },
          knob: {
            padding: 6,
            borderWidth: 2,
            borderColor: theme?.parts?.slider?.track,
            borderRadius: 'circle',
            backgroundOpacity: 'opaque',
            backgroundColor: theme?.parts?.slider?.knob,
          },
          ...props.style,
        }}
      />
    );
  },
);
