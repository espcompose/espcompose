#pragma once

#include "esphome/core/component.h"
#include "esphome/core/hal.h"

namespace espcompose {

/**
 * EspcomposeRuntimeComponent manages the reactive dependency graph.
 *
 * This is a first-class ESPHome component that owns the setup/loop lifecycle
 * of the espcompose reactive scheduler, ensuring proper integration with
 * ESPHome's framework and component ordering.
 *
 * Key responsibilities:
 * - Wires reactive nodes (signals → memos → effects) during setup()
 * - Performs time-budgeted scheduler drains in loop()
 * - Requests flushes when signals from HA triggers are updated
 */
class EspcomposeRuntimeComponent : public esphome::Component {
 public:
  /// Constructor accepts configurable flush budget (microseconds per loop iteration)
  explicit EspcomposeRuntimeComponent(uint32_t flush_budget_us = 2000)
      : flush_budget_us_(flush_budget_us) {
    if (instance_ != nullptr) {
      ESP_LOGW("espcompose", "Multiple EspcomposeRuntimeComponent instances — overwriting previous");
    }
    instance_ = this;
  }

  /// setup() is called once during initialization by ESPHome framework.
  /// Reactive graph wiring happens in bootstrap_runtime() which is emitted
  /// by __init__.py's to_code() into main.cpp before setup() runs.
  void setup() override;

  /// loop() is called at each ESPHome main loop iteration
  void loop() override;

  /// dump_config() logs component configuration (required by ESPHome)
  void dump_config() override;

  /// Signal that reactive nodes need processing on next loop iteration
  void request_flush() { flush_requested_ = true; }

  /// Get the configured flush budget in microseconds
  uint32_t get_flush_budget_us() const { return flush_budget_us_; }

  /// Get the singleton instance (for use by reactive graph after setup)
  static EspcomposeRuntimeComponent* get_instance() { return instance_; }

 private:
  /// Perform time-budgeted scheduler drain returning true if fully drained
  bool flush_for_budget_us(uint32_t budget_us);

  uint32_t flush_budget_us_;
  bool flush_requested_{false};

  static EspcomposeRuntimeComponent* instance_;
};

}  // namespace espcompose
