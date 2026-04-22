/**
 * Global Key Injector
 *
 * Injects auto-generated `__key` properties into volatile useGlobal() calls.
 * Validates useRetainedGlobal() calls have a string literal key as arg 2.
 *
 * useGlobal() — volatile only, no user key needed. Compiler auto-generates one.
 * useRetainedGlobal() — key is positional arg 2, must be a string literal.
 *
 * Runs as part of the reactive transformer pass (before the script transformer).
 */

import ts from 'typescript';
import { isCoreHookCall } from './type-brands.js';
import type { TransformDiagnostic } from './script-transformer.js';

interface SourceEdit {
  position: number;
  deleteEnd?: number;
  text: string;
}

/**
 * Walk the AST looking for `useGlobal()` and `useRetainedGlobal()` calls.
 *
 * - For useGlobal(): inject `__key` into every call (all are volatile).
 * - For useRetainedGlobal(): validate key (arg 2) is a string literal.
 */
export function injectGlobalKeys(
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  edits: SourceEdit[],
  diagnostics: TransformDiagnostic[],
): void {
  let globalCounter = 0;
  const fileName = sourceFile.fileName;

  const walk = (node: ts.Node): void => {
    if (
      ts.isVariableDeclaration(node)
      && node.initializer
      && ts.isIdentifier(node.name)
      && ts.isCallExpression(node.initializer)
    ) {
      const call = node.initializer;
      const varName = node.name.text;

      // ── useGlobal() — always volatile, inject __key ──────────────
      if (isCoreHookCall(call, 'useGlobal', checker)) {
        const autoKey = `${varName}_${globalCounter++}`;
        const optsArg = call.arguments[1];

        if (optsArg && ts.isObjectLiteralExpression(optsArg)) {
          const openBrace = optsArg.getStart() + 1; // after '{'
          edits.push({
            position: openBrace,
            text: ` __key: '${autoKey}',`,
          });
        } else if (!optsArg) {
          const closeParenPos = call.getEnd() - 1; // before ')'
          edits.push({
            position: closeParenPos,
            text: `, { __key: '${autoKey}' }`,
          });
        }
      }

      // ── useRetainedGlobal() — validate key is string literal ─────
      if (isCoreHookCall(call, 'useRetainedGlobal', checker)) {
        // Validate no array types used with retained globals
        const typeArg = call.arguments[0];
        if (typeArg && ts.isStringLiteral(typeArg) && typeArg.text.endsWith('[]')) {
          const { line, character } = ts.getLineAndCharacterOfPosition(
            call.getSourceFile(), typeArg.getStart(),
          );
          diagnostics.push({
            message: `useRetainedGlobal() does not support array types ('${typeArg.text}'). Use useGlobal() for arrays.`,
            file: fileName,
            line: line + 1,
            character,
          });
        }

        const keyArg = call.arguments[1];
        if (!keyArg) {
          const { line, character } = ts.getLineAndCharacterOfPosition(
            call.getSourceFile(), call.getStart(),
          );
          diagnostics.push({
            message: 'useRetainedGlobal() requires a key string as the second argument for flash-key stability across firmware rebuilds.',
            file: fileName,
            line: line + 1,
            character,
          });
        } else if (!ts.isStringLiteral(keyArg)) {
          const { line, character } = ts.getLineAndCharacterOfPosition(
            call.getSourceFile(), keyArg.getStart(),
          );
          diagnostics.push({
            message: 'useRetainedGlobal() key (arg 2) must be a string literal — it must be statically known at compile time.',
            file: fileName,
            line: line + 1,
            character,
          });
        }
      }
    }

    ts.forEachChild(node, walk);
  };

  walk(sourceFile);
}
