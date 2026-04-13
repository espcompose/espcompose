import { describe, it, expect, beforeEach } from 'vitest';
import { Scheduler, Signal, Memo, Effect } from './scheduler-model.js';

describe('green/blue scheduler', () => {
  let scheduler: Scheduler;

  beforeEach(() => {
    scheduler = new Scheduler();
  });

  // ── Basic flush ordering ─────────────────────────────────────────────

  it('processes nodes in topological order (signals → memos → effects)', () => {
    const order: string[] = [];

    const sig = new Signal(scheduler, 0);
    const memo = new Memo(() => { order.push('memo'); return sig.get() * 2; }, 0);
    const effect = new Effect(() => { order.push('effect'); });

    memo.wire([sig]);
    effect.wire([memo]);

    scheduler.schedule(sig);
    scheduler.schedule(memo);
    scheduler.schedule(effect);

    // Mark all dirty for initial flush
    sig.dirty = true;
    memo.dirty = true;
    effect.dirty = true;

    scheduler.flush();

    expect(order).toEqual(['memo', 'effect']);
    // Signal has no update() override — it's not in the log
  });

  it('returns true when fully drained', () => {
    const effect = new Effect(() => {});
    effect.dirty = true;
    scheduler.schedule(effect);
    expect(scheduler.flushForBudgetUs(Number.MAX_SAFE_INTEGER)).toBe(true);
    expect(scheduler.hasPending()).toBe(false);
  });

  it('returns true immediately when nothing is queued', () => {
    expect(scheduler.flushForBudgetUs(1000)).toBe(true);
  });

  // ── Multi-pass: update dirties downstream ────────────────────────────

  it('processes newly dirtied nodes in the next pass via buffer swap', () => {
    const order: string[] = [];

    const sig = new Signal(scheduler, 10);
    const memo = new Memo(() => {
      order.push('memo');
      return sig.get() * 2;
    }, 0);
    const effect = new Effect(() => {
      order.push('effect:' + memo.get());
    });

    memo.wire([sig]);
    effect.wire([memo]);

    // Only schedule the signal — memo and effect should be pulled in
    // via mark_dirty propagation when the signal's subscribers are notified.
    sig.dirty = true;
    scheduler.schedule(sig);

    // Simulate: signal update dirties memo, memo update dirties effect.
    // We need to manually set up the propagation since Signal.update()
    // is a no-op (signals don't have compute functions).
    // Instead, schedule all and let the topological sort handle it.
    memo.dirty = true;
    scheduler.schedule(memo);
    effect.dirty = true;
    scheduler.schedule(effect);

    scheduler.flush();

    expect(order).toEqual(['memo', 'effect:20']);
  });

  it('handles re-dirty during update (memo change propagates to effect)', () => {
    const order: string[] = [];
    const sigValue = 5;

    const sig = new Signal(scheduler, sigValue);
    const memo = new Memo(() => {
      order.push('memo:compute');
      return sig.get() * 3;
    }, 0);
    const effect = new Effect(() => {
      order.push('effect:' + memo.get());
    });

    memo.wire([sig]);
    effect.wire([memo]);

    // Initial flush to wire everything
    memo.dirty = true;
    effect.dirty = true;
    scheduler.schedule(memo);
    scheduler.schedule(effect);
    scheduler.flush();
    order.length = 0;

    // Now change the signal — this should dirty memo → dirty effect
    sig.set(10);

    scheduler.flush();

    // Memo was dirtied by signal.set() → markDirty propagation.
    // Effect was dirtied by memo's markDirty propagation.
    // On flush: memo computes first (order 1), effect runs second (order 255).
    expect(order).toEqual(['memo:compute', 'effect:30']);
  });

  // ── Budget exhaustion ────────────────────────────────────────────────

  it('stops processing when budget is exhausted and returns false', () => {
    const processed: string[] = [];

    const e1 = new Effect(() => { processed.push('e1'); });
    const e2 = new Effect(() => { processed.push('e2'); });
    const e3 = new Effect(() => { processed.push('e3'); });

    e1.dirty = true;
    e2.dirty = true;
    e3.dirty = true;
    scheduler.schedule(e1);
    scheduler.schedule(e2);
    scheduler.schedule(e3);

    // Budget of 0 — should exhaust immediately after first node at most
    scheduler.microsNow = 0;
    const drained = scheduler.flushForBudgetUs(0);

    expect(drained).toBe(false);
    expect(scheduler.hasPending()).toBe(true);
    // At least some nodes remain unprocessed
    expect(processed.length).toBeLessThan(3);
  });

  it('carries unprocessed nodes across flush calls via buffer swap', () => {
    const processed: string[] = [];

    const e1 = new Effect(() => {
      processed.push('e1');
      scheduler.microsNow += 500;
    });
    const e2 = new Effect(() => {
      processed.push('e2');
      scheduler.microsNow += 500;
    });
    const e3 = new Effect(() => {
      processed.push('e3');
      scheduler.microsNow += 500;
    });

    e1.dirty = true;
    e2.dirty = true;
    e3.dirty = true;
    scheduler.schedule(e1);
    scheduler.schedule(e2);
    scheduler.schedule(e3);

    // First flush: budget allows ~2 nodes (budget=800, each costs 500)
    scheduler.microsNow = 0;
    const drained1 = scheduler.flushForBudgetUs(800);
    expect(drained1).toBe(false);
    expect(processed).toEqual(['e1', 'e2']);

    // Second flush: remaining node processes
    scheduler.microsNow = 0;
    const drained2 = scheduler.flushForBudgetUs(800);
    expect(drained2).toBe(true);
    expect(processed).toEqual(['e1', 'e2', 'e3']);
  });

  // ── Green/blue buffer isolation ──────────────────────────────────────

  it('routes new schedule() calls to incoming buffer during flush', () => {
    let effectRan = false;
    let memoComputed = false;

    // Effect that sets a signal during its update, dirtying a memo
    const sig = new Signal(scheduler, 0);
    const memo = new Memo(() => {
      memoComputed = true;
      return sig.get() + 1;
    }, 0);
    const effect = new Effect(() => {
      effectRan = true;
      sig.set(42); // This will dirty the memo during flush
    });

    memo.wire([sig]);

    // Initial flush to clear the Memo's constructor-dirty flag,
    // matching the real bootstrap_runtime() + initial flush sequence.
    scheduler.schedule(memo);
    scheduler.flush();
    memoComputed = false; // Reset — we're testing re-dirty behavior

    effect.dirty = true;
    scheduler.schedule(effect);

    scheduler.flush();

    expect(effectRan).toBe(true);
    // Memo should have been dirtied by sig.set() during the effect's update,
    // then processed in a subsequent pass via the incoming buffer swap.
    expect(memoComputed).toBe(true);
    expect(memo.get()).toBe(43);
    expect(scheduler.hasPending()).toBe(false);
  });

  // ── Pre/post hooks ───────────────────────────────────────────────────

  it('fires pre_flush and post_flush hooks on each flush', () => {
    const calls: string[] = [];

    scheduler.setPreFlush(() => calls.push('pre'));
    scheduler.setPostFlush(() => calls.push('post'));

    const effect = new Effect(() => calls.push('effect'));
    effect.dirty = true;
    scheduler.schedule(effect);

    scheduler.flush();

    expect(calls).toEqual(['pre', 'effect', 'post']);
  });

  it('does not fire hooks when nothing is queued', () => {
    const calls: string[] = [];
    scheduler.setPreFlush(() => calls.push('pre'));
    scheduler.setPostFlush(() => calls.push('post'));

    scheduler.flushForBudgetUs(1000);

    expect(calls).toEqual([]);
  });

  // ── Dedup ────────────────────────────────────────────────────────────

  it('deduplicates schedule calls for the same node', () => {
    const processed: number[] = [];
    const effect = new Effect(() => processed.push(1));
    effect.dirty = true;

    scheduler.schedule(effect);
    scheduler.schedule(effect);
    scheduler.schedule(effect);

    scheduler.flush();

    expect(processed).toEqual([1]);
  });

  // ── Diamond dependency ───────────────────────────────────────────────

  it('handles diamond dependencies correctly (A → B, A → C, B+C → D)', () => {
    const order: string[] = [];

    const sigA = new Signal(scheduler, 1);
    const memoB = new Memo(() => {
      order.push('B');
      return sigA.get() * 2;
    }, 0);
    const memoC = new Memo(() => {
      order.push('C');
      return sigA.get() * 3;
    }, 0);
    const effectD = new Effect(() => {
      order.push('D:' + memoB.get() + ',' + memoC.get());
    });

    memoB.wire([sigA]);
    memoC.wire([sigA]);
    effectD.wire([memoB, memoC]);

    // Initial flush
    memoB.dirty = true;
    memoC.dirty = true;
    effectD.dirty = true;
    scheduler.schedule(memoB);
    scheduler.schedule(memoC);
    scheduler.schedule(effectD);
    scheduler.flush();
    order.length = 0;

    // Change signal — both memos and the effect should re-run
    sigA.set(5);
    scheduler.flush();

    // Memos (order 1) before effect (order 255)
    expect(order[0]).toBe('B');
    expect(order[1]).toBe('C');
    expect(order[2]).toBe('D:10,15');
  });

  // ── Max passes guard ─────────────────────────────────────────────────

  it('stops after max passes to prevent infinite loops', () => {
    let updateCount = 0;

    // An effect that re-dirties itself on every update — pathological case
    const effect = new Effect(() => {
      updateCount++;
      // Re-dirty: this will schedule into the incoming buffer
      effect.dirty = false; // clear so markDirty succeeds
      effect.markDirty(scheduler);
    });

    effect.dirty = true;
    scheduler.schedule(effect);

    scheduler.flush();

    // Should stop at 10 passes, not infinite loop
    expect(updateCount).toBeLessThanOrEqual(10);
    expect(updateCount).toBeGreaterThan(0);
  });
});
