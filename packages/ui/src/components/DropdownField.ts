/**
 * DropdownField — a label + dropdown composite.
 *
 * Compiles to a container with a label and a dropdown widget.
 * Label uses `ds-text-primary` style reference.
 */

import type { EspComposeElement } from '@esphome/compose';
import { createIntentComponent, LVGL_INTENTS } from '@esphome/compose';
import { resolveSpacing } from '../theme/resolvers';
import type { SpacingToken } from '../theme/types';
import { STYLE_TEXT_PRIMARY } from '../theme/style-ids';

interface DropdownFieldProps {
  /** Label text displayed above the dropdown. */
  label: string;
  /** Newline-separated option values (ESPHome LVGL format). */
  options: string;
  /** Bound selection index. */
  value?: unknown;
  /** Change handler (ESPHome action). */
  onChange?: unknown;
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

    const label: EspComposeElement = {
      type: 'lvgl-label',
      props: {
        styles: STYLE_TEXT_PRIMARY,
        text: props.label,
      },
    };

    const dropdownProps: Record<string, unknown> = {
      options: props.options,
      ...(props.value != null ? { selected: props.value } : {}),
      ...(props.onChange != null ? { 'x:custom': { on_change: props.onChange } } : {}),
    };

    const dropdown: EspComposeElement = {
      type: 'lvgl-dropdown',
      props: dropdownProps,
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
            flex_flow: 'COLUMN',
            ...(gap != null ? { pad_row: gap } : {}),
          },
        },
        children: [label, dropdown],
      },
    };
  },
  {
    intents: [LVGL_INTENTS.WIDGET] as const,
    allowedChildIntents: [] as const,
  },
);
