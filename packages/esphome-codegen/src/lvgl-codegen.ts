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
import ts from 'typescript';
import { toPascalCase, toCamelCase, internalMarkerName } from './type-mapper.js';
import {
  printStatements, addFileHeader, addJsDoc, addBlankLineBefore,
  keyword, typeRef, stringLiteralType, unionType, intersectionType,
  propSig, typeLiteral,
  interfaceDecl,
  importTypeDecl,
  globalJsxAugmentation,
  reactivePropType,
  refPropType,
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
    case 'font':
    case 'icon':
      return keyword('string');

    case 'image':
      return unionType([keyword('string'), refPropType(internalMarkerName('image::Image'))]);

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

// @ts-expect-error Cross-package import resolves at runtime via monorepo layout
import { LVGL_UPDATABLE_WIDGETS, LVGL_REACTIVE_STYLE_PROPS } from '../../packages/core/src/lvgl-actions.js';

// ────────────────────────────────────────────────────────────────────────────
// Known type overrides for widget props
// ────────────────────────────────────────────────────────────────────────────

/**
 * Widget props whose schema type is 'unknown' but whose actual type is known.
 * Keyed by prop name; value is the TypeScript type node to use instead.
 */
const WIDGET_PROP_TYPE_OVERRIDES: Record<string, () => ts.TypeNode> = {
  // text accepts string | number — the C++ runtime converts via to_string()
  text: () => unionType([keyword('string'), keyword('number')]),
};

// ────────────────────────────────────────────────────────────────────────────
// Code generation
// ────────────────────────────────────────────────────────────────────────────

/** Build property signatures from a prop definition map. */
function buildProps(
  props: Record<string, LvglPropDef>,
  options?: {
    /** Widget name (e.g. 'label', 'button') for reactive prop lookup. */
    widgetName?: string;
    /** When true, wrap reactive-updatable style props with Reactive<T>. */
    isStyleProps?: boolean;
  },
): ts.PropertySignature[] {
  const widgetName = options?.widgetName;
  const isStyleProps = options?.isStyleProps ?? false;

  const updatableProps = widgetName
    ? LVGL_UPDATABLE_WIDGETS[widgetName] ?? []
    : [];

  return Object.entries(props).map(([name, def]) => {
    const camel = toCamelCase(name);

    // Apply type overrides for props with known types
    let tsType = (def.type === 'unknown' && WIDGET_PROP_TYPE_OVERRIDES[name])
      ? WIDGET_PROP_TYPE_OVERRIDES[name]()
      : lvglTypeToTs(def);

    // Wrap with Reactive<T> if:
    // - widget-specific updatable prop, OR
    // - style prop that the reactive runtime can update
    const shouldBind = updatableProps.includes(name) || (isStyleProps && LVGL_REACTIVE_STYLE_PROPS.has(name));
    if (shouldBind) {
      // For enum props (e.g. text_font with literal font names), widen to
      // include `string` so computed values from the reactive theme are accepted.
      if (def.type === 'enum' && def.values && def.values.length > 0) {
        tsType = unionType([keyword('string'), tsType]);
      }
      tsType = reactivePropType(tsType);
    }

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
  statements.push(importTypeDecl(['ComponentProps', 'Reactive', 'RefProp'], '../../types'));
  statements.push(importTypeDecl([internalMarkerName('image::Image')], '../markers'));
  statements.push(importTypeDecl(['CssStyleProps'], '../../style-types'));

  // ── Layout props to exclude from LvglStyleProps ───────────────────────────
  // These are layout concerns, not visual style — handled by layout components
  // (Row, Flex, Space, Grid) which inject them via x:custom.
  const LAYOUT_PROPS = new Set(['align']);

  // ── LvglStyleProps (flat visual properties only) ──────────────────────────
  // No state overrides, no `styles` ref, no layout props — those live
  // in the CssStyle type or on layout components.
  const filteredStyleProps = Object.fromEntries(
    Object.entries(schema.style_props).filter(([name]) => !LAYOUT_PROPS.has(name)),
  );
  const styleMembers = buildProps(filteredStyleProps, { isStyleProps: true });

  statements.push(
    addBlankLineBefore(
      addJsDoc(
        interfaceDecl('LvglStyleProps', styleMembers, { exported: true }),
        ['Flat LVGL style properties (visual only). No state/part nesting, no layout props.'],
      ),
    ),
  );

  // ── LVGL_STYLE_PROP_KEYS — generated set for runtime validation ───────────
  {
    const keys = Object.keys(filteredStyleProps).map(k => toCamelCase(k));
    const elements = keys.map(k => ts.factory.createStringLiteral(k));
    const arrayExpr = ts.factory.createArrayLiteralExpression(elements, true);
    const newSetExpr = ts.factory.createNewExpression(
      ts.factory.createIdentifier('Set'),
      undefined,
      [arrayExpr],
    );
    const asConst = ts.factory.createAsExpression(
      newSetExpr,
      ts.factory.createTypeReferenceNode('ReadonlySet', [keyword('string')]),
    );
    const decl = ts.factory.createVariableDeclaration('LVGL_STYLE_PROP_KEYS', undefined, undefined, asConst);
    const stmt = ts.factory.createVariableStatement(
      [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      ts.factory.createVariableDeclarationList([decl], ts.NodeFlags.Const),
    );
    statements.push(addBlankLineBefore(
      addJsDoc(stmt, ['All valid LVGL style property names in camelCase. Used for runtime validation.']),
    ));
  }

  // ── Per-widget interfaces ─────────────────────────────────────────────────
  const jsxElements: Array<{ tagName: string; type: ts.TypeNode }> = [];

  for (const [widgetName, widget] of Object.entries(schema.widgets)) {
    const pascal = toPascalCase(`lvgl_${widgetName}`);
    const interfaceName = `${pascal}Props`;

    const members: ts.TypeElement[] = [];

    // Widget-specific props
    members.push(...buildProps(widget.schema, { widgetName }));

    // Collect widget parts (excluding "main")
    const widgetParts: string[] = [];
    for (const part of widget.parts) {
      if (part === 'main') continue;
      widgetParts.push(part);
    }

    // Add widget-specific `style` prop with restricted parts
    {
      // Build the style type: CssStyleProps & { [state]?: CssStyleProps } & { [part]?: ... }
      const styleTypeMembers: ts.TypeNode[] = [typeRef('CssStyleProps')];

      // State overrides (universal for all widgets)
      const stateMembers: ts.TypeElement[] = [];
      for (const state of schema.states) {
        const camel = toCamelCase(state);
        stateMembers.push(propSig(camel, typeRef('CssStyleProps'), true));
      }
      styleTypeMembers.push(typeLiteral(stateMembers));

      // Part overrides (widget-specific)
      if (widgetParts.length > 0) {
        const partMembers: ts.TypeElement[] = [];
        for (const part of widgetParts) {
          const camel = toCamelCase(part);
          // Each part can have CssStyleProps + state overrides
          const partStateMembers: ts.TypeElement[] = [];
          for (const state of schema.states) {
            const sc = toCamelCase(state);
            partStateMembers.push(propSig(sc, typeRef('CssStyleProps'), true));
          }
          const partType = intersectionType([typeRef('CssStyleProps'), typeLiteral(partStateMembers)]);
          partMembers.push(propSig(camel, partType, true));
        }
        styleTypeMembers.push(typeLiteral(partMembers));
      }

      // Add styles reference inside style type
      {
        const stylesRef: ts.TypeElement[] = [];
        const stringType = keyword('string');
        const arrayType = ts.factory.createArrayTypeNode(keyword('string'));
        stylesRef.push(propSig('styles', unionType([stringType, arrayType]), true));
        styleTypeMembers.push(typeLiteral(stylesRef));
      }

      const widgetStyleType = intersectionType(styleTypeMembers);
      const sig = propSig('style', widgetStyleType, true);
      members.push(addJsDoc(sig, [
        'CSS-like style object. All visual properties must be specified here.',
        widgetParts.length > 0
          ? `Supports parts: ${widgetParts.map(p => `\`${toCamelCase(p)}\``).join(', ')}.`
          : 'This widget has no sub-parts.',
      ]));
    }

    statements.push(
      addBlankLineBefore(
        interfaceDecl(interfaceName, members, {
          exported: true,
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
