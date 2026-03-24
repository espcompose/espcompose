/**
 * Schema-driven action extractor — reads `action` blocks from `.cache/schemas/*.json`
 * and groups actions by their target C++ class (via `use_id_type`).
 *
 * This replaces the manually-curated ACTION_REGISTRY with data derived directly
 * from ESPHome's JSON schema files.
 */

import * as fs from 'fs';
import * as path from 'path';
import type { SchemaDefinition, SchemaConfigVar, SchemaRegistry } from './schema-types.js';
import { toCamelCase } from './type-mapper.js';

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

export interface ActionParamEntry {
  /** The snake_case YAML parameter name. */
  yamlKey: string;
  /** The camelCase TypeScript parameter name. */
  tsName: string;
  /** TypeScript type string. */
  tsType: string;
  /** Whether the parameter is required. */
  required: boolean;
  /** ESPHome docs string, if available. */
  doc?: string;
}

export interface ActionEntry {
  /** Full YAML action key (e.g. "light.turn_on"). */
  yamlKey: string;
  /** Short action name in snake_case (e.g. "turn_on"). */
  shortName: string;
  /** camelCase method name for TypeScript (e.g. "turnOn"). */
  methodName: string;
  /** Target C++ class (e.g. "light::LightState"). */
  targetClass: string;
  /** Name of the id field (usually "id", but can be "lvgl_id", "logger_id"). */
  idFieldName: string;
  /** Action parameters (excluding the id field). */
  params: ActionParamEntry[];
  /** ESPHome docs string. */
  doc?: string;
}

export interface ActionShortcoming {
  /** Full YAML action key. */
  yamlKey: string;
  /** Reason the action was skipped. */
  reason: string;
}

/** Maps C++ class → list of actions targeting that class. */
export type ClassActionMap = Map<string, ActionEntry[]>;

// ────────────────────────────────────────────────────────────────────────────
// Schema parameter type resolution
// ────────────────────────────────────────────────────────────────────────────

function resolveParamType(varDef: SchemaConfigVar): string {
  switch (varDef.type) {
    case 'string':
      return 'string';
    case 'boolean':
      return 'boolean';
    case 'integer':
    case 'float':
      return 'number';
    case 'enum': {
      const vals = Object.keys(varDef.values ?? {});
      return vals.length > 0 ? vals.map(v => JSON.stringify(v)).join(' | ') : 'string';
    }
    case 'schema':
      // Nested object params — use Record for now; complex schemas are rare in action params
      return 'Record<string, unknown>';
    default:
      // Untyped params (common for templatable fields like brightness, level)
      // These are typically numbers in ESPHome
      if (varDef.templatable) return 'number';
      return 'unknown';
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Extends resolution
// ────────────────────────────────────────────────────────────────────────────

/**
 * Resolve `extends` chains in an action schema to produce a flat config_vars map.
 * Merges inherited config_vars with the action's own, own vars taking precedence.
 */
function resolveExtends(
  schema: SchemaDefinition,
  schemaRegistry: SchemaRegistry,
  visited: Set<string> = new Set(),
): Record<string, SchemaConfigVar> {
  const merged: Record<string, SchemaConfigVar> = {};

  for (const ref of schema.extends ?? []) {
    if (visited.has(ref)) continue;
    visited.add(ref);
    const refDef = schemaRegistry.get(ref);
    if (!refDef) continue;
    const inherited = resolveExtends(refDef, schemaRegistry, visited);
    Object.assign(merged, inherited);
  }

  Object.assign(merged, schema.config_vars ?? {});
  return merged;
}

// ────────────────────────────────────────────────────────────────────────────
// Main extraction
// ────────────────────────────────────────────────────────────────────────────

/**
 * Extract all schema-defined actions from the cache directory, grouped by
 * target C++ class.
 *
 * @param schemasDir - Path to `.cache/schemas/`
 * @param schemaRegistry - Pre-built registry for resolving `extends` references
 * @returns classActions — Map of C++ class → ActionEntry[]
 *          shortcomings — Actions that couldn't be extracted
 */
export function extractSchemaActions(
  schemasDir: string,
  schemaRegistry: SchemaRegistry,
): { classActions: ClassActionMap; shortcomings: ActionShortcoming[] } {
  const classActions: ClassActionMap = new Map();
  const shortcomings: ActionShortcoming[] = [];

  const files = fs.readdirSync(schemasDir).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const filePath = path.join(schemasDir, file);
    let rawJson: Record<string, unknown>;
    try {
      rawJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch {
      continue;
    }

    // Walk all top-level domain keys (e.g. "light", "switch", "switch.lvgl", "core")
    for (const [domainKey, domainValue] of Object.entries(rawJson)) {
      if (!domainValue || typeof domainValue !== 'object') continue;
      const domainObj = domainValue as Record<string, unknown>;

      // Look for the "action" key
      const actionBlock = domainObj.action as Record<string, unknown> | undefined;
      if (!actionBlock) continue;

      // Also register schemas from this domain into the registry for extends resolution
      registerDomainSchemas(domainKey, domainObj, schemaRegistry);

      for (const [actionName, actionSchema] of Object.entries(actionBlock)) {
        const yamlKey = `${domainKey}.${actionName}`;

        if (!actionSchema || typeof actionSchema !== 'object') {
          shortcomings.push({ yamlKey, reason: 'Action schema is not an object' });
          continue;
        }

        const actionObj = actionSchema as Record<string, unknown>;
        const schemaBlock = actionObj.schema as SchemaDefinition | undefined;
        const doc = (actionObj.docs as string) ?? undefined;

        if (!schemaBlock) {
          // Some actions (like core.delay) don't have a schema block with config_vars
          shortcomings.push({ yamlKey, reason: 'No schema block' });
          continue;
        }

        // Resolve extends to get all config_vars
        const allVars = resolveExtends(schemaBlock, schemaRegistry);

        // Find the use_id field — any config_var with type: "use_id" and a use_id_type
        let targetClass: string | undefined;
        let idFieldName: string | undefined;

        for (const [varName, varDef] of Object.entries(allVars)) {
          if (varDef.type === 'use_id' && varDef.use_id_type) {
            targetClass = varDef.use_id_type;
            idFieldName = varName;
            break;
          }
        }

        if (!targetClass || !idFieldName) {
          shortcomings.push({ yamlKey, reason: 'No use_id_type field found' });
          continue;
        }

        // Extract non-id parameters
        const params: ActionParamEntry[] = [];
        for (const [varName, varDef] of Object.entries(allVars)) {
          if (varName === idFieldName) continue;

          // Skip internal/meta fields
          if (varDef.key === 'GeneratedID') continue;

          // Skip malformed keys (e.g. Python function reprs leaked into schema JSON)
          if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(varName)) continue;

          // Skip fields with fixed defaults that serve as action discriminators
          // (e.g. "mode" on number.to_max with default "TO_MAX" and single-value enum)
          const enumVals = Object.keys(varDef.values ?? {});
          if (varDef.default && enumVals.length === 1) continue;

          const tsName = toCamelCase(varName);
          const tsType = resolveParamType(varDef);
          const required = varDef.key === 'Required';

          params.push({
            yamlKey: varName,
            tsName,
            tsType,
            required,
            doc: varDef.docs,
          });
        }

        const methodName = toCamelCase(actionName);

        const entry: ActionEntry = {
          yamlKey,
          shortName: actionName,
          methodName,
          targetClass,
          idFieldName,
          params,
          doc,
        };

        const existing = classActions.get(targetClass) ?? [];
        existing.push(entry);
        classActions.set(targetClass, existing);
      }
    }
  }

  // Merge duplicate (targetClass, methodName) entries.  This happens when
  // multiple schema actions share a target class and short name (e.g. 31 LVGL
  // widget `update` actions all targeting `lv_style_t`).  We union their params,
  // making every param optional since each variant only requires a subset.
  for (const [cls, actions] of classActions) {
    const byMethod = new Map<string, ActionEntry[]>();
    for (const a of actions) {
      const list = byMethod.get(a.methodName) ?? [];
      list.push(a);
      byMethod.set(a.methodName, list);
    }

    const merged: ActionEntry[] = [];
    for (const [, group] of byMethod) {
      if (group.length === 1) {
        merged.push(group[0]);
        continue;
      }

      // Merge params: collect all unique param names across variants
      const paramMap = new Map<string, ActionParamEntry>();
      for (const entry of group) {
        for (const p of entry.params) {
          const existing = paramMap.get(p.tsName);
          if (!existing) {
            // All merged params become optional since no single variant requires all
            paramMap.set(p.tsName, { ...p, required: false });
          }
          // If already seen, keep existing (already optional)
        }
      }

      merged.push({
        ...group[0],
        params: [...paramMap.values()],
      });
    }

    classActions.set(cls, merged);
  }

  return { classActions, shortcomings };
}

/**
 * Register named schemas from a domain's `schemas` key into the schema registry
 * so that action `extends` references can resolve.
 */
function registerDomainSchemas(
  domainKey: string,
  domainObj: Record<string, unknown>,
  schemaRegistry: SchemaRegistry,
): void {
  const schemas = domainObj.schemas as Record<string, unknown> | undefined;
  if (!schemas) return;

  for (const [schemaName, schemaEntry] of Object.entries(schemas)) {
    const entry = schemaEntry as { schema?: SchemaDefinition } | undefined;
    if (!entry?.schema) continue;
    const key = `${domainKey}.${schemaName}`;
    if (!schemaRegistry.has(key)) {
      schemaRegistry.set(key, entry.schema);
    }
  }
}
