// ────────────────────────────────────────────────────────────────────────────
// Theme registry — compile-time theme registration + theme.select() API
//
// Themes are registered during the render pass (via <ThemeProvider>).
// The registry stores flattened leaf maps for each theme.  The compiler
// reads the registry after render to generate C++ theme value arrays.
//
// theme.select(name) — called inside trigger handler bodies / createScript()
// to push a theme-switch action that sets the C++ theme_index signal.
// ────────────────────────────────────────────────────────────────────────────

import { flattenTheme } from './theme-signals';
import type { ThemeLeaf } from './theme-signals';
import type { BINDING_BRAND } from './types';

// ── Types ──────────────────────────────────────────────────────────────────

export interface FlattenedTheme {
  name: string;
  values: Record<string, ThemeLeaf>;
}

// ── Registry store ─────────────────────────────────────────────────────────

class ThemeRegistryStore {
  private themes: Map<string, FlattenedTheme> = new Map();
  private _defaultName?: string;

  /**
   * Register a theme by name.
   * The theme object is flattened into leaf paths for C++ code generation.
   * The first registered theme becomes the default unless overridden.
   */
  register(name: string, themeObj: Record<string, unknown>): void {
    const values = flattenTheme(themeObj);
    this.themes.set(name, { name, values });
    if (!this._defaultName) this._defaultName = name;
  }

  /** Set the default theme name explicitly. */
  setDefault(name: string): void {
    this._defaultName = name;
  }

  /** Get all registered themes. */
  getThemes(): Map<string, FlattenedTheme> {
    return this.themes;
  }

  /** Ordered theme names — order matters for C++ array indexing. */
  getThemeNames(): string[] {
    return [...this.themes.keys()];
  }

  /** Default theme name. */
  getDefaultName(): string | undefined {
    return this._defaultName;
  }

  /** Index of the default theme in the ordered theme list. */
  getDefaultIndex(): number {
    if (!this._defaultName) return 0;
    return this.getThemeNames().indexOf(this._defaultName);
  }

  /** Whether any themes have been registered. */
  get hasThemes(): boolean {
    return this.themes.size > 0;
  }

  /**
   * Union of all leaf paths across all registered themes.
   * Every theme should have the same paths; this is the superset.
   */
  getSignalPaths(): string[] {
    const allPaths = new Set<string>();
    for (const theme of this.themes.values()) {
      for (const path of Object.keys(theme.values)) {
        allPaths.add(path);
      }
    }
    return [...allPaths].sort();
  }

  /** Get the ThemeLeaf for a specific path from the default theme. */
  getDefaultLeaf(path: string): ThemeLeaf | undefined {
    const defaultTheme = this.themes.get(this._defaultName ?? '');
    return defaultTheme?.values[path];
  }

  /** Reset between compile runs. */
  clear(): void {
    this.themes.clear();
    this._defaultName = undefined;
  }
}

// ── Module singleton ───────────────────────────────────────────────────────

const registry = new ThemeRegistryStore();

export function getThemeRegistry(): ThemeRegistryStore {
  return registry;
}

export function clearThemeRegistry(): void {
  registry.clear();
}

/**
 * Register a theme with the global registry.
 *
 * @param name     — human-readable name (used in `theme.select()`)
 * @param themeObj — the Theme object (will be flattened into leaf signals)
 */
export function registerTheme(name: string, themeObj: Record<string, unknown>): void {
  registry.register(name, themeObj);
}

// ── theme.select() API ─────────────────────────────────────────────────────

/**
 * Theme action namespace.
 *
 * @example
 * <Button onPress={() => { theme.select('light'); }} />
 */
export const theme: { readonly [BINDING_BRAND]?: true; select(name: string): void } = {
  /**
   * Switch the active theme at runtime.
   *
   * Must be called inside a trigger handler body — it pushes a C++ lambda
   * action that sets the theme_index signal and flushes the reactive graph.
   *
   * @param name — name of a previously registered theme
   */
  // No-op at runtime — the AST compiler handles theme.select() calls
  // at build time, emitting the appropriate C++ lambda action.
  select(_name: string): void {},

};
