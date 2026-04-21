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
      <lvgl-obj style={{
        width: '100%',
        height: 27,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 11,
        paddingRight: 9,        
      }}>
        <lvgl-slider
          minValue={props.min}
          maxValue={props.max}
          value={props.value}
          onRelease={props.onChange}
          style={{
            width: '100%',
            height: '100%',
            paddingLeft: 0,
            borderRadius: 'circle',
            backgroundOpacity: 'opaque',
            backgroundColor: theme?.parts?.slider?.rail,
            borderWidth: 0,
            indicator: {
              borderWidth: 0,
              borderRadius: 'circle',
              backgroundOpacity: 'opaque',
              backgroundColor: theme?.parts?.slider?.indicator,
            },
            knob: {
              padding: 4,
              borderWidth: 2,
              borderColor: theme?.parts?.slider?.rail,
              borderRadius: 'circle',
              backgroundOpacity: 'opaque',
              backgroundColor: theme?.parts?.slider?.knob,
            },
            ...props.style,
          }}
        />
      </lvgl-obj>
    );
  },
);
