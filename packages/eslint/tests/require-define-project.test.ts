import { createRuleTester } from './shared-setup';
import rule from '../src/rules/require-define-project';

const ruleTester = createRuleTester();

ruleTester.run('require-define-project', rule, {
  valid: [
    // ─── defineProject call ──────────────────────────────────────────────
    {
      name: 'defineProject with device prop',
      code: `export default defineProject({ device: (<esphome />) });`,
    },
    {
      name: 'defineProject via member expression',
      code: `export default sdk.defineProject({ device: (<esphome />) });`,
    },
    // ─── Non-default exports are fine ────────────────────────────────────
    {
      name: 'named export of JSX is allowed',
      code: `export const tree = (<esphome />);`,
    },
    {
      name: 'no default export at all',
      code: `const x = 1;`,
    },
  ],

  invalid: [
    // ─── Bare JSX element ────────────────────────────────────────────────
    {
      name: 'bare JSX element',
      code: `export default (<esphome name="test" />);`,
      errors: [{ messageId: 'requireDefineProject' }],
    },
    // ─── IIFE ────────────────────────────────────────────────────────────
    {
      name: 'IIFE returning JSX',
      code: `export default (() => { return (<esphome />); })();`,
      errors: [{ messageId: 'requireDefineProject' }],
    },
    // ─── Identifier (variable) ───────────────────────────────────────────
    {
      name: 'identifier reference',
      code: `const tree = (<esphome />); export default tree;`,
      errors: [{ messageId: 'requireDefineProject' }],
    },
    // ─── Wrong function call ─────────────────────────────────────────────
    {
      name: 'other function call',
      code: `export default createProject({ device: (<esphome />) });`,
      errors: [{ messageId: 'requireDefineProject' }],
    },
  ],
});
