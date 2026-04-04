/**
 * SliderField — a label + slider composite.
 *
 * Compiles to a container with a label and a slider widget.
 * Label uses `ds-text-primary` style reference; slider inherits part
 * styles from the LVGL `theme:` block.
 */

import type { EspComposeElement, TriggerHandler, BindProp } from '@espcompose/core';
import { createIntentComponent, LVGL_INTENTS, useReactiveTheme } from '@espcompose/core';
import { resolveSpacing, resolveTypography, resolveFont } from '../theme/resolvers';
import type { SpacingToken } from '../theme/types';

interface SliderFieldProps {
  /** Label text displayed above the slider. */
  label: string;
  /** Bound value (sensor or entity reference). */
  value?: BindProp<number>;
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
    const typo = resolveTypography('body');
    const font = resolveFont({ fontFamily: typo.fontFamily, fontSize: typo.fontSize });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const theme = useReactiveTheme() as any;

    return (
      <lvgl-obj
        bgOpa="TRANSP"
        width={props.width ?? '100%'}
        height="SIZE_CONTENT"
        x:custom={{
          layout: {
            type: 'flex',
            flex_flow: 'COLUMN',
            ...(gap != null ? { pad_row: gap } : {}),
          },
        }}
      >
        <lvgl-label
          textColor={theme?.colors?.textPrimary}
          textFont={font}
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
  {
    intents: [LVGL_INTENTS.WIDGET] as const,
    allowedChildIntents: [] as const,
  },
);
