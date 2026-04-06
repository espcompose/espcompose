/**
 * Layout components — Space, VStack, HStack
 *
 * Space is the primary flex-layout component (similar to AntD's Space).
 * VStack and HStack are convenience wrappers that set direction.
 *
 * Compiles to <lvgl-obj> with flex layout via CSS-like style props.
 */

import type { EspComposeElement, WidgetProps } from '@espcompose/core';
import { createWidgetComponent, LVGL_INTENTS } from '@espcompose/core';
import { useSpacing } from '../hooks';
import type { SpacingToken } from '../theme/types';

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

type FlexAlign = 'start' | 'center' | 'end' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly';
type CrossAlign = 'start' | 'center' | 'end' | 'stretch';

type SpaceProps = WidgetProps<{
  children?: EspComposeElement | EspComposeElement[];
  /** Layout direction. Default: 'vertical'. */
  direction?: 'horizontal' | 'vertical';
  /** Gap between children. Token name. */
  gap?: SpacingToken;
  /** Padding around the container. Token name. */
  padding?: SpacingToken;
  /** Main axis alignment. */
  align?: FlexAlign;
  /** Cross axis alignment. */
  crossAlign?: CrossAlign;
  /** Enable wrapping (ROW_WRAP / COLUMN_WRAP). Default: false. */
  wrap?: boolean;
}>;

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

type FlexDirection = 'row' | 'column' | 'row-wrap' | 'column-wrap';

function buildSpaceElement(props: SpaceProps): EspComposeElement {
  const isRow = (props.direction ?? 'vertical') === 'horizontal';
  const baseDir = isRow ? 'row' : 'column';
  const flexDir: FlexDirection = props.wrap ? `${baseDir}-wrap` : baseDir;
  const gapKey = isRow ? 'columnGap' : 'rowGap';
  const gap = props.gap != null ? useSpacing(props.gap) : undefined;
  const padding = props.padding != null ? useSpacing(props.padding) : undefined;
  const borderRadius = props.style?.borderRadius;

  return (
    <lvgl-obj
      style={{
        width: props.style?.width ?? '100%',
        height: props.style?.height ?? 'fit-content',
        padding: padding,
        backgroundColor: props.style?.backgroundColor,
        backgroundOpacity: props.style?.backgroundOpacity ?? 'transparent',
        borderRadius: borderRadius,
        borderWidth: props.style?.borderWidth ?? 0,
        borderColor: props.style?.borderColor,
        scrollbarMode: 'off',
        display: 'flex',
        flexDirection: flexDir,
        ...(props.align ? { justifyContent: props.align } : {}),
        ...(props.crossAlign ? { alignItems: props.crossAlign } : {}),
        ...(gap != null ? { [gapKey]: gap } : {}),
      }}
    >
      {props.children}
    </lvgl-obj>
  );
}

const LAYOUT_OVERRIDES = {
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
export const Space = createWidgetComponent(
  (props: SpaceProps): EspComposeElement => buildSpaceElement(props),
  LAYOUT_OVERRIDES,
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
export const VStack = createWidgetComponent(
  (props: Omit<SpaceProps, 'direction'>): EspComposeElement =>
    buildSpaceElement({ ...props, direction: 'vertical' }),
  LAYOUT_OVERRIDES,
);

// ────────────────────────────────────────────────────────────────────────────
// HStack  (convenience wrapper — horizontal Space)
// ────────────────────────────────────────────────────────────────────────────

/**
 * Horizontal stack layout — shorthand for `<Space direction="horizontal">`.
 *
 * @example
 * <HStack gap="sm" align="spaceBetween">
 *   <Text>Left</Text>
 *   <Text>Right</Text>
 * </HStack>
 */
export const HStack = createWidgetComponent(
  (props: Omit<SpaceProps, 'direction'>): EspComposeElement =>
    buildSpaceElement({ ...props, direction: 'horizontal' }),
  LAYOUT_OVERRIDES,
);
