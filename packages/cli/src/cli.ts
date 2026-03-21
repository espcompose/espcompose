#!/usr/bin/env node

import * as path from 'path';
import { program } from 'commander';
import {
  build,
  esphomeConfig,
  esphomeCompile,
  esphomeRun,
  esphomeLogs,
} from './compiler';
import { initProject } from './init';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const packageJson = require('../package.json') as { version: string };

program
  .name('espcompose')
  .description('ESPHome Compose CLI — Transpile TSX component trees to ESPHome YAML and manage devices')
  .version(packageJson.version);

/** Resolve the project directory and YAML output path. */
function resolvePaths(projectDir?: string) {
  const resolvedDir = path.resolve(projectDir ?? '.');
  const yamlPath = path.join(resolvedDir, '.espcompose', 'esphome.yaml');
  return { resolvedDir, yamlPath };
}

/** Run the transpile step (TSX → YAML). */
async function transpileProject(resolvedDir: string, yamlPath: string): Promise<void> {
  console.log(`Transpiling ${resolvedDir} → .espcompose/esphome.yaml`);
  await build(resolvedDir);
  console.log(`✓ Written to ${yamlPath}`);
}

// ── init ─────────────────────────────────────────────────────────────────────

program
  .command('init <name>')
  .description(
    'Create a new ESPHome Compose project with a minimal starter template. ' +
    'Sets up the SDK, CLI, ESLint plugin, and TypeScript configuration.',
  )
  .option('-b, --board <board>', 'ESP32 board identifier', 'esp32dev')
  .action((name: string, opts: { board: string }) => {
    try {
      initProject(name, { board: opts.board });
    } catch (err) {
      console.error('Init failed:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

// ── transpile ────────────────────────────────────────────────────────────────

program
  .command('transpile [projectDir]')
  .description(
    'Transpile a TSX project to ESPHome YAML, writing output to ' +
    '<projectDir>/.espcompose/esphome.yaml. Defaults to the current working directory.',
  )
  .action(async (projectDir?: string) => {
    const { resolvedDir, yamlPath } = resolvePaths(projectDir);
    try {
      await transpileProject(resolvedDir, yamlPath);
    } catch (err) {
      console.error('Transpile failed:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

// ── config ───────────────────────────────────────────────────────────────────

program
  .command('config [projectDir]')
  .description(
    'Transpile and validate the generated YAML with `esphome config`. ' +
    'Prints the validated/merged ESPHome configuration to stdout.',
  )
  .allowUnknownOption()
  .action(async (projectDir?: string) => {
    const { resolvedDir, yamlPath } = resolvePaths(projectDir);
    const extraArgs = extractPassthroughArgs();
    try {
      await transpileProject(resolvedDir, yamlPath);
      console.log('Validating with esphome config…');
      const output = await esphomeConfig(yamlPath, extraArgs);
      console.log(output);
    } catch (err) {
      console.error('Config failed:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

// ── compile ──────────────────────────────────────────────────────────────────

program
  .command('compile [projectDir]')
  .description(
    'Transpile and compile firmware via `esphome compile`. ' +
    'Generates a firmware binary without uploading to the device.',
  )
  .allowUnknownOption()
  .action(async (projectDir?: string) => {
    const { resolvedDir, yamlPath } = resolvePaths(projectDir);
    const extraArgs = extractPassthroughArgs();
    try {
      await transpileProject(resolvedDir, yamlPath);
      console.log('Compiling firmware…');
      await esphomeCompile(yamlPath, extraArgs);
    } catch (err) {
      console.error('Compile failed:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

// ── run ──────────────────────────────────────────────────────────────────────

program
  .command('run [projectDir]')
  .description(
    'Transpile, compile, and upload firmware via `esphome run`. ' +
    'Pass extra flags after `--` (e.g. `espcompose run -- --device /dev/ttyUSB0`).',
  )
  .allowUnknownOption()
  .action(async (projectDir?: string) => {
    const { resolvedDir, yamlPath } = resolvePaths(projectDir);
    const extraArgs = extractPassthroughArgs();
    try {
      await transpileProject(resolvedDir, yamlPath);
      console.log('Running esphome run…');
      await esphomeRun(yamlPath, extraArgs);
    } catch (err) {
      console.error('Run failed:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

// ── logs ─────────────────────────────────────────────────────────────────────

program
  .command('logs [projectDir]')
  .description(
    'Transpile and open the serial monitor via `esphome logs`. ' +
    'Pass extra flags after `--` (e.g. `espcompose logs -- --device /dev/ttyUSB0`).',
  )
  .allowUnknownOption()
  .action(async (projectDir?: string) => {
    const { resolvedDir, yamlPath } = resolvePaths(projectDir);
    const extraArgs = extractPassthroughArgs();
    try {
      await transpileProject(resolvedDir, yamlPath);
      console.log('Opening serial monitor…');
      await esphomeLogs(yamlPath, extraArgs);
    } catch (err) {
      console.error('Logs failed:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

// ── helpers ──────────────────────────────────────────────────────────────────

/**
 * Extract arguments after `--` from process.argv for passthrough to ESPHome.
 * Commander does not natively forward these, so we parse them manually.
 */
function extractPassthroughArgs(): string[] {
  const idx = process.argv.indexOf('--');
  return idx === -1 ? [] : process.argv.slice(idx + 1);
}

program.parse();
