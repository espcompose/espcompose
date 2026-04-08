// ────────────────────────────────────────────────────────────────────────────
// DOM-based LVGL renderer — maps RuntimeNodes to HTML elements
//
// Produces a visual approximation of an LVGL display in the browser.
// Widget-type-specific rendering is handled by the widget registry
// (renderer/widget-registry.ts). Theme colors are emitted as CSS custom
// properties (renderer/theme-css.ts) so widgets can reference them and
// theme switching updates only CSS variables on the viewport root.
//
// Layout: canvas (left, 70%) + sidebar (right, 30%) with a draggable
// splitter. The display viewport is zoom-fitted into the canvas area.
// ────────────────────────────────────────────────────────────────────────────

import type { IRThemeData } from '@espcompose/core/internals';
import type { RuntimeNode, MockProvider } from '@espcompose/simulator-app/runtime';
import { escapeHtml, generateThemeStyleBlock, generateThemeSwitchScript } from '@espcompose/simulator-app/runtime';
import { renderWidgetToHtml } from './widget-registry';

// ── CSS ──────────────────────────────────────────────────────────────────────

const LVGL_CSS = `
* { box-sizing: border-box; margin: 0; padding: 0; }

html, body { height: 100%; overflow: hidden; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #111;
  color: #e0e0e0;
}

/* ── Shell layout ─────────────────────────────────────────────────────────── */

.sim-shell {
  display: flex;
  height: 100vh;
  width: 100vw;
}

/* Canvas — left side, contains the centered display */
.sim-canvas {
  flex: 7;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  background: #0d0d0d;
  overflow: hidden;
}

.sim-canvas-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: #1a1a2e;
  border-bottom: 1px solid #333;
  flex-shrink: 0;
}

.sim-canvas-header .title {
  font-size: 14px;
  font-weight: 600;
  color: #e0e0e0;
}

.sim-canvas-header .meta {
  font-size: 12px;
  color: #666;
}

.sim-canvas-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

/* The viewport is the actual display at its native pixel size, then scaled */
.sim-viewport {
  position: absolute;
  overflow: hidden;
  background: #000;
  transform-origin: center center;
  /* Crisp pixel scaling for small displays */
  image-rendering: pixelated;
  box-shadow: 0 0 40px rgba(0,0,0,0.6);
  border-radius: 4px;

  /* Default theme fallbacks — overridden by theme CSS variables */
  --thm-colors-background: #1a1a1a;
  --thm-colors-primary-bg: #2196f3;
  --thm-colors-primary-text: #fff;
  --thm-colors-primary-bg-pressed: #1565c0;
}

/* ── Splitter ─────────────────────────────────────────────────────────────── */

.sim-splitter {
  width: 5px;
  cursor: col-resize;
  background: #222;
  flex-shrink: 0;
  transition: background 0.15s;
}

.sim-splitter:hover, .sim-splitter.dragging {
  background: #2196f3;
}

/* ── Sidebar — right side ─────────────────────────────────────────────────── */

.sim-sidebar {
  flex: 3;
  min-width: 200px;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background: #16213e;
  overflow-y: auto;
}

.sim-panel {
  padding: 16px;
  border-bottom: 1px solid #1f2f4f;
}

.sim-panel:last-child { border-bottom: none; }

.sim-panel h3 {
  margin-bottom: 10px;
  color: #87ceeb;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ── LVGL widget base styles ──────────────────────────────────────────────── */

.lvgl-page {
  width: 100%;
  height: 100%;
  background: var(--thm-colors-background, #1a1a1a);
  overflow-y: auto;
  padding: 0;
  position: relative;
}

.lvgl-obj {
  position: relative;
}

.lvgl-label {
  color: var(--thm-colors-primary-text, #fff);
  line-height: 1.4;
  padding: 2px;
  white-space: pre-wrap;
}

.lvgl-button {
  background: var(--thm-colors-primary-bg, #2196f3);
  color: var(--thm-colors-primary-text, #fff);
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 32px;
}

.lvgl-button:hover { filter: brightness(0.9); }
.lvgl-button:active { background: var(--thm-colors-primary-bg-pressed, #1565c0); }

.lvgl-slider {
  width: 100%;
  accent-color: var(--thm-colors-primary-bg, #2196f3);
}

.lvgl-switch {
  width: 50px;
  height: 28px;
  accent-color: var(--thm-colors-primary-bg, #2196f3);
}

.lvgl-bar {
  width: 100%;
  height: 20px;
  accent-color: var(--thm-colors-primary-bg, #2196f3);
  border-radius: 4px;
}

.lvgl-arc {
  width: 100px;
  height: 100px;
  border: 3px solid var(--thm-colors-primary-bg, #2196f3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lvgl-image {
  background: #333;
  min-width: 32px;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lvgl-dropdown {
  background: var(--thm-colors-background, #1a1a1a);
  color: var(--thm-colors-primary-text, #fff);
  border: 1px solid #555;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 14px;
}

.lvgl-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #333;
  border-top-color: var(--thm-colors-primary-bg, #2196f3);
  border-radius: 50%;
  animation: lvgl-spin 1s linear infinite;
}

@keyframes lvgl-spin {
  to { transform: rotate(360deg); }
}

.lvgl-textarea {
  background: var(--thm-colors-background, #1a1a1a);
  color: var(--thm-colors-primary-text, #fff);
  border: 1px solid #555;
  border-radius: 4px;
  padding: 8px;
  font-size: 14px;
  resize: vertical;
}

.lvgl-checkbox {
  color: var(--thm-colors-primary-text, #fff);
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  accent-color: var(--thm-colors-primary-bg, #2196f3);
}

/* ── Entity control panel ─────────────────────────────────────────────────── */

.entity-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  border-bottom: 1px solid #1f2f4f;
}

.entity-row:last-child { border-bottom: none; }

.entity-id {
  font-family: monospace;
  font-size: 11px;
  color: #87ceeb;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.entity-state {
  font-family: monospace;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
  min-width: 36px;
  text-align: center;
}

.entity-state.on { background: #2e7d32; color: #fff; }
.entity-state.off { background: #444; color: #aaa; }

.entity-toggle-btn {
  background: #2a2a4a;
  color: #ccc;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 3px 10px;
  font-size: 11px;
  cursor: pointer;
}

.entity-toggle-btn:hover { background: #3a3a5a; }

/* ── Action log ───────────────────────────────────────────────────────────── */

.action-log {
  max-height: 250px;
  overflow-y: auto;
  font-family: monospace;
  font-size: 11px;
}

.action-entry {
  padding: 3px 0;
  border-bottom: 1px solid #1a2540;
  color: #888;
}

.action-entry .timestamp { color: #555; }
.action-entry .action-text { color: #4fc3f7; }

/* ── Zoom label ───────────────────────────────────────────────────────────── */

.sim-zoom-label {
  position: absolute;
  bottom: 8px;
  right: 12px;
  font-size: 11px;
  color: #555;
  pointer-events: none;
  user-select: none;
}
`;

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
  /** Theme data for CSS custom property generation. */
  themeData?: IRThemeData;
}

/**
 * Generate the complete simulator HTML page.
 *
 * Layout: canvas (left, resizable) + splitter + sidebar (right).
 * The display viewport is zoom-fitted into the canvas area.
 */
export function renderSimulatorPage(options: RenderPageOptions): string {
  const { nodes, width = 320, height = 480, provider, projectName = 'espcompose', themeData } = options;

  const widgetHtml = nodes.map(n => renderWidgetToHtml(n, 4)).join('\n');
  const entityIds = provider.getEntityIds();
  const entityPanelHtml = renderEntityPanel(entityIds);
  const themeCss = themeData ? generateThemeStyleBlock(themeData) : '';
  const themeScript = themeData ? generateThemeSwitchScript(themeData) : '';
  const defaultThemeName = themeData ? (themeData.themeNames[themeData.defaultIndex] ?? '') : '';

  // Build node registry for client-side reactive updates
  const nodeRegistry = buildNodeRegistry(nodes);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(projectName)} — ESPCompose Simulator</title>
  <style>${LVGL_CSS}</style>
${themeCss ? `  <style>\n${themeCss}\n  </style>` : ''}
</head>
<body>
  <div class="sim-shell">
    <!-- ── Canvas (left) ──────────────────────────────────────────────── -->
    <div class="sim-canvas" id="simCanvas">
      <div class="sim-canvas-header">
        <span class="title">ESPCompose Simulator</span>
        <span class="meta">${escapeHtml(projectName)} · ${width}×${height}</span>
      </div>
      <div class="sim-canvas-body" id="simCanvasBody">
        <div class="sim-viewport" id="simViewport"
             style="width: ${width}px; height: ${height}px;"
             ${defaultThemeName ? `data-theme="${escapeHtml(defaultThemeName)}"` : ''}>
${widgetHtml}
        </div>
        <div class="sim-zoom-label" id="simZoomLabel"></div>
      </div>
    </div>

    <!-- ── Splitter ───────────────────────────────────────────────────── -->
    <div class="sim-splitter" id="simSplitter"></div>

    <!-- ── Sidebar (right) ────────────────────────────────────────────── -->
    <div class="sim-sidebar" id="simSidebar">
      <div class="sim-panel">
        <h3>Entity Controls</h3>
        ${entityPanelHtml}
      </div>

      <div class="sim-panel" style="flex:1;display:flex;flex-direction:column;min-height:0;">
        <h3>Action Log</h3>
        <div class="action-log" id="actionLog" style="flex:1;"></div>
      </div>
    </div>
  </div>

  <script>
    // ── Zoom-fit ─────────────────────────────────────────────────────────
    var DISPLAY_W = ${width};
    var DISPLAY_H = ${height};
    var viewport = document.getElementById('simViewport');
    var canvasBody = document.getElementById('simCanvasBody');
    var zoomLabel = document.getElementById('simZoomLabel');

    function applyZoomFit() {
      var rect = canvasBody.getBoundingClientRect();
      var pad = 32; // breathing room around display
      var availW = rect.width - pad;
      var availH = rect.height - pad;
      if (availW <= 0 || availH <= 0) return;
      var scale = Math.min(availW / DISPLAY_W, availH / DISPLAY_H, 2);
      viewport.style.transform = 'scale(' + scale + ')';
      zoomLabel.textContent = Math.round(scale * 100) + '%';
    }

    window.addEventListener('resize', applyZoomFit);
    applyZoomFit();

    // ── Splitter drag ────────────────────────────────────────────────────
    (function() {
      var splitter = document.getElementById('simSplitter');
      var canvas = document.getElementById('simCanvas');
      var sidebar = document.getElementById('simSidebar');
      var dragging = false;
      var startX, startCanvasFlex, startSidebarFlex;

      splitter.addEventListener('mousedown', function(e) {
        e.preventDefault();
        dragging = true;
        splitter.classList.add('dragging');
        startX = e.clientX;
        startCanvasFlex = canvas.getBoundingClientRect().width;
        startSidebarFlex = sidebar.getBoundingClientRect().width;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
      });

      document.addEventListener('mousemove', function(e) {
        if (!dragging) return;
        var dx = e.clientX - startX;
        var newCanvasW = Math.max(200, startCanvasFlex + dx);
        var newSidebarW = Math.max(200, startSidebarFlex - dx);
        canvas.style.flex = '0 0 ' + newCanvasW + 'px';
        sidebar.style.flex = '0 0 ' + newSidebarW + 'px';
        applyZoomFit();
      });

      document.addEventListener('mouseup', function() {
        if (!dragging) return;
        dragging = false;
        splitter.classList.remove('dragging');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        applyZoomFit();
      });
    })();

    // ── Client-side simulator runtime ────────────────────────────────────
    var nodeRegistry = ${JSON.stringify(nodeRegistry)};
${themeScript}

    // Action handler — called when buttons are clicked
    window.__simAction = function(nodeId, event) {
      logAction(event + ' on ' + nodeId);
      fetch('/api/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodeId: nodeId, event: event }),
      }).then(function(r) { return r.json(); }).then(function(data) {
        if (data.stateUpdates) {
          for (var entityId in data.stateUpdates) {
            updateEntityDisplay(entityId, data.stateUpdates[entityId]);
          }
        }
      });
    };

    // Entity toggle — called from control panel
    window.__simToggle = function(entityId) {
      fetch('/api/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entityId: entityId }),
      }).then(function(r) { return r.json(); }).then(function(data) {
        updateEntityDisplay(entityId, data.state);
        logAction('toggle ' + entityId + ' → ' + data.state.state);
      });
    };

    // Sensor value change
    window.__simSetSensor = function(entityId, value) {
      fetch('/api/set-sensor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entityId: entityId, value: value }),
      }).then(function(r) { return r.json(); }).then(function(data) {
        updateEntityDisplay(entityId, data.state);
      });
    };

    function updateEntityDisplay(entityId, state) {
      var el = document.querySelector('[data-entity-state="' + entityId + '"]');
      if (el) {
        el.textContent = state.state;
        el.className = 'entity-state ' + (state.state === 'on' ? 'on' : 'off');
      }
    }

    function logAction(text) {
      var log = document.getElementById('actionLog');
      var entry = document.createElement('div');
      entry.className = 'action-entry';
      entry.innerHTML = '<span class="timestamp">' + new Date().toLocaleTimeString() + '</span> <span class="action-text">' + text + '</span>';
      log.prepend(entry);
    }

    // SSE for reactive updates from the server
    var evtSource = new EventSource('/api/updates');
    evtSource.onmessage = function(event) {
      var data = JSON.parse(event.data);
      if (data.type === 'prop-update') {
        var el = document.querySelector('[data-node-id="' + data.nodeId + '"]');
        if (el && data.prop === 'text') {
          el.textContent = data.value;
        }
      }
      if (data.type === 'entity-update') {
        updateEntityDisplay(data.entityId, data.state);
      }
    };

    // Initialize entity displays
    fetch('/api/entities').then(function(r) { return r.json(); }).then(function(entities) {
      for (var entityId in entities) {
        updateEntityDisplay(entityId, entities[entityId]);
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
