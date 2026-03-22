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

// Re-export the generated barrel: JSX.IntrinsicElements augmentations,
// component-prop interfaces & marker phantom-types.
export * from './generated/index';
