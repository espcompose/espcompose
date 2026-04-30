// ────────────────────────────────────────────────────────────────────────────
// HA entity ID remapping (ESPHome target)
//
// At emit time, remaps the core-minted semantic IDs on IRHAEntity and related
// IR structures (IRReactiveNode.sourceId, IRDependency.sourceId) to ESPHome's
// naming convention (e.g. `ha_light_kitchen_floods`).
// ────────────────────────────────────────────────────────────────────────────

import type { IRHAEntity, HAEntityVariant } from '@espcompose/core/internals';

/**
 * Mint a deterministic ESPHome component id from a HA entity id and variant.
 *
 * Examples:
 *   - `light.kitchen_floods` (state)                → `ha_light_kitchen_floods`
 *   - `light.kitchen_floods` + attr `brightness`    → `ha_light_kitchen_floods_brightness`
 *   - `binary_sensor.door` + facet `stateText`      → `ha_binary_sensor_door_state_text`
 */
function mintTargetId(entity: IRHAEntity): string {
  const base = `ha_${entity.entityId.replace('.', '_')}`;
  switch (entity.variant.kind) {
    case 'attribute': return `${base}_${entity.variant.attribute}`;
    case 'facet': return `${base}_state_text`;
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
      platform: entity.platform,
      entityId: entity.entityId,
      domain: entity.domain,
      variant: entity.variant,
    });
  }

  return { semanticToTarget, remappedEntities };
}
