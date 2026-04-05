// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { __marker_i2c_I2CBus, __marker_i2c_device_I2CDeviceComponent } from "../markers";
export interface I2cDeviceProps {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** int: I²C address of the device. */
    address: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            i2c_device: I2cDeviceProps & ComponentProps<__marker_i2c_device_I2CDeviceComponent>;
        }
    }
}
