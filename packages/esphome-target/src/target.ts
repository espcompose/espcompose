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
import type { ComposeTarget, EmitRequest, EmitResult, OverlayDefinition, IRBinding, IRReactiveNode } from '@espcompose/core/internals';
import { lowerToYamlConfig } from './lower-yaml.js';
import { generateCppFromIR } from './codegen';
import { generateBindingsHeader } from './codegen/bindings.js';
import type { AnimationDecl, StyleTransitionDecl, ReactiveRuntimeConfig } from './codegen/bindings.js';
import { resolveAssets } from './assets.js';
import { extractPaintScenesFromIR, injectEcCanvasDrawActions, lowerAnimationToCpp, lowerStyleTransitionToCpp } from './lvgl';
import { buildEntityIdMap } from './ha-entity-classifier.js';

export function createEsphomeTarget(): ComposeTarget {
  return {
    name: 'esphome',

  async emit(request: EmitRequest): Promise<EmitResult> {
    const { ir, outDir, sourceDir, secrets, overlays, perf } = request;
    const files: string[] = [];

    // ── Remap semantic entity IDs → ESPHome target IDs ──────────────────
    // Core mints deterministic semantic IDs during render; we remap them
    // here so all downstream code sees target-specific IDs.
    const { semanticToTarget, remappedEntities } = buildEntityIdMap([...ir.entities]);
    remapEntityIdsInIR(ir, semanticToTarget, overlays);

    // ── Generate C++ headers from semantic IR ───────────────────────────
    const cppResult = generateCppFromIR(ir, overlays, remappedEntities);

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

    // ── Lower animations to C++ ────────────────────────────────────────
    // Animation exec_cb functions and static lv_anim_t variables are emitted
    // at file scope in bindings.h. Init code (lv_anim_init, lv_anim_set_*)
    // is emitted inside bootstrap_runtime() so it runs after LVGL widgets
    // are created.
    const seenAnimIds = new Set<string>();
    const animationDecls: AnimationDecl[] = [];
    for (const ui of ir.uis) {
      for (const anim of ui.animations) {
        if (seenAnimIds.has(anim.animationId)) continue;
        seenAnimIds.add(anim.animationId);
        const widgetAccessor = `(void*)&id(${anim.targetRef})`;
        const { execCallback, varDeclaration, initCode } = lowerAnimationToCpp(anim, widgetAccessor);
        animationDecls.push({ execCallback, varDeclaration, initCode });
      }
    }

    // ── Lower style transitions to C++ ─────────────────────────────────
    const seenTransIds = new Set<string>();
    const styleTransDecls: StyleTransitionDecl[] = [];
    for (const ui of ir.uis) {
      for (const st of ui.styleTransitions) {
        if (seenTransIds.has(st.transitionId)) continue;
        seenTransIds.add(st.transitionId);
        const widgetAccessor = `(lv_obj_t*)&id(${st.targetRef})`;
        const { declarations, initCode } = lowerStyleTransitionToCpp(st, widgetAccessor);
        styleTransDecls.push({ declarations, initCode });
      }
    }

    if (cppResult) {
      // Inject animation and style transition declarations into the runtime config and regenerate.
      const needsRegen = animationDecls.length > 0 || styleTransDecls.length > 0;
      if (animationDecls.length > 0) {
        cppResult.runtimeConfig.animations = animationDecls;
      }
      if (styleTransDecls.length > 0) {
        cppResult.runtimeConfig.styleTransitions = styleTransDecls;
      }
      if (needsRegen) {
        cppResult.bindingsHeaderContent = generateBindingsHeader(cppResult.runtimeConfig);
      }
      const bindingsPath = path.join(outDir, 'espcompose_bindings.h');
      fs.writeFileSync(bindingsPath, cppResult.bindingsHeaderContent, 'utf8');
      files.push(bindingsPath);
    } else if (animationDecls.length > 0 || styleTransDecls.length > 0) {
      // No reactive content but we have animations/transitions — build a minimal config.
      const minimalConfig: ReactiveRuntimeConfig = {
        signals: [],
        globalSignals: [],
        memos: [],
        effects: [],
        widgetBindings: [],
        animations: animationDecls.length > 0 ? animationDecls : undefined,
        styleTransitions: styleTransDecls.length > 0 ? styleTransDecls : undefined,
      };
      const bindingsPath = path.join(outDir, 'espcompose_bindings.h');
      fs.writeFileSync(bindingsPath, generateBindingsHeader(minimalConfig), 'utf8');
      files.push(bindingsPath);
    }

    // ── Lower semantic IR to YAML config ────────────────────────────────
    const finalConfig = lowerToYamlConfig(ir, cppResult, { perf });

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

// ────────────────────────────────────────────────────────────────────────────
// Entity ID remapping
// ────────────────────────────────────────────────────────────────────────────

import type { SemanticIR } from '@espcompose/core/internals';

/**
 * Mutate the SemanticIR in place: rewrite all `sourceId` fields on reactive
 * nodes and dependencies from semantic IDs to ESPHome target IDs using the
 * provided mapping. Also rewrites `IRHAEntity.semanticId` to the target ID
 * so downstream code can use it as the ESPHome component `id:` field.
 */
function remapEntityIdsInIR(
  ir: SemanticIR,
  semanticToTarget: Map<string, string>,
  overlays?: readonly OverlayDefinition[],
): void {
  if (semanticToTarget.size === 0) return;

  function remap(id: string): string {
    return semanticToTarget.get(id) ?? id;
  }

  function remapNode(node: IRReactiveNode): void {
    if (node.sourceId) (node as { sourceId: string }).sourceId = remap(node.sourceId);
    if (node.dependencies) {
      for (const dep of node.dependencies) {
        if (dep.sourceId && dep.sourceType === 'ha_entity') {
          (dep as { sourceId: string }).sourceId = remap(dep.sourceId);
        }
      }
    }
  }

  function remapBinding(binding: IRBinding): void {
    const expr = binding.expression;
    if (expr.sourceId) (expr as { sourceId: string }).sourceId = remap(expr.sourceId);
    if (expr.dependencies) {
      for (const dep of expr.dependencies) {
        if (dep.sourceId && dep.sourceType === 'ha_entity') {
          (dep as { sourceId: string }).sourceId = remap(dep.sourceId);
        }
      }
    }
  }

  // Remap top-level reactive nodes (memos + effects)
  for (const node of ir.reactives.memos) remapNode(node);
  for (const node of ir.reactives.effects) remapNode(node);

  // Remap top-level bindings
  for (const binding of ir.reactives.bindings) remapBinding(binding);

  // Remap overlay-captured bindings and reactive nodes — these live on
  // OverlayInstance objects (outside ir.reactives) and are merged in by
  // generateCppFromIR via processOverlayMux.
  if (overlays) {
    for (const def of overlays) {
      for (const inst of def.instances) {
        if (inst.capturedBindings) {
          for (const binding of inst.capturedBindings) remapBinding(binding);
        }
        if (inst.capturedReactiveNodes) {
          for (const node of inst.capturedReactiveNodes) remapNode(node);
        }
      }
    }
  }
}
