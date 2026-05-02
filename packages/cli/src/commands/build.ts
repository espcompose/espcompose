import type { Command } from 'commander';
import { resolvePaths, transpileProject, extractPassthroughArgs, printMetrics, withErrorHandler } from '../utils';

export function registerBuildCommand(program: Command) {
  program
    .command('build [projectDir]')
    .description(
      'Transpile and compile firmware via `esphome compile`. ' +
      'Generates a firmware binary without uploading to the device.',
    )
    .allowUnknownOption()
    .option('--debug', 'Keep .espcompose-build/ intermediate files for inspection')
    .option('--metrics', 'Print compiler phase timing breakdown after build')
    .option('--wireframe', 'Enable colored outline overlays on all widgets for layout visualization')
    .option('--dump-ir', 'Write semantic-ir.json debug dump to the output directory')
    .action(withErrorHandler('Build', async (projectDir?: string, opts?: {
      debug?: boolean;
      metrics?: boolean;
      wireframe?: boolean;
      dumpIr?: boolean;
    }) => {
      const { build } = await import('../compiler');
      const { createEsphomeTarget, esphomeCompile } = await import('@espcompose/esphome-target');
      const { resolvedDir, yamlPath } = resolvePaths(projectDir);
      const extraArgs = extractPassthroughArgs();
      const result = await transpileProject(resolvedDir, yamlPath, build, createEsphomeTarget, { debug: opts?.debug, wireframe: opts?.wireframe, dumpIR: opts?.dumpIr });
      if (opts?.metrics) printMetrics(result);
      console.log('Compiling firmware…');
      await esphomeCompile(yamlPath, extraArgs);
    }));
}
