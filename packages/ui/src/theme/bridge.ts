/**
 * Theme → LVGL bridge.
 *
 * Converts the high-level `Theme` token system into:
 *  1. `style_definitions` — named style bundles referenced by DS components
 *  2. `theme` — static per-widget-type defaults for unthemed raw LVGL widgets
 *  3. `createThemeSwitchActions()` — runtime theme switching via `lvgl.style.update`
 */

import type { Theme, TextVariant, ThemeParts } from './types';
import { fontDefToLvgl } from './resolvers';
import {
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
  ALL_STATUSES,
  statusStyleId,
  statusTextStyleId,
} from './style-ids';

// ────────────────────────────────────────────────────────────────────────────
// Internal helpers
// ────────────────────────────────────────────────────────────────────────────

function resolveParts(theme: Theme): ThemeParts {
  if (theme.parts) return theme.parts;
  return {
    slider: { bg: theme.colors.primary.bg, knob: theme.colors.textPrimary },
    switch: { bg: theme.colors.primary.bg, knob: theme.colors.textPrimary },
    arc:    { bg: theme.colors.primary.bg, knob: theme.colors.textPrimary },
  };
}

// ────────────────────────────────────────────────────────────────────────────
// 1. style_definitions
// ────────────────────────────────────────────────────────────────────────────

export interface StyleDefinition {
  id: string;
  [prop: string]: unknown;
}

/**
 * Convert a `Theme` into an array of ESPHome `style_definitions` entries.
 *
 * Each entry is a plain object with snake_case keys matching the LVGL YAML
 * schema.  Colors remain as `#RRGGBB` strings — the serializer converts them
 * to `0xRRGGBB` automatically.
 */
export function themeToStyleDefinitions(theme: Theme): StyleDefinition[] {
  const defs: StyleDefinition[] = [];
  const bodyFont = fontDefToLvgl(theme.typography.body);

  // ── Surface / background ──────────────────────────────────────────────
  defs.push({ id: STYLE_BG, bg_color: theme.colors.background });
  defs.push({ id: STYLE_SURFACE, bg_color: theme.colors.surface });
  defs.push({ id: STYLE_SURFACE_ALT, bg_color: theme.colors.surfaceAlt });
  defs.push({ id: STYLE_BORDER, border_color: theme.colors.border });

  // ── Text ──────────────────────────────────────────────────────────────
  defs.push({ id: STYLE_TEXT_PRIMARY,   text_color: theme.colors.textPrimary,   text_font: bodyFont });
  defs.push({ id: STYLE_TEXT_SECONDARY, text_color: theme.colors.textSecondary, text_font: bodyFont });
  defs.push({ id: STYLE_TEXT_DISABLED,  text_color: theme.colors.textDisabled,  text_font: bodyFont });

  // ── Typography variants ───────────────────────────────────────────────
  for (const variant of ['title', 'subtitle', 'body', 'caption'] as TextVariant[]) {
    const font = fontDefToLvgl(theme.typography[variant]);
    defs.push({
      id: STYLE_TEXT_VARIANT[variant],
      text_color: theme.colors.textPrimary,
      text_font: font,
    });
  }

  // ── Status × variant ─────────────────────────────────────────────────
  // NOTE: ESPHome style_definitions do NOT support state variants (pressed,
  // focused, etc.).  Only the base state is stored here.  Pressed overrides
  // must be applied inline on the widget itself.
  for (const status of ALL_STATUSES) {
    const sc = theme.colors[status];

    // solid container (base state only)
    defs.push({
      id: statusStyleId(status, 'solid'),
      bg_color: sc.bg,
    });

    // solid text
    defs.push({
      id: statusTextStyleId(status, 'solid'),
      text_color: sc.text,
    });

    // outline container (base state only)
    defs.push({
      id: statusStyleId(status, 'outline'),
      bg_opa: 'TRANSP',
      border_color: sc.bg,
      border_width: 2,
    });

    // outline text
    defs.push({
      id: statusTextStyleId(status, 'outline'),
      text_color: sc.bg,
    });
  }

  // ── Widget parts ──────────────────────────────────────────────────────
  const parts = resolveParts(theme);
  defs.push({ id: STYLE_SLIDER_INDICATOR, bg_color: parts.slider.bg });
  defs.push({ id: STYLE_SLIDER_KNOB,      bg_color: parts.slider.knob });
  defs.push({ id: STYLE_SWITCH_INDICATOR,  bg_color: parts.switch.bg });
  defs.push({ id: STYLE_SWITCH_KNOB,       bg_color: parts.switch.knob });
  defs.push({ id: STYLE_ARC_INDICATOR,     bg_color: parts.arc.bg });
  defs.push({ id: STYLE_ARC_KNOB,          bg_color: parts.arc.knob });

  return defs;
}

// ────────────────────────────────────────────────────────────────────────────
// 2. theme (static per-widget-type defaults)
// ────────────────────────────────────────────────────────────────────────────

/**
 * Build the LVGL `theme:` block — static defaults applied to all widgets of
 * a given type.  This is the fallback for raw `<lvgl-*>` elements that don't
 * use `styles:` references.
 *
 * NOTE: The `theme:` block is NOT runtime-updatable.  Only `style_definitions`
 * (via `lvgl.style.update`) support runtime switching.
 */
export function themeToLvglTheme(theme: Theme): Record<string, unknown> {
  const bodyFont = fontDefToLvgl(theme.typography.body);
  const parts = resolveParts(theme);

  return {
    label: {
      text_color: theme.colors.textPrimary,
      text_font: bodyFont,
    },
    button: {
      bg_color: theme.colors.primary.bg,
      border_width: 0,
      pressed: {
        bg_color: theme.colors.primary.bgPressed,
      },
    },
    obj: {
      border_width: 0,
      bg_opa: 'TRANSP',
    },
    slider: {
      bg_color: theme.colors.surfaceAlt,
      indicator: {
        bg_color: parts.slider.bg,
      },
      knob: {
        bg_color: parts.slider.knob,
      },
    },
    switch: {
      bg_color: theme.colors.surfaceAlt,
      indicator: {
        bg_color: parts.switch.bg,
      },
      knob: {
        bg_color: parts.switch.knob,
      },
    },
    arc: {
      arc_color: theme.colors.surfaceAlt,
      indicator: {
        arc_color: parts.arc.bg,
      },
      knob: {
        bg_color: parts.arc.knob,
      },
    },
    dropdown: {
      text_color: theme.colors.textPrimary,
      text_font: bodyFont,
      bg_color: theme.colors.surface,
      border_color: theme.colors.border,
      border_width: 1,
    },
  };
}

// ────────────────────────────────────────────────────────────────────────────
// 3. Convenience: spread on <lvgl>
// ────────────────────────────────────────────────────────────────────────────

/**
 * Build the props to spread on the `<lvgl>` element.
 *
 * ```tsx
 * <lvgl displays={[ref]} {...createLvglThemeProps(darkTheme)}>
 * ```
 */
export function createLvglThemeProps(theme: Theme): {
  styleDefinitions: StyleDefinition[];
  theme: Record<string, unknown>;
} {
  return {
    styleDefinitions: themeToStyleDefinitions(theme),
    theme: themeToLvglTheme(theme),
  };
}

// ────────────────────────────────────────────────────────────────────────────
// 4. Runtime theme switching
// ────────────────────────────────────────────────────────────────────────────

/**
 * Generate a list of `lvgl.style.update` actions that switch every style
 * definition to the target theme's values.
 *
 * @see {@link applyTheme} for use inside trigger functions.
 */
function createThemeSwitchActions(
  theme: Theme,
): Array<Record<string, unknown>> {
  const defs = themeToStyleDefinitions(theme);
  return defs.map((def) => {
    const { id, ...props } = def;
    return { 'lvgl.style.update': { id, ...props } };
  });
}

/**
 * Apply a theme at runtime inside a trigger function.
 *
 * The ESPCompose compiler recognises `applyTheme()` calls inside trigger
 * bodies and spreads the resulting `lvgl.style.update` actions into the
 * action list.
 *
 * @example
 * ```tsx
 * <Button
 *   text="Dark mode"
 *   onPress={() => { applyTheme(darkTheme); }}
 * />
 * ```
 *
 * @espcomposeAction applyTheme
 */
export function applyTheme(
  theme: Theme,
): Array<Record<string, unknown>> {
  return createThemeSwitchActions(theme);
}
