export type {
  IRRoot,
  IRSection,
  IRValue,
  IRScalar,
  IRObject,
  IRArray,
  IRLambda,
  IRNull,
  IREntry,
} from './types.js';

export {
  irRoot,
  irSection,
  irScalar,
  irObject,
  irArray,
  irLambda,
  irNull,
  irEntry,
  isIRScalar,
  isIRObject,
  isIRArray,
  isIRLambda,
  isIRNull,
} from './types.js';

export { buildIR, configValueToIR } from './build-ir.js';
export { lowerIR, irValueToConfig } from './lower-ir.js';
export { analyzeReactiveStrategy, injectRuntimeIncludes } from './hybrid-lowering.js';
export type { ReactiveStrategy, ReactiveAnalysis } from './hybrid-lowering.js';

// Action tree IR
export type {
  IRAction,
  IRNativeAction,
  IRHAServiceAction,
  IRLoggerAction,
  IRDelayAction,
  IRWaitUntilAction,
  IRIfAction,
  IRWhileAction,
  IRRepeatAction,
  IRScriptExecute,
  IRScriptWait,
  IRScriptStop,
  IRInternalLambda,
  IRCondition,
  IRLambdaCondition,
  IRNativeCondition,
  IRActionParam,
  IRLiteralParam,
  IRTriggerVarParam,
  IRActionConfig,
} from './action-tree.js';

export {
  irNativeAction,
  irHAServiceAction,
  irLoggerAction,
  irDelayAction,
  irWaitUntilAction,
  irIfAction,
  irWhileAction,
  irRepeatAction,
  irScriptExecute,
  irScriptWait,
  irScriptStop,
  irInternalLambda,
  irLambdaCondition,
  irNativeCondition,
  lowerActionTree,
} from './action-tree.js';
