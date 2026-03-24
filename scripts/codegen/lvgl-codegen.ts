/**
 * LVGL-specific codegen — generates typed interfaces for LVGL widgets.
 *
 * Reads the extracted lvgl-schema.json (produced by extract_lvgl_schema.py)
 * and emits a single TypeScript file with:
 *   - LvglStyleProps       — shared style properties (73+ props)
 *   - Per-widget interfaces — e.g. LvglArcProps, LvglLabelProps
 *   - JSX IntrinsicElements — <lvgl_arc>, <lvgl_label>, etc.
 *   - Top-level <lvgl> element
 */

import * as fs from 'fs';
import * as path from 'path';
import ts from 'typescript';
import { toPascalCase, toCamelCase } from './type-mapper.js';
import {
  printStatements, addFileHeader, addJsDoc, addBlankLineBefore,
  keyword, typeRef, stringLiteralType, unionType, intersectionType,
  propSig, indexSig,
  interfaceDecl, typeAliasDecl,
  importTypeDecl,
  globalJsxAugmentation,
} from './ast-helpers.js';

// ────────────────────────────────────────────────────────────────────────────
// Schema types (mirrors lvgl-schema.json shape)
// ────────────────────────────────────────────────────────────────────────────

interface LvglPropDef {
  type: string;
  values?: string[];
  key?: 'Required' | 'Optional';
}

interface LvglWidgetDef {
  parts: string[];
  schema: Record<string, LvglPropDef>;
  cpp_type?: string;
  is_compound?: boolean;
}

interface LvglSchema {
  widgets: Record<string, LvglWidgetDef>;
  style_props: Record<string, LvglPropDef>;
  enums: Record<string, { prefix: string; choices: string[] }>;
  states: string[];
  parts: string[];
  obj_flags: string[];
  event_triggers: string[];
  swipe_triggers: string[];
  fonts: string[];
  top_level: Record<string, LvglPropDef>;
  page_schema: Record<string, LvglPropDef>;
}

// ────────────────────────────────────────────────────────────────────────────
// Type mapping
// ────────────────────────────────────────────────────────────────────────────

/** Map an extracted LVGL type descriptor to a TypeScript type node. */
function lvglTypeToTs(prop: LvglPropDef): ts.TypeNode {
  switch (prop.type) {
    case 'boolean':
      return keyword('boolean');

    case 'string':
    case 'color':
    case 'image':
    case 'font':
    case 'icon':
      return keyword('string');

    case 'integer':
    case 'positive_integer':
    case 'float':
    case 'angle':
    case 'milliseconds':
      return keyword('number');

    case 'pixels':
    case 'pixels_or_percent':
    case 'size':
    case 'padding':
      return unionType([keyword('number'), keyword('string')]);

    case 'opacity':
      return unionType([keyword('number'), keyword('string')]);

    case 'gradient':
      return keyword('unknown');

    case 'enum':
      if (prop.values && prop.values.length > 0) {
        // Color-like enums with placeholder values → string
        if (prop.values.includes('hex color value') || prop.values.includes('color ID')) {
          return keyword('string');
        }
        // Size-like enums with descriptive placeholders → number | string
        // e.g. ['SIZE_CONTENT', 'number of pixels', 'percentage']
        const descriptive = new Set(['number of pixels', 'percentage']);
        const hasDescriptive = prop.values.some((v) => descriptive.has(v));
        if (hasDescriptive) {
          const literals = prop.values.filter((v) => !descriptive.has(v));
          const members: ts.TypeNode[] = [keyword('number'), keyword('string')];
          for (const lit of literals) members.push(stringLiteralType(lit));
          return unionType(members);
        }
        return unionType(prop.values.map((v) => stringLiteralType(v)));
      }
      return keyword('string');

    default:
      return keyword('unknown');
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Code generation
// ────────────────────────────────────────────────────────────────────────────

/** Build property signatures from a prop definition map. */
function buildProps(
  props: Record<string, LvglPropDef>,
): ts.PropertySignature[] {
  return Object.entries(props).map(([name, def]) => {
    const camel = toCamelCase(name);
    const tsType = lvglTypeToTs(def);
    const optional = def.key !== 'Required';
    const sig = propSig(camel, tsType, optional);
    // Add @yamlKey annotation if camelCase differs from snake_case
    if (camel !== name) {
      return addJsDoc(sig, [`@yamlKey ${name}`]);
    }
    return sig;
  });
}

/**
 * Generate the full LVGL component TypeScript file content.
 */
export function buildLvglFileContent(schemaPath: string): string {
  const raw = fs.readFileSync(schemaPath, 'utf8');
  const schema: LvglSchema = JSON.parse(raw);

  const statements: ts.Statement[] = [];

  // ── Import ────────────────────────────────────────────────────────────────
  statements.push(importTypeDecl(['ComponentProps'], '../../types'));

  // ── LvglStyleProps ────────────────────────────────────────────────────────
  const styleMembers = buildProps(schema.style_props);

  // Add state-variant style overrides:  checked?: LvglStyleProps; etc.
  for (const state of schema.states) {
    const camel = toCamelCase(state);
    const sig = propSig(camel, typeRef('LvglStyleProps'), true);
    if (camel !== state) {
      styleMembers.push(addJsDoc(sig, [`State-variant style override.`, `@yamlKey ${state}`]));
    } else {
      styleMembers.push(addJsDoc(sig, ['State-variant style override.']));
    }
  }

  // Add `styles` prop — references to style_definitions by ID(s)
  {
    const stringType = keyword('string');
    const arrayType = ts.factory.createArrayTypeNode(keyword('string'));
    const stylesType = unionType([stringType, arrayType]);
    const sig = propSig('styles', stylesType, true);
    styleMembers.push(addJsDoc(sig, ['Reference to one or more `style_definitions` IDs.']));
  }

  statements.push(
    addBlankLineBefore(
      addJsDoc(
        interfaceDecl('LvglStyleProps', styleMembers, { exported: true }),
        ['Shared style properties available on every LVGL widget and on per-part / per-state overrides.'],
      ),
    ),
  );

  // ── Per-widget interfaces ─────────────────────────────────────────────────
  const jsxElements: Array<{ tagName: string; type: ts.TypeNode }> = [];

  for (const [widgetName, widget] of Object.entries(schema.widgets)) {
    const pascal = toPascalCase(`lvgl_${widgetName}`);
    const interfaceName = `${pascal}Props`;

    const members: ts.TypeElement[] = [];

    // Widget-specific props
    members.push(...buildProps(widget.schema));

    // Part-specific style overrides (e.g. indicator?: LvglStyleProps)
    // Skip "main" — main part styles are at the top level via LvglStyleProps
    for (const part of widget.parts) {
      if (part === 'main') continue;
      const camel = toCamelCase(part);
      const sig = propSig(camel, typeRef('LvglStyleProps'), true);
      if (camel !== part) {
        members.push(addJsDoc(sig, [`Style overrides for the "${part}" part.`, `@yamlKey ${part}`]));
      } else {
        members.push(addJsDoc(sig, [`Style overrides for the "${part}" part.`]));
      }
    }

    // Obj flags (common to all widgets)
    // These are added on the base style interface, but we include them here
    // since obj_flags are per-widget config, not style props
    // Actually, obj_flags are per-widget top-level booleans
    // We'll rely on the LvglStyleProps base + index sig to cover them

    statements.push(
      addBlankLineBefore(
        interfaceDecl(interfaceName, members, {
          exported: true,
          extends: ['LvglStyleProps'],
        }),
      ),
    );

    // JSX element: <lvgl-widgetname>
    const tagName = `lvgl-${widgetName.replace(/_/g, '-')}`;
    jsxElements.push({
      tagName,
      type: intersectionType([typeRef(interfaceName), typeRef('ComponentProps')]),
    });
  }

  // ── Top-level <lvgl> props ────────────────────────────────────────────────
  const topLevelMembers: ts.TypeElement[] = buildProps(schema.top_level);

  statements.push(
    addBlankLineBefore(
      addJsDoc(
        interfaceDecl('LvglProps', topLevelMembers, { exported: true }),
        ['Top-level <lvgl> component properties.'],
      ),
    ),
  );

  jsxElements.push({
    tagName: 'lvgl',
    type: intersectionType([typeRef('LvglProps'), typeRef('ComponentProps')]),
  });

  // ── JSX augmentation ──────────────────────────────────────────────────────
  statements.push(addBlankLineBefore(globalJsxAugmentation(jsxElements)));

  const printed = printStatements(statements);
  return addFileHeader(printed, [
    `AUTO-GENERATED — DO NOT EDIT.`,
    `Regenerate with: pnpm codegen`,
  ]);
}
