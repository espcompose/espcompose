import React, { useState, useEffect } from 'react';
import type { WidgetProps } from './helpers';
import { getNodeStyles, collectAllStateCss, getPropValue } from './helpers';
import { StyleInjector } from './StyleInjector';

/**
 * Convert a React CSSProperties object to a CSS declaration string.
 * Used to inject part base styles via <style> rather than inline style,
 * so that state CSS rules (e.g. [data-checked]) can override them.
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

export function SwitchWidget({ node, onAction }: WidgetProps) {
  const styles = getNodeStyles(node.props, node.id);
  const allCss = collectAllStateCss(styles);
  const propChecked = Boolean(getPropValue(node.props.checked) ?? false);

  // Local state for optimistic toggle — syncs back from reactive prop.
  const [localChecked, setLocalChecked] = useState(propChecked);
  useEffect(() => { setLocalChecked(propChecked); }, [propChecked]);

  const handleClick = () => {
    const newValue = !localChecked;
    setLocalChecked(newValue);
    const actionProp = node.props.on_state;
    if (actionProp?.kind === 'action') {
      actionProp.handler(newValue);
    }
    onAction?.(node.id, 'value_changed');
  };

  // Part styles for indicator and knob — inject via CSS so that
  // state rules (checked, pressed, …) can override base properties.
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

  // Compute dimensions — mirrors SliderWidget layout logic.
  //
  // The widget bounding box is widget height as authored.  LVGL padding
  // on the main part insets the track; knob padding extends the knob
  // outward (positive) or contracts it (negative).
  const widgetH = parseFloat(String(styles.base.height ?? 22)) || 22;
  const widgetW = parseFloat(String(styles.base.width ?? 50)) || 50;
  const padTop = parseFloat(String(styles.base.paddingTop ?? 0)) || 0;
  const padBottom = parseFloat(String(styles.base.paddingBottom ?? 0)) || 0;
  const padAll = parseFloat(String(styles.base.padding ?? 0)) || 0;
  const effectivePadTop = padTop || padAll;
  const effectivePadBottom = padBottom || padAll;
  const trackH = Math.max(1, widgetH - effectivePadTop - effectivePadBottom);

  const knobPad = parseFloat(String(knobPart?.base?.padding ?? 0)) || 0;
  const knobSize = trackH + knobPad * 2;

  // Strip padding and backgroundColor from the outer container — the
  // track element gets the background, padding is handled via layout.
  const {
    paddingTop: _pt,
    paddingBottom: _pb,
    paddingLeft: _pl,
    paddingRight: _pr,
    padding: _p,
    backgroundColor: trackBg,
    ...outerStyle
  } = styles.base as Record<string, unknown>;

  // Switch is binary: knob is fully left (off) or fully right (on).
  // Uses the same calc formula as SliderWidget with pct = 0 or 100.
  const pct = localChecked ? 100 : 0;
  const knobLeft = `calc(${pct}% - ${(pct / 100) * knobSize}px)`;

  return (
    <div
      className="lvgl-switch"
      style={{ ...(outerStyle as React.CSSProperties), width: widgetW, height: widgetH }}
      data-node-id={node.id}
      {...(localChecked ? { 'data-checked': '' } : {})}
      onClick={handleClick}
    >
      <StyleInjector cssText={combinedCss} />
      <div
        className="lvgl-switch-track"
        style={{ height: trackH, backgroundColor: trackBg as string }}
      />
      <div
        className="lvgl-switch-indicator lvgl-part-indicator"
        style={{ height: trackH }}
      />
      <div
        className="lvgl-switch-knob lvgl-part-knob"
        style={{ left: knobLeft, width: knobSize, height: knobSize }}
      />
    </div>
  );
}
