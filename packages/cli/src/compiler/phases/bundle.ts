import * as esbuild from 'esbuild';
import * as path from 'path';
import { formatDiagnosticPath } from '../resolver/diagnostic-path.js';
import type { PhaseContext } from './types';

/**
 * Phase 2: Bundle
 *
 * Uses esbuild to bundle the pre-transformed files from the build directory
 * into a single CJS file. Both app code and source-mode library code have
 * already been transformed and written to disk under `<buildDir>/app/` and
 * `<buildDir>/node_modules/<pkg>/`. The latter layout means bare specifiers
 * for source-mode libraries resolve naturally via esbuild's normal node
 * resolution — no resolver plugin needed for the common case.
 *
 * A guard plugin verifies that any specifier that *should* resolve to a
 * source-mode library actually loads from `<buildDir>/node_modules/`, not
 * the real `node_modules/` tree, and fails the build with a clear error
 * otherwise.
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
    conditions: ['espcompose'],
    // Keep the SDK external — it will be require()'d from the host process
    external: ['@espcompose/core'],
    outfile: bundlePath,
    sourcemap: false,
    metafile: true,
    plugins: [sourceLibraryGuardPlugin(ctx)],
  });

  if (result.errors.length > 0) {
    // Rewrite build-dir paths to original locations before formatting.
    const rewritten = result.errors.map((err) => {
      if (!err.location) return err;
      return { ...err, location: { ...err.location, file: formatDiagnosticPath(ctx, err.location.file) } };
    });
    const messages = await esbuild.formatMessages(rewritten, { kind: 'error' });
    throw new Error(`Bundle failed:\n${messages.join('\n')}`);
  }
}

/**
 * Esbuild plugin: fails the build if a file under a registered source-mode
 * library is loaded from somewhere other than `<buildDir>/node_modules/`.
 *
 * This catches the case where the transform phase didn't see a library file
 * (e.g. it wasn't in the TypeScript program) and esbuild would silently
 * load the original from the real `node_modules/` tree — which, for source-
 * mode libraries that ship only `.ts(x)`, would either fail at parse or
 * load stale code.
 */
function sourceLibraryGuardPlugin(ctx: PhaseContext): esbuild.Plugin {
  return {
    name: 'espcompose-source-library-guard',
    setup(build) {
      build.onLoad({ filter: /\.(ts|tsx|js|jsx|mjs|cjs)$/ }, (args) => {
        const registry = ctx.registry;
        const buildDirWithSep = ctx.buildDir + path.sep;
        const buildLibsRoot = path.join(ctx.buildDir, 'node_modules') + path.sep;

        // Files loaded from inside the build directory are always OK —
        // they are the transformed copies that the transform phase wrote.
        if (args.path.startsWith(buildDirWithSep)) return null;

        // Case 1: the path matches a *registered* source-mode library but
        // is being loaded from outside the build directory. The transform
        // phase missed this file or the shim wasn't written.
        const lib = registry?.matchPath(args.path);
        if (lib) {
          return {
            errors: [{
              text:
                `ESPCompose source-mode library "${lib.packageName}" was loaded from ` +
                `"${args.path}" — expected the transformed copy under ` +
                `"${buildLibsRoot}${lib.packageName}/". This usually means the transform ` +
                `phase did not see this file (e.g. it was not in the TypeScript program).`,
            }],
          };
        }

        // Case 2: any .ts/.tsx file loaded from outside the build directory
        // is suspicious — it bypassed the transform phase entirely. The only
        // .ts(x) sources we should ever bundle are the ones written into
        // `<buildDir>/app/` and `<buildDir>/node_modules/<lib>/`. A .ts(x)
        // load from a real `node_modules/` path means a source-mode library
        // wasn't registered (e.g. the registry was empty or incomplete) and
        // would silently bundle untransformed source.
        if (/\.(ts|tsx)$/.test(args.path) && args.path.includes(`${path.sep}node_modules${path.sep}`)) {
          return {
            errors: [{
              text:
                `Untransformed TypeScript source loaded during bundling: "${args.path}". ` +
                `Only .ts/.tsx files transformed into "${buildDirWithSep}" may be bundled. ` +
                `This typically means a dependency declares an "espcompose" export condition ` +
                `but was not registered as a source-mode library — check that the project's ` +
                `package.json lists this dependency and that the registry build saw it.`,
            }],
          };
        }

        return null;
      });
    },
  };
}
