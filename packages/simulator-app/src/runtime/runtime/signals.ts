// ────────────────────────────────────────────────────────────────────────────
// JS-native reactive runtime — Signal / Memo / Effect / Scheduler
//
// A TypeScript port of the C++ reactive runtime in espcompose_reactive.h.
// Same semantics: fine-grained, topological-order flush, single-threaded,
// re-entrant-safe signal.set() during flush.
//
// Used by the simulator to drive reactive UI updates in the browser
// without any C++ code generation.
// ────────────────────────────────────────────────────────────────────────────

// ── NodeBase ─────────────────────────────────────────────────────────────────

/** Topological ordering constants. */
const ORDER_SIGNAL = 0;
const ORDER_MEMO = 1;
const ORDER_EFFECT = 255;

let nextNodeId = 0;

abstract class NodeBase {
  readonly _id = nextNodeId++;
  readonly order: number;
  private dirty = false;
  private _subscribers: NodeBase[] = [];
  private _sources: NodeBase[] = [];

  constructor(order: number) {
    this.order = order;
  }

  isDirty(): boolean {
    return this.dirty;
  }

  markDirty(): void {
    if (this.dirty) return;
    this.dirty = true;
    Scheduler.instance().schedule(this);
    for (const sub of this._subscribers) {
      sub.markDirty();
    }
  }

  clearDirty(): void {
    this.dirty = false;
  }

  addSubscriber(node: NodeBase): void {
    if (!this._subscribers.includes(node)) {
      this._subscribers.push(node);
    }
  }

  removeSubscriber(node: NodeBase): void {
    const idx = this._subscribers.indexOf(node);
    if (idx >= 0) this._subscribers.splice(idx, 1);
  }

  setSources(sources: NodeBase[]): void {
    this._sources = sources;
  }

  getSources(): NodeBase[] {
    return this._sources;
  }

  abstract update(): void;
}

// ── Scheduler ────────────────────────────────────────────────────────────────

/**
 * Batches dirty nodes and flushes in topological order.
 * Singleton — matches C++ Scheduler::instance() pattern.
 */
export class Scheduler {
  private static _instance: Scheduler | null = null;
  private queue: NodeBase[] = [];
  private preFlush: (() => void) | null = null;
  private postFlush: (() => void) | null = null;
  private flushing = false;

  static instance(): Scheduler {
    if (!Scheduler._instance) {
      Scheduler._instance = new Scheduler();
    }
    return Scheduler._instance;
  }

  /** Reset the singleton (for testing). */
  static reset(): void {
    Scheduler._instance = null;
    nextNodeId = 0;
  }

  setPreFlush(fn: (() => void) | null): void {
    this.preFlush = fn;
  }

  setPostFlush(fn: (() => void) | null): void {
    this.postFlush = fn;
  }

  schedule(node: NodeBase): void {
    if (!this.queue.includes(node)) {
      this.queue.push(node);
    }
  }

  /**
   * Process all dirty nodes in topological order.
   * Supports re-entrant signal.set() during flush (up to 10 passes).
   */
  flush(): void {
    if (this.flushing) return; // re-entrant guard — queue for next pass
    this.flushing = true;

    this.preFlush?.();

    for (let pass = 0; pass < 10 && this.queue.length > 0; pass++) {
      // Sort by topological order
      this.queue.sort((a, b) => a.order - b.order);

      // Snapshot and clear (re-entrant sets add to fresh queue)
      const snapshot = this.queue.slice();
      this.queue = [];

      for (const node of snapshot) {
        if (node.isDirty()) {
          node.update();
          node.clearDirty();
        }
      }
    }

    this.postFlush?.();
    this.flushing = false;
  }
}

// ── Signal<T> ────────────────────────────────────────────────────────────────

/**
 * Observable value — order 0 (earliest in topological sort).
 * Setting a new value marks all subscribers dirty.
 */
export class Signal<T> extends NodeBase {
  private _value: T;

  constructor(initial: T) {
    super(ORDER_SIGNAL);
    this._value = initial;
  }

  get(): T {
    return this._value;
  }

  set(value: T): void {
    if (Object.is(this._value, value)) return;
    this._value = value;
    this.markDirty();
  }

  /** Signals don't re-compute — they're source nodes. */
  update(): void {
    // no-op
  }
}

// ── Memo<T> ──────────────────────────────────────────────────────────────────

/**
 * Lazy derived value — re-evaluates compute function when dirty.
 * Only marks subscribers if result actually changed.
 */
export class Memo<T> extends NodeBase {
  private _value: T;
  private readonly compute: () => T;

  constructor(compute: () => T, initial?: T) {
    super(ORDER_MEMO);
    this.compute = compute;
    this._value = initial ?? compute();
  }

  get(): T {
    return this._value;
  }

  /**
   * Wire this memo to its source nodes.
   * Registers as subscriber on each source.
   */
  wire(sources: NodeBase[]): void {
    this.setSources(sources);
    for (const src of sources) {
      src.addSubscriber(this);
    }
  }

  update(): void {
    this._value = this.compute();
  }
}

// ── Effect ───────────────────────────────────────────────────────────────────

/**
 * Side-effect callback — always runs when any source changes.
 * Order 255 (runs last in topological sort).
 */
export class Effect extends NodeBase {
  private readonly callback: () => void;

  constructor(callback: () => void) {
    super(ORDER_EFFECT);
    this.callback = callback;
  }

  /**
   * Wire this effect to its source nodes.
   * Registers as subscriber on each source.
   */
  wire(sources: NodeBase[]): void {
    this.setSources(sources);
    for (const src of sources) {
      src.addSubscriber(this);
    }
  }

  update(): void {
    this.callback();
  }
}
