import type ts from 'typescript';
import type { ComposeTarget, ExecuteResult } from '@espcompose/core/internals';
import type { SourceLibraryRegistry } from '../resolver/index.js';

/** Timing measurement for a single compiler phase. */
export interface PhaseTiming {
  /** Phase function name (e.g. "setupPhase", "transformPhase"). */
  phase: string;
  /** Wall-clock duration in milliseconds. */
  durationMs: number;
  /** When true, this phase ran concurrently with other parallel phases. */
  parallel?: boolean;
}

/**
 * Mutable context threaded through the compiler pipeline.
 * Each phase reads what it needs and writes its outputs here.
 */
export interface PhaseContext {
  /** Absolute path to the TSX/TS entry file. */
  entryFile: string;
  /** Absolute path to the source directory (dirname of entryFile). */
  sourceDir: string;
  /** Absolute path to the intermediate build directory (.espcompose-build/). */
  buildDir: string;
  /** Absolute path to the CJS bundle output (device pipeline only). */
  bundlePath?: string;
  /** When true, keep the build directory after the pipeline completes. */
  debug: boolean;
  /** When true, enable wireframe outline overlays on all widgets. */
  wireframe?: boolean;
  /** When true, write a `semantic-ir.json` debug dump to the output directory. */
  dumpIR?: boolean;
  /** When true, enable on-device performance instrumentation. */
  perf?: boolean;

  // ── Emit options (set before the pipeline when emit phase is included) ──

  /** Absolute path to the project root directory (where package.json lives). */
  projectDir?: string;
  /** Absolute path to the output directory for generated files. */
  outDir?: string;
  /** The compilation target that will lower IR to target-specific output. */
  target?: ComposeTarget;

  // ── Phase outputs (set by phases as they run) ──

  /** TypeScript program from type-check phase. */
  program?: ts.Program;
  /** Path to the transformed entry file in buildDir. */
  transformedEntry?: string;
  /**
   * Execute phase output: SemanticIR + sidecar data (secrets, overlays, etc.).
   * Set by the execute phase; consumed by validate, emit, and compileToIR.
   */
  executeResult?: ExecuteResult;
  /** Transform statistics (set by transform phase). */
  transformStats?: { filesWritten: number; filesTransformed: number };

  /**
   * Registry of source-mode libraries reachable from the project.
   * Built once in setupPhase from `package.json#exports` `espcompose` conditions.
   */
  registry?: SourceLibraryRegistry;
  /**
   * Map of original absolute path → transformed-copy path inside `buildDir`.
   * Populated by the transform phase; used by diagnostic-path rewriting.
   */
  pathMap?: Map<string, string>;

  /** Per-phase timing measurements (populated by runPipeline). */
  phaseTiming?: PhaseTiming[];
}

/**
 * A single phase in the compiler pipeline.
 * Receives the shared context and mutates it with its outputs.
 */
export type Phase = (ctx: PhaseContext) => Promise<void> | void;

/**
 * A step in a pipeline: either a single phase or an array of phases to run in parallel.
 */
export type PipelineStep = Phase | Phase[];
