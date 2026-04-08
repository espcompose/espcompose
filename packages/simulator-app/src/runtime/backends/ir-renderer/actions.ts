import type { IRAction, IRActionNode } from '@espcompose/core/internals';
import type { RuntimeProp, ActionStep } from '../../types';
import { Scheduler } from '../../runtime/signals';
import type { IRRenderContext } from './lowering-context.js';

export function irActionToRuntimeProp(
  action: IRAction,
  ctx: IRRenderContext,
): RuntimeProp {
  const steps = interpretActionSteps(action.actions);

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
 * Convert IRActionNode[] from SemanticIR to simulator-friendly ActionStep[] format.
 * IRActionNode is the target-agnostic IR from the CLI compiler.
 */
export function interpretActionSteps(actions: IRActionNode[]): ActionStep[] {
  const steps: ActionStep[] = [];
  for (const action of actions) {
    if (action == null || typeof action !== 'object') continue;
    const node = action;

    // Check for IRActionNode format (has 'kind' property)
    if ('kind' in node) {
      switch (node.kind) {
        case 'native': {
          // Parse actionKey like 'light.toggle' into target and method
          const [target, method] = node.actionKey.split('.');
          const config = typeof node.config === 'string'
            ? { id: node.config }
            : node.config as Record<string, unknown>;
          steps.push({
            type: 'component_action',
            target: String(config.id ?? target),
            method: method ?? 'toggle',
            params: config,
          });
          break;
        }
        case 'ha_service': {
          const rawEntityId = node.data?.entity_id;
          const entityId = rawEntityId == null ? ''
            : typeof rawEntityId === 'string' ? rawEntityId
            : String((rawEntityId as { value?: unknown }).value ?? '');
          const data: Record<string, unknown> = {};
          if (node.data) {
            for (const [k, v] of Object.entries(node.data)) {
              if (typeof v !== 'object' || v === null) {
                data[k] = v;
              } else {
                data[k] = (v as { kind: string; value?: unknown }).kind === 'literal'
                  ? (v as { value: unknown }).value
                  : v;
              }
            }
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
            then: interpretActionSteps(node.then),
            else: node.else ? interpretActionSteps(node.else) : undefined,
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
      const domain = parts[0] ?? '';
      const service = parts[1] ?? '';
      const entityId = step.entityId;
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
      console.log(`[Simulator] ${step.target}.${step.method}()`);
      break;
    case 'theme_select': {
      if (ctx.themeData) {
        const idx = ctx.themeData.themeNames.indexOf(step.themeName);
        if (idx >= 0) {
          ctx.themeIndex = idx;
          console.log(`[Simulator] theme.select('${step.themeName}') → index ${idx}`);
          Scheduler.instance().flush();
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
