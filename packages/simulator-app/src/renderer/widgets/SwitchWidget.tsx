import React, { useState, useEffect } from 'react';
import type { WidgetProps } from './helpers';
import { getNodeStyles, collectAllStateCss, getPropValue } from './helpers';
import { StyleInjector } from './StyleInjector';

export function SwitchWidget({ node, onAction }: WidgetProps) {
  const styles = getNodeStyles(node.props, node.id);
  const allCss = collectAllStateCss(styles);
  const propChecked = Boolean(getPropValue(node.props.checked) ?? false);

  // Local state for optimistic toggle — syncs back from reactive prop.
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

  // Part styles for indicator (track) and knob
  const indicatorPart = styles.parts.indicator;
  const knobPart = styles.parts.knob;

  return (
    <label className="lvgl-switch" style={styles.base} data-node-id={node.id}>
      <StyleInjector cssText={allCss} />
      <input
        type="checkbox"
        checked={localChecked}
        onChange={handleChange}
      />
      <span className="lvgl-switch-track lvgl-part-indicator" style={indicatorPart?.base} />
      {knobPart && <span className="lvgl-switch-knob lvgl-part-knob" style={knobPart.base} />}
    </label>
  );
}
