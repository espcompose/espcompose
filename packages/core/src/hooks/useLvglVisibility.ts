// ────────────────────────────────────────────────────────────────────────────
// useLvglVisibility — composable show/hide lifecycle for LVGL widgets & overlays
//
// Wraps an LVGL widget ref or overlay controller with a `show()`/`hide()`
// lifecycle backed by ESPHome scripts via `useController`.
//
// When `autoHide` is set, the `show` script sequences show → delay → hide
// with `mode: restart` so re-triggering resets the timer.
//
// Designed as a composition primitive:
//   const ctrl = useOverlay({ zOrder: 100 }, factory);
//   return useLvglVisibility(ctrl, { autoHide: '3s' });
//
// Or with a plain LVGL widget ref:
//   const ref = useRef<LvglWidgetRef>();
//   const vis = useLvglVisibility(ref, { autoHide: '5s' });
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
import { useController } from './useController';
import { generateDeterministicId } from '../id';
import {
  irOverlayShow,
  irOverlayHide,
  irDelayAction,
  irNativeAction,
  irScriptStop,
  parseDurationString,
} from '../ir/action-types';
import type { IRActionNode, IRDurationLiteral } from '../ir/action-types';
import type { OverlayController } from './useOverlay';
import {
  OVERLAY_TEMPLATE_KEY,
  OVERLAY_INSTANCE_INDEX,
  OVERLAY_Z_ORDER,
} from './useOverlay';
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

function normalizeDuration(value: string | number): IRDurationLiteral {
  if (typeof value === 'number') {
    return { kind: 'duration', value, unit: 'ms' };
  }
  const parsed = parseDurationString(value);
  if (!parsed) {
    throw new Error(`[espcompose] Invalid autoHide duration '${value}'. Expected a number of milliseconds, or a duration literal with a unit suffix (ms, s, or min).`);
  }
  return parsed;
}

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
export function useLvglVisibility(
  target: Ref<__marker_lv_obj_t>,
  opts?: LvglVisibilityOptions,
): LvglVisibilityController;

/**
 * Attach a show/hide lifecycle to an overlay controller.
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
  const templateKey = internal[OVERLAY_TEMPLATE_KEY];
  const instanceIndex = internal[OVERLAY_INSTANCE_INDEX];
  const zOrder = internal[OVERLAY_Z_ORDER];
  const ctrlBindingKey = '__ctrl';

  if (autoHide === false) {
    // Simple show/hide — one script each, no timer.
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
    return useController<LvglVisibilityController>({ show: showScript, hide: hideScript });
  }

  const duration = normalizeDuration(autoHide);

  // Show script: show → delay → hide (mode: restart so re-trigger resets timer).
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

  // Hide script: stop the show timer + immediately hide.
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

  return useController<LvglVisibilityController>({ show: showScript, hide: hideScript });
}

// ── Widget ref path ─────────────────────────────────────────────────────────

function buildRefVisibility(
  ref: Ref<__marker_lv_obj_t>,
  autoHide: string | number | false,
): LvglVisibilityController {
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
    return useController<LvglVisibilityController>({ show: showScript, hide: hideScript });
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

  return useController<LvglVisibilityController>({ show: showScript, hide: hideScript });
}
