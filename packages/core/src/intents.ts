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
// Widget shorthand
// ────────────────────────────────────────────────────────────────────────────

/**
 * Create an LVGL widget component with sensible defaults.
 *
 * Defaults:
 * - `intents: [LVGL_INTENTS.WIDGET]`
 * - `allowedChildIntents: []`
 * - no `contextTransparent`
 *
 * Pass an optional `overrides` object to change any of these (e.g. to
 * allow child widgets for container-style components, or declare
 * additional intents like `COMPOSE_UI_INTENTS.COL`).
 *
 * @example
 * // Leaf widget — zero config:
 * const Switch = createWidgetComponent((props: SwitchProps) => { … });
 *
 * // Container widget:
 * const Card = createWidgetComponent(
 *   (props: CardProps) => { … },
 *   { allowedChildIntents: [LVGL_INTENTS.WIDGET] as const, contextTransparent: true as const },
 * );
 *
 * // Widget with additional intents (e.g. Col inside Row):
 * const Col = createWidgetComponent(
 *   (props: ColProps) => { … },
 *   { additionalIntents: [COMPOSE_UI_INTENTS.COL] as const },
 * );
 */
export function createWidgetComponent<
  P,
  Extra extends readonly string[] = readonly [],
  A extends readonly string[] | undefined = readonly [],
  CT extends boolean | undefined = undefined,
>(
  component: FunctionComponent<P>,
  overrides?: {
    additionalIntents?: Extra;
    allowedChildIntents?: A;
    contextTransparent?: CT;
  },
): IntentComponent<P, readonly [...Extra, typeof LVGL_INTENTS.WIDGET], A, undefined, CT> {
  const intents = [
    ...(overrides?.additionalIntents ?? []),
    LVGL_INTENTS.WIDGET,
  ] as const;

  return createIntentComponent(component, {
    intents: intents as unknown as readonly [...Extra, typeof LVGL_INTENTS.WIDGET],
    allowedChildIntents: (overrides?.allowedChildIntents ?? ([] as const)) as A,
    ...(overrides?.contextTransparent ? { contextTransparent: overrides.contextTransparent } : {}),
  });
}

export interface IntrinsicIntentMeta {
  readonly intents: readonly string[];
  readonly allowedChildIntents?: readonly string[];
  readonly context?: readonly string[];
  readonly contextTransparent?: boolean;
}


