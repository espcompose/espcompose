// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_i2c_I2CBus, __marker_mcp4728_MCP4728Component } from "../markers";
export interface Mcp4728Props extends _CoreComponent {
    /** int: Manually specify the I2C address of the DAC. Defaults to `0x60`. */
    address?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /**
     * boolean: Use SEQ_WRITE mode to also write to EEPROM sequentially. Defaults to `false`.
     * @yamlKey store_in_eeprom
     */
    storeInEeprom?: boolean;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            mcp4728: Mcp4728Props & ComponentProps<__marker_mcp4728_MCP4728Component>;
        }
    }
}
