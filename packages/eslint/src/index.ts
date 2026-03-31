/**
 * ESPHome TSX ESLint Plugin
 *
 * This package provides custom ESLint rules for enforcing
 * best practices and constraints in ESPHome TSX projects.
 */

import tseslint from 'typescript-eslint';
import type { ESLint, Linter } from 'eslint';
import jsxChildrenIntents from './rules/jsx-children-intents';
import noNestedFunctions from './rules/no-nested-functions';
import noBuildInComponent from './rules/no-build-in-component';
import noNodeInReactive from './rules/no-node-in-reactive';
import requireDefineProject from './rules/require-define-project';
import noUntrackedSignal from './rules/no-untracked-signal';
import noUnsupportedTriggerBody from './rules/no-unsupported-trigger-body';

const plugin: ESLint.Plugin = {
  meta: {
    name: '@esphome/compose-eslint',
    version: '0.0.1',
  },
  rules: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'jsx-children-intents': jsxChildrenIntents as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'no-nested-functions': noNestedFunctions as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'no-build-in-component': noBuildInComponent as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'no-node-in-reactive': noNodeInReactive as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'require-define-project': requireDefineProject as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'no-untracked-signal': noUntrackedSignal as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'no-unsupported-trigger-body': noUnsupportedTriggerBody as any,
  },
};

/**
 * Flat-config-compatible recommended configuration.
 *
 * Includes typescript-eslint recommended rules and JSX parser options
 * suitable for ESPHome Compose TSX projects.
 */
const recommended: Linter.Config[] = [
  ...tseslint.configs.recommended as Linter.Config[],
  {
    plugins: {
      '@esphome/compose-eslint': plugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        projectService: {
          allowDefaultProject: ['*.mjs'],
        },
      },
    },
    rules: {
      // Demote to warning: top-level function declarations (which the
      // compiler transforms into ESPHome <script> elements) appear unused
      // to static analysis but are consumed at compile time.
      '@typescript-eslint/no-unused-vars': 'warn',

      // Enforce valid parent-child component nesting based on declared intents.
      '@esphome/compose-eslint/jsx-children-intents': 'error',

      // Prevent nested function declarations — only top-level functions become
      // ESPHome scripts; nested ones are silently ignored by the compiler.
      '@esphome/compose-eslint/no-nested-functions': 'error',

      // Phase enforcement: build.run() must be at module top level.
      '@esphome/compose-eslint/no-build-in-component': 'error',

      // Phase enforcement: no Node.js APIs in reactive contexts.
      '@esphome/compose-eslint/no-node-in-reactive': 'warn',

      // Require defineProject() wrapper for default exports (TSX only).
      '@esphome/compose-eslint/require-define-project': 'off',

      // Warn when reactive Signal properties are accessed outside reactive contexts.
      '@esphome/compose-eslint/no-untracked-signal': 'warn',

      // Validate trigger handler bodies contain only ESPHome-compatible constructs.
      '@esphome/compose-eslint/no-unsupported-trigger-body': 'error',
    },
  },
  {
    // require-define-project only applies to TSX project files.
    files: ['**/*.tsx'],
    rules: {
      '@esphome/compose-eslint/require-define-project': 'error',
    },
  },
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/.espcompose/**'],
  },
];

export interface ComposeESLint {
  plugin: ESLint.Plugin;
  recommended: Linter.Config[];
}

const composeESLint: ComposeESLint = {
  plugin,
  recommended,
};

export default composeESLint;
