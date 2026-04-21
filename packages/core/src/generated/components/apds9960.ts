// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_apds9960_APDS9960, __marker_i2c_I2CBus } from "../markers";
export interface Apds9960Props extends _CoreComponent {
    /** int: The I²C address of the sensor. Defaults to `0x39`. */
    address?: number;
    /**
     * int: The ambient light gain level. One of 1x, 4x, 16x, 64x. Defaults to `4x`.
     * @yamlKey ambient_light_gain
     */
    ambientLightGain?: "16x" | "1x" | "4x" | "64x";
    /**
     * int: The proximity gain level. One of 1x, 2x, 4x, 8x. Defaults to `4x`.
     * @yamlKey gesture_gain
     */
    gestureGain?: "1x" | "2x" | "4x" | "8x";
    /**
     * int: The gesture LED drive level in mA. One of 100mA, 50mA, 25mA, 12.5mA. Defaults to `100mA`.
     * @yamlKey gesture_led_drive
     */
    gestureLedDrive?: "100ma" | "12.5ma" | "25ma" | "50ma";
    /**
     * int: The gesture wait time in ms. One of 0ms, 2.8ms, 5.6ms, 8.4ms, 14ms, 22.4ms, 30.8ms, 39.2ms. Defaults to `2.8ms`.
     * @yamlKey gesture_wait_time
     */
    gestureWaitTime?: "0ms" | "14ms" | "2.8ms" | "22.4ms" | "30.8ms" | "39.2ms" | "5.6ms" | "8.4ms";
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /**
     * int: The LED drive level in mA. One of 100mA, 50mA, 25mA, 12.5mA. Defaults to `100mA`.
     * @yamlKey led_drive
     */
    ledDrive?: "100ma" | "12.5ma" | "25ma" | "50ma";
    /**
     * int: The proximity gain level. One of 1x, 2x, 4x, 8x. Defaults to `4x`.
     * @yamlKey proximity_gain
     */
    proximityGain?: "1x" | "2x" | "4x" | "8x";
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The interval to check the sensor. Defaults to `60s`.
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            apds9960: Apds9960Props & ComponentProps<__marker_apds9960_APDS9960>;
        }
    }
}
