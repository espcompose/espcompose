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
  Reactive,
  WidgetProps,
  WidgetPropsWithChildren,
} from './types';
export { BINDING_BRAND, THEME_BRAND, useRef, isRef } from './types';
export * from './intents';

// Re-export the generated barrel: JSX.IntrinsicElements augmentations,
// component-prop interfaces & marker phantom-types.
export * from './generated/index';

// Hand-curated top-level aliases for commonly used component refs.
export * from './component-aliases';

// Hand-authored ec-canvas intrinsic element types.
// The wildcard re-export ensures TypeScript processes the `declare global`
// augmentation that adds ec-* elements to JSX.IntrinsicElements.
export * from './ec-canvas';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Hooks
// ────────────────────────────────────────────────────────────────────────────

export { useHAEntity } from './hooks/useHAEntity';
export type { LightBinding, SensorBinding, BinarySensorBinding, SwitchBinding, FanBinding, CoverBinding } from './device-bindings';
export { useImage } from './hooks/useImage';
export { useFont } from './hooks/useFont';
export { useScript } from './hooks/useScript';
export { useMemo } from './hooks/useMemo';
export { useLvgl } from './hooks/useLvgl';
export { useGlobal } from './hooks/useGlobal';
export type { GlobalType, ScalarGlobalType, ArrayGlobalType, InferGlobalTS, VolatileGlobalOptions, GlobalArrayHandle } from './hooks/useGlobal';
export { useRetainedGlobal } from './hooks/useRetainedGlobal';
export type { RetainedGlobalType, InferRetainedTS, RetainedGlobalOptions } from './hooks/useRetainedGlobal';
export type { GlobalHandle } from './hooks/global-shared';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Actions
// ────────────────────────────────────────────────────────────────────────────

export { delay, logger } from './actions';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Secrets
// ────────────────────────────────────────────────────────────────────────────

export { secret } from './secret';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Reactive utilities
// ────────────────────────────────────────────────────────────────────────────

// __espcompose — compiler-internal reactive plumbing (injected into user bundles by CLI)
export { __espcompose } from './__espcompose';
export { useReactive, useReactiveMap } from './reactive-utils';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Theme
// ────────────────────────────────────────────────────────────────────────────

// createTheme — typed theme handle factory
export { createTheme } from './theme/create-theme';
export type { ThemeHandle, ThemeProviderProps } from './theme/create-theme';

// Theme — registry (internal, re-exported for compiler phases)
export { getThemeRegistry } from './theme/registry';

// Theme — scope hashing (internal, re-exported for compiler phases)
export { scopeHash } from './theme/scope-hash';

// Theme — font tokens
export { FONT_TOKEN_BRAND, createFontToken, isFontToken } from './theme/font-token';
export type { FontToken, FontBpp } from './theme/font-token';

// Theme — hex color type
export { isHexColor } from './theme/hex-color';
export type { HexColor } from './theme/hex-color';

// ────────────────────────────────────────────────────────────────────────────
// Public API — CSS-like Style System
// ────────────────────────────────────────────────────────────────────────────

export type { CssStyleProps, CssAliasProps, CssStyle, LvglStateName, LvglPartName, SizeValue, Percentage } from './style-types';
export { expandCssStyle } from './style-mapping';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Wireframe
// ────────────────────────────────────────────────────────────────────────────

export { isWireframeEnabled, setWireframeEnabled, clearWireframe, WIREFRAME_COLORS } from './wireframe';
export type { WidgetCategory } from './wireframe';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Used by theme resolvers
// ────────────────────────────────────────────────────────────────────────────

export type { IRExprNode } from './ir/index';
export { IRReactiveNode, isIRReactiveNode } from './reactive-node';
export type { Signal } from './reactive-node';
