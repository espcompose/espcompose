/**
 * Dropdown — a label + dropdown composite.
 *
 * Compiles to a container with a label and a dropdown widget.
 * Label uses `ds-text-primary` style reference.
 */

import type { TriggerHandler, SizeValue, WidgetProps } from '@espcompose/core';
import { createLvglWidget, useTheme } from '@espcompose/core';
import { useSpacing } from '../hooks';
import { themeLeaf } from '../hooks/utils';
import type { SpacingToken, Theme } from '../theme/types';

export type DropdownProps = WidgetProps<{
  /** Label text displayed above the dropdown. */
  label: string;
  /** Newline-separated option values (ESPHome LVGL format). */
  options: string;
  /** Bound selection index. */
  value?: unknown;
  /** Change handler (ESPHome action). */
  onChange?: TriggerHandler<{ x: number }>;
  /** Gap between label and dropdown. Default: 'xs'. */
  gap?: SpacingToken;
  /** Width of the field container. */
  width?: SizeValue;
}>;

/**
 * Dropdown — a label + dropdown composite.
 *
 * @example
 * <Dropdown label="Mode" options={"Auto\nCool\nHeat"} />
 */
export const Dropdown = createLvglWidget<DropdownProps>(
  (props) => {
    const gap = props.gap != null ? useSpacing(props.gap) : undefined;
    const font = themeLeaf('typography', 'body');
    const theme = useTheme<Theme>();

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
        <lvgl-dropdown
          options={props.options}
          x:custom={{
            ...(props.value != null ? { selected: props.value } : {}),
            ...(props.onChange != null ? { on_change: props.onChange } : {}),
          }}
        />
      </lvgl-obj>
    );
  },
);
