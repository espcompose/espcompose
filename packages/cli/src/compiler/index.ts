export { compile, build, lint, compileToIR } from './compiler';
export type { CompileOptions } from './compiler';
// Re-export ComposeTarget from the SDK for convenience
export type { ComposeTarget, EmitRequest, EmitResult } from '@esphome/compose/internals';

// IR layer
export {
  buildIR,
  lowerIR,
  type IRRoot,
  type IRSection,
  type IRValue,
} from './ir/index';
