import { describe, it } from 'vitest';
import { createRuleTester, createTypedRuleTester } from './shared-setup';
import rule from '../src/rules/no-untracked-signal';

const ruleTester = createRuleTester();

describe('no-untracked-signal', () => {
  // ── Heuristic mode (no type info) ──────────────────────────────────────
  ruleTester.run('no-untracked-signal (heuristic)', rule, {
    valid: [
      {
        name: 'direct passthrough in JSX attribute',
        code: `
          const light = useHAEntity('light.office');
          <label text={light.stateText} />;
        `,
      },
      {
        name: 'ternary with Signal in JSX attribute (auto-transformed)',
        code: `
          const light = useHAEntity('light.office');
          <label text={light.isOn ? "On" : "Off"} />;
        `,
      },
      {
        name: 'Signal inside useMemo',
        code: `
          const light = useHAEntity('light.office');
          const status = useMemo(() => light.isOn ? "On" : "Off");
        `,
      },
      {
        name: 'Signal inside useEffect',
        code: `
          const light = useHAEntity('light.office');
          useEffect(() => { console.log(light.isOn); });
        `,
      },
      {
        name: 'non-signal property access (actions like toggle)',
        code: `
          const light = useHAEntity('light.office');
          const toggle = light.toggle;
        `,
      },
      {
        name: 'non-entity variable property access',
        code: `
          const obj = { isOn: true };
          const val = obj.isOn ? "A" : "B";
        `,
      },
      {
        name: 'useHAEntity with Signal inside useMemo',
        code: `
          const sensor = useHAEntity('sensor.temp');
          const temp = useMemo(() => sensor.value > 72 ? "Hot" : "Cold");
        `,
      },
    ],
    invalid: [
      {
        name: 'Signal extracted to variable at module level',
        code: `
          const light = useHAEntity('light.office');
          const status = light.isOn ? "On" : "Off";
        `,
        errors: [{ messageId: 'untrackedSignal', data: { prop: '.isOn' } }],
      },
      {
        name: 'Signal value assigned to variable',
        code: `
          const sensor = useHAEntity('sensor.temp');
          const temp = sensor.value;
        `,
        errors: [{ messageId: 'untrackedSignal', data: { prop: '.value' } }],
      },
      {
        name: 'useHAEntity Signal extracted to variable',
        code: `
          const light = useHAEntity('light.office');
          const current = light.brightness;
        `,
        errors: [{ messageId: 'untrackedSignal', data: { prop: '.brightness' } }],
      },
      {
        name: 'multiple Signal accesses outside context',
        code: `
          const light = useHAEntity('light.office');
          const a = light.isOn;
          const b = light.stateText;
        `,
        errors: [
          { messageId: 'untrackedSignal', data: { prop: '.isOn' } },
          { messageId: 'untrackedSignal', data: { prop: '.stateText' } },
        ],
      },
    ],
  });

  // ── Type-aware mode (with TypeScript checker) ────────────────────────────
  const typedTester = createTypedRuleTester();

  typedTester.run('no-untracked-signal (type-aware)', rule, {
    valid: [
      {
        name: 'Signal in useMemo — type-aware',
        filename: 'test.tsx',
        code: `
          import type { Signal } from '@espcompose/core';
          import { useMemo } from '@espcompose/core';
          declare const paddingX: Signal<number>;
          const width = useMemo(() => paddingX * 2 + 80);
        `,
      },
      {
        name: 'Signal in JSX attribute — type-aware',
        filename: 'test.tsx',
        code: `
          import type { Signal } from '@espcompose/core';
          declare const paddingX: Signal<number>;
          <div width={paddingX * 2 + 80} />;
        `,
      },
      {
        name: 'plain number in binary expression — no false positive',
        filename: 'test.tsx',
        code: `
          const x = 10;
          const width = x * 2 + 80;
        `,
      },
      {
        name: 'Signal direct passthrough via ?? — type-aware',
        filename: 'test.tsx',
        code: `
          import type { Signal } from '@espcompose/core';
          declare const height: Signal<number>;
          declare const override: number | undefined;
          const h = override ?? height;
        `,
      },
      {
        name: 'Signal inside useEffect — type-aware',
        filename: 'test.tsx',
        code: `
          import type { Signal } from '@espcompose/core';
          import { useEffect } from '@espcompose/core';
          declare const temp: Signal<number>;
          useEffect(() => { console.log(temp > 72); });
        `,
      },
    ],
    invalid: [
      {
        name: 'Signal in binary expression outside reactive context',
        filename: 'test.tsx',
        code: `
          import type { Signal } from '@espcompose/core';
          declare const paddingX: Signal<number>;
          const width = paddingX * 2 + 80;
        `,
        errors: [{ messageId: 'untrackedSignalType' }],
      },
      {
        name: 'Signal member access in binary expression',
        filename: 'test.tsx',
        code: `
          import type { Signal } from '@espcompose/core';
          declare const dims: { paddingX: Signal<number> };
          const width = dims.paddingX * 2 + 80;
        `,
        errors: [{ messageId: 'untrackedSignalType' }],
      },
      {
        name: 'Signal used as ternary condition outside reactive context',
        filename: 'test.tsx',
        code: `
          import type { Signal } from '@espcompose/core';
          declare const isOn: Signal<boolean>;
          const label = isOn ? "On" : "Off";
        `,
        errors: [{ messageId: 'untrackedSignalType' }],
      },
      {
        name: 'Signal in template literal outside reactive context',
        filename: 'test.tsx',
        code: `
          import type { Signal } from '@espcompose/core';
          declare const temp: Signal<number>;
          const label = \`Temperature: \${temp}\`;
        `,
        errors: [{ messageId: 'untrackedSignalType' }],
      },
    ],
  });
});
