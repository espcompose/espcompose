/**
 * Theme context — powered by the SDK's compile-time context mechanism.
 *
 * `ThemeContext` defaults to `darkTheme`.  Wrap components in
 * `<ThemeProvider value={myTheme}>` to override for a subtree.
 * Components read the active theme via `useTheme()`.
 */

import { createContext, useContext, createContextProvider } from '@esphome/compose';
import type { Theme } from './types';
import { darkTheme } from './dark';

/** The theme context — defaults to `darkTheme` when no provider is present. */
export const ThemeContext = createContext<Theme>(darkTheme);

/** Read the active theme from the nearest `<ThemeProvider>`. */
export function useTheme(): Theme {
  return useContext(ThemeContext);
}

/**
 * Provide a theme to all descendant design-system components.
 *
 * @example
 * <ThemeProvider value={lightTheme}>
 *   <Screen padding="lg">…</Screen>
 * </ThemeProvider>
 */
export const ThemeProvider = createContextProvider<Theme>(ThemeContext);
