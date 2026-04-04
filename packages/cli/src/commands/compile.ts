import type { Command } from 'commander';
import { resolvePaths, transpileProject, extractPassthroughArgs, withErrorHandler } from '../utils';

export function registerCompileCommand(program: Command) {
  program
    .command('compile [projectDir]')
    .description(
      'Transpile and compile firmware via `esphome compile`. ' +
      'Generates a firmware binary without uploading to the device.',
    )
    .allowUnknownOption()
    .option('--debug', 'Keep .espcompose-build/ intermediate files for inspection')
    .action(withErrorHandler('Compile', async (projectDir?: string, opts?: { debug?: boolean }) => {
      const { build } = await import('../compiler');
      const { createEsphomeTarget, esphomeCompile } = await import('@espcompose/target-esphome');
      const { resolvedDir, yamlPath } = resolvePaths(projectDir);
      const extraArgs = extractPassthroughArgs();
      await transpileProject(resolvedDir, yamlPath, build, createEsphomeTarget, { debug: opts?.debug });
      console.log('Compiling firmware…');
      await esphomeCompile(yamlPath, extraArgs);
    }));
}
