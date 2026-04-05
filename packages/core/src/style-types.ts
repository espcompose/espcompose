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
import type { image_Image } from './generated/markers';
import type { RefProp } from './types';

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
  width?: BindProp<number | string | 'fit-content'>;
  /** Maps to `height`. */
  height?: BindProp<number | string | 'fit-content'>;
  /** Maps to `minWidth`. */
  minWidth?: BindProp<number | string | 'fit-content'>;
  /** Maps to `maxWidth`. */
  maxWidth?: BindProp<number | string | 'fit-content'>;
  /** Maps to `minHeight`. */
  minHeight?: BindProp<number | string | 'fit-content'>;
  /** Maps to `maxHeight`. */
  maxHeight?: BindProp<number | string | 'fit-content'>;

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
  borderRadius?: BindProp<number | string | 'circle'>;

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
  textDecoration?: BindProp<string | 'none' | 'underline' | 'strikethrough'>;
  /** Maps to `textAlign`. */
  textAlign?: BindProp<string | 'left' | 'center' | 'right' | 'auto'>;
  /** Maps to `textLetterSpace`. */
  letterSpacing?: BindProp<number>;
  /** Maps to `textLineSpace`. */
  lineHeight?: BindProp<number>;

  // ── Opacity ──────────────────────────────────────────────────────────
  /** Maps to `opa`. */
  opacity?: BindProp<string | 'transparent' | 'opaque'>;
  /** Maps to `bgOpa`. */
  backgroundOpacity?: BindProp<string | 'transparent' | 'opaque'>;
  /** Maps to `textOpa`. */
  textOpacity?: BindProp<string | 'transparent' | 'opaque'>;
  /** Maps to `borderOpa`. */
  borderOpacity?: BindProp<string | 'transparent' | 'opaque'>;
  /** Maps to `outlineOpa`. */
  outlineOpacity?: BindProp<string | 'transparent' | 'opaque'>;
  /** Maps to `shadowOpa`. */
  shadowOpacity?: BindProp<string | 'transparent' | 'opaque'>;

  // ── Background image ─────────────────────────────────────────────────
  /** Maps to `bgImageSrc`. */
  backgroundImage?: string | RefProp<image_Image>;
  /** Maps to `bgImageOpa`. */
  backgroundImageOpacity?: BindProp<string | 'transparent' | 'opaque'>;

  // ── Shadow ───────────────────────────────────────────────────────────
  /** Maps to `shadowOfsX`. */
  shadowOffsetX?: BindProp<number>;
  /** Maps to `shadowOfsY`. */
  shadowOffsetY?: BindProp<number>;

  // ── Arc (widget-specific) ─────────────────────────────────────────────
  /** Maps to `arcColor`. */
  arcColor?: BindProp<string>;
  /** Maps to `arcOpa`. */
  arcOpacity?: BindProp<string | 'transparent' | 'opaque'>;
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
  backgroundGradientDither?: BindProp<string | 'none' | 'ordered' | 'error-diffusion'>;
  /** Maps to `bgGradDir`. */
  backgroundGradientDirection?: BindProp<string | 'none' | 'horizontal' | 'vertical'>;
  /** Maps to `bgGradStop`. */
  backgroundGradientStop?: BindProp<number | string>;
  /** Maps to `bgMainStop`. */
  backgroundGradientStartStop?: BindProp<number | string>;

  // ── Background-image extras ───────────────────────────────────────────
  /** Maps to `bgImageRecolor`. */
  backgroundImageTint?: BindProp<string>;
  /** Maps to `bgImageRecolorOpa`. */
  backgroundImageTintOpacity?: BindProp<string | 'transparent' | 'opaque'>;
  /** Whether to tile the background image. Maps to `bgImageTiled`. */
  backgroundRepeat?: BindProp<'repeat' | 'no-repeat'>;

  // ── Border extras ─────────────────────────────────────────────────────
  /** Render border before or after children. Maps to `borderPost`. */
  borderDrawOrder?: BindProp<'before-children' | 'after-children'>;
  /** Maps to `borderSide`. */
  borderSides?: BindProp<string | 'none' | 'top' | 'bottom' | 'left' | 'right' | 'internal'>;

  // ── Clipping ──────────────────────────────────────────────────────────
  /** Whether to clip children to the border radius. Maps to `clipCorner`. */
  overflow?: BindProp<'hidden' | 'visible'>;

  // ── Color filter ──────────────────────────────────────────────────────
  /** Maps to `colorFilterOpa`. */
  colorFilterOpacity?: BindProp<string | 'transparent' | 'opaque'>;

  // ── Image (widget-specific) ───────────────────────────────────────────
  /** Maps to `imageRecolor`. */
  imageTint?: BindProp<string>;
  /** Maps to `imageRecolorOpa`. */
  imageTintOpacity?: BindProp<string | 'transparent' | 'opaque'>;

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
  opacityLayered?: BindProp<string | 'transparent' | 'opaque'>;

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
