/**
 * Asset Path Transformer
 *
 * Rewrites relative file paths in `useImage()` and `useFont()` calls so they
 * are relative to `sourceDir` (the entry file's directory) rather than the
 * calling file's directory.
 *
 * This is necessary because after bundling, the original source file location
 * is lost — at emit time, `resolveAssets()` resolves paths relative to
 * `sourceDir`.  Without this transform, `../assets/bg.jpg` written from
 * `src/ui/Main.tsx` would resolve to the wrong directory.
 *
 * The transform finds calls matching `useImage({ file: '...' })` or
 * `useFont({ file: '...' })`, resolves the string literal relative to the
 * source file's directory, then rewrites it to be relative to `sourceDir`.
 */

import * as path from 'path';
import ts from 'typescript';
import type { SourceEdit } from './type-brands.js';

/**
 * Non-filesystem references that should be left as-is.
 */
function isNonFilePath(value: string): boolean {
  return /^https?:\/\//.test(value)
    || /^mdi:/.test(value)
    || /^mdil:/.test(value)
    || /^memory:/.test(value)
    || /^gfonts:\/\//.test(value);
}

const ASSET_HOOK_NAMES = new Set(['useImage', 'useFont']);

/**
 * Rewrite relative `file` paths in `useImage()` / `useFont()` calls to be
 * relative to `sourceDir`.
 *
 * @param sourceFile  The TypeScript source file AST.
 * @param sourceDir   The entry file's directory (asset resolution base).
 * @returns           The (possibly rewritten) source text.
 */
export function transformAssetPaths(
  sourceFile: ts.SourceFile,
  sourceDir: string,
): string {
  const fileDir = path.dirname(sourceFile.fileName);
  const edits: SourceEdit[] = [];

  function walk(node: ts.Node): void {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      ASSET_HOOK_NAMES.has(node.expression.text) &&
      node.arguments.length >= 1 &&
      ts.isObjectLiteralExpression(node.arguments[0])
    ) {
      const objLit = node.arguments[0];
      for (const prop of objLit.properties) {
        if (
          ts.isPropertyAssignment(prop) &&
          ts.isIdentifier(prop.name) &&
          prop.name.text === 'file' &&
          ts.isStringLiteral(prop.initializer)
        ) {
          const originalPath = prop.initializer.text;

          // Skip absolute paths, URLs, and special references
          if (path.isAbsolute(originalPath) || isNonFilePath(originalPath)) continue;

          // Resolve from the source file's directory, then make relative to sourceDir
          const absResolved = path.resolve(fileDir, originalPath);
          let newRelative = path.relative(sourceDir, absResolved);

          // Normalize to posix separators for consistency
          newRelative = newRelative.split(path.sep).join('/');

          // If unchanged, skip
          if (newRelative === originalPath) continue;

          // Replace the string literal (include the quotes)
          const start = prop.initializer.getStart(sourceFile);
          const end = prop.initializer.getEnd();
          // Preserve the original quote style
          const originalQuote = sourceFile.getFullText()[start];
          edits.push({
            position: start,
            deleteEnd: end,
            text: `${originalQuote}${newRelative}${originalQuote}`,
          });
        }
      }
    }

    ts.forEachChild(node, walk);
  }

  walk(sourceFile);

  if (edits.length === 0) return sourceFile.getFullText();

  // Apply edits in reverse order so positions stay valid
  let text = sourceFile.getFullText();
  for (const edit of edits.sort((a, b) => b.position - a.position)) {
    text = text.slice(0, edit.position) + edit.text + text.slice(edit.deleteEnd);
  }

  return text;
}
