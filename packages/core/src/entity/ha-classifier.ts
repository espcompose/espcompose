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

/**
 * Semantic input for entity classification. All fields are
 * target-neutral HA vocabulary.
 */
export interface HAEntityClassifyInput {
  /** Full HA entity id, e.g. `light.kitchen_floods`. */
  entityId: string;
  /** HA domain prefix of the entity id, e.g. `light`, `sensor`. */
  domain: string;
  /** Optional HA entity attribute (e.g. `brightness`). */
  attribute?: string;
  /**
   * Optional facet hint for multi-facet bindings. Used to disambiguate
   * which sub-import to mint (e.g. the text rendering of an entity's
   * state vs the boolean state itself). `undefined` means the primary
   * state import.
   */
  facet?: 'state' | 'stateText';
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
  if (input.attribute) return `${base}:${input.attribute}`;
  if (input.facet === 'stateText') return `${base}:stateText`;
  return base;
}

/**
 * Determine the sensor platform for a HA entity classification input.
 *   - `attribute` set         → `sensor` (numeric attribute import)
 *   - `facet === 'stateText'` → `text_sensor` (string state rendering)
 *   - default                 → looked up via `getDomainSensorType(domain)`
 */
function classifyPlatform(input: HAEntityClassifyInput): SensorPlatform {
  if (input.attribute) return 'sensor';
  if (input.facet === 'stateText') return 'text_sensor';
  return getDomainSensorType(input.domain);
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
