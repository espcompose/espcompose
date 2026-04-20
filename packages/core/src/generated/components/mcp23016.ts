// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_i2c_I2CBus, __marker_mcp23016_MCP23016 } from "../markers";
export interface Mcp23016Props extends _CoreComponent {
    /** int: The I²C address of the driver. Defaults to `0x20`. */
    address?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin connected to the INT output of the MC...
     * @yamlKey interrupt_pin
     */
    interruptPin?: Pin;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            mcp23016: Mcp23016Props & ComponentProps<__marker_mcp23016_MCP23016>;
        }
    }
}
