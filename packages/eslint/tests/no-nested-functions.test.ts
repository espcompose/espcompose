import { RuleTester } from '@typescript-eslint/rule-tester';
import { describe, it, afterAll } from 'vitest';
import rule from '../src/rules/no-nested-functions';

// Wire RuleTester into vitest
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
  },
});

ruleTester.run('no-nested-functions', rule, {
  valid: [
    // ─── Top-level function declarations are allowed ─────────────────────
    {
      name: 'top-level function declaration',
      code: `function greet() { console.log('hi'); }`,
    },
    {
      name: 'multiple top-level function declarations',
      code: `
        function greet() { console.log('hi'); }
        function farewell() { console.log('bye'); }
      `,
    },
    // ─── Arrow functions inside other functions are fine ──────────────────
    {
      name: 'arrow function inside component',
      code: `
        const UI = () => {
          const handler = () => { doSomething(); };
          return <button onPress={handler} />;
        };
      `,
    },
    {
      name: 'inline arrow in trigger prop',
      code: `
        function greet() {
          const x = () => 42;
        }
      `,
    },
    // ─── Top-level arrow / const function expressions are allowed ────────
    {
      name: 'top-level arrow function component',
      code: `const UI = (props) => { return <div />; };`,
    },
  ],

  invalid: [
    // ─── Nested function declarations are prohibited ─────────────────────
    {
      name: 'function inside arrow component',
      code: `
        const UI = () => {
          function toggle() { light.toggle(); }
          return <button onPress={toggle} />;
        };
      `,
      errors: [{ messageId: 'nestedFunction', data: { name: 'toggle' } }],
    },
    {
      name: 'function inside function',
      code: `
        function outer() {
          function inner() { delay(100); }
          inner();
        }
      `,
      errors: [{ messageId: 'nestedFunction', data: { name: 'inner' } }],
    },
    {
      name: 'function inside function expression',
      code: `
        const outer = function() {
          function inner() {}
        };
      `,
      errors: [{ messageId: 'nestedFunction', data: { name: 'inner' } }],
    },
    {
      name: 'deeply nested function declaration',
      code: `
        const App = () => {
          const Nested = () => {
            function deep() { delay(100); }
            return <button onPress={deep} />;
          };
          return <Nested />;
        };
      `,
      errors: [{ messageId: 'nestedFunction', data: { name: 'deep' } }],
    },
  ],
});
