/**
 * Debug logging for the simulator browser runtime.
 *
 * Enable via:
 *   - URL query param: `?debug=1`
 *   - localStorage:    `localStorage.setItem('espcompose_debug', '1')`
 *
 * Logs are prefixed with `[espcompose]` and include a category tag.
 */

let _enabled: boolean | null = null;

function isEnabled(): boolean {
  if (_enabled !== null) return _enabled;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('debug') === '1') {
      _enabled = true;
      return true;
    }
    if (typeof localStorage !== 'undefined' && localStorage.getItem('espcompose_debug') === '1') {
      _enabled = true;
      return true;
    }
  } catch {
    // SSR or restricted context – stay silent
  }
  _enabled = false;
  return false;
}

/** Reset the cached flag (useful after toggling localStorage at runtime). */
export function resetDebugFlag(): void {
  _enabled = null;
}

export function debug(category: string, message: string, ...data: unknown[]): void {
  if (!isEnabled()) return;
  if (data.length > 0) {
    console.log(`[espcompose:${category}] ${message}`, ...data);
  } else {
    console.log(`[espcompose:${category}] ${message}`);
  }
}
