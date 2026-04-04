import type { Command } from 'commander';
import { resolvePaths, transpileProject, withErrorHandler } from '../utils';

export function registerTranspileCommand(program: Command) {
  program
    .command('transpile [projectDir]')
    .description(
      'Transpile a TSX project to ESPHome YAML, writing output to ' +
      '<projectDir>/.espcompose/esphome.yaml. Defaults to the current working directory.',
    )
    .option('--debug', 'Keep .espcompose-build/ intermediate files for inspection')
    .action(withErrorHandler('Transpile', async (projectDir?: string, opts?: { debug?: boolean }) => {
      const { build } = await import('../compiler');
      const { createEsphomeTarget } = await import('@espcompose/target-esphome');
      const { resolvedDir, yamlPath } = resolvePaths(projectDir);
      await transpileProject(resolvedDir, yamlPath, build, createEsphomeTarget, { debug: opts?.debug });
    }));
}
