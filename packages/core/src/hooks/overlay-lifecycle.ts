import { generateDeterministicId } from '../id';
import {
  irAnimationStart,
  irDelayAction,
  irGlobalSet,
  irOverlayHide,
  irOverlayShow,
} from '../ir/action-types';
import type { IRActionNode } from '../ir/action-types';
import { irTriggerVarExpression } from '../ir/expr-builders';
import type { IRType, ScriptMode } from '../ir/types';
import type { ScriptHandle, ScriptOptions } from './useScript';
import { defineSyntheticScript } from './useScript';
import { normalizeDuration } from './global-shared';
import type { OverlayPayloadGlobalDecl } from './global-shared';
import type { OverlayController } from './useOverlay';
import {
  OVERLAY_PAYLOAD_GLOBALS,
  OVERLAY_INSTANCE_INDEX,
  OVERLAY_TEMPLATE_KEY,
  OVERLAY_Z_ORDER,
} from './useOverlay';

export interface OverlayScriptPair {
  show: ScriptHandle;
  hide: ScriptHandle;
}

export interface OverlayControllerInternalInfo {
  templateKey: string;
  instanceIndex: number;
  zOrder: number;
  payloadDecls?: OverlayPayloadGlobalDecl[];
}

export interface OverlayPayloadPlan {
  userParamDecls: Array<{ name: string; irType: IRType }>;
  globalSetActions: IRActionNode[];
  hasParams: boolean;
  userParams?: Array<{ name: string; irType: IRType }>;
}

interface OverlayControllerInternalShape {
  [OVERLAY_TEMPLATE_KEY]: string;
  [OVERLAY_INSTANCE_INDEX]: number;
  [OVERLAY_Z_ORDER]: number;
  [OVERLAY_PAYLOAD_GLOBALS]?: OverlayPayloadGlobalDecl[];
}

export function readOverlayControllerInternal(
  ctrl: OverlayController<unknown>,
): OverlayControllerInternalInfo {
  const internal = ctrl as unknown as OverlayControllerInternalShape;
  return {
    templateKey: internal[OVERLAY_TEMPLATE_KEY],
    instanceIndex: internal[OVERLAY_INSTANCE_INDEX],
    zOrder: internal[OVERLAY_Z_ORDER],
    payloadDecls: internal[OVERLAY_PAYLOAD_GLOBALS],
  };
}

export function buildOverlayPayloadPlan(
  payloadDecls?: readonly OverlayPayloadGlobalDecl[],
): OverlayPayloadPlan {
  const userParamDecls: Array<{ name: string; irType: IRType }> = [];
  const globalSetActions: IRActionNode[] = [];

  if (payloadDecls && payloadDecls.length > 0) {
    for (const param of payloadDecls) {
      userParamDecls.push({ name: param.name, irType: param.irType });
      globalSetActions.push(
        irGlobalSet(param.globalId, param.irType, irTriggerVarExpression(param.name)),
      );
    }
  }

  return {
    userParamDecls,
    globalSetActions,
    hasParams: userParamDecls.length > 0,
    userParams: userParamDecls.length > 0 ? userParamDecls : undefined,
  };
}

/**
 * Transition animation config for overlay entrance/exit.
 *
 * When provided, the lifecycle scripts inject `animation_start` actions
 * at the appropriate points (after show for entrance, before hide for exit)
 * along with a delay equal to `exitDurationMs` so the exit animation
 * completes before the widget is hidden.
 */
export interface TransitionConfig {
  enterAnimationIds: string[];
  exitAnimationIds: string[];
  exitDurationMs: number;
}

export interface OverlayLifecycleScriptOptions {
  autoHide: string | number | false;
  showIdSeed: string;
  hideIdSeed: string;
  userParams?: Array<{ name: string; irType: IRType }>;
  showScriptOptions?: ScriptOptions;
  showPrefixActions?: IRActionNode[];
  beforeAutoHideHideActions?: IRActionNode[];
  afterAutoHideActions?: IRActionNode[];
  hidePrefixActions?: (showScript: ScriptHandle) => IRActionNode[];
  hideSuffixActions?: IRActionNode[];
  ctrlBindingKey?: string;
  transition?: TransitionConfig;
}

export function buildOverlayLifecycleScripts(
  ctrl: OverlayController<unknown>,
  options: OverlayLifecycleScriptOptions,
): OverlayScriptPair {
  const internal = readOverlayControllerInternal(ctrl);
  const ctrlBindingKey = options.ctrlBindingKey ?? '__ctrl';

  const showActions: IRActionNode[] = [
    ...(options.showPrefixActions ?? []),
    irOverlayShow(
      internal.templateKey,
      internal.instanceIndex,
      internal.zOrder,
      ctrlBindingKey,
    ),
  ];

  // Entrance transition: start enter animations immediately after showing.
  if (options.transition) {
    for (const id of options.transition.enterAnimationIds) {
      showActions.push(irAnimationStart(id));
    }
  }

  if (options.autoHide !== false) {
    showActions.push(irDelayAction(normalizeDuration(options.autoHide)));
    // Exit transition: start exit animations, then wait for them to finish.
    if (options.transition) {
      for (const id of options.transition.exitAnimationIds) {
        showActions.push(irAnimationStart(id));
      }
      showActions.push(irDelayAction({ kind: 'duration', value: options.transition.exitDurationMs, unit: 'ms' }));
    }
    showActions.push(...(options.beforeAutoHideHideActions ?? []));
    showActions.push(irOverlayHide(internal.templateKey, internal.zOrder, ctrlBindingKey));
    showActions.push(...(options.afterAutoHideActions ?? []));
  }

  const showScript = defineSyntheticScript({
    id: generateDeterministicId('scr', options.showIdSeed),
    actions: showActions,
    refBindings: { [ctrlBindingKey]: ctrl },
    userParams: options.userParams,
    opts: options.showScriptOptions,
  });

  // Build hide script actions with optional exit transition.
  const hideActions: IRActionNode[] = [
    ...(options.hidePrefixActions?.(showScript) ?? []),
  ];
  if (options.transition) {
    for (const id of options.transition.exitAnimationIds) {
      hideActions.push(irAnimationStart(id));
    }
    hideActions.push(irDelayAction({ kind: 'duration', value: options.transition.exitDurationMs, unit: 'ms' }));
  }
  hideActions.push(irOverlayHide(internal.templateKey, internal.zOrder, ctrlBindingKey));
  hideActions.push(...(options.hideSuffixActions ?? []));

  const hideScript = defineSyntheticScript({
    id: generateDeterministicId('scr', options.hideIdSeed),
    actions: hideActions,
    refBindings: { [ctrlBindingKey]: ctrl },
  });

  return { show: showScript, hide: hideScript };
}

export function scriptOptionsForMode(
  mode: Exclude<ScriptMode, 'parallel'>,
  maxRuns?: number,
): ScriptOptions {
  return {
    mode,
    ...(mode === 'queued' && maxRuns != null && maxRuns > 0 ? { maxRuns } : {}),
  };
}
