/**
 * <ThemeProvider> — JSX component that registers themes for runtime switching.
 *
 * The generic ThemeProvider implementation lives in @espcompose/core.
 * This re-export preserves backward compatibility for @espcompose/ui consumers.
 *
 * @example
 * <ThemeProvider themes={{ dark: darkTheme, light: lightTheme }} default="dark">
 *   <Screen>…</Screen>
 * </ThemeProvider>
 */

export { ThemeProvider } from '@espcompose/core';

