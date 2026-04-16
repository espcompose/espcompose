import React, { useState, useEffect } from 'react';
import type { WidgetProps } from './helpers';
import { getNodeStyles, collectAllStateCss, getPropString } from './helpers';
import { StyleInjector } from './StyleInjector';

export function TextareaWidget({ node, onAction }: WidgetProps) {
  const styles = getNodeStyles(node.props, node.id);
  const allCss = collectAllStateCss(styles);
  const propText = getPropString(node.props.text);
  const placeholder = getPropString(node.props.placeholder);

  const [localText, setLocalText] = useState(propText);
  useEffect(() => { setLocalText(propText); }, [propText]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalText(e.target.value);
    onAction?.(node.id, 'text_changed');
  };

  return (
    <>
      <StyleInjector cssText={allCss} />
      <textarea
        className="lvgl-textarea"
        style={styles.base}
        data-node-id={node.id}
        value={localText}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </>
  );
}
