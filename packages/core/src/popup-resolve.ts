// ────────────────────────────────────────────────────────────────────────────
// Shared popup controller reference resolution
//
// When the script transformer encounters `popup.show()` / `ctrl.dismiss()`,
// it may emit IR actions with `controllerRef` instead of literal
// `templateKey`/`instanceIndex` (because the controller type doesn't carry
// literal values).  These helpers resolve them from `__refBindings` at
// serialization time.
// ────────────────────────────────────────────────────────────────────────────

import type { IRActionNode } from './ir/action-types';

/**
 * Resolve deferred popup controller references in a compiled action tree.
 *
 * Walks the action tree and replaces `controllerRef` placeholders with the
 * actual `templateKey`/`instanceIndex` values from the bound PopupController
 * objects in `refBindings`.
 */
export function resolvePopupControllerRefs(
  actions: IRActionNode[],
  refBindings?: Record<string, unknown>,
): void {
  if (!refBindings) return;
  for (const action of actions) {
    if (action.kind === 'popup_show' && action.controllerRef) {
      const ctrl = refBindings[action.controllerRef] as
        { __templateKey?: string; __instanceIndex?: number } | undefined;
      if (ctrl) {
        action.templateKey = ctrl.__templateKey ?? action.templateKey;
        action.instanceIndex = ctrl.__instanceIndex ?? action.instanceIndex;
        delete action.controllerRef;
      }
    } else if (action.kind === 'popup_dismiss' && action.controllerRef) {
      const ctrl = refBindings[action.controllerRef] as
        { __templateKey?: string } | undefined;
      if (ctrl) {
        action.templateKey = ctrl.__templateKey ?? action.templateKey;
        delete action.controllerRef;
      }
    } else if (action.kind === 'if') {
      resolvePopupControllerRefs(action.then, refBindings);
      if (action.else) resolvePopupControllerRefs(action.else, refBindings);
    } else if (action.kind === 'while' || action.kind === 'repeat') {
      resolvePopupControllerRefs(action.then, refBindings);
    }
  }
}

/**
 * Remove resolved popup controller objects from refBindings.
 *
 * After resolving popup controller refs, the PopupController objects in
 * refBindings must be removed so they don't corrupt lambda strings during
 * ref resolution (PopupController.toString() → '[object Object]' would
 * replace 'popup' in signal names).
 */
export function cleanPopupControllerRefs(
  refBindings: Record<string, unknown>,
): void {
  for (const key of Object.keys(refBindings)) {
    const val = refBindings[key];
    if (val != null && typeof val === 'object' && '__templateKey' in (val as Record<string, unknown>)) {
      delete refBindings[key];
    }
  }
}
