// ────────────────────────────────────────────────────────────────────────────
// Script scope — ported from Resolut useScope.tsx
//
// A linked-list of scope frames tracks which scripts have been registered
// during the current render pass.  _withScriptScope establishes a new frame,
// runs the provided function, then collects all registered scripts from that
// frame before returning.
// ────────────────────────────────────────────────────────────────────────────

import { Context, createContext, useContext, withContext } from './useContext';
import { setCurrentHookPath } from './useState';

export interface ScriptDefinition {
  id: string;
  then: unknown[];
}

interface ScopeEntry {
  def: ScriptDefinition;
}

interface ScopeFrame {
  next?: ScopeFrame;
  value: Record<string, ScopeEntry>;
}

const scriptScopeContext: Context<ScopeFrame> = createContext<ScopeFrame>({ value: {} });

export function findInScope(id: string): ScopeEntry | undefined {
  let frame = useContext(scriptScopeContext);
  let found = frame.value[id];
  while (!found && frame.next) {
    frame = frame.next;
    found = frame.value[id];
  }
  return found;
}

export function registerInScope(id: string, entry: { def: ScriptDefinition }): void {
  const frame = useContext(scriptScopeContext);
  frame.value[id] = entry;
}

/**
 * Establishes a script scope frame and runs `fn` inside it.
 * Returns the function's result together with all ScriptDefinitions that were
 * registered via createScript() during the call.
 *
 * Called by the compiler's execute phase to wrap bundle evaluation.
 */
export function withScriptScope<T>(fn: () => T): { result: T; scripts: ScriptDefinition[] } {
  const prev = useContext(scriptScopeContext);
  const scopeFrame: ScopeFrame = { next: prev, value: {} };

  setCurrentHookPath('espcompose_script_render');
  try {
    const result = withContext(scriptScopeContext, scopeFrame, fn);
    const scripts = Object.values(scopeFrame.value).map((e) => e.def);
    return { result, scripts };
  } finally {
    setCurrentHookPath(null);
  }
}
