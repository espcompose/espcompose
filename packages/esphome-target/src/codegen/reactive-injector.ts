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

import type { IRHAEntity } from '@espcompose/core/internals';
import type { RemappedHAEntity } from '../ha-entity-classifier.js';

/** Entity shape accepted by the injector — works with both remapped and legacy. */
type InjectableEntity = RemappedHAEntity | IRHAEntity;

function getEntityTargetId(entity: InjectableEntity): string {
  if ('targetId' in entity) return entity.targetId;
  return entity.semanticId;
}

function getEntityPlatform(entity: InjectableEntity): string {
  return entity.platform;
}

/** Extract the HA attribute from a variant, or undefined if not an attribute variant. */
function getEntityAttribute(entity: InjectableEntity): string | undefined {
  return entity.variant.kind === 'attribute' ? entity.variant.attribute : undefined;
}

/**
 * Inject HA entity sensor imports into the rendered config.
 *
 * @param config   - The rendered YAML config object (from `render()`).
 * @param entities - HA entity registrations collected during the render pass.
 * @returns A new config object with injected sensor imports.
 */
export function injectHASensorImports(
  config: Record<string, unknown>,
  entities: InjectableEntity[],
): Record<string, unknown> {
  if (entities.length === 0) {
    return config;
  }

  const result = { ...config };

  for (const entity of entities) {
    // Skip if the user already manually declared a sensor with the same entity_id
    if (hasSensorForEntity(result, entity)) continue;

    const sensorConfig = buildHASensorConfig(entity);
    appendToSection(result, getEntityPlatform(entity), sensorConfig);
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
  entity: InjectableEntity,
): boolean {
  const section = config[getEntityPlatform(entity)];
  if (!section) return false;

  const entityAttribute = getEntityAttribute(entity);
  const entries = Array.isArray(section) ? section : [section];
  for (const entry of entries) {
    if (entry && typeof entry === 'object' && !Array.isArray(entry)) {
      const obj = entry as Record<string, unknown>;
      if (obj.entity_id === entity.entityId && (obj.attribute ?? undefined) === (entityAttribute ?? undefined)) return true;
    }
  }
  return false;
}

/**
 * Build the ESPHome sensor config for a HA entity import.
 */
function buildHASensorConfig(entity: InjectableEntity): Record<string, unknown> {
  const attribute = getEntityAttribute(entity);
  return {
    platform: 'homeassistant',
    id: getEntityTargetId(entity),
    entity_id: entity.entityId,
    ...(attribute ? { attribute } : {}),
    ...(getEntityPlatform(entity) === 'binary_sensor' ? { trigger_on_initial_state: true } : {}),
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
