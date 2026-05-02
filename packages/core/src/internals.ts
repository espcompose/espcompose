/**
 * @espcompose/core/internals
 *
 * Compiler & tooling internals — NOT part of the public user-facing SDK API.
 *
 * This sub-path export provides typed access to SDK internals consumed by:
 *   - @espcompose/cli (compiler)
 *   - @espcompose/esphome-target (code-generation)
 *   - @espcompose/eslint (lint rules)
 *
 * Do NOT import from this path in user application code.
 */

// ── Serialization capture (compiler state) ─────────────────────────────────
export {
  createLambdaScalar,
  startSerializationCapture,
  stopSerializationCapture,
} from './serialize/capture';
export type { SerializationCaptures } from './serialize/capture';

// ── Reactive tracking (internal hook machinery) ────────────────────────────
export {
  startTracking,
  stopTracking,
  trackDependency,
  isTracking,
} from './reactive/node';

// ── Ref registry (compiler state) ──────────────────────────────────────────
export {
  registerRefTag,
  getRefTag,
  clearRefRegistry,
} from './serialize/ref-registry';

// ── Secret registry (compiler state) ───────────────────────────────────────
export { getSecrets, clearSecrets } from './serialize/secret';

// ── Theme internals (compiler state + C++ codegen) ─────────────────────────
export {
  clearThemeRegistry,
} from './lvgl/theme/registry';
export {
  clearReactiveThemeProxy,
  clearThemeNodeCache,
} from './lvgl/theme/reactive-proxy';
export {
  inferExprType,
} from './lvgl/theme/signals';
export type { ThemeLeaf } from './lvgl/theme/signals';

// ── Reactive property map (compiler dispatch tables) ───────────────────────
export { REACTIVE_PROPERTY_MAP } from './reactive/properties';

// ── Entity domain metadata (generated from metadata/entity-domains.json) ───
export {
  ENTITY_DOMAINS,
  KNOWN_DOMAIN_NAMES,
  getEntityDomain,
  isKnownDomain,
  defaultStateForDomain,
} from './generated/entity-domains.js';
export type {
  EntityDomainDescriptor,
  EntityActionDescriptor,
  UICategory,
} from './generated/entity-domains.js';

// ── Trigger registry (target codegen) ──────────────────────────────────────
export { TRIGGER_REGISTRY, getTriggerSignature } from './actions/trigger-registry';
export type { TriggerSignature, TriggerVariable } from './actions/trigger-registry';

// ── Intent registry (eslint validation) ────────────────────────────────────
export { INTRINSIC_INTENT_REGISTRY } from './intents/registry';

// ── LVGL codegen tables (esphome-target) ───────────────────────────────────
export {
  LVGL_REACTIVE_STYLE_PROPS,
  LVGL_PART_NAMES,
  LVGL_STATE_NAMES,
} from './lvgl/widget-tables';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Demoted from public API — still accessible for tooling / target authors
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── Target interface ───────────────────────────────────────────────────────
export type { ComposeTarget, ExecuteResult, EmitRequest, EmitResult } from './target';

// ── Hooks ──────────────────────────────────────────────────────────────────
export { useEffect } from './hooks/useEffect';
export type { ScriptHandle } from './hooks/useScript';
export type { ScriptOptions } from './hooks/useScript';

// ── Global hook internals (used by compiler) ───────────────────────────────
export { withGlobalScope, hashGlobalFingerprint, hashFnv1a, irTypeToExprType } from './hooks/global-shared';
export type { GlobalDefinition, GlobalHandle } from './hooks/global-shared';
export { globalTypeToIRType, isArrayGlobalType } from './hooks/useGlobal';
export type { GlobalType, ScalarGlobalType, ArrayGlobalType } from './hooks/useGlobal';
export type { RetainedGlobalType } from './hooks/useRetainedGlobal';

// ── Hook internals (used by target backends) ───────────────────────────────
export type { IRHAEntity, IRBinding, ComponentRegistration, HAEntityVariant } from './hooks/useReactiveScope';
export type { OverlayDefinition, OverlayInstance, OverlayController, CapturedOverlayAction } from './hooks/useOverlay';
export { withOverlayScope, peekOverlayDefinitions } from './hooks/useOverlay';
export { structuralFingerprint, assertOverlayStructuralIdentity } from './hooks/overlay-fingerprint';
export type { LvglVisibilityOptions } from './hooks/useLvglVisibility';
export { resolveControllerMethodCalls, cleanControllerRefs } from './actions/resolve/controller';

// ── Capture Protocol ───────────────────────────────────────────────────────
export type { ClosureDescriptor } from './actions/closure';
export { registerClosureDescriptor, findClosureDescriptor } from './actions/closure';

// ── Actions ────────────────────────────────────────────────────────────────
export { waitUntil } from './actions/primitives';

// ── Types (internal-only) ──────────────────────────────────────────────────
export { RefHandle } from './types';

// ── Reactive utilities ─────────────────────────────────────────────────────
export type { IRReactiveNodeKind, IRDependency, IRReactiveNodeConfig, DependencySourceType } from './reactive/node';
export { useReactive, reactiveIsNaN } from './reactive/utils';

// ── Secrets ────────────────────────────────────────────────────────────────
export { secret, SecretValue, isSecretValue } from './serialize/secret';

// ── Theme ──────────────────────────────────────────────────────────────────
export type { FlattenedTheme } from './lvgl/theme/registry';
export { createReactiveThemeProxy } from './lvgl/theme/reactive-proxy';
export { flattenTheme } from './lvgl/theme/signals';
export { scopeHash } from './lvgl/theme/scope-hash';
// ── HA binding types ───────────────────────────────────────────────────────
export type {
  SensorBinding,
  BinarySensorBinding,
  SwitchBinding,
  FanBinding,
  CoverBinding,
  HAEntityBindingMap,
} from './entity/ha-bindings';

// ── Reactive property types ────────────────────────────────────────────────
export type {
  InferReactiveProperties,
  SensorReactiveProps,
  BinarySensorReactiveProps,
  LightReactiveProps,
  SwitchReactiveProps,
  FanReactiveProps,
  CoverReactiveProps,
  ReactivePropertyConfig,
} from './reactive/properties';

// ── Serialize markers ──────────────────────────────────────────────────────

export { LambdaMarker, SecretMarker, QuotedMarker, isSerializeMarker } from './serialize/markers';

// ── HA entity classifier (core-local, deterministic) ───────────────────────
export {
  classifyHAEntity,
} from './entity/ha-classifier';
export type {
  HAEntityClassifyInput,
  HAEntityClassifyResult,
} from './entity/ha-classifier';

// ── LVGL ───────────────────────────────────────────────────────────────────
export { LVGL_UPDATABLE_WIDGETS } from './lvgl/widget-tables';

// ── Trigger args ───────────────────────────────────────────────────────────
export { isTriggerVar } from './actions/triggers';

// ── Semantic IR ────────────────────────────────────────────────────────────
export { buildSemanticIR, serializeIRToJSON } from './ir/index';
export {
  irSection, irScalar, irObject, irEntry, irArray, irNull,
  irReactive, irRef, irAction, irSecret, irTriggerVar, irType,
  IR_INT, IR_FLOAT, IR_BOOL, IR_STRING,
  IR_INT_ARRAY, IR_FLOAT_ARRAY, IR_BOOL_ARRAY, IR_STRING_ARRAY,
  IR_ID_REF, IR_ENTITY,
} from './ir/index';
export type {
  SemanticIR, IRESPHomeData, IRESPComposeData, IRReactiveData,
  BuildSemanticIRInput, IRThemeData, IRScript, IRComponent,
  IRScriptParamDecl, IRScriptParamRef,
  IRScalarType, IRScalarFormat, IRType,
  ClosureField, ClosureShape, ClosureInstance,
  IRSection, IRValue, IRScalar, IRObject, IREntry, IRArray, IRNull,
  IRReactive, IRRef, IRAction, IRSecret, IRTriggerVar,
  IRWidget, IRWidgetTree, IROverlayContainer, IROverlayTier,
} from './ir/index';
export type {
  ExprType, BinaryOp, UnaryOp, PostfixOp, BuiltinFn, StringMethod, ArrayMethod,
  IRLiteralExpression, IRSignalReadExpression, IRMemoReadExpression,
  IRSlotExpression, IRThemeReadExpression,
  IREntityPropExpression, IRComponentReadExpression, IRTriggerVarExpression, IRGlobalReadExpression,
  IRMuxExpression, IRTableLookupExpression,
  IRExpression,
  ExprOpDescriptor, IROpExpression,
} from './ir/index';
export {
  irBinary, irUnary, irPostfix, irTernary,
  irCall, irConcat, irToString, irGroup,
  irTypeCast, irFormatString, irNullCoalesce,
  irStringMethod, irArrayIndex, irArrayMethod,
  irLiteralExpression, irTriggerVarExpression, inferLiteralExprType,
} from './ir/index';
export { getExprChildren, mapExprChildren } from './ir/index';
export { analyzeExprStructure, analyzeActionStructure } from './ir/index';
export type {
  ExprStructuralAnalysis,
  ExprHole,
  ExprLiteralHole,
  ExprSignalReadHole,
  ActionStructuralAnalysis,
  ActionParamHole,
} from './ir/index';

// ── Action IR ────────────────────────────────────────────────────────────────
export type {
  IRActionNode,
  IRNativeAction, IRHAServiceAction, IRLoggerAction, IRDelayAction,
  IRWaitUntilAction, IRIfAction, IRWhileAction, IRRepeatAction,
  IRScriptExecuteAction, IRScriptWaitAction, IRScriptStopAction, IRThemeSelectAction, IRGlobalSetAction,
  IRArraySetAction, IRArrayPushAction, IRArrayClearAction,
  IRLambdaAction, IRLambdaInterpolation,
  IROverlayShowAction, IROverlayHideAction,
  IRControllerMethodCallAction,
  IRCondition, IRLambdaCondition, IRNativeCondition,
  IRActionConfig, IRActionConfigDict, IRActionConfigValue,
  IRRefAnnotation,
  IRDuration, IRDurationLiteral, IRDurationUnit, IRTimeout, IRTimeoutNever,
} from './ir/index';
export {
  irNativeAction, irHAServiceAction, irLoggerAction, irDelayAction,
  irWaitUntilAction, irIfAction, irWhileAction, irRepeatAction,
  irScriptExecute, irScriptWait, irScriptStop, irThemeSelect,
  irGlobalSet,
  irArraySet, irArrayPush, irArrayClear,
  irLambdaCondition, irLambdaAction,
  irOverlayShow, irOverlayHide,
  irControllerMethodCall,
  splitActionKey, parseDurationString, parseTimeoutString,
} from './ir/index';
