// ────────────────────────────────────────────────────────────────────────────
// ec-canvas — Composited rendering host
//
// Hand-authored intrinsic element types for the ec-canvas component and its
// associated paint primitives. These are platform-level primitives (not
// design-system components) that provide composited rendering: a layoutable
// host container with declarative drawing below and above real child widgets.
//
// Zone children:
//   <ec-canvas-background> — paint primitives drawn below widget content
//   <ec-canvas-content>    — real child widgets, laid out by the host
//   <ec-canvas-overlay>    — paint primitives drawn above widget content
//
// Paint primitives:
//   <ec-rect />    — rectangle / rounded rectangle
//   <ec-line />    — line segment
//   <ec-arc />     — circular arc / ring segment
//   <ec-polygon /> — multi-point filled polygon
//   <ec-text />    — pixel-positioned text
//   <ec-image />   — image with transforms
// ────────────────────────────────────────────────────────────────────────────

import type { EspComposeElement, TriggerHandler, Reactive, ComponentProps } from './types';
import type { CssStyleProps } from './style-types';

// ── Paint primitive prop types ─────────────────────────────────────────────

export interface EcRectProps {
  /** Horizontal position (px). */
  x?: Reactive<number>;
  /** Vertical position (px). */
  y?: Reactive<number>;
  /** Width (px). */
  width?: Reactive<number>;
  /** Height (px). */
  height?: Reactive<number>;
  /** Corner radius (px). */
  radius?: Reactive<number>;
  /** Fill color (hex string, e.g. '#1a1a2e'). */
  fill?: Reactive<string>;
  /** Stroke color (hex string). */
  stroke?: Reactive<string>;
  /** Stroke width (px). */
  strokeWidth?: Reactive<number>;
  /** Opacity (0–255 or 0.0–1.0). */
  opacity?: Reactive<number>;
}

export interface EcLineProps {
  /** Start X (px). */
  x1?: Reactive<number>;
  /** Start Y (px). */
  y1?: Reactive<number>;
  /** End X (px). */
  x2?: Reactive<number>;
  /** End Y (px). */
  y2?: Reactive<number>;
  /** Stroke color (hex string). */
  stroke?: Reactive<string>;
  /** Stroke width (px). */
  strokeWidth?: Reactive<number>;
  /** Opacity (0–255 or 0.0–1.0). */
  opacity?: Reactive<number>;
}

export interface EcArcProps {
  /** Center X (px). */
  cx?: Reactive<number>;
  /** Center Y (px). */
  cy?: Reactive<number>;
  /** Arc radius (px). */
  radius?: Reactive<number>;
  /** Start angle (degrees, 0 = 3 o'clock, clockwise). */
  startAngle?: Reactive<number>;
  /** End angle (degrees, 0 = 3 o'clock, clockwise). */
  endAngle?: Reactive<number>;
  /** Stroke color (hex string). */
  stroke?: Reactive<string>;
  /** Stroke width (px). */
  strokeWidth?: Reactive<number>;
  /** Round the arc endpoints. */
  rounded?: Reactive<boolean>;
  /** Opacity (0–255 or 0.0–1.0). */
  opacity?: Reactive<number>;
}

export interface EcPolygonProps {
  /** Ordered list of polygon vertices. */
  points?: Array<{ x: number; y: number }>;
  /** Fill color (hex string). */
  fill?: Reactive<string>;
  /** Border color (hex string). */
  stroke?: Reactive<string>;
  /** Border width (px). */
  strokeWidth?: Reactive<number>;
  /** Corner radius (px). */
  radius?: Reactive<number>;
  /** Opacity (0–255 or 0.0–1.0). */
  opacity?: Reactive<number>;
}

export interface EcTextProps {
  /** Horizontal position (px). */
  x?: Reactive<number>;
  /** Vertical position (px). */
  y?: Reactive<number>;
  /** Text content. */
  text?: Reactive<string>;
  /** Font reference (e.g. from useFont()). */
  font?: Reactive<string>;
  /** Text color (hex string). */
  fill?: Reactive<string>;
  /** Maximum text width before wrapping (px). */
  maxWidth?: Reactive<number>;
  /** Text alignment ('left' | 'center' | 'right'). */
  textAlign?: Reactive<string>;
  /** Letter spacing (px). */
  letterSpacing?: Reactive<number>;
  /** Line spacing (px). */
  lineSpacing?: Reactive<number>;
  /** Opacity (0–255 or 0.0–1.0). */
  opacity?: Reactive<number>;
}

export interface EcImageProps {
  /** Horizontal position (px). */
  x?: Reactive<number>;
  /** Vertical position (px). */
  y?: Reactive<number>;
  /** Image source (e.g. from useImage()). */
  src?: Reactive<string>;
  /** Rotation angle (degrees × 10, e.g. 900 = 90°). */
  rotation?: Reactive<number>;
  /** Uniform scale factor (256 = 1×). */
  scale?: Reactive<number>;
  /** Horizontal scale factor (256 = 1×). */
  scaleX?: Reactive<number>;
  /** Vertical scale factor (256 = 1×). */
  scaleY?: Reactive<number>;
  /** Horizontal skew (degrees × 10). */
  skewX?: Reactive<number>;
  /** Vertical skew (degrees × 10). */
  skewY?: Reactive<number>;
  /** Transform origin X (px). */
  pivotX?: Reactive<number>;
  /** Transform origin Y (px). */
  pivotY?: Reactive<number>;
  /** Opacity (0–255 or 0.0–1.0). */
  opacity?: Reactive<number>;
}

// ── Zone prop types ────────────────────────────────────────────────────────

export interface EcCanvasBackgroundProps {
  children?: EspComposeElement | EspComposeElement[];
}

export interface EcCanvasContentProps {
  children?: EspComposeElement | EspComposeElement[];
}

export interface EcCanvasOverlayProps {
  children?: EspComposeElement | EspComposeElement[];
}

// ── Canvas host prop type ──────────────────────────────────────────────────

export interface EcCanvasProps {
  /** CSS-like style for the host container (layout, sizing, borders, etc.). */
  style?: CssStyleProps;
  /** Trigger when the canvas host is pressed. */
  onPress?: TriggerHandler;
  /** Trigger when the canvas host is released. */
  onRelease?: TriggerHandler;
  /** Trigger when the canvas host is clicked. */
  onClick?: TriggerHandler;
  /** Trigger when the canvas host is long-pressed. */
  onLongPress?: TriggerHandler;
  children?: EspComposeElement | EspComposeElement[];
}

// ── JSX IntrinsicElements augmentation ─────────────────────────────────────

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'ec-canvas': EcCanvasProps & ComponentProps;
      'ec-canvas-background': EcCanvasBackgroundProps;
      'ec-canvas-content': EcCanvasContentProps;
      'ec-canvas-overlay': EcCanvasOverlayProps;
      'ec-rect': EcRectProps;
      'ec-line': EcLineProps;
      'ec-arc': EcArcProps;
      'ec-polygon': EcPolygonProps;
      'ec-text': EcTextProps;
      'ec-image': EcImageProps;
    }
  }
}
