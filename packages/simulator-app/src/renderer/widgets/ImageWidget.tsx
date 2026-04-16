import React from 'react';
import type { WidgetProps } from './helpers';
import { getNodeStyles, collectAllStateCss, getPropString } from './helpers';
import { StyleInjector } from './StyleInjector';

export function ImageWidget({ node }: WidgetProps) {
  const styles = getNodeStyles(node.props, node.id);
  const allCss = collectAllStateCss(styles);
  const src = getPropString(node.props.src);
  return (
    <div className="lvgl-image" style={styles.base} data-node-id={node.id}>
      <StyleInjector cssText={allCss} />
      {src ? <img src={src} alt="" /> : '🖼'}
    </div>
  );
}
