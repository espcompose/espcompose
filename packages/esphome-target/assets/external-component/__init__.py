"""
ESPHome external component for espcompose reactive runtime.

Provides CONFIG_SCHEMA for configuration and to_code() to register the
EspcomposeRuntimeComponent with ESPHome's component system.

The component manages setup/loop lifecycle of the reactive dependency graph,
ensuring proper integration with ESPHome's framework.
"""

import esphome.config_validation as cv
import esphome.codegen as cg
from esphome import automation
from esphome.core import coroutine_with_priority
from esphome.const import CONF_ID
from esphome.components.lvgl import defines as df, helpers as lv_helpers

# ---------------------------------------------------------------------------
# Suppress LVGL built-in theme defines
# ---------------------------------------------------------------------------
# LVGL's helpers.lv_uses includes "THEME_DEFAULT" by default.  At the end of
# LVGL's to_code(), every entry in lv_uses is passed to df.add_define() which
# unconditionally sets the value to "1".  Because add_define() always
# overwrites, simply pre-populating the define dict with "0" is ineffective.
#
# Strategy:
#   1. Remove "THEME_DEFAULT" from lv_uses so the loop never fires for it,
#      which also prevents cg.add_define("USE_LVGL_THEME_DEFAULT").
#   2. Monkey-patch df.add_define() as a safety net so that any other code
#      path calling add_define for theme-related macros is silently ignored.
#
# Defines not present in the dict are treated as "unused" by
# generate_lv_conf_h() and emitted as ``#define LV_USE_THEME_DEFAULT 0``,
# which is exactly what we need to disable built-in themes.
# ---------------------------------------------------------------------------

_SUPPRESSED_THEME_DEFINES = frozenset({
    "LV_USE_THEME_DEFAULT",
    "LV_USE_THEME_SIMPLE",
    "LV_THEME_DEFAULT_GROW",
})

lv_helpers.lv_uses.discard("THEME_DEFAULT")
lv_helpers.lv_uses.discard("THEME_SIMPLE")

_original_add_define = df.add_define


def _add_define_no_theme(macro, value="1"):
    if macro in _SUPPRESSED_THEME_DEFINES:
        return
    return _original_add_define(macro, value)


df.add_define = _add_define_no_theme

# Configuration keys
CONF_FLUSH_BUDGET_US = "flush_budget_us"

# Create namespace and component class
espcompose_ns = cg.global_ns.namespace("espcompose")
EspcomposeRuntimeComponent = espcompose_ns.class_(
    "EspcomposeRuntimeComponent", cg.Component
)

# Configuration schema for the component
CONFIG_SCHEMA = cv.Schema(
    {
        cv.GenerateID(): cv.declare_id(EspcomposeRuntimeComponent),
        cv.Optional(CONF_FLUSH_BUDGET_US, default=10000): cv.int_range(
            min=100, max=100000
        ),
    }
).extend(cv.COMPONENT_SCHEMA)


async def to_code(config):
    """
    Generate C++ code to instantiate and register the EspcomposeRuntimeComponent.

    Args:
        config: Parsed configuration dictionary containing CONF_FLUSH_BUDGET_US

    The generated code:
    1. Creates a new component instance with configured flush budget
    2. Registers it with ESPHome via App.register_component()
    3. Emits a call to espcompose::bootstrap_runtime() to wire the reactive graph
    4. Component's setup() and loop() are called automatically by ESPHome

    Note: LVGL built-in themes are disabled at module level via monkey-patching
    df.add_define() and removing THEME_DEFAULT from helpers.lv_uses.
    """
    var = cg.new_Pvariable(
        config[CONF_ID], config[CONF_FLUSH_BUDGET_US]
    )
    await cg.register_component(var, config)

    # Note: LVGL's perf monitor (LV_USE_PERF_MONITOR) requires SYSMON which
    # requires OBSERVER — too many transitive deps to enable cleanly.
    # Our own ESPCOMPOSE_PERF instrumentation (--perf flag) is sufficient.

    # Note: bootstrap_runtime() is invoked from EspcomposeRuntimeComponent::setup()
    # rather than emitted inline here. This ensures it runs *after* ESPHome has
    # placement-new'd all GlobalsComponent instances, so BoundSignal::bind() can
    # safely point at the constructed external storage.


# ---------------------------------------------------------------------------
# AnimateAction — native ESPHome Action<> for LVGL property animation
# ---------------------------------------------------------------------------

AnimateAction = espcompose_ns.class_("AnimateAction", automation.Action)

# ── LVGL style-prop lookup table ──────────────────────────────────────────
# Maps snake_case ESPHome names → LVGL C enum constants.
STYLE_PROP_MAP = {
    "opa": "LV_STYLE_OPA",
    "translate_x": "LV_STYLE_TRANSLATE_X",
    "translate_y": "LV_STYLE_TRANSLATE_Y",
    "transform_scale_x": "LV_STYLE_TRANSFORM_SCALE_X",
    "transform_scale_y": "LV_STYLE_TRANSFORM_SCALE_Y",
    "transform_rotation": "LV_STYLE_TRANSFORM_ROTATION",
    "width": "LV_STYLE_WIDTH",
    "height": "LV_STYLE_HEIGHT",
    "min_width": "LV_STYLE_MIN_WIDTH",
    "min_height": "LV_STYLE_MIN_HEIGHT",
    "max_width": "LV_STYLE_MAX_WIDTH",
    "max_height": "LV_STYLE_MAX_HEIGHT",
    "x": "LV_STYLE_X",
    "y": "LV_STYLE_Y",
    "bg_opa": "LV_STYLE_BG_OPA",
    "border_opa": "LV_STYLE_BORDER_OPA",
    "border_width": "LV_STYLE_BORDER_WIDTH",
    "outline_opa": "LV_STYLE_OUTLINE_OPA",
    "outline_width": "LV_STYLE_OUTLINE_WIDTH",
    "pad_top": "LV_STYLE_PAD_TOP",
    "pad_bottom": "LV_STYLE_PAD_BOTTOM",
    "pad_left": "LV_STYLE_PAD_LEFT",
    "pad_right": "LV_STYLE_PAD_RIGHT",
    "radius": "LV_STYLE_RADIUS",
    "text_opa": "LV_STYLE_TEXT_OPA",
    "img_opa": "LV_STYLE_IMG_OPA",
    "shadow_opa": "LV_STYLE_SHADOW_OPA",
    "shadow_width": "LV_STYLE_SHADOW_WIDTH",
    "shadow_spread": "LV_STYLE_SHADOW_SPREAD",
    "shadow_ofs_x": "LV_STYLE_SHADOW_OFS_X",
    "shadow_ofs_y": "LV_STYLE_SHADOW_OFS_Y",
}

# ── LVGL part / state lookup tables ───────────────────────────────────────
PART_MAP = {
    "main": "LV_PART_MAIN",
    "scrollbar": "LV_PART_SCROLLBAR",
    "indicator": "LV_PART_INDICATOR",
    "knob": "LV_PART_KNOB",
    "selected": "LV_PART_SELECTED",
    "items": "LV_PART_ITEMS",
    "ticks": "LV_PART_TICKS",
    "cursor": "LV_PART_CURSOR",
}

STATE_MAP = {
    "default": "LV_STATE_DEFAULT",
    "checked": "LV_STATE_CHECKED",
    "focused": "LV_STATE_FOCUSED",
    "focus_key": "LV_STATE_FOCUS_KEY",
    "edited": "LV_STATE_EDITED",
    "hovered": "LV_STATE_HOVERED",
    "pressed": "LV_STATE_PRESSED",
    "scrolled": "LV_STATE_SCROLLED",
    "disabled": "LV_STATE_DISABLED",
}


def _resolve_prop(name):
    """Resolve an ESPHome style prop name to its LVGL constant."""
    c = STYLE_PROP_MAP.get(name)
    if c is None:
        raise cv.Invalid(f"Unknown LVGL style property: {name}")
    return c


def _resolve_selector(part, state):
    """Build an lv_style_selector_t expression from part/state names."""
    p = PART_MAP.get(part, None) if part else "LV_PART_MAIN"
    s = STATE_MAP.get(state, None) if state else "LV_STATE_DEFAULT"
    if p is None:
        raise cv.Invalid(f"Unknown LVGL part: {part}")
    if s is None:
        raise cv.Invalid(f"Unknown LVGL state: {state}")
    return f"{p} | {s}"


ANIMATE_ACTION_SCHEMA = cv.Schema(
    {
        cv.Required("widget"): cv.string,
        cv.Required("prop"): cv.string,
        cv.Required("from"): cv.int_,
        cv.Required("to"): cv.int_,
        cv.Required("duration"): cv.int_,
        cv.Optional("easing", default="linear"): cv.string,
        cv.Optional("part"): cv.string,
        cv.Optional("state"): cv.string,
        cv.Optional("delay", default=0): cv.int_,
    }
)


@coroutine_with_priority(100.0)
async def animate_action_to_code(config, action_id, template_arg, args):
    var = cg.new_Pvariable(action_id, template_arg)
    # Widget is a raw C++ ID string (LVGL widget ID from the compiler).
    # Pass a *getter lambda* rather than the pointer itself: overlay/toast
    # widgets are created lazily, so the underlying LVGL global pointer is
    # null at codegen-emitted setup time. The lambda is re-invoked at action
    # execution time, when the widget actually exists.
    # _ec_id_ptr (defined in espcompose_bindings.h) normalizes id()'s return
    # type — both lv_obj_t& (LVGL widgets) and component pointers collapse to
    # lv_obj_t*.
    cg.add(var.set_widget_fn(cg.RawExpression(
        f"[]() -> lv_obj_t* {{ return espcompose::_ec_id_ptr(id({config['widget']})); }}"
    )))
    cg.add(var.set_prop(cg.RawExpression(_resolve_prop(config["prop"]))))
    cg.add(var.set_from(config["from"]))
    cg.add(var.set_to(config["to"]))
    cg.add(var.set_duration(config["duration"]))
    cg.add(var.set_easing(config["easing"]))
    cg.add(var.set_selector(cg.RawExpression(
        _resolve_selector(config.get("part"), config.get("state"))
    )))
    cg.add(var.set_delay(config["delay"]))
    return var


# synchronous=False: play_complex() defers play_next_() to LVGL ready_cb
automation.register_action(
    "espcompose.animate",
    AnimateAction,
    ANIMATE_ACTION_SCHEMA,
    synchronous=False,
)(animate_action_to_code)
