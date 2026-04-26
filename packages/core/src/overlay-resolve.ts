// ────────────────────────────────────────────────────────────────────────────
// Shared overlay controller reference resolution
//
// When the script transformer encounters `ctrl.show()` / `ctrl.dismiss()`,
// it may emit IR actions with `controllerRef` instead of literal
// `templateKey`/`instanceIndex` (because the controller type doesn't carry
// literal values).  These helpers resolve them from `__refBindings` at
// serialization time.
// ────────────────────────────────────────────────────────────────────────────

import type { IRActionNode } from './ir/action-types';

/**
 * Resolve deferred overlay controller references in a compiled action tree.
 *
 * Walks the action tree and replaces `controllerRef` placeholders with the
 * actual `templateKey`/`instanceIndex`/`zOrder` values from the bound
 * OverlayController objects in `refBindings`.
 */
export function resolveOverlayControllerRefs(
  actions: IRActionNode[],
  refBindings?: Record<string, unknown>,
): void {
  if (!refBindings) return;
  for (const action of actions) {
    if (action.kind === 'overlay_show' && action.controllerRef) {
      const ctrl = refBindings[action.controllerRef] as
        { __templateKey?: string; __instanceIndex?: number; __zOrder?: number } | undefined;
      if (ctrl) {
        action.templateKey = ctrl.__templateKey ?? action.templateKey;
        action.instanceIndex = ctrl.__instanceIndex ?? action.instanceIndex;
        action.zOrder = ctrl.__zOrder ?? action.zOrder;
        delete action.controllerRef;
      }
    } else if (action.kind === 'overlay_dismiss' && action.controllerRef) {
      const ctrl = refBindings[action.controllerRef] as
        { __templateKey?: string; __zOrder?: number } | undefined;
      if (ctrl) {
        action.templateKey = ctrl.__templateKey ?? action.templateKey;
        action.zOrder = ctrl.__zOrder ?? action.zOrder;
        delete action.controllerRef;
      }
    } else if (action.kind === 'if') {
      resolveOverlayControllerRefs(action.then, refBindings);
      if (action.else) resolveOverlayControllerRefs(action.else, refBindings);
    } else if (action.kind === 'while' || action.kind === 'repeat') {
      resolveOverlayControllerRefs(action.then, refBindings);
    }
  }
}

/**
 * Remove resolved overlay controller objects from refBindings.
 *
 * After resolving overlay controller refs, the OverlayController objects in
 * refBindings must be removed so they don't corrupt lambda strings during
 * ref resolution (OverlayController.toString() → '[object Object]' would
 * replace 'overlay' in signal names).
 */
export function cleanOverlayControllerRefs(
  refBindings: Record<string, unknown>,
): void {
  for (const key of Object.keys(refBindings)) {
    const val = refBindings[key];
    if (val != null && typeof val === 'object' && '__templateKey' in (val as Record<string, unknown>)) {
      delete refBindings[key];
    }
  }
}
