// ────────────────────────────────────────────────────────────────────────────
// Component Contribution Types
//
// Generic mechanism for library components to contribute IR (trigger actions,
// etc.) to semantic nodes they reference but don't own. The compiler merges
// contributions into the IR tree deterministically during buildSemanticIR().
//
// This file defines ONLY the IR-level contribution types. The render-time
// collection scope lives in ../hooks/useContributionScope.ts.
// ────────────────────────────────────────────────────────────────────────────

import type { IRActionNode } from './action-types';

// ── Contribution kinds ─────────────────────────────────────────────────────

/**
 * Attach one or more compiled trigger actions to a widget identified by ref.
 *
 * The `event` is a camelCase trigger prop name (e.g. `'onShow'`, `'onLoad'`,
 * `'onPress'`). The merge pass appends the contributed actions AFTER any
 * user-authored actions on the same trigger, sorted by `sourceId` for
 * determinism when multiple components contribute to the same event.
 */
export interface AttachTriggerContribution {
  readonly kind: 'attach-trigger';
  /** Ref token identifying the target widget (from RefHandle). */
  readonly targetRef: string;
  /** camelCase trigger prop name on the target widget. */
  readonly event: string;
  /** Compiled action nodes to append to the trigger. */
  readonly actions: IRActionNode[];
  /** Stable identifier for ordering — typically derived from hook path. */
  readonly sourceId: string;
}

// ── Union ──────────────────────────────────────────────────────────────────

/**
 * Extensible discriminated union of component contributions.
 *
 * v1 supports only trigger attachment. Add new variants here when real
 * use cases demand them (e.g. reactive binding injection, child widget
 * injection).
 */
export type ComponentContribution = AttachTriggerContribution;
