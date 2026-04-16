import React, { useState, useEffect } from 'react';
import type { WidgetProps } from './helpers';
import { getNodeStyles, collectAllStateCss, getPropString, getPropValue } from './helpers';
import { StyleInjector } from './StyleInjector';

export function DropdownWidget({ node, onAction }: WidgetProps) {
  const styles = getNodeStyles(node.props, node.id);
  const allCss = collectAllStateCss(styles);
  const options = getPropString(node.props.options);
  const items = options ? options.split('\n') : [];
  const propSelected = Number(getPropValue(node.props.selected) ?? 0);

  const [localSelected, setLocalSelected] = useState(propSelected);
  useEffect(() => { setLocalSelected(propSelected); }, [propSelected]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = Number(e.target.value);
    setLocalSelected(newValue);
    const actionProp = node.props.on_value;
    if (actionProp?.kind === 'action') {
      actionProp.handler(newValue);
    }
    onAction?.(node.id, 'value_changed');
  };

  return (
    <>
      <StyleInjector cssText={allCss} />
      <select className="lvgl-dropdown" style={styles.base} data-node-id={node.id} value={localSelected} onChange={handleChange}>
        {items.map((item, i) => (
          <option key={i} value={i}>{item}</option>
        ))}
      </select>
    </>
  );
}
