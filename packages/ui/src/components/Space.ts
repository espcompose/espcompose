/**
 * Layout components — Space, VStack, HStack
 *
 * Space is the primary flex-layout component (similar to AntD's Space).
 * VStack and HStack are convenience wrappers that set direction.
 *
 * Compiles to <lvgl-obj> with ESPHome LVGL flex layout configuration.
 * Gap (pad_row / pad_column) is placed INSIDE the layout dict per ESPHome docs.
 */

import type { EspComposeElement } from '@esphome/compose';
import { createIntentComponent, LVGL_INTENTS } from '@esphome/compose';
import { resolveSpacing } from '../theme/resolvers';
import type { SpacingToken } from '../theme/types';

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

type FlexAlign = 'START' | 'CENTER' | 'END' | 'SPACE_BETWEEN' | 'SPACE_AROUND' | 'SPACE_EVENLY';
type CrossAlign = 'START' | 'CENTER' | 'END' | 'STRETCH';

interface SpaceProps {
  children?: EspComposeElement | EspComposeElement[];
  /** Layout direction. Default: 'vertical'. */
  direction?: 'horizontal' | 'vertical';
  /** Gap between children. Token name or pixel value. */
  gap?: SpacingToken | number;
  /** Padding around the container. Token name or pixel value. */
  padding?: SpacingToken | number;
  /** Main axis alignment. */
  align?: FlexAlign;
  /** Cross axis alignment. */
  crossAlign?: CrossAlign;
  /** Enable wrapping (ROW_WRAP / COLUMN_WRAP). Default: false. */
  wrap?: boolean;
  /** Width. Numeric pixels, percentage string, or 'SIZE_CONTENT'. */
  width?: number | string;
  /** Height. Numeric pixels, percentage string, or 'SIZE_CONTENT'. */
  height?: number | string;
  /** Background color (hex). */
  bgColor?: string;
  /** Background opacity. */
  bgOpa?: 'TRANSP' | 'COVER';
  /** Border radius. */
  radius?: number;
  /** Border width in pixels. Default: 0. */
  borderWidth?: number;
  /** Border color (hex). */
  borderColor?: string;
}

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

function buildFlexLayout(
  flow: string,
  gapKey: 'pad_row' | 'pad_column',
  props: SpaceProps,
): Record<string, unknown> {
  const gap = props.gap != null ? resolveSpacing(props.gap) : undefined;
  return {
    type: 'flex',
    flex_flow: flow,
    ...(props.align ? { flex_align_main: props.align } : {}),
    ...(props.crossAlign ? { flex_align_cross: props.crossAlign } : {}),
    ...(gap != null ? { [gapKey]: gap } : {}),
  };
}

function buildSpaceElement(props: SpaceProps): EspComposeElement {
  const isRow = (props.direction ?? 'vertical') === 'horizontal';
  const baseFlow = isRow ? 'ROW' : 'COLUMN';
  const flow = props.wrap ? `${baseFlow}_WRAP` : baseFlow;
  const gapKey = isRow ? 'pad_column' : 'pad_row';
  const padding = props.padding != null ? resolveSpacing(props.padding) : undefined;

  return {
    type: 'lvgl-obj',
    props: {
      width: props.width ?? '100%',
      height: props.height ?? 'SIZE_CONTENT',
      ...(padding != null ? { padAll: padding } : {}),
      ...(props.bgColor != null ? { bgColor: props.bgColor } : {}),
      ...(props.bgOpa != null ? { bgOpa: props.bgOpa } : { bgOpa: 'TRANSP' }),
      ...(props.radius != null ? { radius: props.radius } : {}),
      borderWidth: props.borderWidth ?? 0,
      ...(props.borderColor != null ? { borderColor: props.borderColor } : {}),
      'x:custom': {
        scrollbar_mode: 'OFF',
        layout: buildFlexLayout(flow, gapKey, props),
      },
      ...(props.children
        ? { children: Array.isArray(props.children) ? props.children : [props.children] }
        : {}),
    },
  };
}

const LAYOUT_INTENTS = {
  intents: [LVGL_INTENTS.WIDGET] as const,
  allowedChildIntents: [LVGL_INTENTS.WIDGET] as const,
  contextTransparent: true as const,
};

// ────────────────────────────────────────────────────────────────────────────
// Space
// ────────────────────────────────────────────────────────────────────────────

/**
 * Flexible space layout — arranges children along a direction.
 *
 * Similar to AntD's `<Space>`. Defaults to vertical (column) layout.
 * Supports wrapping via the `wrap` prop.
 *
 * @example
 * <Space direction="horizontal" gap="md" align="SPACE_BETWEEN">
 *   <Text>Left</Text>
 *   <Text>Right</Text>
 * </Space>
 *
 * <Space gap="lg" wrap>
 *   <Button text="A" />
 *   <Button text="B" />
 *   <Button text="C" />
 * </Space>
 */
export const Space = createIntentComponent(
  (props: SpaceProps): EspComposeElement => buildSpaceElement(props),
  LAYOUT_INTENTS,
);

// ────────────────────────────────────────────────────────────────────────────
// VStack  (convenience wrapper — vertical Space)
// ────────────────────────────────────────────────────────────────────────────

/**
 * Vertical stack layout — shorthand for `<Space direction="vertical">`.
 *
 * @example
 * <VStack gap="md" padding="lg">
 *   <Text variant="title">Hello</Text>
 *   <Button text="Click me" />
 * </VStack>
 */
export const VStack = createIntentComponent(
  (props: Omit<SpaceProps, 'direction'>): EspComposeElement =>
    buildSpaceElement({ ...props, direction: 'vertical' }),
  LAYOUT_INTENTS,
);

// ────────────────────────────────────────────────────────────────────────────
// HStack  (convenience wrapper — horizontal Space)
// ────────────────────────────────────────────────────────────────────────────

/**
 * Horizontal stack layout — shorthand for `<Space direction="horizontal">`.
 *
 * @example
 * <HStack gap="sm" align="SPACE_BETWEEN">
 *   <Text>Left</Text>
 *   <Text>Right</Text>
 * </HStack>
 */
export const HStack = createIntentComponent(
  (props: Omit<SpaceProps, 'direction'>): EspComposeElement =>
    buildSpaceElement({ ...props, direction: 'horizontal' }),
  LAYOUT_INTENTS,
);
