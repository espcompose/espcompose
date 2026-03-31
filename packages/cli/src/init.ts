import * as fs from 'fs';
import * as path from 'path';

export interface InitOptions {
  board?: string;
  library?: boolean;
}

/**
 * Scaffold a new ESPHome Compose project in `<cwd>/<name>/`.
 *
 * Creates the directory and writes a minimal set of files so the user can
 * immediately install dependencies and run `espcompose transpile`.
 */
export function initProject(name: string, options: InitOptions = {}): void {
  const board = options.board ?? 'esp32dev';
  const isLibrary = options.library ?? false;
  const targetDir = path.resolve(name);

  if (fs.existsSync(targetDir)) {
    const entries = fs.readdirSync(targetDir);
    if (entries.length > 0) {
      throw new Error(`Directory "${name}" already exists and is not empty.`);
    }
  }

  fs.mkdirSync(targetDir, { recursive: true });

  // ── package.json ───────────────────────────────────────────────────────
  const packageJson = isLibrary
    ? {
        name,
        version: '1.0.0',
        main: 'dist/index.js',
        module: 'dist/index.mjs',
        types: 'dist/index.d.ts',
        exports: {
          '.': {
            types: './dist/index.d.ts',
            import: './dist/index.mjs',
            require: './dist/index.js',
          },
        },
        files: ['dist'],
        espcompose: { library: true },
        scripts: {
          build: 'espcompose library',
          typecheck: 'tsc --noEmit',
          lint: 'eslint src',
        },
        dependencies: {
          '@esphome/compose': 'latest',
        },
        devDependencies: {
          '@esphome/compose-cli': 'latest',
          '@esphome/compose-eslint': 'latest',
          eslint: '^9.0.0',
          'typescript-eslint': '^8.0.0',
        },
      }
    : {
        name,
        version: '1.0.0',
        private: true,
        main: 'index.tsx',
        scripts: {
          build: 'espcompose transpile',
          lint: 'eslint .',
        },
        dependencies: {
          '@esphome/compose': 'latest',
        },
        devDependencies: {
          '@esphome/compose-cli': 'latest',
          '@esphome/compose-eslint': 'latest',
          eslint: '^9.0.0',
          'typescript-eslint': '^8.0.0',
        },
      };
  fs.writeFileSync(
    path.join(targetDir, 'package.json'),
    JSON.stringify(packageJson, null, 2) + '\n',
  );

  // ── tsconfig.json ─────────────────────────────────────────────────────
  const tsconfig = isLibrary
    ? {
        extends: '@esphome/compose/tsconfig.sdk.json',
        include: ['src/**/*.ts', 'src/**/*.tsx'],
        exclude: ['node_modules', 'dist', '.espcompose-build'],
      }
    : {
        extends: '@esphome/compose/tsconfig.sdk.json',
        include: ['*.tsx'],
        exclude: ['node_modules'],
      };
  fs.writeFileSync(
    path.join(targetDir, 'tsconfig.json'),
    JSON.stringify(tsconfig, null, 2) + '\n',
  );

  // ── eslint.config.mjs ────────────────────────────────────────────────
  const eslintConfig = `import composeESLint from '@esphome/compose-eslint';

export default [
  ...composeESLint.recommended,
];
`;
  fs.writeFileSync(path.join(targetDir, 'eslint.config.mjs'), eslintConfig);

  // ── source files ───────────────────────────────────────────────────────
  if (isLibrary) {
    // Library: create src/ directory with a starter component
    fs.mkdirSync(path.join(targetDir, 'src'), { recursive: true });
    const indexTs = `/**
 * ${name} — ESPCompose component library.
 *
 * Export your components from this file.
 */
export { MyComponent } from './MyComponent';
`;
    fs.writeFileSync(path.join(targetDir, 'src', 'index.ts'), indexTs);

    const componentTsx = `import type { EspComposeElement } from '@esphome/compose';
import { createIntentComponent, LVGL_INTENTS } from '@esphome/compose';

interface MyComponentProps {
  text?: string;
}

export const MyComponent = createIntentComponent(
  (props: MyComponentProps): EspComposeElement => {
    return (
      <lvgl-label text={props.text ?? 'Hello from ${name}!'} />
    );
  },
  {
    intents: [LVGL_INTENTS.WIDGET] as const,
    allowedChildIntents: [] as const,
  },
);
`;
    fs.writeFileSync(path.join(targetDir, 'src', 'MyComponent.tsx'), componentTsx);
  } else {
    // Device project: single index.tsx entry file
    const indexTsx = `export default (
  <esphome name="${name}" comment="An ESPHome Compose device">
    <esp32 board="${board}" framework={{ type: 'esp-idf' }} />
    <wifi ssid="!secret wifi_ssid" password="!secret wifi_password" />
    <api />
    <ota platform="esphome" />
    <logger level="DEBUG" />
  </esphome>
);
`;
    fs.writeFileSync(path.join(targetDir, 'index.tsx'), indexTsx);
  }

  // ── .gitignore ────────────────────────────────────────────────────────
  const gitignore = isLibrary
    ? `node_modules/
dist/
.espcompose-build/
`
    : `node_modules/
.espcompose/
.espcompose-build/
dist/
`;
  fs.writeFileSync(path.join(targetDir, '.gitignore'), gitignore);

  console.log(`✓ Created ${isLibrary ? 'library' : 'project'} "${name}" in ./${name}/\n`);
  console.log('Next steps:');
  console.log(`  cd ${name}`);
  console.log('  npm install');
  if (isLibrary) {
    console.log('  npx espcompose library');
  } else {
    console.log('  npx espcompose transpile');
  }
}
