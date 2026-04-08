// @espcompose/esphome-target — YAML/C++ firmware target backend
// Lowers SemanticIR to ESPHome YAML config + C++ reactive runtime headers.

// ComposeTarget implementation
export { createEsphomeTarget } from './target.js';

// Action lowering (used by CLI script-transformer)
export { lowerActionTree } from './action-lowering.js';

// ESPHome CLI wrappers
export {
  resolveEsphome,
  esphomeConfig,
  esphomeCompile,
  esphomeRun,
  esphomeLogs,
} from './esphome-cli.js';
