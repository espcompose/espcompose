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
//   <ec-rect />  — rectangle / rounded rectangle
//   <ec-line />  — line segment
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
    }
  }
}
