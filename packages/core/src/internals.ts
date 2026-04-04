/**
 * @espcompose/core/internals
 *
 * Compiler & tooling internals — NOT part of the public user-facing SDK API.
 *
 * This sub-path export provides typed access to SDK internals consumed by:
 *   - @espcompose/cli (compiler)
 *   - @espcompose/target-esphome (code-generation)
 *   - @espcompose/target-simulator (code-generation)
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
} from './theme-registry';
export {
  clearReactiveThemeProxy,
} from './reactive-theme';
export {
  themeSignalName,
  dottedToSignalPath,
  inferValueType,
  THEME_SIGNAL_PREFIX,
} from './theme-signals';
export type { ThemeLeaf } from './theme-signals';

// ── Reactive property map (compiler dispatch tables) ───────────────────────
export { REACTIVE_PROPERTY_MAP } from './reactive-properties';

// ── Trigger registry (target codegen) ──────────────────────────────────────
export { TRIGGER_REGISTRY, getTriggerSignature } from './trigger-registry';
export type { TriggerSignature, TriggerVariable } from './trigger-registry';

// ── Intent registry (eslint validation) ────────────────────────────────────
export { INTRINSIC_INTENT_REGISTRY } from './intent-registry';

// ── LVGL codegen tables (target-esphome) ───────────────────────────────────
export {
  LVGL_STYLE_PROP_TABLE,
  LVGL_REACTIVE_STYLE_PROPS,
  LVGL_PART_FLAGS,
  LVGL_STATE_FLAGS,
} from './lvgl-actions';
export type { LvglStylePropDescriptor } from './lvgl-actions';

// ── HA action map (target codegen) ─────────────────────────────────────────
export { HA_ACTION_MAP } from './ha-bindings';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Demoted from public API — still accessible for tooling / target authors
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── Target interface ───────────────────────────────────────────────────────
export type { ComposeTarget, EmitRequest, EmitResult } from './target';

// ── Hooks ──────────────────────────────────────────────────────────────────
export { useEffect } from './hooks/useEffect';
export type { ScriptHandle } from './hooks/useScript';

// ── Hook internals (used by target backends) ───────────────────────────────
export type { HAEntityRegistration, ReactiveBinding, ComponentRegistration } from './hooks/useReactiveScope';

// ── Actions ────────────────────────────────────────────────────────────────
export { waitUntil } from './actions';

// ── Reactive utilities ─────────────────────────────────────────────────────
export type { ReactiveNodeKind, ExpressionDependency, ReactiveNodeConfig } from './reactive-node';
export { resolveBindProp, reactiveIsNaN } from './reactive-utils';
export { validateLibraryFormat, SUPPORTED_FORMAT_VERSIONS } from './__espcompose';

// ── Secrets ────────────────────────────────────────────────────────────────
export { secret, SecretValue, isSecretValue } from './secret';

// ── Theme ──────────────────────────────────────────────────────────────────
export type { FlattenedTheme } from './theme-registry';
export { createReactiveThemeProxy } from './reactive-theme';
export { flattenTheme } from './theme-signals';

// ── HA binding types ───────────────────────────────────────────────────────
export type {
  SensorBinding,
  BinarySensorBinding,
  SwitchBinding,
  FanBinding,
  CoverBinding,
  HAEntityBinding,
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
export { LambdaMarker, SecretMarker, QuotedMarker, isLambdaMarker, isSecretMarker, isQuotedMarker, isSerializeMarker } from './markers';

// ── LVGL ───────────────────────────────────────────────────────────────────
export { lvglWidgetUpdate, LVGL_UPDATABLE_WIDGETS } from './lvgl-actions';

// ── Trigger args ───────────────────────────────────────────────────────────
export { isTriggerVar } from './trigger-args';

// ── Semantic IR ────────────────────────────────────────────────────────────
export { buildSemanticIR, collectFromIR } from './ir/index';
export type {
  SemanticIR, IRESPHomeData, IRESPComposeData, IRReactiveData,
  BuildSemanticIRInput, IRThemeData, IRScriptDefinition,
  IRSection, IRValue, IRScalar, IRObject, IREntry, IRArray, IRNull,
  IRReactive, IRRef, IRAction, IRSecret, IRTriggerVar,
  IRTreeCollected,
} from './ir/index';
export type {
  ExprType, BinaryOp, UnaryOp, PostfixOp, BuiltinFn, StringMethod,
  ExprLiteral, ExprSignalRead, ExprMemoRead,
  ExprBinary, ExprUnary, ExprPostfix, ExprTernary,
  ExprCall, ExprConcat, ExprToString, ExprGroup,
  ExprSlot, ExprResolveFont, ExprThemeRead,
  ExprEntityProp, ExprComponentRead, ExprTriggerVar,
  ExprTypeCast, ExprFormatString, ExprNullCoalesce, ExprStringMethod,
  ExprNode,
} from './ir/index';

// ── Action IR ────────────────────────────────────────────────────────────────
export type {
  ActionNode,
  IRNativeAction, IRHAServiceAction, IRLoggerAction, IRDelayAction,
  IRWaitUntilAction, IRIfAction, IRWhileAction, IRRepeatAction,
  IRScriptExecute, IRScriptWait, IRScriptStop, IRThemeSelect,
  IRCondition, IRLambdaCondition, IRNativeCondition,
  IRActionParam, IRLiteralParam, IRTriggerVarParam, IRExpressionParam,
  IRActionConfig,
} from './ir/index';
export {
  irNativeAction, irHAServiceAction, irLoggerAction, irDelayAction,
  irWaitUntilAction, irIfAction, irWhileAction, irRepeatAction,
  irScriptExecute, irScriptWait, irScriptStop, irThemeSelect,
  irLambdaCondition, irNativeCondition,
} from './ir/index';
