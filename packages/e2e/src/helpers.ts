import path from 'path';
import fs from 'fs';
import { build, esphomeConfig } from '@esphome/compose-cli';
import { expect } from 'vitest';

/**
 * Runs the full build pipeline against a project directory and asserts
 * the generated YAML matches the stored snapshot.
 *
 * The build writes output to `<projectDir>/.espcompose/esphome.yaml`.
 * The snapshot stores the raw YAML string so that any structural change
 * to the generated configuration is immediately visible in diffs.
 *
 * @param projectsDir  Absolute path to the projects directory.
 * @param projectName  Name of the subdirectory within projectsDir to build.
 */
export async function createProjectTest(
  projectsDir: string,
  projectName: string,
): Promise<string> {
  const projectPath = path.resolve(projectsDir, projectName);

  // Run the full compiler pipeline — output lands at .espcompose/esphome.yaml
  await build(projectPath);

  const yamlPath = path.join(projectPath, '.espcompose', 'esphome.yaml');
  if (!fs.existsSync(yamlPath)) {
    throw new Error(
      `Build succeeded but expected output not found: ${yamlPath}`,
    );
  }

  const yamlContent = fs.readFileSync(yamlPath, 'utf8');

  // Normalise random ref tokens (r_<random>) to deterministic sequential IDs
  // so that snapshots are stable across runs.
  let counter = 0;
  const tokenMap = new Map<string, string>();
  const stableYaml = yamlContent.replace(/r_[a-z0-9]{8,11}/g, (tok) => {
    let stable = tokenMap.get(tok);
    if (!stable) {
      stable = `r_ref${counter++}`;
      tokenMap.set(tok, stable);
    }
    return stable;
  });

  // Snapshot the raw YAML — any change to the generated config will surface
  // as a test failure requiring an explicit snapshot update.
  expect(stableYaml).toMatchSnapshot();

  // Validate the generated YAML with the real ESPHome config validator.
  await esphomeConfig(yamlPath);

  return yamlContent;
}
