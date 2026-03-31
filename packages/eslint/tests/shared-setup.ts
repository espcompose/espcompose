import { RuleTester } from '@typescript-eslint/rule-tester';
import * as tseslint from 'typescript-eslint';
import { describe, it, afterAll } from 'vitest';
import path from 'path';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

export function createRuleTester(): RuleTester {
  return new RuleTester({
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  });
}

/**
 * Create a RuleTester with full TypeScript type information.
 * Tests using this tester can detect Signal<T> types via the checker.
 */
export function createTypedRuleTester(): RuleTester {
  return new RuleTester({
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        projectService: {
          allowDefaultProject: ['*.tsx'],
          defaultProject: path.resolve(__dirname, '..', 'tsconfig.check.json'),
        },
        tsconfigRootDir: path.resolve(__dirname, '..'),
      },
    },
  });
}
