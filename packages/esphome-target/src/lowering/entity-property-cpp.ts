// ────────────────────────────────────────────────────────────────────────────
// entity-property-cpp.ts — Resolve target-agnostic entity property keys
// to concrete C++ access paths on ESPHome component IDs.
//
// Core stores `propertyKey` (semantic, e.g. 'state', 'brightness') and the
// `sourceDomain` it was routed through (e.g. 'binary_sensor', 'light',
// 'cover'). The ESPHome target owns the mapping from that pair to the C++
// member-access expression that reads the value off `id(comp_id)`.
//
// The lookup table itself is generated from metadata/entity-domains.json
// (each domain's `componentAccess` map). Codegen cross-validates that every
// (sourceDomain, propertyKey) referenced by any property has a corresponding
// entry — adding a new property in metadata without a matching access path
// fails the build at codegen time.
// ────────────────────────────────────────────────────────────────────────────

import { ENTITY_PROPERTY_CPP_PATHS } from '../generated/component-access.js';

/**
 * Map a (sourceDomain, propertyKey) pair to its C++ access path. Throws if
 * the pair is unknown — silent fallback would mask routing bugs that slip
 * past codegen validation (e.g. a sourceDomain produced at runtime that
 * isn't in the metadata).
 */
export function resolveEntityPropertyCppPath(
  sourceDomain: string,
  propertyKey: string,
): string {
  const path = ENTITY_PROPERTY_CPP_PATHS[sourceDomain]?.[propertyKey];
  if (path === undefined) {
    throw new Error(
      `[espcompose] No C++ path mapping for entity property '${sourceDomain}.${propertyKey}'. ` +
        `Add a 'componentAccess' entry under domains.${sourceDomain} in ` +
        `metadata/entity-domains.json and re-run \`pnpm --filter @espcompose/metadata generate\`.`,
    );
  }
  return path;
}
