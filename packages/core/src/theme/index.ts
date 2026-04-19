// ────────────────────────────────────────────────────────────────────────────
// Theme barrel — re-exports all theme-related public API from the theme folder
// ────────────────────────────────────────────────────────────────────────────

// Registry
export { registerTheme, getThemeRegistry, theme } from './registry';
export type { FlattenedTheme } from './registry';

// Scope hashing
export { scopeHash } from './scope-hash';

// Reactive proxy
export { useTheme } from './reactive-proxy';

// Font tokens
export { FONT_TOKEN_BRAND, createFontToken, isFontToken } from './font-token';
export type { FontToken, FontBpp } from './font-token';

// Hex color type
export { isHexColor } from './hex-color';
export type { HexColor } from './hex-color';

// Font resolver
export { collectThemeFonts, substituteThemeFonts } from './font-resolver';

// Theme leaf accessor
export { themeLeaf } from './theme-leaf';

// Style utilities
export { createStyles, mergeStyles } from './create-styles';

// ThemeProvider component
export { ThemeProvider } from './ThemeProvider';
export type { ThemeProviderProps } from './ThemeProvider';
