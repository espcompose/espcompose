// ────────────────────────────────────────────────────────────────────────────
// useAttachedTrigger — attach trigger actions to a referenced widget
//
// Allows library components to contribute trigger actions to widgets they
// reference but don't own. The contributed actions are merged into the
// target widget's trigger prop during buildSemanticIR().
//
// Example:
//   const pageRef = useRef<LvPageType>();
//   useAttachedTrigger(pageRef, 'onShow', () => { activeSignal.set(0); });
//
// The handler arrow function is compiled by the Script Transformer (same as
// JSX trigger props and useScript() bodies). At runtime, this hook reads the
// compiled action metadata and registers it as a ComponentContribution.
// ────────────────────────────────────────────────────────────────────────────

import type { TriggerHandler } from '../types';
import type { IRActionNode } from '../ir/action-types';
import { assertHookContext, getCurrentHookPath } from './useState';
import { registerContribution } from './useContributionScope';
import { resolveRefBindingsInActions } from '../serialize';
import { resolveCompiledActions } from '../actions';

/**
 * Attach compiled trigger actions to a widget identified by `targetRef`.
 *
 * The `event` parameter is a camelCase trigger prop name (e.g. `'onShow'`,
 * `'onLoad'`, `'onPress'`). The `handler` is a trigger arrow function whose
 * body has been compiled to an action tree by the Script Transformer.
 *
 * Contributed actions are appended AFTER any user-authored actions on the
 * same trigger, maintaining deterministic ordering via `sourceId`.
 *
 * @param targetRef  Ref to the target widget (must be assigned to a widget's `ref` prop)
 * @param event      camelCase trigger prop name on the target widget
 * @param handler    Compiled trigger handler arrow function
 */
export function useAttachedTrigger<T = void>(
  targetRef: { toString(): string },
  event: string,
  handler: TriggerHandler<T>,
): void {
  assertHookContext('useAttachedTrigger()');

  // The Script Transformer attaches __compiledActions to trigger handler
  // functions during the AST compilation phase.
  const fn = handler as unknown as {
    __compiledActions?: IRActionNode[];
    __refBindings?: Record<string, unknown>;
  };

  if (!fn.__compiledActions) {
    throw new Error(
      `[espcompose] useAttachedTrigger(): handler has no compiled actions.\n` +
      `  This means the Script Transformer did not recognize this call site.\n` +
      `  Ensure the handler is a direct arrow function expression:\n` +
      `    useAttachedTrigger(ref, 'onShow', () => { ... })\n` +
      `  Dynamic function references are not supported.`,
    );
  }

  const sourceId = getCurrentHookPath();

  // Resolve deferred IR references (controller method calls, overlay
  // controller refs, script handle closure indices) and clean refBindings.
  resolveCompiledActions(fn.__compiledActions, fn.__refBindings);

  // Resolve bindings: replace ref name strings with tokens and
  // expr:closure_read nodes with concrete literal values.
  const resolvedActions = fn.__refBindings
    ? resolveRefBindingsInActions(fn.__compiledActions, fn.__refBindings) as IRActionNode[]
    : fn.__compiledActions;

  registerContribution({
    kind: 'attach-trigger',
    targetRef: String(targetRef),
    event,
    actions: resolvedActions,
    sourceId,
  });
}
