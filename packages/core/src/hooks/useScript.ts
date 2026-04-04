// ────────────────────────────────────────────────────────────────────────────
// useScript — declares named ESPHome scripts
//
// Accepts an async arrow function whose body is compiled by the action tree
// compiler into ESPHome actions. Returns a ScriptHandle for calling the
// script from trigger handlers.
//
// Must be called inside a function component body (render pass).
//
// Usage:
//   const myScript = useScript(async () => {
//     await delay(1000);
//     lightRef.toggle();
//   });
//
//   <button onPress={async () => { await myScript(); }} />       // execute + wait
//   <button onPress={() => { myScript.execute(); }} />           // fire-and-forget
//   <button onPress={() => { myScript.stop(); }} />              // stop running
// ────────────────────────────────────────────────────────────────────────────

import { createContext, useContext, withContext } from './useContext';
import { setCurrentHookPath, assertHookContext } from './useState';
import { findInScope, registerInScope } from './useScope';
import type { ScopeFrame } from './useScope';
import { resolveRefBindingsInActions } from '../serialize';
import type { IRActionNode } from '../ir/action-types';
import type { ACTION_BRAND } from '../types';

// ── Script-scope types & context ───────────────────────────────────────────

export interface ScriptDefinition {
  id: string;
  then: IRActionNode[];
}

const scriptScopeContext = createContext<ScopeFrame<ScriptDefinition>>({ value: {} });

/**
 * Establishes a script scope frame and runs `fn` inside it.
 * Returns the function's result together with all ScriptDefinitions that were
 * registered via useScript() during the call.
 *
 * Called by the compiler's execute phase to wrap bundle evaluation.
 */
export function withScriptScope<T>(fn: () => T): { result: T; scripts: ScriptDefinition[] } {
  const prev = useContext(scriptScopeContext);
  const scopeFrame: ScopeFrame<ScriptDefinition> = { next: prev, value: {} };

  setCurrentHookPath('espcompose_script_render');
  try {
    const result = withContext(scriptScopeContext, scopeFrame, fn);
    const scripts = Object.values(scopeFrame.value).map((e) => e.def);
    return { result, scripts };
  } finally {
    setCurrentHookPath(null);
  }
}

/**
 * Handle returned by useScript() for interacting with a named ESPHome script.
 *
 * Callable as a function: `await myScript()` = script.execute + script.wait
 */
export interface ScriptHandle {
  readonly [ACTION_BRAND]?: true;
  /** Call as a function: `await myScript()` = script.execute + script.wait */
  (): Promise<void>;
  /** The script ID */
  readonly id: string;
  /** Fire-and-forget execution: `script.execute` */
  execute(): void;
  /** Stop the script if running: `script.stop` */
  stop(): void;
  /** Whether the script is currently running (compile-time only) */
  readonly isRunning: boolean;
}

/** Compiled metadata injected by the AST transformer */
export interface CompiledScriptMeta {
  id: string;
  then: unknown[];
}

/**
 * Declare a named ESPHome script.
 *
 * The async arrow function body is compiled at build time by the action
 * tree compiler. The compiled actions are injected as metadata by the
 * transformer via Object.assign(__compiledScript, __refBindings).
 *
 * Must be called inside a function component body (render pass).
 */
export function useScript(
  fn: () => Promise<void>,
): ScriptHandle {
  assertHookContext('useScript()');

  let scriptDef: ScriptDefinition;

  const body = fn as ((...args: unknown[]) => unknown) & { __compiledScript?: CompiledScriptMeta; __refBindings?: Record<string, unknown> };
  if (body.__compiledScript) {
    const resolvedActions = body.__refBindings
      ? resolveRefBindingsInActions(body.__compiledScript.then, body.__refBindings) as IRActionNode[]
      : body.__compiledScript.then as IRActionNode[];
    scriptDef = {
      id: body.__compiledScript.id,
      then: resolvedActions,
    };
  } else {
    const id = `script_${Math.random().toString(36).slice(2, 9)}`;
    scriptDef = { id, then: [] };
  }

  // Register in scope (deduplication)
  if (!findInScope(scriptScopeContext, scriptDef.id)) {
    registerInScope(scriptScopeContext, scriptDef.id, { def: scriptDef });
  }

  return createScriptHandle(scriptDef.id);
}

function createScriptHandle(id: string): ScriptHandle {
  const handle = {
    id,
    execute() { /* compile-time marker — not called at runtime */ },
    stop() { /* compile-time marker — not called at runtime */ },
    get isRunning() { return false; },
  };

  // Make the handle callable for `await myScript()` syntax.
  // At the AST level, the compiler sees `myScript()` and emits
  // script.execute (+ script.wait if awaited). This function is
  // never actually invoked.
  const callable = function scriptCall() {
    return Promise.resolve();
  } as unknown as ScriptHandle & (() => Promise<void>);

  Object.defineProperties(callable, {
    id: { value: id, enumerable: true },
    execute: { value: handle.execute, enumerable: true },
    stop: { value: handle.stop, enumerable: true },
    isRunning: { get: () => false, enumerable: true },
  });

  return callable as ScriptHandle;
}
