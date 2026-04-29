// ────────────────────────────────────────────────────────────────────────────
// ComposeTarget — Generic compiler ↔ target interface contract
//
// Defines the interface that any backend (esphome, future targets)
// must implement. The compiler produces a SemanticIR and passes it to
// whichever target is selected; the target handles its own output I/O.
// ────────────────────────────────────────────────────────────────────────────

import type { SemanticIR } from './ir/index';
import type { OverlayDefinition } from './hooks';

/**
 * Output of the execute phase (Phase 3).
 *
 * Bundles the SemanticIR with all sidecar data collected during the render
 * pass. This is the single transfer object between the execute phase,
 * emit phase, and `compileToIR()` callers — adding a new sidecar field
 * here automatically flows it through the entire pipeline.
 */
export interface ExecuteResult {
  /** The target-agnostic semantic IR produced by the compiler. */
  ir: SemanticIR;
  /** Collected secrets (key → value) from secret() calls. */
  secrets?: ReadonlyMap<string, string>;
  /** Overlay definitions collected during render (useOverlay). */
  overlays?: OverlayDefinition[];
}

/**
 * Request passed from the compiler to a target's `emit()` method.
 *
 * Extends ExecuteResult with filesystem context. Adding a new sidecar
 * field to ExecuteResult automatically makes it available here.
 */
export interface EmitRequest extends ExecuteResult {
  /** Absolute path to the project root directory. */
  projectDir: string;
  /** Absolute path to the output directory for generated files. */
  outDir: string;
  /** Absolute path to the source directory (for asset resolution). */
  sourceDir: string;
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

  /**
   * Optional: register target-specific hooks on the core SDK before the
   * render pass runs. Called once per compile by the CLI with the core
   * SDK's hook-setter API. Targets that need to plug emitter functions
   * into core (e.g. the LVGL widget-tree YAML emitter) implement this.
   *
   * The argument is the SDK module that the user bundle will load (typed
   * as `unknown` here so this interface stays target-neutral).
   */
  registerRenderHooks?(coreSdk: unknown): void;
}
