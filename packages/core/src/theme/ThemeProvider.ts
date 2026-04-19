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
import { createLvglWidget } from '../intents';

export interface ThemeProviderProps<T extends object = Record<string, unknown>> {
  /** Theme scope identifier (e.g. 'espcompose:ui', 'lcars'). */
  scope: string;
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
function ThemeProviderImpl<T extends object>(
  props: ThemeProviderProps<T>,
): EspComposeElement {
  const registry = getThemeRegistry();

  // Step 1: Register all unique font assets across themes
  const fontRefs = collectThemeFonts(
    props.themes as Record<string, Record<string, unknown>>,
  );

  // Step 2: Register all themes (with FontToken → Ref<FontRef> substitution)
  for (const [name, themeObj] of Object.entries(props.themes)) {
    if (!registry.getThemes(props.scope).has(name)) {
      const resolved = substituteThemeFonts(
        themeObj as Record<string, unknown>,
        fontRefs,
      );
      registerTheme(props.scope, name, resolved);
    }
  }

  // Step 3: Set the default theme
  if (props.default) {
    registry.setDefault(props.scope, props.default);
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

/**
 * Theme provider branded as an LVGL widget so it can sit inside `<lvgl>`.
 * `allowedChildIntents: undefined` makes it transparent — children are
 * validated against the next constraining ancestor instead.
 */
export const ThemeProvider = createLvglWidget(
  ThemeProviderImpl as (props: ThemeProviderProps<object>) => EspComposeElement,
  { allowedChildIntents: undefined, contextTransparent: true as const },
);
