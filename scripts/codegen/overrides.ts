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
