// ────────────────────────────────────────────────────────────────────────────
// HA entity classifier (ESPHome target)
//
// Maps semantic HA inputs (entity id + domain + optional attribute/facet)
// to ESPHome-specific platform names and component ids. Registered via
// `core.setHAEntityClassifier()` in `ComposeTarget.registerRenderHooks`.
// ────────────────────────────────────────────────────────────────────────────

import type { HAEntityClassifyInput, HAEntityClassifyResult } from '@espcompose/core/internals';
import { getDomainSensorType } from '@espcompose/core/internals';

/**
 * Mint a deterministic ESPHome component id from a HA entity id, optional
 * attribute, and optional facet.
 *
 * Examples:
 *   - `light.kitchen_floods`                       → `ha_light_kitchen_floods`
 *   - `light.kitchen_floods` + attr `brightness`   → `ha_light_kitchen_floods_brightness`
 *   - `binary_sensor.door` + facet `stateText`     → `ha_binary_sensor_door_state_text`
 */
function mintTargetId(input: HAEntityClassifyInput): string {
  const base = `ha_${input.entityId.replace('.', '_')}`;
  if (input.attribute) return `${base}_${input.attribute}`;
  if (input.facet === 'stateText') return `${base}_state_text`;
  return base;
}

/**
 * Choose the ESPHome `platform` (top-level section key) for a HA entity
 * import. Multi-facet bindings dispatch as follows:
 *   - `attribute` set        → `sensor` (numeric attribute import)
 *   - `facet === 'stateText'` → `text_sensor` (string state rendering)
 *   - default                → looked up via `getDomainSensorType(domain)`
 */
function classifyPlatform(input: HAEntityClassifyInput): string {
  if (input.attribute) return 'sensor';
  if (input.facet === 'stateText') return 'text_sensor';
  return getDomainSensorType(input.domain);
}

export function classifyHAEntityForESPHome(
  input: HAEntityClassifyInput,
): HAEntityClassifyResult {
  return {
    targetId: mintTargetId(input),
    platform: classifyPlatform(input),
  };
}
