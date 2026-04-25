import { createRequire } from 'module';
import type { BuildSemanticIRInput, IRThemeData } from '@espcompose/core/internals';
import { buildSemanticIR, scopeHash } from '@espcompose/core/internals';
import type { PhaseContext } from './types';

/**
 * Phase 3: Execute + Render
 *
 * Loads the bundled CJS module, executes the render pass inside SDK scopes,
 * captures serialization data, extracts theme data, and builds the SemanticIR.
 */
export function executePhase(ctx: PhaseContext): void {
  if (!ctx.bundlePath) {
    throw new Error('Execute phase requires bundlePath on the context.');
  }
  const bundlePath = ctx.bundlePath;
  // Use createRequire so this works correctly in both CJS and ESM contexts.
  // Rooting the require at the bundle file itself means @espcompose/core
  // resolves from the user's project node_modules (bundle sits next to source).
  const _require = createRequire(bundlePath);

  // Clear the require cache so re-runs in the same process get a fresh module
  delete _require.cache[_require.resolve(bundlePath)];

  // Load the SDK via the same CommonJS require that the bundle will use.
  // This ensures withScriptScope and useScript share the same module-level
  // state, avoiding the ESM / CJS dual-instance problem where the compiler's
  // statically-imported ESM copy and the user bundle's CJS copy would have
  // separate state and never communicate.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cjsSDK = (_require('@espcompose/core') as any).ESPCompose;

  // Clear all compiler state for a fresh render pass.
  cjsSDK.clearHAEntityCache();
  cjsSDK.clearImageCache();
  cjsSDK.clearFontCache();
  cjsSDK.clearRefRegistry();
  cjsSDK.clearSecrets();
  cjsSDK.clearThemeRegistry();
  cjsSDK.clearReactiveThemeProxy();
  cjsSDK.clearWireframe();

  // Enable wireframe mode if requested by the CLI.
  if (ctx.wireframe) {
    cjsSDK.setWireframeEnabled(true);
  }

  // Wrap the bundle load and render in both a script scope and a reactive scope.
  let collectedScripts: unknown[] = [];
  let collectedPopups: unknown[] = [];
  cjsSDK.startSerializationCapture();
  const { result: reactiveResult, bindings, entities, components, reactiveNodes } = cjsSDK.withReactiveScope(() => {
    const { result: scriptResult, scripts } = cjsSDK.withScriptScope(() => {
      const { result: config, popups } = cjsSDK.withPopupScope(() => {
        const mod = _require(bundlePath) as { default?: unknown };

        const rootElement = mod.default;

        if (rootElement == null) {
          throw new Error(
            `Entry module does not have a default export. ` +
              `Make sure your TSX file exports a default ESPCompose element tree.`
          );
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rendered = cjsSDK.render(rootElement as any) as Record<string, unknown>;

        return rendered;
      });
      collectedPopups = popups;
      return config;
    });
    collectedScripts = scripts;

    return scriptResult;
  });

  const serializationCaptures = cjsSDK.stopSerializationCapture();

  const themes = extractThemeData(cjsSDK);

  // ── Build Semantic IR ─────────────────────────────────────────────────
  ctx.ir = serializationCaptures
    ? buildSemanticIR({
        config: reactiveResult,
        captures: serializationCaptures,
        bindings: bindings ?? [],
        entities: entities ?? [],
        components: components ?? [],
        scripts: collectedScripts as BuildSemanticIRInput['scripts'],
        reactiveNodes: reactiveNodes ?? [],
        themes,
      })
    : { kind: 'semantic_ir' as const, esphome: { kind: 'esphome_data' as const, sections: [], haEntities: [], components: [], scripts: [] }, espcompose: { kind: 'espcompose_data' as const, reactive: { kind: 'reactive_data' as const, bindings: [], memos: [], effects: [] } } };

  // Collect secrets before they are cleared on the next run.
  const secretsMap: ReadonlyMap<string, string> = cjsSDK.getSecrets();
  if (secretsMap.size > 0) {
    ctx.secrets = new Map(secretsMap);
  }

  // Stash collected popup definitions for downstream emit phases.
  if (collectedPopups.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ctx.popups = collectedPopups as any;
  }
}

/**
 * Extract theme data from the SDK's theme registry.
 *
 * Iterates all registered scopes, reads their theme names and signal path
 * values, and assembles an IRThemeData array consumed by the IR builder.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractThemeData(cjsSDK: any): IRThemeData[] | undefined {
  const getThemeRegistry = cjsSDK.getThemeRegistry;
  if (typeof getThemeRegistry !== 'function') return undefined;

  const registry = getThemeRegistry();
  const scopes: string[] = registry.getScopes();
  if (scopes.length === 0) return undefined;

  const result: IRThemeData[] = [];

  for (const scope of scopes) {
    const themeNames: string[] = registry.getThemeNames(scope);
    if (themeNames.length === 0) continue;

    const signalPaths: string[] = registry.getSignalPaths(scope);
    const leafData = new Map<string, { values: unknown[]; valueType: string }>();

    for (const signalPath of signalPaths) {
      const values: unknown[] = [];
      let valueType = 'int';
      for (const name of themeNames) {
        const themes = registry.getThemes(scope);
        const thm = themes.get(name);
        if (thm) {
          const val = thm.values[signalPath];
          if (val) {
            values.push(val.value);
            valueType = val.valueType;
          } else {
            values.push(0);
          }
        }
      }
      leafData.set(signalPath, { values, valueType });
    }

    result.push({
      kind: 'theme_data',
      scope,
      scopeId: scopeHash(scope),
      themeNames,
      defaultIndex: registry.getDefaultIndex(scope),
      leafData,
    });
  }

  return result.length > 0 ? result : undefined;
}
