/**
 * Default dark theme factory — designed for LVGL embedded displays.
 *
 * Optimised for small screens: high contrast, saturated accents,
 * dark surfaces that reduce power on OLED and improve readability
 * in varying ambient light.
 *
 * Receives {@link UIThemeSettings} from the Provider at render time.
 * Uses `adaptiveScreen` to vary spacing and typography by display class.
 */

import { adaptiveScreen } from '@espcompose/core';
import type { ThemeDefinition, UIThemeSettings } from './types';
import { roboto } from './fonts';

export function darkTheme(settings: UIThemeSettings = {}): ThemeDefinition {
  return {
    name: 'Dark',

    colors: {
      primary:   { bg: '#1E88E5', text: '#FFFFFF', bgPressed: '#1565C0' },
      secondary: { bg: '#546E7A', text: '#FFFFFF', bgPressed: '#37474F' },
      success:   { bg: '#43A047', text: '#FFFFFF', bgPressed: '#2E7D32' },
      warning:   { bg: '#FB8C00', text: '#000000', bgPressed: '#E65100' },
      danger:    { bg: '#E53935', text: '#FFFFFF', bgPressed: '#C62828' },

      background:    '#121212',
      surface:       '#1E1E1E',
      surfaceAlt:    '#2C2C2C',
      border:        '#3A3A3A',

      textPrimary:   '#E0E0E0',
      textSecondary: '#9E9E9E',
      textDisabled:  '#616161',
    },

    typography: {
      title:    adaptiveScreen(settings, { micro: roboto(18), compact: roboto(22), default: roboto(28) }),
      subtitle: adaptiveScreen(settings, { micro: roboto(16), default: roboto(20) }),
      body:     roboto(16),
      caption:  roboto(12),
    },

    spacing: {
      none: 0,
      xs: adaptiveScreen(settings, { micro: 2, default: 4 }),
      sm: adaptiveScreen(settings, { micro: 4, default: 8 }),
      md: adaptiveScreen(settings, { micro: 8, compact: 12, default: 16 }),
      lg: adaptiveScreen(settings, { micro: 12, default: 24 }),
      xl: adaptiveScreen(settings, { micro: 16, default: 32 }),
    },

    radii: {
      none: 0,
      sm: 4,
      md: 8,
      lg: 16,
      full: 9999,
    },

    sizes: {
      xs: { height: 28, font: roboto(12), paddingX: 8,  paddingY: 4  },
      sm: { height: 36, font: roboto(14), paddingX: 12, paddingY: 6  },
      md: { height: 44, font: roboto(16), paddingX: 16, paddingY: 8  },
      lg: { height: 52, font: roboto(18), paddingX: 20, paddingY: 10 },
      xl: { height: 64, font: roboto(22), paddingX: 24, paddingY: 12 },
    },

    parts: {
      slider: { indicator: '#1E88E5', knob: '#E0E0E0', rail: '#3A3A3A' },
      switch: { indicator: '#1E88E5', rail: '#3A3A3A', knob: '#E0E0E0' },
      arc:    { indicator: '#1E88E5', knob: '#E0E0E0' },
      toast:  { bg: '#fcf2dc', text: '#000000', border: '#7A5F2A' },
    },
  };
}
