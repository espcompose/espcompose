import { writeIRDebugFiles } from './ir-debug.js';
import type { PhaseContext } from '../types';

/**
 * Emit phase: Lower IR to target-specific output.
 *
 * Requires `ctx.ir`, `ctx.projectDir`, `ctx.outDir`, and `ctx.target` to be set.
 * When `ctx.debug` is true, also writes IR debug files to the build directory.
 */
export async function emitPhase(ctx: PhaseContext): Promise<void> {
  if (!ctx.ir) {
    throw new Error('Emit phase requires a SemanticIR — run the execute phase first.');
  }
  if (!ctx.target || !ctx.projectDir || !ctx.outDir) {
    throw new Error('Emit phase requires target, projectDir, and outDir on the context.');
  }

  // Write IR debug files when --debug is set
  if (ctx.debug) {
    const htmlPath = writeIRDebugFiles(ctx.ir, ctx.buildDir);
    console.log(`IR debug viewer: ${htmlPath}`);
  }

  await ctx.target.emit({
    ir: ctx.ir,
    projectDir: ctx.projectDir,
    outDir: ctx.outDir,
    sourceDir: ctx.sourceDir,
    secrets: ctx.secrets,
    popups: ctx.popups,
  });
}
