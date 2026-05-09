/**
 * Shared font tokens for the built-in UI themes.
 *
 * Centralises the font file, extras, and icon glyph definitions so that
 * the light and dark themes stay in sync without duplicating configuration.
 */

import { createFontToken } from '@espcompose/core';
import type { FontToken, FontTokenExtras } from '@espcompose/core';

// ── MDI icon codepoints ────────────────────────────────────────────────────
// Material Design Icons — webfont codepoints (U+F0xxx range).
// Only the glyphs listed here are baked into the firmware font asset.

/** MDI icon glyph constants for use in label text. */
export const mdiGlyphs = {
  close:         '\u{F0156}',
  lightbulb:     '\u{F0335}',
  lightbulbOff:  '\u{F0336}',
  doorOpen:      '\u{F081F}',
  doorClosed:    '\u{F081C}',
} as const;

// Collect all icon codepoints into a single array for the extras entry.
const mdiGlyphList = Object.values(mdiGlyphs);

/** MDI webfont extras entry — merged into every theme font token. */
const mdiExtras: FontTokenExtras = {
  file: 'https://github.com/Templarian/MaterialDesign-Webfont/raw/master/fonts/materialdesignicons-webfont.ttf',
  glyphs: mdiGlyphList,
};

// ── Font factory ───────────────────────────────────────────────────────────

/**
 * Create a Roboto font token at the given size, with MDI icon extras baked in.
 *
 * Used by both the light and dark theme factories so font configuration
 * is defined in one place.
 */
export function roboto(size: number): FontToken {
  return createFontToken('gfonts://Roboto', size, { extras: [mdiExtras] });
}
