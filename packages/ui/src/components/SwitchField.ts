/**
 * SwitchField — a label + switch in a row layout.
 *
 * Compiles to a container with a label and a switch widget.
 */

import type { EspComposeElement } from '@esphome/compose';
import { createIntentComponent, LVGL_INTENTS } from '@esphome/compose';
import { fontDefToLvgl } from '../theme/resolvers';
import { useTheme } from '../theme/context';

interface SwitchFieldProps {
  /** Label text displayed next to the switch. */
  label: string;
  /** Bound value (sensor or entity reference). */
  value?: unknown;
  /** Change handler (ESPHome action). */
  onChange?: unknown;
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
    const theme = useTheme();

    const label: EspComposeElement = {
      type: 'lvgl-label',
      props: {
        text: props.label,
        textFont: fontDefToLvgl(theme.typography.body),
        textColor: theme.colors.textPrimary,
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
