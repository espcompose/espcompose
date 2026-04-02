// @esphome/compose-target-esphome — YAML/C++ firmware target backend
// Lowers SemanticIR to ESPHome YAML config + C++ reactive runtime headers.

// ComposeTarget implementation
export { createEsphomeTarget } from './target.js';

export { lowerToYamlConfig } from './lower-yaml.js';
export { generateCppFromIR } from './codegen-cpp.js';
export type { ThemeData } from './reactive-config.js';
export { resolveAssets } from './assets.js';
export {
  resolveEsphome,
  esphomeConfig,
  esphomeCompile,
  esphomeRun,
  esphomeLogs,
} from './esphome-cli.js';
