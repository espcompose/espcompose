import type { CompileResult } from '../compiler/compiler';

/**
 * Print a human-readable breakdown of compiler phase timings to stdout.
 * Called when the `--metrics` flag is passed to a CLI command.
 */
export function printMetrics(result: CompileResult): void {
  const { phaseTiming } = result;
  if (phaseTiming.length === 0) return;

  // Wall-clock total: for parallel phases, count only the longest in the group.
  let wallClock = 0;
  let i = 0;
  while (i < phaseTiming.length) {
    if (phaseTiming[i].parallel) {
      // Collect consecutive parallel entries (they belong to the same group)
      let groupMax = 0;
      while (i < phaseTiming.length && phaseTiming[i].parallel) {
        groupMax = Math.max(groupMax, phaseTiming[i].durationMs);
        i++;
      }
      wallClock += groupMax;
    } else {
      wallClock += phaseTiming[i].durationMs;
      i++;
    }
  }

  console.log('\n── Build Metrics ──');
  const rows = phaseTiming.map((t) => ({
    Phase: t.parallel ? `${t.phase} ∥` : t.phase,
    'Duration (ms)': Math.round(t.durationMs),
    '%': ((t.durationMs / wallClock) * 100).toFixed(1),
  }));
  console.table(rows);

  const processTotal = Math.round(performance.now());
  const startup = processTotal - Math.round(wallClock);
  console.log(`Pipeline: ${Math.round(wallClock)}ms | Startup: ${startup}ms | Total: ${processTotal}ms`);
}
