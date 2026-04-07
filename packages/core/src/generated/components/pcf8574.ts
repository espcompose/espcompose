// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_i2c_I2CBus, __marker_pcf8574_PCF8574Component } from "../markers";
export interface Pcf8574Props extends _CoreComponent {
    /** boolean: Whether this is a 16-pin PCF8575. Defaults to `false`. */
    pcf8575?: boolean;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** int: The I²C address of the driver. Defaults to `0x21`. */
    address?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            pcf8574: Pcf8574Props & ComponentProps<__marker_pcf8574_PCF8574Component>;
        }
    }
}
