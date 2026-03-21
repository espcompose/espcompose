/**
 * Phase 1: TypeScript AST transformation entry point.
 *
 * Reads the user's entry file, applies the script transformer, and writes
 * the transformed source to a temporary file next to the original. Returns
 * the path to the temporary file for Phase 2 bundling.
 *
 * The temporary file is named `.espcompose-transformed-<pid>-<ts>.tsx` so it
 * won't collide with the user's sources even when watch mode is added later.
 */

import * as fs from 'fs';
import * as path from 'path';
import ts from 'typescript';
import { transformScriptFile, type TransformDiagnostic } from './script-transformer.js';

export type { TransformDiagnostic };

export interface Phase1Options {
  /** Absolute path to the user's entry file. */
  entryFile: string;
  /** The pre-built TypeScript program (reused from Phase 0). */
  program: ts.Program;
}

export interface Phase1Result {
  /** Absolute path to the (potentially) transformed file — input to Phase 2. */
  entryFile: string;
  /** Path of the temp file created, if any — caller must clean it up. */
  tempFile: string | null;
  /** Any transform diagnostics (errors / warnings). */
  diagnostics: TransformDiagnostic[];
}

/**
 * Apply Phase 1 (script transformation) to the entry file.
 *
 * If no `function` declarations are found, returns the original entry file
 * path unchanged and `tempFile: null` (no disk write needed).
 */
export async function applyTransform(options: Phase1Options): Promise<Phase1Result> {
  const { entryFile, program } = options;

  const sourceFile = program.getSourceFile(entryFile);
  if (!sourceFile) {
    // Defensive: if the source file isn't in the program, skip transformation
    return { entryFile, tempFile: null, diagnostics: [] };
  }

  const { sourceText, diagnostics } = transformScriptFile(sourceFile, program);

  // Check if the transformer actually changed anything (function declarations detected)
  // by comparing source text length as a quick proxy. The real check is whether
  // any function declarations exist in the original file.
  const hasScripts = hasFunctionDeclarations(sourceFile);

  if (!hasScripts && diagnostics.length === 0) {
    // Nothing to transform — pass original file straight to bundler
    return { entryFile, tempFile: null, diagnostics };
  }

  // Write transformed source to a temp file
  const tempFile = path.join(
    path.dirname(entryFile),
    `.espcompose-transformed-${process.pid}-${Date.now()}.tsx`,
  );
  fs.writeFileSync(tempFile, sourceText, 'utf8');

  return { entryFile: tempFile, tempFile, diagnostics };
}

function hasFunctionDeclarations(sourceFile: ts.SourceFile): boolean {
  return sourceFile.statements.some(
    (stmt) => ts.isFunctionDeclaration(stmt) && stmt.name != null,
  );
}
