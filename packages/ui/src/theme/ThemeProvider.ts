/**
 * <ThemeProvider> — JSX component that registers themes for runtime switching.
 *
 * Wraps children and ensures all descendant design-system components receive
 * reactive theme values.  Themes are registered at compile time; switching
 * at runtime is done via `theme.select(name)`.
 *
 * Font registration: walks every theme, collects all `FontToken` values
 * (from typography and sizes), calls core's `useFont()` for each unique
 * `(file, size)` pair, then substitutes the `FontToken` with the resulting
 * `Ref<FontRef>` before the theme is flattened into the theme registry.
 *
 * @example
 * <ThemeProvider themes={{ dark: darkTheme, light: lightTheme }} default="dark">
 *   <Screen>…</Screen>
 * </ThemeProvider>
 */

import type { EspComposeElement, Ref, FontRef } from '@espcompose/core';
import { registerTheme, getThemeRegistry, createElement, Fragment, useFont } from '@espcompose/core';
import type { Theme, FontToken } from './types';
import { FONT_TOKEN_BRAND } from './types';

interface ThemeProviderProps {
  /** Map of theme name → Theme object. */
  themes: Record<string, Theme>;
  /** Name of the default (initial) theme. Defaults to the first theme. */
  default?: string;
  /** Child elements. */
  children?: EspComposeElement | EspComposeElement[];
}

// ── Font token detection ─────────────────────────────────────────────────

function isFontToken(value: unknown): value is FontToken {
  return (
    value !== null &&
    typeof value === 'object' &&
    FONT_TOKEN_BRAND in value
  );
}

/**
 * Register all unique FontToken values across themes via core's useFont().
 * Returns a map from cache key to Ref<FontRef>.
 */
function registerThemeFonts(themes: Record<string, Theme>): Map<string, Ref<FontRef>> {
  const fontRefs = new Map<string, Ref<FontRef>>();

  for (const theme of Object.values(themes)) {
    // Collect tokens from typography
    for (const token of Object.values(theme.typography)) {
      if (isFontToken(token)) {
        const key = `${token.file}|${token.size}`;
        if (!fontRefs.has(key)) {
          fontRefs.set(key, useFont({ file: token.file, size: token.size }));
        }
      }
    }
    // Collect tokens from sizes
    for (const dim of Object.values(theme.sizes)) {
      if (isFontToken(dim.font)) {
        const key = `${dim.font.file}|${dim.font.size}`;
        if (!fontRefs.has(key)) {
          fontRefs.set(key, useFont({ file: dim.font.file, size: dim.font.size }));
        }
      }
    }
  }

  return fontRefs;
}

/**
 * Deep-clone a theme, replacing all FontToken values with their
 * registered Ref<FontRef> equivalents.
 */
function resolveThemeFonts(
  theme: Theme,
  fontRefs: Map<string, Ref<FontRef>>,
): Record<string, unknown> {
  // Shallow-clone the theme — then deep-replace font tokens in
  // typography and sizes sub-objects.
  const resolved: Record<string, unknown> = { ...theme };

  // Replace typography tokens
  const typography: Record<string, unknown> = {};
  for (const [variant, token] of Object.entries(theme.typography)) {
    if (isFontToken(token)) {
      typography[variant] = fontRefs.get(`${token.file}|${token.size}`)!;
    } else {
      typography[variant] = token;
    }
  }
  resolved.typography = typography;

  // Replace size font tokens
  const sizes: Record<string, Record<string, unknown>> = {};
  for (const [sizeName, dim] of Object.entries(theme.sizes)) {
    const cloned: Record<string, unknown> = { ...dim };
    if (isFontToken(dim.font)) {
      cloned.font = fontRefs.get(`${dim.font.file}|${dim.font.size}`)!;
    }
    sizes[sizeName] = cloned;
  }
  resolved.sizes = sizes;

  return resolved;
}

/**
 * Register themes and render children.
 *
 * Themes are flattened and stored in the SDK's global theme registry.
 * The compiler reads the registry after render to generate C++ theme
 * value arrays and memo declarations.
 */
export function ThemeProvider(props: ThemeProviderProps): EspComposeElement {
  const registry = getThemeRegistry();

  // Step 1: Register all unique font assets across themes
  const fontRefs = registerThemeFonts(props.themes);

  // Step 2: Register all themes (with FontToken → Ref<FontRef> substitution)
  for (const [name, themeObj] of Object.entries(props.themes)) {
    if (!registry.getThemes().has(name)) {
      const resolved = resolveThemeFonts(themeObj, fontRefs);
      registerTheme(name, resolved);
    }
  }

  // Set the default theme
  if (props.default) {
    registry.setDefault(props.default);
  }

  // Pass children through (no wrapping element needed — themes flow via
  // the global registry, not via context providers)
  const children = props.children
    ? Array.isArray(props.children)
      ? props.children
      : [props.children]
    : [];

  return createElement(Fragment, { children });
}
