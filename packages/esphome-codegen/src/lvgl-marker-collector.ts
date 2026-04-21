/**
 * LVGL widget marker collector.
 *
 * Reads the extracted lvgl-schema.json and registers each widget's C++ type
 * (e.g. `lv_slider_t`, `LvPageType`) as a marker class with synthetic parents
 * `lv_obj_t` and `lv_style_t`.  This allows `useRef<LvglSliderRef>()` to expose
 * widget-typed actions like `widgetUpdate({...})`, `sliderUpdate({...})`,
 * `widgetRedraw()`, `pageShow()`, etc.
 *
 * The widget→cppType map is also returned so the LVGL JSX codegen can emit
 * `ComponentProps<__marker_lv_<widget>_t>` for each `<lvgl-*>` intrinsic.
 *
 * Why synthetic parents?
 *   - `lv_obj_t` is the conceptual base "any LVGL widget" — its actions
 *     (`widgetRedraw`, `widgetRefresh`) apply to every widget.
 *   - `lv_style_t` is the conceptual style-update mixin — its actions
 *     (`widgetUpdate`, `<widget>Update`, `styleUpdate`) apply to every widget.
 *   - In C++ these are not formal ancestors, but the marker pipeline only
 *     uses parent edges for brand inheritance, which is exactly what we need.
 */

import * as fs from 'fs';

interface LvglWidgetDef {
  cpp_type?: string;
}

interface LvglSchema {
  widgets: Record<string, LvglWidgetDef>;
}

/** C++ primitive types we never emit markers for. */
const PRIMITIVE_TYPES = new Set([
  'uint8_t', 'uint16_t', 'uint32_t', 'uint64_t',
  'int8_t', 'int16_t', 'int32_t', 'int64_t',
  'bool', 'float', 'double', 'char', 'void',
]);

/**
 * Read the LVGL schema and inject widget cpp_types into the marker pipeline.
 *
 * @returns Map<widgetName → cppType> for widgets with a usable (non-primitive)
 *          marker — used by the JSX codegen to type each `<lvgl-*>` ref.
 */
export function collectLvglWidgetMarkers(
  schemaPath: string,
  classes: Set<string>,
  parentMap: Map<string, string[]>,
): Map<string, string> {
  if (!fs.existsSync(schemaPath)) return new Map();

  const schema: LvglSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  const widgetCppTypeMap = new Map<string, string>();

  // ── Synthetic root markers ──────────────────────────────────────────────
  //   lv_style_t has no parents (root style mixin)
  //   lv_obj_t has lv_style_t as parent (every widget can be styled)
  classes.add('lv_style_t');
  if (!parentMap.has('lv_style_t')) parentMap.set('lv_style_t', []);

  classes.add('lv_obj_t');
  if (!parentMap.has('lv_obj_t')) parentMap.set('lv_obj_t', ['lv_style_t']);

  // ── Per-widget markers ──────────────────────────────────────────────────
  for (const [widgetName, def] of Object.entries(schema.widgets)) {
    const cppType = def.cpp_type;
    if (!cppType || PRIMITIVE_TYPES.has(cppType)) continue;

    classes.add(cppType);
    widgetCppTypeMap.set(widgetName, cppType);

    // Skip parent assignment for the synthetic roots themselves.
    if (cppType === 'lv_obj_t' || cppType === 'lv_style_t') continue;

    // Every widget inherits brands from lv_obj_t (which transitively includes
    // lv_style_t).  Don't overwrite if upstream codegen already defined parents.
    if (!parentMap.has(cppType)) {
      parentMap.set(cppType, ['lv_obj_t']);
    } else {
      const existing = parentMap.get(cppType)!;
      if (!existing.includes('lv_obj_t')) existing.push('lv_obj_t');
    }
  }

  return widgetCppTypeMap;
}
