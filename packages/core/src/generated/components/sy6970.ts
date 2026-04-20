// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_i2c_I2CBus, __marker_sy6970_SY6970Component } from "../markers";
export interface Sy6970Props extends _CoreComponent {
    /** int: The I²C address of the device. Defaults to `0x6A`. */
    address?: number;
    /** @yamlKey charge_current */
    chargeCurrent?: number;
    /**
     * boolean: Enable or disable charging. Defaults to `true`.
     * @yamlKey charge_enabled
     */
    chargeEnabled?: boolean;
    /**
     * int: Charge voltage in millivolts. Accepts values between 3840 and 4608. Defaults to `4208`.
     * @yamlKey charge_voltage
     */
    chargeVoltage?: number;
    /**
     * boolean: Enable or disable the ADC. Defaults to `true`.
     * @yamlKey enable_adc
     */
    enableAdc?: boolean;
    /**
     * boolean: Enable or disable the status LED on the IC. Defaults to `true`.
     * @yamlKey enable_status_led
     */
    enableStatusLed?: boolean;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /**
     * int: Input current in milliamps. Accepts values between 100 and 3200. Defaults to `500`.
     * @yamlKey input_current_limit
     */
    inputCurrentLimit?: number;
    /** @yamlKey precharge_current */
    prechargeCurrent?: number;
    /**
     * [Time](https://esphome.io/guides/configuration-types#config-time): The interval to check the sensor. Defaults to `5s`.
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            sy6970: Sy6970Props & ComponentProps<__marker_sy6970_SY6970Component>;
        }
    }
}
