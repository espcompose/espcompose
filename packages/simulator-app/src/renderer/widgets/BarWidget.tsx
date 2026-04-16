import React from 'react';
import type { WidgetProps } from './helpers';
import { getNodeStyles, collectAllStateCss, getPropValue } from './helpers';
import { StyleInjector } from './StyleInjector';

export function BarWidget({ node }: WidgetProps) {
  const styles = getNodeStyles(node.props, node.id);
  const allCss = collectAllStateCss(styles);
  const value = Number(getPropValue(node.props.value) ?? 0);
  const max = Number(getPropValue(node.props.max) ?? 100);
  const indicatorPart = styles.parts.indicator;

  // Use a div-based bar when indicator part styles are present for CSS control
  if (indicatorPart && Object.keys(indicatorPart.base).length > 0) {
    const pct = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
    return (
      <div className="lvgl-bar" style={styles.base} data-node-id={node.id}>
        <StyleInjector cssText={allCss} />
        <div
          className="lvgl-bar-indicator lvgl-part-indicator"
          style={{ width: `${pct}%`, height: '100%', ...indicatorPart.base }}
        />
      </div>
    );
  }

  return (
    <>
      <StyleInjector cssText={allCss} />
      <progress
        className="lvgl-bar"
        style={styles.base}
        data-node-id={node.id}
        value={value}
        max={max}
      />
    </>
  );
}
