import { describe, it, expect } from 'vitest';
import { expandCssProps, expandCssStyle } from './style-mapping';
import { mergeStyles } from './theme/create-styles';
import type { CssStyle } from './style-types';

// ────────────────────────────────────────────────────────────────────────────
// expandCssProps — single-level CSS → LVGL mapping
// ────────────────────────────────────────────────────────────────────────────

describe('expandCssProps', () => {
  it('maps CSS-like names to LVGL camelCase', () => {
    const result = expandCssProps({
      backgroundColor: '#FF0000',
      color: '#FFFFFF',
      borderRadius: 8,
    });
    expect(result).toEqual({
      bgColor: '#FF0000',
      textColor: '#FFFFFF',
      radius: 8,
    });
  });

  it('maps CSS-compatible names that match LVGL names (identity mapping)', () => {
    const result = expandCssProps({
      borderColor: '#000',
      borderWidth: 2,
      shadowColor: '#333',
      shadowWidth: 5,
      shadowSpread: 3,
      outlineColor: '#FFF',
      outlineWidth: 1,
      translateX: 10,
      translateY: 20,
    });
    expect(result).toEqual({
      borderColor: '#000',
      borderWidth: 2,
      shadowColor: '#333',
      shadowWidth: 5,
      shadowSpread: 3,
      outlineColor: '#FFF',
      outlineWidth: 1,
      translateX: 10,
      translateY: 20,
    });
  });

  it('expands paddingHorizontal shorthand', () => {
    const result = expandCssProps({ paddingHorizontal: 16 });
    expect(result).toEqual({
      padLeft: 16,
      padRight: 16,
    });
  });

  it('expands paddingVertical shorthand', () => {
    const result = expandCssProps({ paddingVertical: 8 });
    expect(result).toEqual({
      padTop: 8,
      padBottom: 8,
    });
  });

  it('expands gap shorthand to padRow + padColumn in layout block', () => {
    const result = expandCssProps({ gap: 12 });
    expect(result.layout).toEqual({
      padRow: 12,
      padColumn: 12,
    });
  });

  it('specific props override shorthand expansions', () => {
    const result = expandCssProps({
      paddingHorizontal: 16,
      paddingLeft: 4, // specific overrides shorthand
    });
    expect(result).toEqual({
      padLeft: 4,
      padRight: 16,
    });
  });

  it('maps padding to padAll', () => {
    const result = expandCssProps({ padding: 10 });
    expect(result).toEqual({ padAll: 10 });
  });

  it('maps opacity to opa', () => {
    const result = expandCssProps({ opacity: 'opaque' });
    expect(result).toEqual({ opa: 'COVER' });
  });

  it('maps shadow CSS aliases', () => {
    const result = expandCssProps({
      shadowOffsetX: 2,
      shadowOffsetY: 4,
      shadowWidth: 10,
      shadowColor: '#000000',
    });
    expect(result).toEqual({
      shadowOfsX: 2,
      shadowOfsY: 4,
      shadowWidth: 10,
      shadowColor: '#000000',
    });
  });

  it('maps text CSS aliases', () => {
    const result = expandCssProps({
      letterSpacing: 2,
      lineHeight: 20,
    });
    expect(result).toEqual({
      textLetterSpace: 2,
      textLineSpace: 20,
    });
  });

  it('maps position aliases (left/top)', () => {
    const result = expandCssProps({ left: 10, top: 20 });
    expect(result).toEqual({ x: 10, y: 20 });
  });

  it('maps font alias', () => {
    const fontRef = { toString: () => 'r_font_abc' };
    const result = expandCssProps({ font: fontRef });
    expect(result).toEqual({ textFont: fontRef });
  });

  it('maps textDecoration alias', () => {
    const result = expandCssProps({ textDecoration: 'underline' });
    expect(result).toEqual({ textDecor: 'UNDERLINE' });
  });

  it('maps opacity aliases', () => {
    const result = expandCssProps({
      backgroundOpacity: 'opaque',
      textOpacity: 'transparent',
      borderOpacity: 'opaque',
      outlineOpacity: 'transparent',
      shadowOpacity: 'opaque',
    });
    expect(result).toEqual({
      bgOpa: 'COVER',
      textOpa: 'TRANSP',
      borderOpa: 'COVER',
      outlineOpa: 'TRANSP',
      shadowOpa: 'COVER',
    });
  });

  it('maps backgroundImage aliases', () => {
    const imgRef = { toString: () => 'r_img_abc' };
    const result = expandCssProps({
      backgroundImage: imgRef,
      backgroundImageOpacity: '50%',
    });
    expect(result).toEqual({
      bgImageSrc: imgRef,
      bgImageOpa: '50%',
    });
  });

  it('skips undefined values', () => {
    const result = expandCssProps({
      backgroundColor: '#FF0000',
      color: undefined,
    });
    expect(result).toEqual({ bgColor: '#FF0000' });
  });

  it('throws on unknown properties', () => {
    expect(() => expandCssProps({ unknownProp: 42 })).toThrow(
      'Unknown style property "unknownProp"',
    );
  });

  it('throws a helpful suggestion for common CSS properties', () => {
    expect(() => expandCssProps({ fontSize: 14 })).toThrow(
      '"fontSize" is not supported in LVGL styles. Use "font"',
    );
    expect(() => expandCssProps({ fontFamily: 'Arial' })).toThrow(
      '"fontFamily" is not supported in LVGL styles. Use "font"',
    );
    expect(() => expandCssProps({ margin: 10 })).toThrow(
      '"margin" is not supported in LVGL styles.',
    );
  });

  it('ignores state and part keys (handled by deep expander)', () => {
    const result = expandCssProps({
      backgroundColor: '#FF0000',
      pressed: { backgroundColor: '#CC0000' },
      indicator: { backgroundColor: '#00FF00' },
    });
    // Only base prop should be in result — state/part keys are skipped
    expect(result).toEqual({ bgColor: '#FF0000' });
  });

  it('preserves opaque objects (reactive nodes) as-is', () => {
    const reactiveNode = { __brand: 'IRReactiveNode', value: 42 };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = expandCssProps({ backgroundColor: reactiveNode as any });
    expect(result.bgColor).toBe(reactiveNode);
  });

  // ── Transform-kind mappings ────────────────────────────────────────────

  it('maps overflow to clipCorner boolean', () => {
    expect(expandCssProps({ overflow: 'hidden' })).toEqual({ clipCorner: true });
    expect(expandCssProps({ overflow: 'visible' })).toEqual({ clipCorner: false });
  });

  it('maps strokeLinecap to lineRounded boolean', () => {
    expect(expandCssProps({ strokeLinecap: 'round' })).toEqual({ lineRounded: true });
    expect(expandCssProps({ strokeLinecap: 'flat' })).toEqual({ lineRounded: false });
  });

  it('maps arcLinecap to arcRounded boolean', () => {
    expect(expandCssProps({ arcLinecap: 'round' })).toEqual({ arcRounded: true });
    expect(expandCssProps({ arcLinecap: 'flat' })).toEqual({ arcRounded: false });
  });

  it('maps backgroundRepeat to bgImageTiled boolean', () => {
    expect(expandCssProps({ backgroundRepeat: 'repeat' })).toEqual({ bgImageTiled: true });
    expect(expandCssProps({ backgroundRepeat: 'no-repeat' })).toEqual({ bgImageTiled: false });
  });

  it('maps borderDrawOrder to borderPost boolean', () => {
    expect(expandCssProps({ borderDrawOrder: 'after-children' })).toEqual({ borderPost: true });
    expect(expandCssProps({ borderDrawOrder: 'before-children' })).toEqual({ borderPost: false });
  });

  it('maps textAlign CSS values to LVGL CAPS', () => {
    expect(expandCssProps({ textAlign: 'center' })).toEqual({ textAlign: 'CENTER' });
    expect(expandCssProps({ textAlign: 'left' })).toEqual({ textAlign: 'LEFT' });
    expect(expandCssProps({ textAlign: 'right' })).toEqual({ textAlign: 'RIGHT' });
    expect(expandCssProps({ textAlign: 'auto' })).toEqual({ textAlign: 'AUTO' });
  });

  it('maps textDecoration CSS values to LVGL CAPS', () => {
    expect(expandCssProps({ textDecoration: 'none' })).toEqual({ textDecor: 'NONE' });
    expect(expandCssProps({ textDecoration: 'underline' })).toEqual({ textDecor: 'UNDERLINE' });
    expect(expandCssProps({ textDecoration: 'strikethrough' })).toEqual({ textDecor: 'STRIKETHROUGH' });
  });

  it('maps borderRadius circle to CAPS', () => {
    expect(expandCssProps({ borderRadius: 'circle' })).toEqual({ radius: 'CIRCLE' });
    // Numeric values pass through unchanged
    expect(expandCssProps({ borderRadius: 10 })).toEqual({ radius: 10 });
  });

  it('maps borderSides CSS values to LVGL CAPS', () => {
    expect(expandCssProps({ borderSides: 'top' })).toEqual({ borderSide: 'TOP' });
    expect(expandCssProps({ borderSides: 'bottom' })).toEqual({ borderSide: 'BOTTOM' });
    expect(expandCssProps({ borderSides: 'none' })).toEqual({ borderSide: 'NONE' });
    expect(expandCssProps({ borderSides: 'internal' })).toEqual({ borderSide: 'INTERNAL' });
  });

  it('maps gradient direction to LVGL abbreviations', () => {
    expect(expandCssProps({ backgroundGradientDirection: 'horizontal' })).toEqual({ bgGradDir: 'HOR' });
    expect(expandCssProps({ backgroundGradientDirection: 'vertical' })).toEqual({ bgGradDir: 'VER' });
    expect(expandCssProps({ backgroundGradientDirection: 'none' })).toEqual({ bgGradDir: 'NONE' });
  });

  it('maps dither mode to LVGL CAPS', () => {
    expect(expandCssProps({ backgroundGradientDither: 'ordered' })).toEqual({ bgDitherMode: 'ORDERED' });
    expect(expandCssProps({ backgroundGradientDither: 'error-diffusion' })).toEqual({ bgDitherMode: 'ERR_DIFF' });
    expect(expandCssProps({ backgroundGradientDither: 'none' })).toEqual({ bgDitherMode: 'NONE' });
  });

  it('maps fit-content to SIZE_CONTENT', () => {
    expect(expandCssProps({ width: 'fit-content' })).toEqual({ width: 'SIZE_CONTENT' });
    expect(expandCssProps({ height: 'fit-content' })).toEqual({ height: 'SIZE_CONTENT' });
    // Numeric values pass through unchanged
    expect(expandCssProps({ width: 200 })).toEqual({ width: 200 });
  });

  it('maps opacity named values to LVGL CAPS', () => {
    expect(expandCssProps({ opacity: 'transparent' })).toEqual({ opa: 'TRANSP' });
    expect(expandCssProps({ opacity: 'opaque' })).toEqual({ opa: 'COVER' });
    // Percentage strings pass through unchanged
    expect(expandCssProps({ opacity: '50%' })).toEqual({ opa: '50%' });
  });

  it('passes through unknown transform values unchanged', () => {
    const reactiveNode = { __brand: 'IRReactiveNode' };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = expandCssProps({ overflow: reactiveNode as any });
    expect(result.clipCorner).toBe(reactiveNode);
  });

  it('throws on invalid string values for transform props', () => {
    expect(() => expandCssProps({ opacity: 'COVER' })).toThrow(
      'Invalid value "COVER" for style property "opacity". Expected one of: transparent, opaque',
    );
    expect(() => expandCssProps({ textAlign: 'CENTER' })).toThrow(
      'Invalid value "CENTER" for style property "textAlign". Expected one of: left, center, right, auto',
    );
    expect(() => expandCssProps({ width: 'SIZE_CONTENT' })).toThrow(
      'Invalid value "SIZE_CONTENT" for style property "width". Expected one of: fit-content',
    );
  });

  // ── Direct rename mappings (newly enabled) ─────────────────────────────

  it('maps arc CSS aliases', () => {
    const result = expandCssProps({
      arcColor: '#FF0000',
      arcOpacity: 'opaque',
      arcStrokeWidth: 3,
    });
    expect(result).toEqual({
      arcColor: '#FF0000',
      arcOpa: 'COVER',
      arcWidth: 3,
    });
  });

  it('maps stroke/line CSS aliases', () => {
    const result = expandCssProps({
      strokeWidth: 2,
      strokeDashWidth: 4,
      strokeDashGap: 3,
      strokeColor: '#000',
    });
    expect(result).toEqual({
      lineWidth: 2,
      lineDashWidth: 4,
      lineDashGap: 3,
      lineColor: '#000',
    });
  });

  it('maps gradient CSS aliases with background prefix', () => {
    const result = expandCssProps({
      backgroundGradientColor: '#00FF00',
      backgroundGradientStop: 128,
      backgroundGradientStartStop: 0,
    });
    expect(result).toEqual({
      bgGradColor: '#00FF00',
      bgGradStop: 128,
      bgMainStop: 0,
    });
  });

  it('maps transform CSS aliases', () => {
    const result = expandCssProps({
      rotate: 45,
      scale: 256,
      transformScaleY: 128,
      transformOriginX: 50,
      transformOriginY: 50,
    });
    expect(result).toEqual({
      transformAngle: 45,
      transformZoom: 256,
      transformHeight: 128,
      transformPivotX: 50,
      transformPivotY: 50,
    });
  });

  it('maps remaining direct aliases', () => {
    const result = expandCssProps({
      animationDuration: 300,
      colorFilterOpacity: 'opaque',
      imageTint: '#FF0000',
      imageTintOpacity: '50%',
      opacityLayered: 'opaque',
      outlineOffset: 4,
      backgroundImageTint: '#00FF00',
      backgroundImageTintOpacity: 'transparent',
      borderSides: 'top',
    });
    expect(result).toEqual({
      animTime: 300,
      colorFilterOpa: 'COVER',
      imageRecolor: '#FF0000',
      imageRecolorOpa: '50%',
      opaLayered: 'COVER',
      outlinePad: 4,
      bgImageRecolor: '#00FF00',
      bgImageRecolorOpa: 'TRANSP',
      borderSide: 'TOP',
    });
  });
});

// ────────────────────────────────────────────────────────────────────────────
// expandCssStyle — deep expansion with state/part nesting
// ────────────────────────────────────────────────────────────────────────────

describe('expandCssStyle', () => {
  it('expands base props and state sub-objects', () => {
    const result = expandCssStyle({
      backgroundColor: '#FF0000',
      pressed: {
        backgroundColor: '#CC0000',
        opacity: 'opaque',
      },
    });
    expect(result).toEqual({
      bgColor: '#FF0000',
      pressed: {
        bgColor: '#CC0000',
        opa: 'COVER',
      },
    });
  });

  it('expands part sub-objects recursively', () => {
    const result = expandCssStyle({
      backgroundColor: '#333',
      indicator: {
        backgroundColor: '#00FF00',
        pressed: {
          backgroundColor: '#00CC00',
        },
      },
    });
    expect(result).toEqual({
      bgColor: '#333',
      indicator: {
        bgColor: '#00FF00',
        pressed: {
          bgColor: '#00CC00',
        },
      },
    });
  });

  it('expands shorthands inside nested state objects', () => {
    const result = expandCssStyle({
      padding: 10,
      pressed: {
        paddingHorizontal: 4,
      },
    });
    expect(result).toEqual({
      padAll: 10,
      pressed: {
        padLeft: 4,
        padRight: 4,
      },
    });
  });

  it('preserves styles reference', () => {
    const result = expandCssStyle({
      backgroundColor: '#FFF',
      styles: ['my-style-id'],
    });
    expect(result).toEqual({
      bgColor: '#FFF',
      styles: ['my-style-id'],
    });
  });

  it('handles multiple states', () => {
    const result = expandCssStyle({
      backgroundColor: '#FFF',
      pressed: { backgroundColor: '#EEE' },
      focused: { borderColor: '#00F' },
      disabled: { opacity: 'transparent' },
    });
    expect(result).toEqual({
      bgColor: '#FFF',
      pressed: { bgColor: '#EEE' },
      focused: { borderColor: '#00F' },
      disabled: { opa: 'TRANSP' },
    });
  });
});

// ────────────────────────────────────────────────────────────────────────────
// mergeStyles — multi-style merging with last-wins
// ────────────────────────────────────────────────────────────────────────────

describe('mergeStyles', () => {
  it('merges direct properties with last-wins', () => {
    const result = mergeStyles(
      { backgroundColor: '#AAA' } as CssStyle,
      { backgroundColor: '#BBB' } as CssStyle,
    );
    expect(result.backgroundColor).toBe('#BBB');
  });

  it('combines non-overlapping properties', () => {
    const result = mergeStyles(
      { backgroundColor: '#AAA' } as CssStyle,
      { padding: 10 } as CssStyle,
    );
    expect(result).toEqual({
      backgroundColor: '#AAA',
      padding: 10,
    });
  });

  it('deep-merges state sub-objects', () => {
    const result = mergeStyles(
      {
        pressed: { backgroundColor: '#AAA', padding: 4 },
      } as CssStyle,
      {
        pressed: { backgroundColor: '#BBB', opacity: 'opaque' },
      } as CssStyle,
    );
    expect(result.pressed).toEqual({
      backgroundColor: '#BBB',
      padding: 4,
      opacity: 'opaque',
    });
  });

  it('deep-merges part sub-objects with states', () => {
    const result = mergeStyles(
      {
        indicator: {
          backgroundColor: '#AAA',
          pressed: { opacity: 'opaque' },
        },
      } as CssStyle,
      {
        indicator: {
          backgroundColor: '#BBB',
          pressed: { backgroundColor: '#CCC' },
        },
      } as CssStyle,
    );
    expect(result.indicator).toEqual({
      backgroundColor: '#BBB',
      pressed: { opacity: 'opaque', backgroundColor: '#CCC' },
    });
  });

  it('skips undefined and falsy entries', () => {
    const result = mergeStyles(
      { backgroundColor: '#AAA' } as CssStyle,
      undefined,
      null,
      false,
      { padding: 10 } as CssStyle,
    );
    expect(result).toEqual({
      backgroundColor: '#AAA',
      padding: 10,
    });
  });

  it('returns empty object for no inputs', () => {
    const result = mergeStyles();
    expect(result).toEqual({});
  });

  it('handles single style', () => {
    const s: CssStyle = { backgroundColor: '#AAA', padding: 10 };
    const result = mergeStyles(s);
    expect(result).toEqual({ backgroundColor: '#AAA', padding: 10 });
  });
});

// ────────────────────────────────────────────────────────────────────────────
// Layout property expansion
// ────────────────────────────────────────────────────────────────────────────

describe('expandCssProps — layout', () => {
  // ── Flex ──────────────────────────────────────────────────────────────

  it('expands flex layout into a layout block', () => {
    const result = expandCssProps({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'spaceBetween',
      alignItems: 'center',
    });
    expect(result.layout).toEqual({
      type: 'flex',
      flexFlow: 'COLUMN',
      flexAlignMain: 'SPACE_BETWEEN',
      flexAlignCross: 'CENTER',
    });
  });

  it('keeps visual props separate from layout block', () => {
    const result = expandCssProps({
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#FFF',
      gap: 12,
    });
    expect(result.layout).toEqual({ type: 'flex', flexFlow: 'ROW', padRow: 12, padColumn: 12 });
    expect(result.bgColor).toBe('#FFF');
  });

  it('maps all flex direction values', () => {
    expect(expandCssProps({ flexDirection: 'row' }).layout).toEqual({ type: 'flex', flexFlow: 'ROW' });
    expect(expandCssProps({ flexDirection: 'column' }).layout).toEqual({ type: 'flex', flexFlow: 'COLUMN' });
    expect(expandCssProps({ flexDirection: 'row-wrap' }).layout).toEqual({ type: 'flex', flexFlow: 'ROW_WRAP' });
    expect(expandCssProps({ flexDirection: 'column-wrap' }).layout).toEqual({ type: 'flex', flexFlow: 'COLUMN_WRAP' });
  });

  it('maps all justifyContent values', () => {
    const cases = [
      ['start', 'START'], ['center', 'CENTER'], ['end', 'END'],
      ['spaceBetween', 'SPACE_BETWEEN'], ['spaceAround', 'SPACE_AROUND'], ['spaceEvenly', 'SPACE_EVENLY'],
    ] as const;
    for (const [css, lvgl] of cases) {
      expect(expandCssProps({ justifyContent: css }).layout).toEqual({ type: 'flex', flexAlignMain: lvgl });
    }
  });

  it('maps all alignItems values', () => {
    const cases = [['start', 'START'], ['center', 'CENTER'], ['end', 'END'], ['stretch', 'STRETCH']] as const;
    for (const [css, lvgl] of cases) {
      expect(expandCssProps({ alignItems: css }).layout).toEqual({ type: 'flex', flexAlignCross: lvgl });
    }
  });

  it('flexGrow is a flat prop (not in layout block)', () => {
    const result = expandCssProps({ flexGrow: 2 });
    expect(result.flexGrow).toBe(2);
    expect(result.layout).toBeUndefined();
  });

  // ── Grid ─────────────────────────────────────────────────────────────

  it('expands grid layout into a layout block', () => {
    const result = expandCssProps({
      display: 'grid',
      gridTemplateColumns: ['fr(1)', 'fr(2)', 200],
      gridTemplateRows: ['fr(1)', 100, 'content'],
      justifyItems: 'center',
      alignContent: 'stretch',
    });
    expect(result.layout).toEqual({
      type: 'grid',
      gridColumns: ['FR(1)', 'FR(2)', 200],
      gridRows: ['FR(1)', 100, 'CONTENT'],
      gridColumnAlign: 'CENTER',
      gridRowAlign: 'STRETCH',
    });
  });

  it('passes through LVGL-format grid track values', () => {
    const result = expandCssProps({
      gridTemplateColumns: ['FR(1)', 'SIZE_CONTENT'],
    });
    expect((result.layout as Record<string, unknown>)).toEqual({ type: 'grid', gridColumns: ['FR(1)', 'SIZE_CONTENT'] });
  });

  it('grid child props are flat (not in layout block)', () => {
    const result = expandCssProps({
      gridColumn: 0,
      gridRow: 1,
      gridColumnSpan: 2,
      gridRowSpan: 3,
      justifySelf: 'center',
      alignSelf: 'end',
    });
    expect(result.gridCellColumnPos).toBe(0);
    expect(result.gridCellRowPos).toBe(1);
    expect(result.gridCellColumnSpan).toBe(2);
    expect(result.gridCellRowSpan).toBe(3);
    expect(result.gridCellXAlign).toBe('CENTER');
    expect(result.gridCellYAlign).toBe('END');
    expect(result.layout).toBeUndefined();
  });

  // ── Widget placement ─────────────────────────────────────────────────

  it('maps placeSelf to align', () => {
    expect(expandCssProps({ placeSelf: 'center' })).toEqual({ align: 'CENTER' });
    expect(expandCssProps({ placeSelf: 'topLeft' })).toEqual({ align: 'TOP_LEFT' });
    expect(expandCssProps({ placeSelf: 'bottomCenter' })).toEqual({ align: 'BOTTOM_MID' });
    expect(expandCssProps({ placeSelf: 'rightCenter' })).toEqual({ align: 'RIGHT_MID' });
  });

  // ── Scrollbar ────────────────────────────────────────────────────────

  it('maps scrollbarMode', () => {
    expect(expandCssProps({ scrollbarMode: 'off' })).toEqual({ scrollbarMode: 'OFF' });
    expect(expandCssProps({ scrollbarMode: 'active' })).toEqual({ scrollbarMode: 'ACTIVE' });
  });

  // ── No layout block when no layout props ──────────────────────────────

  it('does not create layout block for non-layout props', () => {
    const result = expandCssProps({ backgroundColor: '#FFF', padding: 8 });
    expect(result.layout).toBeUndefined();
  });
});
