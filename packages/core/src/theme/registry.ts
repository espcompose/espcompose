// ────────────────────────────────────────────────────────────────────────────
// Theme registry — compile-time theme registration + theme.select() API
//
// Themes are registered during the render pass (via <ThemeProvider>).
// Each design-system library registers themes under its own scope string
// (e.g. 'espcompose:ui', 'lcars').  Each scope is fully isolated: its own
// theme names, default, and leaf signal paths.
//
// The registry stores flattened leaf maps per scope.  The compiler reads
// the registry after render to generate per-scope C++ theme value arrays.
//
// theme.select(scope, name) — called inside trigger handler bodies /
// useScript() to push a theme-switch action that sets the scoped
// theme_index signal.
// ────────────────────────────────────────────────────────────────────────────

import { flattenTheme } from './signals';
import type { ThemeLeaf } from './signals';
import { scopeHash } from './scope-hash';
import type { BINDING_BRAND } from '../types';
import { throwCompileTimeOnly } from '../errors';

// ── Types ──────────────────────────────────────────────────────────────────

export interface FlattenedTheme {
  name: string;
  values: Record<string, ThemeLeaf>;
}

/** Internal per-scope store. */
interface ScopeStore {
  themes: Map<string, FlattenedTheme>;
  defaultName?: string;
}

// ── Registry store ─────────────────────────────────────────────────────────

class ThemeRegistryStore {
  private scopes: Map<string, ScopeStore> = new Map();

  /** Get or create the ScopeStore for a given scope. */
  private getOrCreateScope(scope: string): ScopeStore {
    let store = this.scopes.get(scope);
    if (!store) {
      store = { themes: new Map() };
      this.scopes.set(scope, store);
    }
    return store;
  }

  /**
   * Register a theme by name within a scope.
   * The theme object is flattened into leaf paths for C++ code generation.
   * The first registered theme in a scope becomes the default unless overridden.
   */
  register(scope: string, name: string, themeObj: Record<string, unknown>): void {
    const store = this.getOrCreateScope(scope);
    const values = flattenTheme(themeObj);
    store.themes.set(name, { name, values });
    if (!store.defaultName) store.defaultName = name;
  }

  /** Set the default theme name explicitly within a scope. */
  setDefault(scope: string, name: string): void {
    const store = this.getOrCreateScope(scope);
    store.defaultName = name;
  }

  /** Get all registered themes within a scope. */
  getThemes(scope: string): Map<string, FlattenedTheme> {
    return this.scopes.get(scope)?.themes ?? new Map();
  }

  /** Ordered theme names within a scope. Order matters for C++ array indexing. */
  getThemeNames(scope: string): string[] {
    return [...(this.scopes.get(scope)?.themes.keys() ?? [])];
  }

  /** Default theme name within a scope. */
  getDefaultName(scope: string): string | undefined {
    return this.scopes.get(scope)?.defaultName;
  }

  /** Index of the default theme within a scope's ordered theme list. */
  getDefaultIndex(scope: string): number {
    const store = this.scopes.get(scope);
    if (!store?.defaultName) return 0;
    return this.getThemeNames(scope).indexOf(store.defaultName);
  }

  /** Whether any themes have been registered in a specific scope. */
  hasThemesInScope(scope: string): boolean {
    const store = this.scopes.get(scope);
    return store ? store.themes.size > 0 : false;
  }

  /** Whether any themes have been registered in any scope. */
  get hasAnyThemes(): boolean {
    for (const store of this.scopes.values()) {
      if (store.themes.size > 0) return true;
    }
    return false;
  }

  /** All registered scope names. */
  getScopes(): string[] {
    return [...this.scopes.keys()];
  }

  /** Compute the scopeId (8-char hex hash) for a scope string. */
  getScopeId(scope: string): string {
    return scopeHash(scope);
  }

  /**
   * Union of all leaf paths across all registered themes within a scope.
   * Every theme within a scope should have the same paths; this is the superset.
   */
  getSignalPaths(scope: string): string[] {
    const store = this.scopes.get(scope);
    if (!store) return [];
    const allPaths = new Set<string>();
    for (const theme of store.themes.values()) {
      for (const path of Object.keys(theme.values)) {
        allPaths.add(path);
      }
    }
    return [...allPaths].sort();
  }

  /** Get the ThemeLeaf for a specific path from the default theme within a scope. */
  getDefaultLeaf(scope: string, path: string): ThemeLeaf | undefined {
    const store = this.scopes.get(scope);
    if (!store?.defaultName) return undefined;
    const defaultTheme = store.themes.get(store.defaultName);
    return defaultTheme?.values[path];
  }

  /** Reset all scopes between compile runs. */
  clear(): void {
    this.scopes.clear();
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
 * @param scope    — theme scope identifier (e.g. 'espcompose:ui', 'lcars')
 * @param name     — human-readable theme variant name (used in `theme.select()`)
 * @param themeObj — the Theme object (will be flattened into leaf signals)
 */
export function registerTheme(scope: string, name: string, themeObj: Record<string, unknown>): void {
  registry.register(scope, name, themeObj);
}

// ── theme.select() API ─────────────────────────────────────────────────────

/**
 * Theme action namespace.
 *
 * @example
 * <Button onPress={() => { theme.select('espcompose:ui', 'light'); }} />
 */
export const theme: { readonly [BINDING_BRAND]?: true; select(scope: string, name: string): void } = {
  /**
   * Switch the active theme at runtime within a scope.
   *
   * Must be called inside a trigger handler body — it pushes a C++ lambda
   * action that sets the scoped theme_index signal and flushes the reactive
   * graph.
   *
   * @param scope — theme scope identifier
   * @param name  — name of a previously registered theme within that scope
   */
  // The AST compiler handles theme.select() calls at build time,
  // emitting the appropriate C++ lambda action.
  select(_scope: string, _name: string): void {
    throwCompileTimeOnly('theme.select()', 'Theme actions');
  },

};
