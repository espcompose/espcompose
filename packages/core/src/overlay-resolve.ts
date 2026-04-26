// ────────────────────────────────────────────────────────────────────────────
// Shared overlay controller reference resolution
//
// When the script transformer encounters `ctrl.show()` / `ctrl.hide()`,
// it may emit IR actions with `controllerRef` instead of literal
// `templateKey`/`instanceIndex` (because the controller type doesn't carry
// literal values).  These helpers resolve them from `__refBindings` at
// serialization time.
//
// When a controller has `__lifecycleScriptId` (set by useToast auto-hide),
// `overlay_show` is replaced with `script_execute` and `overlay_hide`
// is replaced with `[script_stop, overlay_hide]`.
// ────────────────────────────────────────────────────────────────────────────

import type { IRActionNode } from './ir/action-types';
import { irScriptExecute, irScriptStop, irOverlayHide } from './ir/action-types';

/** Shape of an OverlayController's hidden internal fields. */
interface OverlayControllerInternal {
  __templateKey?: string;
  __instanceIndex?: number;
  __zOrder?: number;
  __lifecycleScriptId?: string;
}

/**
 * Resolve deferred overlay controller references in a compiled action tree.
 *
 * Walks the action tree and replaces `controllerRef` placeholders with the
 * actual `templateKey`/`instanceIndex`/`zOrder` values from the bound
 * OverlayController objects in `refBindings`.
 *
 * When the controller carries `__lifecycleScriptId` (toast auto-hide):
 * - `overlay_show` → `script_execute` (the lifecycle script handles show + delay + hide)
 * - `overlay_hide` → `[script_stop, overlay_hide]` (stop timer + immediate hide)
 */
export function resolveOverlayControllerRefs(
  actions: IRActionNode[],
  refBindings?: Record<string, unknown>,
): void {
  if (!refBindings) return;
  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    if (action.kind === 'overlay_show' && action.controllerRef) {
      const ctrl = refBindings[action.controllerRef] as OverlayControllerInternal | undefined;
      if (ctrl) {
        if (ctrl.__lifecycleScriptId) {
          // Replace overlay_show with script_execute — the lifecycle script
          // handles show → delay → hide.
          actions[i] = irScriptExecute(ctrl.__lifecycleScriptId);
        } else {
          action.templateKey = ctrl.__templateKey ?? action.templateKey;
          action.instanceIndex = ctrl.__instanceIndex ?? action.instanceIndex;
          action.zOrder = ctrl.__zOrder ?? action.zOrder;
          delete action.controllerRef;
        }
      }
    } else if (action.kind === 'overlay_hide' && action.controllerRef) {
      const ctrl = refBindings[action.controllerRef] as OverlayControllerInternal | undefined;
      if (ctrl) {
        if (ctrl.__lifecycleScriptId) {
          // Replace overlay_hide with [script_stop, overlay_hide]:
          // stop any running auto-hide timer, then immediately hide.
          const resolvedHide = irOverlayHide(
            ctrl.__templateKey ?? action.templateKey,
            ctrl.__zOrder ?? action.zOrder,
          );
          actions.splice(i, 1,
            irScriptStop(ctrl.__lifecycleScriptId),
            resolvedHide,
          );
          i++; // skip the newly inserted overlay_hide
        } else {
          action.templateKey = ctrl.__templateKey ?? action.templateKey;
          action.zOrder = ctrl.__zOrder ?? action.zOrder;
          delete action.controllerRef;
        }
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
