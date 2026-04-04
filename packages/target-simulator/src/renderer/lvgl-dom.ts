// ────────────────────────────────────────────────────────────────────────────
// DOM-based LVGL renderer — maps RuntimeNodes to HTML elements
//
// Produces a visual approximation of an LVGL display in the browser.
// Each widget type maps to appropriate HTML elements with CSS styling
// that approximates LVGL's default dark theme.
//
// This renderer generates a self-contained HTML string that can be served
// by the dev server. It includes:
//   - The LVGL viewport (fixed-size container)
//   - Rendered widget tree
//   - Inline CSS for LVGL approximation
//   - Control panel for mock entity manipulation
//   - Action log panel
// ────────────────────────────────────────────────────────────────────────────

import type { RuntimeNode, RuntimeProp } from '../types';
import type { MockProvider } from '../providers/mock-provider';

// ── CSS ──────────────────────────────────────────────────────────────────────

const LVGL_CSS = `
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #1a1a2e;
  color: #e0e0e0;
  display: flex;
  gap: 24px;
  padding: 24px;
  min-height: 100vh;
}

.sim-viewport {
  border: 2px solid #444;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background: #000;
  position: relative;
}

.sim-sidebar {
  flex: 1;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sim-panel {
  background: #16213e;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 16px;
}

.sim-panel h3 {
  margin-bottom: 12px;
  color: #87ceeb;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* LVGL widget base styles */
.lvgl-page {
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  overflow-y: auto;
  padding: 0;
  position: relative;
}

.lvgl-obj {
  position: relative;
}

.lvgl-label {
  color: #fff;
  font-size: 14px;
  line-height: 1.4;
  padding: 2px;
  white-space: pre-wrap;
}

.lvgl-button {
  background: #2196f3;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 32px;
}

.lvgl-button:hover { background: #1976d2; }
.lvgl-button:active { background: #1565c0; }

.lvgl-slider {
  width: 100%;
  accent-color: #2196f3;
}

.lvgl-switch {
  width: 50px;
  height: 28px;
  accent-color: #2196f3;
}

.lvgl-bar {
  width: 100%;
  height: 20px;
  accent-color: #2196f3;
  border-radius: 4px;
}

.lvgl-arc {
  /* Placeholder — SVG-based in future */
  width: 100px;
  height: 100px;
  border: 3px solid #2196f3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Entity control panel */
.entity-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #333;
}

.entity-row:last-child { border-bottom: none; }

.entity-id {
  font-family: monospace;
  font-size: 12px;
  color: #87ceeb;
  flex: 1;
}

.entity-state {
  font-family: monospace;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  min-width: 40px;
  text-align: center;
}

.entity-state.on { background: #2e7d32; color: #fff; }
.entity-state.off { background: #555; color: #aaa; }

.entity-toggle-btn {
  background: #333;
  color: #fff;
  border: 1px solid #555;
  border-radius: 4px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
}

.entity-toggle-btn:hover { background: #444; }

/* Action log */
.action-log {
  max-height: 300px;
  overflow-y: auto;
  font-family: monospace;
  font-size: 11px;
}

.action-entry {
  padding: 4px 0;
  border-bottom: 1px solid #222;
  color: #aaa;
}

.action-entry .timestamp { color: #666; }
.action-entry .action-text { color: #4fc3f7; }

.sim-header {
  font-size: 18px;
  color: #fff;
  margin-bottom: 8px;
}

.sim-meta {
  font-size: 12px;
  color: #666;
  margin-bottom: 16px;
}
`;

// ── Widget rendering ─────────────────────────────────────────────────────────

function getStaticValue(prop: RuntimeProp | undefined): unknown {
  if (!prop) return undefined;
  if (prop.kind === 'static') return prop.value;
  if (prop.kind === 'reactive') return prop.current;
  if (prop.kind === 'ref') return prop.refId;
  return undefined;
}

function renderWidgetToHtml(node: RuntimeNode, depth: number): string {
  const indent = '  '.repeat(depth);
  const id = node.id;
  const dataAttr = `data-node-id="${id}" data-node-type="${node.type}"`;

  switch (node.type) {
    case 'page':
      return `${indent}<div class="lvgl-page" ${dataAttr}>\n${
        node.children.map(c => renderWidgetToHtml(c, depth + 1)).join('\n')
      }\n${indent}</div>`;

    case 'label': {
      const text = getStaticValue(node.props.text) ?? '';
      const x = getStaticValue(node.props.x);
      const y = getStaticValue(node.props.y);
      const style = positionStyle(x, y);
      return `${indent}<span class="lvgl-label" ${dataAttr} style="${style}">${escapeHtml(String(text))}</span>`;
    }

    case 'button': {
      const x = getStaticValue(node.props.x);
      const y = getStaticValue(node.props.y);
      const w = getStaticValue(node.props.width);
      const h = getStaticValue(node.props.height);
      const style = positionStyle(x, y, w, h);
      const children = node.children.length > 0
        ? node.children.map(c => renderWidgetToHtml(c, depth + 1)).join('\n')
        : '';
      return `${indent}<button class="lvgl-button" ${dataAttr} style="${style}" onclick="window.__simAction('${id}', 'onRelease')">\n${children}\n${indent}</button>`;
    }

    case 'slider': {
      const min = getStaticValue(node.props.minValue) ?? 0;
      const max = getStaticValue(node.props.maxValue) ?? 100;
      const val = getStaticValue(node.props.value) ?? 0;
      const x = getStaticValue(node.props.x);
      const y = getStaticValue(node.props.y);
      const style = positionStyle(x, y);
      return `${indent}<input type="range" class="lvgl-slider" ${dataAttr} style="${style}" min="${min}" max="${max}" value="${val}" />`;
    }

    case 'switch': {
      const x = getStaticValue(node.props.x);
      const y = getStaticValue(node.props.y);
      const style = positionStyle(x, y);
      return `${indent}<input type="checkbox" class="lvgl-switch" ${dataAttr} style="${style}" />`;
    }

    case 'bar': {
      const val = getStaticValue(node.props.value) ?? 0;
      const max = getStaticValue(node.props.maxValue) ?? 100;
      const x = getStaticValue(node.props.x);
      const y = getStaticValue(node.props.y);
      const style = positionStyle(x, y);
      return `${indent}<progress class="lvgl-bar" ${dataAttr} style="${style}" value="${val}" max="${max}"></progress>`;
    }

    case 'obj':
    default: {
      const x = getStaticValue(node.props.x);
      const y = getStaticValue(node.props.y);
      const w = getStaticValue(node.props.width);
      const h = getStaticValue(node.props.height);
      const style = positionStyle(x, y, w, h);
      const children = node.children.map(c => renderWidgetToHtml(c, depth + 1)).join('\n');
      return `${indent}<div class="lvgl-obj" ${dataAttr} style="${style}">\n${children}\n${indent}</div>`;
    }
  }
}

function positionStyle(
  x?: unknown, y?: unknown, w?: unknown, h?: unknown
): string {
  const parts: string[] = [];
  if (x != null || y != null) {
    parts.push('position: absolute');
    if (x != null) parts.push(`left: ${x}px`);
    if (y != null) parts.push(`top: ${y}px`);
  }
  if (w != null) parts.push(`width: ${typeof w === 'number' ? `${w}px` : w}`);
  if (h != null) parts.push(`height: ${typeof h === 'number' ? `${h}px` : h}`);
  return parts.join('; ');
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── Entity control panel ─────────────────────────────────────────────────────

function renderEntityPanel(entities: string[]): string {
  if (entities.length === 0) return '<p style="color: #666">No entities registered</p>';

  return entities.map(entityId => {
    const domain = entityId.split('.')[0];
    const isToggleable = ['light', 'switch', 'fan', 'cover'].includes(domain);

    return `
      <div class="entity-row" data-entity="${entityId}">
        <span class="entity-id">${escapeHtml(entityId)}</span>
        <span class="entity-state off" data-entity-state="${entityId}">--</span>
        ${isToggleable ? `<button class="entity-toggle-btn" onclick="window.__simToggle('${entityId}')">Toggle</button>` : ''}
        ${domain === 'sensor' ? `<input type="number" style="width:60px;background:#333;color:#fff;border:1px solid #555;padding:2px 4px;border-radius:4px" value="0" onchange="window.__simSetSensor('${entityId}', this.value)" />` : ''}
      </div>
    `;
  }).join('\n');
}

// ── Full page HTML generation ────────────────────────────────────────────────

export interface RenderPageOptions {
  nodes: RuntimeNode[];
  width?: number;
  height?: number;
  provider: MockProvider;
  projectName?: string;
}

/**
 * Generate the complete simulator HTML page.
 */
export function renderSimulatorPage(options: RenderPageOptions): string {
  const { nodes, width = 320, height = 480, provider, projectName = 'espcompose' } = options;

  const widgetHtml = nodes.map(n => renderWidgetToHtml(n, 3)).join('\n');
  const entityIds = provider.getEntityIds();
  const entityPanelHtml = renderEntityPanel(entityIds);

  // Build node registry for client-side reactive updates
  const nodeRegistry = buildNodeRegistry(nodes);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(projectName)} — ESPCompose Simulator</title>
  <style>${LVGL_CSS}</style>
</head>
<body>
  <div>
    <div class="sim-header">ESPCompose Simulator</div>
    <div class="sim-meta">${escapeHtml(projectName)} · ${width}×${height}</div>
    <div class="sim-viewport" style="width: ${width}px; height: ${height}px;">
${widgetHtml}
    </div>
  </div>

  <div class="sim-sidebar">
    <div class="sim-panel">
      <h3>Entity Controls</h3>
      ${entityPanelHtml}
    </div>

    <div class="sim-panel">
      <h3>Action Log</h3>
      <div class="action-log" id="actionLog"></div>
    </div>

    <div class="sim-panel">
      <h3>Widget Tree</h3>
      <pre style="font-size: 11px; color: #aaa; overflow: auto; max-height: 300px;">${escapeHtml(JSON.stringify(nodeRegistry, null, 2))}</pre>
    </div>
  </div>

  <script>
    // ── Client-side simulator runtime ──
    const nodeRegistry = ${JSON.stringify(nodeRegistry)};

    // Action handler — called when buttons are clicked
    window.__simAction = function(nodeId, event) {
      logAction(event + ' on ' + nodeId);
      // Send to server for execution
      fetch('/api/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodeId, event }),
      }).then(r => r.json()).then(data => {
        if (data.stateUpdates) {
          for (const [entityId, state] of Object.entries(data.stateUpdates)) {
            updateEntityDisplay(entityId, state);
          }
        }
      });
    };

    // Entity toggle — called from control panel
    window.__simToggle = function(entityId) {
      fetch('/api/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entityId }),
      }).then(r => r.json()).then(data => {
        updateEntityDisplay(entityId, data.state);
        logAction('toggle ' + entityId + ' → ' + data.state.state);
      });
    };

    // Sensor value change
    window.__simSetSensor = function(entityId, value) {
      fetch('/api/set-sensor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entityId, value }),
      }).then(r => r.json()).then(data => {
        updateEntityDisplay(entityId, data.state);
      });
    };

    function updateEntityDisplay(entityId, state) {
      const el = document.querySelector('[data-entity-state="' + entityId + '"]');
      if (el) {
        el.textContent = state.state;
        el.className = 'entity-state ' + (state.state === 'on' ? 'on' : 'off');
      }
    }

    function logAction(text) {
      const log = document.getElementById('actionLog');
      const entry = document.createElement('div');
      entry.className = 'action-entry';
      entry.innerHTML = '<span class="timestamp">' + new Date().toLocaleTimeString() + '</span> <span class="action-text">' + text + '</span>';
      log.prepend(entry);
    }

    // SSE for reactive updates from the server
    const evtSource = new EventSource('/api/updates');
    evtSource.onmessage = function(event) {
      const data = JSON.parse(event.data);
      if (data.type === 'prop-update') {
        const el = document.querySelector('[data-node-id="' + data.nodeId + '"]');
        if (el && data.prop === 'text') {
          el.textContent = data.value;
        }
      }
      if (data.type === 'entity-update') {
        updateEntityDisplay(data.entityId, data.state);
      }
    };

    // Initialize entity displays
    fetch('/api/entities').then(r => r.json()).then(entities => {
      for (const [entityId, state] of Object.entries(entities)) {
        updateEntityDisplay(entityId, state);
      }
    });
  </script>
</body>
</html>`;
}

/**
 * Build a simplified node registry for client-side reference.
 */
function buildNodeRegistry(nodes: RuntimeNode[]): object[] {
  return nodes.map(n => ({
    id: n.id,
    type: n.type,
    props: Object.fromEntries(
      Object.entries(n.props).map(([k, v]) => [k, {
        kind: v.kind,
        ...(v.kind === 'static' ? { value: v.value } : {}),
        ...(v.kind === 'reactive' ? { current: v.current } : {}),
        ...(v.kind === 'ref' ? { refId: v.refId } : {}),
      }])
    ),
    children: buildNodeRegistry(n.children),
  }));
}
