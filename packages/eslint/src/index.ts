/**
 * ESPHome TSX ESLint Plugin
 *
 * This package provides custom ESLint rules for enforcing
 * best practices and constraints in ESPHome TSX projects.
 */

import tseslint from 'typescript-eslint';
import type { ESLint, Linter } from 'eslint';
import jsxChildrenIntents from './rules/jsx-children-intents';

const plugin: ESLint.Plugin = {
  meta: {
    name: '@esphome/compose-eslint',
    version: '0.0.1',
  },
  rules: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'jsx-children-intents': jsxChildrenIntents as any,
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
      },
    },
    rules: {
      // Demote to warning: the JSX factory import (ESPCompose) and top-level
      // function declarations (which the compiler transforms into ESPHome
      // <script> elements) appear unused to static analysis but are consumed
      // at compile time.
      '@typescript-eslint/no-unused-vars': ['warn', {
        varsIgnorePattern: '^ESPCompose$',
      }],

      // Enforce valid parent-child component nesting based on declared intents.
      '@esphome/compose-eslint/jsx-children-intents': 'error',
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
