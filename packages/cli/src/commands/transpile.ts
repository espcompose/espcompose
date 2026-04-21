import * as path from 'path';
import type { Command } from 'commander';
import { resolvePaths, transpileProject, printMetrics, withErrorHandler } from '../utils';

export function registerTranspileCommand(program: Command) {
  program
    .command('transpile [projectDir]')
    .description(
      'Transpile a TSX project to ESPHome YAML, writing output to ' +
      '<projectDir>/.espcompose/esphome.yaml. Defaults to the current working directory.\n' +
      'With --library, runs AST transforms on library source files without bundling.',
    )
    .option('--debug', 'Keep .espcompose-build/ intermediate files for inspection')
    .option('--metrics', 'Print compiler phase timing breakdown after transpile')
    .option('--wireframe', 'Enable colored outline overlays on all widgets for layout visualization')
    .option('--library', 'Run AST transforms on a component library (no bundle/emit)')
    .option('--entry <file>', 'Entry file relative to projectDir (library only)', 'src/index.ts')
    .option('--outDir <dir>', 'Output directory for transformed sources (library only)', '.espcompose-build')
    .option('--tsconfig <file>', 'Path to tsconfig.json (library only, default: auto-detect)')
    .action(withErrorHandler('Transpile', async (projectDir?: string, opts?: {
      debug?: boolean;
      metrics?: boolean;
      wireframe?: boolean;
      library?: boolean;
      entry?: string;
      outDir?: string;
      tsconfig?: string;
    }) => {
      if (opts?.library) {
        const { transpileLibrary } = await import('../compiler/compiler');
        const resolvedRoot = path.resolve(projectDir ?? '.');
        console.log(`Transforming library in ${resolvedRoot}`);
        const result = await transpileLibrary({
          rootDir: resolvedRoot,
          entry: opts.entry,
          outDir: opts.outDir,
          tsconfig: opts.tsconfig,
          debug: opts.debug,
        });
        console.log(`✓ ${result.filesWritten} file(s) written, ${result.filesTransformed} transformed`);
      } else {
        const { build } = await import('../compiler');
        const { createEsphomeTarget } = await import('@espcompose/esphome-target');
        const { resolvedDir, yamlPath } = resolvePaths(projectDir);
        const result = await transpileProject(resolvedDir, yamlPath, build, createEsphomeTarget, { debug: opts?.debug, wireframe: opts?.wireframe });
        if (opts?.metrics) printMetrics(result);
      }
    }));
}
