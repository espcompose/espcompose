/**
 * Slider — a label + slider composite.
 *
 * Compiles to a container with a label and a slider widget.
 * Label uses `ds-text-primary` style reference; slider inherits part
 * styles from the LVGL `theme:` block.
 */

import type { EspComposeElement, TriggerHandler, SizeValue, WidgetProps } from '@espcompose/core';
import { createWidgetComponent, useReactiveTheme } from '@espcompose/core';
import { useSpacing, useTypography, useFont } from '../theme/resolvers';
import type { SpacingToken } from '../theme/types';

export type SliderProps = WidgetProps<{
  /** Label text displayed above the slider. */
  label: string;
  /** Bound value (sensor or entity reference). */
  value?: number;
  /** Change handler (ESPHome action). */
  onChange?: TriggerHandler<{ x: number }>;
  /** Minimum value. Default: 0. */
  min?: number;
  /** Maximum value. Default: 100. */
  max?: number;
  /** Gap between label and slider. Default: 'xs'. */
  gap?: SpacingToken;
  /** Width of the field container. */
  width?: SizeValue;
}>;

/**
 * Slider — a label + slider composite.
 *
 * @example
 * <Slider label="Brightness" min={0} max={255} />
 */
export const Slider = createWidgetComponent(
  (props: SliderProps): EspComposeElement => {
    const gap = props.gap != null ? useSpacing(props.gap) : undefined;
    const typo = useTypography('body');
    const font = useFont({ fontFamily: typo.fontFamily, fontSize: typo.fontSize });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const theme = useReactiveTheme() as any;

    return (
      <lvgl-obj
        style={{
          backgroundOpacity: 'transparent',
          width: props.width ?? '100%',
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          ...(gap != null ? { rowGap: gap } : {}),
        }}
      >
        <lvgl-label
          style={{
            color: theme?.colors?.textPrimary,
            font: font,
          }}
          text={props.label}
        />
        <lvgl-slider
          minValue={props.min}
          maxValue={props.max}
          value={props.value}
          {...(props.onChange != null ? { onValue: props.onChange } : {})}
        />
      </lvgl-obj>
    );
  },
);
