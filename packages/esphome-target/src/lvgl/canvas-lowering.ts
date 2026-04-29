// ────────────────────────────────────────────────────────────────────────────
// ec-canvas ESPHome lowering
//
// Two responsibilities:
// 1. Extract paint scene data from the SemanticIR (before YAML lowering).
// 2. Transform ec_canvas widget entries in the lowered YAML config into
//    native ESPHome LVGL canvas widgets (after YAML lowering).
//
// In the YAML output, ec_canvas becomes a canvas widget. Paint primitives are
// emitted as lvgl.canvas.* draw actions under each canvas widget's on_boot.
// ────────────────────────────────────────────────────────────────────────────

import type { SemanticIR, IRValue, IRObject, IRArray, IRScalar } from '@espcompose/core/internals';

/**
 * A collected paint scene from an ec_canvas widget.
 * Used to emit lvgl.canvas.* draw actions.
 */
export interface EcCanvasPaintScene {
  /** Canvas widget ID. */
  canvasId: string;
  /** Background paint primitives (draw before children). */
  backgroundScene: PaintPrimitive[];
  /** Overlay paint primitives (draw after children). */
  overlayScene: PaintPrimitive[];
}

export interface PaintPrimitive {
  type: string;
  props: Record<string, unknown>;
}

// ── IR extraction (pre-lowering) ─────────────────────────────────────────

/**
 * Walk the SemanticIR and extract ec_canvas paint scene data.
 * This runs before YAML lowering and provides data for draw action emit.
 */
export function extractPaintScenesFromIR(ir: SemanticIR): EcCanvasPaintScene[] {
  const scenes: EcCanvasPaintScene[] = [];

  // Find the lvgl section
  const lvglSection = ir.esphome.sections.find(s => s.key === 'lvgl');
  if (!lvglSection || lvglSection.value.kind !== 'object') return scenes;

  const lvglObj = lvglSection.value as IRObject;

  // Walk pages
  const pagesEntry = lvglObj.entries.find(e => e.key === 'pages');
  if (pagesEntry && pagesEntry.value.kind === 'array') {
    for (const page of (pagesEntry.value as IRArray).items) {
      if (page.kind !== 'object') continue;
      const widgetsEntry = (page as IRObject).entries.find(e => e.key === 'widgets');
      if (widgetsEntry && widgetsEntry.value.kind === 'array') {
        walkIRWidgetsArray((widgetsEntry.value as IRArray).items, scenes);
      }
    }
  }

  // Walk top-level widgets
  const widgetsEntry = lvglObj.entries.find(e => e.key === 'widgets');
  if (widgetsEntry && widgetsEntry.value.kind === 'array') {
    walkIRWidgetsArray((widgetsEntry.value as IRArray).items, scenes);
  }

  return scenes;
}

function walkIRWidgetsArray(items: IRValue[], scenes: EcCanvasPaintScene[]): void {
  for (const item of items) {
    if (item.kind !== 'object') continue;
    const obj = item as IRObject;

    for (const entry of obj.entries) {
      if (entry.key === 'ec_canvas' && entry.value.kind === 'object') {
        const canvasObj = entry.value as IRObject;
        const idEntry = canvasObj.entries.find(e => e.key === 'id');
        const canvasId = (idEntry && idEntry.value.kind === 'scalar' && typeof idEntry.value.value === 'string')
          ? idEntry.value.value : 'ec_unknown';

        const bgEntry = canvasObj.entries.find(e => e.key === 'background_scene');
        const ovEntry = canvasObj.entries.find(e => e.key === 'overlay_scene');

        const bgScene = bgEntry && bgEntry.value.kind === 'array'
          ? extractPaintPrimitivesFromIR((bgEntry.value as IRArray).items)
          : [];
        const ovScene = ovEntry && ovEntry.value.kind === 'array'
          ? extractPaintPrimitivesFromIR((ovEntry.value as IRArray).items)
          : [];

        if (bgScene.length > 0 || ovScene.length > 0) {
          scenes.push({ canvasId, backgroundScene: bgScene, overlayScene: ovScene });
        }
      }

      // Recurse into nested widgets inside any widget type
      if (entry.value.kind === 'object') {
        const innerObj = entry.value as IRObject;
        const nestedWidgets = innerObj.entries.find(e => e.key === 'widgets');
        if (nestedWidgets && nestedWidgets.value.kind === 'array') {
          walkIRWidgetsArray((nestedWidgets.value as IRArray).items, scenes);
        }
      }
    }
  }
}

function extractPaintPrimitivesFromIR(items: IRValue[]): PaintPrimitive[] {
  const prims: PaintPrimitive[] = [];
  for (const item of items) {
    if (item.kind !== 'object') continue;
    const obj = item as IRObject;
    const typeEntry = obj.entries.find(e => e.key === 'type');
    if (!typeEntry || typeEntry.value.kind !== 'scalar') continue;
    const type = String(typeEntry.value.value);
    const props: Record<string, unknown> = {};
    for (const entry of obj.entries) {
      if (entry.key === 'type') continue;
      props[entry.key] = irValueToPlain(entry.value);
    }
    prims.push({ type, props });
  }
  return prims;
}

/** Recursively convert an IRValue to a plain JS value. */
function irValueToPlain(v: IRValue): unknown {
  switch (v.kind) {
    case 'scalar':
      return (v as IRScalar).value;
    case 'array':
      return (v as IRArray).items.map(irValueToPlain);
    case 'object': {
      const result: Record<string, unknown> = {};
      for (const entry of (v as IRObject).entries) {
        result[entry.key] = irValueToPlain(entry.value);
      }
      return result;
    }
    case 'null':
      return null;
    default:
      return undefined;
  }
}

// ── YAML post-processing (post-lowering) ─────────────────────────────────

/**
 * Walk the lowered YAML config and transform ec_canvas widgets into native
 * ESPHome LVGL canvas widgets.
 *
 * Modifies the config in place.
 */
export function transformEcCanvasWidgets(config: Record<string, unknown>): void {
  const lvgl = config.lvgl;
  if (!lvgl || typeof lvgl !== 'object') return;

  const lvglObj = lvgl as Record<string, unknown>;

  // Walk pages
  if (Array.isArray(lvglObj.pages)) {
    for (const page of lvglObj.pages) {
      if (page && typeof page === 'object' && 'widgets' in page) {
        transformWidgetsArray((page as Record<string, unknown>).widgets as unknown[]);
      }
    }
  }

  // Walk top-level widgets
  if (Array.isArray(lvglObj.widgets)) {
    transformWidgetsArray(lvglObj.widgets as unknown[]);
  }
}

function transformWidgetsArray(widgets: unknown[]): void {
  for (let i = 0; i < widgets.length; i++) {
    const widget = widgets[i];
    if (!widget || typeof widget !== 'object') continue;

    const widgetObj = widget as Record<string, unknown>;

    // Check if this is an ec_canvas widget
    if ('ec_canvas' in widgetObj) {
      const canvasProps = widgetObj.ec_canvas as Record<string, unknown>;

      // Remove paint scene arrays; they're emitted as lvgl.canvas.* actions.
      delete canvasProps.background_scene;
      delete canvasProps.overlay_scene;

      // Make the canvas widget background transparent so undrawn buffer
      // pixels (e.g. corners of a rounded rect) show the parent background
      // instead of black artifacts on theme changes.
      if (canvasProps.bg_opa == null) {
        canvasProps.bg_opa = 0;
      }

      // Allocate the canvas buffer as ARGB8888 so unpainted pixels carry
      // an alpha channel and composite transparently over the parent.
      if (canvasProps.transparent == null) {
        canvasProps.transparent = true;
      }

      // Transform ec_canvas → canvas (native ESPHome LVGL canvas widget)
      widgetObj.canvas = canvasProps;
      delete widgetObj.ec_canvas;
    }

    // Recursively walk nested widgets in any widget type
    for (const key of Object.keys(widgetObj)) {
      const inner = widgetObj[key];
      if (inner && typeof inner === 'object' && !Array.isArray(inner)) {
        const innerObj = inner as Record<string, unknown>;
        if (Array.isArray(innerObj.widgets)) {
          transformWidgetsArray(innerObj.widgets as unknown[]);
        }
      }
    }
  }
}

// ── lvgl.canvas action emission ──────────────────────────────────────────

type NativeAction = Record<string, Record<string, unknown>>;

export function injectEcCanvasDrawActions(
  config: Record<string, unknown>,
  scenes: EcCanvasPaintScene[],
): void {
  if (scenes.length === 0) return;

  const lvgl = config.lvgl;
  if (!lvgl || typeof lvgl !== 'object') return;
  const lvglObj = lvgl as Record<string, unknown>;

  const sceneById = new Map<string, EcCanvasPaintScene>();
  for (const scene of scenes) {
    sceneById.set(scene.canvasId, scene);
  }

  // Walk pages
  if (Array.isArray(lvglObj.pages)) {
    for (const page of lvglObj.pages) {
      if (page && typeof page === 'object' && 'widgets' in page) {
        injectDrawActionsIntoWidgets((page as Record<string, unknown>).widgets as unknown[], sceneById);
      }
    }
  }

  // Walk top-level widgets
  if (Array.isArray(lvglObj.widgets)) {
    injectDrawActionsIntoWidgets(lvglObj.widgets as unknown[], sceneById);
  }
}

function injectDrawActionsIntoWidgets(
  widgets: unknown[],
  sceneById: Map<string, EcCanvasPaintScene>,
): void {
  for (const widget of widgets) {
    if (!widget || typeof widget !== 'object') continue;
    const widgetObj = widget as Record<string, unknown>;

    if ('canvas' in widgetObj && widgetObj.canvas && typeof widgetObj.canvas === 'object') {
      const canvasProps = widgetObj.canvas as Record<string, unknown>;
      const canvasId = typeof canvasProps.id === 'string' ? canvasProps.id : null;
      if (canvasId) {
        const scene = sceneById.get(canvasId);
        if (scene) {
          const drawActions = sceneToDrawActions(scene);
          if (drawActions.length > 0) {
            const existing = canvasProps.on_boot;
            if (!existing) {
              canvasProps.on_boot = drawActions;
            } else if (Array.isArray(existing)) {
              canvasProps.on_boot = [...existing, ...drawActions];
            } else {
              canvasProps.on_boot = [existing, ...drawActions];
            }
          }
        }
      }
    }

    // Recurse into nested widgets in any widget type
    for (const key of Object.keys(widgetObj)) {
      const inner = widgetObj[key];
      if (inner && typeof inner === 'object' && !Array.isArray(inner)) {
        const innerObj = inner as Record<string, unknown>;
        if (Array.isArray(innerObj.widgets)) {
          injectDrawActionsIntoWidgets(innerObj.widgets as unknown[], sceneById);
        }
      }
    }
  }
}

function sceneToDrawActions(scene: EcCanvasPaintScene): NativeAction[] {
  const actions: NativeAction[] = [];

  // Draw in scene order.
  for (const prim of scene.backgroundScene) {
    const action = primitiveToAction(scene.canvasId, prim);
    if (action) actions.push(action);
  }
  for (const prim of scene.overlayScene) {
    const action = primitiveToAction(scene.canvasId, prim);
    if (action) actions.push(action);
  }

  return actions;
}

function primitiveToAction(canvasId: string, prim: PaintPrimitive): NativeAction | null {
  const p = prim.props;

  switch (prim.type) {
    case 'rect': {
      const cfg: Record<string, unknown> = {
        id: canvasId,
        x: numVal(p.x, 0),
        y: numVal(p.y, 0),
        width: numVal(p.width, 0),
        height: numVal(p.height, 0),
      };

      if (p.fill != null) cfg.bg_color = colorVal(p.fill);
      if (p.stroke != null) cfg.border_color = colorVal(p.stroke);
      if (p.stroke_width != null) cfg.border_width = numVal(p.stroke_width, 1);
      if (p.radius != null) cfg.radius = numVal(p.radius, 0);
      if (p.opacity != null) cfg.bg_opa = opacityVal(p.opacity);

      return { 'lvgl.canvas.draw_rectangle': cfg };
    }

    case 'line': {
      const cfg: Record<string, unknown> = {
        id: canvasId,
        points: [
          { x: numVal(p.x1, 0), y: numVal(p.y1, 0) },
          { x: numVal(p.x2, 0), y: numVal(p.y2, 0) },
        ],
      };

      if (p.stroke != null) cfg.color = colorVal(p.stroke);
      if (p.stroke_width != null) cfg.width = numVal(p.stroke_width, 1);
      if (p.opacity != null) cfg.opa = opacityVal(p.opacity);

      return { 'lvgl.canvas.draw_line': cfg };
    }

    case 'arc': {
      const cfg: Record<string, unknown> = {
        id: canvasId,
        x: numVal(p.cx, 0),
        y: numVal(p.cy, 0),
        radius: numVal(p.radius, 0),
        start_angle: numVal(p.start_angle, 0),
        end_angle: numVal(p.end_angle, 360),
      };

      if (p.stroke != null) cfg.color = colorVal(p.stroke);
      if (p.stroke_width != null) cfg.width = numVal(p.stroke_width, 1);
      if (p.rounded != null) cfg.rounded = p.rounded;
      if (p.opacity != null) cfg.opa = opacityVal(p.opacity);

      return { 'lvgl.canvas.draw_arc': cfg };
    }

    case 'polygon': {
      const cfg: Record<string, unknown> = {
        id: canvasId,
        points: Array.isArray(p.points) ? p.points : [],
      };

      if (p.fill != null) cfg.bg_color = colorVal(p.fill);
      if (p.stroke != null) cfg.border_color = colorVal(p.stroke);
      if (p.stroke_width != null) cfg.border_width = numVal(p.stroke_width, 1);
      if (p.radius != null) cfg.radius = numVal(p.radius, 0);
      if (p.opacity != null) cfg.bg_opa = opacityVal(p.opacity);

      return { 'lvgl.canvas.draw_polygon': cfg };
    }

    case 'text': {
      const cfg: Record<string, unknown> = {
        id: canvasId,
        x: numVal(p.x, 0),
        y: numVal(p.y, 0),
        max_width: numVal(p.max_width, 0),
      };

      if (p.text != null) cfg.text = p.text;
      if (p.font != null) cfg.font = p.font;
      if (p.fill != null) cfg.color = colorVal(p.fill);
      if (p.text_align != null) cfg.align = p.text_align;
      if (p.letter_spacing != null) cfg.letter_space = numVal(p.letter_spacing, 0);
      if (p.line_spacing != null) cfg.line_space = numVal(p.line_spacing, 0);
      if (p.opacity != null) cfg.opa = opacityVal(p.opacity);

      return { 'lvgl.canvas.draw_text': cfg };
    }

    case 'image': {
      const cfg: Record<string, unknown> = {
        id: canvasId,
        x: numVal(p.x, 0),
        y: numVal(p.y, 0),
      };

      if (p.src != null) cfg.src = p.src;
      if (p.rotation != null) cfg.rotation = numVal(p.rotation, 0);
      if (p.scale != null) cfg.scale = numVal(p.scale, 256);
      if (p.scale_x != null) cfg.scale_x = numVal(p.scale_x, 256);
      if (p.scale_y != null) cfg.scale_y = numVal(p.scale_y, 256);
      if (p.skew_x != null) cfg.skew_x = numVal(p.skew_x, 0);
      if (p.skew_y != null) cfg.skew_y = numVal(p.skew_y, 0);
      if (p.pivot_x != null) cfg.pivot_x = numVal(p.pivot_x, 0);
      if (p.pivot_y != null) cfg.pivot_y = numVal(p.pivot_y, 0);
      if (p.opacity != null) cfg.opa = opacityVal(p.opacity);

      return { 'lvgl.canvas.draw_image': cfg };
    }

    default:
      return null;
  }
}

function colorVal(v: unknown): string | number {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') {
    if (v.startsWith('#')) return `0x${v.slice(1)}`;
    return v;
  }
  return '0x000000';
}

function numVal(v: unknown, fallback: number): number {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') {
    const n = Number(v);
    if (!isNaN(n)) return n;
  }
  return fallback;
}

function opacityVal(v: unknown): number {
  if (typeof v === 'number') {
    if (v >= 0 && v <= 1) return Math.round(v * 255);
    return Math.max(0, Math.min(255, Math.round(v)));
  }
  return 255;
}
