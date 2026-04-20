import React, { useRef, useState, useEffect } from 'react';
import type { WidgetProps } from './helpers';
import { getNodeStyles, collectAllStateCss, getPropValue } from './helpers';
import { StyleInjector } from './StyleInjector';

/**
 * Convert a React CSSProperties object to a CSS declaration string.
 */
function cssPropsToString(props: React.CSSProperties): string {
  return Object.entries(props)
    .map(([key, value]) => {
      const kebab = key.startsWith('--')
        ? key
        : key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
      return `${kebab}: ${value}`;
    })
    .join('; ');
}

export function SliderWidget({ node, onAction }: WidgetProps) {
  const styles = getNodeStyles(node.props, node.id);
  const allCss = collectAllStateCss(styles);
  const rawPropValue = Number(getPropValue(node.props.value) ?? 0);
  const propValue = Number.isFinite(rawPropValue) ? rawPropValue : 0;
  const min = Number(getPropValue(node.props.min_value) ?? 0);
  const max = Number(getPropValue(node.props.max_value) ?? 100);

  // Local state allows the slider to move immediately (optimistic update).
  // Syncs back when the reactive prop updates from the server round-trip.
  const [localValue, setLocalValue] = useState(propValue);
  useEffect(() => { setLocalValue(propValue); }, [propValue]);

  const trackRef = useRef<HTMLDivElement>(null);

  const clamp = (v: number) => Math.max(min, Math.min(max, v));
  const pct = max > min ? Math.max(0, Math.min(100, ((clamp(localValue) - min) / (max - min)) * 100)) : 0;

  const valueFromPointer = (clientX: number): number => {
    const track = trackRef.current;
    if (!track) return localValue;
    const rect = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return clamp(Math.round(min + ratio * (max - min)));
  };

  const commit = (newValue: number) => {
    setLocalValue(newValue);
    const actionProp = node.props.on_value ?? node.props.on_release;
    if (actionProp?.kind === 'action') {
      actionProp.handler(newValue);
    }
    onAction?.(node.id, 'value_changed');
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    commit(valueFromPointer(e.clientX));
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.buttons === 0) return;
    setLocalValue(valueFromPointer(e.clientX));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    commit(valueFromPointer(e.clientX));
  };

  // Part styles — inject base via CSS so state rules can override,
  // but keep dynamic positioning (width%, left%) as inline style.
  const indicatorPart = styles.parts.indicator;
  const knobPart = styles.parts.knob;

  let partBaseCss = '';
  if (indicatorPart?.base && Object.keys(indicatorPart.base).length > 0) {
    partBaseCss += `[data-node-id="${node.id}"] .lvgl-part-indicator { ${cssPropsToString(indicatorPart.base)} }\n`;
  }
  if (knobPart?.base && Object.keys(knobPart.base).length > 0) {
    partBaseCss += `[data-node-id="${node.id}"] .lvgl-part-knob { ${cssPropsToString(knobPart.base)} }\n`;
  }
  const combinedCss = [partBaseCss, allCss].filter(Boolean).join('\n');

  // LVGL uses padding on the main slider part to inset the indicator within
  // the widget bounds, and padding on the knob part to extend the knob
  // beyond the track.  Strip the LVGL padding from the CSS inline style
  // and compute track / knob dimensions manually.
  //
  // The widget bounding box is the widget height as authored — matching
  // LVGL semantics where the slider main part fills the widget bounds and
  // a knob with positive padding overflows those bounds (the surrounding
  // layout will *not* reserve extra space for the overflow).  The
  // simulator must reproduce that overflow rather than silently expand.
  const widgetH = parseFloat(String(styles.base.height ?? 10)) || 10;
  const padTop = parseFloat(String(styles.base.paddingTop ?? 0)) || 0;
  const padBottom = parseFloat(String(styles.base.paddingBottom ?? 0)) || 0;
  const padAll = parseFloat(String(styles.base.padding ?? 0)) || 0;
  const effectivePadTop = padTop || padAll;
  const effectivePadBottom = padBottom || padAll;
  const trackH = Math.max(1, widgetH - effectivePadTop - effectivePadBottom);

  const knobPad = parseFloat(String(knobPart?.base?.padding ?? 0)) || 0;
  const knobSize = trackH + knobPad * 2;

  // Strip LVGL padding and background from the outer container — the
  // track element gets the background, and padding is handled via layout.
  const {
    paddingTop: _pt,
    paddingBottom: _pb,
    paddingLeft: _pl,
    paddingRight: _pr,
    padding: _p,
    backgroundColor: trackBg,
    ...outerStyle
  } = styles.base as Record<string, unknown>;

  // Use CSS calc: left ranges from 0 to (100% - knobSize), keeping
  // the knob fully within the track's horizontal bounds.
  const knobLeft = `calc(${pct}% - ${(pct / 100) * knobSize}px)`;

  // LVGL draws the indicator from the left edge to the knob center.
  // At pct=0 the formula would still yield knobSize/2 px, so clamp to 0.
  const indicatorWidth = pct <= 0
    ? '0px'
    : `calc(${pct}% - ${(pct / 100) * knobSize}px + ${knobSize / 2}px)`;

  return (
    <div
      ref={trackRef}
      className="lvgl-slider"
      style={{ ...(outerStyle as React.CSSProperties), height: widgetH }}
      data-node-id={node.id}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <StyleInjector cssText={combinedCss} />
      <div
        className="lvgl-slider-track"
        style={{ height: trackH, backgroundColor: trackBg as string }}
      />
      <div
        className="lvgl-slider-indicator lvgl-part-indicator"
        style={{ width: indicatorWidth, height: trackH }}
      />
      <div
        className="lvgl-slider-knob lvgl-part-knob"
        style={{ left: knobLeft, width: knobSize, height: knobSize }}
      />
    </div>
  );
}
