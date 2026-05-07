// ────────────────────────────────────────────────────────────────────────────
// UI-level adaptive helpers
//
// Density is a design-system opinion — what "compact" means in pixels
// depends on the design system.  This module provides UI-specific
// adaptive helpers that complement the core display-level helpers.
// ────────────────────────────────────────────────────────────────────────────

/**
 * Density preference for the design system.
 *
 * Controls how tightly UI elements are packed:
 * - `comfortable` — extra breathing room (large touch targets)
 * - `normal`      — standard spacing
 * - `compact`     — reduced spacing for information density
 * - `dense`       — minimal spacing for constrained displays
 */
export type DensityLevel = 'comfortable' | 'normal' | 'compact' | 'dense';

/**
 * Select a value based on density preference.
 *
 * @example
 * ```ts
 * adaptiveDensity(settings.density, { compact: 12, dense: 8, default: 16 })
 * ```
 */
export function adaptiveDensity<T>(
  density: DensityLevel | undefined,
  cases: Partial<Record<DensityLevel, T>> & { default: T },
): T {
  return (density != null ? cases[density] : undefined) ?? cases.default;
}
