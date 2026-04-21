import * as fs from 'fs';
import * as path from 'path';
import { workerData, parentPort } from 'node:worker_threads';
import { ESLint } from 'eslint';

export interface LintWorkerData {
  entryFile: string;
}

export interface LintWorkerResult {
  errorCount: number;
  warningCount: number;
  output: string;
}

async function buildDefaultConfig(): Promise<ESLint.Options['overrideConfig']> {
  const { default: composeESLint } = await import('@espcompose/eslint');
  return composeESLint.recommended as ESLint.Options['overrideConfig'];
}

async function run(): Promise<void> {
  const { entryFile } = workerData as LintWorkerData;
  const projectDir = path.dirname(entryFile);

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

  const results = await eslint.lintFiles([entryFile]);

  const errorCount = results.reduce((sum, r) => sum + r.errorCount, 0);
  const warningCount = results.reduce((sum, r) => sum + r.warningCount, 0);

  let output = '';
  if (warningCount > 0 || errorCount > 0) {
    const formatter = await eslint.loadFormatter('stylish');
    output = await formatter.format(results);
  }

  parentPort!.postMessage({ errorCount, warningCount, output } satisfies LintWorkerResult);
}

run().catch((err) => {
  // Unhandled rejection → propagated as worker 'error' event
  throw err;
});
