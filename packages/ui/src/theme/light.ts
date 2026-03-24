/**
 * Built-in light theme — designed for LVGL embedded displays.
 *
 * Light surfaces with dark text, suitable for well-lit environments.
 * Shares spacing, radii and typography scale with the dark theme.
 */

import type { Theme } from './types';

export const lightTheme: Theme = {
  name: 'Light',

  colors: {
    primary:   { bg: '#1565C0', text: '#FFFFFF', bgPressed: '#0D47A1' },
    secondary: { bg: '#78909C', text: '#FFFFFF', bgPressed: '#546E7A' },
    success:   { bg: '#2E7D32', text: '#FFFFFF', bgPressed: '#1B5E20' },
    warning:   { bg: '#EF6C00', text: '#000000', bgPressed: '#E65100' },
    danger:    { bg: '#C62828', text: '#FFFFFF', bgPressed: '#B71C1C' },

    background:    '#FAFAFA',
    surface:       '#FFFFFF',
    surfaceAlt:    '#F5F5F5',
    border:        '#E0E0E0',

    textPrimary:   '#212121',
    textSecondary: '#757575',
    textDisabled:  '#BDBDBD',
  },

  typography: {
    title:    { fontFamily: 'montserrat', fontSize: 28 },
    subtitle: { fontFamily: 'montserrat', fontSize: 20 },
    body:     { fontFamily: 'montserrat', fontSize: 16 },
    caption:  { fontFamily: 'montserrat', fontSize: 12 },
  },

  spacing: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  radii: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },

  sizes: {
    xs: { height: 28, fontSize: 12, paddingX: 8,  paddingY: 4  },
    sm: { height: 36, fontSize: 14, paddingX: 12, paddingY: 6  },
    md: { height: 44, fontSize: 16, paddingX: 16, paddingY: 8  },
    lg: { height: 52, fontSize: 18, paddingX: 20, paddingY: 10 },
    xl: { height: 64, fontSize: 22, paddingX: 24, paddingY: 12 },
  },

  parts: {
    slider: { bg: '#1565C0', knob: '#212121' },
    switch: { bg: '#1565C0', knob: '#212121' },
    arc:    { bg: '#1565C0', knob: '#212121' },
  },
};
