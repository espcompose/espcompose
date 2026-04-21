/**
 * ESPHome TSX CLI
 * 
 * This package provides command-line tools for building and managing
 * ESPHome TSX projects.
 */

// Re-export CLI utilities for programmatic use
export { program } from 'commander';
export { compile, build, compileToIR, buildLibrary, transpileLibrary } from './compiler/index.js';
export type { CompileOptions, CompileResult, BuildLibraryOptions, BuildLibraryResult } from './compiler/index.js';
export type { PhaseTiming } from './compiler/phases/index.js';
export {
  resolveEsphome,
  esphomeConfig,
  esphomeCompile,
  esphomeRun,
  esphomeLogs,
} from '@espcompose/esphome-target';
