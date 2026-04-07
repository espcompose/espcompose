import { createRuleTester } from './shared-setup';
import rule from '../src/rules/no-reactive-map-object';

const ruleTester = createRuleTester();

ruleTester.run('no-reactive-map-object', rule, {
  valid: [
    // ── Single-value returns (the intended usage) ──────────────────────
    {
      name: 'arrow expression returning a function call',
      code: `useReactiveMap(value, (v) => themeLeaf('spacing', v));`,
    },
    {
      name: 'arrow expression returning a primitive',
      code: `useReactiveMap(value, (v) => v.toUpperCase());`,
    },
    {
      name: 'arrow block body returning a function call',
      code: `
        useReactiveMap(value, (v) => {
          const x = lookup(v);
          return x;
        });
      `,
    },
    {
      name: 'arrow block body returning a string',
      code: `
        useReactiveMap(value, (v) => {
          return 'hello';
        });
      `,
    },
    {
      name: 'named function reference returning scalar',
      code: `
        function resolve(v) { return themeLeaf('spacing', v); }
        useReactiveMap(value, resolve);
      `,
    },
    {
      name: 'arrow variable reference returning scalar',
      code: `
        const resolve = (v) => themeLeaf('spacing', v);
        useReactiveMap(value, resolve);
      `,
    },
    {
      name: 'unrelated function call is not flagged',
      code: `someOtherFunction(value, (v) => ({ a: 1 }));`,
    },
    {
      name: 'no second argument',
      code: `useReactiveMap(value);`,
    },
    {
      name: 'block body returning identifier that is not an object',
      code: `
        useReactiveMap(value, (v) => {
          const num = compute(v);
          return num;
        });
      `,
    },
  ],
  invalid: [
    // ── Case 1: Arrow expression body returning object literal ─────────
    {
      name: 'arrow expression body returns object literal',
      code: `useReactiveMap(value, (v) => ({ bg: themeLeaf('colors', v, 'bg') }));`,
      errors: [{ messageId: 'reactiveMapObject' }],
    },
    // ── Case 2: Block body with return { ... } ─────────────────────────
    {
      name: 'arrow block body returns object literal',
      code: `
        useReactiveMap(value, (v) => {
          return { bg: themeLeaf('colors', v, 'bg'), text: themeLeaf('colors', v, 'text') };
        });
      `,
      errors: [{ messageId: 'reactiveMapObject' }],
    },
    {
      name: 'function expression block body returns object literal',
      code: `
        useReactiveMap(value, function(v) {
          return { bg: themeLeaf('colors', v, 'bg') };
        });
      `,
      errors: [{ messageId: 'reactiveMapObject' }],
    },
    {
      name: 'block body with conditional returns — one branch returns object',
      code: `
        useReactiveMap(value, (v) => {
          if (v === 'a') {
            return { bg: 'red' };
          }
          return themeLeaf('colors', v);
        });
      `,
      errors: [{ messageId: 'reactiveMapObject' }],
    },
    // ── Case 3: Block body returns identifier assigned to object ───────
    {
      name: 'block body returns variable initialized to object',
      code: `
        useReactiveMap(value, (v) => {
          const result = { bg: themeLeaf('colors', v, 'bg') };
          return result;
        });
      `,
      errors: [{ messageId: 'reactiveMapObject' }],
    },
    {
      name: 'block body returns variable initialized to object via let',
      code: `
        useReactiveMap(value, (v) => {
          let out = { x: 1 };
          return out;
        });
      `,
      errors: [{ messageId: 'reactiveMapObject' }],
    },
    // ── Case 4: Named function reference ───────────────────────────────
    {
      name: 'named function declaration returns object',
      code: `
        function resolve(v) {
          return { bg: themeLeaf('colors', v, 'bg') };
        }
        useReactiveMap(value, resolve);
      `,
      errors: [{ messageId: 'reactiveMapObject' }],
    },
    {
      name: 'arrow variable returns object — referenced by name',
      code: `
        const resolve = (v) => ({ bg: themeLeaf('colors', v, 'bg') });
        useReactiveMap(value, resolve);
      `,
      errors: [{ messageId: 'reactiveMapObject' }],
    },
    {
      name: 'function expression variable returns object — referenced by name',
      code: `
        const resolve = function(v) {
          return { bg: 1 };
        };
        useReactiveMap(value, resolve);
      `,
      errors: [{ messageId: 'reactiveMapObject' }],
    },
    // ── Edge: object wrapped in TSAsExpression ──────────────────────────
    {
      name: 'arrow expression body returns object with as-cast',
      code: `useReactiveMap(value, (v) => ({ bg: 1 } as any));`,
      errors: [{ messageId: 'reactiveMapObject' }],
    },
  ],
});
