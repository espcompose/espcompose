// ────────────────────────────────────────────────────────────────────────────
// Widget renderer registry — extensible per-widget-type HTML generation
//
// Each LVGL widget type registers a renderer function that converts a
// RuntimeNode to an HTML string. New widget types are added by calling
// registerWidgetRenderer() — no changes to the core render loop needed.
// ────────────────────────────────────────────────────────────────────────────

import type { RuntimeNode } from '@espcompose/simulator-app/runtime';
import { getStaticValue, lvglPropsToStyle, escapeHtml } from '@espcompose/simulator-app/runtime';

// ── Registry types ───────────────────────────────────────────────────────────

export interface WidgetRenderContext {
  /** Recursively render a child node. */
  renderChild: (node: RuntimeNode, depth: number) => string;
  /** Current indentation depth. */
  depth: number;
}

export type WidgetRenderer = (
  node: RuntimeNode,
  ctx: WidgetRenderContext,
) => string;

// ── Registry ─────────────────────────────────────────────────────────────────

const renderers = new Map<string, WidgetRenderer>();

/**
 * Register a renderer for a specific LVGL widget type.
 * Overwrites any existing renderer for that type.
 */
export function registerWidgetRenderer(type: string, renderer: WidgetRenderer): void {
  renderers.set(type, renderer);
}

/**
 * Get the renderer for a widget type, falling back to the default obj renderer.
 */
export function getWidgetRenderer(type: string): WidgetRenderer {
  return renderers.get(type) ?? renderers.get('obj')!;
}

// ── Shared helpers ───────────────────────────────────────────────────────────

function dataAttrs(node: RuntimeNode): string {
  return `data-node-id="${node.id}" data-node-type="${node.type}"`;
}

function renderChildren(node: RuntimeNode, ctx: WidgetRenderContext): string {
  return node.children.map(c => ctx.renderChild(c, ctx.depth + 1)).join('\n');
}

function indent(depth: number): string {
  return '  '.repeat(depth);
}

// ── Built-in widget renderers ────────────────────────────────────────────────

registerWidgetRenderer('page', (node, ctx) => {
  const style = lvglPropsToStyle(node.props);
  const children = renderChildren(node, ctx);
  const i = indent(ctx.depth);
  return `${i}<div class="lvgl-page" ${dataAttrs(node)} style="${style}">\n${children}\n${i}</div>`;
});

registerWidgetRenderer('label', (node, ctx) => {
  const text = getStaticValue(node.props.text) ?? '';
  const style = lvglPropsToStyle(node.props);
  const i = indent(ctx.depth);
  return `${i}<span class="lvgl-label" ${dataAttrs(node)} style="${style}">${escapeHtml(String(text))}</span>`;
});

registerWidgetRenderer('button', (node, ctx) => {
  const style = lvglPropsToStyle(node.props);
  const children = node.children.length > 0 ? renderChildren(node, ctx) : '';
  const i = indent(ctx.depth);
  return `${i}<button class="lvgl-button" ${dataAttrs(node)} style="${style}" onclick="window.__simAction('${node.id}', 'onRelease')">\n${children}\n${i}</button>`;
});

registerWidgetRenderer('slider', (node, ctx) => {
  const min = getStaticValue(node.props.minValue) ?? 0;
  const max = getStaticValue(node.props.maxValue) ?? 100;
  const val = getStaticValue(node.props.value) ?? 0;
  const style = lvglPropsToStyle(node.props);
  const i = indent(ctx.depth);
  return `${i}<input type="range" class="lvgl-slider" ${dataAttrs(node)} style="${style}" min="${min}" max="${max}" value="${val}" />`;
});

registerWidgetRenderer('switch', (node, ctx) => {
  const style = lvglPropsToStyle(node.props);
  const i = indent(ctx.depth);
  return `${i}<input type="checkbox" class="lvgl-switch" ${dataAttrs(node)} style="${style}" />`;
});

registerWidgetRenderer('bar', (node, ctx) => {
  const val = getStaticValue(node.props.value) ?? 0;
  const max = getStaticValue(node.props.maxValue) ?? 100;
  const style = lvglPropsToStyle(node.props);
  const i = indent(ctx.depth);
  return `${i}<progress class="lvgl-bar" ${dataAttrs(node)} style="${style}" value="${val}" max="${max}"></progress>`;
});

registerWidgetRenderer('arc', (node, ctx) => {
  const val = getStaticValue(node.props.value) ?? 0;
  const style = lvglPropsToStyle(node.props);
  const children = renderChildren(node, ctx);
  const i = indent(ctx.depth);
  return `${i}<div class="lvgl-arc" ${dataAttrs(node)} style="${style}">\n${children}\n${i}<span class="lvgl-arc-value">${val}</span>\n${i}</div>`;
});

registerWidgetRenderer('image', (node, ctx) => {
  const src = getStaticValue(node.props.src) ?? '';
  const style = lvglPropsToStyle(node.props);
  const i = indent(ctx.depth);
  return `${i}<div class="lvgl-image" ${dataAttrs(node)} style="${style}" title="${escapeHtml(String(src))}"></div>`;
});

registerWidgetRenderer('dropdown', (node, ctx) => {
  const options = getStaticValue(node.props.options) ?? '';
  const style = lvglPropsToStyle(node.props);
  const i = indent(ctx.depth);
  const optionList = String(options).split('\\n').filter(Boolean);
  const optionHtml = optionList.map((o, idx) => `${i}  <option value="${idx}">${escapeHtml(o)}</option>`).join('\n');
  return `${i}<select class="lvgl-dropdown" ${dataAttrs(node)} style="${style}">\n${optionHtml}\n${i}</select>`;
});

registerWidgetRenderer('spinner', (node, ctx) => {
  const style = lvglPropsToStyle(node.props);
  const i = indent(ctx.depth);
  return `${i}<div class="lvgl-spinner" ${dataAttrs(node)} style="${style}"></div>`;
});

registerWidgetRenderer('textarea', (node, ctx) => {
  const text = getStaticValue(node.props.text) ?? '';
  const placeholder = getStaticValue(node.props.placeholder) ?? '';
  const style = lvglPropsToStyle(node.props);
  const i = indent(ctx.depth);
  return `${i}<textarea class="lvgl-textarea" ${dataAttrs(node)} style="${style}" placeholder="${escapeHtml(String(placeholder))}">${escapeHtml(String(text))}</textarea>`;
});

registerWidgetRenderer('checkbox', (node, ctx) => {
  const text = getStaticValue(node.props.text) ?? '';
  const style = lvglPropsToStyle(node.props);
  const i = indent(ctx.depth);
  return `${i}<label class="lvgl-checkbox" ${dataAttrs(node)} style="${style}"><input type="checkbox" /> ${escapeHtml(String(text))}</label>`;
});

// Default 'obj' renderer — used as fallback for unknown widget types.
registerWidgetRenderer('obj', (node, ctx) => {
  const style = lvglPropsToStyle(node.props);
  const children = renderChildren(node, ctx);
  const i = indent(ctx.depth);
  return `${i}<div class="lvgl-obj" ${dataAttrs(node)} style="${style}">\n${children}\n${i}</div>`;
});

// ── Top-level render entry point ─────────────────────────────────────────────

/**
 * Render a RuntimeNode tree to HTML using the widget registry.
 */
export function renderWidgetToHtml(node: RuntimeNode, depth: number): string {
  const renderer = getWidgetRenderer(node.type);
  const ctx: WidgetRenderContext = {
    renderChild: renderWidgetToHtml,
    depth,
  };
  return renderer(node, ctx);
}
