import type { PhaseContext } from '../types';

/**
 * Emit phase: Lower IR to target-specific output.
 *
 * Requires `ctx.executeResult`, `ctx.projectDir`, `ctx.outDir`, and `ctx.target` to be set.
 */
export async function emitPhase(ctx: PhaseContext): Promise<void> {
  if (!ctx.executeResult) {
    throw new Error('Emit phase requires an ExecuteResult — run the execute phase first.');
  }
  if (!ctx.target || !ctx.projectDir || !ctx.outDir) {
    throw new Error('Emit phase requires target, projectDir, and outDir on the context.');
  }

  await ctx.target.emit({
    ...ctx.executeResult,
    projectDir: ctx.projectDir,
    outDir: ctx.outDir,
    sourceDir: ctx.sourceDir,
  });
}
