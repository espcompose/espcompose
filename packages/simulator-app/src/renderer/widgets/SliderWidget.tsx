import React, { useRef, useState, useEffect } from 'react';
import type { WidgetProps } from './helpers';
import { getNodeStyles, collectAllStateCss, getPropValue } from './helpers';
import { StyleInjector } from './StyleInjector';

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

  // Part styles for indicator and knob
  const indicatorPart = styles.parts.indicator;
  const knobPart = styles.parts.knob;
  const indicatorStyle: React.CSSProperties = { width: `${pct}%`, ...indicatorPart?.base };
  const knobStyle: React.CSSProperties = { left: `${pct}%`, ...knobPart?.base };

  return (
    <div
      ref={trackRef}
      className="lvgl-slider"
      style={styles.base}
      data-node-id={node.id}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <StyleInjector cssText={allCss} />
      <div className="lvgl-slider-indicator lvgl-part-indicator" style={indicatorStyle} />
      <div className="lvgl-slider-knob lvgl-part-knob" style={knobStyle} />
    </div>
  );
}
