// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { i2c_I2CBus, mcp4728_MCP4728Component } from "../markers";
export interface Mcp4728Props extends _CoreComponent {
    /**
     * boolean: Use SEQ_WRITE mode to also write to EEPROM sequentially. Defaults to `false`.
     * @yamlKey store_in_eeprom
     */
    storeInEeprom?: boolean | EmbedValue<boolean>;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    /** int: Manually specify the I2C address of the DAC. Defaults to `0x60`. */
    address?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            mcp4728: Mcp4728Props & ComponentProps<mcp4728_MCP4728Component>;
        }
    }
}
