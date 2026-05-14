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
 * Easing curve for widget property animations.
 * Maps to LVGL `lv_anim_path_*` callbacks at lowering time.
 */
export type AnimationEasing =
  | 'linear'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'overshoot'
  | 'bounce'
  | 'step';

// ── Style Transition IR Types ──────────────────────────────────────────────

/**
 * A single transition timing group — maps to one `lv_style_transition_dsc_t`.
 *
 * Property names are LVGL camelCase (e.g. `'bgColor'`, `'opa'`), resolved
 * from CSS-like names via `CSS_TO_LVGL_MAP`. The target converts these to
 * snake_case and `LV_STYLE_*` constants at lowering time.
 */
export interface IRStyleTransitionDescriptor {
  /** LVGL camelCase style property names (e.g. 'bgColor', 'opa'). */
  readonly properties: string[];
  /** Duration in milliseconds. */
  readonly durationMs: number;
  /** Easing key (e.g. 'ease_out', 'linear'). */
  readonly easing: string;
  /** Delay in milliseconds. */
  readonly delayMs: number;
}

/**
 * A declarative style transition attached to a widget.
 *
 * Each entry maps to one or more `lv_style_transition_dsc_t` structs in C++,
 * attached to the widget's style for the specified part+state selector.
 */
export interface IRStyleTransition {
  readonly kind: 'style_transition';
  /** Widget ref token (same as IRWidget.id). */
  readonly targetRef: string;
  /** LVGL part name (e.g. 'indicator', 'knob'). Omit for 'main'. */
  readonly part?: string;
  /** LVGL state name (e.g. 'pressed', 'focused'). Omit for 'default'. */
  readonly state?: string;
  /** Transition descriptors — each becomes one `lv_style_transition_dsc_t`. */
  readonly descriptors: IRStyleTransitionDescriptor[];
}

// ── Style Transition Contribution ──────────────────────────────────────────

/**
 * Contribute style transitions to a widget identified by ref.
 *
 * Used by library components via `useStyleTransition()` to declaratively
 * add transition descriptors to widgets they reference but don't own.
 * Merged into `IRUIRegistry.styleTransitions` during the contribution pass.
 */
export interface AttachStyleTransitionContribution {
  readonly kind: 'attach-style-transition';
  /** Ref token identifying the target widget. */
  readonly targetRef: string;
  /** LVGL part name. Omit for 'main'. */
  readonly part?: string;
  /** LVGL state name. Omit for 'default'. */
  readonly state?: string;
  /** Transition descriptors to contribute. */
  readonly descriptors: IRStyleTransitionDescriptor[];
  /** Stable identifier for ordering — typically derived from hook path. */
  readonly sourceId: string;
}

// ── Animate Transition IR Types ─────────────────────────────────────────────

/**
 * Direction constraint for animated reactive binding updates.
 *
 * Controls when the `lv_anim_t` interpolation fires vs a direct setter:
 * - `'decrease'`: animate only when the new value is LESS than the current value
 * - `'increase'`: animate only when the new value is GREATER than the current value
 * - `'both'`:     always animate (default)
 */
export type AnimateTransitionDirection = 'decrease' | 'increase' | 'both';

/**
 * IR representation of an animated binding transition on a single property.
 *
 * Unlike `IRStyleTransition` (which uses `lv_style_transition_dsc_t` for
 * state-change animations), this targets programmatic `lv_obj_set_style_*()`
 * calls from reactive bindings — wrapping them in `lv_anim_t` interpolation.
 */
export interface IRAnimateTransition {
  readonly kind: 'animate_transition';
  /** Widget ref token (same as IRWidget.id). */
  readonly targetRef: string;
  /** LVGL camelCase style property name (e.g. 'padBottom', 'opa'). */
  readonly property: string;
  /** Duration in milliseconds. */
  readonly durationMs: number;
  /** Easing key (e.g. 'ease_out', 'linear'). */
  readonly easing: string;
  /** Direction constraint for when animation fires. */
  readonly direction: AnimateTransitionDirection;
}

// ── Animate Transition Contribution ────────────────────────────────────────

/**
 * Contribute an animated transition to a widget's reactive binding.
 *
 * Used by library components via `useAnimateTransition()` to declaratively
 * add `lv_anim_t`-based interpolation to a specific reactive style property.
 * Merged into `IRUIRegistry.animateTransitions` during the contribution pass.
 */
export interface AttachAnimateTransitionContribution {
  readonly kind: 'attach-animate-transition';
  /** Ref token identifying the target widget. */
  readonly targetRef: string;
  /** LVGL camelCase style property name (e.g. 'padBottom'). */
  readonly property: string;
  /** Duration in milliseconds. */
  readonly durationMs: number;
  /** Easing key (e.g. 'ease_out', 'linear'). */
  readonly easing: string;
  /** Direction constraint for when animation fires. */
  readonly direction: AnimateTransitionDirection;
  /** Stable identifier for ordering — typically derived from hook path. */
  readonly sourceId: string;
}

/**
 * Extensible discriminated union of component contributions.
 *
 * Supports trigger attachment, style transition attachment, and
 * animated binding transition attachment.
 */
export type ComponentContribution =
  | AttachTriggerContribution
  | AttachStyleTransitionContribution
  | AttachAnimateTransitionContribution;
