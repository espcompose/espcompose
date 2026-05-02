// @espcompose/esphome-target — YAML/C++ firmware target backend
// Lowers SemanticIR to ESPHome YAML config + C++ reactive runtime headers.

// ComposeTarget implementation
export { createEsphomeTarget } from './target.js';

// Action lowering (used by CLI script-transformer)
export { lowerActionTree } from './actions';

// Host platform IR transform
export { transformIRForHost } from './host-ir-transform.js';
export type { HostTransformOptions } from './host-ir-transform.js';

// ESPHome CLI wrappers
export {
  resolveEsphome,
  esphomeConfig,
  esphomeCompile,
  esphomeRun,
  esphomeLogs,
} from './esphome-cli.js';

// LVGL widget-tree YAML emitter (registered with core's hook before render)
export { lowerLvglWidgetTree, lowerLvglWidget } from './lvgl';

// YAML key/element shaping utilities (also used by the CLI action transformer
// when emitting ESPHome action configs).
export { camelToSnake, toYamlKey } from './yaml-utils.js';
