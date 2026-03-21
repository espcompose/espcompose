/**
 * TypeScript AST transformer that converts top-level `function` declarations
 * into ESPHome scripts using the useScript hook pattern, mirroring the
 * Resolut framework's action registration mechanism.
 *
 * ## What it does
 *
 * Given a user source file like:
 *
 * ```tsx
 * function greet(): void {
 *   logger.log('Hello!');
 *   delay(500);
 * }
 *
 * function startUp(): void {          // never referenced — won't appear in YAML
 *   logger.log('Starting');
 * }
 *
 * export default (
 *   <esphome name="my-device">
 *     <binary_sensor platform="gpio" pin={4} onPress={greet} />
 *   </esphome>
 * );
 * ```
 *
 * It produces (conceptually):
 *
 * ```tsx
 * function greet(): void {
 *   return ESPCompose.useScript({
 *     id: 'greet',
 *     then: [{ 'logger.log': { message: 'Hello!' } }, { delay: '500ms' }],
 *   });
 * }
 *
 * function startUp(): void {
 *   return ESPCompose.useScript({ id: 'start_up', then: [...] });
 * }
 *
 * export default (
 *   <esphome name="my-device">
 *     <binary_sensor platform="gpio" pin={4} onPress={greet()} />
 *   </esphome>
 * );
 * ```
 *
 * When `greet()` is evaluated as the `onPress` prop is resolved, the useScript
 * hook registers `greet` in the current scope.  `startUp` is never called so
 * it is never registered and never appears in the YAML output.
 *
 * ## Trigger detection heuristic
 *
 * Props whose names start with `on` (e.g. `on_press`, `onValue`) are treated
 * as trigger props when their value is:
 *   - An Identifier naming a top-level `function` declaration → rewritten to a
 *     call expression: `{greet}` → `{greet()}`
 *   - An `ArrowFunctionExpression` → converted to an inline action list
 *
 * ## Transitive dependencies
 *
 * If a script's body calls another known script, the transformed body emits an
 * explicit call to that dependent script first (before the useScript call for
 * the outer script), mirroring the Resolut pattern.  This ensures transitive
 * deps are registered in scope even when only the outer script is triggered.
 *
 * ## Arrow functions as helper utilities
 *
 * `const foo = () => {}` constants are never treated as scripts.  They remain
 * unchanged and can be used as compile-time helpers.
 */

import ts from 'typescript';
import { convertStatements, camelToSnake, type ConverterContext } from './action-converter.js';
import { mapParamType } from './param-type-mapper.js';

// ────────────────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────────────────

export interface TransformDiagnostic {
  message: string;
  file: string;
  line?: number;
  character?: number;
}

export interface TransformOutput {
  /** The transformed TypeScript source text. */
  sourceText: string;
  /** Any compilation-level errors encountered. */
  diagnostics: TransformDiagnostic[];
}

/**
 * Apply the script transform to a single TypeScript source file.
 *
 * @param sourceFile - The parsed TypeScript source file node.
 * @param program    - The TypeScript program (used for position information only).
 * @returns Transformed source text + any diagnostics.
 */
export function transformScriptFile(
  sourceFile: ts.SourceFile,
  program: ts.Program,
): TransformOutput {
  const diagnostics: TransformDiagnostic[] = [];

  function addDiag(message: string, node?: ts.Node): void {
    const pos =
      node && sourceFile
        ? sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile))
        : undefined;
    diagnostics.push({
      message,
      file: sourceFile.fileName,
      line: pos ? pos.line + 1 : undefined,
      character: pos ? pos.character + 1 : undefined,
    });
  }

  // ── Step 1: Collect top-level function declarations ──────────────────────
  const scriptFunctions = collectScriptFunctions(sourceFile);
  const knownScripts = new Set(scriptFunctions.map((f) => f.name));
  const scriptParams = new Map(scriptFunctions.map((f) => [f.name, f.params.map((p) => p.name)]));

  // ── Step 2: Convert each function body to action metadata ─────────────────
  const scriptMetadata = scriptFunctions.map((fn) => {
    const ctx: ConverterContext = { knownScripts, scriptParams, errors: [] };
    const bodyStatements = fn.node.body ? Array.from(fn.node.body.statements) : [];
    const actions = convertStatements(bodyStatements, ctx);
    for (const err of ctx.errors) addDiag(err.message, err.node);
    return { ...fn, actions };
  });

  // ── Step 3: Run the TypeScript transformer ──────────────────────────────
  const transformerFactory: ts.TransformerFactory<ts.SourceFile> = (context) => {
    return (sf) => {
      return visitSourceFile(sf, context, scriptMetadata, knownScripts, scriptParams, addDiag);
    };
  };

  const result = ts.transform(sourceFile, [transformerFactory], program.getCompilerOptions());
  const transformed = result.transformed[0];

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const sourceText = printer.printFile(transformed);

  return { sourceText, diagnostics };
}

// ────────────────────────────────────────────────────────────────────────────
// Function collection
// ────────────────────────────────────────────────────────────────────────────

interface ScriptFn {
  name: string;
  snakeName: string;
  node: ts.FunctionDeclaration;
  params: Array<{ name: string; esphomeType: string }>;
}

function collectScriptFunctions(sourceFile: ts.SourceFile): ScriptFn[] {
  const scripts: ScriptFn[] = [];

  for (const stmt of sourceFile.statements) {
    if (!ts.isFunctionDeclaration(stmt) || !stmt.name) continue;

    // Skip JSX function components: functions that contain `return` statements
    // with a non-void value (e.g. returning JSX elements) are component helpers,
    // not ESPHome scripts. Only `void` procedures (no return value) become scripts.
    if (hasNonVoidReturn(stmt)) continue;

    const name = stmt.name.text;
    const snakeName = camelToSnake(name);
    const params: Array<{ name: string; esphomeType: string }> = [];

    for (const param of stmt.parameters) {
      if (!ts.isIdentifier(param.name)) continue;
      const paramName = param.name.text;
      const typeResult = mapParamType(param.type);
      if (!typeResult.ok) {
        // Emit a soft warning; use 'int' as fallback so we still produce output
        params.push({ name: paramName, esphomeType: 'int' });
      } else {
        params.push({ name: paramName, esphomeType: typeResult.esphomeType });
      }
    }

    scripts.push({ name, snakeName, node: stmt, params });
  }

  return scripts;
}

/**
 * Returns true if a function declaration contains any `return` statement that
 * returns a non-void value (including JSX elements).
 * Such functions are JSX function components, not ESPHome scripts.
 */
function hasNonVoidReturn(fn: ts.FunctionDeclaration): boolean {
  if (!fn.body) return false;
  return statementsHaveReturn(fn.body.statements);
}

function statementsHaveReturn(statements: ts.NodeArray<ts.Statement>): boolean {
  for (const stmt of statements) {
    if (ts.isReturnStatement(stmt) && stmt.expression !== undefined) {
      return true;
    }
    // Recurse into nested blocks (if/while/for etc.)
    if (ts.isBlock(stmt) && statementsHaveReturn(stmt.statements)) return true;
    if (ts.isIfStatement(stmt)) {
      if (singleStatementHasReturn(stmt.thenStatement)) return true;
      if (stmt.elseStatement && singleStatementHasReturn(stmt.elseStatement)) return true;
    }
    if (ts.isWhileStatement(stmt) && singleStatementHasReturn(stmt.statement)) return true;
    if (ts.isForStatement(stmt) && singleStatementHasReturn(stmt.statement)) return true;
  }
  return false;
}

function singleStatementHasReturn(stmt: ts.Statement): boolean {
  if (ts.isBlock(stmt)) return statementsHaveReturn(stmt.statements);
  if (ts.isReturnStatement(stmt) && stmt.expression !== undefined) return true;
  return false;
}

// ────────────────────────────────────────────────────────────────────────────
// Source file visitor
// ────────────────────────────────────────────────────────────────────────────

function visitSourceFile(
  sf: ts.SourceFile,
  context: ts.TransformationContext,
  scriptMetadata: (ScriptFn & { actions: unknown[] })[],
  knownScripts: Set<string>,
  scriptParams: Map<string, string[]>,
  addDiag: (message: string, node?: ts.Node) => void,
): ts.SourceFile {
  const { factory } = context;
  const newStatements: ts.Statement[] = [];

  for (const stmt of sf.statements) {
    if (ts.isFunctionDeclaration(stmt) && stmt.name && knownScripts.has(stmt.name.text)) {
      // Keep the function declaration but replace its body with a useScript hook call.
      // This mirrors the Resolut pattern: the function stays callable so that trigger
      // props (`onPress={greet()}`) can evaluate it to register the script in scope.
      const meta = scriptMetadata.find((m) => m.name === stmt.name!.text)!;
      newStatements.push(buildScriptFunctionWithHook(factory, stmt, meta, scriptMetadata));
      continue;
    }

    // Visit all other statements to rewrite trigger props in JSX
    const visited = visitNode(stmt, context, knownScripts, scriptParams, addDiag);
    newStatements.push(visited as ts.Statement);
  }

  return factory.updateSourceFile(sf, newStatements);
}

// ────────────────────────────────────────────────────────────────────────────
// Node visitor — rewrites JSX trigger props
// ────────────────────────────────────────────────────────────────────────────

function visitNode(
  node: ts.Node,
  context: ts.TransformationContext,
  knownScripts: Set<string>,
  scriptParams: Map<string, string[]>,
  addDiag: (message: string, node?: ts.Node) => void,
): ts.Node {
  const { factory } = context;

  if (ts.isJsxElement(node)) {
    const rewrittenAttrs = rewriteTriggerAttributes(
      node.openingElement.attributes,
      factory,
      knownScripts,
      scriptParams,
      addDiag,
    );
    const visitedChildren = visitChildren(node.children, context, knownScripts, scriptParams, addDiag);
    const newOpening = factory.updateJsxOpeningElement(
      node.openingElement,
      node.openingElement.tagName,
      node.openingElement.typeArguments,
      rewrittenAttrs,
    );
    return factory.updateJsxElement(node, newOpening, visitedChildren, node.closingElement);
  }

  if (ts.isJsxSelfClosingElement(node)) {
    const rewrittenAttrs = rewriteTriggerAttributes(
      node.attributes,
      factory,
      knownScripts,
      scriptParams,
      addDiag,
    );
    return factory.updateJsxSelfClosingElement(
      node,
      node.tagName,
      node.typeArguments,
      rewrittenAttrs,
    );
  }

  return ts.visitEachChild(
    node,
    (child) => visitNode(child, context, knownScripts, scriptParams, addDiag),
    context,
  );
}

function visitChildren(
  children: ts.NodeArray<ts.JsxChild>,
  context: ts.TransformationContext,
  knownScripts: Set<string>,
  scriptParams: Map<string, string[]>,
  addDiag: (message: string, node?: ts.Node) => void,
): ts.NodeArray<ts.JsxChild> {
  const { factory } = context;
  const newChildren = children.map(
    (child) =>
      visitNode(child, context, knownScripts, scriptParams, addDiag) as ts.JsxChild,
  );
  return factory.createNodeArray(newChildren);
}

// ────────────────────────────────────────────────────────────────────────────
// Script function body replacement
//
// Replaces a function's body with a useScript hook call carrying the
// pre-compiled metadata, preserving the function declaration itself so it
// remains callable from trigger props.
//
// Transitive deps: for every other known script referenced in this script's
// action list, emit an explicit `depScript();` call first so that the dep
// is also registered in scope when this script is triggered.
// ────────────────────────────────────────────────────────────────────────────

function buildScriptFunctionWithHook(
  factory: ts.NodeFactory,
  stmt: ts.FunctionDeclaration,
  meta: ScriptFn & { actions: unknown[] },
  allMeta: (ScriptFn & { actions: unknown[] })[],
): ts.FunctionDeclaration {
  const statements: ts.Statement[] = [];

  // Emit explicit calls for transitive script dependencies so they register
  // in scope even though only the outer script was directly triggered.
  const depNames = collectScriptDepNames(meta.actions, allMeta);
  for (const depCamelName of depNames) {
    statements.push(
      factory.createExpressionStatement(
        factory.createCallExpression(
          factory.createIdentifier(depCamelName),
          undefined,
          [],
        ),
      ),
    );
  }

  // return ESPCompose.useScript({ id, parameters?, then });
  statements.push(
    factory.createReturnStatement(
      factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier('ESPCompose'),
          factory.createIdentifier('useScript'),
        ),
        undefined,
        [buildUseScriptMetadataAst(factory, meta)],
      ),
    ),
  );

  const newBody = factory.createBlock(statements, /* multiLine */ true);

  return factory.updateFunctionDeclaration(
    stmt,
    stmt.modifiers,
    stmt.asteriskToken,
    stmt.name,
    stmt.typeParameters,
    stmt.parameters,
    stmt.type,
    newBody,
  );
}

/**
 * Build the metadata object literal passed to `ESPCompose.useScript(...)`.
 *
 * Produces: `{ id: 'snake_name', parameters: { ... }, then: [...] }`
 * (`parameters` is omitted when the script has no parameters)
 */
function buildUseScriptMetadataAst(
  factory: ts.NodeFactory,
  meta: ScriptFn & { actions: unknown[] },
): ts.ObjectLiteralExpression {
  const props: ts.ObjectLiteralElementLike[] = [];

  // id: 'snake_name'
  props.push(
    factory.createPropertyAssignment(
      factory.createIdentifier('id'),
      factory.createStringLiteral(meta.snakeName),
    ),
  );

  // parameters: { paramName: 'esphomeType', … }   (omitted when empty)
  if (meta.params.length > 0) {
    const paramProps = meta.params.map((p) =>
      factory.createPropertyAssignment(
        factory.createStringLiteral(p.name),
        factory.createStringLiteral(p.esphomeType),
      ),
    );
    props.push(
      factory.createPropertyAssignment(
        factory.createIdentifier('parameters'),
        factory.createObjectLiteralExpression(paramProps, false),
      ),
    );
  }

  // then: [ ...actions ]
  props.push(
    factory.createPropertyAssignment(
      factory.createIdentifier('then'),
      actionArrayToAst(factory, meta.actions),
    ),
  );

  return factory.createObjectLiteralExpression(props, false);
}

/**
 * Walk an action list (recursively into `if.then`, `if.else`, `while.then`,
 * `repeat.then`) and collect the camelCase function names of any known scripts
 * that are referenced via `script.execute`.
 *
 * The returned list is de-duplicated and ordered by first appearance.
 */
function collectScriptDepNames(
  actions: unknown[],
  allMeta: (ScriptFn & { actions: unknown[] })[],
): string[] {
  const snakeToCamel = new Map(allMeta.map((m) => [m.snakeName, m.name]));
  const seen = new Set<string>();
  const result: string[] = [];

  function walk(arr: unknown[]): void {
    for (const item of arr) {
      if (item == null || typeof item !== 'object' || Array.isArray(item)) continue;
      const obj = item as Record<string, unknown>;

      // { 'script.execute': 'snake_name' }
      const exec = obj['script.execute'];
      if (typeof exec === 'string') {
        const camel = snakeToCamel.get(exec);
        if (camel && !seen.has(camel)) { seen.add(camel); result.push(camel); }
      } else if (exec != null && typeof exec === 'object' && !Array.isArray(exec)) {
        // { 'script.execute': { id: 'snake_name', ... } }
        const id = (exec as Record<string, unknown>).id;
        if (typeof id === 'string') {
          const camel = snakeToCamel.get(id);
          if (camel && !seen.has(camel)) { seen.add(camel); result.push(camel); }
        }
      }

      // Recurse into nested then/else arrays
      for (const key of ['then', 'else'] as const) {
        const nested = (obj[key] ?? (obj.if as Record<string, unknown> | undefined)?.[key] ?? (obj.while as Record<string, unknown> | undefined)?.[key] ?? (obj.repeat as Record<string, unknown> | undefined)?.[key]);
        if (Array.isArray(nested)) walk(nested);
      }
    }
  }

  walk(actions);
  return result;
}

// ────────────────────────────────────────────────────────────────────────────
// Trigger prop rewriting
// ────────────────────────────────────────────────────────────────────────────

function rewriteTriggerAttributes(
  attributes: ts.JsxAttributes,
  factory: ts.NodeFactory,
  knownScripts: Set<string>,
  scriptParams: Map<string, string[]>,
  addDiag: (message: string, node?: ts.Node) => void,
): ts.JsxAttributes {
  const newAttrs: ts.JsxAttributeLike[] = [];
  let changed = false;

  for (const attr of attributes.properties) {
    if (!ts.isJsxAttribute(attr)) {
      newAttrs.push(attr);
      continue;
    }

    const propName = ts.isIdentifier(attr.name)
      ? attr.name.text
      : ts.isJsxNamespacedName(attr.name)
        ? attr.name.name.text
        : '';

    // Only process props that look like event/trigger props (start with 'on')
    if (!propName.startsWith('on') || !attr.initializer) {
      newAttrs.push(attr);
      continue;
    }

    const init = attr.initializer;

    // {identifier} — check if it names a known script function.
    // Rewrite to a call expression: {greet} → {greet()} so that the function
    // body executes during prop evaluation, registering the script in scope.
    if (ts.isJsxExpression(init) && init.expression && ts.isIdentifier(init.expression)) {
      const id = init.expression as ts.Identifier;
      if (knownScripts.has(id.text)) {
        const callExpr = factory.createCallExpression(
          factory.createIdentifier(id.text),
          undefined,
          [],
        );
        const newAttr = factory.createJsxAttribute(
          attr.name,
          factory.createJsxExpression(undefined, callExpr),
        );
        newAttrs.push(newAttr);
        changed = true;
        continue;
      }
    }

    // {() => { … }} → inline arrow function → convert body to action array
    if (ts.isJsxExpression(init) && init.expression && ts.isArrowFunction(init.expression)) {
      const arrow = init.expression as ts.ArrowFunction;
      const ctx: ConverterContext = { knownScripts, scriptParams, errors: [] };
      let bodyStatements: readonly ts.Statement[];

      if (ts.isBlock(arrow.body)) {
        bodyStatements = arrow.body.statements;
      } else {
        // Concise arrow: `() => delay(100)` — wrap in expression statement
        bodyStatements = [factory.createExpressionStatement(arrow.body as ts.Expression)];
      }

      const actions = convertStatements(bodyStatements, ctx);
      for (const err of ctx.errors) addDiag(err.message, err.node);

      const actionArray = actionArrayToAst(factory, actions);
      const newAttr = factory.createJsxAttribute(
        attr.name,
        factory.createJsxExpression(undefined, actionArray),
      );
      newAttrs.push(newAttr);
      changed = true;
      continue;
    }

    newAttrs.push(attr);
  }

  if (!changed) return attributes;
  return factory.createJsxAttributes(newAttrs);
}

// ────────────────────────────────────────────────────────────────────────────
// Action value serialisation → TypeScript AST
// ────────────────────────────────────────────────────────────────────────────

/**
 * Convert an ESPHome action array (plain JS values) into a TypeScript
 * `ts.ArrayLiteralExpression` so it can be embedded in the rewritten JSX or
 * function bodies.
 */
function actionArrayToAst(factory: ts.NodeFactory, actions: unknown[]): ts.ArrayLiteralExpression {
  return factory.createArrayLiteralExpression(
    actions.map((a) => valueToAst(factory, a) as ts.Expression),
    false,
  );
}

function valueToAst(factory: ts.NodeFactory, value: unknown): ts.Expression {
  if (value === null || value === undefined) {
    return factory.createNull();
  }
  if (typeof value === 'boolean') {
    return value ? factory.createTrue() : factory.createFalse();
  }
  if (typeof value === 'number') {
    return factory.createNumericLiteral(value);
  }
  if (typeof value === 'string') {
    return factory.createStringLiteral(value);
  }
  if (Array.isArray(value)) {
    return factory.createArrayLiteralExpression(
      value.map((v) => valueToAst(factory, v) as ts.Expression),
    );
  }
  if (typeof value === 'object') {
    const props = Object.entries(value as Record<string, unknown>).map(([k, v]) => {
      // Use computed property for keys containing dots or hyphens (e.g. 'script.execute')
      const needsComputed = /[.\-\s]/.test(k);
      const keyNode = needsComputed
        ? factory.createComputedPropertyName(factory.createStringLiteral(k))
        : factory.createIdentifier(k);
      return factory.createPropertyAssignment(keyNode, valueToAst(factory, v) as ts.Expression);
    });
    return factory.createObjectLiteralExpression(props, false);
  }
  return factory.createNull();
}
