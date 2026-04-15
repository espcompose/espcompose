// ────────────────────────────────────────────────────────────────────────────
// ThemeProvider — generic JSX component for theme registration
//
// Registers any set of theme objects into the global theme registry,
// handling font token resolution automatically.  Design-system agnostic:
// works with any theme shape that may contain FontToken values at any depth.
//
// @example
// <ThemeProvider themes={{ dark: darkTheme, light: lightTheme }} default="dark">
//   <Screen>…</Screen>
// </ThemeProvider>
// ────────────────────────────────────────────────────────────────────────────

import type { EspComposeElement } from '../types';
import { createElement, Fragment } from '../runtime';
import { registerTheme, getThemeRegistry } from './registry';
import { collectThemeFonts, substituteThemeFonts } from './font-resolver';

export interface ThemeProviderProps<T extends object = Record<string, unknown>> {
  /** Map of theme name → theme object. */
  themes: Record<string, T>;
  /** Name of the default (initial) theme. Defaults to the first registered theme. */
  default?: string;
  /** Child elements. */
  children?: EspComposeElement | EspComposeElement[];
}

/**
 * Register themes and render children.
 *
 * Themes are flattened and stored in the SDK's global theme registry.
 * The compiler reads the registry after render to generate C++ theme
 * value arrays and memo declarations.
 *
 * Font resolution: recursively walks every theme object, finds all branded
 * `FontToken` values (at any depth), calls `useFont()` for each unique
 * `(file, size, bpp)` triple, and substitutes the `FontToken` with the
 * resulting `Ref<FontRef>` before the theme is flattened.
 */
export function ThemeProvider<T extends object>(
  props: ThemeProviderProps<T>,
): EspComposeElement {
  const registry = getThemeRegistry();

  // Step 1: Register all unique font assets across themes
  const fontRefs = collectThemeFonts(
    props.themes as Record<string, Record<string, unknown>>,
  );

  // Step 2: Register all themes (with FontToken → Ref<FontRef> substitution)
  for (const [name, themeObj] of Object.entries(props.themes)) {
    if (!registry.getThemes().has(name)) {
      const resolved = substituteThemeFonts(
        themeObj as Record<string, unknown>,
        fontRefs,
      );
      registerTheme(name, resolved);
    }
  }

  // Step 3: Set the default theme
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
