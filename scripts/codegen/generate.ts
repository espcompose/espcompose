#!/usr/bin/env node
/**
 * ESPHome type codegen — data-driven multi-schema pass
 *
 * Reads cached JSON schemas from .cache/schemas/ (fetched from
 * schema.esphome.io by build-schemas.ts).
 * Falls back with a clear error if schemas haven't been fetched yet.
 *
 * Output layout:
 *   src/generated/
 *     index.ts                  ← top-level barrel
 *     bases.ts                  ← shared base interfaces (extends hierarchy)
 *     markers.ts                ← phantom type brands for Ref<T>
 *     registry.ts               ← JSX tag → YAML key map
 *     components/
 *       esphome.ts              ← <esphome> root element
 *       <component>.ts          ← standalone components (no platform dependency)
 *       <platform>.ts           ← platform element; props are a discriminated union
 *                                  over all known components for that platform,
 *                                  e.g. <binary_sensor platform="gpio" pin={4} />
 *
 * Usage:
 *   pnpm codegen
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';
import type { RootSchema, ComponentEntry, SchemaDefinition, SchemaConfigVar, ConfigSchemaEntry, ComponentSchemas, SchemaRegistry } from './schema-types.js';
import { buildInterfaceBody, cppClassToMarkerName, toCamelCase, toPascalCase, CPP_PRIMITIVE_TO_TS, mergeExtends, type InterfaceAccumulator } from './type-mapper.js';
import { buildLvglFileContent } from './lvgl-codegen.js';
import { generateActionsFile } from './action-codegen.js';
import { extractSchemaActions } from './schema-action-extractor.js';
import {
  printStatements, addFileHeader, addLineComment, addJsDoc,
  keyword, typeRef, stringLiteralType, unionType, intersectionType, typeLiteral,
  componentPropsType, readonlyType, recordType,
  propSig, indexSig,
  interfaceDecl, typeAliasDecl,
  importTypeDecl, exportStarDecl,
  globalJsxAugmentation, constExport, objectLiteral,
} from './ast-helpers.js';

// ────────────────────────────────────────────────────────────────────────────
// Schema registry
//
// Maps "source.SchemaName" → merged config_vars (with extends already flattened)
// so that any schema can look up cross-file references at interface-build time.
// ────────────────────────────────────────────────────────────────────────────

// SchemaRegistry is defined in schema-types.ts to avoid circular imports.
// Re-export it here so external callers have a single import point.
export type { SchemaRegistry } from './schema-types.js';

/**
 * Build a SchemaRegistry from the root esphome.json, all platform JSONs,
 * and all component JSONs read from the local schema cache.
 * Registers every named schema found under each source's `schemas` key.
 */
function buildSchemaRegistry(
  root: RootSchema,
  platformFetched: Map<SchemaTarget, RawSchemaFile | null>,
  componentFetched: Map<SchemaTarget, RawSchemaFile | null>,
): SchemaRegistry {
  const registry: SchemaRegistry = new Map();

  // Register core schemas from esphome.json
  const coreSchemas = (root.core?.schemas ?? {}) as Record<string, unknown>;
  for (const [schemaName, schemaEntry] of Object.entries(coreSchemas)) {
    const def = (schemaEntry as ConfigSchemaEntry)?.schema;
    if (def) registry.set(`core.${schemaName}`, def as SchemaDefinition);
  }

  // Register schemas from a raw JSON file (shared logic for platforms and components).
  // The outer key may be dotted (e.g. "i2s_audio.speaker").  We register under
  // the full outer key so 3-part extends refs like "i2s_audio.speaker.BASE_SCHEMA"
  // resolve correctly.  For dotted keys we also register under the first-part
  // prefix (e.g. "i2s_audio.BASE_SCHEMA") as a fallback for 2-part refs —
  // but only if that short key is not already taken by a schema from a
  // non-dotted outer key.
  function registerFromRawJson(rawJson: RawSchemaFile): void {
    for (const [outerKey, componentEntry] of Object.entries(rawJson)) {
      const entry = componentEntry as ComponentEntry & { schemas?: Record<string, unknown> };
      if (!entry?.schemas) continue;
      for (const [schemaName, schemaEntry] of Object.entries(entry.schemas)) {
        const def = (schemaEntry as ConfigSchemaEntry)?.schema;
        if (!def) continue;
        registry.set(`${outerKey}.${schemaName}`, def as SchemaDefinition);
        if (outerKey.includes('.')) {
          const shortPrefix = outerKey.split('.')[0];
          const shortKey = `${shortPrefix}.${schemaName}`;
          if (!registry.has(shortKey)) {
            registry.set(shortKey, def as SchemaDefinition);
          }
        }
      }
    }
  }

  for (const rawJson of platformFetched.values()) {
    if (rawJson) registerFromRawJson(rawJson);
  }
  for (const rawJson of componentFetched.values()) {
    if (rawJson) registerFromRawJson(rawJson);
  }

  return registry;
}

// ────────────────────────────────────────────────────────────────────────────
// Constants
// ────────────────────────────────────────────────────────────────────────────

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read the pinned ESPHome version from the workspace root package.json
// so the schema URL stays in sync with the version used in .devcontainer.
const rootPkg = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../package.json'), 'utf-8'),
);
const ESPHOME_VERSION: string = rootPkg.esphome?.version;
if (!ESPHOME_VERSION) {
  throw new Error('Missing esphome.version in root package.json');
}

const SCHEMAS_DIR = path.resolve(__dirname, '../../.cache/schemas');

const GENERATED_DIR = path.resolve(__dirname, '../../packages/sdk/src/generated');
const COMPONENTS_DIR = path.join(GENERATED_DIR, 'components');

function nodeUsesTypeRef(node: ts.Node, typeName: string): boolean {
  if (ts.isTypeReferenceNode(node) && ts.isIdentifier(node.typeName) && node.typeName.text === typeName) {
    return true;
  }
  let found = false;
  ts.forEachChild(node, (child) => {
    if (!found && nodeUsesTypeRef(child, typeName)) found = true;
  });
  return found;
}

function membersUseTypeRef(members: ts.TypeElement[], typeName: string): boolean {
  return members.some((m) => nodeUsesTypeRef(m, typeName));
}

function nestedInterfacesUseTypeRef(nested: InterfaceAccumulator, typeName: string): boolean {
  return nested.some((ni) => membersUseTypeRef(ni.members, typeName));
}

const SPECIAL_PROP_TYPES = ['TimePeriod', 'MACAddress', 'IPv4Address'] as const;

function collectSpecialPropTypesFromMembers(members: ts.TypeElement[]): string[] {
  return SPECIAL_PROP_TYPES.filter((typeName) => membersUseTypeRef(members, typeName));
}

function collectSpecialPropTypesFromNested(nested: InterfaceAccumulator): string[] {
  return SPECIAL_PROP_TYPES.filter((typeName) => nestedInterfacesUseTypeRef(nested, typeName));
}

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

/** Describes a single schema fetch target. */
interface SchemaTarget {
  /** e.g. "esphome", "sensor", "dht" */
  name: string;
  /** URL to fetch */
  url: string;
  /**
   * Platform this component belongs to (undefined = standalone or the platform itself).
   * Set for components discovered under a platform (e.g. "sensor" for "dht").
   */
  platform?: string;
  /** True when this target is a platform (binary_sensor, sensor, etc.) */
  isPlatform: boolean;
}

/** One component discovered under a platform, ready for codegen. */
interface PlatformComponent {
  /** Resolved component name (e.g. "gpio", "dht") */
  name: string;
  /** The fetched ComponentEntry */
  entry: ComponentEntry;
  /** Original fetch URL (for the header comment) */
  url: string;
}

// ────────────────────────────────────────────────────────────────────────────
// Marker helpers
// ────────────────────────────────────────────────────────────────────────────

/**
 * Resolve a CONFIG_SCHEMA entry to a SchemaDefinition, handling both
 * `type: "schema"` and `type: "typed"` (flattened into a merged definition).
 * Returns null for unrecognised / absent schemas.
 */
function resolveConfigSchema(
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

/**
 * Walk all config_vars in a ComponentEntry and collect every C++ class string
 * referenced by `id_type.class` and `use_id_type`.
 *
 * For typed schemas each variant is walked individually so that per-variant
 * C++ classes (e.g. TemplateDate / TemplateTime / TemplateDateTime) are all
 * collected rather than only the first-seen one from the flattened merge.
 */
function collectMarkerClasses(entry: ComponentEntry, out: Set<string>, parentMap: Map<string, string[]>): void {
  const configSchema = entry?.schemas?.CONFIG_SCHEMA;
  if (!configSchema) return;

  if (configSchema.type === 'typed') {
    const typed = configSchema as unknown as { typed_key: string; types: Record<string, SchemaDefinition> };
    for (const variantDef of Object.values(typed.types)) {
      walkConfigVars(variantDef.config_vars ?? {}, out, parentMap);
    }
    return;
  }

  const schema = resolveConfigSchema(configSchema);
  if (!schema) return;
  walkConfigVars(schema.config_vars ?? {}, out, parentMap);
}

function walkConfigVars(vars: Record<string, SchemaConfigVar>, out: Set<string>, parentMap: Map<string, string[]>): void {
  for (const varDef of Object.values(vars)) {
    if (varDef.id_type?.class) {
      out.add(varDef.id_type.class);
      if (varDef.id_type.parents?.length) {
        parentMap.set(varDef.id_type.class, varDef.id_type.parents);
        for (const p of varDef.id_type.parents) out.add(p);
      }
    }
    if (varDef.use_id_type) out.add(varDef.use_id_type);
    if (varDef.schema?.config_vars) walkConfigVars(varDef.schema.config_vars, out, parentMap);
  }
}

/**
 * Collect marker classes from all schemas in the registry
 * (covers inherited fields that aren't in a component's own config_vars).
 */
function collectRegistryClasses(registry: SchemaRegistry, out: Set<string>, parentMap: Map<string, string[]>): void {
  for (const def of registry.values()) {
    if (def.config_vars) walkConfigVars(def.config_vars, out, parentMap);
  }
}

/**
 * Walk the C++ parent chain for `cls`, returning all ancestor class names
 * (including `cls` itself).  Cycle-safe via visited set.
 */
function getAncestors(
  cls: string,
  parentMap: Map<string, string[]>,
  visited = new Set<string>(),
): string[] {
  if (visited.has(cls)) return [];
  visited.add(cls);
  const list = [cls];
  for (const p of parentMap.get(cls) ?? []) {
    if (!CPP_PRIMITIVE_TO_TS.has(p)) {
      list.push(...getAncestors(p, parentMap, visited));
    }
  }
  return list;
}

/**
 * Build mappings from marker type names to the C++ classes whose actions
 * apply, using the classActions map from schema extraction.
 *
 * For each C++ class, walks its ancestor chain (via parentMap) and checks if
 * any ancestor maps to a C++ class that has schema-defined actions.
 *
 * Also builds a classBrandMap: for each C++ class with actions, the marker
 * brand name used for structural type checking in InferActions<T>.
 */
interface MarkerClassResult {
  /** Maps every marker type name → list of C++ classes whose actions apply. */
  markerClassMap: Map<string, string[]>;
  /** Maps each C++ class with actions → its marker brand name. */
  classBrandMap: Map<string, string>;
}

function buildMarkerClassMap(
  classes: Set<string>,
  parentMap: Map<string, string[]>,
  actionClassKeys: Set<string>,
): MarkerClassResult {
  const validIdent = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
  const markerClassMap = new Map<string, string[]>();

  // Build namespace → action classes map for fallback.
  // Some component id_types (e.g. light::LightOutput) are in the same C++
  // namespace as their action targets (e.g. light::LightState) but have no
  // parent-chain connection.  When the ancestor walk finds no direct match,
  // we fall back to matching by namespace.
  const nsActionMap = new Map<string, string[]>();
  for (const cls of actionClassKeys) {
    const idx = cls.indexOf('::');
    if (idx > 0) {
      const ns = cls.slice(0, idx);
      const list = nsActionMap.get(ns) ?? [];
      list.push(cls);
      nsActionMap.set(ns, list);
    }
  }

  for (const cls of classes) {
    if (CPP_PRIMITIVE_TO_TS.has(cls)) continue;
    const markerName = cppClassToMarkerName(cls);
    if (!validIdent.test(markerName)) continue;

    const ancestors = getAncestors(cls, parentMap);
    const matchingClasses: string[] = [];
    for (const anc of ancestors) {
      if (actionClassKeys.has(anc)) {
        matchingClasses.push(anc);
      }
    }

    // Namespace fallback: when no ancestor is a direct action target, check
    // if any ancestor's C++ namespace contains action classes.
    if (matchingClasses.length === 0) {
      const checked = new Set<string>();
      for (const anc of ancestors) {
        const idx = anc.indexOf('::');
        if (idx <= 0) continue;
        const ns = anc.slice(0, idx);
        if (checked.has(ns)) continue;
        checked.add(ns);
        const nsActions = nsActionMap.get(ns);
        if (nsActions) {
          for (const ac of nsActions) {
            if (!matchingClasses.includes(ac)) matchingClasses.push(ac);
          }
        }
      }
    }

    if (matchingClasses.length > 0) {
      markerClassMap.set(markerName, matchingClasses);
    }
  }

  // Build classBrandMap: for each action class, use its own marker name as brand
  const classBrandMap = new Map<string, string>();
  for (const cppClass of actionClassKeys) {
    const markerName = cppClassToMarkerName(cppClass);
    if (validIdent.test(markerName)) {
      classBrandMap.set(cppClass, markerName);
    }
  }

  return { markerClassMap, classBrandMap };
}

/**
 * Build the content of `src/generated/markers.ts`.
 * Each C++ class becomes an empty exported interface used solely as a phantom
 * type brand for `Ref<T>`.
 */
function buildMarkersFileContent(
  classes: Set<string>,
  parentMap: Map<string, string[]>,
  virtualBrands: Map<string, string[]> = new Map(),
): string {
  const validIdent = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
  const statements: ts.Statement[] = [];

  // Track markers that follow <namespace>_<ClassName> pattern for alias generation
  const aliasTargets: Array<{ markerName: string; aliasName: string }> = [];

  // Names that would conflict with TypeScript/JavaScript globals
  const GLOBAL_CONFLICTS: Record<string, string> = {
    Number: 'Numeric',  // conflicts with global Number
    // Event, Text, Image etc. are DOM types but safe to shadow in module scope
  };

  const sorted = [...classes].sort();
  for (const cls of sorted) {
    if (CPP_PRIMITIVE_TO_TS.has(cls)) continue;
    const markerName = cppClassToMarkerName(cls);
    if (!validIdent.test(markerName)) continue;

    // One readonly optional property per ancestor (self + parents), each with
    // a unique name.  This makes Derived structurally extend Base in TS.
    const ancestors = getAncestors(cls, parentMap);
    const members: ts.TypeElement[] = [];
    const seen = new Set<string>();
    for (const anc of ancestors) {
      const ancMarker = cppClassToMarkerName(anc);
      if (!validIdent.test(ancMarker) || seen.has(ancMarker)) continue;
      seen.add(ancMarker);
      members.push(
        ts.factory.createPropertySignature(
          [ts.factory.createModifier(ts.SyntaxKind.ReadonlyKeyword)],
          `__brand_${ancMarker}`,
          ts.factory.createToken(ts.SyntaxKind.QuestionToken),
          ts.factory.createLiteralTypeNode(ts.factory.createTrue()),
        ),
      );
    }

    // Add virtual brands from namespace-bridged action classes so that
    // InferActions<T> resolves correctly (e.g. light_LightOutput gets
    // __brand_light_LightState so it picks up LightStateActions).
    for (const vb of virtualBrands.get(markerName) ?? []) {
      if (seen.has(vb)) continue;
      seen.add(vb);
      members.push(
        ts.factory.createPropertySignature(
          [ts.factory.createModifier(ts.SyntaxKind.ReadonlyKeyword)],
          `__brand_${vb}`,
          ts.factory.createToken(ts.SyntaxKind.QuestionToken),
          ts.factory.createLiteralTypeNode(ts.factory.createTrue()),
        ),
      );
    }

    let decl = interfaceDecl(markerName, members, { exported: true });
    decl = addLineComment(decl, ` ${cls}`);
    statements.push(decl);

    // Check if this marker follows <namespace>_<ClassName> where namespace matches class
    // e.g. "sensor::Sensor" → "sensor_Sensor" or "display::Display" → "display_Display"
    const underscoreIdx = markerName.indexOf('_');
    if (underscoreIdx > 0) {
      const prefix = markerName.slice(0, underscoreIdx);
      const suffix = markerName.slice(underscoreIdx + 1);
      if (prefix.toLowerCase() === suffix.toLowerCase()) {
        // Use remapped name for global conflicts, otherwise use the class name
        const aliasName = GLOBAL_CONFLICTS[suffix] ?? suffix;
        aliasTargets.push({ markerName, aliasName });
      }
    }
  }

  // Emit ergonomic type aliases for <namespace>_<ClassName> pattern matches
  if (aliasTargets.length > 0) {
    // Add blank line separator
    statements.push(ts.factory.createEmptyStatement());

    for (const { markerName, aliasName } of aliasTargets) {
      const alias = ts.factory.createTypeAliasDeclaration(
        [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
        aliasName,
        undefined,
        ts.factory.createTypeReferenceNode(markerName),
      );
      statements.push(alias);
    }
  }

  const printed = printStatements(statements);
  return addFileHeader(printed, [
    `AUTO-GENERATED — DO NOT EDIT.`,
    `Regenerate with: pnpm codegen`,
    ``,
    `Each interface is a phantom type used to brand Ref<T> values.`,
    `Each marker has one readonly property per ancestor class, making`,
    `Ref<Derived> assignable to Ref<Base> via structural subtyping.`,
    `Naming: C++ namespace separator "::" is replaced with "_".`,
    `e.g. i2c::I2CBus → i2c_I2CBus`,
  ]);
}

// ────────────────────────────────────────────────────────────────────────────
// Local schema readers
// ────────────────────────────────────────────────────────────────────────────

/**
 * Each per-component JSON file has one outer wrapper key (the component's own
 * name, possibly dotted like "dht.sensor") around the actual ComponentEntry.
 * We return the raw object so callers can extract the correct inner entry.
 */
type RawSchemaFile = Record<string, ComponentEntry>;

/**
 * Read a single schema JSON file from the local .cache/schemas/ directory.
 * Returns null if the file does not exist.
 */
function readLocalSchema(name: string): RawSchemaFile | null {
  const filePath = path.join(SCHEMAS_DIR, `${name}.json`);
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as RawSchemaFile;
  } catch {
    return null;
  }
}

/**
 * Read all schema files for the given targets from the local cache.
 * Replaces the old batchFetch() that hit schema.esphome.io.
 */
function readLocalSchemas(
  targets: SchemaTarget[],
): Map<SchemaTarget, RawSchemaFile | null> {
  const results = new Map<SchemaTarget, RawSchemaFile | null>();
  for (const target of targets) {
    results.set(target, readLocalSchema(target.name));
  }
  console.log(`  Read ${targets.length} schema files from ${SCHEMAS_DIR}`);
  return results;
}

/**
 * Given the raw JSON file (wrapper + inner entry) and the original target,
 * resolve the actual ComponentEntry plus the true element name and platform.
 *
 * Rules:
 *  - Key "wifi"        → elementName="wifi",  platform=undefined
 *  - Key "dht.sensor"  → elementName="dht",   platform="sensor"
 *  - Falls back to first key in the file if the expected pattern isn't found
 */
function resolveEntry(
  raw: RawSchemaFile,
  target: SchemaTarget,
): { entry: ComponentEntry; elementName: string; platform: string | undefined } | null {
  // 1. When platform context is available, prefer the more-specific dotted key first.
  //    e.g. { name: 'esphome', platform: 'ota' } → 'esphome.ota' before 'esphome'.
  //    This ensures platform-specific sub-schemas (like esphome.ota in esphome.json)
  //    are found even when a same-named standalone key also exists in the file.
  if (target.platform) {
    const dottedKey = `${target.name}.${target.platform}`;
    if (dottedKey in raw) {
      return { entry: raw[dottedKey], elementName: target.name, platform: target.platform };
    }
  }

  // 2. Exact name match (standalone components and platforms)
  if (target.name in raw) {
    return { entry: raw[target.name], elementName: target.name, platform: target.platform };
  }

  // 3. Generic fallback: use the first (and usually only) key, decode dots
  const keys = Object.keys(raw);
  if (keys.length === 1) {
    const key = keys[0];
    const dotIdx = key.indexOf('.');
    if (dotIdx !== -1) {
      const elementName = key.slice(0, dotIdx);
      const platform = key.slice(dotIdx + 1);
      return { entry: raw[key], elementName, platform };
    }
    return { entry: raw[key], elementName: key, platform: target.platform };
  }

  return null;
}

// ────────────────────────────────────────────────────────────────────────────
// Standalone file generation
// ────────────────────────────────────────────────────────────────────────────

/**
 * Build a TypeScript file for a component whose CONFIG_SCHEMA exists but
 * carries no type information (e.g. `psram`, whose schema is `{}`).
 *
 * The emitted interface uses an index signature so that firmware authors can
 * pass any camelCase props they need — the runtime will snake_case them into
 * the YAML output as usual.
 */
function buildOpenStandaloneFileContent(
  target: SchemaTarget,
): string {
  const pascalName = toPascalCase(target.name);
  const interfaceName = `${pascalName}Props`;

  const statements: ts.Statement[] = [
    importTypeDecl(['ComponentProps'], '../../types'),
    addJsDoc(
      interfaceDecl(interfaceName, [
        addJsDoc(
          indexSig(keyword('string'), keyword('unknown')),
          ['Accepts any props — the upstream schema provides no type information.'],
        ),
      ], { exported: true }),
      [`${interfaceName} — open interface (upstream schema has no typed config)`],
    ),
    globalJsxAugmentation([{
      tagName: target.name,
      type: intersectionType([typeRef(interfaceName), typeRef('ComponentProps')]),
    }]),
  ];

  const printed = printStatements(statements);
  return addFileHeader(printed, [
    `AUTO-GENERATED — DO NOT EDIT.`,
    `Regenerate with: pnpm codegen`,
  ]);
}

/**
 * Build the content of a generated TypeScript file for one standalone schema
 * entry (e.g. wifi, api, esphome). Returns null if the entry has no
 * CONFIG_SCHEMA at all.
 *
 * When the CONFIG_SCHEMA exists but is empty (no `type` / no `config_vars`),
 * a permissive "open" interface is emitted so that firmware authors can pass
 * arbitrary props — this covers components like `psram` whose schema is
 * published without details.
 */
function buildStandaloneFileContent(
  target: SchemaTarget,
  entry: ComponentEntry,
  registry: SchemaRegistry,
  globalStubs: Map<string, ExtendsStub>,
): string | null {
  const configSchemaEntry = entry?.schemas?.CONFIG_SCHEMA;
  if (!configSchemaEntry) return null;

  const isEmptySchema = configSchemaEntry.type !== 'schema';
  if (isEmptySchema) {
    return buildOpenStandaloneFileContent(target);
  }

  const rawSchema = configSchemaEntry.schema as SchemaDefinition;
  const pascalName = toPascalCase(target.name);
  const interfaceName = `${pascalName}Props`;

  const nestedInterfaces: InterfaceAccumulator = [];
  const markerRefs = new Set<string>();

  const topExtendsNames: string[] = [];
  const baseImports = new Set<string>();
  for (const baseRef of rawSchema.extends ?? []) {
    const stub = globalStubs.get(baseRef);
    if (stub) {
      topExtendsNames.push(stub.stubName);
      baseImports.add(stub.stubName);
    }
  }

  const ownVars = (() => {
    const raw = rawSchema.config_vars ?? {};
    if (topExtendsNames.length === 0) return raw;
    const inheritedKeys = new Set<string>();
    for (const baseRef of rawSchema.extends ?? []) {
      const refDef = registry.get(baseRef);
      if (refDef) {
        for (const k of Object.keys(mergeExtends(refDef, registry))) inheritedKeys.add(k);
      }
    }
    return Object.fromEntries(Object.entries(raw).filter(([k]) => !inheritedKeys.has(k)));
  })();
  const members = Object.keys(ownVars).length > 0
    ? buildInterfaceBody(ownVars, pascalName, nestedInterfaces, markerRefs, registry, target.name)
    : [];
  const specialTypes = [...new Set([
    ...collectSpecialPropTypesFromMembers(members),
    ...collectSpecialPropTypesFromNested(nestedInterfaces),
  ])];

  const mergedVarsForMarker = mergeExtends(rawSchema, registry);
  const ownClass = findOwnClass(mergedVarsForMarker);
  const ownMarker = ownClass ? cppClassToMarkerName(ownClass) : null;
  if (ownMarker) markerRefs.add(ownMarker);

  // ── Build AST statements ──────────────────────────────────────────────────
  const statements: ts.Statement[] = [];

  // Imports
  const typesImports = [
    'ComponentProps',
    'Pin',
    ...specialTypes,
    'TriggerHandler',
    ...(markerRefs.size > 0 ? ['RefProp'] : []),
  ];
  statements.push(importTypeDecl(typesImports, '../../types'));
  if (baseImports.size > 0) {
    statements.push(importTypeDecl([...baseImports], '../bases'));
  }
  if (markerRefs.size > 0) {
    statements.push(importTypeDecl([...markerRefs], '../markers'));
  }

  // Nested interfaces
  for (const ni of nestedInterfaces) {
    statements.push(interfaceDecl(ni.name, ni.members, { exported: true }));
  }

  // Main props interface
  statements.push(interfaceDecl(interfaceName, members, {
    exported: true,
    extends: topExtendsNames.length > 0 ? topExtendsNames : undefined,
  }));

  // JSX augmentation
  const cpt = ownMarker ? componentPropsType(ownMarker) : componentPropsType();
  statements.push(globalJsxAugmentation([{
    tagName: target.name,
    type: intersectionType([typeRef(interfaceName), cpt]),
  }]));

  const printed = printStatements(statements);
  return addFileHeader(printed, [
    `AUTO-GENERATED — DO NOT EDIT.`,
    `Regenerate with: pnpm codegen`,
  ]);
}

// ────────────────────────────────────────────────────────────────────────────
// Platform union file generation
// ────────────────────────────────────────────────────────────────────────────

/**
 * Build the content of a generated TypeScript file for one ESPHome platform.
 *
 * The file exports a single discriminated union type, e.g.:
 *
 *   export type BinarySensorProps =
 *     | BinarySensorBaseProps & { platform: 'gpio' } & GpioProps
 *     | BinarySensorBaseProps & { platform: 'analog_threshold' } & AnalogThresholdProps
 *     | ...;
 *
 * And registers the JSX element:
 *
 *   binary_sensor: BinarySensorProps & BaseProps;
 *
 * All nested and per-component interfaces are file-internal (not exported) to
 * avoid barrel-level naming conflicts when the same component name appears under
 * multiple platforms (e.g. "template" under both alarm_control_panel and climate).
 */
function buildPlatformFileContent(
  platformName: string,
  platformEntry: ComponentEntry | null,
  components: PlatformComponent[],
  platformUrl: string,
  registry: SchemaRegistry,
  globalStubs: Map<string, ExtendsStub>,
): string | null {
  if (components.length === 0) return null;

  const platformPascal = toPascalCase(platformName);
  const unionTypeName = `${platformPascal}Props`;

  // ── Platform base props ───────────────────────────────────────────────────
  const namedSchemaDef = (() => {
    const candidate = `${platformName}._${platformName.toUpperCase()}_SCHEMA`;
    return registry.get(candidate) ?? null;
  })();
  const platConfigSchema = platformEntry?.schemas?.CONFIG_SCHEMA;
  const platRawSchema: SchemaDefinition | null = namedSchemaDef
    ?? (platConfigSchema?.type === 'schema' ? (platConfigSchema.schema as SchemaDefinition) : null);

  const platBaseRef = namedSchemaDef
    ? `${platformName}._${platformName.toUpperCase()}_SCHEMA`
    : null;

  const allNested: InterfaceAccumulator = [];
  const markerRefs = new Set<string>();
  const baseImports = new Set<string>();

  const baseExtendsNames: string[] = [];
  if (platRawSchema) {
    for (const baseRef of platRawSchema.extends ?? []) {
      const stub = globalStubs.get(baseRef);
      if (stub) {
        baseExtendsNames.push(stub.stubName);
        baseImports.add(stub.stubName);
      }
    }
  }
  const platOwnVars = (() => {
    const raw = platRawSchema?.config_vars ?? {};
    if (!platRawSchema || baseExtendsNames.length === 0) return raw;

    const inheritedKeys = new Set<string>();
    for (const baseRef of platRawSchema.extends ?? []) {
      const refDef = registry.get(baseRef);
      if (refDef) {
        for (const key of Object.keys(mergeExtends(refDef, registry))) inheritedKeys.add(key);
      }
    }

    return Object.fromEntries(Object.entries(raw).filter(([key]) => !inheritedKeys.has(key)));
  })();
  // Compute the platform base class once — used as fallback for per-component markers.
  // Check own config_vars first to avoid the mergeExtends Object.assign overwrite bug.
  const platBaseClass = platRawSchema
    ? (findOwnClass(platRawSchema.config_vars ?? {})
       ?? findOwnClass(mergeExtends(platRawSchema, registry)))
    : null;
  const hasPlatformBase = platRawSchema != null
    && (Object.keys(platOwnVars).length > 0 || baseExtendsNames.length > 0);
  const baseInterfaceName = `${platformPascal}BaseProps`;
  const baseMembers = Object.keys(platOwnVars).length > 0
    ? buildInterfaceBody(platOwnVars, platformPascal, allNested, markerRefs, registry, platformName)
    : [];

  // ── Per-component interfaces ──────────────────────────────────────────────

  interface PlatComponentInterface {
    componentName: string;
    interfaceName: string;
    members: ts.TypeElement[];
    ownMarker: string | null;
    extendsNames: string[];
    typedDiscriminant?: { camelKey: string; value: string };
  }

  const componentInterfaces: PlatComponentInterface[] = [];

  for (const comp of components) {
    const configSchema = comp.entry?.schemas?.CONFIG_SCHEMA;
    const compPascal = toPascalCase(comp.name);

    if (configSchema?.type === 'typed') {
      const typed = configSchema as unknown as {
        typed_key: string;
        types: Record<string, SchemaDefinition>;
      };
      const camelKey = toCamelCase(typed.typed_key);

      for (const [variantName, variantDef] of Object.entries(typed.types)) {
        const variantPascal = `${compPascal}${toPascalCase(variantName)}`;

        const variantExtendsNames: string[] = [];
        for (const baseRef of variantDef.extends ?? []) {
          if (baseRef === platBaseRef) continue;
          const stub = globalStubs.get(baseRef);
          if (stub) {
            variantExtendsNames.push(stub.stubName);
            baseImports.add(stub.stubName);
          }
        }

        const variantOwnVars = (() => {
          const raw = variantDef.config_vars ?? {};
          if (variantExtendsNames.length === 0) return raw;
          const inheritedKeys = new Set<string>();
          for (const baseRef of variantDef.extends ?? []) {
            if (baseRef === platBaseRef) continue;
            const refDef = registry.get(baseRef);
            if (refDef) {
              for (const k of Object.keys(mergeExtends(refDef, registry))) inheritedKeys.add(k);
            }
          }
          return Object.fromEntries(Object.entries(raw).filter(([k]) => !inheritedKeys.has(k)));
        })();
        const members = Object.keys(variantOwnVars).length > 0
          ? buildInterfaceBody(variantOwnVars, variantPascal, allNested, markerRefs, registry, platformName)
          : [];

        const variantClass = resolvePlatformMarkerClass(variantDef, platBaseClass);
        const variantMarker = variantClass ? cppClassToMarkerName(variantClass) : null;
        if (variantMarker) markerRefs.add(variantMarker);

        componentInterfaces.push({
          componentName: comp.name,
          interfaceName: `${variantPascal}Props`,
          members,
          ownMarker: variantMarker,
          extendsNames: variantExtendsNames,
          typedDiscriminant: { camelKey, value: variantName },
        });
      }
      continue;
    }

    const compRawSchema = resolveConfigSchema(configSchema);

    const compExtendsNames: string[] = [];
    for (const baseRef of compRawSchema?.extends ?? []) {
      if (baseRef === platBaseRef) continue;
      const stub = globalStubs.get(baseRef);
      if (stub) {
        compExtendsNames.push(stub.stubName);
        baseImports.add(stub.stubName);
      }
    }

    const compOwnVars = (() => {
      const raw = compRawSchema?.config_vars ?? {};
      if (compExtendsNames.length === 0) return raw;
      const inheritedKeys = new Set<string>();
      for (const baseRef of compRawSchema?.extends ?? []) {
        if (baseRef === platBaseRef) continue;
        const refDef = registry.get(baseRef);
        if (refDef) {
          for (const k of Object.keys(mergeExtends(refDef, registry))) inheritedKeys.add(k);
        }
      }
      return Object.fromEntries(Object.entries(raw).filter(([k]) => !inheritedKeys.has(k)));
    })();
    const members = Object.keys(compOwnVars).length > 0
      ? buildInterfaceBody(compOwnVars, compPascal, allNested, markerRefs, registry, platformName)
      : [];

    const compOwnClass = resolvePlatformMarkerClass(compRawSchema, platBaseClass);
    const compOwnMarker = compOwnClass ? cppClassToMarkerName(compOwnClass) : null;
    if (compOwnMarker) markerRefs.add(compOwnMarker);

    componentInterfaces.push({
      componentName: comp.name,
      interfaceName: `${compPascal}Props`,
      members,
      ownMarker: compOwnMarker,
      extendsNames: compExtendsNames,
    });
  }

  const specialTypes = [...new Set([
    ...collectSpecialPropTypesFromMembers(baseMembers),
    ...componentInterfaces.flatMap((ci) => collectSpecialPropTypesFromMembers(ci.members)),
    ...collectSpecialPropTypesFromNested(allNested),
  ])];

  // ── Build AST statements ──────────────────────────────────────────────────
  const statements: ts.Statement[] = [];

  // Imports
  const typesImports = [
    'ComponentProps',
    'Pin',
    ...specialTypes,
    'TriggerHandler',
    ...(markerRefs.size > 0 ? ['RefProp'] : []),
  ];
  statements.push(importTypeDecl(typesImports, '../../types'));
  if (baseImports.size > 0) {
    statements.push(importTypeDecl([...baseImports], '../bases'));
  }
  if (markerRefs.size > 0) {
    statements.push(importTypeDecl([...markerRefs], '../markers'));
  }

  // Nested interfaces (file-internal, not exported)
  for (const ni of allNested) {
    statements.push(interfaceDecl(ni.name, ni.members));
  }

  // Platform base interface
  if (hasPlatformBase) {
    statements.push(interfaceDecl(baseInterfaceName, baseMembers, {
      extends: baseExtendsNames.length > 0 ? baseExtendsNames : undefined,
    }));
  }

  // Per-component interfaces
  for (const ci of componentInterfaces) {
    const shouldEmit = ci.members.length > 0 || ci.extendsNames.length > 0;
    if (shouldEmit) {
      statements.push(interfaceDecl(ci.interfaceName, ci.members, {
        extends: ci.extendsNames.length > 0 ? ci.extendsNames : undefined,
      }));
    }
  }

  // Discriminated union type
  const unionMembers: ts.TypeNode[] = componentInterfaces.map((ci) => {
    const hasInterface = ci.members.length > 0 || ci.extendsNames.length > 0;
    const parts: ts.TypeNode[] = [];

    if (hasPlatformBase) parts.push(typeRef(baseInterfaceName));

    // Discriminant: { platform: 'name' } or { platform: 'name', dacType: 'variant' }
    const discriminantMembers: ts.TypeElement[] = [
      propSig('platform', stringLiteralType(ci.componentName), false),
    ];
    if (ci.typedDiscriminant) {
      discriminantMembers.push(
        propSig(ci.typedDiscriminant.camelKey, stringLiteralType(ci.typedDiscriminant.value), false),
      );
    }
    parts.push(typeLiteral(discriminantMembers));

    if (hasInterface) parts.push(typeRef(ci.interfaceName));

    const cpt = ci.ownMarker ? componentPropsType(ci.ownMarker) : componentPropsType();
    parts.push(cpt);

    return intersectionType(parts);
  });

  statements.push(typeAliasDecl(unionTypeName, unionType(unionMembers), true));

  // JSX augmentation
  statements.push(globalJsxAugmentation([{
    tagName: platformName,
    type: typeRef(unionTypeName),
  }]));

  const printed = printStatements(statements);
  return addFileHeader(printed, [
    `AUTO-GENERATED — DO NOT EDIT.`,
    `Regenerate with: pnpm codegen`,
  ]);
}

// ────────────────────────────────────────────────────────────────────────────
// Extends resolution helpers
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
function flattenTypedSchema(
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
interface ExtendsStub {
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
function resolveStub(
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
function collectExtendsRefs(
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
function buildBasesFileContent(
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
  const typesImports = ['Pin', ...specialTypes, 'TriggerHandler', ...(markerRefs.size > 0 ? ['RefProp'] : [])];
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

// ────────────────────────────────────────────────────────────────────────────
// Own-class helper
// ────────────────────────────────────────────────────────────────────────────

/**
 * Find the C++ class of the component's own primary ID field.
 * Prefers `key === 'GeneratedID'` entries (the component's own identity) over
 * other `id_type`-bearing fields (which may be references to sub-components
 * like zigbee_binary_sensor or mqtt_id).
 * Skips C++ primitives (uint8_t, etc.) since they aren't valid marker types.
 */
function findOwnClass(configVars: Record<string, SchemaConfigVar>): string | null {
  // First pass: look for an explicit GeneratedID field — this is the canonical identity.
  for (const varDef of Object.values(configVars)) {
    if (varDef.key === 'GeneratedID' && varDef.type !== 'use_id'
        && varDef.id_type?.class && !CPP_PRIMITIVE_TO_TS.has(varDef.id_type.class)) {
      return varDef.id_type.class;
    }
  }
  // Second pass: fall back to any field that carries id_type (some schemas use
  // 'Required' or 'Optional' instead of 'GeneratedID' for the identity field).
  for (const varDef of Object.values(configVars)) {
    if (varDef.id_type != null && varDef.type !== 'use_id'
        && varDef.id_type.class && !CPP_PRIMITIVE_TO_TS.has(varDef.id_type.class)) {
      return varDef.id_type.class;
    }
  }
  return null;
}

/**
 * Resolve the marker class for a platform component.  Checks the component's
 * *own* config_vars first (no merge) to avoid the `mergeExtends` field-overwrite
 * bug where a later extends entry (e.g. zigbee base) overwrites the platform
 * base's GeneratedID.  Falls back to `platformBaseClass` when the component's
 * own schema doesn't carry a GeneratedID.
 */
function resolvePlatformMarkerClass(
  compSchema: SchemaDefinition | null,
  platformBaseClass: string | null,
): string | null {
  if (compSchema) {
    const ownClass = findOwnClass(compSchema.config_vars ?? {});
    if (ownClass) return ownClass;
  }
  return platformBaseClass;
}

// ────────────────────────────────────────────────────────────────────────────
// Barrel generation
// ────────────────────────────────────────────────────────────────────────────

/**
 * Build the top-level generated/index.ts barrel that re-exports every
 * generated file. Receives the list of written output paths relative to
 * GENERATED_DIR so the import specifiers are correct.
 */
function buildBarrel(writtenPaths: string[]): string {
  const statements: ts.Statement[] = [];

  // Derive import specifiers from absolute paths
  const specs = writtenPaths
    .map((p) => {
      const rel = path.relative(GENERATED_DIR, p).replace(/\\/g, '/').replace(/\.ts$/, '.js');
      return `./${rel}`;
    })
    .sort();

  for (const spec of specs) {
    statements.push(exportStarDecl(spec));
  }
  statements.push(exportStarDecl('./bases.js'));
  statements.push(exportStarDecl('./markers.js'));
  statements.push(exportStarDecl('./registry.js'));

  const printed = printStatements(statements);
  return addFileHeader(printed, [
    `AUTO-GENERATED — DO NOT EDIT.`,
    `Regenerate with: pnpm codegen`,
  ]);
}

// ────────────────────────────────────────────────────────────────────────────
// Registry generation
// ────────────────────────────────────────────────────────────────────────────

interface RegistryEntry {
  /** Top-level YAML key (e.g. "wifi", "sensor", "alarm_control_panel") */
  yamlKey: string;
}

/**
 * Emit src/generated/registry.ts — a map from JSX tag name → YAML metadata.
 * The compiler imports this to know how to serialise each element.
 */
function buildRegistry(entries: Map<string, RegistryEntry>): string {
  const statements: ts.Statement[] = [];

  // Interface
  statements.push(interfaceDecl('ESPHomeElementMeta', [
    addJsDoc(
      propSig('yamlKey', keyword('string'), false),
      ['Top-level YAML key (e.g. "wifi", "sensor", "alarm_control_panel").'],
    ),
  ], { exported: true }));

  // Const
  const sorted = [...entries.entries()].sort(([a], [b]) => a.localeCompare(b));
  const registryConst = addJsDoc(
    constExport(
      'ESPHomeRegistry',
      readonlyType(recordType(keyword('string'), typeRef('ESPHomeElementMeta'))),
      sorted.map(([tag, meta]) => ({
        key: tag,
        value: objectLiteral([{ key: 'yamlKey', value: meta.yamlKey }]),
      })),
    ),
    [
      'Maps every JSX intrinsic element tag name to its ESPHome YAML metadata.',
      '',
      '- Standalone: wifi   → { yamlKey: \'wifi\' }',
      '- Platform:   sensor → { yamlKey: \'sensor\' }',
      '',
      'For platform elements the `platform` prop on the JSX element carries the',
      'component name (e.g. <sensor platform="dht">) so no separate field is needed.',
    ],
  );
  statements.push(registryConst);

  const printed = printStatements(statements);
  return addFileHeader(printed, [
    `AUTO-GENERATED — DO NOT EDIT.`,
    `Regenerate with: pnpm codegen`,
  ]);
}

// ────────────────────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────────────────────

async function run(): Promise<void> {
  // ── Phase 1: Read root schema from local cache ─────────────────────────────
  if (!fs.existsSync(SCHEMAS_DIR)) {
    throw new Error(
      `Schema directory not found: ${SCHEMAS_DIR}\n` +
      `Run 'pnpm codegen:schemas' first to fetch schemas.`,
    );
  }

  console.log(`Reading root schema from ${SCHEMAS_DIR}/esphome.json ...`);
  const rootRaw = readLocalSchema('esphome');
  if (!rootRaw) {
    throw new Error(
      `Root schema not found: ${SCHEMAS_DIR}/esphome.json\n` +
      `Run 'pnpm codegen:schemas' first to fetch schemas.`,
    );
  }
  const root = rootRaw as unknown as RootSchema;

  const platformNames = new Set(Object.keys(root.core?.platforms ?? {}));
  const topLevelComponents = root.core?.components ?? {};

  console.log(`  Platforms: ${platformNames.size}`);
  console.log(`  Top-level components: ${Object.keys(topLevelComponents).length}`);

  // ── Phase 2: Read platform schemas to discover platform-specific components
  const platformTargets: SchemaTarget[] = [...platformNames].map((name) => ({
    name,
    url: `local://${name}.json`,
    isPlatform: true,
  }));

  console.log(`\nReading ${platformTargets.length} platform schemas...`);
  const platformFetched = readLocalSchemas(platformTargets);

  // Build a map of platform name → resolved ComponentEntry for base-props extraction
  const platformEntryMap = new Map<string, ComponentEntry | null>();
  for (const [platformTarget, raw] of platformFetched) {
    if (!raw) {
      platformEntryMap.set(platformTarget.name, null);
      continue;
    }
    const resolved = resolveEntry(raw, platformTarget);
    platformEntryMap.set(platformTarget.name, resolved?.entry ?? null);
  }

  // ── Phase 3: Build the full component target list ──────────────────────────
  const componentTargets = new Map<string, SchemaTarget>();

  componentTargets.set('esphome', {
    name: 'esphome',
    url: `local://esphome.json`,
    isPlatform: false,
  });

  for (const [name] of Object.entries(topLevelComponents)) {
    if (name === 'esphome') continue;
    // All core.components entries are top-level standalone elements.
    // `dependencies` expresses a "requires" constraint, NOT a platform ownership
    // relationship. True platform sub-components are discovered below from each
    // platform JSON's own `components` dict.
    componentTargets.set(name, {
      name,
      url: `local://${name}.json`,
      isPlatform: false,
    });
  }

  // Discover platform-specific components from each platform's own components dict
  // (e.g. sensor.json exposes sensor.components.dht → fetch dht.json)
  for (const [platformTarget, rawJson] of platformFetched) {
    if (!rawJson) continue;
    const platformEntry = rawJson[platformTarget.name] as
      | (ComponentEntry & { components?: Record<string, unknown> })
      | undefined;
    if (!platformEntry?.components) continue;
    for (const compName of Object.keys(platformEntry.components)) {
      if (!componentTargets.has(compName)) {
        componentTargets.set(compName, {
          name: compName,
          url: `local://${compName}.json`,
          isPlatform: false,
          platform: platformTarget.name,
        });
      }
    }
  }

  const allComponentTargets = [...componentTargets.values()];
  console.log(`  Total component targets: ${allComponentTargets.length}`);

  // ── Phase 4: Read all component schemas ──────────────────────────────────
  console.log(`\nReading ${allComponentTargets.length} component schemas...`);
  const componentFetched = readLocalSchemas(allComponentTargets);

  // ── Phase 5: Group resolved components into platform buckets or standalone ─
  const platformComponentMap = new Map<string, PlatformComponent[]>();
  const standaloneTargets: Array<{ target: SchemaTarget; entry: ComponentEntry }> = [];
  let skipped = 0;

  for (const target of allComponentTargets) {
    const raw = componentFetched.get(target);
    if (!raw) {
      // If the target belongs to a platform (e.g. mipi_dsi listed in display.json)
      // but its own schema file returned 404, inject a placeholder with an empty
      // CONFIG_SCHEMA so that the platform file still emits a union member.
      if (target.platform) {
        const placeholderEntry: ComponentEntry = {
          schemas: { CONFIG_SCHEMA: { type: 'schema', schema: { config_vars: {} } } },
        };
        const list = platformComponentMap.get(target.platform) ?? [];
        list.push({ name: target.name, entry: placeholderEntry, url: target.url });
        platformComponentMap.set(target.platform, list);
        console.log(`  Placeholder: ${target.name} (schema 404, parent: ${target.platform})`);
      } else {
        skipped++;
      }
      continue;
    }

    const resolved = resolveEntry(raw, target);
    if (!resolved) { skipped++; continue; }

    if (resolved.platform !== undefined) {
      const list = platformComponentMap.get(resolved.platform) ?? [];
      list.push({ name: resolved.elementName, entry: resolved.entry, url: target.url });
      platformComponentMap.set(resolved.platform, list);
    } else {
      standaloneTargets.push({
        target: { ...target, name: resolved.elementName },
        entry: resolved.entry,
      });
    }
  }

  // ── Phase 5b: Catch platform components missed by standalone deduplication ─
  //
  // Some components (e.g. 'esphome') are registered in componentTargets as
  // standalone (no platform) because they also have a root config. When such a
  // component also appears in a platform's components dict (e.g. ota.components
  // lists 'esphome'), the !componentTargets.has() guard prevents a second
  // platform-scoped registration. This pass re-resolves them with platform
  // context so the dotted-key lookup ('esphome.ota' in esphome.json) finds the
  // correct sub-schema.
  for (const [platformTarget, rawJson] of platformFetched) {
    if (!rawJson) continue;
    const outerEntry = rawJson[platformTarget.name] as
      | (ComponentEntry & { components?: Record<string, unknown> })
      | undefined;
    if (!outerEntry?.components) continue;

    const existing = platformComponentMap.get(platformTarget.name) ?? [];
    const existingNames = new Set(existing.map((c) => c.name));

    for (const compName of Object.keys(outerEntry.components)) {
      if (existingNames.has(compName)) continue;
      // Try to reuse already-fetched data with platform context injected.
      const compTarget = componentTargets.get(compName);
      if (!compTarget) continue;
      const compRaw = componentFetched.get(compTarget);
      if (!compRaw) continue;
      const resolved = resolveEntry(compRaw, { ...compTarget, platform: platformTarget.name });
      if (!resolved || resolved.platform === undefined) continue;
      existing.push({ name: compName, entry: resolved.entry, url: compTarget.url });
      platformComponentMap.set(platformTarget.name, existing);
    }
  }

  // ── Phase 6: Emit files ────────────────────────────────────────────────────
  const writtenPaths: string[] = [];
  const registry = new Map<string, RegistryEntry>();

  // ── Build schema registry for extends resolution ───────────────────────────
  const schemaRegistry = buildSchemaRegistry(root, platformFetched, componentFetched);
  console.log(`  Schema registry: ${schemaRegistry.size} named schemas`);

  // Clean out the generated directory before writing new content
  if (fs.existsSync(GENERATED_DIR)) {
    fs.rmSync(GENERATED_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(GENERATED_DIR, { recursive: true });
  fs.mkdirSync(COMPONENTS_DIR, { recursive: true });

  // ── Markers pre-pass: collect all C++ classes across every schema ──────────
  const allCppClasses = new Set<string>();
  const markerParentMap = new Map<string, string[]>();
  for (const { entry } of standaloneTargets) collectMarkerClasses(entry, allCppClasses, markerParentMap);
  for (const components of platformComponentMap.values()) {
    for (const comp of components) collectMarkerClasses(comp.entry, allCppClasses, markerParentMap);
  }
  for (const entry of platformEntryMap.values()) {
    if (entry) collectMarkerClasses(entry, allCppClasses, markerParentMap);
  }
  // Also include classes referenced in named schemas (for inherited fields).
  collectRegistryClasses(schemaRegistry, allCppClasses, markerParentMap);

  // ── Extract schema-defined actions ──────────────────────────────────────
  const { classActions, shortcomings } = extractSchemaActions(SCHEMAS_DIR, schemaRegistry);
  console.log(`  Schema actions: ${classActions.size} target classes, ${shortcomings.length} shortcomings`);

  // ── Build marker → action class map ───────────────────────────────────────
  const { markerClassMap, classBrandMap } = buildMarkerClassMap(
    allCppClasses, markerParentMap, new Set(classActions.keys()),
  );

  // ── Write markers (after action map so we can inject virtual brands) ──────
  // Build virtualBrands: for each marker with namespace-bridged action classes,
  // add the action class brands so InferActions<T> resolves at the type level.
  const virtualBrands = new Map<string, string[]>();
  for (const [markerName, actionClasses] of markerClassMap) {
    const extraBrands: string[] = [];
    for (const cls of actionClasses) {
      const brandName = classBrandMap.get(cls);
      if (brandName) extraBrands.push(brandName);
    }
    if (extraBrands.length > 0) virtualBrands.set(markerName, extraBrands);
  }

  const markersPath = path.join(GENERATED_DIR, 'markers.ts');
  fs.writeFileSync(
    markersPath,
    buildMarkersFileContent(allCppClasses, markerParentMap, virtualBrands),
    'utf8',
  );
  console.log(`  Markers → ${markersPath} (${allCppClasses.size} classes)`);

  // ── Bases pre-pass: collect all extends refs and build globalStubs ─────────
  const allExtendsRefs = new Set<string>();
  for (const { entry } of standaloneTargets) {
    const resolved = resolveConfigSchema(entry?.schemas?.CONFIG_SCHEMA);
    if (resolved) {
      collectExtendsRefs(resolved, schemaRegistry, allExtendsRefs);
    }
  }
  for (const components of platformComponentMap.values()) {
    for (const comp of components) {
      const resolved = resolveConfigSchema(comp.entry?.schemas?.CONFIG_SCHEMA);
      if (resolved) {
        collectExtendsRefs(resolved, schemaRegistry, allExtendsRefs);
      }
    }
  }
  for (const [platName, platEntry] of platformEntryMap) {
    // Platform base schema
    const namedDef = schemaRegistry.get(`${platName}._${platName.toUpperCase()}_SCHEMA`);
    if (namedDef) collectExtendsRefs(namedDef, schemaRegistry, allExtendsRefs);
    else {
      const resolved = resolveConfigSchema(platEntry?.schemas?.CONFIG_SCHEMA);
      if (resolved) {
        collectExtendsRefs(resolved, schemaRegistry, allExtendsRefs);
      }
    }
  }

  // Build global stubs for all collected refs
  const globalStubs = new Map<string, ExtendsStub>();
  const globalUsedNames = new Map<string, string>();
  const basesNested: InterfaceAccumulator = [];
  const basesMarkerRefs = new Set<string>();
  for (const ref of allExtendsRefs) {
    resolveStub(ref, schemaRegistry, basesNested, basesMarkerRefs, globalStubs, globalUsedNames);
  }

  const basesPath = path.join(GENERATED_DIR, 'bases.ts');
  fs.writeFileSync(basesPath, buildBasesFileContent(globalStubs, basesNested, basesMarkerRefs), 'utf8');
  console.log(`  Bases   → ${basesPath} (${globalStubs.size} shared interfaces)`);

  // Emit one flat file per platform containing a discriminated union
  for (const [platformName, components] of platformComponentMap) {
    const platformEntry = platformEntryMap.get(platformName) ?? null;
    const platformUrl = `local://${platformName}.json`;
    const content = buildPlatformFileContent(platformName, platformEntry, components, platformUrl, schemaRegistry, globalStubs);
    if (!content) { skipped++; continue; }
    const outPath = path.join(COMPONENTS_DIR, `${platformName}.ts`);
    fs.writeFileSync(outPath, content, 'utf8');
    writtenPaths.push(outPath);
    registry.set(platformName, { yamlKey: platformName });
  }

  // Emit standalone component files (esphome, wifi, api, logger, etc.)
  for (const { target, entry } of standaloneTargets) {
    // LVGL: use dedicated codegen that reads the extracted lvgl-schema.json
    if (target.name === 'lvgl') {
      const lvglSchemaPath = path.join(SCHEMAS_DIR, 'lvgl-schema.json');
      if (fs.existsSync(lvglSchemaPath)) {
        const content = buildLvglFileContent(lvglSchemaPath);
        const outPath = path.join(COMPONENTS_DIR, 'lvgl.ts');
        fs.writeFileSync(outPath, content, 'utf8');
        writtenPaths.push(outPath);
        registry.set('lvgl', { yamlKey: 'lvgl' });
        console.log(`  LVGL    → ${outPath} (custom codegen)`);
        continue;
      }
      // Fall through to generic codegen if lvgl-schema.json is missing
    }

    const content = buildStandaloneFileContent(target, entry, schemaRegistry, globalStubs);
    if (!content) { skipped++; continue; }
    const outPath = path.join(COMPONENTS_DIR, `${target.name}.ts`);
    fs.writeFileSync(outPath, content, 'utf8');
    writtenPaths.push(outPath);
    registry.set(target.name, { yamlKey: target.name });
  }

  console.log(`  Generated: ${writtenPaths.length} file(s), skipped: ${skipped}`);

  // ── Registry ────────────────────────────────────────────────────────────────
  const registryPath = path.join(GENERATED_DIR, 'registry.ts');
  fs.writeFileSync(registryPath, buildRegistry(registry), 'utf8');
  console.log(`  Registry → ${registryPath} (${registry.size} entries)`);

  // ── Actions ────────────────────────────────────────────────────────────────
  const actionsPath = path.join(GENERATED_DIR, 'actions.ts');
  fs.writeFileSync(actionsPath, generateActionsFile({ classActions, markerClassMap, classBrandMap }), 'utf8');
  writtenPaths.push(actionsPath);
  console.log(`  Actions → ${actionsPath} (${classActions.size} classes, ${markerClassMap.size} marker mappings)`);

  // ── Barrel ─────────────────────────────────────────────────────────────────
  const barrelPath = path.join(GENERATED_DIR, 'index.ts');
  fs.writeFileSync(barrelPath, buildBarrel(writtenPaths), 'utf8');
  console.log(`  Barrel  → ${barrelPath}`);

  console.log('\nCodegen complete.');
}

run().catch((err: unknown) => {
  console.error('Codegen failed:', err instanceof Error ? err.message : err);
  process.exit(1);
});
