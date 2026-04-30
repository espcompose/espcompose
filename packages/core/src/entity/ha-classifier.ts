// ────────────────────────────────────────────────────────────────────────────
// HA entity classifier (core-local, deterministic)
//
// Mints deterministic **semantic IDs** that are target-neutral. The target
// remaps these to its own naming convention during emit, and derives the
// platform (binary_sensor / sensor / text_sensor) from the variant's exprType.
// ────────────────────────────────────────────────────────────────────────────

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
 * Core classification result — deterministic and target-neutral.
 */
export interface HAEntityClassifyResult {
  /** Deterministic semantic ID (target remaps during emit). */
  semanticId: string;
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
 * Classify a HA entity — mints a deterministic semantic ID. This is a pure,
 * deterministic function — no global state or target hooks involved.
 */
export function classifyHAEntity(input: HAEntityClassifyInput): HAEntityClassifyResult {
  return {
    semanticId: mintSemanticId(input),
  };
}
