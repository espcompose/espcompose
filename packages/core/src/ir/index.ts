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
  IRScriptParam,
  IRScriptParamRef,
  IRScalarType,
  IRScalarFormat,
  IRValueType,
  ClosureField,
  ClosureFieldKind,
  ClosureShape,
  ClosureInstance,
  IRClosureValue,
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

// ── Widget tree IR (target-neutral) ─────────────────────────────────────────
export type {
  IRWidget,
  IRWidgetTree,
  IROverlayContainer,
  IROverlayTier,
} from './widget-types';
export { EC_CANVAS_OPAQUE_KIND, EC_CANVAS_OPAQUE_PAYLOAD_KEY } from './widget-types';


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
  IROverlayShow,
  IROverlayHide,
  IRControllerMethodCall,
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
  IRRefSlot,
  IRDuration,
  IRDurationLiteral,
  IRDurationUnit,
  IRTimeout,
  IRTimeoutNever,
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
