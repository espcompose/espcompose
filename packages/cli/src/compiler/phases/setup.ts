import * as fs from 'fs';
import type { PhaseContext } from './types';

/**
 * Setup phase: Prepare the build directory.
 *
 * Force-cleans any existing build directory and creates a fresh one.
 * This runs before any compilation phases to ensure a clean slate.
 */
export function setupPhase(ctx: PhaseContext): void {
  if (fs.existsSync(ctx.buildDir)) {
    fs.rmSync(ctx.buildDir, { recursive: true, force: true });
  }
  fs.mkdirSync(ctx.buildDir, { recursive: true });
}
