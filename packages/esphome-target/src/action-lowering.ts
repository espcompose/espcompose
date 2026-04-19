// ────────────────────────────────────────────────────────────────────────────
// Action Tree Lowering — IRActionNode[] → ESPHome YAML config
//
// Converts target-agnostic IRActionNode nodes to ESPHome-specific YAML config
// objects. This is the ESPHome backend for action IR.
// ────────────────────────────────────────────────────────────────────────────

import type {
  IRActionNode,
  IRActionConfig,
  IRActionParam,
  IRCondition,
} from '@espcompose/core/internals';
import { exprToCpp, type CppLoweringContext } from './expr-to-cpp.js';

// ── JSON-safe lambda marker ─────────────────────────────────────────────
// Lowered actions are embedded in source via JSON.stringify (in the script
// transformer), so we use a plain marker object instead of a YAML Scalar.
// The serialiser restores these to !lambda scalars at consumption time.
export interface LambdaMarker { __lambda__: string }
function lambdaMarker(code: string): LambdaMarker { return { __lambda__: code }; }

// ── JSON-safe expression marker ─────────────────────────────────────────
// Similar to LambdaMarker, but for JS expressions that must be emitted
// as raw code rather than JSON-stringified values. The script-transformer
// replaces these markers with the actual expression text.
export interface ExpressionMarker { __expression__: string }
function expressionMarker(expr: string): ExpressionMarker { return { __expression__: expr }; }

// ── Lowering ───────────────────────────────────────────────────────────────

/**
 * Lower an IRActionParam to its YAML-ready value.
 * Also handles already-resolved primitive values (e.g., expression params
 * that were resolved at runtime via serializeWithExpressions).
 */
function lowerParam(param: IRActionParam | string | number | boolean): unknown {
  if (typeof param !== 'object' || param === null) return param;
  switch (param.kind) {
    case 'literal':
      return param.value;
    case 'trigger_var':
      return lambdaMarker(`return ${param.varName};`);
    case 'expression':
      return expressionMarker(param.jsExpression);
  }
}

/**
 * Lower an IRActionConfig to its YAML-ready value.
 */
function lowerConfig(config: IRActionConfig): unknown {
  if (typeof config === 'string') {
    return config;
  }
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(config)) {
    if (typeof value === 'object' && value !== null && 'kind' in value) {
      result[key] = lowerParam(value as IRActionParam);
    } else {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Create an empty lowering context for condition expressions.
 * Action conditions don't use signals/memos/slots — they only reference
 * trigger variables which compile to simple C++ identifiers.
 */
function createConditionLoweringContext(): CppLoweringContext {
  return {
    signalNames: new Map(),
    memoNames: new Map(),
    slotExprs: new Map(),
    entityComponentIds: new Map(),
    themeVarNames: new Map(),
  };
}

/**
 * Lower an IRCondition to ESPHome condition config.
 */
function lowerCondition(condition: IRCondition): unknown {
  switch (condition.kind) {
    case 'lambda': {
      const ctx = createConditionLoweringContext();
      const cppExpr = exprToCpp(condition.exprIR, ctx);
      return lambdaMarker(`return ${cppExpr};`);
    }
    case 'native':
      return { [condition.conditionKey]: lowerConfig(condition.config) };
  }
}

/**
 * Lower a single IRActionNode to its ESPHome YAML-ready config object.
 */
function lowerAction(action: IRActionNode): unknown {
  switch (action.kind) {
    case 'native':
      return { [action.actionKey]: lowerConfig(action.config) };

    case 'ha_service': {
      const serviceConfig: Record<string, unknown> = { action: action.action };
      if (action.data) {
        const staticData: Record<string, unknown> = {};
        const templateData: Record<string, string> = {};
        const variables: Record<string, unknown> = {};

        for (const [key, param] of Object.entries(action.data)) {
          if (typeof param === 'object' && param !== null && param.kind === 'trigger_var') {
            // Dynamic value: use variables + data_template
            variables[param.varName] = lambdaMarker(`return ${param.varName};`);
            templateData[key] = `{{ ${param.varName} }}`;
          } else {
            staticData[key] = lowerParam(param as IRActionParam);
          }
        }

        if (Object.keys(staticData).length > 0) {
          serviceConfig.data = staticData;
        }
        if (Object.keys(templateData).length > 0) {
          serviceConfig.data_template = templateData;
        }
        if (Object.keys(variables).length > 0) {
          serviceConfig.variables = variables;
        }
      }
      return { 'homeassistant.action': serviceConfig };
    }

    case 'logger':
      if (action.level) {
        return { 'logger.log': { format: action.message, level: action.level } };
      }
      return { 'logger.log': action.message };

    case 'delay':
      return { delay: action.duration };

    case 'wait_until': {
      const config: Record<string, unknown> = {
        condition: lowerCondition(action.condition),
      };
      if (action.timeout) {
        config.timeout = action.timeout;
      }
      return { wait_until: config };
    }

    case 'if': {
      const config: Record<string, unknown> = {
        condition: lowerCondition(action.condition),
        then: lowerActionTree(action.then),
      };
      if (action.else) {
        config.else = lowerActionTree(action.else);
      }
      return { if: config };
    }

    case 'while':
      return {
        while: {
          condition: lowerCondition(action.condition),
          then: lowerActionTree(action.then),
        },
      };

    case 'repeat':
      return {
        repeat: {
          count: action.count,
          then: lowerActionTree(action.then),
        },
      };

    case 'script_execute':
      return { 'script.execute': { id: action.scriptId } };

    case 'script_wait':
      return { 'script.wait': { id: action.scriptId } };

    case 'script_stop':
      return { 'script.stop': { id: action.scriptId } };

    case 'theme_select':
      return { lambda: lambdaMarker(`espcompose::select_theme_${action.scopeId}("${escapeStringForCpp(action.themeName)}");`) };
  }
}

/**
 * Lower an array of IRActionNode nodes to ESPHome YAML-ready config objects.
 *
 * Each action becomes one entry in an ESPHome action list (the `then:` array
 * in triggers, scripts, etc.).
 */
export function lowerActionTree(actions: IRActionNode[]): unknown[] {
  return actions.map(lowerAction);
}

/**
 * Escape a string for embedding in C++ code.
 */
export function escapeStringForCpp(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}
