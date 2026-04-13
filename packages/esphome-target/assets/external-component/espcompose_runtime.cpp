#include "espcompose_runtime.h"
#include "espcompose_reactive.h"
#include "esphome/core/log.h"

namespace espcompose {

static const char* TAG = "espcompose_runtime";

// Define the static instance pointer
EspcomposeRuntimeComponent* EspcomposeRuntimeComponent::instance_ = nullptr;

void EspcomposeRuntimeComponent::setup() {
  // Reactive graph wiring has already been performed by bootstrap_runtime(),
  // which __init__.py's to_code() emits into main.cpp before ESPHome calls
  // setup() on registered components.
  ESP_LOGI(TAG, "EspcomposeRuntimeComponent setup complete");
}

void EspcomposeRuntimeComponent::loop() {
  // Skip if no work pending and no explicit flush requested
  if (!flush_requested_ && !Scheduler::instance().has_pending()) {
    return;
  }

  flush_requested_ = false;
  const bool drained = flush_for_budget_us(flush_budget_us_);
  if (!drained) {
    // More work queued than can fit in budget; request another flush
    ESP_LOGW(TAG, "Reactive flush did not complete within %" PRIu32 " µs budget, deferring remaining work", flush_budget_us_);
    flush_requested_ = true;
  }
}

void EspcomposeRuntimeComponent::dump_config() {
  ESP_LOGCONFIG(TAG, "Espcompose Runtime Component");
  ESP_LOGCONFIG(TAG, "  Flush Budget: %" PRIu32 " µs", flush_budget_us_);
}

bool EspcomposeRuntimeComponent::flush_for_budget_us(uint32_t budget_us) {
  return Scheduler::instance().flush_for_budget_us(budget_us);
}

}  // namespace espcompose
