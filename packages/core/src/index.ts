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
// Public API — Core types
// ────────────────────────────────────────────────────────────────────────────

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
  VisibilityController,
} from './types';
export { useRef, isRef } from './types';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Runtime (createElement escape-hatch for untyped components)
// ────────────────────────────────────────────────────────────────────────────

export { createElement, Fragment } from './runtime';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Intent system (explicit re-exports from ./intents/intents)
// ────────────────────────────────────────────────────────────────────────────

export { createComponent, createEspHomeComponent, createLvglWidget, createLvglContainerWidget, createLvglContextProvider, createLvglLayoutWidget } from './intents/intents';
export type { IntentBrand, IntentComponent, IntentBrandOptions, IntrinsicIntentMeta } from './intents/intents';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Generated component types & JSX augmentations
//
// This is the single wildcard exception: the generated barrel is a
// machine-produced explicit enumeration of 200+ component modules, each
// containing JSX `declare global` augmentations that must be visible.
// ────────────────────────────────────────────────────────────────────────────

export * from './generated/index';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Component ref aliases (hand-curated)
// ────────────────────────────────────────────────────────────────────────────

export type {
  AlarmControlPanelRef,
  BinarySensorRef,
  ButtonRef,
  ClimateRef,
  CoverRef,
  DateRef,
  DatetimeRef,
  EventRef,
  FanRef,
  LightOutputRef,
  LightStateRef,
  LockRef,
  MediaPlayerRef,
  NumberRef,
  SelectRef,
  SensorRef,
  SwitchRef,
  TextRef,
  TextSensorRef,
  TimeRef,
  UpdateEntityRef,
  ValveRef,
  AnimationRef,
  DisplayRef,
  FontRef,
  ImageRef,
  LvglComponentRef,
  TouchscreenRef,
  LvglWidgetRef,
  LvglStyleRef,
  LvglPageRef,
  LvglAnimimgRef,
  LvglArcRef,
  LvglBarRef,
  LvglButtonRef,
  LvglButtonMatrixRef,
  LvglCanvasRef,
  LvglCheckboxRef,
  LvglDropdownRef,
  LvglDropdownListRef,
  LvglImageRef,
  LvglKeyboardRef,
  LvglLabelRef,
  LvglLedRef,
  LvglLineRef,
  LvglMeterRef,
  LvglRollerRef,
  LvglSliderRef,
  LvglSpinboxRef,
  LvglSpinnerRef,
  LvglSwitchRef,
  LvglTabviewRef,
  LvglTextareaRef,
  LvglTileviewRef,
  LvglTileviewTileRef,
  BinaryOutputRef,
  FloatOutputRef,
  LEDCOutputRef,
  I2SAudioComponentRef,
  SpeakerRef,
  I2CBusRef,
  SPIComponentRef,
  UARTComponentRef,
  WiFiComponentRef,
  GPIOSwitchRef,
  InternalTemperatureSensorRef,
  IntervalTriggerRef,
  OutputSwitchRef,
  ScriptRef,
  StepperRef,
  RealTimeClockRef,
} from './component-aliases';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Canvas intrinsic element types
//
// Side-effect import ensures `declare global` augmentation for ec-* elements
// is processed by TypeScript.
// ────────────────────────────────────────────────────────────────────────────

import './lvgl/canvas/types';
export type {
  EcRectProps,
  EcLineProps,
  EcArcProps,
  EcPolygonProps,
  EcTextProps,
  EcImageProps,
  EcCanvasBackgroundProps,
  EcCanvasContentProps,
  EcCanvasOverlayProps,
  EcCanvasProps,
} from './lvgl/canvas/types';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Hooks
// ────────────────────────────────────────────────────────────────────────────

export { useHAEntity } from './hooks/useHAEntity';
export type { LightBinding, SensorBinding, BinarySensorBinding, SwitchBinding, FanBinding, CoverBinding } from './entity/bindings';
export { useImage } from './hooks/useImage';
export type { ImageProps } from './generated/components/image';
export { useFont } from './hooks/useFont';
export type { FontProps } from './generated/components/font';
export { useScript } from './hooks/useScript';
export type { ScriptOptions } from './hooks/useScript';
export type { ScriptMode } from './ir/types';
export type { Int } from './types';
export { useMemo } from './hooks/useMemo';
export { useLvgl } from './hooks/useLvgl';
export { useGlobal } from './hooks/useGlobal';
export type { GlobalType, ScalarGlobalType, ArrayGlobalType, InferGlobalTS, VolatileGlobalOptions, GlobalArrayHandle } from './hooks/useGlobal';
export { useRetainedGlobal } from './hooks/useRetainedGlobal';
export type { RetainedGlobalType, InferRetainedTS, RetainedGlobalOptions } from './hooks/useRetainedGlobal';
export type { GlobalHandle, TransientOverlayContext } from './hooks/global-shared';
export { forwardOverlayPayloadMeta } from './hooks/global-shared';
export { useOverlay } from './hooks/useOverlay';
export type { OverlayController, OverlayFactory, OverlayConfig, OverlayPayloadGlobalDecl } from './hooks/useOverlay';
export { useTransientOverlay } from './hooks/useTransientOverlay';
export type { TransientOverlayConfig, TransientOverlayFactory, TransientOverlayController } from './hooks/useTransientOverlay';
export { useVisibility } from './hooks/useVisibility';
export type { VisibilityOptions } from './hooks/useVisibility';
export { useController } from './hooks/useController';
export type { Controller, ControllerScriptMap } from './hooks/useController';
export { createContext, useContext } from './hooks/useContext';
export type { Context } from './hooks/useContext';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Actions
// ────────────────────────────────────────────────────────────────────────────

export { delay, logger, lambda } from './actions/primitives';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Secrets
// ────────────────────────────────────────────────────────────────────────────

export { secret } from './serialize/secret';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Reactive utilities
// ────────────────────────────────────────────────────────────────────────────

export { useReactive, useReactiveMap } from './reactive/utils';
export type { Signal } from './reactive/node';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Theme
// ────────────────────────────────────────────────────────────────────────────

export { createTheme } from './lvgl/theme/create-theme';
export type { ThemeHandle, ThemeProviderProps } from './lvgl/theme/create-theme';
export { createFontToken, isFontToken } from './lvgl/theme/font-token';
export type { FontToken, FontBpp } from './lvgl/theme/font-token';
export { isHexColor } from './lvgl/theme/hex-color';
export type { HexColor } from './lvgl/theme/hex-color';

// ────────────────────────────────────────────────────────────────────────────
// Public API — CSS-like Style System
// ────────────────────────────────────────────────────────────────────────────

export type { CssStyleProps, CssAliasProps, CssStyle, LvglStateName, LvglPartName, SizeValue, Percentage } from './lvgl/style/types';
export { expandCssStyle } from './lvgl/style/mapping';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Wireframe
// ────────────────────────────────────────────────────────────────────────────

export { isWireframeEnabled, setWireframeEnabled, clearWireframe, WIREFRAME_COLORS } from './lvgl/style/wireframe';
export type { WidgetCategory } from './lvgl/style/wireframe';

// ────────────────────────────────────────────────────────────────────────────
// Public API — Reactive IR (used by widget libraries)
// ────────────────────────────────────────────────────────────────────────────

export { isIRReactiveNode } from './reactive/node';
