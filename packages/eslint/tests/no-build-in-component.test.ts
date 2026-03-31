import { createRuleTester } from './shared-setup';
import rule from '../src/rules/no-build-in-component';

const ruleTester = createRuleTester();

ruleTester.run('no-build-in-component', rule, {
  valid: [
    {
      name: 'build.run() at module top level',
      code: `const env = build.run(() => ({ name: 'device' }));`,
    },
    {
      name: 'build.run() at module top level with import',
      code: `
        import { build } from '@esphome/compose';
        const env = build.run(() => process.env);
      `,
    },
    {
      name: 'other member calls inside components are fine',
      code: `
        function App() {
          const x = bind.haEntity('light.kitchen');
          return <div />;
        }
      `,
    },
  ],
  invalid: [
    {
      name: 'build.run() inside function component',
      code: `
        function App() {
          const env = build.run(() => process.env);
          return <div />;
        }
      `,
      errors: [{ messageId: 'buildInComponent' }],
    },
    {
      name: 'build.run() inside arrow function component',
      code: `
        const App = () => {
          const env = build.run(() => ({ name: 'device' }));
          return <div />;
        };
      `,
      errors: [{ messageId: 'buildInComponent' }],
    },
    {
      name: 'build.run() nested inside helper function',
      code: `
        function getConfig() {
          return build.run(() => process.env);
        }
      `,
      errors: [{ messageId: 'buildInComponent' }],
    },
  ],
});
