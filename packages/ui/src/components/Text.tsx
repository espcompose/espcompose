/**
 * Text component — semantic text display.
 *
 * Compiles to <lvgl-label> with theme-driven typography via reactive tokens.
 */

import type { WidgetPropsWithChildren } from '@espcompose/core';
import { createLvglWidget, useTheme, useReactiveMap } from '@espcompose/core';
import { useStatus } from '../hooks';
import { themeLeaf } from '../hooks/utils';
import { UI_THEME_SCOPE } from '../theme/scope';
import type { TextVariant, StatusToken, Theme } from '../theme/types';

type TextProps = WidgetPropsWithChildren<{
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
export const Text = createLvglWidget<TextProps>(
  (props) => {
    const variant = props.variant ?? 'body';
    const font = useReactiveMap(variant, (v) => themeLeaf('typography', v));
    const theme = useTheme<Theme>(UI_THEME_SCOPE);
    const textColor = props.color != null
      ? useStatus(props.color).text
      : theme?.colors?.textPrimary;

    return (
      <lvgl-label
        text={props.text}
        longMode={props.longMode}
        style={{
          ...props.style,
          color: textColor,
          font: font,
          textAlign: props.align,
        }}
      />
    );
  },
);
