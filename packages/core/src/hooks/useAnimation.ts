// ────────────────────────────────────────────────────────────────────────────
// useAnimation — declare widget property animations
//
// Allows library components to declare explicit property animations on LVGL
// widgets they reference. The animation intent is registered as an
// AttachAnimationContribution via the contribution scope.
//
// The returned AnimationController has branded start()/stop() methods that
// the action compiler detects and lowers to animation_start/animation_stop
// IR action nodes.
//
// Example:
//   const panelRef = useRef<LvglObjRef>();
//   const fadeIn = useAnimation(panelRef, {
//     property: 'opacity',
//     from: 0,
//     to: 255,
//     duration: '500ms',
//     easing: 'ease-in-out',
//     autoStart: true,
//   });
//   // In a trigger handler:
//   fadeIn.start();
//   fadeIn.stop();
// ────────────────────────────────────────────────────────────────────────────

import type { AnimationController } from '../types';
import type { AnimationEasing } from '../ir/contribution-types';
import type { DurationValue } from '../lvgl/style/duration';
import { parseDurationToMs } from '../lvgl/style/duration';
import { assertHookContext, getCurrentHookPath } from './useState';
import { registerContribution } from './useContributionScope';
import { generateDeterministicId } from '../id';
import { throwCompileTimeOnly } from '../errors';
import { ANIMATION_ID } from '../actions/resolve/symbols';

// ── Config ─────────────────────────────────────────────────────────────────

/**
 * Configuration for a widget property animation.
 */
export interface AnimationConfig {
  /** Semantic style property to animate (camelCase, e.g. 'opacity', 'x', 'width'). */
  property: string;
  /** Start value. */
  from: number;
  /** End value. */
  to: number;
  /** Animation duration. */
  duration: DurationValue;
  /** Start delay before first run. */
  delay?: DurationValue;
  /** Easing curve. Defaults to 'linear'. */
  easing?: AnimationEasing;
  /** Repeat count. 0 = play once (default). Infinity = loop forever. */
  repeat?: number;
  /** Delay between repeats. */
  repeatDelay?: DurationValue;
  /** Reverse after reaching end value. */
  playback?: boolean | { duration?: DurationValue; delay?: DurationValue };
  /** Start automatically when the widget is created. Defaults to false. */
  autoStart?: boolean;
  /** LVGL part selector (camelCase, e.g. 'indicator', 'knob'). */
  part?: string;
  /** LVGL state selector (camelCase, e.g. 'pressed', 'disabled'). */
  state?: string;
}

// ── Internal shape ─────────────────────────────────────────────────────────

/** Internal fields on the controller for the action compiler to read. */
interface AnimationControllerInternal extends AnimationController {
  [ANIMATION_ID]: string;
}

// ── Hook ───────────────────────────────────────────────────────────────────

/**
 * Declare a widget property animation.
 *
 * Called inside a function component body during render. `targetRef`
 * identifies the widget to animate (must be assigned to a widget's `ref`
 * prop). Returns an `AnimationController` whose `start()` and `stop()`
 * methods can be used inside trigger handlers.
 *
 * @param targetRef  Ref to the target widget
 * @param config     Animation configuration
 * @returns          Controller with start/stop methods (compile-time markers)
 */
export function useAnimation(
  targetRef: { toString(): string },
  config: AnimationConfig,
): AnimationController {
  assertHookContext('useAnimation()');

  const hookPath = getCurrentHookPath();
  const targetToken = String(targetRef);
  const animationId = generateDeterministicId('anim', hookPath + ':' + targetToken + ':' + config.property + ':' + config.from + ':' + config.to);

  // Parse all duration fields to milliseconds.
  const durationMs = parseDurationToMs(config.duration);
  const delayMs = config.delay !== undefined ? parseDurationToMs(config.delay) : undefined;
  const repeatDelayMs = config.repeatDelay !== undefined ? parseDurationToMs(config.repeatDelay) : undefined;

  // Parse playback durations if playback is an object.
  let playback: { durationMs?: number; delayMs?: number } | undefined;
  if (config.playback === true) {
    playback = {};
  } else if (typeof config.playback === 'object') {
    playback = {
      durationMs: config.playback.duration !== undefined ? parseDurationToMs(config.playback.duration) : undefined,
      delayMs: config.playback.delay !== undefined ? parseDurationToMs(config.playback.delay) : undefined,
    };
  }

  // Normalize repeat: Infinity → -1 for the IR representation.
  const repeat = config.repeat === Infinity ? -1 : config.repeat;

  registerContribution({
    kind: 'attach-animation',
    targetRef: String(targetRef),
    animationId,
    property: config.property,
    from: config.from,
    to: config.to,
    durationMs,
    delayMs,
    easing: config.easing,
    repeat,
    repeatDelayMs,
    playback,
    autoStart: config.autoStart,
    part: config.part,
    state: config.state,
    sourceId: hookPath,
  });

  // Build the branded controller.
  const controller: AnimationControllerInternal = {
    [ANIMATION_ID]: animationId,
    start() {
      throwCompileTimeOnly('animationController.start()', 'Animation actions');
    },
    stop() {
      throwCompileTimeOnly('animationController.stop()', 'Animation actions');
    },
  };

  return controller;
}
