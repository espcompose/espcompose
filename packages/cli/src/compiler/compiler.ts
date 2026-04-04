import * as fs from 'fs';
import * as path from 'path';
import type { SemanticIR, ComposeTarget } from '@espcompose/core/internals';
import type { Phase, PhaseContext } from './phases/types';
import { setupPhase } from './phases/setup';
import { typeCheckPhase } from './phases/type-check';
import { lintPhase } from './phases/lint';
import { transformPhase } from './phases/transform';
import { bundlePhase } from './phases/bundle';
import { bundleLibraryPhase } from './phases/bundle-library';
import { executePhase } from './phases/execute';
import { validatePhase } from './phases/validate';
import { emitPhase } from './phases/emit';
import { emitDTSPhase } from './phases/emit-dts';
import { teardownPhase } from './phases/teardown';

export interface CompileOptions {
  /** Absolute path to the TSX/TS entry file. */
  entryFile: string;
  /** Absolute path to the project root directory (where package.json lives). */
  projectDir: string;
  /** Absolute path to the output directory for generated files. */
  outDir: string;
  /** The compilation target that will lower IR to target-specific output. */
  target: ComposeTarget;
  /** When true, keep the `.espcompose-build/` intermediate folder for inspection. */
  debug?: boolean;
}

// ────────────────────────────────────────────────────────────────────────────
// Pipelines
// ────────────────────────────────────────────────────────────────────────────

/** Full compile pipeline: setup → type-check → lint → transform → bundle → execute → emit → teardown. */
const compilePipeline: Phase[] = [
  setupPhase,
  typeCheckPhase,
  lintPhase,
  transformPhase,
  bundlePhase,
  executePhase,
  validatePhase,
  emitPhase,
  teardownPhase,
];

/** IR-only pipeline: setup → type-check → lint → transform → bundle → execute → teardown. */
const irPipeline: Phase[] = [
  setupPhase,
  typeCheckPhase,
  lintPhase,
  transformPhase,
  bundlePhase,
  executePhase,
  validatePhase,
  teardownPhase,
];

/** Library pipeline: setup → type-check → lint → transform → bundle(library) → emitDTS → teardown. */
const libraryPipeline: Phase[] = [
  setupPhase,
  typeCheckPhase,
  lintPhase,
  transformPhase,
  bundleLibraryPhase,
  emitDTSPhase,
  teardownPhase,
];

/** Library transpile pipeline: setup → type-check → lint → transform → teardown (no bundle/emit). */
const transpileLibraryPipeline: Phase[] = [
  setupPhase,
  typeCheckPhase,
  lintPhase,
  transformPhase,
  teardownPhase,
];

// ────────────────────────────────────────────────────────────────────────────
// Pipeline runner
// ────────────────────────────────────────────────────────────────────────────

/**
 * Run a sequence of compiler phases, threading a shared PhaseContext through each.
 *
 * Teardown always runs via try/finally — even if a phase throws, the build
 * directory is cleaned up (unless debug mode is enabled).
 */
async function runPipeline(ctx: PhaseContext, phases: Phase[]): Promise<void> {
  // Find teardown in the pipeline so we can guarantee it runs in finally
  const teardownIndex = phases.indexOf(teardownPhase);
  const corePhases = teardownIndex >= 0 ? phases.slice(0, teardownIndex) : phases;
  const hasTeardown = teardownIndex >= 0;

  try {
    for (const phase of corePhases) {
      await phase(ctx);
    }
  } finally {
    if (hasTeardown) {
      teardownPhase(ctx);
    }
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Public entry points
// ────────────────────────────────────────────────────────────────────────────

/**
 * Compile a TSX entry file through the full pipeline and emit via the target.
 *
 * Pipeline:
 *   [setup] → [type-check] → [lint] → [transform] → [bundle] → [execute] → [emit] → [teardown]
 */
export async function compile(options: CompileOptions): Promise<void> {
  const { entryFile, projectDir, outDir, target, debug = false } = options;

  const sourceDir = path.dirname(entryFile);
  const buildDir = path.join(sourceDir, '.espcompose-build');
  const bundlePath = path.join(buildDir, '.espcompose-bundle.cjs');
  const ctx: PhaseContext = { entryFile, sourceDir, buildDir, bundlePath, debug, projectDir, outDir, target };

  await runPipeline(ctx, compilePipeline);
}

/**
 * Build an ESPHome Compose project directory.
 *
 * Reads the `main` field from `<projectDir>/package.json` as the entry point
 * and writes the generated YAML to `<projectDir>/.espcompose/esphome.yaml`.
 *
 * @param projectDir  Absolute path to the project directory.
 */
export async function build(projectDir: string, target: ComposeTarget, options?: { debug?: boolean }): Promise<void> {
  const pkgPath = path.join(projectDir, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    throw new Error(`No package.json found in project directory: ${projectDir}`);
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as { main?: string };
  if (!pkg.main) {
    throw new Error(`package.json is missing a "main" field: ${pkgPath}`);
  }

  const entryFile = path.resolve(projectDir, pkg.main);
  const outDir = path.join(projectDir, '.espcompose');

  await compile({ entryFile, projectDir, outDir, target, debug: options?.debug });
}

/**
 * Compile a project to SemanticIR without emitting target-specific files.
 *
 * Runs the IR pipeline (type-check, lint, transform, bundle, execute+render)
 * but skips the emit phase.
 */
export async function compileToIR(projectDir: string): Promise<SemanticIR> {
  const pkgPath = path.join(projectDir, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    throw new Error(`No package.json found in project directory: ${projectDir}`);
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as { main?: string };
  if (!pkg.main) {
    throw new Error(`package.json is missing a "main" field: ${pkgPath}`);
  }

  const entryFile = path.resolve(projectDir, pkg.main);
  const sourceDir = path.dirname(entryFile);
  const buildDir = path.join(sourceDir, '.espcompose-build');
  const bundlePath = path.join(buildDir, '.espcompose-bundle.cjs');
  const ctx: PhaseContext = { entryFile, sourceDir, buildDir, bundlePath, debug: false };

  await runPipeline(ctx, irPipeline);

  if (!ctx.ir) {
    throw new Error('Pipeline did not produce a SemanticIR. Ensure the execute phase ran successfully.');
  }

  return ctx.ir;
}

// ────────────────────────────────────────────────────────────────────────────
// Library build
// ────────────────────────────────────────────────────────────────────────────

export interface BuildLibraryOptions {
  /** Absolute path to the library root (where package.json lives). */
  rootDir: string;
  /** Entry file relative to rootDir (default: 'src/index.ts'). */
  entry?: string;
  /** Output directory relative to rootDir (default: 'dist'). */
  outDir?: string;
  /** Optional path to tsconfig.json relative to rootDir. */
  tsconfig?: string;
  /** When true, keep the `.espcompose-build/` intermediate folder for inspection. */
  debug?: boolean;
}

export interface BuildLibraryResult {
  /** Number of source files processed. */
  filesWritten: number;
  /** Number of files that had AST transforms applied. */
  filesTransformed: number;
}

/**
 * Build an ESPCompose component library for distribution.
 *
 * Pipeline:
 *   [setup] → [type-check] → [lint] → [transform] → [bundle-library] → [emit-dts] → [teardown]
 *
 * Produces an ESM bundle and .d.ts declarations in `outDir`.
 */
export async function buildLibrary(options: BuildLibraryOptions): Promise<BuildLibraryResult> {
  const rootDir = options.rootDir;
  const entryRel = options.entry ?? 'src/index.ts';
  const outDirRel = options.outDir ?? 'dist';
  const entryFile = path.resolve(rootDir, entryRel);
  const sourceDir = path.dirname(entryFile);
  const outDir = path.resolve(rootDir, outDirRel);
  const buildDir = path.resolve(rootDir, '.espcompose-build');

  const ctx: PhaseContext = {
    entryFile,
    sourceDir,
    buildDir,
    debug: options.debug ?? false,
    projectDir: rootDir,
    outDir,
  };

  await runPipeline(ctx, libraryPipeline);

  return {
    filesWritten: ctx.transformStats?.filesWritten ?? 0,
    filesTransformed: ctx.transformStats?.filesTransformed ?? 0,
  };
}

/**
 * Transpile a component library — run AST transforms only, no bundling.
 *
 * Pipeline:
 *   [setup] → [type-check] → [lint] → [transform] → [teardown]
 *
 * Writes transformed TypeScript sources to `outDir` for use with an
 * external bundler (tsup, rollup, etc.).
 */
export async function transpileLibrary(options: BuildLibraryOptions): Promise<BuildLibraryResult> {
  const rootDir = options.rootDir;
  const entryRel = options.entry ?? 'src/index.ts';
  const outDirRel = options.outDir ?? '.espcompose-build';
  const entryFile = path.resolve(rootDir, entryRel);
  const sourceDir = path.dirname(entryFile);
  const outDir = path.resolve(rootDir, outDirRel);
  const buildDir = path.resolve(rootDir, '.espcompose-build');

  const ctx: PhaseContext = {
    entryFile,
    sourceDir,
    buildDir,
    debug: options.debug ?? false,
    projectDir: rootDir,
    outDir,
  };

  await runPipeline(ctx, transpileLibraryPipeline);

  return {
    filesWritten: ctx.transformStats?.filesWritten ?? 0,
    filesTransformed: ctx.transformStats?.filesTransformed ?? 0,
  };
}
