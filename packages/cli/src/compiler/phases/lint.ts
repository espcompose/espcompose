import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'node:url';
import { Worker } from 'node:worker_threads';
import { logError } from '../../utils/log.js';
import type { PhaseContext } from './types';
import type { LintWorkerResult } from './lint-worker.js';

/**
 * Resolve the lint-worker script path.
 *
 * In the source tree (dev/test) both files are siblings under
 * `src/compiler/phases/`, so the sibling path works directly.
 *
 * After tsup bundles, this module may land in a flat chunk at `dist/`
 * while the worker entry preserves its directory structure at
 * `dist/compiler/phases/lint-worker.js`. We detect which layout we're
 * in by checking whether the sibling file exists.
 */
function resolveLintWorkerPath(): string {
  const thisDir = path.dirname(fileURLToPath(import.meta.url));
  // Sibling path — works in source tree and when the chunk is co-located
  const sibling = path.join(thisDir, 'lint-worker.js');
  if (fs.existsSync(sibling)) return sibling;
  // Bundled layout — chunk is at dist root, worker is nested
  return path.join(thisDir, 'compiler', 'phases', 'lint-worker.js');
}

const workerPath = resolveLintWorkerPath();

/**
 * Phase 0.5: Lint
 *
 * Spawns the ESLint run in a worker thread so it can execute on a separate
 * CPU core in parallel with type-check. The worker loads its own ESLint
 * instance and typescript-eslint project service — no shared state needed.
 *
 * Throws on lint errors. Warnings are printed to stderr but do not fail.
 */
export async function lintPhase(ctx: PhaseContext): Promise<void> {
  const { errorCount, output } = await new Promise<LintWorkerResult>(
    (resolve, reject) => {
      const worker = new Worker(workerPath, {
        workerData: { entryFile: ctx.entryFile },
      });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Lint worker exited with code ${code}`));
        }
      });
    },
  );

  if (output) {
    logError(output);
  }

  if (errorCount > 0) {
    throw new Error(`ESLint found ${errorCount} error(s).`);
  }
}
