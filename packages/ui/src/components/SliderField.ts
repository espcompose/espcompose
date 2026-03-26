/**
 * SliderField — a label + slider composite.
 *
 * Compiles to a container with a label and a slider widget.
 * Label uses `ds-text-primary` style reference; slider inherits part
 * styles from the LVGL `theme:` block.
 */

import type { EspComposeElement, TriggerHandler } from '@esphome/compose';
import { createIntentComponent, LVGL_INTENTS } from '@esphome/compose';
import { resolveSpacing } from '../theme/resolvers';
import type { SpacingToken } from '../theme/types';
import { STYLE_TEXT_PRIMARY } from '../theme/style-ids';

interface SliderFieldProps {
  /** Label text displayed above the slider. */
  label: string;
  /** Bound value (sensor or entity reference). */
  value?: unknown;
  /** Change handler (ESPHome action). */
  onChange?: TriggerHandler<{ x: number }>;
  /** Minimum value. Default: 0. */
  min?: number;
  /** Maximum value. Default: 100. */
  max?: number;
  /** Gap between label and slider. Default: 'xs'. */
  gap?: SpacingToken | number;
  /** Width of the field container. */
  width?: number | string;
}

/**
 * SliderField — a label + slider composite.
 *
 * @example
 * <SliderField label="Brightness" min={0} max={255} />
 */
export const SliderField = createIntentComponent(
  (props: SliderFieldProps): EspComposeElement => {
    const gap = props.gap != null ? resolveSpacing(props.gap) : undefined;

    const label: EspComposeElement = {
      type: 'lvgl-label',
      props: {
        styles: STYLE_TEXT_PRIMARY,
        text: props.label,
      },
    };

    const sliderProps: Record<string, unknown> = {
      ...(props.min != null ? { minValue: props.min } : {}),
      ...(props.max != null ? { maxValue: props.max } : {}),
      ...(props.value != null ? { value: props.value } : {}),
      ...(props.onChange != null ? { 'x:custom': { on_change: props.onChange } } : {}),
    };

    const slider: EspComposeElement = {
      type: 'lvgl-slider',
      props: sliderProps,
    };

    return {
      type: 'lvgl-obj',
      props: {
        bgOpa: 'TRANSP',
        ...(props.width != null ? { width: props.width } : { width: '100%' }),
        height: 'SIZE_CONTENT',
        'x:custom': {
          layout: {
            type: 'flex',
            flex_flow: 'COLUMN',
            ...(gap != null ? { pad_row: gap } : {}),
          },
        },
        children: [label, slider],
      },
    };
  },
  {
    intents: [LVGL_INTENTS.WIDGET] as const,
    allowedChildIntents: [] as const,
  },
);
