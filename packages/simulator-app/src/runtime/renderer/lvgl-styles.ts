// ────────────────────────────────────────────────────────────────────────────
// LVGL style props → CSS mapping
//
// Converts LVGL style property names and values into CSS inline style
// strings. Handles colors (int → hex), dimensions (number → px), padding,
// borders, radius, opacity, shadows, transforms, gradients, grid/flex
// layout, and state/part sub-styles.
// ────────────────────────────────────────────────────────────────────────────

import type { RuntimeProp } from '../types';

// ── LVGL state & part names (snake_case as they arrive from IR) ──────────────

const LVGL_STATE_NAMES: ReadonlySet<string> = new Set([
  'checked', 'focused', 'focus_key', 'edited', 'hovered',
  'pressed', 'scrolled', 'disabled', 'user_1', 'user_2', 'user_3', 'user_4',
]);

const LVGL_PART_NAMES: ReadonlySet<string> = new Set([
  'indicator', 'knob', 'scrollbar', 'selected', 'items',
  'ticks', 'cursor', 'textarea_placeholder',
]);

// ── Structured style output ──────────────────────────────────────────────────

export interface StyleOutput {
  /** Base CSS styles for the widget. */
  base: string;
  /** CSS styles keyed by LVGL state name (e.g. 'pressed', 'hovered'). */
  states: Record<string, string>;
  /** CSS styles keyed by LVGL part name, each with its own base + states. */
  parts: Record<string, { base: string; states: Record<string, string> }>;
}

// ── Value helpers ────────────────────────────────────────────────────────────

/**
 * Resolve a RuntimeProp to its current value (static or reactive snapshot).
 */
export function getStaticValue(prop: RuntimeProp | undefined): unknown {
  if (!prop) return undefined;
  if (prop.kind === 'static') return prop.value;
  if (prop.kind === 'reactive') return prop.evaluate();
  if (prop.kind === 'ref') return prop.refId;
  return undefined;
}

/**
 * Convert an LVGL integer color (0xRRGGBB) to a CSS hex string.
 */
export function lvglColorToCss(value: unknown): string | undefined {
  if (typeof value === 'number') {
    return `#${(value & 0xffffff).toString(16).padStart(6, '0')}`;
  }
  if (typeof value === 'string') {
    if (value.startsWith('#')) return value;
    // The serializer converts '#RRGGBB' → '0xRRGGBB' for ESPHome YAML;
    // convert back to CSS hex format for the browser.
    if (value.startsWith('0x') || value.startsWith('0X')) {
      return `#${value.slice(2).padStart(6, '0')}`;
    }
  }
  return undefined;
}

/**
 * Convert a numeric dimension to a CSS px value.
 * Handles LVGL keyword `SIZE_CONTENT` → `fit-content`.
 * Passes through percentage strings as-is.
 */
function dimToCss(value: unknown): string | undefined {
  if (typeof value === 'number') return `${value}px`;
  if (typeof value === 'string') {
    if (value === 'SIZE_CONTENT') return 'fit-content';
    return value;
  }
  return undefined;
}

/**
 * Convert an LVGL opacity value (0–255 number, or keyword string) to
 * a 0–1 float string for CSS.
 */
function opaToCssFloat(value: unknown): number | undefined {
  if (typeof value === 'number') return value / 255;
  if (typeof value === 'string') {
    if (value === 'TRANSP') return 0;
    if (value === 'COVER') return 1;
    // percentage string like '50%'
    if (value.endsWith('%')) {
      const n = parseFloat(value);
      if (!Number.isNaN(n)) return n / 100;
    }
  }
  return undefined;
}

/**
 * Convert LVGL border radius. Handles the `CIRCLE` keyword → 9999px.
 */
function radiusToCss(value: unknown): string | undefined {
  if (typeof value === 'string' && value === 'CIRCLE') return '9999px';
  return dimToCss(value);
}

// ── Style prop mapping ───────────────────────────────────────────────────────

/** Maps LVGL style property names to CSS property + value converter. */
interface StyleMapping {
  css: string;
  convert: (v: unknown) => string | undefined;
}

/**
 * Keys handled by composition (shadow, transform, gradient) or separate
 * post-processing rather than direct 1:1 STYLE_MAP entries.
 * These are skipped in the main mapping loop but collected for composition.
 */
const COMPOSED_KEYS: ReadonlySet<string> = new Set([
  // Shadow
  'shadow_color', 'shadow_width', 'shadow_ofs_x', 'shadow_ofs_y',
  'shadow_spread', 'shadow_opa',
  // Transform
  'translate_x', 'translate_y', 'transform_angle', 'transform_zoom',
  'transform_height', 'transform_pivot_x', 'transform_pivot_y',
  // Gradient
  'bg_grad_color', 'bg_grad_dir', 'bg_grad_stop', 'bg_main_stop',
  // Per-layer opacity (composed with their color property)
  'bg_opa', 'text_opa', 'border_opa', 'outline_opa',
]);

const STYLE_MAP: Record<string, StyleMapping> = {
  // Colors (may be modified by per-layer opacity composition)
  bg_color:        { css: 'background-color', convert: lvglColorToCss },
  text_color:      { css: 'color', convert: lvglColorToCss },
  border_color:    { css: 'border-color', convert: lvglColorToCss },
  outline_color:   { css: 'outline-color', convert: lvglColorToCss },

  // Element-level opacity
  opa:             { css: 'opacity', convert: v => {
    const f = opaToCssFloat(v);
    return f != null ? String(f) : undefined;
  }},

  // Dimensions
  width:           { css: 'width', convert: dimToCss },
  height:          { css: 'height', convert: dimToCss },
  min_width:       { css: 'min-width', convert: dimToCss },
  min_height:      { css: 'min-height', convert: dimToCss },
  max_width:       { css: 'max-width', convert: dimToCss },
  max_height:      { css: 'max-height', convert: dimToCss },

  // Position
  x:               { css: 'left', convert: dimToCss },
  y:               { css: 'top', convert: dimToCss },

  // Padding
  pad_top:         { css: 'padding-top', convert: dimToCss },
  pad_bottom:      { css: 'padding-bottom', convert: dimToCss },
  pad_left:        { css: 'padding-left', convert: dimToCss },
  pad_right:       { css: 'padding-right', convert: dimToCss },
  pad_all:         { css: 'padding', convert: dimToCss },
  pad_row:         { css: 'row-gap', convert: dimToCss },
  pad_column:      { css: 'column-gap', convert: dimToCss },

  // Border
  border_width:    { css: 'border-width', convert: dimToCss },
  border_side:     { css: 'border-style', convert: v => {
    if (typeof v !== 'string') return 'solid';
    // LVGL side values — we always need border-style to be non-none for
    // border-width to render, but we can hint per-side via border-*-style.
    // For the inline style approach, just emit 'solid'; per-side is
    // approximated when border_side is not 'NONE'.
    return v === 'NONE' ? 'none' : 'solid';
  }},

  // Radius
  radius:          { css: 'border-radius', convert: radiusToCss },

  // Text
  text_font:       { css: 'font', convert: v => typeof v === 'string' ? v : undefined },
  text_letter_space: { css: 'letter-spacing', convert: dimToCss },
  text_line_space: { css: 'line-height', convert: dimToCss },
  text_align:      { css: 'text-align', convert: v => typeof v === 'string' ? v.toLowerCase() : undefined },
  text_decor:      { css: 'text-decoration', convert: v => {
    if (typeof v !== 'string') return undefined;
    switch (v.toUpperCase()) {
      case 'NONE': return 'none';
      case 'UNDERLINE': return 'underline';
      case 'STRIKETHROUGH': return 'line-through';
      default: return v.toLowerCase();
    }
  }},

  // Outline
  outline_width:   { css: 'outline-width', convert: dimToCss },
  outline_pad:     { css: 'outline-offset', convert: dimToCss },

  // Clipping
  clip_corner:     { css: 'overflow', convert: v => v === true ? 'hidden' : v === false ? 'visible' : undefined },

  // Animation
  anim_time:       { css: 'transition-duration', convert: v => typeof v === 'number' ? `${v}ms` : typeof v === 'string' ? v : undefined },

  // Background image
  bg_image_src:    { css: 'background-image', convert: v => typeof v === 'string' ? `url(${v})` : undefined },
  bg_image_tiled:  { css: 'background-repeat', convert: v => v === true ? 'repeat' : v === false ? 'no-repeat' : undefined },

  // Widget alignment (LVGL align enum)
  align:           { css: 'place-self', convert: v => mapPlaceSelf(v) },

  // Scrollbar
  scrollbar_mode:  { css: 'overflow', convert: v => {
    if (typeof v !== 'string') return undefined;
    switch (v.toUpperCase()) {
      case 'OFF': return 'hidden';
      case 'ON': case 'ACTIVE': case 'AUTO': return 'auto';
      default: return undefined;
    }
  }},

  // Flex layout
  flex_flow:       { css: 'flex-direction', convert: v => mapFlexFlow(v) },
  flex_grow:       { css: 'flex-grow', convert: v => typeof v === 'number' ? String(v) : undefined },

  // Grid child props
  grid_cell_column_pos:  { css: 'grid-column-start', convert: v => typeof v === 'number' ? String(v + 1) : undefined },
  grid_cell_row_pos:     { css: 'grid-row-start', convert: v => typeof v === 'number' ? String(v + 1) : undefined },
  grid_cell_column_span: { css: 'grid-column-end', convert: v => typeof v === 'number' ? `span ${v}` : undefined },
  grid_cell_row_span:    { css: 'grid-row-end', convert: v => typeof v === 'number' ? `span ${v}` : undefined },
  grid_cell_x_align:     { css: 'justify-self', convert: v => mapGridCellAlign(v) },
  grid_cell_y_align:     { css: 'align-self', convert: v => mapGridCellAlign(v) },

  // Arc / spinner props — exposed as CSS custom properties for widget-specific use
  arc_color:       { css: '--arc-color', convert: lvglColorToCss },
  arc_width:       { css: '--arc-width', convert: dimToCss },
  arc_opa:         { css: '--arc-opa', convert: v => {
    const f = opaToCssFloat(v);
    return f != null ? String(f) : undefined;
  }},
  arc_rounded:     { css: '--arc-rounded', convert: v => v === true ? '1' : v === false ? '0' : undefined },
};

// ── Value mappers ────────────────────────────────────────────────────────────

function mapFlexFlow(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  switch (value.toUpperCase()) {
    case 'ROW': return 'row';
    case 'COLUMN': return 'column';
    case 'ROW_REVERSE': return 'row-reverse';
    case 'COLUMN_REVERSE': return 'column-reverse';
    case 'ROW_WRAP': return 'row'; // wrap handled separately
    case 'COLUMN_WRAP': return 'column';
    default: return value.toLowerCase();
  }
}

/** Convert LVGL flex alignment values to CSS justify-content equivalents. */
function mapFlexAlignMain(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  switch (value.toUpperCase()) {
    case 'START': return 'flex-start';
    case 'CENTER': return 'center';
    case 'END': return 'flex-end';
    case 'SPACE_BETWEEN': return 'space-between';
    case 'SPACE_AROUND': return 'space-around';
    case 'SPACE_EVENLY': return 'space-evenly';
    default: return undefined;
  }
}

/** Convert LVGL flex alignment values to CSS align-items/align-content equivalents. */
function mapFlexAlignCross(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  switch (value.toUpperCase()) {
    case 'START': return 'flex-start';
    case 'CENTER': return 'center';
    case 'END': return 'flex-end';
    case 'STRETCH': return 'stretch';
    default: return undefined;
  }
}

/** Convert LVGL grid alignment values to CSS equivalents. */
function mapGridAlign(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  switch (value.toUpperCase()) {
    case 'START': return 'start';
    case 'CENTER': return 'center';
    case 'END': return 'end';
    case 'STRETCH': return 'stretch';
    case 'SPACE_BETWEEN': return 'space-between';
    case 'SPACE_AROUND': return 'space-around';
    case 'SPACE_EVENLY': return 'space-evenly';
    default: return undefined;
  }
}

/** Convert LVGL grid cell alignment values to CSS. */
function mapGridCellAlign(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  switch (value.toUpperCase()) {
    case 'START': return 'start';
    case 'CENTER': return 'center';
    case 'END': return 'end';
    case 'STRETCH': return 'stretch';
    default: return undefined;
  }
}

/** Convert LVGL placeSelf / align enum to CSS. */
function mapPlaceSelf(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  switch (value.toUpperCase()) {
    case 'CENTER': return 'center';
    case 'TOP_LEFT': return 'start start';
    case 'TOP_MID': return 'start center';
    case 'TOP_RIGHT': return 'start end';
    case 'BOTTOM_LEFT': return 'end start';
    case 'BOTTOM_MID': return 'end center';
    case 'BOTTOM_RIGHT': return 'end end';
    case 'LEFT_MID': return 'center start';
    case 'RIGHT_MID': return 'center end';
    default: return undefined;
  }
}

/**
 * Convert an LVGL grid track value (e.g. 'FR(1)', 'CONTENT', number) to CSS.
 */
function gridTrackToCss(value: unknown): string {
  if (typeof value === 'number') return `${value}px`;
  if (typeof value === 'string') {
    const frMatch = /^FR\((\d+)\)$/i.exec(value);
    if (frMatch) return `${frMatch[1]}fr`;
    if (value.toUpperCase() === 'CONTENT') return 'auto';
    return value;
  }
  return 'auto';
}

// ── Composed property helpers ────────────────────────────────────────────────

/** Apply alpha to a CSS hex color string, returning rgba(). */
function applyAlpha(cssColor: string, alpha: number): string {
  // Parse #rrggbb
  const match = /^#([0-9a-f]{6})$/i.exec(cssColor);
  if (match) {
    const r = parseInt(match[1].slice(0, 2), 16);
    const g = parseInt(match[1].slice(2, 4), 16);
    const b = parseInt(match[1].slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
  }
  // Fallback: use color-mix
  return `color-mix(in srgb, ${cssColor} ${Math.round(alpha * 100)}%, transparent)`;
}

// ── Core style builder ───────────────────────────────────────────────────────

/**
 * Build CSS parts from a flat map of LVGL property name → raw value.
 * Used both for base-level props and for state/part sub-objects.
 *
 * Returns the CSS string plus flags about position/flex state.
 */
function buildCssParts(
  entries: Iterable<[string, unknown]>,
): { parts: string[]; hasPosition: boolean; hasFlexFlow: boolean; rawValues: Map<string, unknown> } {
  const parts: string[] = [];
  let hasPosition = false;
  let hasFlexFlow = false;
  const rawValues = new Map<string, unknown>();

  for (const [key, raw] of entries) {
    if (raw == null) continue;
    rawValues.set(key, raw);

    // Skip composed keys — handled in post-processing
    if (COMPOSED_KEYS.has(key)) continue;
    // Skip layout, state, and part sub-objects
    if (key === 'layout') continue;
    if (LVGL_STATE_NAMES.has(key) || LVGL_PART_NAMES.has(key)) continue;

    const mapping = STYLE_MAP[key];
    if (!mapping) continue;

    const cssValue = mapping.convert(raw);
    if (cssValue == null) continue;

    parts.push(`${mapping.css}: ${cssValue}`);

    if (key === 'x' || key === 'y') hasPosition = true;
    if (key === 'flex_flow') hasFlexFlow = true;
  }

  return { parts, hasPosition, hasFlexFlow, rawValues };
}

/**
 * Compose per-layer opacity with its corresponding color property.
 *
 * If bg_opa is present and bg_color is also set, emits background-color
 * with alpha instead of overriding element opacity.
 */
function composePerLayerOpacity(
  parts: string[],
  rawValues: Map<string, unknown>,
): void {
  const opaLayers: Array<{
    opaKey: string;
    colorKey: string;
    cssProp: string;
  }> = [
    { opaKey: 'bg_opa', colorKey: 'bg_color', cssProp: 'background-color' },
    { opaKey: 'text_opa', colorKey: 'text_color', cssProp: 'color' },
    { opaKey: 'border_opa', colorKey: 'border_color', cssProp: 'border-color' },
    { opaKey: 'outline_opa', colorKey: 'outline_color', cssProp: 'outline-color' },
  ];

  for (const { opaKey, colorKey, cssProp } of opaLayers) {
    const opaRaw = rawValues.get(opaKey);
    if (opaRaw == null) continue;

    const alpha = opaToCssFloat(opaRaw);
    if (alpha == null) continue;

    const colorRaw = rawValues.get(colorKey);
    const cssColor = colorRaw != null ? lvglColorToCss(colorRaw) : undefined;

    if (cssColor) {
      // Replace the existing color entry with alpha-composited version
      const alphaColor = applyAlpha(cssColor, alpha);
      const idx = parts.findIndex(p => p.startsWith(`${cssProp}:`));
      if (idx >= 0) {
        parts[idx] = `${cssProp}: ${alphaColor}`;
      } else {
        parts.push(`${cssProp}: ${alphaColor}`);
      }
    }
    // If no color is present, skip — can't apply opacity without knowing the color
  }
}

/**
 * Compose box-shadow from individual shadow sub-properties.
 */
function composeShadow(
  parts: string[],
  rawValues: Map<string, unknown>,
): void {
  const colorRaw = rawValues.get('shadow_color');
  const widthRaw = rawValues.get('shadow_width');

  // Need at least a color or width to produce a shadow
  if (colorRaw == null && widthRaw == null) return;

  const ofsX = typeof rawValues.get('shadow_ofs_x') === 'number' ? rawValues.get('shadow_ofs_x') as number : 0;
  const ofsY = typeof rawValues.get('shadow_ofs_y') === 'number' ? rawValues.get('shadow_ofs_y') as number : 0;
  const blur = typeof widthRaw === 'number' ? widthRaw : 0;
  const spread = typeof rawValues.get('shadow_spread') === 'number' ? rawValues.get('shadow_spread') as number : 0;

  let color = colorRaw != null ? lvglColorToCss(colorRaw) : '#000000';
  if (!color) color = '#000000';

  const opaRaw = rawValues.get('shadow_opa');
  if (opaRaw != null) {
    const alpha = opaToCssFloat(opaRaw);
    if (alpha != null) {
      color = applyAlpha(color, alpha);
    }
  }

  parts.push(`box-shadow: ${ofsX}px ${ofsY}px ${blur}px ${spread}px ${color}`);
}

/**
 * Compose CSS transform from individual transform sub-properties.
 */
function composeTransform(
  parts: string[],
  rawValues: Map<string, unknown>,
): void {
  const transforms: string[] = [];

  const tx = rawValues.get('translate_x');
  const ty = rawValues.get('translate_y');
  if (tx != null) {
    const css = dimToCss(tx);
    if (css) transforms.push(`translateX(${css})`);
  }
  if (ty != null) {
    const css = dimToCss(ty);
    if (css) transforms.push(`translateY(${css})`);
  }

  const angle = rawValues.get('transform_angle');
  if (typeof angle === 'number') {
    // LVGL uses 0.1° units
    transforms.push(`rotate(${angle / 10}deg)`);
  }

  const zoom = rawValues.get('transform_zoom');
  if (typeof zoom === 'number') {
    // LVGL uses 256 = 1.0 scale
    transforms.push(`scale(${zoom / 256})`);
  }

  const scaleY = rawValues.get('transform_height');
  if (typeof scaleY === 'number') {
    transforms.push(`scaleY(${scaleY / 256})`);
  }

  if (transforms.length > 0) {
    parts.push(`transform: ${transforms.join(' ')}`);
  }

  // Transform origin
  const pivotX = rawValues.get('transform_pivot_x');
  const pivotY = rawValues.get('transform_pivot_y');
  if (pivotX != null || pivotY != null) {
    const x = dimToCss(pivotX) ?? '50%';
    const y = dimToCss(pivotY) ?? '50%';
    parts.push(`transform-origin: ${x} ${y}`);
  }
}

/**
 * Compose CSS linear-gradient from gradient sub-properties.
 * Requires bg_color for the start color.
 */
function composeGradient(
  parts: string[],
  rawValues: Map<string, unknown>,
): void {
  const gradColor = rawValues.get('bg_grad_color');
  if (gradColor == null) return;

  const gradCss = lvglColorToCss(gradColor);
  if (!gradCss) return;

  const bgColor = rawValues.get('bg_color');
  const bgCss = bgColor != null ? lvglColorToCss(bgColor) : undefined;
  if (!bgCss) return;

  // Direction
  const dir = rawValues.get('bg_grad_dir');
  let cssDir = 'to bottom'; // default vertical
  if (typeof dir === 'string') {
    switch (dir.toUpperCase()) {
      case 'HOR': cssDir = 'to right'; break;
      case 'VER': cssDir = 'to bottom'; break;
    }
  }

  // Stop positions (LVGL uses 0–255 range)
  const mainStop = rawValues.get('bg_main_stop');
  const gradStop = rawValues.get('bg_grad_stop');
  const mainPct = typeof mainStop === 'number' ? Math.round(mainStop / 255 * 100) : 0;
  const gradPct = typeof gradStop === 'number' ? Math.round(gradStop / 255 * 100) : 100;

  const gradient = `linear-gradient(${cssDir}, ${bgCss} ${mainPct}%, ${gradCss} ${gradPct}%)`;

  // Replace the background-color with a background that includes the gradient
  const bgIdx = parts.findIndex(p => p.startsWith('background-color:'));
  if (bgIdx >= 0) {
    parts[bgIdx] = `background: ${gradient}`;
  } else {
    parts.push(`background: ${gradient}`);
  }
}

// ── Layout handling ──────────────────────────────────────────────────────────

function applyLayoutStyles(
  parts: string[],
  layout: Record<string, unknown>,
  hasFlexFlow: boolean,
): boolean {
  if (layout.type === 'flex') {
    parts.push('display: flex');

    if (layout.flex_flow) {
      const flexDir = mapFlexFlow(layout.flex_flow);
      if (flexDir) parts.push(`flex-direction: ${flexDir}`);
    }

    if (layout.flex_align_main) {
      const justify = mapFlexAlignMain(layout.flex_align_main);
      if (justify) parts.push(`justify-content: ${justify}`);
    }

    if (layout.flex_align_cross) {
      const align = mapFlexAlignCross(layout.flex_align_cross);
      if (align) parts.push(`align-items: ${align}`);
    } else {
      // LVGL defaults to LV_FLEX_ALIGN_START; CSS defaults to stretch.
      parts.push('align-items: flex-start');
    }

    if (layout.flex_align_track) {
      const alignContent = mapFlexAlignCross(layout.flex_align_track);
      if (alignContent) parts.push(`align-content: ${alignContent}`);
    }

    if (typeof layout.flex_flow === 'string' && layout.flex_flow.toUpperCase().includes('WRAP')) {
      parts.push('flex-wrap: wrap');
    }

    return true; // hasFlexFlow
  }

  if (layout.type === 'grid') {
    parts.push('display: grid');

    // Grid template columns
    if (Array.isArray(layout.grid_columns)) {
      const cols = layout.grid_columns.map(gridTrackToCss).join(' ');
      parts.push(`grid-template-columns: ${cols}`);
    }

    // Grid template rows
    if (Array.isArray(layout.grid_rows)) {
      const rows = layout.grid_rows.map(gridTrackToCss).join(' ');
      parts.push(`grid-template-rows: ${rows}`);
    }

    // Column alignment (justify-items)
    if (layout.grid_column_align) {
      const align = mapGridAlign(layout.grid_column_align);
      if (align) parts.push(`justify-items: ${align}`);
    }

    // Row alignment (align-content)
    if (layout.grid_row_align) {
      const align = mapGridAlign(layout.grid_row_align);
      if (align) parts.push(`align-content: ${align}`);
    }

    return hasFlexFlow;
  }

  return hasFlexFlow;
}

// ── Build a CSS string from raw LVGL prop entries ────────────────────────────

/**
 * Internal: convert a flat set of LVGL key/value pairs to a CSS string.
 * Used for the base props and also recursively for state/part sub-objects.
 */
function buildCssString(
  entries: Iterable<[string, unknown]>,
  layoutObj?: Record<string, unknown>,
): string {
  const { parts, hasPosition, hasFlexFlow, rawValues } = buildCssParts(entries);

  if (hasPosition) {
    parts.unshift('position: absolute');
  }

  // Per-layer opacity composition (bg_opa, text_opa, border_opa, outline_opa)
  composePerLayerOpacity(parts, rawValues);

  // In LVGL, border_width alone is enough to show a border — no separate
  // border-style is needed. In CSS, border-width does nothing without
  // border-style. Auto-inject 'border-style: solid' when border_width is
  // present but border_side was not explicitly set.
  if (rawValues.has('border_width') && !rawValues.has('border_side')) {
    parts.push('border-style: solid');
  }

  // Composed properties
  composeShadow(parts, rawValues);
  composeTransform(parts, rawValues);
  composeGradient(parts, rawValues);

  // Layout (flex / grid)
  let flexFlowResolved = hasFlexFlow;
  if (layoutObj) {
    flexFlowResolved = applyLayoutStyles(parts, layoutObj, hasFlexFlow);
  }

  // Fallback flex detection from flat flex_flow prop
  if (!flexFlowResolved && rawValues.has('flex_flow')) {
    parts.push('display: flex');
    const flow = rawValues.get('flex_flow');
    if (typeof flow === 'string' && flow.toUpperCase().includes('WRAP')) {
      parts.push('flex-wrap: wrap');
    }
  }

  return parts.join('; ');
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Extract structured CSS styles from a RuntimeNode's props.
 *
 * Returns a `StyleOutput` with:
 * - `base`: CSS string for the widget's main element
 * - `states`: CSS strings keyed by LVGL state name
 * - `parts`: CSS strings keyed by LVGL part name (each with base + states)
 */
export function lvglPropsToStyle(
  props: Record<string, RuntimeProp>,
): StyleOutput {
  // Resolve all prop values up front
  const resolved = new Map<string, unknown>();
  for (const [key, prop] of Object.entries(props)) {
    const v = getStaticValue(prop);
    if (v != null) resolved.set(key, v);
  }

  // Separate layout object
  const layoutRaw = resolved.get('layout');
  const layoutObj = (layoutRaw && typeof layoutRaw === 'object' && !Array.isArray(layoutRaw))
    ? layoutRaw as Record<string, unknown>
    : undefined;

  // Build base styles from non-state, non-part entries
  const baseEntries: Array<[string, unknown]> = [];
  for (const [key, value] of resolved) {
    if (LVGL_STATE_NAMES.has(key) || LVGL_PART_NAMES.has(key)) continue;
    if (key === 'layout') continue;
    baseEntries.push([key, value]);
  }
  const base = buildCssString(baseEntries, layoutObj);

  // Build state styles
  const states: Record<string, string> = {};
  for (const state of LVGL_STATE_NAMES) {
    const stateValue = resolved.get(state);
    if (stateValue && typeof stateValue === 'object' && !Array.isArray(stateValue)) {
      const stateObj = stateValue as Record<string, unknown>;
      const entries = Object.entries(stateObj);
      if (entries.length > 0) {
        states[state] = buildCssString(entries);
      }
    }
  }

  // Build part styles
  const partStyles: Record<string, { base: string; states: Record<string, string> }> = {};
  for (const part of LVGL_PART_NAMES) {
    const partValue = resolved.get(part);
    if (partValue && typeof partValue === 'object' && !Array.isArray(partValue)) {
      const partObj = partValue as Record<string, unknown>;

      // Separate part's own base props from its nested states
      const partBaseEntries: Array<[string, unknown]> = [];
      const partStates: Record<string, string> = {};

      for (const [key, value] of Object.entries(partObj)) {
        if (LVGL_STATE_NAMES.has(key) && value && typeof value === 'object' && !Array.isArray(value)) {
          const stateEntries = Object.entries(value as Record<string, unknown>);
          if (stateEntries.length > 0) {
            partStates[key] = buildCssString(stateEntries);
          }
        } else {
          partBaseEntries.push([key, value]);
        }
      }

      if (partBaseEntries.length > 0 || Object.keys(partStates).length > 0) {
        partStyles[part] = {
          base: partBaseEntries.length > 0 ? buildCssString(partBaseEntries) : '',
          states: partStates,
        };
      }
    }
  }

  return { base, states, parts: partStyles };
}
