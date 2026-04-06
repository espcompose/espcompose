/**
 * Text component — semantic text display.
 *
 * Compiles to <lvgl-label> with theme-driven typography via reactive tokens.
 */

import type { EspComposeElement, WidgetProps } from '@espcompose/core';
import { createWidgetComponent, useReactiveTheme } from '@espcompose/core';
import { useTypography, useFont, useStatus } from '../theme/resolvers';
import type { TextVariant, StatusToken } from '../theme/types';

type TextProps = WidgetProps<{
  children?: EspComposeElement | EspComposeElement[];
  /** Typography variant. Determines font size. Default: 'body'. */
  variant?: TextVariant;
  /** Static text content. Use this or children. */
  text?: string;
  /** Text alignment within the label. */
  align?: 'left' | 'center' | 'right' | 'auto';
  /** Text color as a StatusToken (e.g. 'primary'). If omitted, uses theme textPrimary. */
  color?: StatusToken;
  /** Long text mode. */
  longMode?: 'WRAP' | 'DOT' | 'SCROLL' | 'SCROLL_CIRCULAR' | 'CLIP';
}, 'longMode'>;

/**
 * Text — a styled label component.
 *
 * @example
 * <Text variant="title">Living Room</Text>
 * <Text variant="caption" color="primary">Last updated: 5m ago</Text>
 */
export const Text = createWidgetComponent(
  (props: TextProps): EspComposeElement => {
    const variant = props.variant ?? 'body';
    const typo = useTypography(variant);
    const font = useFont({ fontFamily: typo.fontFamily, fontSize: typo.fontSize });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const theme = useReactiveTheme() as any;
    const textColor = props.color != null
      ? useStatus(props.color).text
      : theme?.colors?.textPrimary;

    return (
      <lvgl-label
        text={props.text}
        longMode={props.longMode}
        style={{
          color: textColor,
          font: font,
          textAlign: props.align,
          width: props.style?.width,
          height: props.style?.height,
        }}
      />
    );
  },
);
