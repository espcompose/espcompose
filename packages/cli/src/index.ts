/**
 * ESPHome TSX CLI
 * 
 * This package provides command-line tools for building and managing
 * ESPHome TSX projects.
 */

// Re-export CLI utilities for programmatic use
export { program } from 'commander';
export { compile, build, compileToIR, buildLibrary, transpileLibrary } from './compiler/index.js';
export type { CompileOptions, BuildLibraryOptions, BuildLibraryResult } from './compiler/index.js';
export {
  resolveEsphome,
  esphomeConfig,
  esphomeCompile,
  esphomeRun,
  esphomeLogs,
} from '@espcompose/target-esphome';
