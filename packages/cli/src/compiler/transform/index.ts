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
import { runSemanticAnalysis, dumpSemanticRegistries } from './semantic-analysis.js';
import type { SemanticRegistry } from './semantic-registry.js';

export type { TransformDiagnostic };

export interface TransformResult {
  /** Absolute path to the transformed entry file inside the build directory. */
  entryFile: string;
  /** Any transform diagnostics (errors / warnings). */
  diagnostics: TransformDiagnostic[];
  /** Number of source files written to the build directory. */
  filesWritten: number;
  /** Number of files that had AST transforms applied. */
  filesTransformed: number;
  /** Per-file semantic analysis registries (analysis-only, does not affect output). */
  semanticRegistries: Map<string, SemanticRegistry>;
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
  options?: { debug?: boolean },
): TransformResult {
  const diagnostics: TransformDiagnostic[] = [];
  let transformedEntryFile = '';
  let filesWritten = 0;
  let filesTransformed = 0;
  const semanticRegistries = new Map<string, SemanticRegistry>();

  for (const sourceFile of program.getSourceFiles()) {
    const filePath = sourceFile.fileName;

    // Skip dependencies — only transform user source files
    if (filePath.includes('node_modules')) continue;

    // Only transform files under the project source directory
    const rel = path.relative(sourceDir, filePath);
    if (rel.startsWith('..') || path.isAbsolute(rel)) continue;

    const originalText = sourceFile.getFullText();

    // Pass 0 (analysis-only): Semantic expression classification.
    // Records findings in a sidecar registry — does NOT modify source.
    const semanticRegistry = runSemanticAnalysis(sourceFile, program);
    semanticRegistries.set(filePath, semanticRegistry);

    // Pass 1: Auto-wrap reactive JSX attribute expressions in useMemo()
    const reactiveResult = transformReactiveExpressions(sourceFile, program);
    diagnostics.push(...reactiveResult.diagnostics);

    // Pass 2: Compile trigger handler / createScript() bodies to action trees.
    // If the reactive pass modified the source, re-parse so positions are valid.
    // We also need a fresh TypeScript program so the checker can resolve symbols
    // (the original program's checker can't resolve nodes from a re-parsed file).
    let scriptInput: ts.SourceFile;
    let scriptProgram: ts.Program;
    if (reactiveResult.sourceText !== originalText) {
      scriptInput = ts.createSourceFile(
        sourceFile.fileName,
        reactiveResult.sourceText,
        sourceFile.languageVersion,
        true,
        ts.ScriptKind.TSX,
      );
      const originalHost = ts.createCompilerHost(program.getCompilerOptions());
      const customHost: ts.CompilerHost = {
        ...originalHost,
        getSourceFile: (name, languageVersion) => {
          if (path.normalize(name) === path.normalize(sourceFile.fileName)) {
            return scriptInput;
          }
          // Delegate to original program's source files first, then default host
          const existing = program.getSourceFile(name);
          if (existing) return existing;
          return originalHost.getSourceFile(name, languageVersion);
        },
        fileExists: (name) => {
          if (path.normalize(name) === path.normalize(sourceFile.fileName)) return true;
          return originalHost.fileExists(name);
        },
        readFile: (name) => {
          if (path.normalize(name) === path.normalize(sourceFile.fileName)) {
            return reactiveResult.sourceText;
          }
          return originalHost.readFile(name);
        },
      };
      scriptProgram = ts.createProgram(
        [sourceFile.fileName],
        program.getCompilerOptions(),
        customHost,
      );
      scriptInput = scriptProgram.getSourceFile(sourceFile.fileName) ?? scriptInput;
    } else {
      scriptInput = sourceFile;
      scriptProgram = program;
    }
    const result = transformScriptFile(scriptInput, scriptProgram);
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

    filesWritten++;
    if (outputText !== originalText) filesTransformed++;

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

  // Dump semantic analysis results in debug mode
  if (options?.debug && semanticRegistries.size > 0) {
    dumpSemanticRegistries(semanticRegistries, buildDir, sourceDir);
  }

  return { entryFile: transformedEntryFile, diagnostics, filesWritten, filesTransformed, semanticRegistries };
}
