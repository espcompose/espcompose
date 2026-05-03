import { describe, it, expect } from 'vitest';
import ts from 'typescript';
import { transformAssetPaths } from './asset-path-transformer';

function createSourceFile(fileName: string, content: string): ts.SourceFile {
  return ts.createSourceFile(fileName, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
}

describe('transformAssetPaths', () => {
  const sourceDir = '/project/src';

  it('rewrites useImage file path relative to sourceDir', () => {
    const sf = createSourceFile(
      '/project/src/ui/MainScreen.tsx',
      `const bg = useImage({ file: '../assets/background.jpg', type: 'RGB565' });`,
    );
    const result = transformAssetPaths(sf, sourceDir);
    expect(result).toContain("'assets/background.jpg'");
    expect(result).not.toContain("'../assets/background.jpg'");
  });

  it('rewrites useFont file path relative to sourceDir', () => {
    const sf = createSourceFile(
      '/project/src/ui/components/Header.tsx',
      `const font = useFont({ file: '../../fonts/Roboto.ttf', size: 20 });`,
    );
    const result = transformAssetPaths(sf, sourceDir);
    expect(result).toContain("'fonts/Roboto.ttf'");
  });

  it('does not rewrite paths already relative to sourceDir', () => {
    const sf = createSourceFile(
      '/project/src/index.tsx',
      `const bg = useImage({ file: './assets/background.jpg', type: 'RGB565' });`,
    );
    const result = transformAssetPaths(sf, sourceDir);
    // path.relative normalizes ./assets/... to assets/... — both resolve identically
    expect(result).toContain("'assets/background.jpg'");
  });

  it('skips absolute paths', () => {
    const sf = createSourceFile(
      '/project/src/ui/Main.tsx',
      `const bg = useImage({ file: '/absolute/path/bg.jpg', type: 'RGB565' });`,
    );
    const result = transformAssetPaths(sf, sourceDir);
    expect(result).toContain("'/absolute/path/bg.jpg'");
  });

  it('skips gfonts:// URLs', () => {
    const sf = createSourceFile(
      '/project/src/ui/Main.tsx',
      `const font = useFont({ file: 'gfonts://Roboto', size: 20 });`,
    );
    const result = transformAssetPaths(sf, sourceDir);
    expect(result).toContain("'gfonts://Roboto'");
  });

  it('skips http URLs', () => {
    const sf = createSourceFile(
      '/project/src/ui/Main.tsx',
      `const bg = useImage({ file: 'https://example.com/bg.jpg', type: 'RGB565' });`,
    );
    const result = transformAssetPaths(sf, sourceDir);
    expect(result).toContain("'https://example.com/bg.jpg'");
  });

  it('preserves double-quote style', () => {
    const sf = createSourceFile(
      '/project/src/ui/Main.tsx',
      `const bg = useImage({ file: "../assets/bg.jpg", type: "RGB565" });`,
    );
    const result = transformAssetPaths(sf, sourceDir);
    expect(result).toContain('"assets/bg.jpg"');
  });

  it('handles multiple useImage calls', () => {
    const sf = createSourceFile(
      '/project/src/ui/Main.tsx',
      [
        `const bg = useImage({ file: '../assets/bg.jpg', type: 'RGB565' });`,
        `const logo = useImage({ file: '../assets/logo.png', type: 'RGB565' });`,
      ].join('\n'),
    );
    const result = transformAssetPaths(sf, sourceDir);
    expect(result).toContain("'assets/bg.jpg'");
    expect(result).toContain("'assets/logo.png'");
  });

  it('returns original text when no changes needed', () => {
    const content = `const x = 42;`;
    const sf = createSourceFile('/project/src/index.tsx', content);
    const result = transformAssetPaths(sf, sourceDir);
    expect(result).toBe(content);
  });
});
