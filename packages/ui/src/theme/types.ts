/**
 * Theme type definitions for the LVGL design system.
 *
 * A Theme is a compile-time configuration object that drives all visual
 * token resolution in design system components.  Third parties can create
 * custom themes by implementing this interface.
 *
 * FontToken, createFontToken, and FONT_TOKEN_BRAND are re-exported from
 * @espcompose/core so that any design system can define font-bearing themes
 * without depending on @espcompose/ui.
 */


import type { FontToken, HexColor } from '@espcompose/core';

// ────────────────────────────────────────────────────────────────────────────
// Token types
// ────────────────────────────────────────────────────────────────────────────

export type SpacingToken = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SizeToken = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type RadiusToken = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type StatusToken = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type TextVariant = 'title' | 'subtitle' | 'body' | 'caption';

// ────────────────────────────────────────────────────────────────────────────
// Sub-types
// ────────────────────────────────────────────────────────────────────────────

export interface SizeDimensions {
  height: number;
  /** Font for this size (registered by ThemeProvider during render). */
  font: FontToken;
  paddingX: number;
  paddingY: number;
}

export interface StatusColors {
  bg: HexColor;
  text: HexColor;
  bgPressed: HexColor;
}

// ────────────────────────────────────────────────────────────────────────────
// Widget part colors
// ────────────────────────────────────────────────────────────────────────────

export interface PartColors {
  /** Primary fill / track color. */
  bg: HexColor;
  /** Knob / handle color. */
  knob: HexColor;
}

export interface SwitchPartColors extends PartColors {
  /** Track color when unchecked (off). */
  bgOff: HexColor;
}

export interface SliderPartColors extends PartColors {
  /** Track background color (unfilled area). */
  track: HexColor;
}

export interface ThemeParts {
  slider: SliderPartColors;
  switch: SwitchPartColors;
  arc: PartColors;
}

// ────────────────────────────────────────────────────────────────────────────
// Theme interface
// ────────────────────────────────────────────────────────────────────────────

export interface ThemeColors {
  // Semantic status colors
  primary: StatusColors;
  secondary: StatusColors;
  success: StatusColors;
  warning: StatusColors;
  danger: StatusColors;

  // Surface colors
  background: HexColor;
  surface: HexColor;
  surfaceAlt: HexColor;
  border: HexColor;

  // Text colors
  textPrimary: HexColor;
  textSecondary: HexColor;
  textDisabled: HexColor;
}

export interface ThemeTypography {
  title: FontToken;
  subtitle: FontToken;
  body: FontToken;
  caption: FontToken;
}

export interface Theme {
  /** Human-readable theme name. */
  name: string;

  /** Color palette. */
  colors: ThemeColors;

  /** Typography scale. */
  typography: ThemeTypography;

  /** Spacing scale in pixels. */
  spacing: Record<SpacingToken, number>;

  /** Border radius scale in pixels. */
  radii: Record<RadiusToken, number>;

  /** Component size scale. */
  sizes: Record<SizeToken, SizeDimensions>;

  /**
   * Widget part colors (slider indicator/knob, switch, arc).
   *
   * Optional — when omitted, `themeToStyleDefinitions()` derives sensible
   * defaults from `colors.primary` and `colors.textPrimary`.
   */
  parts?: ThemeParts;
}
