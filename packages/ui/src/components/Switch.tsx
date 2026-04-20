/**
 * Switch — a single LVGL switch widget, theme-styled.
 *
 * Compiles to `<lvgl-switch>`. Visual styling for the track, indicator,
 * and knob parts is sourced from `theme.parts.switch`. This component
 * is intentionally a bare control: it renders only the switch itself.
 * Compose it with HStack + Text if you need a labelled row.
 */

import type { TriggerHandler, WidgetProps } from '@espcompose/core';
import { createLvglWidget, useTheme } from '@espcompose/core';
import { UI_THEME_SCOPE } from '../theme/scope';
import { Theme } from '../theme/types';

export type SwitchProps = WidgetProps<{
  /** Bound value (sensor or entity reference). */
  value?: boolean;
  /** Change handler (ESPHome action). */
  onChange?: TriggerHandler<{ x: boolean }>;
}>;

/**
 * Switch — a themed LVGL switch.
 *
 * @example
 * <Switch value={light.isOn} onChange={() => light.toggle()} />
 *
 * @example // labelled row
 * <HStack justify="spaceBetween" align="center">
 *   <Text>Lamp</Text>
 *   <Switch value={lamp.isOn} onChange={() => lamp.toggle()} />
 * </HStack>
 */
export const Switch = createLvglWidget<SwitchProps>(
  (props) => {
    const theme = useTheme<Theme>(UI_THEME_SCOPE);

    return (
      <lvgl-switch
        x:custom={{
          ...(props.value != null ? { state: { checked: props.value } } : {}),
          ...(props.onChange != null ? { on_change: props.onChange } : {}),
        }}
        style={{
          width: 50,
          height: 20,
          borderRadius: 'circle',
          backgroundOpacity: 'transparent',
          borderWidth: 0,
          padding: 2,
          indicator: {
            borderRadius: 'circle',
            borderWidth: 0,
            backgroundOpacity: 'opaque',
            backgroundColor: theme?.parts?.switch?.bgOff,
            checked: {
              backgroundColor: theme?.parts?.switch?.bg,
            },
          },
          knob: {
            // In LVGL, knob base size = full widget height.  Negative padding
            // shrinks the knob inward so it fits within the track padding area.
            // The value -(padding) ensures the visual knob exactly fills the
            // content area.
            padding: 2,
            borderRadius: 'circle',
            backgroundOpacity: 'opaque',
            backgroundColor: theme?.parts?.switch?.knob,
          },
          ...props.style,
        }}
      />
    );
  },
);
