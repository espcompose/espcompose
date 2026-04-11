import { describe, it, expect } from 'vitest';
import {
  parseRange,
  satisfies,
  applyRangeIntent,
  detectPackageManager,
  findEspcomposePackages,
  updatePackageJson,
} from './upgrade';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// ─── parseRange ──────────────────────────────────────────────────────────────

describe('parseRange', () => {
  it('parses caret ranges', () => {
    expect(parseRange('^1.2.3')).toEqual({ prefix: '^', version: '1.2.3' });
  });

  it('parses tilde ranges', () => {
    expect(parseRange('~0.4.1')).toEqual({ prefix: '~', version: '0.4.1' });
  });

  it('parses >= ranges', () => {
    expect(parseRange('>=2.0.0')).toEqual({ prefix: '>=', version: '2.0.0' });
  });

  it('parses exact versions', () => {
    expect(parseRange('1.0.0')).toEqual({ prefix: '', version: '1.0.0' });
  });

  it('parses = prefix', () => {
    expect(parseRange('=3.1.0')).toEqual({ prefix: '=', version: '3.1.0' });
  });

  it('parses > prefix', () => {
    expect(parseRange('>1.0.0')).toEqual({ prefix: '>', version: '1.0.0' });
  });
});

// ─── satisfies ───────────────────────────────────────────────────────────────

describe('satisfies', () => {
  describe('caret (^)', () => {
    it('allows minor + patch bumps for major > 0', () => {
      expect(satisfies('1.3.0', '^1.2.3')).toBe(true);
      expect(satisfies('1.9.9', '^1.2.3')).toBe(true);
    });

    it('rejects major bumps', () => {
      expect(satisfies('2.0.0', '^1.2.3')).toBe(false);
    });

    it('rejects lower versions', () => {
      expect(satisfies('1.2.2', '^1.2.3')).toBe(false);
      expect(satisfies('1.1.9', '^1.2.3')).toBe(false);
    });

    it('handles ^0.x.y (locks minor)', () => {
      expect(satisfies('0.4.5', '^0.4.1')).toBe(true);
      expect(satisfies('0.5.0', '^0.4.1')).toBe(false);
    });

    it('handles ^0.0.x (locks patch)', () => {
      expect(satisfies('0.0.3', '^0.0.3')).toBe(true);
      expect(satisfies('0.0.4', '^0.0.3')).toBe(false);
    });
  });

  describe('tilde (~)', () => {
    it('allows patch bumps', () => {
      expect(satisfies('1.2.9', '~1.2.3')).toBe(true);
    });

    it('rejects minor bumps', () => {
      expect(satisfies('1.3.0', '~1.2.3')).toBe(false);
    });
  });

  describe('exact', () => {
    it('matches only exact version', () => {
      expect(satisfies('1.2.3', '1.2.3')).toBe(true);
      expect(satisfies('1.2.4', '1.2.3')).toBe(false);
    });
  });

  describe('comparison operators', () => {
    it('>= works', () => {
      expect(satisfies('2.0.0', '>=1.0.0')).toBe(true);
      expect(satisfies('1.0.0', '>=1.0.0')).toBe(true);
      expect(satisfies('0.9.9', '>=1.0.0')).toBe(false);
    });

    it('> works', () => {
      expect(satisfies('1.0.1', '>1.0.0')).toBe(true);
      expect(satisfies('1.0.0', '>1.0.0')).toBe(false);
    });

    it('< works', () => {
      expect(satisfies('0.9.9', '<1.0.0')).toBe(true);
      expect(satisfies('1.0.0', '<1.0.0')).toBe(false);
    });
  });
});

// ─── applyRangeIntent ────────────────────────────────────────────────────────

describe('applyRangeIntent', () => {
  it('preserves caret prefix', () => {
    expect(applyRangeIntent('^1.2.3', '2.0.0')).toBe('^2.0.0');
  });

  it('preserves tilde prefix', () => {
    expect(applyRangeIntent('~1.2.3', '1.3.0')).toBe('~1.3.0');
  });

  it('preserves >= prefix', () => {
    expect(applyRangeIntent('>=1.0.0', '2.0.0')).toBe('>=2.0.0');
  });

  it('preserves exact (no prefix)', () => {
    expect(applyRangeIntent('1.2.3', '2.0.0')).toBe('2.0.0');
  });
});

// ─── detectPackageManager ────────────────────────────────────────────────────

describe('detectPackageManager', () => {
  let tmpDir: string;

  function makeTmp() {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'espcompose-test-'));
    return tmpDir;
  }

  function cleanup() {
    if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true });
  }

  it('detects pnpm', () => {
    const dir = makeTmp();
    fs.writeFileSync(path.join(dir, 'pnpm-lock.yaml'), '');
    try {
      expect(detectPackageManager(dir)).toBe('pnpm');
    } finally {
      cleanup();
    }
  });

  it('detects yarn', () => {
    const dir = makeTmp();
    fs.writeFileSync(path.join(dir, 'yarn.lock'), '');
    try {
      expect(detectPackageManager(dir)).toBe('yarn');
    } finally {
      cleanup();
    }
  });

  it('defaults to npm', () => {
    const dir = makeTmp();
    try {
      expect(detectPackageManager(dir)).toBe('npm');
    } finally {
      cleanup();
    }
  });

  it('prefers pnpm over yarn when both exist', () => {
    const dir = makeTmp();
    fs.writeFileSync(path.join(dir, 'pnpm-lock.yaml'), '');
    fs.writeFileSync(path.join(dir, 'yarn.lock'), '');
    try {
      expect(detectPackageManager(dir)).toBe('pnpm');
    } finally {
      cleanup();
    }
  });
});

// ─── findEspcomposePackages ──────────────────────────────────────────────────

describe('findEspcomposePackages', () => {
  let tmpDir: string;

  function makeTmp() {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'espcompose-test-'));
    return tmpDir;
  }

  function cleanup() {
    if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true });
  }

  it('finds packages across all dependency sections', () => {
    const dir = makeTmp();
    fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({
      dependencies: { '@espcompose/core': '^1.0.0', 'lodash': '^4.0.0' },
      devDependencies: { '@espcompose/cli': '~0.2.0' },
      peerDependencies: { '@espcompose/ui': '>=1.0.0' },
    }));
    try {
      const result = findEspcomposePackages(dir);
      expect(result.size).toBe(3);
      expect(result.get('@espcompose/core')).toEqual({ range: '^1.0.0', section: 'dependencies' });
      expect(result.get('@espcompose/cli')).toEqual({ range: '~0.2.0', section: 'devDependencies' });
      expect(result.get('@espcompose/ui')).toEqual({ range: '>=1.0.0', section: 'peerDependencies' });
    } finally {
      cleanup();
    }
  });

  it('returns empty map when no espcompose packages exist', () => {
    const dir = makeTmp();
    fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({
      dependencies: { 'lodash': '^4.0.0' },
    }));
    try {
      expect(findEspcomposePackages(dir).size).toBe(0);
    } finally {
      cleanup();
    }
  });

  it('throws when no package.json exists', () => {
    const dir = makeTmp();
    try {
      expect(() => findEspcomposePackages(dir)).toThrow(/No package.json found/);
    } finally {
      cleanup();
    }
  });
});

// ─── updatePackageJson ───────────────────────────────────────────────────────

describe('updatePackageJson', () => {
  let tmpDir: string;

  function makeTmp() {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'espcompose-test-'));
    return tmpDir;
  }

  function cleanup() {
    if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true });
  }

  it('updates ranges in the correct sections', () => {
    const dir = makeTmp();
    const original = {
      dependencies: { '@espcompose/core': '^1.0.0' },
      devDependencies: { '@espcompose/cli': '~0.2.0' },
    };
    fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify(original, null, 2) + '\n');

    try {
      updatePackageJson(dir, [
        { name: '@espcompose/core', section: 'dependencies', newRange: '^2.0.0' },
        { name: '@espcompose/cli', section: 'devDependencies', newRange: '~0.3.0' },
      ]);

      const updated = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
      expect(updated.dependencies['@espcompose/core']).toBe('^2.0.0');
      expect(updated.devDependencies['@espcompose/cli']).toBe('~0.3.0');
    } finally {
      cleanup();
    }
  });

  it('preserves other dependencies', () => {
    const dir = makeTmp();
    const original = {
      dependencies: { '@espcompose/core': '^1.0.0', 'lodash': '^4.0.0' },
    };
    fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify(original, null, 2) + '\n');

    try {
      updatePackageJson(dir, [
        { name: '@espcompose/core', section: 'dependencies', newRange: '^2.0.0' },
      ]);

      const updated = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
      expect(updated.dependencies['lodash']).toBe('^4.0.0');
    } finally {
      cleanup();
    }
  });
});
