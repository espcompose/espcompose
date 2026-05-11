// ────────────────────────────────────────────────────────────────────────────
// espcompose AnimateAction — Native ESPHome Action<> for LVGL property
// animation with true async completion signaling.
//
// Uses a regular lv_anim exec_cb with `this` as var so that
// lv_anim_del(this, exec_cb) works for cancellation. user_data carries
// `this` for the ready_cb callback.  Completion fires play_next_() via
// LVGL ready_cb — the script runner waits for real animation end.
// ────────────────────────────────────────────────────────────────────────────
#pragma once

#include "esphome/core/automation.h"
#include "lvgl.h"
#include <functional>
#include <tuple>

namespace espcompose {

// ── Easing name → lv_anim_path_cb_t lookup ─────────────────────────────

inline lv_anim_path_cb_t resolve_easing(const std::string &name) {
  if (name == "ease_in")      return lv_anim_path_ease_in;
  if (name == "ease_out")     return lv_anim_path_ease_out;
  if (name == "ease_in_out")  return lv_anim_path_ease_in_out;
  if (name == "overshoot")    return lv_anim_path_overshoot;
  if (name == "bounce")       return lv_anim_path_bounce;
  if (name == "step")         return lv_anim_path_step;
  return lv_anim_path_linear;  // default
}

// ── AnimateAction ──────────────────────────────────────────────────────

template<typename... Ts>
class AnimateAction : public esphome::Action<Ts...> {
 public:
  // ── Setters (called from ESPHome codegen to_code) ──────────────────

  // Widget is resolved lazily via a getter — overlay/toast widgets are
  // created on demand, so the underlying LVGL global pointer is null at
  // startup (when set_widget would otherwise capture it). The getter is
  // re-invoked at play_complex / on_exec_ time, by which point the widget
  // exists.
  void set_widget_fn(std::function<lv_obj_t *()> fn) { widget_fn_ = std::move(fn); }
  void set_prop(lv_style_prop_t prop) { prop_ = prop; }
  void set_from(int32_t from) { from_ = from; }
  void set_to(int32_t to) { to_ = to; }
  void set_duration(uint32_t duration_ms) { duration_ms_ = duration_ms; }
  void set_delay(uint32_t delay_ms) { delay_ms_ = delay_ms; }
  void set_selector(lv_style_selector_t sel) { selector_ = sel; }
  void set_easing(const std::string &name) { path_cb_ = resolve_easing(name); }

  // ── Action<> interface ─────────────────────────────────────────────

  // play() is pure-virtual in Action<Ts...>; play_complex() is the real
  // entry point (called by the automation runner) and we override it below,
  // but the vtable still requires a concrete play().
  void play(const Ts &...x) override { /* play_complex handles everything */ }

  void play_complex(const Ts &...x) override {
    this->num_running_++;
    running_ = true;
    // Save args so the async ready_cb can forward them to play_next_.
    saved_args_ = std::tuple<Ts...>(x...);

    // Resolve widget lazily. If still null (e.g. overlay was never built),
    // skip the animation and continue the action chain so the script doesn't
    // hang or dereference null inside the LVGL exec_cb.
    lv_obj_t *w = widget_fn_ ? widget_fn_() : nullptr;
    if (!w) {
      running_ = false;
      this->play_next_(x...);
      return;
    }
    cached_widget_ = w;

    lv_anim_t a;
    lv_anim_init(&a);
    lv_anim_set_var(&a, this);
    lv_anim_set_user_data(&a, this);
    lv_anim_set_exec_cb(&a, AnimateAction::on_exec_);
    lv_anim_set_values(&a, from_, to_);
    lv_anim_set_time(&a, duration_ms_);
    lv_anim_set_ready_cb(&a, AnimateAction::on_ready_);
    lv_anim_set_path_cb(&a, path_cb_);

    if (delay_ms_ > 0) {
      lv_anim_set_delay(&a, delay_ms_);
    }

    lv_anim_start(&a);
  }

  void stop() override {
    if (running_) {
      lv_anim_del(this, AnimateAction::on_exec_);
      running_ = false;
    }
  }

 private:
  // ── LVGL callbacks (static) ───────────────────────────────────────

  static void on_exec_(void *var, int32_t value) {
    auto *self = static_cast<AnimateAction *>(var);
    if (!self->cached_widget_) return;
    lv_style_value_t v;
    v.num = value;
    lv_obj_set_local_style_prop(self->cached_widget_, self->prop_, v, self->selector_);
  }

  static void on_ready_(lv_anim_t *a) {
    auto *self = static_cast<AnimateAction *>(lv_anim_get_user_data(a));
    self->running_ = false;
    // Forward the original play_complex arguments through to the next action
    // in the automation chain. ESPHome's helper expands the saved tuple back
    // into the variadic call.
    self->play_next_tuple_(self->saved_args_);
  }

  // ── Members ───────────────────────────────────────────────────────

  std::function<lv_obj_t *()> widget_fn_{};
  lv_obj_t *cached_widget_{nullptr};
  lv_style_prop_t prop_{LV_STYLE_PROP_INV};
  int32_t from_{0};
  int32_t to_{0};
  uint32_t duration_ms_{300};
  uint32_t delay_ms_{0};
  lv_style_selector_t selector_{LV_PART_MAIN | LV_STATE_DEFAULT};
  lv_anim_path_cb_t path_cb_{lv_anim_path_linear};

  bool running_{false};
  std::tuple<Ts...> saved_args_{};
};

}  // namespace espcompose
