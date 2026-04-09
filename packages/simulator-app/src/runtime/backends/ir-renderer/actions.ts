import type { IRAction, IRActionNode } from '@espcompose/core/internals';
import type { RuntimeProp, ActionStep } from '../../types';
import { Scheduler } from '../../runtime/signals';
import type { IRRenderContext } from './lowering-context.js';

export function irActionToRuntimeProp(
  action: IRAction,
  ctx: IRRenderContext,
): RuntimeProp {
  const steps = interpretActionSteps(action.actions, ctx);

  const handler = async (..._args: unknown[]) => {
    for (const step of steps) {
      await executeActionStep(step, ctx);
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
export function interpretActionSteps(actions: IRActionNode[], ctx?: IRRenderContext): ActionStep[] {
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
          steps.push({
            type: 'component_action',
            target: String(config.id ?? target),
            method: method || 'toggle',
            params: config,
          });
          break;
        }
        case 'ha_service': {
          // Resolve entity_id from IRActionParam (may be literal object or plain string)
          const rawEntityId = resolveActionParam(node.data?.entity_id);
          const entityId = typeof rawEntityId === 'string' ? rawEntityId : '';

          const data: Record<string, unknown> = {};
          if (node.data) {
            for (const [k, v] of Object.entries(node.data)) {
              const resolved = resolveActionParam(v);
              if (resolved !== undefined) {
                data[k] = resolved;
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
        case 'if':
          steps.push({
            type: 'conditional',
            condition: () => true, // TODO: evaluate condition
            then: interpretActionSteps(node.then, ctx),
            else: node.else ? interpretActionSteps(node.else, ctx) : undefined,
          });
          break;
        // Ignore other action types for simulator (they'd need more complex handling)
        default:
          break;
      }
    }
  }
  return steps;
}

export async function executeActionStep(step: ActionStep, ctx: IRRenderContext): Promise<void> {
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
        ctx.provider.callService(domain, service, entityId, step.data as Record<string, unknown>);
        Scheduler.instance().flush();
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
      if (step.target === 'lvgl') {
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
