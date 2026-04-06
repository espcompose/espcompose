/**
 * Switch — a label + switch in a row layout.
 *
 * Compiles to a container with a label and a switch widget.
 * Label uses `ds-text-primary` style reference; switch inherits part
 * styles from the LVGL `theme:` block.
 */

import type { EspComposeElement, TriggerHandler, SizeValue, WidgetProps } from '@espcompose/core';
import { createWidgetComponent, useTheme } from '@espcompose/core';
import { themeLeaf } from '../hooks/utils';
import { Theme } from '../theme/types';

export type SwitchProps = WidgetProps<{
  /** Label text displayed next to the switch. */
  label: string;
  /** Bound value (sensor or entity reference). */
  value?: boolean;
  /** Change handler (ESPHome action). */
  onChange?: TriggerHandler<{ x: boolean }>;
  /** Width of the field container. */
  width?: SizeValue;
}>;

/**
 * Switch — a label + switch in a row layout.
 *
 * @example
 * <Switch label="Lamp" />
 */
export const Switch = createWidgetComponent(
  (props: SwitchProps): EspComposeElement => {
    const font = themeLeaf('typography', 'body');
    const theme = useTheme<Theme>();

    return (
      <lvgl-obj
        style={{
          backgroundOpacity: 'transparent',
          borderWidth: 0,
          width: props.width ?? '100%',
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'spaceBetween',
          alignItems: 'center',
        }}
      >
        <lvgl-label
          style={{
            color: theme?.colors?.textPrimary,
            font: font,
          }}
          text={props.label}
        />
        <lvgl-switch
          x:custom={{
            ...(props.value != null ? { state: { checked: props.value } } : {}),
            ...(props.onChange != null ? { on_change: props.onChange } : {}),
          }}
        />
      </lvgl-obj>
    );
  },
);
