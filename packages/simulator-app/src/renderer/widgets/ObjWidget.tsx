import React from 'react';
import type { WidgetProps } from './helpers';
import { getNodeStyles, collectAllStateCss } from './helpers';
import { StyleInjector } from './StyleInjector';
import { LvglWidget } from './index';

export function ObjWidget({ node, onAction }: WidgetProps) {
  const styles = getNodeStyles(node.props, node.id);
  const allCss = collectAllStateCss(styles);
  return (
    <div className="lvgl-obj" style={styles.base} data-node-id={node.id}>
      <StyleInjector cssText={allCss} />
      {node.children.map((child) => (
        <LvglWidget key={child.id} node={child} onAction={onAction} />
      ))}
    </div>
  );
}
