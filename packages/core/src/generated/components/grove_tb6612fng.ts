// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_grove_tb6612fng_GroveMotorDriveTB6612FNG, __marker_i2c_I2CBus } from "../markers";
export interface GroveTb6612fngProps extends _CoreComponent {
    /** int: The I²C address of the driver. Defaults to `0x14`. */
    address?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            grove_tb6612fng: GroveTb6612fngProps & ComponentProps<__marker_grove_tb6612fng_GroveMotorDriveTB6612FNG>;
        }
    }
}
