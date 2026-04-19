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

import type { IRBinding, IRHAEntity, IRComponent } from '../hooks/useReactiveScope';
import type { IRReactiveNode } from '../reactive-node';
import type { SerializationCaptures } from '../serialize';
import type { IRActionNode } from './action-types';
import type {
  SemanticIR,
  IRSection,
  IRValue,
  IRThemeScopeData,
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
  components: IRComponent[];

  /** Named script definitions from useScript() */
  scripts: Array<{ id: string; then: IRActionNode[] }>;

  /** Reactive nodes registered during the render pass */
  reactiveNodes: IRReactiveNode[];

  /** Theme scope data from the theme registry */
  themeScopes?: IRThemeScopeData[];
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

  return {
    kind: 'semantic_ir' as const,
    esphome: {
      kind: 'esphome_data' as const,
      sections,
      haEntities: input.entities,
      components: input.components,
      scripts: input.scripts.map(s => ({ kind: 'script' as const, ...s })),
    },
    espcompose: {
      kind: 'espcompose_data' as const,
      reactive: {
        kind: 'reactive_data' as const,
        bindings: input.bindings,
        memos: input.reactiveNodes.filter(n => n.kind === 'memo'),
        effects: input.reactiveNodes.filter(n => n.kind === 'effect'),
      },
      themeScopes: input.themeScopes,
    },
  };
}
