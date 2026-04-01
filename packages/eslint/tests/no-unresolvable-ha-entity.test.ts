import { createRuleTester, createTypedRuleTester } from './shared-setup';
import rule from '../src/rules/no-unresolvable-ha-entity';

// ── Non-typed tests (syntactic checks) ────────────────────────────────────

const ruleTester = createRuleTester();

ruleTester.run('no-unresolvable-ha-entity (syntactic)', rule, {
  valid: [
    {
      name: 'string literal entity ID',
      code: `const light = useHAEntity('light.kitchen');`,
    },
    {
      name: 'template literal with no expressions',
      code: 'const light = useHAEntity(`light.kitchen`);',
    },
    {
      name: 'variable with domain hint',
      code: `const light = useHAEntity(props.entity, { domain: 'light' });`,
    },
    {
      name: 'variable with domain hint — switch',
      code: `const sw = useHAEntity(id, { domain: 'switch' });`,
    },
    {
      name: 'variable with domain hint — sensor',
      code: `const s = useHAEntity(id, { domain: 'sensor' });`,
    },
    {
      name: 'not a useHAEntity call',
      code: `const x = someOtherHook(id);`,
    },
    {
      name: 'useHAEntity with no arguments (other rule catches this)',
      code: `const x = useHAEntity();`,
    },
  ],
  invalid: [
    {
      name: 'variable argument without domain hint',
      code: `const light = useHAEntity(props.entity);`,
      errors: [{ messageId: 'unresolvableDomain' }],
    },
    {
      name: 'identifier argument without domain hint',
      code: `const light = useHAEntity(entityId);`,
      errors: [{ messageId: 'unresolvableDomain' }],
    },
    {
      name: 'template literal with expression (dynamic)',
      code: 'const light = useHAEntity(`light.${name}`);',
      errors: [{ messageId: 'unresolvableDomain' }],
    },
    {
      name: 'second argument is not a domain hint object',
      code: `const light = useHAEntity(id, "light");`,
      errors: [{ messageId: 'unresolvableDomain' }],
    },
    {
      name: 'second argument object missing domain key',
      code: `const light = useHAEntity(id, { type: 'light' });`,
      errors: [{ messageId: 'unresolvableDomain' }],
    },
    {
      name: 'domain hint with unknown domain',
      code: `const x = useHAEntity(id, { domain: 'unknown_thing' });`,
      errors: [{ messageId: 'unresolvableDomain' }],
    },
  ],
});

// ── Type-aware tests (template literal type inference) ─────────────────────

const typedRuleTester = createTypedRuleTester();

typedRuleTester.run('no-unresolvable-ha-entity (typed)', rule, {
  valid: [
    {
      name: 'constrained template literal type infers domain',
      code: `
        import { useHAEntity } from '@esphome/compose';
        function App(props: { entity: \`light.\${string}\` }) {
          const light = useHAEntity(props.entity);
          return null;
        }
      `,
    },
    {
      name: 'domain hint overload with variable',
      code: `
        import { useHAEntity } from '@esphome/compose';
        function App(props: { entity: string }) {
          const light = useHAEntity(props.entity, { domain: 'light' });
          return null;
        }
      `,
    },
    {
      name: 'static string literal',
      code: `
        import { useHAEntity } from '@esphome/compose';
        function App() {
          const light = useHAEntity('light.kitchen');
          return null;
        }
      `,
    },
  ],
  invalid: [
    {
      name: 'plain string type — domain cannot be inferred',
      code: `
        import { useHAEntity } from '@esphome/compose';
        function App(props: { entity: string }) {
          const light = useHAEntity(props.entity);
          return null;
        }
      `,
      errors: [{ messageId: 'unresolvableDomain' }],
    },
  ],
});
