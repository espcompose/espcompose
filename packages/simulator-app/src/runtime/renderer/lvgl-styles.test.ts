import { describe, it, expect } from 'vitest';
import { lvglPropsToStyle, lvglColorToCss, getStaticValue, type StyleOutput } from './lvgl-styles';
import type { RuntimeProp } from '../types';

// ── Helpers ──────────────────────────────────────────────────────────────────

function sp(value: unknown): RuntimeProp {
  return { kind: 'static', value };
}

/** Build props from an object of key→value pairs. */
function buildProps(entries: Record<string, unknown>): Record<string, RuntimeProp> {
  const props: Record<string, RuntimeProp> = {};
  for (const [k, v] of Object.entries(entries)) {
    props[k] = sp(v);
  }
  return props;
}

/** Convert StyleOutput.base to a Map of css-prop → value for easy assertion. */
function parseBase(output: StyleOutput): Map<string, string> {
  const map = new Map<string, string>();
  if (!output.base) return map;
  for (const part of output.base.split('; ')) {
    const colon = part.indexOf(':');
    if (colon < 0) continue;
    const key = part.slice(0, colon).trim();
    const value = part.slice(colon + 1).trim();
    map.set(key, value);
  }
  return map;
}

// ── Phase 1: Keyword values ──────────────────────────────────────────────────

describe('keyword value translation', () => {
  it('SIZE_CONTENT → fit-content for width', () => {
    const output = lvglPropsToStyle(buildProps({ width: 'SIZE_CONTENT' }));
    const css = parseBase(output);
    expect(css.get('width')).toBe('fit-content');
  });

  it('SIZE_CONTENT → fit-content for height', () => {
    const output = lvglPropsToStyle(buildProps({ height: 'SIZE_CONTENT' }));
    const css = parseBase(output);
    expect(css.get('height')).toBe('fit-content');
  });

  it('CIRCLE → 9999px for radius', () => {
    const output = lvglPropsToStyle(buildProps({ radius: 'CIRCLE' }));
    const css = parseBase(output);
    expect(css.get('border-radius')).toBe('9999px');
  });

  it('numeric radius → px', () => {
    const output = lvglPropsToStyle(buildProps({ radius: 12 }));
    const css = parseBase(output);
    expect(css.get('border-radius')).toBe('12px');
  });
});

// ── Phase 1: bg_opa / opa collision fix ──────────────────────────────────────

describe('opacity handling', () => {
  it('opa maps to CSS opacity', () => {
    const output = lvglPropsToStyle(buildProps({ opa: 128 }));
    const css = parseBase(output);
    const val = parseFloat(css.get('opacity')!);
    expect(val).toBeCloseTo(128 / 255, 2);
  });

  it('bg_opa composites into background-color alpha (not element opacity)', () => {
    const output = lvglPropsToStyle(buildProps({ bg_color: '#ff0000', bg_opa: 128 }));
    const css = parseBase(output);
    // Should NOT have a raw 'opacity' from bg_opa
    expect(css.has('opacity')).toBe(false);
    // background-color should have alpha
    const bg = css.get('background-color')!;
    expect(bg).toMatch(/rgba\(255, 0, 0, 0\.50/);
  });

  it('opa and bg_opa coexist without collision', () => {
    const output = lvglPropsToStyle(buildProps({ bg_color: '#00ff00', bg_opa: 128, opa: 200 }));
    const css = parseBase(output);
    // opa → element opacity
    const opaVal = parseFloat(css.get('opacity')!);
    expect(opaVal).toBeCloseTo(200 / 255, 2);
    // bg_opa → alpha on background-color
    const bg = css.get('background-color')!;
    expect(bg).toMatch(/rgba\(0, 255, 0/);
  });

  it('text_opa composites into color alpha', () => {
    const output = lvglPropsToStyle(buildProps({ text_color: '#ffffff', text_opa: 128 }));
    const css = parseBase(output);
    const color = css.get('color')!;
    expect(color).toMatch(/rgba\(255, 255, 255, 0\.50/);
  });

  it('border_opa composites into border-color alpha', () => {
    const output = lvglPropsToStyle(buildProps({ border_color: '#0000ff', border_opa: 64 }));
    const css = parseBase(output);
    const bc = css.get('border-color')!;
    expect(bc).toMatch(/rgba\(0, 0, 255, 0\.25/);
  });

  it('opacity keyword TRANSP → 0', () => {
    const output = lvglPropsToStyle(buildProps({ opa: 'TRANSP' }));
    const css = parseBase(output);
    expect(css.get('opacity')).toBe('0');
  });

  it('opacity keyword COVER → 1', () => {
    const output = lvglPropsToStyle(buildProps({ opa: 'COVER' }));
    const css = parseBase(output);
    expect(css.get('opacity')).toBe('1');
  });
});

// ── Phase 1: Simple missing props ────────────────────────────────────────────

describe('simple missing props', () => {
  it('text_decor UNDERLINE → text-decoration: underline', () => {
    const output = lvglPropsToStyle(buildProps({ text_decor: 'UNDERLINE' }));
    const css = parseBase(output);
    expect(css.get('text-decoration')).toBe('underline');
  });

  it('text_decor STRIKETHROUGH → text-decoration: line-through', () => {
    const output = lvglPropsToStyle(buildProps({ text_decor: 'STRIKETHROUGH' }));
    const css = parseBase(output);
    expect(css.get('text-decoration')).toBe('line-through');
  });

  it('outline_width maps to outline-width', () => {
    const output = lvglPropsToStyle(buildProps({ outline_width: 3 }));
    const css = parseBase(output);
    expect(css.get('outline-width')).toBe('3px');
  });

  it('outline_pad maps to outline-offset', () => {
    const output = lvglPropsToStyle(buildProps({ outline_pad: 5 }));
    const css = parseBase(output);
    expect(css.get('outline-offset')).toBe('5px');
  });

  it('clip_corner true → overflow: hidden', () => {
    const output = lvglPropsToStyle(buildProps({ clip_corner: true }));
    const css = parseBase(output);
    expect(css.get('overflow')).toBe('hidden');
  });

  it('clip_corner false → overflow: visible', () => {
    const output = lvglPropsToStyle(buildProps({ clip_corner: false }));
    const css = parseBase(output);
    expect(css.get('overflow')).toBe('visible');
  });

  it('anim_time → transition-duration in ms', () => {
    const output = lvglPropsToStyle(buildProps({ anim_time: 300 }));
    const css = parseBase(output);
    expect(css.get('transition-duration')).toBe('300ms');
  });

  it('bg_image_tiled true → background-repeat: repeat', () => {
    const output = lvglPropsToStyle(buildProps({ bg_image_tiled: true }));
    const css = parseBase(output);
    expect(css.get('background-repeat')).toBe('repeat');
  });

  it('border_side NONE → border-style: none', () => {
    const output = lvglPropsToStyle(buildProps({ border_side: 'NONE' }));
    const css = parseBase(output);
    expect(css.get('border-style')).toBe('none');
  });

  it('border_side TOP → border-style: solid', () => {
    const output = lvglPropsToStyle(buildProps({ border_side: 'TOP' }));
    const css = parseBase(output);
    expect(css.get('border-style')).toBe('solid');
  });

  it('border_width without border_side auto-injects border-style: solid', () => {
    const output = lvglPropsToStyle(buildProps({ border_width: 3, border_color: '#FF7722' }));
    const css = parseBase(output);
    expect(css.get('border-width')).toBe('3px');
    expect(css.get('border-style')).toBe('solid');
    expect(css.get('border-color')).toBe('#FF7722');
  });

  it('scrollbar_mode OFF → overflow: hidden', () => {
    const output = lvglPropsToStyle(buildProps({ scrollbar_mode: 'OFF' }));
    const css = parseBase(output);
    expect(css.get('overflow')).toBe('hidden');
  });

  it('scrollbar_mode AUTO → overflow: auto', () => {
    const output = lvglPropsToStyle(buildProps({ scrollbar_mode: 'AUTO' }));
    const css = parseBase(output);
    expect(css.get('overflow')).toBe('auto');
  });
});

// ── Phase 2: Shadow composition ──────────────────────────────────────────────

describe('shadow composition', () => {
  it('composes box-shadow from sub-properties', () => {
    const output = lvglPropsToStyle(buildProps({
      shadow_color: '#ff0000',
      shadow_width: 10,
      shadow_ofs_x: 2,
      shadow_ofs_y: 4,
      shadow_spread: 1,
    }));
    const css = parseBase(output);
    expect(css.get('box-shadow')).toBe('2px 4px 10px 1px #ff0000');
  });

  it('composes box-shadow with opacity', () => {
    const output = lvglPropsToStyle(buildProps({
      shadow_color: '#000000',
      shadow_width: 5,
      shadow_opa: 128,
    }));
    const css = parseBase(output);
    const shadow = css.get('box-shadow')!;
    expect(shadow).toMatch(/rgba\(0, 0, 0, 0\.50/);
  });

  it('defaults shadow offsets to 0 when not specified', () => {
    const output = lvglPropsToStyle(buildProps({
      shadow_color: '#333333',
      shadow_width: 8,
    }));
    const css = parseBase(output);
    expect(css.get('box-shadow')).toBe('0px 0px 8px 0px #333333');
  });

  it('no box-shadow when no shadow props present', () => {
    const output = lvglPropsToStyle(buildProps({ bg_color: '#fff' }));
    const css = parseBase(output);
    expect(css.has('box-shadow')).toBe(false);
  });
});

// ── Phase 2: Transform composition ───────────────────────────────────────────

describe('transform composition', () => {
  it('composes translateX and translateY', () => {
    const output = lvglPropsToStyle(buildProps({
      translate_x: 10,
      translate_y: 20,
    }));
    const css = parseBase(output);
    expect(css.get('transform')).toBe('translateX(10px) translateY(20px)');
  });

  it('composes rotate from transform_angle (0.1° units)', () => {
    const output = lvglPropsToStyle(buildProps({
      transform_angle: 450, // 45.0 degrees
    }));
    const css = parseBase(output);
    expect(css.get('transform')).toBe('rotate(45deg)');
  });

  it('composes scale from transform_zoom (256 = 1.0)', () => {
    const output = lvglPropsToStyle(buildProps({
      transform_zoom: 512, // 2.0x
    }));
    const css = parseBase(output);
    expect(css.get('transform')).toBe('scale(2)');
  });

  it('composes full transform chain', () => {
    const output = lvglPropsToStyle(buildProps({
      translate_x: 5,
      translate_y: -10,
      transform_angle: 900,
      transform_zoom: 256,
    }));
    const css = parseBase(output);
    expect(css.get('transform')).toBe('translateX(5px) translateY(-10px) rotate(90deg) scale(1)');
  });

  it('composes transform-origin from pivot props', () => {
    const output = lvglPropsToStyle(buildProps({
      transform_pivot_x: 50,
      transform_pivot_y: 100,
    }));
    const css = parseBase(output);
    expect(css.get('transform-origin')).toBe('50px 100px');
  });

  it('no transform when no transform props present', () => {
    const output = lvglPropsToStyle(buildProps({ bg_color: '#fff' }));
    const css = parseBase(output);
    expect(css.has('transform')).toBe(false);
  });
});

// ── Phase 2: Gradient composition ────────────────────────────────────────────

describe('gradient composition', () => {
  it('composes linear-gradient from bg_color + bg_grad_color', () => {
    const output = lvglPropsToStyle(buildProps({
      bg_color: '#ff0000',
      bg_grad_color: '#0000ff',
      bg_grad_dir: 'VER',
    }));
    const css = parseBase(output);
    // Should have replaced background-color with a gradient background
    expect(css.has('background-color')).toBe(false);
    const bg = css.get('background')!;
    expect(bg).toContain('linear-gradient(to bottom');
    expect(bg).toContain('#ff0000');
    expect(bg).toContain('#0000ff');
  });

  it('uses "to right" for horizontal gradient', () => {
    const output = lvglPropsToStyle(buildProps({
      bg_color: '#000',
      bg_grad_color: '#fff',
      bg_grad_dir: 'HOR',
    }));
    const css = parseBase(output);
    expect(css.get('background')!).toContain('to right');
  });

  it('includes stop positions', () => {
    const output = lvglPropsToStyle(buildProps({
      bg_color: '#000',
      bg_grad_color: '#fff',
      bg_grad_dir: 'VER',
      bg_main_stop: 64,     // ~25%
      bg_grad_stop: 192,    // ~75%
    }));
    const css = parseBase(output);
    const bg = css.get('background')!;
    expect(bg).toContain('25%');
    expect(bg).toContain('75%');
  });
});

// ── Phase 3: Grid layout ─────────────────────────────────────────────────────

describe('grid layout', () => {
  it('emits display: grid for grid layout type', () => {
    const output = lvglPropsToStyle(buildProps({
      layout: { type: 'grid', grid_columns: ['FR(1)', 'FR(2)'], grid_rows: [100] },
    }));
    const css = parseBase(output);
    expect(css.get('display')).toBe('grid');
  });

  it('converts grid track FR() → fr', () => {
    const output = lvglPropsToStyle(buildProps({
      layout: { type: 'grid', grid_columns: ['FR(1)', 'FR(2)', 200] },
    }));
    const css = parseBase(output);
    expect(css.get('grid-template-columns')).toBe('1fr 2fr 200px');
  });

  it('converts grid CONTENT → auto', () => {
    const output = lvglPropsToStyle(buildProps({
      layout: { type: 'grid', grid_columns: ['CONTENT', 'FR(1)'] },
    }));
    const css = parseBase(output);
    expect(css.get('grid-template-columns')).toBe('auto 1fr');
  });

  it('maps grid alignment properties', () => {
    const output = lvglPropsToStyle(buildProps({
      layout: { type: 'grid', grid_columns: ['FR(1)'], grid_column_align: 'CENTER', grid_row_align: 'STRETCH' },
    }));
    const css = parseBase(output);
    expect(css.get('justify-items')).toBe('center');
    expect(css.get('align-content')).toBe('stretch');
  });

  it('maps grid child position (0-based → 1-based)', () => {
    const output = lvglPropsToStyle(buildProps({
      grid_cell_column_pos: 0,
      grid_cell_row_pos: 2,
    }));
    const css = parseBase(output);
    expect(css.get('grid-column-start')).toBe('1');
    expect(css.get('grid-row-start')).toBe('3');
  });

  it('maps grid child span', () => {
    const output = lvglPropsToStyle(buildProps({
      grid_cell_column_span: 2,
      grid_cell_row_span: 3,
    }));
    const css = parseBase(output);
    expect(css.get('grid-column-end')).toBe('span 2');
    expect(css.get('grid-row-end')).toBe('span 3');
  });

  it('maps grid cell alignment', () => {
    const output = lvglPropsToStyle(buildProps({
      grid_cell_x_align: 'CENTER',
      grid_cell_y_align: 'STRETCH',
    }));
    const css = parseBase(output);
    expect(css.get('justify-self')).toBe('center');
    expect(css.get('align-self')).toBe('stretch');
  });
});

// ── Phase 3: Flex layout (verify existing behavior preserved) ────────────────

describe('flex layout', () => {
  it('emits display: flex for flex layout type', () => {
    const output = lvglPropsToStyle(buildProps({
      layout: { type: 'flex', flex_flow: 'ROW', flex_align_main: 'CENTER' },
    }));
    const css = parseBase(output);
    expect(css.get('display')).toBe('flex');
    expect(css.get('flex-direction')).toBe('row');
    expect(css.get('justify-content')).toBe('center');
  });

  it('handles flex-wrap', () => {
    const output = lvglPropsToStyle(buildProps({
      layout: { type: 'flex', flex_flow: 'ROW_WRAP' },
    }));
    const css = parseBase(output);
    expect(css.get('flex-wrap')).toBe('wrap');
  });

  it('handles flex track alignment', () => {
    const output = lvglPropsToStyle(buildProps({
      layout: { type: 'flex', flex_flow: 'COLUMN', flex_align_track: 'STRETCH' },
    }));
    const css = parseBase(output);
    expect(css.get('align-content')).toBe('stretch');
  });
});

// ── Phase 4: State styles ────────────────────────────────────────────────────

describe('state styles', () => {
  it('extracts pressed state styles', () => {
    const output = lvglPropsToStyle(buildProps({
      bg_color: '#ff0000',
      pressed: { bg_color: '#cc0000' },
    }));
    expect(output.states.pressed).toContain('background-color: #cc0000');
  });

  it('extracts hovered state styles', () => {
    const output = lvglPropsToStyle(buildProps({
      bg_color: '#ff0000',
      hovered: { bg_color: '#ff3333' },
    }));
    expect(output.states.hovered).toContain('background-color: #ff3333');
  });

  it('extracts multiple states', () => {
    const output = lvglPropsToStyle(buildProps({
      bg_color: '#ff0000',
      pressed: { bg_color: '#cc0000' },
      focused: { border_color: '#0000ff', border_width: 2 },
    }));
    expect(output.states.pressed).toBeDefined();
    expect(output.states.focused).toContain('border-color: #0000ff');
    expect(output.states.focused).toContain('border-width: 2px');
  });

  it('does not include state keys in base styles', () => {
    const output = lvglPropsToStyle(buildProps({
      bg_color: '#ff0000',
      pressed: { bg_color: '#cc0000' },
    }));
    expect(output.base).toContain('background-color: #ff0000');
    expect(output.base).not.toContain('#cc0000');
  });
});

// ── Phase 4: Part styles ─────────────────────────────────────────────────────

describe('part styles', () => {
  it('extracts indicator part styles', () => {
    const output = lvglPropsToStyle(buildProps({
      bg_color: '#333',
      indicator: { bg_color: '#00ff00' },
    }));
    expect(output.parts.indicator).toBeDefined();
    expect(output.parts.indicator.base).toContain('background-color: #00ff00');
  });

  it('extracts knob part styles', () => {
    const output = lvglPropsToStyle(buildProps({
      knob: { bg_color: '#ffffff', radius: 'CIRCLE' },
    }));
    expect(output.parts.knob).toBeDefined();
    expect(output.parts.knob.base).toContain('background-color: #ffffff');
    expect(output.parts.knob.base).toContain('border-radius: 9999px');
  });

  it('extracts part + state nesting (indicator.pressed)', () => {
    const output = lvglPropsToStyle(buildProps({
      indicator: {
        bg_color: '#00ff00',
        pressed: { bg_color: '#009900' },
      },
    }));
    expect(output.parts.indicator.base).toContain('background-color: #00ff00');
    expect(output.parts.indicator.states.pressed).toContain('background-color: #009900');
  });

  it('does not include part keys in base styles', () => {
    const output = lvglPropsToStyle(buildProps({
      bg_color: '#333',
      indicator: { bg_color: '#00ff00' },
    }));
    expect(output.base).not.toContain('#00ff00');
  });
});

// ── Existing behavior preservation ───────────────────────────────────────────

describe('existing mappings preserved', () => {
  it('maps basic colors', () => {
    const output = lvglPropsToStyle(buildProps({
      bg_color: '#1a1a2e',
      text_color: '#ffffff',
    }));
    const css = parseBase(output);
    expect(css.get('background-color')).toBe('#1a1a2e');
    expect(css.get('color')).toBe('#ffffff');
  });

  it('maps padding', () => {
    const output = lvglPropsToStyle(buildProps({
      pad_top: 8,
      pad_left: 16,
      pad_all: 12,
    }));
    const css = parseBase(output);
    expect(css.get('padding-top')).toBe('8px');
    expect(css.get('padding-left')).toBe('16px');
    expect(css.get('padding')).toBe('12px');
  });

  it('maps dimensions with percentage strings', () => {
    const output = lvglPropsToStyle(buildProps({
      width: '50%',
      height: 200,
    }));
    const css = parseBase(output);
    expect(css.get('width')).toBe('50%');
    expect(css.get('height')).toBe('200px');
  });

  it('maps position with absolute positioning', () => {
    const output = lvglPropsToStyle(buildProps({
      x: 10,
      y: 20,
    }));
    const css = parseBase(output);
    expect(css.get('position')).toBe('absolute');
    expect(css.get('left')).toBe('10px');
    expect(css.get('top')).toBe('20px');
  });

  it('maps text alignment', () => {
    const output = lvglPropsToStyle(buildProps({ text_align: 'CENTER' }));
    const css = parseBase(output);
    expect(css.get('text-align')).toBe('center');
  });

  it('maps gap properties', () => {
    const output = lvglPropsToStyle(buildProps({ pad_row: 8, pad_column: 16 }));
    const css = parseBase(output);
    expect(css.get('row-gap')).toBe('8px');
    expect(css.get('column-gap')).toBe('16px');
  });

  it('maps integer colors (0xRRGGBB)', () => {
    const output = lvglPropsToStyle(buildProps({ bg_color: 0x2196f3 }));
    const css = parseBase(output);
    expect(css.get('background-color')).toBe('#2196f3');
  });

  it('maps 0x-string colors from serializer (0xRRGGBB)', () => {
    const output = lvglPropsToStyle(buildProps({ bg_color: '0xFF7722' }));
    const css = parseBase(output);
    expect(css.get('background-color')).toBe('#FF7722');
  });
});

// ── lvglColorToCss ───────────────────────────────────────────────────────────

describe('lvglColorToCss', () => {
  it('converts integer to hex', () => {
    expect(lvglColorToCss(0xff0000)).toBe('#ff0000');
  });

  it('passes through hex strings', () => {
    expect(lvglColorToCss('#abcdef')).toBe('#abcdef');
  });

  it('converts 0x-prefixed strings from serializer', () => {
    expect(lvglColorToCss('0xFF7722')).toBe('#FF7722');
  });

  it('converts 0X-prefixed strings (uppercase)', () => {
    expect(lvglColorToCss('0XAABBCC')).toBe('#AABBCC');
  });

  it('pads short 0x strings', () => {
    expect(lvglColorToCss('0x000')).toBe('#000000');
  });

  it('returns undefined for invalid values', () => {
    expect(lvglColorToCss('red')).toBeUndefined();
    expect(lvglColorToCss(undefined)).toBeUndefined();
  });
});

// ── Widget alignment ─────────────────────────────────────────────────────────

describe('widget alignment', () => {
  it('maps align CENTER to place-self: center', () => {
    const output = lvglPropsToStyle(buildProps({ align: 'CENTER' }));
    const css = parseBase(output);
    expect(css.get('place-self')).toBe('center');
  });

  it('maps align TOP_LEFT to place-self: start start', () => {
    const output = lvglPropsToStyle(buildProps({ align: 'TOP_LEFT' }));
    const css = parseBase(output);
    expect(css.get('place-self')).toBe('start start');
  });

  it('maps align BOTTOM_RIGHT to place-self: end end', () => {
    const output = lvglPropsToStyle(buildProps({ align: 'BOTTOM_RIGHT' }));
    const css = parseBase(output);
    expect(css.get('place-self')).toBe('end end');
  });
});

// ── StyleOutput structure ────────────────────────────────────────────────────

describe('StyleOutput structure', () => {
  it('returns correct shape with no states or parts', () => {
    const output = lvglPropsToStyle(buildProps({ bg_color: '#fff' }));
    expect(output).toHaveProperty('base');
    expect(output).toHaveProperty('states');
    expect(output).toHaveProperty('parts');
    expect(typeof output.base).toBe('string');
    expect(typeof output.states).toBe('object');
    expect(typeof output.parts).toBe('object');
    expect(Object.keys(output.states)).toHaveLength(0);
    expect(Object.keys(output.parts)).toHaveLength(0);
  });

  it('returns empty base for no props', () => {
    const output = lvglPropsToStyle({});
    expect(output.base).toBe('');
  });
});
