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
} from './serialize';
export type { SerializationCaptures } from './serialize';

// ── Reactive tracking (internal hook machinery) ────────────────────────────
export {
  startTracking,
  stopTracking,
  trackDependency,
  isTracking,
} from './reactive-node';

// ── Ref registry (compiler state) ──────────────────────────────────────────
export {
  registerRefTag,
  getRefTag,
  clearRefRegistry,
} from './ref-registry';

// ── Secret registry (compiler state) ───────────────────────────────────────
export { getSecrets, clearSecrets } from './secret';

// ── Theme internals (compiler state + C++ codegen) ─────────────────────────
export {
  clearThemeRegistry,
} from './theme/registry';
export {
  clearReactiveThemeProxy,
  clearThemeNodeCache,
} from './theme/reactive-proxy';
export {
  inferValueType,
} from './theme/signals';
export type { ThemeLeaf } from './theme/signals';

// ── Reactive property map (compiler dispatch tables) ───────────────────────
export { REACTIVE_PROPERTY_MAP } from './reactive-properties';

// ── Entity domain metadata (generated from metadata/entity-domains.json) ───
export {
  ENTITY_DOMAINS,
  KNOWN_DOMAIN_NAMES,
  getEntityDomain,
  isKnownDomain,
  getDomainSensorType,
  defaultStateForDomain,
} from './generated/entity-domains.js';
export type {
  EntityDomainDescriptor,
  EntityPropertyDescriptor,
  EntityActionDescriptor,
  SensorPlatform,
  UICategory,
} from './generated/entity-domains.js';

// ── Trigger registry (target codegen) ──────────────────────────────────────
export { TRIGGER_REGISTRY, getTriggerSignature } from './trigger-registry';
export type { TriggerSignature, TriggerVariable } from './trigger-registry';

// ── Intent registry (eslint validation) ────────────────────────────────────
export { INTRINSIC_INTENT_REGISTRY } from './intent-registry';

// ── LVGL codegen tables (esphome-target) ───────────────────────────────────
export {
  LVGL_STYLE_PROP_TABLE,
  LVGL_REACTIVE_STYLE_PROPS,
  LVGL_PART_FLAGS,
  LVGL_STATE_FLAGS,
} from './lvgl-actions';
export type { LvglStylePropDescriptor } from './lvgl-actions';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Demoted from public API — still accessible for tooling / target authors
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── Target interface ───────────────────────────────────────────────────────
export type { ComposeTarget, EmitRequest, EmitResult } from './target';

// ── Hooks ──────────────────────────────────────────────────────────────────
export { useEffect } from './hooks/useEffect';
export type { ScriptHandle } from './hooks/useScript';

// ── Global hook internals (used by compiler) ───────────────────────────────
export { withGlobalScope, hashGlobalFingerprint, cppTypeToExprType } from './hooks/global-shared';
export type { GlobalDefinition, GlobalHandle } from './hooks/global-shared';
export { globalTypeToCpp, isArrayGlobalType } from './hooks/useGlobal';
export type { GlobalType, ScalarGlobalType, ArrayGlobalType } from './hooks/useGlobal';
export type { RetainedGlobalType } from './hooks/useRetainedGlobal';

// ── Hook internals (used by target backends) ───────────────────────────────
export type { IRHAEntity, IRBinding, IRComponent } from './hooks/useReactiveScope';

// ── Actions ────────────────────────────────────────────────────────────────
export { waitUntil } from './actions';

// ── Types (internal-only) ──────────────────────────────────────────────────
export { RefHandle } from './types';

// ── Reactive utilities ─────────────────────────────────────────────────────
export type { IRReactiveNodeKind, IRDependency, IRReactiveNodeConfig } from './reactive-node';
export { useReactive, reactiveIsNaN } from './reactive-utils';
export { validateLibraryFormat, SUPPORTED_FORMAT_VERSIONS } from './__espcompose';

// ── Secrets ────────────────────────────────────────────────────────────────
export { secret, SecretValue, isSecretValue } from './secret';

// ── Theme ──────────────────────────────────────────────────────────────────
export type { FlattenedTheme } from './theme/registry';
export { createReactiveThemeProxy } from './theme/reactive-proxy';
export { flattenTheme } from './theme/signals';
export { scopeHash } from './theme/scope-hash';
// ── HA binding types ───────────────────────────────────────────────────────
export type {
  SensorBinding,
  BinarySensorBinding,
  SwitchBinding,
  FanBinding,
  CoverBinding,
  HAEntityBindingMap,
} from './ha-bindings';

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
} from './reactive-properties';

// ── Serialize markers ──────────────────────────────────────────────────────
export { camelToSnake } from './serialize';
export { LambdaMarker, SecretMarker, QuotedMarker, isSerializeMarker } from './markers';

// ── LVGL ───────────────────────────────────────────────────────────────────
export { LVGL_UPDATABLE_WIDGETS } from './lvgl-actions';

// ── Trigger args ───────────────────────────────────────────────────────────
export { isTriggerVar } from './trigger-args';

// ── Semantic IR ────────────────────────────────────────────────────────────
export { buildSemanticIR } from './ir/index';
export {
  irSection, irScalar, irObject, irEntry, irArray, irNull,
  irReactive, irRef, irAction, irSecret, irTriggerVar,
} from './ir/index';
export type {
  SemanticIR, IRESPHomeData, IRESPComposeData, IRReactiveData,
  BuildSemanticIRInput, IRThemeScopeData, IRScript,
  IRSection, IRValue, IRScalar, IRObject, IREntry, IRArray, IRNull,
  IRReactive, IRRef, IRAction, IRSecret, IRTriggerVar,
} from './ir/index';
export type {
  ExprType, BinaryOp, UnaryOp, PostfixOp, BuiltinFn, StringMethod, ArrayMethod,
  IRExprLiteral, IRExprSignalRead, IRExprMemoRead,
  IRExprBinary, IRExprUnary, IRExprPostfix, IRExprTernary,
  IRExprCall, IRExprConcat, IRExprToString, IRExprGroup,
  IRExprSlot, IRExprResolveFont, IRExprThemeRead,
  IRExprEntityProp, IRExprComponentRead, IRExprTriggerVar,
  IRExprTypeCast, IRExprFormatString, IRExprNullCoalesce, IRExprStringMethod,
  IRExprArrayIndex, IRExprArrayMethod,
  IRExprNode,
} from './ir/index';

// ── Action IR ────────────────────────────────────────────────────────────────
export type {
  IRActionNode,
  IRNativeAction, IRHAServiceAction, IRLoggerAction, IRDelayAction,
  IRWaitUntilAction, IRIfAction, IRWhileAction, IRRepeatAction,
  IRScriptExecute, IRScriptWait, IRScriptStop, IRThemeSelect, IRGlobalSet,
  IRArraySet, IRArrayPush, IRArrayClear,
  IRCondition, IRLambdaCondition, IRNativeCondition,
  IRActionParam, IRLiteralParam, IRTriggerVarParam, IRExpressionParam,
  IRActionConfig, IRActionConfigDict, IRActionConfigValue,
} from './ir/index';
export {
  irNativeAction, irHAServiceAction, irLoggerAction, irDelayAction,
  irWaitUntilAction, irIfAction, irWhileAction, irRepeatAction,
  irScriptExecute, irScriptWait, irScriptStop, irThemeSelect,
  irGlobalSet,
  irArraySet, irArrayPush, irArrayClear,
  irLambdaCondition,
} from './ir/index';
