/**
 * Tests for the useReactiveMap() union expansion injection in the reactive transformer.
 *
 * Verifies that when useReactiveMap() receives a Signal-branded first argument
 * whose inner type is a finite string literal union, the transformer injects
 * a $compilerMetadata third argument with the union members.
 */

import { describe, it, expect } from 'vitest';
import ts from 'typescript';
import { transformReactiveExpressions } from './reactive-transformer';

// ────────────────────────────────────────────────────────────────────────────
// Test helpers
// ────────────────────────────────────────────────────────────────────────────

const CORE_STUB_FILENAME = '/node_modules/@espcompose/core/index.d.ts';
const CORE_STUB_SOURCE = `
  declare const SIGNAL_BRAND: unique symbol;
  declare const REACTIVE_NODE_BRAND: unique symbol;
  export type Signal<T> = T & { readonly [SIGNAL_BRAND]: true };
  export type Reactive<T> = T | IRReactiveNode<T>;
  export declare class IRReactiveNode<T = unknown> {
    readonly [REACTIVE_NODE_BRAND]?: T;
    get(): T;
  }
  export declare function useHAEntity(entityId: string, opts?: { domain?: string }): any;
  export declare function useMemo<T>(fn: () => T): T;
  export declare function useReactiveMap<T, R>(prop: Reactive<T>, fn: (value: T) => R, $compilerMetadata?: never): R;
  export declare function useReactive<T>(prop: Reactive<T>): T | IRReactiveNode<T>;
  export declare function useEffect(fn: () => void): void;
`;

function createProgram(source: string): { sourceFile: ts.SourceFile; program: ts.Program } {
  const fileName = '/src/test.tsx';
  const sf = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const stubSf = ts.createSourceFile(CORE_STUB_FILENAME, CORE_STUB_SOURCE, ts.ScriptTarget.Latest, true);

  const options: ts.CompilerOptions = {
    target: ts.ScriptTarget.Latest,
    jsx: ts.JsxEmit.ReactJSX,
    moduleResolution: ts.ModuleResolutionKind.Node10,
    strict: false,
    noEmit: true,
  };
  const host = ts.createCompilerHost(options);
  const originalGetSourceFile = host.getSourceFile;
  host.getSourceFile = (name, ...args) => {
    if (name === fileName) return sf;
    if (name === CORE_STUB_FILENAME) return stubSf;
    return originalGetSourceFile.call(host, name, ...args);
  };
  host.resolveModuleNames = (moduleNames) => {
    return moduleNames.map(name => {
      if (name === '@espcompose/core') {
        return { resolvedFileName: CORE_STUB_FILENAME, isExternalLibraryImport: true } as ts.ResolvedModule;
      }
      return undefined as unknown as ts.ResolvedModule;
    });
  };
  const program = ts.createProgram([fileName], options, host);
  return { sourceFile: sf, program };
}

// ────────────────────────────────────────────────────────────────────────────
// Tests
// ────────────────────────────────────────────────────────────────────────────

describe('useReactiveMap union injection', () => {
  it('injects $compilerMetadata for Signal-branded arg with string literal union', () => {
    const source = `
      import { useMemo, useReactiveMap } from '@espcompose/core';
      import type { Signal } from '@espcompose/core';

      declare const status: Signal<'primary' | 'secondary' | 'danger'>;
      const result = useReactiveMap(status, (v) => v.toUpperCase());
    `;
    const { sourceFile, program } = createProgram(source);
    const output = transformReactiveExpressions(sourceFile, program);

    // The output should contain the injected $compilerMetadata
    expect(output.sourceText).toContain('unionMembers');
    expect(output.sourceText).toContain('"primary"');
    expect(output.sourceText).toContain('"secondary"');
    expect(output.sourceText).toContain('"danger"');
    expect(output.diagnostics).toHaveLength(0);
  });

  it('does not inject for static (non-Signal) arg', () => {
    const source = `
      import { useReactiveMap } from '@espcompose/core';
      const result = useReactiveMap('primary' as 'primary' | 'secondary', (v) => v);
    `;
    const { sourceFile, program } = createProgram(source);
    const output = transformReactiveExpressions(sourceFile, program);

    // No injection — no unionMembers in output
    expect(output.sourceText).not.toContain('unionMembers');
  });

  it('does not inject when arg already has 3 arguments', () => {
    const source = `
      import { useReactiveMap } from '@espcompose/core';
      import type { Signal } from '@espcompose/core';

      declare const status: Signal<'primary' | 'secondary'>;
      const result = useReactiveMap(status, (v) => v, undefined as never);
    `;
    const { sourceFile, program } = createProgram(source);
    const output = transformReactiveExpressions(sourceFile, program);

    // Should not double-inject
    expect(output.sourceText.match(/unionMembers/g)).toBeNull();
  });

  it('does not inject for non-string-literal union (plain string)', () => {
    const source = `
      import { useReactiveMap } from '@espcompose/core';
      import type { Signal } from '@espcompose/core';

      declare const status: Signal<string>;
      const result = useReactiveMap(status, (v) => v);
    `;
    const { sourceFile, program } = createProgram(source);
    const output = transformReactiveExpressions(sourceFile, program);

    expect(output.sourceText).not.toContain('unionMembers');
  });

  it('handles single-member "union" (single literal)', () => {
    const source = `
      import { useReactiveMap } from '@espcompose/core';
      import type { Signal } from '@espcompose/core';

      declare const status: Signal<'primary'>;
      const result = useReactiveMap(status, (v) => v);
    `;
    const { sourceFile, program } = createProgram(source);
    const output = transformReactiveExpressions(sourceFile, program);

    expect(output.sourceText).toContain('unionMembers');
    expect(output.sourceText).toContain('"primary"');
  });

  it('injects for Reactive<T> (T | IRReactiveNode<T>) with string literal union', () => {
    const source = `
      import { useReactiveMap } from '@espcompose/core';
      import type { Reactive } from '@espcompose/core';

      declare const value: Reactive<'primary' | 'secondary' | 'danger'>;
      const result = useReactiveMap(value, (v) => v.toUpperCase());
    `;
    const { sourceFile, program } = createProgram(source);
    const output = transformReactiveExpressions(sourceFile, program);

    expect(output.sourceText).toContain('unionMembers');
    expect(output.sourceText).toContain('"primary"');
    expect(output.sourceText).toContain('"secondary"');
    expect(output.sourceText).toContain('"danger"');
    expect(output.diagnostics).toHaveLength(0);
  });
});
