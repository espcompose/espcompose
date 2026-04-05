// ── IR Data shapes (match the serialized output from ir-debug.ts) ──────────

// These are the top-level IRValue kinds that appear as entry values in the IR.
export type IRValueKind =
  | 'scalar'    // { kind, value, quoted? }
  | 'object'    // { kind, entries: [{key, value}] }
  | 'array'     // { kind, items: IRValue[] }
  | 'ref'       // { kind, token }
  | 'reactive'  // { kind, node: IRReactiveNode }
  | 'action';   // { kind, actions: IRExprNode[] }

export interface IREntry {
  kind: 'entry';
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
  node?: IRReactiveNode;
  // action
  actions?: IRExprNode[];
  [key: string]: unknown;
}

export interface IRReactiveNode {
  __reactive_node__: true;
  kind: 'expression' | 'memo' | string;
  nodeId: string;
  exprType: string;
  exprIR: IRExprNode;
  dependencies: IRDependency[];
  [key: string]: unknown;
}

export interface IRDependency {
  kind: 'dependency';
  sourceId: string;
  triggerType: string;
  sourceDomain?: string;
  sourceType?: string;
}

export interface IRExprNode {
  kind: string;
  [key: string]: unknown;
}

export interface IRSection {
  kind: 'section';
  key: string;
  value: IRValue;
}

export interface IRHAEntity {
  kind: 'ha_entity';
  entityId: string;
  domain: string;
  sensorType: 'binary_sensor' | 'sensor' | 'text_sensor';
  generatedId: string;
  attribute?: string;
}

export interface IRComponent {
  kind: 'component';
  section: string;
  id: string;
  config: Record<string, unknown>;
}

export interface IRScript {
  kind: 'script';
  id: string;
  then: unknown[];
}

export interface IRBinding {
  kind: 'binding';
  targetId: string;
  targetType: string;
  targetProp: string;
  expression: IRReactiveNode;
  part?: string;
  state?: string;
}

export interface IRESPHomeData {
  kind: 'esphome_data';
  sections: IRSection[];
  haEntities: IRHAEntity[];
  components: IRComponent[];
  scripts: IRScript[];
}

export interface IRThemeData {
  kind: 'theme_data';
  themeNames: string[];
  defaultIndex: number;
  leafData: Record<string, { values: unknown[]; valueType: string }>;
}

export interface IRESPComposeData {
  kind: 'espcompose_data';
  reactive: {
    kind: 'reactive_data';
    bindings: IRBinding[];
    memos: unknown[];
    effects: unknown[];
  };
  themes?: IRThemeData;
}

export interface IRData {
  kind: 'semantic_ir';
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
  | 'ha-entity'     // IRHAEntity
  | 'component'     // IRComponent
  | 'script'        // IRScript
  | 'script-action' // an item in script.then[]
  | 'binding'       // IRBinding
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
