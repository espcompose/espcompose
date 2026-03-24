import ts from 'typescript';
import type { SchemaConfigVar, SchemaDefinition, SchemaRegistry } from './schema-types.js';
import { OPTIONAL_FIELD_OVERRIDES, TYPE_OVERRIDES } from './overrides.js';
import { keyword, typeRef, stringLiteralType, unionType, arrayType, recordType, refPropType, voidFunctionType, propSig, addJsDoc } from './ast-helpers.js';

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
    const { typeNode: schemaType, required } = resolveConfigVar(varName, varDef, interfaceNamePrefix, acc, markerRefs, registry);
    const typeNode = typeOverride
      ? unionType([schemaType, ...typeOverride.map((v) => stringLiteralType(v))])
      : schemaType;
    const isOverriddenOptional = OPTIONAL_FIELD_OVERRIDES.has(`${interfaceNamePrefix}.${varName}`);
    const optional = !(required && varDef.key !== 'GeneratedID' && !isOverriddenOptional);

    let prop = propSig(camelName, typeNode, optional);
    prop = attachDoc(prop, varDef.docs, needsYamlKey ? varName : undefined);
    members.push(prop);
  }

  return members;
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
): { typeNode: ts.TypeNode; required: boolean } {
  const required = varDef.key === 'Required';
  const baseType = resolveBaseType(varName, varDef, interfaceNamePrefix, acc, markerRefs, registry);
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
      const inlineSchema = varDef.schema;
      if (inlineSchema) {
        const mergedVars = mergeExtends(inlineSchema, registry);
        if (Object.keys(mergedVars).length > 0) {
          const name = generateNestedInterface(varName, { ...inlineSchema, config_vars: mergedVars }, interfaceNamePrefix, acc, markerRefs, registry);
          return typeRef(name);
        }
      }
      return recordType(keyword('string'), keyword('unknown'));
    }
    case 'pin':
      return typeRef('Pin');
    case 'trigger':
      return voidFunctionType();
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
      return keyword('unknown');
  }
}

function generateNestedInterface(
  varName: string,
  schema: SchemaDefinition,
  interfaceNamePrefix: string,
  acc: InterfaceAccumulator,
  markerRefs: Set<string>,
  registry: SchemaRegistry,
): string {
  const interfaceName = `${interfaceNamePrefix}${toPascalCase(toCamelCase(varName))}Props`;

  if (acc.some((ni) => ni.name === interfaceName)) return interfaceName;

  const vars = schema.config_vars ?? {};
  const members = buildInterfaceBody(vars, interfaceName, acc, markerRefs, registry);

  acc.push({ name: interfaceName, members });
  return interfaceName;
}

/**
 * Recursively flatten `extends` references in a schema definition,
 * merging all inherited config_vars with own config_vars (own wins).
 */
export function mergeExtends(
  schema: SchemaDefinition,
  registry: SchemaRegistry,
  _visited: Set<string> = new Set(),
): Record<string, SchemaConfigVar> {
  const merged: Record<string, SchemaConfigVar> = {};
  for (const ref of schema.extends ?? []) {
    if (_visited.has(ref)) continue;
    _visited.add(ref);
    const refDef = registry.get(ref);
    if (!refDef) continue;
    const inherited = mergeExtends(refDef, registry, _visited);
    Object.assign(merged, inherited);
  }
  Object.assign(merged, schema.config_vars ?? {});
  return merged;
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
