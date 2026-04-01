/**
 * Component file generators for ESPHome codegen.
 *
 * Builds TypeScript source for standalone components, open-schema components,
 * and platform discriminated-union files.
 */

import ts from 'typescript';
import type { SchemaDefinition, SchemaConfigVar, SchemaRegistry, ComponentEntry } from './schema-types.js';
import {
  buildInterfaceBody, toPascalCase, toCamelCase,
  cppClassToMarkerName, CPP_PRIMITIVE_TO_TS, mergeExtends,
  collectSpecialPropTypesFromMembers, collectSpecialPropTypesFromNested,
  type InterfaceAccumulator,
} from './type-mapper.js';
import { filterOwnVars } from './schema-merge-utils.js';
import { resolveConfigSchema, type ExtendsStub } from './extends-resolver.js';
import type { SchemaTarget, PlatformComponent } from './schema-registry.js';
import { COMPONENT_SCHEMA_OVERRIDES } from './overrides.js';
import {
  printStatements, addFileHeader, addJsDoc,
  keyword, typeRef, stringLiteralType, unionType, intersectionType, typeLiteral,
  componentPropsType,
  propSig, indexSig,
  interfaceDecl, typeAliasDecl,
  importTypeDecl, globalJsxAugmentation,
} from './ast-helpers.js';

// ────────────────────────────────────────────────────────────────────────────
// Own-class helper
// ────────────────────────────────────────────────────────────────────────────

/**
 * Find the C++ class of the component's own primary ID field.
 * Prefers `key === 'GeneratedID'` entries (the component's own identity) over
 * other `id_type`-bearing fields (which may be references to sub-components
 * like zigbee_binary_sensor or mqtt_id).
 * Skips C++ primitives (uint8_t, etc.) since they aren't valid marker types.
 */
export function findOwnClass(configVars: Record<string, SchemaConfigVar>): string | null {
  // First pass: look for an explicit GeneratedID field — this is the canonical identity.
  for (const varDef of Object.values(configVars)) {
    if (varDef.key === 'GeneratedID' && varDef.type !== 'use_id'
        && varDef.id_type?.class && !CPP_PRIMITIVE_TO_TS.has(varDef.id_type.class)) {
      return varDef.id_type.class;
    }
  }
  // Second pass: fall back to any field that carries id_type (some schemas use
  // 'Required' or 'Optional' instead of 'GeneratedID' for the identity field).
  for (const varDef of Object.values(configVars)) {
    if (varDef.id_type != null && varDef.type !== 'use_id'
        && varDef.id_type.class && !CPP_PRIMITIVE_TO_TS.has(varDef.id_type.class)) {
      return varDef.id_type.class;
    }
  }
  return null;
}

/**
 * Resolve the marker class for a platform component.  Checks the component's
 * *own* config_vars first (no merge) to avoid the `mergeExtends` field-overwrite
 * bug where a later extends entry (e.g. zigbee base) overwrites the platform
 * base's GeneratedID.  Falls back to `platformBaseClass` when the component's
 * own schema doesn't carry a GeneratedID.
 */
function resolvePlatformMarkerClass(
  compSchema: SchemaDefinition | null,
  platformBaseClass: string | null,
): string | null {
  if (compSchema) {
    const ownClass = findOwnClass(compSchema.config_vars ?? {});
    if (ownClass) return ownClass;
  }
  return platformBaseClass;
}

// ────────────────────────────────────────────────────────────────────────────
// Standalone file generation
// ────────────────────────────────────────────────────────────────────────────

/**
 * Build a TypeScript file for a component whose CONFIG_SCHEMA exists but
 * carries no type information (e.g. `psram`, whose schema is `{}`).
 *
 * The emitted interface uses an index signature so that firmware authors can
 * pass any camelCase props they need — the runtime will snake_case them into
 * the YAML output as usual.
 */
function buildOpenStandaloneFileContent(
  target: SchemaTarget,
): string {
  const pascalName = toPascalCase(target.name);
  const interfaceName = `${pascalName}Props`;

  const statements: ts.Statement[] = [
    importTypeDecl(['ComponentProps'], '../../types'),
    addJsDoc(
      interfaceDecl(interfaceName, [
        addJsDoc(
          indexSig(keyword('string'), keyword('unknown')),
          ['Accepts any props — the upstream schema provides no type information.'],
        ),
      ], { exported: true }),
      [`${interfaceName} — open interface (upstream schema has no typed config)`],
    ),
    globalJsxAugmentation([{
      tagName: target.name,
      type: intersectionType([typeRef(interfaceName), typeRef('ComponentProps')]),
    }]),
  ];

  const printed = printStatements(statements);
  return addFileHeader(printed, [
    `AUTO-GENERATED — DO NOT EDIT.`,
    `Regenerate with: pnpm codegen`,
  ]);
}

/**
 * Build the content of a generated TypeScript file for one standalone schema
 * entry (e.g. wifi, api, esphome). Returns null if the entry has no
 * CONFIG_SCHEMA at all.
 *
 * When the CONFIG_SCHEMA exists but is empty (no `type` / no `config_vars`),
 * a permissive "open" interface is emitted so that firmware authors can pass
 * arbitrary props — this covers components like `psram` whose schema is
 * published without details.
 */
export function buildStandaloneFileContent(
  target: SchemaTarget,
  entry: ComponentEntry,
  registry: SchemaRegistry,
  globalStubs: Map<string, ExtendsStub>,
): string | null {
  const configSchemaEntry = entry?.schemas?.CONFIG_SCHEMA;
  if (!configSchemaEntry) return null;

  // Check for a manually authored override before falling back to the open interface
  const schemaOverride = COMPONENT_SCHEMA_OVERRIDES.get(target.name);

  const isEmptySchema = configSchemaEntry.type !== 'schema';
  if (isEmptySchema && !schemaOverride) {
    return buildOpenStandaloneFileContent(target);
  }

  const rawSchema = schemaOverride ?? (configSchemaEntry.schema as SchemaDefinition);
  const pascalName = toPascalCase(target.name);
  const interfaceName = `${pascalName}Props`;

  const nestedInterfaces: InterfaceAccumulator = [];
  const markerRefs = new Set<string>();

  const topExtendsNames: string[] = [];
  const baseImports = new Set<string>();
  for (const baseRef of rawSchema.extends ?? []) {
    const stub = globalStubs.get(baseRef);
    if (stub) {
      topExtendsNames.push(stub.stubName);
      baseImports.add(stub.stubName);
    }
  }

  const ownVars = filterOwnVars(rawSchema, registry);
  const members = Object.keys(ownVars).length > 0
    ? buildInterfaceBody(ownVars, pascalName, nestedInterfaces, markerRefs, registry, target.name)
    : [];
  const specialTypes = [...new Set([
    ...collectSpecialPropTypesFromMembers(members),
    ...collectSpecialPropTypesFromNested(nestedInterfaces),
  ])];

  const mergedVarsForMarker = mergeExtends(rawSchema, registry);
  const ownClass = findOwnClass(mergedVarsForMarker);
  const ownMarker = ownClass ? cppClassToMarkerName(ownClass) : null;
  if (ownMarker) markerRefs.add(ownMarker);

  // ── Build AST statements ──────────────────────────────────────────────────
  const statements: ts.Statement[] = [];

  // Imports
  const typesImports = [
    'ComponentProps',
    'Pin',
    ...specialTypes,
    'TriggerHandler',

    ...(markerRefs.size > 0 ? ['RefProp'] : []),
  ];
  statements.push(importTypeDecl(typesImports, '../../types'));
  if (baseImports.size > 0) {
    statements.push(importTypeDecl([...baseImports], '../bases'));
  }
  if (markerRefs.size > 0) {
    statements.push(importTypeDecl([...markerRefs], '../markers'));
  }

  // Nested interfaces
  for (const ni of nestedInterfaces) {
    statements.push(interfaceDecl(ni.name, ni.members, { exported: true }));
  }

  // Main props interface
  statements.push(interfaceDecl(interfaceName, members, {
    exported: true,
    extends: topExtendsNames.length > 0 ? topExtendsNames : undefined,
  }));

  // JSX augmentation
  const cpt = ownMarker ? componentPropsType(ownMarker) : componentPropsType();
  statements.push(globalJsxAugmentation([{
    tagName: target.name,
    type: intersectionType([typeRef(interfaceName), cpt]),
  }]));

  const printed = printStatements(statements);
  return addFileHeader(printed, [
    `AUTO-GENERATED — DO NOT EDIT.`,
    `Regenerate with: pnpm codegen`,
  ]);
}

// ────────────────────────────────────────────────────────────────────────────
// Platform union file generation
// ────────────────────────────────────────────────────────────────────────────

/**
 * Build the content of a generated TypeScript file for one ESPHome platform.
 *
 * The file exports a single discriminated union type, e.g.:
 *
 *   export type BinarySensorProps =
 *     | BinarySensorBaseProps & { platform: 'gpio' } & GpioProps
 *     | BinarySensorBaseProps & { platform: 'analog_threshold' } & AnalogThresholdProps
 *     | ...;
 *
 * And registers the JSX element:
 *
 *   binary_sensor: BinarySensorProps & BaseProps;
 *
 * All nested and per-component interfaces are file-internal (not exported) to
 * avoid barrel-level naming conflicts when the same component name appears under
 * multiple platforms (e.g. "template" under both alarm_control_panel and climate).
 */
export function buildPlatformFileContent(
  platformName: string,
  platformEntry: ComponentEntry | null,
  components: PlatformComponent[],
  platformUrl: string,
  registry: SchemaRegistry,
  globalStubs: Map<string, ExtendsStub>,
): string | null {
  if (components.length === 0) return null;

  const platformPascal = toPascalCase(platformName);
  const unionTypeName = `${platformPascal}Props`;

  // ── Platform base props ───────────────────────────────────────────────────
  const namedSchemaDef = (() => {
    const candidate = `${platformName}._${platformName.toUpperCase()}_SCHEMA`;
    return registry.get(candidate) ?? null;
  })();
  const platConfigSchema = platformEntry?.schemas?.CONFIG_SCHEMA;
  const platRawSchema: SchemaDefinition | null = namedSchemaDef
    ?? (platConfigSchema?.type === 'schema' ? (platConfigSchema.schema as SchemaDefinition) : null);

  const platBaseRef = namedSchemaDef
    ? `${platformName}._${platformName.toUpperCase()}_SCHEMA`
    : null;

  const allNested: InterfaceAccumulator = [];
  const markerRefs = new Set<string>();
  const baseImports = new Set<string>();

  const baseExtendsNames: string[] = [];
  if (platRawSchema) {
    for (const baseRef of platRawSchema.extends ?? []) {
      const stub = globalStubs.get(baseRef);
      if (stub) {
        baseExtendsNames.push(stub.stubName);
        baseImports.add(stub.stubName);
      }
    }
  }
  const platOwnVars = filterOwnVars(platRawSchema ?? undefined, registry);
  // Compute the platform base class once — used as fallback for per-component markers.
  // Check own config_vars first to avoid the mergeExtends Object.assign overwrite bug.
  const platBaseClass = platRawSchema
    ? (findOwnClass(platRawSchema.config_vars ?? {})
       ?? findOwnClass(mergeExtends(platRawSchema, registry)))
    : null;
  const hasPlatformBase = platRawSchema != null
    && (Object.keys(platOwnVars).length > 0 || baseExtendsNames.length > 0);
  const baseInterfaceName = `${platformPascal}BaseProps`;
  const baseMembers = Object.keys(platOwnVars).length > 0
    ? buildInterfaceBody(platOwnVars, platformPascal, allNested, markerRefs, registry, platformName)
    : [];

  // ── Per-component interfaces ──────────────────────────────────────────────

  interface PlatComponentInterface {
    componentName: string;
    interfaceName: string;
    members: ts.TypeElement[];
    ownMarker: string | null;
    extendsNames: string[];
    typedDiscriminant?: { camelKey: string; value: string };
  }

  const componentInterfaces: PlatComponentInterface[] = [];

  for (const comp of components) {
    const configSchema = comp.entry?.schemas?.CONFIG_SCHEMA;
    const compPascal = toPascalCase(comp.name);

    if (configSchema?.type === 'typed') {
      const typed = configSchema as unknown as {
        typed_key: string;
        types: Record<string, SchemaDefinition>;
      };
      const camelKey = toCamelCase(typed.typed_key);

      for (const [variantName, variantDef] of Object.entries(typed.types)) {
        const variantPascal = `${compPascal}${toPascalCase(variantName)}`;

        const variantExtendsNames: string[] = [];
        for (const baseRef of variantDef.extends ?? []) {
          if (baseRef === platBaseRef) continue;
          const stub = globalStubs.get(baseRef);
          if (stub) {
            variantExtendsNames.push(stub.stubName);
            baseImports.add(stub.stubName);
          }
        }

        const variantOwnVars = filterOwnVars(variantDef, registry, platBaseRef ? [platBaseRef] : undefined);
        const members = Object.keys(variantOwnVars).length > 0
          ? buildInterfaceBody(variantOwnVars, variantPascal, allNested, markerRefs, registry, platformName)
          : [];

        const variantClass = resolvePlatformMarkerClass(variantDef, platBaseClass);
        const variantMarker = variantClass ? cppClassToMarkerName(variantClass) : null;
        if (variantMarker) markerRefs.add(variantMarker);

        componentInterfaces.push({
          componentName: comp.name,
          interfaceName: `${variantPascal}Props`,
          members,
          ownMarker: variantMarker,
          extendsNames: variantExtendsNames,
          typedDiscriminant: { camelKey, value: variantName },
        });
      }
      continue;
    }

    const compRawSchema = resolveConfigSchema(configSchema);

    const compExtendsNames: string[] = [];
    for (const baseRef of compRawSchema?.extends ?? []) {
      if (baseRef === platBaseRef) continue;
      const stub = globalStubs.get(baseRef);
      if (stub) {
        compExtendsNames.push(stub.stubName);
        baseImports.add(stub.stubName);
      }
    }

    const compOwnVars = filterOwnVars(compRawSchema ?? undefined, registry, platBaseRef ? [platBaseRef] : undefined);
    const members = Object.keys(compOwnVars).length > 0
      ? buildInterfaceBody(compOwnVars, compPascal, allNested, markerRefs, registry, platformName)
      : [];

    const compOwnClass = resolvePlatformMarkerClass(compRawSchema, platBaseClass);
    const compOwnMarker = compOwnClass ? cppClassToMarkerName(compOwnClass) : null;
    if (compOwnMarker) markerRefs.add(compOwnMarker);

    componentInterfaces.push({
      componentName: comp.name,
      interfaceName: `${compPascal}Props`,
      members,
      ownMarker: compOwnMarker,
      extendsNames: compExtendsNames,
    });
  }

  const specialTypes = [...new Set([
    ...collectSpecialPropTypesFromMembers(baseMembers),
    ...componentInterfaces.flatMap((ci) => collectSpecialPropTypesFromMembers(ci.members)),
    ...collectSpecialPropTypesFromNested(allNested),
  ])];

  // ── Build AST statements ──────────────────────────────────────────────────
  const statements: ts.Statement[] = [];

  // Imports
  const typesImports = [
    'ComponentProps',
    'Pin',
    ...specialTypes,
    'TriggerHandler',

    ...(markerRefs.size > 0 ? ['RefProp'] : []),
  ];
  statements.push(importTypeDecl(typesImports, '../../types'));
  if (baseImports.size > 0) {
    statements.push(importTypeDecl([...baseImports], '../bases'));
  }
  if (markerRefs.size > 0) {
    statements.push(importTypeDecl([...markerRefs], '../markers'));
  }

  // Nested interfaces (file-internal, not exported)
  for (const ni of allNested) {
    statements.push(interfaceDecl(ni.name, ni.members));
  }

  // Platform base interface
  if (hasPlatformBase) {
    statements.push(interfaceDecl(baseInterfaceName, baseMembers, {
      extends: baseExtendsNames.length > 0 ? baseExtendsNames : undefined,
    }));
  }

  // Per-component interfaces
  for (const ci of componentInterfaces) {
    const shouldEmit = ci.members.length > 0 || ci.extendsNames.length > 0;
    if (shouldEmit) {
      statements.push(interfaceDecl(ci.interfaceName, ci.members, {
        extends: ci.extendsNames.length > 0 ? ci.extendsNames : undefined,
      }));
    }
  }

  // Discriminated union type
  const unionMembers: ts.TypeNode[] = componentInterfaces.map((ci) => {
    const hasInterface = ci.members.length > 0 || ci.extendsNames.length > 0;
    const parts: ts.TypeNode[] = [];

    if (hasPlatformBase) parts.push(typeRef(baseInterfaceName));

    // Discriminant: { platform: 'name' } or { platform: 'name', dacType: 'variant' }
    const discriminantMembers: ts.TypeElement[] = [
      propSig('platform', stringLiteralType(ci.componentName), false),
    ];
    if (ci.typedDiscriminant) {
      discriminantMembers.push(
        propSig(ci.typedDiscriminant.camelKey, stringLiteralType(ci.typedDiscriminant.value), false),
      );
    }
    parts.push(typeLiteral(discriminantMembers));

    if (hasInterface) parts.push(typeRef(ci.interfaceName));

    const cpt = ci.ownMarker ? componentPropsType(ci.ownMarker) : componentPropsType();
    parts.push(cpt);

    return intersectionType(parts);
  });

  statements.push(typeAliasDecl(unionTypeName, unionType(unionMembers), true));

  // JSX augmentation
  statements.push(globalJsxAugmentation([{
    tagName: platformName,
    type: typeRef(unionTypeName),
  }]));

  const printed = printStatements(statements);
  return addFileHeader(printed, [
    `AUTO-GENERATED — DO NOT EDIT.`,
    `Regenerate with: pnpm codegen`,
  ]);
}
