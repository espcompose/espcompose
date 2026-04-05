// ────────────────────────────────────────────────────────────────────────────
// CSS → LVGL Property Mapping
//
// Maps CSS-like property names (camelCase, React-style) to their LVGL
// camelCase equivalents used by LvglStyleProps.  Includes shorthand
// expansion rules (e.g. paddingHorizontal → padLeft + padRight).
//
// This module is the single source of truth for the CSS→LVGL name
// translation layer.  It is consumed by:
//   - expandCssStyle()  — runtime style expansion
//   - CssAliasProps     — type definition (sync-checked at compile time)
// ────────────────────────────────────────────────────────────────────────────

import type { CssAliasProps } from './style-types';

// ── Mapping entry types ────────────────────────────────────────────────────

type MappingEntry =
  | { kind: 'direct'; lvglProp: string }
  | { kind: 'shorthand'; lvglProps: readonly string[] }
  | { kind: 'transform'; lvglProp: string; valueMap: Readonly<Record<string, unknown>> };

// ── Shared value maps ──────────────────────────────────────────────────────

const OPACITY_VALUES = { transparent: 'TRANSP', opaque: 'COVER' } as const;
const TEXT_ALIGN_VALUES = { left: 'LEFT', center: 'CENTER', right: 'RIGHT', auto: 'AUTO' } as const;
const TEXT_DECOR_VALUES = { none: 'NONE', underline: 'UNDERLINE', strikethrough: 'STRIKETHROUGH' } as const;
const BORDER_SIDE_VALUES = { none: 'NONE', top: 'TOP', bottom: 'BOTTOM', left: 'LEFT', right: 'RIGHT', internal: 'INTERNAL' } as const;
const GRAD_DIR_VALUES = { none: 'NONE', horizontal: 'HOR', vertical: 'VER' } as const;
const DITHER_MODE_VALUES = { none: 'NONE', ordered: 'ORDERED', 'error-diffusion': 'ERR_DIFF' } as const;
const SIZE_VALUES = { 'fit-content': 'SIZE_CONTENT' } as const;

// ── CSS → LVGL mapping table ───────────────────────────────────────────────

/**
 * Maps CSS-like property names to their LVGL camelCase equivalents.
 *
 * Every key here MUST have a matching entry in CssAliasProps (style-types.ts)
 * and vice-versa.  A compile-time assertion at the bottom of this file
 * enforces this — you'll get a type error if they drift.
 */
const _cssToLvglMap = {
  // ── Sizing ─────────────────────────────────────────────────────────────
  width:                { kind: 'transform', lvglProp: 'width', valueMap: SIZE_VALUES },
  height:               { kind: 'transform', lvglProp: 'height', valueMap: SIZE_VALUES },
  minWidth:             { kind: 'transform', lvglProp: 'minWidth', valueMap: SIZE_VALUES },
  maxWidth:             { kind: 'transform', lvglProp: 'maxWidth', valueMap: SIZE_VALUES },
  minHeight:            { kind: 'transform', lvglProp: 'minHeight', valueMap: SIZE_VALUES },
  maxHeight:            { kind: 'transform', lvglProp: 'maxHeight', valueMap: SIZE_VALUES },

  // ── Position ───────────────────────────────────────────────────────────
  left:                 { kind: 'direct', lvglProp: 'x' },
  top:                  { kind: 'direct', lvglProp: 'y' },

  // ── Colors ─────────────────────────────────────────────────────────────
  backgroundColor:      { kind: 'direct', lvglProp: 'bgColor' },
  color:                { kind: 'direct', lvglProp: 'textColor' },

  // ── Border ─────────────────────────────────────────────────────────────
  borderRadius:         { kind: 'transform', lvglProp: 'radius', valueMap: { circle: 'CIRCLE' } },
  borderColor:          { kind: 'direct', lvglProp: 'borderColor' },
  borderWidth:          { kind: 'direct', lvglProp: 'borderWidth' },

  // ── Padding ────────────────────────────────────────────────────────────
  padding:              { kind: 'direct', lvglProp: 'padAll' },
  paddingTop:           { kind: 'direct', lvglProp: 'padTop' },
  paddingBottom:        { kind: 'direct', lvglProp: 'padBottom' },
  paddingLeft:          { kind: 'direct', lvglProp: 'padLeft' },
  paddingRight:         { kind: 'direct', lvglProp: 'padRight' },
  paddingHorizontal:    { kind: 'shorthand', lvglProps: ['padLeft', 'padRight'] },
  paddingVertical:      { kind: 'shorthand', lvglProps: ['padTop', 'padBottom'] },

  // ── Gap (flex layout) ──────────────────────────────────────────────────
  gap:                  { kind: 'shorthand', lvglProps: ['padRow', 'padColumn'] },
  rowGap:               { kind: 'direct', lvglProp: 'padRow' },
  columnGap:            { kind: 'direct', lvglProp: 'padColumn' },

  // ── Text ───────────────────────────────────────────────────────────────
  font:                 { kind: 'direct', lvglProp: 'textFont' },
  textAlign:            { kind: 'transform', lvglProp: 'textAlign', valueMap: TEXT_ALIGN_VALUES },
  textDecoration:       { kind: 'transform', lvglProp: 'textDecor', valueMap: TEXT_DECOR_VALUES },
  letterSpacing:        { kind: 'direct', lvglProp: 'textLetterSpace' },
  lineHeight:           { kind: 'direct', lvglProp: 'textLineSpace' },

  // ── Opacity ────────────────────────────────────────────────────────────
  opacity:              { kind: 'transform', lvglProp: 'opa', valueMap: OPACITY_VALUES },
  backgroundOpacity:    { kind: 'transform', lvglProp: 'bgOpa', valueMap: OPACITY_VALUES },
  textOpacity:          { kind: 'transform', lvglProp: 'textOpa', valueMap: OPACITY_VALUES },
  borderOpacity:        { kind: 'transform', lvglProp: 'borderOpa', valueMap: OPACITY_VALUES },
  outlineOpacity:       { kind: 'transform', lvglProp: 'outlineOpa', valueMap: OPACITY_VALUES },
  shadowOpacity:        { kind: 'transform', lvglProp: 'shadowOpa', valueMap: OPACITY_VALUES },

  // ── Background image ──────────────────────────────────────────────────
  backgroundImage:      { kind: 'direct', lvglProp: 'bgImageSrc' },
  backgroundImageOpacity: { kind: 'transform', lvglProp: 'bgImageOpa', valueMap: OPACITY_VALUES },

  // ── Shadow (CSS-like aliases) ──────────────────────────────────────────
  shadowOffsetX:        { kind: 'direct', lvglProp: 'shadowOfsX' },
  shadowOffsetY:        { kind: 'direct', lvglProp: 'shadowOfsY' },
  shadowColor:          { kind: 'direct', lvglProp: 'shadowColor' },
  shadowWidth:          { kind: 'direct', lvglProp: 'shadowWidth' },
  shadowSpread:         { kind: 'direct', lvglProp: 'shadowSpread' },

  // ── Arc (widget-specific) ─────────────────────────────────────────────
  arcColor:                { kind: 'direct', lvglProp: 'arcColor' },
  arcOpacity:              { kind: 'transform', lvglProp: 'arcOpa', valueMap: OPACITY_VALUES },
  arcLinecap:              { kind: 'transform', lvglProp: 'arcRounded', valueMap: { round: true, flat: false } },
  arcStrokeWidth:          { kind: 'direct', lvglProp: 'arcWidth' },

  // ── Animation ─────────────────────────────────────────────────────────
  animationDuration:       { kind: 'direct', lvglProp: 'animTime' },

  // ── Background gradient ───────────────────────────────────────────────
  backgroundGradient:            { kind: 'direct', lvglProp: 'bgGrad' },
  backgroundGradientColor:       { kind: 'direct', lvglProp: 'bgGradColor' },
  backgroundGradientDither:      { kind: 'transform', lvglProp: 'bgDitherMode', valueMap: DITHER_MODE_VALUES },
  backgroundGradientDirection:   { kind: 'transform', lvglProp: 'bgGradDir', valueMap: GRAD_DIR_VALUES },
  backgroundGradientStop:        { kind: 'direct', lvglProp: 'bgGradStop' },
  backgroundGradientStartStop:   { kind: 'direct', lvglProp: 'bgMainStop' },

  // ── Background-image extras ───────────────────────────────────────────
  backgroundImageTint:           { kind: 'direct', lvglProp: 'bgImageRecolor' },
  backgroundImageTintOpacity:    { kind: 'transform', lvglProp: 'bgImageRecolorOpa', valueMap: OPACITY_VALUES },
  backgroundRepeat:              { kind: 'transform', lvglProp: 'bgImageTiled', valueMap: { repeat: true, 'no-repeat': false } },

  // ── Border extras ─────────────────────────────────────────────────────
  borderDrawOrder:       { kind: 'transform', lvglProp: 'borderPost', valueMap: { 'after-children': true, 'before-children': false } },
  borderSides:           { kind: 'transform', lvglProp: 'borderSide', valueMap: BORDER_SIDE_VALUES },

  // ── Clipping ──────────────────────────────────────────────────────────
  overflow:              { kind: 'transform', lvglProp: 'clipCorner', valueMap: { hidden: true, visible: false } },

  // ── Color filter ──────────────────────────────────────────────────────
  colorFilterOpacity:    { kind: 'transform', lvglProp: 'colorFilterOpa', valueMap: OPACITY_VALUES },

  // ── Image (widget-specific) ───────────────────────────────────────────
  imageTint:             { kind: 'direct', lvglProp: 'imageRecolor' },
  imageTintOpacity:      { kind: 'transform', lvglProp: 'imageRecolorOpa', valueMap: OPACITY_VALUES },

  // ── Line / stroke (widget-specific) ───────────────────────────────────
  strokeLinecap:         { kind: 'transform', lvglProp: 'lineRounded', valueMap: { round: true, flat: false } },
  strokeWidth:           { kind: 'direct', lvglProp: 'lineWidth' },
  strokeDashWidth:       { kind: 'direct', lvglProp: 'lineDashWidth' },
  strokeDashGap:         { kind: 'direct', lvglProp: 'lineDashGap' },
  strokeColor:           { kind: 'direct', lvglProp: 'lineColor' },

  // ── Layered opacity ───────────────────────────────────────────────────
  opacityLayered:        { kind: 'transform', lvglProp: 'opaLayered', valueMap: OPACITY_VALUES },

  // ── Outline extras ────────────────────────────────────────────────────
  outlineColor:          { kind: 'direct', lvglProp: 'outlineColor' },
  outlineWidth:          { kind: 'direct', lvglProp: 'outlineWidth' },
  outlineOffset:         { kind: 'direct', lvglProp: 'outlinePad' },

  // ── Transform extras ──────────────────────────────────────────────────
  translateX:            { kind: 'direct', lvglProp: 'translateX' },
  translateY:            { kind: 'direct', lvglProp: 'translateY' },
  rotate:                { kind: 'direct', lvglProp: 'transformAngle' },
  transformScaleY:       { kind: 'direct', lvglProp: 'transformHeight' },
  transformOriginX:      { kind: 'direct', lvglProp: 'transformPivotX' },
  transformOriginY:      { kind: 'direct', lvglProp: 'transformPivotY' },
  scale:                 { kind: 'direct', lvglProp: 'transformZoom' },
} as const satisfies Record<string, MappingEntry>;

// Public export: widened to Record<string, MappingEntry> for runtime string-indexed access
export const CSS_TO_LVGL_MAP: Readonly<Record<string, MappingEntry>> = _cssToLvglMap;

// ── State & part names ─────────────────────────────────────────────────────

export const LVGL_STATE_NAMES: ReadonlySet<string> = new Set([
  'checked', 'focused', 'focusKey', 'edited', 'hovered',
  'pressed', 'scrolled', 'disabled', 'user1', 'user2', 'user3', 'user4',
]);

export const LVGL_PART_NAMES: ReadonlySet<string> = new Set([
  'indicator', 'knob', 'scrollbar', 'selected', 'items',
  'ticks', 'cursor', 'textareaPlaceholder',
]);

// ── Helpful suggestions for common CSS properties that don't map ────────────

/**
 * Maps commonly-tried CSS property names to helpful error messages
 * suggesting the correct LVGL equivalent.
 */
const CSS_SUGGESTION_MAP: Readonly<Record<string, string>> = {
  fontSize:        'Use "font" to set the font in LVGL (maps to text_font). Font size is determined by the font asset.',
  fontFamily:      'Use "font" to set the font in LVGL (maps to text_font).',
  fontWeight:      'LVGL does not support font-weight. Select a specific font via "font".',
  background:      'Use "backgroundColor" for background color, or "backgroundImage" for background images.',
  display:         'LVGL does not support CSS display. Use layout flags instead.',
  position:        'LVGL does not support CSS position. Use left/top or layout alignment.',
  zIndex:          'LVGL does not support z-index. Layer order is determined by child order.',
  boxShadow:       'Use "shadowColor", "shadowWidth", "shadowOffsetX", "shadowOffsetY" for shadows.',
  margin:          'LVGL does not support margin. Use padding on the parent container instead.',
};

// ── Expansion logic ────────────────────────────────────────────────────────

/**
 * Expand a single level of CSS-like style props into LVGL camelCase props.
 *
 * - CSS-like names are mapped to LVGL equivalents (e.g. `backgroundColor` → `bgColor`)
 * - Shorthand props are expanded (e.g. `paddingHorizontal` → `padLeft` + `padRight`)
 * - State/part sub-objects are NOT expanded here (handled by expandCssStyleDeep)
 * - Unknown properties throw an error
 *
 * Shorthand priority: specific props override shorthand expansions.
 * Expand shorthand first, then overlay specific values (last-wins).
 */
export function expandCssProps(
  cssProps: Record<string, unknown>,
): Record<string, unknown> {
  // Two passes: shorthands first, then direct/passthrough (so specific wins).
  const result: Record<string, unknown> = {};

  // Pass 1: expand shorthands
  for (const [key, value] of Object.entries(cssProps)) {
    if (value === undefined) continue;

    // Skip state/part sub-objects — they're handled by the deep expander
    if (LVGL_STATE_NAMES.has(key) || LVGL_PART_NAMES.has(key)) continue;
    // Skip styles reference
    if (key === 'styles') continue;

    const mapping = CSS_TO_LVGL_MAP[key];
    if (mapping?.kind === 'shorthand') {
      for (const lvglProp of mapping.lvglProps) {
        result[lvglProp] = value;
      }
    }
  }

  // Pass 2: direct mappings (overwrite shorthands)
  for (const [key, value] of Object.entries(cssProps)) {
    if (value === undefined) continue;
    if (LVGL_STATE_NAMES.has(key) || LVGL_PART_NAMES.has(key)) continue;
    if (key === 'styles') continue;

    const mapping = CSS_TO_LVGL_MAP[key];
    if (mapping?.kind === 'direct') {
      result[mapping.lvglProp] = value;
    } else if (mapping?.kind === 'transform') {
      if (typeof value === 'string') {
        const mapped = mapping.valueMap[value];
        if (mapped !== undefined) {
          result[mapping.lvglProp] = mapped;
        } else if (/^-?\d/.test(value)) {
          // Numeric / percentage strings (e.g. '50%', '128') — pass through.
          // TODO: Add an optional `valuePattern` regex to transform entries so
          // each prop can restrict which numeric formats are valid at runtime
          // (e.g. sizing accepts only percentages, opacity accepts both).
          result[mapping.lvglProp] = value;
        } else {
          throw new Error(
            `Invalid value "${value}" for style property "${key}". ` +
            `Expected one of: ${Object.keys(mapping.valueMap).join(', ')}`,
          );
        }
      } else {
        // Non-string (number, reactive node, etc.) — pass through
        result[mapping.lvglProp] = value;
      }
    } else if (mapping?.kind === 'shorthand') {
      // Already handled in pass 1
    } else {
      const suggestion = CSS_SUGGESTION_MAP[key];
      if (suggestion) {
        throw new Error(
          `"${key}" is not supported in LVGL styles. ${suggestion}`,
        );
      }
      throw new Error(
        `Unknown style property "${key}". ` +
        `Use a valid CSS-like property name (e.g. "backgroundColor", "borderRadius").`,
      );
    }
  }

  return result;
}

/**
 * Recursively expand a CSS-like style object into LVGL camelCase props,
 * including nested state and part sub-objects.
 *
 * Returns a new object shaped like LvglStyleProps with state/part nesting.
 */
export function expandCssStyle(
  style: Record<string, unknown>,
): Record<string, unknown> {
  const expanded = expandCssProps(style);

  // Copy over state sub-objects, expanding each recursively
  for (const state of LVGL_STATE_NAMES) {
    const sub = style[state];
    if (sub != null && typeof sub === 'object' && !Array.isArray(sub)) {
      expanded[state] = expandCssProps(sub as Record<string, unknown>);
    }
  }

  // Copy over part sub-objects, expanding each recursively (parts can contain states)
  for (const part of LVGL_PART_NAMES) {
    const sub = style[part];
    if (sub != null && typeof sub === 'object' && !Array.isArray(sub)) {
      expanded[part] = expandCssStyle(sub as Record<string, unknown>);
    }
  }

  // Pass through styles reference
  if (style.styles !== undefined) {
    expanded.styles = style.styles;
  }

  return expanded;
}

// ── Compile-time sync check ────────────────────────────────────────────────
// Ensures every CSS alias key in CssAliasProps has a mapping in
// CSS_TO_LVGL_MAP and vice-versa.  If you add or remove an alias, update
// BOTH the map above AND CssAliasProps in style-types.ts.
//
// On drift you'll get:
//   "Type 'true' does not satisfy the constraint '"missingPropName"'"

type _MapKey = keyof typeof _cssToLvglMap;
type _AliasKey = keyof CssAliasProps;

type _AssertSync<
  _InMapNotType extends [Exclude<_MapKey, _AliasKey>] extends [never] ? true : Exclude<_MapKey, _AliasKey>,
  _InTypeNotMap extends [Exclude<_AliasKey, _MapKey>] extends [never] ? true : Exclude<_AliasKey, _MapKey>,
> = true;

// If this line errors, the map and CssAliasProps are out of sync.
type _SyncCheck = _AssertSync<true, true>;
