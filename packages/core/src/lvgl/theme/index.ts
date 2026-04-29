// ────────────────────────────────────────────────────────────────────────────
// Theme barrel — re-exports all theme-related public API from the theme folder
// ────────────────────────────────────────────────────────────────────────────

// createTheme — typed theme handle factory
export { createTheme } from './create-theme';
export type { ThemeHandle, ThemeProviderProps } from './create-theme';

// Registry (internal — used by compiler phases, not user code)
export { getThemeRegistry } from './registry';
export type { FlattenedTheme } from './registry';

// Scope hashing (internal — used by compiler)
export { scopeHash } from './scope-hash';

// Font tokens
export { FONT_TOKEN_BRAND, createFontToken, isFontToken } from './font-token';
export type { FontToken, FontBpp } from './font-token';

// Hex color type
export { isHexColor } from './hex-color';
export type { HexColor } from './hex-color';

// Font resolver (internal — used by createTheme Provider)
export { collectThemeFonts, substituteThemeFonts } from './font-resolver';
