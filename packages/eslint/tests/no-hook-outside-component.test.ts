import { createRuleTester } from './shared-setup';
import rule from '../src/rules/no-hook-outside-component';

const ruleTester = createRuleTester();

ruleTester.run('no-hook-outside-component', rule, {
  valid: [
    {
      name: 'useHAEntity inside function component',
      code: `
        function App() {
          const light = useHAEntity('light.kitchen');
          return <div />;
        }
      `,
    },
    {
      name: 'useRef inside arrow function component',
      code: `
        const App = () => {
          const display = useRef();
          return <div />;
        };
      `,
    },
    {
      name: 'useScript inside function component',
      code: `
        function App() {
          const script = useScript(async () => {});
          return <div />;
        }
      `,
    },
    {
      name: 'useMemo inside function component',
      code: `
        function App() {
          const val = useMemo(() => 42);
          return <div />;
        }
      `,
    },
    {
      name: 'unrelated function calls at module level are fine',
      code: `
        const x = someFunction({ device: 'test' });
        const y = config.load();
      `,
    },
    {
      name: 'hooks inside nested function (e.g. helper component) are fine',
      code: `
        function outer() {
          const ref = useRef();
        }
      `,
    },
  ],
  invalid: [
    {
      name: 'useHAEntity at module top level',
      code: `const light = useHAEntity('light.kitchen');`,
      errors: [{ messageId: 'hookOutsideComponent', data: { hookName: 'useHAEntity' } }],
    },
    {
      name: 'useRef at module top level',
      code: `const display = useRef();`,
      errors: [{ messageId: 'hookOutsideComponent', data: { hookName: 'useRef' } }],
    },
    {
      name: 'useScript at module top level',
      code: `const s = useScript(async () => {});`,
      errors: [{ messageId: 'hookOutsideComponent', data: { hookName: 'useScript' } }],
    },
    {
      name: 'useMemo at module top level',
      code: `const val = useMemo(() => 42);`,
      errors: [{ messageId: 'hookOutsideComponent', data: { hookName: 'useMemo' } }],
    },
    {
      name: 'useEffect at module top level',
      code: `useEffect(() => { console.log('hi'); });`,
      errors: [{ messageId: 'hookOutsideComponent', data: { hookName: 'useEffect' } }],
    },
  ],
});
