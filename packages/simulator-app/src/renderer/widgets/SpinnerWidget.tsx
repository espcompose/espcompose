import React from 'react';
import type { WidgetProps } from './helpers';
import { getNodeStyles, collectAllStateCss } from './helpers';
import { StyleInjector } from './StyleInjector';

export function SpinnerWidget({ node }: WidgetProps) {
  const styles = getNodeStyles(node.props, node.id);
  const allCss = collectAllStateCss(styles);
  return (
    <div className="lvgl-spinner" style={styles.base} data-node-id={node.id}>
      <StyleInjector cssText={allCss} />
    </div>
  );
}
