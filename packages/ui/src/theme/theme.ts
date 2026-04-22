/**
 * Pre-built theme scope handle for the @espcompose/ui design system.
 *
 * Libraries and user projects use this handle for:
 *   - `<UITheme.Provider>` — render children with dark/light themes
 *   - `UITheme.select('dark')` — switch theme inside trigger handlers
 *   - `UITheme.use()` — access the reactive theme proxy in components
 *   - `UITheme.extend({ ocean: ... })` — add user-defined themes
 */

import { createTheme } from '@espcompose/core';
import type { ThemeDefinition } from './types';
import { darkTheme } from './dark';
import { lightTheme } from './light';

export const UITheme = createTheme('espcompose:ui', {
  dark: darkTheme,
  light: lightTheme,
} satisfies Record<string, ThemeDefinition>);
