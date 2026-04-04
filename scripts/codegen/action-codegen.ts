#!/usr/bin/env node
/**
 * Action type codegen — generates typed action method interfaces from
 * schema-extracted action data, grouped by target C++ class.
 *
 * Output: packages/core/src/generated/actions.ts
 *
 * Produces:
 *   - Per-class param interfaces (e.g. LightState_TurnOnParams)
 *   - Per-class action method interfaces (e.g. LightStateActions)
 *   - ClassActionMap interface (C++ class → action interface)
 *   - MARKER_ACTION_CLASS_MAP runtime constant (marker → class[])
 *   - ACTION_YAML_KEYS runtime constant (class → { method → yamlKey })
 *   - InferActions<T> intersection-based structural brand type
 *   - resolveActionYamlKey() helper
 *
 * Usage:
 *   Called from generate.ts during codegen.
 */

import type { ClassActionMap, ActionEntry, ActionParamEntry } from './schema-action-extractor.js';
import { cppClassToMarkerName, toPascalCase } from './type-mapper.js';

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

function indent(lines: string, level: number): string {
  const pad = '  '.repeat(level);
  return lines.split('\n').map(l => l ? pad + l : l).join('\n');
}

const SPECIAL_PARAM_TYPES = ['TimePeriod', 'MACAddress', 'IPv4Address'] as const;

function collectSpecialParamTypes(classActions: ClassActionMap): string[] {
  const found = new Set<string>();

  for (const actions of classActions.values()) {
    for (const action of actions) {
      for (const param of action.params) {
        for (const typeName of SPECIAL_PARAM_TYPES) {
          if (new RegExp(`\\b${typeName}\\b`).test(param.tsType)) {
            found.add(typeName);
          }
        }
      }
    }
  }

  return [...found];
}

/**
 * Convert a C++ class name to a clean PascalCase interface prefix.
 * "light::LightState" → "LightState"
 * "light::AddressableLightState" → "AddressableLightState"
 * "output::BinaryOutput" → "BinaryOutput"
 * "switch_::Switch" → "Switch_"
 */
function classToPrefix(cppClass: string): string {
  const parts = cppClass.split('::');
  const className = parts[parts.length - 1];
  // Handle trailing underscore in namespace (e.g. switch_::Switch)
  return className;
}

// ────────────────────────────────────────────────────────────────────────────
// Param interface generation
// ────────────────────────────────────────────────────────────────────────────

function generateParamsInterface(
  classPrefix: string,
  action: ActionEntry,
): string | null {
  if (action.params.length === 0) return null;

  const actionPascal = toPascalCase(action.shortName);
  const interfaceName = `${classPrefix}_${actionPascal}Params`;

  const fields = action.params.map((param: ActionParamEntry) => {
    const optional = param.required ? '' : '?';
    const doc = param.doc ? `/** ${param.doc} */\n` : '';
    const yamlDoc = param.yamlKey !== param.tsName ? `/** @yamlKey ${param.yamlKey} */\n` : '';
    return `${doc}${yamlDoc}${param.tsName}${optional}: ${param.tsType};`;
  });

  return `export interface ${interfaceName} {\n${indent(fields.join('\n'), 1)}\n}`;
}

// ────────────────────────────────────────────────────────────────────────────
// Actions interface generation
// ────────────────────────────────────────────────────────────────────────────

function generateClassActionsInterface(
  classPrefix: string,
  actions: ActionEntry[],
): string {
  const interfaceName = `${classPrefix}Actions`;
  const methods: string[] = [];

  for (const action of actions) {
    const actionPascal = toPascalCase(action.shortName);
    const paramsInterfaceName = `${classPrefix}_${actionPascal}Params`;
    const hasParams = action.params.length > 0;

    const doc = action.doc ? `  /** ${action.doc} */\n` : '';
    const paramType = hasParams ? `params?: ${paramsInterfaceName}` : '';
    methods.push(`${doc}  ${action.methodName}(${paramType}): void;`);
  }

  return `export interface ${interfaceName} {\n${methods.join('\n')}\n}`;
}

// ────────────────────────────────────────────────────────────────────────────
// Main generation
// ────────────────────────────────────────────────────────────────────────────

export interface ActionCodegenInput {
  /** C++ class → actions extracted from schema. */
  classActions: ClassActionMap;
  /** Marker name → list of C++ classes whose actions apply (via ancestor walk). */
  markerClassMap: Map<string, string[]>;
  /** C++ class → marker brand name used for structural type checking. */
  classBrandMap: Map<string, string>;
}

export function generateActionsFile(input: ActionCodegenInput): string {
  const { classActions, markerClassMap, classBrandMap } = input;
  const lines: string[] = [];
  const specialParamTypes = collectSpecialParamTypes(classActions);

  lines.push('// AUTO-GENERATED — DO NOT EDIT.');
  lines.push('// Regenerate with: pnpm codegen');
  lines.push('');
  lines.push('/* eslint-disable */');
  lines.push('');
  lines.push(`import type { ${['TriggerHandler', ...specialParamTypes].join(', ')} } from "../types";`);
  lines.push('');

  // Track generated interface names for ClassActionMap
  const classInterfaceNames: Array<{ cppClass: string; prefix: string; interfaceName: string }> = [];

  // Deduplicate prefixes — if two classes share a name (unlikely but safe)
  const usedPrefixes = new Map<string, number>();

  function uniquePrefix(raw: string): string {
    const count = usedPrefixes.get(raw) ?? 0;
    usedPrefixes.set(raw, count + 1);
    return count === 0 ? raw : `${raw}${count + 1}`;
  }

  // Sort classes for deterministic output
  const sortedClasses = [...classActions.entries()].sort((a, b) => a[0].localeCompare(b[0]));

  for (const [cppClass, actions] of sortedClasses) {
    const rawPrefix = classToPrefix(cppClass);
    const prefix = uniquePrefix(rawPrefix);

    lines.push(`// ── ${cppClass} ${'─'.repeat(Math.max(0, 65 - cppClass.length))}`);
    lines.push('');

    // Param interfaces
    for (const action of actions) {
      const paramInterface = generateParamsInterface(prefix, action);
      if (paramInterface) {
        lines.push(paramInterface);
        lines.push('');
      }
    }

    // Actions interface
    lines.push(generateClassActionsInterface(prefix, actions));
    lines.push('');

    classInterfaceNames.push({
      cppClass,
      prefix,
      interfaceName: `${prefix}Actions`,
    });
  }

  // ── ClassActionMap ────────────────────────────────────────────────────────
  lines.push('// ── Class to actions mapping ─────────────────────────────────────────────');
  lines.push('');
  lines.push('export interface ClassActionMap {');
  for (const { cppClass, interfaceName } of classInterfaceNames) {
    lines.push(`  ${JSON.stringify(cppClass)}: ${interfaceName};`);
  }
  lines.push('}');
  lines.push('');

  // ── MARKER_ACTION_CLASS_MAP ───────────────────────────────────────────────
  if (markerClassMap.size > 0) {
    lines.push('// ── Marker to action classes mapping ────────────────────────────────────');
    lines.push('');
    lines.push('/**');
    lines.push(' * Maps marker type names → C++ classes whose actions apply to that marker.');
    lines.push(' * Used by the compiler transformer to resolve ref actions.');
    lines.push(' */');
    lines.push('export const MARKER_ACTION_CLASS_MAP: Record<string, string[]> = {');
    const sorted = [...markerClassMap.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    for (const [marker, classes] of sorted) {
      lines.push(`  ${JSON.stringify(marker)}: ${JSON.stringify(classes)},`);
    }
    lines.push('};');
    lines.push('');
  }

  // ── ACTION_YAML_KEYS ─────────────────────────────────────────────────────
  lines.push('// ── Action YAML key lookup ───────────────────────────────────────────────');
  lines.push('');
  lines.push('/**');
  lines.push(' * Maps C++ class → { camelMethod → YAML action key }.');
  lines.push(' * Used by the compiler transformer to resolve ref.method() → YAML action.');
  lines.push(' */');
  lines.push('export const ACTION_YAML_KEYS: Record<string, Record<string, string>> = {');
  for (const [cppClass, actions] of sortedClasses) {
    const methodMap: Record<string, string> = {};
    for (const action of actions) {
      methodMap[action.methodName] = action.yamlKey;
    }
    lines.push(`  ${JSON.stringify(cppClass)}: ${JSON.stringify(methodMap)},`);
  }
  lines.push('};');
  lines.push('');

  // ── resolveActionYamlKey ──────────────────────────────────────────────────
  lines.push('/**');
  lines.push(' * Resolve a ref action method call to its YAML action key.');
  lines.push(' * Iterates the target classes (from MARKER_ACTION_CLASS_MAP) and returns');
  lines.push(' * the first matching YAML key for the given method name.');
  lines.push(' */');
  lines.push('export function resolveActionYamlKey(classes: string[], methodName: string): string | undefined {');
  lines.push('  for (const cls of classes) {');
  lines.push('    const methods = ACTION_YAML_KEYS[cls];');
  lines.push('    if (methods && methods[methodName]) return methods[methodName];');
  lines.push('  }');
  lines.push('  return undefined;');
  lines.push('}');
  lines.push('');

  // ── InferActions<T> ───────────────────────────────────────────────────────
  if (classBrandMap.size > 0) {
    lines.push('/**');
    lines.push(' * Infers available action methods for a marker type using structural brand');
    lines.push(' * checking. Uses intersection (&) so that a derived marker inherits actions');
    lines.push(' * from all ancestor classes.');
    lines.push(' *');
    lines.push(' * @example');
    lines.push(' * InferActions<light_LightOutput>      // → LightStateActions');
    lines.push(' * InferActions<output_FloatOutput>      // → BinaryOutputActions & FloatOutputActions');
    lines.push(' * InferActions<i2c_I2CBus>              // → {} (no actions)');
    lines.push(' */');
    lines.push('// eslint-disable-next-line @typescript-eslint/no-empty-object-type');
    lines.push('export type InferActions<T> =');

    const brandEntries = [...classBrandMap.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    const arms: string[] = [];
    for (const [cppClass, brandMarker] of brandEntries) {
      const info = classInterfaceNames.find(c => c.cppClass === cppClass);
      if (!info) continue;
      const brandProp = `__brand_${brandMarker}`;
      arms.push(`(T extends { readonly ${brandProp}?: true } ? ${info.interfaceName} : {})`);
    }

    if (arms.length > 0) {
      lines.push(`  ${arms.join('\n  & ')};`);
    } else {
      lines.push('  {};');
    }
    lines.push('');
  }

  return lines.join('\n');
}

