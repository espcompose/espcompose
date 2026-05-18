// ────────────────────────────────────────────────────────────────────────────
// animate() — async animation action for widget properties
//
// Compile-time-only function. The action compiler recognizes
// `await animate(ref, config)` at the AST level and emits an IRAnimateAction
// node. The ESPHome target lowers this to the native `espcompose.animate`
// action backed by LVGL's animation engine with true async completion.
//
// Usage:
//   const panelRef = useRef<LvglObjRef>();
//
//   useScript('slideIn', async () => {
//     await animate(panelRef, {
//       property: 'translateY',
//       from: -100,
//       to: 0,
//       duration: '300ms',
//       easing: 'ease-out',
//     });
//   });
// ────────────────────────────────────────────────────────────────────────────

import type { AnimationEasing } from '../ir/contribution-types';
import type { DurationValue } from '../lvgl/style/duration';
import type { BINDING_BRAND } from '../types';

/** Branded animate function type. */
interface AnimateFunction {
  readonly [BINDING_BRAND]?: true;
  (ref: unknown, config: AnimateConfig): Promise<void>;
}

/**
 * Configuration for an `animate()` call.
 */
export interface AnimateConfig {
  /** CSS-like style property to animate (camelCase, e.g. 'opacity', 'translateY'). */
  property: string;
  /** Start value (numeric — LVGL style values are integers). */
  from: number;
  /** End value. */
  to: number;
  /** Animation duration. */
  duration: DurationValue;
  /** Easing curve. Defaults to 'linear'. */
  easing?: AnimationEasing;
  /** Start delay. */
  delay?: DurationValue;
  /** LVGL part selector (e.g. 'indicator', 'knob'). */
  part?: string;
  /** LVGL state selector (e.g. 'pressed', 'disabled'). */
  state?: string;
}

/**
 * Animate a widget's style property over time.
 *
 * This is a compile-time-only function — the AST-based action compiler
 * detects `await animate(ref, config)` and emits an `IRAnimateAction` node.
 * The function is never actually called at runtime.
 *
 * @param ref     Ref to the target widget (from `useRef()`)
 * @param config  Animation configuration
 * @returns       Promise that resolves when the animation completes
 */
export const animate: AnimateFunction = function animate(_ref: unknown, _config: AnimateConfig): Promise<void> {
  throw new Error(
    'animate() is a compile-time-only action. ' +
    'It must be used inside a useScript() body with `await`.',
  );
} as AnimateFunction;
