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

/**
 * Attach an explicit property animation to a widget identified by ref.
 *
 * Registered by `useAnimation()`. The merge pass collects these into the
 * `IRUIRegistry.animations` array rather than merging into widget props.
 * The target lowers each animation to an `lv_anim_t` setup block.
 */
export interface AttachAnimationContribution {
  readonly kind: 'attach-animation';
  /** Ref token identifying the target widget. */
  readonly targetRef: string;
  /** Auto-generated animation ID (deterministic from hook path + property). */
  readonly animationId: string;
  /** Semantic style property name (camelCase, e.g. 'opacity', 'x', 'width'). */
  readonly property: string;
  /** Start value. */
  readonly from: number;
  /** End value. */
  readonly to: number;
  /** Duration in milliseconds. */
  readonly durationMs: number;
  /** Start delay in milliseconds. */
  readonly delayMs?: number;
  /** Easing curve. */
  readonly easing?: AnimationEasing;
  /** Repeat count: 0 = once, -1 = infinite, N = N repeats. */
  readonly repeat?: number;
  /** Delay between repeats in milliseconds. */
  readonly repeatDelayMs?: number;
  /** Playback (reverse) settings. */
  readonly playback?: { durationMs?: number; delayMs?: number };
  /** Start automatically when the widget is created. */
  readonly autoStart?: boolean;
  /** LVGL part selector (camelCase, e.g. 'indicator', 'knob'). */
  readonly part?: string;
  /** LVGL state selector (camelCase, e.g. 'pressed', 'disabled'). */
  readonly state?: string;
  /** Stable identifier for ordering — derived from hook path. */
  readonly sourceId: string;
}

/**
 * Attach an LVGL style transition to a widget identified by ref.
 *
 * Registered by `useStyleTransition()`. When any of the listed style
 * properties change on the widget, LVGL animates the change over the
 * specified duration/easing instead of applying it instantly.
 *
 * The target lowers each style transition to an `lv_style_transition_dsc_t`
 * setup block and applies it via `lv_obj_add_style()` in the bootstrap.
 */
export interface AttachStyleTransitionContribution {
  readonly kind: 'attach-style-transition';
  /** Ref token identifying the target widget. */
  readonly targetRef: string;
  /** Auto-generated transition ID (deterministic from hook path + properties). */
  readonly transitionId: string;
  /** Semantic style property names (camelCase, e.g. 'paddingTop', 'opacity'). */
  readonly properties: string[];
  /** Duration in milliseconds. */
  readonly durationMs: number;
  /** Start delay in milliseconds. */
  readonly delayMs?: number;
  /** Easing curve. */
  readonly easing?: AnimationEasing;
  /** LVGL part selector (camelCase, e.g. 'indicator', 'knob'). */
  readonly part?: string;
  /** LVGL state selector (camelCase, e.g. 'pressed', 'disabled'). */
  readonly state?: string;
  /** Stable identifier for ordering — derived from hook path. */
  readonly sourceId: string;
}

/**
 * Extensible discriminated union of component contributions.
 *
 * Supports trigger attachment, widget property animations, and style transitions.
 * Add new variants here when real use cases demand them.
 */
export type ComponentContribution =
  | AttachTriggerContribution
  | AttachAnimationContribution
  | AttachStyleTransitionContribution;
