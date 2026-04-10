// ────────────────────────────────────────────────────────────────────────────
// Shared types for domain metadata generators
// ────────────────────────────────────────────────────────────────────────────

export interface TriggerVariable {
  name: string;
  cppType: string;
  tsType: string;
}

export interface TriggerSignature {
  variables: TriggerVariable[];
}

export interface PropertyDescriptor {
  name: string;
  cppPath: string;
  triggerType: string;
  exprType: 'bool' | 'float' | 'string';
  sourceDomain: string;
}

export interface ActionDescriptor {
  name: string;
  service: string;
  resultState?: string | null;
  defaultAttributes?: Record<string, unknown> | null;
}

export interface DomainDescriptor {
  sensorPlatform: 'binary_sensor' | 'sensor' | 'text_sensor';
  cppType: string;
  defaultState: string;
  activeState: string | null;
  uiCategory: 'toggleable' | 'sensor' | 'binary' | 'cover' | 'button';
  properties: PropertyDescriptor[];
  actions: ActionDescriptor[];
  triggers: Record<string, TriggerSignature>;
}

export type DomainMap = Record<string, DomainDescriptor>;

export interface GeneratorResult {
  outputPath: string;
  linesWritten: number;
}

export const FILE_HEADER = '// AUTO-GENERATED — DO NOT EDIT. Source: metadata/entity-domains.json\n';

