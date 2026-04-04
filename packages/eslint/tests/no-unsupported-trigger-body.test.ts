import { createRuleTester, createTypedRuleTester } from './shared-setup';
import rule from '../src/rules/no-unsupported-trigger-body';

// ── Untyped tester (structural construct validation) ────────────────────────
// Without type info, ALL calls are allowed (graceful degradation).
// Only structural constructs (var decl, return, switch, etc.) are flagged.
const ruleTester = createRuleTester();

ruleTester.run('no-unsupported-trigger-body', rule, {
  valid: [
    // ─── Any call is allowed without type info ───────────────────────────
    {
      name: 'ref.toggle() allowed without types',
      code: `<button onPress={() => { lightRef.toggle(); }} />`,
    },
    {
      name: 'console.log() allowed without types (graceful degradation)',
      code: `<button onPress={() => { console.log("test"); }} />`,
    },
    {
      name: 'Math.min() allowed without types (graceful degradation)',
      code: `<button onPress={() => { Math.min(1, 2); }} />`,
    },
    {
      name: 'await allowed without types',
      code: `<button onPress={async () => { await delay(500); }} />`,
    },
    {
      name: 'createScript body with calls',
      code: `createScript(async () => { await delay(1000); lightRef.toggle(); });`,
    },

    // ─── Control flow ────────────────────────────────────────────────────
    {
      name: 'if/else with actions',
      code: `<button onPress={() => { if (true) { lightRef.toggle(); } else { switchRef.turnOff(); } }} />`,
    },
    {
      name: 'while loop with actions',
      code: `<button onPress={() => { while (true) { lightRef.toggle(); } }} />`,
    },
    {
      name: 'simple counted for loop',
      code: `<button onPress={() => { for (let i = 0; i < 5; i++) { lightRef.toggle(); } }} />`,
    },

    // ─── Not a trigger handler context — ignored ─────────────────────────
    {
      name: 'arrow in non-JSX context (not checked)',
      code: `const fn = () => { const x = 5; };`,
    },
    {
      name: 'arrow in regular function call (not checked)',
      code: `someFunction(() => { const x = 5; });`,
    },
  ],

  invalid: [
    // ─── Variable declarations ───────────────────────────────────────────
    {
      name: 'const in trigger body',
      code: `<button onPress={() => { const x = 5; }} />`,
      errors: [{ messageId: 'unsupportedConstruct' }],
    },
    {
      name: 'let in trigger body',
      code: `<button onPress={() => { let y = "hello"; }} />`,
      errors: [{ messageId: 'unsupportedConstruct' }],
    },

    // ─── Return statements ───────────────────────────────────────────────
    {
      name: 'return in trigger body',
      code: `<button onPress={() => { return; }} />`,
      errors: [{ messageId: 'unsupportedConstruct' }],
    },

    // ─── Switch statements ───────────────────────────────────────────────
    {
      name: 'switch in trigger body',
      code: `<button onPress={() => { switch (x) { case 1: break; } }} />`,
      errors: [{ messageId: 'unsupportedConstruct' }],
    },

    // ─── Try/catch ───────────────────────────────────────────────────────
    {
      name: 'try/catch in trigger body',
      code: `<button onPress={() => { try { foo(); } catch (e) {} }} />`,
      errors: [{ messageId: 'unsupportedConstruct' }],
    },

    // ─── Throw ───────────────────────────────────────────────────────────
    {
      name: 'throw in trigger body',
      code: `<button onPress={() => { throw new Error(); }} />`,
      errors: [{ messageId: 'unsupportedConstruct' }],
    },

    // ─── Do/while ────────────────────────────────────────────────────────
    {
      name: 'do/while in trigger body',
      code: `<button onPress={() => { do { x++; } while (true); }} />`,
      errors: [{ messageId: 'unsupportedConstruct' }],
    },

    // ─── For-in / for-of ─────────────────────────────────────────────────
    {
      name: 'for-in in trigger body',
      code: `<button onPress={() => { for (const k in obj) { foo(); } }} />`,
      errors: [{ messageId: 'unsupportedConstruct' }],
    },
    {
      name: 'for-of in trigger body',
      code: `<button onPress={() => { for (const v of arr) { bar(); } }} />`,
      errors: [{ messageId: 'unsupportedConstruct' }],
    },

    // ─── Complex for-loops ───────────────────────────────────────────────
    {
      name: 'complex for-loop (non-standard init)',
      code: `<button onPress={() => { for (let i = 1; i < 5; i++) { lightRef.toggle(); } }} />`,
      errors: [{ messageId: 'unsupportedConstruct' }],
    },

    // ─── Nested in createScript ──────────────────────────────────────────
    {
      name: 'variable in createScript body',
      code: `createScript(async () => { const temp = 42; });`,
      errors: [{ messageId: 'unsupportedConstruct' }],
    },

    // ─── Multiple errors ─────────────────────────────────────────────────
    {
      name: 'multiple unsupported constructs',
      code: `<button onPress={() => { const x = 5; return; }} />`,
      errors: [
        { messageId: 'unsupportedConstruct' },
        { messageId: 'unsupportedConstruct' },
      ],
    },
  ],
});

// ── Typed tester (action brand detection) ───────────────────────────────────
// With type info, calls are checked for ACTION_BRAND phantom property.
const typedTester = createTypedRuleTester();

typedTester.run('no-unsupported-trigger-body (type-aware)', rule, {
  valid: [
    {
      name: 'Ref action — branded',
      filename: 'test.tsx',
      code: `
        import type { Ref } from '@espcompose/core';
        declare const lightRef: Ref<object>;
        <button onPress={() => { lightRef.turnOn(); }} />;
      `,
    },
    {
      name: 'delay() — branded',
      filename: 'test.tsx',
      code: `
        import { delay } from '@espcompose/core';
        <button onPress={async () => { await delay(500); }} />;
      `,
    },
    {
      name: 'logger.log() — branded',
      filename: 'test.tsx',
      code: `
        import { logger } from '@espcompose/core';
        <button onPress={() => { logger.log("hello"); }} />;
      `,
    },
    {
      name: 'theme.select() — branded',
      filename: 'test.tsx',
      code: `
        import { theme } from '@espcompose/core';
        <button onPress={() => { theme.select("dark"); }} />;
      `,
    },
    {
      name: 'ScriptHandle.execute() — branded',
      filename: 'test.tsx',
      code: `
        import type { ScriptHandle } from '@espcompose/core/internals';
        declare const myScript: ScriptHandle;
        <button onPress={() => { myScript.execute(); }} />;
      `,
    },
    {
      name: 'SwitchBinding.toggle() — branded',
      filename: 'test.tsx',
      code: `
        import type { SwitchBinding } from '@espcompose/core/internals';
        declare const sw: SwitchBinding;
        <button onPress={() => { sw.toggle(); }} />;
      `,
    },
    {
      name: 'multiple branded calls',
      filename: 'test.tsx',
      code: `
        import type { Ref } from '@espcompose/core';
        import { delay, logger } from '@espcompose/core';
        declare const lightRef: Ref<object>;
        <button onPress={async () => { lightRef.turnOn(); await delay(500); logger.log("done"); }} />;
      `,
    },
  ],

  invalid: [
    {
      name: 'console.log() — not branded',
      filename: 'test.tsx',
      code: `<button onPress={() => { console.log("test"); }} />`,
      errors: [{ messageId: 'unsupportedCall' }],
    },
    {
      name: 'Math.min() — not branded',
      filename: 'test.tsx',
      code: `<button onPress={() => { Math.min(1, 2); }} />`,
      errors: [{ messageId: 'unsupportedCall' }],
    },
    {
      name: 'unknown function call — not branded',
      filename: 'test.tsx',
      code: `
        declare function doSomething(): void;
        <button onPress={() => { doSomething(); }} />;
      `,
      errors: [{ messageId: 'unsupportedCall' }],
    },
  ],
});
