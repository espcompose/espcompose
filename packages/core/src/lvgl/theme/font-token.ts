// ────────────────────────────────────────────────────────────────────────────
// FontToken — branded font asset descriptor for themes
//
// A FontToken describes an ESPHome font asset (file, size, anti-aliasing
// depth).  Design systems embed FontToken values inside theme objects;
// `ThemeProvider` calls core's `useFont()` for each unique token during
// render and substitutes the resolved `Ref<FontRef>` before the theme is
// flattened into the theme registry.
//
// This is intentionally in core so that *any* design system can define
// font-bearing themes without depending on @espcompose/ui.
// ────────────────────────────────────────────────────────────────────────────

/** Brand symbol used to distinguish FontToken objects from plain data. */
export const FONT_TOKEN_BRAND: unique symbol = Symbol('FontToken');

/** Anti-aliasing bit depth for font rendering. */
export type FontBpp = '1' | '2' | '4' | '8';

/** Extra font file merged into a FontToken for additional glyphs. */
export interface FontTokenExtras {
  /** Font file path or URL for the extra glyphs. */
  file: string;
  /** Glyph codepoints to include from this file. */
  glyphs: string[];
}

/** Optional fields for {@link createFontToken}. */
export interface FontTokenOptions {
  /** Anti-aliasing bit depth. Defaults to '4'. */
  bpp?: FontBpp;
  /** Additional individual glyphs to include in the font. */
  glyphs?: string[];
  /** Extra font files merged in for additional glyph ranges (e.g. icon fonts). */
  extras?: FontTokenExtras[];
}

/**
 * A font asset descriptor stored in theme objects.
 *
 * Use `createFontToken()` to create branded instances.
 */
export interface FontToken {
  readonly [FONT_TOKEN_BRAND]: true;
  /** Font file path or gfonts:// URI (e.g. `'gfonts://Montserrat'`). */
  file: string;
  /** Font size in pixels. */
  size: number;
  /** Anti-aliasing bit depth (1 = none, 2 = basic, 4 = good, 8 = best). Defaults to '4'. */
  bpp: FontBpp;
  /** Additional individual glyphs to include. */
  glyphs?: string[];
  /** Extra font files merged in for additional glyph ranges. */
  extras?: FontTokenExtras[];
}

/** Create a branded FontToken. */
export function createFontToken(file: string, size: number, options?: FontTokenOptions): FontToken {
  return {
    [FONT_TOKEN_BRAND]: true as const,
    file,
    size,
    bpp: options?.bpp ?? '4',
    ...(options?.glyphs ? { glyphs: options.glyphs } : {}),
    ...(options?.extras ? { extras: options.extras } : {}),
  };
}

/** Type guard: is the value a branded FontToken? */
export function isFontToken(value: unknown): value is FontToken {
  return (
    value !== null &&
    typeof value === 'object' &&
    FONT_TOKEN_BRAND in value
  );
}
