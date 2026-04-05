// ────────────────────────────────────────────────────────────────────────────
// Context mechanism
//
// A global push/pop stack per context ID lets scope functions
// (withScriptScope, withReactiveScope, etc.) establish a scope frame
// and restore it after the render pass completes.
//
// Providers are implemented as function components that render a <context>
// intrinsic element.  The runtime handles <context> alongside other built-in
// element types (esphome, lvgl, fragment) — no special-case element shape
// needed, so every element-resolution pipeline (LVGL, top-level sections,
// etc.) gets context support for free.
// ────────────────────────────────────────────────────────────────────────────

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

