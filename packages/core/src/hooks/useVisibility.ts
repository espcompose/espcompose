// ────────────────────────────────────────────────────────────────────────────
// useVisibility — composable show/hide lifecycle for LVGL widgets & overlays
//
// Wraps an LVGL widget ref or overlay controller with a `show()`/`hide()`
// lifecycle backed by ESPHome scripts via `useController`.
//
// When `autoHide` is set, the `show` script sequences show → delay → hide
// with `mode: restart` so re-triggering resets the timer.
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
// — a circular dependency. We therefore use `makeSyntheticScript` to inject
// pre-built IR metadata that mirrors what the script transformer would
// produce for natural `useScript` arrow bodies.
//
// External library hooks (e.g. @espcompose/ui) are compiled via source-mode
// and DO NOT need this — the script transformer processes them alongside app
// code, enabling natural `useScript(async () => { ... })` with full
// scalar-capture support.
// ────────────────────────────────────────────────────────────────────────────

import { assertHookContext } from './useState';
import { isRef } from '../types';
import { useScript } from './useScript';
import type { ScriptHandle } from './useScript';
import { useController } from './useController';
import { generateDeterministicId } from '../id';
import {
  irOverlayShow,
  irOverlayHide,
  irDelayAction,
  irNativeAction,
  irScriptStop,
} from '../ir/action-types';
import type { IRActionNode, IRDurationLiteral } from '../ir/action-types';
import { normalizeDuration } from './global-shared';
import type { OverlayController } from './useOverlay';
import {
  OVERLAY_TEMPLATE_KEY,
  OVERLAY_INSTANCE_INDEX,
  OVERLAY_Z_ORDER,
} from './useOverlay';
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

/** Symbol-keyed fields on OverlayController, read during the render pass. */
interface OverlayControllerInternal {
  [OVERLAY_TEMPLATE_KEY]: string;
  [OVERLAY_INSTANCE_INDEX]: number;
  [OVERLAY_Z_ORDER]: number;
}

// ── Synthetic script builder ────────────────────────────────────────────────

/**
 * Build a function with pre-injected `__compiledScript` metadata.
 *
 * Required because `@espcompose/core` is built with tsup, not the ESPCompose
 * CLI compiler (circular dependency: CLI depends on core). The script
 * transformer therefore never processes `useScript` bodies in this package.
 *
 * The injected shape mirrors `CompiledScriptMeta` from `useScript.ts`.
 * Synthetic scripts only populate the required subset (`id`, `then`); the
 * optional fields (`bodyHash`, `userParams`, `scalarCaptures`) are omitted
 * because synthetic scripts have no AST body to hash, no user-defined
 * parameters, and no scalar closures.
 */
function makeSyntheticScript(
  id: string,
  actions: IRActionNode[],
  refBindings?: Record<string, unknown>,
) {
  return Object.assign(
    () => Promise.resolve(),
    {
      __compiledScript: { id, then: actions },
      ...(refBindings ? { __refBindings: refBindings } : {}),
    },
  );
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
export function useVisibility(
  target: OverlayController,
  opts?: VisibilityOptions,
): VisibilityController;

/** Implementation. */
export function useVisibility(
  target: Ref<__marker_lv_obj_t> | OverlayController,
  opts?: VisibilityOptions,
): VisibilityController {
  assertHookContext('useVisibility()');

  const autoHide = opts?.autoHide ?? false;

  if (isRef(target)) {
    return buildRefVisibility(target as Ref<__marker_lv_obj_t>, autoHide);
  }

  return buildOverlayVisibility(
    target as OverlayController,
    autoHide,
    opts?.scriptMode,
    opts?.maxRuns,
  );
}

// ── Overlay path ────────────────────────────────────────────────────────────

/**
 * Script pair returned by `buildOverlayScriptPair()`.
 *
 * Exposes raw ScriptHandle references so callers (e.g. the multi-slot
 * coordinator in useTransientOverlay) can compose them into a higher-level
 * controller or reference their IDs in a coordinator script.
 */
export interface OverlayScriptPair {
  show: ScriptHandle;
  hide: ScriptHandle;
}

/**
 * Build the show/hide script pair for an overlay without wrapping in a
 * controller. This is the low-level building block used by both
 * `useVisibility()` (single-slot) and the multi-slot coordinator in
 * `useTransientOverlay()`.
 *
 * - When `autoHide` is false: show = overlay_show, hide = overlay_hide.
 * - When `autoHide` is set: show = overlay_show → delay → overlay_hide
 *   (mode: restart), hide = script_stop(show) → overlay_hide.
 *
 * The show script is always mode: restart (slot-level timer reset). Higher-level
 * overflow policy is handled by the coordinator, not here.
 */
export function buildOverlayScriptPair(
  ctrl: OverlayController,
  autoHide: string | number | false,
): OverlayScriptPair {
  const internal = ctrl as unknown as OverlayControllerInternal;
  const templateKey = internal[OVERLAY_TEMPLATE_KEY];
  const instanceIndex = internal[OVERLAY_INSTANCE_INDEX];
  const zOrder = internal[OVERLAY_Z_ORDER];
  const ctrlBindingKey = '__ctrl';

  if (autoHide === false) {
    const showScript = useScript(
      makeSyntheticScript(
        generateDeterministicId('scr', `lvgl_vis_show_${templateKey}`),
        [irOverlayShow(templateKey, instanceIndex, zOrder, ctrlBindingKey)],
        { [ctrlBindingKey]: ctrl },
      ),
    );
    const hideScript = useScript(
      makeSyntheticScript(
        generateDeterministicId('scr', `lvgl_vis_hide_${templateKey}`),
        [irOverlayHide(templateKey, zOrder, ctrlBindingKey)],
        { [ctrlBindingKey]: ctrl },
      ),
    );
    return { show: showScript, hide: hideScript };
  }

  const duration = normalizeDuration(autoHide);

  const showScript = useScript(
    makeSyntheticScript(
      generateDeterministicId('scr', `lvgl_vis_${templateKey}`),
      [
        irOverlayShow(templateKey, instanceIndex, zOrder, ctrlBindingKey),
        irDelayAction(duration),
        irOverlayHide(templateKey, zOrder, ctrlBindingKey),
      ],
      { [ctrlBindingKey]: ctrl },
    ),
    { mode: 'restart' },
  );

  const hideScript = useScript(
    makeSyntheticScript(
      generateDeterministicId('scr', `lvgl_vis_hide_${templateKey}`),
      [
        irScriptStop(showScript.id),
        irOverlayHide(templateKey, zOrder, ctrlBindingKey),
      ],
      { [ctrlBindingKey]: ctrl },
    ),
  );

  return { show: showScript, hide: hideScript };
}

function buildOverlayVisibility(
  ctrl: OverlayController,
  autoHide: string | number | false,
  scriptMode?: 'restart' | 'queued' | 'single',
  maxRuns?: number,
): VisibilityController {
  // Single-slot path delegates to the old script mode / maxRuns behavior.
  // Multi-slot never goes through here — it calls buildOverlayScriptPair directly.
  if (scriptMode && scriptMode !== 'restart') {
    return buildOverlayVisibilityWithMode(ctrl, autoHide, scriptMode, maxRuns);
  }

  const pair = buildOverlayScriptPair(ctrl, autoHide);
  return useController<VisibilityController>({ show: pair.show, hide: pair.hide });
}

/**
 * Single-slot variant with custom script mode (queued/single).
 * Used by useTransientOverlay's single-slot path for overflow: queue/drop.
 */
function buildOverlayVisibilityWithMode(
  ctrl: OverlayController,
  autoHide: string | number | false,
  scriptMode: 'queued' | 'single',
  maxRuns?: number,
): VisibilityController {
  const internal = ctrl as unknown as OverlayControllerInternal;
  const templateKey = internal[OVERLAY_TEMPLATE_KEY];
  const instanceIndex = internal[OVERLAY_INSTANCE_INDEX];
  const zOrder = internal[OVERLAY_Z_ORDER];
  const ctrlBindingKey = '__ctrl';

  if (autoHide === false) {
    // No timer — mode doesn't matter, just show/hide.
    const showScript = useScript(
      makeSyntheticScript(
        generateDeterministicId('scr', `lvgl_vis_show_${templateKey}`),
        [irOverlayShow(templateKey, instanceIndex, zOrder, ctrlBindingKey)],
        { [ctrlBindingKey]: ctrl },
      ),
    );
    const hideScript = useScript(
      makeSyntheticScript(
        generateDeterministicId('scr', `lvgl_vis_hide_${templateKey}`),
        [irOverlayHide(templateKey, zOrder, ctrlBindingKey)],
        { [ctrlBindingKey]: ctrl },
      ),
    );
    return useController<VisibilityController>({ show: showScript, hide: hideScript });
  }

  const duration = normalizeDuration(autoHide);

  const showScriptOpts: { mode: 'restart' | 'queued' | 'single'; maxRuns?: number } = {
    mode: scriptMode,
  };
  if (scriptMode === 'queued' && maxRuns != null && maxRuns > 0) {
    showScriptOpts.maxRuns = maxRuns;
  }

  const showScript = useScript(
    makeSyntheticScript(
      generateDeterministicId('scr', `lvgl_vis_${templateKey}`),
      [
        irOverlayShow(templateKey, instanceIndex, zOrder, ctrlBindingKey),
        irDelayAction(duration),
        irOverlayHide(templateKey, zOrder, ctrlBindingKey),
      ],
      { [ctrlBindingKey]: ctrl },
    ),
    showScriptOpts,
  );

  const hideScript = useScript(
    makeSyntheticScript(
      generateDeterministicId('scr', `lvgl_vis_hide_${templateKey}`),
      [
        irScriptStop(showScript.id),
        irOverlayHide(templateKey, zOrder, ctrlBindingKey),
      ],
      { [ctrlBindingKey]: ctrl },
    ),
  );

  return useController<VisibilityController>({ show: showScript, hide: hideScript });
}

// ── Widget ref path ─────────────────────────────────────────────────────────

function buildRefVisibility(
  ref: Ref<__marker_lv_obj_t>,
  autoHide: string | number | false,
): VisibilityController {
  const refBindingKey = 'widget';

  if (autoHide === false) {
    const showScript = useScript(
      makeSyntheticScript(
        generateDeterministicId('scr', 'lvgl_vis_ref_show'),
        [irNativeAction('lvgl', 'widget.update', { id: refBindingKey, hidden: false }, [
          { kind: 'object', key: 'id', bindingName: refBindingKey },
        ])],
        { [refBindingKey]: ref },
      ),
    );
    const hideScript = useScript(
      makeSyntheticScript(
        generateDeterministicId('scr', 'lvgl_vis_ref_hide'),
        [irNativeAction('lvgl', 'widget.update', { id: refBindingKey, hidden: true }, [
          { kind: 'object', key: 'id', bindingName: refBindingKey },
        ])],
        { [refBindingKey]: ref },
      ),
    );
    return useController<VisibilityController>({ show: showScript, hide: hideScript });
  }

  const duration = normalizeDuration(autoHide);
  const safeDuration = durationSlug(duration);

  // Show script: unhide → delay → hide (mode: restart).
  const showScript = useScript(
    makeSyntheticScript(
      generateDeterministicId('scr', `lvgl_vis_ref_${safeDuration}`),
      [
        irNativeAction('lvgl', 'widget.update', { id: refBindingKey, hidden: false }, [
          { kind: 'object', key: 'id', bindingName: refBindingKey },
        ]),
        irDelayAction(duration),
        irNativeAction('lvgl', 'widget.update', { id: refBindingKey, hidden: true }, [
          { kind: 'object', key: 'id', bindingName: refBindingKey },
        ]),
      ],
      { [refBindingKey]: ref },
    ),
    { mode: 'restart' },
  );

  // Hide script: stop show timer + immediately hide.
  const hideScript = useScript(
    makeSyntheticScript(
      generateDeterministicId('scr', `lvgl_vis_ref_hide_${safeDuration}`),
      [
        irScriptStop(showScript.id),
        irNativeAction('lvgl', 'widget.update', { id: refBindingKey, hidden: true }, [
          { kind: 'object', key: 'id', bindingName: refBindingKey },
        ]),
      ],
      { [refBindingKey]: ref },
    ),
  );

  return useController<VisibilityController>({ show: showScript, hide: hideScript });
}
