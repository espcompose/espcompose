// ────────────────────────────────────────────────────────────────────────────
// Action IR Types — Target-agnostic action representation
//
// These types represent the semantic intent of user-written trigger handlers
// and callbacks. They describe WHAT actions to perform, not HOW to perform
// them. The lowering to target-specific formats (ESPHome YAML)
// happens in the respective target packages.
// ────────────────────────────────────────────────────────────────────────────

import type { IRExprNode } from './expr-types.js';

// ── Action Nodes ───────────────────────────────────────────────────────────

/** A component-specific action (light.toggle, switch.turn_on, fan.turn_off, etc.) */
export interface IRNativeAction {
  kind: 'native';
  /** Action key, e.g. 'light.toggle', 'switch.turn_on' */
  actionKey: string;
  /** Action config — may be a scalar ID string, or an object with params */
  config: IRActionConfig;
}

/** A Home Assistant service call */
export interface IRHAServiceAction {
  kind: 'ha_service';
  /** Fully qualified HA action name, e.g. 'light.turn_on' */
  action: string;
  /** Optional data payload for the service call */
  data?: Record<string, IRActionParam>;
}

/** logger.log action */
export interface IRLoggerAction {
  kind: 'logger';
  message: string;
  level?: string;
}

/** delay action */
export interface IRDelayAction {
  kind: 'delay';
  /** Duration string, e.g. '500ms', '1s', '2min' */
  duration: string;
}

/** wait_until action */
export interface IRWaitUntilAction {
  kind: 'wait_until';
  condition: IRCondition;
  /** Optional timeout string, e.g. '10s' */
  timeout?: string;
}

/** if/else action */
export interface IRIfAction {
  kind: 'if';
  condition: IRCondition;
  then: IRActionNode[];
  else?: IRActionNode[];
}

/** while loop action */
export interface IRWhileAction {
  kind: 'while';
  condition: IRCondition;
  then: IRActionNode[];
}

/** repeat action */
export interface IRRepeatAction {
  kind: 'repeat';
  count: number;
  then: IRActionNode[];
}

/** script.execute action */
export interface IRScriptExecute {
  kind: 'script_execute';
  scriptId: string;
}

/** script.wait action */
export interface IRScriptWait {
  kind: 'script_wait';
  scriptId: string;
}

/** script.stop action */
export interface IRScriptStop {
  kind: 'script_stop';
  scriptId: string;
}

/** Theme selection action */
export interface IRThemeSelect {
  kind: 'theme_select';
  /** Human-readable scope name (e.g. 'espcompose:ui'). */
  scope: string;
  /** 8-char hex hash of the scope — C++ identifier fragment. */
  scopeId: string;
  themeName: string;
}

/**
 * Global variable set action.
 *
 * The compiler always emits this kind for globalHandle.set() calls.
 * The ESPHome target lowerer decides at emit time whether to generate
 * a BoundSignal write (if the global has reactive dependents) or a
 * plain globals.set: YAML action (if non-reactive).
 */
export interface IRGlobalSet {
  kind: 'global_set';
  /** Auto-generated ESPHome global ID. */
  globalId: string;
  /** C++ type of the global (e.g. 'int', 'bool', 'float', 'std::string'). */
  cppType: string;
  /** Value to set — literal, trigger var, or compiled expression. */
  value: IRActionParam | IRExprNode;
}

/** Array element set: handle.set(index, value) → vec[i] = val */
export interface IRArraySet {
  kind: 'array_set';
  globalId: string;
  cppType: string;
  index: IRActionParam | IRExprNode;
  value: IRActionParam | IRExprNode;
}

/** Array push: handle.push(value) → vec.push_back(val) */
export interface IRArrayPush {
  kind: 'array_push';
  globalId: string;
  cppType: string;
  value: IRActionParam | IRExprNode;
}

/** Array clear: handle.clear() → vec.clear() */
export interface IRArrayClear {
  kind: 'array_clear';
  globalId: string;
  cppType: string;
}

/** Popup show action — sets the mux index and shows the shared popup. */
export interface IRPopupShow {
  kind: 'popup_show';
  /** Template key identifying the shared popup definition. */
  templateKey: string;
  /** This instance's mux index (written to the mux signal on show). */
  instanceIndex: number;
  /**
   * Controller variable name — when present, templateKey and instanceIndex
   * are resolved at runtime from __refBindings[controllerRef].__templateKey
   * and __refBindings[controllerRef].__instanceIndex.
   */
  controllerRef?: string;
}

/** Popup dismiss action — hides the shared popup (not muxed). */
export interface IRPopupDismiss {
  kind: 'popup_dismiss';
  /** Template key identifying the shared popup definition. */
  templateKey: string;
  /**
   * Controller variable name — when present, templateKey is resolved at
   * runtime from __refBindings[controllerRef].__templateKey.
   */
  controllerRef?: string;
}

/** A single interpolation slot inside a lambda tagged template. */
export type IRLambdaSlot =
  | { kind: 'ref'; name: string }                         // → id(<resolved_ref_token>)
  | { kind: 'global'; id: string }                        // → id(<global_id>)
  | { kind: 'trigger_var'; varName: string }               // → raw C++ variable name
  | { kind: 'literal'; value: string | number | boolean }; // → literal C++ value

/** Inline C++ lambda action — emitted as a !lambda block in YAML. */
export interface IRLambdaAction {
  kind: 'lambda_action';
  /** Static string fragments from the tagged template (N+1 entries for N slots). */
  fragments: string[];
  /** Typed interpolation slots — interleaved with fragments to reconstruct C++ code. */
  slots: IRLambdaSlot[];
}

// ── Discriminated Union ────────────────────────────────────────────────────

export type IRActionNode =
  | IRNativeAction
  | IRHAServiceAction
  | IRLoggerAction
  | IRDelayAction
  | IRWaitUntilAction
  | IRIfAction
  | IRWhileAction
  | IRRepeatAction
  | IRScriptExecute
  | IRScriptWait
  | IRScriptStop
  | IRThemeSelect
  | IRGlobalSet
  | IRArraySet
  | IRArrayPush
  | IRArrayClear
  | IRLambdaAction
  | IRPopupShow
  | IRPopupDismiss;

// ── Condition Types ────────────────────────────────────────────────────────

/** A lambda condition — compiled from a boolean expression to IRExprNode IR */
export interface IRLambdaCondition {
  kind: 'lambda_condition';
  /** Target-agnostic expression IR for the condition */
  exprIR: IRExprNode;
}

/** A native condition (e.g. binary_sensor.is_on) */
export interface IRNativeCondition {
  kind: 'native';
  /** Condition key, e.g. 'binary_sensor.is_on' */
  conditionKey: string;
  config: IRActionConfig;
}

export type IRCondition =
  | IRLambdaCondition
  | IRNativeCondition;

// ── Action Parameter Types ─────────────────────────────────────────────────

/** A literal value — emitted directly */
export interface IRLiteralParam {
  kind: 'literal';
  value: string | number | boolean;
}

/** A trigger variable reference */
export interface IRTriggerVarParam {
  kind: 'trigger_var';
  varName: string;
}

/** A runtime expression — resolved at execution time */
export interface IRExpressionParam {
  kind: 'expression';
  /** The expression text, e.g. 'entity.__entityId__' */
  jsExpression: string;
}

export type IRActionParam =
  | IRLiteralParam
  | IRTriggerVarParam
  | IRExpressionParam;

/**
 * A nested object value inside an action config — used for actions like
 * `lvgl.widget.update` whose params include sub-part dictionaries
 * (e.g. `knob: { padding: 8 }`).  Recursive: nested dicts can themselves
 * contain primitives, params, or further nested dicts.
 */
export interface IRActionConfigDict {
  kind: 'config_dict';
  entries: Record<string, IRActionConfigValue>;
}

export type IRActionConfigValue =
  | IRActionParam
  | IRActionConfigDict
  | string
  | number
  | boolean;

/** Config for native actions — either a simple ID or an object with params */
export type IRActionConfig =
  | string
  | Record<string, IRActionConfigValue>;

// ── Constructors ───────────────────────────────────────────────────────────

export function irNativeAction(actionKey: string, config: IRActionConfig): IRNativeAction {
  return { kind: 'native', actionKey, config };
}

export function irHAServiceAction(action: string, data?: Record<string, IRActionParam>): IRHAServiceAction {
  return { kind: 'ha_service', action, ...(data ? { data } : {}) };
}

export function irLoggerAction(message: string, level?: string): IRLoggerAction {
  return { kind: 'logger', message, ...(level ? { level } : {}) };
}

export function irDelayAction(duration: string): IRDelayAction {
  return { kind: 'delay', duration };
}

export function irWaitUntilAction(condition: IRCondition, timeout?: string): IRWaitUntilAction {
  return { kind: 'wait_until', condition, ...(timeout ? { timeout } : {}) };
}

export function irIfAction(condition: IRCondition, then: IRActionNode[], elseActions?: IRActionNode[]): IRIfAction {
  return { kind: 'if', condition, then, ...(elseActions ? { else: elseActions } : {}) };
}

export function irWhileAction(condition: IRCondition, then: IRActionNode[]): IRWhileAction {
  return { kind: 'while', condition, then };
}

export function irRepeatAction(count: number, then: IRActionNode[]): IRRepeatAction {
  return { kind: 'repeat', count, then };
}

export function irScriptExecute(scriptId: string): IRScriptExecute {
  return { kind: 'script_execute', scriptId };
}

export function irScriptWait(scriptId: string): IRScriptWait {
  return { kind: 'script_wait', scriptId };
}

export function irScriptStop(scriptId: string): IRScriptStop {
  return { kind: 'script_stop', scriptId };
}

export function irThemeSelect(scope: string, scopeId: string, themeName: string): IRThemeSelect {
  return { kind: 'theme_select', scope, scopeId, themeName };
}

export function irGlobalSet(globalId: string, cppType: string, value: IRActionParam | IRExprNode): IRGlobalSet {
  return { kind: 'global_set', globalId, cppType, value };
}

export function irArraySet(globalId: string, cppType: string, index: IRActionParam | IRExprNode, value: IRActionParam | IRExprNode): IRArraySet {
  return { kind: 'array_set', globalId, cppType, index, value };
}

export function irArrayPush(globalId: string, cppType: string, value: IRActionParam | IRExprNode): IRArrayPush {
  return { kind: 'array_push', globalId, cppType, value };
}

export function irArrayClear(globalId: string, cppType: string): IRArrayClear {
  return { kind: 'array_clear', globalId, cppType };
}

export function irLambdaCondition(exprIR: IRExprNode): IRLambdaCondition {
  return { kind: 'lambda_condition', exprIR };
}

export function irLambdaAction(fragments: string[], slots: IRLambdaSlot[]): IRLambdaAction {
  return { kind: 'lambda_action', fragments, slots };
}

export function irPopupShow(templateKey: string, instanceIndex: number, controllerRef?: string): IRPopupShow {
  return { kind: 'popup_show', templateKey, instanceIndex, ...(controllerRef ? { controllerRef } : {}) };
}

export function irPopupDismiss(templateKey: string, controllerRef?: string): IRPopupDismiss {
  return { kind: 'popup_dismiss', templateKey, ...(controllerRef ? { controllerRef } : {}) };
}

