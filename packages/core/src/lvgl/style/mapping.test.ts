import { describe, it, expect } from 'vitest';
import { expandCssProps, expandCssStyle } from './mapping';

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
    expect(result).toEqual({ opa: 'opaque' });
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
    expect(result).toEqual({ textDecor: 'underline' });
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
      bgOpa: 'opaque',
      textOpa: 'transparent',
      borderOpa: 'opaque',
      outlineOpa: 'transparent',
      shadowOpa: 'opaque',
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

  it('maps textAlign CSS values (semantic identity)', () => {
    expect(expandCssProps({ textAlign: 'center' })).toEqual({ textAlign: 'center' });
    expect(expandCssProps({ textAlign: 'left' })).toEqual({ textAlign: 'left' });
    expect(expandCssProps({ textAlign: 'right' })).toEqual({ textAlign: 'right' });
    expect(expandCssProps({ textAlign: 'auto' })).toEqual({ textAlign: 'auto' });
  });

  it('maps textDecoration CSS values (semantic identity)', () => {
    expect(expandCssProps({ textDecoration: 'none' })).toEqual({ textDecor: 'none' });
    expect(expandCssProps({ textDecoration: 'underline' })).toEqual({ textDecor: 'underline' });
    expect(expandCssProps({ textDecoration: 'strikethrough' })).toEqual({ textDecor: 'strikethrough' });
  });

  it('maps borderRadius circle (semantic identity)', () => {
    expect(expandCssProps({ borderRadius: 'circle' })).toEqual({ radius: 'circle' });
    // Numeric values pass through unchanged
    expect(expandCssProps({ borderRadius: 10 })).toEqual({ radius: 10 });
  });

  it('maps borderSides CSS values (semantic identity)', () => {
    expect(expandCssProps({ borderSides: 'top' })).toEqual({ borderSide: 'top' });
    expect(expandCssProps({ borderSides: 'bottom' })).toEqual({ borderSide: 'bottom' });
    expect(expandCssProps({ borderSides: 'none' })).toEqual({ borderSide: 'none' });
    expect(expandCssProps({ borderSides: 'internal' })).toEqual({ borderSide: 'internal' });
  });

  it('maps gradient direction (semantic identity)', () => {
    expect(expandCssProps({ backgroundGradientDirection: 'horizontal' })).toEqual({ bgGradDir: 'horizontal' });
    expect(expandCssProps({ backgroundGradientDirection: 'vertical' })).toEqual({ bgGradDir: 'vertical' });
    expect(expandCssProps({ backgroundGradientDirection: 'none' })).toEqual({ bgGradDir: 'none' });
  });

  it('maps dither mode (semantic identity)', () => {
    expect(expandCssProps({ backgroundGradientDither: 'ordered' })).toEqual({ bgDitherMode: 'ordered' });
    expect(expandCssProps({ backgroundGradientDither: 'error-diffusion' })).toEqual({ bgDitherMode: 'error-diffusion' });
    expect(expandCssProps({ backgroundGradientDither: 'none' })).toEqual({ bgDitherMode: 'none' });
  });

  it('maps fit-content size (semantic identity)', () => {
    expect(expandCssProps({ width: 'fit-content' })).toEqual({ width: 'fit-content' });
    expect(expandCssProps({ height: 'fit-content' })).toEqual({ height: 'fit-content' });
    // Numeric values pass through unchanged
    expect(expandCssProps({ width: 200 })).toEqual({ width: 200 });
  });

  it('maps opacity named values (semantic identity)', () => {
    expect(expandCssProps({ opacity: 'transparent' })).toEqual({ opa: 'transparent' });
    expect(expandCssProps({ opacity: 'opaque' })).toEqual({ opa: 'opaque' });
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
      arcOpa: 'opaque',
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
      colorFilterOpa: 'opaque',
      imageRecolor: '#FF0000',
      imageRecolorOpa: '50%',
      opaLayered: 'opaque',
      outlinePad: 4,
      bgImageRecolor: '#00FF00',
      bgImageRecolorOpa: 'transparent',
      borderSide: 'top',
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
        opa: 'opaque',
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
      disabled: { opa: 'transparent' },
    });
  });

  it('passes through transition descriptors at root level', () => {
    const result = expandCssStyle({
      backgroundColor: '#FFF',
      transition: { properties: ['backgroundColor'], duration: 200 },
    });
    expect(result).toEqual({
      bgColor: '#FFF',
      transition: { properties: ['backgroundColor'], duration: 200 },
    });
  });

  it('passes through transition descriptors inside state sub-objects', () => {
    const result = expandCssStyle({
      pressed: {
        backgroundColor: '#EEE',
        transition: [
          { properties: ['backgroundColor'], duration: '300ms', easing: 'ease-out' },
        ],
      },
    });
    expect(result).toEqual({
      pressed: {
        bgColor: '#EEE',
        transition: [
          { properties: ['backgroundColor'], duration: '300ms', easing: 'ease-out' },
        ],
      },
    });
  });

  it('does not include transition in visual prop expansion', () => {
    const result = expandCssStyle({
      transition: { properties: ['opacity'], duration: 200 },
    });
    // transition should be the only key — no LVGL prop created from it
    expect(Object.keys(result).filter(k => k !== 'transition')).toEqual([]);
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
      flexFlow: 'column',
      flexAlignMain: 'spaceBetween',
      flexAlignCross: 'center',
    });
  });

  it('keeps visual props separate from layout block', () => {
    const result = expandCssProps({
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#FFF',
      gap: 12,
    });
    expect(result.layout).toEqual({ type: 'flex', flexFlow: 'row', padRow: 12, padColumn: 12 });
    expect(result.bgColor).toBe('#FFF');
  });

  it('maps all flex direction values (semantic identity)', () => {
    expect(expandCssProps({ flexDirection: 'row' }).layout).toEqual({ type: 'flex', flexFlow: 'row' });
    expect(expandCssProps({ flexDirection: 'column' }).layout).toEqual({ type: 'flex', flexFlow: 'column' });
    expect(expandCssProps({ flexDirection: 'row-wrap' }).layout).toEqual({ type: 'flex', flexFlow: 'row-wrap' });
    expect(expandCssProps({ flexDirection: 'column-wrap' }).layout).toEqual({ type: 'flex', flexFlow: 'column-wrap' });
  });

  it('maps all justifyContent values (semantic identity)', () => {
    const cases = [
      ['start'], ['center'], ['end'],
      ['spaceBetween'], ['spaceAround'], ['spaceEvenly'],
    ] as const;
    for (const [css] of cases) {
      expect(expandCssProps({ justifyContent: css }).layout).toEqual({ type: 'flex', flexAlignMain: css });
    }
  });

  it('maps all alignItems values (semantic identity)', () => {
    const cases = [['start'], ['center'], ['end'], ['stretch']] as const;
    for (const [css] of cases) {
      expect(expandCssProps({ alignItems: css }).layout).toEqual({ type: 'flex', flexAlignCross: css });
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
      gridColumns: ['fr(1)', 'fr(2)', 200],
      gridRows: ['fr(1)', 100, 'content'],
      gridColumnAlign: 'center',
      gridRowAlign: 'stretch',
    });
  });

  it('normalizes grid track casing to semantic lowercase (target translates)', () => {
    const result = expandCssProps({
      display: 'grid',
      gridTemplateColumns: ['FR(1)', 'CONTENT'],
    });
    expect((result.layout as Record<string, unknown>)).toEqual({ type: 'grid', gridColumns: ['fr(1)', 'content'] });
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
    expect(result.gridCellXAlign).toBe('center');
    expect(result.gridCellYAlign).toBe('end');
    expect(result.layout).toBeUndefined();
  });

  // ── Widget placement ─────────────────────────────────────────────────

  it('maps placeSelf to align (semantic identity)', () => {
    expect(expandCssProps({ placeSelf: 'center' })).toEqual({ align: 'center' });
    expect(expandCssProps({ placeSelf: 'topLeft' })).toEqual({ align: 'topLeft' });
    expect(expandCssProps({ placeSelf: 'bottomCenter' })).toEqual({ align: 'bottomCenter' });
    expect(expandCssProps({ placeSelf: 'rightCenter' })).toEqual({ align: 'rightCenter' });
  });

  // ── Scrollbar ────────────────────────────────────────────────────────

  it('maps scrollbarMode (semantic identity)', () => {
    expect(expandCssProps({ scrollbarMode: 'off' })).toEqual({ scrollbarMode: 'off' });
    expect(expandCssProps({ scrollbarMode: 'active' })).toEqual({ scrollbarMode: 'active' });
  });

  // ── No layout block when no layout props ──────────────────────────────

  it('does not create layout block for non-layout props', () => {
    const result = expandCssProps({ backgroundColor: '#FFF', padding: 8 });
    expect(result.layout).toBeUndefined();
  });
});
