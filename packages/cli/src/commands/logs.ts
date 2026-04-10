import type { Command } from 'commander';
import { resolvePaths, transpileProject, extractPassthroughArgs, withErrorHandler } from '../utils';

export function registerLogsCommand(program: Command) {
  program
    .command('logs [projectDir]')
    .description(
      'Transpile and open the serial monitor via `esphome logs`. ' +
      'Pass extra flags after `--` (e.g. `espcompose logs -- --device /dev/ttyUSB0`).',
    )
    .allowUnknownOption()
    .option('--debug', 'Keep .espcompose-build/ intermediate files for inspection')
    .action(withErrorHandler('Logs', async (projectDir?: string, opts?: { debug?: boolean }) => {
      const { build } = await import('../compiler');
      const { createEsphomeTarget, esphomeLogs } = await import('@espcompose/esphome-target');
      const { resolvedDir, yamlPath } = resolvePaths(projectDir);
      const extraArgs = extractPassthroughArgs();
      await transpileProject(resolvedDir, yamlPath, build, createEsphomeTarget, { debug: opts?.debug });
      console.log('Opening serial monitor…');
      await esphomeLogs(yamlPath, extraArgs);
    }));
}
