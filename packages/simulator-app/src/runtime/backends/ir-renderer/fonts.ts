import type { SemanticIR } from '@espcompose/core/internals';

const loadedFontFamilies = new Set<string>();

/** Reset the loaded font tracking set. Call before re-lowering IR. */
export function resetLoadedFonts(): void {
  loadedFontFamilies.clear();
}

/**
 * Build a map from font component ref tokens (e.g. "r_abc123") to CSS font
 * strings (e.g. "28px 'Roboto', sans-serif").
 *
 * Walks IR components where section === 'font' and converts each font's
 * file + size into a browser-usable CSS font shorthand value.
 */
export function buildFontRefMap(ir: SemanticIR): Map<string, string> {
  const fontMap = new Map<string, string>();

  for (const component of ir.esphome.components) {
    if (component.section !== 'font') continue;
    const config = component.config as Record<string, unknown>;
    const file = config.file;
    const size = config.size;
    const id = component.id;
    if (typeof file !== 'string' || !id) continue;

    const fontSize = typeof size === 'number' ? size : 14;
    let fontFamily: string;

    if (file.startsWith('gfonts://')) {
      fontFamily = `'${file.slice('gfonts://'.length)}'`;
    } else {
      const basename = file.replace(/^.*[\\/]/, '').replace(/\.[^.]+$/, '');
      fontFamily = `'${basename}'`;
    }

    fontMap.set(id, `${fontSize}px ${fontFamily}, sans-serif`);
  }

  return fontMap;
}

/**
 * Load fonts referenced in the IR into the browser.
 * For gfonts:// references, injects a Google Fonts stylesheet.
 * For local TTF files, loads via @font-face with the /__project__/ route.
 */
export function loadFontsFromIR(ir: SemanticIR): void {
  const googleFamilies = new Set<string>();
  const localFonts: Array<{ family: string; file: string }> = [];

  for (const component of ir.esphome.components) {
    if (component.section !== 'font') continue;
    const config = component.config as Record<string, unknown>;
    const file = config.file;
    if (typeof file !== 'string') continue;

    if (file.startsWith('gfonts://')) {
      const family = file.slice('gfonts://'.length);
      if (!loadedFontFamilies.has(`gfonts:${family}`)) {
        googleFamilies.add(family);
      }
    } else {
      // Local font file — extract a family name from the filename
      const basename = file.replace(/^.*[\\/]/, '').replace(/\.[^.]+$/, '');
      if (!loadedFontFamilies.has(`local:${basename}`)) {
        localFonts.push({ family: basename, file });
      }
    }
  }

  // Inject Google Fonts stylesheet
  if (googleFamilies.size > 0) {
    const families = Array.from(googleFamilies)
      .map(f => `family=${encodeURIComponent(f)}:wght@300;400;500;700`)
      .join('&');
    const url = `https://fonts.googleapis.com/css2?${families}&display=swap`;

    if (typeof document !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      document.head.appendChild(link);
    }

    for (const family of googleFamilies) {
      loadedFontFamilies.add(`gfonts:${family}`);
    }
  }

  // Register local @font-face rules
  if (localFonts.length > 0 && typeof document !== 'undefined') {
    let css = '';
    for (const { family, file } of localFonts) {
      const cleaned = file.replace(/^\.\//, '');
      const fontUrl = `/__project__/${cleaned}`;
      css += `@font-face { font-family: '${family}'; src: url('${fontUrl}'); }\n`;
      loadedFontFamilies.add(`local:${family}`);
    }
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }
}
