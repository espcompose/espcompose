// ────────────────────────────────────────────────────────────────────────────
// ESPHome ComposeTarget implementation
//
// Implements the generic ComposeTarget interface for the ESPHome backend.
// Lowers SemanticIR to ESPHome YAML + C++ reactive runtime headers and
// writes all output files to disk.
// ────────────────────────────────────────────────────────────────────────────

import * as fs from 'fs';
import * as path from 'path';
import yaml from 'yaml';
import type { ComposeTarget, EmitRequest, EmitResult } from '@espcompose/core/internals';
import { lowerToYamlConfig } from './lower-yaml.js';
import { generateCppFromIR } from './codegen-cpp.js';
import { resolveAssets } from './assets.js';

export function createEsphomeTarget(): ComposeTarget {
  return {
    name: 'esphome',

  async emit(request: EmitRequest): Promise<EmitResult> {
    const { ir, outDir, sourceDir, secrets } = request;
    const files: string[] = [];

    // ── Generate C++ headers from semantic IR ───────────────────────────
    const cppResult = generateCppFromIR(ir);

    if (cppResult) {
      fs.mkdirSync(outDir, { recursive: true });

      const bindingsPath = path.join(outDir, 'espcompose_bindings.h');
      fs.writeFileSync(bindingsPath, cppResult.bindingsHeaderContent, 'utf8');
      files.push(bindingsPath);

      const runtimePath = path.join(outDir, 'espcompose_reactive.h');
      fs.writeFileSync(runtimePath, cppResult.runtimeHeaderContent, 'utf8');
      files.push(runtimePath);
    }

    // ── Lower semantic IR to YAML config ────────────────────────────────
    const finalConfig = lowerToYamlConfig(ir, cppResult);

    // ── Resolve asset file paths and copy files to build output ─────────
    const copiedAssets = resolveAssets(finalConfig as Record<string, unknown>, sourceDir, outDir);
    if (copiedAssets.length > 0) {
      console.log(`  Assets  → copied ${copiedAssets.length} file(s) to ${path.relative(sourceDir, outDir)}/assets/`);
    }

    // ── Serialize and write YAML ────────────────────────────────────────
    const yamlOutput = yaml.stringify(finalConfig, { aliasDuplicateObjects: false, nullStr: '' });
    const yamlPath = path.join(outDir, 'esphome.yaml');
    fs.mkdirSync(path.dirname(yamlPath), { recursive: true });
    fs.writeFileSync(yamlPath, yamlOutput, 'utf8');
    files.push(yamlPath);

    // ── Write secrets.yaml when secret() was used ───────────────────────
    if (secrets && secrets.size > 0) {
      const secretsLines = Array.from(secrets.entries())
        .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
        .join('\n') + '\n';
      const secretsPath = path.join(outDir, 'secrets.yaml');
      fs.writeFileSync(secretsPath, secretsLines, 'utf8');
      files.push(secretsPath);
    }

    return { files };
  },
  };
}
