#!/usr/bin/env node
/**
 * ESPHome schema fetcher — downloads JSON schemas from schema.esphome.io
 * and caches them locally in .cache/schemas/ for offline codegen.
 *
 * Also maintains a shallow clone of the ESPHome repo and a Python venv
 * for future LVGL-specific processing.
 *
 * Output:
 *   .cache/
 *     esphome/          ← shallow git clone at the pinned version tag
 *     venv/             ← dedicated Python venv with esphome installed
 *     schemas/          ← cached JSON schemas from schema.esphome.io
 *
 * Usage:
 *   pnpm codegen:schemas
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import type { RootSchema, ComponentEntry } from './schema-types.js';

// ────────────────────────────────────────────────────────────────────────────
// Paths
// ────────────────────────────────────────────────────────────────────────────

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');

const rootPkg = JSON.parse(
  fs.readFileSync(path.join(REPO_ROOT, 'package.json'), 'utf-8'),
);
const ESPHOME_VERSION: string = rootPkg.esphome?.version;
if (!ESPHOME_VERSION) {
  throw new Error('Missing esphome.version in root package.json');
}

const CACHE_DIR = path.join(REPO_ROOT, '.cache');
const ESPHOME_REPO_DIR = path.join(CACHE_DIR, 'esphome');
const VENV_DIR = path.join(CACHE_DIR, 'venv');
const SCHEMAS_DIR = path.join(CACHE_DIR, 'schemas');
const VERSION_FILE = path.join(SCHEMAS_DIR, '.version');

const ESPHOME_REPO_URL = 'https://github.com/esphome/esphome.git';

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

function run(cmd: string, opts?: { cwd?: string }): void {
  console.log(`  $ ${cmd}`);
  execSync(cmd, { stdio: 'inherit', cwd: opts?.cwd ?? REPO_ROOT });
}

function runCapture(cmd: string, opts?: { cwd?: string }): string {
  return execSync(cmd, { encoding: 'utf-8', cwd: opts?.cwd ?? REPO_ROOT }).trim();
}

// ────────────────────────────────────────────────────────────────────────────
// Version check — skip everything if schemas are already built for this version
// ────────────────────────────────────────────────────────────────────────────

function isUpToDate(): boolean {
  if (!fs.existsSync(VERSION_FILE)) return false;
  const cached = fs.readFileSync(VERSION_FILE, 'utf-8').trim();
  return cached === ESPHOME_VERSION;
}

// ────────────────────────────────────────────────────────────────────────────
// Step 1: Clone or update ESPHome repo
// ────────────────────────────────────────────────────────────────────────────

function ensureRepo(): void {
  console.log(`\n── Step 1: ESPHome repo (tag ${ESPHOME_VERSION}) ──`);

  fs.mkdirSync(CACHE_DIR, { recursive: true });

  const gitDir = path.join(ESPHOME_REPO_DIR, '.git');
  if (fs.existsSync(gitDir)) {
    // Check if already at the correct tag
    try {
      const currentTag = runCapture(
        'git describe --tags --exact-match HEAD 2>/dev/null',
        { cwd: ESPHOME_REPO_DIR },
      );
      if (currentTag === ESPHOME_VERSION) {
        console.log(`  Already at tag ${ESPHOME_VERSION}, skipping clone.`);
        return;
      }
    } catch {
      // Not on an exact tag — fall through to re-clone
    }
    console.log(`  Repo exists but at wrong version, re-cloning...`);
    fs.rmSync(ESPHOME_REPO_DIR, { recursive: true, force: true });
  }

  run(
    `git clone --depth 1 --branch ${ESPHOME_VERSION} ${ESPHOME_REPO_URL} ${ESPHOME_REPO_DIR}`,
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Step 2: Create or reuse Python venv and install ESPHome
// ────────────────────────────────────────────────────────────────────────────

function ensureVenv(): void {
  console.log(`\n── Step 2: Python venv ──`);

  const venvPython = path.join(VENV_DIR, 'bin', 'python');
  const venvPip = path.join(VENV_DIR, 'bin', 'pip');

  if (!fs.existsSync(venvPython)) {
    console.log(`  Creating venv at ${VENV_DIR}...`);
    run(`python3 -m venv ${VENV_DIR}`);
  }

  // Check if esphome is already installed at the correct version
  try {
    const installed = runCapture(`${venvPip} show esphome 2>/dev/null | grep ^Version | awk '{print $2}'`);
    if (installed === ESPHOME_VERSION) {
      console.log(`  ESPHome ${ESPHOME_VERSION} already installed in venv, skipping.`);
      return;
    }
  } catch {
    // Not installed — fall through
  }

  console.log(`  Installing ESPHome from local clone...`);
  run(`${venvPip} install --quiet "${ESPHOME_REPO_DIR}"`);
}

// ────────────────────────────────────────────────────────────────────────────
// Step 3: Fetch schemas from schema.esphome.io and cache locally
// ────────────────────────────────────────────────────────────────────────────

const SCHEMA_BASE = `https://schema.esphome.io/${ESPHOME_VERSION}`;
const FETCH_BATCH_SIZE = 10;

async function fetchSchema(name: string): Promise<Record<string, unknown> | null> {
  const url = `${SCHEMA_BASE}/${name}.json`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as Record<string, unknown>;
  } catch (err) {
    console.warn(`  WARN: could not fetch ${url}: ${err instanceof Error ? err.message : err}`);
    return null;
  }
}

async function fetchAndSave(name: string): Promise<Record<string, unknown> | null> {
  const data = await fetchSchema(name);
  if (data) {
    fs.writeFileSync(
      path.join(SCHEMAS_DIR, `${name}.json`),
      JSON.stringify(data, null, 2),
      'utf-8',
    );
  }
  return data;
}

async function batchFetchAndSave(names: string[]): Promise<Map<string, Record<string, unknown> | null>> {
  const results = new Map<string, Record<string, unknown> | null>();
  for (let i = 0; i < names.length; i += FETCH_BATCH_SIZE) {
    const batch = names.slice(i, i + FETCH_BATCH_SIZE);
    const resolved = await Promise.all(batch.map((n) => fetchAndSave(n)));
    batch.forEach((n, idx) => results.set(n, resolved[idx]));
    const pct = Math.min(i + FETCH_BATCH_SIZE, names.length);
    process.stdout.write(`\r  Fetched ${pct}/${names.length} schemas...`);
  }
  process.stdout.write('\n');
  return results;
}

async function fetchAndCacheSchemas(): Promise<void> {
  console.log(`\n── Step 3: Fetch schemas from ${SCHEMA_BASE} ──`);

  fs.mkdirSync(SCHEMAS_DIR, { recursive: true });

  // 3a. Fetch and cache the root schema
  console.log(`  Fetching root schema (esphome.json)...`);
  const rootData = await fetchAndSave('esphome');
  if (!rootData) {
    throw new Error(`Failed to fetch root schema from ${SCHEMA_BASE}/esphome.json`);
  }
  const root = rootData as unknown as RootSchema;

  // 3b. Discover platform names and fetch platform schemas
  const platformNames = Object.keys(root.core?.platforms ?? {});
  console.log(`  Platforms: ${platformNames.length}`);
  console.log(`  Fetching platform schemas...`);
  const platformResults = await batchFetchAndSave(platformNames);

  // 3c. Discover all component names from core.components + platform.components
  const componentNames = new Set<string>();
  for (const name of Object.keys(root.core?.components ?? {})) {
    if (name !== 'esphome') componentNames.add(name);
  }
  for (const [platformName, rawJson] of platformResults) {
    if (!rawJson) continue;
    const platformEntry = rawJson[platformName] as
      | (ComponentEntry & { components?: Record<string, unknown> })
      | undefined;
    if (platformEntry?.components) {
      for (const compName of Object.keys(platformEntry.components)) {
        componentNames.add(compName);
      }
    }
  }

  // Remove names we already fetched (platforms + esphome)
  for (const p of platformNames) componentNames.delete(p);
  componentNames.delete('esphome');

  console.log(`  Components to fetch: ${componentNames.size}`);
  console.log(`  Fetching component schemas...`);
  await batchFetchAndSave([...componentNames]);
}

// ────────────────────────────────────────────────────────────────────────────
// Step 4: Extract LVGL schema from ESPHome Python source
// ────────────────────────────────────────────────────────────────────────────

function extractLvglSchema(): void {
  console.log(`\n── Step 4: Extract LVGL schema ──`);

  const venvPython = path.join(VENV_DIR, 'bin', 'python');
  const extractScript = path.join(REPO_ROOT, 'scripts', 'codegen', 'extract_lvgl_schema.py');
  const outputFile = path.join(SCHEMAS_DIR, 'lvgl-schema.json');

  if (!fs.existsSync(extractScript)) {
    throw new Error(`LVGL extraction script not found: ${extractScript}`);
  }

  run(`${venvPython} ${extractScript} --esphome-path ${ESPHOME_REPO_DIR} --output ${outputFile}`);

  if (!fs.existsSync(outputFile)) {
    throw new Error(`LVGL schema extraction failed: ${outputFile} not produced`);
  }

  const data = JSON.parse(fs.readFileSync(outputFile, 'utf-8'));
  const widgetCount = Object.keys(data.widgets ?? {}).length;
  const styleCount = Object.keys(data.style_props ?? {}).length;
  console.log(`  ✓ lvgl-schema.json: ${widgetCount} widgets, ${styleCount} style props`);
}

// ────────────────────────────────────────────────────────────────────────────
// Step 5: Validate output and write version marker
// ────────────────────────────────────────────────────────────────────────────

function validateAndMark(): void {
  console.log(`\n── Step 5: Validate ──`);

  const esphomeJson = path.join(SCHEMAS_DIR, 'esphome.json');
  if (!fs.existsSync(esphomeJson)) {
    throw new Error(`Schema fetch failed: ${esphomeJson} not found`);
  }

  // Validate it's parseable JSON
  JSON.parse(fs.readFileSync(esphomeJson, 'utf-8'));

  const jsonFiles = fs.readdirSync(SCHEMAS_DIR).filter((f) => f.endsWith('.json'));
  console.log(`  Cached ${jsonFiles.length} schema files.`);

  // Check LVGL specifically
  const lvglJson = path.join(SCHEMAS_DIR, 'lvgl.json');
  if (fs.existsSync(lvglJson)) {
    console.log(`  ✓ lvgl.json present`);
  } else {
    console.warn(`  ⚠ lvgl.json not found — LVGL schemas may be incomplete`);
  }

  const lvglSchema = path.join(SCHEMAS_DIR, 'lvgl-schema.json');
  if (fs.existsSync(lvglSchema)) {
    console.log(`  ✓ lvgl-schema.json present (extracted from Python source)`);
  } else {
    console.warn(`  ⚠ lvgl-schema.json not found — LVGL types will be untyped`);
  }

  // Write version marker
  fs.writeFileSync(VERSION_FILE, ESPHOME_VERSION, 'utf-8');
  console.log(`  Version marker written: ${ESPHOME_VERSION}`);
}

// ────────────────────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log(`ESPHome schema fetcher — target version: ${ESPHOME_VERSION}`);

  if (isUpToDate()) {
    console.log(`Schemas already up-to-date for ${ESPHOME_VERSION}, skipping.`);
    return;
  }

  ensureRepo();
  ensureVenv();
  await fetchAndCacheSchemas();
  extractLvglSchema();
  validateAndMark();
  console.log(`\nDone. Schemas are in ${SCHEMAS_DIR}`);
}

main().catch((err: unknown) => {
  console.error('Schema fetch failed:', err instanceof Error ? err.message : err);
  process.exit(1);
});
