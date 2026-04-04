/**
 * ESPHome TSX CLI
 * 
 * This package provides command-line tools for building and managing
 * ESPHome TSX projects.
 */

// Re-export CLI utilities for programmatic use
export { program } from 'commander';
export { compile, build, lint, compileToIR } from './compiler/index.js';
export type { CompileOptions } from './compiler/index.js';
export { transformLib, buildLibrary } from './transform-lib.js';
export type { TransformLibOptions, TransformLibResult, BuildLibraryOptions, BuildLibraryResult } from './transform-lib.js';
export {
  resolveEsphome,
  esphomeConfig,
  esphomeCompile,
  esphomeRun,
  esphomeLogs,
} from '@espcompose/target-esphome';
