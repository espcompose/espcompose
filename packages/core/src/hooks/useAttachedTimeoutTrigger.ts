// ────────────────────────────────────────────────────────────────────────────
// useAttachedTimeoutTrigger — attach timeout-structured trigger actions
//
// Like useAttachedTrigger, but for triggers that pair a timeout duration
// with an action list (e.g. LVGL `on_idle`). Each call contributes one
// { timeout, then } entry to the target's structured trigger array.
//
// Example:
//   const lvgl = useLvgl();
//   useAttachedTimeoutTrigger(lvgl, 'onIdle', 30_000, () => {
//     overlay.show();
//   });
//
// The handler arrow function is compiled by the Script Transformer (same as
// useAttachedTrigger and useScript). At runtime, this hook reads the
// compiled action metadata and registers an AttachTimeoutTriggerContribution.
// ────────────────────────────────────────────────────────────────────────────

import type { TriggerHandler } from '../types';
import type { IRActionNode } from '../ir/action-types';
import type { DurationValue } from '../lvgl/style/duration';
import { assertHookContext, getCurrentHookPath } from './useState';
import { registerContribution } from './useContributionScope';
import { resolveRefBindingsInActions } from '../serialize';
import { resolveCompiledActions } from '../actions';

/**
 * Attach a timeout-structured trigger to a component identified by `targetRef`.
 *
 * The `event` parameter is a camelCase trigger prop name (e.g. `'onIdle'`).
 * The `timeout` is a duration value (number in ms, or a string like `'30s'`).
 * The `handler` is a trigger arrow function whose body has been compiled
 * to an action tree by the Script Transformer.
 *
 * Multiple calls with the same `(targetRef, event)` accumulate as separate
 * `{ timeout, then }` entries, sorted by `sourceId` for determinism.
 *
 * @param targetRef  Ref to the target component (e.g. LVGL component ref)
 * @param event      camelCase trigger prop name (e.g. `'onIdle'`)
 * @param timeout    Duration value (number in ms, or a string with unit suffix)
 * @param handler    Compiled trigger handler arrow function
 */
export function useAttachedTimeoutTrigger<T = void>(
  targetRef: { toString(): string },
  event: string,
  timeout: DurationValue,
  handler: TriggerHandler<T>,
): void {
  assertHookContext('useAttachedTimeoutTrigger()');

  // The Script Transformer attaches __compiledActions to trigger handler
  // functions during the AST compilation phase.
  const fn = handler as unknown as {
    __compiledActions?: IRActionNode[];
    __refBindings?: Record<string, unknown>;
  };

  if (!fn.__compiledActions) {
    throw new Error(
      `[espcompose] useAttachedTimeoutTrigger(): handler has no compiled actions.\n` +
      `  This means the Script Transformer did not recognize this call site.\n` +
      `  Ensure the handler is a direct arrow function expression:\n` +
      `    useAttachedTimeoutTrigger(ref, 'onIdle', timeout, () => { ... })\n` +
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
    kind: 'attach-timeout-trigger',
    targetRef: String(targetRef),
    event,
    timeout,
    actions: resolvedActions,
    sourceId,
  });
}
