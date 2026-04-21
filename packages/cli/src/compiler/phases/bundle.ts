import * as esbuild from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';
import { LIBRARY_FORMAT_VERSION } from '../transform/format-version.js';
import type { PhaseContext } from './types';

/**
 * Phase 2: Bundle
 *
 * Uses esbuild to bundle the pre-transformed files from the build directory
 * into a single CJS file. Because the sources are real files on disk, esbuild
 * resolves imports normally — no load plugin needed.
 *
 * Also validates format versions of any ESPCompose libraries pulled into the bundle.
 */
export async function bundlePhase(ctx: PhaseContext): Promise<void> {
  if (!ctx.transformedEntry) {
    throw new Error('Bundle phase requires a transformed entry — run transform first.');
  }
  if (!ctx.bundlePath) {
    throw new Error('Bundle phase requires bundlePath on the context.');
  }
  const { bundlePath } = ctx;

  const result = await esbuild.build({
    entryPoints: [ctx.transformedEntry],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    target: 'node18',
    jsx: 'automatic',
    jsxDev: true,
    jsxImportSource: '@espcompose/core',
    // Keep the SDK external — it will be require()'d from the host process
    external: ['@espcompose/core'],
    outfile: bundlePath,
    sourcemap: false,
    metafile: true,
  });

  if (result.errors.length > 0) {
    const messages = await esbuild.formatMessages(result.errors, { kind: 'error' });
    throw new Error(`Bundle failed:\n${messages.join('\n')}`);
  }

  // Check format versions of any ESPCompose libraries pulled into the bundle.
  if (result.metafile) {
    validateBundledLibraryVersions(result.metafile, ctx.transformedEntry);
  }
}

/**
 * Scan esbuild metafile inputs for ESPCompose library format version markers.
 * Reads each resolved input file (outside the project's own source tree) and
 * checks for `__espcompose_format__` exports. Throws if any are incompatible.
 */
function validateBundledLibraryVersions(
  metafile: esbuild.Metafile,
  entryFile: string,
): void {
  const buildDir = path.dirname(path.resolve(entryFile));

  for (const inputPath of Object.keys(metafile.inputs)) {
    const absPath = path.resolve(inputPath);

    // Skip the project's own transformed sources
    if (absPath.startsWith(buildDir)) continue;
    if (!fs.existsSync(absPath)) continue;

    let content: string;
    try {
      content = fs.readFileSync(absPath, 'utf8');
    } catch {
      continue;
    }

    // Look for __espcompose_format__ assignments in the source
    const versionMatch = content.match(
      /(?:export\s+(?:const|var|let)\s+)?__espcompose_format__\s*=\s*(\d+)/,
    );
    if (!versionMatch) continue;

    const version = parseInt(versionMatch[1], 10);
    if (version !== LIBRARY_FORMAT_VERSION) {
      const libName = extractLibraryName(inputPath);
      throw new Error(
        `Library ${libName} was compiled with ESPCompose format v${version}, ` +
        `but this compiler requires format v${LIBRARY_FORMAT_VERSION}. ` +
        `Please rebuild the library with a compatible ESPCompose CLI version.`,
      );
    }
  }
}

/** Extract a human-readable library name from a node_modules path. */
function extractLibraryName(inputPath: string): string {
  const match = inputPath.match(/node_modules\/(@[^/]+\/[^/]+|[^/]+)/);
  return match ? match[1] : inputPath;
}
