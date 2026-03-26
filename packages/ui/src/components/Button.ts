/**
 * Button component — interactive button with label.
 *
 * Compiles to <lvgl-button> with an inner <lvgl-label>.
 * Uses theme-driven status colors and sizes.
 * Visual styles come from style definition references; structural props inline.
 */

import type { EspComposeElement, TriggerHandler } from '@esphome/compose';
import { createIntentComponent, LVGL_INTENTS } from '@esphome/compose';
import { resolveSize, fontDefToLvgl, resolveStatus } from '../theme/resolvers';
import type { StatusToken, SizeToken } from '../theme/types';
import { useTheme } from '../theme/context';
import { statusStyleId, statusTextStyleId } from '../theme/style-ids';

type ButtonVariant = 'solid' | 'outline';

interface ButtonProps {
  /** Button label text. */
  text?: string;
  /** Color scheme. Default: 'primary'. */
  status?: StatusToken;
  /** Size. Default: 'md'. */
  size?: SizeToken;
  /** Visual variant. Default: 'solid'. */
  variant?: ButtonVariant;
  /** X position (pixels). */
  x?: number;
  /** Y position (pixels). */
  y?: number;
  /** Width override. */
  width?: number | string;
  /** Height override. */
  height?: number | string;
  /** Press handler (ESPHome trigger function). */
  onPress?: TriggerHandler;
}

/**
 * Button — a styled, clickable button with a label.
 *
 * @example
 * <Button text="Toggle Light" status="primary" size="lg" />
 * <Button text="Delete" status="danger" variant="outline" />
 */
export const Button = createIntentComponent(
  (props: ButtonProps): EspComposeElement => {
    const status = props.status ?? 'primary';
    const size = props.size ?? 'md';
    const variant = props.variant ?? 'solid';

    const dims = resolveSize(size);
    const theme = useTheme();
    const sc = resolveStatus(status);

    const textFont = fontDefToLvgl({ fontFamily: theme.typography.body.fontFamily, fontSize: dims.fontSize });

    // Style definitions handle base visual state; pressed must be inline
    // because ESPHome style_definitions don't support state variants.
    const pressed: Record<string, unknown> =
      variant === 'solid'
        ? { bgColor: sc.bgPressed }
        : { bgColor: sc.bg, bgOpa: 'COVER' };

    const buttonProps: Record<string, unknown> = {
      styles: statusStyleId(status, variant),
      width: props.width ?? dims.paddingX * 2 + 80,
      height: props.height ?? dims.height,
      pressed,
      ...(props.x != null ? { x: props.x } : {}),
      ...(props.y != null ? { y: props.y } : {}),
      ...(props.onPress != null ? { 'x:custom': { on_press: props.onPress } } : {}),
    };

    // Inner label
    const label: EspComposeElement = {
      type: 'lvgl-label',
      props: {
        styles: statusTextStyleId(status, variant),
        text: props.text ?? '',
        textFont,
        align: 'CENTER',
      },
    };

    return {
      type: 'lvgl-button',
      props: {
        ...buttonProps,
        children: [label],
      },
    };
  },
  {
    intents: [LVGL_INTENTS.WIDGET] as const,
    allowedChildIntents: [] as const,
  },
);
