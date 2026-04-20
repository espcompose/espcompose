import React from 'react';
import type { WidgetProps } from './helpers';
import { getNodeStyles, collectAllStateCss, getPropValue } from './helpers';
import { StyleInjector } from './StyleInjector';

/**
 * Spinner widget — CSS border-based rotating arc.
 *
 * LVGL spinner parts:
 *   main      → background ring (track)
 *   indicator → spinning arc (foreground)
 *
 * Arc style props are mapped to CSS custom properties (--arc-color,
 * --arc-width, --arc-opa) by lvgl-styles.ts.  This widget reads them
 * from the resolved base & indicator part styles and composes the
 * border-based spinner appearance.
 */
export function SpinnerWidget({ node }: WidgetProps) {
  const styles = getNodeStyles(node.props, node.id);
  const allCss = collectAllStateCss(styles);

  const indicatorPart = styles.parts.indicator;

  // Read arc custom properties from resolved styles
  const indicatorArcColor = indicatorPart?.base?.['--arc-color' as keyof React.CSSProperties] as string | undefined;
  const indicatorArcWidth = indicatorPart?.base?.['--arc-width' as keyof React.CSSProperties] as string | undefined;
  const baseArcOpa = styles.base?.['--arc-opa' as keyof React.CSSProperties] as string | undefined;
  const baseArcWidth = styles.base?.['--arc-width' as keyof React.CSSProperties] as string | undefined;

  // Read spin_time prop (arrives as e.g. "1000ms" or number in ms)
  const spinTimeRaw = getPropValue(node.props.spin_time);
  let animationDuration: string | undefined;
  if (typeof spinTimeRaw === 'string') {
    animationDuration = spinTimeRaw;
  } else if (typeof spinTimeRaw === 'number') {
    animationDuration = `${spinTimeRaw}ms`;
  }

  // Compose spinner border styles from arc properties.
  // IMPORTANT: borderColor (shorthand) must be set BEFORE borderTopColor
  // (longhand) so that React applies them in insertion order and the
  // longhand wins for the top border.
  const spinnerStyle: React.CSSProperties = { ...styles.base };

  // Arc width from indicator or base → border-width
  const arcWidth = indicatorArcWidth ?? baseArcWidth;
  if (arcWidth) {
    spinnerStyle.borderWidth = arcWidth;
  }

  // Base arc_opa: transparent means hide the background ring
  if (baseArcOpa === '0') {
    spinnerStyle.borderColor = 'transparent';
  }

  // Indicator arc_color → spinning arc color (border-top-color).
  // Must be inserted AFTER borderColor so the longhand overrides the shorthand.
  if (indicatorArcColor) {
    spinnerStyle.borderTopColor = indicatorArcColor;
  }

  // Override animation duration from spin_time prop
  if (animationDuration) {
    spinnerStyle.animationDuration = animationDuration;
  }

  return (
    <div className="lvgl-spinner" style={spinnerStyle} data-node-id={node.id}>
      <StyleInjector cssText={allCss} />
    </div>
  );
}
