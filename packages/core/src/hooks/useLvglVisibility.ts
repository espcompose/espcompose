// ────────────────────────────────────────────────────────────────────────────
// useLvglVisibility — composable show/hide lifecycle for LVGL widgets & overlays
//
// Wraps an LVGL widget ref or overlay controller with a `show()`/`hide()`
// lifecycle. When `autoHide` is set, generates an ESPHome script
// (`mode: restart`) that sequences show → delay → hide. Re-triggering
// resets the timer.
//
// Designed as a composition primitive:
//   const ctrl = useOverlay({ zOrder: 100 }, factory);
//   return useLvglVisibility(ctrl, { autoHide: '3s' });
//
// Or with a plain LVGL widget ref:
//   const ref = useRef<LvglWidgetRef>();
//   const vis = useLvglVisibility(ref, { autoHide: '5s' });
//   // vis.show() / vis.hide() in trigger handlers
// ────────────────────────────────────────────────────────────────────────────

import { assertHookContext } from './useState';
import { isRef } from '../types';
import { throwCompileTimeOnly } from '../errors';
import { registerScript } from './useScript';
import {
  irOverlayShow,
  irOverlayHide,
  irDelayAction,
  irNativeAction,
} from '../ir/action-types';
import type { IRActionNode } from '../ir/action-types';
import type { OverlayController } from './useOverlay';
import type { LvglVisibilityController } from '../types';
import type { __marker_lv_obj_t } from '../generated/markers';
import type { Ref } from '../types';

// ── Types ───────────────────────────────────────────────────────────────────

/**
 * Options for `useLvglVisibility()`.
 */
export interface LvglVisibilityOptions {
  /**
   * Duration before the target auto-hides.
   *
   * - `string` — ESPHome duration literal (e.g. `'3s'`, `'500ms'`, `'1min'`)
   * - `number` — milliseconds (converted to `'{n}ms'`)
   * - `false` — disable auto-hide (manual `show()`/`hide()` only)
   *
   * @default false
   */
  autoHide?: string | number | false;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Normalize a duration value to an ESPHome duration string.
 */
function normalizeDuration(value: string | number): string {
  if (typeof value === 'number') {
    return `${value}ms`;
  }
  return value;
}

// ── Internal field shapes ───────────────────────────────────────────────────

/** Hidden fields on OverlayController, read at runtime during the render pass. */
interface OverlayControllerInternal {
  __templateKey: string;
  __instanceIndex: number;
  __zOrder: number;
  __lifecycleScriptId?: string;
}

// ── Hook ────────────────────────────────────────────────────────────────────

/**
 * Attach a show/hide lifecycle to an LVGL widget ref.
 *
 * @param target  An LVGL widget ref created by `useRef<LvglWidgetRef>()`.
 * @param opts    Visibility options. `autoHide` defaults to `false`.
 * @returns       An `LvglVisibilityController` with `.show()` / `.hide()`.
 */
export function useLvglVisibility(
  target: Ref<__marker_lv_obj_t>,
  opts?: LvglVisibilityOptions,
): LvglVisibilityController;

/**
 * Attach a show/hide lifecycle to an overlay controller.
 *
 * @param target  An `OverlayController` from `useOverlay()`.
 * @param opts    Visibility options. `autoHide` defaults to `false`.
 * @returns       An `LvglVisibilityController` with `.show()` / `.hide()`.
 */
export function useLvglVisibility(
  target: OverlayController,
  opts?: LvglVisibilityOptions,
): LvglVisibilityController;

/** Implementation. */
export function useLvglVisibility(
  target: Ref<__marker_lv_obj_t> | OverlayController,
  opts?: LvglVisibilityOptions,
): LvglVisibilityController {
  assertHookContext('useLvglVisibility()');

  const autoHide = opts?.autoHide ?? false;

  if (isRef(target)) {
    return buildRefVisibility(target as Ref<__marker_lv_obj_t>, autoHide);
  }

  return buildOverlayVisibility(target as OverlayController, autoHide);
}

// ── Overlay path ────────────────────────────────────────────────────────────

function buildOverlayVisibility(
  ctrl: OverlayController,
  autoHide: string | number | false,
): LvglVisibilityController {
  const internal = ctrl as unknown as OverlayControllerInternal;
  const { __templateKey, __instanceIndex, __zOrder } = internal;

  if (autoHide === false) {
    // No lifecycle script — pass through overlay identity only.
    return createLvglVisibilityController({
      visibilityTarget: 'overlay',
      templateKey: __templateKey,
      instanceIndex: __instanceIndex,
      zOrder: __zOrder,
    });
  }

  const duration = normalizeDuration(autoHide);
  const scriptId = `lvgl_vis_${__templateKey}_${__instanceIndex}`;

  // Build lifecycle: show → delay → hide
  const actions: IRActionNode[] = [
    irOverlayShow(__templateKey, __instanceIndex, __zOrder),
    irDelayAction(duration),
    irOverlayHide(__templateKey, __zOrder),
  ];

  registerScript({ id: scriptId, mode: 'restart', then: actions });

  // Stamp the lifecycle script on the *input* overlay controller so that
  // factory-internal `ctrl.hide()` correctly stops the timer via the
  // existing overlay-resolve.ts path.
  internal.__lifecycleScriptId = scriptId;

  return createLvglVisibilityController({
    visibilityTarget: 'overlay',
    lifecycleScriptId: scriptId,
    templateKey: __templateKey,
    instanceIndex: __instanceIndex,
    zOrder: __zOrder,
  });
}

// ── Widget ref path ─────────────────────────────────────────────────────────

function buildRefVisibility(
  ref: Ref<__marker_lv_obj_t>,
  autoHide: string | number | false,
): LvglVisibilityController {
  const refToken = ref.toString();

  if (autoHide === false) {
    return createLvglVisibilityController({
      visibilityTarget: 'ref',
      targetRef: refToken,
    });
  }

  const duration = normalizeDuration(autoHide);
  const scriptId = `lvgl_vis_ref_${refToken}`;

  // Build lifecycle: unhide → delay → hide
  const actions: IRActionNode[] = [
    irNativeAction('lvgl.widget.update', { id: refToken, hidden: false }),
    irDelayAction(duration),
    irNativeAction('lvgl.widget.update', { id: refToken, hidden: true }),
  ];

  registerScript({ id: scriptId, mode: 'restart', then: actions });

  return createLvglVisibilityController({
    visibilityTarget: 'ref',
    lifecycleScriptId: scriptId,
    targetRef: refToken,
  });
}

// ── Controller factory ──────────────────────────────────────────────────────

interface ControllerInternalFields {
  visibilityTarget: 'overlay' | 'ref';
  lifecycleScriptId?: string;
  templateKey?: string;
  instanceIndex?: number;
  zOrder?: number;
  targetRef?: string;
}

function createLvglVisibilityController(
  fields: ControllerInternalFields,
): LvglVisibilityController {
  return {
    show(): void {
      throwCompileTimeOnly('visibility.show()', 'Visibility actions');
    },
    hide(): void {
      throwCompileTimeOnly('visibility.hide()', 'Visibility actions');
    },
    // Internal fields for deferred ref-binding resolution at serialization time.
    __visibilityTarget: fields.visibilityTarget,
    __lifecycleScriptId: fields.lifecycleScriptId,
    __templateKey: fields.templateKey,
    __instanceIndex: fields.instanceIndex,
    __zOrder: fields.zOrder,
    __targetRef: fields.targetRef,
  } as LvglVisibilityController;
}
