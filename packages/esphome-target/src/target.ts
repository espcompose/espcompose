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
import { extractPaintScenesFromIR, injectEcCanvasDrawActions } from './ec-canvas-lowering.js';

export function createEsphomeTarget(): ComposeTarget {
  return {
    name: 'esphome',

  async emit(request: EmitRequest): Promise<EmitResult> {
    const { ir, outDir, sourceDir, secrets } = request;
    const files: string[] = [];

    // ── Generate C++ headers from semantic IR ───────────────────────────
    const cppResult = generateCppFromIR(ir);

    // ── Extract ec-canvas paint scenes for native canvas draw actions ───
    const paintScenes = extractPaintScenesFromIR(ir);

    // ── Emit external component (all C++ lives here) ─────────────────────
    // ESPHome external_components expects: __init__.py, .h/.cpp files all
    // in one directory. We write the static assets (runtime component class)
    // plus the project-specific generated headers here.
    const componentDestDir = path.join(outDir, 'external_components', 'espcompose');
    fs.mkdirSync(componentDestDir, { recursive: true });

    // Copy static component assets (__init__.py, espcompose_runtime.h/.cpp, espcompose_reactive.h).
    // __dirname resolves to dist/ when bundled into the CLI (prebuild copies assets there)
    // or to src/ when running from source under vitest — both use ../assets/.
    const assetsDir = path.resolve(__dirname, '..', 'assets', 'external-component');
    for (const assetFile of ['__init__.py', 'espcompose_runtime.h', 'espcompose_runtime.cpp', 'espcompose_reactive.h']) {
      const src = path.join(assetsDir, assetFile);
      if (fs.existsSync(src)) {
        const dest = path.join(componentDestDir, assetFile);
        fs.copyFileSync(src, dest);
        files.push(dest);
      }
    }

    // Write generated bindings header to the output root (NOT in the external
    // component directory).  ESPHome compiles external component sources as a
    // separate translation unit that cannot see the widget ID globals declared
    // in main.cpp.  Using esphome.includes: places the header into main.cpp's
    // compilation context where all id() references resolve correctly.
    if (cppResult) {
      const bindingsPath = path.join(outDir, 'espcompose_bindings.h');
      fs.writeFileSync(bindingsPath, cppResult.bindingsHeaderContent, 'utf8');
      files.push(bindingsPath);
    }

    // ── Lower semantic IR to YAML config ────────────────────────────────
    const finalConfig = lowerToYamlConfig(ir, cppResult);

    // ── Emit native lvgl.canvas draw actions for ec-canvas scenes ───────
    injectEcCanvasDrawActions(finalConfig as Record<string, unknown>, paintScenes);

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
