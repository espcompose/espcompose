// ────────────────────────────────────────────────────────────────────────────
// LVGL Style Value Translation — ESPHome target
//
// `@espcompose/core` emits LVGL style values in semantic CSS form (e.g.
// `bg_opa: 'transparent'`, `width: 'fit-content'`, `flex_flow: 'row'`,
// `grid_columns: ['fr(1)', 'content']`).  ESPHome's LVGL Python codegen
// expects the LVGL C-macro spellings (`TRANSP`, `SIZE_CONTENT`, `ROW`,
// `FR(1)`, `CONTENT`).  This module performs that translation as a final
// pass over the lowered `lvgl:` YAML section.
//
// The translation is keyed by the snake_case LVGL style prop name (the same
// shape that lands in the YAML).  Unknown prop names and unknown values are
// passed through unchanged so user-supplied raw tokens still work.
//
// INVARIANT: keys here must stay in sync with the value-map entries in
// `@espcompose/core/style-mapping.ts` — drift means a semantic value will
// reach the YAML untranslated.
// ────────────────────────────────────────────────────────────────────────────

const OPA = { transparent: 'TRANSP', opaque: 'COVER' } as const;
const ALIGN_TEXT = { left: 'LEFT', center: 'CENTER', right: 'RIGHT', auto: 'AUTO' } as const;
const TEXT_DECOR = { none: 'NONE', underline: 'UNDERLINE', strikethrough: 'STRIKETHROUGH' } as const;
const BORDER_SIDE = { none: 'NONE', top: 'TOP', bottom: 'BOTTOM', left: 'LEFT', right: 'RIGHT', internal: 'INTERNAL' } as const;
const GRAD_DIR = { none: 'NONE', horizontal: 'HOR', vertical: 'VER' } as const;
const DITHER_MODE = { none: 'NONE', ordered: 'ORDERED', 'error-diffusion': 'ERR_DIFF' } as const;
const SIZE = { 'fit-content': 'SIZE_CONTENT' } as const;
const FLEX_FLOW = { row: 'ROW', column: 'COLUMN', 'row-wrap': 'ROW_WRAP', 'column-wrap': 'COLUMN_WRAP' } as const;
const FLEX_MAIN = { start: 'START', center: 'CENTER', end: 'END', spaceBetween: 'SPACE_BETWEEN', spaceAround: 'SPACE_AROUND', spaceEvenly: 'SPACE_EVENLY' } as const;
const FLEX_CROSS = { start: 'START', center: 'CENTER', end: 'END', stretch: 'STRETCH' } as const;
const GRID_ALIGN = { start: 'START', center: 'CENTER', end: 'END', stretch: 'STRETCH', spaceBetween: 'SPACE_BETWEEN', spaceAround: 'SPACE_AROUND', spaceEvenly: 'SPACE_EVENLY' } as const;
const GRID_CELL_ALIGN = { start: 'START', center: 'CENTER', end: 'END', stretch: 'STRETCH' } as const;
const PLACE_SELF = { center: 'CENTER', topLeft: 'TOP_LEFT', topCenter: 'TOP_MID', topRight: 'TOP_RIGHT', bottomLeft: 'BOTTOM_LEFT', bottomCenter: 'BOTTOM_MID', bottomRight: 'BOTTOM_RIGHT', leftCenter: 'LEFT_MID', rightCenter: 'RIGHT_MID' } as const;
const SCROLLBAR_MODE = { off: 'OFF', on: 'ON', active: 'ACTIVE', auto: 'AUTO' } as const;
const RADIUS = { circle: 'CIRCLE' } as const;
const BLUR_QUALITY = { auto: 'AUTO', speed: 'SPEED', precision: 'PRECISION' } as const;

/**
 * Maps snake_case LVGL style prop names → semantic CSS value → LVGL C-macro
 * spelling.  Looked up by exact prop key during the recursive walk.
 */
const VALUE_TRANSLATIONS: Readonly<Record<string, Readonly<Record<string, string>>>> = {
  // Opacity props
  opa:                       OPA,
  bg_opa:                    OPA,
  text_opa:                  OPA,
  border_opa:                OPA,
  outline_opa:               OPA,
  shadow_opa:                OPA,
  bg_image_opa:              OPA,
  bg_image_recolor_opa:      OPA,
  color_filter_opa:          OPA,
  opa_layered:               OPA,
  image_recolor_opa:         OPA,
  arc_opa:                   OPA,

  // Text
  text_align:                ALIGN_TEXT,
  text_decor:                TEXT_DECOR,

  // Border
  border_side:               BORDER_SIDE,
  radius:                    RADIUS,

  // Background gradient
  bg_grad_dir:               GRAD_DIR,
  bg_dither_mode:            DITHER_MODE,

  // Sizing
  width:                     SIZE,
  height:                    SIZE,
  min_width:                 SIZE,
  max_width:                 SIZE,
  min_height:                SIZE,
  max_height:                SIZE,

  // Flex (live inside the layout block; same snake_case names there)
  flex_flow:                 FLEX_FLOW,
  flex_align_main:           FLEX_MAIN,
  flex_align_cross:          FLEX_CROSS,
  flex_align_track:          FLEX_CROSS,

  // Grid (parent props inside layout block)
  grid_column_align:         GRID_ALIGN,
  grid_row_align:            GRID_ALIGN,

  // Grid cell alignment (flat on widget)
  grid_cell_x_align:         GRID_CELL_ALIGN,
  grid_cell_y_align:         GRID_CELL_ALIGN,

  // Widget placement
  align:                     PLACE_SELF,

  // Scrollbar
  scrollbar_mode:            SCROLLBAR_MODE,

  // Blur
  blur_quality:              BLUR_QUALITY,
};

/** Snake_case LVGL props that hold grid track value arrays. */
const GRID_TRACK_PROPS: ReadonlySet<string> = new Set(['grid_columns', 'grid_rows']);

/**
 * Detect a quoted-string marker (`QuotedMarker` from `@espcompose/core` or a
 * `yaml.Scalar` with `QUOTE_SINGLE`).  Both expose `{ value: string; type }`
 * where `type` is the string literal `'QUOTE_SINGLE'`.  We mutate `.value`
 * in place to preserve the quoted-output behavior.
 */
function asQuotedStringHolder(v: unknown): { value: string } | null {
  if (v == null || typeof v !== 'object') return null;
  const o = v as { value?: unknown; type?: unknown };
  if (typeof o.value === 'string' && o.type === 'QUOTE_SINGLE') {
    return o as { value: string };
  }
  return null;
}

/**
 * Read a translatable string value out of a raw string or a quoted-string
 * marker.  Returns null when the value is neither.
 */
function readStringValue(v: unknown): string | null {
  if (typeof v === 'string') return v;
  const q = asQuotedStringHolder(v);
  return q ? q.value : null;
}

/**
 * Translate a single grid track value to its LVGL C-macro spelling.
 *   `'fr(1)'` → `'FR(1)'`, `'content'` → `'CONTENT'`.
 * Numbers and unknown strings pass through unchanged.
 */
function translateGridTrackValue(v: unknown): unknown {
  const s = readStringValue(v);
  if (s == null) return v;
  let translated: string | null = null;
  const m = /^fr\((\d+)\)$/i.exec(s);
  if (m) translated = `FR(${m[1]})`;
  else if (s.toLowerCase() === 'content') translated = 'CONTENT';
  if (translated == null) return v;
  const q = asQuotedStringHolder(v);
  if (q) {
    q.value = translated;
    return v;
  }
  return translated;
}

/**
 * Recursively walk an LVGL widget tree and translate semantic CSS values to
 * LVGL C-macro spellings on every known style prop.  Mutates in place.
 *
 * Safe to call on the lowered `lvgl:` section as a final post-processing
 * step.  Operates on plain JS objects/arrays (not IR).
 */
export function translateLvglStyleValues(node: unknown): void {
  if (node == null) return;
  if (Array.isArray(node)) {
    for (const item of node) translateLvglStyleValues(item);
    return;
  }
  if (typeof node !== 'object') return;

  const obj = node as Record<string, unknown>;
  for (const [key, value] of Object.entries(obj)) {
    // Translate grid track arrays.
    if (GRID_TRACK_PROPS.has(key) && Array.isArray(value)) {
      obj[key] = value.map(translateGridTrackValue);
      continue;
    }

    // Translate scalar style values where the prop has a translation table
    // and the value matches a known semantic key.  Handles both raw strings
    // and quoted-string markers (mutating the marker's `.value` in place).
    const table = VALUE_TRANSLATIONS[key];
    if (table) {
      const s = readStringValue(value);
      if (s != null && Object.prototype.hasOwnProperty.call(table, s)) {
        const translated = table[s];
        const q = asQuotedStringHolder(value);
        if (q) {
          q.value = translated;
        } else {
          obj[key] = translated;
        }
        continue;
      }
    }

    // Recurse into nested objects/arrays (children, layout, state/part nests).
    // Skip quoted-string markers — they are leaf scalars, not containers.
    if (value != null && typeof value === 'object' && asQuotedStringHolder(value) == null) {
      translateLvglStyleValues(value);
    }
  }
}
