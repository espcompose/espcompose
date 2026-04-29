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
// ────────────────────────────────────────────────────────────────────────────

import type { EspComposeElement, BINDING_BRAND, THEME_BRAND } from '../types';
import { createElement, Fragment } from '../runtime';
import { registerTheme, getThemeRegistry } from './registry';
import { collectThemeFonts, substituteThemeFonts } from './font-resolver';
import { useTheme } from './reactive-proxy';
import { createLvglWidget, type IntentComponent, type LVGL_INTENTS } from '../intents';
import { throwCompileTimeOnly } from '../errors';

// ── Public types ───────────────────────────────────────────────────────────

/**
 * Props for the auto-generated Provider component on a theme handle.
 *
 * The `scope` and `themes` are pre-bound by `createTheme()` — only
 * `default` and `children` are exposed to consumers.
 */
export interface ThemeProviderProps<Names extends string> {
  /** Name of the default (initial) theme. Defaults to the first registered theme. */
  default?: Names;
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
 */
export interface ThemeHandle<
  T extends object,
  Names extends string,
  Scope extends string = string,
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
   * @param themes  — additional theme name → theme object entries
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
    themes: Record<N, T>,
    options?: { default?: Names | N },
  ): ThemeHandle<T, Names | N, Scope>;

  /**
   * Pre-bound theme Provider component.
   *
   * Renders children and registers the handle's themes into the global
   * theme registry.  Only `default` and `children` props are exposed —
   * `scope` and `themes` are pre-bound from `createTheme()`.
   */
  Provider: IntentComponent<
    ThemeProviderProps<Names>,
    readonly [typeof LVGL_INTENTS.WIDGET],
    undefined,
    undefined,
    true
  >;
}

// ── Factory ────────────────────────────────────────────────────────────────

/**
 * Create a typed theme handle.
 *
 * @param scope   — scope identifier string (e.g. `'espcompose:ui'`, `'lcars'`)
 * @param themes  — map of theme name → theme object
 * @param options — optional: specify the default theme name
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
 *   <Button onPress={() => { UITheme.select('light'); }} />
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
): ThemeHandle<T, Names, Scope> {
  const defaultName = options?.default;

  // ── Provider component ──────────────────────────────────────────────

  function ProviderImpl(props: ThemeProviderProps<Names>): EspComposeElement {
    const registry = getThemeRegistry();

    // Register font assets across all themes
    const fontRefs = collectThemeFonts(
      themes as unknown as Record<string, Record<string, unknown>>,
    );

    // Register all themes (with FontToken → Ref<FontRef> substitution)
    for (const [name, themeObj] of Object.entries(themes)) {
      if (!registry.getThemes(scope).has(name)) {
        const resolved = substituteThemeFonts(
          themeObj as Record<string, unknown>,
          fontRefs,
        );
        registerTheme(scope, name, resolved);
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

  const Provider = createLvglWidget(
    ProviderImpl as (props: ThemeProviderProps<string>) => EspComposeElement,
    { allowedChildIntents: undefined, contextTransparent: true as const },
  );

  // ── Handle object ───────────────────────────────────────────────────

  const handle: ThemeHandle<T, Names, Scope> = {
    scope,

    select(_name: Names): void {
      throwCompileTimeOnly('ThemeHandle.select()', 'Theme actions');
    },

    use(): T {
      return useTheme<T>(scope);
    },

    extend<N extends string>(
      newThemes: Record<N, T>,
      extendOptions?: { default?: Names | N },
    ): ThemeHandle<T, Names | N, Scope> {
      const merged = { ...themes, ...newThemes } as Record<Names | N, T>;
      const mergedDefault = extendOptions?.default ?? defaultName;
      return createTheme<T, Names | N, Scope>(
        scope,
        merged,
        mergedDefault ? { default: mergedDefault } : undefined,
      );
    },

    Provider: Provider as unknown as IntentComponent<
      ThemeProviderProps<Names>,
      readonly [typeof LVGL_INTENTS.WIDGET],
      undefined,
      undefined,
      true
    >,
  };

  return handle;
}
