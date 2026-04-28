// AUTO-GENERATED — DO NOT EDIT. Source: metadata/entity-domains.json

/* eslint-disable */

/**
 * Lookup table of (sourceDomain, propertyKey) → C++ access suffix appended
 * directly to `id(comp_id)`. The suffix includes the leading '.' or '->'.
 *
 * Generated from metadata/entity-domains.json. Each entry corresponds to a
 * domain's `componentAccess` map. Cross-validated at codegen time against
 * every property's (sourceDomain, propertyKey) reference.
 */
export const ENTITY_PROPERTY_CPP_PATHS: Readonly<Record<string, Readonly<Record<string, string>>>> = {
  light: {
    "brightness": ".current_values.get_brightness()",
  },
  sensor: {
    "state": ".state",
  },
  binary_sensor: {
    "state": ".state",
  },
  cover: {
    "position": ".position",
  },
  text_sensor: {
    "state": ".state",
  },
};
