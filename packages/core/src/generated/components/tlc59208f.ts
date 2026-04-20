// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_i2c_I2CBus, __marker_tlc59208f_TLC59208FOutput } from "../markers";
export interface Tlc59208fProps extends _CoreComponent {
    /** int: The I²C address of the driver. */
    address?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            tlc59208f: Tlc59208fProps & ComponentProps<__marker_tlc59208f_TLC59208FOutput>;
        }
    }
}
