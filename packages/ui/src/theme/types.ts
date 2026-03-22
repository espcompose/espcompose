/**
 * Theme type definitions for the LVGL design system.
 *
 * A Theme is a compile-time configuration object that drives all visual
 * token resolution in design system components.  Third parties can create
 * custom themes by implementing this interface.
 */

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

export interface FontDef {
  /** Font family name (e.g. 'montserrat'). */
  fontFamily: string;
  /** Font size in pixels (e.g. 28). Resolved to `{fontFamily}_{fontSize}` for LVGL. */
  fontSize: number;
}

export interface SizeDimensions {
  height: number;
  fontSize: number;
  paddingX: number;
  paddingY: number;
}

export interface StatusColors {
  bg: string;
  text: string;
  bgPressed: string;
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
  background: string;
  surface: string;
  surfaceAlt: string;
  border: string;

  // Text colors
  textPrimary: string;
  textSecondary: string;
  textDisabled: string;
}

export interface ThemeTypography {
  title: FontDef;
  subtitle: FontDef;
  body: FontDef;
  caption: FontDef;
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
}
