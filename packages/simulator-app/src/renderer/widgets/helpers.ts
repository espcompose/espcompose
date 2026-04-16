import type React from 'react';
import type { RuntimeNode, RuntimeProp } from '../../runtime';
import { lvglPropsToStyle, type StyleOutput } from '../../runtime';

// ── Types ────────────────────────────────────────────────────────────────────

export interface ResolvedStyles {
  base: React.CSSProperties;
  /** Scoped CSS rule text for state pseudo-classes. Empty string if none. */
  statesCssText: string;
  /** Part styles keyed by LVGL part name. */
  parts: Record<string, { base: React.CSSProperties; statesCssText: string }>;
}

export interface WidgetProps {
  node: RuntimeNode;
  onAction?: (nodeId: string, event: string) => void;
}

// ── Constants ────────────────────────────────────────────────────────────────

/** LVGL state → CSS pseudo-class / attribute mapping. */
export const STATE_TO_CSS_SELECTOR: Record<string, string> = {
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
export const PART_TO_CSS_CLASS: Record<string, string> = {
  indicator: '.lvgl-part-indicator',
  knob: '.lvgl-part-knob',
  scrollbar: '.lvgl-part-scrollbar',
  selected: '.lvgl-part-selected',
  items: '.lvgl-part-items',
  ticks: '.lvgl-part-ticks',
  cursor: '.lvgl-part-cursor',
  textarea_placeholder: '::placeholder',
};

// ── Style helpers ────────────────────────────────────────────────────────────

/**
 * Convert a CSS string (semicolon-delimited) to a React-compatible
 * style object.
 */
export function cssStringToStyle(css: string): React.CSSProperties {
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

/**
 * Build scoped CSS rules for state styles.
 * Returns a CSS text block like:
 *   [data-node-id="xxx"]:active { background-color: #123456 }
 */
export function buildStateCssRules(nodeId: string, states: Record<string, string>, selectorPrefix = ''): string {
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
export function getNodeStyles(props: Record<string, RuntimeProp>, nodeId: string): ResolvedStyles {
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

/** Collect all state CSS text (base + parts) into a single string. */
export function collectAllStateCss(styles: ResolvedStyles): string {
  const parts: string[] = [];
  if (styles.statesCssText) parts.push(styles.statesCssText);
  for (const partStyle of Object.values(styles.parts)) {
    if (partStyle.statesCssText) parts.push(partStyle.statesCssText);
  }
  return parts.join('\n');
}

// ── Prop helpers ─────────────────────────────────────────────────────────────

/** Get the display value for a RuntimeProp (static value or reactive current). */
export function getPropValue(prop: RuntimeProp | undefined): unknown {
  if (!prop) return undefined;
  if (prop.kind === 'static') return prop.value;
  if (prop.kind === 'reactive') return prop.evaluate();
  return undefined;
}

/** Get a string value from a prop, with fallback. */
export function getPropString(prop: RuntimeProp | undefined, fallback = ''): string {
  const v = getPropValue(prop);
  return v != null ? String(v) : fallback;
}
