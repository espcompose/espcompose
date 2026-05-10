// ────────────────────────────────────────────────────────────────────────────
// LVGL Animation Lowering — ESPHome target
//
// Lowers AttachAnimationContribution IR to C++ lv_anim_t setup code.
// Each animation becomes a static lv_anim_t variable initialized in a
// lambda block that runs on page/widget load.
//
// The animated property is mapped through the LVGL style prop table to
// derive the correct lv_obj_set_style_<setter>() exec callback.
// ────────────────────────────────────────────────────────────────────────────

import type { AttachAnimationContribution, AnimationEasing } from '@espcompose/core/internals';
import { LVGL_STYLE_PROP_TABLE } from './style-prop-table.js';
import { camelToSnake } from '../yaml-utils.js';

// ── Easing map ─────────────────────────────────────────────────────────────

const EASING_TO_LVGL: Record<AnimationEasing, string> = {
  'linear':       'lv_anim_path_linear',
  'ease-in':      'lv_anim_path_ease_in',
  'ease-out':     'lv_anim_path_ease_out',
  'ease-in-out':  'lv_anim_path_ease_in_out',
  'overshoot':    'lv_anim_path_overshoot',
  'bounce':       'lv_anim_path_bounce',
  'step':         'lv_anim_path_step',
};

// ── Property resolution ────────────────────────────────────────────────────

/**
 * Resolve a semantic camelCase CSS property name to the LVGL setter suffix
 * and C++ exec callback signature.
 *
 * The animation `property` from useAnimation is in CSS alias form (e.g.
 * 'opacity', 'width', 'x'). These map through the CSS→LVGL mapping to
 * snake_case LVGL prop names, then to the style prop table for the setter.
 */
function resolvePropertySetter(property: string): { setter: string; cppType: string; cast?: string } {
  // The property is already in a form close to the LVGL camelCase prop
  // (e.g. 'opacity' → 'opa', 'width' → 'width', 'x' → 'x').
  // Convert to snake_case and look up in the prop table.
  const snakeProp = camelToSnake(property);
  const descriptor = LVGL_STYLE_PROP_TABLE[snakeProp];
  if (descriptor) {
    return { setter: descriptor.lvglSetter, cppType: descriptor.cppType, cast: descriptor.cast };
  }
  // Fall back: the property might already be in snake_case LVGL form.
  throw new Error(
    `[espcompose] Cannot animate property '${property}': ` +
    `no LVGL style setter found for '${snakeProp}'. ` +
    `Ensure the property is a valid numeric LVGL style prop.`,
  );
}

// ── Animation C++ generation ───────────────────────────────────────────────

/**
 * Generate a C++ exec callback for a style property animation.
 *
 * LVGL animations call an `exec_cb(void* var, int32_t value)` function on
 * each frame. For style properties, this calls
 * `lv_obj_set_style_<setter>(obj, value, <selector>)`.
 */
function generateExecCallback(
  animId: string,
  setter: string,
  cast: string | undefined,
  selector: string,
): string {
  const valueExpr = cast ? cast.replace('$V', 'v') : 'v';
  return (
    `static void ${animId}_exec_cb(void* var, int32_t v) {\n` +
    `  lv_obj_set_style_${setter}((lv_obj_t*)var, ${valueExpr}, ${selector});\n` +
    `}`
  );
}

/**
 * Build the LV_STATE / LV_PART selector constant for a given part + state.
 */
function buildSelector(part?: string, state?: string): string {
  const parts: string[] = [];
  if (part && part !== 'main') {
    parts.push(`LV_PART_${part.toUpperCase()}`);
  } else {
    parts.push('LV_PART_MAIN');
  }
  if (state && state !== 'default') {
    parts.push(`LV_STATE_${state.toUpperCase()}`);
  } else {
    parts.push('LV_STATE_DEFAULT');
  }
  return parts.join(' | ');
}

/**
 * Lower a single AttachAnimationContribution to C++ code blocks.
 *
 * Returns:
 * - `execCallback`: The static exec callback function definition (file-scope C++)
 * - `varDeclaration`: The static lv_anim_t variable declaration (file-scope C++)
 * - `initCode`: The lv_anim_t initialization code (to be placed in an on_boot lambda)
 * - `animId`: The animation ID for start/stop references
 */
export function lowerAnimationToCpp(
  anim: AttachAnimationContribution,
  widgetAccessor: string,
): { execCallback: string; varDeclaration: string; initCode: string; animId: string } {
  const { setter, cast } = resolvePropertySetter(anim.property);
  const selector = buildSelector(anim.part, anim.state);
  const animId = anim.animationId;

  const execCallback = generateExecCallback(animId, setter, cast, selector);
  const varDeclaration = `static lv_anim_t ${animId};`;

  const lines: string[] = [];
  lines.push(`lv_anim_init(&${animId});`);
  lines.push(`lv_anim_set_var(&${animId}, ${widgetAccessor});`);
  lines.push(`lv_anim_set_exec_cb(&${animId}, ${animId}_exec_cb);`);
  lines.push(`lv_anim_set_values(&${animId}, ${anim.from}, ${anim.to});`);
  lines.push(`lv_anim_set_time(&${animId}, ${anim.durationMs});`);

  // Delay
  if (anim.delayMs != null && anim.delayMs > 0) {
    lines.push(`lv_anim_set_delay(&${animId}, ${anim.delayMs});`);
  }

  // Easing
  const easing = anim.easing ?? 'linear';
  const pathFn = EASING_TO_LVGL[easing];
  if (pathFn) {
    lines.push(`lv_anim_set_path_cb(&${animId}, ${pathFn});`);
  }

  // Repeat
  if (anim.repeat != null) {
    const repeatCount = anim.repeat === -1 ? 'LV_ANIM_REPEAT_INFINITE' : String(anim.repeat);
    lines.push(`lv_anim_set_repeat_count(&${animId}, ${repeatCount});`);
  }

  // Repeat delay
  if (anim.repeatDelayMs != null && anim.repeatDelayMs > 0) {
    lines.push(`lv_anim_set_repeat_delay(&${animId}, ${anim.repeatDelayMs});`);
  }

  // Playback (reverse animation)
  if (anim.playback) {
    const pbDuration = anim.playback.durationMs ?? anim.durationMs;
    lines.push(`lv_anim_set_playback_time(&${animId}, ${pbDuration});`);
    if (anim.playback.delayMs != null && anim.playback.delayMs > 0) {
      lines.push(`lv_anim_set_playback_delay(&${animId}, ${anim.playback.delayMs});`);
    }
  }

  // Auto-start
  if (anim.autoStart) {
    lines.push(`lv_anim_start(&${animId});`);
  }

  return {
    execCallback,
    varDeclaration,
    initCode: lines.join('\n  '),
    animId,
  };
}

/**
 * Generate the C++ lambda code to start an animation by ID.
 */
export function lowerAnimationStartAction(animationId: string): string {
  return `lv_anim_start(&espcompose::${animationId});`;
}

/**
 * Generate the C++ lambda code to stop an animation by ID.
 *
 * Uses lv_anim_custom_del to remove the animation from the LVGL scheduler.
 */
export function lowerAnimationStopAction(animationId: string): string {
  return `lv_anim_custom_del(&espcompose::${animationId}, nullptr);`;
}
