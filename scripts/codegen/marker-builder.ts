/**
 * Marker class collection and markers.ts generation for ESPHome codegen.
 *
 * Collects C++ classes referenced across schemas via id_type/use_id_type,
 * builds the marker→action-class mapping, and emits phantom type brands
 * for Ref<T>.
 */

import ts from 'typescript';
import type { SchemaConfigVar, ComponentEntry, SchemaDefinition, SchemaRegistry } from './schema-types.js';
import { cppClassToMarkerName, CPP_PRIMITIVE_TO_TS, componentKeyToGroupName } from './type-mapper.js';
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
    const markerName = cppClassToMarkerName(cls.replace(/^::/, ''));
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
    const markerName = cppClassToMarkerName(cppClass.replace(/^::/, ''));
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
 *
 * Each C++ class becomes an exported `__marker_`-prefixed interface used as a
 * phantom type brand for `Ref<T>`.  Public access is through a nested
 * `Components` namespace and unique top-level aliases with a `Ref` suffix:
 *
 *   Components.Light.LightRef       (canonical namespaced path)
 *   type LightRef = Components.Light.LightRef   (top-level alias if unique)
 */
export function buildMarkersFileContent(
  classes: Set<string>,
  parentMap: Map<string, string[]>,
  virtualBrands: Map<string, string[]> = new Map(),
): string {
  const validIdent = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
  const statements: ts.Statement[] = [];

  // ── Phase 1: Emit __marker_ internal interfaces ───────────────────────────

  /** Maps flat marker name (e.g. "light_LightOutput") → __marker_ prefixed name */
  const internalNameMap = new Map<string, string>();

  /**
   * Tracks namespace-bearing classes for Components namespace generation.
   * Grouped by C++ namespace (before ::).
   */
  const groupedClasses = new Map<string, Array<{
    cppClass: string;
    cppNamespace: string;
    cppClassName: string;
    flatMarkerName: string;
    internalName: string;
  }>>();

  const sorted = [...classes].sort();
  for (const cls of sorted) {
    if (CPP_PRIMITIVE_TO_TS.has(cls)) continue;

    // Strip leading :: (e.g. ::esphome::hub75::HUB75Display → esphome::hub75::HUB75Display)
    const cleanedCls = cls.replace(/^::/, '');
    const flatMarkerName = cppClassToMarkerName(cleanedCls);
    if (!validIdent.test(flatMarkerName)) continue;

    const internalName = `__marker_${flatMarkerName}`;
    internalNameMap.set(flatMarkerName, internalName);

    // One readonly optional property per ancestor (self + parents).
    // Brand names use the *flat* marker name (without __marker_ prefix) for stability.
    const ancestors = getAncestors(cls, parentMap);
    const members: ts.TypeElement[] = [];
    const seen = new Set<string>();
    for (const anc of ancestors) {
      const ancFlat = cppClassToMarkerName(anc.replace(/^::/, ''));
      if (!validIdent.test(ancFlat) || seen.has(ancFlat)) continue;
      seen.add(ancFlat);
      members.push(
        ts.factory.createPropertySignature(
          [ts.factory.createModifier(ts.SyntaxKind.ReadonlyKeyword)],
          `__brand_${ancFlat}`,
          ts.factory.createToken(ts.SyntaxKind.QuestionToken),
          ts.factory.createLiteralTypeNode(ts.factory.createTrue()),
        ),
      );
    }

    // Add virtual brands from namespace-bridged action classes.
    // Lookup uses the original flat marker name (before __marker_ prefix).
    const originalFlatName = cppClassToMarkerName(cls.replace(/^::/, ''));
    for (const vb of virtualBrands.get(originalFlatName) ?? []) {
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

    let decl = interfaceDecl(internalName, members, { exported: true });
    decl = addLineComment(decl, ` ${cls}`);
    statements.push(decl);

    // Categorize into groups for namespace generation
    const lastColonIdx = cleanedCls.lastIndexOf('::');
    if (lastColonIdx > 0) {
      const cppNamespace = cleanedCls.slice(0, lastColonIdx);
      const cppClassName = cleanedCls.slice(lastColonIdx + 2);
      const group = groupedClasses.get(cppNamespace) ?? [];
      group.push({ cppClass: cls, cppNamespace, cppClassName, flatMarkerName, internalName });
      groupedClasses.set(cppNamespace, group);
    }
  }

  // ── Phase 2: Build Components namespace ───────────────────────────────────

  // Collect all leaf ref type names and track their groups for collision detection
  const leafNameCounts = new Map<string, number>();
  const namespaceEntries: Array<{
    groupName: string;
    types: Array<{ leafName: string; internalName: string }>;
  }> = [];

  for (const [cppNamespace, entries] of [...groupedClasses.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    // For multi-level namespaces (e.g. "esphome::hub75"), join segments with ::
    // and pass them through componentKeyToGroupName individually, then concatenate.
    const nsParts = cppNamespace.split('::');
    const groupName = nsParts.map(part => componentKeyToGroupName(part)).join('');

    const types: Array<{ leafName: string; internalName: string }> = [];
    for (const entry of entries) {
      const leafName = `${entry.cppClassName}Ref`;
      types.push({ leafName, internalName: entry.internalName });
      leafNameCounts.set(leafName, (leafNameCounts.get(leafName) ?? 0) + 1);
    }

    namespaceEntries.push({ groupName, types });
  }

  // Build the Components namespace with nested group namespaces
  if (namespaceEntries.length > 0) {
    statements.push(ts.factory.createEmptyStatement());

    const groupNamespaces: ts.Statement[] = [];
    for (const { groupName, types } of namespaceEntries) {
      const typeAliases: ts.Statement[] = types.map(({ leafName, internalName }) =>
        ts.factory.createTypeAliasDeclaration(
          [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
          leafName,
          undefined,
          ts.factory.createTypeReferenceNode(internalName),
        ),
      );

      const nsBody = ts.factory.createModuleBlock(typeAliases);
      const nsDecl = ts.factory.createModuleDeclaration(
        [
          ts.factory.createModifier(ts.SyntaxKind.ExportKeyword),
        ],
        ts.factory.createIdentifier(groupName),
        nsBody,
        ts.NodeFlags.Namespace,
      );
      groupNamespaces.push(nsDecl);
    }

    const componentsBody = ts.factory.createModuleBlock(groupNamespaces);
    const componentsDecl = ts.factory.createModuleDeclaration(
      [
        ts.factory.createModifier(ts.SyntaxKind.ExportKeyword),
      ],
      ts.factory.createIdentifier('Components'),
      componentsBody,
      ts.NodeFlags.Namespace,
    );
    statements.push(componentsDecl);
  }

  const printed = printStatements(statements);
  return addFileHeader(printed, [
    `AUTO-GENERATED — DO NOT EDIT.`,
    `Regenerate with: pnpm codegen`,
    ``,
    `Phantom type brands for Ref<T>.  Each __marker_ interface carries`,
    `readonly properties per ancestor class for structural subtyping.`,
    ``,
    `Public API:`,
    `  Components.<Group>.<TypeRef>  — canonical namespaced path`,
    ``,
    `Top-level aliases are hand-curated in component-aliases.ts.`,
  ]);
}
