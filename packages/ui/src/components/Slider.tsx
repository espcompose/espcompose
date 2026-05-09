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
import { createLvglWidget } from '@espcompose/core';
import { UITheme } from '../theme/theme';

export type SliderProps = WidgetProps<{
  /** Bound value (sensor or entity reference). */
  value?: number;
  /** Change handler (ESPHome action). */
  onChange?: TriggerHandler<{ x: number }>;
  /** Minimum value. Default: 0. */
  min?: number;
  /** Maximum value. Default: 100. */
  max?: number;
  /** Slider orientation. Default: 'horizontal'. */
  orientation?: 'horizontal' | 'vertical';
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
    const theme = UITheme.use();
    const vertical = props.orientation === 'vertical';

    return (
      <lvgl-obj style={{
        width: vertical ? 27 : '100%',
        height: vertical ? 'fit-content' : 27,
        paddingTop: vertical ? 9 : 4,
        paddingBottom: vertical ? 11 : 4,
        paddingLeft: vertical ? 4 : 11,
        paddingRight: vertical ? 4 : 9,
        ...props.style,
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
          }}
        />
      </lvgl-obj>
    );
  },
);
