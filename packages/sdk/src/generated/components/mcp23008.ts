// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { i2c_I2CBus, mcp23008_MCP23008 } from "../markers";
export interface Mcp23008Props extends _CoreComponent {
    /**
     * boolean: Configure the interrupt pin to open-drain mode. Useful when the MCP23008's power supply is greater than 3.3 ...
     * @yamlKey open_drain_interrupt
     */
    openDrainInterrupt?: boolean;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    /** int: The I²C address of the driver. Defaults to `0x20`. */
    address?: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            mcp23008: Mcp23008Props & ComponentProps<mcp23008_MCP23008>;
        }
    }
}
