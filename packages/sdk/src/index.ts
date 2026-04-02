/**
 * ESPHome TSX SDK
 *
 * This package provides the core framework for writing ESPHome configurations
 * using TypeScript/TSX syntax that compiles to ESPHome YAML.
 *
 * Design-system components have moved to @esphome/compose-ui.
 *
 * Public API: import from '@esphome/compose'
 * Compiler internals: import from '@esphome/compose/internals'
 */

// ────────────────────────────────────────────────────────────────────────────
// Public API — Core types & JSX runtime
// ────────────────────────────────────────────────────────────────────────────

export * from './runtime';
export * from './types';
export * from './intents';

// Re-export the generated barrel: JSX.IntrinsicElements augmentations,
// component-prop interfaces & marker phantom-types.
export * from './generated/index';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Hooks
// ────────────────────────────────────────────────────────────────────────────

export { useHAEntity } from './hooks/useHAEntity';
export { useImage } from './hooks/useImage';
export { useFont } from './hooks/useFont';
export { useScript } from './hooks/useScript';
export { useMemo } from './hooks/useMemo';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Actions
// ────────────────────────────────────────────────────────────────────────────

export { delay, logger } from './actions';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Reactive utilities
// ────────────────────────────────────────────────────────────────────────────

export { ReactiveNode, isReactiveNode } from './reactive-node';
export type { Signal } from './reactive-node';

export type { BindProp } from './reactive-utils';

// _reactive — compiler-internal reactive plumbing (injected into user bundles by CLI)
export { _reactive } from './_reactive';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Theme
// ────────────────────────────────────────────────────────────────────────────

export { registerTheme, getThemeRegistry, theme } from './theme-registry';
export { useReactiveTheme } from './reactive-theme';

// ────────────────────────────────────────────────────────────────────────────
// Public API — HA bindings
// ────────────────────────────────────────────────────────────────────────────

export type { LightBinding } from './ha-bindings';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Expression types (consumed by UI theme resolvers)
// ────────────────────────────────────────────────────────────────────────────

export type { ExprNode } from './ir/index';
