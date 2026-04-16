import React from 'react';
import type { WidgetProps } from './helpers';
import { getNodeStyles, collectAllStateCss, getPropValue } from './helpers';
import { StyleInjector } from './StyleInjector';

export function ArcWidget({ node }: WidgetProps) {
  const styles = getNodeStyles(node.props, node.id);
  const allCss = collectAllStateCss(styles);
  const value = getPropValue(node.props.value);
  return (
    <div className="lvgl-arc" style={styles.base} data-node-id={node.id}>
      <StyleInjector cssText={allCss} />
      {value != null ? String(value) : ''}
    </div>
  );
}
