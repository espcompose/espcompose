import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { execSync } from 'child_process';
import type { Command } from 'commander';
import pc from 'picocolors';
import { withErrorHandler } from '../utils';

const ESPCOMPOSE_SCOPE = '@espcompose/';

type PackageManager = 'npm' | 'yarn' | 'pnpm';

interface DepEntry {
  /** The raw semver range from package.json, e.g. "^1.2.3" */
  range: string;
  /** Which section of package.json this was found in */
  section: 'dependencies' | 'devDependencies' | 'peerDependencies';
}

interface UpgradeCandidate {
  name: string;
  currentRange: string;
  section: string;
  latestVersion: string;
  /** True when the latest version satisfies the existing semver range */
  satisfiesCurrent: boolean;
}

// ─── Semver helpers ──────────────────────────────────────────────────────────

/**
 * Extract the prefix (range intent) and bare version from a semver range.
 * Examples:
 *   "^1.2.3"  → { prefix: "^", version: "1.2.3" }
 *   "~0.4.1"  → { prefix: "~", version: "0.4.1" }
 *   ">=2.0.0" → { prefix: ">=", version: "2.0.0" }
 *   "1.0.0"   → { prefix: "", version: "1.0.0" }
 */
export function parseRange(range: string): { prefix: string; version: string } {
  const match = range.match(/^(>=|<=|>|<|\^|~|=)?(.+)$/);
  if (!match) return { prefix: '', version: range };
  return { prefix: match[1] ?? '', version: match[2] };
}

/**
 * Parse a semver version string into its components.
 */
function parseSemver(version: string): { major: number; minor: number; patch: number; rest: string } {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)(.*)$/);
  if (!match) return { major: 0, minor: 0, patch: 0, rest: '' };
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    rest: match[4] ?? '',
  };
}

/**
 * Check if a concrete version satisfies a simple semver range.
 * Supports ^, ~, >=, >, <=, <, =, and exact match.
 */
export function satisfies(version: string, range: string): boolean {
  const { prefix, version: rangeVer } = parseRange(range);
  const v = parseSemver(version);
  const r = parseSemver(rangeVer);

  // Pre-release versions never satisfy unless explicitly matched
  if (v.rest && v.rest !== r.rest) return false;

  switch (prefix) {
    case '^':
      // ^major.minor.patch: allows changes that do not modify the left-most non-zero digit
      if (r.major !== 0) {
        return v.major === r.major && (v.minor > r.minor || (v.minor === r.minor && v.patch >= r.patch));
      }
      if (r.minor !== 0) {
        return v.major === r.major && v.minor === r.minor && v.patch >= r.patch;
      }
      return v.major === r.major && v.minor === r.minor && v.patch === r.patch;
    case '~':
      // ~major.minor.patch: allows patch-level changes
      return v.major === r.major && v.minor === r.minor && v.patch >= r.patch;
    case '>=':
      return compareSemver(v, r) >= 0;
    case '>':
      return compareSemver(v, r) > 0;
    case '<=':
      return compareSemver(v, r) <= 0;
    case '<':
      return compareSemver(v, r) < 0;
    case '=':
    case '':
      return v.major === r.major && v.minor === r.minor && v.patch === r.patch;
    default:
      return false;
  }
}

function compareSemver(
  a: { major: number; minor: number; patch: number },
  b: { major: number; minor: number; patch: number },
): number {
  if (a.major !== b.major) return a.major - b.major;
  if (a.minor !== b.minor) return a.minor - b.minor;
  return a.patch - b.patch;
}

/**
 * Re-apply the original range intent to a new version.
 * E.g. if the user had "^1.2.3" and we're upgrading to "2.0.0",
 * the result is "^2.0.0".
 */
export function applyRangeIntent(originalRange: string, newVersion: string): string {
  const { prefix } = parseRange(originalRange);
  return `${prefix}${newVersion}`;
}

// ─── Package manager detection ───────────────────────────────────────────────

export function detectPackageManager(projectDir: string): PackageManager {
  if (fs.existsSync(path.join(projectDir, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(projectDir, 'yarn.lock'))) return 'yarn';
  return 'npm';
}

function getInstallCommand(pm: PackageManager): string {
  return pm === 'yarn' ? 'yarn install' : `${pm} install`;
}

// ─── Registry queries ────────────────────────────────────────────────────────

/**
 * Fetch the latest published version of a package from the npm registry.
 */
export function fetchLatestVersion(packageName: string): string | null {
  try {
    const result = execSync(`npm view ${packageName} version`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    return result.trim();
  } catch {
    return null;
  }
}

// ─── package.json scanning ───────────────────────────────────────────────────

export function findEspcomposePackages(projectDir: string): Map<string, DepEntry> {
  const pkgPath = path.join(projectDir, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    throw new Error(`No package.json found in ${projectDir}`);
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const result = new Map<string, DepEntry>();
  const sections = ['dependencies', 'devDependencies', 'peerDependencies'] as const;

  for (const section of sections) {
    const deps = pkg[section];
    if (!deps || typeof deps !== 'object') continue;
    for (const [name, range] of Object.entries(deps)) {
      if (name.startsWith(ESPCOMPOSE_SCOPE) && typeof range === 'string') {
        result.set(name, { range, section });
      }
    }
  }

  return result;
}

// ─── Core logic ──────────────────────────────────────────────────────────────

export function buildUpgradeCandidates(packages: Map<string, DepEntry>): UpgradeCandidate[] {
  const candidates: UpgradeCandidate[] = [];

  for (const [name, { range, section }] of packages) {
    const latest = fetchLatestVersion(name);
    if (!latest) {
      console.log(pc.yellow(`  ⚠ Could not fetch latest version for ${name}, skipping`));
      continue;
    }

    const sat = satisfies(latest, range);
    if (sat) {
      // Latest already satisfies the current range — no manual bump needed,
      // but running install will pull it in.
      candidates.push({ name, currentRange: range, section, latestVersion: latest, satisfiesCurrent: true });
    } else {
      // A newer version exists outside the current semver range
      candidates.push({ name, currentRange: range, section, latestVersion: latest, satisfiesCurrent: false });
    }
  }

  return candidates;
}

/**
 * Prompt the user with a yes/no question. Returns true for 'y'.
 */
export function promptYesNo(question: string): Promise<boolean> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase() === 'y');
    });
  });
}

/**
 * Update the package.json at `projectDir` with new ranges for the given packages.
 */
export function updatePackageJson(
  projectDir: string,
  updates: Array<{ name: string; section: string; newRange: string }>,
): void {
  const pkgPath = path.join(projectDir, 'package.json');
  const raw = fs.readFileSync(pkgPath, 'utf8');
  const pkg = JSON.parse(raw);

  for (const { name, section, newRange } of updates) {
    if (pkg[section]?.[name]) {
      pkg[section][name] = newRange;
    }
  }

  // Preserve indentation style by detecting from the original file
  const indent = raw.match(/^(\s+)"/m)?.[1] ?? '  ';
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, indent) + '\n');
}

function runInstall(pm: PackageManager, projectDir: string): void {
  const cmd = getInstallCommand(pm);
  console.log(pc.blue(`\nRunning ${cmd}…`));
  execSync(cmd, { cwd: projectDir, stdio: 'inherit' });
}

// ─── Main upgrade flow ──────────────────────────────────────────────────────

export async function runUpgrade(projectDir: string, opts: { packageManager?: string }): Promise<void> {
  const resolvedDir = path.resolve(projectDir);
  const pm: PackageManager = (opts.packageManager as PackageManager) ?? detectPackageManager(resolvedDir);

  console.log(`Package manager: ${pc.cyan(pm)}`);
  console.log(`Scanning for ${ESPCOMPOSE_SCOPE}* packages…\n`);

  const packages = findEspcomposePackages(resolvedDir);

  if (packages.size === 0) {
    console.log('No @espcompose packages found in package.json.');
    return;
  }

  const candidates = buildUpgradeCandidates(packages);

  if (candidates.length === 0) {
    console.log('All @espcompose packages are already up to date.');
    return;
  }

  // Separate into auto-upgradable and those needing confirmation
  const autoUpgrades = candidates.filter((c) => c.satisfiesCurrent);
  const manualUpgrades = candidates.filter((c) => !c.satisfiesCurrent);
  const pendingUpdates: Array<{ name: string; section: string; newRange: string }> = [];

  if (autoUpgrades.length > 0) {
    console.log(pc.green('Packages upgradable within current semver range:'));
    for (const c of autoUpgrades) {
      console.log(`  ${c.name}: ${c.currentRange} → ${c.latestVersion}`);
    }
    console.log();
  }

  if (manualUpgrades.length > 0) {
    console.log(pc.yellow('Packages with newer versions outside current semver range:\n'));
    for (const c of manualUpgrades) {
      const newRange = applyRangeIntent(c.currentRange, c.latestVersion);
      console.log(`  ${c.name}: ${c.currentRange} → ${pc.bold(c.latestVersion)} (would change to ${pc.cyan(newRange)})`);
      pendingUpdates.push({ name: c.name, section: c.section, newRange });
    }
    console.log();
  }

  const hasWork = autoUpgrades.length > 0 || pendingUpdates.length > 0;
  if (!hasWork) {
    console.log('Nothing to upgrade.');
    return;
  }

  // Summarise what will happen and ask for confirmation
  console.log(pc.bold('Summary:'));
  if (autoUpgrades.length > 0) {
    console.log(`  ${autoUpgrades.length} package(s) will be updated within their current semver range`);
  }
  if (pendingUpdates.length > 0) {
    console.log(`  ${pendingUpdates.length} package(s) will have their semver range updated in package.json`);
  }
  console.log();

  const proceed = await promptYesNo('Proceed with upgrade? [y/N] ');
  if (!proceed) {
    console.log('Upgrade cancelled.');
    return;
  }

  // Write updated ranges to package.json if any manual upgrades were accepted
  if (pendingUpdates.length > 0) {
    updatePackageJson(resolvedDir, pendingUpdates);
    console.log(pc.green(`Updated package.json with ${pendingUpdates.length} new range(s).`));
  }

  // Run install to pull updates (both auto and manual)
  runInstall(pm, resolvedDir);
  console.log(pc.green('\n✓ Upgrade complete.'));
}

// ─── Command registration ────────────────────────────────────────────────────

export function registerUpgradeCommand(program: Command) {
  program
    .command('upgrade [projectDir]')
    .description(
      'Upgrade @espcompose packages to their latest versions.\n' +
      'Detects your package manager (npm, yarn, or pnpm) and checks the npm\n' +
      'registry for newer versions. If a newer version falls outside your\n' +
      'current semver range, you will be prompted before upgrading.',
    )
    .option('--pm <manager>', 'Override package manager detection (npm, yarn, pnpm)')
    .action(withErrorHandler('Upgrade', async (projectDir?: string, opts?: { pm?: string }) => {
      await runUpgrade(projectDir ?? '.', { packageManager: opts?.pm });
    }));
}
