// ────────────────────────────────────────────────────────────────────────────
// useStyleTransition — contribute style transitions to a referenced widget
//
// Declarative hook for library components to add LVGL style transitions to
// widgets they reference but don't own. The contributed descriptors are
// merged into `IRUIRegistry.styleTransitions` during the contribution pass
// and lowered to `lv_style_transition_dsc_t` structs in C++ by the target.
//
// Example:
//   const cardRef = useRef();
//   useStyleTransition(cardRef, [
//     { properties: ['backgroundColor', 'opacity'], duration: '200ms', easing: 'ease-out' },
//   ]);
// ────────────────────────────────────────────────────────────────────────────

import type { StyleTransitionDescriptor } from '../lvgl/style/types';
import type { IRStyleTransitionDescriptor } from '../ir/contribution-types';
import { assertHookContext, getCurrentHookPath } from './useState';
import { registerContribution } from './useContributionScope';
import { resolveTransitionDescriptors } from '../lvgl/style/resolve-transition';

/**
 * Contribute style transitions to a widget identified by `ref`.
 *
 * Each descriptor specifies which CSS-like properties should smoothly
 * interpolate when the widget's state changes. Multiple descriptors allow
 * per-property timing control.
 *
 * @param ref         Ref to the target widget (from `useRef()`)
 * @param descriptors One or more transition descriptors
 * @param options     Optional part/state targeting
 */
export function useStyleTransition(
  ref: { toString(): string },
  descriptors: StyleTransitionDescriptor | StyleTransitionDescriptor[],
  options?: { part?: string; state?: string },
): void {
  assertHookContext('useStyleTransition()');

  const resolved: IRStyleTransitionDescriptor[] = resolveTransitionDescriptors(
    Array.isArray(descriptors) ? descriptors : [descriptors],
  );

  registerContribution({
    kind: 'attach-style-transition',
    targetRef: ref.toString(),
    descriptors: resolved,
    sourceId: getCurrentHookPath(),
    ...(options?.part ? { part: options.part } : {}),
    ...(options?.state ? { state: options.state } : {}),
  });
}
