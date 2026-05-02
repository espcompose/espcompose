// ────────────────────────────────────────────────────────────────────────────
// Semantic IR — barrel exports
// ────────────────────────────────────────────────────────────────────────────

export type {
  SemanticIR,
  IRESPHomeData,
  IRESPComposeData,
  IRReactiveData,
  IRComponent,
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
  IRType,
  IRThemeData,
  IRScript,
  IRScriptParamDecl,
  IRScalarType,
  IRScalarFormat,
  ClosureField,
  ClosureShape,
  ClosureInstance,
  IREntityRegistry,
  IRComponentRegistry,
  IRScriptRegistry,
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
  irType,
  IR_INT, IR_FLOAT, IR_BOOL, IR_STRING,
  IR_INT_ARRAY, IR_FLOAT_ARRAY, IR_BOOL_ARRAY, IR_STRING_ARRAY,
  IR_ID_REF, IR_ENTITY,
} from './types';

export { buildSemanticIR } from './build';
export type { BuildSemanticIRInput, RawIRWidget, RawIRWidgetTree, RawIROverlayTier, RawIROverlayContainer } from './build';

export { serializeIRToJSON } from './serialize-json';

// ── Widget tree IR (target-neutral) ─────────────────────────────────────────
export type {
  IRWidget,
  IRWidgetTree,
  IROverlayContainer,
  IROverlayTier,
} from './widget-types';


// ── Expression IR ────────────────────────────────────────────────────────────
export type {
  ExprType,
  BinaryOp,
  UnaryOp,
  PostfixOp,
  BuiltinFn,
  StringMethod,
  ArrayMethod,
  IRLiteralExpression,
  IRSignalReadExpression,
  IRMemoReadExpression,
  IRSlotExpression,
  IRThemeReadExpression,
  IREntityPropExpression,
  IRComponentReadExpression,
  IRTriggerVarExpression,
  IRGlobalReadExpression,
  IRMuxExpression,
  IRTableLookupExpression,
  IRExpression,
  ExprOpDescriptor,
  IROpExpression,
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
  irLiteralExpression,
  irTriggerVarExpression,
  inferLiteralExprType,
} from './expr-builders';

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
  IRScriptExecuteAction,
  IRScriptWaitAction,
  IRScriptStopAction,
  IRThemeSelectAction,
  IRGlobalSetAction,
  IRArraySetAction,
  IRArrayPushAction,
  IRArrayClearAction,
  IRLambdaAction,
  IRLambdaInterpolation,
  IROverlayShowAction,
  IROverlayHideAction,
  IRControllerMethodCallAction,
  IRCondition,
  IRLambdaCondition,
  IRNativeCondition,
  IRActionConfig,
  IRActionConfigDict,
  IRActionConfigValue,
  IRRefAnnotation,
  IRDuration,
  IRDurationLiteral,
  IRDurationUnit,
  IRTimeout,
  IRTimeoutNever,
  IRScriptParamRef,
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
  irOverlayShow,
  irOverlayHide,
  irControllerMethodCall,
  splitActionKey,
  parseDurationString,
  parseTimeoutString,
} from './action-types';
