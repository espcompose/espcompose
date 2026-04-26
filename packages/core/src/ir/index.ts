// ────────────────────────────────────────────────────────────────────────────
// Semantic IR — barrel exports
// ────────────────────────────────────────────────────────────────────────────

export type {
  SemanticIR,
  IRESPHomeData,
  IRESPComposeData,
  IRReactiveData,
  IRSection,
  IRValue,
  IRScalar,
  IRObject,
  IREntry,
  IRArray,
  IRNull,
  IRReactive,
  IRRef,
  IRAction,
  IRSecret,
  IRTriggerVar,
  IRThemeData,
  IRScript,
} from './types';

export {
  irSection,
  irScalar,
  irObject,
  irEntry,
  irArray,
  irNull,
  irReactive,
  irRef,
  irAction,
  irSecret,
  irTriggerVar,
} from './types';

export { buildSemanticIR } from './build';
export type { BuildSemanticIRInput } from './build';


// ── Expression IR ────────────────────────────────────────────────────────────
export type {
  ExprType,
  BinaryOp,
  UnaryOp,
  PostfixOp,
  BuiltinFn,
  StringMethod,
  ArrayMethod,
  IRExprLiteral,
  IRExprSignalRead,
  IRExprMemoRead,
  IRExprSlot,
  IRExprThemeRead,
  IRExprEntityProp,
  IRExprComponentRead,
  IRExprTriggerVar,
  IRExprGlobalRead,
  IRExprMux,
  IRExprTableLookup,
  IRExprNode,
  ExprOpDescriptor,
  IRExprOp,
} from './expr-types';

export {
  irBinary,
  irUnary,
  irPostfix,
  irTernary,
  irCall,
  irConcat,
  irToString,
  irGroup,
  irTypeCast,
  irFormatString,
  irNullCoalesce,
  irStringMethod,
  irArrayIndex,
  irArrayMethod,
} from './expr-builders';

export {
  operandOf,
  exprOf,
  leftOf,
  rightOf,
  testOf,
  consequentOf,
  alternateOf,
  argsOf,
  partsOf,
  objectOf,
  methodArgsOf,
  arrayOf,
  indexOf,
} from './expr-accessors';

export { getExprChildren, mapExprChildren } from './expr-walk';
export { analyzeExprStructure, analyzeActionStructure } from './structural-analysis';
export type {
  ExprStructuralAnalysis,
  ExprHole,
  ExprLiteralHole,
  ExprSignalReadHole,
  ActionStructuralAnalysis,
  ActionParamHole,
} from './structural-analysis';

// ── Action IR ────────────────────────────────────────────────────────────────
export type {
  IRActionNode,
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
  IRGlobalSet,
  IRArraySet,
  IRArrayPush,
  IRArrayClear,
  IRLambdaAction,
  IRLambdaSlot,
  IRPopupShow,
  IRPopupDismiss,
  IRCondition,
  IRLambdaCondition,
  IRNativeCondition,
  IRActionParam,
  IRLiteralParam,
  IRTriggerVarParam,
  IRExpressionParam,
  IRReactiveExprParam,
  IRActionConfig,
  IRActionConfigDict,
  IRActionConfigValue,
} from './action-types';

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
  irGlobalSet,
  irArraySet,
  irArrayPush,
  irArrayClear,
  irLambdaCondition,
  irLambdaAction,
  irPopupShow,
  irPopupDismiss,
} from './action-types';
