/**
 * Library contract snapshot tests.
 *
 * Validates that the transform pipeline produces stable, versioned output
 * by snapshotting the transformed source. Any change to the transformer's
 * serialization format will cause these snapshots to update, making
 * protocol changes explicit and reviewable.
 *
 * These tests use transformLib() on fixture directories to capture the
 * full transform pipeline including format version stamping.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { transformLib } from '../../transform-lib.js';
import { LIBRARY_FORMAT_VERSION, FORMAT_VERSION_EXPORT } from './format-version.js';
import {
  CompiledReactiveSchema,
  SlottedReactiveSchema,
} from './schemas.js';

const fixturesDir = path.resolve(__dirname, '..', '..', '__fixtures__', 'library-contract');

/**
 * Find the balanced `{…}` block starting at `startIndex` (which must be a `{`).
 * Handles quoted strings so that braces inside string literals are ignored.
 */
function extractBalancedObject(source: string, startIndex: number): string | null {
  if (source[startIndex] !== '{') return null;
  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = startIndex; i < source.length; i++) {
    const ch = source[i];
    if (escape) { escape = false; continue; }
    if (ch === '\\' && inString) { escape = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === '{') depth++;
    else if (ch === '}') { depth--; if (depth === 0) return source.slice(startIndex, i + 1); }
  }
  return null;
}

/**
 * Extract all __espcompose.compiled({...}) metadata objects from transformed source.
 * Returns parsed objects by quoting bare JS keys into valid JSON.
 */
function extractCompiledCalls(source: string): unknown[] {
  const results: unknown[] = [];
  const prefix = '__espcompose.compiled(';
  let idx = 0;
  while ((idx = source.indexOf(prefix, idx)) !== -1) {
    const objStart = idx + prefix.length;
    const obj = extractBalancedObject(source, objStart);
    if (obj) {
      const json = obj.replace(/([{,])(\w+):/g, '$1"$2":');
      results.push(JSON.parse(json));
      idx = objStart + obj.length;
    } else {
      idx = objStart;
    }
  }
  return results;
}

/**
 * Extract all __espcompose.slotted({...}, ...) metadata objects from transformed source.
 */
function extractSlottedCalls(source: string): unknown[] {
  const results: unknown[] = [];
  const prefix = '__espcompose.slotted(';
  let idx = 0;
  while ((idx = source.indexOf(prefix, idx)) !== -1) {
    const objStart = idx + prefix.length;
    const obj = extractBalancedObject(source, objStart);
    if (obj) {
      const json = obj.replace(/([{,])(\w+):/g, '$1"$2":');
      results.push(JSON.parse(json));
      idx = objStart + obj.length;
    } else {
      idx = objStart;
    }
  }
  return results;
}

describe('Library Contract Snapshots', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'espcompose-contract-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  describe('reactive-fixture', () => {
    it('transformed output matches snapshot', () => {
      const fixtureDir = path.join(fixturesDir, 'reactive-fixture');
      const entryFile = path.join(fixtureDir, 'src', 'index.tsx');
      const sourceDir = path.join(fixtureDir, 'src');
      const outDir = path.join(tmpDir, 'reactive-out');
      const tsconfigPath = path.join(fixtureDir, 'tsconfig.json');

      const result = transformLib({
        entryFile,
        sourceDir,
        outDir,
        tsconfigPath,
      });

      expect(result.filesWritten).toBeGreaterThan(0);

      // Read the transformed entry file
      const outputFile = path.join(outDir, 'index.tsx');
      expect(fs.existsSync(outputFile)).toBe(true);
      const output = fs.readFileSync(outputFile, 'utf8');

      // Verify format version marker is present
      expect(output).toContain(`${FORMAT_VERSION_EXPORT} = ${LIBRARY_FORMAT_VERSION}`);

      // Snapshot the full transformed output
      expect(output).toMatchSnapshot('reactive-fixture transformed output');
    });

    it('emitted reactive metadata conforms to schema', () => {
      const fixtureDir = path.join(fixturesDir, 'reactive-fixture');
      const entryFile = path.join(fixtureDir, 'src', 'index.tsx');
      const sourceDir = path.join(fixtureDir, 'src');
      const outDir = path.join(tmpDir, 'reactive-schema');
      const tsconfigPath = path.join(fixtureDir, 'tsconfig.json');

      transformLib({ entryFile, sourceDir, outDir, tsconfigPath });
      const output = fs.readFileSync(path.join(outDir, 'index.tsx'), 'utf8');

      const compiledMetas = extractCompiledCalls(output);
      for (const meta of compiledMetas) {
        expect(CompiledReactiveSchema.safeParse(meta).success).toBe(true);
      }

      const slottedMetas = extractSlottedCalls(output);
      for (const meta of slottedMetas) {
        expect(SlottedReactiveSchema.safeParse(meta).success).toBe(true);
      }

      // At least one compiled or slotted call should exist
      expect(compiledMetas.length + slottedMetas.length).toBeGreaterThan(0);
    });
  });

  describe('script-fixture', () => {
    it('transformed output matches snapshot', () => {
      const fixtureDir = path.join(fixturesDir, 'script-fixture');
      const entryFile = path.join(fixtureDir, 'src', 'index.tsx');
      const sourceDir = path.join(fixtureDir, 'src');
      const outDir = path.join(tmpDir, 'script-out');
      const tsconfigPath = path.join(fixtureDir, 'tsconfig.json');

      const result = transformLib({
        entryFile,
        sourceDir,
        outDir,
        tsconfigPath,
      });

      expect(result.filesWritten).toBeGreaterThan(0);

      const outputFile = path.join(outDir, 'index.tsx');
      expect(fs.existsSync(outputFile)).toBe(true);
      const output = fs.readFileSync(outputFile, 'utf8');

      // Verify format version marker is present
      expect(output).toContain(`${FORMAT_VERSION_EXPORT} = ${LIBRARY_FORMAT_VERSION}`);

      // Snapshot the full transformed output
      expect(output).toMatchSnapshot('script-fixture transformed output');
    });

    it('emitted script metadata contains expected shapes', () => {
      const fixtureDir = path.join(fixturesDir, 'script-fixture');
      const entryFile = path.join(fixtureDir, 'src', 'index.tsx');
      const sourceDir = path.join(fixtureDir, 'src');
      const outDir = path.join(tmpDir, 'script-schema');
      const tsconfigPath = path.join(fixtureDir, 'tsconfig.json');

      transformLib({ entryFile, sourceDir, outDir, tsconfigPath });
      const output = fs.readFileSync(path.join(outDir, 'index.tsx'), 'utf8');

      // Script fixture should produce __compiledActions or __compiledScript
      const hasActions = output.includes('__compiledActions');
      const hasScript = output.includes('__compiledScript');
      expect(hasActions || hasScript).toBe(true);
    });
  });

  describe('format version injection', () => {
    it('injects version into the entry file only', () => {
      const fixtureDir = path.join(fixturesDir, 'reactive-fixture');
      const entryFile = path.join(fixtureDir, 'src', 'index.tsx');
      const sourceDir = path.join(fixtureDir, 'src');
      const outDir = path.join(tmpDir, 'version-check');
      const tsconfigPath = path.join(fixtureDir, 'tsconfig.json');

      transformLib({ entryFile, sourceDir, outDir, tsconfigPath });

      const entryOutput = fs.readFileSync(path.join(outDir, 'index.tsx'), 'utf8');
      // The format version export should be at the top of the file
      expect(entryOutput.startsWith(`export const ${FORMAT_VERSION_EXPORT} = ${LIBRARY_FORMAT_VERSION};`)).toBe(true);
    });

    it('version matches LIBRARY_FORMAT_VERSION constant', () => {
      const fixtureDir = path.join(fixturesDir, 'reactive-fixture');
      const entryFile = path.join(fixtureDir, 'src', 'index.tsx');
      const sourceDir = path.join(fixtureDir, 'src');
      const outDir = path.join(tmpDir, 'version-value');
      const tsconfigPath = path.join(fixtureDir, 'tsconfig.json');

      transformLib({ entryFile, sourceDir, outDir, tsconfigPath });

      const entryOutput = fs.readFileSync(path.join(outDir, 'index.tsx'), 'utf8');
      const match = entryOutput.match(new RegExp(`${FORMAT_VERSION_EXPORT}\\s*=\\s*(\\d+)`));
      expect(match).not.toBeNull();
      expect(parseInt(match![1], 10)).toBe(LIBRARY_FORMAT_VERSION);
    });
  });
});
