"""
ESPHome external component for espcompose reactive runtime.

Provides CONFIG_SCHEMA for configuration and to_code() to register the
EspcomposeRuntimeComponent with ESPHome's component system.

The component manages setup/loop lifecycle of the reactive dependency graph,
ensuring proper integration with ESPHome's framework.
"""

import esphome.config_validation as cv
import esphome.codegen as cg
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
        cv.Optional(CONF_FLUSH_BUDGET_US, default=2000): cv.int_range(
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

    # Emit call to bootstrap the reactive graph
    # This function is generated in TypeScript's espcompose_bindings.h
    # and performs all reactive node wiring and initialization
    cg.add(cg.RawExpression("espcompose::bootstrap_runtime()"))
