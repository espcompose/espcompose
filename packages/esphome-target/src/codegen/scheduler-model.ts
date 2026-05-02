/**
 * TypeScript behavioral model of the C++ green/blue reactive scheduler.
 *
 * Mirrors the algorithm in espcompose_reactive.h for unit testing.
 * This is NOT used at runtime — it exists solely to verify the scheduling
 * semantics (topological ordering, dual-buffer swap, budget exhaustion,
 * re-dirty during update, pre/post hooks).
 */

const MAX_NODES = 64;

// ── NodeBase ────────────────────────────────────────────────────────────────

export class NodeBase {
  dirty = false;
  private order_: number;
  private subscribers_: NodeBase[] = [];

  constructor(order: number) {
    this.order_ = order;
  }

  order(): number {
    return this.order_;
  }

  subscribers(): NodeBase[] {
    return this.subscribers_;
  }

  addSubscriber(sub: NodeBase): void {
    this.subscribers_.push(sub);
  }

  markDirty(scheduler: Scheduler): void {
    if (this.dirty) return;
    this.dirty = true;
    scheduler.schedule(this);
    for (const sub of this.subscribers()) {
      sub.markDirty(scheduler);
    }
  }

  update(): void {
    // Override in subclasses
  }
}

// ── Signal ──────────────────────────────────────────────────────────────────

export class Signal<T> extends NodeBase {
  private value_: T;
  private scheduler_: Scheduler;

  constructor(scheduler: Scheduler, initial: T) {
    super(0);
    this.value_ = initial;
    this.scheduler_ = scheduler;
  }

  get(): T {
    return this.value_;
  }

  set(val: T): void {
    if (this.value_ !== val) {
      this.value_ = val;
      const subs = this.subscribers();
      for (let i = 0; i < subs.length; i++) {
        subs[i].markDirty(this.scheduler_);
      }
    }
  }
}

// ── Memo ────────────────────────────────────────────────────────────────────

export class Memo<T> extends NodeBase {
  private compute_: () => T;
  private value_: T;

  constructor(compute: () => T, initial: T) {
    super(1);
    this.compute_ = compute;
    this.value_ = initial;
    this.dirty = true;
  }

  get(): T {
    if (this.dirty) {
      this.value_ = this.compute_();
      this.dirty = false;
    }
    return this.value_;
  }

  override update(): void {
    const newVal = this.compute_();
    if (newVal !== this.value_) {
      this.value_ = newVal;
      const subs = this.subscribers();
      for (let i = 0; i < subs.length; i++) {
        subs[i].markDirty(Scheduler.testInstance!);
      }
    }
  }

  wire(sources: NodeBase[]): void {
    for (const src of sources) {
      src.addSubscriber(this);
    }
  }
}

// ── Effect ──────────────────────────────────────────────────────────────────

export class Effect extends NodeBase {
  private callback_: () => void;

  constructor(callback: () => void) {
    super(255);
    this.callback_ = callback;
    this.dirty = true;
  }

  override update(): void {
    this.callback_();
  }

  wire(sources: NodeBase[]): void {
    for (const src of sources) {
      src.addSubscriber(this);
    }
  }
}

// ── Scheduler (green/blue dual-buffer) ──────────────────────────────────────

export type Hook = () => void;

export class Scheduler {
  /** Exposed for Memo.update() propagation in tests. */
  static testInstance: Scheduler | null = null;

  private buf_: [NodeBase[], NodeBase[]] = [[], []];
  private active_ = 0;
  private flushing_ = false;
  private preFlush_: Hook | null = null;
  private postFlush_: Hook | null = null;

  /** Simulated microsecond clock for budget testing. */
  microsNow = 0;

  constructor() {
    Scheduler.testInstance = this;
  }

  setPreFlush(h: Hook): void {
    this.preFlush_ = h;
  }

  setPostFlush(h: Hook): void {
    this.postFlush_ = h;
  }

  hasPending(): boolean {
    return this.buf_[0].length > 0 || this.buf_[1].length > 0;
  }

  schedule(node: NodeBase): void {
    const target = this.flushing_ ? (1 - this.active_) : this.active_;
    if (this.buf_[target].length >= MAX_NODES) return;
    if (this.buf_[target].includes(node)) return;
    this.buf_[target].push(node);
  }

  flushForBudgetUs(budgetUs: number): boolean {
    if (this.buf_[this.active_].length === 0) return true;
    if (this.preFlush_) this.preFlush_();
    this.flushing_ = true;

    const maxPasses = 10;
    const startUs = this.microsNow;

    for (let pass = 0; pass < maxPasses && this.buf_[this.active_].length > 0; pass++) {
      // Insertion-sort by topological order
      const active = this.buf_[this.active_];
      for (let i = 1; i < active.length; i++) {
        const key = active[i];
        let j = i - 1;
        while (j >= 0 && active[j].order() > key.order()) {
          active[j + 1] = active[j];
          j--;
        }
        active[j + 1] = key;
      }

      const count = active.length;
      let i = 0;
      for (; i < count; i++) {
        if (this.microsNow - startUs >= budgetUs) {
          break;
        }
        const node = active[i];
        if (node.dirty) {
          node.update();
          node.dirty = false;
        }
      }

      // Budget exhausted: move unprocessed nodes to incoming buffer
      if (i < count) {
        for (; i < count; i++) {
          this.schedule(active[i]);
        }
      }

      // Swap: incoming becomes active, old active is cleared
      this.buf_[this.active_] = [];
      this.active_ = 1 - this.active_;
    }

    this.flushing_ = false;
    if (this.postFlush_) this.postFlush_();
    return this.buf_[0].length === 0 && this.buf_[1].length === 0;
  }

  flush(): void {
    this.flushForBudgetUs(Number.MAX_SAFE_INTEGER);
  }
}
