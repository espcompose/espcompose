// ────────────────────────────────────────────────────────────────────────────
// IRWidget — target-neutral widget tree IR
//
// Produced by core's render pass (lvgl.ts / ec-canvas-serialize.ts) and
// consumed by the lowering target's widget emitter (e.g. esphome-target's
// `lvgl-yaml-emitter.ts`). All identifiers and prop names are semantic
// camelCase. The target owns the YAML key shape, snake_case conversion, and
// any container-shape conventions (e.g. ESPHome's list-of-single-key-dict
// widgets pattern, `top_layer.widgets`, overlay container `obj` wrappers).
//
// No ESPHome / LVGL C-token / snake_case vocabulary lives in this file.
// ────────────────────────────────────────────────────────────────────────────

import type { IRValue } from './types';

/**
 * A semantic widget node. `kind` is a camelCase widget identifier
 * (e.g. `'button'`, `'label'`, `'page'`, `'image'`, `'switch'`,
 * `'ecCanvas'`). `props` are camelCase semantic values resolved through
 * `configValueToIR()` — every value is a typed `IRValue` node.
 */
export interface IRWidget {
  /** Semantic widget kind (camelCase, no `lvgl-` prefix, no snake_case). */
  readonly kind: string;
  /** Explicit or auto-assigned id. May be omitted for purely cosmetic nodes. */
  readonly id?: string;
  /** Semantic camelCase props — all values are typed `IRValue` nodes. */
  readonly props: Record<string, IRValue>;
  /** Nested child widgets. */
  readonly children: IRWidget[];
}

/**
 * An overlay subtree captured from a single overlay definition during render.
 * Only instance #0's widgets are materialised here; other instances are
 * tracked separately on the overlay definition for the codegen mux pass.
 */
export interface IROverlayContainer {
  readonly kind: 'overlay_container';
  /** Stable template key for the overlay definition. */
  readonly templateKey: string;
  /** Instance-0 widgets to render inside the overlay container. */
  readonly widgets: IRWidget[];
}

/**
 * A z-order tier groups overlay containers that share a `zOrder` value.
 * The target lowers each tier to its native overlay container shape.
 */
export interface IROverlayTier {
  readonly kind: 'overlay_tier';
  /** Deterministic tier key (e.g. 'tier_abc123'). */
  readonly tierKey: string;
  /** Ascending z-order. */
  readonly zOrder: number;
  /** Overlay containers at this tier. */
  readonly overlays: IROverlayContainer[];
  /**
   * Optional wrapper widget emitted once per tier (e.g. a shared backdrop).
   * Shown when any overlay in the tier is visible; hidden when all are dismissed.
   */
  readonly wrapperWidget?: IRWidget;
}

// NOTE: IRWidgetTree has been replaced by IRUIRegistry in ./types.ts.
// IRUIRegistry flattens the widget tree into the top-level SemanticIR with
// renamed fields: props → config, overlayTiers → overlays.
