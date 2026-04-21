// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_as5600_AS5600Component, __marker_i2c_I2CBus } from "../markers";
export interface As5600Props extends _CoreComponent {
    /** int: The i²c address of the sensor. See [I²C Addresses](https://esphome.io/components/sensor/as5600#as5600_i2c_addres... */
    address?: number;
    /**
     * int: The pin connected to the AS5600's direction pin. See [Direction](https://esphome.io/components/sensor/as5600#as5...
     * @yamlKey dir_pin
     */
    dirPin?: Pin;
    /** string: The direction that the magnet should rotate to increase values. Used in combination with the dir_pin. */
    direction?: "CLOCKWISE" | "COUNTERCLOCKWISE";
    /**
     * int: The raw position that should be considered the end (e.g. 180deg) of the allowable rotation range. Mutually exclu...
     * @yamlKey end_position
     */
    endPosition?: number;
    /**
     * string: See datasheet.
     * @yamlKey fast_filter
     */
    fastFilter?: "LSB10" | "LSB18" | "LSB21" | "LSB24" | "LSB6" | "LSB7" | "LSB9" | "NONE";
    /** string: See datasheet. */
    hysteresis?: "LSB1" | "LSB2" | "LSB3" | "NONE";
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /**
     * string: The power mode to run the sensor. Note: When watchdog is enabled, it will switch the device to `low3` when th...
     * @yamlKey power_mode
     */
    powerMode?: "LOW1" | "LOW2" | "LOW3" | "NOMINAL";
    /** int: The allowable rotation range from the start_position. Mutually exclusive with end_position. See [Position / Rang... */
    range?: number;
    /**
     * string: See datasheet.
     * @yamlKey slow_filter
     */
    slowFilter?: "16X" | "2X" | "4X" | "8X";
    /**
     * int: The raw position that should be considered the start (i.e. `0` ). See [Position / Range](https://esphome.io/comp...
     * @yamlKey start_position
     */
    startPosition?: number;
    /** boolean: Whether to enable the watchdog that puts the chip into low power mode 3. Check the datasheet for more inform... */
    watchdog?: boolean;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            as5600: As5600Props & ComponentProps<__marker_as5600_AS5600Component>;
        }
    }
}
