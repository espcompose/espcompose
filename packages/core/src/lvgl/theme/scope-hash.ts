// ────────────────────────────────────────────────────────────────────────────
// scopeHash — deterministic 8-char hex hash for theme scope identifiers
//
// Produces a C++-safe identifier fragment from an arbitrary scope string.
// Uses FNV-1a 32-bit hash (pure JS, zero dependencies).
// ────────────────────────────────────────────────────────────────────────────

// FNV-1a 32-bit constants
const FNV_OFFSET = 0x811c9dc5;
const FNV_PRIME = 0x01000193;

/**
 * Compute a deterministic 8-char lowercase hex hash from a scope string.
 *
 * Used throughout the compiler pipeline as the `scopeId` — a C++-safe
 * identifier fragment for theme signals, memos, and select functions.
 *
 * @example
 * scopeHash('espcompose:ui') // → '7a2b3c4d'
 * scopeHash('lcars')         // → 'e5f6a7b8'
 */
export function scopeHash(scope: string): string {
  let hash = FNV_OFFSET;
  for (let i = 0; i < scope.length; i++) {
    hash ^= scope.charCodeAt(i);
    hash = Math.imul(hash, FNV_PRIME);
  }
  // Convert to unsigned 32-bit then to zero-padded 8-char hex
  return (hash >>> 0).toString(16).padStart(8, '0');
}
