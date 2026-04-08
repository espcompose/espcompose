// ────────────────────────────────────────────────────────────────────────────
// LVGL style props → CSS mapping
//
// Converts LVGL style property names and values into CSS inline style
// strings. Handles colors (int → hex), dimensions (number → px), padding,
// borders, radius, opacity, alignment, and flex layout properties.
// ────────────────────────────────────────────────────────────────────────────

import type { RuntimeProp } from '../types';

/**
 * Resolve a RuntimeProp to its current value (static or reactive snapshot).
 */
export function getStaticValue(prop: RuntimeProp | undefined): unknown {
  if (!prop) return undefined;
  if (prop.kind === 'static') return prop.value;
  if (prop.kind === 'reactive') return prop.current;
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
  if (typeof value === 'string' && value.startsWith('#')) {
    return value;
  }
  return undefined;
}

/**
 * Convert a numeric dimension to a CSS px value.
 * Passes through percentage strings as-is.
 */
function dimToCss(value: unknown): string | undefined {
  if (typeof value === 'number') return `${value}px`;
  if (typeof value === 'string') return value;
  return undefined;
}

// ── Style prop mapping ───────────────────────────────────────────────────────

/** Maps LVGL style property names to CSS property + value converter. */
interface StyleMapping {
  css: string;
  convert: (v: unknown) => string | undefined;
}

const STYLE_MAP: Record<string, StyleMapping> = {
  // Colors
  bg_color:        { css: 'background-color', convert: lvglColorToCss },
  text_color:      { css: 'color', convert: lvglColorToCss },
  border_color:    { css: 'border-color', convert: lvglColorToCss },
  outline_color:   { css: 'outline-color', convert: lvglColorToCss },
  shadow_color:    { css: '--shadow-color', convert: lvglColorToCss },

  // Opacity
  bg_opa:          { css: 'opacity', convert: v => typeof v === 'number' ? String(v / 255) : undefined },
  opa:             { css: 'opacity', convert: v => typeof v === 'number' ? String(v / 255) : undefined },

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
  border_side:     { css: 'border-style', convert: () => 'solid' },

  // Radius
  radius:          { css: 'border-radius', convert: dimToCss },

  // Text
  text_font:       { css: 'font', convert: v => typeof v === 'string' ? v : undefined },
  text_letter_space: { css: 'letter-spacing', convert: dimToCss },
  text_line_space: { css: 'line-height', convert: dimToCss },
  text_align:      { css: 'text-align', convert: v => typeof v === 'string' ? v.toLowerCase() : undefined },

  // Flex layout
  flex_flow:       { css: 'flex-direction', convert: v => mapFlexFlow(v) },
  flex_grow:       { css: 'flex-grow', convert: v => typeof v === 'number' ? String(v) : undefined },
};

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

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Extract CSS inline style string from a RuntimeNode's props.
 *
 * Walks known LVGL style properties and converts them to CSS.
 * Returns a complete style string (e.g. "background-color: #1a1a2e; padding: 8px").
 * Position is set to absolute if x or y is present.
 * 
 * Also handles nested `layout:` objects containing flex/grid alignment properties.
 */
export function lvglPropsToStyle(
  props: Record<string, RuntimeProp>,
): string {
  const parts: string[] = [];
  let hasPosition = false;
  let hasFlexFlow = false;

  for (const [key, prop] of Object.entries(props)) {
    // Skip layout object — will be processed separately below
    if (key === 'layout') continue;

    const mapping = STYLE_MAP[key];
    if (!mapping) continue;

    const raw = getStaticValue(prop);
    if (raw == null) continue;

    const cssValue = mapping.convert(raw);
    if (cssValue == null) continue;

    parts.push(`${mapping.css}: ${cssValue}`);

    if (key === 'x' || key === 'y') hasPosition = true;
    if (key === 'flex_flow') hasFlexFlow = true;
  }

  if (hasPosition) {
    parts.unshift('position: absolute');
  }

  // Handle nested layout object from IR
  const layoutProp = props.layout;
  if (layoutProp) {
    const layoutObj = getStaticValue(layoutProp);
    if (layoutObj && typeof layoutObj === 'object') {
      const layout = layoutObj as Record<string, unknown>;

      // Detect flex container
      if (layout.type === 'flex') {
        parts.push('display: flex');
        hasFlexFlow = true;

        // Map flexFlow if present (IR uses snake_case: flex_flow)
        if (layout.flex_flow) {
          const flexDir = mapFlexFlow(layout.flex_flow);
          if (flexDir) parts.push(`flex-direction: ${flexDir}`);
        }

        // Map main axis alignment (justify-content)
        if (layout.flex_align_main) {
          const justify = mapFlexAlignMain(layout.flex_align_main);
          if (justify) parts.push(`justify-content: ${justify}`);
        }

        // Map cross axis alignment (align-items)
        if (layout.flex_align_cross) {
          const align = mapFlexAlignCross(layout.flex_align_cross);
          if (align) parts.push(`align-items: ${align}`);
        }

        // Map track alignment (align-content)
        if (layout.flex_align_track) {
          const alignContent = mapFlexAlignCross(layout.flex_align_track);
          if (alignContent) parts.push(`align-content: ${alignContent}`);
        }

        // Handle flex-wrap
        if (typeof layout.flex_flow === 'string' && layout.flex_flow.toUpperCase().includes('WRAP')) {
          parts.push('flex-wrap: wrap');
        }
      }
    }
  }

  // Fallback: detect flex container from flex_flow prop if layout object wasn't found
  if (!hasFlexFlow && props.flex_flow) {
    parts.push('display: flex');
    const flow = getStaticValue(props.flex_flow);
    if (typeof flow === 'string' && flow.toUpperCase().includes('WRAP')) {
      parts.push('flex-wrap: wrap');
    }
  }

  return parts.join('; ');
}

/**
 * Escape a string for safe use in HTML attributes.
 */
export function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
