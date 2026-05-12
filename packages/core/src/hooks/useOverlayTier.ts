// ────────────────────────────────────────────────────────────────────────────
// useOverlayTier — declare a z-order tier for overlay grouping
//
// Each tier is a shared layer in `top_layer` that groups overlay containers.
// An optional wrapper element (e.g. a backdrop) is emitted once per tier and
// shown/hidden automatically based on whether any overlays in the tier are
// visible.
//
// This separates the tier lifecycle (backdrop visibility, z-ordering) from
// individual overlay content visibility. The tier wrapper is always-visible
// scaffolding; overlay content children are toggled individually, avoiding
// full-screen LVGL invalidation for small overlays like toasts.
//
// Usage:
//   // Dialog tier with shared backdrop
//   const dialogTier = useOverlayTier({ zOrder: 0 }, <Backdrop />);
//
//   // Toast tier with no backdrop
//   const toastTier = useOverlayTier({ zOrder: 100 });
//
//   // Pass to useOverlay
//   const ctrl = useOverlay({ tier: dialogTier }, factory);
// ────────────────────────────────────────────────────────────────────────────

import { assertHookContext, getCurrentHookPath, nextCallIndexAtHookPath } from './useState';
import { createContext, useContext, withContext } from './useContext';
import { useLvgl } from './useLvgl';
import { generateDeterministicId } from '../id';
import type { EspComposeElement } from '../types';

// ── Symbols ─────────────────────────────────────────────────────────────────

/** Numeric z-order for the tier. */
export const TIER_Z_ORDER: unique symbol = Symbol('tier.zOrder');
/** Deterministic key identifying this tier. */
export const TIER_KEY: unique symbol = Symbol('tier.key');
/** Optional wrapper JSX element (e.g. <Backdrop>). */
export const TIER_WRAPPER: unique symbol = Symbol('tier.wrapper');
/** Ref token of the owning <lvgl> element. */
export const TIER_LVGL: unique symbol = Symbol('tier.lvgl');

// ── Types ───────────────────────────────────────────────────────────────────

/** Configuration for `useOverlayTier()`. */
export interface OverlayTierConfig {
  /**
   * Numeric z-order. Tiers with higher values render above tiers with lower
   * values. Within a tier, last-shown overlay wins (via move_foreground).
   */
  zOrder: number;
}

/**
 * Opaque handle returned by `useOverlayTier()`.
 *
 * Passed to `useOverlay({ tier })` to declare which tier an overlay belongs to.
 * Internal fields are symbol-keyed to prevent accidental access.
 */
export interface OverlayTierHandle {
  readonly [TIER_Z_ORDER]: number;
  readonly [TIER_KEY]: string;
  readonly [TIER_WRAPPER]?: EspComposeElement;
  readonly [TIER_LVGL]: string;
}

/**
 * Tier definition collected during the render pass.
 *
 * Stored in the overlay scope frame. The serialization phase reads these
 * to group overlays and emit tier wrapper widgets.
 */
export interface OverlayTierDefinition {
  /** Deterministic key identifying this tier. */
  readonly tierKey: string;
  /** Numeric z-order. */
  readonly zOrder: number;
  /** Ref token of the owning <lvgl> element. */
  readonly lvgl: string;
  /** Optional wrapper JSX element (e.g. backdrop). */
  readonly wrapper?: EspComposeElement;
}

// ── Scope frame ─────────────────────────────────────────────────────────────
// Tier definitions are stored alongside overlay definitions in the overlay
// scope frame. We use a separate context rather than extending OverlayScopeFrame
// to avoid circular imports (useOverlay imports from useOverlayTier, not
// the reverse).

interface OverlayTierScopeFrame {
  readonly definitions: Map<string, OverlayTierDefinition>;
}

const overlayTierScopeContext = createContext<OverlayTierScopeFrame | null>(null);

// ── Scope lifecycle ─────────────────────────────────────────────────────────

export interface OverlayTierScopeResult<T> {
  result: T;
  tiers: OverlayTierDefinition[];
}

/**
 * Establish a tier scope frame and run `fn` inside it.
 *
 * Called alongside `withOverlayScope()` during the compiler's execute phase.
 */
export function withOverlayTierScope<T>(fn: () => T): OverlayTierScopeResult<T> {
  const frame: OverlayTierScopeFrame = { definitions: new Map() };
  const result = withContext(overlayTierScopeContext, frame, fn);
  return {
    result,
    tiers: Array.from(frame.definitions.values()),
  };
}

/**
 * Read tier definitions from the currently-active scope.
 */
export function peekOverlayTierDefinitions(lvgl?: string): OverlayTierDefinition[] {
  const frame = useContext(overlayTierScopeContext);
  if (!frame) return [];
  const all = Array.from(frame.definitions.values());
  if (lvgl == null) return all;
  return all.filter(d => d.lvgl === lvgl);
}

// ── Hook ────────────────────────────────────────────────────────────────────

/**
 * Declare an overlay tier with an optional wrapper element.
 *
 * Must be called inside a function component body. The tier is registered
 * in the active scope and can be passed to `useOverlay({ tier })` to group
 * overlays under this tier's z-order layer.
 *
 * @param config  - Tier configuration. `zOrder` controls stacking order.
 * @param wrapper - Optional JSX element emitted once per tier as a shared
 *   backdrop/curtain. Shown when any overlay in the tier is visible; hidden
 *   when all overlays are dismissed.
 * @returns An opaque `OverlayTierHandle` to pass to `useOverlay()`.
 */
export function useOverlayTier(config: OverlayTierConfig, wrapper?: EspComposeElement): OverlayTierHandle {
  assertHookContext('useOverlayTier()');

  const lvglId = String(useLvgl());

  const basePath = getCurrentHookPath();
  if (!basePath) {
    throw new Error(
      'useOverlayTier() could not derive a key from the hook-path stack. ' +
      'This is an internal error — useOverlayTier() must be called inside a function component.',
    );
  }

  const frame = useContext(overlayTierScopeContext);
  if (!frame) {
    throw new Error(
      'useOverlayTier() requires an overlay tier scope frame. ' +
      'The render pass must be wrapped in withOverlayTierScope() (the compiler does this automatically).',
    );
  }

  const callIndex = nextCallIndexAtHookPath();
  const tierPath = `${basePath}#tier${callIndex}`;
  const tierKey = generateDeterministicId('tier', tierPath);

  if (!frame.definitions.has(tierPath)) {
    frame.definitions.set(tierPath, {
      tierKey,
      zOrder: config.zOrder,
      lvgl: lvglId,
      wrapper,
    });
  }

  return {
    [TIER_Z_ORDER]: config.zOrder,
    [TIER_KEY]: tierKey,
    [TIER_WRAPPER]: wrapper,
    [TIER_LVGL]: lvglId,
  };
}
