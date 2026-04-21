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
 *   - InferActions<T> intersection-based structural brand type
 *
 * Usage:
 *   Called from generate.ts during codegen.
 */

import type { ClassActionMap, ActionEntry, ActionParamEntry } from './schema-action-extractor.js';
import { toPascalCase } from './type-mapper.js';

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

function indent(lines: string, level: number): string {
  const pad = '  '.repeat(level);
  return lines.split('\n').map(l => l ? pad + l : l).join('\n');
}

const SPECIAL_PARAM_TYPES = ['TimePeriod', 'MACAddress', 'IPv4Address', 'Ref'] as const;

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

  const actionPascal = toPascalCase(action.shortName.replace(/\./g, '_'));
  const interfaceName = `${classPrefix}_${actionPascal}Params`;

  const fields = [...action.params].sort((a, b) => a.tsName.localeCompare(b.tsName)).map((param: ActionParamEntry) => {
    // The `id` parameter is always supplied implicitly by the compiler when an
    // action is invoked through a ref method (e.g. `slider.widgetUpdate(...)`),
    // so it must be optional in the user-facing TypeScript signature even if
    // the underlying ESPHome schema marks it required.
    const isImplicitId = param.tsName === 'id';
    const optional = (param.required && !isImplicitId) ? '' : '?';
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
    const actionPascal = toPascalCase(action.shortName.replace(/\./g, '_'));
    const paramsInterfaceName = `${classPrefix}_${actionPascal}Params`;
    const hasParams = action.params.length > 0;

    // Build JSDoc with @actionKey tag — the compiler reads this to resolve
    // the full YAML action key without computing it from the ref type.
    let doc: string;
    if (action.doc) {
      doc = `  /**\n   * ${action.doc}\n   * @actionKey ${action.yamlKey}\n   */\n`;
    } else {
      doc = `  /** @actionKey ${action.yamlKey} */\n`;
    }
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
  /** C++ class → marker brand name used for structural type checking. */
  classBrandMap: Map<string, string>;
}

export function generateActionsFile(input: ActionCodegenInput): string {
  const { classActions, classBrandMap } = input;
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
    // Sort actions within each class for deterministic output
    actions.sort((a, b) => a.methodName.localeCompare(b.methodName));
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

  // ── InferActions<T> ───────────────────────────────────────────────────────
  if (classBrandMap.size > 0) {
    lines.push('/**');
    lines.push(' * Infers available action methods for a marker type using structural brand');
    lines.push(' * checking. Uses intersection (&) so that a derived marker inherits actions');
    lines.push(' * from all ancestor classes.');
    lines.push(' *');
    lines.push(' * @example');
    lines.push(' * InferActions<LightOutputRef>          // → LightStateActions');
    lines.push(' * InferActions<FloatOutputRef>           // → BinaryOutputActions & FloatOutputActions');
    lines.push(' * InferActions<I2CBusRef>                // → {} (no actions)');
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

