import type { Command } from 'commander';
import { resolvePaths, transpileProject, printMetrics, withErrorHandler } from '../utils';

export function registerTranspileCommand(program: Command) {
  program
    .command('transpile [projectDir]')
    .description(
      'Transpile a TSX project to ESPHome YAML, writing output to ' +
      '<projectDir>/.espcompose/esphome.yaml. Defaults to the current working directory.',
    )
    .option('--debug', 'Keep .espcompose-build/ intermediate files for inspection')
    .option('--metrics', 'Print compiler phase timing breakdown after transpile')
    .option('--wireframe', 'Enable colored outline overlays on all widgets for layout visualization')
    .option('--dump-ir', 'Write semantic-ir.json debug dump to the output directory')
    .action(withErrorHandler('Transpile', async (projectDir?: string, opts?: {
      debug?: boolean;
      metrics?: boolean;
      wireframe?: boolean;
      dumpIr?: boolean;
    }) => {
      const { build } = await import('../compiler');
      const { createEsphomeTarget } = await import('@espcompose/esphome-target');
      const { resolvedDir, yamlPath } = resolvePaths(projectDir);
      const result = await transpileProject(resolvedDir, yamlPath, build, createEsphomeTarget, { debug: opts?.debug, wireframe: opts?.wireframe, dumpIR: opts?.dumpIr });
      if (opts?.metrics) printMetrics(result);
    }));
}
