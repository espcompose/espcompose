// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { i2c_I2CBus, sy6970_SY6970Component } from "../markers";
export interface Sy6970Props extends _CoreComponent {
    /**
     * boolean: Enable or disable the status LED on the IC. Defaults to `true`.
     * @yamlKey enable_status_led
     */
    enableStatusLed?: boolean;
    /**
     * int: Input current in milliamps. Accepts values between 100 and 3200. Defaults to `500`.
     * @yamlKey input_current_limit
     */
    inputCurrentLimit?: number;
    /**
     * int: Charge voltage in millivolts. Accepts values between 3840 and 4608. Defaults to `4208`.
     * @yamlKey charge_voltage
     */
    chargeVoltage?: number;
    /** @yamlKey charge_current */
    chargeCurrent?: number;
    /** @yamlKey precharge_current */
    prechargeCurrent?: number;
    /**
     * boolean: Enable or disable charging. Defaults to `true`.
     * @yamlKey charge_enabled
     */
    chargeEnabled?: boolean;
    /**
     * boolean: Enable or disable the ADC. Defaults to `true`.
     * @yamlKey enable_adc
     */
    enableAdc?: boolean;
    /**
     * [Time](/guides/configuration-types#config-time): The interval to check the sensor. Defaults to `5s`.
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    /** int: The I²C address of the device. Defaults to `0x6A`. */
    address?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            sy6970: Sy6970Props & ComponentProps<sy6970_SY6970Component>;
        }
    }
}
