import path from 'path';
import fs from 'fs';
import { build } from '@espcompose/cli';
import type { CompileResult, PhaseTiming } from '@espcompose/cli';
import { createEsphomeTarget, esphomeConfig } from '@espcompose/esphome-target';
import { expect } from 'vitest';

/** Timing breakdown for a single e2e test project. */
export interface TestTiming {
  project: string;
  /** Per-phase compiler timings (from espcompose pipeline). */
  phases: PhaseTiming[];
  /** Total espcompose build time (sum of all phases) in ms. */
  espcomposeMs: number;
  /** ESPHome config validation time in ms. */
  esphomeValidationMs: number;
}

/**
 * Runs the full build pipeline against a project directory and asserts
 * the generated YAML matches the stored snapshot.
 *
 * @param projectsDir  Absolute path to the projects directory.
 * @param projectName  Name of the subdirectory within projectsDir to build.
 */
export async function createProjectTest(
  projectsDir: string,
  projectName: string,
): Promise<TestTiming> {
  const projectPath = path.resolve(projectsDir, projectName);

  // Run the full compiler pipeline — output lands at .espcompose/esphome.yaml
  const result: CompileResult = await build(projectPath, createEsphomeTarget());

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
    text.replace(/(?<![a-z0-9])(?:r_|rw_|script_|ec_|memo_)[a-z0-9]{8,11}(?![a-z0-9])/g, (tok) => {
      let stable = tokenMap.get(tok);
      if (!stable) {
        const prefix = tok.startsWith('rw_') ? 'rw_ref' : tok.startsWith('script_') ? 'script_ref' : tok.startsWith('ec_') ? 'ec_ref' : tok.startsWith('memo_') ? 'memo_ref' : 'r_ref';
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
  const runtimePath = path.join(outDir, 'external_components', 'espcompose', 'espcompose_reactive.h');

  if (fs.existsSync(bindingsPath)) {
    const bindingsContent = stabilise(fs.readFileSync(bindingsPath, 'utf8'));
    expect(bindingsContent).toMatchSnapshot('espcompose_bindings.h');

    // Cross-validate: every espcompose::memo_* reference in the YAML must
    // have a corresponding declaration in the bindings header.  If the YAML
    // emits a raw IRReactiveNode nodeId (e.g. memo_uahm4rk5n) instead of
    // the sequential C++ name (memo_0), the build will fail at the C++
    // compile step.  Catch this early.
    const rawBindings = fs.readFileSync(bindingsPath, 'utf8');
    const declaredMemos = new Set<string>();
    for (const m of rawBindings.matchAll(/(?:Memo<[^>]+>|auto&)\s+(memo_\d+)/g)) {
      declaredMemos.add(m[1]);
    }
    if (declaredMemos.size > 0) {
      const yamlMemoRefs = new Set<string>();
      for (const m of yamlContent.matchAll(/espcompose::(memo_[a-z0-9_]+)/g)) {
        yamlMemoRefs.add(m[1]);
      }
      const undeclared = [...yamlMemoRefs].filter(ref => !declaredMemos.has(ref));
      expect(
        undeclared,
        `YAML references memo(s) not declared in espcompose_bindings.h: ${undeclared.join(', ')}`,
      ).toHaveLength(0);
    }
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
  const esphomeStart = performance.now();
  await esphomeConfig(yamlPath);
  const esphomeValidationMs = performance.now() - esphomeStart;

  const espcomposeMs = result.phaseTiming.reduce((sum, t) => sum + t.durationMs, 0);

  return {
    project: projectName,
    phases: result.phaseTiming,
    espcomposeMs,
    esphomeValidationMs,
  };
}
