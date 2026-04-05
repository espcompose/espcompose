import * as fs from 'fs';
import * as esbuild from 'esbuild';
import { LIBRARY_FORMAT_VERSION, FORMAT_VERSION_EXPORT } from '../transform/format-version.js';
import type { PhaseContext } from './types';

/**
 * Bundle phase (library pipeline): ESM bundle for distribution.
 *
 * 1. Injects the format version marker into the transformed entry file
 *    so the device bundler can detect incompatible libraries.
 * 2. Bundles all transformed sources into an ESM file via esbuild.
 *
 * Requires `ctx.transformedEntry` and `ctx.outDir` to be set.
 */
export async function bundleLibraryPhase(ctx: PhaseContext): Promise<void> {
  if (!ctx.transformedEntry) {
    throw new Error('Library bundle phase requires a transformed entry — run transform first.');
  }
  if (!ctx.outDir) {
    throw new Error('Library bundle phase requires outDir on the context.');
  }

  // Inject format version marker into the transformed entry file.
  // This must happen before esbuild so the marker is included in the bundle
  // and also visible to the DTS phase that reads from buildDir.
  const entryContent = fs.readFileSync(ctx.transformedEntry, 'utf8');
  fs.writeFileSync(
    ctx.transformedEntry,
    `export const ${FORMAT_VERSION_EXPORT} = ${LIBRARY_FORMAT_VERSION};\n` + entryContent,
  );

  // Clean output directory
  if (fs.existsSync(ctx.outDir)) {
    fs.rmSync(ctx.outDir, { recursive: true, force: true });
  }

  await esbuild.build({
    entryPoints: [ctx.transformedEntry],
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: 'es2022',
    jsx: 'automatic',
    jsxImportSource: '@espcompose/core',
    external: ['@espcompose/core'],
    outdir: ctx.outDir,
    sourcemap: false,
  });
}
