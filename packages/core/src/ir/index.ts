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
  IRExprLiteral,
  IRExprSignalRead,
  IRExprMemoRead,
  IRExprBinary,
  IRExprUnary,
  IRExprPostfix,
  IRExprTernary,
  IRExprCall,
  IRExprConcat,
  IRExprToString,
  IRExprGroup,
  IRExprSlot,
  IRExprResolveFont,
  IRExprThemeRead,
  IRExprEntityProp,
  IRExprComponentRead,
  IRExprTriggerVar,
  IRExprTypeCast,
  IRExprFormatString,
  IRExprNullCoalesce,
  IRExprStringMethod,
  IRExprArrayIndex,
  IRExprArrayMethod,
  IRExprMux,
  IRExprTableLookup,
  ArrayMethod,
  IRExprNode,
} from './expr-types';

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
