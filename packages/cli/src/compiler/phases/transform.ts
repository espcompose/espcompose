import { writeTransformedFiles } from '../transform/index.js';
import type { PhaseContext } from './types';

/**
 * Phase 1: Transform
 *
 * Applies TypeScript AST passes to every app source file and to every file
 * belonging to a registered ESPCompose source-mode library, writing the
 * transformed output to the build directory:
 *
 *   - app-source                  → `<buildDir>/app/<rel-to-projectDir>`
 *   - espcompose-source-library   → `<buildDir>/node_modules/<pkgName>/<rel-to-pkgRoot>`
 *
 * The `<buildDir>/node_modules/<pkg>/` layout means esbuild's normal node
 * resolution finds the transformed copy without any custom resolver plugin.
 *
 * Stores the transformed entry path and the original→build path map on the
 * context for downstream phases (bundle, diagnostics).
 */
export function transformPhase(ctx: PhaseContext): void {
  if (!ctx.program) {
    throw new Error('Transform phase requires a ts.Program — run type-check first.');
  }
  if (!ctx.registry) {
    throw new Error('Transform phase requires a SourceLibraryRegistry — run setup first.');
  }
  if (!ctx.pathMap) ctx.pathMap = new Map();

  const { entryFile: transformedEntry, diagnostics, filesWritten, filesTransformed } = writeTransformedFiles(
    ctx.program,
    ctx.entryFile,
    ctx.buildDir,
    ctx.registry,
    ctx.pathMap,
  );

  if (diagnostics.length > 0) {
    const formatted = diagnostics.map((d) => {
      const loc = d.line != null ? `:${d.line}:${d.character ?? 1}` : '';
      return `  transform ${d.file}${loc} - ${d.message}`;
    });
    throw new Error(
      `Script transformation failed with ${diagnostics.length} error(s):\n${formatted.join('\n')}`,
    );
  }

  ctx.transformedEntry = transformedEntry;
  ctx.transformStats = { filesWritten, filesTransformed };
}
