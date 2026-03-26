/**
 * SwitchField — a label + switch in a row layout.
 *
 * Compiles to a container with a label and a switch widget.
 * Label uses `ds-text-primary` style reference; switch inherits part
 * styles from the LVGL `theme:` block.
 */

import type { EspComposeElement, TriggerHandler } from '@esphome/compose';
import { createIntentComponent, LVGL_INTENTS } from '@esphome/compose';
import { STYLE_TEXT_PRIMARY } from '../theme/style-ids';

interface SwitchFieldProps {
  /** Label text displayed next to the switch. */
  label: string;
  /** Bound value (sensor or entity reference). */
  value?: unknown;
  /** Change handler (ESPHome action). */
  onChange?: TriggerHandler<{ x: boolean }>;
  /** Width of the field container. */
  width?: number | string;
}

/**
 * SwitchField — a label + switch in a row layout.
 *
 * @example
 * <SwitchField label="Lamp" />
 */
export const SwitchField = createIntentComponent(
  (props: SwitchFieldProps): EspComposeElement => {
    const label: EspComposeElement = {
      type: 'lvgl-label',
      props: {
        styles: STYLE_TEXT_PRIMARY,
        text: props.label,
      },
    };

    const switchProps: Record<string, unknown> = {
      ...(props.value != null ? { 'x:custom': { value: props.value } } : {}),
      ...(props.onChange != null ? { 'x:custom': { on_change: props.onChange } } : {}),
    };

    const switchEl: EspComposeElement = {
      type: 'lvgl-switch',
      props: switchProps,
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
            flex_flow: 'ROW',
            flex_align_main: 'SPACE_BETWEEN',
            flex_align_cross: 'CENTER',
          },
        },
        children: [label, switchEl],
      },
    };
  },
  {
    intents: [LVGL_INTENTS.WIDGET] as const,
    allowedChildIntents: [] as const,
  },
);
