// ────────────────────────────────────────────────────────────────────────────
// buildSemanticIR — Convert rendered config + captures to SemanticIR
//
// Takes the post-render config AND serialization captures recorded during
// the render pass. Walks the config tree, and for each value checks the
// capture maps to recover the original pre-serialization data:
//   - Scalar objects captured as ReactiveNode → IRReactive
//   - String values captured as Ref tokens → IRRef
//   - Array/object values captured as compiled actions → IRAction
//   - Scalar objects captured as secrets → IRSecret
//   - Scalar objects captured as trigger vars → IRTriggerVar
//
// Values without captures are classified as scalars, objects, arrays, or null.
// ────────────────────────────────────────────────────────────────────────────

import type { ReactiveBinding, HAEntityRegistration, ComponentRegistration } from '../hooks/useReactiveScope';
import type { ReactiveNode } from '../reactive-node';
import type { SerializationCaptures } from '../serialize';
import type { ActionNode } from './action-types';
import type {
  SemanticIR,
  IRSection,
  IRValue,
  IRThemeData,
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
// Binding lookup index
// ────────────────────────────────────────────────────────────────────────────

function bindingKey(targetId: string, targetProp: string, part?: string, state?: string): string {
  if (part || state) {
    return `${targetId}::${part ?? ''}::${state ?? ''}::${targetProp}`;
  }
  return `${targetId}::${targetProp}`;
}

function buildBindingIndex(bindings: ReactiveBinding[]): Map<string, ReactiveBinding> {
  const index = new Map<string, ReactiveBinding>();
  for (const b of bindings) {
    index.set(bindingKey(b.targetId, b.targetProp, b.part, b.state), b);
  }
  return index;
}

// ────────────────────────────────────────────────────────────────────────────
// Config value → IRValue conversion (with capture-based classification)
// ────────────────────────────────────────────────────────────────────────────

interface WalkContext {
  captures: SerializationCaptures;
  bindingIndex: Map<string, ReactiveBinding>;
  currentWidgetId?: string;
  currentProp?: string;
  /** Current LVGL part name (snake_case) when inside a part sub-object. */
  currentPart?: string;
  /** Current LVGL state name (snake_case) when inside a state sub-object. */
  currentState?: string;
}

function configValueToIR(val: unknown, ctx: WalkContext): IRValue {
  if (val == null) return irNull();

  // ── Check capture maps for objects (Scalars, action arrays) ────────────
  if (typeof val === 'object' && val !== null) {
    // ReactiveNode capture (serialized as !lambda Scalar)
    const reactiveNode = ctx.captures.reactives.get(val);
    if (reactiveNode) {
      // Look up the binding for this reactive prop
      let binding: ReactiveBinding | undefined;
      if (ctx.currentWidgetId && ctx.currentProp) {
        const key = bindingKey(ctx.currentWidgetId, ctx.currentProp, ctx.currentPart, ctx.currentState);
        binding = ctx.bindingIndex.get(key);
      }
      return irReactive(reactiveNode, binding);
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
  const widgetId = typeof obj.id === 'string' ? obj.id : undefined;
  const childCtx: WalkContext = widgetId
    ? { ...ctx, currentWidgetId: widgetId }
    : ctx;

  const entries = Object.entries(obj).map(([key, val]) => {
    // Detect part/state sub-objects by checking if the key matches a
    // known binding pattern. We probe the binding index to see if any
    // binding uses this key as a part or state.
    let propCtx: WalkContext;
    if (val !== null && typeof val === 'object' && !Array.isArray(val) && childCtx.currentWidgetId) {
      // Check if this key is a part name (any binding has this as part)
      propCtx = inferPartState(key, childCtx);
    } else {
      propCtx = { ...childCtx, currentProp: key };
    }
    return irEntry(key, configValueToIR(val, propCtx));
  });

  return irObject(entries);
}

/**
 * Infer part/state context for a nested object key by probing the binding
 * index. If any binding uses this key as a part or state for the current
 * widget, propagate that context so reactive prop lookups use the full key.
 */
function inferPartState(key: string, parentCtx: WalkContext): WalkContext {
  const widgetId = parentCtx.currentWidgetId;
  if (!widgetId) return { ...parentCtx, currentProp: key };

  // If we're already in a part context and this key is a state
  if (parentCtx.currentPart && !parentCtx.currentState) {
    // Try: widgetId::part::state::someProp — check if any binding matches
    for (const bindKey of parentCtx.bindingIndex.keys()) {
      if (bindKey.startsWith(`${widgetId}::${parentCtx.currentPart}::${key}::`)) {
        return { ...parentCtx, currentState: key };
      }
    }
  }

  // Check if key is a part name
  if (!parentCtx.currentPart && !parentCtx.currentState) {
    for (const bindKey of parentCtx.bindingIndex.keys()) {
      if (bindKey.startsWith(`${widgetId}::${key}::`)) {
        return { ...parentCtx, currentPart: key };
      }
    }
    // Check if key is a state name (without part)
    for (const bindKey of parentCtx.bindingIndex.keys()) {
      if (bindKey.startsWith(`${widgetId}::::${key}::`)) {
        return { ...parentCtx, currentState: key };
      }
    }
  }

  return { ...parentCtx, currentProp: key };
}

// ────────────────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────────────────

export interface BuildSemanticIRInput {
  /** Rendered config from render() — the direct output before old IR round-trip */
  config: Record<string, unknown>;

  /** Serialization captures recorded during the render pass */
  captures: SerializationCaptures;

  /** Reactive bindings linking nodes to widget props (used to attach bindings to IRReactive nodes in the tree) */
  bindings: ReactiveBinding[];

  /** HA entity registrations for sensor imports */
  entities: HAEntityRegistration[];

  /** Component registrations (images, fonts) */
  components: ComponentRegistration[];

  /** Named script definitions from useScript() */
  scripts: Array<{ id: string; then: ActionNode[] }>;

  /** Reactive nodes registered during the render pass */
  reactiveNodes: ReactiveNode[];

  /** Theme data from the theme registry */
  themes?: IRThemeData;
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
  const bindingIndex = buildBindingIndex(input.bindings);

  const ctx: WalkContext = {
    captures: input.captures,
    bindingIndex,
  };

  const sections: IRSection[] = Object.entries(input.config).map(([key, value]) =>
    irSection(key, configValueToIR(value, ctx)),
  );

  return {
    esphome: {
      sections,
      haEntities: input.entities,
      components: input.components,
      scripts: input.scripts,
    },
    espcompose: {
      reactive: {
        bindings: input.bindings,
        memos: input.reactiveNodes.filter(n => n.kind === 'memo'),
        effects: input.reactiveNodes.filter(n => n.kind === 'effect'),
      },
      themes: input.themes,
    },
  };
}
