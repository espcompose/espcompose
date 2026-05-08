import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import type { ComposeTarget, ExecuteResult, SemanticIR } from '@espcompose/core/internals';
import type { PipelineStep, PhaseContext, PhaseTiming } from './phases/types';
import { setupPhase } from './phases/setup';
import { typeCheckPhase } from './phases/type-check';
import { lintPhase } from './phases/lint';
import { transformPhase } from './phases/transform';
import { bundlePhase } from './phases/bundle';
import { executePhase } from './phases/execute';
import { validatePhase } from './phases/validate';
import { emitPhase } from './phases/emit';
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
  /** When true, write a `semantic-ir.json` debug dump to the output directory. */
  dumpIR?: boolean;
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

/** IR-only pipeline: setup → [type-check + lint] → transform → bundle → execute → validate → teardown. */
const irPipeline: PipelineStep[] = [
  setupPhase,
  [typeCheckPhase, lintPhase],
  transformPhase,
  bundlePhase,
  executePhase,
  validatePhase,
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
  const { entryFile, projectDir, outDir, target, debug = false, wireframe, dumpIR: shouldDumpIR } = options;

  const sourceDir = path.dirname(entryFile);
  const buildDir = path.join(sourceDir, '.espcompose-build');
  const bundlePath = path.join(buildDir, '.espcompose-bundle.cjs');
  const ctx: PhaseContext = { entryFile, sourceDir, buildDir, bundlePath, debug, wireframe, dumpIR: shouldDumpIR, projectDir, outDir, target };

  await runPipeline(ctx, compilePipeline);

  if (shouldDumpIR && ctx.executeResult && outDir) {
    await dumpIR(ctx.executeResult.ir, outDir);
  }

  return { phaseTiming: ctx.phaseTiming ?? [] };
}

/**
 * Locate and read the bundled `ir-viewer.html` template.
 *
 * The asset is shipped in `<pkg>/assets/ir-viewer.html`. At runtime the
 * compiled CLI lives in `<pkg>/dist/`, so we resolve relative to this
 * module's URL. A second candidate path supports running the CLI from
 * source (`src/compiler/compiler.ts` → `../../assets/ir-viewer.html`).
 *
 * Returns the template string, or `null` (with a warning) if the asset
 * cannot be found — in which case the JSON dump still succeeds.
 */
function loadViewerTemplate(): string | null {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    path.resolve(here, '..', 'assets', 'ir-viewer.html'),
    path.resolve(here, '..', '..', 'assets', 'ir-viewer.html'),
    path.resolve(here, '..', '..', '..', 'assets', 'ir-viewer.html'),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return fs.readFileSync(p, 'utf8');
  }
  console.warn(`⚠ IR dump: viewer template not found (tried ${candidates.join(', ')}); skipping HTML emit`);
  return null;
}

/**
 * Serialize a {@link SemanticIR} to JSON and write it to `outDir/semantic-ir.json`
 * along with an optional self-contained HTML viewer (`semantic-ir.html`).
 */
export async function dumpIR(ir: SemanticIR, outDir: string): Promise<void> {
  const { serializeIRToJSON } = await import('@espcompose/core/internals');
  const { json, warnings } = serializeIRToJSON(ir);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'semantic-ir.json'), json, 'utf8');

  const viewerTemplate = loadViewerTemplate();
  if (viewerTemplate) {
    const safeJson = json.replace(/<\/script/gi, '<\\/script');
    const html = viewerTemplate.replace('__IR_JSON__', () => safeJson);
    fs.writeFileSync(path.join(outDir, 'semantic-ir.html'), html, 'utf8');
  }

  for (const w of warnings) {
    console.warn(`⚠ IR dump: ${w}`);
  }
}

/**
 * Build an ESPHome Compose project directory.
 *
 * Reads the `main` field from `<projectDir>/package.json` as the entry point
 * and writes the generated YAML to `<projectDir>/.espcompose/esphome.yaml`.
 *
 * @param projectDir  Absolute path to the project directory.
 */
export async function build(projectDir: string, target: ComposeTarget, options?: { debug?: boolean; wireframe?: boolean; dumpIR?: boolean }): Promise<CompileResult> {
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

  return compile({ entryFile, projectDir, outDir, target, debug: options?.debug, wireframe: options?.wireframe, dumpIR: options?.dumpIR });
}

/**
 * Compile a project to SemanticIR without emitting target-specific files.
 *
 * Runs the IR pipeline (type-check, lint, transform, bundle, execute+render)
 * but skips the emit phase.
 *
 * Returns the ExecuteResult (SemanticIR + sidecar data) so callers
 * (e.g. --host mode) can forward it to a downstream `target.emit()`.
 */
export async function compileToIR(projectDir: string, target: ComposeTarget, options?: { wireframe?: boolean; debug?: boolean }): Promise<ExecuteResult> {
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
  const ctx: PhaseContext = { entryFile, sourceDir, buildDir, bundlePath, debug: options?.debug ?? false, wireframe: options?.wireframe, projectDir, target };

  await runPipeline(ctx, irPipeline);

  if (!ctx.executeResult) {
    throw new Error('Pipeline did not produce an ExecuteResult. Ensure the execute phase ran successfully.');
  }

  return ctx.executeResult;
}
