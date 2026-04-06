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

import type { BindProp } from './types';
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
  width?: BindProp<SizeValue>;
  /** Maps to `height`. */
  height?: BindProp<SizeValue>;
  /** Maps to `minWidth`. */
  minWidth?: BindProp<SizeValue>;
  /** Maps to `maxWidth`. */
  maxWidth?: BindProp<SizeValue>;
  /** Maps to `minHeight`. */
  minHeight?: BindProp<SizeValue>;
  /** Maps to `maxHeight`. */
  maxHeight?: BindProp<SizeValue>;

  // ── Position ─────────────────────────────────────────────────────────
  /** Horizontal position. Maps to LVGL `x`. */
  left?: BindProp<number | string>;
  /** Vertical position. Maps to LVGL `y`. */
  top?: BindProp<number | string>;

  // ── Colors ───────────────────────────────────────────────────────────
  /** Maps to `bgColor`. */
  backgroundColor?: BindProp<string>;
  /** Maps to `textColor`. */
  color?: BindProp<string>;

  // ── Border ───────────────────────────────────────────────────────────
  /** Maps to `radius`. */
  borderRadius?: BindProp<number | 'circle' | NumericString>;

  // ── Padding ──────────────────────────────────────────────────────────
  /** Maps to `padAll`. */
  padding?: BindProp<number | string>;
  /** Maps to `padTop`. */
  paddingTop?: BindProp<number | string>;
  /** Maps to `padBottom`. */
  paddingBottom?: BindProp<number | string>;
  /** Maps to `padLeft`. */
  paddingLeft?: BindProp<number | string>;
  /** Maps to `padRight`. */
  paddingRight?: BindProp<number | string>;
  /** Expands to `padLeft` + `padRight`. */
  paddingHorizontal?: BindProp<number | string>;
  /** Expands to `padTop` + `padBottom`. */
  paddingVertical?: BindProp<number | string>;

  // ── Gap ──────────────────────────────────────────────────────────────
  /** Expands to `padRow` + `padColumn`. */
  gap?: BindProp<number | string>;
  /** Maps to `padRow`. */
  rowGap?: BindProp<number | string>;
  /** Maps to `padColumn`. */
  columnGap?: BindProp<number | string>;

  // ── Text ─────────────────────────────────────────────────────────────
  /** Font reference. Maps to `textFont`. */
  font?: BindProp<string | LvglStyleProps['textFont'] extends BindProp<infer T> ? T : never>;
  /** Maps to `textDecor`. */
  textDecoration?: BindProp<'none' | 'underline' | 'strikethrough'>;
  /** Maps to `textAlign`. */
  textAlign?: BindProp<'left' | 'center' | 'right' | 'auto'>;
  /** Maps to `textLetterSpace`. */
  letterSpacing?: BindProp<number>;
  /** Maps to `textLineSpace`. */
  lineHeight?: BindProp<number>;

  // ── Opacity ──────────────────────────────────────────────────────────
  /** Maps to `opa`. */
  opacity?: BindProp<OpacityValue>;
  /** Maps to `bgOpa`. */
  backgroundOpacity?: BindProp<OpacityValue>;
  /** Maps to `textOpa`. */
  textOpacity?: BindProp<OpacityValue>;
  /** Maps to `borderOpa`. */
  borderOpacity?: BindProp<OpacityValue>;
  /** Maps to `outlineOpa`. */
  outlineOpacity?: BindProp<OpacityValue>;
  /** Maps to `shadowOpa`. */
  shadowOpacity?: BindProp<OpacityValue>;

  // ── Background image ─────────────────────────────────────────────────
  /** Maps to `bgImageSrc`. */
  backgroundImage?: string | RefProp<ImageRef>;
  /** Maps to `bgImageOpa`. */
  backgroundImageOpacity?: BindProp<OpacityValue>;

  // ── Shadow ───────────────────────────────────────────────────────────
  /** Maps to `shadowOfsX`. */
  shadowOffsetX?: BindProp<number>;
  /** Maps to `shadowOfsY`. */
  shadowOffsetY?: BindProp<number>;

  // ── Arc (widget-specific) ─────────────────────────────────────────────
  /** Maps to `arcColor`. */
  arcColor?: BindProp<string>;
  /** Maps to `arcOpa`. */
  arcOpacity?: BindProp<OpacityValue>;
  /** Linecap style for arcs. Maps to `arcRounded`. */
  arcLinecap?: BindProp<'flat' | 'round'>;
  /** Maps to `arcWidth`. */
  arcStrokeWidth?: BindProp<number | string>;

  // ── Animation ─────────────────────────────────────────────────────────
  /** Maps to `animTime`. */
  animationDuration?: BindProp<number | string>;

  // ── Background gradient ───────────────────────────────────────────────
  /** Maps to `bgGrad`. */
  backgroundGradient?: LvglStyleProps['bgGrad'];
  /** Maps to `bgGradColor`. */
  backgroundGradientColor?: BindProp<string>;
  /** Maps to `bgDitherMode`. */
  backgroundGradientDither?: BindProp<'none' | 'ordered' | 'error-diffusion'>;
  /** Maps to `bgGradDir`. */
  backgroundGradientDirection?: BindProp<'none' | 'horizontal' | 'vertical'>;
  /** Maps to `bgGradStop`. */
  backgroundGradientStop?: BindProp<number | string>;
  /** Maps to `bgMainStop`. */
  backgroundGradientStartStop?: BindProp<number | string>;

  // ── Background-image extras ───────────────────────────────────────────
  /** Maps to `bgImageRecolor`. */
  backgroundImageTint?: BindProp<string>;
  /** Maps to `bgImageRecolorOpa`. */
  backgroundImageTintOpacity?: BindProp<OpacityValue>;
  /** Whether to tile the background image. Maps to `bgImageTiled`. */
  backgroundRepeat?: BindProp<'repeat' | 'no-repeat'>;

  // ── Border extras ─────────────────────────────────────────────────────
  /** Render border before or after children. Maps to `borderPost`. */
  borderDrawOrder?: BindProp<'before-children' | 'after-children'>;
  /** Maps to `borderSide`. */
  borderSides?: BindProp<'none' | 'top' | 'bottom' | 'left' | 'right' | 'internal'>;

  // ── Clipping ──────────────────────────────────────────────────────────
  /** Whether to clip children to the border radius. Maps to `clipCorner`. */
  overflow?: BindProp<'hidden' | 'visible'>;

  // ── Color filter ──────────────────────────────────────────────────────
  /** Maps to `colorFilterOpa`. */
  colorFilterOpacity?: BindProp<OpacityValue>;

  // ── Image (widget-specific) ───────────────────────────────────────────
  /** Maps to `imageRecolor`. */
  imageTint?: BindProp<string>;
  /** Maps to `imageRecolorOpa`. */
  imageTintOpacity?: BindProp<OpacityValue>;

  // ── Line / stroke (widget-specific) ───────────────────────────────────
  /** Linecap style for lines. Maps to `lineRounded`. */
  strokeLinecap?: BindProp<'flat' | 'round'>;
  /** Maps to `lineWidth`. */
  strokeWidth?: BindProp<number | string>;
  /** Maps to `lineDashWidth`. */
  strokeDashWidth?: BindProp<number | string>;
  /** Maps to `lineDashGap`. */
  strokeDashGap?: BindProp<number | string>;
  /** Maps to `lineColor`. */
  strokeColor?: BindProp<string>;

  // ── Layered opacity ───────────────────────────────────────────────────
  /** Maps to `opaLayered`. */
  opacityLayered?: BindProp<OpacityValue>;

  // ── Outline extras ────────────────────────────────────────────────────
  /** Maps to `outlinePad`. */
  outlineOffset?: BindProp<number | string>;

  // ── Transform extras ──────────────────────────────────────────────────
  /** Maps to `transformAngle`. */
  rotate?: BindProp<number | string>;
  /** Maps to `transformHeight`. */
  transformScaleY?: BindProp<number | string>;
  /** Maps to `transformPivotX`. */
  transformOriginX?: BindProp<number | string>;
  /** Maps to `transformPivotY`. */
  transformOriginY?: BindProp<number | string>;
  /** Maps to `transformZoom`. */
  scale?: BindProp<number | string>;

  // ── Layout (flex) ────────────────────────────────────────────────────
  /** Layout mode. Emitted into the `layout:` block. */
  display?: BindProp<'flex' | 'grid'>;
  /** Flex direction. Maps to `flexFlow` inside `layout:`. */
  flexDirection?: BindProp<'row' | 'column' | 'row-wrap' | 'column-wrap'>;
  /** Main-axis alignment (flex). Maps to `flexAlignMain` inside `layout:`. */
  justifyContent?: BindProp<'start' | 'center' | 'end' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly'>;
  /** Cross-axis alignment (flex). Maps to `flexAlignCross` inside `layout:`. */
  alignItems?: BindProp<'start' | 'center' | 'end' | 'stretch'>;
  /** Flex grow factor for child within flex parent. Flat widget prop. */
  flexGrow?: BindProp<number>;

  // ── Layout (grid — parent) ───────────────────────────────────────────
  /** Grid column track definitions. E.g. ['fr(1)', 'fr(2)', 200]. */
  gridTemplateColumns?: (number | string)[];
  /** Grid row track definitions. E.g. ['fr(1)', 100]. */
  gridTemplateRows?: (number | string)[];
  /** Default column alignment for grid children. Maps to `gridColumnAlign` inside `layout:`. */
  justifyItems?: BindProp<'start' | 'center' | 'end' | 'stretch' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly'>;
  /** Default row alignment for grid children. Maps to `gridRowAlign` inside `layout:`. */
  alignContent?: BindProp<'start' | 'center' | 'end' | 'stretch' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly'>;

  // ── Layout (grid — child) ────────────────────────────────────────────
  /** Grid column position (0-based). Flat widget prop. */
  gridColumn?: BindProp<number>;
  /** Grid row position (0-based). Flat widget prop. */
  gridRow?: BindProp<number>;
  /** Number of grid columns to span. Flat widget prop. */
  gridColumnSpan?: BindProp<number>;
  /** Number of grid rows to span. Flat widget prop. */
  gridRowSpan?: BindProp<number>;
  /** Per-cell column alignment override. Flat widget prop. */
  justifySelf?: BindProp<'start' | 'center' | 'end' | 'stretch'>;
  /** Per-cell row alignment override. Flat widget prop. */
  alignSelf?: BindProp<'start' | 'center' | 'end' | 'stretch'>;

  // ── Widget placement ─────────────────────────────────────────────────
  /** Widget alignment within parent (non-layout positioning). Maps to `align`. */
  placeSelf?: BindProp<'center' | 'topLeft' | 'topCenter' | 'topRight'
            | 'bottomLeft' | 'bottomCenter' | 'bottomRight'
            | 'leftCenter' | 'rightCenter'>;

  // ── Scrollbar ────────────────────────────────────────────────────────
  /** Maps to `scrollbarMode`. */
  scrollbarMode?: BindProp<'off' | 'on' | 'active' | 'auto'>;
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
