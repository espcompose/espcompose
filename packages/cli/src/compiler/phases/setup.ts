import * as fs from 'fs';
import * as path from 'path';
import { buildSourceLibraryRegistry } from '../resolver/index.js';
import type { PhaseContext } from './types';

/**
 * Setup phase: Prepare the build directory and build the source-library registry.
 *
 * Force-cleans any existing build directory and creates a fresh one. Walks the
 * project's transitive dependencies once to identify ESPCompose source-mode
 * libraries (packages declaring an `espcompose` export condition), then writes
 * a minimal `package.json` shim under `<buildDir>/node_modules/<pkg>/` for each
 * library so that esbuild's normal node resolution can find the transformed
 * copies that the transform phase will write into the same directory.
 */
export function setupPhase(ctx: PhaseContext): void {
  if (!ctx.projectDir) {
    throw new Error(
      'Setup phase requires PhaseContext.projectDir — every compiler entry point must ' +
      'pass the project root so the source-mode library registry can be built from ' +
      'the project package.json. Missing projectDir would silently produce an empty ' +
      'registry and bypass library transforms.',
    );
  }
  if (fs.existsSync(ctx.buildDir)) {
    fs.rmSync(ctx.buildDir, { recursive: true, force: true });
  }
  fs.mkdirSync(ctx.buildDir, { recursive: true });

  ctx.registry = buildSourceLibraryRegistry(ctx.projectDir);
  ctx.pathMap = new Map();

  // For each source-mode library, write a minimal package.json shim under
  // <buildDir>/node_modules/<pkg>/ that mirrors the original `exports`
  // mapping but rewrites each `espcompose` target to the pre-transformed
  // file's relative path inside the shim. This lets esbuild resolve bare
  // specifiers (e.g. `@espcompose/ui`, `@espcompose/ui/hooks`) without a
  // custom resolver plugin.
  for (const lib of ctx.registry.libraries.values()) {
    const shimDir = path.join(ctx.buildDir, 'node_modules', lib.packageName);
    fs.mkdirSync(shimDir, { recursive: true });
    const exportsField: Record<string, string> = {};
    for (const [subpath, absSrc] of lib.entries) {
      const relFromLibRoot = path.relative(lib.rootDir, fs.realpathSync(absSrc));
      // The transform phase writes to <shimDir>/<relFromLibRoot>; the
      // exports map points to that location with a leading "./".
      exportsField[subpath] = './' + relFromLibRoot.split(path.sep).join('/');
    }
    const shimPkg = {
      name: lib.packageName,
      type: 'module',
      exports: exportsField,
    };
    fs.writeFileSync(path.join(shimDir, 'package.json'), JSON.stringify(shimPkg, null, 2), 'utf8');
  }
}
