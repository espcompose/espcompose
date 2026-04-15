import React, { useRef, useState, useEffect } from 'react';
import type { RuntimeNode, RuntimeProp } from '../runtime';
import { lvglPropsToStyle, type StyleOutput } from '../runtime';

// ── Style helpers ────────────────────────────────────────────────────────────

/**
 * Convert a CSS string (semicolon-delimited) to a React-compatible
 * style object.
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
    // Convert kebab-case to camelCase but preserve CSS custom properties (--thm-*)
    const key = prop.startsWith('--')
      ? prop
      : prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    style[key] = value;
  }
  return style;
}

/** LVGL state → CSS pseudo-class / attribute mapping. */
const STATE_TO_CSS_SELECTOR: Record<string, string> = {
  pressed: ':active',
  hovered: ':hover',
  focused: ':focus-within',
  focus_key: ':focus-visible',
  disabled: '[data-disabled]',
  checked: '[data-checked]',
  edited: '[data-edited]',
  scrolled: '[data-scrolled]',
};

/** LVGL part → CSS sub-element class mapping. */
const PART_TO_CSS_CLASS: Record<string, string> = {
  indicator: '.lvgl-part-indicator',
  knob: '.lvgl-part-knob',
  scrollbar: '.lvgl-part-scrollbar',
  selected: '.lvgl-part-selected',
  items: '.lvgl-part-items',
  ticks: '.lvgl-part-ticks',
  cursor: '.lvgl-part-cursor',
  textarea_placeholder: '::placeholder',
};

interface ResolvedStyles {
  base: React.CSSProperties;
  /** Scoped CSS rule text for state pseudo-classes. Empty string if none. */
  statesCssText: string;
  /** Part styles keyed by LVGL part name. */
  parts: Record<string, { base: React.CSSProperties; statesCssText: string }>;
}

/**
 * Build scoped CSS rules for state styles.
 * Returns a CSS text block like:
 *   [data-node-id="xxx"]:active { background-color: #123456 }
 */
function buildStateCssRules(nodeId: string, states: Record<string, string>, selectorPrefix = ''): string {
  const rules: string[] = [];
  for (const [state, cssString] of Object.entries(states)) {
    if (!cssString) continue;
    const pseudo = STATE_TO_CSS_SELECTOR[state];
    if (!pseudo) continue;
    const selector = selectorPrefix
      ? `${selectorPrefix}${pseudo}`
      : `[data-node-id="${nodeId}"]${pseudo}`;
    rules.push(`${selector} { ${cssString} }`);
  }
  return rules.join('\n');
}

/** Get resolved styles from a RuntimeNode's props. */
function getNodeStyles(props: Record<string, RuntimeProp>, nodeId: string): ResolvedStyles {
  const output: StyleOutput = lvglPropsToStyle(props);

  const base = cssStringToStyle(output.base);
  const statesCssText = buildStateCssRules(nodeId, output.states);

  const parts: Record<string, { base: React.CSSProperties; statesCssText: string }> = {};
  for (const [part, partOutput] of Object.entries(output.parts)) {
    const partClass = PART_TO_CSS_CLASS[part];
    const partSelector = partClass
      ? `[data-node-id="${nodeId}"] ${partClass}`
      : undefined;
    parts[part] = {
      base: cssStringToStyle(partOutput.base),
      statesCssText: partSelector
        ? buildStateCssRules(nodeId, partOutput.states, partSelector)
        : '',
    };
  }

  return { base, statesCssText, parts };
}

/** Inject a scoped <style> tag for state and part-state CSS rules. */
function StyleInjector({ cssText }: { cssText: string }) {
  if (!cssText) return null;
  return <style dangerouslySetInnerHTML={{ __html: cssText }} />;
}

/** Collect all state CSS text (base + parts) into a single string. */
function collectAllStateCss(styles: ResolvedStyles): string {
  const parts: string[] = [];
  if (styles.statesCssText) parts.push(styles.statesCssText);
  for (const partStyle of Object.values(styles.parts)) {
    if (partStyle.statesCssText) parts.push(partStyle.statesCssText);
  }
  return parts.join('\n');
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
  const styles = getNodeStyles(node.props, node.id);
  const allCss = collectAllStateCss(styles);
  return (
    <div className="lvgl-page" style={styles.base} data-node-id={node.id}>
      <StyleInjector cssText={allCss} />
      {node.children.map((child) => (
        <LvglWidget key={child.id} node={child} onAction={onAction} />
      ))}
    </div>
  );
}

function LabelWidget({ node }: WidgetProps) {
  const text = getPropString(node.props.text);
  const styles = getNodeStyles(node.props, node.id);
  const allCss = collectAllStateCss(styles);
  return (
    <span className="lvgl-label" style={styles.base} data-node-id={node.id}>
      <StyleInjector cssText={allCss} />
      {text}
    </span>
  );
}

function ButtonWidget({ node, onAction }: WidgetProps) {
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

function SliderWidget({ node, onAction }: WidgetProps) {
  const styles = getNodeStyles(node.props, node.id);
  const allCss = collectAllStateCss(styles);
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

  // Part styles for indicator and knob
  const indicatorPart = styles.parts.indicator;
  const knobPart = styles.parts.knob;
  const indicatorStyle: React.CSSProperties = { width: `${pct}%`, ...indicatorPart?.base };
  const knobStyle: React.CSSProperties = { left: `${pct}%`, ...knobPart?.base };

  return (
    <div
      ref={trackRef}
      className="lvgl-slider"
      style={styles.base}
      data-node-id={node.id}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <StyleInjector cssText={allCss} />
      <div className="lvgl-slider-indicator lvgl-part-indicator" style={indicatorStyle} />
      <div className="lvgl-slider-knob lvgl-part-knob" style={knobStyle} />
    </div>
  );
}

function SwitchWidget({ node, onAction }: WidgetProps) {
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

function BarWidget({ node }: WidgetProps) {
  const styles = getNodeStyles(node.props, node.id);
  const allCss = collectAllStateCss(styles);
  const value = Number(getPropValue(node.props.value) ?? 0);
  const max = Number(getPropValue(node.props.max) ?? 100);
  const indicatorPart = styles.parts.indicator;

  // Use a div-based bar when indicator part styles are present for CSS control
  if (indicatorPart && Object.keys(indicatorPart.base).length > 0) {
    const pct = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
    return (
      <div className="lvgl-bar" style={styles.base} data-node-id={node.id}>
        <StyleInjector cssText={allCss} />
        <div
          className="lvgl-bar-indicator lvgl-part-indicator"
          style={{ width: `${pct}%`, height: '100%', ...indicatorPart.base }}
        />
      </div>
    );
  }

  return (
    <>
      <StyleInjector cssText={allCss} />
      <progress
        className="lvgl-bar"
        style={styles.base}
        data-node-id={node.id}
        value={value}
        max={max}
      />
    </>
  );
}

function ArcWidget({ node }: WidgetProps) {
  const styles = getNodeStyles(node.props, node.id);
  const allCss = collectAllStateCss(styles);
  const value = getPropValue(node.props.value);
  return (
    <div className="lvgl-arc" style={styles.base} data-node-id={node.id}>
      <StyleInjector cssText={allCss} />
      {value != null ? String(value) : ''}
    </div>
  );
}

function ImageWidget({ node }: WidgetProps) {
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

function DropdownWidget({ node, onAction }: WidgetProps) {
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

function SpinnerWidget({ node }: WidgetProps) {
  const styles = getNodeStyles(node.props, node.id);
  const allCss = collectAllStateCss(styles);
  return (
    <div className="lvgl-spinner" style={styles.base} data-node-id={node.id}>
      <StyleInjector cssText={allCss} />
    </div>
  );
}

function TextareaWidget({ node, onAction }: WidgetProps) {
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

function CheckboxWidget({ node, onAction }: WidgetProps) {
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

function ObjWidget({ node, onAction }: WidgetProps) {
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

// ── ec-canvas paint helpers ──────────────────────────────────────────────────

type PaintPropMap = Record<string, RuntimeProp>;

/** Resolve a paint primitive prop to its current display value. */
function paintVal(props: PaintPropMap, key: string): unknown {
  const p = props[key];
  if (!p) return undefined;
  if (p.kind === 'static') return p.value;
  if (p.kind === 'reactive') return p.evaluate();
  return undefined;
}

function paintStr(props: PaintPropMap, key: string, fallback = ''): string {
  const v = paintVal(props, key);
  return v != null ? String(v) : fallback;
}

function paintNum(props: PaintPropMap, key: string, fallback = 0): number {
  const v = paintVal(props, key);
  return typeof v === 'number' ? v : fallback;
}

/** Convert a paint fill/stroke color value (0xRRGGBB or '#rrggbb') to a CSS color string. */
function paintColor(props: PaintPropMap, key: string): string | undefined {
  const v = paintVal(props, key);
  if (v == null) return undefined;
  if (typeof v === 'number') {
    return `#${v.toString(16).padStart(6, '0')}`;
  }
  const s = String(v);
  // The serializer converts '#rrggbb' → '0xrrggbb' for ESPHome YAML;
  // convert back to CSS hex format for the browser.
  if (s.startsWith('0x')) {
    return `#${s.slice(2).padStart(6, '0')}`;
  }
  return s;
}

/** Render a single paint primitive as an SVG element. */
function renderPaintPrimitive(prim: PaintPropMap, index: number): React.ReactNode {
  const type = paintStr(prim, 'type');

  switch (type) {
    case 'rect': {
      const x = paintNum(prim, 'x');
      const y = paintNum(prim, 'y');
      const w = paintNum(prim, 'width');
      const h = paintNum(prim, 'height');
      const r = paintNum(prim, 'radius');
      const fill = paintColor(prim, 'fill') ?? 'transparent';
      const stroke = paintColor(prim, 'stroke');
      const strokeWidth = paintNum(prim, 'stroke_width', 0);
      const opacity = paintVal(prim, 'opacity');
      return (
        <rect
          key={index}
          x={x} y={y} width={w} height={h}
          rx={r} ry={r}
          fill={fill}
          stroke={stroke ?? 'none'}
          strokeWidth={strokeWidth}
          opacity={opacity != null ? Number(opacity) : undefined}
        />
      );
    }
    case 'line': {
      const x1 = paintNum(prim, 'x1');
      const y1 = paintNum(prim, 'y1');
      const x2 = paintNum(prim, 'x2');
      const y2 = paintNum(prim, 'y2');
      const stroke = paintColor(prim, 'stroke') ?? '#000';
      const strokeWidth = paintNum(prim, 'stroke_width', 1);
      const opacity = paintVal(prim, 'opacity');
      return (
        <line
          key={index}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={stroke}
          strokeWidth={strokeWidth}
          opacity={opacity != null ? Number(opacity) : undefined}
        />
      );
    }
    default:
      return null;
  }
}

/** Render a paint scene (background or overlay) as an SVG overlay. */
function PaintScene({ scene, zIndex }: { scene: PaintPropMap[]; zIndex: number }) {
  if (scene.length === 0) return null;
  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex,
        pointerEvents: 'none',
      }}
    >
      {scene.map((prim, i) => renderPaintPrimitive(prim, i))}
    </svg>
  );
}

function EcCanvasWidget({ node, onAction }: WidgetProps) {
  const styles = getNodeStyles(node.props, node.id);
  const allCss = collectAllStateCss(styles);
  const canvasStyle: React.CSSProperties = {
    ...styles.base,
    position: 'relative',
  };

  const bgScene = getPropValue(node.props.background_scene) as PaintPropMap[] | undefined;
  const ovScene = getPropValue(node.props.overlay_scene) as PaintPropMap[] | undefined;

  return (
    <div className="ec-canvas" style={canvasStyle} data-node-id={node.id}>
      <StyleInjector cssText={allCss} />
      {bgScene && bgScene.length > 0 && <PaintScene scene={bgScene} zIndex={0} />}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {node.children.map((child) => (
          <LvglWidget key={child.id} node={child} onAction={onAction} />
        ))}
      </div>
      {ovScene && ovScene.length > 0 && <PaintScene scene={ovScene} zIndex={2} />}
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
