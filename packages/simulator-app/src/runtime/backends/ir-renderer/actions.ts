import type { IRAction, IRActionNode, IRCondition } from '@espcompose/core/internals';
import type { RuntimeProp, ActionStep } from '../../types';
import { Scheduler } from '../../runtime/signals';
import { exprToJs } from '../expr-to-js.js';
import type { IRRenderContext } from './lowering-context.js';
import { buildJsLoweringContext } from './lowering-context.js';

export function irActionToRuntimeProp(
  action: IRAction,
  ctx: IRRenderContext,
): RuntimeProp {
  const steps = interpretActionSteps(action.actions, ctx, action.refBindings);

  const handler = async (...args: unknown[]) => {
    // Build trigger variables map (convention: first arg is trigger var 'x')
    const triggerVars: Record<string, unknown> = {};
    if (args.length > 0) triggerVars['x'] = args[0];

    for (const step of steps) {
      await executeActionStep(step, ctx, triggerVars);
    }
  };

  return {
    kind: 'action',
    handler,
    meta: steps,
  };
}

/**
 * Resolve an IRActionParam to a plain JS value.
 *
 * IRActionParam can be:
 *   - `{ kind: 'literal', value: 'light.office' }` → return the value directly
 *   - `{ kind: 'expression', jsExpression: '...' }` → not evaluatable in simulator; return empty
 *   - a plain string (legacy/pre-resolved) → return as-is
 */
function resolveActionParam(param: unknown): unknown {
  if (param == null) return undefined;
  if (typeof param === 'string' || typeof param === 'number' || typeof param === 'boolean') return param;
  if (typeof param === 'object' && 'kind' in param) {
    const p = param as { kind: string; value?: unknown; jsExpression?: string };
    if (p.kind === 'literal') return p.value;
    if (p.kind === 'expression') {
      // Expression params reference runtime JS variables (e.g. `props.binding.__entityId__`).
      // These are resolved during the compile-time execute phase and embedded as literals
      // in the SemanticIR. If we still see an expression here, it means it wasn't resolved.
      // Log a warning and return undefined.
      console.warn(`[Simulator] Unresolved expression param: ${p.jsExpression}`);
      return undefined;
    }
    if (p.kind === 'trigger_var') return undefined;
  }
  return undefined;
}

/**
 * Convert IRActionNode[] from SemanticIR to simulator-friendly ActionStep[] format.
 * IRActionNode is the target-agnostic IR from the CLI compiler.
 */
export function interpretActionSteps(
  actions: IRActionNode[],
  ctx?: IRRenderContext,
  refBindings?: Record<string, unknown>,
): ActionStep[] {
  const steps: ActionStep[] = [];
  for (const action of actions) {
    if (action == null || typeof action !== 'object') continue;
    const node = action;

    // Check for IRActionNode format (has 'kind' property)
    if ('kind' in node) {
      switch (node.kind) {
        case 'native': {
          // Parse actionKey like 'light.toggle' or 'lvgl.page.next'
          const parts = node.actionKey.split('.');
          const target = parts[0];
          const method = parts.slice(1).join('.');
          const config = typeof node.config === 'string'
            ? { id: node.config }
            : node.config as Record<string, unknown>;
          const resolvedConfig = resolveRefBindingsInValue(config, refBindings) as Record<string, unknown>;
          steps.push({
            type: 'component_action',
            target: String(resolvedConfig.id ?? target),
            method: method || 'toggle',
            params: resolvedConfig,
          });
          break;
        }
        case 'ha_service': {
          const resolvedNodeData = resolveRefBindingsInValue(node.data, refBindings) as Record<string, unknown> | undefined;
          // Resolve entity_id from IRActionParam (may be literal object or plain string)
          const rawEntityId = resolveActionParam(resolvedNodeData?.entity_id);
          const entityId = typeof rawEntityId === 'string' ? rawEntityId : '';

          const data: Record<string, unknown> = {};
          const rawParams: Record<string, unknown> = {};
          if (resolvedNodeData) {
            for (const [k, v] of Object.entries(resolvedNodeData)) {
              const resolved = resolveActionParam(v);
              if (resolved !== undefined) {
                data[k] = resolved;
              }
              // Preserve trigger_var params for runtime resolution
              if (typeof v === 'object' && v !== null && 'kind' in v && (v as { kind: string }).kind === 'trigger_var') {
                rawParams[k] = v;
              }
            }
          }
          if (entityId) {
            data.entity_id = entityId;
          }
          steps.push({
            type: 'ha_service',
            action: node.action,
            entityId,
            data,
            rawParams: Object.keys(rawParams).length > 0 ? rawParams : undefined,
          });
          break;
        }
        case 'delay':
          steps.push({ type: 'delay', duration: node.duration });
          break;
        case 'logger':
          steps.push({
            type: 'log',
            message: node.message,
            level: node.level,
          });
          break;
        case 'script_execute':
          steps.push({
            type: 'component_action',
            target: node.scriptId,
            method: 'execute',
          });
          break;
        case 'theme_select':
          steps.push({
            type: 'theme_select',
            themeName: node.themeName,
          });
          break;
        case 'if': {
          const conditionFn = evaluateCondition(node.condition, ctx);
          steps.push({
            type: 'conditional',
            condition: conditionFn,
            then: interpretActionSteps(node.then, ctx, refBindings),
            else: node.else ? interpretActionSteps(node.else, ctx, refBindings) : undefined,
          });
          break;
        }
        // Ignore other action types for simulator (they'd need more complex handling)
        default:
          break;
      }
    }
  }
  return steps;
}

function resolveRefBindingsInValue(
  value: unknown,
  refBindings?: Record<string, unknown>,
): unknown {
  if (!refBindings || value === null || value === undefined) return value;
  if (typeof value === 'string') {
    const bound = refBindings[value];
    if (bound !== undefined) {
      if (typeof bound === 'string') return bound;
      if (typeof bound === 'object' && bound !== null && 'toString' in bound) {
        return bound.toString();
      }
    }
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(item => resolveRefBindingsInValue(item, refBindings));
  }
  if (typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = resolveRefBindingsInValue(v, refBindings);
    }
    return out;
  }
  return value;
}

export async function executeActionStep(step: ActionStep, ctx: IRRenderContext, triggerVars?: Record<string, unknown>): Promise<void> {
  switch (step.type) {
    case 'ha_service': {
      const parts = step.action.split('.');
      let domain = parts[0] ?? '';
      const service = parts[1] ?? '';
      const entityId = step.entityId;
      // homeassistant.* actions are domain-agnostic (from dynamic useHAEntity bindings).
      // Resolve the actual domain from the entity_id (e.g. 'light.office' → 'light').
      if (domain === 'homeassistant' && entityId) {
        domain = entityId.split('.')[0] ?? domain;
      }
      if (domain && service && entityId) {
        // Resolve trigger_var params at execution time
        const resolvedData = { ...step.data };
        if (step.rawParams && triggerVars) {
          for (const [k, v] of Object.entries(step.rawParams)) {
            const param = v as { kind: string; varName?: string; name?: string };
            const varName = param.varName ?? param.name;
            if (param.kind === 'trigger_var' && varName && varName in triggerVars) {
              resolvedData[k] = triggerVars[varName];
            }
          }
        }
        ctx.onEntityInteraction(domain, service, entityId, resolvedData);
      }
      break;
    }
    case 'delay': {
      const ms = parseDelay(step.duration);
      if (ms > 0) await new Promise(resolve => setTimeout(resolve, Math.min(ms, 100)));
      break;
    }
    case 'log':
      console.log(`[Simulator] ${step.level}: ${step.message}`);
      break;
    case 'component_action':
      if (step.method === 'page.show') {
        const pageId = typeof step.params?.id === 'string' ? step.params.id : step.target;
        navigateToPageById(ctx, pageId);
      } else if (step.target === 'lvgl') {
        if (step.method === 'page.next') {
          navigatePage(ctx, 1);
        } else if (step.method === 'page.previous') {
          navigatePage(ctx, -1);
        } else {
          console.log(`[Simulator] ${step.target}.${step.method}()`);
        }
      } else {
        console.log(`[Simulator] ${step.target}.${step.method}()`);
      }
      break;
    case 'theme_select': {
      if (ctx.themeData) {
        const idx = ctx.themeData.themeNames.indexOf(step.themeName);
        if (idx >= 0) {
          ctx.themeIndex = idx;
          console.log(`[Simulator] theme.select('${step.themeName}') → index ${idx}`);
          Scheduler.instance().flush();
          ctx.requestRerender?.();
        } else {
          console.warn(`[Simulator] Unknown theme name: '${step.themeName}'. Available: ${ctx.themeData.themeNames.join(', ')}`);
        }
      }
      break;
    }
  }
}

function parseDelay(duration: string): number {
  const match = duration.match(/^(\d+)(ms|s|min)?$/);
  if (!match) return 0;
  const val = parseInt(match[1], 10);
  switch (match[2]) {
    case 's': return val * 1000;
    case 'min': return val * 60000;
    default: return val;
  }
}

/**
 * Evaluate an IR condition into a boolean-returning function.
 * Lambda conditions use exprToJs for evaluation; native conditions
 * are not yet supported and default to true.
 */
function evaluateCondition(condition: IRCondition, ctx?: IRRenderContext): () => boolean {
  if (condition.kind === 'lambda' && ctx) {
    try {
      const jsCtx = buildJsLoweringContext(condition.exprIR, ctx);
      const evaluator = exprToJs(condition.exprIR, jsCtx);
      return () => Boolean(evaluator());
    } catch {
      console.warn('[Simulator] Failed to compile conditional expression, defaulting to true');
      return () => true;
    }
  }
  // Native conditions (e.g. binary_sensor.is_on) are not evaluatable in the simulator
  return () => true;
}

/**
 * Navigate to the next or previous non-skip page.
 * Direction: +1 for next, -1 for previous.
 */
function navigatePage(ctx: IRRenderContext, direction: 1 | -1): void {
  if (ctx.pageCount === 0) return;

  let next = ctx.currentPageIndex;
  for (let i = 0; i < ctx.pageCount; i++) {
    next = (next + direction + ctx.pageCount) % ctx.pageCount;
    if (!ctx.skipPages.has(next)) break;
  }

  if (next !== ctx.currentPageIndex) {
    ctx.currentPageIndex = next;
    ctx.requestRerender?.();
  }
}

/**
 * Navigate to a specific page by its LVGL page ID/token.
 */
function navigateToPageById(ctx: IRRenderContext, pageId: string): void {
  const targetIndex = ctx.pageIdToIndex.get(pageId);
  if (targetIndex === undefined) {
    console.warn(`[Simulator] Unknown page id for page.show: '${pageId}'`);
    return;
  }
  if (targetIndex !== ctx.currentPageIndex) {
    ctx.currentPageIndex = targetIndex;
    ctx.requestRerender?.();
  }
}
