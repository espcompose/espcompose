// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_i2c_I2CBus, __marker_xl9535_XL9535Component } from "../markers";
export interface Xl9535Props extends _CoreComponent {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** int: The I²C address of the driver. Defaults to `0x20`. */
    address?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            xl9535: Xl9535Props & ComponentProps<__marker_xl9535_XL9535Component>;
        }
    }
}
