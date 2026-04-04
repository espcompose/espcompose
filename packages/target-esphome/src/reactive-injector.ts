// ────────────────────────────────────────────────────────────────────────────
// HA Sensor Import Injector
//
// Post-render pass that takes the collected HA entity registrations from the
// reactive scope and merges sensor imports into the rendered YAML config.
//
// All reactive widget update wiring is handled by the C++ reactive runtime
// (Signal/Memo/Effect in espcompose_bindings.h). This module only handles
// generating the `platform: homeassistant` sensor entries.
// ────────────────────────────────────────────────────────────────────────────

import type { HAEntityRegistration } from '@espcompose/core/internals';

/**
 * Inject HA entity sensor imports into the rendered config.
 *
 * @param config   - The rendered YAML config object (from `render()`).
 * @param entities - HA entity registrations collected during the render pass.
 * @returns A new config object with injected sensor imports.
 */
export function injectHASensorImports(
  config: Record<string, unknown>,
  entities: HAEntityRegistration[],
): Record<string, unknown> {
  if (entities.length === 0) {
    return config;
  }

  const result = { ...config };

  for (const entity of entities) {
    // Skip if the user already manually declared a sensor with the same entity_id
    if (hasSensorForEntity(result, entity)) continue;

    const sensorConfig = buildHASensorConfig(entity);
    appendToSection(result, entity.sensorType, sensorConfig);
  }

  return result;
}

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

/**
 * Check if the config already has a sensor with the given entity_id and attribute.
 */
function hasSensorForEntity(
  config: Record<string, unknown>,
  entity: HAEntityRegistration,
): boolean {
  const section = config[entity.sensorType];
  if (!section) return false;

  const entries = Array.isArray(section) ? section : [section];
  for (const entry of entries) {
    if (entry && typeof entry === 'object' && !Array.isArray(entry)) {
      const obj = entry as Record<string, unknown>;
      if (obj.entity_id === entity.entityId && (obj.attribute ?? undefined) === (entity.attribute ?? undefined)) return true;
    }
  }
  return false;
}

/**
 * Build the ESPHome sensor config for a HA entity import.
 */
function buildHASensorConfig(entity: HAEntityRegistration): Record<string, unknown> {
  return {
    platform: 'homeassistant',
    id: entity.generatedId,
    entity_id: entity.entityId,
    ...(entity.attribute ? { attribute: entity.attribute } : {}),
    ...(entity.sensorType === 'binary_sensor' ? { trigger_on_initial_state: true } : {}),
  };
}

/**
 * Append a config entry to a top-level section, handling array semantics.
 */
function appendToSection(
  config: Record<string, unknown>,
  sectionKey: string,
  entry: Record<string, unknown>,
): void {
  const existing = config[sectionKey];
  if (existing === undefined || existing === null) {
    config[sectionKey] = entry;
  } else if (Array.isArray(existing)) {
    existing.push(entry);
  } else {
    config[sectionKey] = [existing, entry];
  }
}
