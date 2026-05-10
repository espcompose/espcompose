// ────────────────────────────────────────────────────────────────────────────
// Animation controller reference resolution
//
// When the action compiler encounters `animCtrl.start()` / `animCtrl.stop()`,
// it emits IR actions with `controllerRef` instead of the concrete
// `animationId` (because the animation ID is only known at runtime after
// the hook runs).  These helpers resolve them from `__refBindings` at
// serialization time.
// ────────────────────────────────────────────────────────────────────────────

import type { IRActionNode } from '../../ir/action-types';
import { ANIMATION_ID } from './symbols';
import { walkActionTree } from './walk';

/** Shape of an AnimationController's hidden internal fields. */
interface AnimationControllerInternal {
  [ANIMATION_ID]?: string;
}

function isAnimationController(v: unknown): v is AnimationControllerInternal {
  return v != null && typeof v === 'object' && ANIMATION_ID in (v as object);
}

/**
 * Resolve deferred animation controller references in a compiled action tree.
 *
 * Walks the action tree and replaces `controllerRef` placeholders with the
 * actual `animationId` values from the bound AnimationController objects in
 * `refBindings`.
 */
export function resolveAnimationControllerRefs(
  actions: IRActionNode[],
  refBindings?: Record<string, unknown>,
): void {
  if (!refBindings) return;

  walkActionTree(actions, (actions, i) => {
    const action = actions[i];
    if (
      (action.kind === 'action:animation_start' || action.kind === 'action:animation_stop') &&
      action.controllerRef
    ) {
      const ctrl = refBindings[action.controllerRef] as AnimationControllerInternal | undefined;
      if (ctrl && ctrl[ANIMATION_ID]) {
        action.animationId = ctrl[ANIMATION_ID];
        delete action.controllerRef;
      }
      return i + 1;
    }
    return undefined;
  });
}

/**
 * Remove resolved animation controller objects from refBindings.
 *
 * After resolving animation controller refs, the controller objects in
 * refBindings must be removed so they don't corrupt lambda strings during
 * ref resolution (AnimationController.toString() → '[object Object]' would
 * break).
 */
export function cleanAnimationControllerRefs(
  refBindings: Record<string, unknown>,
): void {
  for (const key of Object.keys(refBindings)) {
    const val = refBindings[key];
    if (isAnimationController(val)) {
      delete refBindings[key];
    }
  }
}
