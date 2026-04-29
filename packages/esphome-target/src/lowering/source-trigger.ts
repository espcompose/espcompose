// ────────────────────────────────────────────────────────────────────────────
// sourceDomainToTrigger — translate a semantic ESPHome source-domain to the
// concrete on_state / on_value trigger key used in the lowered YAML.
//
// Owned by the target because `on_state` / `on_value` are ESPHome YAML
// vocabulary, not semantic IR vocabulary. The IR carries only `sourceDomain`
// (a stable identifier such as `sensor`, `binary_sensor`, `light`, `globals`,
// `__theme__`, `overlay_mux`); the target picks the trigger key.
// ────────────────────────────────────────────────────────────────────────────

/**
 * Source domains that fire `on_value` in their lowered ESPHome YAML.
 * All other recognized domains use `on_state`.
 */
const ON_VALUE_DOMAINS = new Set<string>([
  'sensor',
  'text_sensor',
  'globals',
]);

const ON_STATE_DOMAINS = new Set<string>([
  'binary_sensor',
  'light',
  'switch',
  'cover',
  'fan',
  'lock',
  'climate',
  'media_player',
  'number',
  'select',
  'button',
  'valve',
  'date',
  'datetime',
  'time',
  'text',
  'event',
  'update',
  'alarm_control_panel',
]);

/**
 * Domains that route through alternate codegen paths and never need a direct
 * trigger key on the source component (handled elsewhere in the lowering).
 */
const NON_TRIGGER_DOMAINS = new Set<string>([
  '__theme__',
  'overlay_mux',
]);

/**
 * Map a semantic source-domain to the ESPHome trigger key (`on_state` or
 * `on_value`) used in YAML.
 *
 * Throws on unknown domains — callers must extend the table when introducing
 * new source kinds.
 */
export function sourceDomainToTrigger(sourceDomain: string): 'on_state' | 'on_value' {
  if (ON_VALUE_DOMAINS.has(sourceDomain)) return 'on_value';
  if (ON_STATE_DOMAINS.has(sourceDomain)) return 'on_state';
  if (NON_TRIGGER_DOMAINS.has(sourceDomain)) {
    throw new Error(
      `[espcompose] sourceDomainToTrigger called with non-trigger domain '${sourceDomain}'. ` +
        `These domains do not have a direct YAML trigger key.`,
    );
  }
  throw new Error(
    `[espcompose] sourceDomainToTrigger: unknown sourceDomain '${sourceDomain}'. ` +
      `Add it to ON_VALUE_DOMAINS or ON_STATE_DOMAINS in source-trigger.ts.`,
  );
}
