#include "espcompose_runtime.h"
#include "espcompose_reactive.h"
#include "esphome/core/log.h"

#ifdef ESPCOMPOSE_PERF
static const char *const PERF_TAG = "ec_perf";
#endif

namespace espcompose {

// Forward declaration — defined in the project-generated espcompose_bindings.h.
// We can't include that header here because it lives outside the external-component
// directory (it's emitted to the project root by the espcompose codegen).
void bootstrap_runtime();

static const char* TAG = "espcompose_runtime";

// Define the static instance pointer
EspcomposeRuntimeComponent* EspcomposeRuntimeComponent::instance_ = nullptr;

void EspcomposeRuntimeComponent::setup() {
  // Wire the reactive graph here (rather than inline in App.setup()) so that
  // it runs after all GlobalsComponent instances have been placement-new'd.
  // BoundSignal::bind() needs the external storage to exist before pointing at it.
  bootstrap_runtime();
  ESP_LOGI(TAG, "EspcomposeRuntimeComponent setup complete");
}

void EspcomposeRuntimeComponent::loop() {
  // Skip if no work pending and no explicit flush requested
  if (!flush_requested_ && !Scheduler::instance().has_pending()) {
    return;
  }

  flush_requested_ = false;
#ifdef ESPCOMPOSE_PERF
  uint32_t t0 = esphome::micros();
#endif
  const bool drained = flush_for_budget_us(flush_budget_us_);
#ifdef ESPCOMPOSE_PERF
  uint32_t elapsed = esphome::micros() - t0;
  if (elapsed > 500) {
    ESP_LOGI(PERF_TAG, "loop flush: %" PRIu32 " \xC2\xB5s, drained=%s", elapsed, drained ? "yes" : "no");
  }
#endif
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
