// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_i2c_I2CBus, __marker_mpr121_MPR121Component } from "../markers";
export interface Mpr121Props extends _CoreComponent {
    /**
     * int: The minimum length that no touch is recognized before a release event is created. Range is from 0 to 7. Defaults...
     * @yamlKey release_debounce
     */
    releaseDebounce?: number;
    /**
     * int: The minimum length before a touch is recognized. Range is from 0 to 7. Defaults to 0.
     * @yamlKey touch_debounce
     */
    touchDebounce?: number;
    /**
     * int: The touch threshold for all channels. This defines the sensitivity for touch detection and should be between 5 a...
     * @yamlKey touch_threshold
     */
    touchThreshold?: number;
    /**
     * int: The release defines the sensitivity for touch detection and should be between 5 and 30. Defaults to 6.
     * @yamlKey release_threshold
     */
    releaseThreshold?: number;
    /** @yamlKey max_touch_channel */
    maxTouchChannel?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** int: The I²C address of the sensor. Defaults to `0x5A`. */
    address?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            mpr121: Mpr121Props & ComponentProps<__marker_mpr121_MPR121Component>;
        }
    }
}
