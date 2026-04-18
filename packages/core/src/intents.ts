/**
 * Intent system for ESPHome Compose
 *
 * Components declare what they ARE (intents) and what children they ACCEPT
 * (allowedChildIntents). An ESLint rule validates the TSX tree against these
 * declarations at author-time.
 *
 * Adapted from the Resolut project's symbol-based intent branding pattern.
 */

import type { FunctionComponent, RefProp } from './types';

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
 * const Screen = createComponent(
 *   (props: ScreenProps) => <lvgl-page>{props.children}</lvgl-page>,
 *   {
 *     intents: ['compose-ui:screen', 'lvgl:widget'] as const,
 *     allowedChildIntents: ['compose-ui:layout', 'compose-ui:component', 'lvgl:widget'] as const,
 *   }
 * );
 */
export function createComponent<
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
 * Create an LVGL leaf widget component with sensible defaults.
 *
 * Defaults:
 * - `intents: [LVGL_INTENTS.WIDGET]`
 * - `allowedChildIntents: []`
 * - no `contextTransparent`
 *
 * Pass an optional `overrides` object to change any of these.
 *
 * For container widgets that accept any widget children, use
 * {@link createContainerWidget} instead.
 *
 * For paired parent/child layout components (e.g. Row/Col),
 * use {@link createLayoutWidget} instead.
 *
 * @example
 * type SwitchProps = WidgetProps<{ value?: boolean }>;
 * const Switch = createWidget<SwitchProps>((props) => { … });
 */

/** Leaf widget (no overrides) — use explicit generic `<P>`. */
export function createWidget<P>(
  component: FunctionComponent<P>,
): IntentComponent<P & { ref?: RefProp }, readonly [typeof LVGL_INTENTS.WIDGET], readonly [], undefined, undefined>;

/** Widget with overrides — `P` is inferred from the annotated function parameter. */
export function createWidget<
  P,
  Extra extends readonly string[] = readonly [],
  A extends readonly string[] | undefined = readonly [],
  CT extends boolean | undefined = undefined,
>(
  component: FunctionComponent<P>,
  overrides: {
    additionalIntents?: Extra;
    allowedChildIntents?: A;
    contextTransparent?: CT;
  },
): IntentComponent<P & { ref?: RefProp }, readonly [...Extra, typeof LVGL_INTENTS.WIDGET], A, undefined, CT>;

export function createWidget<
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
): IntentComponent<P & { ref?: RefProp }, readonly [...Extra, typeof LVGL_INTENTS.WIDGET], A, undefined, CT> {
  const intents = [
    ...(overrides?.additionalIntents ?? []),
    LVGL_INTENTS.WIDGET,
  ] as const;

  return createComponent(component, {
    intents: intents as unknown as readonly [...Extra, typeof LVGL_INTENTS.WIDGET],
    allowedChildIntents: (overrides?.allowedChildIntents ?? ([] as const)) as A,
    ...(overrides?.contextTransparent ? { contextTransparent: overrides.contextTransparent } : {}),
  });
}

/**
 * Create a container widget — an LVGL widget that accepts child widgets and
 * is context-transparent.
 *
 * Fixed behaviour (not overridable):
 * - `intents: [LVGL_INTENTS.WIDGET]`
 * - `allowedChildIntents: [LVGL_INTENTS.WIDGET]`
 * - `contextTransparent: true`
 *
 * Use `createWidget` instead when you need custom `allowedChildIntents`,
 * `additionalIntents`, or when context-transparency should be disabled.
 *
 * @example
 * type CardProps = WidgetPropsWithChildren<{ padding?: SpacingToken }>;
 * export const Card = createContainerWidget((props: CardProps) => {
 *   return <lvgl-obj style={{ padding: props.padding }}>{props.children}</lvgl-obj>;
 * });
 */
export function createContainerWidget<P>(
  component: FunctionComponent<P>,
): IntentComponent<P & { ref?: RefProp }, readonly [typeof LVGL_INTENTS.WIDGET], readonly [typeof LVGL_INTENTS.WIDGET], undefined, true> {
  return createWidget(component, {
    allowedChildIntents: [LVGL_INTENTS.WIDGET] as const,
    contextTransparent: true as const,
  });
}

/**
 * Create a paired layout parent + child, returning both as a tuple.
 *
 * The parent is a container widget that only accepts children matching
 * `slotIntent`. The child declares `slotIntent` as its sole intent
 * (it is NOT a general widget) and accepts `[LVGL_INTENTS.WIDGET]` children.
 * Both are context-transparent.
 *
 * @example
 * const [Row, Col] = createLayoutWidget(
 *   COMPOSE_UI_INTENTS.COL,
 *   (props: RowProps) => { … },
 *   (props: ColProps) => { … },
 * );
 */
export function createLayoutWidget<S extends string, P, C>(
  slotIntent: S,
  parent: FunctionComponent<P>,
  child: FunctionComponent<C>,
): [
  IntentComponent<P & { ref?: RefProp }, readonly [typeof LVGL_INTENTS.WIDGET], readonly [S], undefined, true>,
  IntentComponent<C & { ref?: RefProp }, readonly [S], readonly [typeof LVGL_INTENTS.WIDGET], undefined, true>,
] {
  const brandedParent = createWidget(parent, {
    allowedChildIntents: [slotIntent] as readonly [S],
    contextTransparent: true as const,
  });

  const brandedChild = createComponent(child, {
    intents: [slotIntent] as readonly [S],
    allowedChildIntents: [LVGL_INTENTS.WIDGET] as const,
    contextTransparent: true as const,
  });

  return [brandedParent, brandedChild];
}

export interface IntrinsicIntentMeta {
  readonly intents: readonly string[];
  readonly allowedChildIntents?: readonly string[];
  readonly context?: readonly string[];
  readonly contextTransparent?: boolean;
}


