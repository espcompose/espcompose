/**
 * LightSwitch — a switch driven by a LightBinding (or SwitchBinding).
 *
 * Wraps <Switch> and maps binding isOn → value, toggle → onChange.
 * The caller provides the binding (e.g. from useHAEntity).
 */

import type { EspComposeElement, SizeValue, LightBinding, SwitchBinding, FanBinding, WidgetProps } from '@espcompose/core';
import { createWidgetComponent } from '@espcompose/core';
import { Switch } from './Switch';

type LightSwitchProps = WidgetProps<{
  /** Toggleable binding (from useHAEntity or similar). */
  binding: LightBinding | SwitchBinding | FanBinding;
  /** Display label. */
  label: string;
  /** Width of the field container. */
  width?: SizeValue;
}>;

/**
 * LightSwitch — a switch that displays on/off state and toggles on change.
 *
 * @example
 * const light = useHAEntity('light.office');
 * <LightSwitch binding={light} label="Office" />
 */
export const LightSwitch = createWidgetComponent(
  (props: LightSwitchProps): EspComposeElement => {
    return (
      <Switch
        label={props.label}
        value={props.binding.isOn}
        onChange={() => { props.binding.toggle(); }}
        width={props.width}
      />
    );
  },
);
