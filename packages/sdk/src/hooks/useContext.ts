// ────────────────────────────────────────────────────────────────────────────
// Context mechanism — ported from Resolut useContext.tsx
//
// A global push/pop stack per context ID lets _withScriptScope establish a
// scope frame and restore it after the render pass completes.
//
// Providers are implemented as function components that render a <context>
// intrinsic element.  The runtime handles <context> alongside other built-in
// element types (esphome, lvgl, fragment) — no special-case element shape
// needed, so every element-resolution pipeline (LVGL, top-level sections,
// etc.) gets context support for free.
// ────────────────────────────────────────────────────────────────────────────

import type { EspComposeElement } from '../types';

export interface Context<T> {
  id: symbol;
  value: T;
}

const contextMap: Map<symbol, unknown[]> = new Map();

export function createContext<T>(defaultValue: T): Context<T> {
  return { id: Symbol(), value: defaultValue };
}

export function withContext<T, R>(ctx: Context<T>, value: T, fn: () => R): R {
  let stack = contextMap.get(ctx.id) as T[] | undefined;
  if (!stack) {
    stack = [];
    contextMap.set(ctx.id, stack);
  }
  stack.push(value);
  try {
    return fn();
  } finally {
    stack.pop();
  }
}

export function useContext<T>(ctx: Context<T>): T {
  const stack = contextMap.get(ctx.id) as T[] | undefined;
  if (stack && stack.length > 0) return stack[stack.length - 1];
  return ctx.value;
}

// ────────────────────────────────────────────────────────────────────────────
// Context Provider factory
//
// Creates a function component that renders a <context> intrinsic element.
// The runtime recognises `el.type === 'context'` and wraps child
// serialisation inside `withContext`.
// ────────────────────────────────────────────────────────────────────────────

/**
 * Create a JSX-friendly context provider component.
 *
 * The returned component renders the built-in `<context>` intrinsic element.
 * The runtime wraps child evaluation inside `withContext` so all descendants
 * read the provided value.
 *
 * @example
 * const ThemeContext = createContext(darkTheme);
 * const ThemeProvider = createContextProvider<Theme>(ThemeContext);
 *
 * // Usage in JSX:
 * <ThemeProvider value={lightTheme}>
 *   <Screen>…</Screen>
 * </ThemeProvider>
 */
export function createContextProvider<T>(
  ctx: Context<T>,
): (props: { value: T; children?: EspComposeElement | EspComposeElement[] }) => EspComposeElement {
  return (props) => ({
    type: 'context' as string,
    props: {
      context: ctx,
      value: props.value,
      ...(props.children
        ? { children: Array.isArray(props.children) ? props.children : [props.children] }
        : {}),
    },
  });
}
