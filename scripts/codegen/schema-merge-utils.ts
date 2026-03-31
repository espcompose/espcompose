/**
 * Shared schema merge utilities.
 *
 * Provides recursive extends-resolution and config_var merging used by both
 * the type-mapper (interface codegen) and the schema-action-extractor.
 */

import type { SchemaConfigVar, SchemaDefinition, SchemaRegistry } from './schema-types.js';

// ────────────────────────────────────────────────────────────────────────────
// Config var merging
// ────────────────────────────────────────────────────────────────────────────

export function mergeConfigVarDef(base: SchemaConfigVar, override: SchemaConfigVar): SchemaConfigVar {
  const merged: SchemaConfigVar = { ...base, ...override };

  if (base.values || override.values) {
    merged.values = { ...(base.values ?? {}), ...(override.values ?? {}) };
  }

  if (base.schema || override.schema) {
    merged.schema = mergeSchemaDefinition(base.schema, override.schema);
  }

  return merged;
}

export function mergeConfigVarMaps(
  base: Record<string, SchemaConfigVar>,
  override: Record<string, SchemaConfigVar>,
): Record<string, SchemaConfigVar> {
  const merged: Record<string, SchemaConfigVar> = { ...base };
  for (const [k, v] of Object.entries(override)) {
    merged[k] = merged[k] ? mergeConfigVarDef(merged[k], v) : v;
  }
  return merged;
}

export function mergeSchemaDefinition(
  base: SchemaDefinition | undefined,
  override: SchemaDefinition | undefined,
): SchemaDefinition | undefined {
  if (!base && !override) return undefined;
  if (!base) return override;
  if (!override) return base;

  const merged: SchemaDefinition = { ...base, ...override };

  if (base.config_vars || override.config_vars) {
    merged.config_vars = mergeConfigVarMaps(base.config_vars ?? {}, override.config_vars ?? {});
  }

  if (base.extends || override.extends) {
    const combined = [...(base.extends ?? []), ...(override.extends ?? [])];
    merged.extends = [...new Set(combined)];
  }

  return merged;
}

// ────────────────────────────────────────────────────────────────────────────
// Extends resolution
// ────────────────────────────────────────────────────────────────────────────

/**
 * Recursively flatten `extends` references in a schema definition,
 * merging all inherited config_vars with own config_vars (own wins).
 */
export function mergeExtends(
  schema: SchemaDefinition,
  registry: SchemaRegistry,
  _visited: Set<string> = new Set(),
): Record<string, SchemaConfigVar> {
  const merged: Record<string, SchemaConfigVar> = {};
  for (const ref of schema.extends ?? []) {
    if (_visited.has(ref)) continue;
    _visited.add(ref);
    const refDef = registry.get(ref);
    if (!refDef) continue;
    const inherited = mergeExtends(refDef, registry, _visited);
    Object.assign(merged, mergeConfigVarMaps(merged, inherited));
  }
  return mergeConfigVarMaps(merged, schema.config_vars ?? {});
}

// ────────────────────────────────────────────────────────────────────────────
// Own-vars filtering
// ────────────────────────────────────────────────────────────────────────────

/**
 * Filter a schema's config_vars to only include properties defined directly on
 * the schema, excluding those inherited from `extends` bases. This is used in
 * codegen to avoid re-declaring inherited properties in TypeScript interfaces
 * that use `extends`.
 *
 * @param schema  The schema whose own vars to extract.
 * @param registry  Schema registry for resolving extends references.
 * @param skipRefs  Optional extends refs to skip when computing inherited keys
 *                  (e.g. the platform base ref, which is handled separately).
 */
export function filterOwnVars(
  schema: SchemaDefinition | undefined,
  registry: SchemaRegistry,
  skipRefs?: string[],
): Record<string, SchemaConfigVar> {
  const raw = schema?.config_vars ?? {};
  if (!schema?.extends?.length) return raw;

  const inheritedKeys = new Set<string>();
  for (const baseRef of schema.extends) {
    if (skipRefs?.includes(baseRef)) continue;
    const refDef = registry.get(baseRef);
    if (refDef) {
      for (const k of Object.keys(mergeExtends(refDef, registry))) inheritedKeys.add(k);
    }
  }

  return Object.fromEntries(Object.entries(raw).filter(([k]) => !inheritedKeys.has(k)));
}
