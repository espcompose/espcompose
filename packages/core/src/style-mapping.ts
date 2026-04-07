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
  | { kind: 'transform'; lvglProp: string; valueMap: Readonly<Record<string, unknown>> }
  | { kind: 'layout'; lvglProp: string }
  | { kind: 'layout-transform'; lvglProp: string; valueMap: Readonly<Record<string, unknown>> }
  | { kind: 'layout-array'; lvglProp: string }
  | { kind: 'flat-transform'; lvglProp: string; valueMap: Readonly<Record<string, unknown>> };

// ── Shared value maps ──────────────────────────────────────────────────────

const OPACITY_VALUES = { transparent: 'TRANSP', opaque: 'COVER' } as const;
const TEXT_ALIGN_VALUES = { left: 'LEFT', center: 'CENTER', right: 'RIGHT', auto: 'AUTO' } as const;
const TEXT_DECOR_VALUES = { none: 'NONE', underline: 'UNDERLINE', strikethrough: 'STRIKETHROUGH' } as const;
const BORDER_SIDE_VALUES = { none: 'NONE', top: 'TOP', bottom: 'BOTTOM', left: 'LEFT', right: 'RIGHT', internal: 'INTERNAL' } as const;
const GRAD_DIR_VALUES = { none: 'NONE', horizontal: 'HOR', vertical: 'VER' } as const;
const DITHER_MODE_VALUES = { none: 'NONE', ordered: 'ORDERED', 'error-diffusion': 'ERR_DIFF' } as const;
const SIZE_VALUES = { 'fit-content': 'SIZE_CONTENT' } as const;
const FLEX_FLOW_VALUES = { row: 'ROW', column: 'COLUMN', 'row-wrap': 'ROW_WRAP', 'column-wrap': 'COLUMN_WRAP' } as const;
const FLEX_ALIGN_MAIN_VALUES = { start: 'START', center: 'CENTER', end: 'END', spaceBetween: 'SPACE_BETWEEN', spaceAround: 'SPACE_AROUND', spaceEvenly: 'SPACE_EVENLY' } as const;
const FLEX_ALIGN_CROSS_VALUES = { start: 'START', center: 'CENTER', end: 'END', stretch: 'STRETCH' } as const;
const GRID_ALIGN_VALUES = { start: 'START', center: 'CENTER', end: 'END', stretch: 'STRETCH', spaceBetween: 'SPACE_BETWEEN', spaceAround: 'SPACE_AROUND', spaceEvenly: 'SPACE_EVENLY' } as const;
const GRID_CELL_ALIGN_VALUES = { start: 'START', center: 'CENTER', end: 'END', stretch: 'STRETCH' } as const;
const DISPLAY_VALUES = { flex: 'flex', grid: 'grid' } as const;
const PLACE_SELF_VALUES = { center: 'CENTER', topLeft: 'TOP_LEFT', topCenter: 'TOP_MID', topRight: 'TOP_RIGHT', bottomLeft: 'BOTTOM_LEFT', bottomCenter: 'BOTTOM_MID', bottomRight: 'BOTTOM_RIGHT', leftCenter: 'LEFT_MID', rightCenter: 'RIGHT_MID' } as const;
const SCROLLBAR_MODE_VALUES = { off: 'OFF', on: 'ON', active: 'ACTIVE', auto: 'AUTO' } as const;

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

  // ── Layout (flex) ──────────────────────────────────────────────────
  display:               { kind: 'layout-transform', lvglProp: 'type', valueMap: DISPLAY_VALUES },
  flexDirection:         { kind: 'layout-transform', lvglProp: 'flexFlow', valueMap: FLEX_FLOW_VALUES },
  justifyContent:        { kind: 'layout-transform', lvglProp: 'flexAlignMain', valueMap: FLEX_ALIGN_MAIN_VALUES },
  alignItems:            { kind: 'layout-transform', lvglProp: 'flexAlignCross', valueMap: FLEX_ALIGN_CROSS_VALUES },
  flexTrackAlign:        { kind: 'layout-transform', lvglProp: 'flexAlignTrack', valueMap: FLEX_ALIGN_CROSS_VALUES },
  flexGrow:              { kind: 'direct', lvglProp: 'flexGrow' },

  // ── Layout (grid — parent) ────────────────────────────────────────
  gridTemplateColumns:   { kind: 'layout-array', lvglProp: 'gridColumns' },
  gridTemplateRows:      { kind: 'layout-array', lvglProp: 'gridRows' },
  justifyItems:          { kind: 'layout-transform', lvglProp: 'gridColumnAlign', valueMap: GRID_ALIGN_VALUES },
  alignContent:          { kind: 'layout-transform', lvglProp: 'gridRowAlign', valueMap: GRID_ALIGN_VALUES },

  // ── Layout (grid — child) ─────────────────────────────────────────
  gridColumn:            { kind: 'direct', lvglProp: 'gridCellColumnPos' },
  gridRow:               { kind: 'direct', lvglProp: 'gridCellRowPos' },
  gridColumnSpan:        { kind: 'direct', lvglProp: 'gridCellColumnSpan' },
  gridRowSpan:           { kind: 'direct', lvglProp: 'gridCellRowSpan' },
  justifySelf:           { kind: 'flat-transform', lvglProp: 'gridCellXAlign', valueMap: GRID_CELL_ALIGN_VALUES },
  alignSelf:             { kind: 'flat-transform', lvglProp: 'gridCellYAlign', valueMap: GRID_CELL_ALIGN_VALUES },

  // ── Widget placement ──────────────────────────────────────────────
  placeSelf:             { kind: 'flat-transform', lvglProp: 'align', valueMap: PLACE_SELF_VALUES },

  // ── Scrollbar ─────────────────────────────────────────────────────
  scrollbarMode:         { kind: 'flat-transform', lvglProp: 'scrollbarMode', valueMap: SCROLLBAR_MODE_VALUES },

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
  position:        'LVGL does not support CSS position. Use left/top or placeSelf for widget alignment.',
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
  const layoutBag: Record<string, unknown> = {};

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

  // Pass 2: direct, transform, layout, and flat-transform mappings
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
    } else if (mapping?.kind === 'flat-transform') {
      // Flat widget prop with value mapping (placeSelf, scrollbarMode, grid cell align)
      if (typeof value === 'string') {
        const mapped = mapping.valueMap[value];
        if (mapped !== undefined) {
          result[mapping.lvglProp] = mapped;
        } else {
          throw new Error(
            `Invalid value "${value}" for style property "${key}". ` +
            `Expected one of: ${Object.keys(mapping.valueMap).join(', ')}`,
          );
        }
      } else {
        result[mapping.lvglProp] = value;
      }
    } else if (mapping?.kind === 'layout-transform') {
      // Layout block prop with value mapping (display, flexDirection, etc.)
      if (typeof value === 'string') {
        const mapped = mapping.valueMap[value];
        if (mapped !== undefined) {
          layoutBag[mapping.lvglProp] = mapped;
        } else {
          throw new Error(
            `Invalid value "${value}" for style property "${key}". ` +
            `Expected one of: ${Object.keys(mapping.valueMap).join(', ')}`,
          );
        }
      } else {
        layoutBag[mapping.lvglProp] = value;
      }
    } else if (mapping?.kind === 'layout-array') {
      // Layout block array prop (gridTemplateColumns, gridTemplateRows)
      if (Array.isArray(value)) {
        layoutBag[mapping.lvglProp] = value.map(transformGridTrackValue);
      } else {
        layoutBag[mapping.lvglProp] = value;
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

  // Merge layout block if any layout properties were set
  if (Object.keys(layoutBag).length > 0) {
    result.layout = layoutBag;
  }

  return result;
}

/**
 * Transform a CSS-like grid track value to LVGL format.
 *
 * - `'fr(n)'` → `'FR(n)'`
 * - `'content'` → `'CONTENT'`
 * - number → number (px)
 * - other strings → pass through (already in LVGL format like 'FR(1)')
 */
function transformGridTrackValue(v: unknown): unknown {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') {
    const frMatch = /^fr\((\d+)\)$/i.exec(v);
    if (frMatch) return `FR(${frMatch[1]})`;
    if (v.toLowerCase() === 'content') return 'CONTENT';
    return v; // pass through 'FR(1)', 'SIZE_CONTENT', etc.
  }
  return v;
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
