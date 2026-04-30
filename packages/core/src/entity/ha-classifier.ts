// ────────────────────────────────────────────────────────────────────────────
// HA entity classifier (core-local, deterministic)
//
// Classifies HA entities into a platform (binary_sensor / sensor / text_sensor)
// and mints deterministic **semantic IDs** that are target-neutral. The target
// remaps these to its own naming convention during emit.
//
// The platform classification logic uses `getDomainSensorType()` from the
// generated entity-domains metadata — this is semantic knowledge already in
// core. The only target-specific piece (ID minting convention) has been moved
// to the target's emit-time remapping pass.
// ────────────────────────────────────────────────────────────────────────────

import type { SensorPlatform } from '../generated/entity-domains.js';
import { getDomainSensorType } from '../generated/entity-domains.js';
import type { HAEntityVariant } from '../hooks/useReactiveScope.js';

/**
 * Semantic input for entity classification. All fields are
 * target-neutral HA vocabulary.
 */
export interface HAEntityClassifyInput {
  /** Full HA entity id, e.g. `light.kitchen_floods`. */
  entityId: string;
  /** HA domain prefix of the entity id, e.g. `light`, `sensor`. */
  domain: string;
  /** Which sub-import this represents: primary state, a HA attribute, or a synthetic facet. */
  variant: HAEntityVariant;
}

/**
 * Core classification result. Both fields are deterministic and
 * target-neutral.
 */
export interface HAEntityClassifyResult {
  /** Deterministic semantic ID (target remaps during emit). */
  semanticId: string;
  /** Platform/section key (e.g. `binary_sensor` / `sensor` / `text_sensor`). */
  platform: SensorPlatform;
}

/**
 * Mint a deterministic semantic ID from a HA entity classification input.
 *
 * Scheme:
 *   - Primary state:   `ha_entity:{entityId}`
 *   - Attribute:       `ha_entity:{entityId}:{attribute}`
 *   - stateText facet: `ha_entity:{entityId}:stateText`
 */
function mintSemanticId(input: HAEntityClassifyInput): string {
  const base = `ha_entity:${input.entityId}`;
  switch (input.variant.kind) {
    case 'attribute': return `${base}:${input.variant.attribute}`;
    case 'facet': return `${base}:${input.variant.facet}`;
    case 'state': return base;
  }
}

/**
 * Determine the sensor platform for a HA entity classification input.
 *   - attribute variant       → `sensor` (numeric attribute import)
 *   - facet `stateText`       → `text_sensor` (string state rendering)
 *   - state variant           → looked up via `getDomainSensorType(domain)`
 */
function classifyPlatform(input: HAEntityClassifyInput): SensorPlatform {
  switch (input.variant.kind) {
    case 'attribute': return 'sensor';
    case 'facet': return 'text_sensor';
    case 'state': return getDomainSensorType(input.domain);
  }
}

/**
 * Classify a HA entity into a semantic ID and platform. This is a pure,
 * deterministic function — no global state or target hooks involved.
 */
export function classifyHAEntity(input: HAEntityClassifyInput): HAEntityClassifyResult {
  return {
    semanticId: mintSemanticId(input),
    platform: classifyPlatform(input),
  };
}
