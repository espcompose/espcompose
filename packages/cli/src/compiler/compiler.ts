import * as esbuild from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';
import { createRequire } from 'module';
import ts from 'typescript';
import { ESLint } from 'eslint';
import { writeTransformedFiles } from './transform/index.js';
import { LIBRARY_FORMAT_VERSION } from './transform/format-version.js';
import type { SemanticIR, ComposeTarget } from '@esphome/compose/internals';
import { buildSemanticIR } from '@esphome/compose/internals';
import { writeIRDebugFiles } from './ir-debug.js';

export interface CompileOptions {
  /** Absolute path to the TSX/TS entry file. */
  entryFile: string;
  /** Absolute path to the project root directory (where package.json lives). */
  projectDir: string;
  /** Absolute path to the output directory for generated files. */
  outDir: string;
  /** The compilation target that will lower IR to target-specific output. */
  target: ComposeTarget;
  /** When true, keep the `.espcompose-build/` intermediate folder for inspection. */
  debug?: boolean;
}

// ────────────────────────────────────────────────────────────────────────────
// Phase 0: Type-check
// ────────────────────────────────────────────────────────────────────────────

/**
 * Run the TypeScript compiler over the entry file and its transitive imports,
 * returning the ts.Program for reuse by Phase 1.
 *
 * Uses the project's own tsconfig.json when one can be located (by walking up
 * from the entry file's directory), falling back to sensible JSX defaults so
 * the check can still run for projects without a tsconfig.
 *
 * Throws a descriptive error if any type errors are found.
 */
async function typeCheck(entryFile: string): Promise<ts.Program> {
  const projectDir = path.dirname(entryFile);
  const tsConfigPath = ts.findConfigFile(projectDir, ts.sys.fileExists, 'tsconfig.json');

  let compilerOptions: ts.CompilerOptions;
  if (tsConfigPath) {
    const configFile = ts.readConfigFile(tsConfigPath, ts.sys.readFile);
    if (configFile.error) {
      const message = ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n');
      throw new Error(`Error reading tsconfig.json: ${message}`);
    }
    const parsedConfig = ts.parseJsonConfigFileContent(
      configFile.config,
      ts.sys,
      path.dirname(tsConfigPath),
    );
    compilerOptions = parsedConfig.options;
  } else {
    compilerOptions = {
      target: ts.ScriptTarget.ES2022,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      jsx: ts.JsxEmit.ReactJSX,
      jsxImportSource: '@esphome/compose',
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
    };
  }

  const program = ts.createProgram([entryFile], compilerOptions);
  const diagnostics = ts.getPreEmitDiagnostics(program);

  const errors = Array.from(diagnostics).filter(
    (d) =>
      d.category === ts.DiagnosticCategory.Error &&
      d.file !== undefined &&
      !d.file.fileName.includes('node_modules'),
  );

  if (errors.length > 0) {
    const formatted = errors.map((d) => {
      const message = ts.flattenDiagnosticMessageText(d.messageText, '\n');
      if (d.file && d.start !== undefined) {
        const { line, character } = d.file.getLineAndCharacterOfPosition(d.start);
        const relFile = path.relative(process.cwd(), d.file.fileName);
        return `  error ${relFile}:${line + 1}:${character + 1} - ${message}`;
      }
      return `  error ${message}`;
    });
    throw new Error(
      `TypeScript type-check failed with ${errors.length} error(s):\n${formatted.join('\n')}`,
    );
  }

  return program;
}

// ────────────────────────────────────────────────────────────────────────────
// Phase 0.5: Lint
// ────────────────────────────────────────────────────────────────────────────

/**
 * Build the default ESLint flat config used when a project has no config file.
 *
 * Loads the `@esphome/compose-eslint` recommended preset, which includes
 * `typescript-eslint` recommended rules and JSX parser options.
 */
async function buildDefaultConfig(): Promise<ESLint.Options['overrideConfig']> {
  const composeESLint = (await import('@esphome/compose-eslint')).default;
  return composeESLint.recommended as ESLint.Options['overrideConfig'];
}

/**
 * Run ESLint over the entry file and its sibling source files.
 *
 * Always enforced — if the project has its own `eslint.config.*` the ESLint
 * API discovers it automatically; otherwise the compiler supplies a built-in
 * default config based on `@esphome/compose-eslint` recommended.
 *
 * Throws on lint errors. Warnings are printed to stderr but do not fail.
 */
export async function lint(entryFile: string): Promise<void> {
  const projectDir = path.dirname(entryFile);

  // Determine whether the project ships its own ESLint config
  const configFiles = [
    'eslint.config.js', 'eslint.config.mjs', 'eslint.config.cjs',
    'eslint.config.ts', 'eslint.config.mts', 'eslint.config.cts',
  ];
  const hasProjectConfig = configFiles.some((f) =>
    fs.existsSync(path.join(projectDir, f)),
  );

  let eslint: ESLint;
  if (hasProjectConfig) {
    eslint = new ESLint({ cwd: projectDir });
  } else {
    eslint = new ESLint({
      cwd: projectDir,
      overrideConfigFile: true,
      overrideConfig: await buildDefaultConfig(),
    });
  }

  const results = await eslint.lintFiles([entryFile]);

  const errorCount = results.reduce((sum, r) => sum + r.errorCount, 0);
  const warningCount = results.reduce((sum, r) => sum + r.warningCount, 0);

  if (warningCount > 0 || errorCount > 0) {
    const formatter = await eslint.loadFormatter('stylish');
    const output = await formatter.format(results);
    if (output) {
      console.error(output);
    }
  }

  if (errorCount > 0) {
    throw new Error(`ESLint found ${errorCount} error(s).`);
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Phase 1: Transform (write transformed files to .espcompose-build/)
//
// Every user source file is transformed via the TypeScript AST and written
// to the build directory preserving directory structure. This mirrors the
// Resolut CLI pattern — individual transformed files are inspectable on
// disk (especially useful with --debug).
// ────────────────────────────────────────────────────────────────────────────

function transform(
  program: ts.Program,
  entryFile: string,
  sourceDir: string,
  buildDir: string,
): string {
  const { entryFile: transformedEntry, diagnostics } = writeTransformedFiles(
    program,
    entryFile,
    sourceDir,
    buildDir,
  );

  if (diagnostics.length > 0) {
    const formatted = diagnostics.map((d) => {
      const loc = d.line != null ? `:${d.line}:${d.character ?? 1}` : '';
      return `  transform ${d.file}${loc} - ${d.message}`;
    });
    throw new Error(
      `Script transformation failed with ${diagnostics.length} error(s):\n${formatted.join('\n')}`,
    );
  }

  return transformedEntry;
}

// ────────────────────────────────────────────────────────────────────────────
// Phase 2: Bundle (esbuild reads from .espcompose-build/)
//
// esbuild bundles the pre-transformed files from the build directory into
// a single CJS file. Because the sources are real files on disk, esbuild
// resolves imports normally — no load plugin needed.
// ────────────────────────────────────────────────────────────────────────────

async function bundle(entryFile: string, outFile: string): Promise<void> {
  const result = await esbuild.build({
    entryPoints: [entryFile],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    target: 'node18',
    jsx: 'automatic',
    jsxImportSource: '@esphome/compose',
    // Keep the SDK external — it will be require()'d from the host process
    external: ['@esphome/compose'],
    outfile: outFile,
    sourcemap: false,
    metafile: true,
  });

  if (result.errors.length > 0) {
    const messages = await esbuild.formatMessages(result.errors, { kind: 'error' });
    throw new Error(`Bundle failed:\n${messages.join('\n')}`);
  }

  // Check format versions of any ESPCompose libraries pulled into the bundle.
  // Libraries built with `espcompose library` stamp an `__espcompose_format__`
  // export. We scan the bundle's resolved inputs for these markers and validate
  // that all declared versions are compatible with this compiler.
  if (result.metafile) {
    validateBundledLibraryVersions(result.metafile, entryFile);
  }
}

/**
 * Scan esbuild metafile inputs for ESPCompose library format version markers.
 * Reads each resolved input file (outside the project's own source tree) and
 * checks for `__espcompose_format__` exports. Throws if any are incompatible.
 */
function validateBundledLibraryVersions(
  metafile: esbuild.Metafile,
  entryFile: string,
): void {
  // The entry file lives inside the build directory (.espcompose-build/).
  // Skip everything under that tree — those are the project's own sources.
  const buildDir = path.dirname(path.resolve(entryFile));

  for (const inputPath of Object.keys(metafile.inputs)) {
    const absPath = path.resolve(inputPath);

    // Skip the project's own transformed sources
    if (absPath.startsWith(buildDir)) continue;
    if (!fs.existsSync(absPath)) continue;

    let content: string;
    try {
      content = fs.readFileSync(absPath, 'utf8');
    } catch {
      continue;
    }

    // Look for __espcompose_format__ assignments in the source
    const versionMatch = content.match(
      /(?:export\s+(?:const|var|let)\s+)?__espcompose_format__\s*=\s*(\d+)/,
    );
    if (!versionMatch) continue;

    const version = parseInt(versionMatch[1], 10);
    if (version !== LIBRARY_FORMAT_VERSION) {
      const libName = extractLibraryName(inputPath);
      throw new Error(
        `Library ${libName} was compiled with ESPCompose format v${version}, ` +
        `but this compiler requires format v${LIBRARY_FORMAT_VERSION}. ` +
        `Please rebuild the library with a compatible ESPCompose CLI version.`,
      );
    }
  }
}

/** Extract a human-readable library name from a node_modules path. */
function extractLibraryName(inputPath: string): string {
  const match = inputPath.match(/node_modules\/(@[^/]+\/[^/]+|[^/]+)/);
  return match ? match[1] : inputPath;
}

// ────────────────────────────────────────────────────────────────────────────
// Phase 3: Execute + render
// ────────────────────────────────────────────────────────────────────────────

interface ExecuteResult {
  ir: SemanticIR;
}

/**
 * Execute the bundled CJS, capture the render pass, and build a SemanticIR.
 */
function executeAndBuildIR(bundleFile: string): ExecuteResult {
  // Use createRequire so this works correctly in both CJS and ESM contexts.
  // Rooting the require at the bundle file itself means @esphome/compose
  // resolves from the user's project node_modules (bundle sits next to source).
  const _require = createRequire(bundleFile);

  // Clear the require cache so re-runs in the same process get a fresh module
  delete _require.cache[_require.resolve(bundleFile)];

  // Load the SDK via the same CommonJS require that the bundle will use.
  // This ensures withScriptScope and createScript share the same module-level
  // state, avoiding the ESM / CJS dual-instance problem where the compiler's
  // statically-imported ESM copy and the user bundle's CJS copy would have
  // separate state and never communicate.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cjsSDK = (_require('@esphome/compose') as any).ESPCompose;

  // Clear all compiler state for a fresh render pass.
  cjsSDK.clearHAEntityCache();
  cjsSDK.clearImageCache();
  cjsSDK.clearFontCache();
  cjsSDK.clearRefRegistry();
  cjsSDK.clearSecrets();
  cjsSDK.clearThemeRegistry();
  cjsSDK.clearReactiveThemeProxy();
  cjsSDK.clearThemeNodeCache();

  // Wrap the bundle load and render in both a script scope and a reactive scope.
  let collectedScripts: Array<{ id: string; then: unknown[] }> = [];
  cjsSDK.startSerializationCapture();
  const { result: reactiveResult, bindings, entities, components, reactiveNodes } = cjsSDK.withReactiveScope(() => {
    const { result: config, scripts } = cjsSDK.withScriptScope(() => {
      const mod = _require(bundleFile) as { default?: unknown };

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
    collectedScripts = scripts;

    return config;
  });

  const serializationCaptures = cjsSDK.stopSerializationCapture();

  // ── Extract theme data from the SDK registry ─────────────────────────────
  let themeData: import('@esphome/compose/internals').IRThemeData | undefined;
  const getThemeRegistry = cjsSDK.getThemeRegistry;
  if (typeof getThemeRegistry === 'function') {
    const registry = getThemeRegistry();
    const themeNames: string[] = registry.getThemeNames();
    if (themeNames.length > 0) {
      const signalPaths: string[] = registry.getSignalPaths();
      const leafData = new Map<string, { values: unknown[]; valueType: string }>();
      for (const path of signalPaths) {
        const values: unknown[] = [];
        let valueType = 'int';
        for (const name of themeNames) {
          const themes = registry.getThemes();
          const theme = themes.get(name);
          if (theme) {
            const val = theme.values[path];
            if (val) {
              values.push(val.value);
              valueType = val.valueType;
            } else {
              values.push(0);
            }
          }
        }
        leafData.set(path, { values, valueType });
      }
      themeData = {
        themeNames,
        defaultIndex: registry.getDefaultIndex(),
        leafData,
      };
    }
  }

  // ── Build Semantic IR ─────────────────────────────────────────────────
  const ir: SemanticIR = serializationCaptures
    ? buildSemanticIR({
        config: reactiveResult,
        captures: serializationCaptures,
        bindings: bindings ?? [],
        entities: entities ?? [],
        components: components ?? [],
        scripts: collectedScripts,
        reactiveNodes: reactiveNodes ?? [],
        themes: themeData,
      })
    : { sections: [], bindings: [], entities: [], components: [], scripts: [], reactiveNodes: [] };

  return { ir };
}

// ────────────────────────────────────────────────────────────────────────────
// Shared pipeline: Phases 0–3
// ────────────────────────────────────────────────────────────────────────────

interface PipelineResult {
  ir: SemanticIR;
  buildDir: string;
  sourceDir: string;
}

/**
 * Run the shared compiler pipeline (type-check → lint → transform → bundle → execute).
 * Returns the SemanticIR and the build directory path for cleanup.
 */
async function runPipeline(entryFile: string): Promise<PipelineResult> {
  // Phase 0: Type-check
  const program = await typeCheck(entryFile);

  // Phase 0.5: Lint
  await lint(entryFile);

  const sourceDir = path.dirname(entryFile);
  const buildDir = path.join(sourceDir, '.espcompose-build');
  const bundlePath = path.join(buildDir, '.espcompose-bundle.cjs');

  // Force-clean the build directory before each build
  if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true, force: true });
  }
  fs.mkdirSync(buildDir, { recursive: true });

  // Phase 1: Transform
  const transformedEntry = transform(program, entryFile, sourceDir, buildDir);

  // Phase 2: Bundle
  await bundle(transformedEntry, bundlePath);

  // Phase 3: Execute + build IR
  const { ir } = executeAndBuildIR(bundlePath);

  return { ir, buildDir, sourceDir };
}

// ────────────────────────────────────────────────────────────────────────────
// Public entry point
// ────────────────────────────────────────────────────────────────────────────

/**
 * Compile a TSX entry file through the full pipeline and emit via the target.
 *
 * Pipeline:
 *   [type-check] → [lint] → [transform to .espcompose-build/] → [esbuild bundle] → [require + render] → [target.emit()]
 */
export async function compile(options: CompileOptions): Promise<void> {
  const { entryFile, projectDir, outDir, target, debug = false } = options;

  const { ir, buildDir, sourceDir } = await runPipeline(entryFile);

  // Write IR debug files when --debug is set
  if (debug) {
    const htmlPath = writeIRDebugFiles(ir, buildDir);
    console.log(`IR debug viewer: ${htmlPath}`);
  }

  try {
    // Phase 4: Delegate to the target for lowering and output
    await target.emit({ ir, projectDir, outDir, sourceDir });
  } finally {
    // Clean up the build directory unless --debug is set
    if (!debug && fs.existsSync(buildDir)) {
      fs.rmSync(buildDir, { recursive: true, force: true });
    }
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Project-level build entry point
// ────────────────────────────────────────────────────────────────────────────

/**
 * Build an ESPHome Compose project directory.
 *
 * Reads the `main` field from `<projectDir>/package.json` as the entry point
 * and writes the generated YAML to `<projectDir>/.espcompose/esphome.yaml`.
 *
 * @param projectDir  Absolute path to the project directory.
 */
export async function build(projectDir: string, target: ComposeTarget, options?: { debug?: boolean }): Promise<void> {
  const pkgPath = path.join(projectDir, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    throw new Error(`No package.json found in project directory: ${projectDir}`);
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as { main?: string };
  if (!pkg.main) {
    throw new Error(`package.json is missing a "main" field: ${pkgPath}`);
  }

  const entryFile = path.resolve(projectDir, pkg.main);
  const outDir = path.join(projectDir, '.espcompose');

  await compile({ entryFile, projectDir, outDir, target, debug: options?.debug });
}

// ────────────────────────────────────────────────────────────────────────────
// IR-only compilation (for simulator and other backends)
// ────────────────────────────────────────────────────────────────────────────

/**
 * Compile a project to SemanticIR without emitting target-specific files.
 *
 * Runs the full pipeline (type-check, lint, transform, bundle, execute+render)
 * but stops after IR construction.
 */
export async function compileToIR(projectDir: string): Promise<SemanticIR> {
  const pkgPath = path.join(projectDir, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    throw new Error(`No package.json found in project directory: ${projectDir}`);
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as { main?: string };
  if (!pkg.main) {
    throw new Error(`package.json is missing a "main" field: ${pkgPath}`);
  }

  const entryFile = path.resolve(projectDir, pkg.main);

  const { ir, buildDir } = await runPipeline(entryFile);

  // Clean up the build directory
  if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true, force: true });
  }

  return ir;
}
