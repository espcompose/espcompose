// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { apds9960_APDS9960, i2c_I2CBus } from "../markers";
export interface Apds9960Props extends _CoreComponent {
    /**
     * int: The LED drive level in mA. One of 100mA, 50mA, 25mA, 12.5mA. Defaults to `100mA`.
     * @yamlKey led_drive
     */
    ledDrive?: "100ma" | "50ma" | "25ma" | "12.5ma";
    /**
     * int: The proximity gain level. One of 1x, 2x, 4x, 8x. Defaults to `4x`.
     * @yamlKey proximity_gain
     */
    proximityGain?: "1x" | "2x" | "4x" | "8x";
    /**
     * int: The ambient light gain level. One of 1x, 4x, 16x, 64x. Defaults to `4x`.
     * @yamlKey ambient_light_gain
     */
    ambientLightGain?: "1x" | "4x" | "16x" | "64x";
    /**
     * int: The gesture LED drive level in mA. One of 100mA, 50mA, 25mA, 12.5mA. Defaults to `100mA`.
     * @yamlKey gesture_led_drive
     */
    gestureLedDrive?: "100ma" | "50ma" | "25ma" | "12.5ma";
    /**
     * int: The proximity gain level. One of 1x, 2x, 4x, 8x. Defaults to `4x`.
     * @yamlKey gesture_gain
     */
    gestureGain?: "1x" | "2x" | "4x" | "8x";
    /**
     * int: The gesture wait time in ms. One of 0ms, 2.8ms, 5.6ms, 8.4ms, 14ms, 22.4ms, 30.8ms, 39.2ms. Defaults to `2.8ms`.
     * @yamlKey gesture_wait_time
     */
    gestureWaitTime?: "0ms" | "2.8ms" | "5.6ms" | "8.4ms" | "14ms" | "22.4ms" | "30.8ms" | "39.2ms";
    /**
     * [Time](/guides/configuration-types#time): The interval to check the sensor. Defaults to `60s`.
     * @yamlKey update_interval
     */
    updateInterval?: unknown;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    /** int: The I²C address of the sensor. Defaults to `0x39`. */
    address?: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            apds9960: Apds9960Props & ComponentProps<apds9960_APDS9960>;
        }
    }
}
