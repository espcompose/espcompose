// ────────────────────────────────────────────────────────────────────────────
// Contribution Scope — collects ComponentContributions during render
//
// Library components call registerContribution() during render to attach
// trigger actions (or future contribution kinds) to nodes they reference
// but don't own. The compiler wraps the render pass in withContributionScope()
// and collects all contributions for the IR merge pass.
//
// Pattern mirrors useReactiveScope.ts exactly.
// ────────────────────────────────────────────────────────────────────────────

import type { ComponentContribution } from '../ir/contribution-types';
import type { Context } from './useContext';
import { createContext, useContext, withContext } from './useContext';

// ────────────────────────────────────────────────────────────────────────────
// Scope frame
// ────────────────────────────────────────────────────────────────────────────

interface ContributionScopeFrame {
  contributions: ComponentContribution[];
}

const contributionScopeContext: Context<ContributionScopeFrame | null> =
  createContext<ContributionScopeFrame | null>(null);

// ────────────────────────────────────────────────────────────────────────────
// Registration API — called during render
// ────────────────────────────────────────────────────────────────────────────

/**
 * Register a component contribution for the IR merge pass.
 * No-op if called outside a contribution scope.
 */
export function registerContribution(contribution: ComponentContribution): void {
  const frame = useContext(contributionScopeContext);
  if (frame) {
    frame.contributions.push(contribution);
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Scope lifecycle — wraps the render pass
// ────────────────────────────────────────────────────────────────────────────

export interface ContributionScopeResult<T> {
  result: T;
  contributions: ComponentContribution[];
}

/**
 * Establish a contribution scope frame before running `fn`.
 *
 * During `fn`, calls to `registerContribution()` accumulate in this frame.
 * After `fn` returns, the collected contributions are returned alongside
 * the function's result.
 *
 * Typically called by the compiler's execute phase to wrap the render pass.
 */
export function withContributionScope<T>(fn: () => T): ContributionScopeResult<T> {
  const frame: ContributionScopeFrame = {
    contributions: [],
  };

  const result = withContext(contributionScopeContext, frame, fn);

  return {
    result,
    contributions: frame.contributions,
  };
}
