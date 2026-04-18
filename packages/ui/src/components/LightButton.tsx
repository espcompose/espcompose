/**
 * LightButton — a button driven by a LightBinding.
 *
 * Wraps <Button> and maps binding state → label text, toggle → onPress.
 * The caller provides the binding (e.g. from useHAEntity).
 */

import type { TriggerHandler, LightBinding, WidgetProps } from '@espcompose/core';
import { createLvglWidget, useMemo } from '@espcompose/core';
import { Button } from './Button';
import type { ButtonVariant } from './shared-types';
import type { StatusToken, SizeToken } from '../theme/types';

type LightButtonProps = WidgetProps<{
  /** Light binding (from useHAEntity or similar). */
  binding: LightBinding;
  /** Display label. */
  label: string;
  /** Override label text. Default: derived from binding isOn state. */
  text?: string;
  /** Override press action. Default: binding.toggle(). */
  onPress?: TriggerHandler;
  /** Color scheme. Default: 'primary'. */
  status?: StatusToken;
  /** Size. Default: 'md'. */
  size?: SizeToken;
  /** Visual variant. Default: 'solid'. */
  variant?: ButtonVariant;
}>;

/**
 * LightButton — a button that displays light state and toggles on press.
 *
 * @example
 * const light = useHAEntity('light.office');
 * <LightButton binding={light} label="Office" />
 */
export const LightButton = createLvglWidget<LightButtonProps>(
  (props) => {
    const text = props.text ?? useMemo(() => (props.binding.isOn ? `${props.label} On` : `${props.label} Off`));
    const onPress = props.onPress ?? (() => { props.binding.toggle(); });

    return (
      <Button
        text={text}
        onPress={onPress}
        status={props.status}
        size={props.size}
        variant={props.variant}
        style={props.style}
      />
    );
  },
);
