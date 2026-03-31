/**
 * ESPHome TSX SDK
 *
 * This package provides the core framework for writing ESPHome configurations
 * using TypeScript/TSX syntax that compiles to ESPHome YAML.
 *
 * Design-system components have moved to @esphome/compose-ui.
 */

export * from './runtime';
export * from './types';
export * from './intents';
export { INTRINSIC_INTENT_REGISTRY } from './intent-registry';
export { camelToSnake, createLambdaScalar } from './serialize';
export { TRIGGER_REGISTRY, getTriggerSignature } from './trigger-registry';
export type { TriggerSignature, TriggerVariable } from './trigger-registry';
export { HA_ACTION_MAP } from './ha-bindings';
export type {
  LightBinding,
  SensorBinding,
  BinarySensorBinding,
  SwitchBinding,
  FanBinding,
  CoverBinding,
} from './ha-bindings';
export { lvglWidgetUpdate, LVGL_UPDATABLE_WIDGETS, LVGL_STYLE_PROP_TABLE, LVGL_REACTIVE_STYLE_PROPS, LVGL_PART_FLAGS, LVGL_STATE_FLAGS } from './lvgl-actions';
export type { LvglStylePropDescriptor } from './lvgl-actions';
export { REACTIVE_PROPERTY_MAP } from './reactive-properties';
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

// Re-export the generated barrel: JSX.IntrinsicElements augmentations,
// component-prop interfaces & marker phantom-types.
export * from './generated/index';

// ── Phase A: new authoring-model namespaces ────────────────────────────────

// Phase tracking
export { setPhase, getPhase, assertPhase, PhaseError } from './phase';
export type { Phase } from './phase';

// build — compile-time Node.js execution
export { build, BuildValue, isBuildValue } from './build';
export type { BuildValueOf } from './build';

// embed — build→device value crossing
export { embed, EmbedValue, isEmbedValue, getSecrets, clearSecrets } from './embed';
export type { EmbedKind } from './embed';

// defineProject — project descriptor wrapper
export { defineProject, isProjectDefinition } from './project';
export type { ProjectDefinition, DefineProjectOptions } from './project';

// bind — device-reactive data binding
export { bind } from './bind';
export type { BindProp, HAEntityBinding, HAEntityBindingMap } from './bind';

// ReactiveNode — unified reactive value abstraction
export {
  ReactiveNode,
  isReactiveNode,
  startTracking,
  stopTracking,
  trackDependency,
  isTracking,
} from './reactive-node';
export type { Signal, ReactiveNodeKind, ExpressionDependency, ReactiveNodeConfig } from './reactive-node';


// device — device-imperative escape hatch
export {
  device,
  DeviceLambda,
  isDeviceLambda,
  getIncludes,
  clearIncludes,
} from './device';

// Action primitives for trigger handler / createScript() bodies
export { delay, waitUntil, logger } from './actions';

// Ref registry — maps ref tokens to element tags / action classes
export { registerRefTag, getRefTag, getRefClasses, clearRefRegistry } from './ref-registry';

// Trigger args — typed trigger variable access in action bodies
export { isTriggerVar } from './trigger-args';

// Theme signals — flatten themes into reactive signal maps
export {
  flattenTheme,
  themeSignalName,
  dottedToSignalPath,
  inferCppType,
  THEME_SIGNAL_PREFIX,
} from './theme-signals';
export type { ThemeLeaf } from './theme-signals';

// Theme registry — compile-time theme registration + select API
export {
  getThemeRegistry,
  clearThemeRegistry,
  registerTheme,
  theme,
} from './theme-registry';
export type { FlattenedTheme } from './theme-registry';

// Reactive theme — proxy + hook
export {
  createReactiveThemeProxy,
  useReactiveTheme,
  clearReactiveThemeProxy,
} from './reactive-theme';
