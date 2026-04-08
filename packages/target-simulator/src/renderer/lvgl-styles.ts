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
  text_font:       { css: 'font-family', convert: v => typeof v === 'string' ? v : undefined },
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

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Extract CSS inline style string from a RuntimeNode's props.
 *
 * Walks known LVGL style properties and converts them to CSS.
 * Returns a complete style string (e.g. "background-color: #1a1a2e; padding: 8px").
 * Position is set to absolute if x or y is present.
 */
export function lvglPropsToStyle(
  props: Record<string, RuntimeProp>,
): string {
  const parts: string[] = [];
  let hasPosition = false;

  for (const [key, prop] of Object.entries(props)) {
    const mapping = STYLE_MAP[key];
    if (!mapping) continue;

    const raw = getStaticValue(prop);
    if (raw == null) continue;

    const cssValue = mapping.convert(raw);
    if (cssValue == null) continue;

    parts.push(`${mapping.css}: ${cssValue}`);

    if (key === 'x' || key === 'y') hasPosition = true;
  }

  if (hasPosition) {
    parts.unshift('position: absolute');
  }

  // Flex container detection
  if (props.flex_flow) {
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
