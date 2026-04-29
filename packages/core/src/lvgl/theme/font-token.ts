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
}

/** Create a branded FontToken. */
export function createFontToken(file: string, size: number, bpp: FontBpp = '4'): FontToken {
  return { [FONT_TOKEN_BRAND]: true as const, file, size, bpp };
}

/** Type guard: is the value a branded FontToken? */
export function isFontToken(value: unknown): value is FontToken {
  return (
    value !== null &&
    typeof value === 'object' &&
    FONT_TOKEN_BRAND in value
  );
}
