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
  isIRScalar,
  isIRObject,
  isIRArray,
  isIRNull,
  isIRReactive,
  isIRRef,
  isIRAction,
  isIRSecret,
  isIRTriggerVar,
} from './types';

export { buildSemanticIR } from './build';
export type { BuildSemanticIRInput } from './build';

export { collectFromIR } from './traverse';
export type { IRTreeCollected } from './traverse';

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
  IRExprNode,
} from './expr-types';

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
  IRCondition,
  IRLambdaCondition,
  IRNativeCondition,
  IRActionParam,
  IRLiteralParam,
  IRTriggerVarParam,
  IRExpressionParam,
  IRActionConfig,
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
  irLambdaCondition,
  irNativeCondition,
} from './action-types';
