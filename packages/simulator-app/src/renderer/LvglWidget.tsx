import React, { useRef, useState, useEffect } from 'react';
import type { RuntimeNode, RuntimeProp } from '../runtime';
import { lvglPropsToStyle } from '../runtime';

// ── Style helpers ────────────────────────────────────────────────────────────

/**
 * Convert the CSS string from `lvglPropsToStyle` to a React-compatible
 * style object. `lvglPropsToStyle` returns a semicolon-delimited string
 * (e.g. "background-color: #fff; padding: 8px") designed for HTML's
 * `style="..."` attribute. React needs `{ backgroundColor: '#fff', padding: '8px' }`.
 */
function cssStringToStyle(css: string): React.CSSProperties {
  if (!css) return {};
  const style: Record<string, string> = {};
  for (const part of css.split(';')) {
    const colon = part.indexOf(':');
    if (colon < 0) continue;
    const prop = part.slice(0, colon).trim();
    const value = part.slice(colon + 1).trim();
    if (!prop || !value) continue;
    // Convert kebab-case to camelCase (e.g. "background-color" → "backgroundColor")
    // but preserve CSS custom properties (--thm-*)
    const key = prop.startsWith('--')
      ? prop
      : prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    style[key] = value;
  }
  return style;
}

/** Get a React-compatible style object from a RuntimeNode's props. */
function getNodeStyle(props: Record<string, RuntimeProp>): React.CSSProperties {
  return cssStringToStyle(lvglPropsToStyle(props));
}

// ── Prop helpers ─────────────────────────────────────────────────────────────

/** Get the display value for a RuntimeProp (static value or reactive current). */
function getPropValue(prop: RuntimeProp | undefined): unknown {
  if (!prop) return undefined;
  if (prop.kind === 'static') return prop.value;
  if (prop.kind === 'reactive') return prop.evaluate();
  return undefined;
}

/** Get a string value from a prop, with fallback. */
function getPropString(prop: RuntimeProp | undefined, fallback = ''): string {
  const v = getPropValue(prop);
  return v != null ? String(v) : fallback;
}

// ── Widget renderers ─────────────────────────────────────────────────────────

interface WidgetProps {
  node: RuntimeNode;
  onAction?: (nodeId: string, event: string) => void;
}

function PageWidget({ node, onAction }: WidgetProps) {
  const style = getNodeStyle(node.props);
  return (
    <div className="lvgl-page" style={style} data-node-id={node.id}>
      {node.children.map((child) => (
        <LvglWidget key={child.id} node={child} onAction={onAction} />
      ))}
    </div>
  );
}

function LabelWidget({ node }: WidgetProps) {
  const text = getPropString(node.props.text);
  const style = getNodeStyle(node.props);
  return (
    <span className="lvgl-label" style={style} data-node-id={node.id}>
      {text}
    </span>
  );
}

function ButtonWidget({ node, onAction }: WidgetProps) {
  const style = getNodeStyle(node.props);
  const handleClick = () => {
    const actionProp = node.props.on_press ?? node.props.on_click;
    if (actionProp?.kind === 'action') {
      actionProp.handler();
    }
    onAction?.(node.id, 'press');
  };

  return (
    <button className="lvgl-button" style={style} data-node-id={node.id} onClick={handleClick}>
      {node.children.length > 0
        ? node.children.map((child) => (
            <LvglWidget key={child.id} node={child} onAction={onAction} />
          ))
        : getPropString(node.props.text)}
    </button>
  );
}

function SliderWidget({ node, onAction }: WidgetProps) {
  const style = getNodeStyle(node.props);
  const rawPropValue = Number(getPropValue(node.props.value) ?? 0);
  const propValue = Number.isFinite(rawPropValue) ? rawPropValue : 0;
  const min = Number(getPropValue(node.props.min_value) ?? 0);
  const max = Number(getPropValue(node.props.max_value) ?? 100);

  // Local state allows the slider to move immediately (optimistic update).
  // Syncs back when the reactive prop updates from the server round-trip.
  const [localValue, setLocalValue] = useState(propValue);
  useEffect(() => { setLocalValue(propValue); }, [propValue]);

  const trackRef = useRef<HTMLDivElement>(null);

  const clamp = (v: number) => Math.max(min, Math.min(max, v));
  const pct = max > min ? Math.max(0, Math.min(100, ((clamp(localValue) - min) / (max - min)) * 100)) : 0;

  const valueFromPointer = (clientX: number): number => {
    const track = trackRef.current;
    if (!track) return localValue;
    const rect = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return clamp(Math.round(min + ratio * (max - min)));
  };

  const commit = (newValue: number) => {
    setLocalValue(newValue);
    const actionProp = node.props.on_value ?? node.props.on_release;
    if (actionProp?.kind === 'action') {
      actionProp.handler(newValue);
    }
    onAction?.(node.id, 'value_changed');
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    commit(valueFromPointer(e.clientX));
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.buttons === 0) return;
    setLocalValue(valueFromPointer(e.clientX));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    commit(valueFromPointer(e.clientX));
  };

  return (
    <div
      ref={trackRef}
      className="lvgl-slider"
      style={style}
      data-node-id={node.id}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className="lvgl-slider-indicator" style={{ width: `${pct}%` }} />
      <div className="lvgl-slider-knob" style={{ left: `${pct}%` }} />
    </div>
  );
}

function SwitchWidget({ node, onAction }: WidgetProps) {
  const style = getNodeStyle(node.props);
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

  return (
    <label className="lvgl-switch" style={style} data-node-id={node.id}>
      <input
        type="checkbox"
        checked={localChecked}
        onChange={handleChange}
      />
      <span className="lvgl-switch-track" />
    </label>
  );
}

function BarWidget({ node }: WidgetProps) {
  const style = getNodeStyle(node.props);
  const value = Number(getPropValue(node.props.value) ?? 0);
  const max = Number(getPropValue(node.props.max) ?? 100);

  return (
    <progress
      className="lvgl-bar"
      style={style}
      data-node-id={node.id}
      value={value}
      max={max}
    />
  );
}

function ArcWidget({ node }: WidgetProps) {
  const style = getNodeStyle(node.props);
  const value = getPropValue(node.props.value);
  return (
    <div className="lvgl-arc" style={style} data-node-id={node.id}>
      {value != null ? String(value) : ''}
    </div>
  );
}

function ImageWidget({ node }: WidgetProps) {
  const style = getNodeStyle(node.props);
  const src = getPropString(node.props.src);
  return (
    <div className="lvgl-image" style={style} data-node-id={node.id}>
      {src ? <img src={src} alt="" /> : '🖼'}
    </div>
  );
}

function DropdownWidget({ node, onAction }: WidgetProps) {
  const style = getNodeStyle(node.props);
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
    <select className="lvgl-dropdown" style={style} data-node-id={node.id} value={localSelected} onChange={handleChange}>
      {items.map((item, i) => (
        <option key={i} value={i}>{item}</option>
      ))}
    </select>
  );
}

function SpinnerWidget({ node }: WidgetProps) {
  const style = getNodeStyle(node.props);
  return <div className="lvgl-spinner" style={style} data-node-id={node.id} />;
}

function TextareaWidget({ node, onAction }: WidgetProps) {
  const style = getNodeStyle(node.props);
  const propText = getPropString(node.props.text);
  const placeholder = getPropString(node.props.placeholder);

  const [localText, setLocalText] = useState(propText);
  useEffect(() => { setLocalText(propText); }, [propText]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalText(e.target.value);
    onAction?.(node.id, 'text_changed');
  };

  return (
    <textarea
      className="lvgl-textarea"
      style={style}
      data-node-id={node.id}
      value={localText}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
}

function CheckboxWidget({ node, onAction }: WidgetProps) {
  const style = getNodeStyle(node.props);
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
    <label className="lvgl-checkbox" style={style} data-node-id={node.id}>
      <input
        type="checkbox"
        checked={localChecked}
        onChange={handleChange}
      />
      {text}
    </label>
  );
}

function ObjWidget({ node, onAction }: WidgetProps) {
  const style = getNodeStyle(node.props);
  return (
    <div className="lvgl-obj" style={style} data-node-id={node.id}>
      {node.children.map((child) => (
        <LvglWidget key={child.id} node={child} onAction={onAction} />
      ))}
    </div>
  );
}

// ── Widget type → renderer map ───────────────────────────────────────────────

const WIDGET_MAP: Record<string, React.FC<WidgetProps>> = {
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
