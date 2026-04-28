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
// `espcompose build --library`). The AST-level script transformer therefore
// never processes these useScript bodies, so we use `makeSyntheticScript` to
// inject pre-built IR metadata. Library hooks in packages built with
// `espcompose build --library` (e.g. @espcompose/ui) can use natural
// useScript arrow bodies with full scalar-capture support instead.
// ────────────────────────────────────────────────────────────────────────────

import { assertHookContext } from './useState';
import { isRef } from '../types';
import { useScript } from './useScript';
import { useController } from './useController';
import {
  irOverlayShow,
  irOverlayHide,
  irDelayAction,
  irNativeAction,
  irScriptStop,
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

function normalizeDuration(value: string | number): string {
  if (typeof value === 'number') {
    return `${value}ms`;
  }
  return value;
}

/** Hidden fields on OverlayController, read during the render pass. */
interface OverlayControllerInternal {
  __templateKey: string;
  __instanceIndex: number;
  __zOrder: number;
}

// ── Synthetic script builder ────────────────────────────────────────────────

/**
 * Build an arrow function with pre-injected `__compiledScript` metadata.
 *
 * Required because this module lives in `@espcompose/core` which is bundled
 * by tsup — not processed by the script transformer. The metadata format
 * matches what the transformer would inject for natural useScript bodies.
 *
 * Library hooks in packages built with `espcompose build --library` do NOT
 * need this — they can use natural `useScript(async () => { ... })` bodies
 * and the scalar-capture system handles non-literal arguments.
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
  const { __templateKey, __instanceIndex, __zOrder } = internal;
  const ctrlBindingKey = '__ctrl';

  if (autoHide === false) {
    // Simple show/hide — one script each, no timer.
    const showScript = useScript(
      makeSyntheticScript(
        `lvgl_vis_show_${__templateKey}`,
        [irOverlayShow(__templateKey, __instanceIndex, __zOrder, ctrlBindingKey)],
        { [ctrlBindingKey]: ctrl },
      ),
    );
    const hideScript = useScript(
      makeSyntheticScript(
        `lvgl_vis_hide_${__templateKey}`,
        [irOverlayHide(__templateKey, __zOrder, ctrlBindingKey)],
        { [ctrlBindingKey]: ctrl },
      ),
    );
    return useController<LvglVisibilityController>({ show: showScript, hide: hideScript });
  }

  const duration = normalizeDuration(autoHide);

  // Show script: show → delay → hide (mode: restart so re-trigger resets timer).
  const showScript = useScript(
    makeSyntheticScript(
      `lvgl_vis_${__templateKey}`,
      [
        irOverlayShow(__templateKey, __instanceIndex, __zOrder, ctrlBindingKey),
        irDelayAction(duration),
        irOverlayHide(__templateKey, __zOrder, ctrlBindingKey),
      ],
      { [ctrlBindingKey]: ctrl },
    ),
    { mode: 'restart' },
  );

  // Hide script: stop the show timer + immediately hide.
  const hideScript = useScript(
    makeSyntheticScript(
      `lvgl_vis_hide_${__templateKey}`,
      [
        irScriptStop(showScript.id),
        irOverlayHide(__templateKey, __zOrder, ctrlBindingKey),
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
        'lvgl_vis_ref_show',
        [irNativeAction('lvgl.widget.update', { id: refBindingKey, hidden: false }, [
          { kind: 'object', key: 'id', bindingName: refBindingKey },
        ])],
        { [refBindingKey]: ref },
      ),
    );
    const hideScript = useScript(
      makeSyntheticScript(
        'lvgl_vis_ref_hide',
        [irNativeAction('lvgl.widget.update', { id: refBindingKey, hidden: true }, [
          { kind: 'object', key: 'id', bindingName: refBindingKey },
        ])],
        { [refBindingKey]: ref },
      ),
    );
    return useController<LvglVisibilityController>({ show: showScript, hide: hideScript });
  }

  const duration = normalizeDuration(autoHide);
  const safeDuration = duration.replace(/[^a-z0-9_]/gi, '_');

  // Show script: unhide → delay → hide (mode: restart).
  const showScript = useScript(
    makeSyntheticScript(
      `lvgl_vis_ref_${safeDuration}`,
      [
        irNativeAction('lvgl.widget.update', { id: refBindingKey, hidden: false }, [
          { kind: 'object', key: 'id', bindingName: refBindingKey },
        ]),
        irDelayAction(duration),
        irNativeAction('lvgl.widget.update', { id: refBindingKey, hidden: true }, [
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
      `lvgl_vis_ref_hide_${safeDuration}`,
      [
        irScriptStop(showScript.id),
        irNativeAction('lvgl.widget.update', { id: refBindingKey, hidden: true }, [
          { kind: 'object', key: 'id', bindingName: refBindingKey },
        ]),
      ],
      { [refBindingKey]: ref },
    ),
  );

  return useController<LvglVisibilityController>({ show: showScript, hide: hideScript });
}
