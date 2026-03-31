import ts from 'typescript';
import type { SchemaConfigVar, SchemaDefinition, SchemaRegistry } from './schema-types.js';
import { OPTIONAL_FIELD_OVERRIDES, TYPE_OVERRIDES } from './overrides.js';
import { keyword, typeRef, stringLiteralType, unionType, arrayType, recordType, refPropType, triggerType, propSig, addJsDoc, embedPropType } from './ast-helpers.js';
import { inferDocTypeString } from './doc-type-inference.js';
import { TRIGGER_REGISTRY } from '../../packages/sdk/src/trigger-registry.js';
import { mergeExtends } from './schema-merge-utils.js';

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

export interface NestedInterface {
  name: string;
  members: ts.TypeElement[];
}

/**
 * Collects nested interfaces discovered while recursing over a schema.
 * Interfaces are ordered so that dependencies appear before their uses.
 */
export type InterfaceAccumulator = NestedInterface[];

/**
 * Convert a C++ class name (e.g. "i2c::I2CBus") to the marker interface name
 * used in markers.ts (e.g. "i2c_I2CBus").
 */
export function cppClassToMarkerName(cppClass: string): string {
  return cppClass.replace(/::/g, '_');
}

// ────────────────────────────────────────────────────────────────────────────
// Naming helpers
// ────────────────────────────────────────────────────────────────────────────

/** Convert snake_case (or kebab-case) identifier to PascalCase. */
export function toPascalCase(name: string): string {
  return name
    .replace(/[_-]([a-z0-9])/g, (_, c: string) => c.toUpperCase())
    .replace(/^[a-z]/, (c: string) => c.toUpperCase());
}

/** Convert snake_case (or kebab-case) identifier to camelCase. */
export function toCamelCase(name: string): string {
  return name
    .replace(/[_-]([a-z0-9])/g, (_, c: string) => c.toUpperCase())
    .replace(/^[A-Z]/, (c: string) => c.toLowerCase());
}

// ────────────────────────────────────────────────────────────────────────────
// Interface body builder
// ────────────────────────────────────────────────────────────────────────────

/**
 * Build the members of a TypeScript interface from an ESPHome `config_vars` map.
 *
 * Side-effects:
 *  - Pushes any discovered nested interfaces into `acc`.
 *  - Adds marker type names (e.g. "i2c_I2CBus") into `markerRefs` whenever a
 *    `use_id` field is encountered, so the caller can emit the correct imports.
 */
export function buildInterfaceBody(
  vars: Record<string, SchemaConfigVar>,
  /** PascalCase prefix used when naming auto-generated nested interfaces. */
  interfaceNamePrefix: string,
  acc: InterfaceAccumulator,
  /** Accumulates marker type names referenced by Ref<T> in this interface. */
  markerRefs: Set<string> = new Set(),
  /** Schema registry for resolving `extends` on inline sub-schemas. */
  registry: SchemaRegistry = new Map(),
  /** ESPHome domain name (e.g. 'binary_sensor') for trigger variable lookup. */
  domain?: string,
): ts.TypeElement[] {
  const members: ts.TypeElement[] = [];

  for (const [varName, varDef] of Object.entries(vars)) {
    const isOwnId = (varDef.key === 'GeneratedID' || varDef.id_type != null)
      && varDef.type !== 'use_id';
    if (isOwnId) continue;

    const camelName = toCamelCase(varName);
    const needsYamlKey = camelName !== varName;

    // String-keyed map (e.g. platformioOptions / platformio_options).
    if (varDef.key === 'String') {
      const valueType = resolveStringMapValueType(varDef);
      let prop = propSig(camelName, recordType(keyword('string'), valueType), true);
      prop = attachDoc(prop, varDef.docs, needsYamlKey ? varName : undefined);
      members.push(prop);
      continue;
    }

    const typeOverride = TYPE_OVERRIDES.get(varName);
    const { typeNode: schemaType, required } = resolveConfigVar(varName, varDef, interfaceNamePrefix, acc, markerRefs, registry, domain);
    let typeNode = typeOverride
      ? unionType([schemaType, ...typeOverride.map((v) => stringLiteralType(v))])
      : schemaType;

    // Wrap embeddable types (string, number) with EmbedValue<T> union.
    // This allows props to accept build-time values via embed.*().
    // Skip trigger props, refs, objects, arrays, and enums — they're not embeddable.
    if (isEmbeddableType(varDef) && !typeOverride) {
      typeNode = embedPropType(typeNode);
    }

    const isOverriddenOptional = OPTIONAL_FIELD_OVERRIDES.has(`${interfaceNamePrefix}.${varName}`);
    const optional = !(required && varDef.key !== 'GeneratedID' && !isOverriddenOptional);

    let prop = propSig(camelName, typeNode, optional);
    prop = attachDoc(prop, varDef.docs, needsYamlKey ? varName : undefined);
    members.push(prop);
  }

  return members;
}

/**
 * Determine if a config var type is embeddable (can accept EmbedValue<T>).
 * Only simple value types (string, number, boolean, pin) are embeddable.
 * Trigger props, refs, enums, schemas, and complex types are not.
 */
function isEmbeddableType(varDef: SchemaConfigVar): boolean {
  if (varDef.type === 'trigger') return false;
  if (varDef.type === 'use_id') return false;
  if (varDef.type === 'enum') return false;
  if (varDef.type === 'schema') return false;
  if (varDef.type === 'typed') return false;
  if (varDef.is_list) return false;
  // Simple value types
  return (
    varDef.type === 'string' ||
    varDef.type === 'boolean' ||
    varDef.type === 'integer' ||
    varDef.type === 'float' ||
    varDef.type === 'pin'
  );
}

// ────────────────────────────────────────────────────────────────────────────
// C++ primitive → TypeScript type mapping
// ────────────────────────────────────────────────────────────────────────────

/**
 * C++ primitive types that appear as `use_id_type` in the ESPHome schema but
 * are not real component classes. Map them to plain TypeScript types instead
 * of wrapping them in `Ref<T>`.
 */
export const CPP_PRIMITIVE_TO_TS = new Map<string, string>([
  ['int', 'number'],
  ['int8_t', 'number'],
  ['int16_t', 'number'],
  ['int32_t', 'number'],
  ['int64_t', 'number'],
  ['uint8_t', 'number'],
  ['uint16_t', 'number'],
  ['uint32_t', 'number'],
  ['uint64_t', 'number'],
  ['float', 'number'],
  ['double', 'number'],
  ['bool', 'boolean'],
  ['std::string', 'string'],
]);

const TIME_PERIOD_UNITS = new Set([
  'days',
  'hours',
  'minutes',
  'seconds',
  'milliseconds',
  'microseconds',
]);

/**
 * Maps ESPHome `data_type` constraint names to TypeScript primitive types.
 * Used as a last-resort fallback when neither `type` nor a docs marker is present.
 */
export const DATA_TYPE_TO_TS = new Map<string, 'number' | 'string' | 'boolean'>([
  ['uint8_t', 'number'],
  ['uint16_t', 'number'],
  ['uint32_t', 'number'],
  ['hex_uint8_t', 'number'],
  ['hex_uint16_t', 'number'],
  ['hex_uint32_t', 'number'],
  ['positive_int', 'number'],
  ['positive_not_null_int', 'number'],
  ['positive_float', 'number'],
  ['zero_to_one_float', 'number'],
  ['port', 'number'],
  ['device_address', 'number'],
  ['output', 'number'],
]);

// ────────────────────────────────────────────────────────────────────────────
// Internal helpers
// ────────────────────────────────────────────────────────────────────────────

function resolveConfigVar(
  varName: string,
  varDef: SchemaConfigVar,
  interfaceNamePrefix: string,
  acc: InterfaceAccumulator,
  markerRefs: Set<string>,
  registry: SchemaRegistry,
  domain?: string,
): { typeNode: ts.TypeNode; required: boolean } {
  const required = varDef.key === 'Required';
  const baseType = resolveBaseType(varName, varDef, interfaceNamePrefix, acc, markerRefs, registry, domain);
  const typeNode = varDef.is_list ? arrayType(baseType) : baseType;
  return { typeNode, required };
}

function resolveBaseType(
  varName: string,
  varDef: SchemaConfigVar,
  interfaceNamePrefix: string,
  acc: InterfaceAccumulator,
  markerRefs: Set<string>,
  registry: SchemaRegistry,
  domain?: string,
): ts.TypeNode {
  switch (varDef.type) {
    case 'string':
      return keyword('string');
    case 'boolean':
      return keyword('boolean');
    case 'integer':
    case 'float':
      return keyword('number');
    case 'enum': {
      const vals = Object.keys(varDef.values ?? {});
      return vals.length > 0
        ? unionType(vals.map((v) => stringLiteralType(v)))
        : keyword('string');
    }
    case 'schema': {
      const docType = inferUntypedType(varDef.docs, varDef.is_list === true);
      if (docType) return docType;

      const inlineSchema = varDef.schema;
      if (inlineSchema) {
        const mergedVars = mergeExtends(inlineSchema, registry);
        if (isTimePeriodSchema(mergedVars)) return typeRef('TimePeriod');
        if (Object.keys(mergedVars).length > 0) {
          const name = generateNestedInterface(varName, { ...inlineSchema, config_vars: mergedVars }, interfaceNamePrefix, acc, markerRefs, registry, domain);
          return typeRef(name);
        }
      }
      return recordType(keyword('string'), keyword('unknown'));
    }
    case 'pin':
      return typeRef('Pin');
    case 'trigger': {
      const sig = domain ? TRIGGER_REGISTRY[domain]?.[varName] : undefined;
      return triggerType(sig?.variables);
    }
    case 'use_id': {
      const cppClass = varDef.use_id_type;
      if (cppClass) {
        const primitiveType = CPP_PRIMITIVE_TO_TS.get(cppClass);
        if (primitiveType) return keyword(primitiveType as 'string' | 'number' | 'boolean');

        const markerName = cppClass.replace(/::/g, '_');
        const validIdent = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
        if (validIdent.test(markerName)) {
          markerRefs.add(markerName);
          return refPropType(markerName);
        }
      }
      return typeRef('RefProp', [keyword('unknown')]);
    }
    default:
      if (varDef.type == null) {
        const inferred = inferUntypedType(varDef.docs, varDef.is_list === true);
        if (inferred) return inferred;
        const fromDataType = varDef.data_type ? DATA_TYPE_TO_TS.get(varDef.data_type) : undefined;
        if (fromDataType) return keyword(fromDataType);
      }
      return keyword('unknown');
  }
}

function isTimePeriodSchema(vars: Record<string, SchemaConfigVar>): boolean {
  const keys = Object.keys(vars);
  if (keys.length === 0) return false;
  return keys.every((k) => TIME_PERIOD_UNITS.has(k));
}

function inferUntypedType(docs?: string, isList = false): ts.TypeNode | null {
  const inferred = inferDocTypeString(docs);
  switch (inferred) {
    case 'string':
      return keyword('string');
    case 'string[]':
      return isList ? keyword('string') : arrayType(keyword('string'));
    case 'number':
      return keyword('number');
    case 'boolean':
      return keyword('boolean');
    case 'TriggerHandler':
      return typeRef('TriggerHandler');
    case 'TriggerHandler | boolean':
      return unionType([typeRef('TriggerHandler'), keyword('boolean')]);
    case 'TimePeriod':
      return typeRef('TimePeriod');
    case 'MACAddress':
      return typeRef('MACAddress');
    case 'IPv4Address':
      return typeRef('IPv4Address');
    case 'number[]':
      return isList ? keyword('number') : arrayType(keyword('number'));
    case 'string | number[]':
      return unionType([keyword('string'), arrayType(keyword('number'))]);
    case 'string | string[]':
      return unionType([keyword('string'), arrayType(keyword('string'))]);
    default:
      return null;
  }
}

function generateNestedInterface(
  varName: string,
  schema: SchemaDefinition,
  interfaceNamePrefix: string,
  acc: InterfaceAccumulator,
  markerRefs: Set<string>,
  registry: SchemaRegistry,
  domain?: string,
): string {
  const interfaceName = `${interfaceNamePrefix}${toPascalCase(toCamelCase(varName))}Props`;

  if (acc.some((ni) => ni.name === interfaceName)) return interfaceName;

  // Derive domain from the nested schema's extends chain if not explicitly provided.
  // This handles cases like haier binary_sensor where nested schemas extend
  // a platform base (e.g. binary_sensor._BINARY_SENSOR_SCHEMA).
  const nestedDomain = domain ?? schema.extends?.find(e => e.includes('.'))?.split('.')[0];

  const vars = schema.config_vars ?? {};
  const members = buildInterfaceBody(vars, interfaceName, acc, markerRefs, registry, nestedDomain);

  acc.push({ name: interfaceName, members });
  return interfaceName;
}

// Re-export mergeExtends so existing importers continue to work.
export { mergeExtends } from './schema-merge-utils.js';

// ────────────────────────────────────────────────────────────────────────────
// Special prop type helpers — used by extends-resolver and file-generators
// ────────────────────────────────────────────────────────────────────────────

function nodeUsesTypeRef(node: ts.Node, typeName: string): boolean {
  if (ts.isTypeReferenceNode(node) && ts.isIdentifier(node.typeName) && node.typeName.text === typeName) {
    return true;
  }
  let found = false;
  ts.forEachChild(node, (child) => {
    if (!found && nodeUsesTypeRef(child, typeName)) found = true;
  });
  return found;
}

function membersUseTypeRef(members: ts.TypeElement[], typeName: string): boolean {
  return members.some((m) => nodeUsesTypeRef(m, typeName));
}

function nestedInterfacesUseTypeRef(nested: InterfaceAccumulator, typeName: string): boolean {
  return nested.some((ni) => membersUseTypeRef(ni.members, typeName));
}

const SPECIAL_PROP_TYPES = ['TimePeriod', 'MACAddress', 'IPv4Address'] as const;

export function collectSpecialPropTypesFromMembers(members: ts.TypeElement[]): string[] {
  return SPECIAL_PROP_TYPES.filter((typeName) => membersUseTypeRef(members, typeName));
}

export function collectSpecialPropTypesFromNested(nested: InterfaceAccumulator): string[] {
  return SPECIAL_PROP_TYPES.filter((typeName) => nestedInterfacesUseTypeRef(nested, typeName));
}

function resolveStringMapValueType(varDef: SchemaConfigVar): ts.TypeNode {
  const innerVars = varDef.schema?.config_vars ?? {};
  if ('string' in innerVars && innerVars['string']?.type === 'string') return keyword('string');
  return keyword('unknown');
}

function cleanDocString(docs: string | undefined): string {
  if (!docs) return '';
  const firstLine = docs
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .split('\n')[0]
    .replace(/\*See also.*/i, '')
    .replace(/\s+/g, ' ')
    .trim();
  return firstLine.length > 120 ? `${firstLine.slice(0, 117)}...` : firstLine;
}

function attachDoc<T extends ts.Node>(node: T, docs: string | undefined, yamlKey?: string): T {
  const truncated = cleanDocString(docs);
  if (!truncated && !yamlKey) return node;

  const jsDocLines: string[] = [];
  if (truncated) jsDocLines.push(truncated);
  if (yamlKey) jsDocLines.push(`@yamlKey ${yamlKey}`);

  return addJsDoc(node, jsDocLines);
}
