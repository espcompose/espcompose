/**
 * Library transform — pre-compile reactive expressions in a component library.
 *
 * Runs the same two-pass AST transformation (reactive + script) that the
 * user-project compiler uses, but writes transformed TypeScript source files
 * instead of bundling or executing them. The library's own bundler (tsup,
 * rollup, etc.) then compiles the transformed sources into publishable JS.
 *
 * This enables third-party ESPCompose component libraries to ship with
 * pre-compiled `__espcompose.compiled()` / `__espcompose.slotted()` calls, so consumers
 * don't need the library's TypeScript source.
 */

import * as fs from 'fs';
import * as path from 'path';
import ts from 'typescript';
import { transformReactiveExpressions } from './transform/reactive-transformer.js';
import { transformScriptFile } from './transform/script-transformer.js';
import type { TransformDiagnostic } from './transform/index.js';
import { LIBRARY_FORMAT_VERSION, FORMAT_VERSION_EXPORT } from './transform/format-version.js';

export interface TransformLibOptions {
  /** Absolute path to the library entry file (e.g. src/index.ts). */
  entryFile: string;
  /** Absolute path to the source directory root. */
  sourceDir: string;
  /** Absolute path to the output directory for transformed sources. */
  outDir: string;
  /** Optional path to tsconfig.json (auto-detected if not provided). */
  tsconfigPath?: string;
}

export interface TransformLibResult {
  /** Number of files written. */
  filesWritten: number;
  /** Number of files that had reactive/script transforms applied. */
  filesTransformed: number;
  /** Transform diagnostics (warnings). */
  diagnostics: TransformDiagnostic[];
}

/**
 * Transform all source files in a component library, writing pre-compiled
 * TypeScript to the output directory.
 */
export function transformLib(options: TransformLibOptions): TransformLibResult {
  const { entryFile, sourceDir, outDir, tsconfigPath } = options;

  // ── Create ts.Program from library tsconfig ────────────────────────────
  const resolvedTsConfig = tsconfigPath
    ?? ts.findConfigFile(sourceDir, ts.sys.fileExists, 'tsconfig.json');

  let compilerOptions: ts.CompilerOptions;
  if (resolvedTsConfig) {
    const configFile = ts.readConfigFile(resolvedTsConfig, ts.sys.readFile);
    if (configFile.error) {
      const message = ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n');
      throw new Error(`Error reading tsconfig.json: ${message}`);
    }
    const parsedConfig = ts.parseJsonConfigFileContent(
      configFile.config,
      ts.sys,
      path.dirname(resolvedTsConfig),
    );
    compilerOptions = parsedConfig.options;
  } else {
    compilerOptions = {
      target: ts.ScriptTarget.ES2022,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      jsx: ts.JsxEmit.ReactJSX,
      jsxImportSource: '@espcompose/core',
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
    };
  }

  const program = ts.createProgram([entryFile], compilerOptions);
  const diagnostics: TransformDiagnostic[] = [];
  let filesWritten = 0;
  let filesTransformed = 0;

  // Clean output directory
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
  fs.mkdirSync(outDir, { recursive: true });

  // ── Transform each source file ────────────────────────────────────────
  for (const sourceFile of program.getSourceFiles()) {
    const filePath = sourceFile.fileName;

    // Skip node_modules — only transform library source files
    if (filePath.includes('node_modules')) continue;

    // Only transform files under the library source directory
    const rel = path.relative(sourceDir, filePath);
    if (rel.startsWith('..') || path.isAbsolute(rel)) continue;

    const originalText = sourceFile.getFullText();

    // Pass 1: Reactive expression compilation
    const reactiveResult = transformReactiveExpressions(sourceFile, program);
    diagnostics.push(...reactiveResult.diagnostics);

    // Pass 2: Script callback compilation
    // Re-parse if the reactive pass modified the source.
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
    const scriptResult = transformScriptFile(scriptInput, program);
    diagnostics.push(...scriptResult.diagnostics);

    // Determine final output text
    const outputText = scriptResult.sourceText !== reactiveResult.sourceText
      ? scriptResult.sourceText
      : reactiveResult.sourceText !== originalText
        ? reactiveResult.sourceText
        : originalText;

    const wasTransformed = outputText !== originalText;

    // Inject format version marker into the entry file
    const isEntryFile = path.normalize(filePath) === path.normalize(entryFile);
    const finalText = isEntryFile
      ? `export const ${FORMAT_VERSION_EXPORT} = ${LIBRARY_FORMAT_VERSION};\n` + outputText
      : outputText;

    // Write to output directory
    const outputPath = path.join(outDir, rel);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, finalText, 'utf8');

    filesWritten++;
    if (wasTransformed || isEntryFile) filesTransformed++;
  }

  return { filesWritten, filesTransformed, diagnostics };
}
