// ────────────────────────────────────────────────────────────────────────────
// sourceDomainToTrigger — translate an ESPHome platform/component domain to
// the concrete on_state / on_value trigger key used in the lowered YAML.
//
// Only called for HA entity dependencies (sourceType === 'ha_entity').
// Theme, global, and overlay-mux deps are routed by sourceType and never
// reach this function.
// ────────────────────────────────────────────────────────────────────────────

/**
 * Source domains that fire `on_value` in their lowered ESPHome YAML.
 * All other recognized domains use `on_state`.
 */
const ON_VALUE_DOMAINS = new Set<string>([
  'sensor',
  'text_sensor',
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
 * Map an ESPHome platform/component domain to the trigger key (`on_state` or
 * `on_value`) used in YAML.
 *
 * Only called for HA entity deps. Throws on unknown domains — callers must
 * extend the table when introducing new ESPHome platforms.
 */
export function sourceDomainToTrigger(sourceDomain: string): 'on_state' | 'on_value' {
  if (ON_VALUE_DOMAINS.has(sourceDomain)) return 'on_value';
  if (ON_STATE_DOMAINS.has(sourceDomain)) return 'on_state';
  throw new Error(
    `[espcompose] sourceDomainToTrigger: unknown sourceDomain '${sourceDomain}'. ` +
      `Add it to ON_VALUE_DOMAINS or ON_STATE_DOMAINS in source-trigger.ts.`,
  );
}
