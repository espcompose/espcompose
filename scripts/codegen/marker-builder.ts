/**
 * Marker class collection and markers.ts generation for ESPHome codegen.
 *
 * Collects C++ classes referenced across schemas via id_type/use_id_type,
 * builds the marker→action-class mapping, and emits phantom type brands
 * for Ref<T>.
 */

import ts from 'typescript';
import type { SchemaConfigVar, ComponentEntry, SchemaDefinition, SchemaRegistry } from './schema-types.js';
import { cppClassToMarkerName, CPP_PRIMITIVE_TO_TS } from './type-mapper.js';
import { resolveConfigSchema } from './extends-resolver.js';
import {
  printStatements, addFileHeader, addLineComment,
  interfaceDecl,
} from './ast-helpers.js';

// ────────────────────────────────────────────────────────────────────────────
// Class collection
// ────────────────────────────────────────────────────────────────────────────

/**
 * Walk all config_vars in a ComponentEntry and collect every C++ class string
 * referenced by `id_type.class` and `use_id_type`.
 *
 * For typed schemas each variant is walked individually so that per-variant
 * C++ classes (e.g. TemplateDate / TemplateTime / TemplateDateTime) are all
 * collected rather than only the first-seen one from the flattened merge.
 */
export function collectMarkerClasses(entry: ComponentEntry, out: Set<string>, parentMap: Map<string, string[]>): void {
  const configSchema = entry?.schemas?.CONFIG_SCHEMA;
  if (!configSchema) return;

  if (configSchema.type === 'typed') {
    const typed = configSchema as unknown as { typed_key: string; types: Record<string, SchemaDefinition> };
    for (const variantDef of Object.values(typed.types)) {
      walkConfigVars(variantDef.config_vars ?? {}, out, parentMap);
    }
    return;
  }

  const schema = resolveConfigSchema(configSchema);
  if (!schema) return;
  walkConfigVars(schema.config_vars ?? {}, out, parentMap);
}

export function walkConfigVars(vars: Record<string, SchemaConfigVar>, out: Set<string>, parentMap: Map<string, string[]>): void {
  for (const varDef of Object.values(vars)) {
    if (varDef.id_type?.class) {
      out.add(varDef.id_type.class);
      if (varDef.id_type.parents?.length) {
        parentMap.set(varDef.id_type.class, varDef.id_type.parents);
        for (const p of varDef.id_type.parents) out.add(p);
      }
    }
    if (varDef.use_id_type) out.add(varDef.use_id_type);
    if (varDef.schema?.config_vars) walkConfigVars(varDef.schema.config_vars, out, parentMap);
  }
}

/**
 * Collect marker classes from all schemas in the registry
 * (covers inherited fields that aren't in a component's own config_vars).
 */
export function collectRegistryClasses(registry: SchemaRegistry, out: Set<string>, parentMap: Map<string, string[]>): void {
  for (const def of registry.values()) {
    if (def.config_vars) walkConfigVars(def.config_vars, out, parentMap);
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Ancestor walking
// ────────────────────────────────────────────────────────────────────────────

/**
 * Walk the C++ parent chain for `cls`, returning all ancestor class names
 * (including `cls` itself).  Cycle-safe via visited set.
 */
export function getAncestors(
  cls: string,
  parentMap: Map<string, string[]>,
  visited = new Set<string>(),
): string[] {
  if (visited.has(cls)) return [];
  visited.add(cls);
  const list = [cls];
  for (const p of parentMap.get(cls) ?? []) {
    if (!CPP_PRIMITIVE_TO_TS.has(p)) {
      list.push(...getAncestors(p, parentMap, visited));
    }
  }
  return list;
}

// ────────────────────────────────────────────────────────────────────────────
// Marker → action class mapping
// ────────────────────────────────────────────────────────────────────────────

export interface MarkerClassResult {
  /** Maps every marker type name → list of C++ classes whose actions apply. */
  markerClassMap: Map<string, string[]>;
  /** Maps each C++ class with actions → its marker brand name. */
  classBrandMap: Map<string, string>;
}

export function buildMarkerClassMap(
  classes: Set<string>,
  parentMap: Map<string, string[]>,
  actionClassKeys: Set<string>,
): MarkerClassResult {
  const validIdent = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
  const markerClassMap = new Map<string, string[]>();

  // Build namespace → action classes map for fallback.
  const nsActionMap = new Map<string, string[]>();
  for (const cls of actionClassKeys) {
    const idx = cls.indexOf('::');
    if (idx > 0) {
      const ns = cls.slice(0, idx);
      const list = nsActionMap.get(ns) ?? [];
      list.push(cls);
      nsActionMap.set(ns, list);
    }
  }

  for (const cls of classes) {
    if (CPP_PRIMITIVE_TO_TS.has(cls)) continue;
    const markerName = cppClassToMarkerName(cls);
    if (!validIdent.test(markerName)) continue;

    const ancestors = getAncestors(cls, parentMap);
    const matchingClasses: string[] = [];
    for (const anc of ancestors) {
      if (actionClassKeys.has(anc)) {
        matchingClasses.push(anc);
      }
    }

    // Namespace fallback: when no ancestor is a direct action target, check
    // if any ancestor's C++ namespace contains action classes.
    if (matchingClasses.length === 0) {
      const checked = new Set<string>();
      for (const anc of ancestors) {
        const idx = anc.indexOf('::');
        if (idx <= 0) continue;
        const ns = anc.slice(0, idx);
        if (checked.has(ns)) continue;
        checked.add(ns);
        const nsActions = nsActionMap.get(ns);
        if (nsActions) {
          for (const ac of nsActions) {
            if (!matchingClasses.includes(ac)) matchingClasses.push(ac);
          }
        }
      }
    }

    if (matchingClasses.length > 0) {
      markerClassMap.set(markerName, matchingClasses);
    }
  }

  // Build classBrandMap: for each action class, use its own marker name as brand
  const classBrandMap = new Map<string, string>();
  for (const cppClass of actionClassKeys) {
    const markerName = cppClassToMarkerName(cppClass);
    if (validIdent.test(markerName)) {
      classBrandMap.set(cppClass, markerName);
    }
  }

  return { markerClassMap, classBrandMap };
}

// ────────────────────────────────────────────────────────────────────────────
// markers.ts file generation
// ────────────────────────────────────────────────────────────────────────────

/**
 * Build the content of `src/generated/markers.ts`.
 * Each C++ class becomes an empty exported interface used solely as a phantom
 * type brand for `Ref<T>`.
 */
export function buildMarkersFileContent(
  classes: Set<string>,
  parentMap: Map<string, string[]>,
  virtualBrands: Map<string, string[]> = new Map(),
): string {
  const validIdent = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
  const statements: ts.Statement[] = [];

  // Track markers that follow <namespace>_<ClassName> pattern for alias generation
  const aliasTargets: Array<{ markerName: string; aliasName: string }> = [];

  // Names that would conflict with TypeScript/JavaScript globals
  const GLOBAL_CONFLICTS: Record<string, string> = {
    Number: 'Numeric',  // conflicts with global Number
  };

  const sorted = [...classes].sort();
  for (const cls of sorted) {
    if (CPP_PRIMITIVE_TO_TS.has(cls)) continue;
    const markerName = cppClassToMarkerName(cls);
    if (!validIdent.test(markerName)) continue;

    // One readonly optional property per ancestor (self + parents), each with
    // a unique name.  This makes Derived structurally extend Base in TS.
    const ancestors = getAncestors(cls, parentMap);
    const members: ts.TypeElement[] = [];
    const seen = new Set<string>();
    for (const anc of ancestors) {
      const ancMarker = cppClassToMarkerName(anc);
      if (!validIdent.test(ancMarker) || seen.has(ancMarker)) continue;
      seen.add(ancMarker);
      members.push(
        ts.factory.createPropertySignature(
          [ts.factory.createModifier(ts.SyntaxKind.ReadonlyKeyword)],
          `__brand_${ancMarker}`,
          ts.factory.createToken(ts.SyntaxKind.QuestionToken),
          ts.factory.createLiteralTypeNode(ts.factory.createTrue()),
        ),
      );
    }

    // Add virtual brands from namespace-bridged action classes so that
    // InferActions<T> resolves correctly (e.g. light_LightOutput gets
    // __brand_light_LightState so it picks up LightStateActions).
    for (const vb of virtualBrands.get(markerName) ?? []) {
      if (seen.has(vb)) continue;
      seen.add(vb);
      members.push(
        ts.factory.createPropertySignature(
          [ts.factory.createModifier(ts.SyntaxKind.ReadonlyKeyword)],
          `__brand_${vb}`,
          ts.factory.createToken(ts.SyntaxKind.QuestionToken),
          ts.factory.createLiteralTypeNode(ts.factory.createTrue()),
        ),
      );
    }

    let decl = interfaceDecl(markerName, members, { exported: true });
    decl = addLineComment(decl, ` ${cls}`);
    statements.push(decl);

    // Check if this marker follows <namespace>_<ClassName> where namespace matches class
    const underscoreIdx = markerName.indexOf('_');
    if (underscoreIdx > 0) {
      const prefix = markerName.slice(0, underscoreIdx);
      const suffix = markerName.slice(underscoreIdx + 1);
      if (prefix.toLowerCase() === suffix.toLowerCase()) {
        const aliasName = GLOBAL_CONFLICTS[suffix] ?? suffix;
        aliasTargets.push({ markerName, aliasName });
      }
    }
  }

  // Emit ergonomic type aliases for <namespace>_<ClassName> pattern matches
  if (aliasTargets.length > 0) {
    statements.push(ts.factory.createEmptyStatement());

    for (const { markerName, aliasName } of aliasTargets) {
      const alias = ts.factory.createTypeAliasDeclaration(
        [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
        aliasName,
        undefined,
        ts.factory.createTypeReferenceNode(markerName),
      );
      statements.push(alias);
    }
  }

  const printed = printStatements(statements);
  return addFileHeader(printed, [
    `AUTO-GENERATED — DO NOT EDIT.`,
    `Regenerate with: pnpm codegen`,
    ``,
    `Each interface is a phantom type used to brand Ref<T> values.`,
    `Each marker has one readonly property per ancestor class, making`,
    `Ref<Derived> assignable to Ref<Base> via structural subtyping.`,
    `Naming: C++ namespace separator "::" is replaced with "_".`,
    `e.g. i2c::I2CBus → i2c_I2CBus`,
  ]);
}
