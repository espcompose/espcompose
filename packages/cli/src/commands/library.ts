import * as path from 'path';
import type { Command } from 'commander';
import { withErrorHandler } from '../utils';

export function registerLibraryCommand(program: Command) {
  program
    .command('library [rootDir]')
    .description(
      'Build a component library for distribution.\n' +
      'Transforms reactive expressions, bundles CJS + ESM via esbuild,\n' +
      'and emits .d.ts declarations — no extra config or bundler needed.',
    )
    .option('--entry <file>', 'Entry file relative to rootDir', 'src/index.ts')
    .option('--outDir <dir>', 'Output directory relative to rootDir', 'dist')
    .option('--tsconfig <file>', 'Path to tsconfig.json (default: auto-detect)')
    .action(withErrorHandler('Library build', async (rootDir?: string, opts?: { entry?: string; outDir?: string; tsconfig?: string }) => {
      const { buildLibrary } = await import('../transform-lib');
      const resolvedRoot = path.resolve(rootDir ?? '.');
      console.log(`Building library in ${resolvedRoot}`);
      const result = await buildLibrary({
        rootDir: resolvedRoot,
        entry: opts?.entry,
        outDir: opts?.outDir,
        tsconfig: opts?.tsconfig,
      });
      const t = result.transform;
      console.log(`✓ ${t.filesWritten} file(s) processed, ${t.filesTransformed} transformed`);
      console.log(`✓ Bundled CJS + ESM + DTS → ${opts?.outDir ?? 'dist'}/`);
      if (t.diagnostics.length > 0) {
        for (const d of t.diagnostics) {
          const loc = d.file && d.line ? `${path.relative(process.cwd(), d.file)}:${d.line}` : 'unknown';
          console.warn(`  ⚠ ${loc} — ${d.message}`);
        }
      }
    }));
}
