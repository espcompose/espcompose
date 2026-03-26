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
export * from './actions';
export * from './intents';
export { INTRINSIC_INTENT_REGISTRY } from './intent-registry';
export { camelToSnake, createLambdaScalar } from './serialize';
export { Expression, isExpression } from './expression';
export type { ExpressionConfig, ExpressionDependency } from './expression';
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
export { lvglWidgetUpdate, LVGL_UPDATABLE_WIDGETS } from './lvgl-actions';
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
