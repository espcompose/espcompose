// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { as5600_AS5600Component, i2c_I2CBus } from "../markers";
export interface As5600Props extends _CoreComponent {
    /**
     * int: The pin connected to the AS5600's direction pin. See [Direction](https://esphome.io/components/sensor/as5600#as5...
     * @yamlKey dir_pin
     */
    dirPin?: Pin;
    /** string: The direction that the magnet should rotate to increase values. Used in combination with the dir_pin. */
    direction?: "CLOCKWISE" | "COUNTERCLOCKWISE";
    /** boolean: Whether to enable the watchdog that puts the chip into low power mode 3. Check the datasheet for more inform... */
    watchdog?: boolean;
    /**
     * string: The power mode to run the sensor. Note: When watchdog is enabled, it will switch the device to `low3` when th...
     * @yamlKey power_mode
     */
    powerMode?: "NOMINAL" | "LOW1" | "LOW2" | "LOW3";
    /** string: See datasheet. */
    hysteresis?: "NONE" | "LSB1" | "LSB2" | "LSB3";
    /**
     * string: See datasheet.
     * @yamlKey slow_filter
     */
    slowFilter?: "16X" | "8X" | "4X" | "2X";
    /**
     * string: See datasheet.
     * @yamlKey fast_filter
     */
    fastFilter?: "NONE" | "LSB6" | "LSB7" | "LSB9" | "LSB18" | "LSB21" | "LSB24" | "LSB10";
    /**
     * int: The raw position that should be considered the start (i.e. `0` ). See [Position / Range](https://esphome.io/comp...
     * @yamlKey start_position
     */
    startPosition?: number;
    /**
     * int: The raw position that should be considered the end (e.g. 180deg) of the allowable rotation range. Mutually exclu...
     * @yamlKey end_position
     */
    endPosition?: number;
    /** int: The allowable rotation range from the start_position. Mutually exclusive with end_position. See [Position / Rang... */
    range?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    /** int: The i²c address of the sensor. See [I²C Addresses](https://esphome.io/components/sensor/as5600#as5600_i2c_addres... */
    address?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            as5600: As5600Props & ComponentProps<as5600_AS5600Component>;
        }
    }
}
