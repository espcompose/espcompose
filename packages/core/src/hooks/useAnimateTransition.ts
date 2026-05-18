// ────────────────────────────────────────────────────────────────────────────
// useAnimateTransition — animate reactive binding updates with lv_anim_t
//
// Declarative hook for library components to add animated interpolation to
// reactive style property bindings. Unlike useStyleTransition (which uses
// lv_style_transition_dsc_t for state changes), this targets programmatic
// lv_obj_set_style_*() calls from reactive bindings — wrapping them in
// lv_anim_t interpolation with optional direction guards.
//
// Example:
//   const containerRef = useRef();
//   useAnimateTransition(containerRef, 'paddingBottom', {
//     duration: '300ms',
//     direction: 'decrease',
//   });
// ────────────────────────────────────────────────────────────────────────────

import type { DurationValue } from '../lvgl/style/duration';
import type { AnimationEasing, AnimateTransitionDirection } from '../ir/contribution-types';
import { assertHookContext, getCurrentHookPath } from './useState';
import { registerContribution } from './useContributionScope';
import { resolvePropertyName, EASING_TO_KEY } from '../lvgl/style/resolve-transition';
import { parseDurationToMs } from '../lvgl/style/duration';

export interface AnimateTransitionOptions {
  /** Animation duration. */
  duration: DurationValue;
  /** Easing curve. Default: 'linear'. */
  easing?: AnimationEasing;
  /** Direction constraint. Default: 'both' (always animate). */
  direction?: AnimateTransitionDirection;
}

/**
 * Animate a reactive binding update on the specified style property.
 *
 * When the reactive value driving `property` changes, the generated C++
 * binding Effect uses `lv_anim_t` to interpolate from the current widget
 * value to the new value, subject to the `direction` constraint.
 *
 * @param ref      Ref to the target widget (from `useRef()`)
 * @param property CSS-like style property name (e.g. 'paddingBottom', 'opacity')
 * @param options  Animation timing and direction
 */
export function useAnimateTransition(
  ref: { toString(): string },
  property: string,
  options: AnimateTransitionOptions,
): void {
  assertHookContext('useAnimateTransition()');

  const resolvedProperty = resolvePropertyName(property);
  const durationMs = parseDurationToMs(options.duration);
  const easing = options.easing ? (EASING_TO_KEY[options.easing] ?? 'linear') : 'linear';
  const direction: AnimateTransitionDirection = options.direction ?? 'both';

  registerContribution({
    kind: 'attach-animate-transition',
    targetRef: ref.toString(),
    property: resolvedProperty,
    durationMs,
    easing,
    direction,
    sourceId: getCurrentHookPath(),
  });
}
