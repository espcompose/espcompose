// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_esp32_ble_ESP32BLE, __marker_esp32_ble_beacon_ESP32BLEBeacon } from "../markers";
export interface Esp32BleBeaconProps extends _CoreComponent {
    /** @yamlKey ble_id */
    bleId?: RefProp<__marker_esp32_ble_ESP32BLE>;
    /** int: The iBeacon major identifier of this beacon. Usually used to group beacons, for example for grouping all beacons... */
    major?: number;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The iBeacon maximum transmit interval in milliseconds fro...
     * @yamlKey max_interval
     */
    maxInterval?: TimePeriod;
    /**
     * int: The RSSI of the iBeacon as measured 1 meter from the device. This is used to calibrate the ranging calculations ...
     * @yamlKey measured_power
     */
    measuredPower?: number;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The iBeacon minimum transmit interval in milliseconds fro...
     * @yamlKey min_interval
     */
    minInterval?: TimePeriod;
    /** int: The iBeacon minor identifier of this beacon. Usually used to identify beacons within an iBeacon group. Defaults ... */
    minor?: number;
    /**
     * int: The transmit power of the iBeacon in dBm. One of -12, -9, -6, -3, 0, 3, 6, 9. Defaults to `3dBm`. Not available ...
     * @yamlKey tx_power
     */
    txPower?: "-12" | "-3" | "-6" | "-9" | "0" | "3" | "6" | "9";
    /** The type of beacon to create, currently only supports `iBeacon`. */
    type: "IBEACON";
    /** The [universally unique identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier) to identify the beacon. */
    uuid: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            esp32_ble_beacon: Esp32BleBeaconProps & ComponentProps<__marker_esp32_ble_beacon_ESP32BLEBeacon>;
        }
    }
}
