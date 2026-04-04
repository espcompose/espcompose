import * as fs from 'fs';
import * as path from 'path';
import { ESLint } from 'eslint';
import { logError } from '../../utils/log.js';
import type { PhaseContext } from './types';

/**
 * Build the default ESLint flat config used when a project has no config file.
 *
 * Loads the `@espcompose/eslint` recommended preset, which includes
 * `typescript-eslint` recommended rules and JSX parser options.
 */
async function buildDefaultConfig(): Promise<ESLint.Options['overrideConfig']> {
  const { default: composeESLint } = await import('@espcompose/eslint');
  return composeESLint.recommended as ESLint.Options['overrideConfig'];
}

/**
 * Phase 0.5: Lint
 *
 * Runs ESLint over the entry file. If the project has its own `eslint.config.*`
 * the ESLint API discovers it automatically; otherwise the compiler supplies a
 * built-in default based on `@espcompose/eslint` recommended.
 *
 * Throws on lint errors. Warnings are printed to stderr but do not fail.
 */
export async function lintPhase(ctx: PhaseContext): Promise<void> {
  const projectDir = path.dirname(ctx.entryFile);

  // Determine whether the project ships its own ESLint config
  const configFiles = [
    'eslint.config.js', 'eslint.config.mjs', 'eslint.config.cjs',
    'eslint.config.ts', 'eslint.config.mts', 'eslint.config.cts',
  ];
  const hasProjectConfig = configFiles.some((f) =>
    fs.existsSync(path.join(projectDir, f)),
  );

  let eslint: ESLint;
  if (hasProjectConfig) {
    eslint = new ESLint({ cwd: projectDir });
  } else {
    eslint = new ESLint({
      cwd: projectDir,
      overrideConfigFile: true,
      overrideConfig: await buildDefaultConfig(),
    });
  }

  const results = await eslint.lintFiles([ctx.entryFile]);

  const errorCount = results.reduce((sum, r) => sum + r.errorCount, 0);
  const warningCount = results.reduce((sum, r) => sum + r.warningCount, 0);

  if (warningCount > 0 || errorCount > 0) {
    const formatter = await eslint.loadFormatter('stylish');
    const output = await formatter.format(results);
    if (output) {
      logError(output);
    }
  }

  if (errorCount > 0) {
    throw new Error(`ESLint found ${errorCount} error(s).`);
  }
}
