// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { i2c_I2CBus } from "../markers";
export interface I2cTimeoutProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface I2cProps extends _CoreComponent {
    /** [Pin](/guides/configuration-types#pin): The pin for the data line of the I²C bus. Defaults to the default of your boa... */
    sda?: Pin;
    /**
     * boolean: Enable the internal pullup resistor for the SDA pin. Defaults to `true`. Only available on ESP32.
     * @yamlKey sda_pullup_enabled
     */
    sdaPullupEnabled?: boolean;
    /** [Pin](/guides/configuration-types#pin): The pin for the clock line of the I²C bus. Defaults to the default of your bo... */
    scl?: Pin;
    /**
     * boolean: Enable the internal pullup resistor for the SCL pin. Defaults to `true`. Only available on ESP32.
     * @yamlKey scl_pullup_enabled
     */
    sclPullupEnabled?: boolean;
    /** frequency: Set the frequency the I²C bus should operate on. Defaults to `50kHz`. Default for NRF52 is `100kHz`. Value... */
    frequency?: unknown;
    /** [Time](/guides/configuration-types#time): Set the I²C bus timeout. Defaults to the framework defaults (`100us` on `es... */
    timeout?: I2cTimeoutProps;
    /** boolean: If ESPHome should do a search of the I²C address space on startup. Defaults to `true`. */
    scan?: boolean;
    /**
     * boolean: Enable the low-power (master only) I²C bus. Only available on ESP32C5, ESP32C6 and ESP32P4. Defaults to `fal...
     * @yamlKey low_power_mode
     */
    lowPowerMode?: boolean;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            i2c: I2cProps & ComponentProps<i2c_I2CBus>;
        }
    }
}
