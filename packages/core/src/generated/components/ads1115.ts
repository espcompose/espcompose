// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_ads1115_ADS1115Component, __marker_i2c_I2CBus } from "../markers";
export interface Ads1115Props extends _CoreComponent {
    /** int: The i²c address of the sensor. See [I²C Addresses](https://esphome.io/components/sensor/ads1115#ads1115_i2c_addr... */
    address: number;
    /**
     * boolean: Set if the ADS1115 should continuously measure voltages or only measure them when an update is called. Pleas...
     * @yamlKey continuous_mode
     */
    continuousMode?: boolean;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            ads1115: Ads1115Props & ComponentProps<__marker_ads1115_ADS1115Component>;
        }
    }
}
