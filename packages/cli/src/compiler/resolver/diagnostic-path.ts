import * as path from 'path';
import type { PhaseContext } from '../phases/types';

/**
 * Rewrite a build-dir path back to its original location for human-readable
 * diagnostics:
 *
 *   <buildDir>/app/<rel>             → <projectRoot>/<rel>
 *   <buildDir>/node_modules/<pkg>/x  → <pkg>/x
 *
 * Returns the input unchanged if it doesn't match either layout.
 */
export function formatDiagnosticPath(ctx: PhaseContext, p: string): string {
  if (!ctx.buildDir) return p;
  const buildDir = path.resolve(ctx.buildDir);
  const abs = path.resolve(p);
  if (!abs.startsWith(buildDir + path.sep)) return p;

  const rel = path.relative(buildDir, abs);
  if (rel.startsWith('app' + path.sep)) {
    const inner = rel.slice('app'.length + 1);
    const root = ctx.registry?.projectRoot ?? ctx.projectDir ?? ctx.sourceDir;
    return path.join(root, inner);
  }
  if (rel.startsWith('node_modules' + path.sep)) {
    return rel.slice('node_modules'.length + 1);
  }
  return p;
}
