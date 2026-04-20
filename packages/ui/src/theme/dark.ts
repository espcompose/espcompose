/**
 * Default dark theme — designed for LVGL embedded displays.
 *
 * Optimised for small screens: high contrast, saturated accents,
 * dark surfaces that reduce power on OLED and improve readability
 * in varying ambient light.
 */

import { createFontToken } from '@espcompose/core';
import type { Theme } from './types';

// ── Shared font tokens (ThemeProvider registers the ESPHome font assets) ──
const montserrat = (size: number) => createFontToken('gfonts://Roboto', size);

export const darkTheme: Theme = {
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
    title:    montserrat(28),
    subtitle: montserrat(20),
    body:     montserrat(16),
    caption:  montserrat(12),
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
    xs: { height: 28, font: montserrat(12), paddingX: 8,  paddingY: 4  },
    sm: { height: 36, font: montserrat(14), paddingX: 12, paddingY: 6  },
    md: { height: 44, font: montserrat(16), paddingX: 16, paddingY: 8  },
    lg: { height: 52, font: montserrat(18), paddingX: 20, paddingY: 10 },
    xl: { height: 64, font: montserrat(22), paddingX: 24, paddingY: 12 },
  },

  parts: {
    slider: { bg: '#1E88E5', knob: '#E0E0E0', track: '#3A3A3A' },
    switch: { bg: '#1E88E5', bgOff: '#3A3A3A', knob: '#E0E0E0' },
    arc:    { bg: '#1E88E5', knob: '#E0E0E0' },
  },
};
