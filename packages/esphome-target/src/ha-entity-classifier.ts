// ────────────────────────────────────────────────────────────────────────────
// HA entity ID remapping (ESPHome target)
//
// At emit time, remaps the core-minted semantic IDs on IRHAEntity and related
// IR structures (IRReactiveNode.sourceId, IRDependency.sourceId) to ESPHome's
// naming convention (e.g. `ha_light_kitchen_floods`).
//
// Also derives the ESPHome sensor platform from variant data — this is the
// target's responsibility, not core's.
// ────────────────────────────────────────────────────────────────────────────

import type { IRHAEntity, HAEntityVariant } from '@espcompose/core/internals';
import { getDomainSensorType, exprTypeToPlatform } from './generated/sensor-platforms.js';
import { camelToSnake } from './yaml-utils.js';

/**
 * Derive the ESPHome sensor platform for a HA entity from its domain and
 * variant — fully data-driven, no hard-coded platform strings.
 *
 *   - state    → domain's sensorPlatform (from entity-domains metadata)
 *   - attribute → exprTypeToPlatform(variant.exprType)
 *   - facet    → exprTypeToPlatform(variant.exprType)
 */
function classifyPlatform(entity: { domain: string; variant: HAEntityVariant }): string {
  switch (entity.variant.kind) {
    case 'state': return getDomainSensorType(entity.domain);
    case 'attribute': return exprTypeToPlatform(entity.variant.exprType);
    case 'facet': return exprTypeToPlatform(entity.variant.exprType);
  }
}

/**
 * Mint a deterministic ESPHome component id from a HA entity id and variant.
 *
 * Attributes and facets are namespaced with `_attr_` / `_facet_` prefixes to
 * prevent collisions between variant kinds.
 *
 * Examples:
 *   - `light.kitchen_floods` (state)                → `ha_light_kitchen_floods`
 *   - `light.kitchen_floods` + attr `brightness`    → `ha_light_kitchen_floods_attr_brightness`
 *   - `binary_sensor.door` + facet `stateText`      → `ha_binary_sensor_door_facet_state_text`
 */
function mintTargetId(entity: IRHAEntity): string {
  const base = `ha_${entity.entityId.replace('.', '_')}`;
  switch (entity.variant.kind) {
    case 'attribute': return `${base}_attr_${entity.variant.attribute}`;
    case 'facet': return `${base}_facet_${camelToSnake(entity.variant.facet)}`;
    case 'state': return base;
  }
}

export interface RemappedHAEntity {
  /** ESPHome component id (the `id:` field in YAML). */
  targetId: string;
  /** Platform/section key (e.g. `binary_sensor`). */
  platform: string;
  /** Original HA entity ID. */
  entityId: string;
  /** HA domain. */
  domain: string;
  /** Which sub-import this represents. */
  variant: HAEntityVariant;
}

export interface EntityIdMap {
  /** Maps semantic ID → ESPHome target ID. */
  semanticToTarget: Map<string, string>;
  /** Remapped entities with target IDs. */
  remappedEntities: RemappedHAEntity[];
}

/**
 * Build the semantic → target ID mapping for all HA entities and return
 * remapped entity records with ESPHome-specific target IDs.
 */
export function buildEntityIdMap(entities: IRHAEntity[]): EntityIdMap {
  const semanticToTarget = new Map<string, string>();
  const remappedEntities: RemappedHAEntity[] = [];

  for (const entity of entities) {
    const targetId = mintTargetId(entity);
    semanticToTarget.set(entity.semanticId, targetId);
    remappedEntities.push({
      targetId,
      platform: classifyPlatform(entity),
      entityId: entity.entityId,
      domain: entity.domain,
      variant: entity.variant,
    });
  }

  return { semanticToTarget, remappedEntities };
}
