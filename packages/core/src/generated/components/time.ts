// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent, _Time } from "../bases";
import type { __marker_bm8563_BM8563, __marker_ds1307_DS1307Component, __marker_gps_GPS, __marker_gps_GPSTime, __marker_homeassistant_HomeassistantTime, __marker_host_HostTime, __marker_i2c_I2CBus, __marker_pcf85063_PCF85063Component, __marker_pcf8563_PCF8563Component, __marker_rx8130_RX8130Component, __marker_sntp_SNTPComponent, __marker_zigbee_ZigbeeComponent, __marker_zigbee_ZigbeeTime } from "../markers";
interface Bm8563Props extends _Time, _CoreComponent {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** int: Manually specify the I²C address of the RTC. Defaults to `0x51`. */
    address?: number;
}
interface Ds1307Props extends _Time {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** int: Manually specify the I²C address of the RTC. Defaults to `0x68`. */
    address?: number;
}
interface Pcf85063Props extends _Time {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** int: Manually specify the I²C address of the RTC. Defaults to `0x51`. */
    address?: number;
}
interface Pcf8563Props extends _Time {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** int: Manually specify the I²C address of the RTC. Defaults to `0xA3`. */
    address?: number;
}
interface Rx8130Props extends _Time {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** int: Manually specify the I²C address of the RTC. Defaults to `0x32`. */
    address?: number;
}
interface SntpProps extends _Time, _CoreComponent {
    /** list of strings: Choose up to 3 NTP servers that are used for the clock source. Defaults to `0.pool.ntp.org`, `1.pool... */
    servers?: Array<string>;
}
interface GpsProps extends _Time, _CoreComponent {
    /** @yamlKey gps_id */
    gpsId?: RefProp<__marker_gps_GPS>;
}
interface HomeassistantProps extends _Time, _CoreComponent {
}
interface HostProps extends _Time, _CoreComponent {
}
interface ZigbeeProps extends _Time, _CoreComponent {
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
export type TimeProps = ({
    platform: "bm8563";
} & Bm8563Props & ComponentProps<__marker_bm8563_BM8563>) | ({
    platform: "ds1307";
} & Ds1307Props & ComponentProps<__marker_ds1307_DS1307Component>) | ({
    platform: "pcf85063";
} & Pcf85063Props & ComponentProps<__marker_pcf85063_PCF85063Component>) | ({
    platform: "pcf8563";
} & Pcf8563Props & ComponentProps<__marker_pcf8563_PCF8563Component>) | ({
    platform: "rx8130";
} & Rx8130Props & ComponentProps<__marker_rx8130_RX8130Component>) | ({
    platform: "sntp";
} & SntpProps & ComponentProps<__marker_sntp_SNTPComponent>) | ({
    platform: "gps";
} & GpsProps & ComponentProps<__marker_gps_GPSTime>) | ({
    platform: "homeassistant";
} & HomeassistantProps & ComponentProps<__marker_homeassistant_HomeassistantTime>) | ({
    platform: "host";
} & HostProps & ComponentProps<__marker_host_HostTime>) | ({
    platform: "zigbee";
} & ZigbeeProps & ComponentProps<__marker_zigbee_ZigbeeTime>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            time: TimeProps;
        }
    }
}
