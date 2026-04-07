// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_i2c_I2CBus, __marker_mcp23017_MCP23017 } from "../markers";
export interface Mcp23017Props extends _CoreComponent {
    /**
     * boolean: Configure interrupt pins to open-drain mode. Useful when the MCP23017's power supply is greater than 3.3 vol...
     * @yamlKey open_drain_interrupt
     */
    openDrainInterrupt?: boolean;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** int: The I²C address of the driver. Defaults to `0x20`. */
    address?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            mcp23017: Mcp23017Props & ComponentProps<__marker_mcp23017_MCP23017>;
        }
    }
}
