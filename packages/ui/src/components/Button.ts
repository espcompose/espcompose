/**
 * Button component — interactive button with label.
 *
 * Compiles to <lvgl-button> with an inner <lvgl-label>.
 * Uses theme-driven status colors and sizes.
 */

import type { EspComposeElement } from '@esphome/compose';
import { createIntentComponent, LVGL_INTENTS } from '@esphome/compose';
import { resolveStatus, resolveSize, fontDefToLvgl } from '../theme/resolvers';
import type { StatusToken, SizeToken } from '../theme/types';
import { useTheme } from '../theme/context';

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
  /** Press handler (ESPHome action). */
  onPress?: unknown;
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

    const colors = resolveStatus(status);
    const dims = resolveSize(size);
    const theme = useTheme();

    const isSolid = variant === 'solid';

    const textFont = fontDefToLvgl({ fontFamily: theme.typography.body.fontFamily, fontSize: dims.fontSize });

    const buttonProps: Record<string, unknown> = {
      width: props.width ?? dims.paddingX * 2 + 80,
      height: props.height ?? dims.height,
      ...(props.x != null ? { x: props.x } : {}),
      ...(props.y != null ? { y: props.y } : {}),
      ...(isSolid
        ? {
            bgColor: colors.bg,
            pressed: { bgColor: colors.bgPressed },
          }
        : {
            bgOpa: 'TRANSP',
            borderColor: colors.bg,
            borderWidth: 2,
            pressed: { bgColor: colors.bg, bgOpa: 'COVER' },
          }),
      ...(props.onPress != null ? { 'x:custom': { on_press: props.onPress } } : {}),
    };

    // Inner label
    const label: EspComposeElement = {
      type: 'lvgl-label',
      props: {
        text: props.text ?? '',
        textColor: isSolid ? colors.text : colors.bg,
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
