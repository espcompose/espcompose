import React from 'react';
import type { WidgetProps } from './helpers';
import { getNodeStyles, collectAllStateCss, getPropString } from './helpers';
import { StyleInjector } from './StyleInjector';

export function LabelWidget({ node }: WidgetProps) {
  const text = getPropString(node.props.text);
  const styles = getNodeStyles(node.props, node.id);
  const allCss = collectAllStateCss(styles);
  return (
    <span className="lvgl-label" style={styles.base} data-node-id={node.id}>
      <StyleInjector cssText={allCss} />
      {text}
    </span>
  );
}
