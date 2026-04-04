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
import type { RootSchema, ComponentEntry } from './schema-types.js';
import type { InterfaceAccumulator } from './type-mapper.js';
import {
  buildSchemaRegistry,
  readLocalSchema,
  readLocalSchemas,
  resolveEntry,
  type SchemaTarget,
  type PlatformComponent,
} from './schema-registry.js';
import { buildLvglFileContent } from './lvgl-codegen.js';
import { generateActionsFile } from './action-codegen.js';
import { extractSchemaActions } from './schema-action-extractor.js';
import {
  collectMarkerClasses, collectRegistryClasses,
  buildMarkerClassMap, buildMarkersFileContent,
} from './marker-builder.js';
import {
  resolveConfigSchema, collectExtendsRefs, resolveStub,
  buildBasesFileContent, type ExtendsStub,
} from './extends-resolver.js';
import { buildStandaloneFileContent, buildPlatformFileContent } from './file-generators.js';
import {
  printStatements, addFileHeader, addJsDoc,
  keyword, typeRef,
  readonlyType, recordType,
  propSig,
  interfaceDecl,
  exportStarDecl, constExport, objectLiteral,
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

const GENERATED_DIR = path.resolve(__dirname, '../../packages/core/src/generated');
const COMPONENTS_DIR = path.join(GENERATED_DIR, 'components');

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
  const rootRaw = readLocalSchema(SCHEMAS_DIR, 'esphome');
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
  const platformFetched = readLocalSchemas(SCHEMAS_DIR, platformTargets);

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
  const componentFetched = readLocalSchemas(SCHEMAS_DIR, allComponentTargets);

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
