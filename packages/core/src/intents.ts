/**
 * Intent system for ESPHome Compose
 *
 * Components declare what they ARE (intents) and what children they ACCEPT
 * (allowedChildIntents). An ESLint rule validates the TSX tree against these
 * declarations at author-time.
 *
 * Adapted from the Resolut project's symbol-based intent branding pattern.
 */

import type { FunctionComponent } from './types';

// ────────────────────────────────────────────────────────────────────────────
// Symbols — cross-module branding keys
// ────────────────────────────────────────────────────────────────────────────

/** What a component IS — validated against parent's allowedChildIntents. */
export const INTENTS = Symbol.for('esphome.compose.intents');

/** What immediate children can be — structural constraint on child intents. */
export const ALLOWED_CHILD_INTENTS = Symbol.for('esphome.compose.allowedChildIntents');

/** Semantic context that propagates to ALL descendants (nearest ancestor wins). */
export const CONTEXT = Symbol.for('esphome.compose.context');

/** Flag: component is transparent to context validation but passes context through. */
export const CONTEXT_TRANSPARENT = Symbol.for('esphome.compose.contextTransparent');

// ────────────────────────────────────────────────────────────────────────────
// Intent constants — domain taxonomy
// ────────────────────────────────────────────────────────────────────────────

/** ESPHome root-level intents */
export const ESPHOME_INTENTS = {
  ROOT: 'esphome:root',
  INFRASTRUCTURE: 'esphome:infrastructure',
  PLATFORM: 'esphome:platform',
  DISPLAY: 'esphome:display',
} as const;

/** LVGL intents */
export const LVGL_INTENTS = {
  ROOT: 'lvgl:root',
  PAGE: 'lvgl:page',
  WIDGET: 'lvgl:widget',
} as const;

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

export interface IntentBrand<
  I extends readonly string[] = readonly string[],
  A extends readonly string[] | undefined = readonly string[] | undefined,
  C extends readonly string[] | undefined = undefined,
  CT extends boolean | undefined = undefined,
> {
  readonly [INTENTS]: I;
  readonly [ALLOWED_CHILD_INTENTS]: A;
  readonly [CONTEXT]?: C;
  readonly [CONTEXT_TRANSPARENT]?: CT;
}

export type IntentComponent<
  P = Record<string, unknown>,
  I extends readonly string[] = readonly string[],
  A extends readonly string[] | undefined = readonly string[] | undefined,
  C extends readonly string[] | undefined = undefined,
  CT extends boolean | undefined = undefined,
> = FunctionComponent<P> & IntentBrand<I, A, C, CT>;

export interface IntentBrandOptions<
  I extends readonly string[],
  A extends readonly string[] | undefined,
  C extends readonly string[] | undefined = undefined,
  CT extends boolean | undefined = undefined,
> {
  intents: I;
  allowedChildIntents: A;
  context?: C;
  contextTransparent?: CT;
}

// ────────────────────────────────────────────────────────────────────────────
// Factories
// ────────────────────────────────────────────────────────────────────────────

/**
 * Create an intent-branded component for JSX parent-child validation.
 *
 * @param component - The function component implementation
 * @param options - Intent branding configuration
 * @returns A branded IntentComponent
 *
 * @example
 * const Screen = createIntentComponent(
 *   (props: ScreenProps) => <lvgl-page>{props.children}</lvgl-page>,
 *   {
 *     intents: ['compose-ui:screen', 'lvgl:widget'] as const,
 *     allowedChildIntents: ['compose-ui:layout', 'compose-ui:component', 'lvgl:widget'] as const,
 *   }
 * );
 */
export function createIntentComponent<
  P,
  I extends readonly string[],
  A extends readonly string[] | undefined,
  C extends readonly string[] | undefined = undefined,
  CT extends boolean | undefined = undefined,
>(
  component: FunctionComponent<P>,
  options: IntentBrandOptions<I, A, C, CT>,
): IntentComponent<P, I, A, C, CT> {
  const brand = {
    [INTENTS]: options.intents,
    [ALLOWED_CHILD_INTENTS]: options.allowedChildIntents,
    ...(options.context && options.context.length > 0 ? { [CONTEXT]: options.context } : {}),
    ...(options.contextTransparent ? { [CONTEXT_TRANSPARENT]: options.contextTransparent } : {}),
  };

  return Object.assign(component, brand) as unknown as IntentComponent<P, I, A, C, CT>;
}

// ────────────────────────────────────────────────────────────────────────────
// Intrinsic element intent metadata
// ────────────────────────────────────────────────────────────────────────────

export interface IntrinsicIntentMeta {
  readonly intents: readonly string[];
  readonly allowedChildIntents?: readonly string[];
  readonly context?: readonly string[];
  readonly contextTransparent?: boolean;
}

// ────────────────────────────────────────────────────────────────────────────
// Helpers for runtime intent introspection
// ────────────────────────────────────────────────────────────────────────────

/** Check if a function component has intent branding. */
export function hasIntents(fn: unknown): fn is IntentBrand {
  return typeof fn === 'function' && INTENTS in (fn as object);
}

/** Get the intents from a branded component, or undefined if unbranded. */
export function getIntents(fn: unknown): readonly string[] | undefined {
  if (hasIntents(fn)) return fn[INTENTS];
  return undefined;
}

/** Get the allowed child intents from a branded component. */
export function getAllowedChildIntents(fn: unknown): readonly string[] | undefined {
  if (hasIntents(fn)) return fn[ALLOWED_CHILD_INTENTS];
  return undefined;
}

/** Get the context from a branded component. */
export function getContext(fn: unknown): readonly string[] | undefined {
  if (hasIntents(fn)) return fn[CONTEXT];
  return undefined;
}

/** Check if a component is context-transparent. */
export function isContextTransparent(fn: unknown): boolean {
  if (hasIntents(fn)) return fn[CONTEXT_TRANSPARENT] === true;
  return false;
}
