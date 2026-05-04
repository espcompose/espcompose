import { describe, it, expect } from 'vitest';
import { withScriptScope } from './useScript';
import { withOverlayScope } from './useOverlay';
import { withReactiveScope } from './useReactiveScope';
import { withGlobalScope } from './global-shared';
import { pushHookPath, popHookPath } from './useState';
import { useTransientOverlay } from './useTransientOverlay';
import type { TransientOverlayConfig } from './useTransientOverlay';
import type { IRActionNode } from '../ir/action-types';

// ── Helpers ─────────────────────────────────────────────────────────────────

function runInComponent<T>(componentName: string, fn: () => T): T {
  pushHookPath(componentName);
  try {
    return fn();
  } finally {
    popHookPath();
  }
}

function buildWithQueue(config: TransientOverlayConfig) {
  const stub = { type: 'div', props: {}, __source: undefined as never };
  let factoryCallCount = 0;
  const receivedSlotRanks: unknown[] = [];

  const { result: scopeResult, scripts } = withScriptScope(() => {
    const reactiveResult = withReactiveScope(() => {
      const globalResult = withGlobalScope(() => {
        const { result, overlays } = withOverlayScope(() => {
          runInComponent('TestComponent', () => {
            useTransientOverlay(config, (_ctrl, context) => {
              factoryCallCount++;
              receivedSlotRanks.push(context.slotRank);
              return stub;
            });
          });
        });
        return { result, overlays };
      });
      return globalResult;
    });
    return reactiveResult;
  });

  const overlays = scopeResult.result.result.overlays;
  const globals = scopeResult.result.globals;
  const components = scopeResult.components;

  return { overlays, scripts, factoryCallCount, receivedSlotRanks, components, globals };
}

// ── Tests ───────────────────────────────────────────────────────────────────

describe('useTransientOverlay', () => {
  it('throws when called outside a hook context', () => {
    expect(() =>
      useTransientOverlay({}, () => ({ type: 'div', props: {}, __source: undefined as never })),
    ).toThrow(/inside a function component/);
  });

  describe('single-slot (maxVisible: 1)', () => {
    it('creates one overlay definition at the specified zOrder', () => {
      const { overlays } = buildWithQueue({ zOrder: 100 });
      expect(overlays).toHaveLength(1);
      expect(overlays[0].zOrder).toBe(100);
      expect(overlays[0].instances).toHaveLength(1);
    });

    it('passes slotRank to the factory', () => {
      const { receivedSlotRanks } = buildWithQueue({ zOrder: 50 });
      expect(receivedSlotRanks).toHaveLength(1);
      expect(receivedSlotRanks[0]).toBeDefined();
    });

    it('defaults zOrder to 0', () => {
      const { overlays } = buildWithQueue({});
      expect(overlays[0].zOrder).toBe(0);
    });

    it('creates scripts for show/hide lifecycle', () => {
      const { scripts } = buildWithQueue({ autoHide: '3s' });
      // Should produce at least 2 scripts: show (with autoHide) + hide
      expect(scripts.length).toBeGreaterThanOrEqual(2);
    });

    it('uses restart mode by default (overflow: replace)', () => {
      const { scripts } = buildWithQueue({ autoHide: '3s', overflow: 'replace' });
      // The show script should be mode: restart
      const showScript = scripts.find(s => s.mode === 'restart');
      expect(showScript).toBeDefined();
    });

    it('uses queued mode for overflow: queue', () => {
      const { scripts } = buildWithQueue({ autoHide: '3s', overflow: 'queue' });
      const queuedScript = scripts.find(s => s.mode === 'queued');
      expect(queuedScript).toBeDefined();
    });

    it('sets maxRuns on queued script from queueLength', () => {
      const { scripts } = buildWithQueue({
        autoHide: '3s',
        overflow: 'queue',
        queueLength: 5,
      });
      const queuedScript = scripts.find(s => s.mode === 'queued');
      expect(queuedScript).toBeDefined();
      expect(queuedScript!.maxRuns).toBe(5);
    });

    it('uses single mode for overflow: drop', () => {
      const { scripts } = buildWithQueue({ autoHide: '3s', overflow: 'drop' });
      const singleScript = scripts.find(s => s.mode === 'single');
      expect(singleScript).toBeDefined();
    });
  });

  describe('multi-slot (maxVisible > 1)', () => {
    it('creates N overlay definitions', () => {
      const { overlays } = buildWithQueue({ maxVisible: 3, zOrder: 100 });
      expect(overlays).toHaveLength(3);
      overlays.forEach(o => expect(o.zOrder).toBe(100));
    });

    it('passes slotRank to each slot factory', () => {
      const { receivedSlotRanks } = buildWithQueue({ maxVisible: 3 });
      expect(receivedSlotRanks).toHaveLength(3);
      receivedSlotRanks.forEach(rank => expect(rank).toBeDefined());
    });

    it('each slot gets its own overlay instance', () => {
      const { overlays } = buildWithQueue({ maxVisible: 3 });
      expect(overlays).toHaveLength(3);
      overlays.forEach(o => expect(o.instances).toHaveLength(1));
    });

    it('creates per-slot scripts with restart mode', () => {
      const { scripts } = buildWithQueue({ maxVisible: 2, autoHide: '3s' });
      const restartScripts = scripts.filter(s => s.mode === 'restart');
      // At least 2 restart-mode scripts (one per slot's show lifecycle)
      expect(restartScripts.length).toBeGreaterThanOrEqual(2);
    });

    it('registers slot state globals (active array, seq array, counter)', () => {
      const { components } = buildWithQueue({ maxVisible: 3, autoHide: '3s' });
      const globalComponents = components.filter(c => c.section === 'globals');
      // 3 globals: slot_active (int[]), slot_seq (int[]), seq_counter (int)
      expect(globalComponents).toHaveLength(3);
      const activeGlobal = globalComponents.find(c => (c.config as Record<string, unknown>).initial_value === '{0,0,0}');
      expect(activeGlobal).toBeDefined();
      const counterGlobal = globalComponents.find(c =>
        (c.config as Record<string, unknown>).initial_value === '0' &&
        !(c.config as Record<string, unknown>).irType?.isArray,
      );
      expect(counterGlobal).toBeDefined();
    });

    it('creates a coordinator show script', () => {
      const { scripts } = buildWithQueue({ maxVisible: 2, autoHide: '3s' });
      // Coordinator show script should have an if-action (first-free dispatch)
      const coordScript = scripts.find(s =>
        s.then.some((a: IRActionNode) => a.kind === 'action:if') &&
        !s.then.some((a: IRActionNode) => a.kind === 'action:array_set'),
      );
      expect(coordScript).toBeDefined();
    });

    it('creates a coordinator hide script that stops all slots', () => {
      const { scripts } = buildWithQueue({ maxVisible: 2, autoHide: '3s' });
      // Coordinator hide script should have script_stop + array_set + overlay_hide per slot
      const hideScript = scripts.find(s =>
        s.then.filter((a: IRActionNode) => a.kind === 'action:script_stop').length >= 2 &&
        s.then.filter((a: IRActionNode) => a.kind === 'action:overlay_hide').length >= 2 &&
        s.then.filter((a: IRActionNode) => a.kind === 'action:array_set').length >= 2,
      );
      expect(hideScript).toBeDefined();
      // Also resets seq counter to 0
      const globalSetActions = hideScript!.then.filter(
        (a: IRActionNode) => a.kind === 'action:global_set',
      );
      expect(globalSetActions).toHaveLength(1);
    });

    it('coordinator uses restart mode for overflow: replace (default)', () => {
      const { scripts } = buildWithQueue({ maxVisible: 2, autoHide: '3s' });
      const coordScript = scripts.find(s =>
        s.then.some((a: IRActionNode) => a.kind === 'action:if'),
      );
      expect(coordScript).toBeDefined();
      expect(coordScript!.mode).toBe('restart');
    });

    it('coordinator uses queued mode for overflow: queue', () => {
      const { scripts } = buildWithQueue({ maxVisible: 2, autoHide: '3s', overflow: 'queue', queueLength: 5 });
      const coordScript = scripts.find(s =>
        s.then.some((a: IRActionNode) => a.kind === 'action:if') &&
        !s.then.some((a: IRActionNode) => a.kind === 'action:array_set'),
      );
      expect(coordScript).toBeDefined();
      expect(coordScript!.mode).toBe('queued');
      expect(coordScript!.maxRuns).toBe(5);
    });

    it('coordinator uses single mode for overflow: drop', () => {
      const { scripts } = buildWithQueue({ maxVisible: 2, autoHide: '3s', overflow: 'drop' });
      const coordScript = scripts.find(s =>
        s.then.some((a: IRActionNode) => a.kind === 'action:if') &&
        !s.then.some((a: IRActionNode) => a.kind === 'action:array_set'),
      );
      expect(coordScript).toBeDefined();
      expect(coordScript!.mode).toBe('single');
    });

    it('overflow: replace does NOT include script.wait in dispatch', () => {
      const { scripts } = buildWithQueue({ maxVisible: 2, autoHide: '3s', overflow: 'replace' });
      const coordScript = scripts.find(s =>
        s.then.some((a: IRActionNode) => a.kind === 'action:if') &&
        !s.then.some((a: IRActionNode) => a.kind === 'action:array_set'),
      );
      expect(coordScript).toBeDefined();
      // Walk the if-chain — no script_wait anywhere
      const hasWait = JSON.stringify(coordScript!.then).includes('action:script_wait');
      expect(hasWait).toBe(false);
    });

    it('overflow: queue includes script.wait before dispatch', () => {
      const { scripts } = buildWithQueue({ maxVisible: 2, autoHide: '3s', overflow: 'queue' });
      const coordScript = scripts.find(s =>
        s.then.some((a: IRActionNode) => a.kind === 'action:if') &&
        !s.then.some((a: IRActionNode) => a.kind === 'action:array_set'),
      );
      expect(coordScript).toBeDefined();
      // Walk the if-chain — should have script_wait in branches
      const hasWait = JSON.stringify(coordScript!.then).includes('action:script_wait');
      expect(hasWait).toBe(true);
    });

    it('overflow: drop includes script.wait before dispatch', () => {
      const { scripts } = buildWithQueue({ maxVisible: 2, autoHide: '3s', overflow: 'drop' });
      const coordScript = scripts.find(s =>
        s.then.some((a: IRActionNode) => a.kind === 'action:if') &&
        !s.then.some((a: IRActionNode) => a.kind === 'action:array_set'),
      );
      expect(coordScript).toBeDefined();
      const hasWait = JSON.stringify(coordScript!.then).includes('action:script_wait');
      expect(hasWait).toBe(true);
    });

    it('auto-hide show script resets seq_counter when all slots idle', () => {
      const { scripts } = buildWithQueue({ maxVisible: 2, autoHide: '3s' });
      // Per-slot show scripts have mode: restart and contain overlay_show + delay
      const slotShowScripts = scripts.filter(s =>
        s.mode === 'restart' &&
        s.then.some((a: IRActionNode) => a.kind === 'action:overlay_show') &&
        s.then.some((a: IRActionNode) => a.kind === 'action:delay'),
      );
      expect(slotShowScripts.length).toBeGreaterThanOrEqual(1);
      // Each should end with an if-action (all-idle check → reset counter)
      for (const script of slotShowScripts) {
        const lastAction = script.then[script.then.length - 1];
        expect(lastAction.kind).toBe('action:if');
        // The then-branch should contain a global_set (counter reset)
        const ifAction = lastAction as { kind: string; then: IRActionNode[] };
        expect(ifAction.then).toHaveLength(1);
        expect(ifAction.then[0].kind).toBe('action:global_set');
      }
    });

    it('per-slot hide script resets seq_counter when all slots idle', () => {
      const { scripts } = buildWithQueue({ maxVisible: 2, autoHide: '3s' });
      // Per-slot hide scripts contain script_stop + array_set + overlay_hide + if
      const slotHideScripts = scripts.filter(s =>
        s.then.some((a: IRActionNode) => a.kind === 'action:script_stop') &&
        s.then.some((a: IRActionNode) => a.kind === 'action:overlay_hide') &&
        s.then.length === 4, // stop, array_set, overlay_hide, if(reset)
      );
      expect(slotHideScripts.length).toBe(2); // one per slot
      for (const script of slotHideScripts) {
        const lastAction = script.then[script.then.length - 1];
        expect(lastAction.kind).toBe('action:if');
        const ifAction = lastAction as { kind: string; then: IRActionNode[] };
        expect(ifAction.then).toHaveLength(1);
        expect(ifAction.then[0].kind).toBe('action:global_set');
      }
    });
  });

  describe('controller', () => {
    it('returns a controller with show/hide that throw at runtime', () => {
      let ctrl: { show: () => void; hide: () => void } | undefined;
      const stub = { type: 'div', props: {}, __source: undefined as never };

      withScriptScope(() => withReactiveScope(() => withGlobalScope(() => withOverlayScope(() => {
        runInComponent('Foo', () => {
          ctrl = useTransientOverlay({ autoHide: '3s' }, () => stub);
        });
      }))));

      expect(ctrl).toBeDefined();
      expect(() => ctrl!.show()).toThrow(/compile-time/);
      expect(() => ctrl!.hide()).toThrow(/compile-time/);
    });
  });
});
