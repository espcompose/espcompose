import type { Command } from 'commander';
import { resolvePaths, transpileProject, extractPassthroughArgs, withErrorHandler } from '../utils';

export function registerConfigCommand(program: Command) {
  program
    .command('config [projectDir]')
    .description(
      'Transpile and validate the generated YAML with `esphome config`. ' +
      'Prints the validated/merged ESPHome configuration to stdout.',
    )
    .allowUnknownOption()
    .option('--debug', 'Keep .espcompose-build/ intermediate files for inspection')
    .action(withErrorHandler('Config', async (projectDir?: string, opts?: { debug?: boolean }) => {
      const { build } = await import('../compiler');
      const { createEsphomeTarget, esphomeConfig } = await import('@espcompose/target-esphome');
      const { resolvedDir, yamlPath } = resolvePaths(projectDir);
      const extraArgs = extractPassthroughArgs();
      await transpileProject(resolvedDir, yamlPath, build, createEsphomeTarget, { debug: opts?.debug });
      console.log('Validating with esphome config…');
      const output = await esphomeConfig(yamlPath, extraArgs);
      console.log(output);
    }));
}
