import * as path from 'path';
import type { Command } from 'commander';
import { resolvePaths, transpileProject, extractPassthroughArgs, withErrorHandler } from '../utils';

export function registerBuildCommand(program: Command) {
  program
    .command('build [projectDir]')
    .description(
      'Transpile and compile firmware via `esphome compile`. ' +
      'Generates a firmware binary without uploading to the device.\n' +
      'With --library, builds a component library for distribution instead.',
    )
    .allowUnknownOption()
    .option('--debug', 'Keep .espcompose-build/ intermediate files for inspection')
    .option('--library', 'Build as a distributable component library (ESM + .d.ts)')
    .option('--entry <file>', 'Entry file relative to projectDir (library only)', 'src/index.ts')
    .option('--outDir <dir>', 'Output directory relative to projectDir (library only)', 'dist')
    .option('--tsconfig <file>', 'Path to tsconfig.json (library only, default: auto-detect)')
    .action(withErrorHandler('Build', async (projectDir?: string, opts?: {
      debug?: boolean;
      library?: boolean;
      entry?: string;
      outDir?: string;
      tsconfig?: string;
    }) => {
      if (opts?.library) {
        const { buildLibrary } = await import('../compiler/compiler');
        const resolvedRoot = path.resolve(projectDir ?? '.');
        console.log(`Building library in ${resolvedRoot}`);
        const result = await buildLibrary({
          rootDir: resolvedRoot,
          entry: opts.entry,
          outDir: opts.outDir,
          tsconfig: opts.tsconfig,
          debug: opts.debug,
        });
        console.log(`✓ ${result.filesWritten} file(s) processed, ${result.filesTransformed} transformed`);
        console.log(`✓ Bundled ESM + DTS → ${opts.outDir ?? 'dist'}/`);
      } else {
        const { build } = await import('../compiler');
        const { createEsphomeTarget, esphomeCompile } = await import('@espcompose/target-esphome');
        const { resolvedDir, yamlPath } = resolvePaths(projectDir);
        const extraArgs = extractPassthroughArgs();
        await transpileProject(resolvedDir, yamlPath, build, createEsphomeTarget, { debug: opts?.debug });
        console.log('Compiling firmware…');
        await esphomeCompile(yamlPath, extraArgs);
      }
    }));
}
