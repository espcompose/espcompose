// ────────────────────────────────────────────────────────────────────────────
// Semantic IR — target-agnostic intermediate representation
//
// Captures the FULL information from a render pass: the config tree structure
// with semantic value nodes that preserve IRReactiveNodes, Refs, compiled
// actions, and secrets — all BEFORE serialization flattens them.
//
// This IR is consumed by backends:
//   - YAML+C++ backend: produces ESPHome YAML + espcompose_bindings.h
// ────────────────────────────────────────────────────────────────────────────

import type { IRReactiveNode } from '../reactive-node';
import type { IRBinding, IRHAEntity, IRComponent } from '../hooks/useReactiveScope';
import type { IRActionNode } from './action-types';

// ────────────────────────────────────────────────────────────────────────────
// Script definition
// ────────────────────────────────────────────────────────────────────────────

export interface IRScript {
  readonly kind: 'script';
  id: string;
  then: IRActionNode[];
}

// ────────────────────────────────────────────────────────────────────────────
// Theme data (per-scope)
// ────────────────────────────────────────────────────────────────────────────

export interface IRThemeData {
  readonly kind: 'theme_data';
  /** Human-readable scope name (e.g. 'espcompose:ui'). */
  scope: string;
  /** 8-char hex hash of the scope — used as C++ identifier fragment. */
  scopeId: string;
  themeNames: string[];
  defaultIndex: number;
  /** For each signal path, ordered values across themes + value type (ExprType compatible). */
  leafData: Map<string, { values: unknown[]; valueType: string }>;
}

// ────────────────────────────────────────────────────────────────────────────
// Semantic IR root
// ────────────────────────────────────────────────────────────────────────────

/**
 * ESPHome-targeted data: config tree, HA entities, components, and scripts.
 * All of this becomes ESPHome YAML or injected YAML sections.
 */
export interface IRESPHomeData {
  readonly kind: 'esphome_data';
  /** Top-level config sections (esphome:, wifi:, lvgl:, sensor:, etc.) */
  sections: IRSection[];

  /** HA entities for auto-generated sensor imports */
  haEntities: IRHAEntity[];

  /** Component definitions (images, fonts) for injection */
  components: IRComponent[];

  /** Named script definitions from useScript() */
  scripts: IRScript[];
}

/**
 * Reactive side-channel data: bindings, memos, and effects.
 * Memos are derived values (useMemo / __espcompose.compiled).
 * Effects are side-effects (useEffect) that generate C++ on_state triggers.
 *
 * These are the authoritative sources for reactive data — hook-registered
 * nodes may not appear in the config tree.
 */
export interface IRReactiveData {
  readonly kind: 'reactive_data';
  /** Reactive bindings linking memo/effect nodes to widget props */
  bindings: IRBinding[];

  /** Memo nodes (kind === 'memo') registered during the render pass */
  memos: IRReactiveNode[];

  /** Effect nodes (kind === 'effect') registered during the render pass */
  effects: IRReactiveNode[];
}

/**
 * ESPCompose-owned data: the reactive runtime and theme system.
 * This drives C++ header generation and is target-agnostic.
 */
export interface IRESPComposeData {
  readonly kind: 'espcompose_data';
  /** Reactive bindings, memos, and effects */
  reactive: IRReactiveData;

  /** Theme data from the theme registry (undefined if no themes) */
  themes?: IRThemeData[];
}

/**
 * The complete semantic IR for a device project.
 *
 * This is the central contract between the compiler frontend (TSX → IR) and
 * target backends (esphome-target). Backends consume a
 * SemanticIR and produce target-specific output (YAML + C++ headers).
 *
 * The config tree contains semantic value nodes (IRReactive, IRRef, etc.)
 * that preserve pre-serialization data.
 */
export interface SemanticIR {
  readonly kind: 'semantic_ir';
  /** ESPHome-targeted sections, HA entities, components, and scripts */
  esphome: IRESPHomeData;

  /** ESPCompose reactive runtime and theme data */
  espcompose: IRESPComposeData;
}

// ────────────────────────────────────────────────────────────────────────────
// Config tree nodes — semantic, target-agnostic value types
// ────────────────────────────────────────────────────────────────────────────

/** A top-level config section. */
export interface IRSection {
  readonly kind: 'section';
  key: string;
  value: IRValue;
}

/**
 * Union of all IR value types in the config tree.
 *
 * Unlike the old YAML-shaped IR, these types preserve semantic information:
 * - IRReactive wraps the original IRReactiveNode (not a lambda string)
 * - IRRef wraps the original Ref object (not a token string)
 * - IRAction wraps the raw compiled action tree (not YAML-resolved actions)
 * - IRSecret wraps the secret key (not a !secret tagged scalar)
 * - IRTriggerVar wraps the trigger variable info (not a lambda string)
 */
export type IRValue =
  | IRScalar
  | IRObject
  | IRArray
  | IRNull
  | IRReactive
  | IRRef
  | IRAction
  | IRSecret
  | IRTriggerVar;

/** A literal scalar value (string, number, boolean). */
export interface IRScalar {
  kind: 'scalar';
  value: string | number | boolean;
  /** When true, the string needs special handling to avoid YAML 1.1 boolean ambiguity. */
  quoted?: boolean;
}

/** An object with ordered key-value entries. */
export interface IRObject {
  kind: 'object';
  entries: IREntry[];
}

export interface IREntry {
  readonly kind: 'entry';
  key: string;
  value: IRValue;
}

/** An array of values. */
export interface IRArray {
  kind: 'array';
  items: IRValue[];
}

/** Null / empty value. */
export interface IRNull {
  kind: 'null';
}

/**
 * A reactive binding — wraps the original IRReactiveNode directly.
 *
 * Preserves the full reactive metadata (dependencies, ExprIR, return type,
 * kind) that backends need. No target-specific encoding.
 *
 * The ESPHome backend lowers ExprIR to C++ via exprToCpp().
 */
export interface IRReactive {
  kind: 'reactive';
  /** The original IRReactiveNode instance with full metadata. */
  node: IRReactiveNode;
}

/**
 * A cross-component reference — wraps the serialized ref token.
 *
 * Backends use the token to resolve component IDs in the final output.
 */
export interface IRRef {
  kind: 'ref';
  /** The serialized token string (e.g. "r_k7m3dh9z2"). */
  token: string;
}

/**
 * A compiled action tree — wraps the raw pre-resolution action metadata.
 *
 * Preserves the action steps and ref bindings BEFORE ref tokens are
 * resolved, so backends can interpret actions semantically.
 */
export interface IRAction {
  kind: 'action';
  /** The raw compiled action tree (pre-ref-resolution). */
  actions: IRActionNode[];
  /** Variable name → Ref mappings for resolving ref references in actions. */
  refBindings?: Record<string, unknown>;
}

/**
 * A secret value — wraps the secret key.
 */
export interface IRSecret {
  kind: 'secret';
  key: string;
}

/**
 * A trigger variable reference — wraps the trigger var info.
 *
 * Represents access to a trigger-provided variable (e.g. `x` in on_value).
 */
export interface IRTriggerVar {
  kind: 'trigger_var';
  /** The variable name (e.g. "x"). */
  name: string;
}

// ────────────────────────────────────────────────────────────────────────────
// Constructors
// ────────────────────────────────────────────────────────────────────────────

export function irSection(key: string, value: IRValue): IRSection {
  return { kind: 'section', key, value };
}

export function irScalar(value: string | number | boolean, quoted?: boolean): IRScalar {
  return { kind: 'scalar', value, ...(quoted ? { quoted } : {}) };
}

export function irObject(entries: IREntry[]): IRObject {
  return { kind: 'object', entries };
}

export function irEntry(key: string, value: IRValue): IREntry {
  return { kind: 'entry', key, value };
}

export function irArray(items: IRValue[]): IRArray {
  return { kind: 'array', items };
}

export function irNull(): IRNull {
  return { kind: 'null' };
}

export function irReactive(node: IRReactiveNode): IRReactive {
  return { kind: 'reactive', node };
}

export function irRef(token: string): IRRef {
  return { kind: 'ref', token };
}

export function irAction(actions: IRActionNode[], refBindings?: Record<string, unknown>): IRAction {
  return { kind: 'action', actions, ...(refBindings ? { refBindings } : {}) };
}

export function irSecret(key: string): IRSecret {
  return { kind: 'secret', key };
}

export function irTriggerVar(name: string): IRTriggerVar {
  return { kind: 'trigger_var', name };
}

