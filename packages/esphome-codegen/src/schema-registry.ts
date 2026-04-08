/**
 * Schema registry builder — reads cached JSON schemas and builds a lookup map
 * for resolving cross-file `extends` references during code generation.
 */

import * as fs from 'fs';
import * as path from 'path';
import type {
  SchemaDefinition,
  ConfigSchemaEntry,
  ComponentEntry,
  RootSchema,
  SchemaRegistry,
} from './schema-types.js';

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

/** Describes a single schema fetch target. */
export interface SchemaTarget {
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

/**
 * Each per-component JSON file has one outer wrapper key (the component's own
 * name, possibly dotted like "dht.sensor") around the actual ComponentEntry.
 * We return the raw object so callers can extract the correct inner entry.
 */
export type RawSchemaFile = Record<string, ComponentEntry>;

/** One component discovered under a platform, ready for codegen. */
export interface PlatformComponent {
  /** Resolved component name (e.g. "gpio", "dht") */
  name: string;
  /** The fetched ComponentEntry */
  entry: ComponentEntry;
  /** Original fetch URL (for the header comment) */
  url: string;
}

// ────────────────────────────────────────────────────────────────────────────
// Schema registry builder
// ────────────────────────────────────────────────────────────────────────────

/**
 * Build a SchemaRegistry from the root esphome.json, all platform JSONs,
 * and all component JSONs read from the local schema cache.
 * Registers every named schema found under each source's `schemas` key.
 */
export function buildSchemaRegistry(
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
// Local schema readers
// ────────────────────────────────────────────────────────────────────────────

/**
 * Read a single schema JSON file from the local .cache/schemas/ directory.
 * Returns null if the file does not exist.
 */
export function readLocalSchema(schemasDir: string, name: string): RawSchemaFile | null {
  const filePath = path.join(schemasDir, `${name}.json`);
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as RawSchemaFile;
  } catch {
    return null;
  }
}

/**
 * Read all schema files for the given targets from the local cache.
 */
export function readLocalSchemas(
  schemasDir: string,
  targets: SchemaTarget[],
): Map<SchemaTarget, RawSchemaFile | null> {
  const results = new Map<SchemaTarget, RawSchemaFile | null>();
  for (const target of targets) {
    results.set(target, readLocalSchema(schemasDir, target.name));
  }
  console.log(`  Read ${targets.length} schema files from ${schemasDir}`);
  return results;
}

// ────────────────────────────────────────────────────────────────────────────
// Entry resolution
// ────────────────────────────────────────────────────────────────────────────

/**
 * Given the raw JSON file (wrapper + inner entry) and the original target,
 * resolve the actual ComponentEntry plus the true element name and platform.
 *
 * Rules:
 *  - Key "wifi"        → elementName="wifi",  platform=undefined
 *  - Key "dht.sensor"  → elementName="dht",   platform="sensor"
 *  - Falls back to first key in the file if the expected pattern isn't found
 */
export function resolveEntry(
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
