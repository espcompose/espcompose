/**
 * @espcompose/ui — Design system components for ESPHome LVGL displays.
 *
 * This package re-exports components, theming, and token types.
 * The intent system and core types remain in @espcompose/core (the SDK).
 */

// Theme system
export { darkTheme } from './theme/dark';
export { lightTheme } from './theme/light';
export { UITheme } from './theme/theme';

// Theme types
export type {
  ThemeDefinition,
  ThemeColors,
  ThemeTypography,
  ThemeParts,
  PartColors,
  SwitchPartColors,
  SliderPartColors,
  SizeDimensions,
  StatusColors,
  SpacingToken,
  SizeToken,
  RadiusToken,
  StatusToken,
  TextVariant,
  UIThemeSettings,
  ThemeFactory,
} from './theme/types';

// Adaptive helpers (UI layer)
export { adaptiveDensity } from './theme/adaptive';
export type { DensityLevel } from './theme/adaptive';

// Components
export { Screen } from './components/Screen';
export { Space, VStack, HStack } from './components/Space';
export { Row, Col } from './components/Row';
export { Grid, GridItem } from './components/Grid';
export type { TrackSize } from './components/Grid';
export { Text } from './components/Text';
export { Button } from './components/Button';
export { Card } from './components/Card';
export { Image } from './components/Image';
export type { ImageProps } from './components/Image';
export { Spinner } from './components/Spinner';
export type { SpinnerProps } from './components/Spinner';
export { Slider } from './components/Slider';
export type { SliderProps } from './components/Slider';
export { Switch } from './components/Switch';
export type { SwitchProps } from './components/Switch';
export { Dropdown } from './components/Dropdown';
export type { DropdownProps } from './components/Dropdown';
export type { StyleProps, ButtonVariant } from './components/shared-types';

// Navigation
export { PageNav } from './components/PageNav';
export type { PageNavProps, PageNavItem } from './components/PageNav';

// Binding-driven components
export { SensorText } from './components/SensorText';
export { HALightButton } from './components/HALightButton';
export type { HALightButtonProps } from './components/HALightButton';

// Popup system
import { Popup as PopupComponent } from './components/Popup';
import { PopupProviderComponent } from './providers/Popup';
export const Popup = Object.assign(PopupComponent, { Provider: PopupProviderComponent });
export type { PopupProviderProps } from './providers/Popup';

// Overlay convenience hooks
export { usePopup } from './hooks/usePopup';
export type { PopupController, PopupFactory } from './hooks/usePopup';

// Toast system
export { Toast, useToast } from './providers/Toast';
export type { ToastController, ToastProviderProps } from './providers/Toast';
