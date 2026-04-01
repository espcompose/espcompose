/**
 * Library transform — pre-compile reactive expressions in a component library.
 *
 * Runs the same two-pass AST transformation (reactive + script) that the
 * user-project compiler uses, but writes transformed TypeScript source files
 * instead of bundling or executing them. The library's own bundler (tsup,
 * rollup, etc.) then compiles the transformed sources into publishable JS.
 *
 * This enables third-party ESPCompose component libraries to ship with
 * pre-compiled `_reactive.compiled()` / `_reactive.slotted()` calls, so consumers
 * don't need the library's TypeScript source.
 */

import * as fs from 'fs';
import * as path from 'path';
import ts from 'typescript';
import * as esbuild from 'esbuild';
import { transformReactiveExpressions } from './compiler/transform/reactive-transformer.js';
import { transformScriptFile } from './compiler/transform/script-transformer.js';
import type { TransformDiagnostic } from './compiler/transform/index.js';
import { LIBRARY_FORMAT_VERSION, FORMAT_VERSION_EXPORT } from './compiler/transform/format-version.js';

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
      jsxImportSource: '@esphome/compose',
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

// ────────────────────────────────────────────────────────────────────────────
// buildLibrary — unified transform + bundle command
// ────────────────────────────────────────────────────────────────────────────

export interface BuildLibraryOptions {
  /** Absolute path to the library root (where package.json lives). */
  rootDir: string;
  /** Entry file relative to rootDir (default: 'src/index.ts'). */
  entry?: string;
  /** Output directory relative to rootDir (default: 'dist'). */
  outDir?: string;
  /** Optional path to tsconfig.json relative to rootDir. */
  tsconfig?: string;
}

export interface BuildLibraryResult {
  /** Transform phase result. */
  transform: TransformLibResult;
}

/**
 * Build an ESPCompose component library: transform reactive expressions,
 * bundle CJS + ESM via esbuild, and emit .d.ts via TypeScript.
 *
 * This is the implementation behind `espcompose library`.
 */
export async function buildLibrary(options: BuildLibraryOptions): Promise<BuildLibraryResult> {
  const rootDir = options.rootDir;
  const entryRel = options.entry ?? 'src/index.ts';
  const outDirRel = options.outDir ?? 'dist';
  const entryFile = path.resolve(rootDir, entryRel);
  const sourceDir = path.dirname(entryFile);
  const outDir = path.resolve(rootDir, outDirRel);
  const buildDir = path.resolve(rootDir, '.espcompose-build');
  const tsconfigPath = options.tsconfig
    ? path.resolve(rootDir, options.tsconfig)
    : undefined;

  // ── Phase 1: Transform ────────────────────────────────────────────────
  const transformResult = transformLib({
    entryFile,
    sourceDir,
    outDir: buildDir,
    tsconfigPath,
  });

  // ── Phase 2: Bundle CJS + ESM via esbuild ─────────────────────────────
  const transformedEntry = path.join(buildDir, path.relative(sourceDir, entryFile));

  // Clean output directory
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
  }

  const sharedOptions: esbuild.BuildOptions = {
    entryPoints: [transformedEntry],
    bundle: true,
    platform: 'node',
    target: 'es2022',
    jsx: 'automatic',
    jsxImportSource: '@esphome/compose',
    external: ['@esphome/compose'],
    outdir: outDir,
    sourcemap: false,
  };

  // CJS
  await esbuild.build({
    ...sharedOptions,
    format: 'cjs',
    outExtension: { '.js': '.js' },
  });

  // ESM
  await esbuild.build({
    ...sharedOptions,
    format: 'esm',
    outExtension: { '.js': '.mjs' },
  });

  // ── Phase 3: Emit .d.ts via TypeScript ────────────────────────────────
  const resolvedTsConfig = tsconfigPath
    ?? ts.findConfigFile(rootDir, ts.sys.fileExists, 'tsconfig.json');

  let baseOptions: ts.CompilerOptions = {};
  if (resolvedTsConfig) {
    const configFile = ts.readConfigFile(resolvedTsConfig, ts.sys.readFile);
    if (!configFile.error) {
      const parsed = ts.parseJsonConfigFileContent(
        configFile.config,
        ts.sys,
        path.dirname(resolvedTsConfig),
      );
      baseOptions = parsed.options;
    }
  }

  const dtsOptions: ts.CompilerOptions = {
    ...baseOptions,
    declaration: true,
    emitDeclarationOnly: true,
    declarationDir: outDir,
    rootDir: buildDir,
    outDir: outDir,
    noEmit: false,
    skipLibCheck: true,
  };

  const dtsProgram = ts.createProgram([transformedEntry], dtsOptions);
  const emitResult = dtsProgram.emit();

  if (emitResult.diagnostics.length > 0) {
    const errors = emitResult.diagnostics.filter(
      d => d.category === ts.DiagnosticCategory.Error,
    );
    if (errors.length > 0) {
      const formatted = errors.map(d => {
        const msg = ts.flattenDiagnosticMessageText(d.messageText, '\n');
        if (d.file && d.start !== undefined) {
          const { line, character } = d.file.getLineAndCharacterOfPosition(d.start);
          return `  ${path.relative(rootDir, d.file.fileName)}:${line + 1}:${character + 1} - ${msg}`;
        }
        return `  ${msg}`;
      });
      throw new Error(`DTS generation failed:\n${formatted.join('\n')}`);
    }
  }

  // ── Cleanup: remove intermediate build directory ───────────────────────
  fs.rmSync(buildDir, { recursive: true, force: true });

  return { transform: transformResult };
}
