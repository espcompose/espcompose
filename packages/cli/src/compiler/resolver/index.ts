/**
 * Source-mode library resolver.
 *
 * Walks the project's transitive dependencies and identifies which packages
 * declare themselves as ESPCompose source-mode libraries via the `espcompose`
 * export condition in their `package.json#exports` field.
 *
 * Example library shape:
 *
 *   {
 *     "exports": {
 *       ".":         { "espcompose": "./src/index.ts", "types": "./dist/index.d.ts" },
 *       "./hooks":   { "espcompose": "./src/hooks/index.ts", "types": "./dist/hooks/index.d.ts" }
 *     }
 *   }
 *
 * The `@espcompose/core` package is hard-coded as `runtime-external` regardless
 * of any metadata it might carry — it is the externalized SDK runtime.
 */

import * as fs from 'fs';
import * as path from 'path';

/** Module classification — drives transform inclusion and diagnostic filtering. */
export type ModuleClass =
  | 'app-source'
  | 'espcompose-source-library'
  | 'runtime-external';

/** A resolved source-mode library entry. */
export interface SourceLibrary {
  /** Package name as declared in `package.json#name`. */
  packageName: string;
  /** Realpath of the package root (where `package.json` lives). */
  rootDir: string;
  /**
   * Map of subpath specifier (e.g. `.`, `./hooks`) to the absolute path
   * of the `.ts(x)` file the `espcompose` condition resolves to.
   */
  entries: Map<string, string>;
}

/** Always classified as runtime-external regardless of metadata. */
const HARD_EXTERNAL = new Set<string>(['@espcompose/core']);

/**
 * Registry of all source-mode libraries reachable from the project root.
 * Built once at the start of the pipeline and threaded through `PhaseContext`.
 */
export class SourceLibraryRegistry {
  /** Realpath of the project root. */
  readonly projectRoot: string;
  /** Package name → SourceLibrary record. */
  readonly libraries: Map<string, SourceLibrary>;
  /** Realpath roots indexed for fast `matchPath` lookups. */
  private readonly rootIndex: Array<{ root: string; lib: SourceLibrary }>;

  constructor(projectRoot: string, libraries: Map<string, SourceLibrary>) {
    this.projectRoot = projectRoot;
    this.libraries = libraries;
    this.rootIndex = [];
    for (const lib of libraries.values()) {
      this.rootIndex.push({ root: lib.rootDir + path.sep, lib });
    }
  }

  /**
   * Classify a path. Uses realpath on both sides to handle pnpm symlinks
   * and workspace packages correctly.
   */
  classifyPath(absPath: string): ModuleClass {
    const real = safeRealpath(absPath);
    const realWithSep = real.endsWith(path.sep) ? real : real + path.sep;

    if (realWithSep.startsWith(this.projectRoot + path.sep)) {
      // Files under the project root. Exclude node_modules within the project.
      const rel = path.relative(this.projectRoot, real);
      if (!rel.startsWith('node_modules' + path.sep) && rel !== 'node_modules') {
        return 'app-source';
      }
    }

    for (const { root, lib } of this.rootIndex) {
      if (realWithSep.startsWith(root)) {
        // Exclude node_modules within the library itself.
        const rel = path.relative(lib.rootDir, real);
        if (!rel.startsWith('node_modules' + path.sep) && rel !== 'node_modules') {
          return 'espcompose-source-library';
        }
      }
    }

    return 'runtime-external';
  }

  /** Find the source-library that contains `absPath`, if any. */
  matchPath(absPath: string): SourceLibrary | undefined {
    const real = safeRealpath(absPath);
    const realWithSep = real.endsWith(path.sep) ? real : real + path.sep;
    for (const { root, lib } of this.rootIndex) {
      if (realWithSep.startsWith(root)) return lib;
    }
    return undefined;
  }

  /** Match a bare specifier (`pkg` or `pkg/subpath`) against registered libraries. */
  matchSpecifier(specifier: string): SourceLibrary | undefined {
    if (specifier.startsWith('.') || specifier.startsWith('/')) return undefined;
    // Handle scoped packages: @scope/name[/subpath]
    let pkgName: string;
    if (specifier.startsWith('@')) {
      const parts = specifier.split('/');
      if (parts.length < 2) return undefined;
      pkgName = `${parts[0]}/${parts[1]}`;
    } else {
      pkgName = specifier.split('/')[0];
    }
    return this.libraries.get(pkgName);
  }
}

/**
 * Build the registry by walking the project's `package.json` dependencies
 * (transitively) and identifying which declare an `espcompose` export
 * condition.
 */
export function buildSourceLibraryRegistry(projectDir: string): SourceLibraryRegistry {
  const projectRoot = safeRealpath(projectDir);
  const libraries = new Map<string, SourceLibrary>();
  const visited = new Set<string>();

  function visit(pkgDir: string): void {
    const real = safeRealpath(pkgDir);
    if (visited.has(real)) return;
    visited.add(real);

    const pkgJsonPath = path.join(real, 'package.json');
    if (!fs.existsSync(pkgJsonPath)) return;

    let pkg: PackageJson;
    try {
      pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8')) as PackageJson;
    } catch {
      return;
    }

    // Self: if this is a library (not the project root) and declares the
    // espcompose condition, register it.
    if (real !== projectRoot && pkg.name && !HARD_EXTERNAL.has(pkg.name)) {
      const entries = collectEspcomposeEntries(pkg, real);
      if (entries.size > 0) {
        libraries.set(pkg.name, { packageName: pkg.name, rootDir: real, entries });
      }
    }

    // Walk dependencies.
    const deps = collectDeps(pkg);
    for (const depName of deps) {
      const depDir = resolvePackageDir(depName, real);
      if (depDir) visit(depDir);
    }
  }

  visit(projectRoot);
  return new SourceLibraryRegistry(projectRoot, libraries);
}

// ────────────────────────────────────────────────────────────────────────────
// Internals
// ────────────────────────────────────────────────────────────────────────────

interface PackageJson {
  name?: string;
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
  exports?: ExportsField;
}

type ExportsField = string | ConditionsObject | { [subpath: string]: string | ConditionsObject };
type ConditionsObject = { [condition: string]: string | ConditionsObject | null };

function collectDeps(pkg: PackageJson): string[] {
  const set = new Set<string>();
  for (const k of Object.keys(pkg.dependencies ?? {})) set.add(k);
  for (const k of Object.keys(pkg.peerDependencies ?? {})) set.add(k);
  for (const k of Object.keys(pkg.optionalDependencies ?? {})) set.add(k);
  return [...set];
}

/**
 * Resolve a dependency package directory by walking up the `node_modules`
 * tree from `fromDir`. Returns `undefined` if not found.
 */
function resolvePackageDir(name: string, fromDir: string): string | undefined {
  let dir = fromDir;
  // Stop at filesystem root.
  for (;;) {
    const candidate = path.join(dir, 'node_modules', name);
    if (fs.existsSync(path.join(candidate, 'package.json'))) {
      return candidate;
    }
    const parent = path.dirname(dir);
    if (parent === dir) return undefined;
    dir = parent;
  }
}

/**
 * Walk a package's `exports` field and collect every subpath whose
 * `espcompose` condition resolves to a file. Returns a map of
 * subpath specifier → absolute file path.
 */
function collectEspcomposeEntries(pkg: PackageJson, pkgDir: string): Map<string, string> {
  const out = new Map<string, string>();
  const exports = pkg.exports;
  if (!exports) return out;

  // Normalize: a string or a conditions-object at the top level is shorthand for `.`
  let subpaths: Record<string, string | ConditionsObject>;
  if (typeof exports === 'string') {
    subpaths = { '.': exports };
  } else if (isConditionsObject(exports)) {
    subpaths = { '.': exports };
  } else {
    subpaths = exports as Record<string, string | ConditionsObject>;
  }

  for (const [subpath, value] of Object.entries(subpaths)) {
    const resolved = resolveEspcomposeCondition(value);
    if (!resolved) continue;
    const abs = path.resolve(pkgDir, resolved);
    if (fs.existsSync(abs)) {
      out.set(subpath, abs);
    }
  }
  return out;
}

/** A conditions object has condition-name keys (no leading "."). */
function isConditionsObject(v: ExportsField): v is ConditionsObject {
  if (typeof v !== 'object' || v === null) return false;
  const keys = Object.keys(v);
  return keys.length > 0 && keys.every((k) => !k.startsWith('.'));
}

/**
 * Walk a conditions object looking for the `espcompose` condition. Returns
 * the resolved relative path, or `undefined` if not found. Nested conditions
 * objects are recursively searched.
 */
function resolveEspcomposeCondition(value: string | ConditionsObject): string | undefined {
  if (typeof value === 'string') return undefined;
  if (value === null) return undefined;
  // Direct hit.
  if (typeof value.espcompose === 'string') return value.espcompose;
  if (value.espcompose && typeof value.espcompose === 'object') {
    return resolveEspcomposeCondition(value.espcompose);
  }
  // Some packages nest under `default` or similar — search nested objects.
  for (const v of Object.values(value)) {
    if (v && typeof v === 'object') {
      const nested = resolveEspcomposeCondition(v);
      if (nested) return nested;
    }
  }
  return undefined;
}

function safeRealpath(p: string): string {
  try {
    return fs.realpathSync(p);
  } catch {
    return path.resolve(p);
  }
}
