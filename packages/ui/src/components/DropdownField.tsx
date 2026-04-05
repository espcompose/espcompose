/**
 * DropdownField — a label + dropdown composite.
 *
 * Compiles to a container with a label and a dropdown widget.
 * Label uses `ds-text-primary` style reference.
 */

import type { EspComposeElement, TriggerHandler } from '@espcompose/core';
import { createIntentComponent, LVGL_INTENTS, useReactiveTheme } from '@espcompose/core';
import { resolveSpacing, resolveTypography, resolveFont } from '../theme/resolvers';
import type { SpacingToken } from '../theme/types';

interface DropdownFieldProps {
  /** Label text displayed above the dropdown. */
  label: string;
  /** Newline-separated option values (ESPHome LVGL format). */
  options: string;
  /** Bound selection index. */
  value?: unknown;
  /** Change handler (ESPHome action). */
  onChange?: TriggerHandler<{ x: number }>;
  /** Gap between label and dropdown. Default: 'xs'. */
  gap?: SpacingToken | number;
  /** Width of the field container. */
  width?: number | string;
}

/**
 * DropdownField — a label + dropdown composite.
 *
 * @example
 * <DropdownField label="Mode" options={"Auto\nCool\nHeat"} />
 */
export const DropdownField = createIntentComponent(
  (props: DropdownFieldProps): EspComposeElement => {
    const gap = props.gap != null ? resolveSpacing(props.gap) : undefined;
    const typo = resolveTypography('body');
    const font = resolveFont({ fontFamily: typo.fontFamily, fontSize: typo.fontSize });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const theme = useReactiveTheme() as any;

    return (
      <lvgl-obj
        style={{
          backgroundOpacity: 'transparent',
          width: props.width ?? '100%',
          height: 'fit-content',
        }}
        x:custom={{
          layout: {
            type: 'flex',
            flex_flow: 'COLUMN',
            ...(gap != null ? { pad_row: gap } : {}),
          },
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
  {
    intents: [LVGL_INTENTS.WIDGET] as const,
    allowedChildIntents: [] as const,
  },
);
