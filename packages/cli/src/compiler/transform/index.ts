/**
 * Phase 1: TypeScript AST transformation.
 *
 * Transforms every user source file in the ts.Program and writes the
 * results to an output directory (`<projectDir>/.espcompose-build/`),
 * preserving the original directory structure. This mirrors the Resolut CLI
 * pattern where individual transformed files are inspectable on disk.
 *
 * After writing, esbuild bundles from the build directory to produce a
 * single CJS file. Because the transformed sources are real files, esbuild
 * resolves imports normally — no load-plugin needed.
 */

import * as fs from 'fs';
import * as path from 'path';
import ts from 'typescript';
import { transformScriptFile, type TransformDiagnostic } from './script-transformer.js';
import { transformReactiveExpressions } from './reactive-transformer.js';

export type { TransformDiagnostic };

export interface TransformResult {
  /** Absolute path to the transformed entry file inside the build directory. */
  entryFile: string;
  /** Any transform diagnostics (errors / warnings). */
  diagnostics: TransformDiagnostic[];
}

/**
 * Transform all user source files in the TypeScript program and write
 * them to `buildDir`, preserving directory structure relative to `sourceDir`.
 *
 * Files inside `node_modules` are skipped — only project source files are
 * transformed and written. Unchanged files are copied verbatim so esbuild
 * can resolve all imports from within the build directory.
 *
 * @param program   - The TypeScript program (from Phase 0 type-check).
 * @param entryFile - Absolute path to the original entry file.
 * @param sourceDir - The project's source root directory.
 * @param buildDir  - The output directory (`.espcompose-build/`).
 * @returns The path to the transformed entry file + any diagnostics.
 */
export function writeTransformedFiles(
  program: ts.Program,
  entryFile: string,
  sourceDir: string,
  buildDir: string,
): TransformResult {
  const diagnostics: TransformDiagnostic[] = [];
  let transformedEntryFile = '';

  for (const sourceFile of program.getSourceFiles()) {
    const filePath = sourceFile.fileName;

    // Skip dependencies — only transform user source files
    if (filePath.includes('node_modules')) continue;

    // Only transform files under the project source directory
    const rel = path.relative(sourceDir, filePath);
    if (rel.startsWith('..') || path.isAbsolute(rel)) continue;

    const originalText = sourceFile.getFullText();

    // Pass 1: Auto-wrap reactive JSX attribute expressions in bind.memo()
    const reactiveResult = transformReactiveExpressions(sourceFile, program);
    diagnostics.push(...reactiveResult.diagnostics);

    // Pass 2: Compile trigger handler / createScript() bodies to action trees.
    // If the reactive pass modified the source, re-parse so positions are valid.
    let scriptInput: ts.SourceFile;
    if (reactiveResult.sourceText !== originalText) {
      scriptInput = ts.createSourceFile(
        sourceFile.fileName,
        reactiveResult.sourceText,
        sourceFile.languageVersion,
        true,
        ts.ScriptKind.TSX,
      );
    } else {
      scriptInput = sourceFile;
    }
    const result = transformScriptFile(scriptInput, program);
    diagnostics.push(...result.diagnostics);

    // Use transformed text if it changed, otherwise copy original
    const outputText = result.sourceText !== reactiveResult.sourceText
      ? result.sourceText
      : reactiveResult.sourceText !== originalText
        ? reactiveResult.sourceText
        : originalText;

    const outputPath = path.join(buildDir, rel);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, outputText, 'utf8');

    // Track the entry file's new location
    if (path.normalize(filePath) === path.normalize(entryFile)) {
      transformedEntryFile = outputPath;
    }
  }

  if (!transformedEntryFile) {
    // Entry file wasn't in the program's source files — fall back to
    // mirroring its relative position
    const rel = path.relative(sourceDir, entryFile);
    transformedEntryFile = path.join(buildDir, rel);
  }

  return { entryFile: transformedEntryFile, diagnostics };
}
