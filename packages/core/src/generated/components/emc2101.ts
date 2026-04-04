// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { emc2101_Emc2101Component, i2c_I2CBus } from "../markers";
export interface Emc2101PwmProps {
    /** int: Determines effective resolution and the frequency of the PWM signal. Defaults to `23`. */
    resolution?: number;
    /** int: Value for the frequency divider. Defaults to `1`. */
    divider?: number;
}
export interface Emc2101DacProps {
    /**
     * string: The number of digital to analog conversions perfomed per second. One of `1/16`, `1/8`, `1/4`, `1/2`, `1`, `2`...
     * @yamlKey conversion_rate
     */
    conversionRate?: "1" | "2" | "4" | "8" | "16" | "32" | "1/16" | "1/8" | "1/4" | "1/2";
}
export interface Emc2101Props extends _CoreComponent {
    /** Enable PWM output. */
    pwm?: Emc2101PwmProps;
    /** Enable DAC output. */
    dac?: Emc2101DacProps;
    /** boolean: Inverts the output so 0 means 100% duty cycle and 1 means 0%. Defaults to `false`. */
    inverted?: boolean;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    /** int: Manually specify the I²C address of the sensor. Defaults to `0x4C`. */
    address?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            emc2101: Emc2101Props & ComponentProps<emc2101_Emc2101Component>;
        }
    }
}
