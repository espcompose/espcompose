/**
 * TypeScript AST factory helpers for codegen.
 *
 * Wraps `ts.factory.*` with ergonomic helpers that produce TS AST nodes,
 * which are then printed to source text via `ts.createPrinter()`.
 */

import ts from 'typescript';

// ────────────────────────────────────────────────────────────────────────────
// Printer
// ────────────────────────────────────────────────────────────────────────────

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

/**
 * Print an array of top-level statements into a complete TypeScript source string.
 */
export function printStatements(statements: ts.Statement[]): string {
  const sourceFile = ts.factory.createSourceFile(
    statements,
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None,
  );
  return printer.printFile(sourceFile);
}

// ────────────────────────────────────────────────────────────────────────────
// Header comments
// ────────────────────────────────────────────────────────────────────────────

/**
 * Prepend a file-level header block (auto-generated notice, eslint-disable, etc.)
 * to the printed source text.
 */
export function addFileHeader(source: string, commentLines: string[]): string {
  const header = commentLines.map((l) => (l === '' ? '' : `// ${l}`)).join('\n');
  return `${header}\n\n/* eslint-disable */\n\n${source}`;
}

// ────────────────────────────────────────────────────────────────────────────
// Comments
// ────────────────────────────────────────────────────────────────────────────

/**
 * Attach a single-line `// comment` before a node.
 */
export function addLineComment<T extends ts.Node>(node: T, text: string): T {
  return ts.addSyntheticLeadingComment(node, ts.SyntaxKind.SingleLineCommentTrivia, ` ${text}`, true);
}

/**
 * Attach a JSDoc-style `/** ... *​/` comment before a node.
 * Supports multi-line content and `@tag` annotations.
 */
export function addJsDoc<T extends ts.Node>(node: T, lines: string[]): T {
  if (lines.length === 0) return node;
  if (lines.length === 1) {
    const text = `* ${lines[0]} `;
    return ts.addSyntheticLeadingComment(node, ts.SyntaxKind.MultiLineCommentTrivia, text, true);
  }
  const inner = lines.map((l) => ` * ${l}`).join('\n');
  const text = `*\n${inner}\n `;
  return ts.addSyntheticLeadingComment(node, ts.SyntaxKind.MultiLineCommentTrivia, text, true);
}

/**
 * Attach a blank-line separator before a node (for readability in printed output).
 */
export function addBlankLineBefore<T extends ts.Node>(node: T): T {
  return ts.addSyntheticLeadingComment(node, ts.SyntaxKind.SingleLineCommentTrivia, '', true);
}

// ────────────────────────────────────────────────────────────────────────────
// Type nodes
// ────────────────────────────────────────────────────────────────────────────

/** `string`, `number`, `boolean`, `unknown`, `void` */
export function keyword(kind: 'string' | 'number' | 'boolean' | 'unknown' | 'void'): ts.TypeNode {
  const map: Record<string, ts.SyntaxKind> = {
    string: ts.SyntaxKind.StringKeyword,
    number: ts.SyntaxKind.NumberKeyword,
    boolean: ts.SyntaxKind.BooleanKeyword,
    unknown: ts.SyntaxKind.UnknownKeyword,
    void: ts.SyntaxKind.VoidKeyword,
  };
  return ts.factory.createKeywordTypeNode(map[kind] as ts.KeywordTypeSyntaxKind);
}

/** A type reference: `Foo` or `Foo<Bar, Baz>` */
export function typeRef(name: string, typeArgs?: ts.TypeNode[]): ts.TypeReferenceNode {
  return ts.factory.createTypeReferenceNode(name, typeArgs);
}

/** A string literal type: `'value'` */
export function stringLiteralType(value: string): ts.LiteralTypeNode {
  return ts.factory.createLiteralTypeNode(ts.factory.createStringLiteral(value));
}

/** A union type: `A | B | C` */
export function unionType(members: ts.TypeNode[]): ts.TypeNode {
  if (members.length === 1) return members[0];
  return ts.factory.createUnionTypeNode(members);
}

/** An intersection type: `A & B & C` */
export function intersectionType(members: ts.TypeNode[]): ts.TypeNode {
  if (members.length === 1) return members[0];
  return ts.factory.createIntersectionTypeNode(members);
}

/** A type literal (anonymous object type): `{ prop: Type; ... }` */
export function typeLiteral(members: ts.TypeElement[]): ts.TypeLiteralNode {
  return ts.factory.createTypeLiteralNode(members);
}

/** `Array<T>` */
export function arrayType(elementType: ts.TypeNode): ts.TypeReferenceNode {
  return typeRef('Array', [elementType]);
}

/** `Record<K, V>` */
export function recordType(keyType: ts.TypeNode, valueType: ts.TypeNode): ts.TypeReferenceNode {
  return typeRef('Record', [keyType, valueType]);
}

/** `RefProp<T>` — used for prop-side ref types (contravariant) */
export function refPropType(markerName: string): ts.TypeReferenceNode {
  return typeRef('RefProp', [typeRef(markerName)]);
}

/** `Readonly<T>` */
export function readonlyType(inner: ts.TypeNode): ts.TypeReferenceNode {
  return typeRef('Readonly', [inner]);
}

/** `() => void` */
export function voidFunctionType(): ts.FunctionTypeNode {
  return ts.factory.createFunctionTypeNode(undefined, [], keyword('void'));
}

/** `ComponentProps` or `ComponentProps<T>` */
export function componentPropsType(markerName?: string): ts.TypeReferenceNode {
  if (markerName) return typeRef('ComponentProps', [typeRef(markerName)]);
  return typeRef('ComponentProps');
}

// ────────────────────────────────────────────────────────────────────────────
// Property signatures
// ────────────────────────────────────────────────────────────────────────────

/** Build a property signature: `name?: Type;` */
export function propSig(
  name: string,
  type: ts.TypeNode,
  optional: boolean,
): ts.PropertySignature {
  // Names that aren't valid JS identifiers (e.g. contain hyphens) must be
  // expressed as string literal keys so the printer emits them quoted.
  const key = /[^a-zA-Z0-9_$]/.test(name) || /^[0-9]/.test(name)
    ? ts.factory.createStringLiteral(name)
    : name;
  return ts.factory.createPropertySignature(
    undefined,
    key,
    optional ? ts.factory.createToken(ts.SyntaxKind.QuestionToken) : undefined,
    type,
  );
}

/** Build an index signature: `[key: string]: unknown;` */
export function indexSig(keyType: ts.TypeNode, valueType: ts.TypeNode): ts.IndexSignatureDeclaration {
  return ts.factory.createIndexSignature(
    undefined,
    [ts.factory.createParameterDeclaration(undefined, undefined, 'key', undefined, keyType)],
    valueType,
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Declarations
// ────────────────────────────────────────────────────────────────────────────

/** Build an interface declaration, optionally exported. */
export function interfaceDecl(
  name: string,
  members: ts.TypeElement[],
  options?: {
    exported?: boolean;
    extends?: string[];
  },
): ts.InterfaceDeclaration {
  const modifiers = options?.exported
    ? [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)]
    : undefined;
  const heritage = options?.extends?.length
    ? [
        ts.factory.createHeritageClause(
          ts.SyntaxKind.ExtendsKeyword,
          options.extends.map((name) =>
            ts.factory.createExpressionWithTypeArguments(ts.factory.createIdentifier(name), undefined),
          ),
        ),
      ]
    : undefined;
  return ts.factory.createInterfaceDeclaration(modifiers, name, undefined, heritage, members);
}

/** Build a type alias declaration: `export type Name = Type;` */
export function typeAliasDecl(
  name: string,
  type: ts.TypeNode,
  exported = false,
): ts.TypeAliasDeclaration {
  const modifiers = exported
    ? [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)]
    : undefined;
  return ts.factory.createTypeAliasDeclaration(modifiers, name, undefined, type);
}

// ────────────────────────────────────────────────────────────────────────────
// Imports / Exports
// ────────────────────────────────────────────────────────────────────────────

/** `import type { A, B, C } from 'module';` */
export function importTypeDecl(names: string[], moduleSpecifier: string): ts.ImportDeclaration {
  const sortedNames = [...names].sort();
  const namedBindings = ts.factory.createNamedImports(
    sortedNames.map((n) => ts.factory.createImportSpecifier(false, undefined, ts.factory.createIdentifier(n))),
  );
  return ts.factory.createImportDeclaration(
    undefined,
    ts.factory.createImportClause(true, undefined, namedBindings),
    ts.factory.createStringLiteral(moduleSpecifier),
  );
}

/** `export * from 'module';` */
export function exportStarDecl(moduleSpecifier: string): ts.ExportDeclaration {
  return ts.factory.createExportDeclaration(
    undefined,
    false,
    undefined,
    ts.factory.createStringLiteral(moduleSpecifier),
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Global JSX augmentation
// ────────────────────────────────────────────────────────────────────────────

/**
 * Build:
 * ```
 * declare global {
 *   namespace JSX {
 *     interface IntrinsicElements {
 *       tagName: SomeType;
 *     }
 *   }
 * }
 * ```
 */
export function globalJsxAugmentation(
  elements: Array<{ tagName: string; type: ts.TypeNode }>,
): ts.ModuleDeclaration {
  const intrinsicMembers = elements.map(({ tagName, type }) => propSig(tagName, type, false));

  const intrinsicElements = interfaceDecl('IntrinsicElements', intrinsicMembers);

  const jsxNamespace = ts.factory.createModuleDeclaration(
    undefined,
    ts.factory.createIdentifier('JSX'),
    ts.factory.createModuleBlock([intrinsicElements]),
    ts.NodeFlags.Namespace,
  );

  return ts.factory.createModuleDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
    ts.factory.createIdentifier('global'),
    ts.factory.createModuleBlock([jsxNamespace]),
    ts.NodeFlags.GlobalAugmentation,
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Registry const
// ────────────────────────────────────────────────────────────────────────────

/**
 * Build an exported const with object literal initializer:
 * ```
 * export const Name: Type = { ... };
 * ```
 */
export function constExport(
  name: string,
  type: ts.TypeNode,
  properties: Array<{ key: string; value: ts.Expression }>,
): ts.VariableStatement {
  const objectLiteral = ts.factory.createObjectLiteralExpression(
    properties.map(({ key, value }) =>
      ts.factory.createPropertyAssignment(key, value),
    ),
    true, // multiline
  );
  const decl = ts.factory.createVariableDeclaration(name, undefined, type, objectLiteral);
  return ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createVariableDeclarationList([decl], ts.NodeFlags.Const),
  );
}

/**
 * Build an object literal expression `{ key: 'value' }` for registry entries.
 */
export function objectLiteral(
  properties: Array<{ key: string; value: string }>,
): ts.ObjectLiteralExpression {
  return ts.factory.createObjectLiteralExpression(
    properties.map(({ key, value }) =>
      ts.factory.createPropertyAssignment(key, ts.factory.createStringLiteral(value)),
    ),
    false, // single line
  );
}
