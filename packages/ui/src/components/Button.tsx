/**
 * Button component — interactive button with optional label or children.
 *
 * Compiles to <lvgl-button>. If `children` are provided, they are rendered
 * inside the button. Otherwise, if `text` is provided, an internal
 * <lvgl-label> is rendered as a convenience. Otherwise the button is empty.
 *
 * Uses reactive theme tokens for colors, sizing and typography.
 * All visual props are reactive — they update when the theme changes.
 */

import type { TriggerHandler, WidgetPropsWithChildren, Reactive } from '@espcompose/core';
import { createLvglWidget, useMemo, useReactive, isIRReactiveNode } from '@espcompose/core';
import { useSize, useStatus } from '../hooks';
import type { StatusToken, SizeToken } from '../theme/types';
import type { ButtonVariant } from './shared-types';

export type ButtonProps = WidgetPropsWithChildren<{
  /** Convenience label text. Ignored when `children` are provided. */
  text?: string;
  /** Color scheme. Default: 'primary'. */
  status?: StatusToken;
  /** Size. Default: 'md'. */
  size?: SizeToken;
  /** Visual variant. Default: 'solid'. */
  variant?: ButtonVariant;
  /** Press handler (ESPHome trigger function). */
  onPress?: TriggerHandler;
}>;

/**
 * Derive variant-dependent style values, composing variant reactivity
 * with status colors.
 *
 * Both branches always return a value (no `undefined`) so that the
 * resulting types stay covariant — `Signal<string>` flows cleanly
 * through `useMemo` without `IRReactiveNode<Signal<T> | undefined>`
 * mismatches. Outline hides its background via `bgOpa = 'transparent'`
 * rather than omitting bgColor.
 */
function useButtonVariant(
  variant: Reactive<ButtonVariant>,
  sc: { bg: ReturnType<typeof useStatus>['bg']; text: ReturnType<typeof useStatus>['text']; bgPressed: ReturnType<typeof useStatus>['bgPressed'] },
) {
  const resolved = useReactive(variant);

  if (isIRReactiveNode(resolved)) {
    const r = resolved;
    return {
      bgColor: sc.bg,
      bgOpa: useMemo(() => r.get() === 'solid' ? 'opaque' as const : 'transparent' as const),
      borderColor: sc.bg,
      borderWidth: useMemo(() => r.get() === 'solid' ? 0 : 2),
      textColor: useMemo(() => r.get() === 'solid' ? sc.text : sc.bg),
      pressedBg: useMemo(() => r.get() === 'solid' ? sc.bgPressed : sc.bg),
    };
  }

  const isSolid = resolved === 'solid';
  return {
    bgColor: sc.bg,
    bgOpa: isSolid ? 'opaque' as const : 'transparent' as const,
    borderColor: sc.bg,
    borderWidth: isSolid ? 0 : 2,
    textColor: isSolid ? sc.text : sc.bg,
    pressedBg: isSolid ? sc.bgPressed : sc.bg,
  };
}

/**
 * Button — a styled, clickable button.
 *
 * @example // convenience text prop
 * <Button text="Toggle Light" status="primary" size="lg" />
 *
 * @example // composed with children
 * <Button status="danger" variant="outline">
 *   <Text color="danger">Delete</Text>
 * </Button>
 */
export const Button = createLvglWidget<ButtonProps>(
  (props) => {
    const dims = useSize(props.size ?? 'md');
    const sc = useStatus(props.status ?? 'primary');
    const vs = useButtonVariant(props.variant ?? 'solid', sc);

    // Width: derived from reactive paddingX if no override.
    const width = props.style?.width ?? useMemo(() => dims.paddingX * 2 + 80);
    const height = props.style?.height ?? dims.height;

    const hasChildren = props.children != null
      && (!Array.isArray(props.children) || props.children.length > 0);

    const labelChild = props.text != null
      ? <lvgl-label
          text={props.text}
          style={{
            color: vs.textColor,
            font: dims.font,
            textAlign: 'center',
            placeSelf: 'center',
          }}
        />
      : undefined;

    return (
      <lvgl-button
        style={{
          backgroundColor: vs.bgColor,
          backgroundOpacity: vs.bgOpa,
          borderColor: vs.borderColor,
          borderWidth: vs.borderWidth,
          width: width,
          height: height,
          pressed: {
            backgroundColor: vs.pressedBg,
            backgroundOpacity: 'opaque',
          },
        }}
        {...(props.onPress != null ? { onPress: props.onPress } : {})}
      >
        {hasChildren ? props.children : labelChild}
      </lvgl-button>
    );
  },
);
