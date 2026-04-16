import React from 'react';
import type { WidgetProps } from './helpers';
import { getNodeStyles, collectAllStateCss, getPropString } from './helpers';
import { StyleInjector } from './StyleInjector';
import { LvglWidget } from './index';

export function ButtonWidget({ node, onAction }: WidgetProps) {
  const styles = getNodeStyles(node.props, node.id);
  const allCss = collectAllStateCss(styles);
  const handleClick = () => {
    const actionProp = node.props.on_press ?? node.props.on_click;
    if (actionProp?.kind === 'action') {
      actionProp.handler();
    }
    onAction?.(node.id, 'press');
  };

  return (
    <button className="lvgl-button" style={styles.base} data-node-id={node.id} onClick={handleClick}>
      <StyleInjector cssText={allCss} />
      {node.children.length > 0
        ? node.children.map((child) => (
            <LvglWidget key={child.id} node={child} onAction={onAction} />
          ))
        : getPropString(node.props.text)}
    </button>
  );
}
