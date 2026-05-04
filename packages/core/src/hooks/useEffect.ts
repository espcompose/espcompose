// ────────────────────────────────────────────────────────────────────────────
// useEffect — REMOVED
//
// useEffect relied on runtime dependency tracking (startTracking/stopTracking)
// which is fundamentally unsound for conditional expressions. The hook had
// zero users and no compiler support. It has been removed.
//
// If you need reactive side-effects, use the reactive transformer's compiled
// expression system or file a feature request for compiler-supported effects.
// ────────────────────────────────────────────────────────────────────────────

import { throwCompileTimeOnly } from '../errors';

/**
 * @deprecated useEffect has been removed. It relied on runtime dependency
 * tracking which is fundamentally unsound for conditional expressions.
 */
export function useEffect(_fn: () => void): void {
  throwCompileTimeOnly('useEffect()', 'Reactive effects');
}
