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
import noNodeInReactive from './rules/no-node-in-reactive';
import noUntrackedSignal from './rules/no-untracked-signal';
import noUnsupportedTriggerBody from './rules/no-unsupported-trigger-body';
import noHookOutsideComponent from './rules/no-hook-outside-component';
import noUnresolvableHaEntity from './rules/no-unresolvable-ha-entity';

const plugin: ESLint.Plugin = {
  meta: {
    name: '@espcompose/eslint',
    version: '0.0.1',
  },
  rules: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'jsx-children-intents': jsxChildrenIntents as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'no-nested-functions': noNestedFunctions as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'no-node-in-reactive': noNodeInReactive as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'no-untracked-signal': noUntrackedSignal as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'no-unsupported-trigger-body': noUnsupportedTriggerBody as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'no-hook-outside-component': noHookOutsideComponent as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'no-unresolvable-ha-entity': noUnresolvableHaEntity as any,
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
      '@espcompose/eslint': plugin,
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
      '@espcompose/eslint/jsx-children-intents': 'error',

      // Prevent nested function declarations — only top-level functions become
      // ESPHome scripts; nested ones are silently ignored by the compiler.
      '@espcompose/eslint/no-nested-functions': 'error',

      // Warn about Node.js APIs in reactive contexts — not available on device.
      '@espcompose/eslint/no-node-in-reactive': 'warn',

      // Warn when reactive Signal properties are accessed outside reactive contexts.
      '@espcompose/eslint/no-untracked-signal': 'warn',

      // Validate trigger handler bodies contain only ESPHome-compatible constructs.
      '@espcompose/eslint/no-unsupported-trigger-body': 'error',

      // Prevent useHAEntity() with variable args that can't resolve to a domain.
      '@espcompose/eslint/no-unresolvable-ha-entity': 'error',
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
