export { compile, build, lint } from './compiler';
export type { CompileOptions } from './compiler';
export {
  resolveEsphome,
  esphomeConfig,
  esphomeCompile,
  esphomeRun,
  esphomeLogs,
} from './esphome';

// IR layer
export {
  buildIR,
  lowerIR,
  type IRRoot,
  type IRSection,
  type IRValue,
} from './ir/index';
