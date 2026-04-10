/**
 * Entity domain metadata codegen — entry script
 *
 * Reads entity-domains.json, validates against JSON Schema, and runs
 * each generator to produce output files in consuming packages.
 *
 * Usage:
 *   pnpm codegen:domains
 *   tsx metadata/generate.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';
import { generators } from './generators/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');

// ── Load and validate ────────────────────────────────────────────────────────

const dataPath = path.join(__dirname, 'entity-domains.json');
const schemaPath = path.join(__dirname, 'entity-domains.schema.json');

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

if (!validate(data)) {
  console.error('❌ entity-domains.json failed schema validation:');
  for (const err of validate.errors ?? []) {
    console.error(`  ${err.instancePath || '/'}: ${err.message}`);
  }
  process.exit(1);
}

console.log(`✓ Validated entity-domains.json (${Object.keys(data.domains).length} domains)`);

// ── Run generators ───────────────────────────────────────────────────────────

for (const generator of generators) {
  const result = generator(data.domains, REPO_ROOT);
  const relPath = path.relative(REPO_ROOT, result.outputPath);
  console.log(`✓ ${relPath} (${result.linesWritten} lines)`);
}

console.log('Done.');
