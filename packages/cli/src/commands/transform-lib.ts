import * as path from 'path';
import type { Command } from 'commander';
import { withErrorHandler } from '../utils';

export function registerTransformLibCommand(program: Command) {
  program
    .command('transform-lib [srcDir]')
    .description(
      'Pre-compile reactive expressions in a component library.\n' +
      'Runs the same AST transforms used for user projects, but writes\n' +
      'transformed TypeScript source files instead of bundling.\n' +
      'The library\'s own bundler (tsup, rollup, etc.) then compiles\n' +
      'the transformed sources into publishable JS.',
    )
    .option('--entry <file>', 'Entry .ts/.tsx file relative to srcDir', 'src/index.ts')
    .option('--outDir <dir>', 'Output directory for transformed sources', '.espcompose-build')
    .option('--tsconfig <file>', 'Path to tsconfig.json (default: auto-detect)')
    .action(withErrorHandler('Transform', async (srcDir?: string, opts?: { entry?: string; outDir?: string; tsconfig?: string }) => {
      const { transformLib } = await import('../transform-lib');
      const resolvedSrcDir = path.resolve(srcDir ?? '.');
      const entryFile = path.resolve(resolvedSrcDir, opts?.entry ?? 'src/index.ts');
      const sourceDir = path.dirname(entryFile);
      const outDir = path.resolve(resolvedSrcDir, opts?.outDir ?? '.espcompose-build');
      const tsconfigPath = opts?.tsconfig ? path.resolve(resolvedSrcDir, opts.tsconfig) : undefined;

      console.log(`Transforming library: ${sourceDir} → ${path.relative(resolvedSrcDir, outDir)}/`);
      const result = transformLib({ entryFile, sourceDir, outDir, tsconfigPath });
      console.log(`✓ ${result.filesWritten} file(s) written, ${result.filesTransformed} transformed`);
      if (result.diagnostics.length > 0) {
        for (const d of result.diagnostics) {
          const loc = d.file && d.line ? `${path.relative(process.cwd(), d.file)}:${d.line}` : 'unknown';
          console.warn(`  ⚠ ${loc} — ${d.message}`);
        }
      }
    }));
}
