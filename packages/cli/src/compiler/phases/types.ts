import type ts from 'typescript';
import type { SemanticIR, ComposeTarget } from '@espcompose/core/internals';
import type { SemanticRegistry } from '../transform/semantic-registry.js';

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
  /** Semantic IR from the execute phase (device pipeline only). */
  ir?: SemanticIR;
  /** Collected secrets (key → value) from the execute phase. */
  secrets?: ReadonlyMap<string, string>;
  /** Transform statistics (set by transform phase). */
  transformStats?: { filesWritten: number; filesTransformed: number };
  /** Per-file semantic analysis registries (set by transform phase, analysis-only). */
  semanticAnalysis?: Map<string, SemanticRegistry>;
}

/**
 * A single phase in the compiler pipeline.
 * Receives the shared context and mutates it with its outputs.
 */
export type Phase = (ctx: PhaseContext) => Promise<void> | void;
