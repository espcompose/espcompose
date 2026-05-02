import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { initProject } from './init';

describe('initProject', () => {
  let tmpDir: string;
  let origCwd: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'espcompose-init-'));
    origCwd = process.cwd();
    process.chdir(tmpDir);
  });

  afterEach(() => {
    process.chdir(origCwd);
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  describe('device project', () => {
    it('scaffolds expected files with correct content', () => {
      initProject('my-device', { board: 'esp32-s3-devkitc-1' });

      const root = path.join(tmpDir, 'my-device');

      // All expected files exist
      expect(fs.existsSync(path.join(root, 'package.json'))).toBe(true);
      expect(fs.existsSync(path.join(root, 'tsconfig.json'))).toBe(true);
      expect(fs.existsSync(path.join(root, 'eslint.config.mjs'))).toBe(true);
      expect(fs.existsSync(path.join(root, '.gitignore'))).toBe(true);
      expect(fs.existsSync(path.join(root, 'index.tsx'))).toBe(true);

      // No .hbs or dot. files leaked through
      expect(fs.existsSync(path.join(root, 'dot.gitignore'))).toBe(false);
      expect(fs.existsSync(path.join(root, 'package.json.hbs'))).toBe(false);

      // package.json has correct name substitution
      const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
      expect(pkg.name).toBe('my-device');
      expect(pkg.private).toBe(true);
      expect(pkg.main).toBe('index.tsx');
      expect(pkg.dependencies['@espcompose/core']).toBe('latest');

      // index.tsx has correct token replacements
      const indexTsx = fs.readFileSync(path.join(root, 'index.tsx'), 'utf8');
      expect(indexTsx).toContain('name="my-device"');
      expect(indexTsx).toContain('board="esp32-s3-devkitc-1"');
      expect(indexTsx).toContain("framework={{ type: 'esp-idf' }}");

      // tsconfig.json is valid JSON
      const tsconfig = JSON.parse(fs.readFileSync(path.join(root, 'tsconfig.json'), 'utf8'));
      expect(tsconfig.extends).toBe('@espcompose/core/tsconfig.sdk.json');

      // .gitignore contains expected patterns
      const gitignore = fs.readFileSync(path.join(root, '.gitignore'), 'utf8');
      expect(gitignore).toContain('node_modules/');
      expect(gitignore).toContain('.espcompose/');
    });

    it('uses default board when none specified', () => {
      initProject('default-board');

      const indexTsx = fs.readFileSync(
        path.join(tmpDir, 'default-board', 'index.tsx'),
        'utf8',
      );
      expect(indexTsx).toContain('board="esp32dev"');
    });

    it('throws when target directory is not empty', () => {
      const dir = path.join(tmpDir, 'existing');
      fs.mkdirSync(dir);
      fs.writeFileSync(path.join(dir, 'file.txt'), 'content');

      expect(() => initProject('existing')).toThrow(
        'already exists and is not empty',
      );
    });
  });
});
