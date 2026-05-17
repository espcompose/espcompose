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

import type { SemanticIR, IRAction, IRValue, IRObject } from './types';
import { irAction, irArray, irObject, irEntry, irScalar } from './types';
import type { IRWidget } from './widget-types';
import type { ComponentContribution, AttachTriggerContribution, AttachTimeoutTriggerContribution, AttachStyleTransitionContribution, AttachAnimateTransitionContribution, IRStyleTransition, IRAnimateTransition } from './contribution-types';

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
  collectUIRegistryTargets(ir, targets);

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

  // ── Attach-style-transition contributions ────────────────────────────────

  const transitionContributions = contributions.filter(
    (c): c is AttachStyleTransitionContribution => c.kind === 'attach-style-transition',
  );

  if (transitionContributions.length > 0) {
    // Sort by sourceId for deterministic output.
    transitionContributions.sort((a, b) => a.sourceId.localeCompare(b.sourceId));

    for (const c of transitionContributions) {
      // Verify the target exists in the collected targets.
      if (!targets.has(c.targetRef)) {
        console.warn(
          `[espcompose] useStyleTransition: target ref "${c.targetRef}" not found in IR tree. ` +
          `Contribution from "${c.sourceId}" will be ignored.`,
        );
        continue;
      }

      // Push to the first UI registry (style transitions are global to the display).
      const ui = ir.uis[0];
      if (!ui) continue;

      (ui.styleTransitions as IRStyleTransition[]).push({
        kind: 'style_transition',
        targetRef: c.targetRef,
        part: c.part,
        state: c.state,
        descriptors: c.descriptors,
      });
    }
  }

  // ── Attach-animate-transition contributions ──────────────────────────────

  const animateTransitionContributions = contributions.filter(
    (c): c is AttachAnimateTransitionContribution => c.kind === 'attach-animate-transition',
  );

  if (animateTransitionContributions.length > 0) {
    // Sort by sourceId for deterministic output.
    animateTransitionContributions.sort((a, b) => a.sourceId.localeCompare(b.sourceId));

    for (const c of animateTransitionContributions) {
      if (!targets.has(c.targetRef)) {
        console.warn(
          `[espcompose] useAnimateTransition: target ref "${c.targetRef}" not found in IR tree. ` +
          `Contribution from "${c.sourceId}" will be ignored.`,
        );
        continue;
      }

      const ui = ir.uis[0];
      if (!ui) continue;

      (ui.animateTransitions as IRAnimateTransition[]).push({
        kind: 'animate_transition',
        targetRef: c.targetRef,
        property: c.property,
        durationMs: c.durationMs,
        easing: c.easing,
        direction: c.direction,
      });
    }
  }

  // ── Attach-timeout-trigger contributions ─────────────────────────────────

  const timeoutTriggerContributions = contributions.filter(
    (c): c is AttachTimeoutTriggerContribution => c.kind === 'attach-timeout-trigger',
  );

  if (timeoutTriggerContributions.length > 0) {
    // Sort by sourceId for deterministic ordering.
    timeoutTriggerContributions.sort((a, b) => a.sourceId.localeCompare(b.sourceId));

    // Group by (targetRef, event).
    const groups = new Map<string, AttachTimeoutTriggerContribution[]>();
    for (const c of timeoutTriggerContributions) {
      const key = `${c.targetRef}:${c.event}`;
      let list = groups.get(key);
      if (!list) {
        list = [];
        groups.set(key, list);
      }
      list.push(c);
    }

    // Build a structured IRArray for each (targetRef, event) group.
    for (const [key, contribs] of groups) {
      const [targetRef, event] = splitKey(key);
      const target = targets.get(targetRef);
      if (!target) {
        console.warn(
          `[espcompose] useAttachedTimeoutTrigger: target ref "${targetRef}" not found in IR tree. ` +
          `Contribution to "${event}" from [${contribs.map(c => c.sourceId).join(', ')}] will be ignored.`,
        );
        continue;
      }

      // Each contribution becomes one { timeout, then } entry.
      const items = contribs.map(c =>
        irObject([
          irEntry('timeout', irScalar(c.timeout)),
          irEntry('then', irAction(c.actions)),
        ]),
      );

      // Append to any existing structured trigger array.
      const existing = target.getIRValue(event);
      if (existing && existing.kind === 'array') {
        (existing as { items: IRValue[] }).items.push(...items);
      } else {
        target.setIRValue(event, irArray(items));
      }
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

/**
 * Collect UIRegistry (LVGL component) instances as contribution targets.
 *
 * Each `IRUIRegistry.lvgl` ref token maps to a target that reads/writes
 * entries in the registry's `config` dict, enabling `useAttachedTrigger`
 * and `useAttachedTimeoutTrigger` to contribute triggers to the top-level
 * LVGL component (e.g. `on_idle`, `on_resume`).
 */
function collectUIRegistryTargets(ir: SemanticIR, map: Map<string, ContributionTarget>): void {
  for (const ui of ir.uis) {
    const config = ui.config as Record<string, IRValue>;
    map.set(ui.lvgl, {
      getIRValue(event) { return config[event]; },
      setIRValue(event, value) { config[event] = value; },
    });
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
 * Split a "targetRef:event" key back into its components.
 * Handles the case where targetRef might contain colons (unlikely but safe).
 */
function splitKey(key: string): [string, string] {
  const lastColon = key.lastIndexOf(':');
  return [key.slice(0, lastColon), key.slice(lastColon + 1)];
}
