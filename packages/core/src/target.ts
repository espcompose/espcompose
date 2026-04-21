// ────────────────────────────────────────────────────────────────────────────
// ComposeTarget — Generic compiler ↔ target interface contract
//
// Defines the interface that any backend (esphome, future targets)
// must implement. The compiler produces a SemanticIR and passes it to
// whichever target is selected; the target handles its own output I/O.
// ────────────────────────────────────────────────────────────────────────────

import type { SemanticIR } from './ir/index';

/**
 * Request passed from the compiler to a target's `emit()` method.
 *
 * Contains the target-agnostic SemanticIR plus filesystem context.
 * No target-specific fields — each target owns its own serialization,
 * code generation, and file layout.
 */
export interface EmitRequest {
  /** The target-agnostic semantic IR produced by the compiler. */
  ir: SemanticIR;
  /** Absolute path to the project root directory. */
  projectDir: string;
  /** Absolute path to the output directory for generated files. */
  outDir: string;
  /** Absolute path to the source directory (for asset resolution). */
  sourceDir: string;
  /** Collected secrets (key → value) from secret() calls. */
  secrets?: ReadonlyMap<string, string>;
}

/** Result returned from a target's `emit()` method. */
export interface EmitResult {
  /** Absolute paths of files written by the target. */
  files: string[];
}

/**
 * Interface that every compilation target must implement.
 *
 * The compiler is target-agnostic: it runs the full pipeline (type-check,
 * lint, transform, bundle, execute, render) to produce a `SemanticIR`,
 * then delegates to the target for lowering and output.
 *
 * Each target owns its own:
 * - Serialization format (YAML, HTML, JSON, etc.)
 * - Code generation (C++ headers, JS runtime, etc.)
 * - File I/O (what files to write and where)
 * - Asset handling (copying, hashing, rewriting paths)
 */
export interface ComposeTarget {
  /** Human-readable target identifier (e.g. 'esphome'). */
  readonly name: string;

  /**
   * Lower the SemanticIR to target-specific output and write files to disk.
   *
   * @param request  The IR and filesystem context from the compiler.
   * @returns        A list of files written, for logging and diagnostics.
   */
  emit(request: EmitRequest): Promise<EmitResult>;
}
