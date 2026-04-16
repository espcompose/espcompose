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
from esphome.components.lvgl.defines import get_data, KEY_LV_DEFINES

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
    1. Disables LVGL built-in themes so espcompose controls all widget styling
    2. Creates a new component instance with configured flush budget
    3. Registers it with ESPHome via App.register_component()
    4. Emits a call to espcompose::bootstrap_runtime() to wire the reactive graph
    5. Component's setup() and loop() are called automatically by ESPHome
    """
    # Disable LVGL's built-in themes so that all widget styling is controlled
    # exclusively by espcompose's design system. Without this, ESPHome injects
    # default padding, colors, borders, and corner radius into every widget.
    # We write directly to the define data store instead of using add_define()
    # to avoid "Redefinition" errors when LVGL's own codegen has already
    # enabled LV_USE_THEME_DEFAULT before our component runs.
    lv_defines = get_data(KEY_LV_DEFINES)
    lv_defines["LV_USE_THEME_DEFAULT"] = "0"
    lv_defines["LV_USE_THEME_SIMPLE"] = "0"
    lv_defines["LV_THEME_DEFAULT_GROW"] = "0"

    var = cg.new_Pvariable(
        config[CONF_ID], config[CONF_FLUSH_BUDGET_US]
    )
    await cg.register_component(var, config)

    # Emit call to bootstrap the reactive graph
    # This function is generated in TypeScript's espcompose_bindings.h
    # and performs all reactive node wiring and initialization
    cg.add(cg.RawExpression("espcompose::bootstrap_runtime()"))
