/**
 * <ThemeProvider> — JSX component that registers themes for runtime switching.
 *
 * Wraps children and ensures all descendant design-system components receive
 * reactive theme values.  Themes are registered at compile time; switching
 * at runtime is done via `theme.select(name)`.
 *
 * @example
 * <ThemeProvider themes={{ dark: darkTheme, light: lightTheme }} default="dark">
 *   <Screen>…</Screen>
 * </ThemeProvider>
 */

import type { EspComposeElement } from '@espcompose/core';
import { registerTheme, getThemeRegistry, createElement, Fragment } from '@espcompose/core';
import type { Theme } from './types';

interface ThemeProviderProps {
  /** Map of theme name → Theme object. */
  themes: Record<string, Theme>;
  /** Name of the default (initial) theme. Defaults to the first theme. */
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
 */
export function ThemeProvider(props: ThemeProviderProps): EspComposeElement {
  const registry = getThemeRegistry();

  // Register all themes (idempotent — only registers if not already present)
  for (const [name, themeObj] of Object.entries(props.themes)) {
    if (!registry.getThemes().has(name)) {
      registerTheme(name, themeObj as unknown as Record<string, unknown>);
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
