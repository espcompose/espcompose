import * as path from 'path';
import ts from 'typescript';
import type { PhaseContext } from './types';

/**
 * Emit DTS phase (library pipeline): Generate TypeScript declaration files.
 *
 * Uses the compiler options from the type-check program as a base,
 * overriding for declaration-only emission. Reads transformed sources
 * from buildDir and writes .d.ts files to outDir.
 *
 * Requires `ctx.program`, `ctx.transformedEntry`, `ctx.buildDir`,
 * and `ctx.outDir` to be set.
 */
export function emitDTSPhase(ctx: PhaseContext): void {
  if (!ctx.program || !ctx.transformedEntry || !ctx.outDir) {
    throw new Error('Emit DTS phase requires program, transformedEntry, and outDir.');
  }

  const baseOptions = ctx.program.getCompilerOptions();
  const projectDir = ctx.projectDir ?? ctx.sourceDir;

  const dtsOptions: ts.CompilerOptions = {
    ...baseOptions,
    declaration: true,
    emitDeclarationOnly: true,
    declarationDir: ctx.outDir,
    rootDir: ctx.buildDir,
    outDir: ctx.outDir,
    noEmit: false,
    skipLibCheck: true,
  };

  const dtsProgram = ts.createProgram([ctx.transformedEntry], dtsOptions);
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
          return `  ${path.relative(projectDir, d.file.fileName)}:${line + 1}:${character + 1} - ${msg}`;
        }
        return `  ${msg}`;
      });
      throw new Error(`DTS generation failed:\n${formatted.join('\n')}`);
    }
  }
}
