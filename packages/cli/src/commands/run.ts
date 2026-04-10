import type { Command } from 'commander';
import { resolvePaths, transpileProject, extractPassthroughArgs, withErrorHandler } from '../utils';

export function registerRunCommand(program: Command) {
  program
    .command('run [projectDir]')
    .description(
      'Transpile, compile, and upload firmware via `esphome run`. ' +
      'Pass extra flags after `--` (e.g. `espcompose run -- --device /dev/ttyUSB0`).',
    )
    .allowUnknownOption()
    .option('--debug', 'Keep .espcompose-build/ intermediate files for inspection')
    .action(withErrorHandler('Run', async (projectDir?: string, opts?: { debug?: boolean }) => {
      const { build } = await import('../compiler');
      const { createEsphomeTarget, esphomeRun } = await import('@espcompose/esphome-target');
      const { resolvedDir, yamlPath } = resolvePaths(projectDir);
      const extraArgs = extractPassthroughArgs();
      await transpileProject(resolvedDir, yamlPath, build, createEsphomeTarget, { debug: opts?.debug });
      console.log('Running esphome run…');
      await esphomeRun(yamlPath, extraArgs);
    }));
}
