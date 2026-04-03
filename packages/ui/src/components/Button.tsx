/**
 * Button component — interactive button with label.
 *
 * Compiles to <lvgl-button> with an inner <lvgl-label>.
 * Uses reactive theme tokens for colors, sizing and typography.
 * All visual props are reactive — they update when the theme changes.
 */

import type { EspComposeElement, TriggerHandler, BindProp } from '@esphome/compose';
import { createIntentComponent, LVGL_INTENTS, useMemo } from '@esphome/compose';
import { resolveSize, resolveTypography, resolveFont, resolveStatus } from '../theme/resolvers';
import type { StatusToken, SizeToken } from '../theme/types';

type ButtonVariant = 'solid' | 'outline';

interface ButtonProps {
  /** Button label text. */
  text?: BindProp<string>;
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
    const sc = resolveStatus(status);
    const typo = resolveTypography('body');
    const font = resolveFont({ fontFamily: typo.fontFamily, fontSize: dims.fontSize });

    const bgColor = variant === 'solid' ? sc.bg : undefined;
    const bgOpa = variant === 'outline' ? 'TRANSP' : undefined;
    const borderColor = variant === 'outline' ? sc.bg : undefined;
    const borderWidth = variant === 'outline' ? 2 : 0;
    const textColor = variant === 'solid' ? sc.text : sc.bg;

    // Pressed state colors (reactive)
    const pressed: Record<string, unknown> =
      variant === 'solid'
        ? { bgColor: sc.bgPressed }
        : { bgColor: sc.bg, bgOpa: 'COVER' };

    // Width: derived from reactive paddingX if no override.
    // The compiler transform (espcompose transform-lib) compiles this to
    // __espcompose.slotted() with a C++ template at library build time.
    const width = props.width ?? useMemo(() => dims.paddingX * 2 + 80);
    const height = props.height ?? dims.height;

    // State-variant and extension props stay untyped (not representable in JSX)
    const extraProps: Record<string, unknown> = {
      pressed,
      ...(props.onPress != null ? { onPress: props.onPress } : {}),
    };

    return (
      <lvgl-button
        bgColor={bgColor}
        bgOpa={bgOpa}
        borderColor={borderColor}
        borderWidth={borderWidth}
        width={width}
        height={height}
        x={props.x}
        y={props.y}
        {...extraProps}
      >
        <lvgl-label
          text={props.text ?? ''}
          textColor={textColor}
          textFont={font}
          align="CENTER"
        />
      </lvgl-button>
    );
  },
  {
    intents: [LVGL_INTENTS.WIDGET] as const,
    allowedChildIntents: [] as const,
  },
);
