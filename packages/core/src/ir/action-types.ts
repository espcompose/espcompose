// ────────────────────────────────────────────────────────────────────────────
// Action IR Types — Target-agnostic action representation
//
// These types represent the semantic intent of user-written trigger handlers
// and callbacks. They describe WHAT actions to perform, not HOW to perform
// them. The lowering to target-specific formats (ESPHome YAML, simulator JS)
// happens in the respective target packages.
// ────────────────────────────────────────────────────────────────────────────

import type { ExprNode } from './expr-types.js';

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
  then: ActionNode[];
  else?: ActionNode[];
}

/** while loop action */
export interface IRWhileAction {
  kind: 'while';
  condition: IRCondition;
  then: ActionNode[];
}

/** repeat action */
export interface IRRepeatAction {
  kind: 'repeat';
  count: number;
  then: ActionNode[];
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
  themeName: string;
}

// ── Discriminated Union ────────────────────────────────────────────────────

export type ActionNode =
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
  | IRThemeSelect;

// ── Condition Types ────────────────────────────────────────────────────────

/** A lambda condition — compiled from a boolean expression to ExprNode IR */
export interface IRLambdaCondition {
  kind: 'lambda';
  /** Target-agnostic expression IR for the condition */
  exprIR: ExprNode;
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

/** Config for native actions — either a simple ID or an object with params */
export type IRActionConfig =
  | string
  | Record<string, IRActionParam | string | number | boolean>;

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

export function irIfAction(condition: IRCondition, then: ActionNode[], elseActions?: ActionNode[]): IRIfAction {
  return { kind: 'if', condition, then, ...(elseActions ? { else: elseActions } : {}) };
}

export function irWhileAction(condition: IRCondition, then: ActionNode[]): IRWhileAction {
  return { kind: 'while', condition, then };
}

export function irRepeatAction(count: number, then: ActionNode[]): IRRepeatAction {
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

export function irThemeSelect(themeName: string): IRThemeSelect {
  return { kind: 'theme_select', themeName };
}

export function irLambdaCondition(exprIR: ExprNode): IRLambdaCondition {
  return { kind: 'lambda', exprIR };
}

export function irNativeCondition(conditionKey: string, config: IRActionConfig): IRNativeCondition {
  return { kind: 'native', conditionKey, config };
}
