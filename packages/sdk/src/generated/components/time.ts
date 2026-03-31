// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent, _Time } from "../bases";
import type { bm8563_BM8563, ds1307_DS1307Component, gps_GPS, gps_GPSTime, homeassistant_HomeassistantTime, host_HostTime, i2c_I2CBus, pcf85063_PCF85063Component, pcf8563_PCF8563Component, rx8130_RX8130Component, sntp_SNTPComponent, zigbee_ZigbeeComponent, zigbee_ZigbeeTime } from "../markers";
interface Bm8563Props extends _Time, _CoreComponent {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    /** int: Manually specify the I²C address of the RTC. Defaults to `0x51`. */
    address?: number;
}
interface Ds1307Props extends _Time {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    /** int: Manually specify the I²C address of the RTC. Defaults to `0x68`. */
    address?: number;
}
interface Pcf85063Props extends _Time {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    /** int: Manually specify the I²C address of the RTC. Defaults to `0x51`. */
    address?: number;
}
interface Pcf8563Props extends _Time {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    /** int: Manually specify the I²C address of the RTC. Defaults to `0xA3`. */
    address?: number;
}
interface Rx8130Props extends _Time {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    /** int: Manually specify the I²C address of the RTC. Defaults to `0x32`. */
    address?: number;
}
interface SntpProps extends _Time, _CoreComponent {
    /** list of strings: Choose up to 3 NTP servers that are used for the clock source. Defaults to `0.pool.ntp.org`, `1.pool... */
    servers?: Array<string>;
}
interface GpsProps extends _Time, _CoreComponent {
    /** @yamlKey gps_id */
    gpsId?: RefProp<gps_GPS>;
}
interface HomeassistantProps extends _Time, _CoreComponent {
}
interface HostProps extends _Time, _CoreComponent {
}
interface ZigbeeProps extends _Time, _CoreComponent {
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
}
export type TimeProps = ({
    platform: "bm8563";
} & Bm8563Props & ComponentProps<bm8563_BM8563>) | ({
    platform: "ds1307";
} & Ds1307Props & ComponentProps<ds1307_DS1307Component>) | ({
    platform: "pcf85063";
} & Pcf85063Props & ComponentProps<pcf85063_PCF85063Component>) | ({
    platform: "pcf8563";
} & Pcf8563Props & ComponentProps<pcf8563_PCF8563Component>) | ({
    platform: "rx8130";
} & Rx8130Props & ComponentProps<rx8130_RX8130Component>) | ({
    platform: "sntp";
} & SntpProps & ComponentProps<sntp_SNTPComponent>) | ({
    platform: "gps";
} & GpsProps & ComponentProps<gps_GPSTime>) | ({
    platform: "homeassistant";
} & HomeassistantProps & ComponentProps<homeassistant_HomeassistantTime>) | ({
    platform: "host";
} & HostProps & ComponentProps<host_HostTime>) | ({
    platform: "zigbee";
} & ZigbeeProps & ComponentProps<zigbee_ZigbeeTime>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            time: TimeProps;
        }
    }
}
