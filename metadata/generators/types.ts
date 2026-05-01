// ────────────────────────────────────────────────────────────────────────────
// Shared types for domain metadata generators
// ────────────────────────────────────────────────────────────────────────────

export type ValueScalarType = 'int' | 'float' | 'bool' | 'string';
export type ValueScalarFormat = 'id_ref' | 'entity';

export interface IRTypeDescriptor {
  type: ValueScalarType;
  format?: ValueScalarFormat;
  isArray?: boolean;
}

export interface TriggerVariable {
  name: string;
  irType: IRTypeDescriptor;
  tsType: string;
}

export interface TriggerSignature {
  variables: TriggerVariable[];
}

export interface PropertyDescriptor {
  name: string;
  propertyKey: string;
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
  irType: IRTypeDescriptor;
  defaultState: string;
  activeState: string | null;
  uiCategory: 'toggleable' | 'sensor' | 'binary' | 'cover' | 'button';
  properties: PropertyDescriptor[];
  actions: ActionDescriptor[];
  triggers: Record<string, TriggerSignature>;
  componentAccess: Record<string, string>;
}

export type DomainMap = Record<string, DomainDescriptor>;

export interface GeneratorResult {
  outputPath: string;
  linesWritten: number;
}

export const FILE_HEADER = '// AUTO-GENERATED — DO NOT EDIT. Source: metadata/entity-domains.json\n';

