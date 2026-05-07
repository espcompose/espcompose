// ────────────────────────────────────────────────────────────────────────────
// Theme Settings Context
//
// Exposes the resolved display settings from the nearest ThemeProvider to
// descendants. Consumers call `useThemeSettings()` to read the fully-resolved
// object (with .class, .orientation, .shortestSide, etc.) without needing to
// know defaults or call resolveThemeSettings themselves.
//
// Populated by ProviderImpl in create-theme.ts when `props.settings` is
// provided. When no settings are passed, the context remains null.
// ────────────────────────────────────────────────────────────────────────────

import { createContext, useContext } from '../../hooks/useContext';
import type { ResolvedThemeSettings } from '../display';

/**
 * Context holding the resolved display settings from the nearest ThemeProvider.
 * @internal
 */
export const ThemeSettingsCtx = createContext<ResolvedThemeSettings | null>(null);

/**
 * Read the resolved display settings from the nearest ancestor ThemeProvider.
 *
 * Returns the fully-resolved settings object (with `.class`, `.orientation`,
 * `.shortestSide`, etc.) or `null` if no settings were provided to the
 * ancestor Provider.
 *
 * @example
 * ```ts
 * const settings = useThemeSettings();
 * if (settings?.class === 'large') { ... }
 * ```
 */
export function useThemeSettings(): ResolvedThemeSettings | null {
  return useContext(ThemeSettingsCtx);
}
