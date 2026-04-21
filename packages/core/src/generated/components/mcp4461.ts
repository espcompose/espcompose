// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_i2c_I2CBus, __marker_mcp4461_Mcp4461Component } from "../markers";
export interface Mcp4461Props extends _CoreComponent {
    /** int: Manually specify the I2C address of the digipot. Defaults to `0x2C`. */
    address?: number;
    /**
     * bool: Disable wiper 0. Defaults to `false`.
     * @yamlKey disable_wiper_0
     */
    disableWiper0?: boolean;
    /**
     * bool: Disable wiper 1. Defaults to `false`.
     * @yamlKey disable_wiper_1
     */
    disableWiper1?: boolean;
    /**
     * bool: Disable wiper 2. Defaults to `false`.
     * @yamlKey disable_wiper_2
     */
    disableWiper2?: boolean;
    /**
     * bool: Disable wiper 3. Defaults to `false`.
     * @yamlKey disable_wiper_3
     */
    disableWiper3?: boolean;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            mcp4461: Mcp4461Props & ComponentProps<__marker_mcp4461_Mcp4461Component>;
        }
    }
}
