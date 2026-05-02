// ────────────────────────────────────────────────────────────────────────────
// buildSemanticIR — Convert rendered config + captures to SemanticIR
//
// Takes the post-render config AND serialization captures recorded during
// the render pass. Walks the config tree, and for each value checks the
// capture maps to recover the original pre-serialization data:
//   - Scalar objects captured as IRReactiveNode → IRReactive
//   - String values captured as Ref tokens → IRRef
//   - Array/object values captured as compiled actions → IRAction
//   - Scalar objects captured as secrets → IRSecret
//   - Scalar objects captured as trigger vars → IRTriggerVar
//
// Values without captures are classified as scalars, objects, arrays, or null.
// ────────────────────────────────────────────────────────────────────────────

import type { IRBinding, IRHAEntity, ComponentRegistration } from '../hooks';
import type { IRReactiveNode } from '../reactive';
import type { SerializationCaptures } from '../serialize';
import type { IRActionNode } from './action-types';
import type { IRWidget, IRWidgetTree, IROverlayTier } from './widget-types';
import type {
  SemanticIR,
  IRSection,
  IRValue,
  IRType,
  IRComponent,
  IRThemeData,
  IRScriptParamDecl,
  ScriptMode,
  ClosureShape,
  ClosureInstance,
} from './types';
import {
  irSection,
  irScalar,
  irObject,
  irEntry,
  irArray,
  irNull,
  irReactive,
  irRef,
  irAction,
  irSecret,
  irTriggerVar,
} from './types';

// ────────────────────────────────────────────────────────────────────────────
// Duck-typed scalar detection (avoids importing yaml package)
// ────────────────────────────────────────────────────────────────────────────

function isYamlScalar(val: unknown): val is { value: unknown; tag?: string; type?: string } {
  return val != null && typeof val === 'object' && 'value' in val &&
    ('tag' in val || 'type' in val);
}

function isQuotedScalar(val: unknown): val is { value: string; type: string } {
  return (
    val != null &&
    typeof val === 'object' &&
    'type' in val &&
    'value' in val &&
    typeof (val as Record<string, unknown>).value === 'string' &&
    !('tag' in val && (val as Record<string, unknown>).tag === '!lambda') &&
    !('tag' in val && (val as Record<string, unknown>).tag === '!secret')
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Config value → IRValue conversion (with capture-based classification)
// ────────────────────────────────────────────────────────────────────────────

interface WalkContext {
  captures: SerializationCaptures;
}

function configValueToIR(val: unknown, ctx: WalkContext): IRValue {
  if (val == null) return irNull();

  // ── Check capture maps for objects (Scalars, action arrays) ────────────
  if (typeof val === 'object' && val !== null) {
    // ReactiveNode capture (serialized as !lambda Scalar)
    const reactiveNode = ctx.captures.reactives.get(val);
    if (reactiveNode) {
      return irReactive(reactiveNode);
    }

    // TriggerVar capture (serialized as !lambda Scalar)
    const triggerVar = ctx.captures.triggerVars.get(val);
    if (triggerVar) {
      return irTriggerVar(triggerVar.name);
    }

    // Secret capture (serialized as !secret Scalar)
    const secretKey = ctx.captures.secrets.get(val);
    if (secretKey != null) {
      return irSecret(secretKey);
    }

    // Action capture (serialized as resolved action array/object)
    const actionMeta = ctx.captures.actions.get(val);
    if (actionMeta) {
      return irAction(actionMeta.rawActions, actionMeta.refBindings);
    }

    // IRType value (target-agnostic type descriptor with kind: 'type')
    if ('kind' in val && (val as Record<string, unknown>).kind === 'type') {
      return val as IRType;
    }
  }

  // ── Check capture map for ref token strings ────────────────────────────
  if (typeof val === 'string') {
    if (ctx.captures.refs.has(val)) {
      return irRef(val);
    }
  }

  // ── Quoted YAML scalar (bool-like strings) ─────────────────────────────
  if (isQuotedScalar(val)) {
    return irScalar(String(val.value), true);
  }

  // ── Other YAML Scalars (passthrough from other sources) ────────────────
  if (isYamlScalar(val)) {
    return irScalar(String((val as { value: unknown }).value));
  }

  // ── Primitives ─────────────────────────────────────────────────────────
  if (typeof val === 'string') return irScalar(val);
  if (typeof val === 'number') return irScalar(val);
  if (typeof val === 'boolean') return irScalar(val);

  // ── Arrays ─────────────────────────────────────────────────────────────
  if (Array.isArray(val)) {
    return irArray(val.map(item => configValueToIR(item, ctx)));
  }

  // ── Objects ────────────────────────────────────────────────────────────
  if (typeof val === 'object') {
    return convertObject(val as Record<string, unknown>, ctx);
  }

  return irScalar(String(val));
}

function convertObject(obj: Record<string, unknown>, ctx: WalkContext): IRValue {
  const entries = Object.entries(obj).map(([key, val]) =>
    irEntry(key, configValueToIR(val, ctx)),
  );
  return irObject(entries);
}

// ────────────────────────────────────────────────────────────────────────────
// Widget tree resolution — resolve raw props through configValueToIR()
// ────────────────────────────────────────────────────────────────────────────

function resolveWidgetProps(props: Record<string, unknown>, ctx: WalkContext): Record<string, IRValue> {
  const resolved: Record<string, IRValue> = {};
  for (const [key, val] of Object.entries(props)) {
    if (val === undefined) continue;
    const irVal = configValueToIR(val, ctx);
    if (irVal.kind === 'null') continue;
    resolved[key] = irVal;
  }
  return resolved;
}

function resolveWidget(widget: RawIRWidget, ctx: WalkContext): IRWidget {
  // ecCanvas stores embedded RawIRWidget objects inside its `ec_canvas.widgets`
  // prop. Extract them as proper IRWidget children instead of flattening into IRValue.
  if (widget.kind === 'ecCanvas') {
    return resolveEcCanvasWidget(widget, ctx);
  }
  return {
    kind: widget.kind,
    id: widget.id,
    props: resolveWidgetProps(widget.props, ctx),
    children: widget.children.map(c => resolveWidget(c, ctx)),
  };
}

function resolveEcCanvasWidget(widget: RawIRWidget, ctx: WalkContext): IRWidget {
  const ecCanvasRaw = widget.props['ec_canvas'] as Record<string, unknown> | undefined;

  // Extract embedded widgets before resolution
  const embeddedWidgets: RawIRWidget[] = [];
  if (ecCanvasRaw && Array.isArray(ecCanvasRaw.widgets)) {
    embeddedWidgets.push(...(ecCanvasRaw.widgets as RawIRWidget[]));
    // Remove widgets from the raw props so they don't get flattened into IRObject
    const { widgets: _removed, ...ecCanvasWithoutWidgets } = ecCanvasRaw;
    const propsWithoutEmbeddedWidgets = { ...widget.props, ec_canvas: ecCanvasWithoutWidgets };
    return {
      kind: widget.kind,
      id: widget.id,
      props: resolveWidgetProps(propsWithoutEmbeddedWidgets, ctx),
      children: embeddedWidgets.map(w => resolveWidget(w, ctx)),
    };
  }

  return {
    kind: widget.kind,
    id: widget.id,
    props: resolveWidgetProps(widget.props, ctx),
    children: widget.children.map(c => resolveWidget(c, ctx)),
  };
}

function resolveOverlayTiers(tiers: RawIROverlayTier[], ctx: WalkContext): IROverlayTier[] {
  return tiers.map(tier => ({
    kind: 'overlay_tier' as const,
    zOrder: tier.zOrder,
    overlays: tier.overlays.map(overlay => ({
      kind: 'overlay_container' as const,
      templateKey: overlay.templateKey,
      widgets: overlay.widgets.map(w => resolveWidget(w, ctx)),
    })),
  }));
}

function resolveWidgetTree(tree: RawIRWidgetTree, ctx: WalkContext): IRWidgetTree {
  return {
    kind: 'widget_tree' as const,
    props: resolveWidgetProps(tree.props, ctx),
    pages: tree.pages.map(p => resolveWidget(p, ctx)),
    widgets: tree.widgets.map(w => resolveWidget(w, ctx)),
    overlayTiers: resolveOverlayTiers(tree.overlayTiers, ctx),
  };
}

// ────────────────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────────────────

export interface BuildSemanticIRInput {
  /** Rendered config from render() — the direct output before old IR round-trip */
  config: Record<string, unknown>;

  /** Serialization captures recorded during the render pass */
  captures: SerializationCaptures;

  /** Reactive bindings linking nodes to widget props */
  bindings: IRBinding[];

  /** HA entities for sensor imports */
  entities: IRHAEntity[];

  /** Component definitions (images, fonts) */
  components: ComponentRegistration[];

  /** Named script definitions from useScript() */
  scripts: Array<{
    id: string;
    mode?: ScriptMode;
    userParams?: IRScriptParamDecl[];
    closureShape?: ClosureShape;
    closureTable?: ClosureInstance[];
    refBindings?: Record<string, string>;
    then: IRActionNode[];
  }>;

  /** Reactive nodes registered during the render pass */
  reactiveNodes: IRReactiveNode[];

  /** Theme scope data from the theme registry */
  themes?: IRThemeData[];

  /**
   * LVGL widget trees collected during render (one per `<lvgl>` element).
   * Props are unresolved (`Record<string, unknown>`) — they will be resolved
   * through `configValueToIR()` inside `buildSemanticIR()`.
   */
  lvglTrees?: RawIRWidgetTree[];
}

/** Pre-resolution widget tree shape (props are `Record<string, unknown>`). */
export interface RawIRWidget {
  readonly kind: string;
  readonly id?: string;
  readonly props: Record<string, unknown>;
  readonly children: RawIRWidget[];
}

/** Pre-resolution widget tree shape (props are `Record<string, unknown>`). */
export interface RawIRWidgetTree {
  readonly props: Record<string, unknown>;
  readonly pages: RawIRWidget[];
  readonly widgets: RawIRWidget[];
  readonly overlayTiers: RawIROverlayTier[];
}

export interface RawIROverlayTier {
  readonly zOrder: number;
  readonly overlays: RawIROverlayContainer[];
}

export interface RawIROverlayContainer {
  readonly templateKey: string;
  readonly widgets: RawIRWidget[];
}

/**
 * Build a SemanticIR from the rendered config and serialization captures.
 *
 * The captures were recorded DURING the render pass by the serialization
 * boundary (serializeValue). They map serialized output objects back to
 * their pre-serialization sources — ReactiveNodes, Refs, compiled actions,
 * secrets, and trigger variables.
 *
 * The resulting IR is target-agnostic: no YAML tags, no C++ lambda strings,
 * no !secret scalars. Backends derive target-specific output from the
 * semantic types.
 */
export function buildSemanticIR(input: BuildSemanticIRInput): SemanticIR {
  const ctx: WalkContext = {
    captures: input.captures,
  };

  const sections: IRSection[] = Object.entries(input.config).map(([key, value]) =>
    irSection(key, configValueToIR(value, ctx)),
  );

  // Resolve LVGL widget tree props through the same capture-based pipeline
  const resolvedLvglTree = input.lvglTrees?.[0]
    ? resolveWidgetTree(input.lvglTrees[0], ctx)
    : undefined;

  // Resolve component configs — wrap raw values in IRValue
  const resolvedComponents: IRComponent[] = input.components.map(c => ({
    kind: 'component' as const,
    section: c.section,
    id: c.id,
    config: convertObject(c.config, ctx),
  }));

  return {
    kind: 'semantic_ir' as const,
    esphome: {
      kind: 'esphome_data' as const,
      sections,
      entityRegistry: {
        kind: 'entity_registry' as const,
        entities: input.entities,
      },
      componentRegistry: {
        kind: 'component_registry' as const,
        components: resolvedComponents,
      },
      scriptRegistry: {
        kind: 'script_registry' as const,
        scripts: input.scripts.map(s => ({ kind: 'script' as const, ...s })),
      },
      lvglTree: resolvedLvglTree,
    },
    espcompose: {
      kind: 'espcompose_data' as const,
      reactive: {
        kind: 'reactive_data' as const,
        bindings: input.bindings,
        memos: input.reactiveNodes.filter(n => n.kind === 'memo'),
        effects: input.reactiveNodes.filter(n => n.kind === 'effect'),
      },
      themes: input.themes,
    },
  };
}
