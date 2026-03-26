import * as esbuild from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';
import { createRequire } from 'module';
import ts from 'typescript';
import { ESLint } from 'eslint';
import { writeTransformedFiles } from './transform/index.js';
import { injectReactiveBindings } from './reactive-injector.js';

export interface CompileOptions {
  /** Absolute path to the TSX/TS entry file. */
  entryFile: string;
  /** Absolute path to the YAML output file. */
  outFile: string;
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
      jsx: ts.JsxEmit.React,
      jsxFactory: 'ESPCompose.createElement',
      jsxFragmentFactory: 'ESPCompose.Fragment',
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
    jsx: 'transform',
    jsxFactory: 'ESPCompose.createElement',
    jsxFragment: 'ESPCompose.Fragment',
    // Keep the SDK external — it will be require()'d from the host process
    external: ['@esphome/compose'],
    outfile: outFile,
    sourcemap: false,
  });

  if (result.errors.length > 0) {
    const messages = await esbuild.formatMessages(result.errors, { kind: 'error' });
    throw new Error(`Bundle failed:\n${messages.join('\n')}`);
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Phase 3: Execute + emit YAML
// ────────────────────────────────────────────────────────────────────────────

async function execute(bundleFile: string, outFile: string): Promise<void> {
  // Use createRequire so this works correctly in both CJS and ESM contexts.
  // Rooting the require at the bundle file itself means @esphome/compose
  // resolves from the user's project node_modules (bundle sits next to source).
  const _require = createRequire(bundleFile);

  // Clear the require cache so re-runs in the same process get a fresh module
  delete _require.cache[_require.resolve(bundleFile)];

  // Load the SDK via the same CommonJS require that the bundle will use.
  // This ensures _withScriptScope and useScript share the same module-level
  // state, avoiding the ESM / CJS dual-instance problem where the compiler's
  // statically-imported ESM copy and the user bundle's CJS copy would have
  // separate hook state and never communicate.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cjsSDK = (_require('@esphome/compose') as any).ESPCompose;

  // Clear HA entity binding cache for a fresh render pass.
  cjsSDK.clearHAEntityCache();

  // Wrap the bundle load and render in both a script scope and a reactive scope.
  // - useHAEntity() calls fire during module evaluation (inside withScriptScope)
  //   and register HA entities in the reactive scope.
  // - Expression<T> props are detected during render() and register reactive
  //   bindings in the reactive scope.
  const { result: reactiveResult, bindings, entities } = cjsSDK.withReactiveScope(() => {
    const { result: mod, scripts } = cjsSDK.withScriptScope(() => {
      return _require(bundleFile) as { default?: unknown };
    });

    const rootElement = mod.default;

    if (rootElement == null) {
      throw new Error(
        `Entry module does not have a default export. ` +
          `Make sure your TSX file exports a default ESPCompose element tree.`
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const config = cjsSDK.render(rootElement as any) as Record<string, unknown>;

    // Prepend any registered scripts as a top-level `script:` section.
    const withScripts: Record<string, unknown> =
      scripts.length > 0
        ? { ...config, script: scripts }
        : config;

    return withScripts;
  });

  // Inject reactive bindings: auto-generated HA sensor imports + trigger wiring
  const finalConfig = injectReactiveBindings(reactiveResult, bindings, entities);

  const yamlOutput = cjsSDK.toYAML(finalConfig);

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, yamlOutput, 'utf8');
}

// ────────────────────────────────────────────────────────────────────────────
// Public entry point
// ────────────────────────────────────────────────────────────────────────────

/**
 * Compile a TSX entry file into an ESPHome YAML configuration file.
 *
 * Pipeline:
 *   [type-check] → [lint] → [transform to .espcompose-build/] → [esbuild bundle] → [require + render] → [write YAML]
 */
export async function compile(options: CompileOptions): Promise<void> {
  const { entryFile, outFile, debug = false } = options;

  // Phase 0: Type-check — fail fast on any TypeScript errors before bundling.
  // Returns the ts.Program so Phase 1 can reuse it.
  const program = await typeCheck(entryFile);

  // Phase 0.5: Lint — enforce ESLint rules on the original source.
  await lint(entryFile);

  // Establish the build directory next to the entry file.
  const sourceDir = path.dirname(entryFile);
  const buildDir = path.join(sourceDir, '.espcompose-build');
  const bundlePath = path.join(buildDir, '.espcompose-bundle.cjs');

  // Force-clean the build directory before each build
  if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true, force: true });
  }
  fs.mkdirSync(buildDir, { recursive: true });

  try {
    // Phase 1: Transform — write every user source file into the build
    // directory, preserving directory structure. Each file is individually
    // inspectable with --debug.
    const transformedEntry = transform(program, entryFile, sourceDir, buildDir);

    // Phase 2: Bundle — esbuild reads the pre-transformed files from the
    // build directory and produces a single CJS bundle.
    await bundle(transformedEntry, bundlePath);

    // Phase 3: Execute the bundle and emit YAML
    await execute(bundlePath, outFile);
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
export async function build(projectDir: string, options?: { debug?: boolean }): Promise<void> {
  const pkgPath = path.join(projectDir, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    throw new Error(`No package.json found in project directory: ${projectDir}`);
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as { main?: string };
  if (!pkg.main) {
    throw new Error(`package.json is missing a "main" field: ${pkgPath}`);
  }

  const entryFile = path.resolve(projectDir, pkg.main);
  const outFile = path.join(projectDir, '.espcompose', 'esphome.yaml');

  await compile({ entryFile, outFile, debug: options?.debug });
}
