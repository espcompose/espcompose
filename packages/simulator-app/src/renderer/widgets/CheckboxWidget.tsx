import React, { useState, useEffect } from 'react';
import type { WidgetProps } from './helpers';
import { getNodeStyles, collectAllStateCss, getPropString, getPropValue } from './helpers';
import { StyleInjector } from './StyleInjector';

export function CheckboxWidget({ node, onAction }: WidgetProps) {
  const styles = getNodeStyles(node.props, node.id);
  const allCss = collectAllStateCss(styles);
  const text = getPropString(node.props.text);
  const propChecked = Boolean(getPropValue(node.props.checked) ?? false);

  const [localChecked, setLocalChecked] = useState(propChecked);
  useEffect(() => { setLocalChecked(propChecked); }, [propChecked]);

  const handleChange = () => {
    const newValue = !localChecked;
    setLocalChecked(newValue);
    const actionProp = node.props.on_state;
    if (actionProp?.kind === 'action') {
      actionProp.handler(newValue);
    }
    onAction?.(node.id, 'value_changed');
  };

  return (
    <label className="lvgl-checkbox" style={styles.base} data-node-id={node.id}>
      <StyleInjector cssText={allCss} />
      <input
        type="checkbox"
        checked={localChecked}
        onChange={handleChange}
      />
      {text}
    </label>
  );
}
