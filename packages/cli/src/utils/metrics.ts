import type { CompileResult } from '../compiler/compiler';

/**
 * Print a human-readable breakdown of compiler phase timings to stdout.
 * Called when the `--metrics` flag is passed to a CLI command.
 */
export function printMetrics(result: CompileResult): void {
  const { phaseTiming } = result;
  if (phaseTiming.length === 0) return;

  const total = phaseTiming.reduce((sum, t) => sum + t.durationMs, 0);

  console.log('\n── Build Metrics ──');
  const rows = phaseTiming.map((t) => ({
    Phase: t.phase,
    'Duration (ms)': Math.round(t.durationMs),
    '%': ((t.durationMs / total) * 100).toFixed(1),
  }));
  console.table(rows);
  console.log(`Total: ${Math.round(total)}ms`);
}
