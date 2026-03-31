// ────────────────────────────────────────────────────────────────────────────
// Hook path tracking — createScript() scope guard
//
// createScript() may only be called during a withScriptScope() render pass.
// ────────────────────────────────────────────────────────────────────────────

let _currentHookPath: string | null = null;

export function setCurrentHookPath(path: string | null): void {
  _currentHookPath = path;
}

export function getCurrentHookPath(): string | null {
  return _currentHookPath;
}
