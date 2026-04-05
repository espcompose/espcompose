import * as path from 'path';
import ts from 'typescript';
import type { PhaseContext } from './types';

/**
 * Phase 0: Type-check
 *
 * Runs the TypeScript compiler over the entry file and its transitive imports.
 * Uses the project's own tsconfig.json when found, falling back to sensible
 * JSX defaults. Throws on type errors. Stores the ts.Program on the context
 * for reuse by the transform phase.
 */
export async function typeCheckPhase(ctx: PhaseContext): Promise<void> {
  const projectDir = path.dirname(ctx.entryFile);
  const tsConfigPath = ts.findConfigFile(projectDir, ts.sys.fileExists, 'tsconfig.json');

  let compilerOptions: ts.CompilerOptions;
  if (tsConfigPath) {
    const configFile = ts.readConfigFile(tsConfigPath, ts.sys.readFile);
    if (configFile.error) {
      const message = ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n');
      throw new Error(`Error reading tsconfig.json: ${message}`);
    }
    const parsedConfig = ts.parseJsonConfigFileContent(
      configFile.config,
      ts.sys,
      path.dirname(tsConfigPath),
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

  const program = ts.createProgram([ctx.entryFile], compilerOptions);
  const diagnostics = ts.getPreEmitDiagnostics(program);

  const errors = Array.from(diagnostics).filter(
    (d) =>
      d.category === ts.DiagnosticCategory.Error &&
      d.file !== undefined &&
      !d.file.fileName.includes('node_modules'),
  );

  if (errors.length > 0) {
    const formatted = errors.map((d) => {
      const message = ts.flattenDiagnosticMessageText(d.messageText, '\n');
      if (d.file && d.start !== undefined) {
        const { line, character } = d.file.getLineAndCharacterOfPosition(d.start);
        const relFile = path.relative(process.cwd(), d.file.fileName);
        return `  error ${relFile}:${line + 1}:${character + 1} - ${message}`;
      }
      return `  error ${message}`;
    });
    throw new Error(
      `TypeScript type-check failed with ${errors.length} error(s):\n${formatted.join('\n')}`,
    );
  }

  ctx.program = program;
}
