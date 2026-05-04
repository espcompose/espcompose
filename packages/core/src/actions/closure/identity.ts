// ── Identity fallback descriptor (test-only) ───────────────────────────────
//
// Not registered as a descriptor — `findClosureDescriptor` returns null
// when no descriptor matches. Retained as a named export only so existing
// tests that explicitly reference it continue to compile.

import type { ClosureDescriptor } from './registry';

/**
 * Generic identity-only descriptor. Not auto-registered; callers must
 * use it explicitly. Produces no closure fields.
 */
export const identityDescriptor: ClosureDescriptor<unknown> = {
  match(_v: unknown): _v is unknown {
    return true;
  },

  toClosureKey(v) {
    try {
      return `identity:${JSON.stringify(v)}`;
    } catch {
      return `identity:${String(v)}`;
    }
  },
};
