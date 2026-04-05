/**
 * ESPHome TSX SDK
 *
 * This package provides the core framework for writing ESPHome configurations
 * using TypeScript/TSX syntax that compiles to ESPHome YAML.
 *
 * Design-system components have moved to @espcompose/ui.
 *
 * Public API: import from '@espcompose/core'
 * Compiler internals: import from '@espcompose/core/internals'
 */

// ────────────────────────────────────────────────────────────────────────────
// Public API — Core types & JSX runtime
// ────────────────────────────────────────────────────────────────────────────

export * from './runtime';
export type {
  FunctionComponent,
  EspComposeElement,
  TriggerHandler,
  TimePeriod,
  MACAddress,
  IPv4Address,
  Ref,
  RefProp,
  BaseProps,
  ComponentProps,
  PinMode,
  PinConfig,
  Pin,
  BindProp,
} from './types';
export { ACTION_BRAND, useRef, isRef } from './types';
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

// __espcompose — compiler-internal reactive plumbing (injected into user bundles by CLI)
export { __espcompose } from './__espcompose';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Theme
// ────────────────────────────────────────────────────────────────────────────

export { registerTheme, getThemeRegistry, theme } from './theme-registry';
export { useReactiveTheme } from './reactive-theme';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Used by theme resolvers
// ────────────────────────────────────────────────────────────────────────────

export type { IRExprNode } from './ir/index';
export { IRReactiveNode, isIRReactiveNode } from './reactive-node';
export type { Signal } from './reactive-node';
