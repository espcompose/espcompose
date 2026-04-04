/**
 * @espcompose/compose-ui — Design system components for ESPHome LVGL displays.
 *
 * This package re-exports components, theming, and token types.
 * The intent system and core types remain in @espcompose/core (the SDK).
 */

// Theme system
export { useReactiveTheme } from './theme/context';
export { ThemeProvider } from './theme/ThemeProvider';
export { darkTheme } from './theme/dark';
export { lightTheme } from './theme/light';
export {
  resolveSpacing,
  resolveSize,
  resolveStatus,
  resolveTypography,
  resolveRadius,
  resolveFont as fontDefToLvgl,
} from './theme/resolvers';

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
