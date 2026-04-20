// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_emc2101_Emc2101Component, __marker_i2c_I2CBus } from "../markers";
export interface Emc2101DacProps {
    /**
     * string: The number of digital to analog conversions perfomed per second. One of `1/16`, `1/8`, `1/4`, `1/2`, `1`, `2`...
     * @yamlKey conversion_rate
     */
    conversionRate?: "1" | "1/16" | "1/2" | "1/4" | "1/8" | "16" | "2" | "32" | "4" | "8";
}
export interface Emc2101PwmProps {
    /** int: Value for the frequency divider. Defaults to `1`. */
    divider?: number;
    /** int: Determines effective resolution and the frequency of the PWM signal. Defaults to `23`. */
    resolution?: number;
}
export interface Emc2101Props extends _CoreComponent {
    /** int: Manually specify the I²C address of the sensor. Defaults to `0x4C`. */
    address?: number;
    /** Enable DAC output. */
    dac?: Emc2101DacProps;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** boolean: Inverts the output so 0 means 100% duty cycle and 1 means 0%. Defaults to `false`. */
    inverted?: boolean;
    /** Enable PWM output. */
    pwm?: Emc2101PwmProps;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            emc2101: Emc2101Props & ComponentProps<__marker_emc2101_Emc2101Component>;
        }
    }
}
