// ────────────────────────────────────────────────────────────────────────────
// applyContributions — merge ComponentContributions into the SemanticIR tree
//
// Called from buildSemanticIR() after the IR tree is fully constructed.
// Resolves contribution targets across all IR registries (widgets, sections,
// etc.) and merges contributed actions into trigger props.
//
// Merge ordering: user-authored actions first, then contributions sorted
// by sourceId for determinism. Multiple components contributing to the same
// event are safely appended.
// ────────────────────────────────────────────────────────────────────────────

import type { SemanticIR, IRAction, IRValue, IRObject, IRUIRegistry } from './types';
import { irAction } from './types';
import type { IRWidget } from './widget-types';
import type { ComponentContribution, AttachTriggerContribution, AttachAnimationContribution } from './contribution-types';

// ── ContributionTarget ─────────────────────────────────────────────────────
//
// Abstraction over any IR node that can be the target of a contribution.
// Widgets have flat `props`; section items have `IRObject.entries`.
// This interface unifies access so the merge logic is storage-agnostic.

interface ContributionTarget {
  /** Read the current value of a trigger prop (or undefined if absent). */
  getIRValue(event: string): IRValue | undefined;
  /** Set or overwrite a trigger prop. */
  setIRValue(event: string, value: IRValue): void;
}

function widgetTarget(widget: IRWidget): ContributionTarget {
  return {
    getIRValue(event) { return widget.props[event]; },
    setIRValue(event, value) {
      (widget.props as Record<string, IRValue>)[event] = value;
    },
  };
}

function sectionObjectTarget(obj: IRObject): ContributionTarget {
  return {
    getIRValue(event) {
      return obj.entries.find(e => e.key === event)?.value;
    },
    setIRValue(event, value) {
      const entry = obj.entries.find(e => e.key === event);
      if (entry) {
        entry.value = value;
      } else {
        obj.entries.push({ kind: 'entry', key: event, value });
      }
    },
  };
}

// ── Main ───────────────────────────────────────────────────────────────────

/**
 * Apply component contributions to the SemanticIR tree in-place.
 *
 * Currently handles:
 * - `attach-trigger`: appends contributed actions to any ref-bearing node's
 *   trigger prop (widgets, section items, etc.).
 */
export function applyContributions(ir: SemanticIR, contributions: ComponentContribution[]): void {
  if (contributions.length === 0) return;

  // Build a unified map from ref token → ContributionTarget.
  const targets = new Map<string, ContributionTarget>();
  collectWidgetTargets(ir, targets);
  collectSectionTargets(ir, targets);

  // ── Attach-trigger contributions ───────────────────────────────────────

  // Group attach-trigger contributions by (targetRef, event) and sort by sourceId.
  const triggerContributions = contributions.filter(
    (c): c is AttachTriggerContribution => c.kind === 'attach-trigger',
  );

  // Sort all contributions by sourceId for deterministic ordering.
  triggerContributions.sort((a, b) => a.sourceId.localeCompare(b.sourceId));

  // Group by target + event.
  const groups = new Map<string, AttachTriggerContribution[]>();
  for (const c of triggerContributions) {
    const key = `${c.targetRef}:${c.event}`;
    let list = groups.get(key);
    if (!list) {
      list = [];
      groups.set(key, list);
    }
    list.push(c);
  }

  // Apply each group to the corresponding target.
  for (const [key, contribs] of groups) {
    const [targetRef, event] = splitKey(key);
    const target = targets.get(targetRef);
    if (!target) {
      console.warn(
        `[espcompose] useAttachedTrigger: target ref "${targetRef}" not found in IR tree. ` +
        `Contribution to "${event}" from [${contribs.map(c => c.sourceId).join(', ')}] will be ignored.`,
      );
      continue;
    }

    // Collect all contributed actions for this event.
    const contributedActions = contribs.flatMap(c => c.actions);

    // Merge with existing trigger prop.
    const existingProp = target.getIRValue(event);
    if (existingProp && existingProp.kind === 'action') {
      // User already has actions on this trigger — append contributed actions after.
      const existing = existingProp as IRAction;
      existing.actions.push(...contributedActions);
    } else if (!existingProp || existingProp.kind === 'null') {
      // No existing trigger — create a new IRAction prop.
      target.setIRValue(event, irAction(contributedActions));
    }
    // If the prop exists but is neither 'action' nor 'null', it's unexpected.
    // Leave it alone — could be a reactive binding or other non-action value.
  }

  // ── Attach-animation contributions ─────────────────────────────────────

  const animContributions = contributions.filter(
    (c): c is AttachAnimationContribution => c.kind === 'attach-animation',
  );

  if (animContributions.length > 0) {
    // Reuse the shared widget → UIRegistry ownership map.
    const widgetToUI = buildWidgetUIMap(ir);

    for (const anim of animContributions) {
      const owningUI = widgetToUI.get(anim.targetRef);
      if (!owningUI) {
        console.warn(
          `[espcompose] useAnimation: target ref "${anim.targetRef}" not found in any UI tree. ` +
          `Animation "${anim.animationId}" for property "${anim.property}" will be ignored.`,
        );
        continue;
      }
      (owningUI.animations as AttachAnimationContribution[]).push(anim);
    }
  }
}

// ── Target collection ──────────────────────────────────────────────────────

/**
 * Collect all widgets by ID as contribution targets.
 */
function collectWidgetTargets(ir: SemanticIR, map: Map<string, ContributionTarget>): void {
  for (const ui of ir.uis) {
    collectWidgetsRecursive(ui.pages, map);
    collectWidgetsRecursive(ui.widgets, map);
    for (const tier of ui.overlays) {
      for (const overlay of tier.overlays) {
        collectWidgetsRecursive(overlay.widgets, map);
      }
    }
  }
}

function collectWidgetsRecursive(widgets: readonly IRWidget[], map: Map<string, ContributionTarget>): void {
  for (const widget of widgets) {
    if (widget.id) {
      map.set(widget.id, widgetTarget(widget));
    }
    collectWidgetsRecursive(widget.children, map);
  }
}

/**
 * Collect all section items that have a ref-based ID as contribution targets.
 * Walks every section's value tree looking for IRObject nodes whose `id`
 * entry is an IRRef.
 */
function collectSectionTargets(ir: SemanticIR, map: Map<string, ContributionTarget>): void {
  for (const section of ir.sections) {
    collectIRValueTargets(section.value, map);
  }
}

function collectIRValueTargets(value: IRValue, map: Map<string, ContributionTarget>): void {
  if (value.kind === 'object') {
    const idEntry = value.entries.find(e => e.key === 'id');
    if (idEntry && idEntry.value.kind === 'ref') {
      map.set(idEntry.value.token, sectionObjectTarget(value));
    }
    // Also recurse into child entries to find nested section items.
    for (const entry of value.entries) {
      collectIRValueTargets(entry.value, map);
    }
  } else if (value.kind === 'array') {
    for (const item of value.items) {
      collectIRValueTargets(item, map);
    }
  }
}

// ── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Map every widget ref token to its owning IRUIRegistry.
 *
 * This is a general-purpose utility: any contribution kind that needs to
 * place data on the UIRegistry owning a widget can use this map.
 */
export function buildWidgetUIMap(ir: SemanticIR): Map<string, IRUIRegistry> {
  const map = new Map<string, IRUIRegistry>();
  for (const ui of ir.uis) {
    collectWidgetUIOwnership(ui.pages, ui, map);
    collectWidgetUIOwnership(ui.widgets, ui, map);
    for (const tier of ui.overlays) {
      for (const overlay of tier.overlays) {
        collectWidgetUIOwnership(overlay.widgets, ui, map);
      }
    }
  }
  return map;
}

function collectWidgetUIOwnership(
  widgets: readonly IRWidget[],
  ui: IRUIRegistry,
  map: Map<string, IRUIRegistry>,
): void {
  for (const widget of widgets) {
    if (widget.id) {
      map.set(widget.id, ui);
    }
    collectWidgetUIOwnership(widget.children, ui, map);
  }
}

/**
 * Split a "targetRef:event" key back into its components.
 * Handles the case where targetRef might contain colons (unlikely but safe).
 */
function splitKey(key: string): [string, string] {
  const lastColon = key.lastIndexOf(':');
  return [key.slice(0, lastColon), key.slice(lastColon + 1)];
}
