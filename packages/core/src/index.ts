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
export { BINDING_BRAND, useRef, isRef } from './types';
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

export { registerTheme, getThemeRegistry, theme } from './theme/registry';
export { useTheme } from './theme/reactive-proxy';
export { scopeHash } from './theme/scope-hash';

// Theme — font tokens
export { FONT_TOKEN_BRAND, createFontToken, isFontToken } from './theme/font-token';
export type { FontToken, FontBpp } from './theme/font-token';

// Theme — hex color type
export { isHexColor } from './theme/hex-color';
export type { HexColor } from './theme/hex-color';

// Theme — font resolver
export { collectThemeFonts, substituteThemeFonts } from './theme/font-resolver';

// Theme — leaf accessor
export { themeLeaf } from './theme/theme-leaf';

// Theme — ThemeProvider component
export { ThemeProvider } from './theme/ThemeProvider';
export type { ThemeProviderProps } from './theme/ThemeProvider';

// ────────────────────────────────────────────────────────────────────────────
// Public API — CSS-like Style System
// ────────────────────────────────────────────────────────────────────────────

export type { CssStyleProps, CssAliasProps, CssStyle, LvglStateName, LvglPartName, SizeValue, Percentage } from './style-types';
export { expandCssStyle } from './style-mapping';
export { createStyles, mergeStyles } from './theme/create-styles';

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
