// ────────────────────────────────────────────────────────────────────────────
// Theme font resolver — generic recursive FontToken → Ref<FontRef> substitution
//
// Walks any theme object tree, finds all branded FontToken values, registers
// each unique (file, size, bpp) triple via core's useFont(), and returns
// a substituted clone with Ref<FontRef> values in place of FontTokens.
//
// This is design-system agnostic: it works on any object shape, not just
// the @espcompose/ui Theme interface.
// ────────────────────────────────────────────────────────────────────────────

import type { Ref } from '../types';
import type { FontRef } from '../component-aliases';
import { useFont } from '../hooks/useFont';
import { isFontToken } from './font-token';
import type { FontToken } from './font-token';

/**
 * Walk all themes, find every unique FontToken, and register each via
 * `useFont()`.  Returns a map from cache key to `Ref<FontRef>`.
 *
 * The cache key is `file|size|bpp` — the same triple that useFont()
 * deduplicates on.
 */
export function collectThemeFonts(
  themes: Record<string, Record<string, unknown>>,
): Map<string, Ref<FontRef>> {
  const fontRefs = new Map<string, Ref<FontRef>>();

  for (const themeObj of Object.values(themes)) {
    walkForFontTokens(themeObj, fontRefs);
  }

  return fontRefs;
}

/**
 * Deep-clone a theme object, replacing all FontToken values with their
 * registered `Ref<FontRef>` equivalents.
 */
export function substituteThemeFonts(
  themeObj: Record<string, unknown>,
  fontRefs: Map<string, Ref<FontRef>>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(themeObj)) {
    if (isFontToken(value)) {
      const refKey = fontTokenKey(value);
      result[key] = fontRefs.get(refKey) ?? value;
    } else if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      result[key] = substituteThemeFonts(value as Record<string, unknown>, fontRefs);
    } else {
      result[key] = value;
    }
  }

  return result;
}

// ── Internals ──────────────────────────────────────────────────────────────

function fontTokenKey(token: FontToken): string {
  return `${token.file}|${token.size}|${token.bpp}`;
}

function walkForFontTokens(
  obj: Record<string, unknown>,
  fontRefs: Map<string, Ref<FontRef>>,
): void {
  for (const value of Object.values(obj)) {
    if (isFontToken(value)) {
      const key = fontTokenKey(value);
      if (!fontRefs.has(key)) {
        fontRefs.set(key, useFont({ file: value.file, size: value.size, bpp: value.bpp }));
      }
    } else if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      walkForFontTokens(value as Record<string, unknown>, fontRefs);
    }
  }
}
