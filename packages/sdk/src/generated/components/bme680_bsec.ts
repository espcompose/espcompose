// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { bme680_bsec_BME680BSECComponent, i2c_I2CBus } from "../markers";
export interface Bme680BsecProps {
    /**
     * float: Temperature offset if device is in enclosure and reads too high. This value is subtracted from the reading (e....
     * @yamlKey temperature_offset
     */
    temperatureOffset?: number;
    /**
     * string: IAQ calculation mode. Default is `static` for static applications (e.g. fixed indoor devices). Can be `mobile...
     * @yamlKey iaq_mode
     */
    iaqMode?: "STATIC" | "MOBILE";
    /**
     * string: Supply voltage of the sensor. Default is `3.3V`. Can be set to `1.8V` if your sensor is 1.8V-powered (e.g. th...
     * @yamlKey supply_voltage
     */
    supplyVoltage?: "1.8V" | "3.3V";
    /**
     * string: Sample rate. Default is `lp` for low power consumption, sampling every 3 seconds. Can be `ulp` for ultra-low ...
     * @yamlKey sample_rate
     */
    sampleRate?: "LP" | "ULP";
    /**
     * [Time](/guides/configuration-types#time): The minimum interval at which to save calibrated BSEC algorithm state to fl...
     * @yamlKey state_save_interval
     */
    stateSaveInterval?: TimePeriod;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    /** int: Manually specify the I²C address of the sensor. Defaults to `0x76`. Another address can be `0x77`. */
    address?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            bme680_bsec: Bme680BsecProps & ComponentProps<bme680_bsec_BME680BSECComponent>;
        }
    }
}
