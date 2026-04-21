import * as fs from 'fs';
import * as path from 'path';
import type { SemanticIR, ComposeTarget } from '@espcompose/core/internals';
import type { PipelineStep, PhaseContext, PhaseTiming } from './phases/types';
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
  /** When true, enable wireframe outline overlays on all widgets. */
  wireframe?: boolean;
}

/** Result returned from compile/build with per-phase timing data. */
export interface CompileResult {
  /** Wall-clock duration of each compiler phase. */
  phaseTiming: PhaseTiming[];
}

// ────────────────────────────────────────────────────────────────────────────
// Pipelines
// ────────────────────────────────────────────────────────────────────────────

/** Full compile pipeline: setup → [type-check + lint] → transform → bundle → execute → emit → teardown. */
const compilePipeline: PipelineStep[] = [
  setupPhase,
  [typeCheckPhase, lintPhase],
  transformPhase,
  bundlePhase,
  executePhase,
  validatePhase,
  emitPhase,
  teardownPhase,
];

/** IR-only pipeline: setup → [type-check + lint] → transform → bundle → execute → teardown. */
const irPipeline: PipelineStep[] = [
  setupPhase,
  [typeCheckPhase, lintPhase],
  transformPhase,
  bundlePhase,
  executePhase,
  validatePhase,
  teardownPhase,
];

/** Library pipeline: setup → [type-check + lint] → transform → bundle(library) → emitDTS → teardown. */
const libraryPipeline: PipelineStep[] = [
  setupPhase,
  [typeCheckPhase, lintPhase],
  transformPhase,
  bundleLibraryPhase,
  emitDTSPhase,
  teardownPhase,
];

/** Library transpile pipeline: setup → [type-check + lint] → transform → teardown (no bundle/emit). */
const transpileLibraryPipeline: PipelineStep[] = [
  setupPhase,
  [typeCheckPhase, lintPhase],
  transformPhase,
  teardownPhase,
];

// ────────────────────────────────────────────────────────────────────────────
// Pipeline runner
// ────────────────────────────────────────────────────────────────────────────

/**
 * Run a sequence of compiler phases, threading a shared PhaseContext through each.
 *
 * A step is either a single `Phase` or a `Phase[]` (parallel group). Phases
 * within a parallel group run concurrently via `Promise.all`; groups themselves
 * execute in order.
 *
 * Teardown always runs via try/finally — even if a phase throws, the build
 * directory is cleaned up (unless debug mode is enabled).
 */
async function runPipeline(ctx: PhaseContext, steps: PipelineStep[]): Promise<void> {
  ctx.phaseTiming = [];

  // Find teardown in the pipeline so we can guarantee it runs in finally
  const teardownIndex = steps.findIndex(
    (s) => s === teardownPhase || (Array.isArray(s) && s.includes(teardownPhase)),
  );
  const coreSteps = teardownIndex >= 0 ? steps.slice(0, teardownIndex) : steps;
  const hasTeardown = teardownIndex >= 0;

  try {
    for (const step of coreSteps) {
      if (Array.isArray(step)) {
        // Parallel group — run all phases concurrently on separate threads and
        // collect results from every phase before deciding whether to throw.
        const settled = await Promise.allSettled(
          step.map(async (phase) => {
            const start = performance.now();
            await phase(ctx);
            return { phase: phase.name, durationMs: performance.now() - start };
          }),
        );

        const timings: PhaseTiming[] = [];
        const errors: Error[] = [];

        for (const result of settled) {
          if (result.status === 'fulfilled') {
            timings.push({ ...result.value, parallel: true });
          } else {
            errors.push(
              result.reason instanceof Error
                ? result.reason
                : new Error(String(result.reason)),
            );
          }
        }

        ctx.phaseTiming.push(...timings);

        if (errors.length > 0) {
          throw new AggregateError(
            errors,
            errors.map((e) => e.message).join('\n'),
          );
        }
      } else {
        const start = performance.now();
        await step(ctx);
        ctx.phaseTiming.push({ phase: step.name, durationMs: performance.now() - start });
      }
    }
  } finally {
    if (hasTeardown) {
      const start = performance.now();
      teardownPhase(ctx);
      ctx.phaseTiming.push({ phase: teardownPhase.name, durationMs: performance.now() - start });
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
export async function compile(options: CompileOptions): Promise<CompileResult> {
  const { entryFile, projectDir, outDir, target, debug = false, wireframe } = options;

  const sourceDir = path.dirname(entryFile);
  const buildDir = path.join(sourceDir, '.espcompose-build');
  const bundlePath = path.join(buildDir, '.espcompose-bundle.cjs');
  const ctx: PhaseContext = { entryFile, sourceDir, buildDir, bundlePath, debug, wireframe, projectDir, outDir, target };

  await runPipeline(ctx, compilePipeline);

  return { phaseTiming: ctx.phaseTiming ?? [] };
}

/**
 * Build an ESPHome Compose project directory.
 *
 * Reads the `main` field from `<projectDir>/package.json` as the entry point
 * and writes the generated YAML to `<projectDir>/.espcompose/esphome.yaml`.
 *
 * @param projectDir  Absolute path to the project directory.
 */
export async function build(projectDir: string, target: ComposeTarget, options?: { debug?: boolean; wireframe?: boolean }): Promise<CompileResult> {
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

  return compile({ entryFile, projectDir, outDir, target, debug: options?.debug, wireframe: options?.wireframe });
}

/**
 * Compile a project to SemanticIR without emitting target-specific files.
 *
 * Runs the IR pipeline (type-check, lint, transform, bundle, execute+render)
 * but skips the emit phase.
 */
export async function compileToIR(projectDir: string, options?: { wireframe?: boolean }): Promise<SemanticIR> {
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
  const ctx: PhaseContext = { entryFile, sourceDir, buildDir, bundlePath, debug: false, wireframe: options?.wireframe };

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
