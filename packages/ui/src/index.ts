/**
 * @esphome/compose-ui — Design system components for ESPHome LVGL displays.
 *
 * This package re-exports components, theming, and token types.
 * The intent system and core types remain in @esphome/compose (the SDK).
 */

// Theme system
export { useTheme, ThemeContext, ThemeProvider } from './theme/context';
export { darkTheme } from './theme/dark';
export { lightTheme } from './theme/light';
export { themeToJSON, themeFromJSON } from './theme/json';
export {
  resolveSpacing,
  resolveSize,
  resolveStatus,
  resolveTypography,
  resolveRadius,
  fontDefToLvgl,
} from './theme/resolvers';

// Theme bridge (LVGL native integration)
export {
  themeToStyleDefinitions,
  themeToLvglTheme,
  createLvglThemeProps,
  createThemeSwitchActions,
} from './theme/bridge';
export type { StyleDefinition } from './theme/bridge';
export {
  STYLE_BG,
  STYLE_SURFACE,
  STYLE_SURFACE_ALT,
  STYLE_BORDER,
  STYLE_TEXT_PRIMARY,
  STYLE_TEXT_SECONDARY,
  STYLE_TEXT_DISABLED,
  STYLE_TEXT_VARIANT,
  STYLE_SLIDER_INDICATOR,
  STYLE_SLIDER_KNOB,
  STYLE_SWITCH_INDICATOR,
  STYLE_SWITCH_KNOB,
  STYLE_ARC_INDICATOR,
  STYLE_ARC_KNOB,
  statusStyleId,
  statusTextStyleId,
} from './theme/style-ids';

// Theme types
export type {
  Theme,
  ThemeColors,
  ThemeTypography,
  ThemeParts,
  PartColors,
  FontDef,
  SizeDimensions,
  StatusColors,
  SpacingToken,
  SizeToken,
  RadiusToken,
  StatusToken,
  TextVariant,
} from './theme/types';

// Intent constants
export { COMPOSE_UI_INTENTS } from './intents';

// Components
export { Screen } from './components/Screen';
export { Space, VStack, HStack } from './components/Space';
export { Row, Col } from './components/Row';
export { Grid, GridItem } from './components/Grid';
export type { TrackSize } from './components/Grid';
export { Text } from './components/Text';
export { Button } from './components/Button';
export { Card } from './components/Card';
export { SliderField } from './components/SliderField';
export { SwitchField } from './components/SwitchField';
export { DropdownField } from './components/DropdownField';
