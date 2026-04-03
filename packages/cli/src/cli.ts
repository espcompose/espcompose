#!/usr/bin/env node

import * as path from 'path';
import { program } from 'commander';
import { build } from './compiler';
import {
  esphomeConfig,
  esphomeCompile,
  esphomeRun,
  esphomeLogs,
  createEsphomeTarget,
} from '@esphome/compose-target-esphome';
import { createSimulatorTarget } from '@esphome/compose-target-simulator';
import { initProject } from './init';
import { transformLib, buildLibrary } from './transform-lib';

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
async function transpileProject(resolvedDir: string, yamlPath: string, options?: { debug?: boolean }): Promise<void> {
  console.log(`Transpiling ${resolvedDir} → .espcompose/esphome.yaml`);
  await build(resolvedDir, createEsphomeTarget(), { debug: options?.debug });
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
  .option('--library', 'Create a component library project instead of a device project')
  .action((name: string, opts: { board: string; library?: boolean }) => {
    try {
      initProject(name, { board: opts.board, library: opts.library });
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
  .option('--debug', 'Keep .espcompose-build/ intermediate files for inspection')
  .action(async (projectDir?: string, opts?: { debug?: boolean }) => {
    const { resolvedDir, yamlPath } = resolvePaths(projectDir);
    try {
      await transpileProject(resolvedDir, yamlPath, { debug: opts?.debug });
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
  .option('--debug', 'Keep .espcompose-build/ intermediate files for inspection')
  .action(async (projectDir?: string, opts?: { debug?: boolean }) => {
    const { resolvedDir, yamlPath } = resolvePaths(projectDir);
    const extraArgs = extractPassthroughArgs();
    try {
      await transpileProject(resolvedDir, yamlPath, { debug: opts?.debug });
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
  .option('--debug', 'Keep .espcompose-build/ intermediate files for inspection')
  .action(async (projectDir?: string, opts?: { debug?: boolean }) => {
    const { resolvedDir, yamlPath } = resolvePaths(projectDir);
    const extraArgs = extractPassthroughArgs();
    try {
      await transpileProject(resolvedDir, yamlPath, { debug: opts?.debug });
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
  .option('--debug', 'Keep .espcompose-build/ intermediate files for inspection')
  .action(async (projectDir?: string, opts?: { debug?: boolean }) => {
    const { resolvedDir, yamlPath } = resolvePaths(projectDir);
    const extraArgs = extractPassthroughArgs();
    try {
      await transpileProject(resolvedDir, yamlPath, { debug: opts?.debug });
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
  .option('--debug', 'Keep .espcompose-build/ intermediate files for inspection')
  .action(async (projectDir?: string, opts?: { debug?: boolean }) => {
    const { resolvedDir, yamlPath } = resolvePaths(projectDir);
    const extraArgs = extractPassthroughArgs();
    try {
      await transpileProject(resolvedDir, yamlPath, { debug: opts?.debug });
      console.log('Opening serial monitor…');
      await esphomeLogs(yamlPath, extraArgs);
    } catch (err) {
      console.error('Logs failed:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });
// ── transform-lib ────────────────────────────────────────────────────────

program
  .command('transform-lib [srcDir]')
  .description(
    'Pre-compile reactive expressions in a component library.\n' +
    'Runs the same AST transforms used for user projects, but writes\n' +
    'transformed TypeScript source files instead of bundling.\n' +
    'The library\'s own bundler (tsup, rollup, etc.) then compiles\n' +
    'the transformed sources into publishable JS.',
  )
  .option('--entry <file>', 'Entry .ts/.tsx file relative to srcDir', 'src/index.ts')
  .option('--outDir <dir>', 'Output directory for transformed sources', '.espcompose-build')
  .option('--tsconfig <file>', 'Path to tsconfig.json (default: auto-detect)')
  .action((srcDir?: string, opts?: { entry?: string; outDir?: string; tsconfig?: string }) => {
    const resolvedSrcDir = path.resolve(srcDir ?? '.');
    const entryFile = path.resolve(resolvedSrcDir, opts?.entry ?? 'src/index.ts');
    const sourceDir = path.dirname(entryFile);
    const outDir = path.resolve(resolvedSrcDir, opts?.outDir ?? '.espcompose-build');
    const tsconfigPath = opts?.tsconfig ? path.resolve(resolvedSrcDir, opts.tsconfig) : undefined;

    try {
      console.log(`Transforming library: ${sourceDir} → ${path.relative(resolvedSrcDir, outDir)}/`);
      const result = transformLib({ entryFile, sourceDir, outDir, tsconfigPath });
      console.log(`✓ ${result.filesWritten} file(s) written, ${result.filesTransformed} transformed`);
      if (result.diagnostics.length > 0) {
        for (const d of result.diagnostics) {
          const loc = d.file && d.line ? `${path.relative(process.cwd(), d.file)}:${d.line}` : 'unknown';
          console.warn(`  ⚠ ${loc} — ${d.message}`);
        }
      }
    } catch (err) {
      console.error('Transform failed:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });
// ── library ──────────────────────────────────────────────────────────────

program
  .command('library [rootDir]')
  .description(
    'Build a component library for distribution.\n' +
    'Transforms reactive expressions, bundles CJS + ESM via esbuild,\n' +
    'and emits .d.ts declarations — no extra config or bundler needed.',
  )
  .option('--entry <file>', 'Entry file relative to rootDir', 'src/index.ts')
  .option('--outDir <dir>', 'Output directory relative to rootDir', 'dist')
  .option('--tsconfig <file>', 'Path to tsconfig.json (default: auto-detect)')
  .action(async (rootDir?: string, opts?: { entry?: string; outDir?: string; tsconfig?: string }) => {
    const resolvedRoot = path.resolve(rootDir ?? '.');
    try {
      console.log(`Building library in ${resolvedRoot}`);
      const result = await buildLibrary({
        rootDir: resolvedRoot,
        entry: opts?.entry,
        outDir: opts?.outDir,
        tsconfig: opts?.tsconfig,
      });
      const t = result.transform;
      console.log(`✓ ${t.filesWritten} file(s) processed, ${t.filesTransformed} transformed`);
      console.log(`✓ Bundled CJS + ESM + DTS → ${opts?.outDir ?? 'dist'}/`);
      if (t.diagnostics.length > 0) {
        for (const d of t.diagnostics) {
          const loc = d.file && d.line ? `${path.relative(process.cwd(), d.file)}:${d.line}` : 'unknown';
          console.warn(`  ⚠ ${loc} — ${d.message}`);
        }
      }
    } catch (err) {
      console.error('Library build failed:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });
// ── simulate ─────────────────────────────────────────────────────────────────

program
  .command('simulate [projectDir]')
  .description(
    'Build a browser-based LVGL UI simulator preview.\n' +
    'Renders the project\'s LVGL widgets in an HTML file with mock HA entity\n' +
    'data and reactive bindings, then opens it in the default browser.\n' +
    'No firmware build or flash required.',
  )
  .option('-w, --width <px>', 'Viewport width in pixels', '320')
  .option('--height <px>', 'Viewport height in pixels', '480')
  .option('--debug', 'Keep .espcompose-build/ intermediate files for inspection')
  .action(async (projectDir?: string, opts?: { width?: string; height?: string; debug?: boolean }) => {
    const resolvedDir = path.resolve(projectDir ?? '.');
    try {
      const target = createSimulatorTarget({
        width: Number(opts?.width ?? 320),
        height: Number(opts?.height ?? 480),
      });
      console.log(`Building simulator for ${resolvedDir}…`);
      await build(resolvedDir, target, { debug: opts?.debug });
      console.log('✓ Simulator opened in browser');
    } catch (err) {
      console.error('Simulator failed:', err instanceof Error ? err.message : err);
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
