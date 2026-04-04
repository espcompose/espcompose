// ────────────────────────────────────────────────────────────────────────────
// Semantic IR — target-agnostic intermediate representation
//
// Captures the FULL information from a render pass: the config tree structure
// with semantic value nodes that preserve ReactiveNodes, Refs, compiled
// actions, and secrets — all BEFORE serialization flattens them.
//
// This IR is consumed by backends:
//   - YAML+C++ backend: produces ESPHome YAML + espcompose_bindings.h
//   - Simulator backend: produces HTML+JS for browser preview
// ────────────────────────────────────────────────────────────────────────────

import type { ReactiveNode } from '../reactive-node';
import type { ReactiveBinding, HAEntityRegistration, ComponentRegistration } from '../hooks/useReactiveScope';
import type { ActionNode } from './action-types';

// ────────────────────────────────────────────────────────────────────────────
// Script definition (re-declared here to avoid circular imports with hooks)
// ────────────────────────────────────────────────────────────────────────────

export interface IRScriptDefinition {
  id: string;
  then: ActionNode[];
}

// ────────────────────────────────────────────────────────────────────────────
// Theme data
// ────────────────────────────────────────────────────────────────────────────

export interface IRThemeData {
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
  /** Top-level config sections (esphome:, wifi:, lvgl:, sensor:, etc.) */
  sections: IRSection[];

  /** HA entity registrations for auto-generated sensor imports */
  haEntities: HAEntityRegistration[];

  /** Component registrations (images, fonts) for injection */
  components: ComponentRegistration[];

  /** Named script definitions from useScript() */
  scripts: IRScriptDefinition[];
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
  /** Reactive bindings linking memo/effect nodes to widget props */
  bindings: ReactiveBinding[];

  /** Memo nodes (kind === 'memo') registered during the render pass */
  memos: ReactiveNode[];

  /** Effect nodes (kind === 'effect') registered during the render pass */
  effects: ReactiveNode[];
}

/**
 * ESPCompose-owned data: the reactive runtime and theme system.
 * This drives C++ header generation and is target-agnostic.
 */
export interface IRESPComposeData {
  /** Reactive bindings, memos, and effects */
  reactive: IRReactiveData;

  /** Theme data from the theme registry (undefined if no themes) */
  themes?: IRThemeData;
}

/**
 * The complete semantic IR for a device project.
 *
 * This is the central contract between the compiler frontend (TSX → IR) and
 * target backends (target-esphome, target-simulator). Backends consume a
 * SemanticIR and produce target-specific output (YAML + C++ headers, or
 * RuntimeNode[] + HTML for the browser simulator).
 *
 * The config tree contains semantic value nodes (IRReactive, IRRef, etc.)
 * that preserve pre-serialization data. Use collectFromIR() to extract
 * reactive nodes and bindings from the tree.
 */
export interface SemanticIR {
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
  key: string;
  value: IRValue;
}

/**
 * Union of all IR value types in the config tree.
 *
 * Unlike the old YAML-shaped IR, these types preserve semantic information:
 * - IRReactive wraps the original ReactiveNode (not a lambda string)
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
 * A reactive binding — wraps the original ReactiveNode directly.
 *
 * Preserves the full reactive metadata (dependencies, ExprIR, return type,
 * kind) that backends need. No target-specific encoding.
 *
 * The ESPHome backend lowers ExprIR to C++ via exprToCpp().
 * The simulator backend lowers ExprIR to JS via exprToJs().
 */
export interface IRReactive {
  kind: 'reactive';
  /** The original ReactiveNode instance with full metadata. */
  node: ReactiveNode;
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
  actions: ActionNode[];
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
  return { key, value };
}

export function irScalar(value: string | number | boolean, quoted?: boolean): IRScalar {
  return { kind: 'scalar', value, ...(quoted ? { quoted } : {}) };
}

export function irObject(entries: IREntry[]): IRObject {
  return { kind: 'object', entries };
}

export function irEntry(key: string, value: IRValue): IREntry {
  return { key, value };
}

export function irArray(items: IRValue[]): IRArray {
  return { kind: 'array', items };
}

export function irNull(): IRNull {
  return { kind: 'null' };
}

export function irReactive(node: ReactiveNode): IRReactive {
  return { kind: 'reactive', node };
}

export function irRef(token: string): IRRef {
  return { kind: 'ref', token };
}

export function irAction(actions: ActionNode[], refBindings?: Record<string, unknown>): IRAction {
  return { kind: 'action', actions, ...(refBindings ? { refBindings } : {}) };
}

export function irSecret(key: string): IRSecret {
  return { kind: 'secret', key };
}

export function irTriggerVar(name: string): IRTriggerVar {
  return { kind: 'trigger_var', name };
}

// ────────────────────────────────────────────────────────────────────────────
// Type guards
// ────────────────────────────────────────────────────────────────────────────

export function isIRScalar(v: IRValue): v is IRScalar { return v.kind === 'scalar'; }
export function isIRObject(v: IRValue): v is IRObject { return v.kind === 'object'; }
export function isIRArray(v: IRValue): v is IRArray { return v.kind === 'array'; }
export function isIRNull(v: IRValue): v is IRNull { return v.kind === 'null'; }
export function isIRReactive(v: IRValue): v is IRReactive { return v.kind === 'reactive'; }
export function isIRRef(v: IRValue): v is IRRef { return v.kind === 'ref'; }
export function isIRAction(v: IRValue): v is IRAction { return v.kind === 'action'; }
export function isIRSecret(v: IRValue): v is IRSecret { return v.kind === 'secret'; }
export function isIRTriggerVar(v: IRValue): v is IRTriggerVar { return v.kind === 'trigger_var'; }
