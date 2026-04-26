// ────────────────────────────────────────────────────────────────────────────
// LVGL Visibility controller reference resolution
//
// When the script transformer encounters `vis.show()` / `vis.hide()`,
// it emits IR actions with `controllerRef` placeholders. These helpers
// resolve them from `__refBindings` at serialization time.
//
// When a controller has `__lifecycleScriptId` (set by useLvglVisibility
// with autoHide), `lvgl_visibility_show` is replaced with `script_execute`
// and `lvgl_visibility_hide` is replaced with `[script_stop, <actual-hide>]`.
// ────────────────────────────────────────────────────────────────────────────

import type { IRActionNode } from './ir/action-types';
import {
  irScriptExecute,
  irScriptStop,
  irOverlayShow,
  irOverlayHide,
  irNativeAction,
} from './ir/action-types';

/** Shape of an LvglVisibilityController's hidden internal fields. */
interface LvglVisibilityControllerInternal {
  __visibilityTarget?: 'overlay' | 'ref';
  __lifecycleScriptId?: string;
  __templateKey?: string;
  __instanceIndex?: number;
  __zOrder?: number;
  __targetRef?: string;
}

/**
 * Resolve deferred LVGL visibility controller references in a compiled action tree.
 *
 * Walks the action tree and replaces `lvgl_visibility_show`/`lvgl_visibility_hide`
 * placeholders with the actual resolved actions based on the bound controller's
 * internal fields.
 */
export function resolveLvglVisibilityControllerRefs(
  actions: IRActionNode[],
  refBindings?: Record<string, unknown>,
): void {
  if (!refBindings) return;

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    if (action.kind === 'lvgl_visibility_show') {
      const ctrl = refBindings[action.controllerRef] as LvglVisibilityControllerInternal | undefined;
      if (ctrl) {
        if (ctrl.__lifecycleScriptId) {
          // Replace with script_execute — the lifecycle script handles show → delay → hide.
          actions[i] = irScriptExecute(ctrl.__lifecycleScriptId);
        } else if (ctrl.__visibilityTarget === 'overlay') {
          // Direct overlay show.
          actions[i] = irOverlayShow(
            ctrl.__templateKey ?? '',
            ctrl.__instanceIndex ?? 0,
            ctrl.__zOrder ?? 0,
          );
        } else if (ctrl.__visibilityTarget === 'ref') {
          // Direct widget unhide.
          actions[i] = irNativeAction('lvgl.widget.update', {
            id: ctrl.__targetRef ?? '',
            hidden: false,
          });
        }
      }
    } else if (action.kind === 'lvgl_visibility_hide') {
      const ctrl = refBindings[action.controllerRef] as LvglVisibilityControllerInternal | undefined;
      if (ctrl) {
        if (ctrl.__lifecycleScriptId) {
          // Replace with [script_stop, <actual-hide>]:
          // stop any running auto-hide timer, then immediately hide.
          const actualHide = resolveHideAction(ctrl);
          actions.splice(i, 1,
            irScriptStop(ctrl.__lifecycleScriptId),
            actualHide,
          );
          i++; // skip the newly inserted hide action
        } else if (ctrl.__visibilityTarget === 'overlay') {
          actions[i] = irOverlayHide(
            ctrl.__templateKey ?? '',
            ctrl.__zOrder ?? 0,
          );
        } else if (ctrl.__visibilityTarget === 'ref') {
          actions[i] = irNativeAction('lvgl.widget.update', {
            id: ctrl.__targetRef ?? '',
            hidden: true,
          });
        }
      }
    } else if (action.kind === 'if') {
      resolveLvglVisibilityControllerRefs(action.then, refBindings);
      if (action.else) resolveLvglVisibilityControllerRefs(action.else, refBindings);
    } else if (action.kind === 'while' || action.kind === 'repeat') {
      resolveLvglVisibilityControllerRefs(action.then, refBindings);
    }
  }
}

/** Build the concrete hide action based on the controller's target type. */
function resolveHideAction(ctrl: LvglVisibilityControllerInternal): IRActionNode {
  if (ctrl.__visibilityTarget === 'overlay') {
    return irOverlayHide(
      ctrl.__templateKey ?? '',
      ctrl.__zOrder ?? 0,
    );
  }
  return irNativeAction('lvgl.widget.update', {
    id: ctrl.__targetRef ?? '',
    hidden: true,
  });
}

/**
 * Remove resolved LVGL visibility controller objects from refBindings.
 *
 * After resolving visibility controller refs, the controller objects in
 * refBindings must be removed so they don't corrupt lambda strings during
 * ref resolution (toString() → '[object Object]' would replace identifiers).
 */
export function cleanLvglVisibilityControllerRefs(
  refBindings: Record<string, unknown>,
): void {
  for (const key of Object.keys(refBindings)) {
    const val = refBindings[key];
    if (val != null && typeof val === 'object' && '__visibilityTarget' in (val as Record<string, unknown>)) {
      delete refBindings[key];
    }
  }
}
