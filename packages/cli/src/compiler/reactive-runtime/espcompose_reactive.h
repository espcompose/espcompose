// ────────────────────────────────────────────────────────────────────────────
// espcompose_reactive.h — SolidJS-style fine-grained reactive runtime
//
// Provides Signal<T>, Memo<T>, Effect, and Scheduler primitives for
// reactive state management on ESP32/ESP-IDF devices. Injected via
// esphome.includes: when a project uses multi-source reactive bindings.
//
// Design constraints:
//   - No exceptions, no RTTI (ESP-IDF default)
//   - No dynamic allocation in the hot path (set/get/flush)
//   - Single-threaded (ESPHome main loop)
//   - Re-entrant signal.set() during flush is safe (queued for next pass)
//   - Fixed-capacity node list (configurable via ESPCOMPOSE_MAX_NODES)
// ────────────────────────────────────────────────────────────────────────────
#pragma once

#include <functional>
#include <cstdint>
#include <cstring>
#include <string>

#ifndef ESPCOMPOSE_MAX_NODES
#define ESPCOMPOSE_MAX_NODES 64
#endif

namespace espcompose {

// ── Forward declarations ───────────────────────────────────────────────────

class Scheduler;

// ── Node base class ────────────────────────────────────────────────────────

enum class NodeKind : uint8_t { Signal, Memo, Effect };

class NodeBase {
public:
  NodeBase(NodeKind kind) : kind_(kind) {}
  virtual ~NodeBase() = default;

  NodeKind kind() const { return kind_; }

  /// Mark this node dirty and schedule re-evaluation.
  void mark_dirty();

  /// Re-evaluate this node (no-op for signals).
  virtual void update() {}

  bool is_dirty() const { return dirty_; }
  void set_dirty(bool d) { dirty_ = d; }

  // ── Dependency graph edges ─────────────────────────────────────────────

  /// Subscribers that depend on this node's value.
  NodeBase** subscribers() { return subscribers_; }
  uint16_t subscriber_count() const { return subscriber_count_; }

  /// Provide external storage for subscriber pointers (exact-sized, allocated by codegen).
  void set_subscriber_storage(NodeBase** buf, uint16_t capacity) {
    subscribers_ = buf;
    subscriber_capacity_ = capacity;
  }

  void add_subscriber(NodeBase* sub) {
    if (subscribers_ && subscriber_count_ < subscriber_capacity_) {
      subscribers_[subscriber_count_++] = sub;
    }
  }

  /// Sources this node depends on (for memos/effects).
  void set_sources(NodeBase** sources, uint8_t count) {
    sources_ = sources;
    source_count_ = count;
  }

  NodeBase** sources() { return sources_; }
  uint8_t source_count() const { return source_count_; }

  /// Topological order for scheduling (lower = earlier).
  uint8_t order() const { return order_; }
  void set_order(uint8_t o) { order_ = o; }

private:
  NodeKind kind_;
  bool dirty_{false};
  uint8_t order_{0};

  NodeBase** subscribers_{nullptr};
  uint16_t subscriber_count_{0};
  uint16_t subscriber_capacity_{0};

  NodeBase** sources_{nullptr};
  uint8_t source_count_{0};
};

// ── Scheduler (singleton) ──────────────────────────────────────────────────

/// Batches invalidations and processes dirty nodes in topological order.
/// Signals (order 0) → Memos (order 1+) → Effects (order 255).
class Scheduler {
public:
  using Hook = void(*)();

  static Scheduler& instance() {
    static Scheduler s;
    return s;
  }

  void set_pre_flush(Hook h) { pre_flush_ = h; }
  void set_post_flush(Hook h) { post_flush_ = h; }

  /// Schedule a node for re-evaluation on the next flush.
  void schedule(NodeBase* node) {
    if (queue_count_ >= ESPCOMPOSE_MAX_NODES) return;
    // Avoid duplicates
    for (uint16_t i = 0; i < queue_count_; ++i) {
      if (queue_[i] == node) return;
    }
    queue_[queue_count_++] = node;
  }

  /// Process all dirty nodes. Safe to call during ESPHome on_boot or
  /// from within an on_state/on_value trigger lambda.
  ///
  /// Re-entrant: if signal.set() is called during flush (e.g. from inside
  /// an effect), the new dirty nodes are queued and processed in a
  /// subsequent pass (up to max_passes to prevent infinite loops).
  void flush() {
    if (pre_flush_) pre_flush_();
    static constexpr int max_passes = 10;
    for (int pass = 0; pass < max_passes && queue_count_ > 0; ++pass) {
      // Sort by topological order (insertion sort — small N)
      for (uint16_t i = 1; i < queue_count_; ++i) {
        NodeBase* key = queue_[i];
        int j = static_cast<int>(i) - 1;
        while (j >= 0 && queue_[j]->order() > key->order()) {
          queue_[j + 1] = queue_[j];
          --j;
        }
        queue_[j + 1] = key;
      }

      // Snapshot current queue and clear for re-entrant scheduling
      uint16_t count = queue_count_;
      NodeBase* snapshot[ESPCOMPOSE_MAX_NODES];
      memcpy(snapshot, queue_, count * sizeof(NodeBase*));
      queue_count_ = 0;

      for (uint16_t i = 0; i < count; ++i) {
        NodeBase* node = snapshot[i];
        if (node->is_dirty()) {
          node->update();
          node->set_dirty(false);
        }
      }
    }
    if (post_flush_) post_flush_();
  }

private:
  Scheduler() = default;
  NodeBase* queue_[ESPCOMPOSE_MAX_NODES]{};
  uint16_t queue_count_{0};
  Hook pre_flush_{nullptr};
  Hook post_flush_{nullptr};
};

// ── NodeBase::mark_dirty implementation ────────────────────────────────────

inline void NodeBase::mark_dirty() {
  if (dirty_) return;
  dirty_ = true;
  Scheduler::instance().schedule(this);

  // Propagate dirtiness to subscribers
  for (uint16_t i = 0; i < subscriber_count_; ++i) {
    subscribers_[i]->mark_dirty();
  }
}

// ── Signal<T> ──────────────────────────────────────────────────────────────

/// Observable value. Notifies subscribers when set() changes the value.
template <typename T>
class Signal : public NodeBase {
public:
  explicit Signal(T initial = T{})
      : NodeBase(NodeKind::Signal), value_(std::move(initial)) {
    set_order(0);
  }

  const T& get() const { return value_; }

  void set(T val) {
    if (value_ != val) {
      value_ = std::move(val);
      // Mark subscribers dirty (not ourselves — signals don't recompute)
      for (uint16_t i = 0; i < subscriber_count(); ++i) {
        subscribers()[i]->mark_dirty();
      }
    }
  }

private:
  T value_;
};

// ── Memo<T> ────────────────────────────────────────────────────────────────

/// Lazily-evaluated derived value. Recomputes when any dependency changes.
/// The computation function is stored as std::function for flexibility.
template <typename T>
class Memo : public NodeBase {
public:
  /// Construct a memo with its source dependencies and computation.
  /// After construction, call wire() to register as subscriber of sources.
  Memo(std::function<T()> compute, T initial = T{})
      : NodeBase(NodeKind::Memo),
        compute_(std::move(compute)),
        value_(std::move(initial)) {
    set_order(1);
    set_dirty(true);  // Force initial computation on first flush
  }

  const T& get() {
    if (is_dirty()) {
      value_ = compute_();
      set_dirty(false);
    }
    return value_;
  }

  void update() override {
    T new_val = compute_();
    if (new_val != value_) {
      value_ = std::move(new_val);
      // Propagate to our own subscribers
      for (uint16_t i = 0; i < subscriber_count(); ++i) {
        subscribers()[i]->mark_dirty();
      }
    }
  }

  /// Register this memo as a subscriber of its source nodes.
  /// Must be called after construction (not in constructor to allow
  /// static initialization order flexibility).
  void wire(NodeBase** sources, uint8_t count) {
    set_sources(sources, count);
    for (uint8_t i = 0; i < count; ++i) {
      sources[i]->add_subscriber(this);
    }
  }

private:
  std::function<T()> compute_;
  T value_;
};

// ── Effect ─────────────────────────────────────────────────────────────────

/// Side-effect callback that re-runs when dependencies change.
class Effect : public NodeBase {
public:
  /// Construct an effect. Call wire() to register source dependencies.
  explicit Effect(std::function<void()> callback)
      : NodeBase(NodeKind::Effect), callback_(std::move(callback)) {
    set_order(255);  // Effects run last
    set_dirty(true);  // Run on first flush
  }

  void update() override {
    callback_();
  }

  /// Register this effect as a subscriber of its source nodes.
  void wire(NodeBase** sources, uint8_t count) {
    set_sources(sources, count);
    for (uint8_t i = 0; i < count; ++i) {
      sources[i]->add_subscriber(this);
    }
  }

private:
  std::function<void()> callback_;
};

}  // namespace espcompose
