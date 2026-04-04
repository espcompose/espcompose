// ────────────────────────────────────────────────────────────────────────────
// Runtime View IR — types for the simulator's normalized tree representation
//
// These types describe the widget tree produced by the simulator render pass.
// Unlike the firmware compilation IR (IRRoot/IRValue), this IR:
//   - preserves JS-executable closures for reactive expressions
//   - preserves callable action handlers
//   - classifies every prop as static, reactive, action, or ref
//   - maintains source location metadata for devtools
// ────────────────────────────────────────────────────────────────────────────

/**
 * A node in the simulator's widget tree.
 * Each node corresponds to a resolved LVGL intrinsic element.
 */
export interface RuntimeNode {
  /** Stable unique identifier (from ref, auto-assigned rw_ prefix, or positional). */
  id: string;
  /** LVGL widget type: 'label', 'button', 'slider', 'page', 'obj', etc. */
  type: string;
  /** Prop map — every prop classified by kind. */
  props: Record<string, RuntimeProp>;
  /** Nested child widgets. */
  children: RuntimeNode[];
  /** Original TSX source location (when available). */
  sourceInfo?: SourceInfo;
}

/**
 * Source location metadata linking a RuntimeNode back to its TSX origin.
 */
export interface SourceInfo {
  file?: string;
  line?: number;
  column?: number;
  /** Name of the enclosing functional component, if any. */
  componentName?: string;
}

// ── Prop variants ────────────────────────────────────────────────────────────

export type RuntimeProp =
  | StaticProp
  | ReactiveProp
  | ActionProp
  | RefProp;

export interface StaticProp {
  kind: 'static';
  value: unknown;
}

export interface ReactiveProp {
  kind: 'reactive';
  /** Current evaluated value. */
  current: unknown;
  /** Re-evaluate to get an updated value. */
  evaluate: () => unknown;
  /** Reactive sources this prop depends on. */
  dependencies: RuntimeDependency[];
}

export interface ActionProp {
  kind: 'action';
  /** The callable action handler function. */
  handler: (...args: unknown[]) => void | Promise<void>;
  /** Structured description of the action steps (for devtools). */
  meta?: ActionStep[];
}

export interface RefProp {
  kind: 'ref';
  refId: string;
}

// ── Dependencies ─────────────────────────────────────────────────────────────

export interface RuntimeDependency {
  /** Data source identifier (e.g. 'ha_light_kitchen_floods'). */
  sourceId: string;
  /** What kind of data source. */
  sourceType: 'ha_entity' | 'theme' | 'ref' | 'local';
  /** Specific property on the source (e.g. 'isOn', 'brightness', 'value'). */
  property: string;
}

// ── Action metadata ──────────────────────────────────────────────────────────

export type ActionStep =
  | ComponentActionStep
  | HAServiceActionStep
  | DelayActionStep
  | ConditionalActionStep
  | ThemeSelectActionStep
  | LogActionStep;

export interface ComponentActionStep {
  type: 'component_action';
  target: string;
  method: string;
  params?: Record<string, unknown>;
}

export interface HAServiceActionStep {
  type: 'ha_service';
  action: string;
  entityId: string;
  data?: Record<string, unknown>;
}

export interface DelayActionStep {
  type: 'delay';
  duration: string;
}

export interface ConditionalActionStep {
  type: 'conditional';
  condition: () => boolean;
  then: ActionStep[];
  else?: ActionStep[];
}

export interface ThemeSelectActionStep {
  type: 'theme_select';
  themeName: string;
}

export interface LogActionStep {
  type: 'log';
  message: string;
  level?: string;
}

// ── Data provider interface ──────────────────────────────────────────────────

/**
 * Abstraction for supplying simulated data to the UI.
 * Implementations: MockProvider, ScenarioProvider, LiveHABridge.
 */
export interface DataProvider {
  getEntityState(entityId: string): EntityState;
  setEntityState(entityId: string, state: Partial<EntityState>): void;
  onEntityChange(entityId: string, cb: (state: EntityState) => void): () => void;
  callService(domain: string, action: string, entityId: string, data?: Record<string, unknown>): void;
}

export interface EntityState {
  state: string;
  attributes: Record<string, unknown>;
  domain: string;
}
