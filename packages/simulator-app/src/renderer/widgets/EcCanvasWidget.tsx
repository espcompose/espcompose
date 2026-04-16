import React from 'react';
import type { RuntimeProp } from '../../runtime';
import type { WidgetProps } from './helpers';
import { getNodeStyles, collectAllStateCss, getPropValue } from './helpers';
import { StyleInjector } from './StyleInjector';
import { LvglWidget } from './index';

// ── ec-canvas paint helpers ──────────────────────────────────────────────────

type PaintPropMap = Record<string, RuntimeProp>;

/** Resolve a paint primitive prop to its current display value. */
function paintVal(props: PaintPropMap, key: string): unknown {
  const p = props[key];
  if (!p) return undefined;
  if (p.kind === 'static') return p.value;
  if (p.kind === 'reactive') return p.evaluate();
  return undefined;
}

function paintStr(props: PaintPropMap, key: string, fallback = ''): string {
  const v = paintVal(props, key);
  return v != null ? String(v) : fallback;
}

function paintNum(props: PaintPropMap, key: string, fallback = 0): number {
  const v = paintVal(props, key);
  return typeof v === 'number' ? v : fallback;
}

/** Convert a paint fill/stroke color value (0xRRGGBB or '#rrggbb') to a CSS color string. */
function paintColor(props: PaintPropMap, key: string): string | undefined {
  const v = paintVal(props, key);
  if (v == null) return undefined;
  if (typeof v === 'number') {
    return `#${v.toString(16).padStart(6, '0')}`;
  }
  const s = String(v);
  // The serializer converts '#rrggbb' → '0xrrggbb' for ESPHome YAML;
  // convert back to CSS hex format for the browser.
  if (s.startsWith('0x')) {
    return `#${s.slice(2).padStart(6, '0')}`;
  }
  return s;
}

/** Render a single paint primitive as an SVG element. */
function renderPaintPrimitive(prim: PaintPropMap, index: number): React.ReactNode {
  const type = paintStr(prim, 'type');

  switch (type) {
    case 'rect': {
      const x = paintNum(prim, 'x');
      const y = paintNum(prim, 'y');
      const w = paintNum(prim, 'width');
      const h = paintNum(prim, 'height');
      const r = paintNum(prim, 'radius');
      const fill = paintColor(prim, 'fill') ?? 'transparent';
      const stroke = paintColor(prim, 'stroke');
      const strokeWidth = paintNum(prim, 'stroke_width', 0);
      const opacity = paintVal(prim, 'opacity');
      return (
        <rect
          key={index}
          x={x} y={y} width={w} height={h}
          rx={r} ry={r}
          fill={fill}
          stroke={stroke ?? 'none'}
          strokeWidth={strokeWidth}
          opacity={opacity != null ? Number(opacity) : undefined}
        />
      );
    }
    case 'line': {
      const x1 = paintNum(prim, 'x1');
      const y1 = paintNum(prim, 'y1');
      const x2 = paintNum(prim, 'x2');
      const y2 = paintNum(prim, 'y2');
      const stroke = paintColor(prim, 'stroke') ?? '#000';
      const strokeWidth = paintNum(prim, 'stroke_width', 1);
      const opacity = paintVal(prim, 'opacity');
      return (
        <line
          key={index}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={stroke}
          strokeWidth={strokeWidth}
          opacity={opacity != null ? Number(opacity) : undefined}
        />
      );
    }
    default:
      return null;
  }
}

/** Render a paint scene (background or overlay) as an SVG overlay. */
function PaintScene({ scene, zIndex }: { scene: PaintPropMap[]; zIndex: number }) {
  if (scene.length === 0) return null;
  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex,
        pointerEvents: 'none',
      }}
    >
      {scene.map((prim, i) => renderPaintPrimitive(prim, i))}
    </svg>
  );
}

export function EcCanvasWidget({ node, onAction }: WidgetProps) {
  const styles = getNodeStyles(node.props, node.id);
  const allCss = collectAllStateCss(styles);
  const canvasStyle: React.CSSProperties = {
    ...styles.base,
    position: 'relative',
  };

  const bgScene = getPropValue(node.props.background_scene) as PaintPropMap[] | undefined;
  const ovScene = getPropValue(node.props.overlay_scene) as PaintPropMap[] | undefined;

  return (
    <div className="ec-canvas" style={canvasStyle} data-node-id={node.id}>
      <StyleInjector cssText={allCss} />
      {bgScene && bgScene.length > 0 && <PaintScene scene={bgScene} zIndex={0} />}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {node.children.map((child) => (
          <LvglWidget key={child.id} node={child} onAction={onAction} />
        ))}
      </div>
      {ovScene && ovScene.length > 0 && <PaintScene scene={ovScene} zIndex={2} />}
    </div>
  );
}
