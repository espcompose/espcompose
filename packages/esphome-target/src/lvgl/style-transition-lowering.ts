// ────────────────────────────────────────────────────────────────────────────
// LVGL Style Transition Lowering — ESPHome target
//
// Lowers AttachStyleTransitionContribution IR to C++ code that declares
// an lv_style_transition_dsc_t and applies it to the target widget
// via lv_obj_add_style() in bootstrap_runtime().
//
// LVGL style transitions animate property changes automatically —
// when a style property value changes on the widget, the change is
// interpolated over the specified duration/easing.
// ────────────────────────────────────────────────────────────────────────────

import type { AttachStyleTransitionContribution, AnimationEasing } from '@espcompose/core/internals';
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

// ── CSS → LV_STYLE constant mapping ───────────────────────────────────────

/**
 * Resolve a camelCase CSS property to the LV_STYLE_* enum constant.
 *
 * The property comes from useStyleTransition's `properties` array.
 * We go camelCase → snake_case and uppercase for the LVGL constant.
 */
function resolveStylePropConstant(property: string): string {
  const snakeProp = camelToSnake(property);

  // Verify it's in the style prop table (same validation as animations)
  if (!LVGL_STYLE_PROP_TABLE[snakeProp]) {
    throw new Error(
      `[espcompose] Cannot apply style transition to property '${property}': ` +
      `no LVGL style prop found for '${snakeProp}'. ` +
      `Ensure the property is a valid LVGL style prop.`,
    );
  }

  return `LV_STYLE_${snakeProp.toUpperCase()}`;
}

/**
 * Build the LV_STATE / LV_PART selector constant.
 */
function buildSelector(part?: string, state?: string): string {
  const partFlag = part && part !== 'main'
    ? `LV_PART_${part.toUpperCase()}`
    : 'LV_PART_MAIN';
  const stateFlag = state && state !== 'default'
    ? `LV_STATE_${state.toUpperCase()}`
    : 'LV_STATE_DEFAULT';
  return `(static_cast<lv_style_selector_t>(${partFlag}) | static_cast<lv_style_selector_t>(${stateFlag}))`;
}

// ── Style transition C++ generation ────────────────────────────────────────

/**
 * Lower a single AttachStyleTransitionContribution to C++ code blocks.
 *
 * Returns:
 * - `declarations`: File-scope declarations (props array, transition desc)
 * - `initCode`: Code for bootstrap_runtime() (lv_style_transition_dsc_init + lv_obj_add_style)
 * - `transitionId`: The transition ID for reference
 */
export function lowerStyleTransitionToCpp(
  st: AttachStyleTransitionContribution,
  widgetAccessor: string,
): { declarations: string; initCode: string; transitionId: string } {
  const transId = st.transitionId;
  const selector = buildSelector(st.part, st.state);
  const easing: AnimationEasing = st.easing ?? 'linear';
  const pathFn = EASING_TO_LVGL[easing];

  // Resolve all properties to LV_STYLE_* constants
  const propConstants = st.properties.map(resolveStylePropConstant);

  // Generate static props array
  const propsArrayName = `${transId}_props`;
  const propsArray = `static const lv_style_prop_t ${propsArrayName}[] = {${propConstants.join(', ')}, 0};`;

  // Generate static transition descriptor and style
  const descName = `${transId}_dsc`;
  const styleName = `${transId}_style`;
  const descDecl = `static lv_style_transition_dsc_t ${descName};`;
  const styleDecl = `static lv_style_t ${styleName};`;

  const declarations = [propsArray, descDecl, styleDecl].join('\n');

  // Generate init code
  const initLines: string[] = [];
  initLines.push(`lv_style_transition_dsc_init(&${descName}, ${propsArrayName}, ${pathFn}, ${st.durationMs}, ${st.delayMs ?? 0}, NULL);`);
  initLines.push(`lv_style_init(&${styleName});`);
  initLines.push(`lv_style_set_transition(&${styleName}, &${descName});`);
  initLines.push(`lv_obj_add_style(${widgetAccessor}, &${styleName}, ${selector});`);

  return {
    declarations,
    initCode: initLines.join('\n'),
    transitionId: transId,
  };
}
