import * as fs from 'fs';
import type { PhaseContext } from './types';

/**
 * Teardown phase: Clean up the build directory.
 *
 * Removes the intermediate build directory unless `ctx.debug` is true,
 * in which case the directory is preserved for inspection.
 */
export function teardownPhase(ctx: PhaseContext): void {
  if (!ctx.debug && fs.existsSync(ctx.buildDir)) {
    fs.rmSync(ctx.buildDir, { recursive: true, force: true });
  }
}
