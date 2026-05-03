/**
 * Phase 1: TypeScript AST transformation.
 *
 * Transforms every app source file and every source-mode library file in the
 * `ts.Program`, writing the results to a layout under `<buildDir>/` that
 * mirrors Node module resolution:
 *
 *   - app-source                  → `<buildDir>/app/<rel-to-projectDir>`
 *   - espcompose-source-library   → `<buildDir>/node_modules/<pkgName>/<rel-to-pkgRoot>`
 *
 * Because the resulting layout is a normal `node_modules`-style tree, the
 * downstream esbuild bundle phase resolves bare specifiers without any
 * custom resolver plugin.
 *
 * Files classified as `runtime-external` (e.g. `@espcompose/core`,
 * untransformed third-party deps) are skipped entirely.
 */

import * as fs from 'fs';
import * as path from 'path';
import ts from 'typescript';
import { transformScriptFile, type TransformDiagnostic } from './script-transformer.js';
import { transformReactiveExpressions } from './reactive-transformer.js';
import { transformAssetPaths } from './asset-path-transformer.js';
import type { SourceLibraryRegistry } from '../resolver/index.js';

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
}

/**
 * Transform every classified source file in the TypeScript program and write
 * to the build directory under the layout described above.
 *
 * @param program   - The TypeScript program (from Phase 0 type-check).
 * @param entryFile - Absolute path to the original entry file.
 * @param buildDir  - The output directory (`.espcompose-build/`).
 * @param registry  - Source-library registry, used to classify each file.
 * @param pathMap   - Mutable map of original→buildPath, populated as files are written.
 */
export function writeTransformedFiles(
  program: ts.Program,
  entryFile: string,
  buildDir: string,
  registry: SourceLibraryRegistry,
  pathMap: Map<string, string>,
): TransformResult {
  const diagnostics: TransformDiagnostic[] = [];
  let transformedEntryFile = '';
  let filesWritten = 0;
  let filesTransformed = 0;

  for (const sourceFile of program.getSourceFiles()) {
    const filePath = sourceFile.fileName;

    const klass = registry.classifyPath(filePath);
    if (klass === 'runtime-external') continue;

    const outputPath = computeOutputPath(filePath, klass, registry, buildDir);
    if (!outputPath) continue;

    const originalText = sourceFile.getFullText();

    // Pass 1: Auto-wrap reactive JSX attribute expressions in useMemo()
    const reactiveResult = transformReactiveExpressions(sourceFile, program);
    diagnostics.push(...reactiveResult.diagnostics);

    // Pass 2: Compile trigger handler / useScript() bodies to action trees.
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

    // Determine text after reactive + script transforms
    const transformedText = result.sourceText !== reactiveResult.sourceText
      ? result.sourceText
      : reactiveResult.sourceText !== originalText
        ? reactiveResult.sourceText
        : originalText;

    // Pass 3: Rewrite relative file paths in useImage()/useFont() calls
    // to be relative to sourceDir (the entry file's directory).
    // Runs last so it doesn't interfere with the reactive/script transforms
    // which may need a custom TypeScript program with a working type checker.
    const sourceDir = path.dirname(entryFile);
    let outputText: string;
    if (transformedText !== originalText) {
      const reparsed = ts.createSourceFile(
        sourceFile.fileName,
        transformedText,
        sourceFile.languageVersion,
        true,
        ts.ScriptKind.TSX,
      );
      outputText = transformAssetPaths(reparsed, sourceDir);
    } else {
      outputText = transformAssetPaths(sourceFile, sourceDir);
    }

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, outputText, 'utf8');

    pathMap.set(path.normalize(filePath), outputPath);

    filesWritten++;
    if (outputText !== originalText) filesTransformed++;

    // Track the entry file's new location
    if (path.normalize(filePath) === path.normalize(entryFile)) {
      transformedEntryFile = outputPath;
    }
  }

  if (!transformedEntryFile) {
    // Entry file wasn't in the program's source files — fall back to
    // computing its build location from the registry.
    const klass = registry.classifyPath(entryFile);
    const fallback = computeOutputPath(entryFile, klass, registry, buildDir);
    transformedEntryFile = fallback ?? path.join(buildDir, 'app', path.basename(entryFile));
  }

  return { entryFile: transformedEntryFile, diagnostics, filesWritten, filesTransformed };
}

/**
 * Compute the build-dir output path for a source file, based on its class.
 * Returns `undefined` for runtime-external files.
 */
function computeOutputPath(
  filePath: string,
  klass: 'app-source' | 'espcompose-source-library' | 'runtime-external',
  registry: SourceLibraryRegistry,
  buildDir: string,
): string | undefined {
  if (klass === 'app-source') {
    const rel = path.relative(registry.projectRoot, fs.realpathSync(filePath));
    return path.join(buildDir, 'app', rel);
  }
  if (klass === 'espcompose-source-library') {
    const lib = registry.matchPath(filePath);
    if (!lib) return undefined;
    const rel = path.relative(lib.rootDir, fs.realpathSync(filePath));
    return path.join(buildDir, 'node_modules', lib.packageName, rel);
  }
  return undefined;
}
