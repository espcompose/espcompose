/**
 * Generate a short, collision-resistant identifier with the given prefix.
 * Returns `${prefix}_${random}` where random is 9 base-36 characters.
 *
 * Math.random with base-36 gives ~46 bits of entropy — sufficient for
 * identifiers scoped to a single device configuration file.
 */
export function generateId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * Generate a deterministic identifier from a prefix and an input value.
 * Returns `${prefix}_${hex8}` where hex8 is an 8-char FNV-1a hash of value.
 *
 * Use this instead of `generateId` when the identifier must be reproducible
 * across multiple calls with the same input (e.g. overlay template keys
 * derived from hook paths).
 */
export function generateDeterministicId(prefix: string, value: string): string {
  let h = 0x811c9dc5; // FNV offset basis
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 0x01000193); // FNV prime
  }
  return `${prefix}_${(h >>> 0).toString(16).padStart(8, '0')}`;
}
