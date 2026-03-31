import { createRuleTester } from './shared-setup';
import rule from '../src/rules/no-node-in-reactive';

const ruleTester = createRuleTester();

ruleTester.run('no-node-in-reactive', rule, {
  valid: [
    {
      name: 'Node globals at module top level',
      code: `const name = process.env.DEVICE_NAME;`,
    },
    {
      name: 'Node globals inside build.run()',
      code: `
        const env = build.run(() => {
          return process.env;
        });
      `,
    },
    {
      name: 'Non-Node identifiers in reactive context',
      code: `
        const status = bind.memo(() => light.isOn() ? 'ON' : 'OFF');
      `,
    },
    {
      name: 'process as property name (not global)',
      code: `
        const x = bind.memo(() => obj.process);
      `,
    },
  ],
  invalid: [
    {
      name: 'process in bind.memo()',
      code: `
        const name = bind.memo(() => process.env.NAME);
      `,
      errors: [{ messageId: 'nodeInReactive' }],
    },
    {
      name: 'require in bind.effect()',
      code: `
        bind.effect(() => {
          const fs = require('fs');
        });
      `,
      errors: [{ messageId: 'nodeInReactive' }],
    },
    {
      name: '__dirname in JSX prop arrow',
      code: `
        const App = () => <label text={() => __dirname} />;
      `,
      errors: [{ messageId: 'nodeInReactive' }],
    },
    {
      name: 'Buffer in bind.memo()',
      code: `
        const data = bind.memo(() => Buffer.from('test'));
      `,
      errors: [{ messageId: 'nodeInReactive' }],
    },
  ],
});
