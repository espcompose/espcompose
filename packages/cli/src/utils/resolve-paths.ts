import * as path from 'path';

/** Resolve the project directory and YAML output path. */
export function resolvePaths(projectDir?: string) {
  const resolvedDir = path.resolve(projectDir ?? '.');
  const yamlPath = path.join(resolvedDir, '.espcompose', 'esphome.yaml');
  return { resolvedDir, yamlPath };
}
