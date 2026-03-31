// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { grove_tb6612fng_GroveMotorDriveTB6612FNG, i2c_I2CBus } from "../markers";
export interface GroveTb6612fngProps extends _CoreComponent {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    /** int: The I²C address of the driver. Defaults to `0x14`. */
    address?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            grove_tb6612fng: GroveTb6612fngProps & ComponentProps<grove_tb6612fng_GroveMotorDriveTB6612FNG>;
        }
    }
}
