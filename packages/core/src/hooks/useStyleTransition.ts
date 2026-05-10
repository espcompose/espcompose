// ────────────────────────────────────────────────────────────────────────────
// useStyleTransition — declare LVGL style transitions on widgets
//
// When any of the listed style properties change on the target widget,
// LVGL animates the change over the specified duration/easing instead of
// applying it instantly.
//
// Example:
//   const ref = useRef();
//   useStyleTransition(ref, {
//     properties: ['paddingTop'],
//     duration: '200ms',
//     easing: 'ease-out',
//   });
// ────────────────────────────────────────────────────────────────────────────

import type { AnimationEasing } from '../ir/contribution-types';
import type { DurationValue } from '../lvgl/style/duration';
import { parseDurationToMs } from '../lvgl/style/duration';
import { assertHookContext, getCurrentHookPath } from './useState';
import { registerContribution } from './useContributionScope';
import { generateDeterministicId } from '../id';
import { CSS_TO_LVGL_MAP } from '../lvgl/style/mapping';

// ── Config ─────────────────────────────────────────────────────────────────

/**
 * Configuration for an LVGL style transition.
 */
export interface StyleTransitionConfig {
  /** Style properties to animate (camelCase, e.g. 'paddingTop', 'opacity'). */
  properties: string[];
  /** Transition duration. */
  duration: DurationValue;
  /** Transition delay before starting. */
  delay?: DurationValue;
  /** Easing curve. Defaults to 'linear'. */
  easing?: AnimationEasing;
  /** LVGL part selector (camelCase, e.g. 'indicator', 'knob'). */
  part?: string;
  /** LVGL state selector (camelCase, e.g. 'pressed', 'disabled'). */
  state?: string;
}

// ── Hook ───────────────────────────────────────────────────────────────────

/**
 * Declare an LVGL style transition on a widget.
 *
 * Called inside a function component body during render. When any of the
 * listed style properties change, the widget will animate the transition
 * over the given duration/easing.
 *
 * @param targetRef  Ref to the target widget
 * @param config     Transition configuration
 */
export function useStyleTransition(
  targetRef: { toString(): string },
  config: StyleTransitionConfig,
): void {
  assertHookContext('useStyleTransition()');

  const hookPath = getCurrentHookPath();
  const targetToken = String(targetRef);
  const propsKey = config.properties.sort().join(',');
  const transitionId = generateDeterministicId('strans', hookPath + ':' + targetToken + ':' + propsKey);

  const durationMs = parseDurationToMs(config.duration);
  const delayMs = config.delay !== undefined ? parseDurationToMs(config.delay) : undefined;

  // Resolve CSS property names to LVGL camelCase equivalents.
  // The lowering layer only needs LVGL names (e.g. 'padTop', not 'paddingTop').
  const resolvedProps: string[] = [];
  for (const cssProp of config.properties) {
    const mapping = CSS_TO_LVGL_MAP[cssProp];
    if (mapping) {
      if ('lvglProp' in mapping) {
        resolvedProps.push(mapping.lvglProp);
      } else if ('lvglProps' in mapping) {
        resolvedProps.push(...mapping.lvglProps);
      }
    } else {
      // Assume it's already an LVGL prop name
      resolvedProps.push(cssProp);
    }
  }

  registerContribution({
    kind: 'attach-style-transition',
    targetRef: targetToken,
    transitionId,
    properties: resolvedProps,
    durationMs,
    delayMs,
    easing: config.easing,
    part: config.part,
    state: config.state,
    sourceId: hookPath,
  });
}
