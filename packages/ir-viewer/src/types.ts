// ── IR Data shapes (match the serialized output from ir-debug.ts) ──────────

// These are the top-level IRValue kinds that appear as entry values in the IR.
export type IRValueKind =
  | 'scalar'    // { kind, value, quoted? }
  | 'object'    // { kind, entries: [{key, value}] }
  | 'array'     // { kind, items: IRValue[] }
  | 'ref'       // { kind, token }
  | 'reactive'  // { kind, node: ReactiveNode }
  | 'action';   // { kind, actions: ExprNode[] }

export interface IREntry {
  key: string;
  value: IRValue;
}

export interface IRValue {
  kind: IRValueKind | string;
  // scalar
  value?: unknown;
  quoted?: boolean;
  // object
  entries?: IREntry[];
  // array
  items?: IRValue[];
  // ref
  token?: string;
  // reactive
  node?: ReactiveNode;
  // action
  actions?: ExprNode[];
  [key: string]: unknown;
}

export interface ReactiveNode {
  __reactive_node__: true;
  kind: 'expression' | 'memo' | string;
  nodeId: string;
  exprType: string;
  exprIR: ExprNode;
  dependencies: Dependency[];
  [key: string]: unknown;
}

export interface Dependency {
  sourceId: string;
  triggerType: string;
  sourceDomain?: string;
  sourceType?: string;
}

export interface ExprNode {
  kind: string;
  [key: string]: unknown;
}

export interface IRSection {
  key: string;
  value: IRValue;
}

export interface HAEntityRegistration {
  entityId: string;
  domain: string;
  sensorType: 'binary_sensor' | 'sensor' | 'text_sensor';
  generatedId: string;
  attribute?: string;
}

export interface ComponentRegistration {
  section: string;
  id: string;
  config: Record<string, unknown>;
}

export interface IRScriptDefinition {
  id: string;
  then: unknown[];
}

export interface ReactiveBinding {
  targetId: string;
  targetType: string;
  targetProp: string;
  expression: ReactiveNode;
  part?: string;
  state?: string;
}

export interface IRESPHomeData {
  sections: IRSection[];
  haEntities: HAEntityRegistration[];
  components: ComponentRegistration[];
  scripts: IRScriptDefinition[];
}

export interface IRThemeData {
  themeNames: string[];
  defaultIndex: number;
  leafData: Record<string, { values: unknown[]; valueType: string }>;
}

export interface IRESPComposeData {
  reactive: {
    bindings: ReactiveBinding[];
    memos: unknown[];
    effects: unknown[];
  };
  themes?: IRThemeData;
}

export interface IRData {
  esphome: IRESPHomeData;
  espcompose: IRESPComposeData;
}

// ── Tree model ─────────────────────────────────────────────────────────────

export type NodeKind =
  // Top-level structural containers
  | 'root'          // esphome / espcompose top nodes
  | 'group'         // count container (sections list, haEntities list…)
  // Registered IR items
  | 'section'       // a single top-level section (esphome, wifi, lvgl, …)
  | 'ha-entity'     // HAEntityRegistration
  | 'component'     // ComponentRegistration
  | 'script'        // IRScriptDefinition
  | 'script-action' // an item in script.then[]
  | 'binding'       // ReactiveBinding
  | 'reactive-node' // memo or effect in espcompose.reactive
  | 'theme-group'   // themes container
  | 'theme-leaf'    // a single theme design token
  // IRValue kinds — these mirror the actual kind field in the serialized IR
  | 'iv-object'     // { kind:"object", entries:[...] } — inlined; no "entries" wrapper
  | 'iv-array'      // { kind:"array", items:[...] }   — items become direct children
  | 'iv-ref'        // { kind:"ref", token }            — leaf, shows the token
  | 'iv-reactive'   // { kind:"reactive", node:{...} }  — leaf, shows expression info
  | 'iv-action'     // { kind:"action", actions:[...] } — children = action items
  | 'iv-widget';    // { kind:"object", entries:[{widgetType: {...}}] } — LVGL widget

export interface TreeNode {
  id: string;
  label: string;
  chip?: string;
  chipColor?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  nodeKind: NodeKind;
  /** Raw data for the detail panel */
  data: unknown;
  children?: TreeNode[];
}
