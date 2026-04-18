/**
 * SensorText — a text display driven by a SensorBinding.
 *
 * Wraps <Text> and maps binding stateText or value → text.
 * The caller provides the binding (e.g. from useHAEntity).
 */

import type { SensorBinding, BinarySensorBinding, LightBinding, WidgetProps } from '@espcompose/core';
import { createLvglWidget, useMemo } from '@espcompose/core';
import { Text } from './Text';
import type { TextVariant, StatusToken } from '../theme/types';

type SensorTextProps = WidgetProps<{
  /** Readable binding (from useHAEntity or similar). */
  binding: SensorBinding | BinarySensorBinding | LightBinding;
  /** Display label prefix. Rendered as "Label: value". */
  label: string;
  /** Override text entirely. */
  text?: string;
  /** Typography variant. Default: 'body'. */
  variant?: TextVariant;
  /** Text color as a StatusToken (e.g. 'primary'). If omitted, uses theme default. */
  color?: StatusToken;
}>;

/**
 * SensorText — display a sensor/entity state as text.
 *
 * @example
 * const sensor = useHAEntity('sensor.temperature');
 * <SensorText binding={sensor} label="Temperature" />
 */
export const SensorText = createLvglWidget<SensorTextProps>(
  (props) => {
    const text = props.text ?? useMemo(() => `${props.label}: ${props.binding.stateText}`);

    return (
      <Text
        text={text}
        variant={props.variant}
        color={props.color}
        style={props.style}
      />
    );
  },
);
