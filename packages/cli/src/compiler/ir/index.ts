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
export { analyzeReactiveStrategy } from './hybrid-lowering.js';
export type { ReactiveStrategy, ReactiveAnalysis } from './hybrid-lowering.js';

// Action tree IR (re-exported from @espcompose/core/internals)
export type {
  ActionNode,
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
  IRThemeSelect,
  IRCondition,
  IRLambdaCondition,
  IRNativeCondition,
  IRActionParam,
  IRLiteralParam,
  IRTriggerVarParam,
  IRExpressionParam,
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
  irThemeSelect,
  irLambdaCondition,
  irNativeCondition,
} from './action-tree.js';
