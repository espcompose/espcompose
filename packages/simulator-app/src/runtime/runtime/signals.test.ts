import { describe, it, expect, beforeEach } from 'vitest';
import { Signal, Memo, Effect, Scheduler } from './signals';

beforeEach(() => {
  Scheduler.reset();
});

describe('Signal', () => {
  it('stores and retrieves a value', () => {
    const s = new Signal(42);
    expect(s.get()).toBe(42);
  });

  it('updates value on set', () => {
    const s = new Signal(1);
    s.set(2);
    expect(s.get()).toBe(2);
  });

  it('does not mark dirty if value is unchanged', () => {
    const s = new Signal(10);
    const calls: number[] = [];
    const e = new Effect(() => calls.push(s.get()));
    e.wire([s]);

    s.set(10); // same value
    Scheduler.instance().flush();
    expect(calls).toEqual([]);
  });
});

describe('Memo', () => {
  it('computes derived value from signal', () => {
    const s = new Signal(3);
    const m = new Memo(() => s.get() * 2);
    m.wire([s]);
    expect(m.get()).toBe(6);
  });

  it('recomputes when source signal changes', () => {
    const s = new Signal(3);
    const m = new Memo(() => s.get() * 2);
    m.wire([s]);

    s.set(5);
    Scheduler.instance().flush();
    expect(m.get()).toBe(10);
  });

  it('chains through multiple memos', () => {
    const s = new Signal(2);
    const m1 = new Memo(() => s.get() + 1);
    m1.wire([s]);
    const m2 = new Memo(() => m1.get() * 10);
    m2.wire([m1]);

    expect(m2.get()).toBe(30);

    s.set(5);
    Scheduler.instance().flush();
    expect(m1.get()).toBe(6);
    expect(m2.get()).toBe(60);
  });
});

describe('Effect', () => {
  it('runs callback when source changes', () => {
    const s = new Signal('hello');
    const log: string[] = [];
    const e = new Effect(() => log.push(s.get()));
    e.wire([s]);

    s.set('world');
    Scheduler.instance().flush();
    expect(log).toEqual(['world']);
  });

  it('runs after memos in topological order', () => {
    const s = new Signal(1);
    const m = new Memo(() => s.get() * 2);
    m.wire([s]);

    const log: number[] = [];
    const e = new Effect(() => log.push(m.get()));
    e.wire([m]);

    s.set(3);
    Scheduler.instance().flush();
    // Memo should update first (order 1), then effect runs (order 255)
    expect(log).toEqual([6]);
  });

  it('batches multiple signal changes in one flush', () => {
    const a = new Signal(1);
    const b = new Signal(10);
    const m = new Memo(() => a.get() + b.get());
    m.wire([a, b]);

    const log: number[] = [];
    const e = new Effect(() => log.push(m.get()));
    e.wire([m]);

    a.set(2);
    b.set(20);
    Scheduler.instance().flush();
    // Effect should only run once after both signals updated
    expect(log).toEqual([22]);
  });
});

describe('Scheduler', () => {
  it('processes nodes in topological order', () => {
    const order: string[] = [];

    const s = new Signal(0);
    const m = new Memo(() => {
      order.push('memo');
      return s.get();
    });
    m.wire([s]);
    const e = new Effect(() => order.push('effect'));
    e.wire([m]);

    order.length = 0; // clear from memo constructor eval
    s.set(1);
    Scheduler.instance().flush();
    expect(order).toEqual(['memo', 'effect']);
  });

  it('handles re-entrant signal set during flush', () => {
    const a = new Signal(0);
    const b = new Signal(0);

    // When a changes, set b (re-entrant)
    const e1 = new Effect(() => {
      if (a.get() === 1 && b.get() === 0) {
        b.set(10);
      }
    });
    e1.wire([a]);

    const log: number[] = [];
    const e2 = new Effect(() => log.push(b.get()));
    e2.wire([b]);

    a.set(1);
    Scheduler.instance().flush();

    // b should have been set to 10 in a subsequent pass
    expect(b.get()).toBe(10);
    expect(log).toContain(10);
  });

  it('reset clears singleton', () => {
    const s1 = Scheduler.instance();
    Scheduler.reset();
    const s2 = Scheduler.instance();
    expect(s1).not.toBe(s2);
  });
});

describe('boolean signal with memo and effect', () => {
  it('models an HA entity isOn toggle', () => {
    const isOn = new Signal(false);
    const labelText = new Memo(() => isOn.get() ? 'On' : 'Off');
    labelText.wire([isOn]);

    const rendered: string[] = [];
    const updateLabel = new Effect(() => rendered.push(labelText.get()));
    updateLabel.wire([labelText]);

    expect(labelText.get()).toBe('Off');

    isOn.set(true);
    Scheduler.instance().flush();
    expect(labelText.get()).toBe('On');
    expect(rendered).toEqual(['On']);

    isOn.set(false);
    Scheduler.instance().flush();
    expect(labelText.get()).toBe('Off');
    expect(rendered).toEqual(['On', 'Off']);
  });
});
