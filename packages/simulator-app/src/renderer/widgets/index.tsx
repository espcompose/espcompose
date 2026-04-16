import React from 'react';
import type { RuntimeNode } from '../../runtime';
import type { WidgetProps } from './helpers';

// Import all widgets
import { PageWidget } from './PageWidget';
import { LabelWidget } from './LabelWidget';
import { ButtonWidget } from './ButtonWidget';
import { SliderWidget } from './SliderWidget';
import { SwitchWidget } from './SwitchWidget';
import { BarWidget } from './BarWidget';
import { ArcWidget } from './ArcWidget';
import { ImageWidget } from './ImageWidget';
import { DropdownWidget } from './DropdownWidget';
import { SpinnerWidget } from './SpinnerWidget';
import { TextareaWidget } from './TextareaWidget';
import { CheckboxWidget } from './CheckboxWidget';
import { ObjWidget } from './ObjWidget';
import { EcCanvasWidget } from './EcCanvasWidget';

// Re-export helpers and types for convenience
export * from './helpers';
export { StyleInjector } from './StyleInjector';

// Re-export all widgets
export { PageWidget } from './PageWidget';
export { LabelWidget } from './LabelWidget';
export { ButtonWidget } from './ButtonWidget';
export { SliderWidget } from './SliderWidget';
export { SwitchWidget } from './SwitchWidget';
export { BarWidget } from './BarWidget';
export { ArcWidget } from './ArcWidget';
export { ImageWidget } from './ImageWidget';
export { DropdownWidget } from './DropdownWidget';
export { SpinnerWidget } from './SpinnerWidget';
export { TextareaWidget } from './TextareaWidget';
export { CheckboxWidget } from './CheckboxWidget';
export { ObjWidget } from './ObjWidget';
export { EcCanvasWidget } from './EcCanvasWidget';

// ── Widget type → renderer map ───────────────────────────────────────────────

export const WIDGET_MAP: Record<string, React.FC<WidgetProps>> = {
  page: PageWidget,
  label: LabelWidget,
  button: ButtonWidget,
  slider: SliderWidget,
  switch: SwitchWidget,
  bar: BarWidget,
  arc: ArcWidget,
  image: ImageWidget,
  dropdown: DropdownWidget,
  spinner: SpinnerWidget,
  textarea: TextareaWidget,
  checkbox: CheckboxWidget,
  obj: ObjWidget,
  ec_canvas: EcCanvasWidget,
};

// ── Main component ───────────────────────────────────────────────────────────

interface LvglWidgetProps {
  node: RuntimeNode;
  onAction?: (nodeId: string, event: string) => void;
}

/**
 * Recursive React component that renders a RuntimeNode as an LVGL widget.
 *
 * Widget type is mapped to a specific renderer. Unknown types fall back
 * to the `obj` renderer (generic container).
 */
export function LvglWidget({ node, onAction }: LvglWidgetProps) {
  const Renderer = WIDGET_MAP[node.type] ?? WIDGET_MAP.obj;
  return <Renderer node={node} onAction={onAction} />;
}
