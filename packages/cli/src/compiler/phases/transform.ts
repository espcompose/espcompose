import { writeTransformedFiles } from '../transform/index.js';
import type { PhaseContext } from './types';

/**
 * Phase 1: Transform
 *
 * Applies TypeScript AST passes to every user source file and writes the
 * transformed output to the build directory, preserving directory structure.
 * Stores the transformed entry file path on the context for the bundle phase.
 */
export function transformPhase(ctx: PhaseContext): void {
  if (!ctx.program) {
    throw new Error('Transform phase requires a ts.Program — run type-check first.');
  }

  const { entryFile: transformedEntry, diagnostics, filesWritten, filesTransformed, semanticRegistries } = writeTransformedFiles(
    ctx.program,
    ctx.entryFile,
    ctx.sourceDir,
    ctx.buildDir,
    { debug: ctx.debug },
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
  ctx.semanticAnalysis = semanticRegistries;
}
