// ────────────────────────────────────────────────────────────────────────────
// useVisibility — composable show/hide lifecycle for LVGL widgets & overlays
//
// Wraps an LVGL widget ref or overlay controller with a `show()`/`hide()`
// lifecycle backed by ESPHome scripts via `useController`.
//
// When `autoHide` is set, the `show` script sequences show → delay → hide.
// `scriptMode` controls what happens when show is triggered while the
// lifecycle is already running.
//
// Designed as a composition primitive:
//   const ctrl = useOverlay({ zOrder: 100 }, factory);
//   return useVisibility(ctrl, { autoHide: '3s' });
//
// Or with a plain LVGL widget ref:
//   const ref = useRef<LvglWidgetRef>();
//   const vis = useVisibility(ref, { autoHide: '5s' });
//   // vis.show() / vis.hide() in trigger handlers
//
// NOTE: This hook lives in @espcompose/core, which is built with tsup (not
// transformed by the ESPCompose CLI's script transformer). Because the CLI
// depends on core, core sources cannot be fed through the compiler pipeline
// — a circular dependency. We therefore use `defineSyntheticScript` to register
// pre-built IR action bodies that mirror what the script transformer would
// produce for natural `useScript` arrow bodies.
//
// External library hooks (e.g. @espcompose/ui) are compiled via source-mode
// and DO NOT need this — the script transformer processes them alongside app
// code, enabling natural `useScript(async () => { ... })` with full
// scalar-capture support.
// ────────────────────────────────────────────────────────────────────────────

import { assertHookContext } from './useState';
import { isRef } from '../types';
import { defineSyntheticScript } from './useScript';
import { useController } from './useController';
import { generateDeterministicId } from '../id';
import {
  irDelayAction,
  irNativeAction,
  irScriptStop,
} from '../ir/action-types';
import type { IRDurationLiteral } from '../ir/action-types';
import { normalizeDuration } from './global-shared';
import type { OverlayController } from './useOverlay';
import {
  buildOverlayPayloadPlan,
  buildOverlayLifecycleScripts,
  readOverlayControllerInternal,
  scriptOptionsForMode,
} from './overlay-lifecycle';
export type { OverlayScriptPair } from './overlay-lifecycle';
import type { VisibilityController } from '../types';
import type { __marker_lv_obj_t } from '../generated/markers';
import type { Ref } from '../types';

// ── Types ───────────────────────────────────────────────────────────────────

/**
 * Options for `useVisibility()`.
 */
export interface VisibilityOptions {
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

  /**
   * Script execution mode for the show lifecycle script.
   *
   * - `'restart'` — re-triggering resets the auto-hide timer (default when autoHide is set)
   * - `'queued'`  — each show() call queues a full show→delay→hide cycle
   * - `'single'`  — ignored while already running (drop behavior)
   *
   * Only meaningful when `autoHide` is set. Without autoHide, show/hide are
   * independent scripts with no mode interaction.
   *
   * @default 'restart'
   */
  scriptMode?: 'restart' | 'queued' | 'single';

  /**
   * Maximum queued runs. Only meaningful when `scriptMode` is `'queued'`.
   * Maps to ESPHome's `max_runs` on the show lifecycle script.
   *
   * @default undefined (unlimited)
   */
  maxRuns?: number;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function durationSlug(d: IRDurationLiteral): string {
  return `${d.value}${d.unit}`;
}

// ── Hook ────────────────────────────────────────────────────────────────────

/**
 * Attach a show/hide lifecycle to an LVGL widget ref.
 */
export function useVisibility(
  target: Ref<__marker_lv_obj_t>,
  opts?: VisibilityOptions,
): VisibilityController;

/**
 * Attach a show/hide lifecycle to an overlay controller.
 */
export function useVisibility<P = void>(
  target: OverlayController<P>,
  opts?: VisibilityOptions,
): VisibilityController<P>;

/** Implementation. */
export function useVisibility(
  target: Ref<__marker_lv_obj_t> | OverlayController<unknown>,
  opts?: VisibilityOptions,
): VisibilityController {
  assertHookContext('useVisibility()');

  const autoHide = opts?.autoHide ?? false;

  if (isRef(target)) {
    return buildRefVisibility(target as Ref<__marker_lv_obj_t>, autoHide);
  }

  return buildOverlayVisibility(
    target as OverlayController<unknown>,
    autoHide,
    opts?.scriptMode,
    opts?.maxRuns,
  );
}

// ── Overlay path ────────────────────────────────────────────────────────────

/**
 * Build the show/hide script pair for an overlay without wrapping in a
 * controller. This is the low-level building block used by `useVisibility()`
 * and other lifecycle orchestration hooks.
 *
 * - When `autoHide` is false: show = overlay_show, hide = overlay_hide.
 * - When `autoHide` is set: show = overlay_show → delay → overlay_hide
 *   (mode: restart), hide = script_stop(show) → overlay_hide.
 *
 * The show script uses restart mode by default. Callers with more specialized
 * orchestration can use the shared lifecycle helper directly.
 */
export function buildOverlayScriptPair(
  ctrl: OverlayController<unknown>,
  autoHide: string | number | false,
): ReturnType<typeof buildOverlayLifecycleScripts> {
  return buildOverlayScriptPairWithMode(ctrl, autoHide, 'restart');
}

function buildOverlayVisibility(
  ctrl: OverlayController<unknown>,
  autoHide: string | number | false,
  scriptMode?: 'restart' | 'queued' | 'single',
  maxRuns?: number,
): VisibilityController {
  const pair = buildOverlayScriptPairWithMode(
    ctrl,
    autoHide,
    scriptMode ?? 'restart',
    maxRuns,
  );
  return useController<VisibilityController>({ show: pair.show, hide: pair.hide });
}

function buildOverlayScriptPairWithMode(
  ctrl: OverlayController<unknown>,
  autoHide: string | number | false,
  scriptMode: 'restart' | 'queued' | 'single',
  maxRuns?: number,
): ReturnType<typeof buildOverlayLifecycleScripts> {
  const internal = readOverlayControllerInternal(ctrl);
  const params = buildOverlayPayloadPlan(internal.payloadDecls);

  return buildOverlayLifecycleScripts(ctrl, {
    autoHide,
    showIdSeed: autoHide === false
      ? `lvgl_vis_show_${internal.templateKey}`
      : `lvgl_vis_${internal.templateKey}`,
    hideIdSeed: `lvgl_vis_hide_${internal.templateKey}`,
    userParams: params.userParams,
    showPrefixActions: params.globalSetActions,
    showScriptOptions: autoHide === false
      ? undefined
      : scriptOptionsForMode(scriptMode, maxRuns),
    hidePrefixActions: autoHide === false
      ? undefined
      : (showScript) => [irScriptStop(showScript.id)],
  });
}

// ── Widget ref path ─────────────────────────────────────────────────────────

function buildRefVisibility(
  ref: Ref<__marker_lv_obj_t>,
  autoHide: string | number | false,
): VisibilityController {
  const refBindingKey = 'widget';

  if (autoHide === false) {
    const showScript = defineSyntheticScript({
      id: generateDeterministicId('scr', 'lvgl_vis_ref_show'),
      actions: [irNativeAction('lvgl', 'widget.update', { id: refBindingKey, hidden: false }, [
        { kind: 'object', key: 'id', bindingName: refBindingKey },
      ])],
      refBindings: { [refBindingKey]: ref },
    });
    const hideScript = defineSyntheticScript({
      id: generateDeterministicId('scr', 'lvgl_vis_ref_hide'),
      actions: [irNativeAction('lvgl', 'widget.update', { id: refBindingKey, hidden: true }, [
        { kind: 'object', key: 'id', bindingName: refBindingKey },
      ])],
      refBindings: { [refBindingKey]: ref },
    });
    return useController<VisibilityController>({ show: showScript, hide: hideScript });
  }

  const duration = normalizeDuration(autoHide);
  const safeDuration = durationSlug(duration);

  // Show script: unhide → delay → hide (mode: restart).
  const showScript = defineSyntheticScript({
    id: generateDeterministicId('scr', `lvgl_vis_ref_${safeDuration}`),
    actions: [
      irNativeAction('lvgl', 'widget.update', { id: refBindingKey, hidden: false }, [
        { kind: 'object', key: 'id', bindingName: refBindingKey },
      ]),
      irDelayAction(duration),
      irNativeAction('lvgl', 'widget.update', { id: refBindingKey, hidden: true }, [
        { kind: 'object', key: 'id', bindingName: refBindingKey },
      ]),
    ],
    refBindings: { [refBindingKey]: ref },
    opts: { mode: 'restart' },
  });

  // Hide script: stop show timer + immediately hide.
  const hideScript = defineSyntheticScript({
    id: generateDeterministicId('scr', `lvgl_vis_ref_hide_${safeDuration}`),
    actions: [
      irScriptStop(showScript.id),
      irNativeAction('lvgl', 'widget.update', { id: refBindingKey, hidden: true }, [
        { kind: 'object', key: 'id', bindingName: refBindingKey },
      ]),
    ],
    refBindings: { [refBindingKey]: ref },
  });

  return useController<VisibilityController>({ show: showScript, hide: hideScript });
}
