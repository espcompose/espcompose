// ────────────────────────────────────────────────────────────────────────────
// createTheme — typed theme handle factory
//
// Creates a type-safe handle that eliminates magic strings from the theme
// API surface.  Each design-system library calls this once and exports the
// handle; consumers use it for Provider rendering, reactive proxy access,
// and runtime theme switching.
//
// The handle carries phantom brands (THEME_BRAND, BINDING_BRAND) so the
// compiler and ESLint rule can detect `.select()` calls at build time.
//
// The `Scope` generic is inferred as a string literal from the `scope`
// argument.  TypeScript preserves this in `.d.ts` files, so the compiler
// can extract the scope string from the handle's type across library
// boundaries without needing to scan for the call site.
//
// Themes may be plain objects or factory functions `(settings: S) => T`.
// When any theme is a factory, the Provider accepts an optional `settings`
// prop.  If omitted, factories receive `undefined` and must apply their
// own defaults (e.g. via default parameters).
// ────────────────────────────────────────────────────────────────────────────

import type { EspComposeElement, BINDING_BRAND, THEME_BRAND } from '../../types';
import { createElement, Fragment } from '../../runtime';
import { registerTheme, getThemeRegistry } from './registry';
import { collectThemeFonts, substituteThemeFonts } from './font-resolver';
import { useTheme } from './reactive-proxy';
import { createLvglContextProvider, type IntentComponent, type LVGL_INTENTS } from '../../intents/intents';
import { throwCompileTimeOnly } from '../../errors';

// ── Internal helpers ───────────────────────────────────────────────────────

/** A theme entry is either a plain object or a factory function. */
type ThemeEntry<T extends object, S> = T | ((settings: S) => T);

/** Resolve a single theme entry given settings (may be undefined). */
function resolveEntry<T extends object, S>(
  entry: ThemeEntry<T, S>,
  settings: S | undefined,
): T {
  return typeof entry === 'function'
    ? (entry as (settings: S | undefined) => T)(settings)
    : entry;
}

// ── Public types ───────────────────────────────────────────────────────────

/**
 * Props for the theme Provider component.
 *
 * When themes are factory functions, `settings` may be provided to
 * customise the resolved theme.  If omitted, factories receive
 * `undefined` and should apply their own defaults.
 */
export interface ThemeProviderProps<Names extends string, S = void> {
  /** Name of the default (initial) theme. Defaults to the first registered theme. */
  default?: Names;
  /** Display/environment settings passed to theme factory functions. */
  settings?: S;
  /** Child elements. */
  children?: EspComposeElement | EspComposeElement[];
}

/**
 * A type-safe theme handle.
 *
 * Created by `createTheme()`.  Provides typed access to theme selection,
 * reactive proxy, Provider rendering, and extension.
 *
 * @typeParam T     — the theme object shape
 * @typeParam Names — union of registered theme name literals
 * @typeParam Scope — the scope string literal type (e.g. `'espcompose:ui'`)
 * @typeParam S     — settings type for factory themes (void when plain objects)
 */
export interface ThemeHandle<
  T extends object,
  Names extends string,
  Scope extends string = string,
  S = void,
> {
  /** The raw scope string (typed as the literal for compiler extraction). */
  readonly scope: Scope;

  /** Phantom brand for compiler detection. */
  readonly [THEME_BRAND]?: true;

  /** Phantom brand for ESLint action-call allowlisting. */
  readonly [BINDING_BRAND]?: true;

  /**
   * Switch the active theme at runtime within this scope.
   *
   * Must be called inside a trigger handler body (e.g. `onPress`).
   * The compiler transforms this into a C++ lambda action that sets the
   * scoped theme_index signal and flushes the reactive graph.
   *
   * @param name — one of the registered theme names
   */
  select(name: Names): void;

  /**
   * Access the reactive theme proxy for this scope.
   *
   * Returns a deeply-nested object whose leaf properties are
   * `IRReactiveNode<T>` instances tied to scoped theme signal memos.
   * When themes change at runtime via `.select()`, all downstream
   * effects recalculate automatically.
   */
  use(): T;

  /**
   * Extend this handle with additional theme variants.
   *
   * Returns a **new** handle for the same scope with the combined set
   * of theme names.  The parent themes are preserved; new themes are
   * added (or override existing names).
   *
   * New themes may be plain objects or factory functions matching `S`.
   *
   * @param themes  — additional theme name → theme object or factory entries
   * @param options — optional override for the default theme
   *
   * @example
   * ```ts
   * import { UITheme } from '@espcompose/ui';
   * const myTheme = UITheme.extend({ ocean: oceanTheme });
   * // myTheme.select is now 'dark' | 'light' | 'ocean'
   * ```
   */
  extend<N extends string>(
    themes: Record<N, ThemeEntry<T, S>>,
    options?: { default?: Names | N },
  ): ThemeHandle<T, Names | N, Scope, S>;

  /**
   * Pre-bound theme Provider component.
   *
   * When themes are plain objects, only `default` and `children` are exposed.
   * When themes include factory functions, an optional `settings` prop is
   * also available.
   */
  Provider: IntentComponent<
    ThemeProviderProps<Names, S>,
    readonly [typeof LVGL_INTENTS.WIDGET],
    undefined,
    undefined,
    true
  >;
}

// ── Factory overloads ──────────────────────────────────────────────────────

/**
 * Create a typed theme handle with factory-based themes.
 *
 * Theme factories receive a `settings` argument from the Provider at
 * render time and return a plain theme object.
 *
 * @example
 * ```ts
 * export const UITheme = createTheme('espcompose:ui', {
 *   dark: (settings: UIThemeSettings) => ({ name: 'Dark', ... }),
 *   light: (settings: UIThemeSettings) => ({ name: 'Light', ... }),
 * });
 *
 * // In JSX — settings is optional (factories handle undefined with defaults):
 * <UITheme.Provider settings={{ width: 480, height: 320 }} default="dark">
 *   <App />
 * </UITheme.Provider>
 * ```
 */
export function createTheme<
  T extends object,
  Names extends string,
  Scope extends string,
  S,
>(
  scope: Scope,
  themes: Record<Names, (settings: S) => T>,
  options?: { default?: Names },
): ThemeHandle<T, Names, Scope, S>;

/**
 * Create a typed theme handle with plain theme objects.
 *
 * @example
 * ```ts
 * export const UITheme = createTheme('espcompose:ui', {
 *   dark: darkTheme,
 *   light: lightTheme,
 * });
 *
 * // In JSX:
 * <UITheme.Provider default="dark">
 *   <App />
 * </UITheme.Provider>
 * ```
 */
export function createTheme<
  T extends object,
  Names extends string,
  Scope extends string,
>(
  scope: Scope,
  themes: Record<Names, T>,
  options?: { default?: Names },
): ThemeHandle<T, Names, Scope>;

// ── Implementation ─────────────────────────────────────────────────────────

export function createTheme<
  T extends object,
  Names extends string,
  Scope extends string,
  S = void,
>(
  scope: Scope,
  themes: Record<Names, ThemeEntry<T, S>>,
  options?: { default?: Names },
): ThemeHandle<T, Names, Scope, S> {
  const defaultName = options?.default;

  // ── Provider component ──────────────────────────────────────────────

  function ProviderImpl(
    props: ThemeProviderProps<Names, S>,
  ): EspComposeElement {
    const registry = getThemeRegistry();

    // Resolve theme entries — call factories with settings, pass objects through
    const resolved: Record<string, Record<string, unknown>> = {};
    for (const [name, entry] of Object.entries(themes)) {
      resolved[name] = resolveEntry(
        entry as ThemeEntry<T, S>,
        props.settings,
      ) as Record<string, unknown>;
    }

    // Register font assets across all resolved themes
    const fontRefs = collectThemeFonts(resolved);

    // Register all themes (with FontToken → Ref<FontRef> substitution)
    for (const [name, themeObj] of Object.entries(resolved)) {
      if (!registry.getThemes(scope).has(name)) {
        const substituted = substituteThemeFonts(themeObj, fontRefs);
        registerTheme(scope, name, substituted);
      }
    }

    // Set the default theme
    const effectiveDefault = props.default ?? defaultName;
    if (effectiveDefault) {
      registry.setDefault(scope, effectiveDefault);
    }

    // Pass children through (themes flow via the global registry)
    const children = props.children
      ? Array.isArray(props.children)
        ? props.children
        : [props.children]
      : [];

    return createElement(Fragment, { children });
  }

  const Provider = createLvglContextProvider(
    ProviderImpl as (
      props: ThemeProviderProps<string, S>,
    ) => EspComposeElement,
  );

  // ── Handle object ───────────────────────────────────────────────────

  const handle: ThemeHandle<T, Names, Scope, S> = {
    scope,

    select(_name: Names): void {
      throwCompileTimeOnly('ThemeHandle.select()', 'Theme actions');
    },

    use(): T {
      return useTheme<T>(scope);
    },

    extend<N extends string>(
      newThemes: Record<N, ThemeEntry<T, S>>,
      extendOptions?: { default?: Names | N },
    ): ThemeHandle<T, Names | N, Scope, S> {
      const merged = { ...themes, ...newThemes } as Record<
        Names | N,
        ThemeEntry<T, S>
      >;
      const mergedDefault = extendOptions?.default ?? defaultName;
      return createTheme<T, Names | N, Scope, S>(
        scope,
        merged as Record<Names | N, (settings: S) => T>,
        mergedDefault ? { default: mergedDefault } : undefined,
      );
    },

    Provider: Provider as unknown as IntentComponent<
      ThemeProviderProps<Names, S>,
      readonly [typeof LVGL_INTENTS.WIDGET],
      undefined,
      undefined,
      true
    >,
  };

  return handle;
}
