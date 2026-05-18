export { generateCppFromIR } from './cpp';
export type { CppBackendResult } from './cpp';

export {
  generateBindingsHeader,
  generateSignalSetLambda,
  generateInitialValueLambda,
  getRuntimeHeaderContent,
} from './bindings';
export type {
  SignalDecl,
  MemoDecl,
  EffectDecl,
  WidgetBindingDecl,
  ThemeMemoDecl,
  TriggerFunctionDecl,
  ThemeScopeConfig,
  BoundSignalDecl,
  TableDecl,
  ReactiveRuntimeConfig,
} from './bindings';

export { buildRuntimeConfig, injectReactiveBindingsRuntime } from './reactive-config';
export type { ThemeScopeData } from './reactive-config';

export { injectHASensorImports } from './reactive-injector';

export { processOverlayMux } from './overlay-mux';
export type { OverlayMuxResult } from './overlay-mux';

export {
  generateAllClosureTables,
  buildClosureTableDecl,
  generateClosureTableLines,
  formatClosureValue,
  closureStructName,
  closureArrayName,
} from './closure-table';
export type { ClosureTableDecl } from './closure-table';
