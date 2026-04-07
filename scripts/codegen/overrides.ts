import type { SchemaDefinition } from './schema-types.js';
import type { ActionEntry } from './schema-action-extractor.js';

/**
 * Manual overrides for ESPHome schema fields that are incorrectly tagged in
 * the JSON schema vs. what the Python validator actually enforces.
 *
 * A field can appear here when:
 *  - The JSON schema marks it `Required` but ESPHome auto-computes a default
 *    at the Python layer (not expressed in the JSON schema `default` field).
 *
 * Key format: `${PascalCaseInterfacePrefix}.${snake_case_yaml_key}`
 * e.g. "Esphome.build_path"
 */
export const OPTIONAL_FIELD_OVERRIDES = new Set<string>([
  // ESPHome auto-derives build_path from the node name (.esphome/build/<name>).
  // The JSON schema marks it Required, but it is never set in real-world configs.
  'Esphome.build_path',
]);

/**
 * Type overrides for fields where the JSON schema type diverges from what
 * some ESPHome platform validators actually accept.
 *
 * Key format: `${snake_case_yaml_key}` (matches any interface containing this field).
 * Value: array of additional string literal union members to merge with the
 * schema-derived type.  The original type (e.g. `number`) is preserved so that
 * platforms which accept the original format still work.
 *
 * Example: The JSON schema marks `bits_per_sample` as `integer`, but i2s_audio
 * platforms expect a string with a "bit" unit suffix (e.g. "16bit"), while
 * the resampler platform expects a plain integer.
 */
export const TYPE_OVERRIDES = new Map<string, string[]>([
  // Some platforms (i2s_audio) expect "Nbit" strings; others (resampler) expect integers.
  ['bits_per_sample', ['8bit', '16bit', '24bit', '32bit']],
]);

/**
 * Full component schema overrides for components whose upstream JSON schema
 * is empty or missing.  When the codegen sees a component whose
 * CONFIG_SCHEMA is untyped, it checks this map first.  If an override is
 * present the synthetic SchemaDefinition is used instead, routing the
 * component through the normal typed-interface codegen path.
 *
 * Key: component name (e.g. "image")
 * Value: synthetic SchemaDefinition with config_vars describing the real props
 *
 * Props whose YAML value is a filesystem path should include
 * `docs: '@filePath'` — the compiler uses this annotation to resolve
 * relative paths and copy assets into the build output.
 */
export const COMPONENT_SCHEMA_OVERRIDES = new Map<string, SchemaDefinition>([
  [
    'image',
    {
      config_vars: {
        id: {
          key: 'GeneratedID',
          id_type: { class: 'image::Image', parents: [] },
        },
        file: {
          key: 'Required',
          type: 'string',
          docs: '@filePath — path (relative to YAML), MDI icon (mdi:name), or URL.',
        },
        type: {
          key: 'Required',
          type: 'enum',
          values: {
            BINARY: null,
            GRAYSCALE: null,
            RGB565: null,
            RGB: null,
            RGBA: null,
            TRANSPARENT_BINARY: null,
          },
        },
        resize: {
          key: 'Optional',
          type: 'string',
          docs: 'Resize to fit WIDTHxHEIGHT, preserving aspect ratio.',
        },
        transparency: {
          key: 'Optional',
          type: 'enum',
          values: { opaque: null, chroma_key: null, alpha_channel: null },
        },
        invert_alpha: {
          key: 'Optional',
          type: 'boolean',
          docs: 'Invert colors (binary/grayscale only). Defaults to false.',
        },
        dither: {
          key: 'Optional',
          type: 'enum',
          values: { NONE: null, FLOYDSTEINBERG: null },
          docs: 'Dither method for GRAYSCALE/BINARY images. Defaults to NONE.',
        },
        byte_order: {
          key: 'Optional',
          type: 'enum',
          values: { big_endian: null, little_endian: null },
          docs: 'Pixel byte order for RGB565 images. Defaults to big_endian.',
        },
      },
    },
  ],
]);

/**
 * Manual action overrides for ESPHome actions that are not present in the
 * JSON schema files (e.g. LVGL page navigation actions are registered in
 * Python but not exported by the ESPHome schema dumper).
 *
 * Key: C++ class name (must match use_id_type from the schema)
 * Value: array of ActionEntry objects to merge into the class's action list
 */
export const ACTION_OVERRIDES = new Map<string, ActionEntry[]>([
  [
    'lvgl::LvglComponent',
    [
      {
        yamlKey: 'lvgl.page.next',
        shortName: 'page_next',
        methodName: 'pageNext',
        targetClass: 'lvgl::LvglComponent',
        idFieldName: 'lvgl_id',
        params: [
          { yamlKey: 'animation', tsName: 'animation', tsType: '"NONE" | "MOVE_LEFT" | "MOVE_RIGHT" | "FADE_IN" | "OUT_LEFT" | "OUT_RIGHT" | "OUT_TOP" | "OUT_BOTTOM"', required: false, doc: 'Page transition animation. Defaults to NONE.' },
          { yamlKey: 'time', tsName: 'time', tsType: 'string', required: false, doc: 'Animation duration (e.g. "300ms"). Defaults to 50ms.' },
        ],
        doc: 'Navigate to the next LVGL page.',
      },
      {
        yamlKey: 'lvgl.page.previous',
        shortName: 'page_previous',
        methodName: 'pagePrevious',
        targetClass: 'lvgl::LvglComponent',
        idFieldName: 'lvgl_id',
        params: [
          { yamlKey: 'animation', tsName: 'animation', tsType: '"NONE" | "MOVE_LEFT" | "MOVE_RIGHT" | "FADE_IN" | "OUT_LEFT" | "OUT_RIGHT" | "OUT_TOP" | "OUT_BOTTOM"', required: false, doc: 'Page transition animation. Defaults to NONE.' },
          { yamlKey: 'time', tsName: 'time', tsType: 'string', required: false, doc: 'Animation duration (e.g. "300ms"). Defaults to 50ms.' },
        ],
        doc: 'Navigate to the previous LVGL page.',
      },
      {
        yamlKey: 'lvgl.page.show',
        shortName: 'page_show',
        methodName: 'pageShow',
        targetClass: 'lvgl::LvglComponent',
        idFieldName: 'lvgl_id',
        params: [
          { yamlKey: 'id', tsName: 'id', tsType: 'unknown', required: true, doc: 'The page ref to navigate to.' },
          { yamlKey: 'animation', tsName: 'animation', tsType: '"NONE" | "MOVE_LEFT" | "MOVE_RIGHT" | "FADE_IN" | "OUT_LEFT" | "OUT_RIGHT" | "OUT_TOP" | "OUT_BOTTOM"', required: false, doc: 'Page transition animation. Defaults to NONE.' },
          { yamlKey: 'time', tsName: 'time', tsType: 'string', required: false, doc: 'Animation duration (e.g. "300ms"). Defaults to 50ms.' },
        ],
        doc: 'Navigate to a specific LVGL page by ref.',
      },
    ],
  ],
]);

/**
 * Set of YAML key names whose values are filesystem paths.
 * Used by the compiler asset pipeline to resolve relative paths
 * from the source directory and copy files into the build output.
 */
export const FILE_PATH_YAML_KEYS = new Set<string>([
  'file',
]);
