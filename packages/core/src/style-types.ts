// ────────────────────────────────────────────────────────────────────────────
// CSS-like Style Types for LVGL
//
// CssStyleProps = CssAliasProps.
// NO raw LVGL prop names leak into the public API.  Every allowed property
// is either a CSS alias (backgroundColor → bgColor) mapped via
// CSS_TO_LVGL_MAP in style-mapping.ts.
//
// All visual styling goes through the `style` prop — no style properties
// live at the top-level of widget interfaces.
// ────────────────────────────────────────────────────────────────────────────

import type { Reactive } from './types';
import type { LvglStyleProps } from './generated/components/lvgl';
import type { ImageRef } from './component-aliases';
import type { RefProp } from './types';

// ── Utility types ──────────────────────────────────────────────────────────

/** Numeric string: '0', '128', '255', etc. */
type NumericString = `${number}`;
/** Percentage string: '50%', '100%', etc. */
export type Percentage = `${number}%`;
/** Opacity value: named alias, numeric string, or percentage. */
type OpacityValue = 'transparent' | 'opaque' | Percentage | NumericString;
/** Size value: number, named keyword, or percentage string. */
export type SizeValue = number | 'fit-content' | Percentage;

// ── CSS-like naming aliases ────────────────────────────────────────────────

/**
 * CSS-like property name aliases that map to LVGL camelCase equivalents
 * via `expandCssStyle()` at compile time.
 *
 * Alias keys are kept in sync with CSS_TO_LVGL_MAP via a compile-time
 * assertion in style-mapping.ts.  If you add or remove an alias, update
 * BOTH this interface and the map.
 */
export interface CssAliasProps {
  // ── CSS-compatible props (same name in CSS & LVGL) ───────────────────
  borderColor?: LvglStyleProps['borderColor'];
  borderWidth?: LvglStyleProps['borderWidth'];
  shadowColor?: LvglStyleProps['shadowColor'];
  shadowWidth?: LvglStyleProps['shadowWidth'];
  shadowSpread?: LvglStyleProps['shadowSpread'];
  outlineColor?: LvglStyleProps['outlineColor'];
  outlineWidth?: LvglStyleProps['outlineWidth'];
  translateX?: LvglStyleProps['translateX'];
  translateY?: LvglStyleProps['translateY'];
  // ── Sizing ───────────────────────────────────────────────────────────
  /** Maps to `width`. */
  width?: Reactive<SizeValue>;
  /** Maps to `height`. */
  height?: Reactive<SizeValue>;
  /** Maps to `minWidth`. */
  minWidth?: Reactive<SizeValue>;
  /** Maps to `maxWidth`. */
  maxWidth?: Reactive<SizeValue>;
  /** Maps to `minHeight`. */
  minHeight?: Reactive<SizeValue>;
  /** Maps to `maxHeight`. */
  maxHeight?: Reactive<SizeValue>;

  // ── Position ─────────────────────────────────────────────────────────
  /** Horizontal position. Maps to LVGL `x`. */
  left?: Reactive<number | string>;
  /** Vertical position. Maps to LVGL `y`. */
  top?: Reactive<number | string>;

  // ── Colors ───────────────────────────────────────────────────────────
  /** Maps to `bgColor`. */
  backgroundColor?: Reactive<string>;
  /** Maps to `textColor`. */
  color?: Reactive<string>;

  // ── Border ───────────────────────────────────────────────────────────
  /** Maps to `radius`. */
  borderRadius?: Reactive<number | 'circle' | NumericString>;

  // ── Padding ──────────────────────────────────────────────────────────
  /** Maps to `padAll`. */
  padding?: Reactive<number | string>;
  /** Maps to `padTop`. */
  paddingTop?: Reactive<number | string>;
  /** Maps to `padBottom`. */
  paddingBottom?: Reactive<number | string>;
  /** Maps to `padLeft`. */
  paddingLeft?: Reactive<number | string>;
  /** Maps to `padRight`. */
  paddingRight?: Reactive<number | string>;
  /** Expands to `padLeft` + `padRight`. */
  paddingHorizontal?: Reactive<number | string>;
  /** Expands to `padTop` + `padBottom`. */
  paddingVertical?: Reactive<number | string>;

  // ── Gap ──────────────────────────────────────────────────────────────
  /** Expands to `padRow` + `padColumn`. */
  gap?: Reactive<number | string>;
  /** Maps to `padRow`. */
  rowGap?: Reactive<number | string>;
  /** Maps to `padColumn`. */
  columnGap?: Reactive<number | string>;

  // ── Text ─────────────────────────────────────────────────────────────
  /** Font reference. Maps to `textFont`. */
  font?: Reactive<string | LvglStyleProps['textFont'] extends Reactive<infer T> ? T : never>;
  /** Maps to `textDecor`. */
  textDecoration?: Reactive<'none' | 'underline' | 'strikethrough'>;
  /** Maps to `textAlign`. */
  textAlign?: Reactive<'left' | 'center' | 'right' | 'auto'>;
  /** Maps to `textLetterSpace`. */
  letterSpacing?: Reactive<number>;
  /** Maps to `textLineSpace`. */
  lineHeight?: Reactive<number>;

  // ── Opacity ──────────────────────────────────────────────────────────
  /** Maps to `opa`. */
  opacity?: Reactive<OpacityValue>;
  /** Maps to `bgOpa`. */
  backgroundOpacity?: Reactive<OpacityValue>;
  /** Maps to `textOpa`. */
  textOpacity?: Reactive<OpacityValue>;
  /** Maps to `borderOpa`. */
  borderOpacity?: Reactive<OpacityValue>;
  /** Maps to `outlineOpa`. */
  outlineOpacity?: Reactive<OpacityValue>;
  /** Maps to `shadowOpa`. */
  shadowOpacity?: Reactive<OpacityValue>;

  // ── Background image ─────────────────────────────────────────────────
  /** Maps to `bgImageSrc`. */
  backgroundImage?: string | RefProp<ImageRef>;
  /** Maps to `bgImageOpa`. */
  backgroundImageOpacity?: Reactive<OpacityValue>;

  // ── Shadow ───────────────────────────────────────────────────────────
  /** Maps to `shadowOfsX`. */
  shadowOffsetX?: Reactive<number>;
  /** Maps to `shadowOfsY`. */
  shadowOffsetY?: Reactive<number>;

  // ── Arc (widget-specific) ─────────────────────────────────────────────
  /** Maps to `arcColor`. */
  arcColor?: Reactive<string>;
  /** Maps to `arcOpa`. */
  arcOpacity?: Reactive<OpacityValue>;
  /** Linecap style for arcs. Maps to `arcRounded`. */
  arcLinecap?: Reactive<'flat' | 'round'>;
  /** Maps to `arcWidth`. */
  arcStrokeWidth?: Reactive<number | string>;

  // ── Animation ─────────────────────────────────────────────────────────
  /** Maps to `animTime`. */
  animationDuration?: Reactive<number | string>;

  // ── Background gradient ───────────────────────────────────────────────
  /** Maps to `bgGrad`. */
  backgroundGradient?: LvglStyleProps['bgGrad'];
  /** Maps to `bgGradColor`. */
  backgroundGradientColor?: Reactive<string>;
  /** Maps to `bgDitherMode`. */
  backgroundGradientDither?: Reactive<'none' | 'ordered' | 'error-diffusion'>;
  /** Maps to `bgGradDir`. */
  backgroundGradientDirection?: Reactive<'none' | 'horizontal' | 'vertical'>;
  /** Maps to `bgGradStop`. */
  backgroundGradientStop?: Reactive<number | string>;
  /** Maps to `bgMainStop`. */
  backgroundGradientStartStop?: Reactive<number | string>;

  // ── Background-image extras ───────────────────────────────────────────
  /** Maps to `bgImageRecolor`. */
  backgroundImageTint?: Reactive<string>;
  /** Maps to `bgImageRecolorOpa`. */
  backgroundImageTintOpacity?: Reactive<OpacityValue>;
  /** Whether to tile the background image. Maps to `bgImageTiled`. */
  backgroundRepeat?: Reactive<'repeat' | 'no-repeat'>;

  // ── Border extras ─────────────────────────────────────────────────────
  /** Render border before or after children. Maps to `borderPost`. */
  borderDrawOrder?: Reactive<'before-children' | 'after-children'>;
  /** Maps to `borderSide`. */
  borderSides?: Reactive<'none' | 'top' | 'bottom' | 'left' | 'right' | 'internal'>;

  // ── Clipping ──────────────────────────────────────────────────────────
  /** Whether to clip children to the border radius. Maps to `clipCorner`. */
  overflow?: Reactive<'hidden' | 'visible'>;

  // ── Color filter ──────────────────────────────────────────────────────
  /** Maps to `colorFilterOpa`. */
  colorFilterOpacity?: Reactive<OpacityValue>;

  // ── Image (widget-specific) ───────────────────────────────────────────
  /** Maps to `imageRecolor`. */
  imageTint?: Reactive<string>;
  /** Maps to `imageRecolorOpa`. */
  imageTintOpacity?: Reactive<OpacityValue>;

  // ── Line / stroke (widget-specific) ───────────────────────────────────
  /** Linecap style for lines. Maps to `lineRounded`. */
  strokeLinecap?: Reactive<'flat' | 'round'>;
  /** Maps to `lineWidth`. */
  strokeWidth?: Reactive<number | string>;
  /** Maps to `lineDashWidth`. */
  strokeDashWidth?: Reactive<number | string>;
  /** Maps to `lineDashGap`. */
  strokeDashGap?: Reactive<number | string>;
  /** Maps to `lineColor`. */
  strokeColor?: Reactive<string>;

  // ── Layered opacity ───────────────────────────────────────────────────
  /** Maps to `opaLayered`. */
  opacityLayered?: Reactive<OpacityValue>;

  // ── Outline extras ────────────────────────────────────────────────────
  /** Maps to `outlinePad`. */
  outlineOffset?: Reactive<number | string>;

  // ── Transform extras ──────────────────────────────────────────────────
  /** Maps to `transformAngle`. */
  rotate?: Reactive<number | string>;
  /** Maps to `transformHeight`. */
  transformScaleY?: Reactive<number | string>;
  /** Maps to `transformPivotX`. */
  transformOriginX?: Reactive<number | string>;
  /** Maps to `transformPivotY`. */
  transformOriginY?: Reactive<number | string>;
  /** Maps to `transformZoom`. */
  scale?: Reactive<number | string>;

  // ── Layout (flex) ────────────────────────────────────────────────────
  /** Layout mode. Emitted into the `layout:` block. */
  display?: Reactive<'flex' | 'grid'>;
  /** Flex direction. Maps to `flexFlow` inside `layout:`. */
  flexDirection?: Reactive<'row' | 'column' | 'row-wrap' | 'column-wrap'>;
  /** Main-axis alignment (flex). Maps to `flexAlignMain` inside `layout:`. */
  justifyContent?: Reactive<'start' | 'center' | 'end' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly'>;
  /** Cross-axis alignment (flex). Maps to `flexAlignCross` inside `layout:`. */
  alignItems?: Reactive<'start' | 'center' | 'end' | 'stretch'>;
  /** Flex grow factor for child within flex parent. Flat widget prop. */
  flexGrow?: Reactive<number>;

  // ── Layout (grid — parent) ───────────────────────────────────────────
  /** Grid column track definitions. E.g. ['fr(1)', 'fr(2)', 200]. */
  gridTemplateColumns?: (number | string)[];
  /** Grid row track definitions. E.g. ['fr(1)', 100]. */
  gridTemplateRows?: (number | string)[];
  /** Default column alignment for grid children. Maps to `gridColumnAlign` inside `layout:`. */
  justifyItems?: Reactive<'start' | 'center' | 'end' | 'stretch' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly'>;
  /** Default row alignment for grid children. Maps to `gridRowAlign` inside `layout:`. */
  alignContent?: Reactive<'start' | 'center' | 'end' | 'stretch' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly'>;

  // ── Layout (grid — child) ────────────────────────────────────────────
  /** Grid column position (0-based). Flat widget prop. */
  gridColumn?: Reactive<number>;
  /** Grid row position (0-based). Flat widget prop. */
  gridRow?: Reactive<number>;
  /** Number of grid columns to span. Flat widget prop. */
  gridColumnSpan?: Reactive<number>;
  /** Number of grid rows to span. Flat widget prop. */
  gridRowSpan?: Reactive<number>;
  /** Per-cell column alignment override. Flat widget prop. */
  justifySelf?: Reactive<'start' | 'center' | 'end' | 'stretch'>;
  /** Per-cell row alignment override. Flat widget prop. */
  alignSelf?: Reactive<'start' | 'center' | 'end' | 'stretch'>;

  // ── Widget placement ─────────────────────────────────────────────────
  /** Widget alignment within parent (non-layout positioning). Maps to `align`. */
  placeSelf?: Reactive<'center' | 'topLeft' | 'topCenter' | 'topRight'
            | 'bottomLeft' | 'bottomCenter' | 'bottomRight'
            | 'leftCenter' | 'rightCenter'>;

  // ── Scrollbar ────────────────────────────────────────────────────────
  /** Maps to `scrollbarMode`. */
  scrollbarMode?: Reactive<'off' | 'on' | 'active' | 'auto'>;
}

// ── Composite style type ───────────────────────────────────────────────────

/**
 * CSS-like style properties.  No raw LVGL names — only CSS aliases and
 * CSS-compatible pass-throughs.
 *
 * Used as the leaf type inside the `style` prop on every widget.
 */
export type CssStyleProps = CssAliasProps;

// ── State & part name types ────────────────────────────────────────────────

export type LvglStateName =
  | 'checked' | 'focused' | 'focusKey' | 'edited'
  | 'hovered' | 'pressed' | 'scrolled' | 'disabled'
  | 'user1' | 'user2' | 'user3' | 'user4';

export type LvglPartName =
  | 'indicator' | 'knob' | 'scrollbar' | 'selected'
  | 'items' | 'ticks' | 'cursor' | 'textareaPlaceholder';

// ── CssStyle: CSS props + state + part nesting ─────────────────────────────

/**
 * A CSS-like style object for an LVGL widget.
 *
 * - Base properties style the widget's `main` part in `default` state
 * - State keys (e.g. `pressed`, `focused`) override props for that state
 * - Part keys (e.g. `indicator`, `knob`) style sub-parts, and can
 *   themselves contain state overrides
 *
 * ```tsx
 * <lvgl-slider style={{
 *   backgroundColor: theme.colors.surface,
 *   pressed: { backgroundColor: theme.colors.primary.bgPressed },
 *   indicator: {
 *     backgroundColor: theme.colors.primary.bg,
 *     pressed: { opacity: 'opaque' },
 *   },
 * }} />
 * ```
 */
export type CssStyle = CssStyleProps & {
  [S in LvglStateName]?: CssStyleProps;
} & {
  [P in LvglPartName]?: CssStyleProps & {
    [S in LvglStateName]?: CssStyleProps;
  };
} & {
  /** Reference to one or more `style_definitions` IDs. */
  styles?: string | string[];
};
