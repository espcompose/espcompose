// ────────────────────────────────────────────────────────────────────────────
// Scope — generic linked-list scope frame utilities
//
// Provides a reusable pattern for collecting registrations during a render
// pass. Higher-level modules (e.g. useScript) create typed scope contexts
// and use findInScope / registerInScope to interact with the frame chain.
// ────────────────────────────────────────────────────────────────────────────

import { Context, useContext } from './useContext';

export interface ScopeEntry<T> {
  def: T;
}

export interface ScopeFrame<T> {
  next?: ScopeFrame<T>;
  value: Record<string, ScopeEntry<T>>;
}

export function findInScope<T>(ctx: Context<ScopeFrame<T>>, id: string): ScopeEntry<T> | undefined {
  let frame = useContext(ctx);
  let found = frame.value[id];
  while (!found && frame.next) {
    frame = frame.next;
    found = frame.value[id];
  }
  return found;
}

export function registerInScope<T>(ctx: Context<ScopeFrame<T>>, id: string, entry: ScopeEntry<T>): void {
  const frame = useContext(ctx);
  frame.value[id] = entry;
}
