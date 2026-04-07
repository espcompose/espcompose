// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_cap1188_CAP1188Component, __marker_i2c_I2CBus } from "../markers";
export interface Cap1188Props extends _CoreComponent {
    /**
     * [Pin](/guides/configuration-types#pin): Set the pin that is used to reset the CAP1188 board on boot.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /**
     * int: The touch threshold for all channels. This defines the sensitivity for touch detection.
     * @yamlKey touch_threshold
     */
    touchThreshold?: number;
    /**
     * boolean: Whether to allow multitouch. Defaults to off.
     * @yamlKey allow_multiple_touches
     */
    allowMultipleTouches?: boolean;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** int: The I²C address of the sensor. Defaults to `0x29`. */
    address?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            cap1188: Cap1188Props & ComponentProps<__marker_cap1188_CAP1188Component>;
        }
    }
}
