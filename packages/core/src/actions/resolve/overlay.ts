// ────────────────────────────────────────────────────────────────────────────
// Shared overlay controller reference resolution
//
// When the script transformer encounters `ctrl.show()` / `ctrl.hide()`,
// it may emit IR actions with `controllerRef` instead of literal
// `templateKey`/`instanceIndex` (because the controller type doesn't carry
// literal values).  These helpers resolve them from `__refBindings` at
// serialization time.
//
// When a controller has `OVERLAY_LIFECYCLE_SCRIPT_ID` (set by useToast auto-hide),
// `overlay_show` is replaced with `script_execute` and `overlay_hide`
// is replaced with `[script_stop, overlay_hide]`.
// ────────────────────────────────────────────────────────────────────────────

import type { IRActionNode } from '../../ir/action-types';
import { irScriptExecute, irScriptStop, irOverlayHide } from '../../ir/action-types';
import {
  OVERLAY_TEMPLATE_KEY,
  OVERLAY_INSTANCE_INDEX,
  OVERLAY_Z_ORDER,
  OVERLAY_LIFECYCLE_SCRIPT_ID,
} from '../../hooks/useOverlay';
import { CLOSURE_INDEX } from '../closure/symbols';
import { walkActionTree } from './walk';

/** Shape of an OverlayController's hidden symbol-keyed internal fields. */
interface OverlayControllerInternal {
  [OVERLAY_TEMPLATE_KEY]?: string;
  [OVERLAY_INSTANCE_INDEX]?: number;
  [OVERLAY_Z_ORDER]?: number;
  [OVERLAY_LIFECYCLE_SCRIPT_ID]?: string;
  [CLOSURE_INDEX]?: number;
}

/**
 * Resolve deferred overlay controller references in a compiled action tree.
 *
 * Walks the action tree and replaces `controllerRef` placeholders with the
 * actual `templateKey`/`instanceIndex`/`zOrder` values from the bound
 * OverlayController objects in `refBindings`.
 *
 * When the controller carries `OVERLAY_LIFECYCLE_SCRIPT_ID` (toast auto-hide):
 * - `overlay_show` → `script_execute` (the lifecycle script handles show + delay + hide)
 * - `overlay_hide` → `[script_stop, overlay_hide]` (stop timer + immediate hide)
 */
export function resolveOverlayControllerRefs(
  actions: IRActionNode[],
  refBindings?: Record<string, unknown>,
): void {
  if (!refBindings) return;

  walkActionTree(actions, (actions, i) => {
    const action = actions[i];
    if (action.kind === 'action:overlay_show' && action.controllerRef) {
      const ctrl = refBindings[action.controllerRef] as OverlayControllerInternal | undefined;
      if (ctrl) {
        if (ctrl[OVERLAY_LIFECYCLE_SCRIPT_ID]) {
          actions[i] = irScriptExecute(ctrl[OVERLAY_LIFECYCLE_SCRIPT_ID], {
            closureIndex: ctrl[CLOSURE_INDEX],
          });
        } else {
          action.templateKey = ctrl[OVERLAY_TEMPLATE_KEY] ?? action.templateKey;
          action.instanceIndex = ctrl[OVERLAY_INSTANCE_INDEX] ?? action.instanceIndex;
          action.zOrder = ctrl[OVERLAY_Z_ORDER] ?? action.zOrder;
          delete action.controllerRef;
        }
      }
      return i + 1;
    } else if (action.kind === 'action:overlay_hide' && action.controllerRef) {
      const ctrl = refBindings[action.controllerRef] as OverlayControllerInternal | undefined;
      if (ctrl) {
        if (ctrl[OVERLAY_LIFECYCLE_SCRIPT_ID]) {
          const resolvedHide = irOverlayHide(
            ctrl[OVERLAY_TEMPLATE_KEY] ?? action.templateKey,
            ctrl[OVERLAY_Z_ORDER] ?? action.zOrder,
          );
          actions.splice(i, 1,
            irScriptStop(ctrl[OVERLAY_LIFECYCLE_SCRIPT_ID]),
            resolvedHide,
          );
          return i + 2; // skip both newly inserted actions
        } else {
          action.templateKey = ctrl[OVERLAY_TEMPLATE_KEY] ?? action.templateKey;
          action.zOrder = ctrl[OVERLAY_Z_ORDER] ?? action.zOrder;
          delete action.controllerRef;
        }
      }
      return i + 1;
    }
    return undefined;
  });
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
    if (val != null && typeof val === 'object' && OVERLAY_TEMPLATE_KEY in (val as object)) {
      delete refBindings[key];
    }
  }
}
