import path from 'path';
import fs from 'fs';
import { build } from '@espcompose/cli';
import { createEsphomeTarget, esphomeConfig } from '@espcompose/esphome-target';
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
  await build(projectPath, createEsphomeTarget());

  const yamlPath = path.join(projectPath, '.espcompose', 'esphome.yaml');
  if (!fs.existsSync(yamlPath)) {
    throw new Error(
      `Build succeeded but expected output not found: ${yamlPath}`,
    );
  }

  const yamlContent = fs.readFileSync(yamlPath, 'utf8');

  // Normalise random ref tokens (r_<random>) and reactive widget IDs
  // (rw_<random>) to deterministic sequential IDs so that snapshots are
  // stable across runs.
  // Use lookaround assertions instead of \b so that tokens embedded in C++
  // identifiers (e.g. sig_r_<random>_subs) are also normalised.
  let counter = 0;
  const tokenMap = new Map<string, string>();
  const stabilise = (text: string) =>
    text.replace(/(?<![a-z0-9])(?:r_|rw_|script_|ec_)[a-z0-9]{8,11}(?![a-z0-9])/g, (tok) => {
      let stable = tokenMap.get(tok);
      if (!stable) {
        const prefix = tok.startsWith('rw_') ? 'rw_ref' : tok.startsWith('script_') ? 'script_ref' : tok.startsWith('ec_') ? 'ec_ref' : 'r_ref';
        stable = `${prefix}${counter++}`;
        tokenMap.set(tok, stable);
      }
      return stable;
    });

  const stableYaml = stabilise(yamlContent);

  // Snapshot the raw YAML — any change to the generated config will surface
  // as a test failure requiring an explicit snapshot update.
  expect(stableYaml).toMatchSnapshot();

  // Snapshot generated C++ headers when the build produces them (reactive
  // projects).  The bindings header is project-specific and the most likely
  // source of regressions; the reactive runtime header is shared but a
  // change there affects every project so we capture it too.
  const outDir = path.join(projectPath, '.espcompose');
  const bindingsPath = path.join(outDir, 'espcompose_bindings.h');
  const runtimePath = path.join(outDir, 'espcompose_reactive.h');

  if (fs.existsSync(bindingsPath)) {
    const bindingsContent = stabilise(fs.readFileSync(bindingsPath, 'utf8'));
    expect(bindingsContent).toMatchSnapshot('espcompose_bindings.h');
  }

  if (fs.existsSync(runtimePath)) {
    const runtimeContent = fs.readFileSync(runtimePath, 'utf8');
    expect(runtimeContent).toMatchSnapshot('espcompose_reactive.h');
  }

  // Snapshot secrets.yaml when the build produces one (secret() was used).
  const secretsPath = path.join(outDir, 'secrets.yaml');
  if (fs.existsSync(secretsPath)) {
    const secretsContent = fs.readFileSync(secretsPath, 'utf8');
    expect(secretsContent).toMatchSnapshot('secrets.yaml');
  }

  // Validate the generated YAML with the real ESPHome config validator.
  await esphomeConfig(yamlPath);

  return yamlContent;
}
