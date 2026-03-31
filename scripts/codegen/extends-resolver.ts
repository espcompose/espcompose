/**
 * Extends resolution helpers for ESPHome schema codegen.
 *
 * Handles flattening typed schemas, resolving extends stubs, and building
 * the shared bases.ts output file.
 */

import ts from 'typescript';
import type { SchemaDefinition, SchemaConfigVar, SchemaRegistry, ComponentSchemas } from './schema-types.js';
import {
  buildInterfaceBody, toPascalCase, toCamelCase,
  collectSpecialPropTypesFromMembers, collectSpecialPropTypesFromNested,
  type InterfaceAccumulator,
} from './type-mapper.js';
import {
  printStatements, addFileHeader, addLineComment,
  keyword, typeRef,
  interfaceDecl, importTypeDecl,
} from './ast-helpers.js';

// ────────────────────────────────────────────────────────────────────────────
// Typed schema flattening
// ────────────────────────────────────────────────────────────────────────────

/**
 * Flatten a `type: "typed"` CONFIG_SCHEMA into a single SchemaDefinition by
 * merging all variant sub-schemas.
 *
 * Strategy: collect the union of all `extends` refs and the union of all
 * `config_vars` across every variant. All variant-specific fields become
 * optional (their `key` is coerced to `'Optional'`). The discriminant key
 * (e.g. `dac_type`) is injected as an enum whose values are the variant names.
 *
 * This trades some precision for broad coverage — the resulting interface
 * accepts any valid combination rather than being narrowed per-variant.
 */
export function flattenTypedSchema(
  typedKey: string,
  types: Record<string, SchemaDefinition>,
): SchemaDefinition {
  const allExtends = new Set<string>();
  const merged: Record<string, SchemaConfigVar> = {};

  for (const [, variantDef] of Object.entries(types)) {
    for (const ref of variantDef.extends ?? []) allExtends.add(ref);
    for (const [varName, varDef] of Object.entries(variantDef.config_vars ?? {})) {
      if (varName in merged) continue; // first-seen wins
      // Make variant-specific props optional so the merged interface is valid
      // regardless of which variant the user picks.
      merged[varName] = { ...varDef, key: varDef.key === 'Required' ? 'Optional' : varDef.key };
    }
  }

  // Inject the discriminant key as an enum.
  merged[typedKey] = {
    key: 'Optional',
    type: 'enum',
    values: Object.fromEntries(Object.keys(types).map((k) => [k, null])),
  };

  return {
    extends: [...allExtends],
    config_vars: merged,
  };
}

// ────────────────────────────────────────────────────────────────────────────
// Config schema resolution
// ────────────────────────────────────────────────────────────────────────────

/**
 * Resolve a CONFIG_SCHEMA entry to a SchemaDefinition, handling both
 * `type: "schema"` and `type: "typed"` (flattened into a merged definition).
 * Returns null for unrecognised / absent schemas.
 */
export function resolveConfigSchema(
  configSchema: ComponentSchemas['CONFIG_SCHEMA'] | undefined,
): SchemaDefinition | null {
  if (!configSchema) return null;
  if (configSchema.type === 'schema') return configSchema.schema as SchemaDefinition;
  if (configSchema.type === 'typed') {
    const typed = configSchema as unknown as { typed_key: string; types: Record<string, SchemaDefinition> };
    return flattenTypedSchema(typed.typed_key, typed.types);
  }
  return null;
}

// ────────────────────────────────────────────────────────────────────────────
// Extends-as-TypeScript-extends helpers
// ────────────────────────────────────────────────────────────────────────────

/**
 * Convert a schema extends ref into a local stub interface name.
 *
 * Strategy: strip the source prefix from the schema name when it would cause
 * redundancy, then produce a `_PascalCase` identifier.
 *
 * Examples:
 *   as3935.AS3935_SCHEMA                → _As3935
 *   core.COMPONENT_SCHEMA               → _CoreComponent
 *   core.ENTITY_BASE_SCHEMA             → _CoreEntityBase
 *   binary_sensor._BINARY_SENSOR_SCHEMA → _BinarySensor
 *   mqtt.MQTT_COMPONENT_SCHEMA          → _MqttComponent
 *   i2s_audio.speaker.BASE_SCHEMA       → _I2sAudioSpeakerBase
 */
function refToStubName(ref: string): string {
  const dotIdx = ref.indexOf('.');
  const source = dotIdx >= 0 ? ref.slice(0, dotIdx) : ref;
  const schemaName = dotIdx >= 0 ? ref.slice(dotIdx + 1) : ref;
  // Replace any remaining dots with underscores so "speaker.BASE_SCHEMA" → "speaker_base"
  const cleanSchemaName = schemaName.replace(/\./g, '_').replace(/^_/, '').replace(/_SCHEMA$/, '').toLowerCase();

  let suffix: string;
  if (cleanSchemaName === source) {
    suffix = '';
  } else if (cleanSchemaName.startsWith(source + '_')) {
    suffix = toPascalCase(cleanSchemaName.slice(source.length + 1));
  } else {
    suffix = toPascalCase(cleanSchemaName);
  }
  return `_${toPascalCase(source)}${suffix}`;
}

/** One base-schema stub to emit before the interface that extends it. */
export interface ExtendsStub {
  /** e.g. "_As3935" */
  stubName: string;
  /** The original extends ref, used for the comment. e.g. "as3935.AS3935_SCHEMA" */
  ref: string;
  /** AST members from this stub's OWN config_vars (not inherited — those come via TS extends). */
  members: ts.TypeElement[];
  /** Names of stubs this stub itself extends (mirrors schema inheritance recursively). */
  extendsNames: string[];
}

/**
 * Collect all config_var keys from transitive ancestor schemas of `ref`.
 * Used to omit properties from child interfaces that would conflict with
 * parent types (TS interface extends requires assignable property types).
 */
function collectAncestorVarKeys(
  ref: string,
  registry: SchemaRegistry,
  visited: Set<string> = new Set(),
): Set<string> {
  const keys = new Set<string>();
  const refDef = registry.get(ref);
  if (!refDef) return keys;
  for (const baseRef of refDef.extends ?? []) {
    if (visited.has(baseRef)) continue;
    visited.add(baseRef);
    const baseDef = registry.get(baseRef);
    if (baseDef) {
      for (const k of Object.keys(baseDef.config_vars ?? {})) {
        keys.add(k);
      }
      for (const k of collectAncestorVarKeys(baseRef, registry, visited)) {
        keys.add(k);
      }
    }
  }
  return keys;
}

/**
 * Recursively resolve a stub for `ref` and all its transitive bases.
 *
 * - Each stub contains ONLY its own `config_vars` — inherited fields come from
 *   TypeScript `extends`, not flattening.
 * - Stubs are stored in `emitted` keyed by ref; insertion order is depth-first
 *   (bases before dependents), so iterating `emitted.values()` gives a safe
 *   emission order.
 * - `usedNames` (`stubName → ref`) disambiguates name collisions.
 * - Cycle-safe: a ref is reserved in `emitted` before recursing.
 *
 * Returns the stub for `ref`, or null if the ref is unknown in the registry.
 */
export function resolveStub(
  ref: string,
  registry: SchemaRegistry,
  acc: InterfaceAccumulator,
  markerRefs: Set<string>,
  emitted: Map<string, ExtendsStub>,
  usedNames: Map<string, string>,
): ExtendsStub | null {
  if (emitted.has(ref)) return emitted.get(ref)!;
  const refDef = registry.get(ref);
  if (!refDef) return null;

  // Generate a unique stub name.
  let stubName = refToStubName(ref);
  if (usedNames.has(stubName) && usedNames.get(stubName) !== ref) {
    let n = 2;
    while (usedNames.has(`${stubName}${n}`)) n++;
    stubName = `${stubName}${n}`;
  }
  usedNames.set(stubName, ref);

  // Reserve early to break cycles.
  const stub: ExtendsStub = { stubName, ref, members: [], extendsNames: [] };
  emitted.set(ref, stub);

  // Depth-first: resolve bases before building this stub's own body.
  const extendsNames: string[] = [];
  for (const baseRef of refDef.extends ?? []) {
    const baseStub = resolveStub(baseRef, registry, acc, markerRefs, emitted, usedNames);
    if (baseStub) extendsNames.push(baseStub.stubName);
  }

  // Only this schema's OWN config_vars, excluding any that a parent already defines
  // (re-declaring a property with an incompatible type would break TS extends).
  const ownVars = refDef.config_vars ?? {};
  const ancestorKeys = collectAncestorVarKeys(ref, registry);
  const filteredVars: Record<string, SchemaConfigVar> = {};
  for (const [k, v] of Object.entries(ownVars)) {
    if (!ancestorKeys.has(k)) filteredVars[k] = v;
  }
  const prefix = stubName.replace(/^_/, '');
  // Extract domain from the ref (e.g. "binary_sensor._BINARY_SENSOR_SCHEMA" → "binary_sensor")
  // for trigger variable type lookup in the trigger registry.
  const stubDomain = ref.includes('.') ? ref.split('.')[0] : undefined;
  const members = Object.keys(filteredVars).length > 0
    ? buildInterfaceBody(filteredVars, prefix, acc, markerRefs, registry, stubDomain)
    : [];

  stub.extendsNames = extendsNames;
  stub.members = members;
  return stub;
}

// ────────────────────────────────────────────────────────────────────────────
// Global base collection
// ────────────────────────────────────────────────────────────────────────────

/**
 * Recursively collect all extends refs from a schema and its transitive bases.
 */
export function collectExtendsRefs(
  schema: SchemaDefinition,
  registry: SchemaRegistry,
  out: Set<string>,
  visited: Set<string> = new Set(),
): void {
  for (const ref of schema.extends ?? []) {
    if (visited.has(ref)) continue;
    visited.add(ref);
    out.add(ref);
    const refDef = registry.get(ref);
    if (refDef) collectExtendsRefs(refDef, registry, out, visited);
  }
}

/**
 * Build the content of `src/generated/bases.ts`.
 * Contains all shared base interfaces used across component files.
 */
export function buildBasesFileContent(
  globalStubs: Map<string, ExtendsStub>,
  nestedInterfaces: InterfaceAccumulator,
  markerRefs: Set<string>,
): string {
  const statements: ts.Statement[] = [];

  const specialTypes = [...new Set([
    ...[...globalStubs.values()].flatMap((stub) => collectSpecialPropTypesFromMembers(stub.members)),
    ...collectSpecialPropTypesFromNested(nestedInterfaces),
  ])];

  // Imports
  const typesImports = ['Pin', ...specialTypes, 'TriggerHandler', 'EmbedValue', ...(markerRefs.size > 0 ? ['RefProp'] : [])];
  statements.push(importTypeDecl(typesImports, '../types'));
  if (markerRefs.size > 0) {
    statements.push(importTypeDecl([...markerRefs], './markers'));
  }

  // Nested interfaces first (used by stub members).
  for (const ni of nestedInterfaces) {
    statements.push(interfaceDecl(ni.name, ni.members, { exported: true }));
  }

  // Base interfaces
  for (const stub of globalStubs.values()) {
    let decl = interfaceDecl(stub.stubName, stub.members, {
      exported: true,
      extends: stub.extendsNames.length > 0 ? stub.extendsNames : undefined,
    });
    decl = addLineComment(decl, ` ${stub.ref}`);
    statements.push(decl);
  }

  const printed = printStatements(statements);
  return addFileHeader(printed, [
    `AUTO-GENERATED — DO NOT EDIT.`,
    `Regenerate with: pnpm codegen`,
    ``,
    `Shared base interfaces mirroring ESPHome schema "extends" hierarchy.`,
    `These are imported by individual component files.`,
  ]);
}
