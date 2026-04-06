/**
 * Theme type definitions for the LVGL design system.
 *
 * A Theme is a compile-time configuration object that drives all visual
 * token resolution in design system components.  Third parties can create
 * custom themes by implementing this interface.
 *
 * Fonts are first-class theme tokens.  Each `FontToken` describes an
 * ESPHome font asset (file + size).  `ThemeProvider` calls core's
 * `useFont()` during render to register the font components and the
 * theme flattener stores the resulting `Ref<FontRef>` string tokens as
 * `font_ptr` leaves — no runtime `resolve_font()` string lookup needed.
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

/**
 * A font asset descriptor stored in the theme.
 *
 * `ThemeProvider` calls core's `useFont()` for each unique token during
 * render, registering the ESPHome font component and replacing the token
 * with a `Ref<FontRef>` before the theme is flattened.
 *
 * Use the `createFontToken()` constructor to create branded instances.
 */
export const FONT_TOKEN_BRAND: unique symbol = Symbol('FontToken');

export interface FontToken {
  readonly [FONT_TOKEN_BRAND]: true;
  /** Font file path or gfonts:// URI (e.g. `'gfonts://Montserrat'`). */
  file: string;
  /** Font size in pixels. */
  size: number;
}

/** Create a branded FontToken. */
export function createFontToken(file: string, size: number): FontToken {
  return { [FONT_TOKEN_BRAND]: true as const, file, size };
}

export interface SizeDimensions {
  height: number;
  /** Font for this size (registered by ThemeProvider during render). */
  font: FontToken;
  paddingX: number;
  paddingY: number;
}

export interface StatusColors {
  bg: string;
  text: string;
  bgPressed: string;
}

// ────────────────────────────────────────────────────────────────────────────
// Widget part colors
// ────────────────────────────────────────────────────────────────────────────

export interface PartColors {
  /** Primary fill / track color. */
  bg: string;
  /** Knob / handle color. */
  knob: string;
}

export interface ThemeParts {
  slider: PartColors;
  switch: PartColors;
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
