/**
 * LightSlider — a slider driven by a LightBinding.
 *
 * Wraps <Slider> and maps binding brightness → value,
 * turnOn({ brightness }) → onChange.
 * The caller provides the binding (e.g. from useHAEntity).
 */

import type { SizeValue, LightBinding, WidgetProps } from '@espcompose/core';
import { createWidget } from '@espcompose/core';
import { Slider } from './Slider';
import type { SpacingToken } from '../theme/types';

type LightSliderProps = WidgetProps<{
  /** Light binding (from useHAEntity or similar). */
  binding: LightBinding;
  /** Display label. */
  label: string;
  /** Minimum value. Default: 0. */
  min?: number;
  /** Maximum value. Default: 255. */
  max?: number;
  /** Gap between label and slider. */
  gap?: SpacingToken;
  /** Width of the field container. */
  width?: SizeValue;
}>;

/**
 * LightSlider — a slider that controls light brightness.
 *
 * @example
 * const light = useHAEntity('light.office');
 * <LightSlider binding={light} label="Brightness" />
 */
export const LightSlider = createWidget<LightSliderProps>(
  (props) => {
    return (
      <Slider
        label={props.label}
        value={isNaN(props.binding.brightness) ? 0 : props.binding.brightness}
        onChange={(args) => { props.binding.turnOn({ brightness: args.x }); }}
        min={props.min ?? 0}
        max={props.max ?? 255}
        gap={props.gap}
        width={props.width}
      />
    );
  },
);
