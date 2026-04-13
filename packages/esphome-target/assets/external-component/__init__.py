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
    """
    var = cg.new_Pvariable(
        config[CONF_ID], config[CONF_FLUSH_BUDGET_US]
    )
    await cg.register_component(var, config)

    # Emit call to bootstrap the reactive graph
    # This function is generated in TypeScript's espcompose_bindings.h
    # and performs all reactive node wiring and initialization
    cg.add(cg.RawExpression("espcompose::bootstrap_runtime()"))
