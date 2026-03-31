/**
 * SwitchField — a label + switch in a row layout.
 *
 * Compiles to a container with a label and a switch widget.
 * Label uses `ds-text-primary` style reference; switch inherits part
 * styles from the LVGL `theme:` block.
 */

import type { EspComposeElement, TriggerHandler } from '@esphome/compose';
import { createIntentComponent, LVGL_INTENTS, useReactiveTheme } from '@esphome/compose';
import { resolveTypography, resolveFont } from '../theme/resolvers';

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
            flex_flow: 'ROW',
            flex_align_main: 'SPACE_BETWEEN',
            flex_align_cross: 'CENTER',
          },
        }}
      >
        <lvgl-label
          textColor={theme?.colors?.textPrimary}
          textFont={font}
          text={props.label}
        />
        <lvgl-switch
          x:custom={{
            ...(props.value != null ? { value: props.value } : {}),
            ...(props.onChange != null ? { on_change: props.onChange } : {}),
          }}
        />
      </lvgl-obj>
    );
  },
  {
    intents: [LVGL_INTENTS.WIDGET] as const,
    allowedChildIntents: [] as const,
  },
);
