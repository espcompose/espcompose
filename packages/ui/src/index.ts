/**
 * @espcompose/ui — Design system components for ESPHome LVGL displays.
 *
 * This package re-exports components, theming, and token types.
 * The intent system and core types remain in @espcompose/core (the SDK).
 */

// Theme system
export { ThemeProvider } from './theme/ThemeProvider';
export { darkTheme } from './theme/dark';
export { lightTheme } from './theme/light';

// Theme types
export type {
  Theme,
  ThemeColors,
  ThemeTypography,
  ThemeParts,
  PartColors,
  FontToken,
  FontBpp,
  SizeDimensions,
  StatusColors,
  SpacingToken,
  SizeToken,
  RadiusToken,
  StatusToken,
  TextVariant,
} from './theme/types';
export { createFontToken, FONT_TOKEN_BRAND } from './theme/types';

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

// Binding-driven components
export { LightButton } from './components/LightButton';
export { LightSwitch } from './components/LightSwitch';
export { LightSlider } from './components/LightSlider';
export { SensorText } from './components/SensorText';
